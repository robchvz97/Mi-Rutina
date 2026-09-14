
const ROUTINE = {
  1: {
    short:"Lun", title:"Pecho + tríceps + deltoide lateral",
    exercises:[
      {name:"Press inclinado en máquina o Smith", sets:3, reps:"6-10", type:"big"},
      {name:"Press plano con mancuernas o máquina", sets:3, reps:"8-12", type:"big"},
      {name:"Aperturas en polea o peck-deck", sets:3, reps:"10-15", type:"small"},
      {name:"Elevaciones laterales en polea", sets:3, reps:"12-20", type:"small"},
      {name:"Extensión de tríceps con cuerda", sets:3, reps:"10-15", type:"small"},
      {name:"Extensión de tríceps por encima de la cabeza", sets:3, reps:"10-15", type:"small"}
    ]
  },
  2: {
    short:"Mar", title:"Glúteo",
    exercises:[
      {name:"Hip thrust con barra o máquina", sets:4, reps:"6-10", type:"big"},
      {name:"Peso muerto rumano", sets:3, reps:"8-10", type:"big"},
      {name:"Búlgaras con inclinación hacia adelante", sets:3, reps:"8-12", type:"big", note:"por pierna"},
      {name:"Patada de glúteo en polea", sets:3, reps:"10-15", type:"small"},
      {name:"Abducción de cadera en máquina", sets:3, reps:"15-25", type:"small"}
    ]
  },
  3: {
    short:"Mié", title:"Espalda + bíceps",
    exercises:[
      {name:"Jalón al pecho agarre neutro", sets:3, reps:"6-10", type:"big"},
      {name:"Remo apoyado en máquina", sets:3, reps:"8-12", type:"big"},
      {name:"Jalón unilateral en polea", sets:3, reps:"10-15", type:"small"},
      {name:"Remo sentado en polea", sets:2, reps:"10-15", type:"big"},
      {name:"Reverse pec-deck / pájaros", sets:3, reps:"12-20", type:"small"},
      {name:"Curl predicador", sets:3, reps:"8-12", type:"small"},
      {name:"Curl martillo", sets:2, reps:"10-15", type:"small"}
    ]
  },
  4: {
    short:"Jue", title:"Hombros + brazos",
    exercises:[
      {name:"Press de hombro en máquina", sets:3, reps:"6-10", type:"big"},
      {name:"Elevaciones laterales con mancuerna", sets:3, reps:"10-15", type:"small"},
      {name:"Elevaciones laterales en polea", sets:3, reps:"12-20", type:"small"},
      {name:"Curl de bíceps en polea", sets:3, reps:"10-15", type:"small"},
      {name:"Curl inclinado con mancuerna", sets:2, reps:"8-12", type:"small"},
      {name:"Extensión de tríceps en polea", sets:3, reps:"10-15", type:"small"},
      {name:"Extensión unilateral sobre la cabeza", sets:2, reps:"10-15", type:"small"}
    ]
  },
  5: {
    short:"Vie", title:"Pierna: cuádriceps + femoral + pantorrilla",
    exercises:[
      {name:"Hack squat", sets:3, reps:"6-10", type:"big"},
      {name:"Prensa", sets:3, reps:"10-15", type:"big"},
      {name:"Extensión de cuádriceps", sets:3, reps:"10-15", type:"small"},
      {name:"Curl femoral sentado", sets:3, reps:"8-12", type:"small"},
      {name:"Curl femoral acostado", sets:2, reps:"10-15", type:"small"},
      {name:"Aductores en máquina", sets:2, reps:"12-20", type:"small"},
      {name:"Elevación de pantorrilla", sets:4, reps:"8-15", type:"small"}
    ]
  }
};

const STORE = {
  sessions:"roberto_gym_sessions_v1",
  settings:"roberto_gym_settings_v1"
};

let selectedDay = (new Date().getDay() >= 1 && new Date().getDay() <= 5) ? new Date().getDay() : 1;
let timerInt = null, timerSeconds = 0, installPrompt = null;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function ymd(date=new Date()){
  const y=date.getFullYear(), m=String(date.getMonth()+1).padStart(2,"0"), d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function loadSessions(){ return JSON.parse(localStorage.getItem(STORE.sessions) || "{}"); }
function saveSessions(v){ localStorage.setItem(STORE.sessions, JSON.stringify(v)); }
function loadSettings(){
  return Object.assign({bigRest:150, smallRest:90}, JSON.parse(localStorage.getItem(STORE.settings)||"{}"));
}
function saveSettings(v){ localStorage.setItem(STORE.settings, JSON.stringify(v)); }

function sessionKey(day=selectedDay){ return `${ymd()}_d${day}`; }
function ensureSession(day=selectedDay){
  const all=loadSessions(), key=sessionKey(day);
  if(!all[key]){
    all[key]={date:ymd(), day, title:ROUTINE[day]?.title||"Descanso", completed:false, exercises:{}};
    saveSessions(all);
  }
  return all[key];
}
function updateSession(mutator){
  const all=loadSessions(), key=sessionKey();
  const session=all[key] || ensureSession();
  mutator(session);
  all[key]=session;
  saveSessions(all);
}

function lastCompletedForExercise(name, excludeKey=sessionKey()){
  const all=loadSessions();
  const rows=Object.entries(all)
    .filter(([k,s])=>k!==excludeKey && s.completed && s.exercises && s.exercises[name])
    .sort((a,b)=>b[1].date.localeCompare(a[1].date));
  if(!rows.length) return null;
  return rows[0][1].exercises[name];
}

function renderDayStrip(){
  const strip=$("#dayStrip"); strip.innerHTML="";
  [1,2,3,4,5].forEach(day=>{
    const b=document.createElement("button");
    b.className="day-chip"+(day===selectedDay?" active":"");
    b.textContent=ROUTINE[day].short;
    b.onclick=()=>{selectedDay=day; renderWorkout();};
    strip.appendChild(b);
  });
}

function renderWorkout(){
  renderDayStrip();
  const r=ROUTINE[selectedDay];
  $("#dayTitle").textContent=r.title;
  $("#daySubtitle").textContent="Registra peso, repeticiones y RIR de cada serie.";
  $("#sessionLabel").textContent=r.short;
  ensureSession();

  const container=$("#exerciseList"); container.innerHTML="";
  const current=loadSessions()[sessionKey()];

  r.exercises.forEach((ex,idx)=>{
    const saved=current.exercises[ex.name] || {done:false, sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))};
    if(!saved.sets || saved.sets.length!==ex.sets){
      saved.sets=Array.from({length:ex.sets},(_,i)=>saved.sets?.[i] || {kg:"",reps:"",rir:"",done:false});
    }
    const last=lastCompletedForExercise(ex.name);
    let lastText="Sin registro anterior";
    if(last?.sets?.length){
      const usable=last.sets.filter(s=>s.kg || s.reps);
      if(usable.length){
        lastText="Última: "+usable.map(s=>`${s.kg||"—"} kg × ${s.reps||"—"}`).join(" · ");
      }
    }

    const card=document.createElement("article");
    card.className="exercise-card";
    card.innerHTML=`
      <div class="exercise-head">
        <input class="exercise-check" type="checkbox" ${saved.done?"checked":""} data-ex="${idx}">
        <div class="exercise-title">
          <h3>${ex.name}</h3>
          <div class="exercise-meta">${ex.sets} series · ${ex.reps} reps${ex.note?` · ${ex.note}`:""}</div>
          <div class="last-session">${lastText}</div>
        </div>
      </div>
      <div class="labels"><span></span><span>KG</span><span>REPS</span><span>RIR</span><span>✓</span></div>
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
      <div class="exercise-actions">
        <button class="rest-btn" data-rest="${ex.type}" data-name="${ex.name}">⏱ Descanso</button>
      </div>`;
    container.appendChild(card);
  });

  bindWorkoutInputs();
  updateProgress();
}

function bindWorkoutInputs(){
  $$(".exercise-check").forEach(el=>{
    el.onchange=()=>{
      const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex];
      updateSession(s=>{
        s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))};
        s.exercises[ex.name].done=el.checked;
      });
      updateProgress();
    };
  });

  $$("[data-field]").forEach(el=>{
    el.oninput=()=>{
      const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex], set=+el.dataset.set, field=el.dataset.field;
      updateSession(s=>{
        s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))};
        s.exercises[ex.name].sets[set][field]=el.value;
      });
      updateProgress();
    };
  });

  $$(".set-done").forEach(el=>{
    el.onchange=()=>{
      const ex=ROUTINE[selectedDay].exercises[+el.dataset.ex], set=+el.dataset.set;
      updateSession(s=>{
        s.exercises[ex.name] ||= {done:false,sets:Array.from({length:ex.sets},()=>({kg:"",reps:"",rir:"",done:false}))};
        s.exercises[ex.name].sets[set].done=el.checked;
        if(el.checked){
          const allDone=s.exercises[ex.name].sets.every(x=>x.done);
          if(allDone) s.exercises[ex.name].done=true;
        }
      });
      renderWorkout();
    };
  });

  $$(".rest-btn").forEach(btn=>{
    btn.onclick=()=>{
      const st=loadSettings();
      const sec=btn.dataset.rest==="big" ? +st.bigRest : +st.smallRest;
      startTimer(sec,btn.dataset.name);
    };
  });
}

function updateProgress(){
  const session=loadSessions()[sessionKey()] || ensureSession();
  const r=ROUTINE[selectedDay];
  let exDone=0,setDone=0,totalSets=0;
  r.exercises.forEach(ex=>{
    const sx=session.exercises[ex.name];
    if(sx?.done) exDone++;
    totalSets += ex.sets;
    setDone += sx?.sets?.filter(s=>s.done).length || 0;
  });
  $("#sessionProgress").textContent=`${exDone}/${r.exercises.length}`;
  $("#seriesProgress").textContent=`${setDone}/${totalSets}`;
}

function finishWorkout(){
  updateSession(s=>{
    s.completed=true;
    s.finishedAt=new Date().toISOString();
  });
  alert("Entrenamiento guardado ✅");
  renderHistory();
}

function renderHistory(){
  const all=loadSessions();
  const list=$("#historyList");
  const entries=Object.values(all).filter(s=>s.completed).sort((a,b)=>(b.finishedAt||b.date).localeCompare(a.finishedAt||a.date));
  if(!entries.length){
    list.innerHTML=`<div class="history-card"><p class="muted">Todavía no tienes entrenamientos terminados.</p></div>`;
    return;
  }
  list.innerHTML=entries.map(s=>{
    const date=new Date(s.date+"T12:00:00").toLocaleDateString("es-MX",{weekday:"short",day:"numeric",month:"short"});
    const items=Object.entries(s.exercises||{}).filter(([_,v])=>v.done || v.sets?.some(x=>x.kg||x.reps)).map(([name,v])=>{
      const doneSets=(v.sets||[]).filter(x=>x.kg||x.reps);
      const txt=doneSets.map(x=>`${x.kg||"—"} kg × ${x.reps||"—"}${x.rir!==""?` · RIR ${x.rir}`:""}`).join(" / ");
      return `<div class="history-item"><strong>${name}</strong><span class="muted">${txt||"Completado"}</span></div>`;
    }).join("");
    return `<article class="history-card"><h3>${s.title}</h3><div class="muted">${date}</div><div class="history-exercises">${items}</div></article>`;
  }).join("");
}

function startTimer(sec,name){
  clearInterval(timerInt);
  timerSeconds=sec;
  $("#timerExercise").textContent=name;
  $("#timerOverlay").classList.remove("hidden");
  drawTimer();
  timerInt=setInterval(()=>{
    timerSeconds--;
    drawTimer();
    if(timerSeconds<=0){
      clearInterval(timerInt);
      if("vibrate" in navigator) navigator.vibrate([200,100,200]);
      setTimeout(()=>$("#timerOverlay").classList.add("hidden"),800);
    }
  },1000);
}
function drawTimer(){
  const m=Math.floor(Math.max(timerSeconds,0)/60), s=Math.max(timerSeconds,0)%60;
  $("#timerDisplay").textContent=`${m}:${String(s).padStart(2,"0")}`;
  document.title=timerSeconds>0?`${m}:${String(s).padStart(2,"0")} · Mi Rutina`:"Mi Rutina · Roberto";
}

function initSettings(){
  const st=loadSettings();
  $("#bigRest").value=String(st.bigRest);
  $("#smallRest").value=String(st.smallRest);
  ["bigRest","smallRest"].forEach(id=>{
    $("#"+id).onchange=()=>{
      const v=loadSettings(); v[id]=+$("#"+id).value; saveSettings(v);
    };
  });
}

$$(".nav-btn").forEach(btn=>{
  btn.onclick=()=>{
    $$(".nav-btn").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    $$(".view").forEach(v=>v.classList.remove("active"));
    $("#"+btn.dataset.view).classList.add("active");
    if(btn.dataset.view==="historyView") renderHistory();
  };
});

$("#finishBtn").onclick=finishWorkout;
$("#clearHistoryBtn").onclick=()=>{
  if(confirm("¿Seguro que quieres borrar todo tu historial?")){
    localStorage.removeItem(STORE.sessions);
    renderHistory(); renderWorkout();
  }
};

$("#minus15").onclick=()=>{timerSeconds=Math.max(0,timerSeconds-15);drawTimer()};
$("#plus15").onclick=()=>{timerSeconds+=15;drawTimer()};
$("#stopTimer").onclick=()=>{clearInterval(timerInt);$("#timerOverlay").classList.add("hidden");document.title="Mi Rutina · Roberto"};

window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); installPrompt=e; $("#installBtn").classList.remove("hidden");
});
$("#installBtn").onclick=async()=>{
  if(installPrompt){ installPrompt.prompt(); await installPrompt.userChoice; installPrompt=null; $("#installBtn").classList.add("hidden"); }
};

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}

initSettings();
renderWorkout();
