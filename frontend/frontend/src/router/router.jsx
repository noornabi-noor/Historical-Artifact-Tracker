import { createBrowserRouter } from "react-router";
import MyProfile from "../components/MyProfile";
import RootLayouts from "../layout/RootLayouts";
import AddArtifact from "../pages/AddArtifact";
import AllArtifacts from "../pages/AllArtifacts";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LikedArtifacts from "../pages/LikedArtifacts";
import Login from "../pages/Login";
import MyArtifacts from "../pages/MyArtifacts";
import Register from "../pages/Register";
import UpdateArtifact from "../pages/UpdateArtifact";
import ArtifactDetails from "./../components/ArtifactDetails";
import PrivateRoutes from "./../routes/PrivateRoutes";

import TermsOfService from "../Components/TermsOfServices/TermsOfService";
import PrivacyPolicy from "../Components/TermsOfServices/PrivacyPolicy";
import RefundPolicy from "../Components/TermsOfServices/RefundPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/terms" ,
        element: <TermsOfService/>
      },
      {
        path: "/privacy" ,
        element: <PrivacyPolicy/>
      },
      {
        path: "/refund" ,
        element: <RefundPolicy/>
      },
      {
        path: "allArtifacts",
        element: <AllArtifacts />,
      },
      {
        path: "addArtifact",
        element: (
          <PrivateRoutes>
            <AddArtifact />
          </PrivateRoutes>
        ),
      },
      {
        path: "myArtifacts",
        element: (
          <PrivateRoutes>
            <MyArtifacts />
          </PrivateRoutes>
        ),
      },
      {
        path: "artifacts/:id",
        element: (
          <PrivateRoutes>
            <ArtifactDetails />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://historical-artifacts-tracker-peach.vercel.app/artifacts/${params.id}`
          );
          if (!res.ok) throw new Response("Not Found", { status: 404 });
          return res.json();
        },
      },
      {
        path: "likedArtifacts",
        element: (
          <PrivateRoutes>
            <LikedArtifacts />
          </PrivateRoutes>
        ),
      },
      {
        path: "updateArtifact/:id",
        element: (
          <PrivateRoutes>
            <UpdateArtifact />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://historical-artifacts-tracker-peach.vercel.app/artifacts/${params.id}`
          );
          if (!res.ok) throw new Response("Not Found", { status: 404 });
          return res.json();
        },
      },
    ],
  },
]);

export default router;
