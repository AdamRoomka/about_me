import React from "react";
import "../../css/admin.css";

function CurrentUser({ currentUser, name, email, role, userId, changePassword, deleteUser }) {
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
            <button onClick={(e) => changePassword(e, userId)}>Change password</button>
            <button onClick={(e) => deleteUser(e, userId)}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
}

export default CurrentUser;
