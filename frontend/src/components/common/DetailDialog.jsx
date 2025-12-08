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
          <div key={f.key}>
            <strong>{f.label}: </strong>
            {typeof f.render === "function" ? (
              f.render(data ?? {})
            ) : f.key === "hinhAnh" ? (
              Array.isArray(data?.hinhAnh) && data.hinhAnh.length > 0 ? (
                <div className="flex gap-2 flex-wrap mt-1">
                  {data.hinhAnh.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-40 h-30 rounded"
                      alt=""
                    />
                  ))}
                </div>
              ) : (
                "—"
              )
            ) : data?.[f.key] != null && data[f.key] !== "" ? (
              data[f.key]
            ) : (
              "—"
            )}
          </div>
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
