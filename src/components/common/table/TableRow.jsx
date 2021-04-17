import React from "react";
import TableRowActions from "./TableRowActions";

const TableRow = ({ data, schema, actions, ...props }) => {
  const cols = getData(data, schema);

  return (
    <tr {...props}>
      {Object.keys(cols).map((row) => (
        <td key={row}>{cols[row]}</td>
      ))}
      <TableRowActions data={data} actions={actions} />
    </tr>
  );
};

function getData(data, schema) {
  return Object.assign(
    {},
    ...Object.keys(schema.properties).map((key) => {
      // WriteOnly fields won't appear in the table
      if (schema.properties[key].writeOnly) return null;

      if (schema.properties[key].type !== "object")
        return { [key]: data ? data[key] : null };

      // Handle nested object
      if (schema.properties[key].properties) {
        return getData(data[key], schema.properties[key]);
      }

      // Handle nested object with $ref
      if (schema.properties[key]["$ref"]) {
        const fields = schema.properties[key]["$ref"].split("/");
        fields.shift(); // removes hash (#)
        const nestedSchema = fields.reduce((acc, curr) => acc[curr], schema);

        return getData(data[key], nestedSchema);
      }
      return null;
    })
  );
}

export default TableRow;
