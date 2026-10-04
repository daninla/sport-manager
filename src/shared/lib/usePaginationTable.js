import { useState } from 'react';

export function usePaginationTable(data, totalPages = 10) {
  const [rowsPerPage, setRowsPerPage] = useState(totalPages);
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    handlePageChange(null, 1);
  };
  return {
    currentData,
    page,
    rowsPerPage,
    handlePageChange,
    handleChangeRowsPerPage,
  };
}
