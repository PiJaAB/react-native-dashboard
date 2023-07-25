"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var classnames_1 = __importDefault(require("classnames"));
var react_1 = require("react");
var hooks_1 = require("../hooks");
function update(_a) {
    var containerEl = _a.containerEl, fakeContainerEl = _a.fakeContainerEl, setWidth = _a.setWidth, setHide = _a.setHide;
    var vh = window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight);
    if (!vh)
        return;
    var rect = containerEl.getClientRects()[0];
    if (!rect)
        return;
    setWidth("".concat(containerEl.scrollWidth, "px"));
    if (rect.bottom > vh) {
        setHide(false);
        var style = fakeContainerEl.style;
        style.bottom = "".concat(rect.bottom - vh, "px");
    }
    else {
        setHide(true);
    }
}
function FixedScrollbar(_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    var containerRef = (0, react_1.useRef)(null);
    var fakeContainerRef = (0, react_1.useRef)(null);
    var _b = __read((0, react_1.useState)(false), 2), hide = _b[0], setHide = _b[1];
    var _c = __read((0, react_1.useState)('0px'), 2), width = _c[0], setWidth = _c[1];
    (0, react_1.useEffect)(function () {
        var containerEl = containerRef.current;
        var fakeContainerEl = fakeContainerRef.current;
        if (!containerEl || !fakeContainerEl)
            return undefined;
        var onscroll = function () {
            return update({
                containerEl: containerEl,
                fakeContainerEl: fakeContainerEl,
                setHide: setHide,
                setWidth: setWidth,
            });
        };
        onscroll();
        window.addEventListener('scroll', onscroll);
        window.addEventListener('resize', onscroll);
        return function () {
            window.removeEventListener('scroll', onscroll);
            window.removeEventListener('resize', onscroll);
        };
    }, [containerRef, fakeContainerRef]);
    var mutationCallback = (0, react_1.useCallback)(function () {
        var containerEl = containerRef.current;
        var fakeContainerEl = fakeContainerRef.current;
        if (!containerEl || !fakeContainerEl)
            return;
        update({
            containerEl: containerEl,
            fakeContainerEl: fakeContainerEl,
            setHide: setHide,
            setWidth: setWidth,
        });
    }, [setHide, setWidth]);
    (0, hooks_1.useMutationObserver)(typeof document !== 'undefined' ? document.documentElement : undefined, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
    }, mutationCallback);
    var handleScroll = function (ev) {
        var fakeContainerEl = fakeContainerRef.current;
        if (!fakeContainerEl)
            return;
        fakeContainerEl.scrollLeft = ev.currentTarget.scrollLeft;
    };
    var handleFakeScroll = function (ev) {
        var containerEl = containerRef.current;
        if (!containerEl)
            return;
        containerEl.scrollLeft = ev.currentTarget.scrollLeft;
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({}, props, { className: (0, classnames_1.default)('relative overflow-x-hidden', className) }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ onScroll: handleScroll, ref: containerRef, className: "overflow-x-auto" }, { children: children })), (0, jsx_runtime_1.jsx)("div", __assign({ onScroll: handleFakeScroll, ref: fakeContainerRef, style: { visibility: hide ? 'hidden' : 'visible' }, className: "overflow-x-auto absolute w-full bottom-0" }, { children: (0, jsx_runtime_1.jsx)("div", { style: { width: width } }) }))] })));
}
exports.default = FixedScrollbar;
