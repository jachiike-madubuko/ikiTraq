"use client";

import { motion } from "framer-motion";

interface Props {
  size?: number;
  labels?: boolean;
  interactive?: boolean;
  className?: string;
}

const circles = [
  { cx: 0, cy: -1, color: "var(--color-love)", label: "Love", lx: 0, ly: -1.62 },
  { cx: 1, cy: 0, color: "var(--color-skill)", label: "Good at", lx: 1.62, ly: 0 },
  { cx: 0, cy: 1, color: "var(--color-paid)", label: "Paid for", lx: 0, ly: 1.62 },
  { cx: -1, cy: 0, color: "var(--color-need)", label: "World needs", lx: -1.62, ly: 0 },
];

export function IkigaiVenn({ size = 360, labels = true, className = "" }: Props) {
  const unit = size / 5.2;
  const r = unit * 1.35;
  const cx0 = size / 2;
  const cy0 = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <g style={{ mixBlendMode: "normal" }}>
          {circles.map((c, i) => (
            <motion.circle
              key={c.label}
              cx={cx0 + c.cx * unit}
              cy={cy0 + c.cy * unit}
              r={r}
              fill={c.color}
              fillOpacity={0.4}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          ))}
        </g>
        {labels &&
          circles.map((c, i) => (
            <motion.text
              key={c.label}
              x={cx0 + c.lx * unit}
              y={cy0 + c.ly * unit}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-sans"
              fill="var(--fg)"
              fontSize={size * 0.04}
              fontWeight={600}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + 0.1 * i, duration: 0.6 }}
            >
              {c.label}
            </motion.text>
          ))}
        <motion.text
          x={cx0}
          y={cy0}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display"
          fill="var(--fg)"
          fontSize={size * 0.055}
          fontWeight={600}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          ikigai
        </motion.text>
      </svg>
    </div>
  );
}
