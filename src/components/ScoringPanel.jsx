import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Settings } from 'lucide-react';

const ballOptions = [
  { label: '0', val: 0 },
  { label: '1', val: 1 },
  { label: '2', val: 2 },
  { label: '3', val: 3 },
  { label: '4', val: 4 },
  { label: '6', val: 6 },
];

const specialOptions = [
  { label: 'Wd', type: 'wide' },
  { label: 'Nb', type: 'noball' },
  { label: 'Lb', type: 'legbye' },
  { label: 'W', type: 'wicket' },
];

export default function ScoringPanel({ onUpdate }) {
  const [localScore, setLocalScore] = useState({ runs: 142, wickets: 3, balls: 104 });

  const addRuns = (runs) => {
    setLocalScore((s) => {
      const balls = s.balls + 1; // legal delivery
      const next = { ...s, runs: s.runs + runs, balls };
      onUpdate?.(next);
      return next;
    });
  };

  const special = (type) => {
    setLocalScore((s) => {
      let next = { ...s };
      if (type === 'wicket') next = { ...next, wickets: next.wickets + 1, balls: next.balls + 1 };
      else if (type === 'wide' || type === 'noball') next = { ...next, runs: next.runs + 1 }; // extra, no ball count
      else if (type === 'legbye') next = { ...next, balls: next.balls + 1 };
      onUpdate?.(next);
      return next;
    });
  };

  const undo = () => {
    setLocalScore((s) => {
      const next = { ...s, runs: Math.max(0, s.runs - 1) };
      onUpdate?.(next);
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Scoring Controls</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
          <Settings className="h-4 w-4" /> Settings
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {ballOptions.map((b) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={b.label}
            onClick={() => addRuns(b.val)}
            className="rounded-xl bg-emerald-500/20 py-3 font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30 hover:bg-emerald-500/30"
          >
            {b.label}
          </motion.button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {specialOptions.map((s) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={s.label}
            onClick={() => special(s.type)}
            className="rounded-xl bg-white/10 py-3 font-semibold text-white ring-1 ring-inset ring-white/15 hover:bg-white/15"
          >
            {s.label}
          </motion.button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-300">Runs: {localScore.runs} • Wkts: {localScore.wickets} • Balls: {localScore.balls}</div>
        <div className="flex items-center gap-2">
          <button onClick={undo} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">
            <RotateCcw className="h-4 w-4" /> Undo
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={`${localScore.runs}-${localScore.wickets}-${localScore.balls}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 p-3 text-sm text-emerald-200"
        >
          Last update → Runs {localScore.runs}, Wickets {localScore.wickets}, Balls {localScore.balls}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
