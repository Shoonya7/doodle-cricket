import {c as C, e as E, a as m, h as p, b as G, i as J, p as D, l as A, d as Z, g as $, f as F, j as ee, w as R, o as T, k as H, n as K, m as q, r as b, q as U, s as M, t as S, u as te, v as ne, _ as oe, x as ie, y as le, z as k, A as re, B} from "./index-CB9cSSVB.js";
const se = C({
    name: "QPageContainer",
    setup(e, {slots: a}) {
        const {proxy: {$q: n}} = $()
          , t = J(A, E);
        if (t === E)
            return console.error("QPageContainer needs to be child of QLayout"),
            E;
        D(Z, !0);
        const r = m( () => {
            const s = {};
            return t.header.space === !0 && (s.paddingTop = `${t.header.size}px`),
            t.right.space === !0 && (s[`padding${n.lang.rtl === !0 ? "Left" : "Right"}`] = `${t.right.size}px`),
            t.footer.space === !0 && (s.paddingBottom = `${t.footer.size}px`),
            t.left.space === !0 && (s[`padding${n.lang.rtl === !0 ? "Right" : "Left"}`] = `${t.left.size}px`),
            s
        }
        );
        return () => p("div", {
            class: "q-page-container",
            style: r.value
        }, G(a.default))
    }
})
  , ae = [null, document, document.body, document.scrollingElement, document.documentElement];
function ce(e, a) {
    let n = ee(a);
    if (n === void 0) {
        if (e == null)
            return window;
        n = e.closest(".scroll,.scroll-y,.overflow-auto")
    }
    return ae.includes(n) ? window : n
}
function ue(e) {
    return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop
}
function de(e) {
    return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft
}
let L;
function P() {
    if (L !== void 0)
        return L;
    const e = document.createElement("p")
      , a = document.createElement("div");
    F(e, {
        width: "100%",
        height: "200px"
    }),
    F(a, {
        position: "absolute",
        top: "0px",
        left: "0px",
        visibility: "hidden",
        width: "200px",
        height: "150px",
        overflow: "hidden"
    }),
    a.appendChild(e),
    document.body.appendChild(a);
    const n = e.offsetWidth;
    a.style.overflow = "scroll";
    let t = e.offsetWidth;
    return n === t && (t = a.clientWidth),
    a.remove(),
    L = n - t,
    L
}
const {passive: j} = q
  , fe = ["both", "horizontal", "vertical"]
  , ve = C({
    name: "QScrollObserver",
    props: {
        axis: {
            type: String,
            validator: e => fe.includes(e),
            default: "vertical"
        },
        debounce: [String, Number],
        scrollTarget: {
            default: void 0
        }
    },
    emits: ["scroll"],
    setup(e, {emit: a}) {
        const n = {
            position: {
                top: 0,
                left: 0
            },
            direction: "down",
            directionChanged: !1,
            delta: {
                top: 0,
                left: 0
            },
            inflectionPoint: {
                top: 0,
                left: 0
            }
        };
        let t = null, r, s;
        R( () => e.scrollTarget, () => {
            l(),
            h()
        }
        );
        function c() {
            t !== null && t();
            const u = Math.max(0, ue(r))
              , y = de(r)
              , f = {
                top: u - n.position.top,
                left: y - n.position.left
            };
            if (e.axis === "vertical" && f.top === 0 || e.axis === "horizontal" && f.left === 0)
                return;
            const z = Math.abs(f.top) >= Math.abs(f.left) ? f.top < 0 ? "up" : "down" : f.left < 0 ? "left" : "right";
            n.position = {
                top: u,
                left: y
            },
            n.directionChanged = n.direction !== z,
            n.delta = f,
            n.directionChanged === !0 && (n.direction = z,
            n.inflectionPoint = n.position),
            a("scroll", {
                ...n
            })
        }
        function h() {
            r = ce(s, e.scrollTarget),
            r.addEventListener("scroll", i, j),
            i(!0)
        }
        function l() {
            r !== void 0 && (r.removeEventListener("scroll", i, j),
            r = void 0)
        }
        function i(u) {
            if (u === !0 || e.debounce === 0 || e.debounce === "0")
                c();
            else if (t === null) {
                const [y,f] = e.debounce ? [setTimeout(c, e.debounce), clearTimeout] : [requestAnimationFrame(c), cancelAnimationFrame];
                t = () => {
                    f(y),
                    t = null
                }
            }
        }
        const {proxy: g} = $();
        return R( () => g.$q.lang.rtl, c),
        T( () => {
            s = g.$el.parentNode,
            h()
        }
        ),
        H( () => {
            t !== null && t(),
            l()
        }
        ),
        Object.assign(g, {
            trigger: i,
            getPosition: () => n
        }),
        K
    }
});
function he() {
    const e = b(!U.value);
    return e.value === !1 && T( () => {
        e.value = !0
    }
    ),
    {
        isHydrated: e
    }
}
const X = typeof ResizeObserver < "u"
  , N = X === !0 ? {} : {
    style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
    url: "about:blank"
}
  , V = C({
    name: "QResizeObserver",
    props: {
        debounce: {
            type: [String, Number],
            default: 100
        }
    },
    emits: ["resize"],
    setup(e, {emit: a}) {
        let n = null, t, r = {
            width: -1,
            height: -1
        };
        function s(l) {
            l === !0 || e.debounce === 0 || e.debounce === "0" ? c() : n === null && (n = setTimeout(c, e.debounce))
        }
        function c() {
            if (n !== null && (clearTimeout(n),
            n = null),
            t) {
                const {offsetWidth: l, offsetHeight: i} = t;
                (l !== r.width || i !== r.height) && (r = {
                    width: l,
                    height: i
                },
                a("resize", r))
            }
        }
        const {proxy: h} = $();
        if (h.trigger = s,
        X === !0) {
            let l;
            const i = g => {
                t = h.$el.parentNode,
                t ? (l = new ResizeObserver(s),
                l.observe(t),
                c()) : g !== !0 && M( () => {
                    i(!0)
                }
                )
            }
            ;
            return T( () => {
                i()
            }
            ),
            H( () => {
                n !== null && clearTimeout(n),
                l !== void 0 && (l.disconnect !== void 0 ? l.disconnect() : t && l.unobserve(t))
            }
            ),
            K
        } else {
            let l = function() {
                n !== null && (clearTimeout(n),
                n = null),
                u !== void 0 && (u.removeEventListener !== void 0 && u.removeEventListener("resize", s, q.passive),
                u = void 0)
            }
              , i = function() {
                l(),
                t && t.contentDocument && (u = t.contentDocument.defaultView,
                u.addEventListener("resize", s, q.passive),
                c())
            };
            const {isHydrated: g} = he();
            let u;
            return T( () => {
                M( () => {
                    t = h.$el,
                    t && i()
                }
                )
            }
            ),
            H(l),
            () => {
                if (g.value === !0)
                    return p("object", {
                        class: "q--avoid-card-border",
                        style: N.style,
                        tabindex: -1,
                        type: "text/html",
                        data: N.url,
                        "aria-hidden": "true",
                        onLoad: i
                    })
            }
        }
    }
})
  , ge = C({
    name: "QLayout",
    props: {
        container: Boolean,
        view: {
            type: String,
            default: "hhh lpr fff",
            validator: e => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())
        },
        onScroll: Function,
        onScrollHeight: Function,
        onResize: Function
    },
    setup(e, {slots: a, emit: n}) {
        const {proxy: {$q: t}} = $()
          , r = b(null)
          , s = b(t.screen.height)
          , c = b(e.container === !0 ? 0 : t.screen.width)
          , h = b({
            position: 0,
            direction: "down",
            inflectionPoint: 0
        })
          , l = b(0)
          , i = b(U.value === !0 ? 0 : P())
          , g = m( () => "q-layout q-layout--" + (e.container === !0 ? "containerized" : "standard"))
          , u = m( () => e.container === !1 ? {
            minHeight: t.screen.height + "px"
        } : null)
          , y = m( () => i.value !== 0 ? {
            [t.lang.rtl === !0 ? "left" : "right"]: `${i.value}px`
        } : null)
          , f = m( () => i.value !== 0 ? {
            [t.lang.rtl === !0 ? "right" : "left"]: 0,
            [t.lang.rtl === !0 ? "left" : "right"]: `-${i.value}px`,
            width: `calc(100% + ${i.value}px)`
        } : null);
        function z(o) {
            if (e.container === !0 || document.qScrollPrevented !== !0) {
                const d = {
                    position: o.position.top,
                    direction: o.direction,
                    directionChanged: o.directionChanged,
                    inflectionPoint: o.inflectionPoint.top,
                    delta: o.delta.top
                };
                h.value = d,
                e.onScroll !== void 0 && n("scroll", d)
            }
        }
        function Y(o) {
            const {height: d, width: w} = o;
            let v = !1;
            s.value !== d && (v = !0,
            s.value = d,
            e.onScrollHeight !== void 0 && n("scrollHeight", d),
            O()),
            c.value !== w && (v = !0,
            c.value = w),
            v === !0 && e.onResize !== void 0 && n("resize", o)
        }
        function I({height: o}) {
            l.value !== o && (l.value = o,
            O())
        }
        function O() {
            if (e.container === !0) {
                const o = s.value > l.value ? P() : 0;
                i.value !== o && (i.value = o)
            }
        }
        let x = null;
        const Q = {
            instances: {},
            view: m( () => e.view),
            isContainer: m( () => e.container),
            rootRef: r,
            height: s,
            containerHeight: l,
            scrollbarWidth: i,
            totalWidth: m( () => c.value + i.value),
            rows: m( () => {
                const o = e.view.toLowerCase().split(" ");
                return {
                    top: o[0].split(""),
                    middle: o[1].split(""),
                    bottom: o[2].split("")
                }
            }
            ),
            header: S({
                size: 0,
                offset: 0,
                space: !1
            }),
            right: S({
                size: 300,
                offset: 0,
                space: !1
            }),
            footer: S({
                size: 0,
                offset: 0,
                space: !1
            }),
            left: S({
                size: 300,
                offset: 0,
                space: !1
            }),
            scroll: h,
            animate() {
                x !== null ? clearTimeout(x) : document.body.classList.add("q-body--layout-animate"),
                x = setTimeout( () => {
                    x = null,
                    document.body.classList.remove("q-body--layout-animate")
                }
                , 155)
            },
            update(o, d, w) {
                Q[o][d] = w
            }
        };
        if (D(A, Q),
        P() > 0) {
            let o = function() {
                v = null,
                _.classList.remove("hide-scrollbar")
            }
              , d = function() {
                if (v === null) {
                    if (_.scrollHeight > t.screen.height)
                        return;
                    _.classList.add("hide-scrollbar")
                } else
                    clearTimeout(v);
                v = setTimeout(o, 300)
            }
              , w = function(W) {
                v !== null && W === "remove" && (clearTimeout(v),
                o()),
                window[`${W}EventListener`]("resize", d)
            }
              , v = null;
            const _ = document.body;
            R( () => e.container !== !0 ? "add" : "remove", w),
            e.container !== !0 && w("add"),
            te( () => {
                w("remove")
            }
            )
        }
        return () => {
            const o = ne(a.default, [p(ve, {
                onScroll: z
            }), p(V, {
                onResize: Y
            })])
              , d = p("div", {
                class: g.value,
                style: u.value,
                ref: e.container === !0 ? void 0 : r,
                tabindex: -1
            }, o);
            return e.container === !0 ? p("div", {
                class: "q-layout-container overflow-hidden",
                ref: r
            }, [p(V, {
                onResize: I
            }), p("div", {
                class: "absolute-full",
                style: y.value
            }, [p("div", {
                class: "scroll",
                style: f.value
            }, [d])])]) : d
        }
    }
})
  , me = {};
function pe(e, a) {
    const n = re("router-view");
    return ie(),
    le(ge, {
        view: "hHh Lpr lFf"
    }, {
        default: k( () => [B(se, null, {
            default: k( () => [B(n)]),
            _: 1
        })]),
        _: 1
    })
}
const be = oe(me, [["render", pe], ["__file", "MainLayout.vue"]]);
export {be as default};
