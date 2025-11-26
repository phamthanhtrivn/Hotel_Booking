import { Button } from "@/components/ui/button";
import { Eye, PencilLine, Trash2 } from "lucide-react";

const ActionButtons = ({ onView, onEdit, onDelete, canDelete }) => {
  return (
    <div className="space-x-2">
      {onView && (
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          className="text-blue-500 cursor-pointer"
        >
          <Eye />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="text-yellow-500 cursor-pointer"
        >
          <PencilLine />
        </Button>
      )}

      {onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={!canDelete}
          className="text-red-500 cursor-pointer"
        >
          <Trash2 />
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
