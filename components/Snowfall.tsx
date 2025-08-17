'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const initialSnowflakes = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.4 + 0.4,
      rotation: Math.random() * 360
    }));

    setSnowflakes(initialSnowflakes);

    const interval = setInterval(() => {
      setSnowflakes(prevFlakes => 
        prevFlakes.map(flake => ({
          ...flake,
          y: flake.y >= 100 ? -10 : flake.y + flake.speed * 0.15,
          x: flake.y >= 100 ? Math.random() * 100 : flake.x + (Math.random() * 0.5 - 0.25),
          rotation: flake.rotation + 0.5
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            opacity: flake.opacity,
            transform: `translate(-50%, -50%) rotate(${flake.rotation}deg)`,
            transition: 'all 50ms linear',
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            stroke="white"
            strokeWidth="1"
          >
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" strokeWidth="1.5" />
            <path d="M50 0 L50 100" />
            <path d="M6.7 25 L93.3 75" />
            <path d="M6.7 75 L93.3 25" />
            <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" strokeWidth="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
} 