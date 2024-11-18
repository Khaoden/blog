import {
  createBaseVNode,
  createElementBlock,
  defineComponent,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  renderSlot,
  watch
} from "./chunk-5TCDO6LD.js";

// node_modules/.pnpm/vue-countup-v3@1.4.2_vue@3.5.13_typescript@5.6.3_/node_modules/vue-countup-v3/dist/vue-countup-v3.es.js
var u = function() {
  return u = Object.assign || function(t) {
    for (var n, i = 1, a = arguments.length; i < a; i++) for (var e in n = arguments[i]) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
    return t;
  }, u.apply(this, arguments);
};
var h = function() {
  function t(t2, n, i) {
    var a = this;
    this.endVal = n, this.options = i, this.version = "2.8.0", this.defaults = { startVal: 0, decimalPlaces: 0, duration: 2, useEasing: true, useGrouping: true, useIndianSeparators: false, smartEasingThreshold: 999, smartEasingAmount: 333, separator: ",", decimal: ".", prefix: "", suffix: "", enableScrollSpy: false, scrollSpyDelay: 200, scrollSpyOnce: false }, this.finalEndVal = null, this.useEasing = true, this.countDown = false, this.error = "", this.startVal = 0, this.paused = true, this.once = false, this.count = function(t3) {
      a.startTime || (a.startTime = t3);
      var n2 = t3 - a.startTime;
      a.remaining = a.duration - n2, a.useEasing ? a.countDown ? a.frameVal = a.startVal - a.easingFn(n2, 0, a.startVal - a.endVal, a.duration) : a.frameVal = a.easingFn(n2, a.startVal, a.endVal - a.startVal, a.duration) : a.frameVal = a.startVal + (a.endVal - a.startVal) * (n2 / a.duration);
      var i2 = a.countDown ? a.frameVal < a.endVal : a.frameVal > a.endVal;
      a.frameVal = i2 ? a.endVal : a.frameVal, a.frameVal = Number(a.frameVal.toFixed(a.options.decimalPlaces)), a.printValue(a.frameVal), n2 < a.duration ? a.rAF = requestAnimationFrame(a.count) : null !== a.finalEndVal ? a.update(a.finalEndVal) : a.options.onCompleteCallback && a.options.onCompleteCallback();
    }, this.formatNumber = function(t3) {
      var n2, i2, e, s, o = t3 < 0 ? "-" : "";
      n2 = Math.abs(t3).toFixed(a.options.decimalPlaces);
      var r = (n2 += "").split(".");
      if (i2 = r[0], e = r.length > 1 ? a.options.decimal + r[1] : "", a.options.useGrouping) {
        s = "";
        for (var l = 3, u2 = 0, h2 = 0, p2 = i2.length; h2 < p2; ++h2) a.options.useIndianSeparators && 4 === h2 && (l = 2, u2 = 1), 0 !== h2 && u2 % l == 0 && (s = a.options.separator + s), u2++, s = i2[p2 - h2 - 1] + s;
        i2 = s;
      }
      return a.options.numerals && a.options.numerals.length && (i2 = i2.replace(/[0-9]/g, function(t4) {
        return a.options.numerals[+t4];
      }), e = e.replace(/[0-9]/g, function(t4) {
        return a.options.numerals[+t4];
      })), o + a.options.prefix + i2 + e + a.options.suffix;
    }, this.easeOutExpo = function(t3, n2, i2, a2) {
      return i2 * (1 - Math.pow(2, -10 * t3 / a2)) * 1024 / 1023 + n2;
    }, this.options = u(u({}, this.defaults), i), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(n), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = false), this.el = "string" == typeof t2 ? document.getElementById(t2) : t2, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", typeof window < "u" && this.options.enableScrollSpy && (this.error ? console.error(this.error, t2) : (window.onScrollFns = window.onScrollFns || [], window.onScrollFns.push(function() {
      return a.handleScroll(a);
    }), window.onscroll = function() {
      window.onScrollFns.forEach(function(t3) {
        return t3();
      });
    }, this.handleScroll(this)));
  }
  return t.prototype.handleScroll = function(t2) {
    if (t2 && window && !t2.once) {
      var n = window.innerHeight + window.scrollY, i = t2.el.getBoundingClientRect(), a = i.top + window.pageYOffset, e = i.top + i.height + window.pageYOffset;
      e < n && e > window.scrollY && t2.paused ? (t2.paused = false, setTimeout(function() {
        return t2.start();
      }, t2.options.scrollSpyDelay), t2.options.scrollSpyOnce && (t2.once = true)) : (window.scrollY > e || a > n) && !t2.paused && t2.reset();
    }
  }, t.prototype.determineDirectionAndSmartEasing = function() {
    var t2 = this.finalEndVal ? this.finalEndVal : this.endVal;
    this.countDown = this.startVal > t2;
    var n = t2 - this.startVal;
    if (Math.abs(n) > this.options.smartEasingThreshold && this.options.useEasing) {
      this.finalEndVal = t2;
      var i = this.countDown ? 1 : -1;
      this.endVal = t2 + i * this.options.smartEasingAmount, this.duration = this.duration / 2;
    } else this.endVal = t2, this.finalEndVal = null;
    null !== this.finalEndVal ? this.useEasing = false : this.useEasing = this.options.useEasing;
  }, t.prototype.start = function(t2) {
    this.error || (this.options.onStartCallback && this.options.onStartCallback(), t2 && (this.options.onCompleteCallback = t2), this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = false, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
  }, t.prototype.pauseResume = function() {
    this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
  }, t.prototype.reset = function() {
    cancelAnimationFrame(this.rAF), this.paused = true, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
  }, t.prototype.update = function(t2) {
    cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t2), this.endVal !== this.frameVal && (this.startVal = this.frameVal, null == this.finalEndVal && this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
  }, t.prototype.printValue = function(t2) {
    var n;
    if (this.el) {
      var i = this.formattingFn(t2);
      null !== (n = this.options.plugin) && void 0 !== n && n.render ? this.options.plugin.render(this.el, i) : "INPUT" === this.el.tagName ? this.el.value = i : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i;
    }
  }, t.prototype.ensureNumber = function(t2) {
    return "number" == typeof t2 && !isNaN(t2);
  }, t.prototype.validateValue = function(t2) {
    var n = Number(t2);
    return this.ensureNumber(n) ? n : (this.error = "[CountUp] invalid start or end value: ".concat(t2), null);
  }, t.prototype.resetDuration = function() {
    this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
  }, t;
}();
var p = { class: "countup-wrap" };
var c = defineComponent({ name: "CountUp", props: { endVal: {}, startVal: { default: 0 }, duration: { default: 2.5 }, decimalPlaces: { default: 0 }, autoplay: { type: Boolean, default: true }, loop: { type: [Boolean, Number], default: false }, delay: { default: 0 }, options: { default: void 0 } }, emits: ["init", "finished"], setup(t, { expose: u2, emit: c2 }) {
  const d = t, m = c2;
  let f = ref(), V = ref(), g = 0;
  const v = ref(false);
  let w;
  function y() {
    if (!f.value) return void console.warn("[vue-countup-v3]", "elRef can't found");
    g = 0, v.value = false;
    const t2 = Number(d.startVal), n = Number(d.endVal), i = Number(d.duration);
    V.value = new h(f.value, n, { startVal: t2, duration: i, decimalPlaces: d.decimalPlaces, ...d.options }), V.value.error ? console.error("[vue-countup-v3]", V.value.error) : m("init", V.value);
  }
  function F() {
    var t2;
    V.value || y(), null == (t2 = V.value) || t2.start(function() {
      "boolean" == typeof d.loop && d.loop || d.loop > g ? w = function(t3, i = 1) {
        const a = ref(-1);
        let e;
        return a.value = requestAnimationFrame(function n(s) {
          e || (e = s), s - e < 1e3 * i ? a.value = requestAnimationFrame(n) : t3();
        }), { cancel: function() {
          window.cancelAnimationFrame(a.value);
        } };
      }(() => {
        var t3;
        null == (t3 = V.value) || t3.reset(), F();
      }, d.delay) : v.value = true;
    }), g++;
  }
  function E() {
    null == w || w.cancel(), y(), F();
  }
  return watch([() => d.startVal, () => d.endVal], () => {
    d.autoplay && E();
  }), watch(v, (t2) => {
    var n;
    t2 && (null != (n = d.options) && n.onCompleteCallback && d.options.onCompleteCallback(), m("finished"));
  }), onMounted(() => {
    y(), d.autoplay && F();
  }), onUnmounted(() => {
    var t2;
    null == w || w.cancel(), null == (t2 = V.value) || t2.reset();
  }), u2({ init: y, restart: E }), (t2, n) => (openBlock(), createElementBlock("div", p, [renderSlot(t2.$slots, "prefix"), createBaseVNode("span", { ref_key: "elRef", ref: f }, null, 512), renderSlot(t2.$slots, "suffix")]));
} });
export {
  c as default
};
//# sourceMappingURL=vue-countup-v3.js.map
