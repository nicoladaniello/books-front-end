import { Link } from "gatsby";
import React, { useEffect } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import routes from "../../settings/routes";
import Icon from "../common/Icon";
import Spinner from "../common/Spinner";
import { loadEntities } from "../companies/actions";

/**
 *
 */
const UserList = ({ onSelect }) => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.companies);
  const dispatch = useDispatch();

  const { ids, entities, error, isLoading } = state;

  /**
   * Initial load.
   */
  useEffect(() => dispatch(loadEntities()), [dispatch]);

  /**
   * UI
   */
  return (
    <>
      {!!error && <Alert variant="danger">{error.message}</Alert>}
      {isLoading && <Spinner className="my-5" />}
      {!!ids && (
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
      <Button block variant="primary" as={Link} to={routes.register}>
        {t("modules.company.insert")}
      </Button>
    </>
  );
};

export default UserList;
