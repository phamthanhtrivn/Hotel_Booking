"use client";

import { useState } from "react";
import { ChevronRight, Phone } from "lucide-react";

// 🖼️ Import ảnh thủ công từ thư mục src/assets/about/
import baaBaaLogo from "../../assets/about/baa-baa-logo.jpg";
import willPartnersLogo from "../../assets/about/will-partners-logo.jpg";
import ias8Logo from "../../assets/about/ias-8-protection-logo.jpg";
import clayboxLogo from "../../assets/about/claybox-studios-logo.jpg";
import nannyLogo from "../../assets/about/nannys-baby-love-logo.jpg";
import care36Logo from "../../assets/about/36care-logo.jpg";
import thanhXuanLogo from "../../assets/about/thanh-xuan-logo.jpg";
import allyLogo from "../../assets/about/ally-investment-logo.jpg";
import doctorOzLogo from "../../assets/about/doctor-oz-logo.jpg";
import isoqLogo from "../../assets/about/isoq-logo.jpg";
import haiMotLogo from "../../assets/about/hai-mot-logo.jpg";
import dannFoodLogo from "../../assets/about/dann-food-logo.jpg";

import illustration3D from "../../assets/about/hotel.jpg";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("about");

  const stats = [
    { number: "98%", label: "Khách hàng hài lòng với trải nghiệm đặt phòng" },
    { number: "500+", label: "Khách sạn & resort hợp tác trên toàn quốc" },
    { number: "5000+", label: "Lượt đặt phòng thành công mỗi tháng" },
    { number: "1000+", label: "Đánh giá 5 sao từ khách hàng thực tế" },
  ];

  const clients = [
    { name: "Baa Baa", logo: baaBaaLogo },
    { name: "Will & Partners", logo: willPartnersLogo },
    { name: "IAS-8 Protection", logo: ias8Logo },
    { name: "Claybox Studios", logo: clayboxLogo },
    { name: "Nannys Baby Love", logo: nannyLogo },
    { name: "36care", logo: care36Logo },
    { name: "Thanh Xuan", logo: thanhXuanLogo },
    { name: "ALLY Investment", logo: allyLogo },
    { name: "Doctor Oz", logo: doctorOzLogo },
    { name: "ISOQ", logo: isoqLogo },
    { name: "Hai Mot", logo: haiMotLogo },
    { name: "Dann Food", logo: dannFoodLogo },
  ];

  const tabContent = {
    about: (
      <>
        <p className="text-gray-900 leading-relaxed mb-4">
          Khách sạn Twan là một khách sạn đạt chuẩn 5 sao ở khu du lịch Hồ Tràm,
          chuyên phục vụ khách du lịch và hoạt động 24/7. Khách sạn có cơ sở vật
          chất hiện đại và đa dạng dịch vụ đi kèm, mang tới sự tiện lợi tối đa
          cho du khách yên tâm và thoải mái nghỉ dưỡng. Twan có khoảng 100 phòng
          được phân loại một cách kết hợp giữa loại phòng và loại giường. Về
          loại giường bao gồm: Single (giường đơn), Double (giường đôi), King
          (giường siêu lớn), Queen (giường đôi lớn).Cùng với đó là 4 loại phòng:
        </p>
        <p className="text-gray-900 leading-relaxed">
          Phòng Standard (Tiêu chuẩn): Được thiết kế đơn giản nhưng vẫn đảm bảo
          đầy đủ tiện nghi, phòng Standard có diện tích khoảng 20m² với chi phí
          hợp lý.
        </p>
        <p className="text-gray-900 leading-relaxed mt-4">
          Phòng Deluxe (Cao cấp): Với diện tích 30m² và thiết kế tinh tế, phòng
          Deluxe mang lại sự thoải mái và sang trọng hơn.
        </p>
        <p className="text-gray-900 leading-relaxed mt-4">
          Phòng Suite (Hạng sang): Nằm ở những tầng cao, phòng Suite rộng rãi
          với diện tích khoảng 60m², được thiết kế thành hai không gian riêng
          biệt: phòng ngủ với giường siêu lớn (King) và phòng khách riêng để
          tiếp khách hoặc làm việc.
        </p>
        <p className="text-gray-900 leading-relaxed mt-4">
          Phòng Family/Group (Gia đình/Nhóm bạn): Phòng Family/Group rộng khoảng
          40m², được thiết kế dành cho 4–6 khách, phù hợp với gia đình hoặc nhóm
          bạn đi cùng nhau.
        </p>
      </>
    ),
    mission: (
      <p className="text-gray-900 leading-relaxed">
        Hệ thống website được phát triển nhằm quảng bá hình ảnh và nâng cao uy
        tín của khách sạn Twan trên môi trường trực tuyến, đồng thời hỗ trợ
        khách hàng trong việc tìm kiếm và đặt phòng phù hợp, thực hiện thanh
        toán trực tiếp và đánh giá dịch vụ sau khi sử dụng. Bên cạnh đó, hệ
        thống cung cấp cho nhân viên công cụ quản lý phòng, đơn đặt phòng, nội
        dung website, cũng như phản hồi ý kiến khách hàng. Ngoài ra, hệ thống có
        khả năng tự động thống kê doanh thu và gợi ý các phòng được nhiều khách
        hàng quan tâm, góp phần tối ưu hiệu quả kinh doanh.
      </p>
    ),
    responsibility: (
      <p className="text-gray-900 leading-relaxed">
        Chúng tôi có trách nhiệm đảm bảo mọi dự án được thực hiện đúng tiến độ,
        đạt chất lượng cao nhất và mang lại giá trị thực sự cho khách hàng. Sự
        hài lòng của khách hàng là thước đo thành công của chúng tôi.
      </p>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="py-16 bg-gray-100 from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-gray-900 font-semibold text-sm uppercase tracking-wide mb-3">
                GIỚI THIỆU
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Khách sạn TWAN{" "}
              </h1>
              <p className="text-xl text-gray-900 italic mb-8">
                Giải pháp đặt phòng hiệu quả
              </p>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                {["about", "mission", "responsibility"].map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`pb-3 px-1 font-medium transition-colors relative ${
                      activeTab === key
                        ? "text-blue-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {key === "about"
                      ? "Đôi nét về TWAN"
                      : key === "mission"
                      ? "Mục tiêu doanh nghiệp"
                      : "Nhiệm vụ chính"}
                    {activeTab === key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="text-base">{tabContent[activeTab]}</div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={illustration3D}
                alt="3D Illustration"
                width={600}
                height={500}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 shadow shadow-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-blue-900 rounded-2xl p-8 text-center text-gray-100 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-3">
                    {stat.number}
                  </div>
                  <div className="text-base lg:text-lg font-medium whitespace-pre-line leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Values */}
            <div>
              <p className="text-blue-500 font-semibold text-sm uppercase tracking-wide mb-3">
                GIÁ TRỊ
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Giá Trị Của Chúng Tôi
              </h2>
              <p className="text-gray-900 leading-relaxed mb-4">
                Sản phẩm của TWAN được xây dựng với sứ mệnh mang đến trải nghiệm
                đặt phòng tiện lợi, nhanh chóng và đáng tin cậy cho khách hàng
                trong và ngoài nước.
              </p>
              <p className="text-gray-900 leading-relaxed mb-4">
                Chúng tôi kết hợp công nghệ hiện đại, thiết kế thân thiện người
                dùng cùng dịch vụ chăm sóc tận tâm để mỗi chuyến đi của bạn đều
                trọn vẹn ngay từ bước đầu tiên.
              </p>
              <p className="text-gray-900 leading-relaxed mb-6">
                Điểm khác biệt của chúng tôi nằm ở hệ thống tối ưu giá thông
                minh, giúp bạn tiết kiệm chi phí nhưng vẫn lựa chọn được phòng
                nghỉ tốt nhất, phù hợp với nhu cầu và phong cách du lịch của
                riêng bạn.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-900 text-lg">
                Chuyên nghiệp tạo nên sự khác biệt!
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-gray-200 shadow shadow-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            Các Khách Hàng Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300 border border-gray-100 "
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={80}
                  className="w-full h-auto max-h-30 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
