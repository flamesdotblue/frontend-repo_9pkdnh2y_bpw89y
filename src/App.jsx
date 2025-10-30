import React, { useCallback, useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import LiveScoreboard from './components/LiveScoreboard';
import ScoringPanel from './components/ScoringPanel';
import StatsAndStream from './components/StatsAndStream';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
          <div className="max-w-lg text-center">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="mt-2 text-white/80">The interface hit an unexpected error. Try reloading the page. If it continues, tell us what action triggered it.</p>
            <button className="mt-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20" onClick={() => window.location.reload()}>Reload</button>
            <pre className="mt-4 text-xs text-white/60 overflow-auto max-h-40 bg-white/5 p-3 rounded border border-white/10">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function applyEvent(prevState, event) {
  const state = { ...prevState };

  if (event.type === 'UNDO') {
    const last = state.events[state.events.length - 1];
    if (!last) return state;
    const remaining = state.events.slice(0, -1);
    return recomputeFromEvents({ ...state, events: remaining });
  }

  const newEvents = [...state.events, event];
  return recomputeFromEvents({ ...state, events: newEvents });
}

function recomputeFromEvents(base) {
  let runs = 0;
  let wickets = 0;
  let balls = 0;
  let boundaries = { fours: 0, sixes: 0 };
  const lastOver = [];

  for (const ev of base.events) {
    switch (ev.type) {
      case 'RUN': {
        runs += ev.runs || 0;
        if (ev.countsBall) balls += 1;
        if (ev.runs === 4) boundaries.fours += 1;
        if (ev.runs === 6) boundaries.sixes += 1;
        lastOver.push({ label: String(ev.runs), event: 'RUN' });
        break;
      }
      case 'EXTRA': {
        runs += ev.runs || 0;
        if (ev.countsBall) balls += 1;
        const label = ev.label || ev.subtype || 'Ex';
        lastOver.push({ label, event: 'EXTRA' });
        break;
      }
      case 'WICKET': {
        wickets += 1;
        balls += ev.countsBall ? 1 : 0;
        lastOver.push({ label: 'W', event: 'WICKET' });
        break;
      }
      default:
        break;
    }
    if (lastOver.length > 6) lastOver.shift();
  }

  const runRate = balls > 0 ? (runs * 6) / balls : 0;
  return {
    ...base,
    runs,
    wickets,
    balls,
    runRate,
    boundaries,
    lastOver,
  };
}

export default function App() {
  const [state, setState] = useState({
    battingTeam: 'Strikers',
    bowlingTeam: 'Titans',
    target: null,
    events: [],
    runs: 0,
    wickets: 0,
    balls: 0,
    runRate: 0,
    boundaries: { fours: 0, sixes: 0 },
    lastOver: [],
  });

  const handleUpdate = useCallback((event) => {
    setState(prev => applyEvent(prev, event));
  }, []);

  const pageBg = useMemo(() => (
    'min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900'
  ), []);

  return (
    <ErrorBoundary>
      <div className={pageBg}>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
          <Hero3D />

          <div className="mt-6 grid grid-cols-1 gap-4">
            <LiveScoreboard state={state} />
            <StatsAndStream state={state} />
            <ScoringPanel onUpdate={handleUpdate} />
          </div>

          <footer className="mt-8 text-center text-white/60 text-xs">
            Built for ultra high-fidelity live scoring with 3D visuals.
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
