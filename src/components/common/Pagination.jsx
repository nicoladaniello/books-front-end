import React, { useContext } from "react";
import { Pagination as BSPagination } from "react-bootstrap";
import { resourceContext } from "../../hooks/useResource";

const Pagination = () => {
  const {
    state: { page },
  } = useContext(resourceContext);

  if (!page || page.totalPages < 2) return null;

  return (
    <BSPagination>
      {page.number !== 0 && <BSPagination.First />}
      {page.number !== 0 && <BSPagination.Prev />}
      {new Array(page.totalPages).fill(undefined).map((val, idx) => (
        <BSPagination.Item
          key={idx}
          active={idx === page.number}
          onClick={() => console.log(idx)}
        >
          {idx + 1}
        </BSPagination.Item>
      ))}
      {page.number !== page.totalPages - 1 && <BSPagination.Next />}
      {page.number !== page.totalPages - 1 && <BSPagination.Last />}
    </BSPagination>
  );
};

export default Pagination;
