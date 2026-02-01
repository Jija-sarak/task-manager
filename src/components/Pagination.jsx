function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <>
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span style={{ margin: "0 8px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </>
  );
}

export default Pagination;
