import React from 'react';
import { Trophy, Timer, Target } from 'lucide-react';

function formatOvers(balls) {
  const overs = Math.floor(balls / 6);
  const rem = balls % 6;
  return `${overs}.${rem}`;
}

export default function LiveScoreboard({ state }) {
  const {
    battingTeam = 'Team A',
    bowlingTeam = 'Team B',
    runs = 0,
    wickets = 0,
    balls = 0,
    runRate = 0,
    target = null,
    lastOver = [],
  } = state || {};

  return (
    <section className="w-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-green-500/20 border border-green-300/30">
            <Trophy className="w-5 h-5 text-green-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{battingTeam} vs {bowlingTeam}</h3>
            <p className="text-white/70 text-sm">Live Scoreboard</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold">
            {runs}/{wickets}
          </div>
          <div className="text-white/70 text-sm">Overs: {formatOvers(balls)} • RR: {runRate.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs text-white/60 flex items-center gap-2"><Timer className="w-4 h-4" /> Current Run Rate</div>
          <div className="text-xl font-bold">{runRate.toFixed(2)}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs text-white/60 flex items-center gap-2"><Target className="w-4 h-4" /> Target</div>
          <div className="text-xl font-bold">{target ? target : '-'}{target ? ` (${target - runs} needed)` : ''}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs text-white/60">Wickets</div>
          <div className="text-xl font-bold">{wickets}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="text-xs text-white/60">Overs</div>
          <div className="text-xl font-bold">{formatOvers(balls)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60">Last Over</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {lastOver.length === 0 && (
            <span className="text-white/60 text-sm">No balls recorded yet.</span>
          )}
          {lastOver.map((b, idx) => (
            <span key={idx} className={`px-2 py-1 rounded-lg text-sm border ${b.event === 'WICKET' ? 'bg-red-500/20 border-red-400/40' : 'bg-white/10 border-white/20'}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
