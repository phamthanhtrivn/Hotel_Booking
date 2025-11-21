import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const AdminPagination = ({ currentPage, totalPages, onChange }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onChange(currentPage - 1)}
            className="cursor-pointer"
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
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AdminPagination;
