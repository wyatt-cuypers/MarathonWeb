import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Screens/Login";
import RunningStats from "./Screens/RunningStats";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) return null;
  return isAuthenticated ? <RunningStats /> : <Login />;
}

export default App;
