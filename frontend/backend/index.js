const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk-fbsvc.json");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://historical-artifacts-tra-3ba74.web.app', 
    'https://historical-artifacts-tra-3ba74.firebaseapp.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));



// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.szfjyrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient with Stable API version settings
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
};

// Middleware to verify email in params matches decoded token email
const verifyTokenEmail = (req, res, next) => {
  if (req.params.email !== req.decoded.email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
  next();
};

async function run() {
  try {
    // Connect the client to MongoDB
    //await client.connect();

    console.log("Connected successfully to MongoDB");

    const artifactsCollection = client.db('artifactTracker').collection('artifacts');

    // GET all artifacts
    app.get('/artifacts', async (req, res) => {
      try {
        const cursor = artifactsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
        res.status(500).send({ message: "Failed to fetch artifacts" });
      }
    });

    // GET artifact by ID
    app.get('/artifacts/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const artifact = await artifactsCollection.findOne({ _id: new ObjectId(id) });
        if (!artifact) {
          return res.status(404).send({ message: 'Artifact not found' });
        }
        res.send(artifact);
      } catch (error) {
        console.error("Error fetching artifact by ID:", error);
        res.status(500).send({ message: 'Invalid ID format' });
      }
    });

    // GET liked artifacts for the logged-in user (protected route)
        app.get('/likedArtifacts/:email', verifyToken, verifyTokenEmail, async (req, res) => {
        const { email } = req.params;

        try {
            const result = await artifactsCollection.find({ likedBy: email }).toArray();
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Failed to fetch liked artifacts" });
        }
    });


    // POST like or unlike an artifact by ID (protected route)
    app.post("/artifacts/:id", verifyToken, async (req, res) => {
        const { id } = req.params;
        const { userEmail } = req.body;

        if (userEmail !== req.decoded.email) {
            return res.status(403).send({ message: 'Forbidden access' });
        }

        try {
            const artifact = await artifactsCollection.findOne({ _id: new ObjectId(id) });

            if (!artifact) {
            return res.status(404).send({ message: "Artifact not found" });
            }

            const alreadyLiked = artifact.likedBy?.includes(userEmail);

            const updateQuery = alreadyLiked
            ? {
                $pull: { likedBy: userEmail },
                $inc: { likes: -1 },
                }
            : {
                $addToSet: { likedBy: userEmail },
                $inc: { likes: 1 },
                };

            await artifactsCollection.updateOne(
            { _id: new ObjectId(id) },
            updateQuery
            );

            res.send({ success: true, liked: !alreadyLiked });
        } catch (error) {
            console.error("Error updating like status:", error);
            res.status(500).send({ message: "Error updating like status" });
        }
    });

    // POST add new artifact
    app.post('/artifacts', verifyToken, async (req, res) => {
        try {
            const newArtifact = req.body;
            newArtifact.likes = 0;
            newArtifact.likedBy = [];

            const result = await artifactsCollection.insertOne(newArtifact);

            res.status(201).send({
            success: true,
            message: 'Artifact added successfully',
            artifactId: result.insertedId,
            });
        } catch (error) {
            console.error("Error adding artifact:", error);
            res.status(500).send({ message: 'Failed to add artifact' });
        }
    });

    // DELETE artifact by ID (protected route, only creator can delete)
    app.delete('/artifacts/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        console.log('Delete request for artifact:', id);
        console.log('User email from token:', req.decoded.email);

        try {
            const artifact = await artifactsCollection.findOne({ _id: new ObjectId(id) });
            if (!artifact) {
            console.log('Artifact not found');
            return res.status(404).send({ message: 'Artifact not found' });
            }

            // Check ownership - adjust this to your actual field name!
            if (artifact.addedBy?.email !== req.decoded.email) {
            console.log('Unauthorized delete attempt by:', req.decoded.email);
            return res.status(403).send({ message: 'You can only delete your own artifacts' });
            }

            await artifactsCollection.deleteOne({ _id: new ObjectId(id) });
            console.log('Artifact deleted successfully');
            res.send({ message: 'Artifact deleted' });
        } catch (error) {
            console.error('Error deleting artifact:', error);
            res.status(500).send({ message: 'Internal server error' });
        }
    });


    // PATCH update artifact by ID (protected route)
    app.patch('/artifacts/:id', verifyToken, async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            // Prevent updating these fields
            delete updatedData.likes;
            delete updatedData.likedBy;
            delete updatedData.userEmail;

            const result = await artifactsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
            );

            if (result.modifiedCount > 0) {
            res.send({ success: true, message: 'Artifact updated successfully' });
            } else {
            res.send({ success: false, message: 'No changes made or artifact not found' });
            }
        } catch (error) {
            console.error("Error updating artifact:", error);
            res.status(500).send({ message: 'Failed to update artifact' });
        }
    });

    // Ping MongoDB to verify connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
  
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Historical Artifacts Tracker Server is running');
});

app.listen(port, () => {
  console.log(`Historical Artifacts Tracker Server is running on port ${port}`);
});
