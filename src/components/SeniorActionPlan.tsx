/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SENIOR_SUPERPOWERS } from '../data/quizData';
import { CheckSquare, Square, Award, Copy, Check, CalendarCheck2 } from 'lucide-react';

interface SeniorActionPlanProps {
  archetypeTitle: string;
  archetypePriority: string;
}

export const SeniorActionPlan: React.FC<SeniorActionPlanProps> = ({
  archetypeTitle,
  archetypePriority,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      day: "Días 1 - 3",
      action: "Pausa Fisiológica y Descompresión",
      detail: "Prohíbete consultar portales de empleo o rehacer tu currículum durante 72 horas. Duerme, camina bajo el sol 30 minutos al día y reordena tu espacio físico.",
    },
    {
      day: "Días 4 - 5",
      action: "Radiografía Económica Real",
      detail: "Pon sobre la mesa los números fríos: meses cubiertos por indemnización y paro. Elimina gastos prescindibles. Saber tu margen real de maniobra desactiva el pánico mental.",
    },
    {
      day: "Día 6",
      action: "La Carta de Cierre Inconfesable",
      detail: "Escribe a mano toda la rabia, frustración e injusticia que sientes hacia tu ex-empresa. No la envíes: quémala o rómpela. Cierra el vínculo emocional.",
    },
    {
      day: "Día 7",
      action: "Inventario de Capital Sénior",
      detail: "Anota tus 5 logros profesionales más sólidos de los últimos 15 años y los 3 problemas graves que sabes solucionar con los ojos cerrados.",
    },
    {
      day: "A partir de semana 2",
      action: "Networking de Café, No Algoritmos",
      detail: "Agenda 2 conversaciones informales por semana con antiguos colegas o clientes. Pregunta cómo ven el sector; las oportunidades sénior se transmiten por confianza entre pares.",
    },
  ];

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopySummary = () => {
    const summaryText = `MI HOJA DE RUTA TRAS EL DESPIDO (+45 AÑOS)
Diagnóstico emocional: ${archetypeTitle}
Prioridad inmediata: ${archetypePriority}

PLAN DE ACCIÓN 7 DÍAS:
1. Días 1-3: Pausa fisiológica de 72h sin portales de empleo.
2. Días 4-5: Radiografía financiera objetiva para eliminar el pánico infundado.
3. Día 6: Carta de cierre no enviada para soltar la herida de lealtad.
4. Día 7: Inventario de tus 3 problemas clave que resuelves como profesional maduro.
5. Semana 2+: Búsqueda por confianza y red cálida (máx 3h/día).

Recuerda: A los 45+ compites por criterio, serenidad y resolución, no por horas baratas.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 7-Day Roadmap Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              <CalendarCheck2 className="w-4 h-4" />
              <span>Hoja de Ruta Inmediata</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Plan de Gestión Emocional para tus Próximos 7 Días
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Sin agobios ni exigencias irreales. Marca cada paso cuando lo sientas completado.
            </p>
          </div>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shrink-0 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar mi plan</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {steps.map((st, i) => {
            const isDone = !!completedSteps[i];

            return (
              <div
                key={i}
                onClick={() => toggleStep(i)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase text-emerald-700">
                      {st.day}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {st.action}
                    </span>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                    {st.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Senior Superpowers Value Box */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/60 rounded-2xl border border-amber-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Recordatorio de Dignidad Profesional</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Lo que aportas al mercado que un perfil joven aún no puede
        </h3>
        <p className="text-sm text-slate-600 mb-6 max-w-2xl">
          El mercado castiga el 'edadismo' solo cuando el sénior intenta competir en lo que no le toca (horas interminables baratas). Cuando juegas en tu terreno natural, eres indispensable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SENIOR_SUPERPOWERS.map((power, pIdx) => (
            <div key={pIdx} className="bg-white/80 backdrop-blur-xs rounded-xl border border-amber-100 p-4 shadow-2xs">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {power.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {power.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
