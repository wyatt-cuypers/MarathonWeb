import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import img from "../Images/Essentia-Logo-teal-Fargo.png";
import { memo } from 'react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="loginContainer">
      <div>
        <img className="loginImage" alt="Marathon Logo" src={img} />
      </div>
      <Button
        style={{
          backgroundColor: "#4cf2f1",
          color: "#FFF",
          width: 600,
          height: 50,
          marginTop: 50,
          fontFamily: "Source Code Pro",
          fontSize: 24,
          fontWeight: "bold",
        }}
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
    </div>
  );
};

export default memo(Login);
