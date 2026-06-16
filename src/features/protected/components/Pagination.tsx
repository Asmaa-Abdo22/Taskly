interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  loading?: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  loading = false,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1 || loading}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer h-8 w-8 border border-slate-300/40 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ‹
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          disabled={loading}
          onClick={() => onPageChange(page)}
          className={`cursor-pointer h-8 w-8 border border-slate-300/40 text-body-md disabled:cursor-not-allowed disabled:opacity-50 ${
            page === currentPage
              ? "bg-primaryy text-white"
              : "bg-white text-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages || loading}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer h-8 w-8 border border-slate-300/40 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;