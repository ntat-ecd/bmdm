
import React from 'react';
import { Stats } from '../types';

interface ResultScreenProps {
  stats: Stats;
  onViewTimeline: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onViewTimeline }) => {
  console.log("ResultScreen rendered");

  // Điều kiện thắng mới: Tất cả chỉ số phải từ 80 trở lên
  const isSuccess = stats.economy >= 80 && stats.people >= 80 && stats.stability >= 80;
  
  // Điều kiện thua nặng: Có chỉ số dưới 40
  const isFailure = stats.economy < 40 || stats.people < 40 || stats.stability < 40;

  let resultType: 'high' | 'medium' | 'low' = 'medium';
  if (isSuccess) resultType = 'high';
  else if (isFailure) resultType = 'low';

  const content = {
    high: {
      title: 'Đổi Mới Thành Công',
      eval: 'Chúc mừng Đại biểu! Bạn đã đưa ra những quyết sách dũng cảm nhất. Đất nước chính thức thoát khỏi khủng hoảng, bước vào kỷ nguyên phát triển rực rỡ.',
      lesson: 'Bài học: Nhìn thẳng vào sự thật, nói rõ sự thật là chìa khóa của mọi sự thành công.',
      bg: 'bg-gradient-to-br from-emerald-900 via-blue-900 to-black',
      img: '🏙️',
      status: 'THÀNH CÔNG RỰC RỠ',
      accent: 'text-amber-400'
    },
    medium: {
      title: 'Đổi Mới Nửa Vời',
      eval: 'Bạn đã có nỗ lực nhưng các chỉ số chưa đạt mức đột phá. Đất nước vẫn còn loay hoay trong những khó khăn cũ.',
      lesson: 'Bài học: Đổi mới tư duy phải đi đôi với hành động quyết liệt, không thể làm nửa vời.',
      bg: 'bg-gradient-to-br from-amber-900 via-stone-900 to-black',
      img: '🧱',
      status: 'CHƯA ĐẠT YÊU CẦU',
      accent: 'text-amber-500'
    },
    low: {
      title: 'Khủng Hoảng Trầm Trọng',
      eval: 'Những quyết định sai lầm đã khiến đất nước lún sâu vào bế tắc. Kinh tế kiệt quệ, lòng dân bất an.',
      lesson: 'Bài học: Bảo thủ và trì trệ là kẻ thù lớn nhất của sự phát triển.',
      bg: 'bg-gradient-to-br from-red-950 via-black to-red-900',
      img: '🥀',
      status: 'THẤT BẠI LỊCH SỬ',
      accent: 'text-red-500'
    }
  }[resultType];

  return (
    <div className={`min-h-screen ${content.bg} text-white flex flex-col items-center justify-center p-4 text-center animate-fadeIn relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_80%)]"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <header className="space-y-2">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-black tracking-widest uppercase">Kết quả Đại hội</div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-xl">
            {content.title}
          </h1>
        </header>

        <div className="flex flex-col items-center gap-6">
            <div className="text-8xl drop-shadow-2xl animate-float">
              {content.img}
            </div>

            <div className="w-full space-y-4 text-left">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Kinh tế', val: stats.economy },
                  { label: 'Dân tâm', val: stats.people },
                  { label: 'Ổn định', val: stats.stability }
                ].map((s, i) => (
                  <div key={i} className={`p-2 rounded-xl border border-white/10 text-center ${s.val >= 80 ? 'bg-green-500/20 border-green-500/50' : 'bg-black/40'}`}>
                    <span className="block text-[8px] uppercase font-bold text-white/50 mb-1">{s.label}</span>
                    <span className={`text-lg font-black ${s.val >= 80 ? 'text-green-400' : 'text-red-400'}`}>{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
                <p className="text-sm italic leading-relaxed text-gray-200">
                  "{content.eval}"
                </p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-amber-400 text-[10px] font-bold uppercase mb-1">Đánh giá:</p>
                  <p className="text-xs text-white/70">{content.lesson}</p>
                </div>
              </div>
            </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
            {resultType === 'high' && (
              <button
                onClick={onViewTimeline}
                className="w-full py-4 bg-amber-500 text-black font-black text-lg rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] uppercase tracking-wider animate-pulse"
              >
                Hành trình 38 năm phát triển →
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all uppercase text-sm"
            >
              Chơi lại
            </button>
            <div className="opacity-40 text-[10px] font-bold tracking-widest uppercase">
              Xếp hạng: {content.status}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
