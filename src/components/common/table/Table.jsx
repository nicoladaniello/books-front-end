import React from "react";
import { Table as BSTable } from "react-bootstrap";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

/**
 * An HTML table to display data.
 *
 * The table renders the header and data via a json-schema and a list of entities.
 *
 * Nested objects in the schema are flattened to root level.
 */
const Table = ({
  schema,
  ids,
  entities,
  page,
  isLoading,
  actions,
  sortedBy,
}) => {
  /**
   * Requests a page reload with the new sorting order.
   *
   * @param {string} sortBy - The sorting string in the form `${field},${order}`
   */
  const handleSort = (sortBy) => {
    // load({ ...page.state.request, sort: sortBy });
  };

  return (
    <BSTable hover borderless className="small align-middle">
      <TableHead schema={schema} sortedBy={sortedBy} onSort={handleSort} />
      <TableBody
        schema={schema}
        ids={ids}
        entities={entities}
        page={page}
        isLoading={isLoading}
        actions={actions}
      />
    </BSTable>
  );
};

export default Table;
