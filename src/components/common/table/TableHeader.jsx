import React from "react";
import Icon from "../Icon";

const TableHeader = ({ label, sorted, desc, onClick }) => {
  return (
    <th scope="col">
      <button className="btn p-0" onClick={onClick}>
        {label} {sorted && <Icon icon={desc ? "caret-down" : "caret-up"} />}
      </button>
    </th>
  );
};

export default TableHeader;
