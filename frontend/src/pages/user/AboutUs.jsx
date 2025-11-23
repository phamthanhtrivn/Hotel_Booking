import { Info, Target, ShieldCheck, Star } from "lucide-react";
import illustration3D from "../../assets/about/hotel.jpg";

const AboutUs = () => {
  const sections = [
    {
      icon: Info,
      iconColor: "bg-[#1E2A38] text-white",
      title: "Đôi nét về TWAN",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            Khách sạn Twan là khách sạn 5 sao tại Hồ Tràm, phục vụ khách du lịch 24/7,
            với cơ sở vật chất hiện đại và dịch vụ đa dạng.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Twan có khoảng 100 phòng, phân loại theo loại giường và loại phòng:
          </p>
          <ul className="grid md:grid-cols-2 gap-3 mt-4">
            {[
              "Phòng Standard (~20m²) - Chi phí hợp lý",
              "Phòng Deluxe (~30m²) - Thiết kế tinh tế",
              "Phòng Suite (~60m²) - 2 không gian riêng biệt",
              "Phòng Family/Group (~40m²) - Cho 4–6 khách"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-[#1E2A38] rounded-full mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      icon: Target,
      iconColor: "bg-[#1E2A38] text-white",
      title: "Mục tiêu doanh nghiệp",
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            Website quảng bá khách sạn TWAN, giúp khách tìm phòng nhanh chóng
            và đặt trải nghiệm nghỉ dưỡng đẳng cấp.
          </p>
          <p>
            Đồng thời cung cấp công cụ quản lý, thống kê doanh thu, gợi ý phòng phổ biến,
            tối ưu hiệu quả kinh doanh.
          </p>
        </div>
      )
    },
    {
      icon: ShieldCheck,
      iconColor: "bg-[#1E2A38] text-white",
      title: "Nhiệm vụ chính",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Đảm bảo dự án thực hiện đúng tiến độ, chất lượng cao, mang lại giá trị thực sự
          và sự hài lòng cho khách hàng.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#1E2A38]/5 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-xl border border-[#1E2A38]/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1E2A38] to-[#2C3E50] bg-clip-text text-transparent">
              Khách sạn TWAN 
            </h1>
          </div>
          <p className="text-xl text-gray-600 italic max-w-2xl mx-auto leading-relaxed">
            Giải pháp đặt phòng hiệu quả - Trải nghiệm nghỉ dưỡng đẳng cấp
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <section 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#1E2A38]/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${section.iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  {section.content}
                </section>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-[#1E2A38] to-[#2C3E50] rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold text-yellow-100 text-sm uppercase tracking-wider">
                    GIÁ TRỊ CỐT LÕI
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Giá Trị Của Chúng Tôi
                </h2>
                <div className="space-y-4 text-blue-50">
                  <p>
                    Mang đến trải nghiệm đặt phòng tiện lợi, nhanh chóng, đáng tin cậy.
                  </p>
                  <p>
                    Kết hợp công nghệ hiện đại, thiết kế thân thiện, dịch vụ chăm sóc tận tâm.
                  </p>
                  <p>
                    Hệ thống tối ưu giá thông minh, tiết kiệm chi phí nhưng vẫn tốt nhất.
                  </p>
                </div>
                <blockquote className="border-l-4 border-yellow-300 pl-6 italic text-white text-lg font-medium py-2">
                  "Chuyên nghiệp tạo nên sự khác biệt!"
                </blockquote>
              </div>
            </section>

            {/* Image */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#1E2A38]/20 hover:shadow-2xl transition-all duration-300">
              <img
                src={illustration3D}
                alt="Khách sạn TWAN"
                className="w-full h-64 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 italic">
                  Không gian sang trọng - Dịch vụ đẳng cấp
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
