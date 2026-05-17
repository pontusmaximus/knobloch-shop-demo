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
  className?: string;
};

// Lighten/darken a hex color for highlights and shadows
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
  className,
}: Props) {
  const uid = useId().replace(/[:#]/g, "");

  const isMetal = material === "v2a" || material === "v4a" || material === "alu";
  const isFreestanding = mountingType === "freistehend";
  const isWall = mountingType === "aufputz" || mountingType === "unterputz";
  const isFence = mountingType === "zaun";
  const isHorizontal = orientation === "waagerecht";

  // Layout calculations
  const slotW = isHorizontal ? 100 : 80;
  const slotH = isHorizontal ? 56 : 70;
  const padding = 12;
  const bodyW = cols * slotW + padding * 2;
  const bodyH = rows * slotH + padding * 2;
  const packageH = hasPackage ? 110 : 0;
  const totalBodyH = bodyH + packageH;

  // Mounting-specific geometry
  const standH = isFreestanding ? 280 : 0;
  const totalH = totalBodyH + standH + 60;
  const viewW = Math.max(bodyW + 80, 480);
  const viewH = totalH + 40;

  const bodyX = (viewW - bodyW) / 2;
  const bodyY = 30;

  // Colors derived from base
  const baseColor = color;
  const lightColor = shadeColor(baseColor, isMetal ? 12 : 6);
  const darkColor = shadeColor(baseColor, isMetal ? -18 : -10);
  const shadowColor = shadeColor(baseColor, -35);
  const highlightOpacity = isMetal ? 0.55 : 0.18;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Briefkastenanlage Live-Vorschau"
    >
      <defs>
        {/* Brushed metal pattern for stainless */}
        <pattern id={`brush-${uid}`} patternUnits="userSpaceOnUse" width="2" height="6">
          <rect width="2" height="6" fill={baseColor} />
          <line x1="0" y1="0" x2="0" y2="6" stroke={shadeColor(baseColor, -8)} strokeWidth="0.5" opacity="0.4" />
          <line x1="1" y1="0" x2="1" y2="6" stroke={shadeColor(baseColor, 10)} strokeWidth="0.3" opacity="0.5" />
        </pattern>

        {/* Body gradient — top-down for depth */}
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="40%" stopColor={baseColor} />
          <stop offset="100%" stopColor={darkColor} />
        </linearGradient>

        {/* Vertical highlight for metallic sheen */}
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="15%" stopColor="white" stopOpacity={highlightOpacity * 0.6} />
          <stop offset="35%" stopColor="white" stopOpacity={highlightOpacity} />
          <stop offset="55%" stopColor="white" stopOpacity={highlightOpacity * 0.4} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Slot inner gradient — looks recessed */}
        <linearGradient id={`slot-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id={`shadow-${uid}`} x="-20%" y="-10%" width="140%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="2" dy="6" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ground / wall pattern */}
        <linearGradient id={`ground-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8EAEC" stopOpacity="0" />
          <stop offset="100%" stopColor="#A1A7AF" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Background context: wall behind for aufputz/unterputz, ground for freistehend */}
      {isWall && (
        <>
          {/* Wall texture */}
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F0EEE9" />
          <rect x="0" y="0" width={viewW} height={viewH} fill="url(#brush-stripes)" opacity="0.04" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={(viewH / 8) * i}
              x2={viewW}
              y2={(viewH / 8) * i}
              stroke="#D8D3CA"
              strokeWidth="0.4"
              opacity="0.5"
            />
          ))}
          {mountingType === "unterputz" && (
            // Recessed shadow around mailbox
            <rect
              x={bodyX - 4}
              y={bodyY - 4}
              width={bodyW + 8}
              height={totalBodyH + 8}
              fill="none"
              stroke="#000"
              strokeWidth="1"
              opacity="0.25"
              rx="2"
            />
          )}
        </>
      )}

      {isFreestanding && (
        <>
          {/* Sky/gradient background */}
          <rect x="0" y="0" width={viewW} height={viewH * 0.7} fill="#EEF0F2" />
          {/* Ground */}
          <rect
            x="0"
            y={viewH * 0.7}
            width={viewW}
            height={viewH * 0.3}
            fill="url(#ground-${uid})"
          />
          <rect x="0" y={viewH * 0.7} width={viewW} height={viewH * 0.3} fill="#C8CCD1" opacity="0.6" />
          {/* Ground shadow */}
          <ellipse
            cx={viewW / 2}
            cy={viewH - 24}
            rx={bodyW * 0.7}
            ry="10"
            fill="black"
            opacity="0.25"
          />
        </>
      )}

      {isFence && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F5F5F3" />
          {/* Fence posts */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={(viewW / 6) * i + 10}
              y="20"
              width="10"
              height={viewH - 80}
              fill="#1A1D21"
              opacity="0.8"
              rx="1"
            />
          ))}
        </>
      )}

      {mountingType === "tuerelement" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#FAF8F4" />
          {/* Door frame */}
          <rect
            x={viewW * 0.55}
            y="10"
            width={viewW * 0.4}
            height={viewH - 40}
            fill="#3E2B23"
            opacity="0.85"
            rx="2"
          />
          <rect
            x={viewW * 0.58}
            y="15"
            width={viewW * 0.34}
            height={viewH - 50}
            fill="#5A3D29"
            opacity="0.9"
            rx="1"
          />
        </>
      )}

      {mountingType === "mauerdurchwurf" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#EBE6DC" />
          {/* Brick pattern */}
          {Array.from({ length: 10 }).map((_, row) => (
            <g key={row}>
              {Array.from({ length: 8 }).map((_, col) => (
                <rect
                  key={col}
                  x={col * 65 + (row % 2 ? 32 : 0)}
                  y={row * 28}
                  width="60"
                  height="24"
                  fill="#D4CDBE"
                  stroke="#B5AC9A"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              ))}
            </g>
          ))}
        </>
      )}

      {/* Freestanding stand */}
      {isFreestanding && (
        <>
          <rect
            x={viewW / 2 - 10}
            y={bodyY + totalBodyH}
            width="20"
            height={standH}
            fill={`url(#body-${uid})`}
            stroke={darkColor}
            strokeWidth="0.5"
          />
          <rect
            x={viewW / 2 - 10}
            y={bodyY + totalBodyH}
            width="20"
            height={standH}
            fill={`url(#sheen-${uid})`}
          />
          {/* Base plate / concrete foundation indicator */}
          <rect
            x={viewW / 2 - 40}
            y={viewH - 30}
            width="80"
            height="8"
            fill="#A1A7AF"
            opacity="0.7"
            rx="1"
          />
        </>
      )}

      {/* Wall mount indicator for aufputz */}
      {mountingType === "aufputz" && (
        <>
          <rect
            x={bodyX + 6}
            y={bodyY + totalBodyH - 4}
            width={bodyW - 12}
            height="2"
            fill="black"
            opacity="0.2"
          />
        </>
      )}

      {/* MAIN BODY */}
      <g filter={`url(#shadow-${uid})`}>
        {/* Body with material */}
        <rect
          x={bodyX}
          y={bodyY}
          width={bodyW}
          height={totalBodyH}
          fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
          rx="3"
          stroke={shadowColor}
          strokeWidth="0.8"
        />

        {/* Sheen overlay for metallic look */}
        {isMetal && (
          <rect
            x={bodyX}
            y={bodyY}
            width={bodyW}
            height={totalBodyH}
            fill={`url(#sheen-${uid})`}
            rx="3"
            pointerEvents="none"
          />
        )}

        {/* Top reflection edge */}
        <rect
          x={bodyX + 2}
          y={bodyY + 1}
          width={bodyW - 4}
          height="1.5"
          fill="white"
          opacity={isMetal ? "0.5" : "0.25"}
          rx="0.5"
        />

        {/* Compartment grid */}
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const cx = bodyX + padding + col * slotW;
            const cy = bodyY + padding + row * slotH;
            return (
              <g key={`${row}-${col}`}>
                {/* Door outline */}
                <rect
                  x={cx + 3}
                  y={cy + 3}
                  width={slotW - 6}
                  height={slotH - 6}
                  fill="none"
                  stroke={shadowColor}
                  strokeWidth="0.6"
                  opacity="0.55"
                  rx="1"
                />
                {/* Letter slot */}
                <rect
                  x={cx + 10}
                  y={cy + 12}
                  width={slotW - 20}
                  height="3"
                  fill={`url(#slot-${uid})`}
                  rx="1"
                />
                {/* Slot highlight */}
                <line
                  x1={cx + 10}
                  y1={cy + 11.5}
                  x2={cx + slotW - 10}
                  y2={cy + 11.5}
                  stroke="white"
                  strokeWidth="0.4"
                  opacity={isMetal ? "0.6" : "0.3"}
                />

                {/* Name plate */}
                <rect
                  x={cx + 10}
                  y={cy + 22}
                  width={slotW - 20}
                  height="10"
                  fill="white"
                  opacity="0.85"
                  rx="1"
                  stroke={shadowColor}
                  strokeWidth="0.3"
                />
                {/* Name placeholder lines */}
                <line
                  x1={cx + 14}
                  y1={cy + 27}
                  x2={cx + slotW - 14}
                  y2={cy + 27}
                  stroke={shadowColor}
                  strokeWidth="0.4"
                  opacity="0.4"
                />

                {/* Lock keyhole */}
                <circle cx={cx + slotW - 12} cy={cy + slotH - 14} r="2.2" fill={shadowColor} opacity="0.7" />
                <circle cx={cx + slotW - 12} cy={cy + slotH - 14} r="1" fill="black" opacity="0.85" />

                {/* Hinge dots (left side) */}
                <circle cx={cx + 6} cy={cy + 8} r="0.6" fill={shadowColor} opacity="0.6" />
                <circle cx={cx + 6} cy={cy + slotH - 8} r="0.6" fill={shadowColor} opacity="0.6" />
              </g>
            );
          })
        )}

        {/* Package compartment (bottom) */}
        {hasPackage && (
          <g>
            <rect
              x={bodyX + padding}
              y={bodyY + bodyH}
              width={bodyW - padding * 2}
              height={packageH - padding}
              fill="none"
              stroke={shadowColor}
              strokeWidth="0.8"
              opacity="0.7"
              rx="2"
            />
            {/* Package door inset */}
            <rect
              x={bodyX + padding + 4}
              y={bodyY + bodyH + 4}
              width={bodyW - padding * 2 - 8}
              height={packageH - padding - 8}
              fill="none"
              stroke={shadowColor}
              strokeWidth="0.4"
              opacity="0.4"
              rx="1.5"
            />
            {/* Package label */}
            <rect
              x={bodyX + bodyW / 2 - 30}
              y={bodyY + bodyH + packageH / 2 - 16}
              width="60"
              height="16"
              fill="white"
              opacity="0.92"
              rx="1.5"
              stroke={shadowColor}
              strokeWidth="0.3"
            />
            <text
              x={bodyX + bodyW / 2}
              y={bodyY + bodyH + packageH / 2 - 5}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill={shadowColor}
              letterSpacing="1"
            >
              PAKET
            </text>
            {/* Large keyhole */}
            <circle
              cx={bodyX + bodyW - 22}
              cy={bodyY + bodyH + packageH - 24}
              r="3.5"
              fill={shadowColor}
              opacity="0.8"
            />
            <circle
              cx={bodyX + bodyW - 22}
              cy={bodyY + bodyH + packageH - 24}
              r="1.5"
              fill="black"
            />
          </g>
        )}

        {/* KNOBLOCH logo plate */}
        <g>
          <rect
            x={bodyX + bodyW / 2 - 28}
            y={bodyY + totalBodyH - 8}
            width="56"
            height="6"
            fill={shadowColor}
            rx="0.5"
            opacity="0.92"
          />
          <text
            x={bodyX + bodyW / 2}
            y={bodyY + totalBodyH - 3.5}
            textAnchor="middle"
            fontSize="5"
            fontWeight="800"
            fill="white"
            letterSpacing="1.5"
          >
            KNOBLOCH
          </text>
        </g>
      </g>

      {/* Floor reflection for freestanding */}
      {isFreestanding && (
        <ellipse
          cx={viewW / 2}
          cy={viewH - 22}
          rx={bodyW * 0.5}
          ry="3"
          fill="black"
          opacity="0.15"
        />
      )}
    </svg>
  );
}
