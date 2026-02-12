import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

function Dashboard({ user }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h2>Welcome {user.displayName}</h2>
      <button onClick={handleLogout}>Logout</button>

      <AddExpense user={user} />
      <ExpenseList user={user} />
    </div>
  );
}

export default Dashboard;
