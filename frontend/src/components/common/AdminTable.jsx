import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatVND } from "@/helpers/currencyFormatter";

const AdminTable = ({ columns, data, renderActions }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id || index}>
            {columns.map((col) => (
              <TableCell key={col.key} className="max-w-xs truncate">
                {typeof col.render === "function"
                  ? col.render(item)
                  : col.key === "hinhAnh" ? <img src={item[col.key]?.[0]} className="w-20 h-15" alt="hình ảnh phòng" />
                  : col.key === "gia" ? formatVND(item[col.key])
                  : col.key === "dienTich" ?  item[col.key] + " m²"
                  : item[col.key]}
              </TableCell>
            ))}

            <TableCell className="text-right">{renderActions && renderActions(item)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
