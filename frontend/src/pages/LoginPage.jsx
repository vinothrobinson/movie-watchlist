import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [accountExists, setAccountExists] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountExists) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
          return;
        }

        // console.log(data);
        navigate("/search");
      } catch (error) {
        setError("Server error");
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
          return;
        }

        // console.log(data);
        navigate("/search");
      } catch (error) {
        setError("Server error");
      }
    }

    // send to backend here
  };

  function switchToRegister() {
    setAccountExists(!accountExists);
    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <div className="flex items-center justify-center bg-beige-200 font-['Inter'] min-h-screen space-y-10">
      {/* <h1 className="text-6xl font-semi-bold">Login</h1> */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg"
      >
        <h1 className="text-4xl font-semibold text-center">
          {accountExists ? "Login" : "Create New Account"}
        </h1>

        {/* Name */}
        {!accountExists && (
          <div className="space-y-2">
            <label className="block font-medium">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
            />
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label className="block font-medium">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block font-medium">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-maroon-500 text-white rounded-xl hover:bg-maroon-200 transition"
        >
          {accountExists ? "Log In" : "Sign Up"}
        </button>
        {accountExists ? (
          <p className="text-center">
            Don't have an account?{" "}
            <button
              onClick={switchToRegister}
              className="text-blue-500 hover:underline"
            >
              Sign up!
            </button>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <button
              onClick={switchToRegister}
              className="text-blue-500 hover:underline"
            >
              Log in!
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
