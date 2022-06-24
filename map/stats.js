function beenToFunc() {
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
}

const no_countries = Object.keys(countryList).length;
const visited = Object.keys(COUNTRIES).length;

const circleProgressWorld = new CircleProgress(".world", {
  max: no_countries,
  value: visited,
  //textFormat: circleFormat,
});

/*const circleProgressEurope = new CircleProgress(".world", {
    max: no_countries,
    value: visited,
    //textFormat: circleFormat,
  });*/

/*function circleFormat(completed, max) {
  let percentage = (max / completed).toFixed(2);
  let text = completed + " / " + max;
  return text;
}*/

//document.getElementById("beenTo").innerText += "Been to: \n" + beenToFunc();

//document.getElementById("left").innerText += "Countries left: \n" + toGoFunc();
