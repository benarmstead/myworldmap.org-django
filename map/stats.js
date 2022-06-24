/* function beenToFunc() {
  let countries = "";
  Object.keys(COUNTRIES).forEach((key) => {
    countries += countryList[key] + "\n";
  });
  return countries;
}

function toGoFunc() {
  let beenTo = beenToFunc();
  let toGo = "";
  Object.keys(countryList).forEach((item) => {
    if (!COUNTRIES[item]) {
      toGo += countryList[item] + "\n";
    }
  });
  return toGo;
} */

const no_countries = Object.keys(countryList).length;
let visited = Object.keys(COUNTRIES).length;

/*Object.keys(COUNTRIES).foreach((visitedNation) => {
  data.foreach((testNation) => {
    if (visitedNation === testNation.adm0_a3) {
      console.log("here");
    }
  });
  console.log(visitedNation);
});*/

function visitedOf(continent) {
  let counter = 0;

  let data = countriesData.features;
  COUNTRIES.forEach((visitedNation) => {
    data.forEach((testNation) => {
      if (
        visitedNation === testNation.properties.adm0_a3 &&
        testNation.properties.continent === continent
      ) {
        counter += 1;
      }
    });
  });
  return counter;
}

function continentTotal(continent) {
  let counter = 0;
  countriesData.features.forEach((testNation) => {
    if (testNation.properties.continent === continent) {
      counter += 1;
    }
  });
  return counter;
}

const circleProgressWorld = new CircleProgress(".world", {
  max: no_countries,
  value: visited,
  textFormat: circleFormat,
});

const circleProgressEurope = new CircleProgress(".europe", {
  max: continentTotal("Europe"),
  value: visitedOf("Europe"),
  textFormat: circleFormat,
});

const circleProgressAsia = new CircleProgress(".asia", {
  max: continentTotal("Asia"),
  value: visitedOf("Asia"),
  textFormat: circleFormat,
});

const circleProgressNorthAmerica = new CircleProgress(".northAmerica", {
  max: continentTotal("North America"),
  value: visitedOf("North America"),
  textFormat: circleFormat,
});

const circleProgressSouthAmerica = new CircleProgress(".southAmerica", {
  max: continentTotal("South America"),
  value: visitedOf("South America"),
  textFormat: circleFormat,
});

const circleProgressAfrica = new CircleProgress(".africa", {
  max: continentTotal("Africa"),
  value: visitedOf("Africa"),
  textFormat: circleFormat,
});

const circleProgressOceania = new CircleProgress(".oceania", {
  max: continentTotal("Oceania"),
  value: visitedOf("Oceania"),
  textFormat: circleFormat,
});

function circleFormat(completed, max) {
  let percentage = (max / completed).toFixed(2);
  let text = completed + " / " + max;
  return text;
}
