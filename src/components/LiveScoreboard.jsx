import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TimerReset } from 'lucide-react';

export default function LiveScoreboard({ match }) {
  const {
    home = 'Team A',
    away = 'Team B',
    score = '142/3',
    overs = '17.2',
    runRate = '8.19',
    wickets = 3,
    target = 185,
  } = match || {};

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold">{home} vs {away}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-200/80">
          <Target className="h-4 w-4" /> Target {target}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="col-span-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 p-4">
          <div className="text-4xl font-extrabold tracking-tight">{score}</div>
          <div className="mt-1 text-sm text-slate-200/80">Overs {overs} • Wickets {wickets}</div>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wider text-slate-300">Run Rate</div>
          <div className="mt-1 text-2xl font-bold">{runRate}</div>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-300">
            <span>Over</span>
            <TimerReset className="h-4 w-4" />
          </div>
          <div className="mt-1 grid grid-cols-6 gap-1">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex h-8 items-center justify-center rounded-md bg-slate-800 text-sm">
                {['1','4','•','2','W','1'][i]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
