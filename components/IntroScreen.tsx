
import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  console.log("IntroScreen rendered");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 md:p-12 text-center animate-fadeIn relative overflow-hidden">
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
      
      <div className="max-w-2xl space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-red-600 text-5xl md:text-8xl font-black tracking-tighter italic glitch-text drop-shadow-[0_0_15px_rgba(255,0,0,0.4)] uppercase">
            Bình Minh Đổi Mới
          </h1>
          <h2 className="text-amber-500 text-sm md:text-xl font-bold tracking-[0.3em] uppercase border-y border-amber-500/20 py-2">
            Đại Hội VI (1986)
          </h2>
        </div>

        <div className="bg-white/5 border border-amber-500/10 p-6 md:p-10 rounded-2xl shadow-2xl space-y-6 text-sm md:text-lg leading-relaxed text-gray-200 backdrop-blur-md">
          <p className="italic font-serif opacity-90">
            "Năm 1986. Việt Nam đứng trước bờ vực khủng hoảng. Lạm phát 774.7%, hàng hóa khan hiếm. Lịch sử đòi hỏi những quyết sách dũng cảm."
          </p>
          
          <div className="border-l-4 border-red-700 pl-4 py-2 bg-red-950/20 text-left rounded-r-lg">
            <p className="text-red-500 font-black italic mb-1 uppercase tracking-widest text-[10px]">Trọng trách:</p>
            <p className="text-gray-100">
              Là Đại biểu dự Đại hội, bạn phải thấu hiểu nỗi khổ của dân và đưa ra quyết sách Đổi Mới.
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group relative px-16 py-4 bg-red-700 hover:bg-red-600 text-white font-black text-xl rounded-full transition-all shadow-xl uppercase tracking-widest active:scale-95"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
