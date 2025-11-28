// utils/iconMapper.js
import { 
  FaWifi, 
  FaTv, 
  FaCoffee,
  FaSnowflake,
  FaBath,
  FaUmbrellaBeach,
  FaTable,
  FaBell,
  FaWind,
  FaGlassMartini,
  FaHotTub,
  FaCouch,
  FaShieldAlt,
  FaUtensils,
  FaShower,
  FaTshirt,
  FaPhone,
  FaTemperatureLow,
  FaFan,
  FaVolumeMute
} from 'react-icons/fa';


import { 
  MdBalcony,
  MdOutlineBathtub,
  MdKitchen,
  MdLocalLaundryService,
  MdPhone,
  MdAcUnit,
} from 'react-icons/md';

import { 
  GiHanger,
} from 'react-icons/gi';

import { PiHairDryer } from "react-icons/pi";

import { CgSmartHomeRefrigerator } from "react-icons/cg";


import { 
  BiCabinet,
  BiFridge,
} from 'react-icons/bi';
import { LucideAirVent } from 'lucide-react';

export const iconMap = {
  // Mạng Internet và điện thoại
  'wifi': FaWifi,
  'phone': FaPhone,
  
  // Hình ảnh/âm thanh
  'tv': FaTv,
  
  // Đồ điện tử
  'snowflake': LucideAirVent,
  'wind': FaWind,
  'fridge': CgSmartHomeRefrigerator,
  'hair-dryer': PiHairDryer,
  'ac-unit': MdAcUnit,
  
  // Nhà tắm
  'bath-tub': FaBath,
  'jacuzzi': FaBath,
  'shower': FaShower,
  'bathtub': MdOutlineBathtub,
  
  // Khu vực ngoài trời
  'balcony': MdBalcony,
  
  // Đồ nội thất
  'table': FaTable,
  'sofa': FaCouch,
  'shield': FaShieldAlt,
  'utensils': FaUtensils,
  'shirt': FaTshirt,
  'hang': GiHanger,
  'wardrobe': BiCabinet,
  'closet': BiCabinet,
  
  // Khác
  'coffee': FaCoffee,
  'bell': FaBell,
  'martini': FaGlassMartini,
  'mute': FaVolumeMute,
  'kitchen': MdKitchen,
  'laundry': MdLocalLaundryService
};

export const mainAmenityCodes = ['TN1', 'TN2', 'TN4', 'TN5', 'TN6', 'TN10', 'TN12', 'TN15', 'TN18'];

export const getIconComponent = (iconName, className = "w-5 h-5 text-gray-600") => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    console.warn(`Icon không tồn tại: ${iconName}`);
    return <div className={`${className} bg-gray-200 rounded`}></div>;
  }
  
  return <IconComponent className={className} />;
};

// Utility function để lấy icon với màu sắc và kích thước tùy chỉnh
export const getStyledIcon = (iconName, options = {}) => {
  const {
    size = "w-5 h-5",
    color = "text-gray-600",
    className = ""
  } = options;
  
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent className={`${size} ${color} ${className}`} />;
};