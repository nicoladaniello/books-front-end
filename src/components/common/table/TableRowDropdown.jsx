import React from "react";
import { Dropdown } from "react-bootstrap";
import Icon from "../Icon";
import classnames from "classnames";

const TableRowDropdown = ({ data, actions }) => {
  return (
    <td>
      <Dropdown size="sm">
        <Dropdown.Toggle
          className="text-dark no-caret"
          style={{ lineHeight: 0 }}
          size="sm"
          variant="link"
        >
          <Icon icon="ellipsis-h" />
        </Dropdown.Toggle>

        {actions && (
          <Dropdown.Menu
            className="d-flex text-center p-1"
            style={{ minWidth: "auto" }}
          >
            {actions.map(
              (
                { label, onClick, props: { className, ...otherProps } = {} },
                idx
              ) => (
                <Dropdown.Item
                  {...otherProps}
                  className={classnames(className, "px-2")}
                  key={idx}
                  onClick={() => onClick(data)}
                >
                  {label}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </td>
  );
};

export default TableRowDropdown;
