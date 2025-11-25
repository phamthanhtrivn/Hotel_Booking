import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function AdminSelect({
  value,
  onChange,
  placeholder = "Chọn...",
  options = [],
  labelKey = "label",
  valueKey = "value",
  label = "", // ← label nhỏ phía trên (Loại phòng, Tầng, Trạng thái...)
  className = "",
}) {
  const selected = options.find((opt) =>
    typeof opt === "string" ? opt === value : opt[valueKey] == value
  );

  const selectedLabel = selected
    ? typeof selected === "string"
      ? selected
      : selected[labelKey]
    : placeholder;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <div className="flex flex-col gap-0.5 text-left w-full">
          {label && (
            <label className="text-[11px] text-gray-500 font-medium">
              {label}
            </label>
          )}
          <p className="font-medium truncate">{selectedLabel}</p>
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((item, i) => {
            const v = typeof item === "string" ? item : item[valueKey];
            const l = typeof item === "string" ? item : item[labelKey];

            return (
              <SelectItem key={i} value={v}>
                {l}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
