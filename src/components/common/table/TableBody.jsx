import { PropTypes } from "prop-types";
import React from "react";
import TableRow from "./TableRow";
import TableRowEmpty from "./TableRowEmpty";

const TableBody = ({ ids, entities, filters, schema, actions }) => {
  return (
    <tbody>
      {ids && ids.length ? (
        ids.map((id) => (
          <TableRow
            {...entities[id].tableProps}
            key={id}
            schema={schema}
            data={entities[id]}
            filters={filters}
            actions={actions}
          />
        ))
      ) : (
        <TableRowEmpty />
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.array,
  filters: PropTypes.array,
  actions: PropTypes.array,
};

TableBody.defaultProps = {
  data: [],
  filters: [],
};

export default TableBody;
