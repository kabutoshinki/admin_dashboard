import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as authenService from "../../services/authenService";
import { toast } from "react-toastify";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const { dispatch } = useContext(AuthContext);
  const paperStyle = { padding: 20, height: "70vh", width: 280, margin: "20px auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await authenService.googleLogin(result.user.accessToken);
      // window.localStorage.setItem("authenticate", "true");
      const user = await authenService.getCurrentUser();
      dispatch({ type: "LOGIN", payload: user.jti });
      // dispatch({ type: "LOGIN_SUCCESS", payload: user.jti });
      toast.success("Login Success.");
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err?.response?.data });
      toast.error("Login Fail");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            placeholder="Enter email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" /> */}
          {error && <span style={{ color: "red" }}>Wrong email password</span>}
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
            Sign in
          </Button>
        </form>
        <Typography style={{ textAlign: "center" }}>or</Typography>
        <Button color="primary" variant="contained" style={btnstyle} fullWidth>
          <FcGoogle className="ms-4" style={{ marginLeft: "10px" }} />
          <div className="ml-4">
            <p className="font-bold text-sm md:text-base text-grey-darker me-4" onClick={GoogleLogin}>
              Sign in with Google
            </p>
          </div>
        </Button>
        <Typography>
          {" "}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
