import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, Trophy, BarChart2, Play } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-slate-900">
      <div className="absolute inset-0">
        {/* 3D Scene */}
        <Spline
          scene="https://prod.spline.design/dqFV6s7w9m3wQ0Rm/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Ambient gradient overlay that doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-900/10" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 sm:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Ultra High-Fidelity 3D Cricket Scoring
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 max-w-2xl text-center text-slate-200/90"
        >
          Real-time scoring, rich statistics, and seamless livestreaming — crafted to outpace today’s best platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { icon: Rocket, label: 'Ultra Smooth' },
            { icon: Trophy, label: 'Pro Grade' },
            { icon: BarChart2, label: 'Deep Stats' },
            { icon: Play, label: 'Live Stream' },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white backdrop-blur-md"
            >
              <f.icon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
