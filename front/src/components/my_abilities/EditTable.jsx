import React from "react";
import { useState } from "react";

function EditTable({
  category,
  date,
  name,
  number,
  subId,
  onCancel,
  onSubmit,
  defaultData
}) {
  var data = date.substring(0, 10);

  const [sname, setName] = useState(defaultData.name);
  const [scategory, setCategory] = useState(defaultData.category);
  const [sdate, setDate] = useState(defaultData.date);
  const editFlows = () => {
    let tabSet = {
        name: sname,
        category: scategory,
        date: sdate
    };
    onSubmit(subId, tabSet, defaultData)
}
  return (
    <tr>
      <td>{number}</td>
      <td><input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} /></td>
      <td><input type="text" defaultValue={category} onChange={(e) => setCategory(e.target.value)} /></td>
      <td><input type="date" defaultValue={data} onChange={(e) => setDate(e.target.value)} /></td>
      <td>
        <button onClick={() => editFlows()}>submit</button>
        <button onClick={() => onCancel()}>cancel</button>
      </td>
    </tr>
  );
}

export default EditTable;
