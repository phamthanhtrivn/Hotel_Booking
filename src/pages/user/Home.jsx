/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import heroImg from "../../assets/bg01.jpg"; // 👉 bạn thay bằng ảnh của bạn
import feature1 from "../../assets/bg02.jpg";
import feature2 from "../../assets/bg03.jpg";
import feature3 from "../../assets/bg04.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Section = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-6xl px-6 mx-auto my-20"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#e2ecf7] to-[#f9fafc] text-gray-800">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <img
          src={heroImg}
          alt="Hero background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">
            Chào mừng đến với Website của chúng tôi
          </h1>
          <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-200">
            Trải nghiệm dịch vụ tiện ích, nhanh chóng và hiện đại.
          </p>
          <Button className="px-6 py-3 font-semibold bg-[var(--color-background)] hover:bg-[#2a4b70] rounded-xl shadow-lg">
            Bắt đầu ngay
          </Button>
        </motion.div>
      </section>

      {/* FEATURE SECTION */}
      <Section>
        <h2 className="mb-12 text-3xl font-bold text-center">
          Tính năng nổi bật
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[{img:feature1,title:"Nhanh chóng",desc:"Thao tác đơn giản, tiết kiệm thời gian."},
            {img:feature2,title:"An toàn",desc:"Bảo mật thông tin của bạn tuyệt đối."},
            {img:feature3,title:"Hiện đại",desc:"Giao diện thân thiện, hiệu suất cao."}
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden bg-white shadow-lg rounded-2xl"
            >
              <img src={f.img} alt={f.title} className="object-cover w-full h-48" />
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ABOUT SECTION */}
      <Section>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.img
            src={feature2}
            alt="About us"
            className="shadow-lg rounded-2xl"
            whileHover={{ scale: 1.02 }}
          />
          <div>
            <h2 className="mb-4 text-3xl font-bold">Về chúng tôi</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Chúng tôi luôn đặt trải nghiệm người dùng lên hàng đầu,
              mang lại các dịch vụ tối ưu, dễ sử dụng và tiện lợi nhất.
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              Hệ thống được phát triển hiện đại, tích hợp nhiều công nghệ tiên tiến.
            </p>
            <Button className="bg-[var(--color-background)] hover:bg-[#2a4b70] rounded-xl shadow-md">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section>
        <div className="text-center py-16 bg-[var(--color-background)] text-white rounded-2xl shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">Sẵn sàng bắt đầu?</h2>
          <p className="mb-6 text-gray-100">
            Hãy tham gia cùng chúng tôi để trải nghiệm dịch vụ tuyệt vời nhất.
          </p>
          <Button variant="secondary" className="bg-white text-[var(--color-background)] hover:bg-gray-100 rounded-xl font-semibold">
            Đăng ký ngay
          </Button>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-6 mt-20 text-center text-gray-600 border-t bg-white/70">
        © {new Date().getFullYear()} Công ty ABC. All rights reserved.
      </footer>
    </div>
  );
}
