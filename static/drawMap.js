let map = L.map("map", { attributionControl: true });
map.setView([20, 0], 3);
map.setMaxBounds([
  [-90, -180],
  [90, 180],
]);
map.attributionControl.setPrefix("");

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: "©OpenStreetMap, ©CartoDB",
    maxZoom: 18,
    minZoom: 2,
  }
).addTo(map);

let info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  let infoItem = document.getElementsByClassName("info");
  if (infoItem.length !== 0) {
    infoItem[0].style.display = "block";
  }
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
  let infoItem = document.getElementsByClassName("info");
  if (infoItem.length !== 0) {
    infoItem[0].style.display = "none";
  }
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

function selectNation(e) {
  if (!EDITABLE) {
    return;
  }

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
  resetHighlight(e);
  setCircle();
  circleProgressEurope.value = visitedOf("Europe");
  circleProgressAsia.value = visitedOf("Asia");
  circleProgressNorthAmerica.value = visitedOf("North America");
  circleProgressSouthAmerica.value = visitedOf("South America");
  circleProgressAfrica.value = visitedOf("Africa");
  circleProgressOceania.value = visitedOf("Oceania");

  const options = {
    method: "POST",
    body: JSON.stringify(COUNTRIES),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-CSRFToken": csrftoken,
    },
  };
  fetch("/save/", options);
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
