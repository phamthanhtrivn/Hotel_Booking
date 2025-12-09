import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const AdminPagination = ({ currentPage, totalPages, onChange}) => {
  if (totalPages <= 1) return null;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onChange(currentPage - 1)}
            className={`hover:cursor-pointer transition-opacity ${
              !canGoPrevious
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:opacity-80"
            }`}
            aria-disabled={!canGoPrevious}
          />
        </PaginationItem>

        <span className="mx-3">
          {currentPage} / {totalPages}
        </span>

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onChange(currentPage + 1)
            }
            className={`hover:cursor-pointer transition-opacity ${
              !canGoNext
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:opacity-80"
            }`}
            aria-disabled={!canGoNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AdminPagination;
