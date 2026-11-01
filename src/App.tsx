/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  QUIZ_QUESTIONS, 
  ARCHETYPES 
} from './data/quizData';
import { EmotionalRadar } from './components/EmotionalRadar';
import { SeniorActionPlan } from './components/SeniorActionPlan';
import { 
  Heart, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Lock, 
  Printer, 
  Share2, 
  ChevronRight,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const testSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const startQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep('intro');
    }
  };

  const scrollToPillars = () => {
    if (currentStep !== 'intro') {
      setCurrentStep('intro');
      setTimeout(() => {
        pillarsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      pillarsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate scores and dominant archetype
  const calculateResult = () => {
    let totalSerenity = 0;
    let totalIdentity = 0;
    let totalClosure = 0;
    let totalOutlook = 0;

    const archetypeWeights = {
      shock: 0,
      duelo: 0,
      ansiedad: 0,
      reinvencion: 0,
    };

    QUIZ_QUESTIONS.forEach((q) => {
      const selectedId = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === selectedId);
      if (opt) {
        totalSerenity += opt.scores.serenity;
        totalIdentity += opt.scores.identity;
        totalClosure += opt.scores.closure;
        totalOutlook += opt.scores.outlook;

        archetypeWeights.shock += opt.archetypeWeight.shock;
        archetypeWeights.duelo += opt.archetypeWeight.duelo;
        archetypeWeights.ansiedad += opt.archetypeWeight.ansiedad;
        archetypeWeights.reinvencion += opt.archetypeWeight.reinvencion;
      }
    });

    const serenity = Math.round(totalSerenity / totalQuestions);
    const identity = Math.round(totalIdentity / totalQuestions);
    const closure = Math.round(totalClosure / totalQuestions);
    const outlook = Math.round(totalOutlook / totalQuestions);

    let dominant: 'shock' | 'duelo' | 'ansiedad' | 'reinvencion' = 'reinvencion';
    let maxWeight = -1;

    (Object.keys(archetypeWeights) as Array<keyof typeof archetypeWeights>).forEach((key) => {
      if (archetypeWeights[key] > maxWeight) {
        maxWeight = archetypeWeights[key];
        dominant = key;
      }
    });

    return {
      dominantArchetype: ARCHETYPES[dominant],
      dimensions: {
        serenity: Math.max(15, Math.min(95, serenity)),
        identity: Math.max(15, Math.min(95, identity)),
        closure: Math.max(15, Math.min(95, closure)),
        outlook: Math.max(15, Math.min(95, outlook)),
      },
    };
  };

  const resultData = calculateResult();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Brújula Emocional +45',
        text: 'Test para evaluar y gestionar las emociones tras un despido a partir de los 45 años.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const optionColorStyles = [
    {
      border: 'hover:border-amber-400',
      activeBg: 'bg-amber-50/70 border-amber-500 shadow-sm',
    },
    {
      border: 'hover:border-rose-400',
      activeBg: 'bg-rose-50/70 border-rose-500 shadow-sm',
    },
    {
      border: 'hover:border-indigo-400',
      activeBg: 'bg-indigo-50/70 border-indigo-500 shadow-sm',
    },
    {
      border: 'hover:border-emerald-400',
      activeBg: 'bg-emerald-50/70 border-emerald-500 shadow-sm',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar compliant with 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentStep('intro');
            }}
            className="flex items-center gap-2.5 text-slate-900 font-bold text-lg tracking-tight whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span>Brújula Emocional +45</span>
          </a>

          {/* Zone 2: 3 clean single-line links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setCurrentStep('intro')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Inicio
            </button>
            <button
              onClick={scrollToPillars}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Los 4 Pilares
            </button>
            <button
              onClick={startQuiz}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              El Test
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentStep === 'result' ? (
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir test</span>
              </button>
            ) : currentStep === 'quiz' ? (
              <button
                onClick={() => setCurrentStep('intro')}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                Volver
              </button>
            ) : (
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0"
              >
                <span>Hacer el test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* VIEW 1: INTRO / LANDING */}
        {currentStep === 'intro' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-emerald-700 font-semibold">Test de Evaluación y Guía</span>
                <span aria-hidden="true">·</span>
                <span>Despido a partir de los 45 años</span>
                <span aria-hidden="true">·</span>
                <span>2 minutos</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
                ¿Cómo están tus emociones tras el despido a los 45+?
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                Perder un empleo tras décadas de dedicación remueve tu identidad y despierta el temor al edadismo. Descubre con 6 preguntas directas en qué fase emocional estás y cómo enfocar tu energía para recuperar la calma y el rumbo.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  6 preguntas breves
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Resultado inmediato
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-600" />
                  Sin registro ni datos personales
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Comenzar el test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature Cards: The 4 Emotional Dimensions */}
            <div ref={pillarsSectionRef} className="space-y-4 pt-4">
              <div className="text-center">
                <h2 className="text-lg font-bold text-slate-900">
                  Las 4 dimensiones que evalúa este test
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Un despido no es solo un cambio de nómina; afecta a cuatro áreas psicológicas clave:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    1. Impacto somático y ritmo
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cómo asimila tu cuerpo el freno súbito de rutina: sueño, desorientación matutina y niveles de alerta física.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    2. Autovalía y edadismo
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Diferenciar los prejuicios del mercado del valor irremplazable de tu experiencia, criterio y resolución.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    3. Herida de lealtad y cierre
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Soltar el resentimiento y la sensación de traición para que la amargura no perjudique tus próximas entrevistas.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    4. Claridad y visión de futuro
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enfocar los próximos 10-15 años desde la confianza y el networking cualitativo, huyendo de la desesperación en masa.
                  </p>
                </div>
              </div>
            </div>

            {/* Reassuring note */}
            <div className="bg-gradient-to-r from-emerald-50/70 via-amber-50/50 to-slate-50 border border-slate-200/90 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <p className="text-sm font-medium text-slate-700 italic">
                “A partir de los 45 años no compites por horas interminables ni por tareas mecánicas; tu mayor valor es el criterio ante la incertidumbre y el temple que dan los años.”
              </p>
              <div className="mt-3 text-xs text-slate-500 font-medium">
                Pilar Vega · Especialista en desarrollo y transición profesional
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: QUIZ INTERFACE (6 QUESTIONS) */}
        {currentStep === 'quiz' && (
          <div ref={testSectionRef} className="space-y-6">
            {/* Quiz Navigation & Progress Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-500 uppercase tracking-wider">
                  Pregunta {currentQuestionIndex + 1} de {totalQuestions}
                </span>
                <span className="text-emerald-700 font-mono tabular-nums">
                  {progressPercent}% completado
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Current Question Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <div className="inline-block text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                  {currentQuestion.category}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {currentQuestion.question}
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
                  const style = optionColorStyles[optIndex % optionColorStyles.length];

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 cursor-pointer group ${
                        isSelected
                          ? style.activeBg
                          : `bg-white border-slate-200/90 ${style.border} hover:bg-slate-50/70`
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 group-hover:border-slate-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="flex-1">
                        <p className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'text-slate-950 font-medium' : 'text-slate-700'}`}>
                          {opt.text}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-600">{opt.nuance}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Question Footer Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevQuestion}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{currentQuestionIndex === 0 ? 'Volver al inicio' : 'Anterior'}</span>
                </button>

                <button
                  disabled={!selectedAnswers[currentQuestion.id]}
                  onClick={handleNextQuestion}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                    selectedAnswers[currentQuestion.id]
                      ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === totalQuestions - 1 ? 'Ver mi resultado' : 'Siguiente'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: RESULTS & MANAGEMENT PLAN (CLEAR, DIRECT & LINEAR) */}
        {currentStep === 'result' && (
          <div className="space-y-8">
            {/* Result Header Card */}
            <div className={`rounded-3xl border ${resultData.dominantArchetype.borderColor} ${resultData.dominantArchetype.bgLight} p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden`}>
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Diagnóstico Emocional Principal
                    </span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="text-xs text-slate-500">Profesionales +45</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="p-2 bg-white/80 hover:bg-white text-slate-700 rounded-lg border border-slate-200/80 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Imprimir informe o guardar en PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Guardar PDF</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-white/80 hover:bg-white text-slate-700 rounded-lg border border-slate-200/80 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Compartir enlace"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{copiedLink ? 'Copiado' : 'Compartir'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {resultData.dominantArchetype.title}
                  </h2>
                  <p className="text-base sm:text-lg font-medium text-slate-700 mt-1">
                    {resultData.dominantArchetype.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                  {resultData.dominantArchetype.description}
                </p>

                {/* Key Insight Box */}
                <div className="bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/70 p-4 sm:p-5 mt-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800 mb-1">
                        Pauta Clave para esta Etapa
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {resultData.dominantArchetype.keyInsight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Symptoms / Common experiences */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Manifestaciones comunes en tu estado actual:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {resultData.dominantArchetype.symptoms.map((symptom, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 bg-white/50 p-2.5 rounded-lg border border-slate-200/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Management Guide for Dominant Archetype */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                <Compass className="w-4 h-4" />
                <span>Estrategia de Gestión Emocional</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Cómo gestionar esta emoción ahora mismo
              </h3>
              <p className="text-sm font-semibold text-slate-700 mb-6 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                Prioridad inmediata: <span className="font-normal text-slate-800">{resultData.dominantArchetype.managementGuide.prioridad}</span>
              </p>

              <div className="space-y-4">
                {resultData.dominantArchetype.managementGuide.pasos.map((paso, pIdx) => (
                  <div key={pIdx} className="border-l-2 border-emerald-500 pl-4 py-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {paso.titulo}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {paso.detalle}
                    </p>
                  </div>
                ))}
              </div>

              {resultData.dominantArchetype.managementGuide.advertencia && (
                <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Advertencia importante: </span>
                    <span>{resultData.dominantArchetype.managementGuide.advertencia}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Emotional Dimensions Breakdown */}
            <EmotionalRadar scores={resultData.dimensions} />

            {/* 7-Day Action Plan and Senior Superpowers */}
            <SeniorActionPlan
              archetypeTitle={resultData.dominantArchetype.title}
              archetypePriority={resultData.dominantArchetype.managementGuide.prioridad}
            />

            {/* Retake test callout */}
            <div className="text-center pt-4 pb-10">
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir el test con otras respuestas</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/60 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-medium text-slate-700">
            Brújula Emocional +45 · Herramienta psicoeducativa para la transición laboral
          </p>
          <p className="max-w-xl mx-auto text-slate-500 leading-relaxed">
            Este recurso ofrece orientación emocional y pautas de autorregulación. Si experimentas sintomatología de depresión severa o ansiedad persistente, acude a un profesional colegiado de la psicología o de la salud.
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            © {new Date().getFullYear()} Brújula Emocional. Diseñado para acompañar la madurez profesional con dignidad.
          </div>
        </div>
      </footer>
    </div>
  );
}
