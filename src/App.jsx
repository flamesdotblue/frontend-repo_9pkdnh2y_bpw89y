import React, { useState } from 'react';
import Hero3D from './components/Hero3D';
import LiveScoreboard from './components/LiveScoreboard';
import ScoringPanel from './components/ScoringPanel';
import StatsAndStream from './components/StatsAndStream';

export default function App() {
  const [match, setMatch] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Hero3D />

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <LiveScoreboard match={match} />
            <div className="mt-4">
              <StatsAndStream />
            </div>
          </div>
          <div className="md:col-span-1">
            <ScoringPanel onUpdate={(data) => {
              const overs = `${Math.floor((data.balls)/6)}.${(data.balls)%6}`;
              const rr = ((data.runs) / (data.balls/6)).toFixed(2);
              setMatch({
                home: 'Strikers',
                away: 'Warriors',
                score: `${data.runs}/${data.wickets}`,
                overs,
                runRate: isFinite(rr) ? rr : '0.00',
                wickets: data.wickets,
                target: 185,
              });
            }} />
          </div>
        </div>

        <footer className="mt-10 text-center text-sm text-slate-400">
          Built for precision scoring, data-rich analysis, and immersive viewing.
        </footer>
      </div>
    </div>
  );
}
