/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./css/styles.css":
/*!************************!*\
  !*** ./css/styles.css ***!
  \************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:5)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> body {\n|     font-family: 'Roboto', 'Sans Serif';\n|     font-size: 16px;");

/***/ }),

/***/ "./js/mortgageClass.js":
/*!*****************************!*\
  !*** ./js/mortgageClass.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mortgage)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Mortgage = /*#__PURE__*/function () {
  //생성자
  function Mortgage(principal, years, rate) {
    _classCallCheck(this, Mortgage);
    this.principal = principal;
    this.years = years;
    this.rate = rate;
  }

  //getter 함수
  return _createClass(Mortgage, [{
    key: "monthlyPayment",
    get: function get() {
      var monthlyRate = this.rate / 100 / 12;
      return this.principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), this.years * 12));
    }

    //getter 함수
  }, {
    key: "amortization",
    get: function get() {
      var monthlyPayment = this.monthlyPayment;
      var monthlyRate = this.rate / 100 / 12;
      var balance = this.principal;
      var amortization = [];
      for (var y = 0; y < this.years; y++) {
        var interestY = 0;
        var principalY = 0;
        for (var m = 0; m < 12; m++) {
          var interestM = balance * monthlyRate;
          var principalM = monthlyPayment - interestM;
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
      return amortization;
    }
  }]);
}(); //class


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mortgageClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mortgageClass */ "./js/mortgageClass.js");
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/styles.css */ "./css/styles.css");
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_styles_css__WEBPACK_IMPORTED_MODULE_1__);
//1) * 를 사용하여 모든 함수를 import
//import * as mortgage from './mortgage'; 

//2) calculateAmortization 함수만 import
//import { calculateAmortization } from "./mortgage";

//3) calculateAmortization 함수를 as 키워드로 변경하여 import
//import { calculateAmortization as calcAmortization } from "./mortgage";

//Default export 일 경우 as 키워드 없이 함수명을 변경하여 import 가능함
//import calcAmortization from "./mortgage";

//Mortgage 클래스 import 하기


//css file을 import 하기

document.getElementById('calcBtn').addEventListener('click', function () {
  var principal = document.getElementById("principal").value;
  var years = document.getElementById("years").value;
  var rate = document.getElementById("rate").value;

  // let monthlyPayment = calculateMonthlyPayment(principal, years, rate);
  //let { monthlyPayment, monthlyRate } = calculateMonthlyPayment(principal, years, rate);
  // 1)
  //let { monthlyPayment, monthlyRate, amortization } = mortgage.calculateAmortization(principal, years, rate);

  // 2)
  //let { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);

  // 3)
  //let { monthlyPayment, monthlyRate, amortization } = calcAmortization(principal, years, rate);

  //객체생성
  var mortgage = new _mortgageClass__WEBPACK_IMPORTED_MODULE_0__["default"](principal, years, rate);
  //클래스로 부터 Destructuring Assignment 하기
  var monthlyPayment = mortgage.monthlyPayment,
    amortization = mortgage.amortization;
  document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
  document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
  var html = "";
  mortgage.amortization.forEach(function (year, index) {
    return html += "\n       <tr>\n           <td>".concat(index + 1, "</td>\n           <td class=\"currency\">").concat(Math.round(year.principalY), "</td>\n           <td class=\"stretch\">\n               <div class=\"flex\">\n                   <div class=\"bar principal\"\n                        style=\"flex:").concat(year.principalY, ";-webkit-flex:").concat(year.principalY, "\">\n                   </div>\n                   <div class=\"bar interest\"\n                        style=\"flex:").concat(year.interestY, ";-webkit-flex:").concat(year.interestY, "\">\n                   </div>\n               </div>\n           </td>\n           <td class=\"currency left\">").concat(Math.round(year.interestY), "</td>\n           <td class=\"currency\">").concat(Math.round(year.balance), "</td>\n       </tr>\n   ");
  });
  document.getElementById("amortization").innerHTML = html;
}); // calcBtn click 핸들러 함수
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map