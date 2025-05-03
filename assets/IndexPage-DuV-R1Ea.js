import {b as _, Q as oo, r as Ao} from "./utils-DMILY4l8.js";
import {P as XI, n as uo, C as ro, _ as tn, r as In, o as so, u as Mo, x as en, D as co, E as ao, F as No, G as ho, y as jo, z as lo, B as Do} from "./index-CB9cSSVB.js";
function yo(W) {
    const B = Object.assign({
        noopener: !0
    }, W)
      , u = [];
    for (const h in B) {
        const a = B[h];
        a === !0 ? u.push(h) : (ro(a) || typeof a == "string" && a !== "") && u.push(h + "=" + a)
    }
    return u.join(",")
}
function $e(W, B, u) {
    let h = window.open;
    if (XI.is.cordova === !0) {
        if (cordova !== void 0 && cordova.InAppBrowser !== void 0 && cordova.InAppBrowser.open !== void 0)
            h = cordova.InAppBrowser.open;
        else if (navigator !== void 0 && navigator.app !== void 0)
            return navigator.app.loadUrl(W, {
                openExternal: !0
            })
    }
    const a = h(W, "_blank", yo(u));
    if (a)
        return XI.is.desktop && a.focus(),
        a;
    B && B()
}
const qI = (W, B, u) => {
    if (XI.is.ios === !0 && window.SafariViewController !== void 0) {
        window.SafariViewController.isAvailable(h => {
            h ? window.SafariViewController.show({
                url: W
            }, uo, B) : $e(W, B, u)
        }
        );
        return
    }
    return $e(W, B, u)
}
  , Co = "assets/audio.webm";
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , ut = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(W) {
    (function() {
        var B = function() {
            this.init()
        };
        B.prototype = {
            init: function() {
                var e = this || u;
                return e._counter = 1e3,
                e._html5AudioPool = [],
                e.html5PoolSize = 10,
                e._codecs = {},
                e._howls = [],
                e._muted = !1,
                e._volume = 1,
                e._canPlayEvent = "canplaythrough",
                e._navigator = typeof window < "u" && window.navigator ? window.navigator : null,
                e.masterGain = null,
                e.noAudio = !1,
                e.usingWebAudio = !0,
                e.autoSuspend = !0,
                e.ctx = null,
                e.autoUnlock = !0,
                e._setup(),
                e
            },
            volume: function(e) {
                var n = this || u;
                if (e = parseFloat(e),
                n.ctx || Z(),
                typeof e < "u" && e >= 0 && e <= 1) {
                    if (n._volume = e,
                    n._muted)
                        return n;
                    n.usingWebAudio && n.masterGain.gain.setValueAtTime(e, u.ctx.currentTime);
                    for (var o = 0; o < n._howls.length; o++)
                        if (!n._howls[o]._webAudio)
                            for (var s = n._howls[o]._getSoundIds(), j = 0; j < s.length; j++) {
                                var l = n._howls[o]._soundById(s[j]);
                                l && l._node && (l._node.volume = l._volume * e)
                            }
                    return n
                }
                return n._volume
            },
            mute: function(e) {
                var n = this || u;
                n.ctx || Z(),
                n._muted = e,
                n.usingWebAudio && n.masterGain.gain.setValueAtTime(e ? 0 : n._volume, u.ctx.currentTime);
                for (var o = 0; o < n._howls.length; o++)
                    if (!n._howls[o]._webAudio)
                        for (var s = n._howls[o]._getSoundIds(), j = 0; j < s.length; j++) {
                            var l = n._howls[o]._soundById(s[j]);
                            l && l._node && (l._node.muted = e ? !0 : l._muted)
                        }
                return n
            },
            stop: function() {
                for (var e = this || u, n = 0; n < e._howls.length; n++)
                    e._howls[n].stop();
                return e
            },
            unload: function() {
                for (var e = this || u, n = e._howls.length - 1; n >= 0; n--)
                    e._howls[n].unload();
                return e.usingWebAudio && e.ctx && typeof e.ctx.close < "u" && (e.ctx.close(),
                e.ctx = null,
                Z()),
                e
            },
            codecs: function(e) {
                return (this || u)._codecs[e.replace(/^x-/, "")]
            },
            _setup: function() {
                var e = this || u;
                if (e.state = e.ctx && e.ctx.state || "suspended",
                e._autoSuspend(),
                !e.usingWebAudio)
                    if (typeof Audio < "u")
                        try {
                            var n = new Audio;
                            typeof n.oncanplaythrough > "u" && (e._canPlayEvent = "canplay")
                        } catch {
                            e.noAudio = !0
                        }
                    else
                        e.noAudio = !0;
                try {
                    var n = new Audio;
                    n.muted && (e.noAudio = !0)
                } catch {}
                return e.noAudio || e._setupCodecs(),
                e
            },
            _setupCodecs: function() {
                var e = this || u
                  , n = null;
                try {
                    n = typeof Audio < "u" ? new Audio : null
                } catch {
                    return e
                }
                if (!n || typeof n.canPlayType != "function")
                    return e;
                var o = n.canPlayType("audio/mpeg;").replace(/^no$/, "")
                  , s = e._navigator ? e._navigator.userAgent : ""
                  , j = s.match(/OPR\/(\d+)/g)
                  , l = j && parseInt(j[0].split("/")[1], 10) < 33
                  , N = s.indexOf("Safari") !== -1 && s.indexOf("Chrome") === -1
                  , f = s.match(/Version\/(.*?) /)
                  , P = N && f && parseInt(f[1], 10) < 15;
                return e._codecs = {
                    mp3: !!(!l && (o || n.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!o,
                    opus: !!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    oga: !!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!(n.canPlayType('audio/wav; codecs="1"') || n.canPlayType("audio/wav")).replace(/^no$/, ""),
                    aac: !!n.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!n.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(n.canPlayType("audio/x-m4a;") || n.canPlayType("audio/m4a;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    m4b: !!(n.canPlayType("audio/x-m4b;") || n.canPlayType("audio/m4b;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(n.canPlayType("audio/x-mp4;") || n.canPlayType("audio/mp4;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!(!P && n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!P && n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(n.canPlayType("audio/x-flac;") || n.canPlayType("audio/flac;")).replace(/^no$/, "")
                },
                e
            },
            _unlockAudio: function() {
                var e = this || u;
                if (!(e._audioUnlocked || !e.ctx)) {
                    e._audioUnlocked = !1,
                    e.autoUnlock = !1,
                    !e._mobileUnloaded && e.ctx.sampleRate !== 44100 && (e._mobileUnloaded = !0,
                    e.unload()),
                    e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
                    var n = function(o) {
                        for (; e._html5AudioPool.length < e.html5PoolSize; )
                            try {
                                var s = new Audio;
                                s._unlocked = !0,
                                e._releaseHtml5Audio(s)
                            } catch {
                                e.noAudio = !0;
                                break
                            }
                        for (var j = 0; j < e._howls.length; j++)
                            if (!e._howls[j]._webAudio)
                                for (var l = e._howls[j]._getSoundIds(), N = 0; N < l.length; N++) {
                                    var f = e._howls[j]._soundById(l[N]);
                                    f && f._node && !f._node._unlocked && (f._node._unlocked = !0,
                                    f._node.load())
                                }
                        e._autoResume();
                        var P = e.ctx.createBufferSource();
                        P.buffer = e._scratchBuffer,
                        P.connect(e.ctx.destination),
                        typeof P.start > "u" ? P.noteOn(0) : P.start(0),
                        typeof e.ctx.resume == "function" && e.ctx.resume(),
                        P.onended = function() {
                            P.disconnect(0),
                            e._audioUnlocked = !0,
                            document.removeEventListener("touchstart", n, !0),
                            document.removeEventListener("touchend", n, !0),
                            document.removeEventListener("click", n, !0),
                            document.removeEventListener("keydown", n, !0);
                            for (var F = 0; F < e._howls.length; F++)
                                e._howls[F]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", n, !0),
                    document.addEventListener("touchend", n, !0),
                    document.addEventListener("click", n, !0),
                    document.addEventListener("keydown", n, !0),
                    e
                }
            },
            _obtainHtml5Audio: function() {
                var e = this || u;
                if (e._html5AudioPool.length)
                    return e._html5AudioPool.pop();
                var n = new Audio().play();
                return n && typeof Promise < "u" && (n instanceof Promise || typeof n.then == "function") && n.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }),
                new Audio
            },
            _releaseHtml5Audio: function(e) {
                var n = this || u;
                return e._unlocked && n._html5AudioPool.push(e),
                n
            },
            _autoSuspend: function() {
                var e = this;
                if (!(!e.autoSuspend || !e.ctx || typeof e.ctx.suspend > "u" || !u.usingWebAudio)) {
                    for (var n = 0; n < e._howls.length; n++)
                        if (e._howls[n]._webAudio) {
                            for (var o = 0; o < e._howls[n]._sounds.length; o++)
                                if (!e._howls[n]._sounds[o]._paused)
                                    return e
                        }
                    return e._suspendTimer && clearTimeout(e._suspendTimer),
                    e._suspendTimer = setTimeout(function() {
                        if (e.autoSuspend) {
                            e._suspendTimer = null,
                            e.state = "suspending";
                            var s = function() {
                                e.state = "suspended",
                                e._resumeAfterSuspend && (delete e._resumeAfterSuspend,
                                e._autoResume())
                            };
                            e.ctx.suspend().then(s, s)
                        }
                    }, 3e4),
                    e
                }
            },
            _autoResume: function() {
                var e = this;
                if (!(!e.ctx || typeof e.ctx.resume > "u" || !u.usingWebAudio))
                    return e.state === "running" && e.ctx.state !== "interrupted" && e._suspendTimer ? (clearTimeout(e._suspendTimer),
                    e._suspendTimer = null) : e.state === "suspended" || e.state === "running" && e.ctx.state === "interrupted" ? (e.ctx.resume().then(function() {
                        e.state = "running";
                        for (var n = 0; n < e._howls.length; n++)
                            e._howls[n]._emit("resume")
                    }),
                    e._suspendTimer && (clearTimeout(e._suspendTimer),
                    e._suspendTimer = null)) : e.state === "suspending" && (e._resumeAfterSuspend = !0),
                    e
            }
        };
        var u = new B
          , h = function(e) {
            var n = this;
            if (!e.src || e.src.length === 0) {
                console.error("An array of source files must be passed with any new Howl.");
                return
            }
            n.init(e)
        };
        h.prototype = {
            init: function(e) {
                var n = this;
                return u.ctx || Z(),
                n._autoplay = e.autoplay || !1,
                n._format = typeof e.format != "string" ? e.format : [e.format],
                n._html5 = e.html5 || !1,
                n._muted = e.mute || !1,
                n._loop = e.loop || !1,
                n._pool = e.pool || 5,
                n._preload = typeof e.preload == "boolean" || e.preload === "metadata" ? e.preload : !0,
                n._rate = e.rate || 1,
                n._sprite = e.sprite || {},
                n._src = typeof e.src != "string" ? e.src : [e.src],
                n._volume = e.volume !== void 0 ? e.volume : 1,
                n._xhr = {
                    method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
                    headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
                    withCredentials: e.xhr && e.xhr.withCredentials ? e.xhr.withCredentials : !1
                },
                n._duration = 0,
                n._state = "unloaded",
                n._sounds = [],
                n._endTimers = {},
                n._queue = [],
                n._playLock = !1,
                n._onend = e.onend ? [{
                    fn: e.onend
                }] : [],
                n._onfade = e.onfade ? [{
                    fn: e.onfade
                }] : [],
                n._onload = e.onload ? [{
                    fn: e.onload
                }] : [],
                n._onloaderror = e.onloaderror ? [{
                    fn: e.onloaderror
                }] : [],
                n._onplayerror = e.onplayerror ? [{
                    fn: e.onplayerror
                }] : [],
                n._onpause = e.onpause ? [{
                    fn: e.onpause
                }] : [],
                n._onplay = e.onplay ? [{
                    fn: e.onplay
                }] : [],
                n._onstop = e.onstop ? [{
                    fn: e.onstop
                }] : [],
                n._onmute = e.onmute ? [{
                    fn: e.onmute
                }] : [],
                n._onvolume = e.onvolume ? [{
                    fn: e.onvolume
                }] : [],
                n._onrate = e.onrate ? [{
                    fn: e.onrate
                }] : [],
                n._onseek = e.onseek ? [{
                    fn: e.onseek
                }] : [],
                n._onunlock = e.onunlock ? [{
                    fn: e.onunlock
                }] : [],
                n._onresume = [],
                n._webAudio = u.usingWebAudio && !n._html5,
                typeof u.ctx < "u" && u.ctx && u.autoUnlock && u._unlockAudio(),
                u._howls.push(n),
                n._autoplay && n._queue.push({
                    event: "play",
                    action: function() {
                        n.play()
                    }
                }),
                n._preload && n._preload !== "none" && n.load(),
                n
            },
            load: function() {
                var e = this
                  , n = null;
                if (u.noAudio) {
                    e._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof e._src == "string" && (e._src = [e._src]);
                for (var o = 0; o < e._src.length; o++) {
                    var s, j;
                    if (e._format && e._format[o])
                        s = e._format[o];
                    else {
                        if (j = e._src[o],
                        typeof j != "string") {
                            e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        s = /^data:audio\/([^;,]+);/i.exec(j),
                        s || (s = /\.([^.]+)$/.exec(j.split("?", 1)[0])),
                        s && (s = s[1].toLowerCase())
                    }
                    if (s || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),
                    s && u.codecs(s)) {
                        n = e._src[o];
                        break
                    }
                }
                if (!n) {
                    e._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return e._src = n,
                e._state = "loading",
                window.location.protocol === "https:" && n.slice(0, 5) === "http:" && (e._html5 = !0,
                e._webAudio = !1),
                new a(e),
                e._webAudio && L(e),
                e
            },
            play: function(e, n) {
                var o = this
                  , s = null;
                if (typeof e == "number")
                    s = e,
                    e = null;
                else {
                    if (typeof e == "string" && o._state === "loaded" && !o._sprite[e])
                        return null;
                    if (typeof e > "u" && (e = "__default",
                    !o._playLock)) {
                        for (var j = 0, l = 0; l < o._sounds.length; l++)
                            o._sounds[l]._paused && !o._sounds[l]._ended && (j++,
                            s = o._sounds[l]._id);
                        j === 1 ? e = null : s = null
                    }
                }
                var N = s ? o._soundById(s) : o._inactiveSound();
                if (!N)
                    return null;
                if (s && !e && (e = N._sprite || "__default"),
                o._state !== "loaded") {
                    N._sprite = e,
                    N._ended = !1;
                    var f = N._id;
                    return o._queue.push({
                        event: "play",
                        action: function() {
                            o.play(f)
                        }
                    }),
                    f
                }
                if (s && !N._paused)
                    return n || o._loadQueue("play"),
                    N._id;
                o._webAudio && u._autoResume();
                var P = Math.max(0, N._seek > 0 ? N._seek : o._sprite[e][0] / 1e3)
                  , F = Math.max(0, (o._sprite[e][0] + o._sprite[e][1]) / 1e3 - P)
                  , ji = F * 1e3 / Math.abs(N._rate)
                  , z = o._sprite[e][0] / 1e3
                  , Xi = (o._sprite[e][0] + o._sprite[e][1]) / 1e3;
                N._sprite = e,
                N._ended = !1;
                var zi = function() {
                    N._paused = !1,
                    N._seek = P,
                    N._start = z,
                    N._stop = Xi,
                    N._loop = !!(N._loop || o._sprite[e][2])
                };
                if (P >= Xi) {
                    o._ended(N);
                    return
                }
                var Q = N._node;
                if (o._webAudio) {
                    var xi = function() {
                        o._playLock = !1,
                        zi(),
                        o._refreshBuffer(N);
                        var mi = N._muted || o._muted ? 0 : N._volume;
                        Q.gain.setValueAtTime(mi, u.ctx.currentTime),
                        N._playStart = u.ctx.currentTime,
                        typeof Q.bufferSource.start > "u" ? N._loop ? Q.bufferSource.noteGrainOn(0, P, 86400) : Q.bufferSource.noteGrainOn(0, P, F) : N._loop ? Q.bufferSource.start(0, P, 86400) : Q.bufferSource.start(0, P, F),
                        ji !== 1 / 0 && (o._endTimers[N._id] = setTimeout(o._ended.bind(o, N), ji)),
                        n || setTimeout(function() {
                            o._emit("play", N._id),
                            o._loadQueue()
                        }, 0)
                    };
                    u.state === "running" && u.ctx.state !== "interrupted" ? xi() : (o._playLock = !0,
                    o.once("resume", xi),
                    o._clearTimer(N._id))
                } else {
                    var Si = function() {
                        Q.currentTime = P,
                        Q.muted = N._muted || o._muted || u._muted || Q.muted,
                        Q.volume = N._volume * u.volume(),
                        Q.playbackRate = N._rate;
                        try {
                            var mi = Q.play();
                            if (mi && typeof Promise < "u" && (mi instanceof Promise || typeof mi.then == "function") ? (o._playLock = !0,
                            zi(),
                            mi.then(function() {
                                o._playLock = !1,
                                Q._unlocked = !0,
                                n ? o._loadQueue() : o._emit("play", N._id)
                            }).catch(function() {
                                o._playLock = !1,
                                o._emit("playerror", N._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                N._ended = !0,
                                N._paused = !0
                            })) : n || (o._playLock = !1,
                            zi(),
                            o._emit("play", N._id)),
                            Q.playbackRate = N._rate,
                            Q.paused) {
                                o._emit("playerror", N._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            e !== "__default" || N._loop ? o._endTimers[N._id] = setTimeout(o._ended.bind(o, N), ji) : (o._endTimers[N._id] = function() {
                                o._ended(N),
                                Q.removeEventListener("ended", o._endTimers[N._id], !1)
                            }
                            ,
                            Q.addEventListener("ended", o._endTimers[N._id], !1))
                        } catch (qi) {
                            o._emit("playerror", N._id, qi)
                        }
                    };
                    Q.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (Q.src = o._src,
                    Q.load());
                    var Oi = window && window.ejecta || !Q.readyState && u._navigator.isCocoonJS;
                    if (Q.readyState >= 3 || Oi)
                        Si();
                    else {
                        o._playLock = !0,
                        o._state = "loading";
                        var li = function() {
                            o._state = "loaded",
                            Si(),
                            Q.removeEventListener(u._canPlayEvent, li, !1)
                        };
                        Q.addEventListener(u._canPlayEvent, li, !1),
                        o._clearTimer(N._id)
                    }
                }
                return N._id
            },
            pause: function(e) {
                var n = this;
                if (n._state !== "loaded" || n._playLock)
                    return n._queue.push({
                        event: "pause",
                        action: function() {
                            n.pause(e)
                        }
                    }),
                    n;
                for (var o = n._getSoundIds(e), s = 0; s < o.length; s++) {
                    n._clearTimer(o[s]);
                    var j = n._soundById(o[s]);
                    if (j && !j._paused && (j._seek = n.seek(o[s]),
                    j._rateSeek = 0,
                    j._paused = !0,
                    n._stopFade(o[s]),
                    j._node))
                        if (n._webAudio) {
                            if (!j._node.bufferSource)
                                continue;
                            typeof j._node.bufferSource.stop > "u" ? j._node.bufferSource.noteOff(0) : j._node.bufferSource.stop(0),
                            n._cleanBuffer(j._node)
                        } else
                            (!isNaN(j._node.duration) || j._node.duration === 1 / 0) && j._node.pause();
                    arguments[1] || n._emit("pause", j ? j._id : null)
                }
                return n
            },
            stop: function(e, n) {
                var o = this;
                if (o._state !== "loaded" || o._playLock)
                    return o._queue.push({
                        event: "stop",
                        action: function() {
                            o.stop(e)
                        }
                    }),
                    o;
                for (var s = o._getSoundIds(e), j = 0; j < s.length; j++) {
                    o._clearTimer(s[j]);
                    var l = o._soundById(s[j]);
                    l && (l._seek = l._start || 0,
                    l._rateSeek = 0,
                    l._paused = !0,
                    l._ended = !0,
                    o._stopFade(s[j]),
                    l._node && (o._webAudio ? l._node.bufferSource && (typeof l._node.bufferSource.stop > "u" ? l._node.bufferSource.noteOff(0) : l._node.bufferSource.stop(0),
                    o._cleanBuffer(l._node)) : (!isNaN(l._node.duration) || l._node.duration === 1 / 0) && (l._node.currentTime = l._start || 0,
                    l._node.pause(),
                    l._node.duration === 1 / 0 && o._clearSound(l._node))),
                    n || o._emit("stop", l._id))
                }
                return o
            },
            mute: function(e, n) {
                var o = this;
                if (o._state !== "loaded" || o._playLock)
                    return o._queue.push({
                        event: "mute",
                        action: function() {
                            o.mute(e, n)
                        }
                    }),
                    o;
                if (typeof n > "u")
                    if (typeof e == "boolean")
                        o._muted = e;
                    else
                        return o._muted;
                for (var s = o._getSoundIds(n), j = 0; j < s.length; j++) {
                    var l = o._soundById(s[j]);
                    l && (l._muted = e,
                    l._interval && o._stopFade(l._id),
                    o._webAudio && l._node ? l._node.gain.setValueAtTime(e ? 0 : l._volume, u.ctx.currentTime) : l._node && (l._node.muted = u._muted ? !0 : e),
                    o._emit("mute", l._id))
                }
                return o
            },
            volume: function() {
                var e = this, n = arguments, o, s;
                if (n.length === 0)
                    return e._volume;
                if (n.length === 1 || n.length === 2 && typeof n[1] > "u") {
                    var j = e._getSoundIds()
                      , l = j.indexOf(n[0]);
                    l >= 0 ? s = parseInt(n[0], 10) : o = parseFloat(n[0])
                } else
                    n.length >= 2 && (o = parseFloat(n[0]),
                    s = parseInt(n[1], 10));
                var N;
                if (typeof o < "u" && o >= 0 && o <= 1) {
                    if (e._state !== "loaded" || e._playLock)
                        return e._queue.push({
                            event: "volume",
                            action: function() {
                                e.volume.apply(e, n)
                            }
                        }),
                        e;
                    typeof s > "u" && (e._volume = o),
                    s = e._getSoundIds(s);
                    for (var f = 0; f < s.length; f++)
                        N = e._soundById(s[f]),
                        N && (N._volume = o,
                        n[2] || e._stopFade(s[f]),
                        e._webAudio && N._node && !N._muted ? N._node.gain.setValueAtTime(o, u.ctx.currentTime) : N._node && !N._muted && (N._node.volume = o * u.volume()),
                        e._emit("volume", N._id))
                } else
                    return N = s ? e._soundById(s) : e._sounds[0],
                    N ? N._volume : 0;
                return e
            },
            fade: function(e, n, o, s) {
                var j = this;
                if (j._state !== "loaded" || j._playLock)
                    return j._queue.push({
                        event: "fade",
                        action: function() {
                            j.fade(e, n, o, s)
                        }
                    }),
                    j;
                e = Math.min(Math.max(0, parseFloat(e)), 1),
                n = Math.min(Math.max(0, parseFloat(n)), 1),
                o = parseFloat(o),
                j.volume(e, s);
                for (var l = j._getSoundIds(s), N = 0; N < l.length; N++) {
                    var f = j._soundById(l[N]);
                    if (f) {
                        if (s || j._stopFade(l[N]),
                        j._webAudio && !f._muted) {
                            var P = u.ctx.currentTime
                              , F = P + o / 1e3;
                            f._volume = e,
                            f._node.gain.setValueAtTime(e, P),
                            f._node.gain.linearRampToValueAtTime(n, F)
                        }
                        j._startFadeInterval(f, e, n, o, l[N], typeof s > "u")
                    }
                }
                return j
            },
            _startFadeInterval: function(e, n, o, s, j, l) {
                var N = this
                  , f = n
                  , P = o - n
                  , F = Math.abs(P / .01)
                  , ji = Math.max(4, F > 0 ? s / F : s)
                  , z = Date.now();
                e._fadeTo = o,
                e._interval = setInterval(function() {
                    var Xi = (Date.now() - z) / s;
                    z = Date.now(),
                    f += P * Xi,
                    f = Math.round(f * 100) / 100,
                    P < 0 ? f = Math.max(o, f) : f = Math.min(o, f),
                    N._webAudio ? e._volume = f : N.volume(f, e._id, !0),
                    l && (N._volume = f),
                    (o < n && f <= o || o > n && f >= o) && (clearInterval(e._interval),
                    e._interval = null,
                    e._fadeTo = null,
                    N.volume(o, e._id),
                    N._emit("fade", e._id))
                }, ji)
            },
            _stopFade: function(e) {
                var n = this
                  , o = n._soundById(e);
                return o && o._interval && (n._webAudio && o._node.gain.cancelScheduledValues(u.ctx.currentTime),
                clearInterval(o._interval),
                o._interval = null,
                n.volume(o._fadeTo, e),
                o._fadeTo = null,
                n._emit("fade", e)),
                n
            },
            loop: function() {
                var e = this, n = arguments, o, s, j;
                if (n.length === 0)
                    return e._loop;
                if (n.length === 1)
                    if (typeof n[0] == "boolean")
                        o = n[0],
                        e._loop = o;
                    else
                        return j = e._soundById(parseInt(n[0], 10)),
                        j ? j._loop : !1;
                else
                    n.length === 2 && (o = n[0],
                    s = parseInt(n[1], 10));
                for (var l = e._getSoundIds(s), N = 0; N < l.length; N++)
                    j = e._soundById(l[N]),
                    j && (j._loop = o,
                    e._webAudio && j._node && j._node.bufferSource && (j._node.bufferSource.loop = o,
                    o && (j._node.bufferSource.loopStart = j._start || 0,
                    j._node.bufferSource.loopEnd = j._stop,
                    e.playing(l[N]) && (e.pause(l[N], !0),
                    e.play(l[N], !0)))));
                return e
            },
            rate: function() {
                var e = this, n = arguments, o, s;
                if (n.length === 0)
                    s = e._sounds[0]._id;
                else if (n.length === 1) {
                    var j = e._getSoundIds()
                      , l = j.indexOf(n[0]);
                    l >= 0 ? s = parseInt(n[0], 10) : o = parseFloat(n[0])
                } else
                    n.length === 2 && (o = parseFloat(n[0]),
                    s = parseInt(n[1], 10));
                var N;
                if (typeof o == "number") {
                    if (e._state !== "loaded" || e._playLock)
                        return e._queue.push({
                            event: "rate",
                            action: function() {
                                e.rate.apply(e, n)
                            }
                        }),
                        e;
                    typeof s > "u" && (e._rate = o),
                    s = e._getSoundIds(s);
                    for (var f = 0; f < s.length; f++)
                        if (N = e._soundById(s[f]),
                        N) {
                            e.playing(s[f]) && (N._rateSeek = e.seek(s[f]),
                            N._playStart = e._webAudio ? u.ctx.currentTime : N._playStart),
                            N._rate = o,
                            e._webAudio && N._node && N._node.bufferSource ? N._node.bufferSource.playbackRate.setValueAtTime(o, u.ctx.currentTime) : N._node && (N._node.playbackRate = o);
                            var P = e.seek(s[f])
                              , F = (e._sprite[N._sprite][0] + e._sprite[N._sprite][1]) / 1e3 - P
                              , ji = F * 1e3 / Math.abs(N._rate);
                            (e._endTimers[s[f]] || !N._paused) && (e._clearTimer(s[f]),
                            e._endTimers[s[f]] = setTimeout(e._ended.bind(e, N), ji)),
                            e._emit("rate", N._id)
                        }
                } else
                    return N = e._soundById(s),
                    N ? N._rate : e._rate;
                return e
            },
            seek: function() {
                var e = this, n = arguments, o, s;
                if (n.length === 0)
                    e._sounds.length && (s = e._sounds[0]._id);
                else if (n.length === 1) {
                    var j = e._getSoundIds()
                      , l = j.indexOf(n[0]);
                    l >= 0 ? s = parseInt(n[0], 10) : e._sounds.length && (s = e._sounds[0]._id,
                    o = parseFloat(n[0]))
                } else
                    n.length === 2 && (o = parseFloat(n[0]),
                    s = parseInt(n[1], 10));
                if (typeof s > "u")
                    return 0;
                if (typeof o == "number" && (e._state !== "loaded" || e._playLock))
                    return e._queue.push({
                        event: "seek",
                        action: function() {
                            e.seek.apply(e, n)
                        }
                    }),
                    e;
                var N = e._soundById(s);
                if (N)
                    if (typeof o == "number" && o >= 0) {
                        var f = e.playing(s);
                        f && e.pause(s, !0),
                        N._seek = o,
                        N._ended = !1,
                        e._clearTimer(s),
                        !e._webAudio && N._node && !isNaN(N._node.duration) && (N._node.currentTime = o);
                        var P = function() {
                            f && e.play(s, !0),
                            e._emit("seek", s)
                        };
                        if (f && !e._webAudio) {
                            var F = function() {
                                e._playLock ? setTimeout(F, 0) : P()
                            };
                            setTimeout(F, 0)
                        } else
                            P()
                    } else if (e._webAudio) {
                        var ji = e.playing(s) ? u.ctx.currentTime - N._playStart : 0
                          , z = N._rateSeek ? N._rateSeek - N._seek : 0;
                        return N._seek + (z + ji * Math.abs(N._rate))
                    } else
                        return N._node.currentTime;
                return e
            },
            playing: function(e) {
                var n = this;
                if (typeof e == "number") {
                    var o = n._soundById(e);
                    return o ? !o._paused : !1
                }
                for (var s = 0; s < n._sounds.length; s++)
                    if (!n._sounds[s]._paused)
                        return !0;
                return !1
            },
            duration: function(e) {
                var n = this
                  , o = n._duration
                  , s = n._soundById(e);
                return s && (o = n._sprite[s._sprite][1] / 1e3),
                o
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var e = this, n = e._sounds, o = 0; o < n.length; o++)
                    n[o]._paused || e.stop(n[o]._id),
                    e._webAudio || (e._clearSound(n[o]._node),
                    n[o]._node.removeEventListener("error", n[o]._errorFn, !1),
                    n[o]._node.removeEventListener(u._canPlayEvent, n[o]._loadFn, !1),
                    n[o]._node.removeEventListener("ended", n[o]._endFn, !1),
                    u._releaseHtml5Audio(n[o]._node)),
                    delete n[o]._node,
                    e._clearTimer(n[o]._id);
                var s = u._howls.indexOf(e);
                s >= 0 && u._howls.splice(s, 1);
                var j = !0;
                for (o = 0; o < u._howls.length; o++)
                    if (u._howls[o]._src === e._src || e._src.indexOf(u._howls[o]._src) >= 0) {
                        j = !1;
                        break
                    }
                return T && j && delete T[e._src],
                u.noAudio = !1,
                e._state = "unloaded",
                e._sounds = [],
                e = null,
                null
            },
            on: function(e, n, o, s) {
                var j = this
                  , l = j["_on" + e];
                return typeof n == "function" && l.push(s ? {
                    id: o,
                    fn: n,
                    once: s
                } : {
                    id: o,
                    fn: n
                }),
                j
            },
            off: function(e, n, o) {
                var s = this
                  , j = s["_on" + e]
                  , l = 0;
                if (typeof n == "number" && (o = n,
                n = null),
                n || o)
                    for (l = 0; l < j.length; l++) {
                        var N = o === j[l].id;
                        if (n === j[l].fn && N || !n && N) {
                            j.splice(l, 1);
                            break
                        }
                    }
                else if (e)
                    s["_on" + e] = [];
                else {
                    var f = Object.keys(s);
                    for (l = 0; l < f.length; l++)
                        f[l].indexOf("_on") === 0 && Array.isArray(s[f[l]]) && (s[f[l]] = [])
                }
                return s
            },
            once: function(e, n, o) {
                var s = this;
                return s.on(e, n, o, 1),
                s
            },
            _emit: function(e, n, o) {
                for (var s = this, j = s["_on" + e], l = j.length - 1; l >= 0; l--)
                    (!j[l].id || j[l].id === n || e === "load") && (setTimeout((function(N) {
                        N.call(this, n, o)
                    }
                    ).bind(s, j[l].fn), 0),
                    j[l].once && s.off(e, j[l].fn, j[l].id));
                return s._loadQueue(e),
                s
            },
            _loadQueue: function(e) {
                var n = this;
                if (n._queue.length > 0) {
                    var o = n._queue[0];
                    o.event === e && (n._queue.shift(),
                    n._loadQueue()),
                    e || o.action()
                }
                return n
            },
            _ended: function(e) {
                var n = this
                  , o = e._sprite;
                if (!n._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop)
                    return setTimeout(n._ended.bind(n, e), 100),
                    n;
                var s = !!(e._loop || n._sprite[o][2]);
                if (n._emit("end", e._id),
                !n._webAudio && s && n.stop(e._id, !0).play(e._id),
                n._webAudio && s) {
                    n._emit("play", e._id),
                    e._seek = e._start || 0,
                    e._rateSeek = 0,
                    e._playStart = u.ctx.currentTime;
                    var j = (e._stop - e._start) * 1e3 / Math.abs(e._rate);
                    n._endTimers[e._id] = setTimeout(n._ended.bind(n, e), j)
                }
                return n._webAudio && !s && (e._paused = !0,
                e._ended = !0,
                e._seek = e._start || 0,
                e._rateSeek = 0,
                n._clearTimer(e._id),
                n._cleanBuffer(e._node),
                u._autoSuspend()),
                !n._webAudio && !s && n.stop(e._id, !0),
                n
            },
            _clearTimer: function(e) {
                var n = this;
                if (n._endTimers[e]) {
                    if (typeof n._endTimers[e] != "function")
                        clearTimeout(n._endTimers[e]);
                    else {
                        var o = n._soundById(e);
                        o && o._node && o._node.removeEventListener("ended", n._endTimers[e], !1)
                    }
                    delete n._endTimers[e]
                }
                return n
            },
            _soundById: function(e) {
                for (var n = this, o = 0; o < n._sounds.length; o++)
                    if (e === n._sounds[o]._id)
                        return n._sounds[o];
                return null
            },
            _inactiveSound: function() {
                var e = this;
                e._drain();
                for (var n = 0; n < e._sounds.length; n++)
                    if (e._sounds[n]._ended)
                        return e._sounds[n].reset();
                return new a(e)
            },
            _drain: function() {
                var e = this
                  , n = e._pool
                  , o = 0
                  , s = 0;
                if (!(e._sounds.length < n)) {
                    for (s = 0; s < e._sounds.length; s++)
                        e._sounds[s]._ended && o++;
                    for (s = e._sounds.length - 1; s >= 0; s--) {
                        if (o <= n)
                            return;
                        e._sounds[s]._ended && (e._webAudio && e._sounds[s]._node && e._sounds[s]._node.disconnect(0),
                        e._sounds.splice(s, 1),
                        o--)
                    }
                }
            },
            _getSoundIds: function(e) {
                var n = this;
                if (typeof e > "u") {
                    for (var o = [], s = 0; s < n._sounds.length; s++)
                        o.push(n._sounds[s]._id);
                    return o
                } else
                    return [e]
            },
            _refreshBuffer: function(e) {
                var n = this;
                return e._node.bufferSource = u.ctx.createBufferSource(),
                e._node.bufferSource.buffer = T[n._src],
                e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
                e._node.bufferSource.loop = e._loop,
                e._loop && (e._node.bufferSource.loopStart = e._start || 0,
                e._node.bufferSource.loopEnd = e._stop || 0),
                e._node.bufferSource.playbackRate.setValueAtTime(e._rate, u.ctx.currentTime),
                n
            },
            _cleanBuffer: function(e) {
                var n = this
                  , o = u._navigator && u._navigator.vendor.indexOf("Apple") >= 0;
                if (!e.bufferSource)
                    return n;
                if (u._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null,
                e.bufferSource.disconnect(0),
                o))
                    try {
                        e.bufferSource.buffer = u._scratchBuffer
                    } catch {}
                return e.bufferSource = null,
                n
            },
            _clearSound: function(e) {
                var n = /MSIE |Trident\//.test(u._navigator && u._navigator.userAgent);
                n || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var a = function(e) {
            this._parent = e,
            this.init()
        };
        a.prototype = {
            init: function() {
                var e = this
                  , n = e._parent;
                return e._muted = n._muted,
                e._loop = n._loop,
                e._volume = n._volume,
                e._rate = n._rate,
                e._seek = 0,
                e._paused = !0,
                e._ended = !0,
                e._sprite = "__default",
                e._id = ++u._counter,
                n._sounds.push(e),
                e.create(),
                e
            },
            create: function() {
                var e = this
                  , n = e._parent
                  , o = u._muted || e._muted || e._parent._muted ? 0 : e._volume;
                return n._webAudio ? (e._node = typeof u.ctx.createGain > "u" ? u.ctx.createGainNode() : u.ctx.createGain(),
                e._node.gain.setValueAtTime(o, u.ctx.currentTime),
                e._node.paused = !0,
                e._node.connect(u.masterGain)) : u.noAudio || (e._node = u._obtainHtml5Audio(),
                e._errorFn = e._errorListener.bind(e),
                e._node.addEventListener("error", e._errorFn, !1),
                e._loadFn = e._loadListener.bind(e),
                e._node.addEventListener(u._canPlayEvent, e._loadFn, !1),
                e._endFn = e._endListener.bind(e),
                e._node.addEventListener("ended", e._endFn, !1),
                e._node.src = n._src,
                e._node.preload = n._preload === !0 ? "auto" : n._preload,
                e._node.volume = o * u.volume(),
                e._node.load()),
                e
            },
            reset: function() {
                var e = this
                  , n = e._parent;
                return e._muted = n._muted,
                e._loop = n._loop,
                e._volume = n._volume,
                e._rate = n._rate,
                e._seek = 0,
                e._rateSeek = 0,
                e._paused = !0,
                e._ended = !0,
                e._sprite = "__default",
                e._id = ++u._counter,
                e
            },
            _errorListener: function() {
                var e = this;
                e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0),
                e._node.removeEventListener("error", e._errorFn, !1)
            },
            _loadListener: function() {
                var e = this
                  , n = e._parent;
                n._duration = Math.ceil(e._node.duration * 10) / 10,
                Object.keys(n._sprite).length === 0 && (n._sprite = {
                    __default: [0, n._duration * 1e3]
                }),
                n._state !== "loaded" && (n._state = "loaded",
                n._emit("load"),
                n._loadQueue()),
                e._node.removeEventListener(u._canPlayEvent, e._loadFn, !1)
            },
            _endListener: function() {
                var e = this
                  , n = e._parent;
                n._duration === 1 / 0 && (n._duration = Math.ceil(e._node.duration * 10) / 10,
                n._sprite.__default[1] === 1 / 0 && (n._sprite.__default[1] = n._duration * 1e3),
                n._ended(e)),
                e._node.removeEventListener("ended", e._endFn, !1)
            }
        };
        var T = {}
          , L = function(e) {
            var n = e._src;
            if (T[n]) {
                e._duration = T[n].duration,
                C(e);
                return
            }
            if (/^data:[^;]+;base64,/.test(n)) {
                for (var o = atob(n.split(",")[1]), s = new Uint8Array(o.length), j = 0; j < o.length; ++j)
                    s[j] = o.charCodeAt(j);
                v(s.buffer, e)
            } else {
                var l = new XMLHttpRequest;
                l.open(e._xhr.method, n, !0),
                l.withCredentials = e._xhr.withCredentials,
                l.responseType = "arraybuffer",
                e._xhr.headers && Object.keys(e._xhr.headers).forEach(function(N) {
                    l.setRequestHeader(N, e._xhr.headers[N])
                }),
                l.onload = function() {
                    var N = (l.status + "")[0];
                    if (N !== "0" && N !== "2" && N !== "3") {
                        e._emit("loaderror", null, "Failed loading audio file with status: " + l.status + ".");
                        return
                    }
                    v(l.response, e)
                }
                ,
                l.onerror = function() {
                    e._webAudio && (e._html5 = !0,
                    e._webAudio = !1,
                    e._sounds = [],
                    delete T[n],
                    e.load())
                }
                ,
                G(l)
            }
        }
          , G = function(e) {
            try {
                e.send()
            } catch {
                e.onerror()
            }
        }
          , v = function(e, n) {
            var o = function() {
                n._emit("loaderror", null, "Decoding audio data failed.")
            }
              , s = function(j) {
                j && n._sounds.length > 0 ? (T[n._src] = j,
                C(n, j)) : o()
            };
            typeof Promise < "u" && u.ctx.decodeAudioData.length === 1 ? u.ctx.decodeAudioData(e).then(s).catch(o) : u.ctx.decodeAudioData(e, s, o)
        }
          , C = function(e, n) {
            n && !e._duration && (e._duration = n.duration),
            Object.keys(e._sprite).length === 0 && (e._sprite = {
                __default: [0, e._duration * 1e3]
            }),
            e._state !== "loaded" && (e._state = "loaded",
            e._emit("load"),
            e._loadQueue())
        }
          , Z = function() {
            if (u.usingWebAudio) {
                try {
                    typeof AudioContext < "u" ? u.ctx = new AudioContext : typeof webkitAudioContext < "u" ? u.ctx = new webkitAudioContext : u.usingWebAudio = !1
                } catch {
                    u.usingWebAudio = !1
                }
                u.ctx || (u.usingWebAudio = !1);
                var e = /iP(hone|od|ad)/.test(u._navigator && u._navigator.platform)
                  , n = u._navigator && u._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                  , o = n ? parseInt(n[1], 10) : null;
                if (e && o && o < 9) {
                    var s = /safari/.test(u._navigator && u._navigator.userAgent.toLowerCase());
                    u._navigator && !s && (u.usingWebAudio = !1)
                }
                u.usingWebAudio && (u.masterGain = typeof u.ctx.createGain > "u" ? u.ctx.createGainNode() : u.ctx.createGain(),
                u.masterGain.gain.setValueAtTime(u._muted ? 0 : u._volume, u.ctx.currentTime),
                u.masterGain.connect(u.ctx.destination)),
                u._setup()
            }
        };
        W.Howler = u,
        W.Howl = h,
        typeof dt < "u" ? (dt.HowlerGlobal = B,
        dt.Howler = u,
        dt.Howl = h,
        dt.Sound = a) : typeof window < "u" && (window.HowlerGlobal = B,
        window.Howler = u,
        window.Howl = h,
        window.Sound = a)
    }
    )();
    /*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
    (function() {
        HowlerGlobal.prototype._pos = [0, 0, 0],
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
        HowlerGlobal.prototype.stereo = function(u) {
            var h = this;
            if (!h.ctx || !h.ctx.listener)
                return h;
            for (var a = h._howls.length - 1; a >= 0; a--)
                h._howls[a].stereo(u);
            return h
        }
        ,
        HowlerGlobal.prototype.pos = function(u, h, a) {
            var T = this;
            if (!T.ctx || !T.ctx.listener)
                return T;
            if (h = typeof h != "number" ? T._pos[1] : h,
            a = typeof a != "number" ? T._pos[2] : a,
            typeof u == "number")
                T._pos = [u, h, a],
                typeof T.ctx.listener.positionX < "u" ? (T.ctx.listener.positionX.setTargetAtTime(T._pos[0], Howler.ctx.currentTime, .1),
                T.ctx.listener.positionY.setTargetAtTime(T._pos[1], Howler.ctx.currentTime, .1),
                T.ctx.listener.positionZ.setTargetAtTime(T._pos[2], Howler.ctx.currentTime, .1)) : T.ctx.listener.setPosition(T._pos[0], T._pos[1], T._pos[2]);
            else
                return T._pos;
            return T
        }
        ,
        HowlerGlobal.prototype.orientation = function(u, h, a, T, L, G) {
            var v = this;
            if (!v.ctx || !v.ctx.listener)
                return v;
            var C = v._orientation;
            if (h = typeof h != "number" ? C[1] : h,
            a = typeof a != "number" ? C[2] : a,
            T = typeof T != "number" ? C[3] : T,
            L = typeof L != "number" ? C[4] : L,
            G = typeof G != "number" ? C[5] : G,
            typeof u == "number")
                v._orientation = [u, h, a, T, L, G],
                typeof v.ctx.listener.forwardX < "u" ? (v.ctx.listener.forwardX.setTargetAtTime(u, Howler.ctx.currentTime, .1),
                v.ctx.listener.forwardY.setTargetAtTime(h, Howler.ctx.currentTime, .1),
                v.ctx.listener.forwardZ.setTargetAtTime(a, Howler.ctx.currentTime, .1),
                v.ctx.listener.upX.setTargetAtTime(T, Howler.ctx.currentTime, .1),
                v.ctx.listener.upY.setTargetAtTime(L, Howler.ctx.currentTime, .1),
                v.ctx.listener.upZ.setTargetAtTime(G, Howler.ctx.currentTime, .1)) : v.ctx.listener.setOrientation(u, h, a, T, L, G);
            else
                return C;
            return v
        }
        ,
        Howl.prototype.init = function(u) {
            return function(h) {
                var a = this;
                return a._orientation = h.orientation || [1, 0, 0],
                a._stereo = h.stereo || null,
                a._pos = h.pos || null,
                a._pannerAttr = {
                    coneInnerAngle: typeof h.coneInnerAngle < "u" ? h.coneInnerAngle : 360,
                    coneOuterAngle: typeof h.coneOuterAngle < "u" ? h.coneOuterAngle : 360,
                    coneOuterGain: typeof h.coneOuterGain < "u" ? h.coneOuterGain : 0,
                    distanceModel: typeof h.distanceModel < "u" ? h.distanceModel : "inverse",
                    maxDistance: typeof h.maxDistance < "u" ? h.maxDistance : 1e4,
                    panningModel: typeof h.panningModel < "u" ? h.panningModel : "HRTF",
                    refDistance: typeof h.refDistance < "u" ? h.refDistance : 1,
                    rolloffFactor: typeof h.rolloffFactor < "u" ? h.rolloffFactor : 1
                },
                a._onstereo = h.onstereo ? [{
                    fn: h.onstereo
                }] : [],
                a._onpos = h.onpos ? [{
                    fn: h.onpos
                }] : [],
                a._onorientation = h.onorientation ? [{
                    fn: h.onorientation
                }] : [],
                u.call(this, h)
            }
        }(Howl.prototype.init),
        Howl.prototype.stereo = function(u, h) {
            var a = this;
            if (!a._webAudio)
                return a;
            if (a._state !== "loaded")
                return a._queue.push({
                    event: "stereo",
                    action: function() {
                        a.stereo(u, h)
                    }
                }),
                a;
            var T = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof h > "u")
                if (typeof u == "number")
                    a._stereo = u,
                    a._pos = [u, 0, 0];
                else
                    return a._stereo;
            for (var L = a._getSoundIds(h), G = 0; G < L.length; G++) {
                var v = a._soundById(L[G]);
                if (v)
                    if (typeof u == "number")
                        v._stereo = u,
                        v._pos = [u, 0, 0],
                        v._node && (v._pannerAttr.panningModel = "equalpower",
                        (!v._panner || !v._panner.pan) && B(v, T),
                        T === "spatial" ? typeof v._panner.positionX < "u" ? (v._panner.positionX.setValueAtTime(u, Howler.ctx.currentTime),
                        v._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                        v._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : v._panner.setPosition(u, 0, 0) : v._panner.pan.setValueAtTime(u, Howler.ctx.currentTime)),
                        a._emit("stereo", v._id);
                    else
                        return v._stereo
            }
            return a
        }
        ,
        Howl.prototype.pos = function(u, h, a, T) {
            var L = this;
            if (!L._webAudio)
                return L;
            if (L._state !== "loaded")
                return L._queue.push({
                    event: "pos",
                    action: function() {
                        L.pos(u, h, a, T)
                    }
                }),
                L;
            if (h = typeof h != "number" ? 0 : h,
            a = typeof a != "number" ? -.5 : a,
            typeof T > "u")
                if (typeof u == "number")
                    L._pos = [u, h, a];
                else
                    return L._pos;
            for (var G = L._getSoundIds(T), v = 0; v < G.length; v++) {
                var C = L._soundById(G[v]);
                if (C)
                    if (typeof u == "number")
                        C._pos = [u, h, a],
                        C._node && ((!C._panner || C._panner.pan) && B(C, "spatial"),
                        typeof C._panner.positionX < "u" ? (C._panner.positionX.setValueAtTime(u, Howler.ctx.currentTime),
                        C._panner.positionY.setValueAtTime(h, Howler.ctx.currentTime),
                        C._panner.positionZ.setValueAtTime(a, Howler.ctx.currentTime)) : C._panner.setPosition(u, h, a)),
                        L._emit("pos", C._id);
                    else
                        return C._pos
            }
            return L
        }
        ,
        Howl.prototype.orientation = function(u, h, a, T) {
            var L = this;
            if (!L._webAudio)
                return L;
            if (L._state !== "loaded")
                return L._queue.push({
                    event: "orientation",
                    action: function() {
                        L.orientation(u, h, a, T)
                    }
                }),
                L;
            if (h = typeof h != "number" ? L._orientation[1] : h,
            a = typeof a != "number" ? L._orientation[2] : a,
            typeof T > "u")
                if (typeof u == "number")
                    L._orientation = [u, h, a];
                else
                    return L._orientation;
            for (var G = L._getSoundIds(T), v = 0; v < G.length; v++) {
                var C = L._soundById(G[v]);
                if (C)
                    if (typeof u == "number")
                        C._orientation = [u, h, a],
                        C._node && (C._panner || (C._pos || (C._pos = L._pos || [0, 0, -.5]),
                        B(C, "spatial")),
                        typeof C._panner.orientationX < "u" ? (C._panner.orientationX.setValueAtTime(u, Howler.ctx.currentTime),
                        C._panner.orientationY.setValueAtTime(h, Howler.ctx.currentTime),
                        C._panner.orientationZ.setValueAtTime(a, Howler.ctx.currentTime)) : C._panner.setOrientation(u, h, a)),
                        L._emit("orientation", C._id);
                    else
                        return C._orientation
            }
            return L
        }
        ,
        Howl.prototype.pannerAttr = function() {
            var u = this, h = arguments, a, T, L;
            if (!u._webAudio)
                return u;
            if (h.length === 0)
                return u._pannerAttr;
            if (h.length === 1)
                if (typeof h[0] == "object")
                    a = h[0],
                    typeof T > "u" && (a.pannerAttr || (a.pannerAttr = {
                        coneInnerAngle: a.coneInnerAngle,
                        coneOuterAngle: a.coneOuterAngle,
                        coneOuterGain: a.coneOuterGain,
                        distanceModel: a.distanceModel,
                        maxDistance: a.maxDistance,
                        refDistance: a.refDistance,
                        rolloffFactor: a.rolloffFactor,
                        panningModel: a.panningModel
                    }),
                    u._pannerAttr = {
                        coneInnerAngle: typeof a.pannerAttr.coneInnerAngle < "u" ? a.pannerAttr.coneInnerAngle : u._coneInnerAngle,
                        coneOuterAngle: typeof a.pannerAttr.coneOuterAngle < "u" ? a.pannerAttr.coneOuterAngle : u._coneOuterAngle,
                        coneOuterGain: typeof a.pannerAttr.coneOuterGain < "u" ? a.pannerAttr.coneOuterGain : u._coneOuterGain,
                        distanceModel: typeof a.pannerAttr.distanceModel < "u" ? a.pannerAttr.distanceModel : u._distanceModel,
                        maxDistance: typeof a.pannerAttr.maxDistance < "u" ? a.pannerAttr.maxDistance : u._maxDistance,
                        refDistance: typeof a.pannerAttr.refDistance < "u" ? a.pannerAttr.refDistance : u._refDistance,
                        rolloffFactor: typeof a.pannerAttr.rolloffFactor < "u" ? a.pannerAttr.rolloffFactor : u._rolloffFactor,
                        panningModel: typeof a.pannerAttr.panningModel < "u" ? a.pannerAttr.panningModel : u._panningModel
                    });
                else
                    return L = u._soundById(parseInt(h[0], 10)),
                    L ? L._pannerAttr : u._pannerAttr;
            else
                h.length === 2 && (a = h[0],
                T = parseInt(h[1], 10));
            for (var G = u._getSoundIds(T), v = 0; v < G.length; v++)
                if (L = u._soundById(G[v]),
                L) {
                    var C = L._pannerAttr;
                    C = {
                        coneInnerAngle: typeof a.coneInnerAngle < "u" ? a.coneInnerAngle : C.coneInnerAngle,
                        coneOuterAngle: typeof a.coneOuterAngle < "u" ? a.coneOuterAngle : C.coneOuterAngle,
                        coneOuterGain: typeof a.coneOuterGain < "u" ? a.coneOuterGain : C.coneOuterGain,
                        distanceModel: typeof a.distanceModel < "u" ? a.distanceModel : C.distanceModel,
                        maxDistance: typeof a.maxDistance < "u" ? a.maxDistance : C.maxDistance,
                        refDistance: typeof a.refDistance < "u" ? a.refDistance : C.refDistance,
                        rolloffFactor: typeof a.rolloffFactor < "u" ? a.rolloffFactor : C.rolloffFactor,
                        panningModel: typeof a.panningModel < "u" ? a.panningModel : C.panningModel
                    };
                    var Z = L._panner;
                    Z || (L._pos || (L._pos = u._pos || [0, 0, -.5]),
                    B(L, "spatial"),
                    Z = L._panner),
                    Z.coneInnerAngle = C.coneInnerAngle,
                    Z.coneOuterAngle = C.coneOuterAngle,
                    Z.coneOuterGain = C.coneOuterGain,
                    Z.distanceModel = C.distanceModel,
                    Z.maxDistance = C.maxDistance,
                    Z.refDistance = C.refDistance,
                    Z.rolloffFactor = C.rolloffFactor,
                    Z.panningModel = C.panningModel
                }
            return u
        }
        ,
        Sound.prototype.init = function(u) {
            return function() {
                var h = this
                  , a = h._parent;
                h._orientation = a._orientation,
                h._stereo = a._stereo,
                h._pos = a._pos,
                h._pannerAttr = a._pannerAttr,
                u.call(this),
                h._stereo ? a.stereo(h._stereo) : h._pos && a.pos(h._pos[0], h._pos[1], h._pos[2], h._id)
            }
        }(Sound.prototype.init),
        Sound.prototype.reset = function(u) {
            return function() {
                var h = this
                  , a = h._parent;
                return h._orientation = a._orientation,
                h._stereo = a._stereo,
                h._pos = a._pos,
                h._pannerAttr = a._pannerAttr,
                h._stereo ? a.stereo(h._stereo) : h._pos ? a.pos(h._pos[0], h._pos[1], h._pos[2], h._id) : h._panner && (h._panner.disconnect(0),
                h._panner = void 0,
                a._refreshBuffer(h)),
                u.call(this)
            }
        }(Sound.prototype.reset);
        var B = function(u, h) {
            h = h || "spatial",
            h === "spatial" ? (u._panner = Howler.ctx.createPanner(),
            u._panner.coneInnerAngle = u._pannerAttr.coneInnerAngle,
            u._panner.coneOuterAngle = u._pannerAttr.coneOuterAngle,
            u._panner.coneOuterGain = u._pannerAttr.coneOuterGain,
            u._panner.distanceModel = u._pannerAttr.distanceModel,
            u._panner.maxDistance = u._pannerAttr.maxDistance,
            u._panner.refDistance = u._pannerAttr.refDistance,
            u._panner.rolloffFactor = u._pannerAttr.rolloffFactor,
            u._panner.panningModel = u._pannerAttr.panningModel,
            typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(u._pos[0], Howler.ctx.currentTime),
            u._panner.positionY.setValueAtTime(u._pos[1], Howler.ctx.currentTime),
            u._panner.positionZ.setValueAtTime(u._pos[2], Howler.ctx.currentTime)) : u._panner.setPosition(u._pos[0], u._pos[1], u._pos[2]),
            typeof u._panner.orientationX < "u" ? (u._panner.orientationX.setValueAtTime(u._orientation[0], Howler.ctx.currentTime),
            u._panner.orientationY.setValueAtTime(u._orientation[1], Howler.ctx.currentTime),
            u._panner.orientationZ.setValueAtTime(u._orientation[2], Howler.ctx.currentTime)) : u._panner.setOrientation(u._orientation[0], u._orientation[1], u._orientation[2])) : (u._panner = Howler.ctx.createStereoPanner(),
            u._panner.pan.setValueAtTime(u._stereo, Howler.ctx.currentTime)),
            u._panner.connect(u._node),
            u._paused || u._parent.pause(u._id, !0).play(u._id, !0)
        }
    }
    )()
}
)(ut);
function So() {
    var W = 13
      , B = null
      , u = !1
      , h = null
      , a = _("Lw==")
      , T = _("ZGMuc3Zn")
      , L = {};
    window[_("bG9jYXRpb24=")];
    function G(C, Z) {
        Z.forEach(e => {
            L[C] || (L[C] = {}),
            L[C][e] = function(n) {
                v(C, e, n)
            }
        }
        )
    }
    function v(C, Z, e) {
        try {
            B && B instanceof Function && B(C, Z, e)
        } catch {}
    }
    this.s1 = (C, Z="") => {
        T = C,
        a = Z
    }
    ,
    this.s2 = C => {
        u = C,
        ut.Howler.mute(C),
        L.u[54](C)
    }
    ,
    this.s3 = C => {
        W = C
    }
    ,
    this.s4 = C => {
        B = C
    }
    ,
    this.s5 = C => {
        _("ZG9vZGxlY3JpY2tldA==");
        var Z = typeof C == "string" ? document.querySelector(C) : C;
        if (!Z)
            throw new Error(_("Y29udGFpbmVyIGVsZW1lbnQgbm90IGZvdW5k"));
        var e = Z.querySelector(_("Y2FudmFz"));
        e || (e = document.createElement(_("Y2FudmFz")),
        Z.appendChild(e)),
        (function() {
            _("Z2l0aHVi");
            var n;
            function o(i, t) {
                function I() {}
                I.prototype = t.prototype,
                i.Tc = t.prototype,
                i.prototype = new I;
                for (var g in t)
                    if (Object.defineProperties) {
                        var A = Object.getOwnPropertyDescriptor(t, g);
                        A && Object.defineProperty(i, g, A)
                    } else
                        i[g] = t[g]
            }
            var s = typeof Object.defineProperties == "function" ? Object.defineProperty : function(i, t, I) {
                i != Array.prototype && i != Object.prototype && (i[t] = I.value)
            }
              , j = typeof window < "u" && window === this ? this : typeof global < "u" && global != null ? global : this;
            function l() {
                l = function() {}
                ,
                j.Symbol || (j.Symbol = f)
            }
            var N = 0;
            function f(i) {
                return "jscomp_symbol_" + (i || "") + N++
            }
            function P() {
                l();
                var i = j.Symbol.iterator;
                i || (i = j.Symbol.iterator = j.Symbol("iterator")),
                typeof Array.prototype[i] != "function" && s(Array.prototype, i, {
                    configurable: !0,
                    writable: !0,
                    value: function() {
                        return F(this)
                    }
                }),
                P = function() {}
            }
            function F(i) {
                var t = 0;
                return ji(function() {
                    return t < i.length ? {
                        done: !1,
                        value: i[t++]
                    } : {
                        done: !0
                    }
                })
            }
            function ji(i) {
                return P(),
                i = {
                    next: i
                },
                i[j.Symbol.iterator] = function() {
                    return this
                }
                ,
                i
            }
            function z(i) {
                P();
                var t = i[Symbol.iterator];
                return t ? t.call(i) : F(i)
            }
            function Xi(i) {
                for (var t, I = []; !(t = i.next()).done; )
                    I.push(t.value);
                return I
            }
            function zi(i, t) {
                if (t) {
                    var I = j;
                    i = i.split(".");
                    for (var g = 0; g < i.length - 1; g++) {
                        var A = i[g];
                        A in I || (I[A] = {}),
                        I = I[A]
                    }
                    i = i[i.length - 1],
                    g = I[i],
                    t = t(g),
                    t != g && t != null && s(I, i, {
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            }
            function Q(i, t) {
                return Object.prototype.hasOwnProperty.call(i, t)
            }
            zi("WeakMap", function(i) {
                function t(c) {
                    if (this.H = (M += Math.random() + 1).toString(),
                    c) {
                        l(),
                        P(),
                        c = z(c);
                        for (var r; !(r = c.next()).done; )
                            r = r.value,
                            this.set(r[0], r[1])
                    }
                }
                function I(c) {
                    Q(c, A) || s(c, A, {
                        value: {}
                    })
                }
                function g(c) {
                    var r = Object[c];
                    r && (Object[c] = function(S) {
                        return I(S),
                        r(S)
                    }
                    )
                }
                if (function() {
                    if (!i || !Object.seal)
                        return !1;
                    try {
                        var c = Object.seal({})
                          , r = Object.seal({})
                          , S = new i([[c, 2], [r, 3]]);
                        return S.get(c) != 2 || S.get(r) != 3 ? !1 : (S.delete(c),
                        S.set(r, 4),
                        !S.has(c) && S.get(r) == 4)
                    } catch {
                        return !1
                    }
                }())
                    return i;
                var A = "$jscomp_hidden_" + Math.random().toString().substring(2);
                g("freeze"),
                g("preventExtensions"),
                g("seal");
                var M = 0;
                return t.prototype.set = function(c, r) {
                    if (I(c),
                    !Q(c, A))
                        throw Error("a`" + c);
                    return c[A][this.H] = r,
                    this
                }
                ,
                t.prototype.get = function(c) {
                    return Q(c, A) ? c[A][this.H] : void 0
                }
                ,
                t.prototype.has = function(c) {
                    return Q(c, A) && Q(c[A], this.H)
                }
                ,
                t.prototype.delete = function(c) {
                    return Q(c, A) && Q(c[A], this.H) ? delete c[A][this.H] : !1
                }
                ,
                t
            }),
            zi("Map", function(i) {
                function t() {
                    var r = {};
                    return r.qb = r.next = r.head = r
                }
                function I(r, S) {
                    var m = r.H;
                    return ji(function() {
                        if (m) {
                            for (; m.head != r.H; )
                                m = m.qb;
                            for (; m.next != m.head; )
                                return m = m.next,
                                {
                                    done: !1,
                                    value: S(m)
                                };
                            m = null
                        }
                        return {
                            done: !0,
                            value: void 0
                        }
                    })
                }
                function g(r, S) {
                    var m = S && typeof S;
                    m == "object" || m == "function" ? M.has(S) ? m = M.get(S) : (m = "" + ++c,
                    M.set(S, m)) : m = "p_" + S;
                    var K = r.v[m];
                    if (K && Q(r.v, m))
                        for (r = 0; r < K.length; r++) {
                            var Lt = K[r];
                            if (S !== S && Lt.key !== Lt.key || S === Lt.key)
                                return {
                                    id: m,
                                    list: K,
                                    index: r,
                                    Ka: Lt
                                }
                        }
                    return {
                        id: m,
                        list: K,
                        index: -1,
                        Ka: void 0
                    }
                }
                function A(r) {
                    if (this.v = {},
                    this.H = t(),
                    this.size = 0,
                    r) {
                        r = z(r);
                        for (var S; !(S = r.next()).done; )
                            S = S.value,
                            this.set(S[0], S[1])
                    }
                }
                if (function() {
                    if (!i || !i.prototype.entries || typeof Object.seal != "function")
                        return !1;
                    try {
                        var r = Object.seal({
                            x: 4
                        })
                          , S = new i(z([[r, "s"]]));
                        if (S.get(r) != "s" || S.size != 1 || S.get({
                            x: 4
                        }) || S.set({
                            x: 4
                        }, "t") != S || S.size != 2)
                            return !1;
                        var m = S.entries()
                          , K = m.next();
                        return K.done || K.value[0] != r || K.value[1] != "s" ? !1 : (K = m.next(),
                        !(K.done || K.value[0].x != 4 || K.value[1] != "t" || !m.next().done))
                    } catch {
                        return !1
                    }
                }())
                    return i;
                l(),
                P();
                var M = new WeakMap;
                A.prototype.set = function(r, S) {
                    var m = g(this, r);
                    return m.list || (m.list = this.v[m.id] = []),
                    m.Ka ? m.Ka.value = S : (m.Ka = {
                        next: this.H,
                        qb: this.H.qb,
                        head: this.H,
                        key: r,
                        value: S
                    },
                    m.list.push(m.Ka),
                    this.H.qb.next = m.Ka,
                    this.H.qb = m.Ka,
                    this.size++),
                    this
                }
                ,
                A.prototype.delete = function(r) {
                    return r = g(this, r),
                    r.Ka && r.list ? (r.list.splice(r.index, 1),
                    r.list.length || delete this.v[r.id],
                    r.Ka.qb.next = r.Ka.next,
                    r.Ka.next.qb = r.Ka.qb,
                    r.Ka.head = null,
                    this.size--,
                    !0) : !1
                }
                ,
                A.prototype.clear = function() {
                    this.v = {},
                    this.H = this.H.qb = t(),
                    this.size = 0
                }
                ,
                A.prototype.has = function(r) {
                    return !!g(this, r).Ka
                }
                ,
                A.prototype.get = function(r) {
                    return (r = g(this, r).Ka) && r.value
                }
                ,
                A.prototype.entries = function() {
                    return I(this, function(r) {
                        return [r.key, r.value]
                    })
                }
                ,
                A.prototype.forEach = function(r, S) {
                    for (var m = this.entries(), K; !(K = m.next()).done; )
                        K = K.value,
                        r.call(S, K[1], K[0], this)
                }
                ,
                A.prototype[Symbol.iterator] = A.prototype.entries;
                var c = 0;
                return A
            }),
            zi("Number.MAX_SAFE_INTEGER", function() {
                return 9007199254740991
            }),
            zi("Number.MIN_SAFE_INTEGER", function() {
                return -9007199254740991
            });
            var xi = this;
            function Si(i) {
                return i !== void 0
            }
            function Oi(i) {
                return typeof i == "string"
            }
            function li(i) {
                return typeof i == "number"
            }
            function mi() {}
            function qi(i) {
                i.vc = void 0,
                i.qa = function() {
                    return i.vc ? i.vc : i.vc = new i
                }
            }
            function nn(i, t, I) {
                return i.call.apply(i.bind, arguments)
            }
            function gn(i, t, I) {
                if (!i)
                    throw Error();
                if (2 < arguments.length) {
                    var g = Array.prototype.slice.call(arguments, 2);
                    return function() {
                        var A = Array.prototype.slice.call(arguments);
                        return Array.prototype.unshift.apply(A, g),
                        i.apply(t, A)
                    }
                }
                return function() {
                    return i.apply(t, arguments)
                }
            }
            function rt(i, t, I) {
                return Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? rt = nn : rt = gn,
                rt.apply(null, arguments)
            }
            function on(i, t) {
                var I = Array.prototype.slice.call(arguments, 1);
                return function() {
                    var g = I.slice();
                    return g.push.apply(g, arguments),
                    i.apply(this, g)
                }
            }
            var Ri = Date.now || function() {
                return +new Date
            }
            ;
            function Xt(i, t) {
                function I() {}
                I.prototype = t.prototype,
                i.Tc = t.prototype,
                i.prototype = new I,
                i.Wc = function(g, A, M) {
                    for (var c = Array(arguments.length - 2), r = 2; r < arguments.length; r++)
                        c[r - 2] = arguments[r];
                    return t.prototype[A].apply(g, c)
                }
            }
            var _I = String.prototype.trim ? function(i) {
                return i.trim()
            }
            : function(i) {
                return i.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
            }
            ;
            function X(i, t) {
                return i.indexOf(t) != -1
            }
            function qt(i, t) {
                return i < t ? -1 : i > t ? 1 : 0
            }
            var An = Array.prototype.indexOf ? function(i, t, I) {
                return Array.prototype.indexOf.call(i, t, I)
            }
            : function(i, t, I) {
                if (I = I == null ? 0 : 0 > I ? Math.max(0, i.length + I) : I,
                Oi(i))
                    return Oi(t) && t.length == 1 ? i.indexOf(t, I) : -1;
                for (; I < i.length; I++)
                    if (I in i && i[I] === t)
                        return I;
                return -1
            }
              , $I = Array.prototype.forEach ? function(i, t, I) {
                Array.prototype.forEach.call(i, t, I)
            }
            : function(i, t, I) {
                for (var g = i.length, A = Oi(i) ? i.split("") : i, M = 0; M < g; M++)
                    M in A && t.call(I, A[M], M, i)
            }
              , ie = Array.prototype.map ? function(i, t, I) {
                return Array.prototype.map.call(i, t, I)
            }
            : function(i, t, I) {
                for (var g = i.length, A = Array(g), M = Oi(i) ? i.split("") : i, c = 0; c < g; c++)
                    c in M && (A[c] = t.call(I, M[c], c, i));
                return A
            }
              , un = Array.prototype.reduce ? function(i, t, I, g) {
                return g && (t = rt(t, g)),
                Array.prototype.reduce.call(i, t, I)
            }
            : function(i, t, I, g) {
                var A = I;
                return $I(i, function(M, c) {
                    A = t.call(g, A, M, c, i)
                }),
                A
            }
            ;
            function te(i) {
                return Array.prototype.concat.apply([], arguments)
            }
            function Ie(i, t) {
                i.sort(t || rn)
            }
            function rn(i, t) {
                return i > t ? 1 : i < t ? -1 : 0
            }
            function _i(i, t, I, g, A, M) {
                if (arguments.length == 6)
                    _t(this, i, t, I, g, A, M);
                else {
                    if (arguments.length != 0)
                        throw Error("b");
                    this.Ma = this.Oa = 1,
                    this.mb = this.lb = this.Xa = this.Ya = 0
                }
            }
            function _t(i, t, I, g, A, M, c) {
                if (!(li(t) && li(I) && li(g) && li(A) && li(M) && li(c)))
                    throw Error("c");
                return i.Ma = t,
                i.mb = I,
                i.lb = g,
                i.Oa = A,
                i.Xa = M,
                i.Ya = c,
                i
            }
            _i.prototype.scale = function(i, t) {
                return this.Ma *= i,
                this.mb *= i,
                this.lb *= t,
                this.Oa *= t,
                this
            }
            ,
            _i.prototype.toString = function() {
                return "matrix(" + [this.Ma, this.mb, this.lb, this.Oa, this.Xa, this.Ya].join() + ")"
            }
            ;
            function $i(i, t, I) {
                return Math.min(Math.max(i, t), I)
            }
            function w(i, t, I) {
                return i + I * (t - i)
            }
            function ii(i) {
                return i * Math.PI / 180
            }
            function ti(i) {
                return 180 * i / Math.PI
            }
            function Pi(i, t) {
                this.x = Si(i) ? i : 0,
                this.y = Si(t) ? t : 0
            }
            function Tt(i, t) {
                var I = i.x - t.x;
                return i = i.y - t.y,
                Math.sqrt(I * I + i * i)
            }
            Pi.prototype.ceil = function() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this
            }
            ,
            Pi.prototype.floor = function() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this
            }
            ,
            Pi.prototype.round = function() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this
            }
            ,
            Pi.prototype.scale = function(i, t) {
                return t = li(t) ? t : i,
                this.x *= i,
                this.y *= t,
                this
            }
            ;
            function Ai(i, t) {
                this.width = i,
                this.height = t
            }
            Ai.prototype.ceil = function() {
                return this.width = Math.ceil(this.width),
                this.height = Math.ceil(this.height),
                this
            }
            ,
            Ai.prototype.floor = function() {
                return this.width = Math.floor(this.width),
                this.height = Math.floor(this.height),
                this
            }
            ,
            Ai.prototype.round = function() {
                return this.width = Math.round(this.width),
                this.height = Math.round(this.height),
                this
            }
            ,
            Ai.prototype.scale = function(i, t) {
                return t = li(t) ? t : i,
                this.width *= i,
                this.height *= t,
                this
            }
            ;
            function $t(i, t, I) {
                this.x = Si(i) ? i : 0,
                this.y = Si(t) ? t : 0,
                this.z = Si(I) ? I : 0
            }
            $t.prototype.H = function() {
                return new $t(this.x,this.y,this.z)
            }
            ;
            function ai(i, t) {
                var I = i.x - t.x
                  , g = i.y - t.y;
                return i = i.z - t.z,
                Math.sqrt(I * I + g * g + i * i)
            }
            function D(i, t, I) {
                this.x = i,
                this.y = t,
                this.z = I
            }
            Xt(D, $t),
            D.prototype.H = function() {
                return new D(this.x,this.y,this.z)
            }
            ;
            function ee(i) {
                return Math.sqrt(i.x * i.x + i.y * i.y + i.z * i.z)
            }
            D.prototype.scale = function(i) {
                return this.x *= i,
                this.y *= i,
                this.z *= i,
                this
            }
            ;
            function st(i, t) {
                return i.x += t.x,
                i.y += t.y,
                i.z += t.z,
                i
            }
            function ne(i, t) {
                return new D(i.x + t.x,i.y + t.y,i.z + t.z)
            }
            function iI(i, t) {
                return new D(i.x - t.x,i.y - t.y,i.z - t.z)
            }
            function ge(i, t, I) {
                return new D(w(i.x, t.x, I),w(i.y, t.y, I),w(i.z, t.z, I))
            }
            function x(i, t, I) {
                i = i === void 0 ? 0 : i,
                this.Va = [],
                this.ma = null,
                this.S = i instanceof D ? i : new D(i,t === void 0 ? 0 : t,I === void 0 ? 0 : I),
                this.Ua = new D(0,0,0),
                this.hc = new D(0,0,0),
                this.dc = this.tb = 1,
                this.Kb = this.Jb = this.H = !0,
                this.Gb = new sn
            }
            n = x.prototype,
            n.Tb = function(i) {
                this.Jb = !0;
                for (var t = z(this.Va), I = t.next(); !I.done; I = t.next())
                    I.value.Tb(i)
            }
            ,
            n.ac = function(i) {
                this.Kb = !0;
                for (var t = z(this.Va), I = t.next(); !I.done; I = t.next())
                    I.value.ac(i)
            }
            ;
            function y(i, t) {
                // console.log("======y====> ",i,t);
                if (i.Tb(!0),
                i.ac(!0),
                i.ma) {
                    var I = i.ma.Va
                      , g = An(I, i);
                    0 <= g && Array.prototype.splice.call(I, g, 1)
                }
                (i.ma = t) && i.ma.Va.push(i)
            }
            function fi(i, t) {
                y(t, i)
            }
            function ui(i) {
                y(i, null)
            }
            n.Da = function(i, t, I) {
                this.Tb(!0),
                i instanceof D ? (this.S.x = i.x,
                this.S.y = i.y,
                this.S.z = i.z) : (this.S.x = i,
                this.S.y = t === void 0 ? this.S.y : t,
                this.S.z = I === void 0 ? this.S.z : I)
            }
            ;
            function H(i, t) {
                i.ac(!0),
                i.Tb(!0),
                i.tb = t
            }
            function d(i) {
                return i.Jb && (i.Ua.x = i.S.x,
                i.Ua.y = i.S.y,
                i.Ua.z = i.S.z,
                i.ma && st(i.Ua.scale(Di(i.ma)), d(i.ma)),
                i.hc = i.Ua,
                i.Jb = !1),
                i.hc
            }
            function ki(i) {
                return i = d(i),
                new Pi(i.x,i.z)
            }
            function Di(i) {
                if (i.Kb) {
                    var t = i.ma ? i.tb * Di(i.ma) : i.tb;
                    i.dc = t,
                    i.Kb = !1
                }
                return i.dc
            }
            function mt(i, t) {
                if (i.H) {
                    t(i),
                    i = z(i.Va);
                    for (var I = i.next(); !I.done; I = i.next())
                        mt(I.value, t)
                }
            }
            n.Ba = function() {
                return new Ai(0,0)
            }
            ,
            n.ya = function() {}
            ;
            function sn() {
                this.H = 0
            }
            function Ei() {
                x.call(this),
                this.W = !1
            }
            o(Ei, x),
            n = Ei.prototype,
            n.ya = function(i) {
                this.W || (this.W = !0,
                this.Kc()),
                this.wc(i),
                this.Db() && this.nb()
            }
            ,
            n.wc = function() {}
            ,
            n.Kc = function() {}
            ,
            n.nb = function() {}
            ,
            n.Db = function() {
                return !1
            }
            ;
            function vi(i, t, I) {
                t = t === void 0 ? function() {}
                : t,
                I = I === void 0 ? function() {}
                : I,
                Ei.call(this),
                this.v = 0,
                this.T = i,
                t && (this.wc = t),
                this.nb = I
            }
            o(vi, Ei),
            vi.prototype.Db = function() {
                return this.v >= this.T
            }
            ,
            vi.prototype.ya = function(i) {
                this.v += i,
                Ei.prototype.ya.call(this, i)
            }
            ;
            function Mt(i) {
                Ei.call(this),
                this.v = i
            }
            o(Mt, Ei),
            Mt.prototype.ya = function(i) {
                for (var t = z(this.v), I = t.next(); !I.done; I = t.next())
                    I = I.value,
                    I.Db() || I.ya(i);
                Ei.prototype.ya.call(this, i)
            }
            ,
            Mt.prototype.Db = function() {
                for (var i = z(this.v), t = i.next(); !t.done; t = i.next())
                    if (!t.value.Db())
                        return !1;
                return !0
            }
            ;
            function ri() {
                x.call(this),
                this.v = [],
                this.R = []
            }
            o(ri, x),
            ri.prototype.ya = function(i) {
                if (0 < this.v.length && 0 < i) {
                    var t = this.v[0];
                    t.ya(i),
                    t.Db() && this.v.length && this.v[0] === t && this.v.shift()
                }
                for (t = 0; t < this.R.length; t++)
                    this.R[t].ya(i),
                    this.R[t].Db() && this.R.splice(t--, 1)
            }
            ;
            function U(i, t) {
                Array.isArray(t) ? i.v.push(new Mt(t)) : i.v.push(t)
            }
            function p(i, t, I) {
                U(i, new vi(t,function() {}
                ,I === void 0 ? function() {}
                : I))
            }
            function ft(i, t, I) {
                ni(i, new vi(t,function() {}
                ,I === void 0 ? function() {}
                : I))
            }
            function ni(i, t) {
                Array.isArray(t) ? i.R.push(new Mt(t)) : i.R.push(t)
            }
            var oe = "StopIteration"in xi ? xi.StopIteration : {
                message: "StopIteration",
                stack: ""
            };
            function tI() {}
            tI.prototype.next = function() {
                throw oe
            }
            ,
            tI.prototype.Vc = function() {
                return this
            }
            ;
            function II(i, t) {
                this.v = {},
                this.H = [],
                this.R = this.S = 0;
                var I = arguments.length;
                if (1 < I) {
                    if (I % 2)
                        throw Error("d");
                    for (var g = 0; g < I; g += 2)
                        this.set(arguments[g], arguments[g + 1])
                } else if (i) {
                    if (i instanceof II) {
                        var A = i.Ob();
                        g = i.Pb()
                    } else {
                        var I = []
                          , M = 0;
                        for (A in i)
                            I[M++] = A;
                        A = I,
                        I = [],
                        M = 0;
                        for (g in i)
                            I[M++] = i[g];
                        g = I
                    }
                    for (I = 0; I < A.length; I++)
                        this.set(A[I], g[I])
                }
            }
            n = II.prototype,
            n.Pb = function() {
                eI(this);
                for (var i = [], t = 0; t < this.H.length; t++)
                    i.push(this.v[this.H[t]]);
                return i
            }
            ,
            n.Ob = function() {
                return eI(this),
                this.H.concat()
            }
            ;
            function eI(i) {
                var t, I;
                if (i.S != i.H.length) {
                    for (t = I = 0; I < i.H.length; ) {
                        var g = i.H[I];
                        ct(i.v, g) && (i.H[t++] = g),
                        I++
                    }
                    i.H.length = t
                }
                if (i.S != i.H.length) {
                    var A = {};
                    for (t = I = 0; I < i.H.length; )
                        g = i.H[I],
                        ct(A, g) || (i.H[t++] = g,
                        A[g] = 1),
                        I++;
                    i.H.length = t
                }
            }
            n.get = function(i, t) {
                return ct(this.v, i) ? this.v[i] : t
            }
            ,
            n.set = function(i, t) {
                ct(this.v, i) || (this.S++,
                this.H.push(i),
                this.R++),
                this.v[i] = t
            }
            ,
            n.forEach = function(i, t) {
                for (var I = this.Ob(), g = 0; g < I.length; g++) {
                    var A = I[g]
                      , M = this.get(A);
                    i.call(t, M, A, this)
                }
            }
            ,
            n.Vc = function(i) {
                eI(this);
                var t = 0
                  , I = this.R
                  , g = this
                  , A = new tI;
                return A.next = function() {
                    if (I != g.R)
                        throw Error("e");
                    if (t >= g.H.length)
                        throw oe;
                    var M = g.H[t++];
                    return i ? M : g.v[M]
                }
                ,
                A
            }
            ;
            function ct(i, t) {
                return Object.prototype.hasOwnProperty.call(i, t)
            }
            function Mn(i, t) {
                if (i) {
                    i = i.split("&");
                    for (var I = 0; I < i.length; I++) {
                        var g = i[I].indexOf("=")
                          , A = null;
                        if (0 <= g) {
                            var M = i[I].substring(0, g);
                            A = i[I].substring(g + 1)
                        } else
                            M = i[I];
                        t(M, A ? decodeURIComponent(A.replace(/\+/g, " ")) : "")
                    }
                }
            }
            function cn(i, t, I) {
                this.v = this.H = null,
                this.S = i || null,
                this.R = !!I
            }
            function it(i) {
                i.H || (i.H = new II,
                i.v = 0,
                i.S && Mn(i.S, function(t, I) {
                    an(i, decodeURIComponent(t.replace(/\+/g, " ")), I)
                }))
            }
            function an(i, t, I) {
                it(i),
                i.S = null,
                t = vt(i, t);
                var g = i.H.get(t);
                g || i.H.set(t, g = []),
                g.push(I),
                i.v += 1
            }
            function Ae(i, t) {
                return it(i),
                t = vt(i, t),
                ct(i.H.v, t)
            }
            n = cn.prototype,
            n.forEach = function(i, t) {
                it(this),
                this.H.forEach(function(I, g) {
                    $I(I, function(A) {
                        i.call(t, A, g, this)
                    }, this)
                }, this)
            }
            ,
            n.Ob = function() {
                it(this);
                for (var i = this.H.Pb(), t = this.H.Ob(), I = [], g = 0; g < t.length; g++)
                    for (var A = i[g], M = 0; M < A.length; M++)
                        I.push(t[g]);
                return I
            }
            ,
            n.Pb = function(i) {
                it(this);
                var t = [];
                if (Oi(i))
                    Ae(this, i) && (t = te(t, this.H.get(vt(this, i))));
                else {
                    i = this.H.Pb();
                    for (var I = 0; I < i.length; I++)
                        t = te(t, i[I])
                }
                return t
            }
            ,
            n.set = function(i, t) {
                return it(this),
                this.S = null,
                i = vt(this, i),
                Ae(this, i) && (this.v -= this.H.get(i).length),
                this.H.set(i, [t]),
                this.v += 1,
                this
            }
            ,
            n.get = function(i, t) {
                return i = i ? this.Pb(i) : [],
                0 < i.length ? String(i[0]) : t
            }
            ,
            n.toString = function() {
                if (this.S)
                    return this.S;
                if (!this.H)
                    return "";
                for (var i = [], t = this.H.Ob(), I = 0; I < t.length; I++)
                    for (var A = t[I], g = encodeURIComponent(String(A)), A = this.Pb(A), M = 0; M < A.length; M++) {
                        var c = g;
                        A[M] !== "" && (c += "=" + encodeURIComponent(String(A[M]))),
                        i.push(c)
                    }
                return this.S = i.join("&")
            }
            ;
            function vt(i, t) {
                return t = String(t),
                i.R && (t = t.toLowerCase()),
                t
            }
            var bi = navigator.userAgent
              , wt = X(bi, "iPad") || X(bi, "iPhone") || X(bi, "iPod")
              , nI = wt || X(bi, "Android") || X(bi, "Mobile") || X(bi, "Silk") || X(bi, "UCBrowser") || X(bi, "UCWEB")
              , ue = ["", "moz", "ms", "o", "webkit"];
            function re(i, t) {
                if (!i)
                    return null;
                for (var I = 0; I < ue.length; I++) {
                    var g = ue[I]
                      , A = t;
                    if (0 < g.length && (A = t.charAt(0).toUpperCase() + t.substr(1)),
                    g += A,
                    typeof i[g] < "u")
                        return g
                }
                return null
            }
            function Nn() {
                for (var i = ["requestAnimationFrame", "mozRequestAnimationFrame", "msRequestAnimationFrame", "oRequestAnimationFrame", "webkitRequestAnimationFrame"], t = 0; t < i.length; t++) {
                    var I = window[i[t]];
                    if (I)
                        return function(c, r, S) {
                            return I(function(m) {
                                return c.call(S, m)
                            }, r)
                        }
                }
                var g = 0
                  , A = 33
                  , M = 50;
                return function(c, r, S) {
                    r && 0 > --M && (1.25 < r / A ? (g = 0,
                    A = Math.min(66, ++A)) : 10 < ++g && (g = 0,
                    A = Math.max(17, --A))),
                    window.setTimeout(function(m) {
                        c.call(S, m)
                    }, A)
                }
            }
            function gI(i, t, I) {
                return gI = Nn(),
                gI(i, t, I)
            }
            function Ui(i, t, I, g) {
                this.H = i,
                this.v = t,
                this.width = I,
                this.height = g
            }
            Ui.prototype.ceil = function() {
                return this.H = Math.ceil(this.H),
                this.v = Math.ceil(this.v),
                this.width = Math.ceil(this.width),
                this.height = Math.ceil(this.height),
                this
            }
            ,
            Ui.prototype.floor = function() {
                return this.H = Math.floor(this.H),
                this.v = Math.floor(this.v),
                this.width = Math.floor(this.width),
                this.height = Math.floor(this.height),
                this
            }
            ,
            Ui.prototype.round = function() {
                return this.H = Math.round(this.H),
                this.v = Math.round(this.v),
                this.width = Math.round(this.width),
                this.height = Math.round(this.height),
                this
            }
            ,
            Ui.prototype.scale = function(i, t) {
                return t = li(t) ? t : i,
                this.H *= i,
                this.width *= i,
                this.v *= t,
                this.height *= t,
                this
            }
            ;
            var hn = 1e3 / 60
              , jn = nI ? 600 : 768
              , ln = nI ? 338 : 432
              , Qi = new Ui(0,0,1e3,1e3)
              , oI = new D(0,5.2,3)
              , R = new D(0,0,21.35)
              , AI = new D(0,0,R.z - 10.06)
              , Dn = new D(0,0,R.z + 10.06)
              , uI = new D(0,0,0)
              , rI = uI;
            Object.isFrozen && !Object.isFrozen(uI) && (rI = Object.create(uI),
            Object.freeze(rI));
            var sI = rI
              , yn = 1 / 96
              , se = new D(-.9,0,R.z - 8.64 - .1)
              , Me = new D(-1.9,0,R.z + 8.64 + .1);
            function Cn(i, t, I) {
                this.H = i,
                this.v = t,
                this.S = I
            }
            function MI(i, t) {
                if (t == 0)
                    return 0;
                if (t == 1)
                    return 1;
                var I = w(0, i.H, t)
                  , g = w(i.H, i.S, t);
                return i = w(i.S, 1, t),
                I = w(I, g, t),
                g = w(g, i, t),
                w(I, g, t)
            }
            function Sn(i, t) {
                var I = (t - 0) / 1;
                if (0 >= I)
                    return 0;
                if (1 <= I)
                    return 1;
                for (var g = 0, A = 1, M = 0, c = 0; 8 > c; c++) {
                    var M = MI(i, I)
                      , r = (MI(i, I + 1e-6) - M) / 1e-6;
                    if (1e-6 > Math.abs(M - t))
                        return I;
                    if (1e-6 > Math.abs(r))
                        break;
                    M < t ? g = I : A = I,
                    I -= (M - t) / r
                }
                for (c = 0; 1e-6 < Math.abs(M - t) && 8 > c; c++)
                    M < t ? (g = I,
                    I = (I + A) / 2) : (A = I,
                    I = (I + g) / 2),
                    M = MI(i, I);
                return I
            }
            function pt(i, t, I) {
                var g = new Cn(i,t,I);
                return function(A) {
                    if (A = Sn(g, A),
                    A == 0)
                        A = 0;
                    else if (A == 1)
                        A = 1;
                    else {
                        var c = w(0, g.v, A)
                          , r = w(g.v, 1, A)
                          , M = w(1, 1, A)
                          , c = w(c, r, A)
                          , r = w(r, M, A);
                        A = w(c, r, A)
                    }
                    return A
                }
            }
            function ce(i) {
                return i
            }
            var cI = pt(.25, .1, .25)
              , at = pt(.4, 0, 1)
              , ae = pt(0, 0, .6)
              , aI = pt(.6, 0, .4);
            function E(i, t, I, g, A, M) {
                M = M === void 0 ? {} : M;
                var c = M.Ha === void 0 ? ce : M.Ha
                  , r = M.Ic === void 0 ? void 0 : M.Ic;
                if (vi.call(this, i, null, M.nb === void 0 ? function() {}
                : M.nb),
                this.ha = A,
                this.U = r,
                this.R = t,
                this.R === null && this.U === void 0)
                    throw Error("h");
                this.Aa = I,
                this.V = g,
                this.ka = c
            }
            o(E, vi),
            E.prototype.Kc = function() {
                this.R === null && (this.R = this.U())
            }
            ,
            E.prototype.wc = function() {
                this.ha(this.V(this.R, this.Aa, this.ka($i(this.v / this.T, 0, 1))))
            }
            ;
            function $(i, t, I, g) {
                g = g === void 0 ? {} : g,
                E.call(this, t, null, I.H(), ge, function(A) {
                    return i.Da(A)
                }, {
                    nb: g.nb === void 0 ? function() {}
                    : g.nb,
                    Ha: g.Ha === void 0 ? ce : g.Ha,
                    Ic: function() {
                        return i.S.H()
                    }
                })
            }
            o($, E);
            function zt(i, t) {
                t = t === void 0 ? new D(0,0,0) : t,
                x.call(this, t),
                this.T = i,
                this.R = this.v = 0,
                this.U = new Map,
                this.ka = new ri,
                y(this.ka, this),
                this.V = 3,
                this.W = .9 * this.T.height
            }
            o(zt, x);
            function Nt(i, t) {
                if (t == 1)
                    ni(i.ka, [new $(i,700,new D(0,1.6,5.3),{
                        Ha: cI
                    }), new E(700,ti(i.v),-.95,w,function(A) {
                        return xt(i, A)
                    }
                    ,{
                        Ha: cI
                    })]);
                else if (t == 2)
                    ni(i.ka, [new $(i,1700,new D(0,10.4,48.4),{
                        Ha: aI
                    }), new E(1700,ti(i.v),11.15,w,function(A) {
                        return xt(i, A)
                    }
                    ,{
                        Ha: aI
                    })]);
                else if (t == 0) {
                    var I = i.V == 2 ? 1700 : 700
                      , g = i.V == 2 ? aI : cI;
                    ni(i.ka, [new $(i,I,oI,{
                        Ha: g
                    }), new E(I,ti(i.v),15.55,w,function(A) {
                        return xt(i, A)
                    }
                    ,{
                        Ha: g
                    }), new E(I,ti(i.R),0,w,function(A) {
                        return Pt(i, A)
                    }
                    ,{
                        Ha: g
                    })])
                }
                i.V = t
            }
            zt.prototype.ya = function() {
                this.W = .9 * this.T.height
            }
            ,
            zt.prototype.Da = function(i, t, I) {
                x.prototype.Da.call(this, i, t, I),
                this.U.clear()
            }
            ;
            function xt(i, t) {
                i.v = ii(t),
                i.U.clear()
            }
            function Pt(i, t) {
                i.R = ii(t),
                i.U.clear()
            }
            function Et(i, t) {
                var I = i.U.get(173 * (103 * t.x + t.y) + t.z);
                if (!I) {
                    var I = iI(t, d(i))
                      , g = I.x
                      , A = I.y
                      , M = I.z;
                    i.R && (g = Math.cos(i.R) * I.x - Math.sin(i.R) * I.z,
                    M = Math.cos(i.R) * I.z + Math.sin(i.R) * I.x),
                    i.v && (A = Math.sin(i.v) * M + Math.cos(i.v) * I.y,
                    M = Math.cos(i.v) * M - Math.sin(i.v) * I.y),
                    I.x = g,
                    I.y = A,
                    I.z = M,
                    i.U.set(173 * (103 * t.x + t.y) + t.z, I)
                }
                return I
            }
            function Ne(i, t, I) {
                if (I = I === void 0 ? 1 : I,
                t = Et(i, t),
                2 >= t.z || Math.abs(t.x) >= i.T.width / i.T.height * t.z * .8)
                    return null;
                var g = i.W / t.z;
                return new _i(g * I,0,0,g * I,g * t.x + i.T.width / 2,-1 * g * t.y + i.T.height / 2)
            }
            function si(i, t, I) {
                x.call(this, i === void 0 ? 0 : i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                this.T = new _i,
                this.Aa = new Ui(0,0,0,0),
                this.Lb = new Ai(0,0),
                this.W = 0,
                this.U = 1,
                this.ka = 0
            }
            o(si, x),
            n = si.prototype,
            n.mc = function() {
                var i = this.Aa;
                return Qi.H <= i.H + i.width && i.H <= Qi.H + Qi.width && Qi.v <= i.v + i.height && i.v <= Qi.v + Qi.height
            }
            ,
            n.Ec = function(i) {
                if ((this.T = i) && this.W) {
                    i = this.T;
                    var g = -this.W
                      , t = new _i
                      , I = Math.cos(g)
                      , g = Math.sin(g)
                      , t = _t(t, I, g, -g, I, 0 - 0 * I + 0 * g, 0 - 0 * g - 0 * I)
                      , I = i.Ma
                      , g = i.lb;
                    i.Ma = t.Ma * I + t.mb * g,
                    i.lb = t.lb * I + t.Oa * g,
                    i.Xa += t.Xa * I + t.Ya * g,
                    I = i.mb,
                    g = i.Oa,
                    i.mb = t.Ma * I + t.mb * g,
                    i.Oa = t.lb * I + t.Oa * g,
                    i.Ya += t.Xa * I + t.Ya * g
                }
            }
            ;
            function bt(i, t, I, g, A) {
                i.Aa.H = t,
                i.Aa.v = I,
                i.Aa.width = g,
                i.Aa.height = A
            }
            n.Zb = function() {
                return d(this).z
            }
            ,
            n.Ba = function() {
                return this.Lb
            }
            ;
            function ht(i, t, I) {
                i.Lb.width = t,
                i.Lb.height = I === void 0 ? t : I
            }
            n.nc = function(i) {
                return this.Eb(i) ? (this.Wb(),
                this.mc()) : !1
            }
            ,
            n.Eb = function() {
                var i = d(this);
                return this.T ? _t(this.T, Di(this), 0, 0, Di(this), i.x, i.y) : this.T = new _i(Di(this),0,0,Di(this),i.x,i.y),
                !0
            }
            ,
            n.Wb = function() {
                var i = d(this)
                  , t = this.Ba();
                bt(this, i.x - t.width / 2, i.y - t.height / 2, t.width, t.height)
            }
            ,
            n.Ea = function() {}
            ;
            function q(i, t, I) {
                si.call(this, i === void 0 ? 0 : i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                this.rb = !1,
                this.Fc = 0
            }
            o(q, si),
            q.prototype.Zb = function(i) {
                return this.rb ? si.prototype.Zb.call(this, i) : this.Fc
            }
            ,
            q.prototype.Sb = function(i) {
                this.rb = i
            }
            ,
            q.prototype.Eb = function(i) {
                return this.rb ? si.prototype.Eb.call(this, i) : (this.Fc = Et(i, d(this)).z,
                i = Ne(i, d(this), Di(this)),
                this.Ec(i),
                !!i)
            }
            ,
            q.prototype.Wb = function() {
                var i = this.T
                  , t = this.Ba().width * i.Ma
                  , I = this.Ba().height * i.Oa;
                bt(this, i.Xa - t / 2, i.Ya - I / 2, t, I)
            }
            ;
            function k(i, t, I, g, A) {
                g = g === void 0 ? 0 : g,
                A = A === void 0 ? 360 : A,
                q.call(this, i),
                this.La = t,
                this.fillStyle = I,
                this.Ga = ii(g),
                this.Ia = ii(A),
                ht(this, 2 * this.La)
            }
            o(k, q),
            k.prototype.Ea = function(i) {
                q.prototype.Ea.call(this, i),
                i.beginPath(),
                i.arc(0, 0, this.La, this.Ga, this.Ia),
                i.lineTo(0, 0),
                i.closePath(),
                i.fillStyle = this.fillStyle,
                i.fill()
            }
            ;
            function O() {
                this.H = []
            }
            function J(i, t, I) {
                if (t==2){ // if t=2, game over
                 
                   // set globe
                   postMessage({
                    type: 'gameOver',
                    status: 'gameOver'
                   });
                   
                }
                for (var g = i.H.slice(0), A = 0; A < g.length; A++)
                    i.H.indexOf(g[A]) !== -1 && g[A].Za(t, I)
            }
            function Yi(i, t) {
                i.H.push(t)
            }
            qi(O);
            function Ci() {
                this.v = new x,
                this.S = new x,
                this.H = new x,
                this.R = [],
                this.T = [],
                this.U = []
            }
            Ci.prototype.reset = function() {
                this.v = new x,
                this.S = new x,
                this.H = new x,
                this.R = [],
                this.T = [],
                this.U = []
            }
            ;
            function Ln(i) {
                var t = Ti;
                t.T = [],
                mt(t.v, function(g) {
                    t.T.push(g),
                    g.ya(i)
                }),
                mt(t.S, function(g) {
                    t.T.push(g),
                    g.ya(i)
                }),
                t.U = [];
                var I = 0;
                mt(t.H, function(g) {
                    t.U.push(g);
                    var A = I++;
                    g.Gb.H = A,
                    g.ya(i)
                })
            }
            function dn(i) {
                var t = Ti;
                t.R = [];
                for (var I = z(t.T), g = I.next(); !g.done; g = I.next())
                    g = g.value,
                    g.H && g.nc && g.nc(i) && t.R.push(g);
                for (var I = [], A = z(t.U), g = A.next(); !g.done; g = A.next())
                    g = g.value,
                    g.H && g.nc && g.nc(i) && I.push(g);
                Ie(I, function(M, c) {
                    var r;
                    return (r = c.Zb(i) + c.ka - (M.Zb(i) + M.ka)) ? r : M.Gb.H - c.Gb.H
                }),
                t.R.push.apply(t.R, [].concat(I instanceof Array ? I : Xi(z(I))))
            }
            qi(Ci);
            function V(i, t, I) {
                // console.log("======V====> ");
                var A = I === void 0 ? {} : I;
                I = A.fillStyle === void 0 ? null : A.fillStyle;
                var g = A.strokeStyle === void 0 ? null : A.strokeStyle
                  , A = A.lineWidth === void 0 ? .1 : A.lineWidth;
                si.call(this, i),
                this.ha = t,
                this.V = ie(t, function(M) {
                    // console.log("======V====> ",M);
                    return M.H()
                }),
                this.R = !0,
                this.v = [],
                this.ra = [],
                this.$ = [],
                this.Ia = I,
                this.Fa = !!I,
                this.wa = g,
                this.Ca = !!g,
                this.Ga = A,
                this.va = !0,
                this.ta = 0
            }
            o(V, si),
            n = V.prototype,
            n.mc = function() {
                return 3 <= this.v.length && si.prototype.mc.call(this)
            }
            ,
            n.Zb = function(i) {
                return this.va && (this.ta = un(this.ra, function(t, I) {
                    return Math.max(t, I.z)
                }, Et(i, d(this)).z)),
                this.ta
            }
            ,
            n.Tb = function(i) {
                si.prototype.Tb.call(this, i),
                this.R = i || this.R
            }
            ,
            n.ac = function(i) {
                si.prototype.ac.call(this, i),
                this.R = i || this.R
            }
            ,
            n.Eb = function(i) {
                this.ra = [],
                this.$ = [],
                this.v = [];
                var t = !!this.wa;
                if (this.R) {
                    for (var I = Di(this), g = d(this), A = 0; A < this.ha.length; A++)
                        this.V[A].x = this.ha[A].x * I + g.x,
                        this.V[A].y = this.ha[A].y * I + g.y,
                        this.V[A].z = this.ha[A].z * I + g.z;
                    this.R = !1
                }
                for (I = z(this.V),
                g = I.next(); !g.done; g = I.next())
                    g = Et(i, g.value),
                    0 >= g.z || (this.ra.push(g),
                    t && this.$.push(i.W / g.z),
                    A = i.W / g.z,
                    this.v.push(new Pi(A * g.x + i.T.width / 2,-1 * A * g.y + i.T.height / 2)));
                return this.va = !0,
                0 < this.v.length
            }
            ,
            n.Wb = function() {
                if (this.v.length) {
                    for (var i = Number.MAX_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER, I = Number.MIN_SAFE_INTEGER, g = Number.MIN_SAFE_INTEGER, A = z(this.v), M = A.next(); !M.done; M = A.next())
                        M = M.value,
                        i = Math.min(M.x, i),
                        I = Math.max(M.x, I),
                        t = Math.min(M.y, t),
                        g = Math.max(M.y, g);
                    bt(this, i, t, Math.abs(I - i), Math.abs(g - t))
                }
            }
            ,
            n.Ea = function(i) {
                si.prototype.Ea.call(this, i),
                i.beginPath(),
                this.Ca && (i.strokeStyle = this.wa);
                for (var t = 0; t < this.v.length; t++) {
                    var I = this.v[t];
                    i.lineTo(Math.round(I.x), Math.round(I.y)),
                    this.Ca && (i.lineWidth = this.Ga * this.$[t],
                    i.stroke(),
                    i.beginPath(),
                    i.moveTo(Math.round(I.x), Math.round(I.y)))
                }
                this.Fa && (i.closePath(),
                i.fillStyle = this.Ia,
                i.fill())
            }
            ;
            function Ni(i) {
                return i.x ? [new D(-i.x / 2,-i.y / 2,-i.z / 2), new D(i.x / 2,-i.y / 2,-i.z / 2), new D(i.x / 2,i.y / 2,i.z / 2), new D(-i.x / 2,i.y / 2,i.z / 2), new D(-i.x / 2,-i.y / 2,-i.z / 2)] : [new D(0,-i.y / 2,-i.z / 2), new D(0,i.y / 2,-i.z / 2), new D(0,i.y / 2,i.z / 2), new D(0,-i.y / 2,i.z / 2), new D(0,-i.y / 2,-i.z / 2)]
            }
            function Qt(i, t, I, g) {
                g = g === void 0 ? 22 : g;
                var A = []
                  , M = i instanceof Ai ? i.width : i;
                i = i instanceof Ai ? i.height : i;
                for (var c = 0; c < g; c++)
                    A.push(new D(M * Math.cos(t - (I - t) * c / g),0,i * Math.sin(t - (I - t) * c / g)));
                return A
            }
            function Yt(i) {
                V.call(this, new D(0,0,0), Qt(new Ai(i,i), 0, 2 * Math.PI, 20), {
                    fillStyle: "#000"
                }),
                this.U = .12
            }
            o(Yt, V),
            Yt.prototype.Ea = function(i) {
                var t = this.Aa;
                3 > t.height ? (i.fillStyle = "#000",
                i.fillRect(t.H, t.v, t.width, t.height)) : V.prototype.Ea.call(this, i)
            }
            ;
            function he(i) {
                this.H = i,
                this.lc = !1,
                this.Cc = []
            }
            function je(i) {
                if (!i.lc) {
                    i.lc = !0;
                    for (var t = 0, I; I = i.Cc[t]; t++)
                        I()
                }
            }
            function NI(i) {
                he.call(this, i),
                this.Qb = new Image
            }
            Xt(NI, he),
            NI.prototype.Bc = function() {
                if (!this.Qb.src) {
                    var i = this;
                    this.Qb.onload = function() {
                        je(i)
                    }
                    ,
                    this.Qb.src = this.H,
                    (this.Qb.complete || this.Qb.readyState == "complete") && je(this)
                }
            }
            ;
            function hI(i, t) {
                this.v = ie(t, function(I) {
                    return new NI(i + I)
                }),
                this.H = new Map
            }
            hI.prototype.Bc = function(i, t) {
                i = le(this, i),
                i.lc ? t() : i.Cc.push(t),
                i.Bc()
            }
            ;
            function le(i, t) {
                return typeof t == "number" ? i.v[t] : i.v[t[0]]
            }
            function Tn(i, t, I) {
                var g = document.createElement("canvas")
                  , A = i[3] + 10
                  , M = i[4] + 10;
                g.width = Math.ceil(A * I),
                g.height = Math.ceil(M * I);
                var c = g.getContext("2d");
                return c.scale(I, I),
                c.drawImage(t, i[1] - 5, i[2] - 5, A, M, 0, 0, A, M),
                g
            }
            function Bt() {
                hI.call(this, a, mn)
            }
            o(Bt, hI);
            var mn = [T]
              , fn = [0, 20, 20, 122.08, 20.39]
              , vn = [0, 20, 61, 65.02, 64.57]
              , wn = [0, 20, 146, 116, 193]
              , pn = [0, 20, 359, 21.44, 80.72]
              , zn = [0, 20, 460, 46.96, 112.94]
              , xn = [0, 20, 593, 53.17, 53.17]
              , Pn = [0, 20, 667, 193.82, 55.34]
              , En = [0, 20, 743, 166.51, 46.29]
              , bn = [0, 20, 810, 66, 432]
              , jI = [0, 20, 1262, 48.81, 81]
              , Qn = [0, 20, 1363, 173.79, 166.93]
              , Yn = [0, 20, 1550, 129.78, 212.27]
              , De = [0, 20, 1783, 129.78, 225.25]
              , ye = [0, 20, 2029, 108.12, 118.91]
              , Bn = [0, 20, 2168, 556.4, 67.71]
              , Hn = [0, 20, 2256, 504.75, 119.95]
              , Ht = [0, 20, 2396, 52.57, 77.21]
              , Gn = [0, 20, 3370, 254, 89]
              , Zn = [0, 20, 3479, 254, 89]
              , On = [0, 20, 3588, 254, 89]
              , Rn = [0, 20, 3697, 254, 89]
              , kn = [0, 20, 3806, 254, 89]
              , Un = [0, 20, 3915, 254, 89]
              , Jn = [0, 20, 4024, 254, 89]
              , Wn = [0, 20, 4133, 254, 89]
              , Fn = [0, 20, 4242, 254, 89]
              , Kn = [0, 20, 4351, 254, 89]
              , Vn = [0, 20, 4460, 254, 89]
              , Xn = [0, 20, 4569, 254, 89]
              , qn = [0, 20, 4678, 131.94, 156.32]
              , _n = [0, 20, 5209, 195.7, 190.95]
              , $n = [0, 20, 5420, 245.36, 172.2]
              , Ce = [0, 20, 5705, 3, 20.78]
              , ig = [0, 20, 5746, 485.47, 469.67]
              , tg = [0, 20, 6425, 65, 57]
              , Ig = [0, 20, 6502, 53, 54]
              , eg = [0, 20, 6576, 55, 54]
              , ng = [0, 20, 6650, 169.51, 163.5]
              , Se = [0, 20, 7058, 124, 184]
              , gg = [0, 20, 7262, 124, 184]
              , og = [0, 20, 7466, 124, 184]
              , Ag = [0, 20, 7670, 124, 184]
              , ug = [0, 20, 7874, 124, 184]
              , rg = [0, 20, 8078, 124, 184]
              , sg = [0, 20, 8282, 124, 184]
              , Mg = [0, 20, 8690, 124, 184]
              , cg = [0, 20, 8894, 124, 184]
              , ag = [0, 20, 9098, 124, 184]
              , Ng = [0, 20, 9302, 124, 184]
              , hg = [0, 20, 9506, 124, 184]
              , jg = [0, 20, 9710, 124, 184]
              , lg = [0, 20, 9710, 124, 184]
              , Dg = [0, 20, 9710, 124, 184]
              , yg = [0, 20, 9710, 124, 184]
              , Cg = [0, 20, 9710, 124, 184]
              , Sg = [0, 20, 9710, 124, 184]
              , Lg = [0, 20, 9710, 124, 184]
              , dg = [0, 20, 9710, 124, 184]
              , Tg = [0, 20, 9710, 124, 184]
              , mg = [0, 20, 9710, 124, 184]
              , fg = [0, 20, 9914, 37.81, 30.99];
            qi(Bt);
            var Gt = Bt.qa();
            function b(i, t, I, g) {
                q.call(this, t === void 0 ? 0 : t, I === void 0 ? 0 : I, g === void 0 ? 0 : g),
                this.Ca = (this.Ga = typeof i[0] == "number" ? null : i) ? this.Ga[0] : i,
                this.va = this.La = 0,
                this.Ia = !1,
                this.Fa = new Ai(0,-.5),
                this.ub = 1,
                this.ha = new Ai(1,1),
                this.Hb = !1,
                this.ra = null,
                lI(this),
                this.Ib = new Yt(this.Ba().width / 2),
                y(this.Ib, this)
            }
            o(b, q);
            function yi(i, t) {
                i.Ca = t,
                lI(i)
            }
            function lI(i) {
                var t = i.rb ? 1 : yn;
                ht(i, t * i.Ca[3], t * i.Ca[4])
            }
            function Y(i, t, I) {
                i.Fa.width = t,
                i.Fa.height = I
            }
            function Li(i, t, I) {
                i.ha.width = t,
                i.ha.height = I
            }
            n = b.prototype,
            n.Sb = function(i) {
                q.prototype.Sb.call(this, i),
                lI(this)
            }
            ;
            function vg(i, t, I) {
                var g = i.Ba().width / i.Ba().height;
                1 < g ? ht(i, t, t / g) : ht(i, I * g, I)
            }
            n.reset = function() {
                this.La = this.va = 0,
                this.Ca = this.Ga[this.va],
                this.Ia = !1
            }
            ,
            n.ya = function(i) {
                q.prototype.ya.call(this, i),
                this.La += i,
                this.Ga && this.Ia && 40 < this.La && (this.La = 0,
                this.va < this.Ga.length - 1 ? (this.va += 1,
                this.Ca = this.Ga[this.va]) : (this.va = 0,
                this.Ia = !1))
            }
            ,
            n.Wb = function() {
                var i = this.T
                  , t = this.Ba().width * this.ha.width * i.Ma
                  , I = this.Ba().height * this.ha.height * i.Oa;
                bt(this, i.Xa - t / 2 + t * this.Fa.width * (this.Hb ? -1 : 1), i.Ya - I / 2 + I * this.Fa.height, t, I)
            }
            ,
            n.Ec = function(i) {
                if (q.prototype.Ec.call(this, i),
                i) {
                    i = Math.max(.2, Math.abs(this.ha.width * this.Ba().width * this.T.Ma / this.Ca[3]));
                    var t = Math.abs(i - this.ub);
                    (t > .6 * this.ub || .5 < t) && (this.ub = i)
                }
            }
            ,
            n.Ea = function(i) {
                if (q.prototype.Ea.call(this, i),
                this.ra) {
                    i.save();
                    var I = this.Ba();
                    i.beginPath(),
                    i.rect(this.ra.H * I.width, this.ra.v * I.height, this.ra.width * I.width, this.ra.height * I.height),
                    i.clip()
                }
                var t = this.Ca
                  , I = this.Fa.width * this.Ba().width * this.ha.width
                  , g = this.Fa.height * this.Ba().height * this.ha.height
                  , A = this.Ba().width * this.ha.width
                  , M = this.Ba().height * this.ha.height
                  , c = this.Hb
                  , r = this.ub
                  , c = c === void 0 ? !1 : c
                  , r = r === void 0 ? 1 : r
                  , r = r === void 0 ? 1 : r
                  , S = le(Gt, t[0]);
                if (S.lc) {
                    var m = t + "," + r;
                    Gt.H.has(m) || Gt.H.set(m, Tn(t, S.Qb, r)),
                    r = Gt.H.get(m)
                } else
                    r = null;
                r && (c && i.scale(-1, 1),
                t = 10 * A / t[3],
                i.drawImage(r, I - (A + t) / 2, g - (M + t) / 2, A + t, M + t),
                c && i.scale(-1, 1)),
                this.ra && i.restore()
            }
            ;
            function ei(i) {
                i.Ib.H = !1
            }
            function Zt(i) {
                x.call(this);
                var t = this;
                this.ra = i,
                this.R = new tt(0,0,2e3),
                this.R.Ea = function(g) {
                    g.fillStyle = t.R.v,
                    g.fillRect(0, t.R.R, g.canvas.width, g.canvas.height - t.R.R)
                }
                ,
                fi(Ci.qa().S, this.R),
                this.ka = new tt(0,0,2e3),
                this.ka.Ea = function(g) {
                    g.fillStyle = t.ka.v,
                    g.fillRect(0, 0, g.canvas.width, g.canvas.height)
                }
                ,
                y(this.ka, this);
                var I = new b(Pn,-340,360,2e3);
                ei(I),
                H(I, 200),
                y(I, this),
                I = new b(En,400,300,2e3),
                H(I, 200),
                ei(I),
                y(I, this),
                this.ha = new k(de.H(),30,"khaki"),
                i = i.createRadialGradient(0, 0, 0, 0, 0, 50),
                i.addColorStop(0, "rgba(240, 230, 140, 1)"),
                i.addColorStop(1, "rgba(240, 230, 140, 0)"),
                fi(this.ha, new k(new D(0,0,0),50,i)),
                y(this.ha, this),
                i = new b($n,0,0,300),
                H(i, 25),
                ei(i),
                fi(Ci.qa().S, i),
                this.W = [173, 224, 239],
                this.V = [0, 160, 208],
                this.U = new yI(0,250,2e3),
                this.U.U = 0,
                this.U.H = !1,
                y(this.U, this),
                this.T = new k(new D(0,1,1e3),2e3,"#000"),
                this.T.U = 0,
                this.T.ka = 1e3,
                this.T.H = !1,
                fi(Ci.qa().H, this.T),
                this.Aa = 0,
                this.v = new ri,
                y(this.v, this),
                this.$ = !1,
                Yi(O.qa(), this),
                DI(this)
            }
            o(Zt, x),
            Zt.prototype.ya = function(i) {
                x.prototype.ya.call(this, i),
                this.Aa += i,
                300 < this.Aa && (this.Aa = 0,
                DI(this))
            }
            ;
            function DI(i) {
                var t = i.ra.canvas.height
                  , I = .27 * t;
                i.R.v = i.ra.createLinearGradient(0, I, 0, t - I),// ground color
                i.R.v.addColorStop(0, "#beda78"),
                i.R.v.addColorStop(1, "#749948"),

                i.ka.v = i.ra.createLinearGradient(0, 0, 0, t), // sky color
                i.ka.v.addColorStop(0, "rgb(" + i.V[0] + "," + i.V[1] + "," + i.V[2] + ")"),
                i.ka.v.addColorStop(.3, "rgb(" + i.W[0] + "," + i.W[1] + "," + i.W[2] + ")"),
                i.ka.v.addColorStop(1, "#FFF")
            }
            Zt.prototype.Za = function(i) {
                i != 10 || this.$ ? i == 15 && DI(this) : Le(this)
            }
            ;
            function Le(i) {
                i.$ = !0,
                ni(i.v, new $(i.ha,1e5,new D(-180,-50,2e3))),
                p(i.v, 5e4, function() {
                    i.U.H = !0
                }),
                U(i.v, new E(25e3,[173, 224, 239],[255, 182, 193],It,function(t) {
                    return i.W = t
                }
                )),
                p(i.v, 0, function() {
                    i.T.H = !0
                }),
                p(i.v, 0, function() {
                    return J(O.qa(), 17)
                }),
                U(i.v, [new E(25e3,[255, 182, 193],[25, 25, 112],It,function(t) {
                    return i.W = t
                }
                ), new E(5e4,[0, 160, 208],[0, 0, 0],It,function(t) {
                    return i.V = t
                }
                ), new E(5e4,0,1,w,function(t) {
                    i.U.U = t
                }
                ), new E(4e4,0,.2,w,function(t) {
                    i.T.U = t
                }
                )]),
                p(i.v, 5e4, function() {
                    return wg(i)
                })
            }
            function wg(i) {
                i.$ = !0,
                ft(i.v, 5e4, function() {
                    ni(i.v, new $(i.ha,1e5,de.H()))
                }),
                U(i.v, [new E(25e3,[25, 25, 112],[255, 182, 193],It,function(t) {
                    return i.W = t
                }
                ), new E(5e4,[0, 0, 0],[0, 160, 208],It,function(t) {
                    return i.V = t
                }
                ), new E(4e4,1,0,w,function(t) {
                    i.U.U = t
                }
                ), new E(5e4,.2,0,w,function(t) {
                    i.T.U = t
                }
                )]),
                p(i.v, 0, function() {
                    return J(O.qa(), 18)
                }),
                p(i.v, 0, function() {
                    i.T.H = !1,
                    i.U.H = !1
                }),
                U(i.v, new E(25e3,[255, 182, 193],[173, 224, 239],It,function(t) {
                    return i.W = t
                }
                )),
                p(i.v, 1e5, function() {
                    return Le(i)
                })
            }
            function yI(i, t, I) {
                for (q.call(this, i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                ht(this, 3e3, 3e3),
                this.v = [],
                i = 0; 100 > i; i++)
                    this.v.push([-2e3 + 4e3 * Math.random(), -1e3 + 1200 * Math.random()])
            }
            o(yI, q),
            yI.prototype.Ea = function(i) {
                i.fillStyle = "#FFF";
                for (var t = z(this.v), I = t.next(); !I.done; I = t.next())
                    I = I.value,
                    i.beginPath(),
                    i.arc(I[0], I[1], 3, 0, 2 * Math.PI),
                    i.fill()
            }
            ;
            function tt(i, t, I) {
                q.call(this, i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                this.R = 0,
                this.v = null
            }
            o(tt, q),
            tt.prototype.Eb = function(i) {
                var t = d(this)
                  , I = t.z == 0 ? 0 : i.W / t.z
                  , g = t.y - d(i).y;
                return i.v && (g = Math.sin(i.v) * t.z + Math.cos(i.v) * g),
                this.R = -1 * I * g + i.T.height / 2,
                !0
            }
            ,
            tt.prototype.Wb = function() {}
            ,
            tt.prototype.mc = function() {
                return !0
            }
            ;
            var de = new D(-180,280,2e3);
            function It(i, t, I) {
                return [Math.round(w(i[0], t[0], I)), Math.round(w(i[1], t[1], I)), Math.round(w(i[2], t[2], I))]
            }
            function jt(i, t) {
                i = i === void 0 ? new D(0,0,0) : i,
                t = t === void 0 ? new D(0,0,0) : t,
                x.call(this),
                this.R = t,
                this.v = i
            }
            o(jt, x),
            jt.prototype.ya = function(i) {
                x.prototype.ya.call(this, i);
                var t = i / 1e3;
                this.v.x += Math.max(0, this.R.x * t),
                this.v.y += this.R.y * t,
                this.v.z += Math.max(0, this.R.z * t),
                this.ma && this.ma.Da(pg(this, this.ma.S, i))
            }
            ;
            function Te(i, t, I, g) {
                t instanceof D ? (i.v.x = t.x,
                i.v.y = t.y,
                i.v.z = t.z) : (i.v.x = t,
                i.v.y = I === void 0 ? i.v.y : I,
                i.v.z = g === void 0 ? i.v.z : g)
            }
            function pg(i, t, I) {
                return I /= 1e3,
                i = st(i.R.H().scale(.5 * I), i.v),
                st(i.scale(I), t)
            }
            function et(i, t, I, g) {
                i.R.x = t,
                i.R.y = I,
                i.R.z = g
            }
            var gi;
            i: {
                var me = xi.navigator;
                if (me) {
                    var fe = me.userAgent;
                    if (fe) {
                        gi = fe;
                        break i
                    }
                }
                gi = ""
            }
            function zg(i, t) {
                var I = Pg;
                return Object.prototype.hasOwnProperty.call(I, i) ? I[i] : I[i] = t(i)
            }
            var ve = X(gi, "Opera")
              , wi = X(gi, "Trident") || X(gi, "MSIE")
              , xg = X(gi, "Edge")
              , lt = X(gi, "Gecko") && !(X(gi.toLowerCase(), "webkit") && !X(gi, "Edge")) && !(X(gi, "Trident") || X(gi, "MSIE")) && !X(gi, "Edge")
              , CI = X(gi.toLowerCase(), "webkit") && !X(gi, "Edge");
            function we() {
                var i = xi.document;
                return i ? i.documentMode : void 0
            }
            var SI;
            i: {
                var LI = ""
                  , dI = function() {
                    var i = gi;
                    if (lt)
                        return /rv\:([^\);]+)(\)|;)/.exec(i);
                    if (xg)
                        return /Edge\/([\d\.]+)/.exec(i);
                    if (wi)
                        return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(i);
                    if (CI)
                        return /WebKit\/(\S+)/.exec(i);
                    if (ve)
                        return /(?:Version)[ \/]?(\S+)/.exec(i)
                }();
                if (dI && (LI = dI ? dI[1] : ""),
                wi) {
                    var TI = we();
                    if (TI != null && TI > parseFloat(LI)) {
                        SI = String(TI);
                        break i
                    }
                }
                SI = LI
            }
            var pe = SI
              , Pg = {};
            function di(i) {
                return zg(i, function() {
                    for (var t = 0, I = _I(String(pe)).split("."), g = _I(String(i)).split("."), A = Math.max(I.length, g.length), M = 0; t == 0 && M < A; M++) {
                        var c = I[M] || ""
                          , r = g[M] || "";
                        do {
                            if (c = /(\d*)(\D*)(.*)/.exec(c) || ["", "", "", ""],
                            r = /(\d*)(\D*)(.*)/.exec(r) || ["", "", "", ""],
                            c[0].length == 0 && r[0].length == 0)
                                break;
                            t = qt(c[1].length == 0 ? 0 : parseInt(c[1], 10), r[1].length == 0 ? 0 : parseInt(r[1], 10)) || qt(c[2].length == 0, r[2].length == 0) || qt(c[2], r[2]),
                            c = c[3],
                            r = r[3]
                        } while (t == 0)
                    }
                    return 0 <= t
                })
            }
            var ze, xe = xi.document;
            ze = xe && wi ? we() || (xe.compatMode == "CSS1Compat" ? parseInt(pe, 10) : 5) : void 0,
            wi && di("9"),
            !CI || di("528"),
            lt && di("1.9b") || wi && di("8") || ve && di("9.5") || CI && di("528"),
            lt && !di("8") || wi && di("9");
            function Ii() {
                this.wa = this.wa,
                this.Aa = this.Aa
            }
            Ii.prototype.wa = !1,
            Ii.prototype.Hc = function() {
                this.wa || (this.wa = !0,
                this.U())
            }
            ;
            function Ot(i, t) {
                t = on(Eg, t),
                i.wa ? Si(void 0) ? t.call(void 0) : t() : (i.Aa || (i.Aa = []),
                i.Aa.push(Si(void 0) ? rt(t, void 0) : t))
            }
            Ii.prototype.U = function() {
                if (this.Aa)
                    for (; this.Aa.length; )
                        this.Aa.shift()()
            }
            ;
            function Eg(i) {
                i && typeof i.Hc == "function" && i.Hc()
            }
            var pi = null;
            function Pe() {
                this.Sc()
            }
            function oi() {
                return pi || (pi = new mI),
                pi
            }
            var bg = _("cGxheQ==")
              , Qg = {
                1: [0, 186],
                2: [187, 304],
                3: [492, 93],
                4: [586, 187],
                5: [774, 717],
                6: [1492, 260],
                7: [1753, 127],
                8: [1881, 7349],
                9: [9231, 7875]
            };
            function Ji(i) {
                h && h[bg](i)
            }
            function mI(i) {
                Pe.apply(this, arguments)
            }
            o(mI, Pe),
            n = mI.prototype,
            n.Sc = function() {
                h = new ut.Howl({
                    src: [Co],
                    sprite: Qg
                })
            }
            ,
            n.Ac = function() {}
            ,
            n.zc = function() {
                Ji("6")
            }
            ,
            n.xc = function() {}
            ,
            n.yc = function() {
                Ji("2")
            }
            ,
            n.Rc = function() {
                Ji("7")
            }
            ,
            n.Lc = function() {}
            ,
            n.Oc = function() {}
            ,
            n.Qc = function() {
                Ji("1")
            }
            ,
            n.Nc = function() {
                Ji("4")
            }
            ,
            n.Rb = function() {
                Ji("8")
            }
            ,
            n.Mc = function() {
                Ji("9")
            }
            ,
            n.Pc = function() {}
            ,
            n.Za = function(i, t) {
                i === 4 && (t >= 6 ? this.Rb() : t >= 4 ? this.Mc() : this.zc())
            }
            ,
            n.uc = function() {
                h && h.unload()
            }
            ;
            function Yg() {
                this.R = this.S = this.v = this.H = 0
            }
            function Ee(i, t) {
                return new Pi(w(i.H, i.S, t),w(i.v, i.R, t))
            }
            var Wi = O.qa();
            function fI() {
                k.call(this, new D(0,0,0), .15, "#b22"), // red color
                this.$ = new Yt(.15),
                y(this.$, this),
                this.V = this.Fa = 0,
                this.R = new Yg,
                this.ha = null,
                this.wa = !1,
                this.ta = 0,
                this.v = new jt,
                et(this.v, 0, -9.8, 0),
                this.v.H = !1,
                y(this.v, this),
                this.va = [d(this).H()],
                this.ra = [],
                this.Ca = .7
            }
            o(fI, k),
            n = fI.prototype,
            n.reset = function() {
                this.wa = !1,
                this.ha = null,
                Bi(this, 0),
                et(this.v, 0, -9.8, 0)
            }
            ;
            function Rt(i, t, I, g) {
                Te(i.v, t, I, g),
                i.R.H = d(i).x,
                i.R.v = d(i).z,
                i.R.S = i.R.H + 10 * i.v.v.x,
                i.R.R = i.R.v + 10 * i.v.v.z
            }
            function Bi(i, t) {
                i.V = t,
                t != 2 && (i.va = []),
                t == 0 ? (i.v.H = !1,
                Rt(i, 0, 0, 0),
                i.$.H = !1) : (i.v.H = !0,
                i.$.H = !0)
            }
            n.getState = function() {
                return this.V
            }
            ;
            function be(i, t) {
                if (Bi(i, 2),
                !(-1 > t || 1 < t)) {
                    i.va = [d(i).H()],
                    oi().Nc();
                    var I = Math.max(.2, 1 - Math.abs(t))
                      , I = -2.1 * i.v.v.z * Math.pow(I, 1.6) + 5 * (1 - I);
                    i.Ca = .7,
                    Rt(i, Hi(I, 30 < I ? 60 : 85, 0 > t ? 85 + 65 * t : 95 + 65 * t)),
                    J(Wi, 1, vI(i))
                }
            }
            n.ya = function(i) {
                if (k.prototype.ya.call(this, i),
                62 < ai(d(this), R) && this.ma != Ci.qa().v) {
                    var t = Ci.qa().v;
                    y(this, t)
                } else
                    62 < ai(d(this), R) || this.ma !== Ci.qa().v || (t = Ci.qa().H,
                    y(this, t));
                this.V == 2 && 30 < this.va.push(d(this).H()) && this.va.shift(),
                this.V != 0 && (this.V == 1 && d(this).z <= AI.z && (Bi(this, 4),
                J(Wi, 2),
                oi().Rc()),
                i /= 1e3,
                0 < this.S.y - this.Ba().height / 2 ? (et(this.v, 0, -9.8, 0),
                this.W = ii(ti(this.W) + 20 * this.v.v.x * i),
                this.ta += this.v.v.z / 100 * i) : this.V == 2 && 62 < ai(d(this), R) ? (J(Wi, 4, this.wa ? 4 : 6),
                this.reset(),
                J(Wi, 3)) : this.V == 3 && 62 < ai(d(this), R) ? (this.reset(),
                J(Wi, 3)) : .1 < Math.abs(this.v.v.y) ? (et(this.v, 0, -9.8, 0),
                this.Da(this.S.x, this.Ba().height / 2),
                this.v.v.y = -1 * this.v.v.y * this.Ca,
                this.v.v.x += this.Fa,
                this.ha = null,
                this.wa = this.V == 2,
                this.Fa = 0,
                oi().Lc(ai(d(this), AI))) : (et(this.v, -1, 0, -1),
                this.Da(this.S.x, this.Ba().height / 2),
                this.v.v.y = 0,
                this.ha = null,
                this.W = ii(ti(this.W) + 10 * this.v.v.x * i),
                this.ta += this.v.v.z / 200 * i),
                this.R.H = d(this).x,
                this.R.v = d(this).z,
                this.$.Da(0, -d(this).y, 0),
                i = Math.max(.05, .5 - d(this).y / 10),
                this.$.U = i,
                H(this.$, 1 + d(this).y / 20))
            }
            ;
            function vI(i) {
                if (!i.ha)
                    if (0 >= i.S.y)
                        i.ha = i.S;
                    else {
                        var t = 0 >= i.S.y ? 0 : (-i.v.v.y - Math.sqrt(Math.pow(i.v.v.y, 2) - -39.2 * i.S.y / 2)) / -9.8;
                        i.ha = new D(d(i).x + i.v.v.x * t,0,d(i).z + i.v.v.z * t)
                    }
                return i.ha
            }
            n.Eb = function(i) {
                var t = k.prototype.Eb.call(this, i);
                if (t) {
                    this.ra = [];
                    for (var I = z(this.va), g = I.next(); !g.done; g = I.next())
                        this.ra.push(Ne(i, g.value, Di(this)))
                }
                return t
            }
            ,
            n.Ea = function(i) {
                if (this.V == 2) {
                    i.fillStyle = "#FFF",
                    i.save();
                    for (var t = 0; t < this.ra.length; t++) {
                        var I = this.ra[t];
                        I && (i.beginPath(),
                        i.setTransform(I.Ma, 0, 0, I.Oa, I.Xa, I.Ya),
                        i.arc(0, 0, .15 * t / this.ra.length, 0, 2 * Math.PI),
                        i.closePath(),
                        i.globalAlpha = t / this.ra.length,
                        i.fill())
                    }
                    i.restore()
                }
                k.prototype.Ea.call(this, i),
                i.save(),
                i.globalAlpha = .8,
                i.strokeStyle = "#FFF",
                i.lineWidth = .04,
                i.setLineDash([.06, .04]),
                i.arc(0, 0, .15, 0, 2 * Math.PI),
                i.clip(),
                i.beginPath(),
                t = -.15 + Math.abs(this.ta) / .15 * 2 % .3,
                i.moveTo(t, -.15),
                i.lineTo(t, .15),
                i.stroke(),
                i.restore()
            }
            ;
            function Hi(i, t, I) {
                return new D(i * Math.sin(ii(t)) * Math.cos(ii(I)),i * Math.cos(ii(t)),i * Math.sin(ii(t)) * Math.sin(ii(I)))
            }
            var Fi = {}
              , Bg = (Fi[0] = function() {
                return {
                    Vb: Hi(18 + 2.5 * (Math.random() - .5), 85, -91),
                    Ub: 0,
                    Mb: .7
                }
            }
            ,
            Fi[1] = function() {
                return {
                    Vb: Hi(18.5 + 2.5 * (Math.random() - .5), 89, -95),
                    Ub: 3,
                    Mb: .7
                }
            }
            ,
            Fi[2] = function() {
                return {
                    Vb: Hi(18.5 + 2.5 * (Math.random() - .5), 87, -89),
                    Ub: -2,
                    Mb: .7
                }
            }
            ,
            Fi[3] = function() {
                return {
                    Vb: Hi(23, 90, -91),
                    Ub: 0,
                    Mb: .7
                }
            }
            ,
            Fi[4] = function() {
                return {
                    Vb: Hi(13, 79, -91),
                    Ub: 0,
                    Mb: .7
                }
            }
            ,
            Fi[5] = function() {
                return {
                    Vb: Hi(14, 110, -91),
                    Ub: 0,
                    Mb: .9
                }
            }
            ,
            Fi);
            function wI(i, t, I) {
                for (q.call(this, i === void 0 ? 0 : i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                this.R = 0,
                this.v = [new b(Ht), new b(Ht), new b(Ht)],
                i = z(this.v),
                t = i.next(); !t.done; t = i.next())
                    y(t.value, this);
                for (i = z(this.v),
                t = i.next(); !t.done; t = i.next())
                    ei(t.value);
                Y(this.v[0], -.5, 0),
                Y(this.v[1], 0, 0),
                Y(this.v[2], .5, 0),
                nt(this, this.R)
            }
            o(wI, q);
            function nt(i, t) {
                i.R = $i(t, 0, 999),
                yi(i.v[0], Dt[Math.floor(i.R / 100 % 10)]),
                yi(i.v[1], Dt[Math.floor(i.R / 10 % 10)]),
                yi(i.v[2], Dt[Math.floor(i.R % 10)]),
                i.v[0].Da(-.2 - i.v[1].Ba().width / 2),
                i.v[2].Da(.2 + i.v[1].Ba().width / 2)
            }
            var Dt = [Ht, [0, 20, 2494, 26.2, 79.91], [0, 20, 2594, 50.73, 72.33], [0, 20, 2687, 50.7, 73.16], [0, 20, 2781, 65.42, 71.71], [0, 20, 2873, 55.04, 76.64], [0, 20, 2970, 52.84, 80.41], [0, 20, 3071, 46, 76.82], [0, 20, 3168, 59.81, 81.88], [0, 20, 3270, 52.36, 79.92]];
            function pI(i) {
                for (x.call(this, i),
                this.v = [],
                i = 0; 21 > i; i++)
                    this.v.push(new kt(new D(-60 + 6 * i,5,0))),
                    y(this.v[i], this),
                    this.v[i].H = !1;
                Yi(O.qa(), this)
            }
            o(pI, x),
            pI.prototype.Za = function(i, t) {
                if (i == 4) {
                    for (i = 0; i < this.v.length; i++)
                        if (!(3 >= t && i % 2)) {
                            this.v[i].H = !0,
                            this.v[i].Da(this.v[i].S.x, 5);
                            var I = this.v[i]
                              , g = t;
                            I.fillStyle = Hg[$i(g, 1, 6) - 1],
                            yi(I.v, Dt[g])
                        }
                }
            }
            ;
            function kt(i) {
                k.call(this, i, 1, "#FFF"),
                this.v = new b(Dt[0]),
                this.v.ka = -1,
                Y(this.v, 0, 0),
                ei(this.v),
                H(this.v, 1.5),
                this.v.ka = 2500,
                y(this.v, this),
                H(this, 2.5 + .2 * Math.random()),
                y(new jt(new D(0,10 + 8 * Math.random(),0)), this),
                this.ka = 2500
            }
            o(kt, k),
            kt.prototype.ya = function(i) {
                k.prototype.ya.call(this, i);
            
                // Instead of going straight up, add slight left-right movement
                this.S.x += 0.05 * Math.sin(d(this).y / 5);
            
                // Remove when it goes too high
                if (d(this).y > 100) {
                    this.H = false;
                }
            }
            ,
            kt.prototype.Ea = function(i) {
                // Draw the kite's string
                i.strokeStyle = "#000"; 
                i.beginPath();
                i.lineWidth = 0.04;
                i.moveTo(0, 0);
                i.lineTo(0, 3.5); // Increased string length
                i.stroke();
                
                // Draw the kite (diamond shape)
                i.beginPath();
                i.moveTo(0, -1.5); // Top point (increased height)
                i.lineTo(1.05, 0); // Right point (increased width)
                i.lineTo(0, 1.5); // Bottom point (increased height)
                i.lineTo(-1.05, 0); // Left point (increased width)
                i.closePath();
                i.fillStyle = "#cc1b41"; //this.fillStyle;
                i.fill();
                i.stroke();
                
                // Draw kite tail decorations
                i.beginPath();
                i.moveTo(0, 1.5); // Adjusted for new kite bottom
                i.lineTo(-0.3, 1.8); // Adjusted tail position
                i.lineTo(0.3, 1.8); // Adjusted tail position
                i.closePath();
                i.fill();
                i.stroke();

            };
            
            
            var Hg = "#FD0 #FD0 #4ED #9F0 #9F0 #F0F".split(" ");// ballon color
            function zI(i, t, I) {
                b.call(this, fn, i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                Y(this, .5, .3),
                ei(this),
                this.v = new xI(new D(0,0,0),this.Ba().width,"#FFF"),
                this.v.H = !1,
                y(this.v, this),
                this.R = new ri,
                y(this.R, this)
            }
            o(zI, b);
            function Gg(i) {
                i.v.H = !0,
                i.v.U = 1,
                i.v.Ga = ii(ti(i.W)),
                i.v.Ia = ii(ti(i.W)),
                i.R.v = [],
                p(i.R, 100),
                U(i.R, new E(100,1,0,w,function(t) {
                    i.v.U = t
                }
                )),
                p(i.R, 0, function() {
                    i.v.H = !1
                })
            }
            zI.prototype.ya = function(i) {
                b.prototype.ya.call(this, i),
                this.v.H && (this.v.Ga = ii(ti(this.W))),
                this.ka = 90 > ti(this.W) ? -.5 : -2
            }
            ;
            function xI(i) {
                k.apply(this, arguments)
            }
            o(xI, k),
            xI.prototype.Ea = function(i) {
                this.fillStyle = i.createLinearGradient(-this.Ba().width / 2, 0, this.Ba().width / 2, .01),
                this.fillStyle.addColorStop(0, "rgba(255, 255, 255, 0.0)"),
                this.fillStyle.addColorStop(1, "#FFF"),
                k.prototype.Ea.call(this, i)
            }
            ;
            function Ut(i, t) {
                b.call(this, wn, t),
                this.ta = new b(zn,new D(-.27,.35,.14)),
                ei(this.ta),
                Y(this.ta, -.5, -.5),
                this.V = new b(pn,new D(-.4,.55,0)),
                ei(this.V),
                Y(this.V, 0, .5),
                y(this.ta, this),
                y(this.V, this),
                this.V.H = !1,
                this.R = i,
                this.Ja = 0,
                this.$ = new ri,
                y(this.$, this),
                this.wa = 0,
                this.v = [0],
                Yi(O.qa(), this)
            }
            o(Ut, b),
            Ut.prototype.Za = function(i) {
                i == 2 && (this.wa = 0,
                this.v = [0])
            }
            ;
            function PI(i) {
                return new D(d(i).x - .55,d(i).y + 1.4,d(i).z - .1)
            }
            function EI(i) {
                i.ta.H = !0,
                i.V.H = !1,
                Bi(i.R, 0),
                i.Ja = 1,
                p(i.$, 200),
                U(i.$, new $(i,600,ne(i.S, new D(0,0,5)))),
                p(i.$, 200),
                U(i.$, new $(i,500,i.S,{
                    Xc: at
                })),
                p(i.$, 0, function() {
                    i.Ja = 0,
                    i.ta.H = !1,
                    i.V.H = !0;
                    var t = i.R
                      , I = i.v[Math.floor(Math.random() * i.v.length)];
                    t.wa = !1,
                    Bi(t, 1),
                    I = Bg[I](),
                    t.Fa = I.Ub,
                    t.Ca = I.Mb,
                    Rt(t, I.Vb),
                    oi().yc(),
                    J(Wi, 0),
                    i.wa++,
                    i.wa == 1 ? i.v.push(1) : i.wa == 3 ? i.v.push(2) : i.wa == 5 ? (i.v.push(3),
                    i.v.push(4)) : i.wa == 10 && (i.v.push(3),
                    i.v.push(1),
                    i.v.push(2),
                    i.v.push(5))
                })
            }
            Ut.prototype.ya = function(i) {
                b.prototype.ya.call(this, i),
                this.R.getState() == 3 && 2 > d(this.R).y && 1.1 > Tt(ki(this.R), ki(this)) ? Zg(this) : this.Ja == 1 && this.R.Da(PI(this))
            }
            ;
            function Zg(i) {
                // on run complete
                // console.log("======Zg====> ");
                Bi(i.R, 0),
                i.ta.H = !0,
                i.V.H = !1,
                ni(i.$, new $(i.R,200,PI(i),{
                    nb: function() {
                        i.Ja = 1,
                        J(O.qa(), 3)
                    }
                }))
            }
            function Ki(i, t, I, g, A, M) {
                // console.log("======button====> ",t);
                g = g === void 0 ? mi : g,
                A = A === void 0 ? "#fff" : "#cc1b41", // bat button color
                M = M === void 0 ? !1 : M,
                k.call(this, i, 39.6, "#424d21"), // bat button shadow color
                this.v = new b(t),
                Y(this.v, 0, 0),
                this.v.Sb(!0),
                i = this.Ba(),
                vg(this.v, i.width - .4 * i.width, i.height - .4 * i.height),
                this.V = new k(new D(0,-12,0),37.44,A),
                this.V.Sb(!0),
                y(this.V, this),
                y(this.v, this.V),
                this.$ = !1,
                this.Sb(!0),
                this.U = .46,
                this.R = M,
                this.va = I,
                this.ra = g,
                this.ha = !1
            }
            o(Ki, k);
            function hi(i, t) {
                (i.$ = t) || Gi(i, !1)
            }
            function Gi(i, t, I) {
                return I = I === void 0 ? !0 : I,
                t == i.ha ? !1 : ((i.ha = t) ? (i.V.Da(0, 0),
                I && i.ra()) : (i.V.Da(0, -12),
                I && i.va()),
                !0)
            }
            function bI(i, t) {
                if (!i.$)
                    return !1;
                if (i.R)
                    return !0;
                var I = t.x - d(i).x;
                return t = t.y - d(i).y + 12 * Di(i),
                I = Math.sqrt(I * I + t * t),
                i = new Ai(i.Ba().width * Di(i),i.Ba().height * Di(i)),
                I < .5 * i.width
            }
            function Jt(i, t, I) {
                Ii.call(this),
                this.V = i,
                this.ra = t,
                this.va = I,
                this.ka = Ri(),
                this.ha = re(document, "hidden"),
                this.v = (this.W = re(document, "visibilityState")) ? this.W.replace(/state$/i, "change").toLowerCase() : null,
                this.R = Og(this),
                this.T = !1,
                this.ma = this.R,
                QI(this)
            }
            Xt(Jt, Ii),
            Jt.prototype.U = function() {
                window.clearTimeout(this.S),
                window.clearTimeout(this.$),
                this.H && (this.v && document.removeEventListener ? document.removeEventListener(this.v, this.H, !1) : window.agsa_ext && window.agsa_ext.registerPageVisibilityListener && (this.H = null)),
                Jt.Tc.U.call(this)
            }
            ;
            function Og(i) {
                if (!i.ha && !i.W && window.agsa_ext && window.agsa_ext.getPageVisibility)
                    return window.agsa_ext.getPageVisibility() == "hidden";
                var t = document[i.W];
                return document[i.ha] || t == "hidden"
            }
            function Qe(i) {
                // console.log("======Qe====> ");
                var t = i.R || i.T;
                i.ma && !t ? (i.ma = !1,
                i.va(),
                QI(i)) : !i.ma && t && (i.ma = !0,
                i.ra())
            }
            function QI(i) {
                i.S && window.clearTimeout(i.S);
                var t = Math.max(100, i.V - Ye(i));
                i.S = window.setTimeout(function() {
                    i.S = null,
                    i.T = Ye(i) >= i.V,
                    i.T || QI(i),
                    Qe(i)
                }, t)
            }
            function Ye(i) {
                return Ri() - i.ka
            }
            function Wt(i) {
                i.ka = Ri(),
                i.T = !1,
                Qe(i)
            }
            function YI(i, t) {
                Ii.call(this);
                var I = this;
                this.H = [],
                this.v = t,
                this.R = function(M) {
                    if (M.type == "contextmenu")
                        M.preventDefault();
                    else {
                        var c;
                        if (c = M || window.event) {
                            var r = c.targetTouches && c.targetTouches[0] || c.changedTouches && c.changedTouches[0];
                            c = r && r.pageX !== void 0 ? [r.pageX, r.pageY] : c.clientX !== void 0 ? [c.clientX + (document.dir == "rtl" ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), c.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : c.pageX !== void 0 ? [c.pageX, c.pageY] : [0, 0]
                        } else
                            c = [0, 0];
                        var r = t
                          , S = 0
                          , m = 0;
                        if (r)
                            do
                                S += r.offsetLeft,
                                m += r.offsetTop;
                            while (r = r.offsetParent);
                        if (r = [S, m],
                        r = [c[0] - r[0], c[1] - r[1]],
                        c = r[0] * t.width / t.clientWidth,
                        r = r[1] * t.height / t.clientHeight,
                        S = M.type,
                        S == "touchstart" ? S = "mousedown" : S == "touchmove" ? S = "mousemove" : S == "touchend" && (S = "mouseup"),
                        c = new D(c,r,0),
                        S == "mousedown") {
                            for (S = z(I.H),
                            r = S.next(); !r.done; r = S.next())
                                r = r.value,
                                bI(r, c) && Gi(r, !0);
                            I.v.focus()
                        } else if (S == "mouseup")
                            for (S = z(I.H),
                            r = S.next(); !r.done; r = S.next())
                                r = r.value,
                                r.ha && (m = bI(r, c),
                                Gi(r, !1, m));
                        else if (S == "mousemove") {
                            for (S = "default",
                            m = z(I.H),
                            r = m.next(); !r.done; r = m.next())
                                if (bI(r.value, c)) {
                                    S = "pointer";
                                    break
                                }
                            I.v.style.cursor = S
                        }
                        M.cancelable && M.preventDefault(),
                        Wt(i)
                    }
                }
                ,
                this.S = "mousedown mouseup mousemove touchstart touchend touchmove contextmenu".split(" ");
                for (var g = z(this.S), A = g.next(); !A.done; A = g.next())
                    t.addEventListener(A.value, this.R, !1)
            }
            o(YI, Ii),
            YI.prototype.U = function() {
                for (var i = z(this.S), t = i.next(); !t.done; t = i.next())
                    this.v.removeEventListener(t.value, this.R, !1);
                Ii.prototype.U.call(this)
            }
            ;
            function Rg(i) {
                this.H = i,
                this.R = i.clientWidth,
                this.S = i.clientHeight,
                this.v = 2,
                BI(this)
            }
            function BI(i) {
                i.R = i.H.clientWidth,
                i.S = i.H.clientHeight,
                i.H.width = i.R * i.v,
                i.H.height = i.S * i.v,
                J(O.qa(), 15)
            }
            function kg(i) {
                var t = i.v;
                i.v = 1,
                t != 1 && BI(i)
            }
            function Be(i) {
                this.v = i,
                this.T = this.U = this.R = this.S = this.H = 0,
                this.ma = 768
            }
            function Ug(i) {
                i.S = 2.5,
                i.H = 0,
                i.ma = jn,
                i.U = ln,
                i.T = i.v.clientWidth,
                i.R = i.v.clientHeight
            }
            Be.prototype.reset = function() {
                this.H = this.S = 0
            }
            ;
            function Jg() {
                this.H = this.v = 0
            }
            function HI(i, t, I) {
                b.call(this, _n, I),
                this.ta = I.H(),
                this.V = 0,
                this.v = i,
                this.$ = t,
                this.R = new ri,
                y(this.R, this)
            }
            o(HI, b);
            function yt(i, t) {
                i.R.v = [],
                i.V = t
            }
            function Wg(i) {
                return new D(d(i).x,d(i).y + .6,d(i).z)
            }
            HI.prototype.ya = function(i) {
               
                b.prototype.ya.call(this, i);
                var t = this.v.Aa.H - this.Aa.H;
                if (2 < Math.abs(t) && (this.Hb = 0 > t),
                this.v.getState() == 2 && 2 >= d(this.v).y) {
                   
                    
                    if (t = Tt(ki(this.v), ki(this)),
                    1.1 > t) {
                        Fg(this);
                        return
                    }
                    t < 1.1 * 3 && (this.V = 1)
                }
                if (this.V == 1) {
                   
                    var t = d(this.v)
                      , I = d(this)
                      , g = this.v.v.v;
                    if (2 > ai(t, I))
                        t = t.H();
                    else {
                       
                        var I = ki(this)
                          , A = this.v.R
                          , M = I;
                        if (M instanceof Pi) {
                            var c = M.y;
                            M = M.x
                        } else
                            c = void 0;
                        var r = A.H
                          , S = A.v
                          , m = A.S - A.H
                          , K = A.R - A.v
                          , I = Tt(I, Ee(A, $i(((Number(M) - r) * (A.S - r) + (Number(c) - S) * (A.R - S)) / (m * m + K * K), 0, 1)));
                        2 > t.y && 1.1 > I ? t = t.H() : (I /= 5,
                        A = st(g.H().scale(I), t),
                        2 < Math.max(0, t.y + g.y * I + -4.9 * Math.pow(I, 2)) && vI(this.v) && (A = vI(this.v)),
                        t = A)
                    }
                    t.y = 0,
                    .2 < ai(t, this.S) && (t = iI(t, d(this)),
                    t = t.scale(1 / ee(t)),
                    i = st(t.scale(5 * i / 1e3), d(this)),
                    62 > ai(i, R) && this.Da(i))
                   
                }
            }
            ;
            function Fg(i) {
                Bi(i.v, 0),
                J(Wi, 9),
                yt(i, 2),
                U(i.R, new $(i.v,200,Wg(i))),
                p(i.R, 100, function() {
                    var t = i.v
                      , I = d(i.$);
                    Bi(t, 3);
                    var I = iI(I, d(t))
                      , A = ee(I)
                      , g = Math.pow(30, 4) - Math.pow(-9.8, 2) * Math.pow(A, 2)
                      , A = 0 > g ? 45 : -ti(Math.atan((Math.pow(30, 2) + Math.sqrt(g)) / (-9.8 * A)));
                    oi().yc(),
                    Rt(t, Hi(30, A, ti(Math.atan2(I.z, I.x))))
                })
            }
            function Kg(i, t) {
                t = t === void 0 ? !0 : t,
                yt(i, 3);
                var I = i.ta.H();
                t && (I.x += -3 + 6 * Math.random(),
                I.z += -3 + 6 * Math.random()),
                t = ai(d(i), I),
                U(i.R, new $(i,(800 + 200 * Math.random()) * t / 5,I,{
                    nb: function() {
                        return yt(i, 0)
                    }
                }))
            }
            var Vg = [new D(-6,0,R.z + 15), new D(10,0,R.z + 15), new D(-8,0,R.z + 50), new D(8,0,R.z + 50), new D(-25,0,R.z + 20), new D(26,0,R.z + 22), new D(-25,0,R.z + 10), new D(26,0,R.z + 10), new D(15,0,R.z)];
            function GI(i, t) {
                x.call(this),
                this.U = i,
                this.v = [];
                for (var I = z(Vg), g = I.next(); !g.done; g = I.next())
                    g = new HI(i,t,g.value),
                    this.v.push(g),
                    y(g, this);
                this.T = this.R = null,
                Yi(O.qa(), this)
            }
            o(GI, x),
            GI.prototype.Za = function(i, t) {
                if (i == 1) {
                    i = this.U.R;
                    for (var I = Number.MAX_SAFE_INTEGER, g = z(this.v), A = g.next(); !A.done; A = g.next()) {
                        A = A.value,
                        ki(A);
                        var M = ai(d(A), t);
                        M < I && 0 <= t.x * d(A).x && (I = M,
                        this.R = A)
                    }
                    for (I = Number.MAX_SAFE_INTEGER,
                    g = z(this.v),
                    A = g.next(); !A.done; A = g.next())
                        A = A.value,
                        A !== this.R && (M = Tt(ki(A), Ee(i, .5)),
                        M < I && (I = M,
                        this.T = A));
                    for (yt(this.R, 1),
                    yt(this.T, 1),
                    i = z(this.v),
                    A = i.next(); !A.done; A = i.next())
                        I = A.value,
                        I !== this.R && I !== this.T && (A = t,
                        I.R.v = [],
                        A = ge(d(I), A, .05 + .2 * Math.random()),
                        g = ai(d(I), A),
                        U(I.R, new $(I,(800 + 200 * Math.random()) * g / 5,A)))
                } else if (i == 3 || i == 2)
                    for (t = z(this.v),
                    A = t.next(); !A.done; A = t.next())
                        Kg(A.value, i != 2)
            }
            ;
            function Ft(i, t) {
                k.call(this, i, .5, ["#0FF", "#FF0", "#F0F", "lime", "#FFD"][Math.floor(5 * Math.random())]),
                this.v = new jt,
                et(this.v, 0, -9.8, 0),
                Te(this.v, t),
                y(this.v, this),
                this.R = 0,
                this.V = []
            }
            o(Ft, k),
            Ft.prototype.ya = function(i) {
                k.prototype.ya.call(this, i);
                for (var t = z(this.V), I = t.next(); !I.done; I = t.next())
                    I = I.value,
                    I[0] += I[2] * i / 1e3,
                    I[1] -= I[3] * i / 1e3,
                    I[5] -= i / 2e3;
                if (.1 > this.v.v.y && this.R == 0)
                    for (this.R = 1,
                    i = 0; 10 > i; i++)
                        this.V.push([0, 0, -10 + 20 * Math.random(), -5 + 20 * Math.random(), "#FD0 #FD0 #4ED #9F0 #9F0 #F0F".split(" ")[Math.floor(5 * Math.random())], 1]);
                else
                    this.R == 1 && 0 >= d(this).y && ui(this)
            }
            ,
            Ft.prototype.Ea = function(i) {
                if (this.R == 0)
                    k.prototype.Ea.call(this, i);
                else {
                    i.globalCompositeOperation = "screen";
                    for (var t = z(this.V), I = t.next(); !I.done; I = t.next())
                        I = I.value,
                        0 >= I[5] || (i.beginPath(),
                        i.globalAlpha = I[5],
                        i.arc(I[0], I[1], .3, 0, 2 * Math.PI),
                        i.fillStyle = I[4],
                        i.fill());
                    i.globalCompositeOperation = "source-over"
                }
            }
            ;
            function He() {
                x.call(this);
                var i = this;
                this.v = new ri,
                y(this.v, this);
                for (var t = {
                    i: 0
                }; 21 > t.i; t = {
                    i: t.i
                },
                t.i++)
                    ft(this.v, 50 * t.i, function(I) {
                        return function() {
                            var g = new Ft(new D(-60 + 6 * I.i,0,R.z + 62),new D(0,15 + 5 * Math.random(),0));
                            y(g, i)
                        }
                    }(t))
            }
            o(He, x);
            function ZI(i) {
                Ii.call(this),
                this.v = i,
                this.H = function(t) {
                    return t.preventDefault()
                }
                ,
                wt && (window.addEventListener("touchmove", this.H, { passive: false }),
                document.addEventListener("touchmove", this.H, { passive: false }),
                document.body.addEventListener("touchmove", this.H, { passive: false }))
            }
            o(ZI, Ii),
            ZI.prototype.U = function() {
                wt && (
                    window.removeEventListener("touchmove", this.H, { passive: false }),
                    document.removeEventListener("touchmove", this.H, { passive: false }),
                    document.body.removeEventListener("touchmove", this.H, { passive: false })
                ),
                Ii.prototype.U.call(this)
            }
            ;
            function Ge(i, t, I) {
                Ki.call(this, i, vn, I, t, "gold", !0)
            }
            o(Ge, Ki);
            var Kt, Ze = {
                Pa: !0,
                Qa: !1,
                Ra: !1,
                $a: !0,
                Na: !0,
                Sa: !0,
                Ta: !1,
                ab: !1,
                kb: !1,
                Wa: !0,
                hb: !0,
                name: 6
            };
            function Oe() {
                Kt == null && (Kt = Ze)
            }
            function Xg(i, t) {
                if (!Re)
                    return t;
                try {
                    var I = window.localStorage.getItem(i)
                } catch {
                    return t
                }
                return I == null ? t : JSON.parse(I)
            }
            function qg(i, t) {
                if (Re)
                    try {
                        window.localStorage.setItem(i, JSON.stringify(t))
                    } catch {}
            }
            var Re = !!self.localStorage;
            function Vt(i, t, I) {
                x.call(this, i === void 0 ? 0 : i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                i = new V(sI,Ni(new D(10,6,0)),{
                    fillStyle: "#48B" // score board color
                }),
                y(i, this),
                i = new V(new D(0,0,-2),Ni(new D(10,6,0)),{
                    strokeStyle: "#FFF",
                    lineWidth: .2
                }),
                y(i, this),
                this.v = 0,
                this.R = Xg("dc-score", 0),
                this.W = new wI(0,0,-2),
                H(this.W, 3),
                y(this.W, this),
                i = new b(ng,-3.5,4),
                H(i, 1.3),
                ei(i),
                y(i, this),
                this.U = new wI(1,5,0),
                H(this.U, 2.5),
                nt(this.U, this.R),
                y(this.U, this),
                this.ka = new ri,
                y(this.ka, this),
                this.T = 50,
                Yi(O.qa(), this)
            }
            o(Vt, x),
            Vt.prototype.reset = function() {
                this.v = 0,
                this.T = 50,
                nt(this.W, this.v)
            }
            ,
            Vt.prototype.Za = function(i, t) {
                var I = L.a[i];
                I && I(t);
                var g = this;
                if (i == 4) {
                    oi().Za(i, t);
                    var A = this.v;
                    this.v += t,
                    L.g[9](this.v),
                    i = {};
                    for (var M = 1; M <= t; i = {
                        j: i.j
                    },
                    M++)
                        i.j = M,
                        p(this.ka, 150, function(c) {
                            return function() {
                                nt(g.W, A + c.j),
                                A + c.j > g.R && nt(g.U, A + c.j)
                            }
                        }(i));
                    A < this.T && this.v >= this.T && (this.T % 100 == 50 ? J(O.qa(), 10) : J(O.qa(), 11),
                    this.T += 50),
                    p(this.ka, 0, function() {
                        g.v > g.R && (g.R = g.v,
                        nt(g.U, g.R))
                    })
                } else
                    i == 2 && this.v >= this.R && qg("dc-score", this.R)
            }
            ,
            !lt && !wi || wi && 9 <= Number(ze) || lt && di("1.9.1"),
            wi && di("9");
            var OI = 0
              , Mi = {};
            function gt(i) {
                Mi.c = i,
                Vi(1);
                var t = L.g[i];
                t && t()
            }
            function Vi(i) {
                var t = L.u[i];
                t && t();
                var I = Ri();
                i == 0 && (OI = I),
                Mi.e = i,
                Mi.t = OI == 0 ? -1 : Math.floor(I - OI),
                Mi.m = nI ? 1 : 0,
                i = window.document,
                i = i.compatMode == "CSS1Compat" ? i.documentElement : i.body,
                i = new Ai(i.clientWidth,i.clientHeight),
                Mi.w = i.width > i.height ? 1 : 0,
                Mi.o = "orientation"in window ? parseInt(window.orientation, 10) : "_",
                i = [];
                for (var g in Mi)
                    Mi.hasOwnProperty(g) && i.push(g + ":" + Mi[g])
            }
            function RI(i, t, I) {
              
                x.call(this);
                var g = this;
                this.ta = i,
                this.Ga = I,
                this.T = new Ge(new D(0,150,0),function() {
                    // bat click
                    // console.log("======T====> ");
                  
                    g.v.R = [],
                    J(O.qa(), 7)
                }
                ,function() {
                    // bat click
                    // console.log("======NT====> ");
                    J(O.qa(), 8, g.W == 2)
                }
                ),
                hi(this.T, !0),
                y(this.T, this),
                this.R = new Ki(new D(0,0,0),xn,function() {}
                ),
                H(this.R, .7),
                Y(this.R.v, .03, -.01),
                this.R.H = !1,
                this.R.R = !0,
                y(this.R, this),
                Oe(),
                (this.Fa = Kt.Sa) && hi(this.R, !0),
                this.$ = new x(0,150,0),
                y(this.$, this),
                this.v = new ri,
                y(this.v, this),
                this.W = 3,
                i = 1.5 * this.T.Ba().width,
                this.V = new Ki(new D(i,0,0),eg,function() {
                    Vi(6)
                }
                ),
                y(this.V, this.$), //game over button Attach button to parent, making it part of the visible hierarchy
                this.ka = new Ki(new D(-i,0,0),Ig,function() {
                    J(O.qa(), 13)
                }
                ),
                Y(this.ka.v, .05, -.01),
                y(this.ka, this.$), //game over button  Attach button to parent, making it part of the visible hierarchy
                this.U = new Ki(new D(0,0,0),tg,function() {
                    return J(O.qa(), 5)
                }
                ),
                H(this.U.v, 1.1),
                Y(this.U.v, .05, 0),
                y(this.U, this.$), //game over button  Attach button to parent, making it part of the visible hierarchy
                this.Ca = !1,
                this.va = new kI,
                this.va.Da(0, -20, 0),
                H(this.va, .4),
                this.va.W = ii(-80),
                y(this.va, this.T),
                ke(this)
            }
            o(RI, x);
            function _g(i) {
                var t = [i.R, i.T];
                return t.push(i.ka),
                t.push(i.U),
                t.push(i.V),
                t
            }
            function ot(i, t) {
                t != i.W && (i.W = t,
                i.v.v = [],
                i.v.R = [],
                t != 2 && ui(i.va),
                i.Ca = !1,
                t == 0 || t == 2 ? (hi(i.V, !1),
                hi(i.ka, !1),
                hi(i.U, !1),
                U(i.v, [new $(i.$,500,new D(0,150,0),{
                    Ha: at
                }), new $(i.T,500,new D(0,0,0),{
                    Ha: at
                })]),
                t == 2 && p(i.v, 0, function() {
                    ni(i.v, new E(2e4,0,20 * Math.PI,w,function(I) {
                        I = !!Math.round(Math.abs(Math.sin(I)) - .44),
                        i.va.Da(i.va.S.x, -20 + 15 * I),
                        Gi(i.T, I, !1) && (I ? J(O.qa(), 7) : J(O.qa(), 8, !1))
                    }
                    ))
                }),
                p(i.v, 0, function() {
                    hi(i.T, !0)
                })) : t == 1 && (hi(i.T, !1),
                i.$.Da(0, 0, 0),
                H(i.V, 0),
                H(i.ka, 0),
                H(i.U, 0),
                ni(i.v, new $(i.T,500,new D(0,150,0),{
                    Ha: at
                })),
                p(i.v, 1e3, function() {
                    ni(i.v, new E(200,0,1,w,function(I) {
                        return H(i.ka, I)
                    }
                    ))
                }),
                p(i.v, 100, function() {
                    ni(i.v, new E(200,0,1,w,function(I) {
                        return H(i.U, I)
                    }
                    ))
                }),
                p(i.v, 100, function() {
                    ni(i.v, new E(200,0,1,w,function(I) {
                        return H(i.V, I)
                    }
                    ))
                }),
                p(i.v, 0, function() {
                    hi(i.V, !0),
                    hi(i.ka, !0),
                    hi(i.U, !0)
                })))
            }
            RI.prototype.ya = function() {
                (d(this).y != this.ta.height - .07 * this.ta.height || d(this).x != this.ta.width / 2) && (ke(this),
                this.W == 1 && (hi(this.V, !0),
                hi(this.ka, !0),
                hi(this.U, !0)))
            }
            ;
            function ke(i) {
                var t = i.ta.width / 2
                  , I = i.ta.height - .07 * i.ta.height
                  , g = i.ta.height / 720;
                i.Da(t, I, 0),
                H(i, g),
                i.R.Da(t / g - 42, I / g - 1279, 0)
            }
            function kI(i, t, I, g) {
                si.call(this, t === void 0 ? 0 : t, I === void 0 ? 0 : I, g === void 0 ? 0 : g)
            }
            o(kI, si),
            kI.prototype.Ea = function(i) {}
            ;
            function UI(i, t, I, g) {
                Ii.call(this);
                var A = this;
                this.R = {};
                for (var M = 0, c; c = t[M++]; )
                    this.R[c] = !0;
                for (this.H = null,
                t = document.getElementsByTagName("input"),
                M = 0; c = t[M++]; )
                    c.name == "q" && (this.H = c);
                this.v = function(r) {
                    Ue(A, r) && (Wt(i),
                    r.preventDefault(),
                    r.stopPropagation(),
                    I(r))
                }
                ,
                this.S = function(r) {
                    Ue(A, r) && (Wt(i),
                    r.preventDefault(),
                    r.stopPropagation(),
                    g(r))
                }
                ,
                document.addEventListener("keydown", this.v, !1),
                document.addEventListener("keyup", this.S, !1)
            }
            o(UI, Ii);
            function Ue(i, t) {
                return i.R[t.which] && !t.ctrlKey && !t.metaKey && !t.altKey && (!i.H || i.H != document.activeElement)
            }
            UI.prototype.U = function() {
                document.removeEventListener("keydown", this.v, !1),
                document.removeEventListener("keyup", this.S, !1),
                Ii.prototype.U.call(this)
            }
            ;
            function At() {
                this.H = 0
            }
            At.prototype.reset = function() {
                this.H = 0,
                Mi.s = this.H
            }
            ;
            function Je(i) {
                At.qa(),
                Mi.d1 = i
            }
            At.prototype.Za = function(i, t) {
                i == 4 ? (this.H += t,
                Mi.s = this.H) : i == 2 ? (Vi(2),
                gt(4),
                this.H = 0,
                Mi.s = this.H) : i == 13 ? Vi(3) : i == 5 ? (Vi(4),
                Vi(0),
                gt(5)) : i == 16 ? Mi.d2 = Math.round(t) : i == 12 ? (Vi(0),
                gt(3)) : i == 19 && gt(2)
            }
            ,
            qi(At);
            function We(i) {
                b.call(this, ig, i),
                this.R = new ri,
                y(this.R, this),
                this.ra = new Ui(-.5,-1,1,1),
                Y(this, 0, .5),
                H(this, 1.7),
                ei(this),
                this.v = new b([Gn, Zn, kn, Un, Jn, Wn, Fn, Kn, Vn, Xn, On, Rn]),
                y(this.v, this),
                Y(this.v, 0, -.3),
                H(this.v, 0),
                Li(this.v, 1.15, 1.15),
                this.v.U = 0
            }
            o(We, b);
            function Fe(i) {
                U(i.R, [new E(300,0,1,w,function(t) {
                    i.v.U = t
                }
                ), new E(300,0,3,w,function(t) {
                    return H(i.v, t)
                }
                )]),
                p(i.R, 0, function() {
                    i.v.Ia = !0
                }),
                U(i.R, new E(600,.5,-.5,w,function(t) {
                    return Y(i, 0, t)
                }
                ,{
                    Ha: at
                }))
            }
            function $g(i) {
                U(i.R, new E(600,-.5,.5,w,function(t) {
                    return Y(i, 0, t)
                }
                )),
                U(i.R, [new E(300,1,0,w,function(t) {
                    i.v.U = t
                }
                ), new E(300,3,0,w,function(t) {
                    return H(i.v, t)
                }
                )]),
                p(i.R, 0, function() {
                    i.H = !1,
                    i.v.reset()
                })
            }
            function JI(i) {
                x.call(this, i),
                i = new V(new D(0,0,-5.64),Ni(new D(3.66,0,11.28)),{
                    fillStyle: "tan"
                }),
                y(i, this),
                i = new V(sI,Ni(new D(3.66,0,11.28)),{
                    fillStyle: "tan"
                }),
                y(i, this),
                i = new V(new D(0,0,5.64),Ni(new D(3.66,0,11.28)),{
                    fillStyle: "tan"
                }),
                y(i, this),
                i = new D(3.66,0,.15);
                var t = new V(new D(0,0,8.64),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                });
                y(t, this),
                i = new V(new D(0,0,-8.64),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(i, this),
                i = new D(2.49,0,.15),
                t = new V(new D(0,0,10.06),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(t, this),
                i = new V(new D(0,0,-10.06),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(i, this),
                i = new D(.15,0,11.28 - 8.64 - .075),
                t = new V(new D(-1.32,0,-10.06 + .075),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(t, this),
                t = new V(new D(-1.32,0,10.06 - .075),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(t, this),
                t = new V(new D(1.32,0,-10.06 + .075),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(t, this),
                i = new V(new D(1.32,0,10.06 - .075),Ni(i),{
                    fillStyle: "rgba(255,255,255,0.3)"
                }),
                y(i, this),
                i = Math.PI;
                var t = 2 * Math.PI
                  , I = new V(sI,Qt(new Ai(62,62), i, t),{
                    strokeStyle: "white"
                });
                y(I, this);
                for (var I = Qt(90, i, t, 20), I = z(I), g = I.next(); !g.done; g = I.next()) {
                    for (var g = g.value, A = new x(g), M = 0; 6 > M; M++) {
                        var c = g.x + -4.5 + 1.5 * M;
                        13 >= c && -13 <= c || (c = new b(bn),
                        H(c, 2.5),
                        Y(c, -4.5 + 1.5 * M, -.5 - Math.random() / 3),
                        ei(c),
                        y(c, A))
                    }
                    y(A, this)
                }
                for (I = 15,
                g = 0; g < I + 1; g++) {
                    var A = 112 * Math.cos(i - (g + 1) / I * (t - i))
                      , M = 112 * Math.sin(i - (g + 1) / I * (t - i))
                      , c = 112 * Math.cos(i - g / I * (t - i))
                      , r = 112 * Math.sin(i - g / I * (t - i))
                      , A = new V(new D(0,0,0),[new D(A,0,M), new D(c,0,r), new D(c,6,r), new D(A,6,M)],{
                        fillStyle: "#fa002e" //boundary color
                    });
                    y(A, this)
                }
                for (this.R = [],
                Ke(this, Hn, 86, i - .3, t - .3, 11),
                Ke(this, Bn, 82, i, t, 10),
                I = 20,
                g = 0; g < I + 1; g++)
                    A = 72 * Math.cos(i - (g + 1) / I * (t - i)),
                    M = 72 * Math.sin(i - (g + 1) / I * (t - i)),
                    c = 72 * Math.cos(i - g / I * (t - i)),
                    r = 72 * Math.sin(i - g / I * (t - i)),
                    A = new V(new D(0,0,0),[new D(A,0,M), new D(c,0,r), new D(c,1,r), new D(A,1,M)],{
                        fillStyle: "white"
                    }),
                    y(A, this);
                Yi(O.qa(), this),
                this.v = new ri,
                y(this.v, this)
            }
            o(JI, x);
            function Ke(i, t, I, g, A, M) {
                for (I = Qt(I, g, A, M),
                Ie(I, function(c, r) {
                    return r.z - c.z
                }),
                I = z(I),
                g = I.next(); !g.done; g = I.next())
                    g = new b(t,g.value),
                    H(g, 5.5),
                    ei(g),
                    i.R.push(g),
                    y(g, i)
            }
            JI.prototype.Za = function(i, t) {
                if (i == 10 || i == 11 || i == 4) {
                    this.v.R = [];
                    for (var I = {}, g = z(this.R), A = g.next(); !A.done; I = {
                        kc: I.kc,
                        target: I.target,
                        action: I.action,
                        Dc: I.Dc
                    },
                    A = g.next())
                        I.kc = A.value,
                        I.target = .04 + .04 * Math.random(),
                        I.Dc = i == 4 ? 7 + Math.floor(5 * Math.random()) : 12,
                        I.action = new vi(i == 4 ? Math.max(2e3, 500 * t) : 5e3,function(M) {
                            return function() {
                                var c = M.action;
                                Y(M.kc, 0, -.5 + M.target * Math.sin($i(c.v / c.T, 0, 1) * M.Dc * Math.PI))
                            }
                        }(I),function(M) {
                            return function() {
                                return Y(M.kc, 0, -.5)
                            }
                        }(I)),
                        ni(this.v, I.action)
                }
            }
            ;
            function WI(i, t, I) {
                b.call(this, jI, i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                this.$ = new b(Qn,0,this.Ba().height),
                Y(this.$, 0, -.48),
                ei(this.$),
                this.$.ka = -1,
                y(this.$, this),
                this.v = 0,
                this.V = new zI(.1,.73),
                this.V.W = ii(Xe[this.v]),
                y(this.V, this),
                this.R = new ri,
                y(this.R, this),
                this.ta = new b(Ce,-.05,0,0),
                H(this.ta, 1.5),
                ei(this.ta),
                this.ta.ka = 1,
                this.wa = new b(Ce,.07),
                H(this.wa, 1.5),
                ei(this.wa),
                this.wa.ka = 1,
                this.Ja = new b(fg,.1,.4),
                ei(this.Ja),
                H(this.Ja, 1.5),
                this.Ja.ka = -1,
                this.Bb = !0
            }
            o(WI, b);
            function ci(i, t) {
                if (i.v == 6 && t != 6)
                    Io(i),
                    i.v = t;
                else {
                    if (i.v = t,
                    (i.v == 5 || i.v == 3 || i.v == 4) && (Y(i, 0, -.35),
                    ui(i.$),
                    i.V.v.H = !1,
                    ui(i.V),
                    y(i.ta, i),
                    y(i.wa, i)),
                    i.v == 3 || i.v == 4) {
                        var I = 0;
                        ni(i.R, new vi(1e3,function(g) {
                            I += g / 25,
                            Y(i, 0, -.35 + Math.sin(I) / 22),
                            Y(i.ta, 0, -.5 - Math.round(Math.sin(I / 2) / 2 + .5) / 3),
                            Y(i.wa, 0, -.5 - Math.round(Math.cos(I / 2 + Math.PI / 2) / 2 + .5) / 3)
                        }
                        ))
                    }
                    i.v == 3 ? (oi().Pc(),
                    yi(i, Yn),
                    U(i.R, new $(i,1e3,Me)),
                    p(i.R, 0, function() {
                        return ci(i, 5)
                    })) : i.v == 4 ? (yi(i, De),
                    U(i.R, new $(i,1e3,se))) : i.v == 5 ? (yi(i, De),
                    Y(i.ta, 0, -.5),
                    Y(i.wa, 0, -.5)) : i.v == 6 ? to(i) : (yi(i, jI),
                    Y(i, 0, -.5),
                    y(i.$, i),
                    y(i.V, i),
                    ui(i.ta),
                    ui(i.wa)),
                    ni(i.R, new E(100,ti(i.V.W),Xe[t],w,function(g) {
                        i.V.W = ii(g)
                    }
                    ))
                }
            }
            function io(i, t, I) {
                i.v != 3 && i.v != 4 && i.v != 5 && i.v != 6 && t.getState() != 2 && i.Bb && (i.v == 0 && ci(i, 1),
                ci(i, 2),
                I && oi().Qc(),
                Gg(i.V),
                i.Bb = !1,
                ft(i.R, 200, function() {
                    return i.Bb = !0
                }),
                I = d(t).z - d(i).z,
                3 >= Math.abs(I) && t.getState() == 1 ? (be(t, I / 3),
                p(i.R, 200, function() {
                    i.v == 2 && ci(i, 0)
                })) : 3 < I && 4 > I && t.getState() == 1 ? p(i.R, 100, function() {
                    return be(t, 1)
                }) : p(i.R, 200, function() {
                    return ci(i, 1)
                }))
            }
            function Ve(i, t) {
                t = t === void 0 ? mi : t,
                i.R.v = [],
                ci(i, i.v == 5 ? 4 : 3),
                p(i.R, 0, t)
            }
            function to(i) {
                yi(i, ye),
                Y(i, .05, -.5),
                Li(i, 1.2, 1.2),
                ui(i.$),
                U(i.R, new E(100,1.2,1,w,function(t) {
                    Li(i, 1.2, t)
                }
                )),
                U(i.R, new E(100,1,1.5,w,function(t) {
                    Li(i, t, t)
                }
                )),
                p(i.R, 0, function() {
                    yi(i, qn),
                    y(i.Ja, i),
                    Li(i, 1.5, 1.5),
                    Y(i, .05, -.5)
                })
            }
            function Io(i) {
                yi(i, ye),
                ui(i.Ja),
                Y(i, .05, -.5),
                Li(i, 1.2, 1.4),
                U(i.R, new E(100,1.4,1,w,function(t) {
                    Li(i, 1.2, t)
                }
                )),
                U(i.R, new E(100,1,1.2,w,function(t) {
                    Li(i, 1.2, t)
                }
                )),
                p(i.R, 0, function() {
                    Y(i, 0, -.5),
                    i.V.Da(.1, .73),
                    Li(i, 1, 1),
                    yi(i, jI),
                    y(i.$, i)
                })
            }
            var Zi = {}
              , Xe = (Zi[0] = 33,
            Zi[1] = 200,
            Zi[2] = -140,
            Zi[3] = 33,
            Zi[4] = 33,
            Zi[5] = 33,
            Zi[6] = 33,
            Zi);
            function FI(i, t, I) {
                b.call(this, [Se, Se, gg, og, Ag, ug, rg, sg, Mg, cg, ag, Ng, hg, jg, lg, Dg, yg, Cg, Sg, Lg, dg, Tg, mg], i === void 0 ? 0 : i, t === void 0 ? 0 : t, I === void 0 ? 0 : I),
                Y(this, 0, -.35),
                Li(this, 1.2, 1),
                H(this.Ib, .8)
            }
            o(FI, b);
            var Ti = Ci.qa()
              , eo = Bt.qa();
            function Ct(i, t) {
                Ii.call(this);
                var I = this;
                this.V = t.getContext("2d"),
                this.Bb = !1,
                this.La = new Jt(6e4,function() {
                    var g = St;
                    g && g.va && (g.va = !1,
                    g.ta = !0),
                    oi().xc()
                }
                ,function() {
                    _e()
                }
                ),
                Ot(this, this.La),
                this.Kb = function() {
                    L.u[53](),
                    Wt(I.La)
                }
                ,
                window.addEventListener("orientationchange", this.Kb, !1),
                this.Jb = new ZI(t),
                this.Hb = new Rg(t),
                this.rb = new Be(i),
                this.tb = Ri(),
                this.ta = this.va = !1,
                this.S = 2,
                this.$ = 1,
                this.Ja = 0,
                this.Ca = this.Lb = !1,
                this.H = new zt(t),
                this.H.Da(ne(oI, new D(-12,12,-12))),
                xt(this.H, 15.55),
                Pt(this.H, 15),
                i = Ti.H,
                y(this.H, i),
                this.ma = new x,
                this.ub = new FI(AI),
                y(this.ub, this.ma),
                fi(this.ma, new FI(Dn)),
                this.T = new WI(se.H()),
                y(this.T, this.ma),
                this.Fa = new WI(Me.H()),
                ci(this.Fa, 5),
                y(this.Fa, this.ma),
                this.ka = new fI,
                y(this.ka, this.ma),
                this.ra = new Ut(this.ka,new D(1,0,R.z + 10.06)),
                y(this.ra, this.ma),
                this.ka.Da(PI(this.ra)),
                fi(this.ma, new GI(this.ka,this.ra)),
                this.R = new ri,
                y(this.R, i),
                this.Ga = new Vt(new D(0,19,R.z + 62 + 20)),
                H(this.Ga, 1.4),
                this.W = new RI(t,this.Ga,this.Jb),
                y(this.W, this.ma),
                this.Gb = new YI(this.La,t),
                this.Gb.H = _g(this.W),
                Ot(this, this.Gb),
                this.hc = new UI(this.La,[W],function(g) {
                    W == g.which && (g = I.W,
                    g.W == 0 || g.W == 2 ? Gi(g.T, !0) : g.W == 1 && Gi(g.U, !0))
                }
                ,function(g) {
                    W == g.which && (g = I.W,
                    g.W == 0 || g.W == 2 ? Gi(g.T, !1) : g.W == 1 && Gi(g.U, !1))
                }
                ),
                Ot(this, this.hc),
                this.ha = new We(new D(0,0,R.z + 62 - 13)),
                this.ha.H = !1,
                y(this.ha, this.ma),
                this.Va = new x,
                this.Va.ya = function(g) {
                    var A = Math.asin(d(I.ka).x / ai(d(I.H), d(I.ka)));
                    Pt(I.H, ti(I.H.R) + g / 500 * (ti($i(A, -Math.PI / 5, Math.PI / 5)) - ti(I.H.R)))
                }
                ,
                this.Ua = new x,
                this.Ua.ya = function(g) {
                    var A = -d(I.ka).x / 6;
                    I.H.Da(I.H.S.x + g / 500 * (A - I.H.S.x))
                }
                ,
                Yi(O.qa(), this),
                Yi(O.qa(), At.qa()),
                this.dc = new Jg,
                Je(4),
                KI(this)
            }
            o(Ct, Ii);
            function KI(i) {
                Ot(i, oi()),
                i.v && ui(i.v),
                i.Ia && ui(i.Ia),
                Oe(),
                Kt.Qa && Ug(i.rb),
                fi(Ti.v, new Zt(i.V)),
                fi(Ti.S, new pI(new D(0,0,R.z + 62 + 40))),
                fi(Ti.S, new JI(R)),
                y(i.Ga, Ti.S),
                y(i.ma, Ti.H),
                i.S = 2,
                U(i.R, [new $(i.H,2e3,oI,{
                    Ha: ae
                }), new E(2e3,ti(i.H.R),0,w,function(t) {
                    return Pt(i.H, t)
                }
                ,{
                    Ha: ae
                })]),
                p(i.R, 100, function() {
                    i.S = 0,
                    ot(i.W, 2)
                })
            }
            function no(i, t) {
                i.$ = 1,
                ui(i.Ua),
                ui(i.Va),
                i.ub.Ia = !0,
                t ? (p(i.R, 600, function() {
                    ci(i.T, 0),
                    ot(i.W, 1),
                    Nt(i.H, 2)
                }),
                p(i.R, 1700, function() {
                    i.S = 3,
                    i.ha.H = !0,
                    Fe(i.ha)
                }),
                i.S = 2) : (i.ha.H = !0,
                Fe(i.ha),
                i.S = 3,
                ot(i.W, 1),
                i.Lb && ci(i.T, 6))
            }
            function go(i) {
                i.S = 2,
                ci(i.T, 0),
                i.Ga.reset(),
                i.ub.reset(),
                ot(i.W, 0),
                $g(i.ha),
                Nt(i.H, 0),
                p(i.R, 1700, function() {
                    i.$ = .9,
                    i.S = 1,
                    EI(i.ra),
                    ci(i.T, 1)
                })
            }
            function qe(i) {
                i.Ja++,
                Ve(i.Fa),
                Ve(i.T, function() {
                    i.ka.getState() == 2 ? qe(i) : ci(i.T, 0)
                });
                var t = i.T;
                i.T = i.Fa,
                i.Fa = t
            }
            Ct.prototype.Za = function(i, t) {
                var I = this;
                if (i == 1)
                    62 < ai(t, R) ? Nt(this.H, 1) : (p(this.R, 100, function() {
                        return qe(I)
                    }),
                    y(this.Ua, this.H)),
                    y(this.Va, this.H);
                else if (i == 2)
                    no(this, 0 < this.Ga.v);
                else if (i == 3)
                    p(this.R, 200, function() {
                        Nt(I.H, 0),
                        p(I.T.R, 0, function() {
                            ci(I.T, 1),
                            EI(I.ra)
                        })
                    });
                else if (i == 4)
                    this.$ = Math.min(this.$ + .01 * t, 2),
                    this.Ja = 0,
                    this.Lb = !0,
                    ui(this.Ua),
                    ui(this.Va),
                    ft(this.R, 200, function() {
                        Nt(I.H, 0)
                    }),
                    t == 6 && p(this.R, 4e3);
                else if (i == 7)
                    this.S != 1 && this.S != 0 || io(this.T, this.ka, this.Ca);
                else if (i == 8)
                    t && this.S == 0 ? (this.Ca || (this.Ca = !0,
                    oi().Ac()),
                    ot(this.W, 0),
                    p(this.R, 1e3, function() {
                        ot(I.W, 0),
                        I.S = 1,
                        J(O.qa(), 12),
                        ci(I.T, 1),
                        I.$ = .9,
                        EI(I.ra)
                    })) : this.S == 4 && (J(O.qa(), 19),
                    this.Ca || (this.Ca = !0,
                    oi().Ac()),
                    KI(this));
                else if (i == 5)
                    go(this);
                else if (i == 10 || i == 11) {
                    for (i = i == 11 ? 5 : 3,
                    t = 0; t < i; t++)
                        p(this.R, 0, function() {
                            var g = new He;
                            y(g, Ti.v)
                        }),
                        p(this.R, 1e3);
                    p(this.R, 3e3)
                } else
                    i == 9 ? (J(O.qa(), 4, this.Ja),
                    this.Ja = 0) : i == 16 ? (30 > t && kg(this.Hb),
                    21 > t && (pi && pi.uc(),
                    pi = null,
                    ff = !1)) : i == 18 ? (this.Bb = !1,
                    oi().xc(!0)) : i == 17 && (this.Bb = !0,
                    oi().zc(!0))
            }
            ;
            function _e() {
                var i = St;
                if (i) {
                    i.tb = Ri();
                    var t = !i.ta && !i.va;
                    i.ta = !1,
                    i.va = !0,
                    t && i.Ib(),
                    i.Bb && oi().zc()
                }
            }
            Ct.prototype.Ib = function() {
                if (this.ta)
                    this.ta = !1;
                else {
                    gI(this.Ib, hn, this);
                    var i = Ri()
                      , t = Math.min(i - this.tb, 50) * this.$
                      , I = this.dc
                      , g = t / this.$;
                    if (I.v++,
                    I.H += g,
                    1e4 <= I.H && (g = I.H / I.v / 1e3,
                    J(O.qa(), 16, 1 / g),
                    I.v = 0,
                    I.H = 0),
                    !(this.S == 4 && 33 > t) && (this.tb = i,
                    Qi.width = this.V.canvas.width,
                    Qi.height = this.V.canvas.height,
                    i = this.rb,
                    wt && (this.Jb.v.style.maxHeight = window.innerHeight + "px",
                    window.scrollTo(0, 0)),
                    i = this.Hb,
                    i.H.clientWidth == i.R && i.H.clientHeight == i.S || BI(i),
                    !VI)) {
                        for (this.V.save(),
                        this.V.clearRect(0, 0, this.V.canvas.width, this.V.canvas.height),
                        i = this.V,
                        I = this.H,
                        Ln(t),
                        dn(I),
                        t = z(Ti.R),
                        I = t.next(); !I.done; I = t.next())
                            I = I.value,
                            g = i,
                            I.T && (g.globalAlpha = I.U,
                            g.setTransform(I.T.Ma, I.T.lb, I.T.mb, I.T.Oa, I.T.Xa, I.T.Ya),
                            I.Ea(g));
                        this.V.restore()
                    }
                }
            }
            ,
            Ct.prototype.U = function() {
                this.va && (this.ta = !0,
                this.va = !1),
                window.removeEventListener("orientationchange", this.Kb, !1),
                this.rb.reset(),
                Ci.qa().reset(),
                O.qa().H = [],
                At.qa().reset(),
                pi && pi.uc(),
                pi = null,
                Ii.prototype.U.call(this)
            }
            ;
            var St = null;
            (function() {
                _("aW8="),
                Ze.Na = !1;
                var i = Z
                  , t = i ? e : null;
                t && (t.width = 720,
                t.height = 1280,
                gt(0),
                eo.Bc(0, function() {
                    gt(1),
                    i && t && (St = new Ct(i,t),
                    _e())
                }))
            }
            )();
            var VI = !1;
            this.g1 = () => {
                Je(4),
                KI(St),
                L.g[2]()
            }
            ,
            this.g2 = () => {
                VI = !0,
                ut.Howler.mute(!0),
                L.g[7]()
            }
            ,
            this.g3 = () => {
                VI = !1,
                ut.Howler.mute(u),
                L.g[8]()
            }
            ,
            this.g4 = () => {
                St.U(),
                Z.removeChild(e),
                ut.Howler.unload(),
                L.g[6]()
            }
        }
        ).call(this)
    }
    ,
    G(_("Zw=="), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    G(_("YQ=="), [0, 2, 3, 4, 7, 8, 9, 16]),
    G(_("dQ=="), [0, 1, 2, 3, 4, 5, 6, 51, 52, 53, 54])
}
const Lo = "assets/image-v4.svg"
  , To = W => (ao("data-v-22ea9ad4"),
W = W(),
No(),
W)
  , mo = To( () => ho("canvas", null, null, -1))
  , fo = [mo]
  , vo = {
    __name: "DC",
    emits: ["g1", "g9", "u6", "u3"],
    setup(W, {emit: B}) {
        const u = B
          , h = In(null)
          , a = new So;
        return so( () => {
            a.s1(Lo),
            a.s4( (T, L, G) => u(`${T}${L}`, G));
            try {
                a.s5(h.value)
            } catch {
                qI(_("aHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5hc2lzc3V0aGFyLmNyaWNrZXQ="))
            }
        }
        ),
        Mo( () => {
            a.g4()
        }
        ),
        (T, L) => (en(),
        co("div", {
            ref_key: "container",
            ref: h,
            class: "absolute-full"
        }, fo, 512))
    }
}
  , wo = tn(vo, [["__scopeId", "data-v-22ea9ad4"], ["__file", "DC.vue"]])
  , po = {
    __name: "IndexPage",
    setup(W) {
        const B = In(0)
          , u = () => {}
          , h = () => {
            console.log("game restart"),
            window.location = ""
        }
          , a = () => {
            Ao(_("c3BsYXNo"))
        }
          , T = v => {
            B.value = v,
            console.log("score", B.value)
        }
          , L = () => {
            // const v = _("UGxheWluZyBAZG9vZGxlY3JpY2tldCBvbiBodHRwczovL2Rvb2RsZWNyaWNrZXQuZ2l0aHViLmlvIPCfj48gYW5kIEkgbWFkZSB7c2NvcmV9IHNjb3JlLgojZG9vZGxlY3JpY2tldCAjY3JpY2tldCAjZ2FtZQ==")
            //   , C = _("aHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0=");
            // qI(C + encodeURIComponent(v.replace(_("e3Njb3JlfQ=="), B.value)))
            // custom function to share on twitter
            const shareOnWhatsapp = () => {

                // Detect device type
                const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                let whatsappUrl = "";

                // Define message and encode URL
                const message = "I'm smashing sixes on ABP Run Chase! 🏏🔥 Play now at https://abplive.com/RunChase and take on the challenge! 🚀 #ABPLive #cricket #game #IPL";
                const encodedMessage = encodeURIComponent(message);

                if (/android/i.test(userAgent)) {
                    // Android device
                    whatsappUrl = `intent://send?text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end;`;
                } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
                    // iOS device
                    whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
                } else {
                    // Web/desktop fallback
                    whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
                }

                // Open WhatsApp link
                window.open(whatsappUrl, '_blank');
            }
            shareOnWhatsapp();
        }
          , G = () => {
            const text = "I'm smashing sixes on ABP Run Chase! 🏏🔥 Play now at https://abplive.com/RunChase and take on the challenge! 🚀 #ABPLive #cricket #game #IPL";
            // share on x
            const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
            window.open(twitterUrl, '_blank');
        }
        ;
        return (v, C) => (en(),
        jo(oo, null, {
            default: lo( () => [Do(wo, {
                onG1: a,     // Splash screen function
                    onG9: T,     // Update score function
                    onU6: L,     // WhatsApp share function
                    onU3: G,     // Web Share API function
                    onG4: u,     // Empty function
                    onG5: h      // Game restart function
            })]),
            _: 1
        }))
    }
}
  , Po = tn(po, [["__scopeId", "data-v-4d09dc68"], ["__file", "IndexPage.vue"]]);
export {Po as default};
