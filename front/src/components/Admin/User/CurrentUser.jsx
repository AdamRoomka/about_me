import React from "react";
import "../../css/admin.css";

function CurrentUser({ currentUser, name, email, role, userId, deleteUser }) {
  return (
    <>
      {currentUser.email === email ? (
        ""
      ) : (
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
          <td>
            <button disabled>Change password</button>
            <button onClick={(e) => deleteUser(e, userId)}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
}

export default CurrentUser;
