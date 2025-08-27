import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nav = useNavigate();

  const LOGIN_URL = "http://localhost:9009/api/auth/login";

  const login = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(LOGIN_URL, { username, password });
      console.log(data);

      window.localStorage.setItem("token", data.token);
      nav("/pokemon");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={login}>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
