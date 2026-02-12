import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

function ExpenseList({ user }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users", user.uid, "expenses"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "expenses", id));
  };

  return (
    <div>
      <h3>Your Expenses</h3>

      {expenses.map(expense => (
        <div key={expense.id}>
          <span>{expense.category}</span>
          <span> - {expense.amount} грн</span>
          <button onClick={() => handleDelete(expense.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
