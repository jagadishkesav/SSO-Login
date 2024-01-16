import axios from "axios";
import { useEffect, useState } from "react";

const AUTH_USER_URL = "http://localhost:5000/user";

const fetchAuthUser = async () => {
  const res = await axios.get(AUTH_USER_URL, { withCredentials: true });
  return res.data.user;
};

const User = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAuthUser().then(setData);
  }, []);
  return (
    <div>
      <h1>user</h1>
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default User;
