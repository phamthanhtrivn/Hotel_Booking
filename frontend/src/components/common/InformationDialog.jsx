import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function InformationDialog({
  open,
  onClose,
  title,
  className,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`overflow-y-auto hide-scrollbar ${className}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
