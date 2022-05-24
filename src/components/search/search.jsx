import React from "react";
import Users from "../../routes/users/users";

const Search = ({ filteredUsers }) => {
  const filtered = filteredUsers.map((user) => (
    <Users key={user.id} user={user} />
  ));

  return (
    <div>
      <input type="search" placeholder="Search here" className="search" />
      <div className="searchhijack">
        <div className="searchEntry">{filtered}</div>
      </div>
    </div>
  );
};
export default Search;
