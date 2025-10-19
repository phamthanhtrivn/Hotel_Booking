import { Facebook, Instagram, Youtube, MapPin, Phone, Mail,Clock,LocateFixed } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E2A38] text-[#FFFFFF] py-5 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">

        <div className="col-span-2">
          <h3 className="text-lg mb-3">Bản đồ</h3>
          <div className="overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.85816909105!2d106.68427047451765!3d10.822164158349457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1760798549315!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí khách sạn"
            ></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-3">Liên kết</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="/"  className="hover:text-[#E5C97B]">Trang chủ</a></li>
            <li><a href="/facilities" className="hover:text-[#E5C97B]">Cơ sở vật chất</a></li>
            <li><a href="/about" className="hover:text-[#E5C97B]">Về chúng tôi</a></li>
            <li><a href="/contact" className="hover:text-[#E5C97B]">Liên hệ</a></li>
          </ul>
        </div>



        <div>
          <h3 className="text-lg mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={22}  className="text-[#E5C97B]"/>
              (028) 3894 0390
            </li>
            <li className="flex items-center gap-2">
              <Mail size={22}  className="text-[#E5C97B]"/>
              contact@iuh.edu.vn
            </li>
            <li className="flex items-center gap-2">
              <LocateFixed size={30} className="text-[#E5C97B]"/>
              12 Nguyễn Văn Bảo, P.4, Q. Gò Vấp, TP.HCM
            </li>
            <li className="flex items-center gap-2">
              <Clock size={30} className="text-[#E5C97B]"/>
              Giờ làm việc: Thứ 2 – Thứ 6, 7:30 – 17:00
            </li>
          </ul>
        </div>



        <div>
          <h3 className="text-lg text-white mb-3">Mạng xã hội</h3>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Facebook />
              <sapn>FaceBook</sapn>
            </li>
            <li className="flex items-center gap-2">
              <Instagram />
              <span>Instagram</span>
            </li>
            <li className="flex items-center gap-2">
              <Youtube />
              <span>YouTube</span>
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-gray-700 mt-5 pt-2 text-center text-sm text-gray-400">
        © 2024 All rights 
      </div>
    </footer>
  );
};

export default Footer;
