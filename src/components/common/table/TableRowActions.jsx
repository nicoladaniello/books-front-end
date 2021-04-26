import React from "react";
import { Button } from "react-bootstrap";

const TableRowActions = ({ data, actions }) => {
  return !actions ? null : (
    <td className="no-print">
      <div className="table-actions" style={{ whiteSpace: "nowrap" }}>
        {actions.map(({ label, onClick }, idx) => (
          <Button
            key={idx}
            variant="link"
            className="p-0 pr-2"
            onClick={() => onClick(data)}
          >
            {label}
          </Button>
        ))}
      </div>
    </td>
  );
};

export default TableRowActions;
