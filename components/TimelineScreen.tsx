import React, { useState } from "react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  achievements: string[];
}

const TIMELINE_DATA: Milestone[] = [
  {
    year: "1986",
    title: "Bình Minh Đổi Mới",
    desc: "Đại hội VI mở đường cho công cuộc xoay chuyển vận mệnh dân tộc từ cơ chế bao cấp sang kinh tế thị trường.",
    icon: "💡",
    color: "#f59e0b",
    achievements: [
      "Xóa bỏ cơ chế quan liêu",
      "Kinh tế nhiều thành phần",
      "Đổi mới tư duy toàn diện",
      "Mở cửa giao thương",
    ],
  },
  {
    year: "1995",
    title: "Phá Thế Bao Vây",
    desc: "Việt Nam chính thức bước vào sân chơi khu vực và bình thường hóa các quan hệ ngoại giao quan trọng.",
    icon: "🤝",
    color: "#3b82f6",
    achievements: [
      "Gia nhập ASEAN",
      "Bình thường hóa quan hệ Việt-Mỹ",
      "Ký Hiệp định Khung với EU",
      "Xóa bỏ hoàn toàn cấm vận",
    ],
  },
  {
    year: "2000",
    title: "Thế Hệ Startup Đầu Tiên",
    desc: "Luật Doanh nghiệp ra đời tạo nên làn sóng khởi nghiệp và giải phóng sức sản xuất tư nhân.",
    icon: "🚀",
    color: "#10b981",
    achievements: [
      "Luật Doanh nghiệp có hiệu lực",
      "Thị trường chứng khoán ra đời",
      "Phát triển Internet Việt Nam",
      "Hàng VN chất lượng cao",
    ],
  },
  {
    year: "2007",
    title: "Hội Nhập Toàn Cầu",
    desc: "Việt Nam khẳng định vị thế trên bản đồ kinh tế thế giới khi gia nhập tổ chức thương mại lớn nhất hành tinh.",
    icon: "🌐",
    color: "#8b5cf6",
    achievements: [
      "Gia nhập WTO (Thành viên 150)",
      "Đăng cai Hội nghị APEC",
      "Thu hút FDI kỷ lục",
      "Xuất khẩu gạo hàng đầu",
    ],
  },
  {
    year: "2015",
    title: "Kết Nối Thế Hệ Mới",
    desc: "Tham gia các hiệp định thương mại tự do thế hệ mới, mở rộng không gian phát triển.",
    icon: "📊",
    color: "#ec4899",
    achievements: [
      "Cộng đồng Kinh tế ASEAN (AEC)",
      "Ký kết hiệp định EVFTA",
      "Nâng tầm Đối tác Chiến lược",
      "Hạ tầng giao thông đột phá",
    ],
  },
  {
    year: "2020",
    title: "Vững Vàng Bản Lĩnh",
    desc: "Một năm của những thách thức lịch sử, khẳng định sức mạnh đoàn kết và sự nhạy bén của hệ thống chính trị.",
    icon: "🛡️",
    color: "#06b6d4",
    achievements: [
      "Chống dịch COVID-19 thành công",
      "Chủ trì ASEAN & HĐBA LHQ",
      "Đột phá Chuyển đổi số",
      "Tăng trưởng dương hiếm hoi",
    ],
  },
  {
    year: "2024",
    title: "Kỷ Nguyên Công Nghệ Cao",
    desc: "Việt Nam chuyển mình thành trung tâm sản xuất công nghệ và linh kiện bán dẫn của thế giới.",
    icon: "🔬",
    color: "#f43f5e",
    achievements: [
      "Chiến lược Công nghiệp Bán dẫn",
      "Đối tác Chiến lược Toàn diện Mỹ-Trung",
      "Đường sắt tốc độ cao",
      "Kinh tế xanh & Net Zero",
    ],
  },
  {
    year: "2025",
    title: "Khát Vọng Hùng Cường",
    desc: "Hướng tới kỷ nguyên vươn mình của dân tộc, xây dựng quốc gia hiện đại, thu nhập cao.",
    icon: "🇻🇳",
    color: "#dc2626",
    achievements: [
      "Hoàn thiện Chính phủ số",
      "Thành phố thông minh",
      "Sân bay Long Thành về đích",
      "An sinh xã hội bền vững",
    ],
  },
];

const TimelineScreen: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const current = TIMELINE_DATA[activeIdx];

  return (
    <div className="h-screen bg-[#020202] text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* SIDEBAR BÊN TRÁI */}
      <aside
        className={`w-full md:w-32 lg:w-40 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar py-4 md:py-8 z-20 transition-all duration-700 ${
          showFinal
            ? "opacity-0 -translate-x-full pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className="flex md:flex-col px-4 md:px-0 gap-2 md:gap-4 w-full">
          {TIMELINE_DATA.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`flex-shrink-0 md:w-full py-3 md:py-6 flex flex-col items-center justify-center transition-all duration-300 relative group
                ${activeIdx === idx ? "bg-red-600/10" : "hover:bg-white/5"}
              `}
            >
              {activeIdx === idx && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 hidden md:block"></div>
              )}
              {activeIdx === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 md:hidden"></div>
              )}
              <span
                className={`text-xs font-black mb-1 transition-colors ${
                  activeIdx === idx ? "text-red-500" : "text-gray-500"
                }`}
              >
                {m.year}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx
                    ? "bg-red-600 scale-150 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                    : "bg-gray-800 group-hover:bg-gray-600"
                }`}
              ></div>
            </button>
          ))}
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH (Lịch sử) */}
      <main
        className={`flex-1 relative flex flex-col overflow-y-auto transition-all duration-1000 ${
          showFinal
            ? "blur-3xl grayscale opacity-20 scale-90 rotate-1"
            : "blur-0 opacity-100"
        }`}
      >
        <header className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600 uppercase tracking-tighter">
              Di Sản Đổi Mới
            </h1>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold">
              Lịch sử kiến tạo tương lai
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
          >
            🏠
          </button>
        </header>

        <div
          key={activeIdx}
          className="flex-1 p-6 md:p-16 flex flex-col justify-center animate-fadeInRight"
        >
          <div className="max-w-4xl space-y-8 md:space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-4">
                <span className="text-6xl md:text-9xl font-black text-white/5 select-none leading-none">
                  {current.year}
                </span>
                <div className="h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent min-w-[50px]"></div>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600/10 border border-red-600/20 rounded-[2rem] flex items-center justify-center text-4xl md:text-6xl shadow-2xl animate-float">
                  {current.icon}
                </div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                  {current.title}
                </h2>
              </div>
              <p className="text-lg md:text-2xl text-gray-400 font-serif leading-relaxed italic max-w-2xl border-l-4 border-amber-500/50 pl-6">
                "{current.desc}"
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-amber-500">
                Thành tựu tiêu biểu:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {current.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="group bg-white/5 border border-white/10 p-6 rounded-[1.5rem] hover:bg-white/10 transition-all flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 font-black text-xs shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-base md:text-xl font-bold text-gray-200 group-hover:text-white leading-snug">
                      {ach}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {activeIdx === TIMELINE_DATA.length - 1 && (
              <div className="pt-10">
                <button
                  onClick={() => setShowFinal(true)}
                  className="px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest rounded-full shadow-[0_0_50px_rgba(220,38,38,0.4)] hover:scale-105 transition-transform animate-pulse"
                >
                  Dấn thân vì tương lai →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ĐOẠN MỞ RỘNG: MÀN HÌNH THÔNG ĐIỆP KẾT THÚC (DỐC SỨC THEO ĐUỔI TƯƠNG LAI) */}

      {showFinal && (
        <div className="fixed inset-0 z-[300] bg-black flex items-start md:items-center justify-center px-4 py-6 animate-fadeIn overflow-y-auto">
          {/* Lớp nền hiệu ứng Cinematic */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#800000,transparent_80%)] opacity-40"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="max-w-5xl w-full text-center space-y-10 md:space-y-12 relative z-10 animate-slideUp">
            {/* Header */}
            <div className="space-y-4 md:space-y-6">
              <div className="text-[4rem] sm:text-[6rem] md:text-[12rem] mb-2 md:mb-4 animate-float select-none">
                🇻🇳
              </div>
              <div className="space-y-2">
                <h3 className="text-amber-500 font-black uppercase tracking-widest text-[9px] md:text-xs">
                  Tiếp bước cha anh
                </h3>
                <h2
                  className="font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]
            text-4xl sm:text-5xl md:text-[10rem]"
                >
                  Kỷ Nguyên <br /> Vươn Mình
                </h2>
              </div>
            </div>

            {/* Khung thông điệp */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 px-6 py-8 sm:px-10 sm:py-12 md:px-20 md:py-20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Quote */}
                <div className="absolute top-6 left-6 md:top-8 md:left-10 text-5xl md:text-8xl text-white/5 font-serif select-none">
                  “
                </div>
                <div className="absolute bottom-2 right-6 md:bottom-0 md:right-10 text-5xl md:text-8xl text-white/5 font-serif select-none">
                  ”
                </div>

                <div className="space-y-6 md:space-y-8 relative z-20">
                  <p className="font-serif italic text-white leading-relaxed tracking-wide text-base sm:text-xl md:text-5xl">
                    "Chúng ta tin rằng Đổi mới là con đường duy nhất để trường
                    tồn. Hôm nay, chúng ta nguyện
                    <span className="relative inline-block mx-2 sm:mx-3">
                      <span className="absolute inset-0 bg-red-600/30 blur-lg"></span>
                      <span className="relative text-red-500 font-black not-italic">
                        DỐC SỨC THEO ĐUỔI
                      </span>
                    </span>
                    một tương lai hùng cường, sánh vai cùng năm châu."
                  </p>

                  <div className="pt-8 md:pt-12 border-t border-white/10">
                    <p className="text-amber-500 font-black uppercase tracking-widest text-[9px] md:text-xs mb-6 md:mb-10">
                      Sứ mệnh này giờ đây thuộc về thế hệ của bạn
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                      <button
                        onClick={() => window.location.reload()}
                        className="group/btn relative w-full md:w-auto px-10 md:px-20 py-5 md:py-8 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-red-500 transition-all shadow-[0_20px_60px_rgba(220,38,38,0.5)] active:scale-95 text-sm md:text-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
                        Ghi danh vào lịch sử
                      </button>

                      <button
                        onClick={() => setShowFinal(false)}
                        className="w-full md:w-auto px-10 md:px-12 py-5 md:py-8 bg-white/5 text-white/60 font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 hover:text-white transition-all text-xs md:text-sm"
                      >
                        Xem lại hành trình
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="opacity-30 flex flex-col items-center gap-3 md:gap-4">
              <div className="h-px w-20 md:w-24 bg-white/50"></div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-center">
                Việt Nam — Khát vọng 2045
              </p>
            </footer>
          </div>

          {/* Rising embers giữ nguyên */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/60 rounded-full animate-rising-ember"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-10%`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  filter: `blur(${Math.random() * 2}px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes rising-ember {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          50% { transform: translateY(-50vh) rotate(180deg) scale(1.5); opacity: 0.4; }
          100% { transform: translateY(-120vh) rotate(360deg) scale(0.5); opacity: 0; }
        }
        .animate-rising-ember {
          animation: rising-ember linear infinite;
        }
        .animate-fadeInRight { animation: fadeInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-slideUp { animation: slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes fadeInRight { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { 0% { opacity: 0; transform: translateY(150px); } 100% { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TimelineScreen;
