import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Video } from 'lucide-react';

export default function StatsAndStream() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white backdrop-blur-xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold">Advanced Statistics</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-200/90">
          <Stat label="Projection" value="186" />
          <Stat label="Win Probability" value="64%" />
          <Stat label="Partnership" value="54 (38)" />
          <Stat label="Boundaries" value="12 x 4s, 6 x 6s" />
          <Stat label="Dot Ball %" value="28%" />
          <Stat label="Bowling Economy" value="8.3" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-0 text-white backdrop-blur-xl"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold">Livestream</h3>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">LIVE</span>
        </div>
        <div className="aspect-video w-full bg-black/60">
          <iframe
            title="Live Stream"
            className="h-full w-full"
            src="https://player.vimeo.com/video/357274789?autoplay=1&muted=1&loop=1&background=1"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wider text-slate-300">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}
