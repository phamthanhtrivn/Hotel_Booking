

export default function Contact() {
  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div className="hidden md:block w-full h-[300px] md:h-[500px]  rounded-2xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.85816909105!2d106.68427047451765!3d10.822164158349457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1760798549315!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ vị trí khách sạn"
          ></iframe>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Gửi lời nhắn cho chúng tôi
          </h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Tiêu đề"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              rows="5"
              placeholder="Nội dung tin nhắn"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Gửi tin nhắn
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 space-y-10 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl shadow-md p-5 ">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Địa chỉ</h3>
            <p className="text-gray-600">
              12 Nguyễn Văn Bảo, P.4, Q. Gò Vấp, TP.HCM
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5  ">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Điện thoại</h3>
            <p className="text-gray-600">(+84) 28 7300 1234</p>
            <p className="text-gray-600">support@winkhotels.com</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 ">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Giờ làm việc</h3>
            <p className="text-gray-600">Thứ 2 – Chủ Nhật</p>
            <p className="text-gray-600">07:00 – 22:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
