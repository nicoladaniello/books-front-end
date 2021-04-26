import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ page, isLoading, onLoadMore }) => {
  const isLastPage = page && page.number >= page.totalPages - 1;

  return (
    <div className="no-print" style={{ minHeight: "140px" }}>
      {!!page?.number && !isLastPage && (
        <Button
          block
          variant="primary"
          onClick={() => onLoadMore()}
          disabled={isLoading}
        >
          {isLoading ? "Caricando..." : "Carica altri"}
        </Button>
      )}
    </div>
  );
};

export default Pagination;
