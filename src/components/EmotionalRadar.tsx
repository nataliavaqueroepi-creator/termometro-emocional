/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Sparkles } from 'lucide-react';

interface EmotionalRadarProps {
  scores: {
    serenity: number;
    identity: number;
    closure: number;
    outlook: number;
  };
}

export const EmotionalRadar: React.FC<EmotionalRadarProps> = ({ scores }) => {
  const dimensions = [
    {
      key: 'serenity',
      label: 'Calma somática e incertidumbre',
      desc: 'Capacidad de sostener la pausa sin caer en hiperactividad ansiosa ni insomnio.',
      value: scores.serenity,
      icon: ShieldCheck,
      color: 'bg-emerald-500',
      trackColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
    },
    {
      key: 'identity',
      label: 'Autovalía y capital sénior',
      desc: 'Solidez de tu autoestima profesional frente al edadismo o el síndrome del impostor.',
      value: scores.identity,
      icon: Sparkles,
      color: 'bg-amber-500',
      trackColor: 'bg-amber-100',
      textColor: 'text-amber-700',
    },
    {
      key: 'closure',
      label: 'Cierre y desapego de la anterior etapa',
      desc: 'Nivel de liberación del resentimiento y aceptación de la decisión mercantil.',
      value: scores.closure,
      icon: HeartHandshake,
      color: 'bg-rose-500',
      trackColor: 'bg-rose-100',
      textColor: 'text-rose-700',
    },
    {
      key: 'outlook',
      label: 'Claridad y visión de futuro',
      desc: 'Foco en los próximos 10-15 años con determinación, propósito y método.',
      value: scores.outlook,
      icon: Compass,
      color: 'bg-indigo-500',
      trackColor: 'bg-indigo-100',
      textColor: 'text-indigo-700',
    },
  ];

  const getLevelLabel = (val: number) => {
    if (val >= 75) return { text: 'Óptimo y consolidado', grade: 'text-emerald-700 font-semibold' };
    if (val >= 50) return { text: 'En proceso de estabilización', grade: 'text-amber-700 font-semibold' };
    return { text: 'Zona de atención prioritaria', grade: 'text-rose-700 font-semibold' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Tus 4 Pilares Emocionales en Detalle
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Un despido afecta a distintas áreas a la vez. Este balance refleja qué aspecto te está sosteniendo y cuál pide más cuidado hoy.
        </p>
      </div>

      <div className="space-y-6">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          const status = getLevelLabel(dim.value);

          return (
            <div key={dim.key} className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${dim.trackColor} ${dim.textColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {dim.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className={status.grade}>{status.text}</span>
                  <span className="font-mono tabular-nums font-bold text-slate-800 text-sm">
                    {dim.value}%
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${dim.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.max(8, dim.value)}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 pl-8">
                {dim.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
