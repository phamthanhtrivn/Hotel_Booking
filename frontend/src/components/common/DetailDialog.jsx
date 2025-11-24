import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DetailDialog = ({ open, onClose, data, fields }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Chi tiết</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        {fields.map((f) => (
          <p key={f.key}>
            <strong>{f.label}: </strong>
            {typeof f.render === "function"
              ? f.render(data ?? {})
              : data?.[f.key] ?? "—"}
          </p>
        ))}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose} className="cursor-pointer">
          Đóng
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DetailDialog;
