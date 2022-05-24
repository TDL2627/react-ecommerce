import { useState, useEffect } from "react";
import { db } from "../../utils/firebase/firebase.utils";

import { collection, query, getDocs } from "firebase/firestore";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    /* TODO we need to show loading spinner when data is waiting */

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, "users"));
      // get all docs based on query
      getDocs(usersQuery).then((snapshot) => {
        // set the athletes to the snapshot
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
      <input type="search" placeholder="Search here" />
      {users.map((users, key) => (
        <div key={key}>
          <h1>{users.displayName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Users;
