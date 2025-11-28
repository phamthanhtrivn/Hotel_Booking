import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
        className={`h-screen overflow-y-auto hide-scrollbar ${className}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
