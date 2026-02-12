import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <button onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;