import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EditCreateDialog = ({ open, onClose, title, children, onSubmit }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button onClick={onSubmit} className="cursor-pointer">
          Lưu
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default EditCreateDialog;
