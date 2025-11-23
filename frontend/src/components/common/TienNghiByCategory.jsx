import React from 'react';
import { getStyledIcon } from '@/helpers/iconMapper';

const TienNghiByCategory = ({ tienNghiList }) => {
  const groupedByCategory = tienNghiList.reduce((acc, tienNghi) => {
    const category = tienNghi.loaiTienNghi;
    if (!acc[category]) acc[category] = [];
    acc[category].push(tienNghi);
    return acc;
  }, {});

  const categories = Object.entries(groupedByCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map(([category, items]) => (
        <div key={category}>
          <h3 className="text-[17px] font-bo mb-3 text-white pb-2">
            {category}
          </h3>
          <div className="space-y-3">
            {items.map((tienNghi) => (
              <div key={tienNghi.maTienNghi} className="flex items-center space-x-3">
                {getStyledIcon(tienNghi.icon, {
                  size: "w-5 h-5",
                  color: "text-[var(--color-primary)]"
                })}
                <span className="text-sm text-white">{tienNghi.tenTienNghi}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TienNghiByCategory;
