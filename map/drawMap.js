let map = L.map("map", { attributionControl: false });
map.setView([20, 0], 3);
map.setMaxBounds([
  [-90, -180],
  [90, 180],
]);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

let info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = props ? "<b>" + props.name : null;
};

info.addTo(map);

function style(feature) {
  if (COUNTRIES.includes(feature.properties.adm0_a3)) {
    return {
      weight: 1,
      opacity: 1,
      color: "green",
      dashArray: "",
      fillOpacity: 0.3,
      fillColor: "green",
    };
  } else {
    return {
      weight: 0,
      color: "white",
    };
  }
}

function highlightFeature(e) {
  let layer = e.target;

  if (COUNTRIES.includes(layer.feature.properties.adm0_a3)) {
    layer.setStyle({
      weight: 3,
      color: "green",
      dashArray: "",
      fillOpacity: 0.3,
    });
  } else {
    layer.setStyle({
      weight: 3,
      color: "blue",
      dashArray: "",
      fillOpacity: 0.3,
    });
  }

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

let geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function selectNation(e) {
  let layer = e.target;

  layer.setStyle({
    weight: 3,
    color: "blue",
    dashArray: "",
    fillOpacity: 0.3,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
  let countryCode = layer.feature.properties.adm0_a3;
  if (COUNTRIES.includes(countryCode)) {
    let index = COUNTRIES.indexOf(countryCode);
    if (index > -1) {
      COUNTRIES.splice(index, 1);
    }
  } else {
    COUNTRIES.push(countryCode);
  }
  setCircle();
}

function setCircle() {
  circleProgressWorld.value = Object.keys(COUNTRIES).length;
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: selectNation,
  });
}

geojson = L.geoJson(countriesData, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);
