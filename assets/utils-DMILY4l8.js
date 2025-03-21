import {c as d, e as n, a as r, h as g, b as p, i as c, l as h, d as y, g as f} from "./index-CB9cSSVB.js";
const v = d({
    name: "QPage",
    props: {
        padding: Boolean,
        styleFn: Function
    },
    setup(t, {slots: a}) {
        const {proxy: {$q: s}} = f()
          , e = c(h, n);
        if (e === n)
            return console.error("QPage needs to be a deep child of QLayout"),
            n;
        if (c(y, n) === n)
            return console.error("QPage needs to be child of QPageContainer"),
            n;
        const i = r( () => {
            const o = (e.header.space === !0 ? e.header.size : 0) + (e.footer.space === !0 ? e.footer.size : 0);
            if (typeof t.styleFn == "function") {
                const u = e.isContainer.value === !0 ? e.containerHeight.value : s.screen.height;
                return t.styleFn(o, u)
            }
            return {
                minHeight: e.isContainer.value === !0 ? e.containerHeight.value - o + "px" : s.screen.height === 0 ? o !== 0 ? `calc(100vh - ${o}px)` : "100vh" : s.screen.height - o + "px"
            }
        }
        )
          , l = r( () => `q-page${t.padding === !0 ? " q-layout-padding" : ""}`);
        return () => g("main", {
            class: l.value,
            style: i.value
        }, p(a.default))
    }
})
  , Q = t => decodeURIComponent(escape(window.atob(t)))
  , b = t => {
    const a = document.getElementById(t);
    a && a.parentNode.removeChild(a)
}
;
export {v as Q, Q as b, b as r};
