import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { resourceContext } from "../../hooks/useResource";
import httpRequestStatus from "../../utils/httpRequestStatus";

const Pagination = () => {
  const { state, fetchNextPage } = useContext(resourceContext);
  const { page, fetchNextPageRequest } = state;
  const isLoading = fetchNextPageRequest.status === httpRequestStatus.pending;

  if (!page || page.number >= page.totalPages - 1) return null;

  return (
    <div style={{ minHeight: "140px" }}>
      <Button
        block
        variant="primary"
        onClick={() => {
          fetchNextPage();
        }}
        disabled={isLoading}
      >
        {isLoading ? "Caricando..." : "Carica altri"}
      </Button>
    </div>
  );
};

export default Pagination;
