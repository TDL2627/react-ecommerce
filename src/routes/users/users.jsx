import { useState, useEffect } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, query, getDocs } from "firebase/firestore";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, SetSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, "users"));

      getDocs(usersQuery).then((snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() })));
      });
    } catch (err) {
      console.log(err);
    }
  };

  // search

  const Search = (e) => {
    e.preventDefault();

    setUsers(
      users.filter((users) =>
        users.displayName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div className="ml-10">
      <h1>Users</h1>
      <form
        onSubmit={(e) => {
          Search(e);
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(e) => {
            SetSearch(e.target.value);
          }}
        />
      </form>

      {users
        .filter((user) => {
          if (search === "") {
            return user;
          } else if (
            user.displayName.toLowerCase().includes(search.toLowerCase())
          ) {
            return user;
          }
        })

        .map((user, key) => (
          <div key={key}>
            <h1>{user.displayName}</h1>
          </div>
        ))}
    </div>
  );
};

export default Users;
