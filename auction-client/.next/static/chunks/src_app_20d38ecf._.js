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
"[project]/src/app/auction/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AuctionPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CountdownTimer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/CountdownTimer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// Update the socket URL for production
const SOCKET_URL = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:3001';
function AuctionPage() {
    var _postBidAction_message;
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const auctionId = params.id;
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { user, session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [auction, setAuction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [highestBid, setHighestBid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [bidAmount, setBidAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAuctionEnded, setIsAuctionEnded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sellerDecision, setSellerDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [counterOffer, setCounterOffer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [postBidAction, setPostBidAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPostBidActions, setShowPostBidActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuctionPage.useEffect": ()=>{
            if (!auctionId) return;
            const getAuctionDetails = {
                "AuctionPage.useEffect.getAuctionDetails": async ()=>{
                    try {
                        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('auctions').select('*').eq('id', auctionId).single();
                        if (error || !data) {
                            console.error('Error fetching auction details:', error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Could not load auction details.");
                            setIsLoading(false);
                            return;
                        }
                        const formattedData = {
                            ...data,
                            imageUrl: data.image_url || "https://placehold.co/600x400/gray/white?text=".concat(data.item_name.replace(/\s/g, '+'))
                        };
                        setAuction(formattedData);
                        setHighestBid(data.highest_bid || data.starting_price);
                        setBidAmount((data.highest_bid + data.bid_increment || data.starting_price + data.bid_increment).toString());
                        if (new Date(formattedData.end_time) <= new Date()) {
                            setIsAuctionEnded(true);
                            // Check if there are post-bid actions AFTER setting auction data
                            setTimeout({
                                "AuctionPage.useEffect.getAuctionDetails": ()=>{
                                    checkPostBidActions();
                                }
                            }["AuctionPage.useEffect.getAuctionDetails"], 100);
                        }
                        setIsLoading(false);
                    } catch (error) {
                        console.error('Error in getAuctionDetails:', error);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to load auction details.");
                        setIsLoading(false);
                    }
                }
            }["AuctionPage.useEffect.getAuctionDetails"];
            getAuctionDetails();
        }
    }["AuctionPage.useEffect"], [
        auctionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuctionPage.useEffect": ()=>{
            if (!auctionId) return;
            const checkPostBidActions = {
                "AuctionPage.useEffect.checkPostBidActions": async ()=>{
                    if (!user || !auction) return;
                    try {
                        // Check for ANY post-bid action (not just pending ones)
                        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('*').eq('auction_id', auctionId).single();
                        if (data && !error) {
                            console.log('Found existing post-bid action:', data);
                            setPostBidAction(data);
                            setShowPostBidActions(true);
                            return; // Don't create anything if one exists
                        } else {
                            console.log('No post-bid actions found');
                            // Only create if auction ended, has a highest bidder, and no action exists
                            if (isAuctionEnded && auction.highest_bidder_id) {
                                // Double-check if action already exists before creating
                                const { data: existingAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('id').eq('auction_id', auctionId).single();
                                if (!existingAction) {
                                    console.log('Creating new post-bid action...');
                                    await createPostBidAction();
                                } else {
                                    console.log('Post-bid action found on second check:', existingAction);
                                    // Fetch the full action data
                                    const { data: fullAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('*').eq('id', existingAction.id).single();
                                    if (fullAction) {
                                        setPostBidAction(fullAction);
                                        setShowPostBidActions(true);
                                    }
                                }
                            }
                        }
                    } catch (error) {
                        console.log('Error checking post-bid actions:', error);
                        // Don't create anything on error - just show the error
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load post-bid actions');
                    }
                }
            }["AuctionPage.useEffect.checkPostBidActions"];
            if (session) {
                try {
                    socketRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(SOCKET_URL, {
                        auth: {
                            token: session.access_token
                        },
                        transports: [
                            'websocket'
                        ]
                    });
                    socketRef.current.on('connect', {
                        "AuctionPage.useEffect": ()=>{
                            console.log('Socket connected successfully');
                            if (socketRef.current) {
                                socketRef.current.emit('joinAuction', auctionId);
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    socketRef.current.on('connect_error', {
                        "AuctionPage.useEffect": (err)=>{
                            console.error('Socket connection error:', err);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Socket connection failed: ".concat(err.message));
                        }
                    }["AuctionPage.useEffect"]);
                    socketRef.current.on('error', {
                        "AuctionPage.useEffect": (errorMessage)=>{
                            console.error('Socket error:', errorMessage);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for bid updates from other users FIRST - this ensures instant updates
                    socketRef.current.on('bidUpdate', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Bid update received:', data);
                            if (data.highestBid > highestBid) {
                                setHighestBid(data.highestBid);
                                setBidAmount((data.highestBid + ((auction === null || auction === void 0 ? void 0 : auction.bid_increment) || 1)).toString());
                                // Show notification for other users' bids
                                if (data.highestBidderId !== (user === null || user === void 0 ? void 0 : user.id)) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("New highest bid: $".concat(data.highestBid));
                                }
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    socketRef.current.on('bidSuccess', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Bid successful:', data);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Bid placed successfully! Amount: $".concat(data.bidAmount));
                            // Update the highest bid locally immediately
                            setHighestBid(data.bidAmount);
                            setBidAmount((data.bidAmount + ((auction === null || auction === void 0 ? void 0 : auction.bid_increment) || 1)).toString());
                            // Dismiss the loading toast
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss('bid-loading');
                        }
                    }["AuctionPage.useEffect"]);
                    socketRef.current.on('outbidNotification', {
                        "AuctionPage.useEffect": (param)=>{
                            let { user: outbidUserId } = param;
                            if (user && outbidUserId === user.id) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("You've been outbid!");
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for seller bid notifications
                    socketRef.current.on('sellerBidNotification', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Seller notification received:', data);
                            console.log('Current user ID:', user === null || user === void 0 ? void 0 : user.id);
                            console.log('Seller ID from notification:', data.sellerId);
                            // Only show notification if current user is the seller
                            if (user && user.id === data.sellerId) {
                                console.log('Showing seller notification');
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('New highest bid on "'.concat(data.itemName, '": $').concat(data.newHighestBid.toLocaleString(), "!"), {
                                    duration: 6000,
                                    icon: '💰'
                                });
                            } else {
                                console.log('User is not the seller or user not logged in');
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for post-bid action updates
                    socketRef.current.on('postBidActionUpdate', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Post-bid action update received:', data);
                            setPostBidAction(data);
                            setShowPostBidActions(true);
                        // Don't show toasts here - they will be handled by specific notifications
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for bid acceptance notifications (only for highest bidder)
                    socketRef.current.on('bidAcceptedNotification', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Bid accepted notification received:', data);
                            // Only show for the highest bidder
                            if (user && auction && user.id === auction.highest_bidder_id) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('🎉 Your bid has been accepted by the seller!', {
                                    duration: 8000,
                                    icon: '✅'
                                });
                                // Update the post-bid action to show accepted
                                if (postBidAction) {
                                    setPostBidAction({
                                        ...postBidAction,
                                        action_type: 'accepted',
                                        status: 'completed'
                                    });
                                }
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for bid rejection notifications (only for highest bidder)
                    socketRef.current.on('bidRejectedNotification', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Bid rejected notification received:', data);
                            // Only show for the highest bidder
                            if (user && auction && user.id === auction.highest_bidder_id) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('❌ Your bid has been rejected by the seller.', {
                                    duration: 8000,
                                    icon: '❌'
                                });
                                // Update the post-bid action to show rejected
                                if (postBidAction) {
                                    setPostBidAction({
                                        ...postBidAction,
                                        action_type: 'rejected',
                                        status: 'completed'
                                    });
                                }
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for counter offer notifications (only for highest bidder)
                    socketRef.current.on('counterOfferNotification', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Counter offer notification received:', data);
                            // Only show for the highest bidder
                            if (user && auction && user.id === auction.highest_bidder_id) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("💰 Seller has made a counter-offer: $".concat(data.counterAmount), {
                                    duration: 8000,
                                    icon: '💰'
                                });
                                // Update the post-bid action to show counter offer
                                if (postBidAction) {
                                    setPostBidAction({
                                        ...postBidAction,
                                        action_type: 'counter_offer',
                                        counter_amount: data.counterAmount,
                                        status: 'pending'
                                    });
                                }
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for counter offer response notifications (only for seller)
                    socketRef.current.on('counterOfferResponseNotification', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Counter offer response notification received:', data);
                            // Only show for the seller
                            if (user && auction && user.id === auction.seller_id) {
                                if (data.response === 'accepted') {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('✅ The bidder accepted your counter-offer!', {
                                        duration: 8000,
                                        icon: '✅'
                                    });
                                } else {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('❌ The bidder rejected your counter-offer.', {
                                        duration: 8000,
                                        icon: '❌'
                                    });
                                }
                                // Update the post-bid action to show the response
                                if (postBidAction) {
                                    setPostBidAction({
                                        ...postBidAction,
                                        status: 'completed',
                                        message: data.message
                                    });
                                }
                            }
                        }
                    }["AuctionPage.useEffect"]);
                    // Listen for transaction completion notifications
                    socketRef.current.on('transactionCompleted', {
                        "AuctionPage.useEffect": (data)=>{
                            console.log('Transaction completed:', data);
                            // Show success message to both buyer and seller
                            if (user && auction) {
                                if (user.id === auction.highest_bidder_id) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("🎉 Transaction completed! Invoice sent to ".concat(data.buyerEmail), {
                                        duration: 10000,
                                        icon: '📧'
                                    });
                                } else if (user.id === auction.seller_id) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("🎉 Transaction completed! Invoice sent to ".concat(data.sellerEmail), {
                                        duration: 10000,
                                        icon: '📧'
                                    });
                                }
                            }
                            // Update the post-bid action to show completed
                            if (postBidAction) {
                                setPostBidAction({
                                    ...postBidAction,
                                    status: 'completed',
                                    message: "Transaction completed successfully. Final amount: $".concat(data.finalAmount.toLocaleString())
                                });
                            }
                        }
                    }["AuctionPage.useEffect"]);
                } catch (error) {
                    console.error('Error setting up socket:', error);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to establish connection. Please refresh the page.");
                }
            }
            // Set up real-time subscription for instant updates
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("auction-".concat(auctionId)).on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'auctions',
                filter: "id=eq.".concat(auctionId)
            }, {
                "AuctionPage.useEffect.channel": (payload)=>{
                    const newHighestBid = payload.new.highest_bid;
                    if (newHighestBid && newHighestBid > highestBid) {
                        console.log('Real-time update received:', newHighestBid);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("New highest bid: $".concat(newHighestBid));
                        setHighestBid(newHighestBid);
                        setBidAmount((newHighestBid + ((auction === null || auction === void 0 ? void 0 : auction.bid_increment) || 1)).toString());
                    }
                }
            }["AuctionPage.useEffect.channel"]).subscribe();
            return ({
                "AuctionPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                    if (socketRef.current) {
                        socketRef.current.disconnect();
                    }
                }
            })["AuctionPage.useEffect"];
        }
    }["AuctionPage.useEffect"], [
        auctionId,
        session,
        auction === null || auction === void 0 ? void 0 : auction.bid_increment
    ]);
    const handlePlaceBid = async (e)=>{
        e.preventDefault();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please log in to place a bid.");
        }
        if (!socketRef.current || !socketRef.current.connected) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Connection not established. Please refresh the page.");
        }
        if (!auction) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Auction data not loaded.");
        }
        // Check if user is the seller
        if (user.id === auction.seller_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Sellers cannot place bids on their own auctions.");
        }
        const newBid = parseFloat(bidAmount);
        if (isNaN(newBid)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter a valid bid amount.");
        }
        const minBid = highestBid + auction.bid_increment;
        if (newBid < minBid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Your bid must be at least $".concat(minBid.toFixed(2)));
        }
        try {
            console.log('Emitting bid:', {
                auctionId,
                bidAmount: newBid
            });
            // Show loading state
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading('Placing your bid...', {
                id: 'bid-loading'
            });
            // Emit the bid event
            socketRef.current.emit('placeBid', {
                auctionId,
                bidAmount: newBid
            });
        } catch (error) {
            console.error('Error placing bid:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to place bid. Please try again.');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss('bid-loading');
        }
    };
    const handleAuctionEnd = ()=>{
        setIsAuctionEnded(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("The auction has ended!");
        // Check for post-bid actions after a short delay
        setTimeout(()=>{
            checkPostBidActions();
        }, 1000);
    };
    const checkPostBidActions = async ()=>{
        if (!user || !auction) return;
        try {
            console.log('Checking for post-bid actions...');
            // Check for ANY post-bid action (not just pending ones)
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('*').eq('auction_id', auctionId).single();
            if (data && !error) {
                console.log('Found existing post-bid action:', data);
                setPostBidAction(data);
                setShowPostBidActions(true);
                return; // Don't create anything if one exists
            } else {
                console.log('No post-bid actions found');
                // Only create if auction ended, has a highest bidder, and no action exists
                if (isAuctionEnded && auction.highest_bidder_id) {
                    // Double-check if action already exists before creating
                    const { data: existingAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('id').eq('auction_id', auctionId).single();
                    if (!existingAction) {
                        console.log('Creating new post-bid action...');
                        await createPostBidAction();
                    } else {
                        console.log('Post-bid action found on second check:', existingAction);
                        // Fetch the full action data
                        const { data: fullAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('*').eq('id', existingAction.id).single();
                        if (fullAction) {
                            setPostBidAction(fullAction);
                            setShowPostBidActions(true);
                        }
                    }
                }
            }
        } catch (error) {
            console.log('Error checking post-bid actions:', error);
            // Don't create anything on error - just show the error
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load post-bid actions');
        }
    };
    const createPostBidAction = async ()=>{
        if (!auction || !auction.highest_bidder_id) return;
        try {
            // Final check if action already exists before creating
            const { data: existingAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('id').eq('auction_id', auctionId).single();
            if (existingAction) {
                console.log('Post-bid action already exists, not creating duplicate');
                // Fetch the existing action instead
                const { data: fullAction } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').select('*').eq('id', existingAction.id).single();
                if (fullAction) {
                    setPostBidAction(fullAction);
                    setShowPostBidActions(true);
                }
                return;
            }
            console.log('Creating new post-bid action...');
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').insert({
                auction_id: auctionId,
                seller_id: auction.seller_id,
                bidder_id: auction.highest_bidder_id,
                action_type: 'pending',
                status: 'pending'
            }).select().single();
            if (data && !error) {
                console.log('Created post-bid action:', data);
                setPostBidAction(data);
                setShowPostBidActions(true);
            } else {
                console.error('Error creating post-bid action:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to create post-bid action');
            }
        } catch (error) {
            console.error('Error creating post-bid action:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to create post-bid action');
        }
    };
    const handleSellerAction = async (action)=>{
        if (!user || !auction || !postBidAction) return;
        try {
            let updateData = {
                action_type: action === 'counter' ? 'counter_offer' : action,
                status: 'completed'
            };
            if (action === 'counter' && counterOffer) {
                updateData.counter_amount = parseFloat(counterOffer);
                updateData.message = "Seller counter-offer: $".concat(counterOffer);
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').update(updateData).eq('id', postBidAction.id);
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to update action. Please try again.');
                return;
            }
            // Emit the update to the backend
            if (socketRef.current) {
                socketRef.current.emit('updatePostBidAction', {
                    actionId: postBidAction.id,
                    actionType: action === 'counter' ? 'counter_offer' : action,
                    counterAmount: action === 'counter' ? parseFloat(counterOffer) : null
                });
            }
            setSellerDecision(action);
            if (action === 'counter') {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Counter-offer sent: $".concat(counterOffer));
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Bid ".concat(action, " successfully!"));
            }
            // Reset form
            setCounterOffer('');
        // Don't hide the post-bid actions yet - wait for the response
        } catch (error) {
            console.error('Error handling seller action:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to process action. Please try again.');
        }
    };
    const handleBidderResponse = async (response)=>{
        if (!user || !postBidAction) return;
        try {
            const message = response === 'accepted' ? "Bidder accepted the counter-offer of $".concat(postBidAction.counter_amount) : "Bidder rejected the counter-offer of $".concat(postBidAction.counter_amount);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_bid_actions').update({
                status: 'completed',
                message: message,
                updated_at: new Date().toISOString()
            }).eq('id', postBidAction.id);
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to update response. Please try again.');
                return;
            }
            // Emit the response to the backend
            if (socketRef.current) {
                socketRef.current.emit('respondToCounterOffer', {
                    actionId: postBidAction.id,
                    response: response,
                    message: message
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Response recorded: ".concat(response));
            // Update local state
            setPostBidAction((prev)=>prev ? {
                    ...prev,
                    status: 'completed',
                    message: message
                } : null);
        } catch (error) {
            console.error('Error handling bidder response:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to process response. Please try again.');
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 697,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 font-semibold",
                        children: "Loading Auction..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 698,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auction/[id]/page.tsx",
                lineNumber: 696,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/auction/[id]/page.tsx",
            lineNumber: 695,
            columnNumber: 7
        }, this);
    }
    if (!auction) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: "Auction not found."
                    }, void 0, false, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 708,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "The auction you're looking for doesn't exist."
                    }, void 0, false, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auction/[id]/page.tsx",
                lineNumber: 707,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/auction/[id]/page.tsx",
            lineNumber: 706,
            columnNumber: 7
        }, this);
    }
    const isSeller = user && auction && user.id === auction.seller_id;
    const isHighestBidder = user && auction && user.id === auction.highest_bidder_id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-2xl shadow-xl border border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: auction.imageUrl,
                            alt: auction.item_name,
                            className: "w-full h-auto object-cover rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                            lineNumber: 723,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-8 rounded-2xl shadow-xl border border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-900 mb-4",
                                children: auction.item_name
                            }, void 0, false, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 726,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700 text-lg mb-8 leading-relaxed",
                                children: auction.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8 border border-blue-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-gray-800",
                                                children: "Current Highest Bid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 731,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl font-bold text-blue-600",
                                                children: [
                                                    "$",
                                                    highestBid.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 732,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 730,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-gray-800",
                                                children: "Auction Ends In"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 735,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$CountdownTimer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                endTime: auction.end_time,
                                                onEnd: handleAuctionEnd
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 736,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 734,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 729,
                                columnNumber: 13
                            }, this),
                            !isAuctionEnded ? user ? isSeller ? // Seller view - show current bid info only
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-6 bg-green-50 rounded-xl border border-green-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-green-800 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-2",
                                            children: "You are the seller of this auction"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg",
                                            children: [
                                                "Current highest bid: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-green-600",
                                                    children: [
                                                        "$",
                                                        highestBid.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 67
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 747,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm mt-2",
                                            children: "You cannot place bids on your own auction"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 748,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                    lineNumber: 745,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 744,
                                columnNumber: 19
                            }, this) : // Regular user view - show bidding form
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handlePlaceBid,
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "bid",
                                        className: "block text-sm font-semibold text-gray-800 mb-2",
                                        children: [
                                            "Your Bid (min. $",
                                            (highestBid + auction.bid_increment).toFixed(2),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 754,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "bid",
                                                type: "number",
                                                value: bidAmount,
                                                onChange: (e)=>setBidAmount(e.target.value),
                                                className: "flex-grow p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500",
                                                step: auction.bid_increment,
                                                min: highestBid + auction.bid_increment,
                                                placeholder: "Enter bid amount"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 758,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg",
                                                children: "Place Bid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 768,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 753,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-6 bg-gray-100 rounded-xl border border-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-gray-800",
                                    children: [
                                        "Please ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "text-blue-600 hover:underline",
                                            children: "log in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 779,
                                            columnNumber: 69
                                        }, this),
                                        " to place a bid."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                    lineNumber: 779,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 778,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-yellow-800",
                                        children: "Auction Ended"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 784,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg mt-2 text-yellow-700",
                                        children: [
                                            "Final Bid: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: [
                                                    "$",
                                                    highestBid.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 785,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 785,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 783,
                                columnNumber: 15
                            }, this),
                            isAuctionEnded && (isSeller || isHighestBidder) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 p-6 bg-blue-50 border-blue-400 border rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-4 text-center text-blue-800",
                                        children: "Post-Bid Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 792,
                                        columnNumber: 17
                                    }, this),
                                    !postBidAction ? // Loading or no action yet
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-700",
                                                children: "Loading post-bid actions..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 797,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: checkPostBidActions,
                                                className: "mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors",
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 798,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 796,
                                        columnNumber: 19
                                    }, this) : isSeller && postBidAction.status === 'pending' ? // Seller actions - only show if status is pending
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-blue-700",
                                                children: [
                                                    "The auction ended with a bid of $",
                                                    highestBid,
                                                    ". What would you like to do?"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 808,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleSellerAction('accepted'),
                                                        className: "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors",
                                                        children: "Accept Bid"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                        lineNumber: 812,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleSellerAction('rejected'),
                                                        className: "bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors",
                                                        children: "Reject Bid"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                        lineNumber: 818,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSellerDecision('counter'),
                                                        className: "bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors",
                                                        children: "Counter-Offer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                        lineNumber: 824,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 811,
                                                columnNumber: 21
                                            }, this),
                                            sellerDecision === 'counter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Enter counter-offer amount",
                                                        className: "w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500",
                                                        value: counterOffer,
                                                        onChange: (e)=>setCounterOffer(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                        lineNumber: 834,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleSellerAction('counter'),
                                                        className: "w-full mt-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors",
                                                        children: "Send Counter-Offer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                lineNumber: 833,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 807,
                                        columnNumber: 19
                                    }, this) : isHighestBidder && postBidAction.status === 'pending' ? // Bidder actions - only show if status is pending
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                postBidAction.action_type === 'accepted' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-green-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2",
                                                            children: "🎉 Your bid has been accepted!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: [
                                                                "The seller has accepted your bid of $",
                                                                highestBid
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 857,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 855,
                                                    columnNumber: 25
                                                }, this),
                                                postBidAction.action_type === 'rejected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-red-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2",
                                                            children: "❌ Your bid has been rejected"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: [
                                                                "The seller has rejected your bid of $",
                                                                highestBid
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 863,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 861,
                                                    columnNumber: 25
                                                }, this),
                                                postBidAction.action_type === 'counter_offer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-blue-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2",
                                                            children: "💰 Counter-Offer Received!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 868,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg mb-4",
                                                            children: [
                                                                "The seller has made a counter-offer: ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-blue-600",
                                                                    children: [
                                                                        "$",
                                                                        postBidAction.counter_amount
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                                    lineNumber: 869,
                                                                    columnNumber: 92
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 869,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mb-4",
                                                            children: "Would you like to accept or reject this offer?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 870,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleBidderResponse('accepted'),
                                                                    className: "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold",
                                                                    children: "✅ Accept Counter-Offer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                                    lineNumber: 873,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleBidderResponse('rejected'),
                                                                    className: "bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold",
                                                                    children: "❌ Reject Counter-Offer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                                    lineNumber: 879,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 872,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 867,
                                                    columnNumber: 25
                                                }, this),
                                                postBidAction.action_type === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-yellow-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2",
                                                            children: "⏳ Waiting for Seller's Response"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 890,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: [
                                                                "The seller is reviewing your bid of $",
                                                                highestBid
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 891,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                                    lineNumber: 893,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs mt-2 text-yellow-600",
                                                                    children: "Please wait..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                                    lineNumber: 894,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 892,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 889,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 853,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 852,
                                        columnNumber: 19
                                    }, this) : // Show completed action status - this will show the final result
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-blue-700",
                                            children: [
                                                postBidAction.action_type === 'accepted' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2 text-green-700",
                                                            children: "✅ Deal Completed!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 906,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-green-600",
                                                            children: "Bid accepted by seller"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 907,
                                                            columnNumber: 27
                                                        }, this),
                                                        postBidAction.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mt-2",
                                                            children: postBidAction.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 909,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 905,
                                                    columnNumber: 25
                                                }, this),
                                                postBidAction.action_type === 'rejected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2 text-red-700",
                                                            children: "❌ Deal Declined"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 915,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-red-600",
                                                            children: "Bid rejected by seller"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 916,
                                                            columnNumber: 27
                                                        }, this),
                                                        postBidAction.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mt-2",
                                                            children: postBidAction.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 918,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 914,
                                                    columnNumber: 25
                                                }, this),
                                                postBidAction.action_type === 'counter_offer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-lg font-bold mb-2 text-blue-700",
                                                            children: [
                                                                "💰 Counter-Offer: $",
                                                                postBidAction.counter_amount
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 924,
                                                            columnNumber: 27
                                                        }, this),
                                                        postBidAction.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mt-2",
                                                            children: postBidAction.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 926,
                                                            columnNumber: 29
                                                        }, this),
                                                        postBidAction.status === 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mt-2",
                                                            children: ((_postBidAction_message = postBidAction.message) === null || _postBidAction_message === void 0 ? void 0 : _postBidAction_message.includes('accepted')) ? '✅ Counter-offer was accepted' : '❌ Counter-offer was rejected'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                            lineNumber: 929,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/auction/[id]/page.tsx",
                                                    lineNumber: 923,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/auction/[id]/page.tsx",
                                            lineNumber: 903,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                                        lineNumber: 902,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auction/[id]/page.tsx",
                                lineNumber: 791,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auction/[id]/page.tsx",
                        lineNumber: 725,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auction/[id]/page.tsx",
                lineNumber: 721,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/auction/[id]/page.tsx",
            lineNumber: 720,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auction/[id]/page.tsx",
        lineNumber: 719,
        columnNumber: 5
    }, this);
}
_s(AuctionPage, "0XuuebFpC6tAqHekLAULhLhAVRE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuctionPage;
var _c;
__turbopack_context__.k.register(_c, "AuctionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_20d38ecf._.js.map