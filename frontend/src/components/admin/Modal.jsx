import React from "react";
import { Button } from "../ui/button";

export default function Modal({ onClose, title, children }) {
  return (
    <div
      className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-[#2b3a4b] rounded-xl p-6 w-full sm:w-3/4 md:w-1/2 lg:w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <h1 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
            {title}
          </h1>
          <Button
            onClick={onClose}
            className="absolute right-0 top-0 bg-gray-500 hover:bg-gray-600"
          >
            X
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
