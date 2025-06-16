import { useState } from "react";
import axios from "../api/axios";
import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      }
      setMsg("Login Successful!");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <p>{msg}</p>
    </Form>
  );
}
