import { Link } from "gatsby";
import React, { useEffect } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import useResource from "../../hooks/useResource";
import routes from "../../settings/routes";
import httpRequestStatus from '../../utils/httpRequestStatus';
import Icon from "../common/Icon";
import Spinner from "../common/Spinner";

/**
 *
 */
const UserList = ({ onSelect }) => {
  const { state, fetchAll } = useResource("companies");
  const { status, entities, ids, error } = state;

  /**
   * Initial fetch.
   */
  useEffect(() => {
    if (status === httpRequestStatus.idle) fetchAll();
  }, [status, fetchAll]);

  /**
   * UI
   */
  return (
    <>
      {!!error && <Alert variant="danger">{error.message}</Alert>}
      {status === httpRequestStatus.pending ? (
        <Spinner className="my-5" />
      ) : (
        <ListGroup className="text-left mb-3">
          {ids.map((id) => (
            <ListGroup.Item
              key={id}
              action
              className="d-flex justify-content-between align-items-center"
              onClick={() => onSelect(entities[id])}
            >
              {entities[id].name}
              <span>
                <Icon icon="chevron-right" />
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Button block as={Link} to={routes.register} variant="primary">
        Aggiungi un'azienda
      </Button>
    </>
  );
};

export default UserList;
