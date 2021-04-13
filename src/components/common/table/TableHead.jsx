import React from "react";
import TableHeader from "./TableHeader";

const TableHead = ({ schema, sortedBy, onSort }) => {
  const headers = getHeaders(schema);

  /**
   * Handles sorting logic when an header is clicked.
   * Calls props.onSort with a string in the form "${header},${order}".
   *
   * @param {string} header - The header that was clicked.
   */
  const handleSort = (header) => {
    if (!onSort) return;

    const [prev, order] = sortedBy ? sortedBy.split(",") : [];

    // If the value is the same and the order isdescending remove sorting.
    if (prev === header && order === "asc") return onSort();

    const newOrder = !prev ? "desc" : order === "desc" ? "asc" : "desc";
    onSort(header + "," + newOrder);
  };

  return (
    <thead className="border-bottom">
      <tr>
        {Object.keys(headers).map((key) => (
          <TableHeader
            key={key}
            label={headers[key].title}
            sorted={sortedBy?.param === key}
            desc={sortedBy?.desc}
            onClick={() => handleSort(key)}
          />
        ))}
        <th scope="col">&nbsp;</th>
      </tr>
    </thead>
  );
};

function getHeaders(schema) {
  return Object.assign(
    {},
    ...Object.keys(schema.properties).map((key) => {
      // WriteOnly fields won't appear in the table
      if (schema.properties[key].writeOnly) return null;

      if (schema.properties[key].type !== "object")
        return { [key]: schema.properties[key] };

      // Handle nested object
      if (schema.properties[key].properties) {
        return getHeaders(schema.properties[key]);
      }

      if (schema.properties[key]["$ref"]) {
        const fields = schema.properties[key]["$ref"].split("/");
        fields.shift(); // removes hash (#)
        const nestedSchema = fields.reduce((acc, curr) => acc[curr], schema);

        return getHeaders(nestedSchema);
      }
      return null;
    })
  );
}

export default TableHead;
