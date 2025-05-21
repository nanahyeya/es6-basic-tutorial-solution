/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./js/ratefinder.js ***!
  \**************************/
var url = "rates.json";
fetch(url) // Promise
.then(function (response) {
  return response.json();
}).then(function (rates) {
  var html = '';
  rates.forEach(function (rate) {
    return html += "<tr><td>".concat(rate.name, "</td><td>").concat(rate.years, "</td><td>").concat(rate.rate, "%</td></tr>");
  });
  document.getElementById("rates").innerHTML = html;
})["catch"](function (e) {
  return console.log(e);
});
/******/ })()
;
//# sourceMappingURL=ratefinder.bundle.js.map