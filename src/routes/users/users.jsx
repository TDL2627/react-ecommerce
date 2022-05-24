import { useState, useEffect } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, query, getDocs } from "firebase/firestore";
import Search from "../../components/search/search";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    /* TODO we need to show loading spinner when data is waiting */

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, "users"));

      getDocs(usersQuery).then((snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() })));
      });
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <Search />
      {users.map((users, key) => (
        <div key={key}>
          <h1>{users.displayName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Users;
