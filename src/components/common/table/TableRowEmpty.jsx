import React from "react";

const TableRowEmpty = () => {
  return (
    <tr className="hover-none">
      <td colSpan="100" className="text-center">
        <p className="text-muted font-weight-bold my-5">Nessun risultato.</p>
      </td>
    </tr>
  );
};

export default TableRowEmpty;
