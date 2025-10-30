import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default function ScoringPanel({ onUpdate }) {
  const [localLastOver, setLocalLastOver] = useState([]); // for quick view in panel
  const [history, setHistory] = useState([]); // local event history for undo labels

  const pushBallLabel = (label, event) => {
    setLocalLastOver(prev => {
      const next = [...prev, { label, event }];
      if (next.length > 6) next.shift();
      return next;
    });
    setHistory(prev => [...prev, { label, event }]);
  };

  const addRun = (runs) => {
    onUpdate({ type: 'RUN', runs, countsBall: true });
    pushBallLabel(String(runs), 'RUN');
  };

  const addExtra = (kind) => {
    // wides/noballs/leg-byes count as extras. Wides & No-balls do not count a legal ball.
    if (kind === 'WD') {
      onUpdate({ type: 'EXTRA', subtype: 'WIDE', runs: 1, countsBall: false, label: 'Wd' });
      pushBallLabel('Wd', 'EXTRA');
    } else if (kind === 'NB') {
      onUpdate({ type: 'EXTRA', subtype: 'NOBALL', runs: 1, countsBall: false, label: 'Nb' });
      pushBallLabel('Nb', 'EXTRA');
    } else if (kind === 'LB') {
      onUpdate({ type: 'EXTRA', subtype: 'LEGBYE', runs: 1, countsBall: true, label: 'Lb' });
      pushBallLabel('Lb', 'EXTRA');
    }
  };

  const wicket = () => {
    onUpdate({ type: 'WICKET', countsBall: true });
    pushBallLabel('W', 'WICKET');
  };

  const undo = () => {
    onUpdate({ type: 'UNDO' });
    setHistory(prev => prev.slice(0, -1));
    setLocalLastOver(prev => prev.slice(0, -1));
  };

  return (
    <section className="w-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Scoring Controls</h3>
        <Button onClick={undo} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Undo
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[0,1,2,3,4,6].map(n => (
          <Button key={n} onClick={() => addRun(n)}>{n}</Button>
        ))}
        <Button onClick={() => addRun(5)}>5</Button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button onClick={() => addExtra('WD')}>Wide</Button>
        <Button onClick={() => addExtra('NB')}>No Ball</Button>
        <Button onClick={() => addExtra('LB')}>Leg Bye</Button>
      </div>

      <div className="mt-4">
        <Button onClick={wicket} className="w-full bg-red-500/20 border-red-400/40 hover:bg-red-500/30">Wicket</Button>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60">Panel Last Over</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {localLastOver.map((b, idx) => (
            <span key={idx} className={`px-2 py-1 rounded-lg text-sm border ${b.event === 'WICKET' ? 'bg-red-500/20 border-red-400/40' : 'bg-white/10 border-white/20'}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
