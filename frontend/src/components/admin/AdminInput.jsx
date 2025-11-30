import { useState, useEffect } from "react";
import { Input } from "../ui/input";

export default function AdminInput({
  value,
  onChange,
  placeholder,
  label = "",
  type = "text", // text | number | currency | area | datetime-local
  min,
  max,
  validator,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (type === "number" || type === "currency" || type === "area") {
      setDisplayValue(value != null ? String(value) : "");
    } else {
      setDisplayValue(value || "");
    }
  }, [value, type]);

  const handleChange = (e) => {
    let val = e.target.value;

    if (validator && !validator(val)) return;

    if (type === "number" || type === "currency" || type === "area") {
      let numStr = val.replace(/[^\d]/g, "");
      if (numStr === "") {
        onChange(null);
        setDisplayValue("");
        return;
      }
      let num = Number(numStr);
      if (isNaN(num)) return;
      if (min !== undefined && num < min) num = min;
      if (max !== undefined && num > max) num = max;

      onChange(num);
      setDisplayValue(num);
    } else {
      // Với datetime-local hoặc text
      onChange(val);
      setDisplayValue(val);
    }
  };

  const suffix = type === "currency" ? ".000₫" : type === "area" ? " m²" : "";

  return (
    <div className={`flex flex-col text-left relative ${className}`}>
      {label && (
        <span className="text-[11px] text-gray-500 font-medium absolute left-3">
          {label}
        </span>
      )}
      <div className="relative">
        <Input
          type={type} // thêm type ở đây
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`pt-[17px] font-[500] ${suffix ? "pr-13" : ""}`}
        />
        {suffix && (
          <span className="absolute right-3 top-3.5 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
