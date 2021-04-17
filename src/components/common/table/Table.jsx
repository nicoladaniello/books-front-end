import { PropTypes } from "prop-types";
import React, { useContext } from "react";
import { Table as BSTable } from "react-bootstrap";
import { resourceContext } from "../../../hooks/useResource";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

/**
 * An HTML table to display data.
 *
 * The table renders the header and data via a json-schema and a list of entities.
 *
 * Nested objects in the schema are flattened to root level.
 */
const Table = ({ filters, actions, sortedBy }) => {
  const {
    schema,
    state: { ids, entities, page },
  } = useContext(resourceContext);
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
        filters={filters}
        actions={actions}
      />
    </BSTable>
  );
};

Table.propTypes = {
  actions: PropTypes.array,
};

export default Table;
