import { useState } from 'react';

export function usePagination(data, totalPages = 10) {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * totalPages;
  const currentData = data.slice(startIndex, startIndex + totalPages);

  const pageCount = Math.ceil((data.length || 0) / totalPages);

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  return {
    currentData,
    page,
    pageCount,
    handlePageChange,
  };
}
