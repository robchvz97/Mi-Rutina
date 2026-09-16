
const ORIGINAL_ROUTINE = {
  1: {
    short:"D1", title:"Pecho + tríceps + deltoide lateral",
    exercises:[
      {name:"Press inclinado en máquina o Smith", sets:3, reps:"6-10", type:"big", media:"incline_press"},
      {name:"Press plano con mancuernas o máquina", sets:3, reps:"8-12", type:"big", media:"flat_press"},
      {name:"Aperturas en polea o peck-deck", sets:3, reps:"10-15", type:"small", media:"cable_fly"},
      {name:"Elevaciones laterales en polea", sets:3, reps:"12-20", type:"small", media:"lateral_cable"},
      {name:"Extensión de tríceps con cuerda", sets:3, reps:"10-15", type:"small", media:"triceps_pushdown"},
      {name:"Extensión de tríceps por encima de la cabeza", sets:3, reps:"10-15", type:"small", media:"triceps_overhead"}
    ]
  },
  2: {
    short:"D2", title:"Glúteo",
    exercises:[
      {name:"Hip thrust con barra o máquina", sets:4, reps:"6-10", type:"big", media:"hip_thrust"},
      {name:"Peso muerto rumano", sets:3, reps:"8-10", type:"big", media:"rdl"},
      {name:"Búlgaras con inclinación hacia adelante", sets:3, reps:"8-12", type:"big", note:"por pierna", media:"bulgarian"},
      {name:"Patada de glúteo en polea", sets:3, reps:"10-15", type:"small", media:"glute_kickback"},
      {name:"Abducción de cadera en máquina", sets:3, reps:"15-25", type:"small", media:"abduction"}
    ]
  },
  3: {
    short:"D3", title:"Espalda + bíceps",
    exercises:[
      {name:"Jalón al pecho agarre neutro", sets:3, reps:"6-10", type:"big", media:"lat_pulldown"},
      {name:"Remo apoyado en máquina", sets:3, reps:"8-12", type:"big", media:"machine_row"},
      {name:"Jalón unilateral en polea", sets:3, reps:"10-15", type:"small", media:"pulldown_unilateral"},
      {name:"Remo sentado en polea", sets:2, reps:"10-15", type:"big", media:"seated_row"},
      {name:"Reverse pec-deck / pájaros", sets:3, reps:"12-20", type:"small", media:"reverse_pecdeck"},
      {name:"Curl predicador", sets:3, reps:"8-12", type:"small", media:"preacher_curl"},
      {name:"Curl martillo", sets:2, reps:"10-15", type:"small", media:"hammer_curl"}
    ]
  },
  4: {
    short:"D4", title:"Hombros + brazos",
    exercises:[
      {name:"Press de hombro en máquina", sets:3, reps:"6-10", type:"big", media:"shoulder_press"},
      {name:"Elevaciones laterales con mancuerna", sets:3, reps:"10-15", type:"small", media:"lateral_db"},
      {name:"Elevaciones laterales en polea", sets:3, reps:"12-20", type:"small", media:"lateral_cable"},
      {name:"Curl de bíceps en polea", sets:3, reps:"10-15", type:"small", media:"cable_curl"},
      {name:"Curl inclinado con mancuerna", sets:2, reps:"8-12", type:"small", media:"incline_curl"},
      {name:"Extensión de tríceps en polea", sets:3, reps:"10-15", type:"small", media:"triceps_pushdown"},
      {name:"Extensión unilateral sobre la cabeza", sets:2, reps:"10-15", type:"small", media:"triceps_overhead_unilateral"}
    ]
  },
  5: {
    short:"D5", title:"Pierna: cuádriceps + femoral + pantorrilla",
    exercises:[
      {name:"Hack squat", sets:3, reps:"6-10", type:"big", media:"hack_squat"},
      {name:"Prensa", sets:3, reps:"10-15", type:"big", media:"leg_press"},
      {name:"Extensión de cuádriceps", sets:3, reps:"10-15", type:"small", media:"leg_extension"},
      {name:"Curl femoral sentado", sets:3, reps:"8-12", type:"small", media:"leg_curl_seated"},
      {name:"Curl femoral acostado", sets:2, reps:"10-15", type:"small", media:"leg_curl_lying"},
      {name:"Aductores en máquina", sets:2, reps:"12-20", type:"small", media:"adductor"},
      {name:"Elevación de pantorrilla", sets:4, reps:"8-15", type:"small", media:"calf_raise"}
    ]
  }
};

const STORE = {
  sessions: "roberto_gym_sessions_v1",
  settings: "roberto_gym_settings_v1",
  routine: "roberto_gym_routine_v2",
  currentDay: "roberto_gym_current_day_v1"
};
function cloneRoutine(routine){
  return JSON.parse(
    JSON.stringify(routine)
  );
}

function loadRoutine(){
  const saved =
    JSON.parse(
      localStorage.getItem(STORE.routine) ||
      "null"
    );

  return saved ||
    cloneRoutine(ORIGINAL_ROUTINE);
}

function saveRoutine(routine){
  localStorage.setItem(
    STORE.routine,
    JSON.stringify(routine)
  );
}

let ROUTINE = loadRoutine();
let previewRoutine = null;

const EXERCISES = {
  
  incline_press: {
    name: "Press inclinado en máquina o Smith",
    type: "big",
    media: "incline_press"
  },

  flat_press: {
    name: "Press plano con mancuernas o máquina",
    type: "big",
    media: "flat_press"
  },

  cable_fly: {
    name: "Aperturas en polea o peck-deck",
    type: "small",
    media: "cable_fly"
  },

  shoulder_press: {
    name: "Press de hombro en máquina",
    type: "big",
    media: "shoulder_press"
  },

  lateral_cable: {
    name: "Elevaciones laterales en polea",
    type: "small",
    media: "lateral_cable"
  },

  lateral_db: {
    name: "Elevaciones laterales con mancuerna",
    type: "small",
    media: "lateral_db"
  },

  reverse_pecdeck: {
    name: "Reverse pec-deck / pájaros",
    type: "small",
    media: "reverse_pecdeck"
  },

  triceps_pushdown: {
    name: "Extensión de tríceps en polea",
    type: "small",
    media: "triceps_pushdown"
  },

  triceps_overhead: {
    name: "Extensión de tríceps por encima de la cabeza",
    type: "small",
    media: "triceps_overhead"
  },

  triceps_overhead_unilateral: {
    name: "Extensión unilateral sobre la cabeza",
    type: "small",
    media: "triceps_overhead_unilateral"
  },

  lat_pulldown: {
    name: "Jalón al pecho agarre neutro",
    type: "big",
    media: "lat_pulldown"
  },

  machine_row: {
    name: "Remo apoyado en máquina",
    type: "big",
    media: "machine_row"
  },

  seated_row: {
    name: "Remo sentado en polea",
    type: "big",
    media: "seated_row"
  },

  pulldown_unilateral: {
    name: "Jalón unilateral en polea",
    type: "small",
    media: "pulldown_unilateral"
  },

  preacher_curl: {
    name: "Curl predicador",
    type: "small",
    media: "preacher_curl"
  },

  hammer_curl: {
    name: "Curl martillo",
    type: "small",
    media: "hammer_curl"
  },

  cable_curl: {
    name: "Curl de bíceps en polea",
    type: "small",
    media: "cable_curl"
  },

  incline_curl: {
    name: "Curl inclinado con mancuerna",
    type: "small",
    media: "incline_curl"
  },

  hip_thrust: {
    name: "Hip thrust con barra o máquina",
    type: "big",
    media: "hip_thrust"
  },

  rdl: {
    name: "Peso muerto rumano",
    type: "big",
    media: "rdl"
  },

  bulgarian: {
    name: "Búlgaras con inclinación hacia adelante",
    type: "big",
    media: "bulgarian",
    note: "por pierna"
  },

  glute_kickback: {
    name: "Patada de glúteo en polea",
    type: "small",
    media: "glute_kickback"
  },

  abduction: {
    name: "Abducción de cadera en máquina",
    type: "small",
    media: "abduction"
  },

  hack_squat: {
    name: "Hack squat",
    type: "big",
    media: "hack_squat"
  },

  leg_press: {
    name: "Prensa",
    type: "big",
    media: "leg_press"
  },

  leg_extension: {
    name: "Extensión de cuádriceps",
    type: "small",
    media: "leg_extension"
  },

  leg_curl_seated: {
    name: "Curl femoral sentado",
    type: "small",
    media: "leg_curl_seated"
  },

  leg_curl_lying: {
    name: "Curl femoral acostado",
    type: "small",
    media: "leg_curl_lying"
  },

  adductor: {
    name: "Aductores en máquina",
    type: "small",
    media: "adductor"
  },

  calf_raise: {
    name: "Elevación de pantorrilla",
    type: "small",
    media: "calf_raise"
  }
  ,
  smith_incline_press: {
    name: "Press inclinado en Smith",
    type: "big",
    media: "smith_incline_press"
  },

  convergent_chest_press: {
  name: "Press convergente en máquina",
  type: "big",
  media: "convergent_chest_press"
},

  assisted_dips: {
    name: "Fondos asistidos",
    type: "big",
    media: "assisted_dips"
  },

  pec_deck: {
    name: "Peck-deck",
    type: "small",
    media: "pec_deck"
  },

  smith_shoulder_press: {
    name: "Press militar en Smith",
    type: "big",
    media: "smith_shoulder_press"
  },

  upright_row_cable: {
    name: "Remo al mentón en polea",
    type: "small",
    media: "upright_row_cable"
  },

  assisted_pullup: {
    name: "Dominada asistida",
    type: "big",
    media: "assisted_pullup"
  },

  tbar_row: {
    name: "Remo T-bar",
    type: "big",
    media: "tbar_row"
  },

  chest_supported_row_unilateral: {
    name: "Remo unilateral apoyado",
    type: "big",
    media: "chest_supported_row_unilateral"
  },

  straight_arm_pulldown: {
    name: "Pull-over / jalón brazos rectos en polea",
    type: "small",
    media: "straight_arm_pulldown"
  },

  pullover_machine: {
    name: "Pull-over en máquina",
    type: "small",
    media: "pullover_machine"
  },

  smith_row: {
    name: "Remo en Smith",
    type: "big",
    media: "smith_row"
  },

  bayesian_curl: {
    name: "Curl Bayesian en polea",
    type: "small",
    media: "bayesian_curl"
  },

  ez_bar_curl: {
    name: "Curl con barra EZ",
    type: "small",
    media: "ez_bar_curl"
  },

  spider_curl: {
    name: "Spider curl",
    type: "small",
    media: "spider_curl"
  },

  reverse_curl: {
    name: "Curl inverso",
    type: "small",
    media: "reverse_curl"
  },

  close_grip_press: {
    name: "Press cerrado para tríceps",
    type: "big",
    media: "close_grip_press"
  },

  crossbody_triceps: {
    name: "Extensión de tríceps cruzada en polea",
    type: "small",
    media: "crossbody_triceps"
  },

  rope_overhead_extension: {
    name: "Extensión sobre cabeza con cuerda",
    type: "small",
    media: "rope_overhead_extension"
  },

  smith_squat: {
    name: "Sentadilla en Smith",
    type: "big",
    media: "smith_squat"
  },

  pendulum_squat: {
    name: "Sentadilla pendular",
    type: "big",
    media: "pendulum_squat"
  },

  leg_press_unilateral: {
    name: "Prensa unilateral",
    type: "big",
    media: "leg_press_unilateral",
    note: "por pierna"
  },

  smith_split_squat: {
    name: "Split squat en Smith",
    type: "big",
    media: "smith_split_squat",
    note: "por pierna"
  },

  db_rdl: {
    name: "Peso muerto rumano con mancuernas",
    type: "big",
    media: "db_rdl"
  },

  walking_lunge: {
    name: "Zancadas caminando",
    type: "big",
    media: "walking_lunge",
    note: "por pierna"
  },

  seated_calf_raise: {
    name: "Pantorrilla sentado",
    type: "small",
    media: "seated_calf_raise"
  },

  glute_bridge_machine: {
    name: "Glute bridge en máquina",
    type: "big",
    media: "glute_bridge_machine"
  },

  cable_adduction: {
    name: "Aducción en polea",
    type: "small",
    media: "cable_adduction"
  },

  frog_pump: {
    name: "Frog pumps",
    type: "small",
    media: "frog_pump"
  }
};
function buildExercise(
  key,
  sets,
  reps,
  targetRir = "1-2"
){
  const base = EXERCISES[key];

  return {
    ...base,
    sets,
    reps,
    rir: targetRir,
    targetRir
  };
}

function randomItem(items){
  return items[
    Math.floor(
      Math.random() * items.length
    )
  ];
}

function shuffle(items){
  const copy = [...items];

  for(
    let i = copy.length - 1;
    i > 0;
    i--
  ){
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}

function routineDay(
  short,
  title,
  exercises
){
  return {
    short,
    title,
    exercises
  };
}
const EXERCISE_GROUPS = {

  chestPress: [
    "incline_press",
    "flat_press",
    "smith_incline_press",
    "convergent_chest_press",
    "assisted_dips"
  ],

  chestIsolation: [
    "cable_fly",
    "pec_deck"
  ],

  shoulderPress: [
    "shoulder_press",
    "smith_shoulder_press"
  ],

  lateralDelt: [
    "lateral_cable",
    "lateral_db",
    "upright_row_cable"
  ],

  rearDelt: [
    "reverse_pecdeck"
  ],

  verticalPull: [
    "lat_pulldown",
    "pulldown_unilateral",
    "assisted_pullup"
  ],

  horizontalPull: [
    "machine_row",
    "seated_row",
    "tbar_row",
    "chest_supported_row_unilateral",
    "smith_row"
  ],

  latIsolation: [
    "straight_arm_pulldown",
    "pullover_machine"
  ],

  biceps: [
    "preacher_curl",
    "hammer_curl",
    "cable_curl",
    "incline_curl",
    "bayesian_curl",
    "ez_bar_curl",
    "spider_curl",
    "reverse_curl"
  ],

  triceps: [
    "triceps_pushdown",
    "triceps_overhead",
    "triceps_overhead_unilateral",
    "close_grip_press",
    "crossbody_triceps",
    "rope_overhead_extension"
  ],

  squatPattern: [
    "hack_squat",
    "leg_press",
    "smith_squat",
    "pendulum_squat",
    "leg_press_unilateral",
    "smith_split_squat",
    "bulgarian"
  ],

  hipHinge: [
    "rdl",
    "db_rdl"
  ],

  gluteCompound: [
    "hip_thrust",
    "glute_bridge_machine",
    "bulgarian",
    "smith_split_squat",
    "walking_lunge"
  ],

  gluteIsolation: [
    "glute_kickback",
    "abduction",
    "frog_pump"
  ],

  quadricepsIsolation: [
    "leg_extension"
  ],

  hamstrings: [
    "leg_curl_seated",
    "leg_curl_lying"
  ],

  adductors: [
    "adductor",
    "cable_adduction"
  ],

  calves: [
    "calf_raise",
    "seated_calf_raise"
  ]

};
const READY_MEDIA = new Set([
  "tbar_row",
  "assisted_pullup",
  "upright_row_cable",
  "smith_shoulder_press",
  "smith_incline_press",
  "pec_deck",
  "assisted_dips",
  "convergent_chest_press",
  "incline_press",
  "flat_press",
  "cable_fly",
  "shoulder_press",
  "lateral_cable",
  "lateral_db",
  "reverse_pecdeck",
  "triceps_pushdown",
  "triceps_overhead",
  "triceps_overhead_unilateral",
  "lat_pulldown",
  "machine_row",
  "seated_row",
  "pulldown_unilateral",
  "preacher_curl",
  "hammer_curl",
  "cable_curl",
  "incline_curl",
  "hip_thrust",
  "rdl",
  "bulgarian",
  "glute_kickback",
  "abduction",
  "hack_squat",
  "leg_press",
  "leg_extension",
  "leg_curl_seated",
  "leg_curl_lying",
  "adductor",
  "calf_raise"
]);

function readyPool(pool){
  return pool.filter(
    key =>
      READY_MEDIA.has(
        EXERCISES[key]?.media
      )
  );
}
function uniquePick(
  pool,
  used,
  fallback = []
){
  const available =
    readyPool(pool);

  const availableFallback =
    readyPool(fallback);

  const shuffled =
    shuffle(available);

  for(const key of shuffled){
    if(!used.has(key)){
      used.add(key);
      return key;
    }
  }

  const fallbackShuffled =
    shuffle(
      availableFallback
    );

  for(
    const key of fallbackShuffled
  ){
    if(!used.has(key)){
      used.add(key);
      return key;
    }
  }

  const any =
    shuffled[0] ||
    fallbackShuffled[0] ||
    available[0] ||
    availableFallback[0];

  if(any){
    used.add(any);
  }

  return any;
}

function variantPair(
  primaryPool,
  secondaryPool,
  used
){
  return [
    uniquePick(
      primaryPool,
      used,
      secondaryPool
    ),
    uniquePick(
      secondaryPool,
      used,
      primaryPool
    )
  ];
}

function makePushDay(
  label,
  used
){
  const [press1, press2] =
    variantPair(
      EXERCISE_GROUPS.chestPress,
      EXERCISE_GROUPS.chestPress,
      used
    );

  const chestIso =
    uniquePick(
      EXERCISE_GROUPS.chestIsolation,
      used
    );

  const shoulderMain =
    uniquePick(
      EXERCISE_GROUPS.shoulderPress,
      used
    );

  const lateral =
    uniquePick(
      EXERCISE_GROUPS.lateralDelt,
      used
    );

  const triceps1 =
    uniquePick(
      EXERCISE_GROUPS.triceps,
      used
    );

  const triceps2 =
    uniquePick(
      EXERCISE_GROUPS.triceps,
      used,
      EXERCISE_GROUPS.triceps
    );

  return routineDay(
    label === "A" ? "D1" : "D4",
    label === "A"
      ? "Push A · Pecho / hombro / tríceps"
      : "Push B · Pecho / hombro / tríceps",
    [
      buildExercise(
        press1,
        3,
        label === "A" ? "5-8" : "6-10",
        "1-2"
      ),
      buildExercise(
        press2,
        3,
        "8-12",
        "1-2"
      ),
      buildExercise(
        chestIso,
        2,
        "12-15",
        "1-2"
      ),
      buildExercise(
        shoulderMain,
        3,
        "6-10",
        "1-2"
      ),
      buildExercise(
        lateral,
        3,
        "12-20",
        "0-1"
      ),
      buildExercise(
        triceps1,
        2,
        "8-12",
        "1-2"
      ),
      buildExercise(
        triceps2,
        2,
        "12-15",
        "0-1"
      )
    ]
  );
}

function makePullDay(
  label,
  used
){
  const vertical =
    uniquePick(
      EXERCISE_GROUPS.verticalPull,
      used
    );

  const horizontal1 =
    uniquePick(
      EXERCISE_GROUPS.horizontalPull,
      used
    );

  const horizontal2 =
    uniquePick(
      EXERCISE_GROUPS.horizontalPull,
      used,
      EXERCISE_GROUPS.verticalPull
    );

 const latIso =
  uniquePick(
    EXERCISE_GROUPS.latIsolation,
    used,
    EXERCISE_GROUPS.verticalPull
  );

  const rearDelt =
    uniquePick(
      EXERCISE_GROUPS.rearDelt,
      used
    );

  const curl1 =
    uniquePick(
      EXERCISE_GROUPS.biceps,
      used
    );

  const curl2 =
    uniquePick(
      EXERCISE_GROUPS.biceps,
      used,
      EXERCISE_GROUPS.biceps
    );

  return routineDay(
    "D2",
    label === "A"
      ? "Pull A · Espalda / bíceps"
      : "Pull B · Espalda / bíceps",
    [
      buildExercise(
        vertical,
        3,
        "6-10",
        "1-2"
      ),
      buildExercise(
        horizontal1,
        3,
        label === "A" ? "6-10" : "8-12",
        "1-2"
      ),
      buildExercise(
        horizontal2,
        2,
        "8-12",
        "1-2"
      ),
      buildExercise(
        latIso,
        2,
        "12-15",
        "1-2"
      ),
      buildExercise(
        rearDelt,
        2,
        "15-20",
        "0-1"
      ),
      buildExercise(
        curl1,
        2,
        "8-12",
        "1-2"
      ),
      buildExercise(
        curl2,
        2,
        "12-15",
        "0-1"
      )
    ]
  );
}

function makeGluteDay(
  used
){
  const gluteMain =
    uniquePick(
      EXERCISE_GROUPS.gluteCompound,
      used
    );

  const hinge =
    uniquePick(
      EXERCISE_GROUPS.hipHinge,
      used
    );

  const unilateral =
    uniquePick(
      [
        "bulgarian",
        "smith_split_squat",
        "walking_lunge"
      ],
      used,
      EXERCISE_GROUPS.gluteCompound
    );

  const kickback =
    uniquePick(
      ["glute_kickback"],
      used,
      EXERCISE_GROUPS.gluteIsolation
    );

  const abduction =
    uniquePick(
      ["abduction", "frog_pump"],
      used,
      EXERCISE_GROUPS.gluteIsolation
    );

  const hamCurl =
    uniquePick(
      EXERCISE_GROUPS.hamstrings,
      used
    );

  return routineDay(
    "D3",
    "Glúteo · Dominante de cadera",
    [
      buildExercise(
        gluteMain,
        4,
        "6-10",
        "1-2"
      ),
      buildExercise(
        hinge,
        3,
        "6-10",
        "1-2"
      ),
      buildExercise(
        unilateral,
        3,
        "8-12",
        "1-2"
      ),
      buildExercise(
        hamCurl,
        2,
        "10-15",
        "1-2"
      ),
      buildExercise(
        kickback,
        2,
        "12-20",
        "0-1"
      ),
      buildExercise(
        abduction,
        2,
        "15-25",
        "0-1"
      )
    ]
  );
}

function makeLegDay(
  used
){
  const squat1 =
    uniquePick(
      EXERCISE_GROUPS.squatPattern,
      used
    );

  const squat2 =
    uniquePick(
      EXERCISE_GROUPS.squatPattern,
      used,
      EXERCISE_GROUPS.quadricepsIsolation
    );

  const quadIso =
    uniquePick(
      EXERCISE_GROUPS.quadricepsIsolation,
      used
    );

  const hamCurl =
    uniquePick(
      EXERCISE_GROUPS.hamstrings,
      used
    );

  const adductor =
    uniquePick(
      EXERCISE_GROUPS.adductors,
      used
    );

  const calves =
    uniquePick(
      EXERCISE_GROUPS.calves,
      used
    );

  return routineDay(
    "D5",
    "Pierna · Cuádriceps / femoral / pantorrilla",
    [
      buildExercise(
        squat1,
        3,
        "5-8",
        "1-2"
      ),
      buildExercise(
        squat2,
        3,
        "8-12",
        "1-2"
      ),
      buildExercise(
        quadIso,
        2,
        "12-15",
        "0-1"
      ),
      buildExercise(
        hamCurl,
        3,
        "8-12",
        "1-2"
      ),
      buildExercise(
        adductor,
        2,
        "12-20",
        "0-1"
      ),
      buildExercise(
        calves,
        4,
        "8-12",
        "1-2"
      )
    ]
  );
}

function generateRoutineBlock(){
  const usedPushA =
    new Set();

  const usedPull =
    new Set();

  const usedGlute =
    new Set();

  const usedPushB =
    new Set();

  const usedLeg =
    new Set();

  const pushA =
    makePushDay(
      "A",
      usedPushA
    );

  const pullA =
    makePullDay(
      "A",
      usedPull
    );

  const glute =
    makeGluteDay(
      usedGlute
    );

  const pushB =
    makePushDay(
      "B",
      usedPushB
    );

  const legs =
    makeLegDay(
      usedLeg
    );

  return {
  1: {
    ...pushA,
    short: "D1",
    title: "Día 1 · Push A"
  },

  2: {
    ...pullA,
    short: "D2",
    title: "Día 2 · Pull A"
  },

  3: {
    ...glute,
    short: "D3",
    title: "Día 3 · Glúteo"
  },

  4: {
    ...pushB,
    short: "D4",
    title: "Día 4 · Push B"
  },

  5: {
    ...legs,
    short: "D5",
    title: "Día 5 · Pierna"
  }
};
}
function renderRoutinePreview(routine){
  const container =
    document.getElementById(
      "routinePreview"
    );

  if(!container || !routine){
    return;
  }

  container.innerHTML = "";

  for(let day = 1; day <= 5; day++){

    const data = routine[day];

    if(!data){
      continue;
    }

    const dayCard =
      document.createElement("div");

    dayCard.className =
      "preview-day";


    const head =
      document.createElement("div");

    head.className =
      "preview-day-head";

    head.innerHTML = `
      <strong>
        ${data.title}
      </strong>

      <span>
        ${data.exercises.length}
        ejercicios
      </span>
    `;

    dayCard.appendChild(head);


    data.exercises.forEach(
      (exercise) => {

        const row =
          document.createElement("div");

        row.className =
          "preview-exercise";


        const name =
          document.createElement("div");

        name.className =
          "preview-exercise-name";

        name.textContent =
          exercise.name;


        const meta =
          document.createElement("div");

        meta.className =
          "preview-exercise-meta";

        meta.textContent =
          `${exercise.sets}×${exercise.reps} · RIR ${exercise.targetRir}`;


        row.appendChild(name);
        row.appendChild(meta);

        dayCard.appendChild(row);
      }
    );


    container.appendChild(dayCard);
  }

  container.classList.remove(
    "hidden"
  );

  document
    .getElementById(
      "routinePreviewActions"
    )
    ?.classList.remove(
      "hidden"
    );
}


function createRoutinePreview(){

  previewRoutine =
    generateRoutineBlock();

  renderRoutinePreview(
    previewRoutine
  );

}
function clearTodayOpenSessions(){
  const all =
    JSON.parse(
      localStorage.getItem(
        STORE.sessions
      ) || "{}"
    );

  const today = ymd();

  for(let day = 1; day <= 5; day++){
    delete all[
      `${today}_d${day}`
    ];
  }

  localStorage.setItem(
    STORE.sessions,
    JSON.stringify(all)
  );
}


function applyPreviewRoutine(){

  if(!previewRoutine){
    return;
  }

  const ok = confirm(
    "¿Usar esta nueva rutina de 5 días?\n\n" +
    "Tu historial anterior se conservará."
  );

  if(!ok){
    return;
  }

  ROUTINE =
    cloneRoutine(
      previewRoutine
    );

  saveRoutine(ROUTINE);

  clearTodayOpenSessions();

  previewRoutine = null;

  document
    .getElementById(
      "routinePreview"
    )
    ?.classList.add("hidden");

  document
    .getElementById(
      "routinePreviewActions"
    )
    ?.classList.add("hidden");

  const status =
    document.getElementById(
      "routineStatus"
    );

  if(status){
    status.textContent =
      "Nueva rutina activa ✅ Recomendación: mantenla entre 6 y 8 semanas.";
  }

  document
    .getElementById(
      "restoreRoutineBtn"
    )
    ?.classList.remove("hidden");

  renderWorkout();
}


function restoreOriginalRoutine(){

  const ok = confirm(
    "¿Volver a tu rutina original?\n\n" +
    "Tu historial se conservará."
  );

  if(!ok){
    return;
  }

  localStorage.removeItem(
    STORE.routine
  );

  ROUTINE =
    cloneRoutine(
      ORIGINAL_ROUTINE
    );

  clearTodayOpenSessions();

  const status =
    document.getElementById(
      "routineStatus"
    );

  if(status){
    status.textContent =
      "Rutina original restaurada ✅";
  }

  document
    .getElementById(
      "restoreRoutineBtn"
    )
    ?.classList.add("hidden");

  renderWorkout();
}


function initRoutineGenerator(){

  const generateBtn =
    document.getElementById(
      "generateRoutineBtn"
    );

  const regenerateBtn =
    document.getElementById(
      "regenerateRoutineBtn"
    );

  const applyBtn =
    document.getElementById(
      "applyRoutineBtn"
    );

  const restoreBtn =
    document.getElementById(
      "restoreRoutineBtn"
    );


  generateBtn?.addEventListener(
    "click",
    createRoutinePreview
  );


  regenerateBtn?.addEventListener(
    "click",
    createRoutinePreview
  );


  applyBtn?.addEventListener(
    "click",
    applyPreviewRoutine
  );


  restoreBtn?.addEventListener(
    "click",
    restoreOriginalRoutine
  );


  if(
    localStorage.getItem(
      STORE.routine
    )
  ){
    restoreBtn?.classList.remove(
      "hidden"
    );

    const status =
      document.getElementById(
        "routineStatus"
      );

    if(status){
      status.textContent =
        "Rutina personalizada activa · Recomendación: úsala entre 6 y 8 semanas.";
    }
  }
}
let selectedDay =
  Math.min(
    5,
    Math.max(
      1,
      Number(
        localStorage.getItem(
          STORE.currentDay
        )
      ) || 1
    )
  );
let timerInt = null, timerSeconds = 0, installPrompt = null;
const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];
function ymd(date=new Date()){ const y=date.getFullYear(), m=String(date.getMonth()+1).padStart(2,"0"), d=String(date.getDate()).padStart(2,"0"); return `${y}-${m}-${d}`; }
function loadSessions(){ return JSON.parse(localStorage.getItem(STORE.sessions) || "{}"); }
function saveSessions(v){ localStorage.setItem(STORE.sessions, JSON.stringify(v)); }
function loadSettings(){ return Object.assign({bigRest:150, smallRest:90}, JSON.parse(localStorage.getItem(STORE.settings)||"{}")); }
function saveSettings(v){ localStorage.setItem(STORE.settings, JSON.stringify(v)); }
function sessionKey(day=selectedDay){ return `${ymd()}_d${day}`; }
function ensureSession(day=selectedDay){ const all=loadSessions(), key=sessionKey(day); if(!all[key]){ all[key]={date:ymd(), day, title:ROUTINE[day]?.title||"Descanso", completed:false, exercises:{}}; saveSessions(all);} return all[key]; }
function updateSession(mutator){ const all=loadSessions(), key=sessionKey(); const session=all[key] || ensureSession(); mutator(session); all[key]=session; saveSessions(all); }
function lastCompletedForExercise(name, excludeKey=sessionKey()){ const all=loadSessions(); const rows=Object.entries(all).filter(([k,s])=>k!==excludeKey && s.completed && s.exercises && s.exercises[name]).sort((a,b)=> (b[1].finishedAt || b[1].date).localeCompare(a[1].finishedAt || a[1].date)); if(!rows.length) return null; return rows[0][1].exercises[name]; }
function renderDayStrip(){
  const strip = $("#dayStrip");

  strip.innerHTML = "";

  [1,2,3,4,5].forEach(day => {

    const b =
      document.createElement("button");

    b.className =
      "day-chip" +
      (day === selectedDay
        ? " active"
        : "");

    b.textContent =
      ROUTINE[day].short;

    b.onclick = () => {

      selectedDay = day;

      localStorage.setItem(
        STORE.currentDay,
        String(selectedDay)
      );

      renderWorkout();
    };

    strip.appendChild(b);
  });
}
function mediaHtml(key){ return `
<div class="demo-wrap">
  <div class="demo-title">Demostración</div>
  <div class="media-grid">
    <div class="media-card"><img src="${key}_inicio.png" alt="${key} inicio"><div class="media-label">Inicio</div></div>
    <div class="media-card"><img src="${key}_final.png" alt="${key} final"><div class="media-label">Final</div></div>
  </div>
</div>`; }
function renderWorkout(){ renderDayStrip(); const r=ROUTINE[selectedDay]; $("#dayTitle").textContent=r.title; $("#daySubtitle").textContent="Registra libras, repeticiones y RIR de cada serie."; $("#sessionLabel").textContent=r.short; ensureSession(); const container=$("#exerciseList"); container.innerHTML=""; const current=loadSessions()[sessionKey()];
  r.exercises.forEach((ex,idx)=>{
    const saved=current.exercises[ex.name] || {done:false, sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))};
    if(!saved.sets || saved.sets.length!==ex.sets){ saved.sets=Array.from({length:ex.sets},(_,i)=>saved.sets?.[i] || {kg:"",reps:"",rir:"",done:false}); }
    const last=lastCompletedForExercise(ex.name); let lastText="Sin registro anterior"; if(last?.sets?.length){ const usable=last.sets.filter(s=>s.kg || s.reps); if(usable.length){ lastText="Última: "+usable.map(s=>`${s.kg||"—"} lb × ${s.reps||"—"}`).join(" · "); } }
    const card=document.createElement("article"); card.className="exercise-card"; card.innerHTML=`
      <div class="exercise-head">
        <input class="exercise-check" type="checkbox" ${saved.done?"checked":""} data-ex="${idx}">
        <div class="exercise-title">
          <h3>${ex.name}</h3><div class="exercise-meta">
  ${ex.sets} series · ${ex.reps} reps
  ${ex.rir ? ` · RIR objetivo ${ex.rir}` : ""}
  ${ex.note ? ` · ${ex.note}` : ""}
</div>
          <div class="last-session">${lastText}</div>
        </div>
      </div>
      ${mediaHtml(ex.media)}
      <div class="labels"><span></span><span>LB</span><span>REPS</span><span>RIR</span><span>✓</span></div>
      <div class="sets">
        ${saved.sets.map((s,i)=>`
          <div class="set-row">
            <div class="set-num">${i+1}</div>
            <input inputmode="decimal" placeholder="0" value="${s.kg??""}" data-field="kg" data-ex="${idx}" data-set="${i}">
            <input inputmode="numeric" placeholder="0" value="${s.reps??""}" data-field="reps" data-ex="${idx}" data-set="${i}">
            <input inputmode="numeric" placeholder="1" value="${s.rir??""}" data-field="rir" data-ex="${idx}" data-set="${i}">
            <input class="set-done" type="checkbox" ${s.done?"checked":""} data-ex="${idx}" data-set="${i}">
          </div>`).join("")}
      </div>
      <div class="exercise-actions"><button class="rest-btn" data-rest="${ex.type}" data-name="${ex.name}">⏱ Descanso</button></div>`;
    container.appendChild(card);
  }); bindWorkoutInputs(); updateProgress(); }
function bindWorkoutInputs(){
  $$(".exercise-check").forEach(el=>{ el.onchange=()=>{ const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex]; updateSession(s=>{ s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))}; s.exercises[ex.name].done=el.checked; }); updateProgress(); }; });
  $$('[data-field]').forEach(el=>{ el.oninput=()=>{ const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex], set=+el.dataset.set, field=el.dataset.field; updateSession(s=>{ s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))}; s.exercises[ex.name].sets[set][field]=el.value; }); updateProgress(); }; });
  $$(".set-done").forEach(el=>{ el.onchange=()=>{ const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex], set=+el.dataset.set; updateSession(s=>{ s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))}; s.exercises[ex.name].sets[set].done=el.checked; if(el.checked){ const allDone=s.exercises[ex.name].sets.every(x=>x.done); if(allDone) s.exercises[ex.name].done=true; } }); renderWorkout(); }; });
  $$(".rest-btn").forEach(btn=>{ btn.onclick=()=>{ const st=loadSettings(); const sec=btn.dataset.rest==="big" ? +st.bigRest : +st.smallRest; startTimer(sec,btn.dataset.name); }; }); }
function updateProgress(){ const session=loadSessions()[sessionKey()] || ensureSession(); const r=ROUTINE[selectedDay]; let exDone=0,setDone=0,totalSets=0; r.exercises.forEach(ex=>{ const sx=session.exercises[ex.name]; if(sx?.done) exDone++; totalSets += ex.sets; setDone += sx?.sets?.filter(s=>s.done).length || 0; }); $("#sessionProgress").textContent=`${exDone}/${r.exercises.length}`; $("#seriesProgress").textContent=`${setDone}/${totalSets}`; }
function finishWorkout(){

  const all = loadSessions();
  const key = sessionKey();

  const session =
    all[key] || ensureSession();

  // Guardamos el entrenamiento terminado
  session.completed = true;
  session.finishedAt =
    new Date().toISOString();

  // Copia permanente para el historial
  const historyKey =
    `${key}_done_${Date.now()}`;

  all[historyKey] =
    JSON.parse(
      JSON.stringify(session)
    );

  // Creamos una sesión nueva y limpia
  all[key] = {
    date: ymd(),
    day: selectedDay,
    title:
      ROUTINE[selectedDay]?.title ||
      "Descanso",
    completed: false,
    exercises: {}
  };

  saveSessions(all);
selectedDay =
  selectedDay >= 5
    ? 1
    : selectedDay + 1;

localStorage.setItem(
  STORE.currentDay,
  String(selectedDay)
);
  alert(
    "Entrenamiento guardado ✅"
  );

  // Limpia visualmente todas las palomitas
  renderWorkout();

  // Mantiene el entrenamiento anterior en historial
  renderHistory();
}
function renderHistory(){ const all=loadSessions(); const list=$("#historyList"); const entries=Object.values(all).filter(s=>s.completed).sort((a,b)=>(b.finishedAt||b.date).localeCompare(a.finishedAt||a.date)); if(!entries.length){ list.innerHTML=`<div class="history-card"><p class="muted">Todavía no tienes entrenamientos terminados.</p></div>`; return; }
  list.innerHTML=entries.map(s=>{ const date=new Date(s.date+"T12:00:00").toLocaleDateString("es-MX",{weekday:"short",day:"numeric",month:"short"}); const items=Object.entries(s.exercises||{}).filter(([_,v])=>v.done || v.sets?.some(x=>x.kg||x.reps)).map(([name,v])=>{ const doneSets=(v.sets||[]).filter(x=>x.kg||x.reps); const txt=doneSets.map(x=>`${x.kg||"—"} lb × ${x.reps||"—"}${x.rir!==""?` · RIR ${x.rir}`:""}`).join(" / "); return `<div class="history-item"><strong>${name}</strong><span class="muted">${txt||"Completado"}</span></div>`; }).join(""); return `<article class="history-card"><h3>${s.title}</h3><div class="muted">${date}</div><div class="history-exercises">${items}</div></article>`; }).join(""); }
function startTimer(sec,name){ clearInterval(timerInt); timerSeconds=sec; $("#timerExercise").textContent=name; $("#timerOverlay").classList.remove("hidden"); drawTimer(); timerInt=setInterval(()=>{ timerSeconds--; drawTimer(); if(timerSeconds<=0){ clearInterval(timerInt); if("vibrate" in navigator) navigator.vibrate([200,100,200]); setTimeout(()=>$("#timerOverlay").classList.add("hidden"),800); } },1000); }
function drawTimer(){ const m=Math.floor(Math.max(timerSeconds,0)/60), s=Math.max(timerSeconds,0)%60; $("#timerDisplay").textContent=`${m}:${String(s).padStart(2,"0")}`; document.title=timerSeconds>0?`${m}:${String(s).padStart(2,"0")} · Mi Rutina`:"Mi Rutina · Roberto"; }
function initSettings(){ const st=loadSettings(); $("#bigRest").value=String(st.bigRest); $("#smallRest").value=String(st.smallRest); ["bigRest","smallRest"].forEach(id=>{ $("#"+id).onchange=()=>{ const v=loadSettings(); v[id]=+$("#"+id).value; saveSettings(v); }; }); }
$$(".nav-btn").forEach(btn=>{ btn.onclick=()=>{ $$(".nav-btn").forEach(x=>x.classList.remove("active")); btn.classList.add("active"); $$(".view").forEach(v=>v.classList.remove("active")); $("#"+btn.dataset.view).classList.add("active"); if(btn.dataset.view==="historyView") renderHistory(); }; });
$("#finishBtn").onclick=finishWorkout; $("#clearHistoryBtn").onclick=()=>{ if(confirm("¿Seguro que quieres borrar todo tu historial?")){ localStorage.removeItem(STORE.sessions); renderHistory(); renderWorkout(); } };
$("#minus15").onclick=()=>{timerSeconds=Math.max(0,timerSeconds-15);drawTimer()}; $("#plus15").onclick=()=>{timerSeconds+=15;drawTimer()}; $("#stopTimer").onclick=()=>{clearInterval(timerInt);$("#timerOverlay").classList.add("hidden");document.title="Mi Rutina · Roberto"};
window.addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); installPrompt=e; $("#installBtn").classList.remove("hidden"); }); $("#installBtn").onclick=async()=>{ if(installPrompt){ installPrompt.prompt(); await installPrompt.userChoice; installPrompt=null; $("#installBtn").classList.add("hidden"); } };
if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{})); }
initSettings(); initRoutineGenerator(); renderWorkout();
