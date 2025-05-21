/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/mortgage.js":
/*!************************!*\
  !*** ./js/mortgage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateAmortization: () => (/* binding */ calculateAmortization),
/* harmony export */   calculateMonthlyPayment: () => (/* binding */ calculateMonthlyPayment)
/* harmony export */ });
// named export

var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
  var monthlyRate = 0;
  if (rate) {
    monthlyRate = rate / 100 / 12;
  }
  var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
  return {
    principal: principal,
    years: years,
    rate: rate,
    monthlyPayment: monthlyPayment,
    monthlyRate: monthlyRate
  };
};

// named export
var calculateAmortization = function calculateAmortization(principal, years, rate) {
  var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
    monthlyRate = _calculateMonthlyPaym.monthlyRate,
    monthlyPayment = _calculateMonthlyPaym.monthlyPayment;
  var balance = principal;
  var amortization = [];
  for (var y = 0; y < years; y++) {
    var interestY = 0; //Interest payment for year y
    var principalY = 0; //Principal payment for year y
    for (var m = 0; m < 12; m++) {
      var interestM = balance * monthlyRate; //Interest payment for month m
      var principalM = monthlyPayment - interestM; //Principal payment for month m
      interestY = interestY + interestM;
      principalY = principalY + principalM;
      balance = balance - principalM;
    }
    amortization.push({
      principalY: principalY,
      interestY: interestY,
      balance: balance
    });
  }
  return {
    monthlyPayment: monthlyPayment,
    monthlyRate: monthlyRate,
    amortization: amortization
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mortgage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mortgage */ "./js/mortgage.js");

document.getElementById('calcBtn').addEventListener('click', function () {
  var principal = document.getElementById("principal").value;
  var years = document.getElementById("years").value;
  var rate = document.getElementById("rate").value;

  // var monthlyPayment = calculateMonthlyPayment(principal, years, rate);
  var _mortgage$calculateAm = _mortgage__WEBPACK_IMPORTED_MODULE_0__.calculateAmortization(principal, years, rate),
    monthlyPayment = _mortgage$calculateAm.monthlyPayment,
    monthlyRate = _mortgage$calculateAm.monthlyRate,
    amortization = _mortgage$calculateAm.amortization;
  document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
  document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
  amortization.forEach(function (month) {
    return console.log(month);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map