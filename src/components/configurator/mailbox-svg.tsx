"use client";

import { useId } from "react";

type Props = {
  color: string;
  material: "stahl" | "alu" | "v2a" | "v4a";
  cols: 1 | 2 | 3 | 4;
  rows: number;
  hasPackage: boolean;
  mountingType: string;
  orientation: "senkrecht" | "waagerecht" | "xl";
  verkleidung: "ri244" | "ri241" | "ri234";
  funktionskasten: "bb0" | "bb1" | "bb2" | "bb3" | "bb4";
  ledHausnummer?: boolean;
  className?: string;
};

function shadeColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + Math.round((percent / 100) * 255)));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255)));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + Math.round((percent / 100) * 255)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function MailboxSVG({
  color,
  material,
  cols,
  rows,
  hasPackage,
  mountingType,
  orientation,
  verkleidung,
  funktionskasten,
  ledHausnummer,
  className,
}: Props) {
  const uid = useId().replace(/[:#]/g, "");

  const isStainless = material === "v2a" || material === "v4a";
  const isAlu = material === "alu";
  const isMetal = isStainless || isAlu;
  const isPowder = material === "stahl";

  const isFreestanding = mountingType === "freistehend";
  const isWall = mountingType === "aufputz" || mountingType === "unterputz";
  const isFence = mountingType === "zaun";
  const isHorizontal = orientation === "waagerecht";

  // Realistische Proportionen — höher und schmaler bei senkrecht
  const slotW = isHorizontal ? 110 : 88;
  const slotH = isHorizontal ? 62 : 78;
  const padding = 16;
  const bodyW = cols * slotW + padding * 2;
  const bodyH = rows * slotH + padding * 2;
  const packageH = hasPackage ? 120 : 0;

  const hasFunc = funktionskasten !== "bb0";
  const funcH = hasFunc ? (funktionskasten === "bb3" ? 96 : 72) : 0;
  const funcGap = hasFunc ? 8 : 0;

  const totalBodyH = bodyH + packageH + funcGap + funcH;

  const hasSeparateDach = verkleidung === "ri244";
  const dachH = hasSeparateDach ? 16 : 0;
  const dachOverhang = hasSeparateDach ? 10 : verkleidung === "ri241" ? 5 : 0;

  const standH = isFreestanding ? 320 : 0;
  const totalH = totalBodyH + dachH + standH + 80;
  const viewW = Math.max(bodyW + 140 + dachOverhang * 2, 560);
  const viewH = totalH + 60;

  const bodyX = (viewW - bodyW) / 2;
  const bodyY = 40 + dachH;

  const baseColor = color;
  const hi = shadeColor(baseColor, isStainless ? 24 : isAlu ? 18 : 8);
  const mid = shadeColor(baseColor, isMetal ? 4 : 2);
  const lo = shadeColor(baseColor, isMetal ? -22 : -14);
  const xlo = shadeColor(baseColor, isMetal ? -38 : -28);
  const shadowEdge = shadeColor(baseColor, -45);

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Briefkastenanlage Live-Vorschau"
    >
      <defs>
        {/* Brushed steel pattern — multi-layer for realism */}
        <pattern id={`brush-${uid}`} patternUnits="userSpaceOnUse" width="3" height="100">
          <rect width="3" height="100" fill={baseColor} />
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke={lo} strokeWidth="0.35" opacity="0.55" />
          <line x1="1.2" y1="0" x2="1.2" y2="100" stroke={hi} strokeWidth="0.25" opacity="0.45" />
          <line x1="2" y1="0" x2="2" y2="100" stroke={lo} strokeWidth="0.2" opacity="0.4" />
          <line x1="2.6" y1="0" x2="2.6" y2="100" stroke={hi} strokeWidth="0.15" opacity="0.6" />
        </pattern>

        {/* Powder coat — subtle noise pattern */}
        <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="noise" />
          <feColorMatrix
            in="noise"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            result="grainAlpha"
          />
          <feComposite in="grainAlpha" in2="SourceGraphic" operator="in" result="grainMasked" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainMasked" />
          </feMerge>
        </filter>

        {/* Main body gradient — top-down with side highlight */}
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hi} />
          <stop offset="15%" stopColor={mid} />
          <stop offset="70%" stopColor={baseColor} />
          <stop offset="100%" stopColor={lo} />
        </linearGradient>

        {/* Side specular highlight — light from top-left */}
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="8%" stopColor="white" stopOpacity={isStainless ? "0.5" : isAlu ? "0.35" : "0.18"} />
          <stop offset="22%" stopColor="white" stopOpacity={isStainless ? "0.18" : "0.1"} />
          <stop offset="55%" stopColor="white" stopOpacity="0" />
          <stop offset="78%" stopColor="white" stopOpacity={isStainless ? "0.1" : "0.04"} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Deep slot interior */}
        <linearGradient id={`slot-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
        </linearGradient>

        {/* Soft drop shadow */}
        <filter id={`shadow-${uid}`} x="-30%" y="-15%" width="160%" height="135%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="3" dy="8" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.32" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner shadow for compartment recess */}
        <filter id={`inset-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="black" floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="shadow" in2="SourceGraphic" operator="out" />
        </filter>

        {/* LED glow */}
        <radialGradient id={`led-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity="1" />
          <stop offset="40%" stopColor="#FFE066" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
        </radialGradient>

        {/* Wall plaster texture */}
        <filter id={`plaster-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" />
          <feColorMatrix values="0 0 0 0 0.92 0 0 0 0 0.91 0 0 0 0 0.87 0 0 0 0.06 0" />
        </filter>

        {/* Floor concrete texture */}
        <filter id={`concrete-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.82 0 0 0 0 0.83 0 0 0 0 0.85 0 0 0 0.15 0" />
        </filter>

        {/* Glass reflection for video camera lens */}
        <radialGradient id={`lens-${uid}`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#7BB7FF" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#1E3A8A" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#0A0F1A" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </radialGradient>

        {/* Mirror reflection clip path (for floor mirror) */}
        <clipPath id={`mirror-${uid}`}>
          <rect x="0" y={viewH - 60} width={viewW} height="60" />
        </clipPath>
      </defs>

      {/* ===== ENVIRONMENT BACKGROUND ===== */}
      {isWall && (
        <>
          {/* Wall base color */}
          <rect x="0" y="0" width={viewW} height={viewH} fill="#EFEAE0" />
          {/* Plaster texture overlay */}
          <rect x="0" y="0" width={viewW} height={viewH} filter={`url(#plaster-${uid})`} opacity="0.6" />
          {/* Subtle vertical light gradient */}
          <rect
            x="0"
            y="0"
            width={viewW}
            height={viewH}
            fill="url(#wall-light)"
            opacity="0.3"
          />
          <linearGradient id="wall-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>

          {mountingType === "unterputz" && (
            <>
              {/* Recess shadow — Briefkasten ist in der Wand eingelassen */}
              <rect
                x={bodyX - 5}
                y={bodyY - 5}
                width={bodyW + 10}
                height={totalBodyH + 10}
                fill="black"
                opacity="0.18"
                rx="2"
              />
              <rect
                x={bodyX - 3}
                y={bodyY - 3}
                width={bodyW + 6}
                height={totalBodyH + 6}
                fill="black"
                opacity="0.1"
                rx="1"
              />
            </>
          )}
        </>
      )}

      {isFreestanding && (
        <>
          {/* Sky gradient */}
          <defs>
            <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F3F6FA" />
              <stop offset="100%" stopColor="#E2E6EB" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={viewW} height={viewH * 0.7} fill={`url(#sky-${uid})`} />

          {/* Distant horizon */}
          <line
            x1="0"
            y1={viewH * 0.7}
            x2={viewW}
            y2={viewH * 0.7}
            stroke="#A8B0BB"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Ground / paved area */}
          <rect x="0" y={viewH * 0.7} width={viewW} height={viewH * 0.3} fill="#C8CDD3" />
          <rect
            x="0"
            y={viewH * 0.7}
            width={viewW}
            height={viewH * 0.3}
            filter={`url(#concrete-${uid})`}
            opacity="0.4"
          />

          {/* Paving stones lines */}
          {Array.from({ length: 4 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={viewH * 0.7 + 30 + i * 25}
              x2={viewW}
              y2={viewH * 0.7 + 30 + i * 25}
              stroke="#9099A3"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Soft ground shadow under mailbox */}
          <ellipse
            cx={viewW / 2}
            cy={viewH - 28}
            rx={bodyW * 0.75}
            ry="12"
            fill="black"
            opacity="0.28"
          />
          <ellipse
            cx={viewW / 2}
            cy={viewH - 28}
            rx={bodyW * 0.5}
            ry="6"
            fill="black"
            opacity="0.18"
          />
        </>
      )}

      {isFence && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F2F3F5" />
          {/* Slatted fence behind */}
          {Array.from({ length: Math.ceil(viewW / 24) }).map((_, i) => (
            <g key={i}>
              <rect
                x={i * 24 + 8}
                y="25"
                width="14"
                height={viewH - 90}
                fill="#2E3440"
                opacity="0.85"
                rx="1.5"
              />
              {/* Highlight on each slat */}
              <line
                x1={i * 24 + 9}
                y1="28"
                x2={i * 24 + 9}
                y2={viewH - 90}
                stroke="#4A5060"
                strokeWidth="0.6"
                opacity="0.7"
              />
            </g>
          ))}
          {/* Horizontal fence beam */}
          <rect x="0" y={viewH - 80} width={viewW} height="6" fill="#1F2937" />
        </>
      )}

      {mountingType === "tuerelement" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F8F4EC" />
          {/* Door panel on right side */}
          <rect
            x={viewW * 0.55}
            y="15"
            width={viewW * 0.4 - 8}
            height={viewH - 50}
            fill="#2D1A12"
            rx="3"
          />
          {/* Door grain */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={viewW * 0.55 + 5}
              y1={20 + (i * (viewH - 65)) / 12}
              x2={viewW * 0.95 - 5}
              y2={20 + (i * (viewH - 65)) / 12}
              stroke="#1A0F0A"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}
          {/* Door panel insets */}
          <rect
            x={viewW * 0.58}
            y="35"
            width={viewW * 0.34}
            height={viewH * 0.35}
            fill="none"
            stroke="#5D3826"
            strokeWidth="1"
            opacity="0.7"
            rx="2"
          />
        </>
      )}

      {mountingType === "mauerdurchwurf" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#EDE5D3" />
          {/* Brick wall pattern */}
          {Array.from({ length: 14 }).map((_, row) => (
            <g key={row}>
              {Array.from({ length: 10 }).map((_, col) => (
                <g key={col}>
                  <rect
                    x={col * 62 + (row % 2 ? 30 : 0)}
                    y={row * 24}
                    width="58"
                    height="22"
                    fill="#C4B58E"
                    stroke="#9C8E6F"
                    strokeWidth="0.8"
                    opacity="0.65"
                  />
                  {/* Brick texture detail */}
                  <line
                    x1={col * 62 + (row % 2 ? 30 : 0) + 2}
                    y1={row * 24 + 3}
                    x2={col * 62 + (row % 2 ? 30 : 0) + 56}
                    y2={row * 24 + 3}
                    stroke="#A89A78"
                    strokeWidth="0.3"
                    opacity="0.4"
                  />
                </g>
              ))}
            </g>
          ))}
        </>
      )}

      {/* ===== DACH / RI244 ===== */}
      {hasSeparateDach && (
        <g filter={`url(#shadow-${uid})`}>
          {/* Dachplatte mit Überstand */}
          <rect
            x={bodyX - dachOverhang}
            y={bodyY - dachH}
            width={bodyW + dachOverhang * 2}
            height={dachH}
            fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
            rx="2.5"
            stroke={shadowEdge}
            strokeWidth="0.6"
          />
          {/* Sheen on roof */}
          <rect
            x={bodyX - dachOverhang}
            y={bodyY - dachH}
            width={bodyW + dachOverhang * 2}
            height={dachH}
            fill={`url(#sheen-${uid})`}
            rx="2.5"
          />
          {/* Front edge of roof — sharp shadow line */}
          <line
            x1={bodyX - dachOverhang + 1}
            y1={bodyY - 0.5}
            x2={bodyX + bodyW + dachOverhang - 1}
            y2={bodyY - 0.5}
            stroke={xlo}
            strokeWidth="0.8"
            opacity="0.7"
          />
          {/* Top highlight */}
          <line
            x1={bodyX - dachOverhang + 3}
            y1={bodyY - dachH + 1.5}
            x2={bodyX + bodyW + dachOverhang - 3}
            y2={bodyY - dachH + 1.5}
            stroke="white"
            strokeWidth="0.6"
            opacity={isMetal ? "0.55" : "0.25"}
          />
          {/* Underside shadow under overhang */}
          <rect
            x={bodyX - dachOverhang}
            y={bodyY}
            width={bodyW + dachOverhang * 2}
            height="3"
            fill="black"
            opacity="0.22"
          />
        </g>
      )}

      {/* ===== FREISTEHENDE STANGE ===== */}
      {isFreestanding && (
        <>
          {/* Hauptpfosten */}
          <g filter={`url(#shadow-${uid})`}>
            <rect
              x={viewW / 2 - 11}
              y={bodyY + totalBodyH}
              width="22"
              height={standH}
              fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
              stroke={xlo}
              strokeWidth="0.6"
            />
            <rect
              x={viewW / 2 - 11}
              y={bodyY + totalBodyH}
              width="22"
              height={standH}
              fill={`url(#sheen-${uid})`}
            />
            {/* Befestigungs-Schraube am Übergang Briefkasten/Stange */}
            <circle
              cx={viewW / 2 - 7}
              cy={bodyY + totalBodyH + 8}
              r="1.5"
              fill={xlo}
              opacity="0.8"
            />
            <circle
              cx={viewW / 2 + 7}
              cy={bodyY + totalBodyH + 8}
              r="1.5"
              fill={xlo}
              opacity="0.8"
            />
          </g>
          {/* Bodenplatte / Beton */}
          <rect
            x={viewW / 2 - 42}
            y={viewH - 32}
            width="84"
            height="10"
            fill="#8B939E"
            rx="1"
          />
          <rect
            x={viewW / 2 - 42}
            y={viewH - 32}
            width="84"
            height="2"
            fill="#6A727D"
          />
          <rect
            x={viewW / 2 - 42}
            y={viewH - 24}
            width="84"
            height="2"
            fill="#A8B0BB"
            opacity="0.6"
          />
        </>
      )}

      {/* ===== HAUPTKÖRPER ===== */}
      <g filter={`url(#shadow-${uid})`}>
        {/* Body shape */}
        <rect
          x={bodyX}
          y={bodyY}
          width={bodyW}
          height={bodyH}
          fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
          rx={verkleidung === "ri234" ? "1.5" : "3"}
          stroke={xlo}
          strokeWidth="0.9"
        />

        {/* Top sheen for metal */}
        {isMetal && (
          <rect
            x={bodyX}
            y={bodyY}
            width={bodyW}
            height={bodyH}
            fill={`url(#sheen-${uid})`}
            rx={verkleidung === "ri234" ? "1.5" : "3"}
            pointerEvents="none"
          />
        )}

        {/* Powder coat grain */}
        {isPowder && (
          <rect
            x={bodyX}
            y={bodyY}
            width={bodyW}
            height={bodyH}
            fill={baseColor}
            filter={`url(#grain-${uid})`}
            rx={verkleidung === "ri234" ? "1.5" : "3"}
            opacity="0.15"
          />
        )}

        {/* RI241 integrated rain edge */}
        {verkleidung === "ri241" && (
          <>
            <rect
              x={bodyX - 4}
              y={bodyY - 3}
              width={bodyW + 8}
              height="5"
              fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
              rx="1"
              stroke={xlo}
              strokeWidth="0.6"
            />
            <rect
              x={bodyX - 4}
              y={bodyY + 1}
              width={bodyW + 8}
              height="1"
              fill="black"
              opacity="0.25"
            />
          </>
        )}

        {/* Top edge highlight */}
        <rect
          x={bodyX + 2}
          y={bodyY + 1}
          width={bodyW - 4}
          height="1.5"
          fill="white"
          opacity={isMetal ? "0.55" : "0.3"}
          rx="0.5"
        />

        {/* Bottom edge shadow */}
        <rect
          x={bodyX + 2}
          y={bodyY + bodyH - 2}
          width={bodyW - 4}
          height="1"
          fill="black"
          opacity="0.4"
          rx="0.5"
        />

        {/* ===== COMPARTMENT GRID — Realistic doors ===== */}
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const cx = bodyX + padding + col * slotW;
            const cy = bodyY + padding + row * slotH;
            const doorW = slotW - 8;
            const doorH = slotH - 8;
            return (
              <g key={`${row}-${col}`}>
                {/* Door bezel — outer frame with depth */}
                <rect
                  x={cx + 4}
                  y={cy + 4}
                  width={doorW}
                  height={doorH}
                  fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
                  stroke={xlo}
                  strokeWidth="0.5"
                  rx="1"
                />
                {/* Door inner edge — recessed look */}
                <rect
                  x={cx + 4}
                  y={cy + 4}
                  width={doorW}
                  height={doorH}
                  fill="none"
                  stroke="black"
                  strokeWidth="0.4"
                  opacity="0.35"
                  rx="1"
                />
                {/* Top door highlight */}
                <line
                  x1={cx + 5}
                  y1={cy + 5}
                  x2={cx + doorW + 3}
                  y2={cy + 5}
                  stroke="white"
                  strokeWidth="0.5"
                  opacity={isMetal ? "0.5" : "0.25"}
                />
                {/* Bottom door shadow */}
                <line
                  x1={cx + 5}
                  y1={cy + doorH + 3}
                  x2={cx + doorW + 3}
                  y2={cy + doorH + 3}
                  stroke="black"
                  strokeWidth="0.5"
                  opacity="0.35"
                />

                {/* Letter slot — deep with shadow */}
                <g>
                  <rect
                    x={cx + 11}
                    y={cy + 13}
                    width={slotW - 22}
                    height="5"
                    fill={`url(#slot-${uid})`}
                    rx="0.5"
                  />
                  {/* Slot top edge highlight (catches light) */}
                  <line
                    x1={cx + 11}
                    y1={cy + 12.5}
                    x2={cx + slotW - 11}
                    y2={cy + 12.5}
                    stroke="white"
                    strokeWidth="0.4"
                    opacity={isMetal ? "0.65" : "0.35"}
                  />
                  {/* Slot bottom edge */}
                  <line
                    x1={cx + 11}
                    y1={cy + 18}
                    x2={cx + slotW - 11}
                    y2={cy + 18}
                    stroke="black"
                    strokeWidth="0.4"
                    opacity="0.55"
                  />
                  {/* Slot inner shadow on left/right */}
                  <line
                    x1={cx + 11.5}
                    y1={cy + 13.5}
                    x2={cx + 11.5}
                    y2={cy + 17.5}
                    stroke="black"
                    strokeWidth="0.6"
                    opacity="0.45"
                  />
                </g>

                {/* Name plate with frame */}
                <g>
                  <rect
                    x={cx + 10}
                    y={cy + 24}
                    width={slotW - 20}
                    height="14"
                    fill={xlo}
                    rx="1"
                  />
                  <rect
                    x={cx + 11}
                    y={cy + 25}
                    width={slotW - 22}
                    height="12"
                    fill="white"
                    opacity="0.95"
                    rx="0.5"
                  />
                  {/* Name placeholder lines */}
                  <line
                    x1={cx + 14}
                    y1={cy + 30}
                    x2={cx + slotW - 14}
                    y2={cy + 30}
                    stroke={xlo}
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                  <line
                    x1={cx + 14}
                    y1={cy + 34}
                    x2={cx + slotW - 18}
                    y2={cy + 34}
                    stroke={xlo}
                    strokeWidth="0.5"
                    opacity="0.35"
                  />
                </g>

                {/* Real lock cylinder — outer ring + cylinder + slot indicator */}
                <g transform={`translate(${cx + slotW - 14}, ${cy + slotH - 14})`}>
                  {/* Outer mounting ring */}
                  <circle r="4" fill={xlo} opacity="0.95" />
                  {/* Cylinder face */}
                  <circle r="3" fill={shadowEdge} />
                  {/* Inner metal */}
                  <circle r="2.6" fill={isMetal ? "#4A5060" : "#2A2F38"} />
                  {/* Highlight on cylinder */}
                  <circle cx="-0.7" cy="-0.7" r="1.2" fill="white" opacity="0.3" />
                  {/* Key slot */}
                  <rect x="-1.4" y="-0.3" width="2.8" height="0.6" fill="black" rx="0.2" />
                </g>

                {/* Door handle — vertical recess on right side */}
                <rect
                  x={cx + slotW - 8}
                  y={cy + slotH / 2 - 8}
                  width="1.5"
                  height="16"
                  fill="black"
                  opacity="0.25"
                  rx="0.5"
                />

                {/* Hinge dots — left side */}
                <circle cx={cx + 6.5} cy={cy + 8} r="0.7" fill={xlo} opacity="0.8" />
                <circle cx={cx + 6.5} cy={cy + slotH - 8} r="0.7" fill={xlo} opacity="0.8" />
              </g>
            );
          })
        )}

        {/* Corner screws — 4 visible mounting points */}
        {[
          [bodyX + 4, bodyY + 4],
          [bodyX + bodyW - 4, bodyY + 4],
          [bodyX + 4, bodyY + bodyH - 4],
          [bodyX + bodyW - 4, bodyY + bodyH - 4],
        ].map(([sx, sy], i) => (
          <g key={i}>
            <circle cx={sx} cy={sy} r="1.6" fill={xlo} opacity="0.95" />
            <circle cx={sx - 0.4} cy={sy - 0.4} r="0.5" fill="white" opacity="0.5" />
            <line
              x1={sx - 1}
              y1={sy}
              x2={sx + 1}
              y2={sy}
              stroke="black"
              strokeWidth="0.4"
              opacity="0.7"
            />
          </g>
        ))}

        {/* ===== PACKAGE COMPARTMENT ===== */}
        {hasPackage && (
          <g>
            {/* Outer pkg frame */}
            <rect
              x={bodyX + padding}
              y={bodyY + bodyH + 2}
              width={bodyW - padding * 2}
              height={packageH - 4}
              fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
              stroke={xlo}
              strokeWidth="0.7"
              rx="2"
            />
            {/* Sheen */}
            {isMetal && (
              <rect
                x={bodyX + padding}
                y={bodyY + bodyH + 2}
                width={bodyW - padding * 2}
                height={packageH - 4}
                fill={`url(#sheen-${uid})`}
                rx="2"
              />
            )}
            {/* Door inset */}
            <rect
              x={bodyX + padding + 5}
              y={bodyY + bodyH + 7}
              width={bodyW - padding * 2 - 10}
              height={packageH - 14}
              fill="none"
              stroke="black"
              strokeWidth="0.4"
              opacity="0.35"
              rx="1.5"
            />
            {/* Top inset highlight */}
            <line
              x1={bodyX + padding + 6}
              y1={bodyY + bodyH + 8}
              x2={bodyX + bodyW - padding - 6}
              y2={bodyY + bodyH + 8}
              stroke="white"
              strokeWidth="0.4"
              opacity={isMetal ? "0.5" : "0.25"}
            />

            {/* Large package label plate */}
            <rect
              x={bodyX + bodyW / 2 - 35}
              y={bodyY + bodyH + packageH / 2 - 14}
              width="70"
              height="20"
              fill={xlo}
              rx="2"
            />
            <rect
              x={bodyX + bodyW / 2 - 34}
              y={bodyY + bodyH + packageH / 2 - 13}
              width="68"
              height="18"
              fill="white"
              opacity="0.95"
              rx="1.5"
            />
            <text
              x={bodyX + bodyW / 2}
              y={bodyY + bodyH + packageH / 2 - 0.5}
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fill={shadowEdge}
              letterSpacing="2"
            >
              PAKET
            </text>

            {/* Large package handle — horizontal bar */}
            <g transform={`translate(${bodyX + bodyW - 32}, ${bodyY + bodyH + packageH - 24})`}>
              <rect x="-12" y="-2" width="24" height="4" fill={xlo} rx="2" opacity="0.95" />
              <rect x="-11" y="-1.5" width="22" height="1" fill="white" opacity="0.3" rx="0.5" />
            </g>

            {/* Large lock with PIN-pad indicator */}
            <g transform={`translate(${bodyX + 28}, ${bodyY + bodyH + packageH - 24})`}>
              <circle r="6" fill={xlo} opacity="0.95" />
              <circle r="5" fill={shadowEdge} />
              <circle r="4.5" fill={isMetal ? "#4A5060" : "#2A2F38"} />
              <circle cx="-1" cy="-1" r="1.5" fill="white" opacity="0.3" />
              {/* PIN indicator dots */}
              {[0, 1, 2, 3].map((d) => (
                <circle
                  key={d}
                  cx={(d - 1.5) * 1.6}
                  cy="0"
                  r="0.5"
                  fill="#3B82F6"
                  opacity="0.85"
                />
              ))}
            </g>
          </g>
        )}

        {/* ===== FUNKTIONSKASTEN ===== */}
        {hasFunc &&
          (() => {
            const fy = bodyY + bodyH + packageH + funcGap;
            const fx = bodyX;
            const fw = bodyW;

            return (
              <g>
                {/* Outer body */}
                <rect
                  x={fx}
                  y={fy}
                  width={fw}
                  height={funcH}
                  fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
                  rx="2.5"
                  stroke={xlo}
                  strokeWidth="0.7"
                />
                {isMetal && (
                  <rect
                    x={fx}
                    y={fy}
                    width={fw}
                    height={funcH}
                    fill={`url(#sheen-${uid})`}
                    rx="2.5"
                  />
                )}
                {/* Top edge highlight */}
                <line
                  x1={fx + 2}
                  y1={fy + 1}
                  x2={fx + fw - 2}
                  y2={fy + 1}
                  stroke="white"
                  strokeWidth="0.5"
                  opacity={isMetal ? "0.5" : "0.25"}
                />

                {/* bb1: Basic — Sprechgrille + Namensschild + Klingeltaster */}
                {funktionskasten === "bb1" && (
                  <>
                    {/* Speaker grille — recessed circular pattern */}
                    <g transform={`translate(${fx + 14}, ${fy + 16})`}>
                      <rect width="48" height="36" fill="black" opacity="0.25" rx="2" />
                      {Array.from({ length: 6 }).map((_, r) =>
                        Array.from({ length: 9 }).map((_, c) => (
                          <circle
                            key={`${r}-${c}`}
                            cx={c * 5 + 4}
                            cy={r * 5 + 4}
                            r="1.1"
                            fill={shadowEdge}
                            opacity="0.85"
                          />
                        ))
                      )}
                    </g>
                    {/* Name plate */}
                    <rect
                      x={fx + 70}
                      y={fy + 18}
                      width={fw - 130}
                      height="32"
                      fill={xlo}
                      rx="1.5"
                    />
                    <rect
                      x={fx + 71}
                      y={fy + 19}
                      width={fw - 132}
                      height="30"
                      fill="white"
                      opacity="0.95"
                      rx="1"
                    />
                    {/* Name lines */}
                    {[0, 1, 2].map((i) => (
                      <line
                        key={i}
                        x1={fx + 76}
                        y1={fy + 25 + i * 8}
                        x2={fx + fw - 138}
                        y2={fy + 25 + i * 8}
                        stroke={xlo}
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    ))}
                    {/* Bell push button with LED */}
                    <g transform={`translate(${fx + fw - 30}, ${fy + funcH / 2})`}>
                      <circle r="10" fill={xlo} opacity="0.95" />
                      <circle r="8" fill="#E8EAEC" />
                      <circle r="6.5" fill="#F1F3F5" />
                      <circle cx="-2" cy="-2" r="2.5" fill="white" opacity="0.7" />
                      {/* Bell icon */}
                      <path
                        d="M-2.5 -1.5 L-1 -3.5 L1 -3.5 L2.5 -1.5 L2 0.5 L-2 0.5 Z"
                        fill={shadowEdge}
                        opacity="0.7"
                      />
                      <circle cx="0" cy="2.5" r="0.6" fill={shadowEdge} opacity="0.7" />
                    </g>
                  </>
                )}

                {/* bb2: Audio system */}
                {funktionskasten === "bb2" && (
                  <>
                    {/* Larger speaker grille */}
                    <g transform={`translate(${fx + 12}, ${fy + 12})`}>
                      <rect width="58" height="46" fill="black" opacity="0.25" rx="2" />
                      {Array.from({ length: 8 }).map((_, r) =>
                        Array.from({ length: 12 }).map((_, c) => (
                          <circle
                            key={`${r}-${c}`}
                            cx={c * 4.5 + 3}
                            cy={r * 5 + 3}
                            r="1"
                            fill={shadowEdge}
                            opacity="0.85"
                          />
                        ))
                      )}
                    </g>
                    {/* Audio status indicator strip */}
                    <rect
                      x={fx + 75}
                      y={fy + 15}
                      width={fw - 130}
                      height="14"
                      fill={shadowEdge}
                      rx="1.5"
                      opacity="0.85"
                    />
                    <text
                      x={fx + 75 + (fw - 130) / 2}
                      y={fy + 24}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="700"
                      fill="white"
                      letterSpacing="2"
                    >
                      AUDIO 2-DRAHT
                    </text>
                    {/* Multiple bell buttons per unit */}
                    {Array.from({ length: Math.min(cols * rows, 6) }).map((_, i) => {
                      const bx = fx + 75 + (i % 3) * 22;
                      const by = fy + 38 + Math.floor(i / 3) * 16;
                      return (
                        <g key={i} transform={`translate(${bx}, ${by})`}>
                          <circle r="6" fill={xlo} opacity="0.9" />
                          <circle r="4.5" fill="#E8EAEC" />
                          <circle cx="-1" cy="-1" r="1.5" fill="white" opacity="0.7" />
                        </g>
                      );
                    })}
                    {/* Main speak button */}
                    <g transform={`translate(${fx + fw - 28}, ${fy + funcH / 2})`}>
                      <circle r="12" fill={xlo} opacity="0.95" />
                      <circle r="10" fill={shadowEdge} />
                      <circle r="8" fill="#4A5060" />
                      <circle cx="-2" cy="-2" r="2.5" fill="white" opacity="0.45" />
                      {/* Mic grid in the speak button */}
                      {Array.from({ length: 3 }).map((_, r) =>
                        Array.from({ length: 3 }).map((_, c) => (
                          <circle
                            key={`${r}-${c}`}
                            cx={(c - 1) * 2}
                            cy={(r - 1) * 2}
                            r="0.5"
                            fill="black"
                            opacity="0.8"
                          />
                        ))
                      )}
                    </g>
                  </>
                )}

                {/* bb3: Video system */}
                {funktionskasten === "bb3" && (
                  <>
                    {/* Camera module — top center, very realistic */}
                    <g transform={`translate(${fx + fw / 2 - 18}, ${fy + 10})`}>
                      {/* Camera housing */}
                      <rect width="36" height="28" fill={shadowEdge} rx="3" />
                      <rect x="1" y="1" width="34" height="26" fill="#1F2937" rx="2" />
                      {/* Lens housing */}
                      <circle cx="18" cy="14" r="9" fill="#0A0F1A" stroke="#2A2F38" strokeWidth="0.6" />
                      {/* Lens glass */}
                      <circle cx="18" cy="14" r="7.5" fill={`url(#lens-${uid})`} />
                      {/* Lens iris */}
                      <circle cx="18" cy="14" r="4.5" fill="#000" />
                      {/* Lens highlights */}
                      <circle cx="15.5" cy="11.5" r="1.5" fill="white" opacity="0.7" />
                      <circle cx="15.5" cy="11.5" r="0.6" fill="white" />
                      <circle cx="20.5" cy="16" r="0.4" fill="white" opacity="0.4" />
                      {/* IR sensor */}
                      <circle cx="6" cy="6" r="1" fill="#7BB7FF" opacity="0.5" />
                      <circle cx="6" cy="6" r="0.4" fill="white" />
                      {/* Status LED */}
                      <circle cx="30" cy="6" r="0.8" fill="#10B981" />
                      <circle cx="30" cy="6" r="0.4" fill="#86EFAC" />
                    </g>

                    {/* Microphone grille — left side */}
                    <g transform={`translate(${fx + 14}, ${fy + 14})`}>
                      <rect width="22" height="20" fill="black" opacity="0.3" rx="1.5" />
                      {Array.from({ length: 4 }).map((_, r) =>
                        Array.from({ length: 5 }).map((_, c) => (
                          <circle
                            key={`${r}-${c}`}
                            cx={c * 4 + 3}
                            cy={r * 4 + 3}
                            r="0.7"
                            fill={shadowEdge}
                            opacity="0.85"
                          />
                        ))
                      )}
                    </g>

                    {/* Touchscreen with name buttons */}
                    <rect
                      x={fx + 10}
                      y={fy + 42}
                      width={fw - 20}
                      height={funcH - 52}
                      fill={shadowEdge}
                      rx="2"
                    />
                    <rect
                      x={fx + 11}
                      y={fy + 43}
                      width={fw - 22}
                      height={funcH - 54}
                      fill="#0F1419"
                      rx="1.5"
                    />
                    {/* Screen glow */}
                    <rect
                      x={fx + 11}
                      y={fy + 43}
                      width={fw - 22}
                      height={funcH - 54}
                      fill={`url(#screen-glow-${uid})`}
                      opacity="0.4"
                      rx="1.5"
                    />
                    <radialGradient id={`screen-glow-${uid}`} cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </radialGradient>
                    {/* Name list on screen */}
                    {Array.from({ length: Math.min(rows * cols, 5) }).map((_, i) => (
                      <g key={i}>
                        <rect
                          x={fx + 14}
                          y={fy + 46 + i * 7}
                          width={fw - 28}
                          height="5"
                          fill="white"
                          opacity="0.08"
                          rx="0.5"
                        />
                        <line
                          x1={fx + 18}
                          y1={fy + 48.5 + i * 7}
                          x2={fx + fw - 38}
                          y2={fy + 48.5 + i * 7}
                          stroke="white"
                          strokeWidth="0.3"
                          opacity="0.6"
                        />
                        <circle
                          cx={fx + fw - 24}
                          cy={fy + 48.5 + i * 7}
                          r="1.5"
                          fill="#3B82F6"
                          opacity="0.8"
                        />
                      </g>
                    ))}
                  </>
                )}

                {/* bb4: Custom stanzungen */}
                {funktionskasten === "bb4" && (
                  <>
                    {/* QR Reader stanzung */}
                    <g transform={`translate(${fx + 12}, ${fy + 14})`}>
                      <rect width="40" height="32" fill="black" opacity="0.45" rx="2" />
                      <rect x="2" y="2" width="36" height="28" fill="white" opacity="0.92" rx="1" />
                      {/* QR pattern */}
                      <g transform="translate(8, 8)">
                        {[
                          [0, 0],
                          [1, 0],
                          [2, 0],
                          [0, 1],
                          [2, 1],
                          [0, 2],
                          [1, 2],
                          [2, 2],
                          [5, 0],
                          [5, 1],
                          [4, 2],
                          [5, 2],
                          [0, 5],
                          [1, 4],
                          [2, 5],
                          [4, 4],
                          [5, 5],
                          [3, 3],
                        ].map(([qx, qy], i) => (
                          <rect
                            key={i}
                            x={qx * 3}
                            y={qy * 3}
                            width="2.5"
                            height="2.5"
                            fill="black"
                          />
                        ))}
                      </g>
                    </g>

                    {/* Card scanner */}
                    <g transform={`translate(${fx + 60}, ${fy + 14})`}>
                      <rect width="50" height="32" fill={shadowEdge} rx="2.5" />
                      <rect x="2" y="2" width="46" height="28" fill="#1F2937" rx="1.5" />
                      {/* LED panel */}
                      <rect x="6" y="8" width="38" height="16" fill="#0F1419" rx="1" />
                      <text
                        x="25"
                        y="18"
                        textAnchor="middle"
                        fontSize="5"
                        fontWeight="700"
                        fill="#10B981"
                        letterSpacing="1.5"
                      >
                        SCAN
                      </text>
                      <circle cx="44" cy="6" r="1" fill="#10B981" />
                    </g>

                    {/* Transponder reader */}
                    <g transform={`translate(${fx + fw - 50}, ${fy + 14})`}>
                      <circle cx="20" cy="16" r="14" fill={shadowEdge} opacity="0.95" />
                      <circle cx="20" cy="16" r="11" fill="#1F2937" />
                      {/* RFID waves */}
                      <circle cx="20" cy="16" r="3" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.8" />
                      <circle cx="20" cy="16" r="6" fill="none" stroke="#3B82F6" strokeWidth="0.7" opacity="0.5" />
                      <circle cx="20" cy="16" r="9" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
                    </g>
                  </>
                )}
              </g>
            );
          })()}

        {/* KNOBLOCH logo plate at bottom */}
        <g>
          <rect
            x={bodyX + bodyW / 2 - 32}
            y={bodyY + totalBodyH - 10}
            width="64"
            height="7"
            fill={xlo}
            rx="0.5"
            opacity="0.95"
          />
          <rect
            x={bodyX + bodyW / 2 - 31}
            y={bodyY + totalBodyH - 9.5}
            width="62"
            height="1"
            fill="white"
            opacity="0.3"
            rx="0.2"
          />
          <text
            x={bodyX + bodyW / 2}
            y={bodyY + totalBodyH - 5}
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="800"
            fill="white"
            letterSpacing="2"
          >
            KNOBLOCH
          </text>
        </g>
      </g>

      {/* ===== LED HAUSNUMMER ===== */}
      {ledHausnummer && (
        <g>
          {/* Glow */}
          <circle cx={bodyX - 20} cy={bodyY + bodyH / 2} r="28" fill={`url(#led-${uid})`} opacity="0.9" />
          {/* Plate */}
          <rect
            x={bodyX - 28}
            y={bodyY + bodyH / 2 - 10}
            width="16"
            height="20"
            fill={xlo}
            rx="1.5"
          />
          <rect
            x={bodyX - 27}
            y={bodyY + bodyH / 2 - 9}
            width="14"
            height="18"
            fill="#FFFBE6"
            opacity="0.92"
            rx="1"
          />
          <text
            x={bodyX - 20}
            y={bodyY + bodyH / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#1F2937"
          >
            79
          </text>
        </g>
      )}

      {/* ===== FLOOR REFLECTION ===== */}
      {isFreestanding && (
        <g clipPath={`url(#mirror-${uid})`} opacity="0.18">
          {/* Mirrored body silhouette */}
          <g transform={`translate(0, ${viewH - 30}) scale(1, -0.3)`}>
            <rect
              x={bodyX}
              y={-bodyY - totalBodyH}
              width={bodyW}
              height={totalBodyH}
              fill={baseColor}
              rx="3"
            />
            <rect
              x={viewW / 2 - 11}
              y={-bodyY - totalBodyH - standH}
              width="22"
              height={standH}
              fill={baseColor}
            />
          </g>
        </g>
      )}
    </svg>
  );
}
