import React from 'react'


import { useEffect, useRef, useState } from "react";

function FadeInSection({ children, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  const getTransformClass = () => {
    switch (direction) {
      case "down":
        return "translate-y-[-12px]"; // từ trên xuống
      case "left":
        return "translate-x-12"; // từ phải qua trái
      case "right":
        return "translate-x-[-12px]"; // từ trái qua phải
      default:
        return "translate-y-12"; // mặc định: từ dưới lên
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out transform will-change-transform
        ${visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getTransformClass()}`}
      `}
    >
      {children}
    </div>
  );
}



const Facilities = () => {
  return (
    <div className='p-5'>

      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12 ">
        <FadeInSection direction="up" className="order-2 md:order-1">
          <div className="space-y-4 ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              PHÒNG NGHỈ WINK
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              KHÔNG GIAN NGHỈ DƯỠNG HIỆN ĐẠI
            </h2>
            <h3 className="text-base md:text-lg text-gray-700 font-medium">
              VĂN PHÒNG CỦA BẠN KHI ĐI CÔNG TÁC
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Wink mang đến không gian lưu trú kết hợp làm việc linh hoạt, hiện đại.
              Không còn những phòng làm việc khép kín, thay vào đó là khu vực coworking mở,
              nơi bạn có thể trao đổi, kết nối và sáng tạo.
              Bàn làm việc chung, phòng họp có màn hình trình chiếu và nhiều tiện ích khác —
              giúp bạn biến ý tưởng thành hành động dù đang ở xa văn phòng.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection direction="right" className="order-1 md:order-2">
          <div className="flex justify-center w-full h-full">
            <img
              src="https://dyf.vn/wp-content/uploads/2021/11/thiet-ke-noi-that-phong-khach-san-hien-dai.jpg"
              alt="Phòng khách sạn Wink"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>


      </div>



      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12">
        <FadeInSection direction="left">
          <div className="flex justify-center w-full h-full order-1 ">
            <img
              src="https://wink-hotels.com/wp-content/uploads/2024/10/4.-WINK-BAR.jpg"
              alt="Wink Bar"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              WINK BAR
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              THỨC UỐNG THỦ CÔNG & COCKTAIL ĐẶC SẮC
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Thưởng thức những ly cocktail mang hương vị địa phương,
              hoặc bia thủ công mát lạnh trong không gian âm nhạc sôi động cùng DJ.
              Bắt đầu buổi tối của bạn tại Wink Bar, nơi nhịp sống thành phố hòa cùng
              không khí hiện đại và thân thiện.
              Hoặc quay lại sau khi kết thúc cuộc vui – nhâm nhi ly rượu và trò chuyện cùng bạn bè.
            </p>
          </div>
        </FadeInSection>
      </div>


      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              KHÔNG GIAN WINK
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              NƠI KẾT NỐI VÀ GIAO LƯU
            </h2>
            <h3 className="text-base md:text-lg text-gray-700 font-medium">
              TRẢ PHÒNG CÙNG GIỜ VỚI NHẬN PHÒNG — Ở 24 GIỜ TRỌN VẸN
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Wink không chỉ là khách sạn, mà còn là điểm hẹn cộng đồng –
              nơi giao thoa giữa sáng tạo, tiện nghi và năng lượng trẻ trung.
              Với chính sách lưu trú 24 giờ linh hoạt cho mọi đặt phòng,
              bạn hoàn toàn chủ động tận hưởng kỳ nghỉ hoặc chuyến công tác.
              Hãy ghé Wink Space – chọn một góc thư giãn, làm việc hoặc gặp gỡ,
              tất cả tùy thuộc vào bạn.
            </p>
          </div>
        </FadeInSection>
        <FadeInSection direction="right">
          <div className="flex justify-center w-full h-full">
            <img
              src="https://wink-hotels.com/wp-content/uploads/2024/10/z6030656534340_70d3504d0cea4db773750632427a16e4-1.jpg"
              alt="Wink Space"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>
      </div>


      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12">
        <FadeInSection direction="left">
          <div className="flex justify-center w-full h-full">
            <img
              src="https://wink-hotels.com/wp-content/uploads/2024/10/6.-WINK-GYM.jpg"
              alt="Wink Gym"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>


        <FadeInSection direction="up">

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              WINK GYM
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              SỨC KHỎE & CÂN BẰNG
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Phòng tập mở cửa 24/7 với đầy đủ thiết bị: máy chạy, tạ tự do, thảm yoga.
              Nếu bạn muốn thay đổi không gian, hãy thử chạy bộ ngoài công viên hoặc
              luyện tập HIIT tại khu vực gần khách sạn.
              Hít sâu – thở chậm – và cảm nhận năng lượng mới mỗi ngày tại Wink.
            </p>
          </div>
        </FadeInSection>

      </div>


      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12">
        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              KHÔNG GIAN LÀM VIỆC CHUNG
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              CỘNG TÁC & SÁNG TẠO
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Khu vực làm việc mở hiện đại – nơi bạn có thể gặp gỡ,
              trao đổi ý tưởng và hợp tác cùng những người trẻ năng động.
              Không gian được thiết kế tối giản nhưng đầy cảm hứng,
              phù hợp cho cả công việc cá nhân và nhóm nhỏ.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection direction="right">
          <div className="flex justify-center w-full h-full">
            <img
              src="https://wink-hotels.com/wp-content/uploads/2024/10/z6031657040844_ed093332ba090d8f8e699a63e148772f-1-e1731575619797.jpg"
              alt="Không gian làm việc Wink"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>


      </div>

      {/* BÃI ĐỖ XE */}
      <div className="py-16 px-2 grid md:grid-cols-2 items-center gap-12">
        <FadeInSection direction="left">
          <div className="flex justify-center w-full h-full">
            <img
              src="https://acihome.vn/uploads/15/giai-phap-thiet-ke-bai-do-xe-tai-resort.jpg"
              alt="Bãi đỗ xe"
              className="w-full object-contain"
            />
          </div>
        </FadeInSection>

        <FadeInSection direction="up">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              BÃI ĐỖ XE
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              AN TOÀN & THUẬN TIỆN
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Hệ thống bãi đỗ xe rộng rãi, bảo vệ 24/7,
              đảm bảo an toàn tuyệt đối cho phương tiện của bạn.
              Dù là khách lưu trú hay chỉ ghé qua,
              bạn đều có thể yên tâm tận hưởng thời gian tại Wink mà không cần lo lắng.
            </p>
          </div>
        </FadeInSection>



      </div>
    </div>
  )
}

export default Facilities
