
import React, { useState, useEffect } from 'react';
import { SURVEY_POINTS } from '../constants';
import { SurveyPoint, Stats } from '../types';

interface SurveyScreenProps {
  onComplete: (collectedKeywords: string[]) => void;
  stats: Stats;
  onSFX: (url: string) => void;
  sfxAssets: any;
}

const SurveyScreen: React.FC<SurveyScreenProps> = ({ onComplete, stats, onSFX, sfxAssets }) => {
  const [activePoint, setActivePoint] = useState<SurveyPoint | null>(null);
  const [collectedKeywords, setCollectedKeywords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Tự động mở điểm đầu tiên khi vào màn hình
  useEffect(() => {
    if (!activePoint && visited.length === 0) {
      setActivePoint(SURVEY_POINTS[0]);
    }
  }, []);

  const handlePointClick = (point: SurveyPoint) => {
    if (isTransitioning) return;
    onSFX(sfxAssets.SFX_CLICK);
    setTimeout(() => onSFX(sfxAssets.SFX_CHARACTER), 150);
    setActivePoint(point);
    setFeedback(null);
  };

  const handleOption = (option: { label: string; collects: boolean; feedback: string }, point: SurveyPoint) => {
    if (isTransitioning) return;

    if (option.collects) {
      onSFX(sfxAssets.SFX_COLLECT);
      const newKeywords = Array.from(new Set([...collectedKeywords, ...point.keywords]));
      setCollectedKeywords(newKeywords);
    } else {
      onSFX(sfxAssets.SFX_CLICK);
    }
    
    setFeedback(option.feedback);
    const newVisited = Array.from(new Set([...visited, point.id]));
    setVisited(newVisited);

    // Tìm điểm tiếp theo trong danh sách
    const currentIndex = SURVEY_POINTS.findIndex(p => p.id === point.id);
    if (currentIndex < SURVEY_POINTS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextPoint = SURVEY_POINTS[currentIndex + 1];
        handlePointClick(nextPoint);
        setIsTransitioning(false);
      }, 1500); // Chờ 1.5s để người dùng đọc feedback trước khi tự động chuyển
    }
  };

  const allVisited = visited.length === SURVEY_POINTS.length;
  const enoughKeywords = collectedKeywords.length >= 6;

  const getPosition = (id: string) => {
    switch(id) {
      case 'hanoi': return { top: '15%', left: '75%' };
      case 'rural': return { top: '50%', left: '50%' };
      case 'hcmc': return { top: '85%', left: '25%' };
      default: return { top: '50%', left: '50%' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#d4c5a1] flex flex-col relative overflow-hidden">
      {/* HUD */}
      <div className="relative z-30 grid grid-cols-4 gap-1 p-2 bg-black/95 border-b border-amber-500/20 backdrop-blur-xl">
        <div className="text-center">
          <span className="block text-[7px] uppercase opacity-50 font-bold">Kinh tế</span>
          <span className="text-base font-black text-red-500">{stats.economy}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] uppercase opacity-50 font-bold">Lòng dân</span>
          <span className="text-base font-black text-red-500">{stats.people}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] uppercase opacity-50 font-bold">Ổn định</span>
          <span className="text-base font-black text-red-500">{stats.stability}</span>
        </div>
        <div className="text-center bg-amber-900/30 rounded-lg border border-amber-500/20">
          <span className="block text-[7px] uppercase text-amber-500 font-bold">Dữ liệu</span>
          <span className="text-base font-black text-amber-400">{collectedKeywords.length}/7</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row-reverse overflow-hidden">
        
        {/* Bản đồ hình chữ S */}
        <div className="w-full md:w-5/12 h-[30vh] md:h-auto relative bg-gradient-to-b from-black to-stone-900/40 p-4 flex items-center justify-center border-b border-white/5">
          <div className="h-full aspect-[2/3] relative">
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 200">
              <path d="M75,20 Q95,60 60,100 T30,180" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" />
            </svg>

            {SURVEY_POINTS.map((point) => {
              const pos = getPosition(point.id);
              const isActive = activePoint?.id === point.id;
              const isVisited = visited.includes(point.id);
              
              return (
                <button
                  key={point.id}
                  onClick={() => handlePointClick(point)}
                  disabled={isTransitioning}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                    ${isActive ? 'z-40 scale-125' : 'z-20 scale-100'}
                    ${isTransitioning ? 'cursor-wait' : ''}
                  `}
                  style={pos}
                >
                  {!isVisited && (
                    <div className="absolute inset-0 animate-ping rounded-full bg-red-600/40"></div>
                  )}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl
                    ${isActive 
                      ? 'bg-amber-500 border-white text-black scale-110' 
                      : isVisited 
                        ? 'bg-green-900/60 border-green-500/50 text-white opacity-80' 
                        : 'bg-red-900/60 border-red-500/50 text-white'
                    }
                  `}>
                    <span className="text-2xl md:text-3xl">{point.icon}</span>
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-black/90 border border-white/10 transition-opacity
                    ${isActive ? 'opacity-100' : 'opacity-60'}
                  `}>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-white">
                      {point.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nội dung hội thoại */}
        <div className="w-full md:w-7/12 flex-1 flex flex-col bg-stone-950 p-4 md:p-8 overflow-y-auto">
          {activePoint ? (
            <div key={activePoint.id} className="space-y-5 animate-fadeIn pb-10">
              <div className="flex items-center gap-4 bg-white/5 p-3 md:p-5 rounded-2xl border border-white/10 shadow-lg animate-slideInRight">
                <div className="text-5xl md:text-7xl bg-amber-500/10 p-2 rounded-full border border-amber-500/20">
                  {activePoint.representative.avatar}
                </div>
                <div>
                  <h4 className="text-amber-500 font-black uppercase text-[9px] tracking-[0.2em]">{activePoint.representative.role}</h4>
                  <p className="text-xl md:text-2xl font-black text-white italic">{activePoint.representative.name}</p>
                </div>
              </div>

              <div className="bg-white/[0.02] p-4 md:p-6 rounded-2xl border-l-4 border-amber-600 space-y-3 shadow-inner">
                {activePoint.description.map((line, i) => (
                  <p key={i} className="text-stone-300 text-sm md:text-lg leading-relaxed font-serif italic">
                    "{line}"
                  </p>
                ))}
              </div>

              {feedback && (
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400 text-[11px] md:text-sm font-bold animate-fadeIn text-center">
                  {feedback}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <p className="text-[9px] uppercase font-black text-stone-500 tracking-widest ml-1">Lựa chọn của bạn:</p>
                {activePoint.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={isTransitioning}
                    onClick={() => handleOption(opt, activePoint)}
                    className={`w-full text-left p-4 md:p-6 bg-stone-900/50 border border-white/10 rounded-2xl transition-all flex items-center justify-between group
                      ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 active:bg-amber-900/20'}
                    `}
                  >
                    <span className="text-sm md:text-base font-medium pr-4">{opt.label}</span>
                    <span className="text-amber-500 font-bold">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
              <div className="text-6xl mb-4 animate-bounce">🇻🇳</div>
              <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                Chạm vào các điểm trên bản đồ để bắt đầu khảo sát thực địa
              </p>
            </div>
          )}

          <div className="mt-auto pt-6">
            {allVisited && !isTransitioning && (
              <div className="animate-slideUp">
                {enoughKeywords ? (
                  <button
                    onClick={() => { onSFX(sfxAssets.SFX_PAPER); onComplete(collectedKeywords); }}
                    className="w-full py-5 bg-red-700 hover:bg-red-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(185,28,28,0.4)] border-2 border-white/20 animate-pulse active:scale-95 transition-transform"
                  >
                    Vào Nghị trường Đại hội VI →
                  </button>
                ) : (
                  <div className="bg-red-950/40 p-4 rounded-2xl border border-red-500/30 text-red-500 text-center">
                    <p className="text-[10px] font-black uppercase mb-1">Thiếu dữ liệu đổi mới!</p>
                    <p className="text-[9px] italic opacity-80">Hãy quay lại các điểm khảo sát và chọn những phương án "Ghi nhận thực tế" để tích lũy đủ luận cứ.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SurveyScreen;
