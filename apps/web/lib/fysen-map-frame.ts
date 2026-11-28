// The map runtime lives inside an opaque-origin sandbox. It receives only
// public catalog points, never account information or user coordinates.
export const fysenMapFrame = `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.css">
<style>html,body,#map{height:100%;width:100%;margin:0;background:#f8f4f0}#status{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;font:16px system-ui;color:#24352c;pointer-events:none}#status[hidden]{display:none}.fysen-logo-pin{display:block;width:38px;height:25px;padding:2px;border:1px solid #38513a;border-radius:5px;background:#f5f4ed;cursor:pointer}.fysen-logo-pin img{width:100%;height:100%;object-fit:contain}.fysen-logo-pin[hidden]{display:none}</style>
</head><body><div id="map" aria-label="Restaurantkart over Oslo"></div><div id="status" role="status">Laster kart…</div>
<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.js"></script>
<script>
(function(){
  const status = document.getElementById("status");
  let map, data, ready = false, logos = [];
  const logoMarkers = new Map();
  const send = (type, extra = {}) => parent.postMessage({type, ...extra}, "*");
  const fail = () => { status.hidden = false; status.textContent = "Kartet er ikke tilgjengelig. Bruk restaurantlisten."; send("fysen-map-error"); };
  const syncLogos = () => {
    if (!ready || !map) return;
    const visible = new Map(), occupied = new Set();
    if (map.getZoom() >= 15.5) {
      const bounds = map.getBounds();
      for (const logo of logos) {
        if (!bounds.contains(logo.coordinates)) continue;
        const pixel = map.project(logo.coordinates);
        const cell = Math.floor(pixel.x / 55) + ":" + Math.floor(pixel.y / 44);
        if (occupied.has(cell)) continue;
        occupied.add(cell);
        visible.set(logo.slug, logo);
        if (visible.size >= 50) break;
      }
    }
    for (const [slug, marker] of logoMarkers) {
      if (!visible.has(slug)) { marker.remove(); logoMarkers.delete(slug); }
    }
    for (const [slug, logo] of visible) {
      if (logoMarkers.has(slug)) continue;
      const button = document.createElement("button");
      button.type = "button"; button.className = "fysen-logo-pin";
      button.setAttribute("aria-label", logo.name); button.hidden = true;
      const image = document.createElement("img");
      image.alt = ""; image.referrerPolicy = "no-referrer";
      image.onload = () => { button.hidden = false; };
      image.onerror = () => { button.hidden = true; };
      button.append(image);
      button.addEventListener("click", event => { event.stopPropagation(); send("fysen-map-select", {slug}); });
      image.src = logo.url;
      const marker = new maplibregl.Marker({element:button, anchor:"bottom", offset:[0,-7]}).setLngLat(logo.coordinates).addTo(map);
      logoMarkers.set(slug, marker);
    }
  };
  const update = () => { if(ready && data) { map.getSource("fysen").setData(data); syncLogos(); } };
  window.addEventListener("message", (event) => {
    if(event.source !== parent || !event.data || typeof event.data !== "object") return;
    const message = event.data;
    if(message.type === "fysen-map-resize") { if(map) requestAnimationFrame(() => map.resize()); return; }
    if(message.type === "fysen-map-focus" && ready && Array.isArray(message.coordinates)) {
      map.easeTo({center: message.coordinates, zoom: Math.max(map.getZoom(), 16)});
      return;
    }
    if(message.type !== "fysen-map-data" || !message.features) return;
    data = message.features;
    logos = Array.isArray(message.logos) ? message.logos : [];
    if(map) { update(); return; }
    if(!window.maplibregl || !message.style) { fail(); return; }
    try {
      const font = message.style.layers.map(layer => layer.layout && layer.layout["text-font"]).find(stack => Array.isArray(stack) && stack.length > 0 && stack.every(name => typeof name === "string") && stack.some(name => /Regular/.test(name))) || ["Noto Sans Regular"];
      map = new maplibregl.Map({container:"map",style:message.style,center:[10.752,59.921],zoom:13.1,minZoom:9,maxZoom:19,renderWorldCopies:false,dragRotate:false,pitchWithRotate:false,attributionControl:{compact:true}});
      map.addControl(new maplibregl.NavigationControl({showCompass:false}),"top-right");
      map.on("load", () => {
        try {
          map.addSource("fysen",{type:"geojson",data,cluster:false});
          map.addLayer({id:"fysen-points",type:"circle",source:"fysen",paint:{"circle-color":"#28734b","circle-radius":["interpolate",["linear"],["zoom"],9,2,12,3.5,17,6],"circle-stroke-width":1.2,"circle-stroke-color":"#ffffff"}});
          map.addLayer({id:"fysen-names",type:"symbol",source:"fysen",minzoom:15.5,layout:{"text-field":["get","name"],"text-size":12,"text-font":font,"text-anchor":"top","text-offset":[0,0.9],"text-max-width":11,"text-optional":true,"text-allow-overlap":false},paint:{"text-color":"#24352c","text-halo-color":"#ffffff","text-halo-width":1.5}});
          for(const id of ["fysen-points","fysen-names"]) {
            map.on("click",id,e=>{const f=e.features&&e.features[0];if(f&&f.properties)send("fysen-map-select",{slug:f.properties.slug});});
            map.on("mouseenter",id,()=>map.getCanvas().style.cursor="pointer");
            map.on("mouseleave",id,()=>map.getCanvas().style.cursor="");
          }
          map.on("moveend",syncLogos);
          ready=true;status.hidden=true;update();send("fysen-map-loaded");
        } catch { fail(); }
      });
      map.on("error",()=>{ /* Individual tile errors must not cancel a still-loading map. */ });
      setTimeout(() => { if (!ready) fail(); }, 18000);
    } catch { fail(); }
  });
  send("fysen-map-ready");
  // Parent may not have installed its listener at the first handshake. Retry until data arrives.
  const handshake = setInterval(() => { if (data) clearInterval(handshake); else send("fysen-map-ready"); }, 500);
})();
</script></body></html>`;
