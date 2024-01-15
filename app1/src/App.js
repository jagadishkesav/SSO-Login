import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/auth", {
      credentials: "include", // This includes cookies in the request
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.isAuthenticated));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) window.location.href = "http://localhost:5000/login";
  }, [isAuthenticated]);
  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      credentials: "include", // This includes cookies in the request
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.isAuthenticated));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:5000/auth/google"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleLogout}>log out</button>
      </header>
    </div>
  );
}

export default App;
