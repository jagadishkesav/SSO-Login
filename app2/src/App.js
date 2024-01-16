import "./App.css";
import { useEffect, useState } from "react";
import User from "./user";
import axios from "axios";

const AUTH_URL = "http://localhost:5000/auth";
const LOGIN_URL = "http://localhost:5000/login";
const LOGOUT_URL = "http://localhost:5000/logout";

const fetchAuthStatus = async (url) => {
  const res = await axios.get(url, { withCredentials: true });
  return res.data.isAuthenticated;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetchAuthStatus(AUTH_URL).then(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (isAuthenticated === false)
      window.location.href = LOGIN_URL + "?redirectURL=" + window.location.href;
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const res = await axios.get(LOGOUT_URL, { withCredentials: true });
    setIsAuthenticated(res.data.isAuthenticated);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>App 2</p>
        <button onClick={handleLogout}>Logout</button>
        {isAuthenticated && <User />}
      </header>
    </div>
  );
}

export default App;
