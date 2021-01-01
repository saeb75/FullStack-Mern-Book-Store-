import React, { useState } from "react";

const CheckBox = ({ Categories, handleFilter }) => {
  const [checked, setChecked] = useState([]);

  const HandleToggle = (id) => () => {
    const newCheckedItem = [...checked];
    const newCheckedItemIndex = checked.indexOf(id);

    if (newCheckedItemIndex < 0) {
      newCheckedItem.push(id);
    } else {
      newCheckedItem.splice(newCheckedItemIndex, 1);
    }
    handleFilter(newCheckedItem, "catogory");
    setChecked(newCheckedItem);
  };

  return (
    <>
      {Categories.map((item, i) => {
        return (
          <li key={i} className="list-unstyled">
            <input
              onChange={HandleToggle(item._id)}
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label">{item.name}</label>
          </li>
        );
      })}
    </>
  );
};

export default CheckBox;
