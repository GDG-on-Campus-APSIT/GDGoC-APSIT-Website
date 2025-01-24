import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useCallback, useMemo } from "react";

const Beam = ({
  width,
  x,
  delay,
  duration,
}) => {
  const hue = Math.floor(Math.random() * 360);
  const ar = Math.floor(Math.random() * 10) + 1;

  return (
    <motion.div
      style={{
        "--x": `${x}`,
        "--width": `${width}`,
        "--aspect-ratio": `${ar}`,
        "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
      }}
      className={cn(
        "absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]",
        "sm:left-[var(--x)] sm:[width:calc(var(--width)/2)]" // Reduce width for small screens
      )}
      initial={{ y: "100vh", x: "-50%" }} // Use viewport height for compatibility
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export const WarpBackground = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(var(--border))",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay =
        Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

  return (
    <div
      className={cn(
        "relative rounded border p-[10rem] flex items-center justify-center", // Default padding
        "sm:p-[5rem] md:p-[8rem]", // Adjust padding for small and medium screens
        className
      )}
      {...props}
    >
      <div
        style={{
          "--perspective": `${perspective}px`,
          "--grid-color": gridColor,
          "--beam-size": `${beamSize}%`,
        }}
        className={cn(
          "pointer-events-none absolute left-0 top-0 size-full overflow-hidden",
          "[clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
        )}
      >
        {/* Top Side */}
        <div
          className={cn(
            "absolute [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)]",
            "[container-type:inline-size] [height:100vh] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100%]"
          )}
        >
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Bottom Side */}
        <div
          className={cn(
            "absolute top-full [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)]",
            "[container-type:inline-size] [height:100vh] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100%]"
          )}
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Left Side */}
        <div
          className={cn(
            "absolute left-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)]",
            "[container-type:inline-size] [height:100vh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100vh]"
          )}
        >
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* Right Side */}
        <div
          className={cn(
            "absolute right-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)]",
            "[container-type:inline-size] [height:100vh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [width:100vh]"
          )}
        >
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
