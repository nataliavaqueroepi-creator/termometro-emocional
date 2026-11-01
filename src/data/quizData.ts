/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Option {
  id: string;
  text: string;
  nuance: string;
  scores: {
    serenity: number; // 0 - 100 contribution
    identity: number;
    closure: number;
    outlook: number;
  };
  archetypeWeight: {
    shock: number;
    duelo: number;
    ansiedad: number;
    reinvencion: number;
  };
}

export interface Question {
  id: number;
  category: string;
  question: string;
  subtitle: string;
  options: Option[];
}

export interface ArchetypeResult {
  id: 'shock' | 'duelo' | 'ansiedad' | 'reinvencion';
  title: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  description: string;
  symptoms: string[];
  keyInsight: string;
  managementGuide: {
    prioridad: string;
    pasos: {
      titulo: string;
      detalle: string;
    }[];
    advertencia: string;
  };
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Ritmo y cuerpo",
    question: "¿Cómo estás viviendo las mañanas y el tiempo libre inesperado en estos días?",
    subtitle: "El corte repentino de una rutina de décadas altera el reloj biológico y emocional.",
    options: [
      {
        id: "1a",
        text: "Con sensación de vacío o mareo mental; me despierto esperando ir a trabajar y el silencio me pesa.",
        nuance: "Desorientación y shock inicial",
        scores: { serenity: 20, identity: 30, closure: 35, outlook: 25 },
        archetypeWeight: { shock: 4, duelo: 1, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "1b",
        text: "Con enfado e irritabilidad; me vienen a la cabeza conversaciones del despido y la injusticia de la situación.",
        nuance: "Rumiación y conflicto pendiente",
        scores: { serenity: 15, identity: 40, closure: 15, outlook: 20 },
        archetypeWeight: { shock: 1, duelo: 4, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "1c",
        text: "En alerta continua; abro el ordenador nada más levantarme y me angustia no tener respuestas inmediatas.",
        nuance: "Hiperactividad defensiva",
        scores: { serenity: 25, identity: 45, closure: 30, outlook: 40 },
        archetypeWeight: { shock: 1, duelo: 0, ansiedad: 4, reinvencion: 1 },
      },
      {
        id: "1d",
        text: "Con altibajos lógicos, pero procurando darme una rutina suave con desayuno tranquilo, paseo y orden.",
        nuance: "Aceptación consciente y pausa",
        scores: { serenity: 75, identity: 70, closure: 65, outlook: 70 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
  {
    id: 2,
    category: "Autovalía y edad",
    question: "Al pensar en tener más de 45 años y volver a presentarte al mercado laboral, ¿qué sientes primero?",
    subtitle: "El prejuicio social del edadismo a menudo se interioriza de forma injusta.",
    options: [
      {
        id: "2a",
        text: "Miedo a la invisibilidad: me preocupa que descarten mi currículum por la fecha antes de mirar lo que valgo.",
        nuance: "Temor al edadismo laboral",
        scores: { serenity: 25, identity: 30, closure: 40, outlook: 25 },
        archetypeWeight: { shock: 2, duelo: 1, ansiedad: 3, reinvencion: 0 },
      },
      {
        id: "2b",
        text: "Dudas sobre mi propia vigencia: me pregunto si lo que he hecho durante 20 años sigue teniendo valor hoy.",
        nuance: "Síndrome del impostor reactivo",
        scores: { serenity: 20, identity: 20, closure: 35, outlook: 20 },
        archetypeWeight: { shock: 3, duelo: 1, ansiedad: 2, reinvencion: 0 },
      },
      {
        id: "2c",
        text: "Una profunda decepción: me duele que se premie el coste barato sobre el criterio maduro y la fidelidad.",
        nuance: "Desencanto y herida de valor",
        scores: { serenity: 25, identity: 50, closure: 20, outlook: 30 },
        archetypeWeight: { shock: 0, duelo: 4, ansiedad: 1, reinvencion: 1 },
      },
      {
        id: "2d",
        text: "Seguridad en mi bagaje: tengo temple, capacidad de gestionar crisis y un criterio que los años dan.",
        nuance: "Poder del capital sénior",
        scores: { serenity: 80, identity: 90, closure: 75, outlook: 85 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
  {
    id: 3,
    category: "Entorno y comunicación",
    question: "¿Cómo estás gestionando hablar de esta situación con tu familia, pareja o amistades?",
    subtitle: "La vergüenza o el afán de proteger a los demás pueden aislarnos cuando más apoyo necesitamos.",
    options: [
      {
        id: "3a",
        text: "Me cuesta hablarlo o lo minimizo; siento una vergüenza sutil y prefiero no dar explicaciones a nadie.",
        nuance: "Aislamiento y pudor protector",
        scores: { serenity: 20, identity: 25, closure: 30, outlook: 25 },
        archetypeWeight: { shock: 3, duelo: 2, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "3b",
        text: "Suelo desahogarme con quejas repetitivas; me descubro hablando casi siempre del despido o de mis exjefes.",
        nuance: "Descarga emocional en bucle",
        scores: { serenity: 25, identity: 40, closure: 15, outlook: 25 },
        archetypeWeight: { shock: 0, duelo: 4, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "3c",
        text: "Hago de tripas corazón: pongo cara de tranquilidad para no alarmar en casa, aunque por dentro voy con tensión.",
        nuance: "Contención excesiva y sobreesfuerzo",
        scores: { serenity: 30, identity: 45, closure: 35, outlook: 35 },
        archetypeWeight: { shock: 1, duelo: 1, ansiedad: 4, reinvencion: 0 },
      },
      {
        id: "3d",
        text: "He sido honesto/a con mi círculo íntimo; acepto su afecto y hemos acordado tomarnos esto como un equipo.",
        nuance: "Red de apoyo sana y compartida",
        scores: { serenity: 85, identity: 80, closure: 75, outlook: 80 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
  {
    id: 4,
    category: "Cierre y desvinculación",
    question: "Si piensas en la empresa o en los directivos que decidieron tu salida, ¿qué emoción predomina?",
    subtitle: "El despido a menudo rompe un contrato psicológico tácito de lealtad.",
    options: [
      {
        id: "4a",
        text: "Resentimiento por ingratitud: les di mis mejores esfuerzos y dedicación, y me descartaron fríamente.",
        nuance: "Herida de lealtad vulnerada",
        scores: { serenity: 20, identity: 45, closure: 10, outlook: 25 },
        archetypeWeight: { shock: 0, duelo: 4, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "4b",
        text: "Rumiación y dudas: me pregunto qué pude haber hecho diferente para que no pasara esto.",
        nuance: "Autoinculpación y negociación",
        scores: { serenity: 15, identity: 20, closure: 25, outlook: 20 },
        archetypeWeight: { shock: 3, duelo: 2, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "4c",
        text: "Indiferencia forzada, aunque cuando me entero de noticias de allí noto una punzada de amargura.",
        nuance: "Desapego aún incompleto",
        scores: { serenity: 40, identity: 50, closure: 35, outlook: 40 },
        archetypeWeight: { shock: 1, duelo: 2, ansiedad: 2, reinvencion: 1 },
      },
      {
        id: "4d",
        text: "Perspectiva madura: fue una decisión organizativa o económica dolorosa, pero no invalida mi trayectoria.",
        nuance: "Desvinculación y perdón práctico",
        scores: { serenity: 80, identity: 85, closure: 90, outlook: 85 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
  {
    id: 5,
    category: "Energía y descanso",
    question: "¿Cómo responde tu cuerpo y tu descanso desde que ocurrió el despido?",
    subtitle: "Las emociones no procesadas suelen manifestarse en el sueño, la espalda o el sistema digestivo.",
    options: [
      {
        id: "5a",
        text: "Duermo mal o me desvelo de madrugada con taquicardia o rumiando sobre las finanzas del hogar.",
        nuance: "Sobrecarga del sistema nervioso",
        scores: { serenity: 15, identity: 35, closure: 30, outlook: 20 },
        archetypeWeight: { shock: 2, duelo: 1, ansiedad: 4, reinvencion: 0 },
      },
      {
        id: "5b",
        text: "Tengo un cansancio de plomo; es como si años de agotamiento acumulado me hubieran caído de golpe.",
        nuance: "Agotamiento somático de descompresión",
        scores: { serenity: 25, identity: 30, closure: 35, outlook: 25 },
        archetypeWeight: { shock: 4, duelo: 1, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "5c",
        text: "Me siento culpable si me relajo una tarde; siento la necesidad compulsiva de estar 'haciendo algo útil'.",
        nuance: "Culpa por parar y exigencia",
        scores: { serenity: 30, identity: 40, closure: 35, outlook: 40 },
        archetypeWeight: { shock: 0, duelo: 1, ansiedad: 4, reinvencion: 1 },
      },
      {
        id: "5d",
        text: "He tenido días tensos, pero me obligo a dormir bien, comer equilibrado y hacer ejercicio para despejarme.",
        nuance: "Autocuidado activo y anclaje",
        scores: { serenity: 85, identity: 80, closure: 75, outlook: 80 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
  {
    id: 6,
    category: "Visión del porvenir",
    question: "Mirando hacia los próximos 10 o 15 años de tu vida laboral, ¿cuál es tu aspiración o sensación dominante?",
    subtitle: "A partir de los 45 se abre una etapa donde el propósito y la serenidad pesan más que el estatus.",
    options: [
      {
        id: "6a",
        text: "Siento un abismo: no logro imaginarme en otro sitio ni sé cómo rearmar mi perfil desde cero.",
        nuance: "Parálisis de incertidumbre",
        scores: { serenity: 20, identity: 20, closure: 30, outlook: 15 },
        archetypeWeight: { shock: 4, duelo: 1, ansiedad: 1, reinvencion: 0 },
      },
      {
        id: "6b",
        text: "Urgencia pura: necesito encontrar cualquier trabajo lo antes posible para no agotar la prestación o ahorros.",
        nuance: "Supervivencia y presión económica",
        scores: { serenity: 25, identity: 35, closure: 35, outlook: 30 },
        archetypeWeight: { shock: 1, duelo: 1, ansiedad: 4, reinvencion: 0 },
      },
      {
        id: "6c",
        text: "Deseo de cambio: no quiero volver a aguantar lo mismo, busco algo con más valor humano aunque aún dudo cómo.",
        nuance: "Reinvención en gestación",
        scores: { serenity: 50, identity: 60, closure: 55, outlook: 65 },
        archetypeWeight: { shock: 1, duelo: 1, ansiedad: 1, reinvencion: 3 },
      },
      {
        id: "6d",
        text: "Curiosidad y foco: veo una oportunidad forzada de elegir mejor, combinar experiencia con nuevos formatos.",
        nuance: "Propósito y determinación sénior",
        scores: { serenity: 85, identity: 90, closure: 80, outlook: 95 },
        archetypeWeight: { shock: 0, duelo: 0, ansiedad: 0, reinvencion: 4 },
      },
    ],
  },
];

export const ARCHETYPES: Record<'shock' | 'duelo' | 'ansiedad' | 'reinvencion', ArchetypeResult> = {
  shock: {
    id: "shock",
    title: "Fase de Pausa Necesaria",
    subtitle: "Asimilación y descompresión del corte brusco",
    tagline: "Tu sistema nervioso aún está adaptándose a la pérdida de una inercia de años.",
    accentColor: "amber",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    badgeBg: "bg-amber-100 text-amber-900",
    description:
      "A partir de los 45 años, un despido no es solo un trámite administrativo; es la interrupción súbita de una identidad construida durante décadas. En este momento tu mente busca las certezas cotidianas de tu anterior rutina. Es habitual sentir una mezcla de niebla mental, cansancio aplastante y desconcierto.",
    symptoms: [
      "Sensación de vacío o desorientación al despertar sin un horario impuesto.",
      "Agotamiento acumulado que sale a flote ahora que el ritmo ha frenado.",
      "Dificultad temporal para concentrarte en lecturas largas o tareas complejas.",
      "Ganas intermitentes de no hablar con nadie sobre temas profesionales."
    ],
    keyInsight:
      "No confundas la niebla de los primeros días con falta de capacidad. Tu cerebro está en modo de duelo y reconfiguración. Antes de lanzarte a competir, necesitas un tiempo mínimo de frenado consciente.",
    managementGuide: {
      prioridad: "Calmar el sistema de alerta y recuperar anclajes físicos.",
      pasos: [
        {
          titulo: "1. Tensa el freno durante 7 a 10 días",
          detalle: "Prohíbete enviar currículums impulsivamente en este estado. Enviar candidaturas desde el desconcierto transmite inseguridad y te desgastará ante el primer silencio."
        },
        {
          titulo: "2. Crea una estructura suave no laboral",
          detalle: "Mantén una hora fija de levantarte, sal a caminar a la luz natural 30 minutos y come con calma. La mente necesita ritmos biológicos claros cuando el ritmo laboral desaparece."
        },
        {
          titulo: "3. Haz un inventario de hechos, no de juicios",
          detalle: "Anota en un cuaderno tu situación financiera real y plazos objetivos (prestación, ahorros, indemnización). La incertidumbre imaginada siempre asusta el doble que los números reales."
        }
      ],
      advertencia: "No tomes decisiones vitales de urgencia en esta semana. La claridad volverá en cuanto el cuerpo descanse."
    }
  },
  duelo: {
    id: "duelo",
    title: "Herida de Lealtad y Cierre Pendiente",
    subtitle: "Procesar la indignación para recuperar tu poder",
    tagline: "Es legítimo sentir enfado tras entregar años de compromiso, pero ese enfado no debe gobernar tu presente.",
    accentColor: "rose",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-800",
    badgeBg: "bg-rose-100 text-rose-900",
    description:
      "Los profesionales sénior a menudo construyen su carrera sobre un pacto tácito: entrega, fidelidad y lealtad a cambio de respeto y estabilidad. Cuando ese pacto se quiebra de forma unilateral, la emoción predominante es la traición. El peligro de esta fase es quedarse atrapado en un diálogo mental de resentimiento hacia la empresa que te impide proyectarte hacia adelante.",
    symptoms: [
      "Rumiación constante sobre lo que dijiste o lo que te dijeron en la reunión del despido.",
      "Enfado intenso hacia directivos, mandos intermedios o excompañeros que siguen allí.",
      "Sensación de que 'no sirvió de nada' haber dado horas extras o sacrificios personales.",
      "Tentación de hablar del tema en cada encuentro social desde la queja amarga."
    ],
    keyInsight:
      "El rencor hacia tu antigua empresa es un fuego que te quema a ti mientras ellos siguen con su actividad. Tu valía no se marchó con la carta de despido; la experiencia te pertenece exclusivamente a ti.",
    managementGuide: {
      prioridad: "Desacoplar tu honor personal de las decisiones empresariales.",
      pasos: [
        {
          titulo: "1. Redacta la 'Carta de Cierre' (y no la envíes)",
          detalle: "Vuelca en un papel sin filtros todo lo que te pareció injusto, la rabia y las palabras no dichas. Léela una vez, reconoce tu dolor legítimo y luego destrúyela físicamente como acto de cierre simbólico."
        },
        {
          titulo: "2. Reinterpreta el pacto laboral",
          detalle: "Recuerda que una empresa es una entidad jurídica con intereses comerciales, no una familia. No te fallaron porque tú valieras menos; prescindieron de una posición por criterios de balance o estrategia ajenos a tu valía humana."
        },
        {
          titulo: "3. Recupera la titularidad de tus logros",
          detalle: "Todo lo que aprendiste, los proyectos que salvaste y las personas que formaste son capital tuyo, no de ellos. Nadie puede despedirte de lo que ya sabes."
        }
      ],
      advertencia: "En cualquier futura entrevista, hablar con amargura de tu exempleador es la bandera roja número uno. Sanar este rencor es imprescindible para volver a convencer."
    }
  },
  ansiedad: {
    id: "ansiedad",
    title: "Sobrecarga Reactiva e Impaciencia",
    subtitle: "Calidad estratégica frente a la saturación desesperada",
    tagline: "Intentar apagar el miedo con hiperactividad solo conduce al agotamiento prematuro.",
    accentColor: "indigo",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-800",
    badgeBg: "bg-indigo-100 text-indigo-900",
    description:
      "Esta respuesta suele darse en personas muy autoexigentes y responsables. El miedo a perder el estatus, el temor al reloj biológico laboral o la presión de sostener las cargas familiares te empuja a un estado de hiperactivación: enviar 30 currículums al día, actualizar LinkedIn compulsivamente y sentirte culpable si te tomas un café sin mirar el móvil.",
    symptoms: [
      "Culpa y desasosiego cuando no estás buscando empleo o 'produciendo'.",
      "Taquicardia, tensión cervical o despertares sobresaltados a las 4:00 AM.",
      "Frustración desmedida ante los correos automáticos de rechazo de las plataformas.",
      "Sensación de carrera contra el tiempo."
    ],
    keyInsight:
      "Para un perfil de más de 45 años, la búsqueda de empleo NO es un juego de números ni de bombardeo masivo de portales. El 80% de las oportunidades sénior se canalizan a través de confianza, relaciones y conversaciones de valor.",
    managementGuide: {
      prioridad: "Fijar límites de horario a la búsqueda y pasar de cantidad a calibre.",
      pasos: [
        {
          titulo: "1. Establece un horario estricto de 'despacho' (máximo 3h/día)",
          detalle: "Trata la búsqueda como un proyecto acotado: p. ej., de 10:00 a 13:00. Fuera de ese bloque, el ordenador se apaga y el teléfono no atiende alertas de empleo."
        },
        {
          titulo: "2. Sustituye 20 'clics rápidos' por 1 café de calidad",
          detalle: "Deja de aplicar en ofertas generalistas masivas. Dedica la semana a conectar de forma cálida con 2 o 3 antiguos colegas, clientes o proveedores con los que tuviste buena química profesional."
        },
        {
          titulo: "3. Práctica de respiración de anclaje fisiológico",
          detalle: "Cuando sientas la urgencia en el pecho, detente 3 minutos. La respiración 4-7-8 activa el nervio vago y desactiva la señal de alarma de la amígdala."
        }
      ],
      advertencia: "La desesperación se huele a distancia. Un profesional sereno que elige dónde aportar valor resulta infinitamente más magnético que alguien que ruega un hueco."
    }
  },
  reinvencion: {
    id: "reinvencion",
    title: "Transición Consciente y Valor Sénior",
    subtitle: "Capitalizar tu madurez para una etapa con más criterio",
    tagline: "Has procesado la sacudida inicial y estás en posición de convertir este punto de inflexión en tu mejor etapa profesional.",
    accentColor: "emerald",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-800",
    badgeBg: "bg-emerald-100 text-emerald-900",
    description:
      "Tus respuestas indican un grado notable de madurez emocional y autorregulación. Has comprendido que la edad no es un hándicap que ocultar, sino un compendio de solidez, criterio resolutivo y temple que las empresas necesitan hoy más que nunca. Estás en el momento idóneo para rediseñar cómo quieres que sean tus próximos 15 años de carrera.",
    symptoms: [
      "Capacidad de reflexionar con serenidad sobre errores y aciertos pasados.",
      "Interés por explorar nuevas vías: consultoría, interim management, mentoring o cambio de sector.",
      "Cuidado consciente del descanso y la salud sin sentimiento de culpa.",
      "Confianza en tu propia valía más allá del nombre de tu empresa anterior."
    ],
    keyInsight:
      "A los 25 años compites por energía y horas; a los 45+ compites por criterio, visión panorámica, gestión de egos y capacidad para desatascar problemas complejos.",
    managementGuide: {
      prioridad: "Definir tu propuesta de valor sénior y activar tu red con propósito.",
      pasos: [
        {
          titulo: "1. Sintetiza tus '3 Problemas Clave'",
          detalle: "No te definas por tu cargo anterior ('Ex-Director de...'), sino por los problemas específicos que sabes resolver mejor que nadie ('Ayudo a empresas en transición a ordenar sus operaciones')."
        },
        {
          titulo: "2. Mapea tu red de confianza en círculos concéntricos",
          detalle: "Contacta a las 15 personas clave que conocen tu ética de trabajo. No pidas trabajo: pide perspectiva, conversa sobre retos del sector y hazte visible."
        },
        {
          titulo: "3. Explora modelos flexibles",
          detalle: "Considera proyectos por hitos, asesoramiento a pymes o colaboraciones interinas. El mercado actual premia la flexibilidad de contar con un sénior sin el coste fijo tradicional."
        }
      ],
      advertencia: "No te relajes en exceso: mantén el hábito de comunicar tus ideas y compartir criterio en LinkedIn o foros del sector con regularidad."
    }
  }
};

export const COGNITIVE_REFRAMES = [
  {
    limiting: "“A mis más de 45 años nadie me va a contratar, solo quieren jóvenes baratos.”",
    reality: "Las organizaciones pagan barato por tareas mecánicas, pero pagan muy bien por criterio ante la incertidumbre, resolución de crisis y serenidad en la toma de decisiones. El 70% de las empresas se queja de la falta de madurez y habilidades blandas en sus equipos.",
    pill: "Criterio vs. Coste"
  },
  {
    limiting: "“He perdido mi estatus y quién era yo; ahora no soy nadie.”",
    reality: "Tú no eras tu tarjeta de visita ni tu correo corporativo. Eras la persona que solucionaba problemas, gestionaba personas y sacaba proyectos adelante. Todo ese talento sigue intacto contigo.",
    pill: "Identidad vs. Cargo"
  },
  {
    limiting: "“Lo di todo por esa empresa y no sirvió para nada; he tirado mi vida.”",
    reality: "No has tirado nada. Ganaste un sueldo, acumulaste prestigio, aprendiste lecciones invaluables y construiste relaciones. La empresa cerró una etapa mercantil; tus aprendizajes son de tu propiedad para siempre.",
    pill: "Capital adquirido"
  },
  {
    limiting: "“Tengo que aceptar lo primero que salga, no puedo permitirme elegir.”",
    reality: "Aceptar un mal encaje por pánico suele desembocar en un segundo despido o en bajas por ansiedad en menos de un año. Evaluar el encaje mutuo protege tu salud y tu reputación a largo plazo.",
    pill: "Elección con criterio"
  }
];

export const SENIOR_SUPERPOWERS = [
  {
    title: "Criterio bajo presión",
    desc: "Ya has vivido crisis económicas, cambios de directiva y proyectos al borde del colapso. No te asustas fácilmente y transmites calma al equipo."
  },
  {
    title: "Gestión de egos y personas",
    desc: "A los 45+ se comprende que el trabajo se saca con empatía y consenso, no con imposiciones ni guerras de protagonismo."
  },
  {
    title: "Compromiso y estabilidad",
    desc: "Un profesional maduro busca proyectos con sentido y aporta estabilidad duradera, frente a la rotación constante de perfiles más jóvenes."
  },
  {
    title: "Visión panorámica del negocio",
    desc: "Entiendes cómo afecta tu área a la cuenta de resultados global y a los clientes finales, no solo a tu parcela individual."
  }
];
