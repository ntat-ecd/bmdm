
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameStage, Stats, SessionOption } from './types';
import { INITIAL_STATS } from './constants';
import IntroScreen from './components/IntroScreen';
import SurveyScreen from './components/SurveyScreen';
import CongressScreen from './components/CongressScreen';
import ResolutionScreen from './components/ResolutionScreen';
import ResultScreen from './components/ResultScreen';
import TimelineScreen from './components/TimelineScreen';
import Timer from './components/Timer';
import GlitchOverlay from './components/GlitchOverlay';

// 1. NƠI FIX ÂM THANH: Khai báo tất cả tài nguyên tại đây
const AUDIO_ASSETS = {
  BGM_INTRO: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c369c73b0a.mp3',
  BGM_SURVEY: 'https://cdn.pixabay.com/audio/2022/02/07/audio_65b3a3998b.mp3',
  BGM_CONGRESS: 'https://cdn.pixabay.com/audio/2022/10/25/audio_108620e29b.mp3',
  BGM_SUCCESS: 'https://cdn.pixabay.com/audio/2022/01/21/audio_317424168c.mp3',
  BGM_FAIL: 'https://cdn.pixabay.com/audio/2021/08/09/audio_824647385a.mp3',
  BGM_FUTURE: 'https://cdn.pixabay.com/audio/2022/03/24/audio_338a798533.mp3',
  
  SFX_CLICK: 'https://cdn.pixabay.com/audio/2022/03/15/audio_50269f8263.mp3',
  SFX_COLLECT: 'https://cdn.pixabay.com/audio/2021/08/04/audio_062562479e.mp3',
  SFX_GAVEL: 'https://www.soundjay.com/misc/sounds/gavel-01.mp3',
  SFX_PAPER: 'https://www.soundjay.com/misc/sounds/paper-flip-1.mp3',
  // Thêm âm thanh khi nhân vật xuất hiện
  SFX_CHARACTER: 'https://cdn.pixabay.com/audio/2022/11/15/audio_783d1a8117.mp3' 
};

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.INTRO);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [choices, setChoices] = useState<SessionOption[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // 2. NƠI FIX ÂM THANH: Hàm thực thi phát âm thanh
  const playSFX = useCallback((url: string) => {
    if (isMuted) return;
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, [isMuted]);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current = null;
    }

    let trackUrl = AUDIO_ASSETS.BGM_INTRO;
    switch (stage) {
      case GameStage.SURVEY: trackUrl = AUDIO_ASSETS.BGM_SURVEY; break;
      case GameStage.CONGRESS: trackUrl = AUDIO_ASSETS.BGM_CONGRESS; break;
      case GameStage.RESULT: 
        const isSuccess = stats.economy >= 80 && stats.people >= 80 && stats.stability >= 80;
        trackUrl = isSuccess ? AUDIO_ASSETS.BGM_SUCCESS : AUDIO_ASSETS.BGM_FAIL; 
        break;
      case GameStage.TIMELINE: trackUrl = AUDIO_ASSETS.BGM_FUTURE; break;
    }

    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.2;
    bgmRef.current = audio;

    if (stage !== GameStage.INTRO) {
      audio.play().catch(() => {});
    }

    return () => audio.pause();
  }, [stage, isMuted, stats]);

  const handleTimeUp = useCallback(() => {
    if (stage !== GameStage.RESULT && stage !== GameStage.INTRO && stage !== GameStage.TIMELINE) {
      alert("Hết thời gian! Cơ hội Đổi Mới đã vụt mất.");
      window.location.reload();
    }
  }, [stage]);

  return (
    <div className="relative min-h-screen bg-black text-gray-100">
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 right-6 z-[200] bg-black/60 p-4 rounded-full border border-white/20"
      >
        <span className="text-2xl">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      {stage !== GameStage.RESULT && stage !== GameStage.INTRO && stage !== GameStage.TIMELINE && (
        <>
          <GlitchOverlay />
          <Timer initialSeconds={180} onTimeUp={handleTimeUp} isActive={isTimerActive} />
        </>
      )}

      <main className="relative z-10">
        {stage === GameStage.INTRO && <IntroScreen onStart={() => { playSFX(AUDIO_ASSETS.SFX_CLICK); setStage(GameStage.SURVEY); setIsTimerActive(true); if(bgmRef.current) bgmRef.current.play(); }} />}
        {stage === GameStage.SURVEY && <SurveyScreen stats={stats} onComplete={() => setStage(GameStage.CONGRESS)} onSFX={playSFX} sfxAssets={AUDIO_ASSETS} />}
        {stage === GameStage.CONGRESS && <CongressScreen stats={stats} onComplete={(c, s) => { setChoices(c); setStats(s); setStage(GameStage.RESOLUTION); }} onSFX={playSFX} sfxAssets={AUDIO_ASSETS} />}
        {stage === GameStage.RESOLUTION && <ResolutionScreen choices={choices} onFinish={() => setStage(GameStage.RESULT)} onSFX={playSFX} sfxAssets={AUDIO_ASSETS} />}
        {stage === GameStage.RESULT && <ResultScreen stats={stats} onViewTimeline={() => setStage(GameStage.TIMELINE)} />}
        {stage === GameStage.TIMELINE && <TimelineScreen />}
      </main>
    </div>
  );
};

export default App;
