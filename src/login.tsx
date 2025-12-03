import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On page load → check sessionStorage
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("loggedInEmail");
    if (savedEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // save email in sessionStorage
    sessionStorage.setItem("loggedInEmail", email);

    setIsLoggedIn(true);
  };

  // If already logged in → hide login & show welcome
  if (isLoggedIn) {
    const savedEmail = sessionStorage.getItem("loggedInEmail");

    return (
      <div style={styles.loggedInBox}>
        <h2>You are logged in</h2>
        <p>Email: {savedEmail}</p>

        <button
          onClick={() => {
            sessionStorage.removeItem("loggedInEmail");
            setIsLoggedIn(false);
          }}
          style={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "300px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    marginTop: "1rem",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  loggedInBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  logoutBtn: {
    padding: "0.6rem 1rem",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};