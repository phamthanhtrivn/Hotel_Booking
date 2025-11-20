import React from "react";

export default function PanigationComponent({ setPage, page, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  return (
    <div className="flex justify-between items-center p-4 rounded">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
        className="px-3 py-1 bg-gray-600 disabled:opacity-50"
      >
        Prev
      </button>
      <div>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1  
            ${
              p === page
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-700"
            }
          `}
          >
            {p + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-3 py-1 bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
