import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";

export default function BedSelector({ allBeds, value, onChange }) {
  const [selected, setSelected] = useState([]);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    if (value && Array.isArray(value)) {
      const selectedIds = value.map((v) => v.maGiuong);
      setSelected(selectedIds);

      const newAmounts = {};
      value.forEach((v) => (newAmounts[v.maGiuong] = v.soGiuong));
      setAmounts(newAmounts);
    } else {
      setSelected([]);
      setAmounts({});
    }
  }, [value]);

  const handleSelectChange = (newList) => {
    setSelected(newList);
    const newAmounts = { ...amounts };
    Object.keys(newAmounts).forEach((id) => {
      if (!newList.includes(id)) {
        delete newAmounts[id];
      }
    });
    setAmounts(newAmounts);

    const updated = newList.map((id) => ({
      maGiuong: id,
      soGiuong: newAmounts[id] || 1,
    }));

    onChange(updated);
  };

  const handleAmountChange = (id, amount) => {
    const num = amount === "" ? 1 : Math.max(1, Number(amount)); // ✅ Đảm bảo ít nhất là 1

    const newAmounts = { ...amounts, [id]: num };
    setAmounts(newAmounts);

    const updated = selected.map((bedId) => ({
      maGiuong: bedId,
      soGiuong: newAmounts[bedId] || 1,
    }));

    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <MultiSelect values={selected} onValuesChange={handleSelectChange}>
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue placeholder="Chọn loại giường" />
        </MultiSelectTrigger>

        <MultiSelectContent>
          <MultiSelectGroup>
            {allBeds.map((item) => (
              <MultiSelectItem key={item.maGiuong} value={item.maGiuong}>
                {item.tenGiuong}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>

      {/* Nhập số lượng giường */}
      {selected.length > 0 && (
        <div className="border pl-2 rounded-md">
          {selected.map((id) => {
            const bed = allBeds.find((b) => b.maGiuong === id);
            return (
              <div key={id} className="flex items-center justify-between">
                <span className="text-sm">{bed?.tenGiuong}</span>
                <Input
                  type="number"
                  className="w-20 border-0"
                  min={1}
                  value={amounts[id] || 1}
                  onChange={(e) => handleAmountChange(id, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
