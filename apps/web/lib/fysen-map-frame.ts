// The map runtime lives inside an opaque-origin sandbox. It receives only
// public catalog points, never account information or user coordinates.
export const fysenMapFrame = `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.css">
<style>html,body,#map{height:100%;width:100%;margin:0;background:#171c19}#status{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;font:16px system-ui;color:#e8eee6;pointer-events:none}#status[hidden]{display:none}</style>
</head><body><div id="map" aria-label="Restaurantkart over Oslo"></div><div id="status" role="status">Laster kart…</div>
<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.js"></script>
<script>
(function(){
  const status = document.getElementById("status");
  let map, data, ready = false;
  const send = (type, extra = {}) => parent.postMessage({type, ...extra}, "*");
  const fail = () => { status.hidden = false; status.textContent = "Kartet er ikke tilgjengelig. Bruk restaurantlisten."; send("fysen-map-error"); };
  const update = () => { if(ready && data) map.getSource("fysen").setData(data); };
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
    if(map) { update(); return; }
    if(!window.maplibregl || !message.style) { fail(); return; }
    try {
      const font = message.style.layers.map(layer => layer.layout && layer.layout["text-font"]).find(stack => Array.isArray(stack) && stack.length > 0 && stack.every(name => typeof name === "string") && stack.some(name => /Regular/.test(name))) || ["Noto Sans Regular"];
      map = new maplibregl.Map({container:"map",style:message.style,center:[10.752,59.921],zoom:11.5,minZoom:9,maxZoom:19,renderWorldCopies:false,dragRotate:false,pitchWithRotate:false,attributionControl:{compact:true}});
      map.addControl(new maplibregl.NavigationControl({showCompass:false}),"top-right");
      map.on("load", () => {
        try {
          map.addSource("fysen",{type:"geojson",data,cluster:true,clusterMaxZoom:14,clusterRadius:42});
          map.addLayer({id:"fysen-clusters",type:"circle",source:"fysen",filter:["has","point_count"],paint:{"circle-color":"#b9df9a","circle-radius":["step",["get","point_count"],16,20,21,100,27],"circle-stroke-width":2,"circle-stroke-color":"#1c3021"}});
          map.addLayer({id:"fysen-count",type:"symbol",source:"fysen",filter:["has","point_count"],layout:{"text-field":["get","point_count_abbreviated"],"text-size":12,"text-font":font},paint:{"text-color":"#101810"}});
          map.addLayer({id:"fysen-points",type:"circle",source:"fysen",filter:["!",["has","point_count"]],paint:{"circle-color":"#b9df9a","circle-radius":["interpolate",["linear"],["zoom"],12,5,17,8],"circle-stroke-width":1.5,"circle-stroke-color":"#1c3021"}});
          map.addLayer({id:"fysen-names",type:"symbol",source:"fysen",minzoom:15.5,filter:["!",["has","point_count"]],layout:{"text-field":["get","name"],"text-size":12,"text-font":font,"text-anchor":"top","text-offset":[0,0.9],"text-max-width":11,"text-optional":true,"text-allow-overlap":false},paint:{"text-color":"#e8eee6","text-halo-color":"#171c19","text-halo-width":1.5}});
          for(const id of ["fysen-points","fysen-names"]) map.on("click",id,e=>{const f=e.features&&e.features[0];if(f&&f.properties)send("fysen-map-select",{slug:f.properties.slug});});
          map.on("click","fysen-clusters",async e=>{const f=e.features&&e.features[0];if(!f)return;try{const zoom=await map.getSource("fysen").getClusterExpansionZoom(f.properties.cluster_id);map.easeTo({center:f.geometry.coordinates,zoom});}catch{map.zoomIn();}});
          for(const id of ["fysen-points","fysen-clusters","fysen-names"]){map.on("mouseenter",id,()=>map.getCanvas().style.cursor="pointer");map.on("mouseleave",id,()=>map.getCanvas().style.cursor="");}
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
