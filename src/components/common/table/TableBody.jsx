import { PropTypes } from "prop-types";
import React from "react";
import TableRow from "./TableRow";
import TableRowEmpty from "./TableRowEmpty";

const TableBody = ({ ids, entities, page, schema, actions, ...props }) => {
  return (
    <tbody {...props}>
      <tr className="hover-none">
        <td colSpan="100">
          <h6 className="text-muted small mb-0">
            {schema.title} ({page?.totalElements || 0})
          </h6>
        </td>
      </tr>
      {ids && ids.length ? (
        ids.map((id) => (
          <TableRow
            {...entities[id].tableProps}
            key={id}
            schema={schema}
            data={entities[id]}
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
