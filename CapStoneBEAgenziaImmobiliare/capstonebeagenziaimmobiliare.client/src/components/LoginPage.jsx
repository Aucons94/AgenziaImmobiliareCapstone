import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/actions/loginAction";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.login.isLoading);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      NomeCognome: username,
      Password: password,
    };
    dispatch(fetchLogin(loginObj));
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
