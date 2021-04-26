import React from "react";
import NumberFormat from "react-number-format";
import TableRowActions from "./TableRowActions";

const TableRow = ({ data, schema, actions, ...props }) => {
  const cols = getData(data, schema);

  return (
    <tr {...props}>
      {Object.keys(cols).map((row) => (
        <td key={row}>
          {cols[row]?.format === "currency" ? (
            <NumberFormat
              displayType="text"
              thousandSeparator={process.env.LOCAL_CURRENCY_THOUSAND_SEPARATOR}
              decimalSeparator={process.env.LOCAL_CURRENCY_DECIMAL_SEPARATOR}
              prefix={process.env.LOCAL_CURRENCY_SYMBOL}
              value={cols[row].value}
            />
          ) : (
            cols[row]?.value || null
          )}
        </td>
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

      if (schema.properties[key].type !== "object") {
        const format = schema.properties[key].format;
        return { [key]: data ? { value: data[key], format } : null };
      }

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
