import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Trophy, BarChart2, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
  >
    <div className="p-2 rounded-lg bg-white/10 text-white">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-white/80 text-sm">{desc}</p>
    </div>
  </motion.div>
);

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [splineError, setSplineError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        {mounted && !splineError ? (
          <Spline
            scene="https://prod.spline.design/6Yk5WWguqVv3a0k8/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
            onError={(e) => {
              // eslint-disable-next-line no-console
              console.error('Spline failed to load', e);
              setSplineError('Failed to load 3D scene');
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-indigo-900/60 to-slate-900/60" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />

      <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold text-white drop-shadow"
        >
          Ultra 3D Cricket Scoring
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 md:mt-4 text-white/90 max-w-2xl"
        >
          Real-time scoring, rich analytics, and smooth 3D visuals that elevate your match experience beyond anything you’ve used before.
        </motion.p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
          <FeatureCard icon={Rocket} title="Lightning Fast" desc="Instant updates with silky transitions." />
          <FeatureCard icon={Trophy} title="Match Ready" desc="Designed for live scoring and tournaments." />
          <FeatureCard icon={BarChart2} title="Deep Stats" desc="Strike rates, partnership, worm & more." />
          <FeatureCard icon={Video} title="Livestream" desc="Embed your broadcast seamlessly." />
        </div>

        {splineError && (
          <div className="mt-4 text-xs text-red-300 bg-red-500/10 border border-red-400/30 rounded p-2 w-fit">
            {splineError}
          </div>
        )}
      </div>
    </section>
  );
}
