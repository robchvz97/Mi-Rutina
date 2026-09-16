const CACHE='mi-rutina-roberto-v4';
const ASSETS=["./", "./index.html", "./styles.css?v=4", "./app.js?v=4", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./abduction_final.png", "./abduction_inicio.png", "./adductor_final.png", "./adductor_inicio.png", "./bulgarian_final.png", "./bulgarian_inicio.png", "./cable_curl_final.png", "./cable_curl_inicio.png", "./cable_fly_final.png", "./cable_fly_inicio.png", "./calf_raise_final.png", "./calf_raise_inicio.png", "./flat_press_final.png", "./flat_press_inicio.png", "./glute_kickback_final.png", "./glute_kickback_inicio.png", "./hack_squat_final.png", "./hack_squat_inicio.png", "./hammer_curl_final.png", "./hammer_curl_inicio.png", "./hip_thrust_final.png", "./hip_thrust_inicio.png", "./incline_curl_final.png", "./incline_curl_inicio.png", "./incline_press_final.png", "./incline_press_inicio.png", "./lat_pulldown_final.png", "./lat_pulldown_inicio.png", "./lateral_cable_final.png", "./lateral_cable_inicio.png", "./lateral_db_final.png", "./lateral_db_inicio.png", "./leg_curl_lying_final.png", "./leg_curl_lying_inicio.png", "./leg_curl_seated_final.png", "./leg_curl_seated_inicio.png", "./leg_extension_final.png", "./leg_extension_inicio.png", "./leg_press_final.png", "./leg_press_inicio.png", "./machine_row_final.png", "./machine_row_inicio.png", "./preacher_curl_final.png", "./preacher_curl_inicio.png", "./pulldown_unilateral_final.png", "./pulldown_unilateral_inicio.png", "./rdl_final.png", "./rdl_inicio.png", "./reverse_pecdeck_final.png", "./reverse_pecdeck_inicio.png", "./seated_row_final.png", "./seated_row_inicio.png", "./shoulder_press_final.png", "./shoulder_press_inicio.png", "./triceps_overhead_final.png", "./triceps_overhead_inicio.png", "./triceps_overhead_unilateral_final.png", "./triceps_overhead_unilateral_inicio.png", "./triceps_pushdown_final.png", "./triceps_pushdown_inicio.png"];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith((async()=>{
    try {
      const response=await fetch(event.request, {cache:'no-store'});
      if(response && response.ok) {
        const cache=await caches.open(CACHE);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch(err) {
      const cached=await caches.match(event.request, {cacheName:CACHE});
      if(cached) return cached;
      if(event.request.mode==='navigate') return (await caches.match('./index.html', {cacheName:CACHE}));
      throw err;
    }
  })());
});
