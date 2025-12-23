
import React, { useState } from 'react';
import { CONGRESS_SESSIONS } from '../constants';
import { Stats, SessionOption } from '../types';

interface CongressScreenProps {
  onComplete: (choices: SessionOption[], finalStats: Stats) => void;
  stats: Stats;
  onSFX: (url: string) => void;
  sfxAssets: any;
}

const CongressScreen: React.FC<CongressScreenProps> = ({ onComplete, stats, onSFX, sfxAssets }) => {
  const [currentSessionIdx, setCurrentSessionIdx] = useState(0);
  const [choices, setChoices] = useState<SessionOption[]>([]);
  const [currentStats, setCurrentStats] = useState<Stats>(stats);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSession = CONGRESS_SESSIONS[currentSessionIdx];

  const handleChoice = (option: SessionOption) => {
    if (isAnimating) return;
    
    onSFX(sfxAssets.SFX_GAVEL);
    setIsAnimating(true);
    
    const newStats = {
      economy: Math.min(100, Math.max(0, currentStats.economy + (option.impact.economy || 0))),
      people: Math.min(100, Math.max(0, currentStats.people + (option.impact.people || 0))),
      stability: Math.min(100, Math.max(0, currentStats.stability + (option.impact.stability || 0))),
    };

    const newChoices = [...choices, option];
    setChoices(newChoices);
    setCurrentStats(newStats);
    setFeedback(option.feedback);

    setTimeout(() => {
      setFeedback(null);
      setIsAnimating(false);
      if (currentSessionIdx + 1 < CONGRESS_SESSIONS.length) {
        setCurrentSessionIdx(currentSessionIdx + 1);
      } else {
        onComplete(newChoices, newStats);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-soviet flex flex-col p-4 items-center justify-center relative overflow-hidden">
      {/* HUD Chỉ số - Cố định Mobile */}
      <div className="fixed top-16 left-4 right-4 flex justify-around bg-black/90 backdrop-blur-xl p-3 rounded-2xl border border-amber-500/30 z-50 shadow-2xl">
        <div className="text-center">
          <span className="block text-[7px] text-white/50 uppercase font-bold">Kinh tế</span>
          <span className="text-lg font-black text-amber-500">{currentStats.economy}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] text-white/50 uppercase font-bold">Lòng dân</span>
          <span className="text-lg font-black text-amber-500">{currentStats.people}</span>
        </div>
        <div className="text-center">
          <span className="block text-[7px] text-white/50 uppercase font-bold">Ổn định</span>
          <span className="text-lg font-black text-amber-500">{currentStats.stability}</span>
        </div>
      </div>

      <div className="w-full max-w-lg bg-black/95 p-5 md:p-10 rounded-3xl border-4 border-amber-600 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative animate-fadeIn mt-10">
        <header className="mb-5 text-center border-b border-amber-500/20 pb-4">
          <h2 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[8px] mb-1">Đại hội Đảng lần thứ VI</h2>
          <h3 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter">{currentSession.title}</h3>
        </header>

        {feedback ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-6 animate-pulse">
            <div className="w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-base md:text-lg font-bold text-amber-500 text-center uppercase tracking-widest">{feedback}</p>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10 text-sm leading-relaxed text-gray-300 shadow-inner">
              <p className="mb-3 italic opacity-60 text-xs">"{currentSession.intro}"</p>
              <p className="text-white font-bold text-base md:text-lg border-l-2 border-red-600 pl-3">{currentSession.question}</p>
            </div>

            <div className="grid gap-3">
              {currentSession.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt)}
                  className="w-full text-left p-4 md:p-5 border border-amber-500/20 bg-amber-500/5 active:bg-amber-500/20 transition-all rounded-2xl flex items-start gap-4 shadow-sm"
                >
                  <span className="w-10 h-10 bg-amber-500 text-black font-black flex items-center justify-center rounded-full shrink-0 text-lg shadow-lg">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-white/90 pt-1 leading-snug">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CongressScreen;
