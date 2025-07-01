import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "firebase/auth";

import Lottie from "lottie-react";
import registerLottie from "../assets/LottiesFile/register.json";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser, signInWithGoogle } = use(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;

    if (!photoURL.startsWith("http")) {
      const msg =
        "Please provide a valid image URL starting with http or https";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success(`✅ Registered successfully as ${name}`);

      setTimeout(() => {
        navigate("/");
      }, 1000);

      form.reset();
    } catch (err) {
      console.error("Registration error:", err.message);
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        toast.success(`✅ Signed in as ${user.displayName}`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`❌ ${error.message}`);
      });
  };

  return (
    <div className="work-sans-text min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row items-center justify-center p-4 gap-8">
      {/* Register Box */}
      <div className="w-full max-w-md bg-base-300 p-8 rounded-xl shadow-lg">
        <h2 className="text-primary-gradient text-center text-4xl mb-12">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Profile Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn-secondary relative z-10 text-sm rounded-full w-full"
          >
            Register
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full flex items-center justify-center gap-2 border border-gray-300"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* Lottie Animation */}
      <div className="w-full max-w-md flex justify-center items-center">
        <Lottie animationData={registerLottie} loop={true} />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
