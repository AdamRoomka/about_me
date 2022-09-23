import React from "react";

// my_abilities
function Table({category, date, name, number, deleteItems, subId, editItems}) {
  var data = date.substring(0, 10)
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{data}</td>
      <td>
        <button onClick={(e) => editItems(e, subId)}>edit</button>
        <button onClick={(e) => deleteItems(e, subId)}>delete</button>
      </td>
    </tr>
  );
}

export default Table;
