/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/gradient/gradient.script.ts

/* harmony default export */ const gradient_script = (function () {
    var root = document.getElementById("gradient");
    var colorValues = [
        "19, 178, 211",
        "212, 195, 42",
        "124, 83, 159",
        "239, 222, 218",
        "229, 163, 173",
        "137, 212, 42",
    ];
    var rootStyles = colorValues
        .map(function (value, index) {
        return "--color".concat(index + 1, ": ").concat(value, ";");
    })
        .join("");
    root.setAttribute("style", rootStyles);
    var paletteItemsCount = Math.floor(colorValues.length * 1.3);
    var paletteEl = root.querySelector("#palette");
    var rotationStep = 360 / paletteItemsCount;
    var _reverseFactor = Math.floor(paletteItemsCount / 4);
    var durations = [4, 6, 8, 9, 10, 12];
    new Array(paletteItemsCount).fill(null).forEach(function (_, index) {
        var _el = document.createElement("div");
        _el.classList.add("palette-color");
        var elNum = index + 1;
        var colorNum = elNum % colorValues.length;
        var angle = (rotationStep * index) % 360;
        var _operation = index % _reverseFactor === 0 ? "-" : "+";
        var _durationIndex = Math.floor(Math.random() * durations.length);
        var _duration = durations[_durationIndex];
        var _style = "\n    --color: var(--color".concat(colorNum, ");\n    --start-angle: ").concat(angle, "deg;\n    --end-angle: calc(var(--start-angle) ").concat(_operation, " 360deg);\n    --duration: ").concat(_duration, "s;\n    --delay: 0s;");
        _el.setAttribute("style", _style);
        paletteEl.append(_el);
    });
});

;// CONCATENATED MODULE: ./src/scroll-text/scroll-text.script.ts

/* harmony default export */ const scroll_text_script = (function () {
    var rootEl = document.getElementById("root");
    var id = "scroll-text-section";
    var sectionEl = document.createElement("section");
    sectionEl.setAttribute("id", id);
    var textElList = [
        "scroll down",
        "to see text",
        "changes it's size",
        "according to scroll position",
    ].map(function (text) {
        var textEl = document.createElement("p");
        textEl.classList.add("scroll-text");
        textEl.setAttribute("data-text", text);
        sectionEl.append(textEl);
        return textEl;
    });
    var screenHeight = screen.availHeight;
    var screenYCenter = screenHeight / 2;
    var handleUpdateTextElement = function (el) {
        var rect = el.getBoundingClientRect();
        var tillCenter = (rect.top % screenHeight) - screenYCenter;
        var deltaY = Math.abs(tillCenter);
        var scale = tillCenter > screenYCenter ? 0 : Math.abs(1 - deltaY / screenYCenter);
        var opacity = scale % 1;
        el.setAttribute('style', "--scale: ".concat(scale, "; --opacity: ").concat(opacity, ";"));
    };
    document.addEventListener('scroll', function (e) {
        textElList.forEach(handleUpdateTextElement);
    });
    rootEl.append(sectionEl);
    textElList.forEach(handleUpdateTextElement);
});

;// CONCATENATED MODULE: ./src/parallax/parallax-image.webp
/* harmony default export */ const parallax_image = ("img/parallax-image.webp");
;// CONCATENATED MODULE: ./src/parallax/parallax.script.ts


/* harmony default export */ const parallax_script = (function () {
    var rootEl = document.getElementById("root");
    var id = "parallax-section";
    var sectionEl = document.createElement("section");
    sectionEl.setAttribute("id", id);
    var imageEl = document.createElement("div");
    imageEl.classList.add("parallax-image");
    imageEl.style.backgroundImage = "url(".concat(parallax_image, ")");
    sectionEl.append(imageEl);
    var cloudCoverEl = document.createElement("div");
    cloudCoverEl.classList.add("parallax-cloud-cover");
    var clouds = [];
    for (var i = 0; i < 3; i++) {
        var cloudEl = document.createElement("div");
        cloudEl.classList.add("parallax-cloud");
        cloudCoverEl.append(cloudEl);
        clouds.push(cloudEl);
    }
    var screenHeight = screen.availHeight;
    var screenYCenter = screenHeight / 2;
    var factors = [0.8, 0.4, 0.6];
    var handleScroll = function (elements) {
        var _a;
        var scrollTop = ((_a = document.scrollingElement) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0;
        var rect = cloudCoverEl.getBoundingClientRect();
        var topPos = rect.top;
        var tillCenter = topPos;
        // console.log({ rect, topPos, scrollTop, screenYCenter, tillCenter });
        elements.forEach(function (el, index) {
            var factor = factors[index % factors.length];
            var offset = topPos * -factor;
            el.setAttribute("style", "--offset: ".concat(offset, "px;"));
        });
    };
    document.addEventListener("scroll", function (e) {
        handleScroll(clouds);
    });
    sectionEl.append(cloudCoverEl);
    rootEl.append(sectionEl);
});

;// CONCATENATED MODULE: ./src/index.ts




gradient_script();
scroll_text_script();
parallax_script();

/******/ })()
;
//# sourceMappingURL=main.6c1aa4a8fc87aaf08c9f.js.map