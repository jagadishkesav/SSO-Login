import "./App.css";
import { useEffect, useState } from "react";

const AUTH_URL = "http://sso.navadhiti.hub.com:5000/auth";
const LOGIN_URL = "http://sso.navadhiti.hub.com:5000/login";
const LOGOUT_URL = "http://sso.navadhiti.hub.com:5000/logout";

const fetchAuthStatus = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.isAuthenticated;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    fetchAuthStatus(AUTH_URL).then(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (!isAuthenticated)
      window.location.href = LOGIN_URL + "?redirectURL=" + window.location.href;
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const isAuthenticated = await fetchAuthStatus(LOGOUT_URL);
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>App 1</p>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
