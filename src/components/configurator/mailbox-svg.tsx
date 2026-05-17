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

  const isMetal = material === "v2a" || material === "v4a" || material === "alu";
  const isFreestanding = mountingType === "freistehend";
  const isWall = mountingType === "aufputz" || mountingType === "unterputz";
  const isFence = mountingType === "zaun";
  const isHorizontal = orientation === "waagerecht";

  const slotW = isHorizontal ? 100 : 78;
  const slotH = isHorizontal ? 56 : 70;
  const padding = 14;
  const bodyW = cols * slotW + padding * 2;
  const bodyH = rows * slotH + padding * 2;
  const packageH = hasPackage ? 110 : 0;

  // Funktionskasten — eigene Box unter dem Briefkasten
  const hasFunc = funktionskasten !== "bb0";
  const funcH = hasFunc ? (funktionskasten === "bb3" ? 86 : 64) : 0;
  const funcGap = hasFunc ? 6 : 0;

  const totalBodyH = bodyH + packageH + funcGap + funcH;

  // Verkleidung — Dach-Variation
  const hasDach = verkleidung === "ri244"; // dreiteilig mit separatem Dach
  const dachH = hasDach ? 14 : 0;
  const dachOverhang = hasDach ? 8 : verkleidung === "ri241" ? 4 : 0;

  const standH = isFreestanding ? 280 : 0;
  const totalH = totalBodyH + dachH + standH + 60;
  const viewW = Math.max(bodyW + 100 + dachOverhang * 2, 480);
  const viewH = totalH + 40;

  const bodyX = (viewW - bodyW) / 2;
  const bodyY = 30 + dachH;

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
        <pattern id={`brush-${uid}`} patternUnits="userSpaceOnUse" width="2" height="6">
          <rect width="2" height="6" fill={baseColor} />
          <line x1="0" y1="0" x2="0" y2="6" stroke={shadeColor(baseColor, -8)} strokeWidth="0.5" opacity="0.4" />
          <line x1="1" y1="0" x2="1" y2="6" stroke={shadeColor(baseColor, 10)} strokeWidth="0.3" opacity="0.5" />
        </pattern>

        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="40%" stopColor={baseColor} />
          <stop offset="100%" stopColor={darkColor} />
        </linearGradient>

        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="15%" stopColor="white" stopOpacity={highlightOpacity * 0.6} />
          <stop offset="35%" stopColor="white" stopOpacity={highlightOpacity} />
          <stop offset="55%" stopColor="white" stopOpacity={highlightOpacity * 0.4} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`slot-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>

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

        <radialGradient id={`led-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFE066" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background context */}
      {isWall && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F5F4F0" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={(viewH / 12) * i}
              x2={viewW}
              y2={(viewH / 12) * i}
              stroke="#E8E5DD"
              strokeWidth="0.4"
            />
          ))}
          {mountingType === "unterputz" && (
            <rect
              x={bodyX - 4}
              y={bodyY - 4}
              width={bodyW + 8}
              height={totalBodyH + 8}
              fill="none"
              stroke="#000"
              strokeWidth="1"
              opacity="0.18"
              rx="2"
            />
          )}
        </>
      )}

      {isFreestanding && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH * 0.65} fill="#F4F5F7" />
          <rect x="0" y={viewH * 0.65} width={viewW} height={viewH * 0.35} fill="#CDD2D7" />
          <rect x="0" y={viewH * 0.65} width={viewW} height="2" fill="#9AA3AD" />
          <ellipse cx={viewW / 2} cy={viewH - 24} rx={bodyW * 0.7} ry="10" fill="black" opacity="0.22" />
        </>
      )}

      {isFence && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#F5F5F3" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={(viewW / 6) * i + 10}
              y="20"
              width="10"
              height={viewH - 80}
              fill="#1F2937"
              opacity="0.7"
              rx="1"
            />
          ))}
        </>
      )}

      {mountingType === "tuerelement" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#FAF8F4" />
          <rect x={viewW * 0.55} y="10" width={viewW * 0.4} height={viewH - 40} fill="#3E2B23" opacity="0.85" rx="2" />
          <rect x={viewW * 0.58} y="15" width={viewW * 0.34} height={viewH - 50} fill="#5A3D29" opacity="0.9" rx="1" />
        </>
      )}

      {mountingType === "mauerdurchwurf" && (
        <>
          <rect x="0" y="0" width={viewW} height={viewH} fill="#EBE6DC" />
          {Array.from({ length: 12 }).map((_, row) => (
            <g key={row}>
              {Array.from({ length: 8 }).map((_, col) => (
                <rect
                  key={col}
                  x={col * 65 + (row % 2 ? 32 : 0)}
                  y={row * 26}
                  width="60"
                  height="22"
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

      {/* Verkleidung — Dach RI244 */}
      {hasDach && (
        <g filter={`url(#shadow-${uid})`}>
          <rect
            x={bodyX - dachOverhang}
            y={bodyY - dachH}
            width={bodyW + dachOverhang * 2}
            height={dachH}
            fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
            rx="2"
            stroke={shadowColor}
            strokeWidth="0.6"
          />
          {isMetal && (
            <rect
              x={bodyX - dachOverhang}
              y={bodyY - dachH}
              width={bodyW + dachOverhang * 2}
              height={dachH}
              fill={`url(#sheen-${uid})`}
              rx="2"
            />
          )}
          {/* Regenkante */}
          <line
            x1={bodyX - dachOverhang + 1}
            y1={bodyY - 1}
            x2={bodyX + bodyW + dachOverhang - 1}
            y2={bodyY - 1}
            stroke={shadowColor}
            strokeWidth="0.5"
            opacity="0.6"
          />
        </g>
      )}

      {/* Freistehende Stange */}
      {isFreestanding && (
        <>
          <rect
            x={viewW / 2 - 10}
            y={bodyY + totalBodyH}
            width="20"
            height={standH}
            fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
            stroke={shadowColor}
            strokeWidth="0.5"
          />
          <rect
            x={viewW / 2 - 10}
            y={bodyY + totalBodyH}
            width="20"
            height={standH}
            fill={`url(#sheen-${uid})`}
          />
          <rect
            x={viewW / 2 - 40}
            y={viewH - 30}
            width="80"
            height="8"
            fill="#A1A7AF"
            opacity="0.75"
            rx="1"
          />
        </>
      )}

      {/* MAIN BODY — Briefkästen */}
      <g filter={`url(#shadow-${uid})`}>
        <rect
          x={bodyX}
          y={bodyY}
          width={bodyW}
          height={bodyH}
          fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
          rx={verkleidung === "ri234" ? "1" : "3"}
          stroke={shadowColor}
          strokeWidth="0.8"
        />

        {isMetal && (
          <rect
            x={bodyX}
            y={bodyY}
            width={bodyW}
            height={bodyH}
            fill={`url(#sheen-${uid})`}
            rx={verkleidung === "ri234" ? "1" : "3"}
            pointerEvents="none"
          />
        )}

        {/* RI241 integrierte Regenkante (kleine Lippe oben) */}
        {verkleidung === "ri241" && (
          <rect
            x={bodyX - 3}
            y={bodyY - 2}
            width={bodyW + 6}
            height="4"
            fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
            rx="1"
            stroke={shadowColor}
            strokeWidth="0.5"
          />
        )}

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
                <rect
                  x={cx + 10}
                  y={cy + 12}
                  width={slotW - 20}
                  height="3"
                  fill={`url(#slot-${uid})`}
                  rx="1"
                />
                <line
                  x1={cx + 10}
                  y1={cy + 11.5}
                  x2={cx + slotW - 10}
                  y2={cy + 11.5}
                  stroke="white"
                  strokeWidth="0.4"
                  opacity={isMetal ? "0.6" : "0.3"}
                />
                <rect
                  x={cx + 10}
                  y={cy + 22}
                  width={slotW - 20}
                  height="10"
                  fill="white"
                  opacity="0.88"
                  rx="1"
                  stroke={shadowColor}
                  strokeWidth="0.3"
                />
                <line
                  x1={cx + 14}
                  y1={cy + 27}
                  x2={cx + slotW - 14}
                  y2={cy + 27}
                  stroke={shadowColor}
                  strokeWidth="0.4"
                  opacity="0.4"
                />
                <circle cx={cx + slotW - 12} cy={cy + slotH - 14} r="2.2" fill={shadowColor} opacity="0.7" />
                <circle cx={cx + slotW - 12} cy={cy + slotH - 14} r="1" fill="black" opacity="0.85" />
                <circle cx={cx + 6} cy={cy + 8} r="0.6" fill={shadowColor} opacity="0.6" />
                <circle cx={cx + 6} cy={cy + slotH - 8} r="0.6" fill={shadowColor} opacity="0.6" />
              </g>
            );
          })
        )}

        {/* Package compartment */}
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
            <circle
              cx={bodyX + bodyW - 22}
              cy={bodyY + bodyH + packageH - 24}
              r="3.5"
              fill={shadowColor}
              opacity="0.8"
            />
            <circle cx={bodyX + bodyW - 22} cy={bodyY + bodyH + packageH - 24} r="1.5" fill="black" />
          </g>
        )}

        {/* FUNKTIONSKASTEN bb1-bb4 */}
        {hasFunc && (
          <g>
            <rect
              x={bodyX}
              y={bodyY + bodyH + packageH + funcGap}
              width={bodyW}
              height={funcH}
              fill={isMetal ? `url(#brush-${uid})` : `url(#body-${uid})`}
              rx="2"
              stroke={shadowColor}
              strokeWidth="0.6"
            />
            {isMetal && (
              <rect
                x={bodyX}
                y={bodyY + bodyH + packageH + funcGap}
                width={bodyW}
                height={funcH}
                fill={`url(#sheen-${uid})`}
                rx="2"
              />
            )}

            {/* Inhalt des Funktionskastens */}
            {(() => {
              const fy = bodyY + bodyH + packageH + funcGap;
              const fx = bodyX;
              const fw = bodyW;

              return (
                <>
                  {/* bb1: Klingeltaster + Namensschild + Sprechsieblochung */}
                  {funktionskasten === "bb1" && (
                    <>
                      {/* Sprechsieblochung (Lautsprecher-Gitter) */}
                      <g transform={`translate(${fx + 10}, ${fy + 14})`}>
                        {Array.from({ length: 4 }).map((_, r) =>
                          Array.from({ length: 8 }).map((_, c) => (
                            <circle
                              key={`${r}-${c}`}
                              cx={c * 5 + 2}
                              cy={r * 5 + 2}
                              r="1"
                              fill={shadowColor}
                              opacity="0.7"
                            />
                          ))
                        )}
                      </g>
                      {/* Namensschild */}
                      <rect
                        x={fx + 55}
                        y={fy + 14}
                        width={fw - 100}
                        height="14"
                        fill="white"
                        rx="1"
                        opacity="0.92"
                        stroke={shadowColor}
                        strokeWidth="0.3"
                      />
                      <line
                        x1={fx + 60}
                        y1={fy + 21}
                        x2={fx + fw - 55}
                        y2={fy + 21}
                        stroke={shadowColor}
                        strokeWidth="0.4"
                        opacity="0.4"
                      />
                      {/* Klingeltaster */}
                      <circle cx={fx + fw - 22} cy={fy + 21} r="6" fill="#E8EAEC" stroke={shadowColor} strokeWidth="0.8" />
                      <circle cx={fx + fw - 22} cy={fy + 21} r="3.5" fill={shadowColor} opacity="0.6" />
                      {/* Mehrere Klingeltaster wenn rows > 1 */}
                      {rows > 1 &&
                        Array.from({ length: Math.min(rows - 1, 3) }).map((_, i) => (
                          <circle
                            key={i}
                            cx={fx + fw - 22}
                            cy={fy + 21 + (i + 1) * 12}
                            r="4"
                            fill="#E8EAEC"
                            stroke={shadowColor}
                            strokeWidth="0.5"
                          />
                        ))}
                    </>
                  )}

                  {/* bb2: Audio-Sprechanlage */}
                  {funktionskasten === "bb2" && (
                    <>
                      <g transform={`translate(${fx + 10}, ${fy + 10})`}>
                        {Array.from({ length: 5 }).map((_, r) =>
                          Array.from({ length: 10 }).map((_, c) => (
                            <circle
                              key={`${r}-${c}`}
                              cx={c * 4.5 + 2}
                              cy={r * 4.5 + 2}
                              r="0.9"
                              fill={shadowColor}
                              opacity="0.75"
                            />
                          ))
                        )}
                      </g>
                      <rect
                        x={fx + 65}
                        y={fy + 12}
                        width={fw - 110}
                        height="16"
                        fill="white"
                        rx="1.5"
                        opacity="0.92"
                        stroke={shadowColor}
                        strokeWidth="0.3"
                      />
                      <text
                        x={fx + 65 + (fw - 110) / 2}
                        y={fy + 23}
                        textAnchor="middle"
                        fontSize="7"
                        fontWeight="600"
                        fill={shadowColor}
                      >
                        AUDIO
                      </text>
                      {Array.from({ length: Math.min(cols * rows, 4) }).map((_, i) => (
                        <circle
                          key={i}
                          cx={fx + fw - 24 - (i % 2) * 14}
                          cy={fy + 15 + Math.floor(i / 2) * 14}
                          r="4.5"
                          fill="#E8EAEC"
                          stroke={shadowColor}
                          strokeWidth="0.5"
                        />
                      ))}
                    </>
                  )}

                  {/* bb3: Video-Sprechanlage */}
                  {funktionskasten === "bb3" && (
                    <>
                      {/* Kamera */}
                      <g transform={`translate(${fx + fw / 2 - 12}, ${fy + 12})`}>
                        <circle cx="12" cy="12" r="11" fill="#1F2937" stroke={shadowColor} strokeWidth="0.6" />
                        <circle cx="12" cy="12" r="8" fill="#0A0F1A" />
                        <circle cx="12" cy="12" r="5" fill="#000" />
                        <circle cx="14" cy="10" r="1.5" fill="#3B82F6" opacity="0.6" />
                        <circle cx="14" cy="10" r="0.7" fill="white" />
                      </g>
                      {/* Sprechsieblochung */}
                      <g transform={`translate(${fx + 10}, ${fy + 12})`}>
                        {Array.from({ length: 3 }).map((_, r) =>
                          Array.from({ length: 6 }).map((_, c) => (
                            <circle
                              key={`${r}-${c}`}
                              cx={c * 4 + 2}
                              cy={r * 4 + 2}
                              r="0.8"
                              fill={shadowColor}
                              opacity="0.75"
                            />
                          ))
                        )}
                      </g>
                      {/* Klingeltaster mit Namen */}
                      <rect
                        x={fx + 10}
                        y={fy + 38}
                        width={fw - 20}
                        height="38"
                        fill="white"
                        rx="2"
                        opacity="0.95"
                        stroke={shadowColor}
                        strokeWidth="0.3"
                      />
                      {Array.from({ length: Math.min(cols * rows, 6) }).map((_, i) => (
                        <g key={i}>
                          <line
                            x1={fx + 14}
                            y1={fy + 44 + i * 6}
                            x2={fx + fw - 20}
                            y2={fy + 44 + i * 6}
                            stroke={shadowColor}
                            strokeWidth="0.3"
                            opacity="0.3"
                          />
                          <circle
                            cx={fx + fw - 16}
                            cy={fy + 43 + i * 6}
                            r="1.5"
                            fill="#E8EAEC"
                            stroke={shadowColor}
                            strokeWidth="0.3"
                          />
                        </g>
                      ))}
                    </>
                  )}

                  {/* bb4: Individuelle Stanzungen */}
                  {funktionskasten === "bb4" && (
                    <>
                      {/* Custom Stanzung-Muster */}
                      <g transform={`translate(${fx + 12}, ${fy + 14})`}>
                        <rect width="38" height="22" fill={shadowColor} opacity="0.7" rx="2" />
                        <text x="19" y="14" textAnchor="middle" fontSize="6" fill="white" fontWeight="700">
                          QR
                        </text>
                      </g>
                      <g transform={`translate(${fx + 60}, ${fy + 14})`}>
                        <rect width="50" height="22" fill="#1F2937" opacity="0.85" rx="2" />
                        <text x="25" y="14" textAnchor="middle" fontSize="6" fill="white" fontWeight="700">
                          SCANNER
                        </text>
                      </g>
                      <g transform={`translate(${fx + fw - 60}, ${fy + 14})`}>
                        <circle cx="20" cy="11" r="11" fill={shadowColor} opacity="0.6" />
                        <circle cx="20" cy="11" r="7" fill={shadowColor} opacity="0.8" />
                      </g>
                    </>
                  )}
                </>
              );
            })()}
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

      {/* LED-Hausnummer Glow */}
      {ledHausnummer && (
        <g>
          <circle
            cx={bodyX - 16}
            cy={bodyY + bodyH / 2}
            r="20"
            fill={`url(#led-${uid})`}
            opacity="0.85"
          />
          <rect
            x={bodyX - 22}
            y={bodyY + bodyH / 2 - 6}
            width="12"
            height="12"
            fill="white"
            opacity="0.9"
            rx="1"
          />
          <text
            x={bodyX - 16}
            y={bodyY + bodyH / 2 + 3}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#1F2937"
          >
            79
          </text>
        </g>
      )}

      {isFreestanding && (
        <ellipse cx={viewW / 2} cy={viewH - 22} rx={bodyW * 0.5} ry="3" fill="black" opacity="0.15" />
      )}
    </svg>
  );
}
