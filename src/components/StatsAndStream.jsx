import React from 'react';
import { BarChart2, Users, Video } from 'lucide-react';

export default function StatsAndStream({ state }) {
  const { runs = 0, balls = 0, wickets = 0, target = null, boundaries = { fours: 0, sixes: 0 } } = state || {};
  const runRate = balls > 0 ? (runs * 6) / balls : 0;
  const needed = target ? Math.max(target - runs, 0) : null;
  const remainingBalls = 120 - balls; // default assume T20 for demo calculations
  const reqRate = target && remainingBalls > 0 ? (needed * 6) / remainingBalls : 0;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-white">
        <div className="flex items-center gap-2 mb-3 text-white/80 text-sm">
          <BarChart2 className="w-4 h-4" /> Advanced Stats
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Run Rate</div>
            <div className="text-xl font-bold">{runRate.toFixed(2)}</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Required Rate</div>
            <div className="text-xl font-bold">{target ? reqRate.toFixed(2) : '-'}</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Wickets</div>
            <div className="text-xl font-bold">{wickets}</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Fours</div>
            <div className="text-xl font-bold">{boundaries.fours}</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Sixes</div>
            <div className="text-xl font-bold">{boundaries.sixes}</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-white/60">Balls</div>
            <div className="text-xl font-bold">{balls}</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-white">
        <div className="flex items-center gap-2 mb-3 text-white/80 text-sm">
          <Video className="w-4 h-4" /> Livestream
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
            title="Livestream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="mt-3 text-xs text-white/60 flex items-center gap-2">
          <Users className="w-4 h-4" /> Viewers: 1.2k (demo)
        </div>
      </div>
    </section>
  );
}
