(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/components/CountdownTimer.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CountdownTimer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function CountdownTimer(param) {
    let { endTime, onEnd, isCard = false } = param;
    _s();
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const hasEndedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const calculateTimeLeft = ()=>{
        const difference = +new Date(endTime) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(difference / (1000 * 60 * 60) % 24),
                minutes: Math.floor(difference / 1000 / 60 % 60),
                seconds: Math.floor(difference / 1000 % 60)
            };
        }
        return timeLeft;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountdownTimer.useEffect": ()=>{
            setTimeLeft(calculateTimeLeft());
        }
    }["CountdownTimer.useEffect"], [
        endTime
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountdownTimer.useEffect": ()=>{
            const timer = setTimeout({
                "CountdownTimer.useEffect.timer": ()=>{
                    const newTimeLeft = calculateTimeLeft();
                    setTimeLeft(newTimeLeft);
                    // Only call onEnd once when auction ends
                    if (Object.keys(newTimeLeft).length === 0 && !hasEndedRef.current && onEnd) {
                        hasEndedRef.current = true;
                        onEnd();
                    }
                }
            }["CountdownTimer.useEffect.timer"], 1000);
            return ({
                "CountdownTimer.useEffect": ()=>clearTimeout(timer)
            })["CountdownTimer.useEffect"];
        }
    }["CountdownTimer.useEffect"], [
        timeLeft,
        onEnd,
        endTime
    ]);
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval)=>{
        if (!timeLeft[interval] && interval !== 'seconds' && interval !== 'minutes') {
            return;
        }
        timerComponents.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                String(timeLeft[interval]).padStart(2, '0'),
                interval.charAt(0)
            ]
        }, interval, true, {
            fileName: "[project]/src/app/components/CountdownTimer.js",
            lineNumber: 49,
            columnNumber: 7
        }, this));
    });
    const timeString = "".concat(String(timeLeft.hours || 0).padStart(2, '0'), ":").concat(String(timeLeft.minutes || 0).padStart(2, '0'), ":").concat(String(timeLeft.seconds || 0).padStart(2, '0'));
    if (isCard) {
        const isUrgent = timeLeft.hours === 0 && timeLeft.minutes < 30;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-bold ".concat(isUrgent ? 'text-red-600' : 'text-gray-800'),
            children: [
                timeLeft.days > 0 ? "".concat(timeLeft.days, "d ") : '',
                timeString
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/CountdownTimer.js",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-2xl font-bold text-red-600 tabular-nums",
        children: timerComponents.length ? timeString : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Time's up!"
        }, void 0, false, {
            fileName: "[project]/src/app/components/CountdownTimer.js",
            lineNumber: 68,
            columnNumber: 46
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/CountdownTimer.js",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(CountdownTimer, "PkYJf7uMyQMwzj7Dj/mstgW4/O0=");
_c = CountdownTimer;
var _c;
__turbopack_context__.k.register(_c, "CountdownTimer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_components_CountdownTimer_8489fdc0.js.map