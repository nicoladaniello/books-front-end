import { PropTypes } from "prop-types";
import React from "react";
import Spinner from "../Spinner";
import TableRow from "./TableRow";

const TableBody = ({
  ids,
  entities,
  page,
  schema,
  actions,
  isLoading,
  ...props
}) => {
  const isEmpty = !isLoading && !ids?.length;
  const hasResults = !isLoading && !isEmpty;

  return (
    <tbody {...props}>
      <tr className="hover-none">
        <td colSpan="100">
          <h6 className="text-muted small mb-0">
            {schema.title} ({page?.totalElements || 0})
          </h6>
        </td>
      </tr>

      {isLoading && (
        <tr className="hover-none">
          <td colSpan="100" className="text-center my-5">
            <Spinner />
          </td>
        </tr>
      )}
      {isEmpty && (
        <tr className="hover-none">
          <td colSpan="100" className="text-center">
            <p className="text-muted font-weight-bold my-5">
              Nessun risultato.
            </p>
          </td>
        </tr>
      )}
      {hasResults &&
        ids.map((id) => (
          <TableRow
            {...entities[id].tableProps}
            key={id}
            schema={schema}
            data={entities[id]}
            actions={actions}
          />
        ))}
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
