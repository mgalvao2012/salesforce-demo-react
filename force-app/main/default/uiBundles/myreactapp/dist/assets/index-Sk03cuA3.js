function Wp(n, r) {
  for (var u = 0; u < r.length; u++) {
    const o = r[u];
    if (typeof o != 'string' && !Array.isArray(o)) {
      for (const c in o)
        if (c !== 'default' && !(c in n)) {
          const f = Object.getOwnPropertyDescriptor(o, c);
          f &&
            Object.defineProperty(
              n,
              c,
              f.get ? f : { enumerable: !0, get: () => o[c] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' })
  );
}
(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver(c => {
    for (const f of c)
      if (f.type === 'childList')
        for (const h of f.addedNodes)
          h.tagName === 'LINK' && h.rel === 'modulepreload' && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : c.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = u(c);
    fetch(c.href, f);
  }
})();
function Ip(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, 'default')
    ? n.default
    : n;
}
var uc = { exports: {} },
  $i = {};
var Om;
function Pp() {
  if (Om) return $i;
  Om = 1;
  var n = Symbol.for('react.transitional.element'),
    r = Symbol.for('react.fragment');
  function u(o, c, f) {
    var h = null;
    if (
      (f !== void 0 && (h = '' + f),
      c.key !== void 0 && (h = '' + c.key),
      'key' in c)
    ) {
      f = {};
      for (var m in c) m !== 'key' && (f[m] = c[m]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: n, type: o, key: h, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return (($i.Fragment = r), ($i.jsx = u), ($i.jsxs = u), $i);
}
var Dm;
function e0() {
  return (Dm || ((Dm = 1), (uc.exports = Pp())), uc.exports);
}
var ie = e0(),
  oc = { exports: {} },
  Re = {};
var Nm;
function t0() {
  if (Nm) return Re;
  Nm = 1;
  var n = Symbol.for('react.transitional.element'),
    r = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    m = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    v = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    p = Symbol.for('react.activity'),
    M = Symbol.iterator;
  function z(x) {
    return x === null || typeof x != 'object'
      ? null
      : ((x = (M && x[M]) || x['@@iterator']),
        typeof x == 'function' ? x : null);
  }
  var L = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Y = Object.assign,
    j = {};
  function k(x, B, F) {
    ((this.props = x),
      (this.context = B),
      (this.refs = j),
      (this.updater = F || L));
  }
  ((k.prototype.isReactComponent = {}),
    (k.prototype.setState = function (x, B) {
      if (typeof x != 'object' && typeof x != 'function' && x != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, x, B, 'setState');
    }),
    (k.prototype.forceUpdate = function (x) {
      this.updater.enqueueForceUpdate(this, x, 'forceUpdate');
    }));
  function W() {}
  W.prototype = k.prototype;
  function I(x, B, F) {
    ((this.props = x),
      (this.context = B),
      (this.refs = j),
      (this.updater = F || L));
  }
  var J = (I.prototype = new W());
  ((J.constructor = I), Y(J, k.prototype), (J.isPureReactComponent = !0));
  var ce = Array.isArray;
  function le() {}
  var T = { H: null, A: null, T: null, S: null },
    Q = Object.prototype.hasOwnProperty;
  function re(x, B, F) {
    var te = F.ref;
    return {
      $$typeof: n,
      type: x,
      key: B,
      ref: te !== void 0 ? te : null,
      props: F,
    };
  }
  function ke(x, B) {
    return re(x.type, B, x.props);
  }
  function xe(x) {
    return typeof x == 'object' && x !== null && x.$$typeof === n;
  }
  function Oe(x) {
    var B = { '=': '=0', ':': '=2' };
    return (
      '$' +
      x.replace(/[=:]/g, function (F) {
        return B[F];
      })
    );
  }
  var Ye = /\/+/g;
  function Pe(x, B) {
    return typeof x == 'object' && x !== null && x.key != null
      ? Oe('' + x.key)
      : B.toString(36);
  }
  function Se(x) {
    switch (x.status) {
      case 'fulfilled':
        return x.value;
      case 'rejected':
        throw x.reason;
      default:
        switch (
          (typeof x.status == 'string'
            ? x.then(le, le)
            : ((x.status = 'pending'),
              x.then(
                function (B) {
                  x.status === 'pending' &&
                    ((x.status = 'fulfilled'), (x.value = B));
                },
                function (B) {
                  x.status === 'pending' &&
                    ((x.status = 'rejected'), (x.reason = B));
                }
              )),
          x.status)
        ) {
          case 'fulfilled':
            return x.value;
          case 'rejected':
            throw x.reason;
        }
    }
    throw x;
  }
  function _(x, B, F, te, ae) {
    var fe = typeof x;
    (fe === 'undefined' || fe === 'boolean') && (x = null);
    var Me = !1;
    if (x === null) Me = !0;
    else
      switch (fe) {
        case 'bigint':
        case 'string':
        case 'number':
          Me = !0;
          break;
        case 'object':
          switch (x.$$typeof) {
            case n:
            case r:
              Me = !0;
              break;
            case b:
              return ((Me = x._init), _(Me(x._payload), B, F, te, ae));
          }
      }
    if (Me)
      return (
        (ae = ae(x)),
        (Me = te === '' ? '.' + Pe(x, 0) : te),
        ce(ae)
          ? ((F = ''),
            Me != null && (F = Me.replace(Ye, '$&/') + '/'),
            _(ae, B, F, '', function (wl) {
              return wl;
            }))
          : ae != null &&
            (xe(ae) &&
              (ae = ke(
                ae,
                F +
                  (ae.key == null || (x && x.key === ae.key)
                    ? ''
                    : ('' + ae.key).replace(Ye, '$&/') + '/') +
                  Me
              )),
            B.push(ae)),
        1
      );
    Me = 0;
    var nt = te === '' ? '.' : te + ':';
    if (ce(x))
      for (var we = 0; we < x.length; we++)
        ((te = x[we]), (fe = nt + Pe(te, we)), (Me += _(te, B, F, fe, ae)));
    else if (((we = z(x)), typeof we == 'function'))
      for (x = we.call(x), we = 0; !(te = x.next()).done; )
        ((te = te.value),
          (fe = nt + Pe(te, we++)),
          (Me += _(te, B, F, fe, ae)));
    else if (fe === 'object') {
      if (typeof x.then == 'function') return _(Se(x), B, F, te, ae);
      throw (
        (B = String(x)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (B === '[object Object]'
              ? 'object with keys {' + Object.keys(x).join(', ') + '}'
              : B) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Me;
  }
  function X(x, B, F) {
    if (x == null) return x;
    var te = [],
      ae = 0;
    return (
      _(x, te, '', '', function (fe) {
        return B.call(F, fe, ae++);
      }),
      te
    );
  }
  function ee(x) {
    if (x._status === -1) {
      var B = x._result;
      ((B = B()),
        B.then(
          function (F) {
            (x._status === 0 || x._status === -1) &&
              ((x._status = 1), (x._result = F));
          },
          function (F) {
            (x._status === 0 || x._status === -1) &&
              ((x._status = 2), (x._result = F));
          }
        ),
        x._status === -1 && ((x._status = 0), (x._result = B)));
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var Ee =
      typeof reportError == 'function'
        ? reportError
        : function (x) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var B = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof x == 'object' &&
                  x !== null &&
                  typeof x.message == 'string'
                    ? String(x.message)
                    : String(x),
                error: x,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', x);
              return;
            }
            console.error(x);
          },
    K = {
      map: X,
      forEach: function (x, B, F) {
        X(
          x,
          function () {
            B.apply(this, arguments);
          },
          F
        );
      },
      count: function (x) {
        var B = 0;
        return (
          X(x, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (x) {
        return (
          X(x, function (B) {
            return B;
          }) || []
        );
      },
      only: function (x) {
        if (!xe(x))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          );
        return x;
      },
    };
  return (
    (Re.Activity = p),
    (Re.Children = K),
    (Re.Component = k),
    (Re.Fragment = u),
    (Re.Profiler = c),
    (Re.PureComponent = I),
    (Re.StrictMode = o),
    (Re.Suspense = y),
    (Re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T),
    (Re.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (x) {
        return T.H.useMemoCache(x);
      },
    }),
    (Re.cache = function (x) {
      return function () {
        return x.apply(null, arguments);
      };
    }),
    (Re.cacheSignal = function () {
      return null;
    }),
    (Re.cloneElement = function (x, B, F) {
      if (x == null)
        throw Error(
          'The argument must be a React element, but you passed ' + x + '.'
        );
      var te = Y({}, x.props),
        ae = x.key;
      if (B != null)
        for (fe in (B.key !== void 0 && (ae = '' + B.key), B))
          !Q.call(B, fe) ||
            fe === 'key' ||
            fe === '__self' ||
            fe === '__source' ||
            (fe === 'ref' && B.ref === void 0) ||
            (te[fe] = B[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) te.children = F;
      else if (1 < fe) {
        for (var Me = Array(fe), nt = 0; nt < fe; nt++)
          Me[nt] = arguments[nt + 2];
        te.children = Me;
      }
      return re(x.type, ae, te);
    }),
    (Re.createContext = function (x) {
      return (
        (x = {
          $$typeof: h,
          _currentValue: x,
          _currentValue2: x,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (x.Provider = x),
        (x.Consumer = { $$typeof: f, _context: x }),
        x
      );
    }),
    (Re.createElement = function (x, B, F) {
      var te,
        ae = {},
        fe = null;
      if (B != null)
        for (te in (B.key !== void 0 && (fe = '' + B.key), B))
          Q.call(B, te) &&
            te !== 'key' &&
            te !== '__self' &&
            te !== '__source' &&
            (ae[te] = B[te]);
      var Me = arguments.length - 2;
      if (Me === 1) ae.children = F;
      else if (1 < Me) {
        for (var nt = Array(Me), we = 0; we < Me; we++)
          nt[we] = arguments[we + 2];
        ae.children = nt;
      }
      if (x && x.defaultProps)
        for (te in ((Me = x.defaultProps), Me))
          ae[te] === void 0 && (ae[te] = Me[te]);
      return re(x, fe, ae);
    }),
    (Re.createRef = function () {
      return { current: null };
    }),
    (Re.forwardRef = function (x) {
      return { $$typeof: m, render: x };
    }),
    (Re.isValidElement = xe),
    (Re.lazy = function (x) {
      return { $$typeof: b, _payload: { _status: -1, _result: x }, _init: ee };
    }),
    (Re.memo = function (x, B) {
      return { $$typeof: v, type: x, compare: B === void 0 ? null : B };
    }),
    (Re.startTransition = function (x) {
      var B = T.T,
        F = {};
      T.T = F;
      try {
        var te = x(),
          ae = T.S;
        (ae !== null && ae(F, te),
          typeof te == 'object' &&
            te !== null &&
            typeof te.then == 'function' &&
            te.then(le, Ee));
      } catch (fe) {
        Ee(fe);
      } finally {
        (B !== null && F.types !== null && (B.types = F.types), (T.T = B));
      }
    }),
    (Re.unstable_useCacheRefresh = function () {
      return T.H.useCacheRefresh();
    }),
    (Re.use = function (x) {
      return T.H.use(x);
    }),
    (Re.useActionState = function (x, B, F) {
      return T.H.useActionState(x, B, F);
    }),
    (Re.useCallback = function (x, B) {
      return T.H.useCallback(x, B);
    }),
    (Re.useContext = function (x) {
      return T.H.useContext(x);
    }),
    (Re.useDebugValue = function () {}),
    (Re.useDeferredValue = function (x, B) {
      return T.H.useDeferredValue(x, B);
    }),
    (Re.useEffect = function (x, B) {
      return T.H.useEffect(x, B);
    }),
    (Re.useEffectEvent = function (x) {
      return T.H.useEffectEvent(x);
    }),
    (Re.useId = function () {
      return T.H.useId();
    }),
    (Re.useImperativeHandle = function (x, B, F) {
      return T.H.useImperativeHandle(x, B, F);
    }),
    (Re.useInsertionEffect = function (x, B) {
      return T.H.useInsertionEffect(x, B);
    }),
    (Re.useLayoutEffect = function (x, B) {
      return T.H.useLayoutEffect(x, B);
    }),
    (Re.useMemo = function (x, B) {
      return T.H.useMemo(x, B);
    }),
    (Re.useOptimistic = function (x, B) {
      return T.H.useOptimistic(x, B);
    }),
    (Re.useReducer = function (x, B, F) {
      return T.H.useReducer(x, B, F);
    }),
    (Re.useRef = function (x) {
      return T.H.useRef(x);
    }),
    (Re.useState = function (x) {
      return T.H.useState(x);
    }),
    (Re.useSyncExternalStore = function (x, B, F) {
      return T.H.useSyncExternalStore(x, B, F);
    }),
    (Re.useTransition = function () {
      return T.H.useTransition();
    }),
    (Re.version = '19.2.5'),
    Re
  );
}
var Um;
function Cc() {
  return (Um || ((Um = 1), (oc.exports = t0())), oc.exports);
}
var w = Cc();
const lr = Ip(w),
  l0 = Wp({ __proto__: null, default: lr }, [w]);
var By = n => {
    throw TypeError(n);
  },
  qy = (n, r, u) => r.has(n) || By('Cannot ' + u),
  ol = (n, r, u) => (
    qy(n, r, 'read from private field'),
    u ? u.call(n) : r.get(n)
  ),
  ar = (n, r, u) =>
    r.has(n)
      ? By('Cannot add the same private member more than once')
      : r instanceof WeakSet
        ? r.add(n)
        : r.set(n, u),
  Cl = (n, r, u, o) => (qy(n, r, 'write to private field'), r.set(n, u), u),
  Lm = 'popstate';
function jm(n) {
  return (
    typeof n == 'object' &&
    n != null &&
    'pathname' in n &&
    'search' in n &&
    'hash' in n &&
    'state' in n &&
    'key' in n
  );
}
function a0(n = {}) {
  function r(o, c) {
    let f = c.state?.masked,
      { pathname: h, search: m, hash: y } = f || o.location;
    return rr(
      '',
      { pathname: h, search: m, hash: y },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || 'default',
      f
        ? {
            pathname: o.location.pathname,
            search: o.location.search,
            hash: o.location.hash,
          }
        : void 0
    );
  }
  function u(o, c) {
    return typeof c == 'string' ? c : _l(c);
  }
  return i0(r, u, null, n);
}
function _e(n, r) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(r);
}
function bt(n, r) {
  if (!n) {
    typeof console < 'u' && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function n0() {
  return Math.random().toString(36).substring(2, 10);
}
function Hm(n, r) {
  return {
    usr: n.state,
    key: n.key,
    idx: r,
    masked: n.mask
      ? { pathname: n.pathname, search: n.search, hash: n.hash }
      : void 0,
  };
}
function rr(n, r, u = null, o, c) {
  return {
    pathname: typeof n == 'string' ? n : n.pathname,
    search: '',
    hash: '',
    ...(typeof r == 'string' ? Dl(r) : r),
    state: u,
    key: (r && r.key) || o || n0(),
    mask: c,
  };
}
function _l({ pathname: n = '/', search: r = '', hash: u = '' }) {
  return (
    r && r !== '?' && (n += r.charAt(0) === '?' ? r : '?' + r),
    u && u !== '#' && (n += u.charAt(0) === '#' ? u : '#' + u),
    n
  );
}
function Dl(n) {
  let r = {};
  if (n) {
    let u = n.indexOf('#');
    u >= 0 && ((r.hash = n.substring(u)), (n = n.substring(0, u)));
    let o = n.indexOf('?');
    (o >= 0 && ((r.search = n.substring(o)), (n = n.substring(0, o))),
      n && (r.pathname = n));
  }
  return r;
}
function i0(n, r, u, o = {}) {
  let { window: c = document.defaultView, v5Compat: f = !1 } = o,
    h = c.history,
    m = 'POP',
    y = null,
    v = b();
  v == null && ((v = 0), h.replaceState({ ...h.state, idx: v }, ''));
  function b() {
    return (h.state || { idx: null }).idx;
  }
  function p() {
    m = 'POP';
    let j = b(),
      k = j == null ? null : j - v;
    ((v = j), y && y({ action: m, location: Y.location, delta: k }));
  }
  function M(j, k) {
    m = 'PUSH';
    let W = jm(j) ? j : rr(Y.location, j, k);
    v = b() + 1;
    let I = Hm(W, v),
      J = Y.createHref(W.mask || W);
    try {
      h.pushState(I, '', J);
    } catch (ce) {
      if (ce instanceof DOMException && ce.name === 'DataCloneError') throw ce;
      c.location.assign(J);
    }
    f && y && y({ action: m, location: Y.location, delta: 1 });
  }
  function z(j, k) {
    m = 'REPLACE';
    let W = jm(j) ? j : rr(Y.location, j, k);
    v = b();
    let I = Hm(W, v),
      J = Y.createHref(W.mask || W);
    (h.replaceState(I, '', J),
      f && y && y({ action: m, location: Y.location, delta: 0 }));
  }
  function L(j) {
    return Yy(j);
  }
  let Y = {
    get action() {
      return m;
    },
    get location() {
      return n(c, h);
    },
    listen(j) {
      if (y) throw new Error('A history only accepts one active listener');
      return (
        c.addEventListener(Lm, p),
        (y = j),
        () => {
          (c.removeEventListener(Lm, p), (y = null));
        }
      );
    },
    createHref(j) {
      return r(c, j);
    },
    createURL: L,
    encodeLocation(j) {
      let k = L(j);
      return { pathname: k.pathname, search: k.search, hash: k.hash };
    },
    push: M,
    replace: z,
    go(j) {
      return h.go(j);
    },
  };
  return Y;
}
function Yy(n, r = !1) {
  let u = 'http://localhost';
  (typeof window < 'u' &&
    (u =
      window.location.origin !== 'null'
        ? window.location.origin
        : window.location.href),
    _e(u, 'No window.location.(origin|href) available to create URL'));
  let o = typeof n == 'string' ? n : _l(n);
  return (
    (o = o.replace(/ $/, '%20')),
    !r && o.startsWith('//') && (o = u + o),
    new URL(o, u)
  );
}
var nr,
  Bm = class {
    constructor(n) {
      if ((ar(this, nr, new Map()), n)) for (let [r, u] of n) this.set(r, u);
    }
    get(n) {
      if (ol(this, nr).has(n)) return ol(this, nr).get(n);
      if (n.defaultValue !== void 0) return n.defaultValue;
      throw new Error('No value found for context');
    }
    set(n, r) {
      ol(this, nr).set(n, r);
    }
  };
nr = new WeakMap();
var r0 = new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'children']);
function u0(n) {
  return r0.has(n);
}
var o0 = new Set([
  'lazy',
  'caseSensitive',
  'path',
  'id',
  'index',
  'middleware',
  'children',
]);
function s0(n) {
  return o0.has(n);
}
function c0(n) {
  return n.index === !0;
}
function ur(n, r, u = [], o = {}, c = !1) {
  return n.map((f, h) => {
    let m = [...u, String(h)],
      y = typeof f.id == 'string' ? f.id : m.join('-');
    if (
      (_e(
        f.index !== !0 || !f.children,
        'Cannot specify children on an index route'
      ),
      _e(
        c || !o[y],
        `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
      ),
      c0(f))
    ) {
      let v = { ...f, id: y };
      return ((o[y] = qm(v, r(v))), v);
    } else {
      let v = { ...f, id: y, children: void 0 };
      return (
        (o[y] = qm(v, r(v))),
        f.children && (v.children = ur(f.children, r, m, o, c)),
        v
      );
    }
  });
}
function qm(n, r) {
  return Object.assign(n, {
    ...r,
    ...(typeof r.lazy == 'object' && r.lazy != null
      ? { lazy: { ...n.lazy, ...r.lazy } }
      : {}),
  });
}
function Gy(n, r, u = '/') {
  return Rl(n, r, u, !1);
}
function Rl(n, r, u, o, c) {
  let f = typeof r == 'string' ? Dl(r) : r,
    h = fl(f.pathname || '/', u);
  if (h == null) return null;
  let m = c ?? Hu(n),
    y = null,
    v = R0(h);
  for (let b = 0; y == null && b < m.length; ++b) y = E0(m[b], v, o);
  return y;
}
function f0(n, r) {
  let { route: u, pathname: o, params: c } = n;
  return {
    id: u.id,
    pathname: o,
    params: c,
    data: r[u.id],
    loaderData: r[u.id],
    handle: u.handle,
  };
}
function Hu(n) {
  let r = Vy(n);
  return (d0(r), r);
}
function Vy(n, r = [], u = [], o = '', c = !1) {
  let f = (h, m, y = c, v) => {
    let b = {
      relativePath: v === void 0 ? h.path || '' : v,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h,
    };
    if (b.relativePath.startsWith('/')) {
      if (!b.relativePath.startsWith(o) && y) return;
      (_e(
        b.relativePath.startsWith(o),
        `Absolute route path "${b.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (b.relativePath = b.relativePath.slice(o.length)));
    }
    let p = cl([o, b.relativePath]),
      M = u.concat(b);
    (h.children &&
      h.children.length > 0 &&
      (_e(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${p}".`
      ),
      Vy(h.children, r, M, p, y)),
      !(h.path == null && !h.index) &&
        r.push({ path: p, score: b0(p, h.index), routesMeta: M }));
  };
  return (
    n.forEach((h, m) => {
      if (h.path === '' || !h.path?.includes('?')) f(h, m);
      else for (let y of ky(h.path)) f(h, m, !0, y);
    }),
    r
  );
}
function ky(n) {
  let r = n.split('/');
  if (r.length === 0) return [];
  let [u, ...o] = r,
    c = u.endsWith('?'),
    f = u.replace(/\?$/, '');
  if (o.length === 0) return c ? [f, ''] : [f];
  let h = ky(o.join('/')),
    m = [];
  return (
    m.push(...h.map(y => (y === '' ? f : [f, y].join('/')))),
    c && m.push(...h),
    m.map(y => (n.startsWith('/') && y === '' ? '/' : y))
  );
}
function d0(n) {
  n.sort((r, u) =>
    r.score !== u.score
      ? u.score - r.score
      : S0(
          r.routesMeta.map(o => o.childrenIndex),
          u.routesMeta.map(o => o.childrenIndex)
        )
  );
}
var h0 = /^:[\w-]+$/,
  m0 = 3,
  y0 = 2,
  v0 = 1,
  g0 = 10,
  p0 = -2,
  Ym = n => n === '*';
function b0(n, r) {
  let u = n.split('/'),
    o = u.length;
  return (
    u.some(Ym) && (o += p0),
    r && (o += y0),
    u
      .filter(c => !Ym(c))
      .reduce((c, f) => c + (h0.test(f) ? m0 : f === '' ? v0 : g0), o)
  );
}
function S0(n, r) {
  return n.length === r.length && n.slice(0, -1).every((o, c) => o === r[c])
    ? n[n.length - 1] - r[r.length - 1]
    : 0;
}
function E0(n, r, u = !1) {
  let { routesMeta: o } = n,
    c = {},
    f = '/',
    h = [];
  for (let m = 0; m < o.length; ++m) {
    let y = o[m],
      v = m === o.length - 1,
      b = f === '/' ? r : r.slice(f.length) || '/',
      p = Gu(
        { path: y.relativePath, caseSensitive: y.caseSensitive, end: v },
        b
      ),
      M = y.route;
    if (
      (!p &&
        v &&
        u &&
        !o[o.length - 1].route.index &&
        (p = Gu(
          { path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 },
          b
        )),
      !p)
    )
      return null;
    (Object.assign(c, p.params),
      h.push({
        params: c,
        pathname: cl([f, p.pathname]),
        pathnameBase: T0(cl([f, p.pathnameBase])),
        route: M,
      }),
      p.pathnameBase !== '/' && (f = cl([f, p.pathnameBase])));
  }
  return h;
}
function Gu(n, r) {
  typeof n == 'string' && (n = { path: n, caseSensitive: !1, end: !0 });
  let [u, o] = x0(n.path, n.caseSensitive, n.end),
    c = r.match(u);
  if (!c) return null;
  let f = c[0],
    h = f.replace(/(.)\/+$/, '$1'),
    m = c.slice(1);
  return {
    params: o.reduce((v, { paramName: b, isOptional: p }, M) => {
      if (b === '*') {
        let L = m[M] || '';
        h = f.slice(0, f.length - L.length).replace(/(.)\/+$/, '$1');
      }
      const z = m[M];
      return (
        p && !z ? (v[b] = void 0) : (v[b] = (z || '').replace(/%2F/g, '/')),
        v
      );
    }, {}),
    pathname: f,
    pathnameBase: h,
    pattern: n,
  };
}
function x0(n, r = !1, u = !0) {
  bt(
    n === '*' || !n.endsWith('*') || n.endsWith('/*'),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, '/*')}".`
  );
  let o = [],
    c =
      '^' +
      n
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (h, m, y, v, b) => {
          if ((o.push({ paramName: m, isOptional: y != null }), y)) {
            let p = b.charAt(v + h.length);
            return p && p !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    n.endsWith('*')
      ? (o.push({ paramName: '*' }),
        (c += n === '*' || n === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : u
        ? (c += '\\/*$')
        : n !== '' && n !== '/' && (c += '(?:(?=\\/|$))'),
    [new RegExp(c, r ? void 0 : 'i'), o]
  );
}
function R0(n) {
  try {
    return n
      .split('/')
      .map(r => decodeURIComponent(r).replace(/\//g, '%2F'))
      .join('/');
  } catch (r) {
    return (
      bt(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      n
    );
  }
}
function fl(n, r) {
  if (r === '/') return n;
  if (!n.toLowerCase().startsWith(r.toLowerCase())) return null;
  let u = r.endsWith('/') ? r.length - 1 : r.length,
    o = n.charAt(u);
  return o && o !== '/' ? null : n.slice(u) || '/';
}
function w0({ basename: n, pathname: r }) {
  return r === '/' ? n : cl([n, r]);
}
var Xy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  _c = n => Xy.test(n);
function z0(n, r = '/') {
  let {
      pathname: u,
      search: o = '',
      hash: c = '',
    } = typeof n == 'string' ? Dl(n) : n,
    f;
  return (
    u
      ? ((u = Dc(u)),
        u.startsWith('/') ? (f = Gm(u.substring(1), '/')) : (f = Gm(u, r)))
      : (f = r),
    { pathname: f, search: M0(o), hash: A0(c) }
  );
}
function Gm(n, r) {
  let u = Vu(r).split('/');
  return (
    n.split('/').forEach(c => {
      c === '..' ? u.length > 1 && u.pop() : c !== '.' && u.push(c);
    }),
    u.length > 1 ? u.join('/') : '/'
  );
}
function sc(n, r, u, o) {
  return `Cannot include a '${n}' character in a manually specified \`to.${r}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${u}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qy(n) {
  return n.filter(
    (r, u) => u === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function Oc(n) {
  let r = Qy(n);
  return r.map((u, o) => (o === r.length - 1 ? u.pathname : u.pathnameBase));
}
function Qu(n, r, u, o = !1) {
  let c;
  typeof n == 'string'
    ? (c = Dl(n))
    : ((c = { ...n }),
      _e(
        !c.pathname || !c.pathname.includes('?'),
        sc('?', 'pathname', 'search', c)
      ),
      _e(
        !c.pathname || !c.pathname.includes('#'),
        sc('#', 'pathname', 'hash', c)
      ),
      _e(!c.search || !c.search.includes('#'), sc('#', 'search', 'hash', c)));
  let f = n === '' || c.pathname === '',
    h = f ? '/' : c.pathname,
    m;
  if (h == null) m = u;
  else {
    let p = r.length - 1;
    if (!o && h.startsWith('..')) {
      let M = h.split('/');
      for (; M[0] === '..'; ) (M.shift(), (p -= 1));
      c.pathname = M.join('/');
    }
    m = p >= 0 ? r[p] : '/';
  }
  let y = z0(c, m),
    v = h && h !== '/' && h.endsWith('/'),
    b = (f || h === '.') && u.endsWith('/');
  return (!y.pathname.endsWith('/') && (v || b) && (y.pathname += '/'), y);
}
var Dc = n => n.replace(/\/\/+/g, '/'),
  cl = n => Dc(n.join('/')),
  Vu = n => n.replace(/\/+$/, ''),
  T0 = n => Vu(n).replace(/^\/*/, '/'),
  M0 = n => (!n || n === '?' ? '' : n.startsWith('?') ? n : '?' + n),
  A0 = n => (!n || n === '#' ? '' : n.startsWith('#') ? n : '#' + n),
  fr = class {
    constructor(n, r, u, o = !1) {
      ((this.status = n),
        (this.statusText = r || ''),
        (this.internal = o),
        u instanceof Error
          ? ((this.data = u.toString()), (this.error = u))
          : (this.data = u));
    }
  };
function or(n) {
  return (
    n != null &&
    typeof n.status == 'number' &&
    typeof n.statusText == 'string' &&
    typeof n.internal == 'boolean' &&
    'data' in n
  );
}
function dr(n) {
  let r = n.map(u => u.route.path).filter(Boolean);
  return cl(r) || '/';
}
var Zy =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u';
function Ky(n, r) {
  let u = n;
  if (typeof u != 'string' || !Xy.test(u))
    return { absoluteURL: void 0, isExternal: !1, to: u };
  let o = u,
    c = !1;
  if (Zy)
    try {
      let f = new URL(window.location.href),
        h = u.startsWith('//') ? new URL(f.protocol + u) : new URL(u),
        m = fl(h.pathname, r);
      h.origin === f.origin && m != null
        ? (u = m + h.search + h.hash)
        : (c = !0);
    } catch {
      bt(
        !1,
        `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: o, isExternal: c, to: u };
}
var Na = Symbol('Uninstrumented');
function C0(n, r) {
  let u = {
    lazy: [],
    'lazy.loader': [],
    'lazy.action': [],
    'lazy.middleware': [],
    middleware: [],
    loader: [],
    action: [],
  };
  n.forEach(c =>
    c({
      id: r.id,
      index: r.index,
      path: r.path,
      instrument(f) {
        let h = Object.keys(u);
        for (let m of h) f[m] && u[m].push(f[m]);
      },
    })
  );
  let o = {};
  if (typeof r.lazy == 'function' && u.lazy.length > 0) {
    let c = ei(u.lazy, r.lazy, () => {});
    c && (o.lazy = c);
  }
  if (typeof r.lazy == 'object') {
    let c = r.lazy;
    ['middleware', 'loader', 'action'].forEach(f => {
      let h = c[f],
        m = u[`lazy.${f}`];
      if (typeof h == 'function' && m.length > 0) {
        let y = ei(m, h, () => {});
        y && (o.lazy = Object.assign(o.lazy || {}, { [f]: y }));
      }
    });
  }
  return (
    ['loader', 'action'].forEach(c => {
      let f = r[c];
      if (typeof f == 'function' && u[c].length > 0) {
        let h = f[Na] ?? f,
          m = ei(u[c], h, (...y) => Vm(y[0]));
        m &&
          (c === 'loader' && h.hydrate === !0 && (m.hydrate = !0),
          (m[Na] = h),
          (o[c] = m));
      }
    }),
    r.middleware &&
      r.middleware.length > 0 &&
      u.middleware.length > 0 &&
      (o.middleware = r.middleware.map(c => {
        let f = c[Na] ?? c,
          h = ei(u.middleware, f, (...m) => Vm(m[0]));
        return h ? ((h[Na] = f), h) : c;
      })),
    o
  );
}
function _0(n, r) {
  let u = { navigate: [], fetch: [] };
  if (
    (r.forEach(o =>
      o({
        instrument(c) {
          let f = Object.keys(c);
          for (let h of f) c[h] && u[h].push(c[h]);
        },
      })
    ),
    u.navigate.length > 0)
  ) {
    let o = n.navigate[Na] ?? n.navigate,
      c = ei(u.navigate, o, (...f) => {
        let [h, m] = f;
        return {
          to:
            typeof h == 'number' || typeof h == 'string' ? h : h ? _l(h) : '.',
          ...km(n, m ?? {}),
        };
      });
    c && ((c[Na] = o), (n.navigate = c));
  }
  if (u.fetch.length > 0) {
    let o = n.fetch[Na] ?? n.fetch,
      c = ei(u.fetch, o, (...f) => {
        let [h, , m, y] = f;
        return { href: m ?? '.', fetcherKey: h, ...km(n, y ?? {}) };
      });
    c && ((c[Na] = o), (n.fetch = c));
  }
  return n;
}
function ei(n, r, u) {
  return n.length === 0
    ? null
    : async (...o) => {
        let c = await Jy(n, u(...o), () => r(...o), n.length - 1);
        if (c.type === 'error') throw c.value;
        return c.value;
      };
}
async function Jy(n, r, u, o) {
  let c = n[o],
    f;
  if (c) {
    let h,
      m = async () => (
        h
          ? console.error(
              'You cannot call instrumented handlers more than once'
            )
          : (h = Jy(n, r, u, o - 1)),
        (f = await h),
        _e(f, 'Expected a result'),
        f.type === 'error' && f.value instanceof Error
          ? { status: 'error', error: f.value }
          : { status: 'success', error: void 0 }
      );
    try {
      await c(m, r);
    } catch (y) {
      console.error('An instrumentation function threw an error:', y);
    }
    (h || (await m()), await h);
  } else
    try {
      f = { type: 'success', value: await u() };
    } catch (h) {
      f = { type: 'error', value: h };
    }
  return (
    f || {
      type: 'error',
      value: new Error('No result assigned in instrumentation chain.'),
    }
  );
}
function Vm(n) {
  let { request: r, context: u, params: o, pattern: c } = n;
  return { request: O0(r), params: { ...o }, pattern: c, context: D0(u) };
}
function km(n, r) {
  return {
    currentUrl: _l(n.state.location),
    ...('formMethod' in r ? { formMethod: r.formMethod } : {}),
    ...('formEncType' in r ? { formEncType: r.formEncType } : {}),
    ...('formData' in r ? { formData: r.formData } : {}),
    ...('body' in r ? { body: r.body } : {}),
  };
}
function O0(n) {
  return {
    method: n.method,
    url: n.url,
    headers: { get: (...r) => n.headers.get(...r) },
  };
}
function D0(n) {
  if (U0(n)) {
    let r = { ...n };
    return (Object.freeze(r), r);
  } else return { get: r => n.get(r) };
}
var N0 = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function U0(n) {
  if (n === null || typeof n != 'object') return !1;
  const r = Object.getPrototypeOf(n);
  return (
    r === Object.prototype ||
    r === null ||
    Object.getOwnPropertyNames(r).sort().join('\0') === N0
  );
}
var Fy = ['POST', 'PUT', 'PATCH', 'DELETE'],
  L0 = new Set(Fy),
  j0 = ['GET', ...Fy],
  H0 = new Set(j0),
  $y = new Set([301, 302, 303, 307, 308]),
  B0 = new Set([307, 308]),
  cc = {
    state: 'idle',
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  q0 = {
    state: 'idle',
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Wi = { state: 'unblocked', proceed: void 0, reset: void 0, location: void 0 },
  Y0 = n => ({ hasErrorBoundary: !!n.hasErrorBoundary }),
  Wy = 'remix-router-transitions',
  Iy = Symbol('ResetLoaderData'),
  sn,
  $n,
  Oa,
  Wn,
  G0 = class {
    constructor(n) {
      (ar(this, sn),
        ar(this, $n),
        ar(this, Oa),
        ar(this, Wn),
        Cl(this, sn, n),
        Cl(this, $n, Hu(n)));
    }
    get stableRoutes() {
      return ol(this, sn);
    }
    get activeRoutes() {
      return ol(this, Oa) ?? ol(this, sn);
    }
    get branches() {
      return ol(this, Wn) ?? ol(this, $n);
    }
    get hasHMRRoutes() {
      return ol(this, Oa) != null;
    }
    setRoutes(n) {
      (Cl(this, sn, n), Cl(this, $n, Hu(n)));
    }
    setHmrRoutes(n) {
      (Cl(this, Oa, n), Cl(this, Wn, Hu(n)));
    }
    commitHmrRoutes() {
      ol(this, Oa) &&
        (Cl(this, sn, ol(this, Oa)),
        Cl(this, $n, ol(this, Wn)),
        Cl(this, Oa, void 0),
        Cl(this, Wn, void 0));
    }
  };
sn = new WeakMap();
$n = new WeakMap();
Oa = new WeakMap();
Wn = new WeakMap();
function V0(n) {
  const r = n.window ? n.window : typeof window < 'u' ? window : void 0,
    u =
      typeof r < 'u' &&
      typeof r.document < 'u' &&
      typeof r.document.createElement < 'u';
  _e(
    n.routes.length > 0,
    'You must provide a non-empty routes array to createRouter'
  );
  let o = n.hydrationRouteProperties || [],
    c = n.mapRouteProperties || Y0,
    f = c;
  if (n.instrumentations) {
    let E = n.instrumentations;
    f = A => ({ ...c(A), ...C0(E.map(N => N.route).filter(Boolean), A) });
  }
  let h = {},
    m = new G0(ur(n.routes, f, void 0, h)),
    y = n.basename || '/';
  y.startsWith('/') || (y = `/${y}`);
  let v = n.dataStrategy || K0,
    b = { ...n.future },
    p = null,
    M = new Set(),
    z = null,
    L = null,
    Y = null,
    j = n.hydrationData != null,
    k = Rl(m.activeRoutes, n.history.location, y, !1, m.branches),
    W = !1,
    I = null,
    J,
    ce;
  if (k == null && !n.patchRoutesOnNavigation) {
    let E = sl(404, { pathname: n.history.location.pathname }),
      { matches: A, route: N } = Du(m.activeRoutes);
    ((J = !0), (ce = !J), (k = A), (I = { [N.id]: E }));
  } else if (
    (k &&
      !n.hydrationData &&
      Ga(k, m.activeRoutes, n.history.location.pathname).active &&
      (k = null),
    k)
  )
    if (k.some(E => E.route.lazy)) ((J = !1), (ce = !J));
    else if (!k.some(E => Nc(E.route))) ((J = !0), (ce = !J));
    else {
      let E = n.hydrationData ? n.hydrationData.loaderData : null,
        A = n.hydrationData ? n.hydrationData.errors : null,
        N = k;
      if (A) {
        let Z = k.findIndex($ => A[$.route.id] !== void 0);
        N = N.slice(0, Z + 1);
      }
      ((ce = !1),
        (J = !0),
        N.forEach(Z => {
          let $ = Py(Z.route, E, A);
          ((ce = ce || $.renderFallback), (J = J && !$.shouldLoad));
        }));
    }
  else {
    ((J = !1), (ce = !J), (k = []));
    let E = Ga(null, m.activeRoutes, n.history.location.pathname);
    E.active && E.matches && ((W = !0), (k = E.matches));
  }
  let le,
    T = {
      historyAction: n.history.action,
      location: n.history.location,
      matches: k,
      initialized: J,
      renderFallback: ce,
      navigation: cc,
      restoreScrollPosition: n.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: 'idle',
      loaderData: (n.hydrationData && n.hydrationData.loaderData) || {},
      actionData: (n.hydrationData && n.hydrationData.actionData) || null,
      errors: (n.hydrationData && n.hydrationData.errors) || I,
      fetchers: new Map(),
      blockers: new Map(),
    },
    Q = 'POP',
    re = null,
    ke = !1,
    xe,
    Oe = !1,
    Ye = new Map(),
    Pe = null,
    Se = !1,
    _ = !1,
    X = new Set(),
    ee = new Map(),
    Ee = 0,
    K = -1,
    x = new Map(),
    B = new Set(),
    F = new Map(),
    te = new Map(),
    ae = new Set(),
    fe = new Map(),
    Me,
    nt = null;
  function we() {
    if (
      ((p = n.history.listen(({ action: E, location: A, delta: N }) => {
        if (Me) {
          (Me(), (Me = void 0));
          return;
        }
        bt(
          fe.size === 0 || N != null,
          'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.'
        );
        let Z = Ba({
          currentLocation: T.location,
          nextLocation: A,
          historyAction: E,
        });
        if (Z && N != null) {
          let $ = new Promise(ye => {
            Me = ye;
          });
          (n.history.go(N * -1),
            Ll(Z, {
              state: 'blocked',
              location: A,
              proceed() {
                (Ll(Z, {
                  state: 'proceeding',
                  proceed: void 0,
                  reset: void 0,
                  location: A,
                }),
                  $.then(() => n.history.go(N)));
              },
              reset() {
                let ye = new Map(T.blockers);
                (ye.set(Z, Wi), et({ blockers: ye }));
              },
            }),
            re?.resolve(),
            (re = null));
          return;
        }
        return ml(E, A);
      })),
      u)
    ) {
      fb(r, Ye);
      let E = () => db(r, Ye);
      (r.addEventListener('pagehide', E),
        (Pe = () => r.removeEventListener('pagehide', E)));
    }
    return (
      T.initialized || ml('POP', T.location, { initialHydration: !0 }),
      le
    );
  }
  function wl() {
    (p && p(),
      Pe && Pe(),
      M.clear(),
      xe && xe.abort(),
      T.fetchers.forEach((E, A) => ui(A)),
      T.blockers.forEach((E, A) => pr(A)));
  }
  function hl(E) {
    return (M.add(E), () => M.delete(E));
  }
  function et(E, A = {}) {
    (E.matches &&
      (E.matches = E.matches.map($ => {
        let ye = h[$.route.id],
          oe = $.route;
        return oe.element !== ye.element ||
          oe.errorElement !== ye.errorElement ||
          oe.hydrateFallbackElement !== ye.hydrateFallbackElement
          ? { ...$, route: ye }
          : $;
      })),
      (T = { ...T, ...E }));
    let N = [],
      Z = [];
    (T.fetchers.forEach(($, ye) => {
      $.state === 'idle' && (ae.has(ye) ? N.push(ye) : Z.push(ye));
    }),
      ae.forEach($ => {
        !T.fetchers.has($) && !ee.has($) && N.push($);
      }),
      [...M].forEach($ =>
        $(T, {
          deletedFetchers: N,
          newErrors: E.errors ?? null,
          viewTransitionOpts: A.viewTransitionOpts,
          flushSync: A.flushSync === !0,
        })
      ),
      N.forEach($ => ui($)),
      Z.forEach($ => T.fetchers.delete($)));
  }
  function Vt(E, A, { flushSync: N } = {}) {
    let Z =
        T.actionData != null &&
        T.navigation.formMethod != null &&
        Ot(T.navigation.formMethod) &&
        T.navigation.state === 'loading' &&
        E.state?._isRedirect !== !0,
      $;
    A.actionData
      ? Object.keys(A.actionData).length > 0
        ? ($ = A.actionData)
        : ($ = null)
      : Z
        ? ($ = T.actionData)
        : ($ = null);
    let ye = A.loaderData
        ? ey(T.loaderData, A.loaderData, A.matches || [], A.errors)
        : T.loaderData,
      oe = T.blockers;
    oe.size > 0 && ((oe = new Map(oe)), oe.forEach((pe, ve) => oe.set(ve, Wi)));
    let P = Se ? !1 : br(E, A.matches || T.matches),
      ne =
        ke === !0 ||
        (T.navigation.formMethod != null &&
          Ot(T.navigation.formMethod) &&
          E.state?._isRedirect !== !0);
    (m.commitHmrRoutes(),
      Se ||
        Q === 'POP' ||
        (Q === 'PUSH'
          ? n.history.push(E, E.state)
          : Q === 'REPLACE' && n.history.replace(E, E.state)));
    let ue;
    if (Q === 'POP') {
      let pe = Ye.get(T.location.pathname);
      pe && pe.has(E.pathname)
        ? (ue = { currentLocation: T.location, nextLocation: E })
        : Ye.has(E.pathname) &&
          (ue = { currentLocation: E, nextLocation: T.location });
    } else if (Oe) {
      let pe = Ye.get(T.location.pathname);
      (pe
        ? pe.add(E.pathname)
        : ((pe = new Set([E.pathname])), Ye.set(T.location.pathname, pe)),
        (ue = { currentLocation: T.location, nextLocation: E }));
    }
    (et(
      {
        ...A,
        actionData: $,
        loaderData: ye,
        historyAction: Q,
        location: E,
        initialized: !0,
        renderFallback: !1,
        navigation: cc,
        revalidation: 'idle',
        restoreScrollPosition: P,
        preventScrollReset: ne,
        blockers: oe,
      },
      { viewTransitionOpts: ue, flushSync: N === !0 }
    ),
      (Q = 'POP'),
      (ke = !1),
      (Oe = !1),
      (Se = !1),
      (_ = !1),
      re?.resolve(),
      (re = null),
      nt?.resolve(),
      (nt = null));
  }
  async function Dt(E, A) {
    if ((re?.resolve(), (re = null), typeof E == 'number')) {
      re || (re = ny());
      let Ze = re.promise;
      return (n.history.go(E), Ze);
    }
    let N = xc(T.location, T.matches, y, E, A?.fromRouteId, A?.relative),
      { path: Z, submission: $, error: ye } = Xm(!1, N, A),
      oe;
    A?.mask &&
      (oe = {
        pathname: '',
        search: '',
        hash: '',
        ...(typeof A.mask == 'string'
          ? Dl(A.mask)
          : { ...T.location.mask, ...A.mask }),
      });
    let P = T.location,
      ne = rr(P, Z, A && A.state, void 0, oe);
    ne = { ...ne, ...n.history.encodeLocation(ne) };
    let ue = A && A.replace != null ? A.replace : void 0,
      pe = 'PUSH';
    ue === !0
      ? (pe = 'REPLACE')
      : ue === !1 ||
        ($ != null &&
          Ot($.formMethod) &&
          $.formAction === T.location.pathname + T.location.search &&
          (pe = 'REPLACE'));
    let ve =
        A && 'preventScrollReset' in A ? A.preventScrollReset === !0 : void 0,
      Xe = (A && A.flushSync) === !0,
      je = Ba({ currentLocation: P, nextLocation: ne, historyAction: pe });
    if (je) {
      Ll(je, {
        state: 'blocked',
        location: ne,
        proceed() {
          (Ll(je, {
            state: 'proceeding',
            proceed: void 0,
            reset: void 0,
            location: ne,
          }),
            Dt(E, A));
        },
        reset() {
          let Ze = new Map(T.blockers);
          (Ze.set(je, Wi), et({ blockers: Ze }));
        },
      });
      return;
    }
    await ml(pe, ne, {
      submission: $,
      pendingError: ye,
      preventScrollReset: ve,
      replace: A && A.replace,
      enableViewTransition: A && A.viewTransition,
      flushSync: Xe,
      callSiteDefaultShouldRevalidate: A && A.defaultShouldRevalidate,
    });
  }
  function li() {
    (nt || (nt = ny()), yn(), et({ revalidation: 'loading' }));
    let E = nt.promise;
    return T.navigation.state === 'submitting'
      ? E
      : T.navigation.state === 'idle'
        ? (ml(T.historyAction, T.location, {
            startUninterruptedRevalidation: !0,
          }),
          E)
        : (ml(Q || T.historyAction, T.navigation.location, {
            overrideNavigation: T.navigation,
            enableViewTransition: Oe === !0,
          }),
          E);
  }
  async function ml(E, A, N) {
    (xe && xe.abort(),
      (xe = null),
      (Q = E),
      (Se = (N && N.startUninterruptedRevalidation) === !0),
      Ya(T.location, T.matches),
      (ke = (N && N.preventScrollReset) === !0),
      (Oe = (N && N.enableViewTransition) === !0));
    let Z = m.activeRoutes,
      $ = N && N.overrideNavigation,
      ye =
        N?.initialHydration && T.matches && T.matches.length > 0 && !W
          ? T.matches
          : Rl(Z, A, y, !1, m.branches),
      oe = (N && N.flushSync) === !0;
    if (
      ye &&
      T.initialized &&
      !_ &&
      tb(T.location, A) &&
      !(N && N.submission && Ot(N.submission.formMethod))
    ) {
      Vt(A, { matches: ye }, { flushSync: oe });
      return;
    }
    let P = Ga(ye, Z, A.pathname);
    if ((P.active && P.matches && (ye = P.matches), !ye)) {
      let { error: tt, notFoundMatches: it, route: Ce } = aa(A.pathname);
      Vt(
        A,
        { matches: it, loaderData: {}, errors: { [Ce.id]: tt } },
        { flushSync: oe }
      );
      return;
    }
    xe = new AbortController();
    let ne = In(n.history, A, xe.signal, N && N.submission),
      ue = n.getContext ? await n.getContext() : new Bm(),
      pe;
    if (N && N.pendingError)
      pe = [Da(ye).route.id, { type: 'error', error: N.pendingError }];
    else if (N && N.submission && Ot(N.submission.formMethod)) {
      let tt = await Ju(
        ne,
        A,
        N.submission,
        ye,
        ue,
        P.active,
        N && N.initialHydration === !0,
        { replace: N.replace, flushSync: oe }
      );
      if (tt.shortCircuited) return;
      if (tt.pendingActionResult) {
        let [it, Ce] = tt.pendingActionResult;
        if (Wt(Ce) && or(Ce.error) && Ce.error.status === 404) {
          ((xe = null),
            Vt(A, {
              matches: tt.matches,
              loaderData: {},
              errors: { [it]: Ce.error },
            }));
          return;
        }
      }
      ((ye = tt.matches || ye),
        (pe = tt.pendingActionResult),
        ($ = fc(A, N.submission)),
        (oe = !1),
        (P.active = !1),
        (ne = In(n.history, ne.url, ne.signal)));
    }
    let {
      shortCircuited: ve,
      matches: Xe,
      loaderData: je,
      errors: Ze,
    } = await vr(
      ne,
      A,
      ye,
      ue,
      P.active,
      $,
      N && N.submission,
      N && N.fetcherSubmission,
      N && N.replace,
      N && N.initialHydration === !0,
      oe,
      pe,
      N && N.callSiteDefaultShouldRevalidate
    );
    ve ||
      ((xe = null),
      Vt(A, { matches: Xe || ye, ...ty(pe), loaderData: je, errors: Ze }));
  }
  async function Ju(E, A, N, Z, $, ye, oe, P = {}) {
    yn();
    let ne = sb(A, N);
    if ((et({ navigation: ne }, { flushSync: P.flushSync === !0 }), ye)) {
      let ve = await na(Z, A.pathname, E.signal);
      if (ve.type === 'aborted') return { shortCircuited: !0 };
      if (ve.type === 'error') {
        if (ve.partialMatches.length === 0) {
          let { matches: je, route: Ze } = Du(m.activeRoutes);
          return {
            matches: je,
            pendingActionResult: [Ze.id, { type: 'error', error: ve.error }],
          };
        }
        let Xe = Da(ve.partialMatches).route.id;
        return {
          matches: ve.partialMatches,
          pendingActionResult: [Xe, { type: 'error', error: ve.error }],
        };
      } else if (ve.matches) Z = ve.matches;
      else {
        let { notFoundMatches: Xe, error: je, route: Ze } = aa(A.pathname);
        return {
          matches: Xe,
          pendingActionResult: [Ze.id, { type: 'error', error: je }],
        };
      }
    }
    let ue,
      pe = Bu(Z, A);
    if (!pe.route.action && !pe.route.lazy)
      ue = {
        type: 'error',
        error: sl(405, {
          method: E.method,
          pathname: A.pathname,
          routeId: pe.route.id,
        }),
      };
    else {
      let ve = ti(f, h, E, A, Z, pe, oe ? [] : o, $),
        Xe = await ja(E, A, ve, $, null);
      if (((ue = Xe[pe.route.id]), !ue)) {
        for (let je of Z)
          if (Xe[je.route.id]) {
            ue = Xe[je.route.id];
            break;
          }
      }
      if (E.signal.aborted) return { shortCircuited: !0 };
    }
    if (fn(ue)) {
      let ve;
      return (
        P && P.replace != null
          ? (ve = P.replace)
          : (ve =
              Wm(
                ue.response.headers.get('Location'),
                new URL(E.url),
                y,
                n.history
              ) ===
              T.location.pathname + T.location.search),
        await ft(E, ue, !0, { submission: N, replace: ve }),
        { shortCircuited: !0 }
      );
    }
    if (Wt(ue)) {
      let ve = Da(Z, pe.route.id);
      return (
        (P && P.replace) !== !0 && (Q = 'PUSH'),
        { matches: Z, pendingActionResult: [ve.route.id, ue, pe.route.id] }
      );
    }
    return { matches: Z, pendingActionResult: [pe.route.id, ue] };
  }
  async function vr(E, A, N, Z, $, ye, oe, P, ne, ue, pe, ve, Xe) {
    let je = ye || fc(A, oe),
      Ze = oe || P || ay(je),
      tt = !Se && !ue;
    if ($) {
      if (tt) {
        let dt = mn(ve);
        et(
          { navigation: je, ...(dt !== void 0 ? { actionData: dt } : {}) },
          { flushSync: pe }
        );
      }
      let He = await na(N, A.pathname, E.signal);
      if (He.type === 'aborted') return { shortCircuited: !0 };
      if (He.type === 'error') {
        if (He.partialMatches.length === 0) {
          let { matches: bl, route: wt } = Du(m.activeRoutes);
          return { matches: bl, loaderData: {}, errors: { [wt.id]: He.error } };
        }
        let dt = Da(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: { [dt]: He.error },
        };
      } else if (He.matches) N = He.matches;
      else {
        let { error: dt, notFoundMatches: bl, route: wt } = aa(A.pathname);
        return { matches: bl, loaderData: {}, errors: { [wt.id]: dt } };
      }
    }
    let it = m.activeRoutes,
      { dsMatches: Ce, revalidatingFetchers: St } = Qm(
        E,
        Z,
        f,
        h,
        n.history,
        T,
        N,
        Ze,
        A,
        ue ? [] : o,
        ue === !0,
        _,
        X,
        ae,
        F,
        B,
        it,
        y,
        n.patchRoutesOnNavigation != null,
        m.branches,
        ve,
        Xe
      );
    if (
      ((K = ++Ee),
      !n.dataStrategy &&
        !Ce.some(He => He.shouldLoad) &&
        !Ce.some(He => He.route.middleware && He.route.middleware.length > 0) &&
        St.length === 0)
    ) {
      let He = Ct();
      return (
        Vt(
          A,
          {
            matches: N,
            loaderData: {},
            errors: ve && Wt(ve[1]) ? { [ve[0]]: ve[1].error } : null,
            ...ty(ve),
            ...(He ? { fetchers: new Map(T.fetchers) } : {}),
          },
          { flushSync: pe }
        ),
        { shortCircuited: !0 }
      );
    }
    if (tt) {
      let He = {};
      if (!$) {
        He.navigation = je;
        let dt = mn(ve);
        dt !== void 0 && (He.actionData = dt);
      }
      (St.length > 0 && (He.fetchers = ai(St)), et(He, { flushSync: pe }));
    }
    St.forEach(He => {
      (ot(He.key), He.controller && ee.set(He.key, He.controller));
    });
    let Lt = () => St.forEach(He => ot(He.key));
    xe && xe.signal.addEventListener('abort', Lt);
    let { loaderResults: rt, fetcherResults: gl } = await ii(Ce, St, E, A, Z);
    if (E.signal.aborted) return { shortCircuited: !0 };
    (xe && xe.signal.removeEventListener('abort', Lt),
      St.forEach(He => ee.delete(He.key)));
    let kt = Nu(rt);
    if (kt)
      return (
        await ft(E, kt.result, !0, { replace: ne }),
        { shortCircuited: !0 }
      );
    if (((kt = Nu(gl)), kt))
      return (
        B.add(kt.key),
        await ft(E, kt.result, !0, { replace: ne }),
        { shortCircuited: !0 }
      );
    let { loaderData: pl, errors: It } = Pm(T, N, rt, ve, St, gl);
    ue && T.errors && (It = { ...T.errors, ...It });
    let Hl = Ct(),
      Va = gr(K),
      ka = Hl || Va || St.length > 0;
    return {
      matches: N,
      loaderData: pl,
      errors: It,
      ...(ka ? { fetchers: new Map(T.fetchers) } : {}),
    };
  }
  function mn(E) {
    if (E && !Wt(E[1])) return { [E[0]]: E[1].data };
    if (T.actionData)
      return Object.keys(T.actionData).length === 0 ? null : T.actionData;
  }
  function ai(E) {
    return (
      E.forEach(A => {
        let N = T.fetchers.get(A.key),
          Z = Ii(void 0, N ? N.data : void 0);
        T.fetchers.set(A.key, Z);
      }),
      new Map(T.fetchers)
    );
  }
  async function ni(E, A, N, Z) {
    ot(E);
    let $ = (Z && Z.flushSync) === !0,
      ye = m.activeRoutes,
      oe = xc(T.location, T.matches, y, N, A, Z?.relative),
      P = Rl(ye, oe, y, !1, m.branches),
      ne = Ga(P, ye, oe);
    if ((ne.active && ne.matches && (P = ne.matches), !P)) {
      yl(E, A, sl(404, { pathname: oe }), { flushSync: $ });
      return;
    }
    let { path: ue, submission: pe, error: ve } = Xm(!0, oe, Z);
    if (ve) {
      yl(E, A, ve, { flushSync: $ });
      return;
    }
    let Xe = n.getContext ? await n.getContext() : new Bm(),
      je = (Z && Z.preventScrollReset) === !0;
    if (pe && Ot(pe.formMethod)) {
      await Fu(
        E,
        A,
        ue,
        P,
        Xe,
        ne.active,
        $,
        je,
        pe,
        Z && Z.defaultShouldRevalidate
      );
      return;
    }
    (F.set(E, { routeId: A, path: ue }),
      await $u(E, A, ue, P, Xe, ne.active, $, je, pe));
  }
  async function Fu(E, A, N, Z, $, ye, oe, P, ne, ue) {
    (yn(), F.delete(E));
    let pe = T.fetchers.get(E);
    Ut(E, cb(ne, pe), { flushSync: oe });
    let ve = new AbortController(),
      Xe = In(n.history, N, ve.signal, ne);
    if (ye) {
      let Be = await na(Z, new URL(Xe.url).pathname, Xe.signal, E);
      if (Be.type === 'aborted') return;
      if (Be.type === 'error') {
        yl(E, A, Be.error, { flushSync: oe });
        return;
      } else if (Be.matches) Z = Be.matches;
      else {
        yl(E, A, sl(404, { pathname: N }), { flushSync: oe });
        return;
      }
    }
    let je = Bu(Z, N);
    if (!je.route.action && !je.route.lazy) {
      let Be = sl(405, { method: ne.formMethod, pathname: N, routeId: A });
      yl(E, A, Be, { flushSync: oe });
      return;
    }
    ee.set(E, ve);
    let Ze = Ee,
      tt = ti(f, h, Xe, N, Z, je, o, $),
      it = await ja(Xe, N, tt, $, E),
      Ce = it[je.route.id];
    if (!Ce) {
      for (let Be of tt)
        if (it[Be.route.id]) {
          Ce = it[Be.route.id];
          break;
        }
    }
    if (Xe.signal.aborted) {
      ee.get(E) === ve && ee.delete(E);
      return;
    }
    if (ae.has(E)) {
      if (fn(Ce) || Wt(Ce)) {
        Ut(E, la(void 0));
        return;
      }
    } else {
      if (fn(Ce))
        if ((ee.delete(E), K > Ze)) {
          Ut(E, la(void 0));
          return;
        } else
          return (
            B.add(E),
            Ut(E, Ii(ne)),
            ft(Xe, Ce, !1, { fetcherSubmission: ne, preventScrollReset: P })
          );
      if (Wt(Ce)) {
        yl(E, A, Ce.error);
        return;
      }
    }
    let St = T.navigation.location || T.location,
      Lt = In(n.history, St, ve.signal),
      rt = m.activeRoutes,
      gl =
        T.navigation.state !== 'idle'
          ? Rl(rt, T.navigation.location, y, !1, m.branches)
          : T.matches;
    _e(gl, "Didn't find any matches after fetcher action");
    let kt = ++Ee;
    x.set(E, kt);
    let pl = Ii(ne, Ce.data);
    T.fetchers.set(E, pl);
    let { dsMatches: It, revalidatingFetchers: Hl } = Qm(
      Lt,
      $,
      f,
      h,
      n.history,
      T,
      gl,
      ne,
      St,
      o,
      !1,
      _,
      X,
      ae,
      F,
      B,
      rt,
      y,
      n.patchRoutesOnNavigation != null,
      m.branches,
      [je.route.id, Ce],
      ue
    );
    (Hl.filter(Be => Be.key !== E).forEach(Be => {
      let Xa = Be.key,
        Er = T.fetchers.get(Xa),
        oi = Ii(void 0, Er ? Er.data : void 0);
      (T.fetchers.set(Xa, oi),
        ot(Xa),
        Be.controller && ee.set(Xa, Be.controller));
    }),
      et({ fetchers: new Map(T.fetchers) }));
    let Va = () => Hl.forEach(Be => ot(Be.key));
    ve.signal.addEventListener('abort', Va);
    let { loaderResults: ka, fetcherResults: He } = await ii(It, Hl, Lt, St, $);
    if (ve.signal.aborted) return;
    if (
      (ve.signal.removeEventListener('abort', Va),
      x.delete(E),
      ee.delete(E),
      Hl.forEach(Be => ee.delete(Be.key)),
      T.fetchers.has(E))
    ) {
      let Be = la(Ce.data);
      T.fetchers.set(E, Be);
    }
    let dt = Nu(ka);
    if (dt) return ft(Lt, dt.result, !1, { preventScrollReset: P });
    if (((dt = Nu(He)), dt))
      return (B.add(dt.key), ft(Lt, dt.result, !1, { preventScrollReset: P }));
    let { loaderData: bl, errors: wt } = Pm(T, gl, ka, void 0, Hl, He);
    (gr(kt),
      T.navigation.state === 'loading' && kt > K
        ? (_e(Q, 'Expected pending action'),
          xe && xe.abort(),
          Vt(T.navigation.location, {
            matches: gl,
            loaderData: bl,
            errors: wt,
            fetchers: new Map(T.fetchers),
          }))
        : (et({
            errors: wt,
            loaderData: ey(T.loaderData, bl, gl, wt),
            fetchers: new Map(T.fetchers),
          }),
          (_ = !1)));
  }
  async function $u(E, A, N, Z, $, ye, oe, P, ne) {
    let ue = T.fetchers.get(E);
    Ut(E, Ii(ne, ue ? ue.data : void 0), { flushSync: oe });
    let pe = new AbortController(),
      ve = In(n.history, N, pe.signal);
    if (ye) {
      let Ce = await na(Z, new URL(ve.url).pathname, ve.signal, E);
      if (Ce.type === 'aborted') return;
      if (Ce.type === 'error') {
        yl(E, A, Ce.error, { flushSync: oe });
        return;
      } else if (Ce.matches) Z = Ce.matches;
      else {
        yl(E, A, sl(404, { pathname: N }), { flushSync: oe });
        return;
      }
    }
    let Xe = Bu(Z, N);
    ee.set(E, pe);
    let je = Ee,
      Ze = ti(f, h, ve, N, Z, Xe, o, $),
      tt = await ja(ve, N, Ze, $, E),
      it = tt[Xe.route.id];
    if (!it) {
      for (let Ce of Z)
        if (tt[Ce.route.id]) {
          it = tt[Ce.route.id];
          break;
        }
    }
    if ((ee.get(E) === pe && ee.delete(E), !ve.signal.aborted)) {
      if (ae.has(E)) {
        Ut(E, la(void 0));
        return;
      }
      if (fn(it))
        if (K > je) {
          Ut(E, la(void 0));
          return;
        } else {
          (B.add(E), await ft(ve, it, !1, { preventScrollReset: P }));
          return;
        }
      if (Wt(it)) {
        yl(E, A, it.error);
        return;
      }
      Ut(E, la(it.data));
    }
  }
  async function ft(
    E,
    A,
    N,
    {
      submission: Z,
      fetcherSubmission: $,
      preventScrollReset: ye,
      replace: oe,
    } = {}
  ) {
    (N || (re?.resolve(), (re = null)),
      A.response.headers.has('X-Remix-Revalidate') && (_ = !0));
    let P = A.response.headers.get('Location');
    (_e(P, 'Expected a Location header on the redirect Response'),
      (P = Wm(P, new URL(E.url), y, n.history)));
    let ne = rr(T.location, P, { _isRedirect: !0 });
    if (u) {
      let Ze = !1;
      if (A.response.headers.has('X-Remix-Reload-Document')) Ze = !0;
      else if (_c(P)) {
        const tt = Yy(P, !0);
        Ze = tt.origin !== r.location.origin || fl(tt.pathname, y) == null;
      }
      if (Ze) {
        oe ? r.location.replace(P) : r.location.assign(P);
        return;
      }
    }
    xe = null;
    let ue =
        oe === !0 || A.response.headers.has('X-Remix-Replace')
          ? 'REPLACE'
          : 'PUSH',
      { formMethod: pe, formAction: ve, formEncType: Xe } = T.navigation;
    !Z && !$ && pe && ve && Xe && (Z = ay(T.navigation));
    let je = Z || $;
    if (B0.has(A.response.status) && je && Ot(je.formMethod))
      await ml(ue, ne, {
        submission: { ...je, formAction: P },
        preventScrollReset: ye || ke,
        enableViewTransition: N ? Oe : void 0,
      });
    else {
      let Ze = fc(ne, Z);
      await ml(ue, ne, {
        overrideNavigation: Ze,
        fetcherSubmission: $,
        preventScrollReset: ye || ke,
        enableViewTransition: N ? Oe : void 0,
      });
    }
  }
  async function ja(E, A, N, Z, $) {
    let ye,
      oe = {};
    try {
      ye = await F0(v, E, A, N, $, Z, !1);
    } catch (P) {
      return (
        N.filter(ne => ne.shouldLoad).forEach(ne => {
          oe[ne.route.id] = { type: 'error', error: P };
        }),
        oe
      );
    }
    if (E.signal.aborted) return oe;
    if (!Ot(E.method))
      for (let P of N) {
        if (ye[P.route.id]?.type === 'error') break;
        !ye.hasOwnProperty(P.route.id) &&
          !T.loaderData.hasOwnProperty(P.route.id) &&
          (!T.errors || !T.errors.hasOwnProperty(P.route.id)) &&
          P.shouldCallHandler() &&
          (ye[P.route.id] = {
            type: 'error',
            result: new Error(
              `No result returned from dataStrategy for route ${P.route.id}`
            ),
          });
      }
    for (let [P, ne] of Object.entries(ye))
      if (ib(ne)) {
        let ue = ne.result;
        oe[P] = { type: 'redirect', response: P0(ue, E, P, N, y) };
      } else oe[P] = await I0(ne);
    return oe;
  }
  async function ii(E, A, N, Z, $) {
    let ye = ja(N, Z, E, $, null),
      oe = Promise.all(
        A.map(async ue => {
          if (ue.matches && ue.match && ue.request && ue.controller) {
            let ve = (await ja(ue.request, ue.path, ue.matches, $, ue.key))[
              ue.match.route.id
            ];
            return { [ue.key]: ve };
          } else
            return Promise.resolve({
              [ue.key]: {
                type: 'error',
                error: sl(404, { pathname: ue.path }),
              },
            });
        })
      ),
      P = await ye,
      ne = (await oe).reduce((ue, pe) => Object.assign(ue, pe), {});
    return { loaderResults: P, fetcherResults: ne };
  }
  function yn() {
    ((_ = !0),
      F.forEach((E, A) => {
        (ee.has(A) && X.add(A), ot(A));
      }));
  }
  function Ut(E, A, N = {}) {
    (T.fetchers.set(E, A),
      et(
        { fetchers: new Map(T.fetchers) },
        { flushSync: (N && N.flushSync) === !0 }
      ));
  }
  function yl(E, A, N, Z = {}) {
    let $ = Da(T.matches, A);
    (ui(E),
      et(
        { errors: { [$.route.id]: N }, fetchers: new Map(T.fetchers) },
        { flushSync: (Z && Z.flushSync) === !0 }
      ));
  }
  function ri(E) {
    return (
      te.set(E, (te.get(E) || 0) + 1),
      ae.has(E) && ae.delete(E),
      T.fetchers.get(E) || q0
    );
  }
  function Wu(E, A) {
    (ot(E, A?.reason), Ut(E, la(null)));
  }
  function ui(E) {
    let A = T.fetchers.get(E);
    (ee.has(E) && !(A && A.state === 'loading' && x.has(E)) && ot(E),
      F.delete(E),
      x.delete(E),
      B.delete(E),
      ae.delete(E),
      X.delete(E),
      T.fetchers.delete(E));
  }
  function Ha(E) {
    let A = (te.get(E) || 0) - 1;
    (A <= 0 ? (te.delete(E), ae.add(E)) : te.set(E, A),
      et({ fetchers: new Map(T.fetchers) }));
  }
  function ot(E, A) {
    let N = ee.get(E);
    N && (N.abort(A), ee.delete(E));
  }
  function vl(E) {
    for (let A of E) {
      let N = ri(A),
        Z = la(N.data);
      T.fetchers.set(A, Z);
    }
  }
  function Ct() {
    let E = [],
      A = !1;
    for (let N of B) {
      let Z = T.fetchers.get(N);
      (_e(Z, `Expected fetcher: ${N}`),
        Z.state === 'loading' && (B.delete(N), E.push(N), (A = !0)));
    }
    return (vl(E), A);
  }
  function gr(E) {
    let A = [];
    for (let [N, Z] of x)
      if (Z < E) {
        let $ = T.fetchers.get(N);
        (_e($, `Expected fetcher: ${N}`),
          $.state === 'loading' && (ot(N), x.delete(N), A.push(N)));
      }
    return (vl(A), A.length > 0);
  }
  function Iu(E, A) {
    let N = T.blockers.get(E) || Wi;
    return (fe.get(E) !== A && fe.set(E, A), N);
  }
  function pr(E) {
    (T.blockers.delete(E), fe.delete(E));
  }
  function Ll(E, A) {
    let N = T.blockers.get(E) || Wi;
    _e(
      (N.state === 'unblocked' && A.state === 'blocked') ||
        (N.state === 'blocked' && A.state === 'blocked') ||
        (N.state === 'blocked' && A.state === 'proceeding') ||
        (N.state === 'blocked' && A.state === 'unblocked') ||
        (N.state === 'proceeding' && A.state === 'unblocked'),
      `Invalid blocker state transition: ${N.state} -> ${A.state}`
    );
    let Z = new Map(T.blockers);
    (Z.set(E, A), et({ blockers: Z }));
  }
  function Ba({ currentLocation: E, nextLocation: A, historyAction: N }) {
    if (fe.size === 0) return;
    fe.size > 1 && bt(!1, 'A router only supports one blocker at a time');
    let Z = Array.from(fe.entries()),
      [$, ye] = Z[Z.length - 1],
      oe = T.blockers.get($);
    if (
      !(oe && oe.state === 'proceeding') &&
      ye({ currentLocation: E, nextLocation: A, historyAction: N })
    )
      return $;
  }
  function aa(E) {
    let A = sl(404, { pathname: E }),
      N = m.activeRoutes,
      { matches: Z, route: $ } = Du(N);
    return { notFoundMatches: Z, route: $, error: A };
  }
  function jl(E, A, N) {
    if (((z = E), (Y = A), (L = N || null), !j && T.navigation === cc)) {
      j = !0;
      let Z = br(T.location, T.matches);
      Z != null && et({ restoreScrollPosition: Z });
    }
    return () => {
      ((z = null), (Y = null), (L = null));
    };
  }
  function qa(E, A) {
    return (
      (L &&
        L(
          E,
          A.map(Z => f0(Z, T.loaderData))
        )) ||
      E.key
    );
  }
  function Ya(E, A) {
    if (z && Y) {
      let N = qa(E, A);
      z[N] = Y();
    }
  }
  function br(E, A) {
    if (z) {
      let N = qa(E, A),
        Z = z[N];
      if (typeof Z == 'number') return Z;
    }
    return null;
  }
  function Ga(E, A, N) {
    if (n.patchRoutesOnNavigation) {
      let Z = m.branches;
      if (E) {
        if (Object.keys(E[0].params).length > 0)
          return { active: !0, matches: Rl(A, N, y, !0, Z) };
      } else return { active: !0, matches: Rl(A, N, y, !0, Z) || [] };
    }
    return { active: !1, matches: null };
  }
  async function na(E, A, N, Z) {
    if (!n.patchRoutesOnNavigation) return { type: 'success', matches: E };
    let $ = E;
    for (;;) {
      let ye = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: N,
          path: A,
          matches: $,
          fetcherKey: Z,
          patch: (ue, pe) => {
            N.aborted || Zm(ue, pe, m, ye, f, !1);
          },
        });
      } catch (ue) {
        return { type: 'error', error: ue, partialMatches: $ };
      }
      if (N.aborted) return { type: 'aborted' };
      let oe = m.branches,
        P = Rl(m.activeRoutes, A, y, !1, oe),
        ne = null;
      if (P) {
        if (Object.keys(P[0].params).length === 0)
          return { type: 'success', matches: P };
        if (
          ((ne = Rl(m.activeRoutes, A, y, !0, oe)),
          !(ne && $.length < ne.length && ia($, ne.slice(0, $.length))))
        )
          return { type: 'success', matches: P };
      }
      if ((ne || (ne = Rl(m.activeRoutes, A, y, !0, oe)), !ne || ia($, ne)))
        return { type: 'success', matches: null };
      $ = ne;
    }
  }
  function ia(E, A) {
    return (
      E.length === A.length && E.every((N, Z) => N.route.id === A[Z].route.id)
    );
  }
  function Pu(E) {
    ((h = {}), m.setHmrRoutes(ur(E, f, void 0, h)));
  }
  function Sr(E, A, N = !1) {
    (Zm(E, A, m, h, f, N), m.hasHMRRoutes || et({}));
  }
  return (
    (le = {
      get basename() {
        return y;
      },
      get future() {
        return b;
      },
      get state() {
        return T;
      },
      get routes() {
        return m.stableRoutes;
      },
      get branches() {
        return m.branches;
      },
      get manifest() {
        return h;
      },
      get window() {
        return r;
      },
      initialize: we,
      subscribe: hl,
      enableScrollRestoration: jl,
      navigate: Dt,
      fetch: ni,
      revalidate: li,
      createHref: E => n.history.createHref(E),
      encodeLocation: E => n.history.encodeLocation(E),
      getFetcher: ri,
      resetFetcher: Wu,
      deleteFetcher: Ha,
      dispose: wl,
      getBlocker: Iu,
      deleteBlocker: pr,
      patchRoutes: Sr,
      _internalFetchControllers: ee,
      _internalSetRoutes: Pu,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(E) {
        et(E);
      },
    }),
    n.instrumentations &&
      (le = _0(le, n.instrumentations.map(E => E.router).filter(Boolean))),
    le
  );
}
function k0(n) {
  return (
    n != null &&
    (('formData' in n && n.formData != null) ||
      ('body' in n && n.body !== void 0))
  );
}
function xc(n, r, u, o, c, f) {
  let h, m;
  if (c) {
    h = [];
    for (let v of r)
      if ((h.push(v), v.route.id === c)) {
        m = v;
        break;
      }
  } else ((h = r), (m = r[r.length - 1]));
  let y = Qu(o || '.', Oc(h), fl(n.pathname, u) || n.pathname, f === 'path');
  if (
    (o == null && ((y.search = n.search), (y.hash = n.hash)),
    (o == null || o === '' || o === '.') && m)
  ) {
    let v = Lc(y.search);
    if (m.route.index && !v)
      y.search = y.search ? y.search.replace(/^\?/, '?index&') : '?index';
    else if (!m.route.index && v) {
      let b = new URLSearchParams(y.search),
        p = b.getAll('index');
      (b.delete('index'), p.filter(z => z).forEach(z => b.append('index', z)));
      let M = b.toString();
      y.search = M ? `?${M}` : '';
    }
  }
  return (
    u !== '/' && (y.pathname = w0({ basename: u, pathname: y.pathname })),
    _l(y)
  );
}
function Xm(n, r, u) {
  if (!u || !k0(u)) return { path: r };
  if (u.formMethod && !ob(u.formMethod))
    return { path: r, error: sl(405, { method: u.formMethod }) };
  let o = () => ({ path: r, error: sl(400, { type: 'invalid-body' }) }),
    f = (u.formMethod || 'get').toUpperCase(),
    h = rv(r);
  if (u.body !== void 0) {
    if (u.formEncType === 'text/plain') {
      if (!Ot(f)) return o();
      let p =
        typeof u.body == 'string'
          ? u.body
          : u.body instanceof FormData || u.body instanceof URLSearchParams
            ? Array.from(u.body.entries()).reduce(
                (M, [z, L]) => `${M}${z}=${L}
`,
                ''
              )
            : String(u.body);
      return {
        path: r,
        submission: {
          formMethod: f,
          formAction: h,
          formEncType: u.formEncType,
          formData: void 0,
          json: void 0,
          text: p,
        },
      };
    } else if (u.formEncType === 'application/json') {
      if (!Ot(f)) return o();
      try {
        let p = typeof u.body == 'string' ? JSON.parse(u.body) : u.body;
        return {
          path: r,
          submission: {
            formMethod: f,
            formAction: h,
            formEncType: u.formEncType,
            formData: void 0,
            json: p,
            text: void 0,
          },
        };
      } catch {
        return o();
      }
    }
  }
  _e(
    typeof FormData == 'function',
    'FormData is not available in this environment'
  );
  let m, y;
  if (u.formData) ((m = wc(u.formData)), (y = u.formData));
  else if (u.body instanceof FormData) ((m = wc(u.body)), (y = u.body));
  else if (u.body instanceof URLSearchParams) ((m = u.body), (y = Im(m)));
  else if (u.body == null) ((m = new URLSearchParams()), (y = new FormData()));
  else
    try {
      ((m = new URLSearchParams(u.body)), (y = Im(m)));
    } catch {
      return o();
    }
  let v = {
    formMethod: f,
    formAction: h,
    formEncType: (u && u.formEncType) || 'application/x-www-form-urlencoded',
    formData: y,
    json: void 0,
    text: void 0,
  };
  if (Ot(v.formMethod)) return { path: r, submission: v };
  let b = Dl(r);
  return (
    n && b.search && Lc(b.search) && m.append('index', ''),
    (b.search = `?${m}`),
    { path: _l(b), submission: v }
  );
}
function Qm(n, r, u, o, c, f, h, m, y, v, b, p, M, z, L, Y, j, k, W, I, J, ce) {
  let le = J ? (Wt(J[1]) ? J[1].error : J[1].data) : void 0,
    T = c.createURL(f.location),
    Q = c.createURL(y),
    re;
  if (b && f.errors) {
    let _ = Object.keys(f.errors)[0];
    re = h.findIndex(X => X.route.id === _);
  } else if (J && Wt(J[1])) {
    let _ = J[0];
    re = h.findIndex(X => X.route.id === _) - 1;
  }
  let ke = J ? J[1].statusCode : void 0,
    xe = ke && ke >= 400,
    Oe = {
      currentUrl: T,
      currentParams: f.matches[0]?.params || {},
      nextUrl: Q,
      nextParams: h[0].params,
      ...m,
      actionResult: le,
      actionStatus: ke,
    },
    Ye = dr(h),
    Pe = h.map((_, X) => {
      let { route: ee } = _,
        Ee = null;
      if (re != null && X > re) Ee = !1;
      else if (ee.lazy) Ee = !0;
      else if (!Nc(ee)) Ee = !1;
      else if (b) {
        let { shouldLoad: F } = Py(ee, f.loaderData, f.errors);
        Ee = F;
      } else X0(f.loaderData, f.matches[X], _) && (Ee = !0);
      if (Ee !== null) return Rc(u, o, n, y, Ye, _, v, r, Ee);
      let K = !1;
      typeof ce == 'boolean'
        ? (K = ce)
        : xe
          ? (K = !1)
          : (p ||
              T.pathname + T.search === Q.pathname + Q.search ||
              T.search !== Q.search ||
              Q0(f.matches[X], _)) &&
            (K = !0);
      let x = { ...Oe, defaultShouldRevalidate: K },
        B = ir(_, x);
      return Rc(u, o, n, y, Ye, _, v, r, B, x, ce);
    }),
    Se = [];
  return (
    L.forEach((_, X) => {
      if (b || !h.some(ae => ae.route.id === _.routeId) || z.has(X)) return;
      let ee = f.fetchers.get(X),
        Ee = ee && ee.state !== 'idle' && ee.data === void 0,
        K = Rl(j, _.path, k ?? '/', !1, I);
      if (!K) {
        if (W && Ee) return;
        Se.push({
          key: X,
          routeId: _.routeId,
          path: _.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (Y.has(X)) return;
      let x = Bu(K, _.path),
        B = new AbortController(),
        F = In(c, _.path, B.signal),
        te = null;
      if (M.has(X)) (M.delete(X), (te = ti(u, o, F, _.path, K, x, v, r)));
      else if (Ee) p && (te = ti(u, o, F, _.path, K, x, v, r));
      else {
        let ae;
        typeof ce == 'boolean' ? (ae = ce) : xe ? (ae = !1) : (ae = p);
        let fe = { ...Oe, defaultShouldRevalidate: ae };
        ir(x, fe) && (te = ti(u, o, F, _.path, K, x, v, r, fe));
      }
      te &&
        Se.push({
          key: X,
          routeId: _.routeId,
          path: _.path,
          matches: te,
          match: x,
          request: F,
          controller: B,
        });
    }),
    { dsMatches: Pe, revalidatingFetchers: Se }
  );
}
function Nc(n) {
  return n.loader != null || (n.middleware != null && n.middleware.length > 0);
}
function Py(n, r, u) {
  if (n.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!Nc(n)) return { shouldLoad: !1, renderFallback: !1 };
  let o = r != null && n.id in r,
    c = u != null && u[n.id] !== void 0;
  if (!o && c) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == 'function' && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let f = !o && !c;
  return { shouldLoad: f, renderFallback: f };
}
function X0(n, r, u) {
  let o = !r || u.route.id !== r.route.id,
    c = !n.hasOwnProperty(u.route.id);
  return o || c;
}
function Q0(n, r) {
  let u = n.route.path;
  return (
    n.pathname !== r.pathname ||
    (u != null && u.endsWith('*') && n.params['*'] !== r.params['*'])
  );
}
function ir(n, r) {
  if (n.route.shouldRevalidate) {
    let u = n.route.shouldRevalidate(r);
    if (typeof u == 'boolean') return u;
  }
  return r.defaultShouldRevalidate;
}
function Zm(n, r, u, o, c, f) {
  let h;
  if (n) {
    let v = o[n];
    (_e(v, `No route found to patch children into: routeId = ${n}`),
      v.children || (v.children = []),
      (h = v.children));
  } else h = u.activeRoutes;
  let m = [],
    y = [];
  if (
    (r.forEach(v => {
      let b = h.find(p => ev(v, p));
      b ? y.push({ existingRoute: b, newRoute: v }) : m.push(v);
    }),
    m.length > 0)
  ) {
    let v = ur(m, c, [n || '_', 'patch', String(h?.length || '0')], o);
    h.push(...v);
  }
  if (f && y.length > 0)
    for (let v = 0; v < y.length; v++) {
      let { existingRoute: b, newRoute: p } = y[v],
        M = b,
        [z] = ur([p], c, [], {}, !0);
      Object.assign(M, {
        element: z.element ? z.element : M.element,
        errorElement: z.errorElement ? z.errorElement : M.errorElement,
        hydrateFallbackElement: z.hydrateFallbackElement
          ? z.hydrateFallbackElement
          : M.hydrateFallbackElement,
      });
    }
  u.hasHMRRoutes || u.setRoutes([...u.activeRoutes]);
}
function ev(n, r) {
  return 'id' in n && 'id' in r && n.id === r.id
    ? !0
    : n.index === r.index &&
        n.path === r.path &&
        n.caseSensitive === r.caseSensitive
      ? (!n.children || n.children.length === 0) &&
        (!r.children || r.children.length === 0)
        ? !0
        : (n.children?.every((u, o) => r.children?.some(c => ev(u, c))) ?? !1)
      : !1;
}
var Km = new WeakMap(),
  tv = ({ key: n, route: r, manifest: u, mapRouteProperties: o }) => {
    let c = u[r.id];
    if (
      (_e(c, 'No route found in manifest'),
      !c.lazy || typeof c.lazy != 'object')
    )
      return;
    let f = c.lazy[n];
    if (!f) return;
    let h = Km.get(c);
    h || ((h = {}), Km.set(c, h));
    let m = h[n];
    if (m) return m;
    let y = (async () => {
      let v = u0(n),
        p = c[n] !== void 0 && n !== 'hasErrorBoundary';
      if (v)
        (bt(
          !v,
          'Route property ' +
            n +
            ' is not a supported lazy route property. This property will be ignored.'
        ),
          (h[n] = Promise.resolve()));
      else if (p)
        bt(
          !1,
          `Route "${c.id}" has a static property "${n}" defined. The lazy property will be ignored.`
        );
      else {
        let M = await f();
        M != null && (Object.assign(c, { [n]: M }), Object.assign(c, o(c)));
      }
      typeof c.lazy == 'object' &&
        ((c.lazy[n] = void 0),
        Object.values(c.lazy).every(M => M === void 0) && (c.lazy = void 0));
    })();
    return ((h[n] = y), y);
  },
  Jm = new WeakMap();
function Z0(n, r, u, o, c) {
  let f = u[n.id];
  if ((_e(f, 'No route found in manifest'), !n.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof n.lazy == 'function') {
    let b = Jm.get(f);
    if (b) return { lazyRoutePromise: b, lazyHandlerPromise: b };
    let p = (async () => {
      _e(typeof n.lazy == 'function', 'No lazy route function found');
      let M = await n.lazy(),
        z = {};
      for (let L in M) {
        let Y = M[L];
        if (Y === void 0) continue;
        let j = s0(L),
          W = f[L] !== void 0 && L !== 'hasErrorBoundary';
        j
          ? bt(
              !j,
              'Route property ' +
                L +
                ' is not a supported property to be returned from a lazy route function. This property will be ignored.'
            )
          : W
            ? bt(
                !W,
                `Route "${f.id}" has a static property "${L}" defined but its lazy function is also returning a value for this property. The lazy route property "${L}" will be ignored.`
              )
            : (z[L] = Y);
      }
      (Object.assign(f, z), Object.assign(f, { ...o(f), lazy: void 0 }));
    })();
    return (
      Jm.set(f, p),
      p.catch(() => {}),
      { lazyRoutePromise: p, lazyHandlerPromise: p }
    );
  }
  let h = Object.keys(n.lazy),
    m = [],
    y;
  for (let b of h) {
    if (c && c.includes(b)) continue;
    let p = tv({ key: b, route: n, manifest: u, mapRouteProperties: o });
    p && (m.push(p), b === r && (y = p));
  }
  let v = m.length > 0 ? Promise.all(m).then(() => {}) : void 0;
  return (
    v?.catch(() => {}),
    y?.catch(() => {}),
    { lazyRoutePromise: v, lazyHandlerPromise: y }
  );
}
async function Fm(n) {
  let r = n.matches.filter(c => c.shouldLoad),
    u = {};
  return (
    (await Promise.all(r.map(c => c.resolve()))).forEach((c, f) => {
      u[r[f].route.id] = c;
    }),
    u
  );
}
async function K0(n) {
  return n.matches.some(r => r.route.middleware) ? lv(n, () => Fm(n)) : Fm(n);
}
function lv(n, r) {
  return J0(
    n,
    r,
    o => {
      if (ub(o)) throw o;
      return o;
    },
    ab,
    u
  );
  function u(o, c, f) {
    if (f)
      return Promise.resolve(
        Object.assign(f.value, { [c]: { type: 'error', result: o } })
      );
    {
      let { matches: h } = n,
        m = Math.min(
          Math.max(
            h.findIndex(v => v.route.id === c),
            0
          ),
          Math.max(
            h.findIndex(v => v.shouldCallHandler()),
            0
          )
        ),
        y = Da(h, h[m].route.id).route.id;
      return Promise.resolve({ [y]: { type: 'error', result: o } });
    }
  }
}
async function J0(n, r, u, o, c) {
  let { matches: f, ...h } = n,
    m = f.flatMap(v =>
      v.route.middleware ? v.route.middleware.map(b => [v.route.id, b]) : []
    );
  return await av(h, m, r, u, o, c);
}
async function av(n, r, u, o, c, f, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = r[h];
  if (!y) return await u();
  let [v, b] = y,
    p,
    M = async () => {
      if (p) throw new Error('You may only call `next()` once per middleware');
      try {
        return ((p = { value: await av(n, r, u, o, c, f, h + 1) }), p.value);
      } catch (z) {
        return ((p = { value: await f(z, v, p) }), p.value);
      }
    };
  try {
    let z = await b(n, M),
      L = z != null ? o(z) : void 0;
    return c(L)
      ? L
      : p
        ? (L ?? p.value)
        : ((p = { value: await M() }), p.value);
  } catch (z) {
    return await f(z, v, p);
  }
}
function nv(n, r, u, o, c) {
  let f = tv({
      key: 'middleware',
      route: o.route,
      manifest: r,
      mapRouteProperties: n,
    }),
    h = Z0(o.route, Ot(u.method) ? 'action' : 'loader', r, n, c);
  return {
    middleware: f,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise,
  };
}
function Rc(n, r, u, o, c, f, h, m, y, v = null, b) {
  let p = !1,
    M = nv(n, r, u, f, h);
  return {
    ...f,
    _lazyPromises: M,
    shouldLoad: y,
    shouldRevalidateArgs: v,
    shouldCallHandler(z) {
      return (
        (p = !0),
        v
          ? typeof b == 'boolean'
            ? ir(f, { ...v, defaultShouldRevalidate: b })
            : typeof z == 'boolean'
              ? ir(f, { ...v, defaultShouldRevalidate: z })
              : ir(f, v)
          : y
      );
    },
    resolve(z) {
      let { lazy: L, loader: Y, middleware: j } = f.route,
        k = p || y || (z && !Ot(u.method) && (L || Y)),
        W = j && j.length > 0 && !Y && !L;
      return k && (Ot(u.method) || !W)
        ? $0({
            request: u,
            path: o,
            pattern: c,
            match: f,
            lazyHandlerPromise: M?.handler,
            lazyRoutePromise: M?.route,
            handlerOverride: z,
            scopedContext: m,
          })
        : Promise.resolve({ type: 'data', result: void 0 });
    },
  };
}
function ti(n, r, u, o, c, f, h, m, y = null) {
  return c.map(v =>
    v.route.id !== f.route.id
      ? {
          ...v,
          shouldLoad: !1,
          shouldRevalidateArgs: y,
          shouldCallHandler: () => !1,
          _lazyPromises: nv(n, r, u, v, h),
          resolve: () => Promise.resolve({ type: 'data', result: void 0 }),
        }
      : Rc(n, r, u, o, dr(c), v, h, m, !0, y)
  );
}
async function F0(n, r, u, o, c, f, h) {
  o.some(b => b._lazyPromises?.middleware) &&
    (await Promise.all(o.map(b => b._lazyPromises?.middleware)));
  let m = {
      request: r,
      url: iv(r, u),
      pattern: dr(o),
      params: o[0].params,
      context: f,
      matches: o,
    },
    v = await n({
      ...m,
      fetcherKey: c,
      runClientMiddleware: b => {
        let p = m;
        return lv(p, () =>
          b({
            ...p,
            fetcherKey: c,
            runClientMiddleware: () => {
              throw new Error(
                'Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler'
              );
            },
          })
        );
      },
    });
  try {
    await Promise.all(
      o.flatMap(b => [b._lazyPromises?.handler, b._lazyPromises?.route])
    );
  } catch {}
  return v;
}
async function $0({
  request: n,
  path: r,
  pattern: u,
  match: o,
  lazyHandlerPromise: c,
  lazyRoutePromise: f,
  handlerOverride: h,
  scopedContext: m,
}) {
  let y,
    v,
    b = Ot(n.method),
    p = b ? 'action' : 'loader',
    M = z => {
      let L,
        Y = new Promise((W, I) => (L = I));
      ((v = () => L()), n.signal.addEventListener('abort', v));
      let j = W =>
          typeof z != 'function'
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${p}" [routeId: ${o.route.id}]`
                )
              )
            : z(
                {
                  request: n,
                  url: iv(n, r),
                  pattern: u,
                  params: o.params,
                  context: m,
                },
                ...(W !== void 0 ? [W] : [])
              ),
        k = (async () => {
          try {
            return { type: 'data', result: await (h ? h(I => j(I)) : j()) };
          } catch (W) {
            return { type: 'error', result: W };
          }
        })();
      return Promise.race([k, Y]);
    };
  try {
    let z = b ? o.route.action : o.route.loader;
    if (c || f)
      if (z) {
        let L,
          [Y] = await Promise.all([
            M(z).catch(j => {
              L = j;
            }),
            c,
            f,
          ]);
        if (L !== void 0) throw L;
        y = Y;
      } else {
        await c;
        let L = b ? o.route.action : o.route.loader;
        if (L) [y] = await Promise.all([M(L), f]);
        else if (p === 'action') {
          let Y = new URL(n.url),
            j = Y.pathname + Y.search;
          throw sl(405, { method: n.method, pathname: j, routeId: o.route.id });
        } else return { type: 'data', result: void 0 };
      }
    else if (z) y = await M(z);
    else {
      let L = new URL(n.url),
        Y = L.pathname + L.search;
      throw sl(404, { pathname: Y });
    }
  } catch (z) {
    return { type: 'error', result: z };
  } finally {
    v && n.signal.removeEventListener('abort', v);
  }
  return y;
}
async function W0(n) {
  let r = n.headers.get('Content-Type');
  return r && /\bapplication\/json\b/.test(r)
    ? n.body == null
      ? null
      : n.json()
    : n.text();
}
async function I0(n) {
  let { result: r, type: u } = n;
  if (Uc(r)) {
    let o;
    try {
      o = await W0(r);
    } catch (c) {
      return { type: 'error', error: c };
    }
    return u === 'error'
      ? {
          type: 'error',
          error: new fr(r.status, r.statusText, o),
          statusCode: r.status,
          headers: r.headers,
        }
      : { type: 'data', data: o, statusCode: r.status, headers: r.headers };
  }
  return u === 'error'
    ? ly(r)
      ? r.data instanceof Error
        ? {
            type: 'error',
            error: r.data,
            statusCode: r.init?.status,
            headers: r.init?.headers ? new Headers(r.init.headers) : void 0,
          }
        : {
            type: 'error',
            error: lb(r),
            statusCode: or(r) ? r.status : void 0,
            headers: r.init?.headers ? new Headers(r.init.headers) : void 0,
          }
      : { type: 'error', error: r, statusCode: or(r) ? r.status : void 0 }
    : ly(r)
      ? {
          type: 'data',
          data: r.data,
          statusCode: r.init?.status,
          headers: r.init?.headers ? new Headers(r.init.headers) : void 0,
        }
      : { type: 'data', data: r };
}
function P0(n, r, u, o, c) {
  let f = n.headers.get('Location');
  if (
    (_e(
      f,
      'Redirects returned/thrown from loaders/actions must have a Location header'
    ),
    !_c(f))
  ) {
    let h = o.slice(0, o.findIndex(m => m.route.id === u) + 1);
    ((f = xc(new URL(r.url), h, c, f)), n.headers.set('Location', f));
  }
  return n;
}
var $m = [
  'about:',
  'blob:',
  'chrome:',
  'chrome-untrusted:',
  'content:',
  'data:',
  'devtools:',
  'file:',
  'filesystem:',
  'javascript:',
];
function Wm(n, r, u, o) {
  if (_c(n)) {
    let c = n,
      f = c.startsWith('//') ? new URL(r.protocol + c) : new URL(c);
    if ($m.includes(f.protocol)) throw new Error('Invalid redirect location');
    let h = fl(f.pathname, u) != null;
    if (f.origin === r.origin && h) return Dc(f.pathname) + f.search + f.hash;
  }
  try {
    let c = o.createURL(n);
    if ($m.includes(c.protocol)) throw new Error('Invalid redirect location');
  } catch {}
  return n;
}
function In(n, r, u, o) {
  let c = n.createURL(rv(r)).toString(),
    f = { signal: u };
  if (o && Ot(o.formMethod)) {
    let { formMethod: h, formEncType: m } = o;
    ((f.method = h.toUpperCase()),
      m === 'application/json'
        ? ((f.headers = new Headers({ 'Content-Type': m })),
          (f.body = JSON.stringify(o.json)))
        : m === 'text/plain'
          ? (f.body = o.text)
          : m === 'application/x-www-form-urlencoded' && o.formData
            ? (f.body = wc(o.formData))
            : (f.body = o.formData));
  }
  return new Request(c, f);
}
function iv(n, r) {
  let u = new URL(n.url),
    o = typeof r == 'string' ? Dl(r) : r;
  if (((u.pathname = o.pathname || '/'), o.search)) {
    let c = new URLSearchParams(o.search),
      f = c.getAll('index');
    c.delete('index');
    for (let h of f.filter(Boolean)) c.append('index', h);
    u.search = c.size ? `?${c.toString()}` : '';
  } else u.search = '';
  return ((u.hash = o.hash || ''), u);
}
function wc(n) {
  let r = new URLSearchParams();
  for (let [u, o] of n.entries())
    r.append(u, typeof o == 'string' ? o : o.name);
  return r;
}
function Im(n) {
  let r = new FormData();
  for (let [u, o] of n.entries()) r.append(u, o);
  return r;
}
function eb(n, r, u, o = !1, c = !1) {
  let f = {},
    h = null,
    m,
    y = !1,
    v = {},
    b = u && Wt(u[1]) ? u[1].error : void 0;
  return (
    n.forEach(p => {
      if (!(p.route.id in r)) return;
      let M = p.route.id,
        z = r[M];
      if (
        (_e(!fn(z), 'Cannot handle redirect results in processLoaderData'),
        Wt(z))
      ) {
        let L = z.error;
        if ((b !== void 0 && ((L = b), (b = void 0)), (h = h || {}), c))
          h[M] = L;
        else {
          let Y = Da(n, M);
          h[Y.route.id] == null && (h[Y.route.id] = L);
        }
        (o || (f[M] = Iy),
          y || ((y = !0), (m = or(z.error) ? z.error.status : 500)),
          z.headers && (v[M] = z.headers));
      } else
        ((f[M] = z.data),
          z.statusCode && z.statusCode !== 200 && !y && (m = z.statusCode),
          z.headers && (v[M] = z.headers));
    }),
    b !== void 0 && u && ((h = { [u[0]]: b }), u[2] && (f[u[2]] = void 0)),
    { loaderData: f, errors: h, statusCode: m || 200, loaderHeaders: v }
  );
}
function Pm(n, r, u, o, c, f) {
  let { loaderData: h, errors: m } = eb(r, u, o);
  return (
    c
      .filter(y => !y.matches || y.matches.some(v => v.shouldLoad))
      .forEach(y => {
        let { key: v, match: b, controller: p } = y;
        if (p && p.signal.aborted) return;
        let M = f[v];
        if ((_e(M, 'Did not find corresponding fetcher result'), Wt(M))) {
          let z = Da(n.matches, b?.route.id);
          ((m && m[z.route.id]) || (m = { ...m, [z.route.id]: M.error }),
            n.fetchers.delete(v));
        } else if (fn(M)) _e(!1, 'Unhandled fetcher revalidation redirect');
        else {
          let z = la(M.data);
          n.fetchers.set(v, z);
        }
      }),
    { loaderData: h, errors: m }
  );
}
function ey(n, r, u, o) {
  let c = Object.entries(r)
    .filter(([, f]) => f !== Iy)
    .reduce((f, [h, m]) => ((f[h] = m), f), {});
  for (let f of u) {
    let h = f.route.id;
    if (
      (!r.hasOwnProperty(h) &&
        n.hasOwnProperty(h) &&
        f.route.loader &&
        (c[h] = n[h]),
      o && o.hasOwnProperty(h))
    )
      break;
  }
  return c;
}
function ty(n) {
  return n
    ? Wt(n[1])
      ? { actionData: {} }
      : { actionData: { [n[0]]: n[1].data } }
    : {};
}
function Da(n, r) {
  return (
    (r ? n.slice(0, n.findIndex(o => o.route.id === r) + 1) : [...n])
      .reverse()
      .find(o => o.route.hasErrorBoundary === !0) || n[0]
  );
}
function Du(n) {
  let r =
    n.length === 1
      ? n[0]
      : n.find(u => u.index || !u.path || u.path === '/') || {
          id: '__shim-error-route__',
        };
  return {
    matches: [{ params: {}, pathname: '', pathnameBase: '', route: r }],
    route: r,
  };
}
function sl(
  n,
  { pathname: r, routeId: u, method: o, type: c, message: f } = {}
) {
  let h = 'Unknown Server Error',
    m = 'Unknown @remix-run/router error';
  return (
    n === 400
      ? ((h = 'Bad Request'),
        o && r && u
          ? (m = `You made a ${o} request to "${r}" but did not provide a \`loader\` for route "${u}", so there is no way to handle the request.`)
          : c === 'invalid-body' && (m = 'Unable to encode submission body'))
      : n === 403
        ? ((h = 'Forbidden'), (m = `Route "${u}" does not match URL "${r}"`))
        : n === 404
          ? ((h = 'Not Found'), (m = `No route matches URL "${r}"`))
          : n === 405 &&
            ((h = 'Method Not Allowed'),
            o && r && u
              ? (m = `You made a ${o.toUpperCase()} request to "${r}" but did not provide an \`action\` for route "${u}", so there is no way to handle the request.`)
              : o && (m = `Invalid request method "${o.toUpperCase()}"`)),
    new fr(n || 500, h, new Error(m), !0)
  );
}
function Nu(n) {
  let r = Object.entries(n);
  for (let u = r.length - 1; u >= 0; u--) {
    let [o, c] = r[u];
    if (fn(c)) return { key: o, result: c };
  }
}
function rv(n) {
  let r = typeof n == 'string' ? Dl(n) : n;
  return _l({ ...r, hash: '' });
}
function tb(n, r) {
  return n.pathname !== r.pathname || n.search !== r.search
    ? !1
    : n.hash === ''
      ? r.hash !== ''
      : n.hash === r.hash
        ? !0
        : r.hash !== '';
}
function lb(n) {
  return new fr(
    n.init?.status ?? 500,
    n.init?.statusText ?? 'Internal Server Error',
    n.data
  );
}
function ab(n) {
  return (
    n != null &&
    typeof n == 'object' &&
    Object.entries(n).every(([r, u]) => typeof r == 'string' && nb(u))
  );
}
function nb(n) {
  return (
    n != null &&
    typeof n == 'object' &&
    'type' in n &&
    'result' in n &&
    (n.type === 'data' || n.type === 'error')
  );
}
function ib(n) {
  return Uc(n.result) && $y.has(n.result.status);
}
function Wt(n) {
  return n.type === 'error';
}
function fn(n) {
  return (n && n.type) === 'redirect';
}
function ly(n) {
  return (
    typeof n == 'object' &&
    n != null &&
    'type' in n &&
    'data' in n &&
    'init' in n &&
    n.type === 'DataWithResponseInit'
  );
}
function Uc(n) {
  return (
    n != null &&
    typeof n.status == 'number' &&
    typeof n.statusText == 'string' &&
    typeof n.headers == 'object' &&
    typeof n.body < 'u'
  );
}
function rb(n) {
  return $y.has(n);
}
function ub(n) {
  return Uc(n) && rb(n.status) && n.headers.has('Location');
}
function ob(n) {
  return H0.has(n.toUpperCase());
}
function Ot(n) {
  return L0.has(n.toUpperCase());
}
function Lc(n) {
  return new URLSearchParams(n).getAll('index').some(r => r === '');
}
function Bu(n, r) {
  let u = typeof r == 'string' ? Dl(r).search : r.search;
  if (n[n.length - 1].route.index && Lc(u || '')) return n[n.length - 1];
  let o = Qy(n);
  return o[o.length - 1];
}
function ay(n) {
  let {
    formMethod: r,
    formAction: u,
    formEncType: o,
    text: c,
    formData: f,
    json: h,
  } = n;
  if (!(!r || !u || !o)) {
    if (c != null)
      return {
        formMethod: r,
        formAction: u,
        formEncType: o,
        formData: void 0,
        json: void 0,
        text: c,
      };
    if (f != null)
      return {
        formMethod: r,
        formAction: u,
        formEncType: o,
        formData: f,
        json: void 0,
        text: void 0,
      };
    if (h !== void 0)
      return {
        formMethod: r,
        formAction: u,
        formEncType: o,
        formData: void 0,
        json: h,
        text: void 0,
      };
  }
}
function fc(n, r) {
  return r
    ? {
        state: 'loading',
        location: n,
        formMethod: r.formMethod,
        formAction: r.formAction,
        formEncType: r.formEncType,
        formData: r.formData,
        json: r.json,
        text: r.text,
      }
    : {
        state: 'loading',
        location: n,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function sb(n, r) {
  return {
    state: 'submitting',
    location: n,
    formMethod: r.formMethod,
    formAction: r.formAction,
    formEncType: r.formEncType,
    formData: r.formData,
    json: r.json,
    text: r.text,
  };
}
function Ii(n, r) {
  return n
    ? {
        state: 'loading',
        formMethod: n.formMethod,
        formAction: n.formAction,
        formEncType: n.formEncType,
        formData: n.formData,
        json: n.json,
        text: n.text,
        data: r,
      }
    : {
        state: 'loading',
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: r,
      };
}
function cb(n, r) {
  return {
    state: 'submitting',
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
    data: r ? r.data : void 0,
  };
}
function la(n) {
  return {
    state: 'idle',
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: n,
  };
}
function fb(n, r) {
  try {
    let u = n.sessionStorage.getItem(Wy);
    if (u) {
      let o = JSON.parse(u);
      for (let [c, f] of Object.entries(o || {}))
        f && Array.isArray(f) && r.set(c, new Set(f || []));
    }
  } catch {}
}
function db(n, r) {
  if (r.size > 0) {
    let u = {};
    for (let [o, c] of r) u[o] = [...c];
    try {
      n.sessionStorage.setItem(Wy, JSON.stringify(u));
    } catch (o) {
      bt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${o}).`
      );
    }
  }
}
function ny() {
  let n,
    r,
    u = new Promise((o, c) => {
      ((n = async f => {
        o(f);
        try {
          await u;
        } catch {}
      }),
        (r = async f => {
          c(f);
          try {
            await u;
          } catch {}
        }));
    });
  return { promise: u, resolve: n, reject: r };
}
var dn = w.createContext(null);
dn.displayName = 'DataRouter';
var hr = w.createContext(null);
hr.displayName = 'DataRouterState';
var uv = w.createContext(!1);
function ov() {
  return w.useContext(uv);
}
var jc = w.createContext({ isTransitioning: !1 });
jc.displayName = 'ViewTransition';
var sv = w.createContext(new Map());
sv.displayName = 'Fetchers';
var hb = w.createContext(null);
hb.displayName = 'Await';
var dl = w.createContext(null);
dl.displayName = 'Navigation';
var Zu = w.createContext(null);
Zu.displayName = 'Location';
var Nl = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Nl.displayName = 'Route';
var Hc = w.createContext(null);
Hc.displayName = 'RouteError';
var cv = 'REACT_ROUTER_ERROR',
  mb = 'REDIRECT',
  yb = 'ROUTE_ERROR_RESPONSE';
function vb(n) {
  if (n.startsWith(`${cv}:${mb}:{`))
    try {
      let r = JSON.parse(n.slice(28));
      if (
        typeof r == 'object' &&
        r &&
        typeof r.status == 'number' &&
        typeof r.statusText == 'string' &&
        typeof r.location == 'string' &&
        typeof r.reloadDocument == 'boolean' &&
        typeof r.replace == 'boolean'
      )
        return r;
    } catch {}
}
function gb(n) {
  if (n.startsWith(`${cv}:${yb}:{`))
    try {
      let r = JSON.parse(n.slice(40));
      if (
        typeof r == 'object' &&
        r &&
        typeof r.status == 'number' &&
        typeof r.statusText == 'string'
      )
        return new fr(r.status, r.statusText, r.data);
    } catch {}
}
function pb(n, { relative: r } = {}) {
  _e(
    mr(),
    'useHref() may be used only in the context of a <Router> component.'
  );
  let { basename: u, navigator: o } = w.useContext(dl),
    { hash: c, pathname: f, search: h } = yr(n, { relative: r }),
    m = f;
  return (
    u !== '/' && (m = f === '/' ? u : cl([u, f])),
    o.createHref({ pathname: m, search: h, hash: c })
  );
}
function mr() {
  return w.useContext(Zu) != null;
}
function Ul() {
  return (
    _e(
      mr(),
      'useLocation() may be used only in the context of a <Router> component.'
    ),
    w.useContext(Zu).location
  );
}
var fv =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function dv(n) {
  w.useContext(dl).static || w.useLayoutEffect(n);
}
function bb() {
  let { isDataRoute: n } = w.useContext(Nl);
  return n ? Ub() : Sb();
}
function Sb() {
  _e(
    mr(),
    'useNavigate() may be used only in the context of a <Router> component.'
  );
  let n = w.useContext(dn),
    { basename: r, navigator: u } = w.useContext(dl),
    { matches: o } = w.useContext(Nl),
    { pathname: c } = Ul(),
    f = JSON.stringify(Oc(o)),
    h = w.useRef(!1);
  return (
    dv(() => {
      h.current = !0;
    }),
    w.useCallback(
      (y, v = {}) => {
        if ((bt(h.current, fv), !h.current)) return;
        if (typeof y == 'number') {
          u.go(y);
          return;
        }
        let b = Qu(y, JSON.parse(f), c, v.relative === 'path');
        (n == null &&
          r !== '/' &&
          (b.pathname = b.pathname === '/' ? r : cl([r, b.pathname])),
          (v.replace ? u.replace : u.push)(b, v.state, v));
      },
      [r, u, f, c, n]
    )
  );
}
var Eb = w.createContext(null);
function xb(n) {
  let r = w.useContext(Nl).outlet;
  return w.useMemo(
    () => r && w.createElement(Eb.Provider, { value: n }, r),
    [r, n]
  );
}
function yr(n, { relative: r } = {}) {
  let { matches: u } = w.useContext(Nl),
    { pathname: o } = Ul(),
    c = JSON.stringify(Oc(u));
  return w.useMemo(() => Qu(n, JSON.parse(c), o, r === 'path'), [n, c, o, r]);
}
function Rb(n, r, u) {
  _e(
    mr(),
    'useRoutes() may be used only in the context of a <Router> component.'
  );
  let { navigator: o } = w.useContext(dl),
    { matches: c } = w.useContext(Nl),
    f = c[c.length - 1],
    h = f ? f.params : {},
    m = f ? f.pathname : '/',
    y = f ? f.pathnameBase : '/',
    v = f && f.route;
  {
    let j = (v && v.path) || '';
    mv(
      m,
      !v || j.endsWith('*') || j.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${j}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${j}"> to <Route path="${j === '/' ? '*' : `${j}/*`}">.`
    );
  }
  let b = Ul(),
    p;
  p = b;
  let M = p.pathname || '/',
    z = M;
  if (y !== '/') {
    let j = y.replace(/^\//, '').split('/');
    z = '/' + M.replace(/^\//, '').split('/').slice(j.length).join('/');
  }
  let L =
    u && u.state.matches.length
      ? u.state.matches.map(j =>
          Object.assign(j, { route: u.manifest[j.route.id] || j.route })
        )
      : Gy(n, { pathname: z });
  return (
    bt(
      v || L != null,
      `No routes matched location "${p.pathname}${p.search}${p.hash}" `
    ),
    bt(
      L == null ||
        L[L.length - 1].route.element !== void 0 ||
        L[L.length - 1].route.Component !== void 0 ||
        L[L.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ),
    Ab(
      L &&
        L.map(j =>
          Object.assign({}, j, {
            params: Object.assign({}, h, j.params),
            pathname: cl([
              y,
              o.encodeLocation
                ? o.encodeLocation(
                    j.pathname
                      .replace(/%/g, '%25')
                      .replace(/\?/g, '%3F')
                      .replace(/#/g, '%23')
                  ).pathname
                : j.pathname,
            ]),
            pathnameBase:
              j.pathnameBase === '/'
                ? y
                : cl([
                    y,
                    o.encodeLocation
                      ? o.encodeLocation(
                          j.pathnameBase
                            .replace(/%/g, '%25')
                            .replace(/\?/g, '%3F')
                            .replace(/#/g, '%23')
                        ).pathname
                      : j.pathnameBase,
                  ]),
          })
        ),
      c,
      u
    )
  );
}
function wb() {
  let n = Nb(),
    r = or(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    u = n instanceof Error ? n.stack : null,
    o = 'rgba(200,200,200, 0.5)',
    c = { padding: '0.5rem', backgroundColor: o },
    f = { padding: '2px 4px', backgroundColor: o },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', n),
    (h = w.createElement(
      w.Fragment,
      null,
      w.createElement('p', null, '💿 Hey developer 👋'),
      w.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        w.createElement('code', { style: f }, 'ErrorBoundary'),
        ' or',
        ' ',
        w.createElement('code', { style: f }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement('h2', null, 'Unexpected Application Error!'),
      w.createElement('h3', { style: { fontStyle: 'italic' } }, r),
      u ? w.createElement('pre', { style: c }, u) : null,
      h
    )
  );
}
var zb = w.createElement(wb, null),
  hv = class extends w.Component {
    constructor(n) {
      (super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, r) {
      return r.location !== n.location ||
        (r.revalidation !== 'idle' && n.revalidation === 'idle')
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : r.error,
            location: r.location,
            revalidation: n.revalidation || r.revalidation,
          };
    }
    componentDidCatch(n, r) {
      this.props.onError
        ? this.props.onError(n, r)
        : console.error(
            'React Router caught the following error during render',
            n
          );
    }
    render() {
      let n = this.state.error;
      if (
        this.context &&
        typeof n == 'object' &&
        n &&
        'digest' in n &&
        typeof n.digest == 'string'
      ) {
        const u = gb(n.digest);
        u && (n = u);
      }
      let r =
        n !== void 0
          ? w.createElement(
              Nl.Provider,
              { value: this.props.routeContext },
              w.createElement(Hc.Provider, {
                value: n,
                children: this.props.component,
              })
            )
          : this.props.children;
      return this.context ? w.createElement(Tb, { error: n }, r) : r;
    }
  };
hv.contextType = uv;
var dc = new WeakMap();
function Tb({ children: n, error: r }) {
  let { basename: u } = w.useContext(dl);
  if (
    typeof r == 'object' &&
    r &&
    'digest' in r &&
    typeof r.digest == 'string'
  ) {
    let o = vb(r.digest);
    if (o) {
      let c = dc.get(r);
      if (c) throw c;
      let f = Ky(o.location, u);
      if (Zy && !dc.get(r))
        if (f.isExternal || o.reloadDocument)
          window.location.href = f.absoluteURL || f.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, {
              replace: o.replace,
            })
          );
          throw (dc.set(r, h), h);
        }
      return w.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${f.absoluteURL || f.to}`,
      });
    }
  }
  return n;
}
function Mb({ routeContext: n, match: r, children: u }) {
  let o = w.useContext(dn);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = r.route.id),
    w.createElement(Nl.Provider, { value: n }, u)
  );
}
function Ab(n, r = [], u) {
  let o = u?.state;
  if (n == null) {
    if (!o) return null;
    if (o.errors) n = o.matches;
    else if (r.length === 0 && !o.initialized && o.matches.length > 0)
      n = o.matches;
    else return null;
  }
  let c = n,
    f = o?.errors;
  if (f != null) {
    let b = c.findIndex(p => p.route.id && f?.[p.route.id] !== void 0);
    (_e(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(',')}`
    ),
      (c = c.slice(0, Math.min(c.length, b + 1))));
  }
  let h = !1,
    m = -1;
  if (u && o) {
    h = o.renderFallback;
    for (let b = 0; b < c.length; b++) {
      let p = c[b];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (m = b),
        p.route.id)
      ) {
        let { loaderData: M, errors: z } = o,
          L =
            p.route.loader &&
            !M.hasOwnProperty(p.route.id) &&
            (!z || z[p.route.id] === void 0);
        if (p.route.lazy || L) {
          (u.isStatic && (h = !0),
            m >= 0 ? (c = c.slice(0, m + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let y = u?.onError,
    v =
      o && y
        ? (b, p) => {
            y(b, {
              location: o.location,
              params: o.matches?.[0]?.params ?? {},
              pattern: dr(o.matches),
              errorInfo: p,
            });
          }
        : void 0;
  return c.reduceRight((b, p, M) => {
    let z,
      L = !1,
      Y = null,
      j = null;
    o &&
      ((z = f && p.route.id ? f[p.route.id] : void 0),
      (Y = p.route.errorElement || zb),
      h &&
        (m < 0 && M === 0
          ? (mv(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (L = !0),
            (j = null))
          : m === M &&
            ((L = !0), (j = p.route.hydrateFallbackElement || null))));
    let k = r.concat(c.slice(0, M + 1)),
      W = () => {
        let I;
        return (
          z
            ? (I = Y)
            : L
              ? (I = j)
              : p.route.Component
                ? (I = w.createElement(p.route.Component, null))
                : p.route.element
                  ? (I = p.route.element)
                  : (I = b),
          w.createElement(Mb, {
            match: p,
            routeContext: { outlet: b, matches: k, isDataRoute: o != null },
            children: I,
          })
        );
      };
    return o && (p.route.ErrorBoundary || p.route.errorElement || M === 0)
      ? w.createElement(hv, {
          location: o.location,
          revalidation: o.revalidation,
          component: Y,
          error: z,
          children: W(),
          routeContext: { outlet: null, matches: k, isDataRoute: !0 },
          onError: v,
        })
      : W();
  }, null);
}
function Bc(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Cb(n) {
  let r = w.useContext(dn);
  return (_e(r, Bc(n)), r);
}
function _b(n) {
  let r = w.useContext(hr);
  return (_e(r, Bc(n)), r);
}
function Ob(n) {
  let r = w.useContext(Nl);
  return (_e(r, Bc(n)), r);
}
function qc(n) {
  let r = Ob(n),
    u = r.matches[r.matches.length - 1];
  return (
    _e(
      u.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    u.route.id
  );
}
function Db() {
  return qc('useRouteId');
}
function Nb() {
  let n = w.useContext(Hc),
    r = _b('useRouteError'),
    u = qc('useRouteError');
  return n !== void 0 ? n : r.errors?.[u];
}
function Ub() {
  let { router: n } = Cb('useNavigate'),
    r = qc('useNavigate'),
    u = w.useRef(!1);
  return (
    dv(() => {
      u.current = !0;
    }),
    w.useCallback(
      async (c, f = {}) => {
        (bt(u.current, fv),
          u.current &&
            (typeof c == 'number'
              ? await n.navigate(c)
              : await n.navigate(c, { fromRouteId: r, ...f })));
      },
      [n, r]
    )
  );
}
var iy = {};
function mv(n, r, u) {
  !r && !iy[n] && ((iy[n] = !0), bt(!1, u));
}
var ry = {};
function uy(n, r) {
  !n && !ry[r] && ((ry[r] = !0), console.warn(r));
}
var Lb = 'useOptimistic',
  oy = l0[Lb],
  jb = () => {};
function Hb(n) {
  return oy ? oy(n) : [n, jb];
}
function Bb(n) {
  let r = {
    hasErrorBoundary:
      n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null,
  };
  return (
    n.Component &&
      (n.element &&
        bt(
          !1,
          'You should not include both `Component` and `element` on your route - `Component` will be used.'
        ),
      Object.assign(r, {
        element: w.createElement(n.Component),
        Component: void 0,
      })),
    n.HydrateFallback &&
      (n.hydrateFallbackElement &&
        bt(
          !1,
          'You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.'
        ),
      Object.assign(r, {
        hydrateFallbackElement: w.createElement(n.HydrateFallback),
        HydrateFallback: void 0,
      })),
    n.ErrorBoundary &&
      (n.errorElement &&
        bt(
          !1,
          'You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.'
        ),
      Object.assign(r, {
        errorElement: w.createElement(n.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    r
  );
}
var qb = ['HydrateFallback', 'hydrateFallbackElement'],
  Yb = class {
    constructor() {
      ((this.status = 'pending'),
        (this.promise = new Promise((n, r) => {
          ((this.resolve = u => {
            this.status === 'pending' && ((this.status = 'resolved'), n(u));
          }),
            (this.reject = u => {
              this.status === 'pending' && ((this.status = 'rejected'), r(u));
            }));
        })));
    }
  };
function Gb({ router: n, flushSync: r, onError: u, useTransitions: o }) {
  o = ov() || o;
  let [f, h] = w.useState(n.state),
    [m, y] = Hb(f),
    [v, b] = w.useState(),
    [p, M] = w.useState({ isTransitioning: !1 }),
    [z, L] = w.useState(),
    [Y, j] = w.useState(),
    [k, W] = w.useState(),
    I = w.useRef(new Map()),
    J = w.useCallback(
      (
        re,
        {
          deletedFetchers: ke,
          newErrors: xe,
          flushSync: Oe,
          viewTransitionOpts: Ye,
        }
      ) => {
        (xe &&
          u &&
          Object.values(xe).forEach(Se =>
            u(Se, {
              location: re.location,
              params: re.matches[0]?.params ?? {},
              pattern: dr(re.matches),
            })
          ),
          re.fetchers.forEach((Se, _) => {
            Se.data !== void 0 && I.current.set(_, Se.data);
          }),
          ke.forEach(Se => I.current.delete(Se)),
          uy(
            Oe === !1 || r != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let Pe =
          n.window != null &&
          n.window.document != null &&
          typeof n.window.document.startViewTransition == 'function';
        if (
          (uy(
            Ye == null || Pe,
            'You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.'
          ),
          !Ye || !Pe)
        ) {
          r && Oe
            ? r(() => h(re))
            : o === !1
              ? h(re)
              : w.startTransition(() => {
                  (o === !0 && y(Se => sy(Se, re)), h(re));
                });
          return;
        }
        if (r && Oe) {
          r(() => {
            (Y && (z?.resolve(), Y.skipTransition()),
              M({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: Ye.currentLocation,
                nextLocation: Ye.nextLocation,
              }));
          });
          let Se = n.window.document.startViewTransition(() => {
            r(() => h(re));
          });
          (Se.finished.finally(() => {
            r(() => {
              (L(void 0), j(void 0), b(void 0), M({ isTransitioning: !1 }));
            });
          }),
            r(() => j(Se)));
          return;
        }
        Y
          ? (z?.resolve(),
            Y.skipTransition(),
            W({
              state: re,
              currentLocation: Ye.currentLocation,
              nextLocation: Ye.nextLocation,
            }))
          : (b(re),
            M({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: Ye.currentLocation,
              nextLocation: Ye.nextLocation,
            }));
      },
      [n.window, r, Y, z, o, y, u]
    );
  w.useLayoutEffect(() => n.subscribe(J), [n, J]);
  let ce = m.initialized;
  (w.useLayoutEffect(() => {
    !ce &&
      n.state.initialized &&
      J(n.state, { deletedFetchers: [], flushSync: !1, newErrors: null });
  }, [ce, J, n.state]),
    w.useEffect(() => {
      p.isTransitioning && !p.flushSync && L(new Yb());
    }, [p]),
    w.useEffect(() => {
      if (z && v && n.window) {
        let re = v,
          ke = z.promise,
          xe = n.window.document.startViewTransition(async () => {
            (o === !1
              ? h(re)
              : w.startTransition(() => {
                  (o === !0 && y(Oe => sy(Oe, re)), h(re));
                }),
              await ke);
          });
        (xe.finished.finally(() => {
          (L(void 0), j(void 0), b(void 0), M({ isTransitioning: !1 }));
        }),
          j(xe));
      }
    }, [v, z, n.window, o, y]),
    w.useEffect(() => {
      z && v && m.location.key === v.location.key && z.resolve();
    }, [z, Y, m.location, v]),
    w.useEffect(() => {
      !p.isTransitioning &&
        k &&
        (b(k.state),
        M({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: k.currentLocation,
          nextLocation: k.nextLocation,
        }),
        W(void 0));
    }, [p.isTransitioning, k]));
  let le = w.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: re => n.navigate(re),
        push: (re, ke, xe) =>
          n.navigate(re, {
            state: ke,
            preventScrollReset: xe?.preventScrollReset,
          }),
        replace: (re, ke, xe) =>
          n.navigate(re, {
            replace: !0,
            state: ke,
            preventScrollReset: xe?.preventScrollReset,
          }),
      }),
      [n]
    ),
    T = n.basename || '/',
    Q = w.useMemo(
      () => ({ router: n, navigator: le, static: !1, basename: T, onError: u }),
      [n, le, T, u]
    );
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(
      dn.Provider,
      { value: Q },
      w.createElement(
        hr.Provider,
        { value: m },
        w.createElement(
          sv.Provider,
          { value: I.current },
          w.createElement(
            jc.Provider,
            { value: p },
            w.createElement(
              Qb,
              {
                basename: T,
                location: m.location,
                navigationType: m.historyAction,
                navigator: le,
                useTransitions: o,
              },
              w.createElement(Vb, {
                routes: n.routes,
                manifest: n.manifest,
                future: n.future,
                state: m,
                isStatic: !1,
                onError: u,
              })
            )
          )
        )
      )
    ),
    null
  );
}
function sy(n, r) {
  return {
    ...n,
    navigation: r.navigation.state !== 'idle' ? r.navigation : n.navigation,
    revalidation: r.revalidation !== 'idle' ? r.revalidation : n.revalidation,
    actionData:
      r.navigation.state !== 'submitting' ? r.actionData : n.actionData,
    fetchers: r.fetchers,
  };
}
var Vb = w.memo(kb);
function kb({
  routes: n,
  manifest: r,
  future: u,
  state: o,
  isStatic: c,
  onError: f,
}) {
  return Rb(n, void 0, { manifest: r, state: o, isStatic: c, onError: f });
}
function Xb(n) {
  return xb(n.context);
}
function Qb({
  basename: n = '/',
  children: r = null,
  location: u,
  navigationType: o = 'POP',
  navigator: c,
  static: f = !1,
  useTransitions: h,
}) {
  _e(
    !mr(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let m = n.replace(/^\/*/, '/'),
    y = w.useMemo(
      () => ({
        basename: m,
        navigator: c,
        static: f,
        useTransitions: h,
        future: {},
      }),
      [m, c, f, h]
    );
  typeof u == 'string' && (u = Dl(u));
  let {
      pathname: v = '/',
      search: b = '',
      hash: p = '',
      state: M = null,
      key: z = 'default',
      mask: L,
    } = u,
    Y = w.useMemo(() => {
      let j = fl(v, m);
      return j == null
        ? null
        : {
            location: {
              pathname: j,
              search: b,
              hash: p,
              state: M,
              key: z,
              mask: L,
            },
            navigationType: o,
          };
    }, [m, v, b, p, M, z, o, L]);
  return (
    bt(
      Y != null,
      `<Router basename="${m}"> is not able to match the URL "${v}${b}${p}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    Y == null
      ? null
      : w.createElement(
          dl.Provider,
          { value: y },
          w.createElement(Zu.Provider, { children: r, value: Y })
        )
  );
}
var qu = 'get',
  Yu = 'application/x-www-form-urlencoded';
function Ku(n) {
  return typeof HTMLElement < 'u' && n instanceof HTMLElement;
}
function Zb(n) {
  return Ku(n) && n.tagName.toLowerCase() === 'button';
}
function Kb(n) {
  return Ku(n) && n.tagName.toLowerCase() === 'form';
}
function Jb(n) {
  return Ku(n) && n.tagName.toLowerCase() === 'input';
}
function Fb(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function $b(n, r) {
  return n.button === 0 && (!r || r === '_self') && !Fb(n);
}
var Uu = null;
function Wb() {
  if (Uu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Uu = !1));
    } catch {
      Uu = !0;
    }
  return Uu;
}
var Ib = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);
function hc(n) {
  return n != null && !Ib.has(n)
    ? (bt(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Yu}"`
      ),
      null)
    : n;
}
function Pb(n, r) {
  let u, o, c, f, h;
  if (Kb(n)) {
    let m = n.getAttribute('action');
    ((o = m ? fl(m, r) : null),
      (u = n.getAttribute('method') || qu),
      (c = hc(n.getAttribute('enctype')) || Yu),
      (f = new FormData(n)));
  } else if (Zb(n) || (Jb(n) && (n.type === 'submit' || n.type === 'image'))) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = n.getAttribute('formaction') || m.getAttribute('action');
    if (
      ((o = y ? fl(y, r) : null),
      (u = n.getAttribute('formmethod') || m.getAttribute('method') || qu),
      (c =
        hc(n.getAttribute('formenctype')) ||
        hc(m.getAttribute('enctype')) ||
        Yu),
      (f = new FormData(m, n)),
      !Wb())
    ) {
      let { name: v, type: b, value: p } = n;
      if (b === 'image') {
        let M = v ? `${v}.` : '';
        (f.append(`${M}x`, '0'), f.append(`${M}y`, '0'));
      } else v && f.append(v, p);
    }
  } else {
    if (Ku(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((u = qu), (o = null), (c = Yu), (h = n));
  }
  return (
    f && c === 'text/plain' && ((h = f), (f = void 0)),
    { action: o, method: u.toLowerCase(), encType: c, formData: f, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Yc(n, r) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(r);
}
function yv(n, r, u, o) {
  let c =
    typeof n == 'string'
      ? new URL(
          n,
          typeof window > 'u' ? 'server://singlefetch/' : window.location.origin
        )
      : n;
  return (
    u
      ? c.pathname.endsWith('/')
        ? (c.pathname = `${c.pathname}_.${o}`)
        : (c.pathname = `${c.pathname}.${o}`)
      : c.pathname === '/'
        ? (c.pathname = `_root.${o}`)
        : r && fl(c.pathname, r) === '/'
          ? (c.pathname = `${Vu(r)}/_root.${o}`)
          : (c.pathname = `${Vu(c.pathname)}.${o}`),
    c
  );
}
async function eS(n, r) {
  if (n.id in r) return r[n.id];
  try {
    let u = await import(n.module);
    return ((r[n.id] = u), u);
  } catch (u) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(u),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function tS(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === 'preload' &&
        typeof n.imageSrcSet == 'string' &&
        typeof n.imageSizes == 'string'
      : typeof n.rel == 'string' && typeof n.href == 'string';
}
async function lS(n, r, u) {
  let o = await Promise.all(
    n.map(async c => {
      let f = r.routes[c.route.id];
      if (f) {
        let h = await eS(f, u);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return rS(
    o
      .flat(1)
      .filter(tS)
      .filter(c => c.rel === 'stylesheet' || c.rel === 'preload')
      .map(c =>
        c.rel === 'stylesheet'
          ? { ...c, rel: 'prefetch', as: 'style' }
          : { ...c, rel: 'prefetch' }
      )
  );
}
function cy(n, r, u, o, c, f) {
  let h = (y, v) => (u[v] ? y.route.id !== u[v].route.id : !0),
    m = (y, v) =>
      u[v].pathname !== y.pathname ||
      (u[v].route.path?.endsWith('*') && u[v].params['*'] !== y.params['*']);
  return f === 'assets'
    ? r.filter((y, v) => h(y, v) || m(y, v))
    : f === 'data'
      ? r.filter((y, v) => {
          let b = o.routes[y.route.id];
          if (!b || !b.hasLoader) return !1;
          if (h(y, v) || m(y, v)) return !0;
          if (y.route.shouldRevalidate) {
            let p = y.route.shouldRevalidate({
              currentUrl: new URL(
                c.pathname + c.search + c.hash,
                window.origin
              ),
              currentParams: u[0]?.params || {},
              nextUrl: new URL(n, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof p == 'boolean') return p;
          }
          return !0;
        })
      : [];
}
function aS(n, r, { includeHydrateFallback: u } = {}) {
  return nS(
    n
      .map(o => {
        let c = r.routes[o.route.id];
        if (!c) return [];
        let f = [c.module];
        return (
          c.clientActionModule && (f = f.concat(c.clientActionModule)),
          c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
          u &&
            c.hydrateFallbackModule &&
            (f = f.concat(c.hydrateFallbackModule)),
          c.imports && (f = f.concat(c.imports)),
          f
        );
      })
      .flat(1)
  );
}
function nS(n) {
  return [...new Set(n)];
}
function iS(n) {
  let r = {},
    u = Object.keys(n).sort();
  for (let o of u) r[o] = n[o];
  return r;
}
function rS(n, r) {
  let u = new Set();
  return (
    new Set(r),
    n.reduce((o, c) => {
      let f = JSON.stringify(iS(c));
      return (u.has(f) || (u.add(f), o.push({ key: f, link: c })), o);
    }, [])
  );
}
function Gc() {
  let n = w.useContext(dn);
  return (
    Yc(
      n,
      'You must render this element inside a <DataRouterContext.Provider> element'
    ),
    n
  );
}
function uS() {
  let n = w.useContext(hr);
  return (
    Yc(
      n,
      'You must render this element inside a <DataRouterStateContext.Provider> element'
    ),
    n
  );
}
var Vc = w.createContext(void 0);
Vc.displayName = 'FrameworkContext';
function kc() {
  let n = w.useContext(Vc);
  return (
    Yc(n, 'You must render this element inside a <HydratedRouter> element'),
    n
  );
}
function oS(n, r) {
  let u = w.useContext(Vc),
    [o, c] = w.useState(!1),
    [f, h] = w.useState(!1),
    {
      onFocus: m,
      onBlur: y,
      onMouseEnter: v,
      onMouseLeave: b,
      onTouchStart: p,
    } = r,
    M = w.useRef(null);
  (w.useEffect(() => {
    if ((n === 'render' && h(!0), n === 'viewport')) {
      let Y = k => {
          k.forEach(W => {
            h(W.isIntersecting);
          });
        },
        j = new IntersectionObserver(Y, { threshold: 0.5 });
      return (
        M.current && j.observe(M.current),
        () => {
          j.disconnect();
        }
      );
    }
  }, [n]),
    w.useEffect(() => {
      if (o) {
        let Y = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(Y);
        };
      }
    }, [o]));
  let z = () => {
      c(!0);
    },
    L = () => {
      (c(!1), h(!1));
    };
  return u
    ? n !== 'intent'
      ? [f, M, {}]
      : [
          f,
          M,
          {
            onFocus: Pi(m, z),
            onBlur: Pi(y, L),
            onMouseEnter: Pi(v, z),
            onMouseLeave: Pi(b, L),
            onTouchStart: Pi(p, z),
          },
        ]
    : [!1, M, {}];
}
function Pi(n, r) {
  return u => {
    (n && n(u), u.defaultPrevented || r(u));
  };
}
function sS({ page: n, ...r }) {
  let u = ov(),
    { router: o } = Gc(),
    c = w.useMemo(() => Gy(o.routes, n, o.basename), [o.routes, n, o.basename]);
  return c
    ? u
      ? w.createElement(fS, { page: n, matches: c, ...r })
      : w.createElement(dS, { page: n, matches: c, ...r })
    : null;
}
function cS(n) {
  let { manifest: r, routeModules: u } = kc(),
    [o, c] = w.useState([]);
  return (
    w.useEffect(() => {
      let f = !1;
      return (
        lS(n, r, u).then(h => {
          f || c(h);
        }),
        () => {
          f = !0;
        }
      );
    }, [n, r, u]),
    o
  );
}
function fS({ page: n, matches: r, ...u }) {
  let o = Ul(),
    { future: c } = kc(),
    { basename: f } = Gc(),
    h = w.useMemo(() => {
      if (n === o.pathname + o.search + o.hash) return [];
      let m = yv(n, f, c.unstable_trailingSlashAwareDataRequests, 'rsc'),
        y = !1,
        v = [];
      for (let b of r)
        typeof b.route.shouldRevalidate == 'function'
          ? (y = !0)
          : v.push(b.route.id);
      return (
        y && v.length > 0 && m.searchParams.set('_routes', v.join(',')),
        [m.pathname + m.search]
      );
    }, [f, c.unstable_trailingSlashAwareDataRequests, n, o, r]);
  return w.createElement(
    w.Fragment,
    null,
    h.map(m =>
      w.createElement('link', {
        key: m,
        rel: 'prefetch',
        as: 'fetch',
        href: m,
        ...u,
      })
    )
  );
}
function dS({ page: n, matches: r, ...u }) {
  let o = Ul(),
    { future: c, manifest: f, routeModules: h } = kc(),
    { basename: m } = Gc(),
    { loaderData: y, matches: v } = uS(),
    b = w.useMemo(() => cy(n, r, v, f, o, 'data'), [n, r, v, f, o]),
    p = w.useMemo(() => cy(n, r, v, f, o, 'assets'), [n, r, v, f, o]),
    M = w.useMemo(() => {
      if (n === o.pathname + o.search + o.hash) return [];
      let Y = new Set(),
        j = !1;
      if (
        (r.forEach(W => {
          let I = f.routes[W.route.id];
          !I ||
            !I.hasLoader ||
            ((!b.some(J => J.route.id === W.route.id) &&
              W.route.id in y &&
              h[W.route.id]?.shouldRevalidate) ||
            I.hasClientLoader
              ? (j = !0)
              : Y.add(W.route.id));
        }),
        Y.size === 0)
      )
        return [];
      let k = yv(n, m, c.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        j &&
          Y.size > 0 &&
          k.searchParams.set(
            '_routes',
            r
              .filter(W => Y.has(W.route.id))
              .map(W => W.route.id)
              .join(',')
          ),
        [k.pathname + k.search]
      );
    }, [m, c.unstable_trailingSlashAwareDataRequests, y, o, f, b, r, n, h]),
    z = w.useMemo(() => aS(p, f), [p, f]),
    L = cS(p);
  return w.createElement(
    w.Fragment,
    null,
    M.map(Y =>
      w.createElement('link', {
        key: Y,
        rel: 'prefetch',
        as: 'fetch',
        href: Y,
        ...u,
      })
    ),
    z.map(Y =>
      w.createElement('link', { key: Y, rel: 'modulepreload', href: Y, ...u })
    ),
    L.map(({ key: Y, link: j }) =>
      w.createElement('link', {
        key: Y,
        nonce: u.nonce,
        ...j,
        crossOrigin: j.crossOrigin ?? u.crossOrigin,
      })
    )
  );
}
function hS(...n) {
  return r => {
    n.forEach(u => {
      typeof u == 'function' ? u(r) : u != null && (u.current = r);
    });
  };
}
var mS =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u';
try {
  mS && (window.__reactRouterVersion = '7.15.0');
} catch {}
function yS(n, r) {
  return V0({
    basename: r?.basename,
    getContext: r?.getContext,
    future: r?.future,
    history: a0({ window: r?.window }),
    hydrationData: r?.hydrationData || vS(),
    routes: n,
    mapRouteProperties: Bb,
    hydrationRouteProperties: qb,
    dataStrategy: r?.dataStrategy,
    patchRoutesOnNavigation: r?.patchRoutesOnNavigation,
    window: r?.window,
    instrumentations: r?.instrumentations,
  }).initialize();
}
function vS() {
  let n = window?.__staticRouterHydrationData;
  return (n && n.errors && (n = { ...n, errors: gS(n.errors) }), n);
}
function gS(n) {
  if (!n) return null;
  let r = Object.entries(n),
    u = {};
  for (let [o, c] of r)
    if (c && c.__type === 'RouteErrorResponse')
      u[o] = new fr(c.status, c.statusText, c.data, c.internal === !0);
    else if (c && c.__type === 'Error') {
      if (c.__subType) {
        let f = window[c.__subType];
        if (typeof f == 'function')
          try {
            let h = new f(c.message);
            ((h.stack = ''), (u[o] = h));
          } catch {}
      }
      if (u[o] == null) {
        let f = new Error(c.message);
        ((f.stack = ''), (u[o] = f));
      }
    } else u[o] = c;
  return u;
}
var vv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  sr = w.forwardRef(function (
    {
      onClick: r,
      discover: u = 'render',
      prefetch: o = 'none',
      relative: c,
      reloadDocument: f,
      replace: h,
      mask: m,
      state: y,
      target: v,
      to: b,
      preventScrollReset: p,
      viewTransition: M,
      defaultShouldRevalidate: z,
      ...L
    },
    Y
  ) {
    let { basename: j, navigator: k, useTransitions: W } = w.useContext(dl),
      I = typeof b == 'string' && vv.test(b),
      J = Ky(b, j);
    b = J.to;
    let ce = pb(b, { relative: c }),
      le = Ul(),
      T = null;
    if (m) {
      let Se = Qu(m, [], le.mask ? le.mask.pathname : '/', !0);
      (j !== '/' &&
        (Se.pathname = Se.pathname === '/' ? j : cl([j, Se.pathname])),
        (T = k.createHref(Se)));
    }
    let [Q, re, ke] = oS(o, L),
      xe = ES(b, {
        replace: h,
        mask: m,
        state: y,
        target: v,
        preventScrollReset: p,
        relative: c,
        viewTransition: M,
        defaultShouldRevalidate: z,
        useTransitions: W,
      });
    function Oe(Se) {
      (r && r(Se), Se.defaultPrevented || xe(Se));
    }
    let Ye = !(J.isExternal || f),
      Pe = w.createElement('a', {
        ...L,
        ...ke,
        href: (Ye ? T : void 0) || J.absoluteURL || ce,
        onClick: Ye ? Oe : r,
        ref: hS(Y, re),
        target: v,
        'data-discover': !I && u === 'render' ? 'true' : void 0,
      });
    return Q && !I
      ? w.createElement(w.Fragment, null, Pe, w.createElement(sS, { page: ce }))
      : Pe;
  });
sr.displayName = 'Link';
var pS = w.forwardRef(function (
  {
    'aria-current': r = 'page',
    caseSensitive: u = !1,
    className: o = '',
    end: c = !1,
    style: f,
    to: h,
    viewTransition: m,
    children: y,
    ...v
  },
  b
) {
  let p = yr(h, { relative: v.relative }),
    M = Ul(),
    z = w.useContext(hr),
    { navigator: L, basename: Y } = w.useContext(dl),
    j = z != null && TS(p) && m === !0,
    k = L.encodeLocation ? L.encodeLocation(p).pathname : p.pathname,
    W = M.pathname,
    I =
      z && z.navigation && z.navigation.location
        ? z.navigation.location.pathname
        : null;
  (u ||
    ((W = W.toLowerCase()),
    (I = I ? I.toLowerCase() : null),
    (k = k.toLowerCase())),
    I && Y && (I = fl(I, Y) || I));
  const J = k !== '/' && k.endsWith('/') ? k.length - 1 : k.length;
  let ce = W === k || (!c && W.startsWith(k) && W.charAt(J) === '/'),
    le =
      I != null &&
      (I === k || (!c && I.startsWith(k) && I.charAt(k.length) === '/')),
    T = { isActive: ce, isPending: le, isTransitioning: j },
    Q = ce ? r : void 0,
    re;
  typeof o == 'function'
    ? (re = o(T))
    : (re = [
        o,
        ce ? 'active' : null,
        le ? 'pending' : null,
        j ? 'transitioning' : null,
      ]
        .filter(Boolean)
        .join(' '));
  let ke = typeof f == 'function' ? f(T) : f;
  return w.createElement(
    sr,
    {
      ...v,
      'aria-current': Q,
      className: re,
      ref: b,
      style: ke,
      to: h,
      viewTransition: m,
    },
    typeof y == 'function' ? y(T) : y
  );
});
pS.displayName = 'NavLink';
var bS = w.forwardRef(
  (
    {
      discover: n = 'render',
      fetcherKey: r,
      navigate: u,
      reloadDocument: o,
      replace: c,
      state: f,
      method: h = qu,
      action: m,
      onSubmit: y,
      relative: v,
      preventScrollReset: b,
      viewTransition: p,
      defaultShouldRevalidate: M,
      ...z
    },
    L
  ) => {
    let { useTransitions: Y } = w.useContext(dl),
      j = wS(),
      k = zS(m, { relative: v }),
      W = h.toLowerCase() === 'get' ? 'get' : 'post',
      I = typeof m == 'string' && vv.test(m),
      J = ce => {
        if ((y && y(ce), ce.defaultPrevented)) return;
        ce.preventDefault();
        let le = ce.nativeEvent.submitter,
          T = le?.getAttribute('formmethod') || h,
          Q = () =>
            j(le || ce.currentTarget, {
              fetcherKey: r,
              method: T,
              navigate: u,
              replace: c,
              state: f,
              relative: v,
              preventScrollReset: b,
              viewTransition: p,
              defaultShouldRevalidate: M,
            });
        Y && u !== !1 ? w.startTransition(() => Q()) : Q();
      };
    return w.createElement('form', {
      ref: L,
      method: W,
      action: k,
      onSubmit: o ? y : J,
      ...z,
      'data-discover': !I && n === 'render' ? 'true' : void 0,
    });
  }
);
bS.displayName = 'Form';
function SS(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function gv(n) {
  let r = w.useContext(dn);
  return (_e(r, SS(n)), r);
}
function ES(
  n,
  {
    target: r,
    replace: u,
    mask: o,
    state: c,
    preventScrollReset: f,
    relative: h,
    viewTransition: m,
    defaultShouldRevalidate: y,
    useTransitions: v,
  } = {}
) {
  let b = bb(),
    p = Ul(),
    M = yr(n, { relative: h });
  return w.useCallback(
    z => {
      if ($b(z, r)) {
        z.preventDefault();
        let L = u !== void 0 ? u : _l(p) === _l(M),
          Y = () =>
            b(n, {
              replace: L,
              mask: o,
              state: c,
              preventScrollReset: f,
              relative: h,
              viewTransition: m,
              defaultShouldRevalidate: y,
            });
        v ? w.startTransition(() => Y()) : Y();
      }
    },
    [p, b, M, u, o, c, r, n, f, h, m, y, v]
  );
}
var xS = 0,
  RS = () => `__${String(++xS)}__`;
function wS() {
  let { router: n } = gv('useSubmit'),
    { basename: r } = w.useContext(dl),
    u = Db(),
    o = n.fetch,
    c = n.navigate;
  return w.useCallback(
    async (f, h = {}) => {
      let { action: m, method: y, encType: v, formData: b, body: p } = Pb(f, r);
      if (h.navigate === !1) {
        let M = h.fetcherKey || RS();
        await o(M, u, h.action || m, {
          defaultShouldRevalidate: h.defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: p,
          formMethod: h.method || y,
          formEncType: h.encType || v,
          flushSync: h.flushSync,
        });
      } else
        await c(h.action || m, {
          defaultShouldRevalidate: h.defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: p,
          formMethod: h.method || y,
          formEncType: h.encType || v,
          replace: h.replace,
          state: h.state,
          fromRouteId: u,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition,
        });
    },
    [o, c, r, u]
  );
}
function zS(n, { relative: r } = {}) {
  let { basename: u } = w.useContext(dl),
    o = w.useContext(Nl);
  _e(o, 'useFormAction must be used inside a RouteContext');
  let [c] = o.matches.slice(-1),
    f = { ...yr(n || '.', { relative: r }) },
    h = Ul();
  if (n == null) {
    f.search = h.search;
    let m = new URLSearchParams(f.search),
      y = m.getAll('index');
    if (y.some(b => b === '')) {
      (m.delete('index'), y.filter(p => p).forEach(p => m.append('index', p)));
      let b = m.toString();
      f.search = b ? `?${b}` : '';
    }
  }
  return (
    (!n || n === '.') &&
      c.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, '?index&') : '?index'),
    u !== '/' && (f.pathname = f.pathname === '/' ? u : cl([u, f.pathname])),
    _l(f)
  );
}
function TS(n, { relative: r } = {}) {
  let u = w.useContext(jc);
  _e(
    u != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = gv('useViewTransitionState'),
    c = yr(n, { relative: r });
  if (!u.isTransitioning) return !1;
  let f = fl(u.currentLocation.pathname, o) || u.currentLocation.pathname,
    h = fl(u.nextLocation.pathname, o) || u.nextLocation.pathname;
  return Gu(c.pathname, h) != null || Gu(c.pathname, f) != null;
}
const pv = (n, r = '') => {
    let u;
    n.index
      ? (u = r || '/')
      : n.path
        ? n.path.startsWith('/')
          ? (u = n.path)
          : (u = r === '/' ? `/${n.path}` : `${r}/${n.path}`)
        : (u = r);
    const o = { ...n, fullPath: u },
      c = n.children?.flatMap(f => pv(f, u)) || [];
    return [o, ...c];
  },
  MS = () => Xv.flatMap(n => pv(n));
function AS() {
  const [n, r] = w.useState(!1),
    u = Ul(),
    o = h => u.pathname === h,
    c = () => r(!n),
    f = MS()
      .filter(
        h =>
          h.handle?.showInNavigation === !0 &&
          h.fullPath !== void 0 &&
          h.handle?.label !== void 0
      )
      .map(h => ({ path: h.fullPath, label: h.handle?.label }));
  return ie.jsxs(ie.Fragment, {
    children: [
      ie.jsx('nav', {
        className: 'bg-white border-b border-gray-200',
        children: ie.jsxs('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          children: [
            ie.jsxs('div', {
              className: 'flex justify-between items-center h-16',
              children: [
                ie.jsx(sr, {
                  to: '/',
                  className: 'text-xl font-semibold text-gray-900',
                  children: 'React App',
                }),
                ie.jsx('button', {
                  onClick: c,
                  className:
                    'p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'aria-label': 'Toggle menu',
                  children: ie.jsxs('div', {
                    className:
                      'w-6 h-6 flex flex-col justify-center space-y-1.5',
                    children: [
                      ie.jsx('span', {
                        className: `block h-0.5 w-6 bg-current transition-all ${n ? 'rotate-45 translate-y-2' : ''}`,
                      }),
                      ie.jsx('span', {
                        className: `block h-0.5 w-6 bg-current transition-all ${n ? 'opacity-0' : ''}`,
                      }),
                      ie.jsx('span', {
                        className: `block h-0.5 w-6 bg-current transition-all ${n ? '-rotate-45 -translate-y-2' : ''}`,
                      }),
                    ],
                  }),
                }),
              ],
            }),
            n &&
              ie.jsx('div', {
                className: 'pb-4',
                children: ie.jsx('div', {
                  className: 'flex flex-col space-y-2',
                  children: f.map(h =>
                    ie.jsx(
                      sr,
                      {
                        to: h.path,
                        onClick: () => r(!1),
                        className: `px-3 py-2 rounded-md text-sm font-medium transition-colors ${o(h.path) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`,
                        children: h.label,
                      },
                      h.path
                    )
                  ),
                }),
              }),
          ],
        }),
      }),
      ie.jsx(Xb, {}),
    ],
  });
}
function CS() {
  return ie.jsx('div', {
    className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
    children: ie.jsxs('div', {
      className: 'text-center',
      children: [
        ie.jsx('h1', {
          className: 'text-4xl font-bold text-gray-900 mb-4',
          children: 'Home',
        }),
        ie.jsx('p', {
          className: 'text-lg text-gray-600 mb-8',
          children: 'Welcome to your React application.',
        }),
      ],
    }),
  });
}
function _S() {
  return ie.jsx('div', {
    className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
    children: ie.jsxs('div', {
      className: 'text-center',
      children: [
        ie.jsx('h1', {
          className: 'text-4xl font-bold text-gray-900 mb-4',
          children: '404',
        }),
        ie.jsx('p', {
          className: 'text-lg text-gray-600 mb-8',
          children: 'Page not found',
        }),
        ie.jsx(sr, {
          to: '/',
          className:
            'inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors',
          children: 'Go to Home',
        }),
      ],
    }),
  });
}
const fy = n => {
    let r;
    const u = new Set(),
      o = (v, b) => {
        const p = typeof v == 'function' ? v(r) : v;
        if (!Object.is(p, r)) {
          const M = r;
          ((r =
            (b ?? (typeof p != 'object' || p === null))
              ? p
              : Object.assign({}, r, p)),
            u.forEach(z => z(r, M)));
        }
      },
      c = () => r,
      m = {
        setState: o,
        getState: c,
        getInitialState: () => y,
        subscribe: v => (u.add(v), () => u.delete(v)),
      },
      y = (r = n(o, c, m));
    return m;
  },
  OS = n => (n ? fy(n) : fy),
  DS = n => n;
function NS(n, r = DS) {
  const u = lr.useSyncExternalStore(
    n.subscribe,
    lr.useCallback(() => r(n.getState()), [n, r]),
    lr.useCallback(() => r(n.getInitialState()), [n, r])
  );
  return (lr.useDebugValue(u), u);
}
const dy = n => {
    const r = OS(n),
      u = o => NS(r, o);
    return (Object.assign(u, r), u);
  },
  US = n => (n ? dy(n) : dy),
  LS = (n, r, u) =>
    r === u
      ? { messages: n, streamingId: r }
      : n.some(c => c.id === u)
        ? { messages: n, streamingId: u }
        : {
            messages: [
              ...n,
              {
                id: u,
                role: 'assistant',
                content: '',
                status: 'streaming',
                createdAt: Date.now(),
              },
            ],
            streamingId: u,
          },
  Ua = US(n => ({
    messages: [],
    streamingId: null,
    conversationId: null,
    setConversation: r => n({ conversationId: r }),
    appendOptimistic: (r, u) =>
      n(o => ({
        messages: [
          ...o.messages,
          {
            id: r,
            role: 'user',
            content: u,
            status: 'pending',
            createdAt: Date.now(),
          },
        ],
      })),
    applyFrame: r =>
      n(u => {
        switch (r.type) {
          case 'token': {
            const o = LS(u.messages, u.streamingId, r.data.messageId);
            return {
              messages: o.messages.map(f =>
                f.id === r.data.messageId
                  ? {
                      ...f,
                      content: f.content + r.data.delta,
                      status: 'streaming',
                    }
                  : f
              ),
              streamingId: o.streamingId,
            };
          }
          case 'message_complete':
            return {
              messages: u.messages.map(c =>
                c.id === r.data.messageId ? { ...c, status: 'final' } : c
              ),
              streamingId:
                u.streamingId === r.data.messageId ? null : u.streamingId,
            };
          case 'error': {
            const o = u.streamingId;
            return o
              ? {
                  messages: u.messages.map(f =>
                    f.id === o
                      ? {
                          ...f,
                          status: 'error',
                          content: f.content || r.data.message,
                        }
                      : f
                  ),
                  streamingId: null,
                }
              : u;
          }
          case 'tool_call':
            return u;
          default:
            return u;
        }
      }),
    markError: (r, u) =>
      n(o => ({
        messages: o.messages.map(c =>
          c.id === r ? { ...c, status: 'error', content: u || c.content } : c
        ),
      })),
    seedFromHistory: r =>
      n({
        messages: [...r].sort((u, o) => u.createdAt - o.createdAt),
        streamingId: null,
      }),
    reset: () => n({ messages: [], streamingId: null, conversationId: null }),
  }));
async function jS(n, r) {
  const u = n.getReader();
  let o;
  for (; !(o = await u.read()).done; ) r(o.value);
}
function HS(n) {
  let r,
    u,
    o,
    c = !1;
  return function (h) {
    r === void 0 ? ((r = h), (u = 0), (o = -1)) : (r = qS(r, h));
    const m = r.length;
    let y = 0;
    for (; u < m; ) {
      c && (r[u] === 10 && (y = ++u), (c = !1));
      let v = -1;
      for (; u < m && v === -1; ++u)
        switch (r[u]) {
          case 58:
            o === -1 && (o = u - y);
            break;
          case 13:
            c = !0;
          case 10:
            v = u;
            break;
        }
      if (v === -1) break;
      (n(r.subarray(y, v), o), (y = u), (o = -1));
    }
    y === m ? (r = void 0) : y !== 0 && ((r = r.subarray(y)), (u -= y));
  };
}
function BS(n, r, u) {
  let o = hy();
  const c = new TextDecoder();
  return function (h, m) {
    if (h.length === 0) (u?.(o), (o = hy()));
    else if (m > 0) {
      const y = c.decode(h.subarray(0, m)),
        v = m + (h[m + 1] === 32 ? 2 : 1),
        b = c.decode(h.subarray(v));
      switch (y) {
        case 'data':
          o.data = o.data
            ? o.data +
              `
` +
              b
            : b;
          break;
        case 'event':
          o.event = b;
          break;
        case 'id':
          n((o.id = b));
          break;
        case 'retry':
          const p = parseInt(b, 10);
          isNaN(p) || r((o.retry = p));
          break;
      }
    }
  };
}
function qS(n, r) {
  const u = new Uint8Array(n.length + r.length);
  return (u.set(n), u.set(r, n.length), u);
}
function hy() {
  return { data: '', event: '', id: '', retry: void 0 };
}
var YS = function (n, r) {
  var u = {};
  for (var o in n)
    Object.prototype.hasOwnProperty.call(n, o) &&
      r.indexOf(o) < 0 &&
      (u[o] = n[o]);
  if (n != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var c = 0, o = Object.getOwnPropertySymbols(n); c < o.length; c++)
      r.indexOf(o[c]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(n, o[c]) &&
        (u[o[c]] = n[o[c]]);
  return u;
};
const zc = 'text/event-stream',
  GS = 1e3,
  my = 'last-event-id';
function VS(n, r) {
  var {
      signal: u,
      headers: o,
      onopen: c,
      onmessage: f,
      onclose: h,
      onerror: m,
      openWhenHidden: y,
      fetch: v,
    } = r,
    b = YS(r, [
      'signal',
      'headers',
      'onopen',
      'onmessage',
      'onclose',
      'onerror',
      'openWhenHidden',
      'fetch',
    ]);
  return new Promise((p, M) => {
    const z = Object.assign({}, o);
    z.accept || (z.accept = zc);
    let L;
    function Y() {
      (L.abort(), document.hidden || ce());
    }
    y || document.addEventListener('visibilitychange', Y);
    let j = GS,
      k = 0;
    function W() {
      (document.removeEventListener('visibilitychange', Y),
        window.clearTimeout(k),
        L.abort());
    }
    u?.addEventListener('abort', () => {
      (W(), p());
    });
    const I = v ?? window.fetch,
      J = c ?? kS;
    async function ce() {
      var le;
      L = new AbortController();
      try {
        const T = await I(
          n,
          Object.assign(Object.assign({}, b), { headers: z, signal: L.signal })
        );
        (await J(T),
          await jS(
            T.body,
            HS(
              BS(
                Q => {
                  Q ? (z[my] = Q) : delete z[my];
                },
                Q => {
                  j = Q;
                },
                f
              )
            )
          ),
          h?.(),
          W(),
          p());
      } catch (T) {
        if (!L.signal.aborted)
          try {
            const Q = (le = m?.(T)) !== null && le !== void 0 ? le : j;
            (window.clearTimeout(k), (k = window.setTimeout(ce, Q)));
          } catch (Q) {
            (W(), M(Q));
          }
      }
    }
    ce();
  });
}
function kS(n) {
  const r = n.headers.get('content-type');
  if (!r?.startsWith(zc))
    throw new Error(`Expected content-type to be ${zc}, Actual: ${r}`);
}
const XS = 3e4,
  QS = 1e3,
  ZS = 0.25,
  KS = (n, r) =>
    new Promise((u, o) => {
      const c = setTimeout(u, n);
      r.addEventListener('abort', () => {
        (clearTimeout(c), o(new DOMException('aborted', 'AbortError')));
      });
    }),
  JS = n => {
    const r = Math.min(QS * 2 ** n, XS),
      u = r * ZS * (Math.random() * 2 - 1);
    return Math.max(0, Math.round(r + u));
  };
class mc extends Error {}
class yc extends Error {}
function FS(n) {
  const {
      url: r,
      getToken: u,
      onFrame: o,
      initialLastEventId: c,
      fetchFn: f = VS,
    } = n,
    [h, m] = w.useState('idle'),
    [y, v] = w.useState(null),
    [b, p] = w.useState(0),
    M = w.useRef(o);
  M.current = o;
  const z = w.useRef(u);
  return (
    (z.current = u),
    w.useEffect(() => {
      if (!r) {
        m('idle');
        return;
      }
      const L = new AbortController();
      let Y = c ?? '',
        j = 0,
        k = !1;
      return (
        (async () => {
          for (; !k; ) {
            m(j === 0 ? 'connecting' : 'reconnecting');
            try {
              const I = await z.current();
              if (
                (await f(r, {
                  method: 'GET',
                  signal: L.signal,
                  headers: {
                    Authorization: `Bearer ${I}`,
                    ...(Y ? { 'Last-Event-ID': Y } : {}),
                  },
                  openWhenHidden: !0,
                  onopen: async J => {
                    if (
                      J.ok &&
                      J.headers
                        .get('content-type')
                        ?.includes('text/event-stream')
                    ) {
                      ((j = 0), m('open'), v(null));
                      return;
                    }
                    throw J.status === 401 || J.status === 403
                      ? new mc(`auth rejected (${J.status})`)
                      : new yc(`unexpected status ${J.status}`);
                  },
                  onmessage: J => {
                    if ((J.id && (Y = J.id), !(!J.event || J.event === 'ping')))
                      try {
                        const ce = {
                          id: J.id,
                          type: J.event,
                          data: JSON.parse(J.data),
                        };
                        M.current(ce);
                      } catch (ce) {
                        v(`bad frame: ${ce.message}`);
                      }
                  },
                  onerror: J => {
                    throw J instanceof mc
                      ? J
                      : new yc(J?.message ?? 'connection error');
                  },
                  onclose: () => {
                    throw new yc('stream closed by server');
                  },
                }),
                k)
              )
                return;
            } catch (I) {
              if (k || L.signal.aborted) return;
              if (I instanceof mc) {
                (m('error'), v(I.message));
                return;
              }
              (v(I.message), (j += 1));
              const J = JS(j);
              try {
                await KS(J, L.signal);
              } catch {
                return;
              }
            }
          }
        })(),
        () => {
          ((k = !0), L.abort(), m('closed'));
        }
      );
    }, [r, c, b, f]),
    { status: h, lastError: y, reconnect: () => p(L => L + 1) }
  );
}
var cn = (n => (
  (n.WebApp = 'WebApp'),
  (n.MicroFrontend = 'Micro-Frontend'),
  (n.OpenAI = 'OpenAI'),
  (n.SalesforceACC = 'Salesforce-ACC'),
  (n.MCPApps = 'MCP-Apps'),
  (n.Mosaic = 'Mosaic'),
  n
))(cn || {});
const $S = WS();
function WS() {
  if (typeof window > 'u') return 'Mosaic';
  if (window.openai) return 'OpenAI';
  try {
    if (window.self !== window.top) return 'Micro-Frontend';
  } catch {
    return 'Micro-Frontend';
  }
  const n = window;
  return n.$A || n.Aura ? 'Salesforce-ACC' : 'WebApp';
}
function IS(n) {
  return $S;
}
const PS = new Set(['then', 'catch', 'finally']);
function e1(n, r) {
  return new Proxy(n, {
    get(u, o, c) {
      if (typeof o == 'symbol' || PS.has(o)) {
        const f = Reflect.get(u, o, c);
        return typeof f == 'function' ? f.bind(u) : f;
      }
      throw new TypeError(`\`${r}()\` returns a Promise — did you forget to await it?
Use \`const sdk = await ${r}();\` before accessing SDK methods.`);
    },
  });
}
function Ol(n) {
  return bv(n)
    ? n.then(r => r)
    : {
        then: (r, u) => {
          try {
            return Ol(r(n));
          } catch (o) {
            return r === void 0 ? Ol(n) : Tc(o);
          }
        },
      };
}
function Tc(n) {
  return bv(n)
    ? n.then(r => r)
    : {
        then: (r, u) => {
          if (typeof u == 'function')
            try {
              return Ol(u(n));
            } catch (o) {
              return Tc(o);
            }
          return Tc(n);
        },
      };
}
function bv(n) {
  return typeof n?.then == 'function';
}
function Sv(n = { request: [], retry: void 0, response: [], finally: [] }, r) {
  return {
    type: 'fetch',
    version: '1.0',
    service: function (...u) {
      var o;
      const c = (o = n.createContext) == null ? void 0 : o.call(n),
        {
          request: f = [],
          retry: h = void 0,
          response: m = [],
          finally: y = [],
        } = n,
        v = f.reduce((b, p) => b.then(M => p(M, c)), Ol(u));
      return Promise.resolve(v)
        .then(b =>
          h ? h(b, r, c) : r ? r.applyRetry(() => fetch(...b)) : fetch(...b)
        )
        .then(b => m.reduce((p, M) => p.then(z => M(z, c)), Ol(b)))
        .finally(() => {
          if (y.length > 0)
            return y.reduce((b, p) => b.then(() => p(c)), Promise.resolve());
        });
    },
  };
}
function ku(
  n,
  r,
  [u, o = {}],
  {
    throwOnExisting: c = !1,
    errorMessage: f = `Unexpected ${n} header encountered`,
  } = {}
) {
  let h = !1;
  if (u instanceof Request && !o?.headers) {
    if (c && u.headers.has(n)) throw new Error(f);
    (u.headers.set(n, r), (h = !0));
  }
  if (o?.headers instanceof Headers) {
    if (c && o.headers.has(n)) throw new Error(f);
    o.headers.set(n, r);
  } else {
    if (c && o?.headers && Reflect.has(o.headers, n)) throw new Error(f);
    h || (o.headers = { ...o?.headers, [n]: r });
  }
  return [u, o];
}
function t1(n) {
  return r => {
    const [u, o] = r;
    if (typeof u == 'string' && !u.startsWith('http')) {
      const c = u.startsWith('/') ? u : `/${u}`;
      return Ol([`${n}${c}`, o]);
    }
    return Ol(r);
  };
}
function l1(n) {
  return r => Ol(ku('Authorization', `Bearer ${n}`, r));
}
function a1(n, r) {
  const u = [];
  return (n && u.push(t1(n)), r && u.push(l1(r)), Sv({ request: u }).service);
}
const n1 = '66.0';
function Ev(n = n1) {
  return `/services/data/v${n}`;
}
class i1 {
  clientFetch;
  pathData;
  constructor(r) {
    const u = r1(),
      o = u1(r?.instanceUrl ?? u.instanceUrl),
      c = r?.accessToken ?? u.accessToken;
    ((this.pathData = Ev(r?.apiVersion ?? u.apiVersion)),
      (this.clientFetch = a1(o || void 0, c)));
  }
  async graphql({ query: r, variables: u, operationName: o }) {
    return (
      await this.clientFetch(`${this.pathData}/graphql`, {
        method: 'POST',
        body: JSON.stringify({ query: r, variables: u, operationName: o }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    ).json();
  }
}
function r1() {
  const n = globalThis.MOSAIC_ENV;
  return {
    instanceUrl: n?.instanceUrl,
    accessToken: n?.accessToken,
    apiVersion: n?.apiVersion,
  };
}
function u1(n) {
  if (!n || n === '/') return '';
  let r = n;
  return (
    !r.startsWith('/') && !r.startsWith('http') && (r = `/${r}`),
    r.endsWith('/') && (r = r.slice(0, -1)),
    r
  );
}
const o1 = 'graphqlQuery';
class s1 {
  async graphql({ query: r, variables: u, operationName: o }) {
    return (
      await window.openai.callTool(o1, {
        query: r,
        ...(u != null ? { variables: u } : {}),
        ...(o != null ? { operationName: o } : {}),
      })
    ).structuredContent;
  }
}
class c1 {
  constructor(r) {
    this.defaultRetryPolicy = r;
  }
  applyRetry(r, u) {
    return this.retry(r, u || this.defaultRetryPolicy);
  }
  async retry(r, u) {
    const o = Date.now();
    let c = 0,
      f = await r(),
      h = { attempt: c, totalElapsedMs: Date.now() - o, lastResult: f };
    for (; await u.shouldRetry(f, h); ) {
      const m = await u.calculateDelay(f, h);
      (await this.delay(m),
        u.prepareRetry && (await u.prepareRetry(f, h)),
        c++,
        (f = await r()),
        (h = { attempt: c, totalElapsedMs: Date.now() - o, lastResult: f }));
    }
    return f;
  }
  delay(r) {
    return new Promise(u => {
      setTimeout(u, r);
    });
  }
}
class f1 {}
function d1(n) {
  return { version: '1.0', service: new c1(n), type: 'retry' };
}
const h1 = 'X-SFDC-Client-Name',
  m1 = 'X-SFDC-Client-Version',
  y1 = '@salesforce/sdk-data',
  v1 = '1.135.0',
  g1 = n => {
    let r = ku(h1, y1, n);
    return ((r = ku(m1, v1, r)), Ol(r));
  },
  p1 = 'X-CSRF-Token';
function b1(n, r = {}) {
  const { protectedUrls: u = [], alwaysProtectedUrls: o = [] } = r;
  return async c => {
    const [f, h] = c,
      m = new Request(f, h);
    if (yy(o, m.url) || (S1(m.method) && yy(u, m.url))) {
      const y = await n.getToken();
      c = ku(p1, y, c);
    }
    return Ol(c);
  };
}
function S1(n) {
  const r = n.toLowerCase();
  return r === 'post' || r === 'put' || r === 'patch' || r === 'delete';
}
function yy(n, r) {
  const u = new URL(r);
  return n.some(o => u.pathname.includes(o));
}
function E1(n, r = {}) {
  const u = b1(n, r);
  async function o(c) {
    const f = await u(c);
    return fetch(f[0], f[1]);
  }
  return (c, f) => (f ? f.applyRetry(async () => o(c)) : o(c));
}
const x1 = [400, 401, 403];
class R1 extends f1 {
  constructor(r) {
    (super(r), (this.csrfTokenManager = r));
  }
  async shouldRetry(r, u) {
    return u.attempt >= 1 ? !1 : x1.includes(r.status);
  }
  async calculateDelay(r, u) {
    return 0;
  }
  async prepareRetry(r, u) {
    await this.csrfTokenManager.refreshToken();
  }
}
class w1 {
  constructor(r, u) {
    ((this.endpoint = r),
      (this.cacheName = u),
      (this.tokenPromise = this.obtainToken()));
  }
  tokenPromise;
  refreshPromise;
  async getToken() {
    return this.tokenPromise;
  }
  refreshToken() {
    return (
      this.refreshPromise ||
        (this.refreshPromise = this.withCache(r => r.delete(this.endpoint))
          .then(
            () => ((this.tokenPromise = this.obtainToken()), this.tokenPromise)
          )
          .finally(() => {
            this.refreshPromise = void 0;
          })),
      this.refreshPromise
    );
  }
  async obtainToken() {
    let r = await this.withCache(c => c.match(this.endpoint)),
      u = !1;
    r || ((r = await fetch(this.endpoint, { method: 'get' })), (u = !0));
    const o = (await r.clone().json()).csrfToken;
    return (u && (await this.withCache(c => c.put(this.endpoint, r))), o);
  }
  async withCache(r) {
    if (this.cacheName && caches) {
      const u = await caches.open(this.cacheName);
      return r(u);
    } else return;
  }
}
const vy = new Map();
function z1(n) {
  const { endpoint: r, cacheName: u, ...o } = n.csrf;
  let c = vy.get(r);
  return (
    c || ((c = new w1(r, u)), vy.set(r, c)),
    Sv({ retry: E1(c, o), request: [g1] }, d1(new R1(c)).service).service
  );
}
const T1 = 1,
  M1 = `@salesforce/sdk-data_v${T1}`,
  xv = Ev(),
  A1 = `${xv}/ui-api`;
class C1 {
  baseUrl;
  clientFetch;
  onStatus;
  constructor(r) {
    const u = _1();
    ((this.baseUrl = O1(r?.basePath ?? u.apiPath)),
      (this.onStatus = r?.onStatus ?? {}),
      (this.clientFetch = z1({
        csrf: {
          endpoint: `${this.baseUrl}${A1}/session/csrf`,
          cacheName: M1,
          protectedUrls: ['services/data/v', 'services/apexrest'],
          alwaysProtectedUrls: ['services/apexrest'],
        },
      })));
  }
  async graphql({ query: r, variables: u, operationName: o }) {
    return (
      await this.fetch(`${xv}/graphql`, {
        method: 'POST',
        body: JSON.stringify({ query: r, variables: u, operationName: o }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Chatter-Entity-Encoding': 'false',
        },
      })
    ).json();
  }
  async fetch(r, u) {
    const o = this.applySalesforceBase(r),
      c = await this.clientFetch(o, u);
    return (await this.onStatus[c.status]?.(), c);
  }
  applySalesforceBase(r) {
    if (typeof r == 'string') {
      if (r.startsWith('http')) return r;
      const u = r.startsWith('/') ? r : `/${r}`;
      return `${this.baseUrl}${u}`;
    }
    return r;
  }
}
function _1() {
  return { apiPath: globalThis.SFDC_ENV?.apiPath };
}
function O1(n) {
  if (!n || n === '/') return '';
  let r = n;
  return (
    r.startsWith('/') || (r = `/${r}`),
    r.endsWith('/') && (r = r.slice(0, -1)),
    r
  );
}
function Rv(n) {
  return e1(
    (async () => {
      switch (IS()) {
        case cn.OpenAI:
          return new s1();
        case cn.WebApp:
        case cn.MicroFrontend:
          return new C1(n?.webapp);
        case cn.Mosaic:
          return new i1(n?.mosaic);
        case cn.SalesforceACC:
        case cn.MCPApps:
          return {};
        default:
          return {};
      }
    })(),
    'createDataSDK'
  );
}
async function wv(n, r) {
  const o = await (await Rv()).graphql?.({ query: n, variables: r });
  if (!o) throw new Error('GraphQL response is undefined');
  if (o?.errors?.length) {
    const c = o.errors.map(f => f.message).join('; ');
    throw new Error(`GraphQL Error: ${c}`);
  }
  return o.data;
}
let Pn = null;
const D1 = 60;
async function N1() {
  const n = await Rv();
  if (!n.fetch) throw new Error('DataSDK.fetch is unavailable in this surface');
  const r = await n.fetch('/services/apexrest/chat/mintToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!r.ok)
    throw new Error(`Token broker returned ${r.status}: ${await r.text()}`);
  return await r.json();
}
async function vc(n = !1) {
  const r = Math.floor(Date.now() / 1e3);
  if (!n && Pn && Pn.exp - r > D1) return Pn;
  const u = await N1();
  return ((Pn = { token: u.token, sseUrl: u.sseUrl, exp: u.exp }), Pn);
}
function U1() {
  Pn = null;
}
const L1 = `
  query ListRecentConversations($limit: Int!) {
    uiapi {
      query {
        Chat_Conversation__c(
          orderBy: { Started_At__c: { order: DESC, nulls: LAST } }
          first: $limit
        ) {
          edges {
            node {
              Id
              External_Id__c { value }
              Title__c { value }
              Started_At__c { value }
              Ended_At__c { value }
              Status__c { value }
            }
          }
        }
      }
    }
  }
`,
  j1 = n =>
    n === null ? 'Untitled conversation' : new Date(n).toLocaleString();
function H1(n) {
  const r = n.External_Id__c?.value;
  if (!r) return null;
  const u = n.Started_At__c?.value
      ? new Date(n.Started_At__c.value).getTime()
      : null,
    o = n.Ended_At__c?.value ? new Date(n.Ended_At__c.value).getTime() : null;
  return {
    externalId: r,
    title: n.Title__c?.value || j1(u),
    startedAt: u,
    endedAt: o,
    status: n.Status__c?.value ?? null,
  };
}
async function B1(n = 30) {
  return (
    (await wv(L1, { limit: n })).uiapi.query.Chat_Conversation__c.edges ?? []
  )
    .map(({ node: u }) => H1(u))
    .filter(u => u !== null);
}
const q1 = `
  query LoadRecentConversation($externalId: String!) {
    uiapi {
      query {
        Chat_Conversation__c(
          where: { External_Id__c: { eq: $externalId } }
          first: 1
        ) {
          edges {
            node {
              Id
              External_Id__c { value }
              Title__c { value }
              Started_At__c { value }
              Ended_At__c { value }
              Status__c { value }
              Chat_Messages__r(orderBy: { Created_At__c: { order: ASC } }, first: 200) {
                edges {
                  node {
                    Id
                    External_Id__c { value }
                    Role__c { value }
                    Content__c { value }
                    Created_At__c { value }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`,
  Y1 = new Set(['user', 'assistant', 'system', 'tool']);
function G1(n) {
  const r = n.External_Id__c?.value,
    u = n.Role__c?.value,
    o = n.Created_At__c?.value;
  return !r || !u || !o || !Y1.has(u)
    ? null
    : {
        id: r,
        role: u,
        content: n.Content__c?.value ?? '',
        status: 'final',
        createdAt: new Date(o).getTime(),
      };
}
async function V1(n) {
  const u = (await wv(q1, { externalId: n })).uiapi.query.Chat_Conversation__c
    .edges[0]?.node;
  return u
    ? {
        messages: (u.Chat_Messages__r?.edges ?? [])
          .map(({ node: c }) => G1(c))
          .filter(c => c !== null),
      }
    : { messages: [] };
}
async function k1(n, r, u) {
  const o = new URL(n).origin,
    c = await fetch(`${o}/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${r}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(u),
    });
  if (!c.ok) throw new Error(`send failed: ${c.status} ${await c.text()}`);
  return await c.json();
}
function X1(n) {
  const [r, u] = w.useState(''),
    [o, c] = w.useState(null);
  w.useEffect(() => {
    let M = !1;
    return (
      (async () => {
        try {
          const z = await vc();
          M || u(z.sseUrl);
        } catch (z) {
          if (M) return;
          c(z.message);
        }
      })(),
      () => {
        M = !0;
      }
    );
  }, []);
  const f = Ua(M => M.applyFrame),
    h = Ua(M => M.appendOptimistic),
    m = Ua(M => M.markError),
    y = w.useCallback(
      M => {
        f(M);
      },
      [f]
    ),
    v = w.useCallback(async () => (await vc()).token, []),
    b = FS(w.useMemo(() => ({ url: r, getToken: v, onFrame: y }), [r, v, y])),
    p = w.useCallback(
      async M => {
        const z = `local-${crypto.randomUUID()}`;
        h(z, M);
        try {
          const L = await vc();
          await k1(L.sseUrl, L.token, { conversationId: n, content: M });
        } catch (L) {
          (m(z, L.message), U1());
        }
      },
      [n, h, m]
    );
  return {
    status: b.status,
    lastError: o ?? b.lastError,
    reconnect: b.reconnect,
    send: p,
  };
}
var gc = { exports: {} },
  _t = {};
var gy;
function Q1() {
  if (gy) return _t;
  gy = 1;
  var n = Cc();
  function r(y) {
    var v = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      v += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        v += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      v +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function u() {}
  var o = {
      d: {
        f: u,
        r: function () {
          throw Error(r(522));
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for('react.portal');
  function f(y, v, b) {
    var p =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: p == null ? null : '' + p,
      children: y,
      containerInfo: v,
      implementation: b,
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(y, v) {
    if (y === 'font') return '';
    if (typeof v == 'string') return v === 'use-credentials' ? v : '';
  }
  return (
    (_t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (_t.createPortal = function (y, v) {
      var b =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11))
        throw Error(r(299));
      return f(y, v, null, b);
    }),
    (_t.flushSync = function (y) {
      var v = h.T,
        b = o.p;
      try {
        if (((h.T = null), (o.p = 2), y)) return y();
      } finally {
        ((h.T = v), (o.p = b), o.d.f());
      }
    }),
    (_t.preconnect = function (y, v) {
      typeof y == 'string' &&
        (v
          ? ((v = v.crossOrigin),
            (v =
              typeof v == 'string'
                ? v === 'use-credentials'
                  ? v
                  : ''
                : void 0))
          : (v = null),
        o.d.C(y, v));
    }),
    (_t.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (_t.preinit = function (y, v) {
      if (typeof y == 'string' && v && typeof v.as == 'string') {
        var b = v.as,
          p = m(b, v.crossOrigin),
          M = typeof v.integrity == 'string' ? v.integrity : void 0,
          z = typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0;
        b === 'style'
          ? o.d.S(y, typeof v.precedence == 'string' ? v.precedence : void 0, {
              crossOrigin: p,
              integrity: M,
              fetchPriority: z,
            })
          : b === 'script' &&
            o.d.X(y, {
              crossOrigin: p,
              integrity: M,
              fetchPriority: z,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            });
      }
    }),
    (_t.preinitModule = function (y, v) {
      if (typeof y == 'string')
        if (typeof v == 'object' && v !== null) {
          if (v.as == null || v.as === 'script') {
            var b = m(v.as, v.crossOrigin);
            o.d.M(y, {
              crossOrigin: b,
              integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            });
          }
        } else v == null && o.d.M(y);
    }),
    (_t.preload = function (y, v) {
      if (
        typeof y == 'string' &&
        typeof v == 'object' &&
        v !== null &&
        typeof v.as == 'string'
      ) {
        var b = v.as,
          p = m(b, v.crossOrigin);
        o.d.L(y, b, {
          crossOrigin: p,
          integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
          type: typeof v.type == 'string' ? v.type : void 0,
          fetchPriority:
            typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0,
          referrerPolicy:
            typeof v.referrerPolicy == 'string' ? v.referrerPolicy : void 0,
          imageSrcSet:
            typeof v.imageSrcSet == 'string' ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == 'string' ? v.imageSizes : void 0,
          media: typeof v.media == 'string' ? v.media : void 0,
        });
      }
    }),
    (_t.preloadModule = function (y, v) {
      if (typeof y == 'string')
        if (v) {
          var b = m(v.as, v.crossOrigin);
          o.d.m(y, {
            as: typeof v.as == 'string' && v.as !== 'script' ? v.as : void 0,
            crossOrigin: b,
            integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          });
        } else o.d.m(y);
    }),
    (_t.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (_t.unstable_batchedUpdates = function (y, v) {
      return y(v);
    }),
    (_t.useFormState = function (y, v, b) {
      return h.H.useFormState(y, v, b);
    }),
    (_t.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (_t.version = '19.2.5'),
    _t
  );
}
var py;
function zv() {
  if (py) return gc.exports;
  py = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return (n(), (gc.exports = Q1()), gc.exports);
}
var Z1 = zv();
function Fn(n, r, u) {
  let o = u.initialDeps ?? [],
    c,
    f = !0;
  function h() {
    var m, y, v;
    let b;
    u.key && (m = u.debug) != null && m.call(u) && (b = Date.now());
    const p = n();
    if (!(p.length !== o.length || p.some((L, Y) => o[Y] !== L))) return c;
    o = p;
    let z;
    if (
      (u.key && (y = u.debug) != null && y.call(u) && (z = Date.now()),
      (c = r(...p)),
      u.key && (v = u.debug) != null && v.call(u))
    ) {
      const L = Math.round((Date.now() - b) * 100) / 100,
        Y = Math.round((Date.now() - z) * 100) / 100,
        j = Y / 16,
        k = (W, I) => {
          for (W = String(W); W.length < I; ) W = ' ' + W;
          return W;
        };
      console.info(
        `%c⏱ ${k(Y, 5)} /${k(L, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * j, 120))}deg 100% 31%);`,
        u?.key
      );
    }
    return (
      u?.onChange && !(f && u.skipInitialOnChange) && u.onChange(c),
      (f = !1),
      c
    );
  }
  return (
    (h.updateDeps = m => {
      o = m;
    }),
    h
  );
}
function by(n, r) {
  if (n === void 0) throw new Error('Unexpected undefined');
  return n;
}
const K1 = (n, r) => Math.abs(n - r) < 1.01,
  J1 = (n, r, u) => {
    let o;
    return function (...c) {
      (n.clearTimeout(o), (o = n.setTimeout(() => r.apply(this, c), u)));
    };
  },
  Sy = n => {
    const { offsetWidth: r, offsetHeight: u } = n;
    return { width: r, height: u };
  },
  F1 = n => n,
  $1 = n => {
    const r = Math.max(n.startIndex - n.overscan, 0),
      u = Math.min(n.endIndex + n.overscan, n.count - 1),
      o = [];
    for (let c = r; c <= u; c++) o.push(c);
    return o;
  },
  W1 = (n, r) => {
    const u = n.scrollElement;
    if (!u) return;
    const o = n.targetWindow;
    if (!o) return;
    const c = h => {
      const { width: m, height: y } = h;
      r({ width: Math.round(m), height: Math.round(y) });
    };
    if ((c(Sy(u)), !o.ResizeObserver)) return () => {};
    const f = new o.ResizeObserver(h => {
      const m = () => {
        const y = h[0];
        if (y?.borderBoxSize) {
          const v = y.borderBoxSize[0];
          if (v) {
            c({ width: v.inlineSize, height: v.blockSize });
            return;
          }
        }
        c(Sy(u));
      };
      n.options.useAnimationFrameWithResizeObserver
        ? requestAnimationFrame(m)
        : m();
    });
    return (
      f.observe(u, { box: 'border-box' }),
      () => {
        f.unobserve(u);
      }
    );
  },
  Ey = { passive: !0 },
  xy = typeof window > 'u' ? !0 : 'onscrollend' in window,
  I1 = (n, r) => {
    const u = n.scrollElement;
    if (!u) return;
    const o = n.targetWindow;
    if (!o) return;
    let c = 0;
    const f =
        n.options.useScrollendEvent && xy
          ? () => {}
          : J1(
              o,
              () => {
                r(c, !1);
              },
              n.options.isScrollingResetDelay
            ),
      h = b => () => {
        const { horizontal: p, isRtl: M } = n.options;
        ((c = p ? u.scrollLeft * ((M && -1) || 1) : u.scrollTop), f(), r(c, b));
      },
      m = h(!0),
      y = h(!1);
    u.addEventListener('scroll', m, Ey);
    const v = n.options.useScrollendEvent && xy;
    return (
      v && u.addEventListener('scrollend', y, Ey),
      () => {
        (u.removeEventListener('scroll', m),
          v && u.removeEventListener('scrollend', y));
      }
    );
  },
  P1 = (n, r, u) => {
    if (r?.borderBoxSize) {
      const o = r.borderBoxSize[0];
      if (o)
        return Math.round(o[u.options.horizontal ? 'inlineSize' : 'blockSize']);
    }
    return n[u.options.horizontal ? 'offsetWidth' : 'offsetHeight'];
  },
  eE = (n, { adjustments: r = 0, behavior: u }, o) => {
    var c, f;
    const h = n + r;
    (f = (c = o.scrollElement) == null ? void 0 : c.scrollTo) == null ||
      f.call(c, { [o.options.horizontal ? 'left' : 'top']: h, behavior: u });
  };
class tE {
  constructor(r) {
    ((this.unsubs = []),
      (this.scrollElement = null),
      (this.targetWindow = null),
      (this.isScrolling = !1),
      (this.scrollState = null),
      (this.measurementsCache = []),
      (this.itemSizeCache = new Map()),
      (this.laneAssignments = new Map()),
      (this.pendingMeasuredCacheIndexes = []),
      (this.prevLanes = void 0),
      (this.lanesChangedFlag = !1),
      (this.lanesSettling = !1),
      (this.scrollRect = null),
      (this.scrollOffset = null),
      (this.scrollDirection = null),
      (this.scrollAdjustments = 0),
      (this.elementsCache = new Map()),
      (this.now = () => {
        var u, o, c;
        return (
          ((c =
            (o = (u = this.targetWindow) == null ? void 0 : u.performance) ==
            null
              ? void 0
              : o.now) == null
            ? void 0
            : c.call(o)) ?? Date.now()
        );
      }),
      (this.observer = (() => {
        let u = null;
        const o = () =>
          u ||
          (!this.targetWindow || !this.targetWindow.ResizeObserver
            ? null
            : (u = new this.targetWindow.ResizeObserver(c => {
                c.forEach(f => {
                  const h = () => {
                    const m = f.target,
                      y = this.indexFromElement(m);
                    if (!m.isConnected) {
                      this.observer.unobserve(m);
                      return;
                    }
                    this.shouldMeasureDuringScroll(y) &&
                      this.resizeItem(
                        y,
                        this.options.measureElement(m, f, this)
                      );
                  };
                  this.options.useAnimationFrameWithResizeObserver
                    ? requestAnimationFrame(h)
                    : h();
                });
              })));
        return {
          disconnect: () => {
            var c;
            ((c = o()) == null || c.disconnect(), (u = null));
          },
          observe: c => {
            var f;
            return (f = o()) == null
              ? void 0
              : f.observe(c, { box: 'border-box' });
          },
          unobserve: c => {
            var f;
            return (f = o()) == null ? void 0 : f.unobserve(c);
          },
        };
      })()),
      (this.range = null),
      (this.setOptions = u => {
        (Object.entries(u).forEach(([o, c]) => {
          typeof c > 'u' && delete u[o];
        }),
          (this.options = {
            debug: !1,
            initialOffset: 0,
            overscan: 1,
            paddingStart: 0,
            paddingEnd: 0,
            scrollPaddingStart: 0,
            scrollPaddingEnd: 0,
            horizontal: !1,
            getItemKey: F1,
            rangeExtractor: $1,
            onChange: () => {},
            measureElement: P1,
            initialRect: { width: 0, height: 0 },
            scrollMargin: 0,
            gap: 0,
            indexAttribute: 'data-index',
            initialMeasurementsCache: [],
            lanes: 1,
            isScrollingResetDelay: 150,
            enabled: !0,
            isRtl: !1,
            useScrollendEvent: !1,
            useAnimationFrameWithResizeObserver: !1,
            laneAssignmentMode: 'estimate',
            ...u,
          }));
      }),
      (this.notify = u => {
        var o, c;
        (c = (o = this.options).onChange) == null || c.call(o, this, u);
      }),
      (this.maybeNotify = Fn(
        () => (
          this.calculateRange(),
          [
            this.isScrolling,
            this.range ? this.range.startIndex : null,
            this.range ? this.range.endIndex : null,
          ]
        ),
        u => {
          this.notify(u);
        },
        {
          key: !1,
          debug: () => this.options.debug,
          initialDeps: [
            this.isScrolling,
            this.range ? this.range.startIndex : null,
            this.range ? this.range.endIndex : null,
          ],
        }
      )),
      (this.cleanup = () => {
        (this.unsubs.filter(Boolean).forEach(u => u()),
          (this.unsubs = []),
          this.observer.disconnect(),
          this.rafId != null &&
            this.targetWindow &&
            (this.targetWindow.cancelAnimationFrame(this.rafId),
            (this.rafId = null)),
          (this.scrollState = null),
          (this.scrollElement = null),
          (this.targetWindow = null));
      }),
      (this._didMount = () => () => {
        this.cleanup();
      }),
      (this._willUpdate = () => {
        var u;
        const o = this.options.enabled ? this.options.getScrollElement() : null;
        if (this.scrollElement !== o) {
          if ((this.cleanup(), !o)) {
            this.maybeNotify();
            return;
          }
          ((this.scrollElement = o),
            this.scrollElement && 'ownerDocument' in this.scrollElement
              ? (this.targetWindow =
                  this.scrollElement.ownerDocument.defaultView)
              : (this.targetWindow =
                  ((u = this.scrollElement) == null ? void 0 : u.window) ??
                  null),
            this.elementsCache.forEach(c => {
              this.observer.observe(c);
            }),
            this.unsubs.push(
              this.options.observeElementRect(this, c => {
                ((this.scrollRect = c), this.maybeNotify());
              })
            ),
            this.unsubs.push(
              this.options.observeElementOffset(this, (c, f) => {
                ((this.scrollAdjustments = 0),
                  (this.scrollDirection = f
                    ? this.getScrollOffset() < c
                      ? 'forward'
                      : 'backward'
                    : null),
                  (this.scrollOffset = c),
                  (this.isScrolling = f),
                  this.scrollState && this.scheduleScrollReconcile(),
                  this.maybeNotify());
              })
            ),
            this._scrollToOffset(this.getScrollOffset(), {
              adjustments: void 0,
              behavior: void 0,
            }));
        }
      }),
      (this.rafId = null),
      (this.getSize = () =>
        this.options.enabled
          ? ((this.scrollRect = this.scrollRect ?? this.options.initialRect),
            this.scrollRect[this.options.horizontal ? 'width' : 'height'])
          : ((this.scrollRect = null), 0)),
      (this.getScrollOffset = () =>
        this.options.enabled
          ? ((this.scrollOffset =
              this.scrollOffset ??
              (typeof this.options.initialOffset == 'function'
                ? this.options.initialOffset()
                : this.options.initialOffset)),
            this.scrollOffset)
          : ((this.scrollOffset = null), 0)),
      (this.getFurthestMeasurement = (u, o) => {
        const c = new Map(),
          f = new Map();
        for (let h = o - 1; h >= 0; h--) {
          const m = u[h];
          if (c.has(m.lane)) continue;
          const y = f.get(m.lane);
          if (
            (y == null || m.end > y.end
              ? f.set(m.lane, m)
              : m.end < y.end && c.set(m.lane, !0),
            c.size === this.options.lanes)
          )
            break;
        }
        return f.size === this.options.lanes
          ? Array.from(f.values()).sort((h, m) =>
              h.end === m.end ? h.index - m.index : h.end - m.end
            )[0]
          : void 0;
      }),
      (this.getMeasurementOptions = Fn(
        () => [
          this.options.count,
          this.options.paddingStart,
          this.options.scrollMargin,
          this.options.getItemKey,
          this.options.enabled,
          this.options.lanes,
          this.options.laneAssignmentMode,
        ],
        (u, o, c, f, h, m, y) => (
          this.prevLanes !== void 0 &&
            this.prevLanes !== m &&
            (this.lanesChangedFlag = !0),
          (this.prevLanes = m),
          (this.pendingMeasuredCacheIndexes = []),
          {
            count: u,
            paddingStart: o,
            scrollMargin: c,
            getItemKey: f,
            enabled: h,
            lanes: m,
            laneAssignmentMode: y,
          }
        ),
        { key: !1 }
      )),
      (this.getMeasurements = Fn(
        () => [this.getMeasurementOptions(), this.itemSizeCache],
        (
          {
            count: u,
            paddingStart: o,
            scrollMargin: c,
            getItemKey: f,
            enabled: h,
            lanes: m,
            laneAssignmentMode: y,
          },
          v
        ) => {
          if (!h)
            return (
              (this.measurementsCache = []),
              this.itemSizeCache.clear(),
              this.laneAssignments.clear(),
              []
            );
          if (this.laneAssignments.size > u)
            for (const z of this.laneAssignments.keys())
              z >= u && this.laneAssignments.delete(z);
          (this.lanesChangedFlag &&
            ((this.lanesChangedFlag = !1),
            (this.lanesSettling = !0),
            (this.measurementsCache = []),
            this.itemSizeCache.clear(),
            this.laneAssignments.clear(),
            (this.pendingMeasuredCacheIndexes = [])),
            this.measurementsCache.length === 0 &&
              !this.lanesSettling &&
              ((this.measurementsCache = this.options.initialMeasurementsCache),
              this.measurementsCache.forEach(z => {
                this.itemSizeCache.set(z.key, z.size);
              })));
          const b = this.lanesSettling
            ? 0
            : this.pendingMeasuredCacheIndexes.length > 0
              ? Math.min(...this.pendingMeasuredCacheIndexes)
              : 0;
          ((this.pendingMeasuredCacheIndexes = []),
            this.lanesSettling &&
              this.measurementsCache.length === u &&
              (this.lanesSettling = !1));
          const p = this.measurementsCache.slice(0, b),
            M = new Array(m).fill(void 0);
          for (let z = 0; z < b; z++) {
            const L = p[z];
            L && (M[L.lane] = z);
          }
          for (let z = b; z < u; z++) {
            const L = f(z),
              Y = this.laneAssignments.get(z);
            let j, k;
            const W = y === 'estimate' || v.has(L);
            if (Y !== void 0 && this.options.lanes > 1) {
              j = Y;
              const le = M[j],
                T = le !== void 0 ? p[le] : void 0;
              k = T ? T.end + this.options.gap : o + c;
            } else {
              const le =
                this.options.lanes === 1
                  ? p[z - 1]
                  : this.getFurthestMeasurement(p, z);
              ((k = le ? le.end + this.options.gap : o + c),
                (j = le ? le.lane : z % this.options.lanes),
                this.options.lanes > 1 && W && this.laneAssignments.set(z, j));
            }
            const I = v.get(L),
              J = typeof I == 'number' ? I : this.options.estimateSize(z),
              ce = k + J;
            ((p[z] = { index: z, start: k, size: J, end: ce, key: L, lane: j }),
              (M[j] = z));
          }
          return ((this.measurementsCache = p), p);
        },
        { key: !1, debug: () => this.options.debug }
      )),
      (this.calculateRange = Fn(
        () => [
          this.getMeasurements(),
          this.getSize(),
          this.getScrollOffset(),
          this.options.lanes,
        ],
        (u, o, c, f) =>
          (this.range =
            u.length > 0 && o > 0
              ? lE({ measurements: u, outerSize: o, scrollOffset: c, lanes: f })
              : null),
        { key: !1, debug: () => this.options.debug }
      )),
      (this.getVirtualIndexes = Fn(
        () => {
          let u = null,
            o = null;
          const c = this.calculateRange();
          return (
            c && ((u = c.startIndex), (o = c.endIndex)),
            this.maybeNotify.updateDeps([this.isScrolling, u, o]),
            [
              this.options.rangeExtractor,
              this.options.overscan,
              this.options.count,
              u,
              o,
            ]
          );
        },
        (u, o, c, f, h) =>
          f === null || h === null
            ? []
            : u({ startIndex: f, endIndex: h, overscan: o, count: c }),
        { key: !1, debug: () => this.options.debug }
      )),
      (this.indexFromElement = u => {
        const o = this.options.indexAttribute,
          c = u.getAttribute(o);
        return c
          ? parseInt(c, 10)
          : (console.warn(
              `Missing attribute name '${o}={index}' on measured element.`
            ),
            -1);
      }),
      (this.shouldMeasureDuringScroll = u => {
        var o;
        if (!this.scrollState || this.scrollState.behavior !== 'smooth')
          return !0;
        const c =
          this.scrollState.index ??
          ((o = this.getVirtualItemForOffset(
            this.scrollState.lastTargetOffset
          )) == null
            ? void 0
            : o.index);
        if (c !== void 0 && this.range) {
          const f = Math.max(
              this.options.overscan,
              Math.ceil((this.range.endIndex - this.range.startIndex) / 2)
            ),
            h = Math.max(0, c - f),
            m = Math.min(this.options.count - 1, c + f);
          return u >= h && u <= m;
        }
        return !0;
      }),
      (this.measureElement = u => {
        if (!u) {
          this.elementsCache.forEach((h, m) => {
            h.isConnected ||
              (this.observer.unobserve(h), this.elementsCache.delete(m));
          });
          return;
        }
        const o = this.indexFromElement(u),
          c = this.options.getItemKey(o),
          f = this.elementsCache.get(c);
        (f !== u &&
          (f && this.observer.unobserve(f),
          this.observer.observe(u),
          this.elementsCache.set(c, u)),
          (!this.isScrolling || this.scrollState) &&
            this.shouldMeasureDuringScroll(o) &&
            this.resizeItem(o, this.options.measureElement(u, void 0, this)));
      }),
      (this.resizeItem = (u, o) => {
        var c;
        const f = this.measurementsCache[u];
        if (!f) return;
        const h = this.itemSizeCache.get(f.key) ?? f.size,
          m = o - h;
        m !== 0 &&
          (((c = this.scrollState) == null ? void 0 : c.behavior) !==
            'smooth' &&
            (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0
              ? this.shouldAdjustScrollPositionOnItemSizeChange(f, m, this)
              : f.start < this.getScrollOffset() + this.scrollAdjustments) &&
            this._scrollToOffset(this.getScrollOffset(), {
              adjustments: (this.scrollAdjustments += m),
              behavior: void 0,
            }),
          this.pendingMeasuredCacheIndexes.push(f.index),
          (this.itemSizeCache = new Map(this.itemSizeCache.set(f.key, o))),
          this.notify(!1));
      }),
      (this.getVirtualItems = Fn(
        () => [this.getVirtualIndexes(), this.getMeasurements()],
        (u, o) => {
          const c = [];
          for (let f = 0, h = u.length; f < h; f++) {
            const m = u[f],
              y = o[m];
            c.push(y);
          }
          return c;
        },
        { key: !1, debug: () => this.options.debug }
      )),
      (this.getVirtualItemForOffset = u => {
        const o = this.getMeasurements();
        if (o.length !== 0)
          return by(o[Tv(0, o.length - 1, c => by(o[c]).start, u)]);
      }),
      (this.getMaxScrollOffset = () => {
        if (!this.scrollElement) return 0;
        if ('scrollHeight' in this.scrollElement)
          return this.options.horizontal
            ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth
            : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
        {
          const u = this.scrollElement.document.documentElement;
          return this.options.horizontal
            ? u.scrollWidth - this.scrollElement.innerWidth
            : u.scrollHeight - this.scrollElement.innerHeight;
        }
      }),
      (this.getOffsetForAlignment = (u, o, c = 0) => {
        if (!this.scrollElement) return 0;
        const f = this.getSize(),
          h = this.getScrollOffset();
        (o === 'auto' && (o = u >= h + f ? 'end' : 'start'),
          o === 'center' ? (u += (c - f) / 2) : o === 'end' && (u -= f));
        const m = this.getMaxScrollOffset();
        return Math.max(Math.min(m, u), 0);
      }),
      (this.getOffsetForIndex = (u, o = 'auto') => {
        u = Math.max(0, Math.min(u, this.options.count - 1));
        const c = this.getSize(),
          f = this.getScrollOffset(),
          h = this.measurementsCache[u];
        if (!h) return;
        if (o === 'auto')
          if (h.end >= f + c - this.options.scrollPaddingEnd) o = 'end';
          else if (h.start <= f + this.options.scrollPaddingStart) o = 'start';
          else return [f, o];
        if (o === 'end' && u === this.options.count - 1)
          return [this.getMaxScrollOffset(), o];
        const m =
          o === 'end'
            ? h.end + this.options.scrollPaddingEnd
            : h.start - this.options.scrollPaddingStart;
        return [this.getOffsetForAlignment(m, o, h.size), o];
      }),
      (this.scrollToOffset = (
        u,
        { align: o = 'start', behavior: c = 'auto' } = {}
      ) => {
        const f = this.getOffsetForAlignment(u, o),
          h = this.now();
        ((this.scrollState = {
          index: null,
          align: o,
          behavior: c,
          startedAt: h,
          lastTargetOffset: f,
          stableFrames: 0,
        }),
          this._scrollToOffset(f, { adjustments: void 0, behavior: c }),
          this.scheduleScrollReconcile());
      }),
      (this.scrollToIndex = (
        u,
        { align: o = 'auto', behavior: c = 'auto' } = {}
      ) => {
        u = Math.max(0, Math.min(u, this.options.count - 1));
        const f = this.getOffsetForIndex(u, o);
        if (!f) return;
        const [h, m] = f,
          y = this.now();
        ((this.scrollState = {
          index: u,
          align: m,
          behavior: c,
          startedAt: y,
          lastTargetOffset: h,
          stableFrames: 0,
        }),
          this._scrollToOffset(h, { adjustments: void 0, behavior: c }),
          this.scheduleScrollReconcile());
      }),
      (this.scrollBy = (u, { behavior: o = 'auto' } = {}) => {
        const c = this.getScrollOffset() + u,
          f = this.now();
        ((this.scrollState = {
          index: null,
          align: 'start',
          behavior: o,
          startedAt: f,
          lastTargetOffset: c,
          stableFrames: 0,
        }),
          this._scrollToOffset(c, { adjustments: void 0, behavior: o }),
          this.scheduleScrollReconcile());
      }),
      (this.getTotalSize = () => {
        var u;
        const o = this.getMeasurements();
        let c;
        if (o.length === 0) c = this.options.paddingStart;
        else if (this.options.lanes === 1)
          c = ((u = o[o.length - 1]) == null ? void 0 : u.end) ?? 0;
        else {
          const f = Array(this.options.lanes).fill(null);
          let h = o.length - 1;
          for (; h >= 0 && f.some(m => m === null); ) {
            const m = o[h];
            (f[m.lane] === null && (f[m.lane] = m.end), h--);
          }
          c = Math.max(...f.filter(m => m !== null));
        }
        return Math.max(
          c - this.options.scrollMargin + this.options.paddingEnd,
          0
        );
      }),
      (this._scrollToOffset = (u, { adjustments: o, behavior: c }) => {
        this.options.scrollToFn(u, { behavior: c, adjustments: o }, this);
      }),
      (this.measure = () => {
        ((this.itemSizeCache = new Map()),
          (this.laneAssignments = new Map()),
          this.notify(!1));
      }),
      this.setOptions(r));
  }
  scheduleScrollReconcile() {
    if (!this.targetWindow) {
      this.scrollState = null;
      return;
    }
    this.rafId == null &&
      (this.rafId = this.targetWindow.requestAnimationFrame(() => {
        ((this.rafId = null), this.reconcileScroll());
      }));
  }
  reconcileScroll() {
    if (!this.scrollState || !this.scrollElement) return;
    if (this.now() - this.scrollState.startedAt > 5e3) {
      this.scrollState = null;
      return;
    }
    const o =
        this.scrollState.index != null
          ? this.getOffsetForIndex(
              this.scrollState.index,
              this.scrollState.align
            )
          : void 0,
      c = o ? o[0] : this.scrollState.lastTargetOffset,
      f = 1,
      h = c !== this.scrollState.lastTargetOffset;
    if (!h && K1(c, this.getScrollOffset())) {
      if (
        (this.scrollState.stableFrames++, this.scrollState.stableFrames >= f)
      ) {
        this.scrollState = null;
        return;
      }
    } else
      ((this.scrollState.stableFrames = 0),
        h &&
          ((this.scrollState.lastTargetOffset = c),
          (this.scrollState.behavior = 'auto'),
          this._scrollToOffset(c, { adjustments: void 0, behavior: 'auto' })));
    this.scheduleScrollReconcile();
  }
}
const Tv = (n, r, u, o) => {
  for (; n <= r; ) {
    const c = ((n + r) / 2) | 0,
      f = u(c);
    if (f < o) n = c + 1;
    else if (f > o) r = c - 1;
    else return c;
  }
  return n > 0 ? n - 1 : 0;
};
function lE({ measurements: n, outerSize: r, scrollOffset: u, lanes: o }) {
  const c = n.length - 1,
    f = y => n[y].start;
  if (n.length <= o) return { startIndex: 0, endIndex: c };
  let h = Tv(0, c, f, u),
    m = h;
  if (o === 1) for (; m < c && n[m].end < u + r; ) m++;
  else if (o > 1) {
    const y = Array(o).fill(0);
    for (; m < c && y.some(b => b < u + r); ) {
      const b = n[m];
      ((y[b.lane] = b.end), m++);
    }
    const v = Array(o).fill(u + r);
    for (; h >= 0 && v.some(b => b >= u); ) {
      const b = n[h];
      ((v[b.lane] = b.start), h--);
    }
    ((h = Math.max(0, h - (h % o))), (m = Math.min(c, m + (o - 1 - (m % o)))));
  }
  return { startIndex: h, endIndex: m };
}
const Ry = typeof document < 'u' ? w.useLayoutEffect : w.useEffect;
function aE({ useFlushSync: n = !0, ...r }) {
  const u = w.useReducer(() => ({}), {})[1],
    o = {
      ...r,
      onChange: (f, h) => {
        var m;
        (n && h ? Z1.flushSync(u) : u(),
          (m = r.onChange) == null || m.call(r, f, h));
      },
    },
    [c] = w.useState(() => new tE(o));
  return (
    c.setOptions(o),
    Ry(() => c._didMount(), []),
    Ry(() => c._willUpdate()),
    c
  );
}
function nE(n) {
  return aE({
    observeElementRect: W1,
    observeElementOffset: I1,
    scrollToFn: eE,
    ...n,
  });
}
function Mv(n) {
  var r,
    u,
    o = '';
  if (typeof n == 'string' || typeof n == 'number') o += n;
  else if (typeof n == 'object')
    if (Array.isArray(n)) {
      var c = n.length;
      for (r = 0; r < c; r++)
        n[r] && (u = Mv(n[r])) && (o && (o += ' '), (o += u));
    } else for (u in n) n[u] && (o && (o += ' '), (o += u));
  return o;
}
function Av() {
  for (var n, r, u = 0, o = '', c = arguments.length; u < c; u++)
    (n = arguments[u]) && (r = Mv(n)) && (o && (o += ' '), (o += r));
  return o;
}
const iE = (n, r) => {
    const u = new Array(n.length + r.length);
    for (let o = 0; o < n.length; o++) u[o] = n[o];
    for (let o = 0; o < r.length; o++) u[n.length + o] = r[o];
    return u;
  },
  rE = (n, r) => ({ classGroupId: n, validator: r }),
  Cv = (n = new Map(), r = null, u) => ({
    nextPart: n,
    validators: r,
    classGroupId: u,
  }),
  Xu = '-',
  wy = [],
  uE = 'arbitrary..',
  oE = n => {
    const r = cE(n),
      { conflictingClassGroups: u, conflictingClassGroupModifiers: o } = n;
    return {
      getClassGroupId: h => {
        if (h.startsWith('[') && h.endsWith(']')) return sE(h);
        const m = h.split(Xu),
          y = m[0] === '' && m.length > 1 ? 1 : 0;
        return _v(m, y, r);
      },
      getConflictingClassGroupIds: (h, m) => {
        if (m) {
          const y = o[h],
            v = u[h];
          return y ? (v ? iE(v, y) : y) : v || wy;
        }
        return u[h] || wy;
      },
    };
  },
  _v = (n, r, u) => {
    if (n.length - r === 0) return u.classGroupId;
    const c = n[r],
      f = u.nextPart.get(c);
    if (f) {
      const v = _v(n, r + 1, f);
      if (v) return v;
    }
    const h = u.validators;
    if (h === null) return;
    const m = r === 0 ? n.join(Xu) : n.slice(r).join(Xu),
      y = h.length;
    for (let v = 0; v < y; v++) {
      const b = h[v];
      if (b.validator(m)) return b.classGroupId;
    }
  },
  sE = n =>
    n.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const r = n.slice(1, -1),
            u = r.indexOf(':'),
            o = r.slice(0, u);
          return o ? uE + o : void 0;
        })(),
  cE = n => {
    const { theme: r, classGroups: u } = n;
    return fE(u, r);
  },
  fE = (n, r) => {
    const u = Cv();
    for (const o in n) {
      const c = n[o];
      Xc(c, u, o, r);
    }
    return u;
  },
  Xc = (n, r, u, o) => {
    const c = n.length;
    for (let f = 0; f < c; f++) {
      const h = n[f];
      dE(h, r, u, o);
    }
  },
  dE = (n, r, u, o) => {
    if (typeof n == 'string') {
      hE(n, r, u);
      return;
    }
    if (typeof n == 'function') {
      mE(n, r, u, o);
      return;
    }
    yE(n, r, u, o);
  },
  hE = (n, r, u) => {
    const o = n === '' ? r : Ov(r, n);
    o.classGroupId = u;
  },
  mE = (n, r, u, o) => {
    if (vE(n)) {
      Xc(n(o), r, u, o);
      return;
    }
    (r.validators === null && (r.validators = []), r.validators.push(rE(u, n)));
  },
  yE = (n, r, u, o) => {
    const c = Object.entries(n),
      f = c.length;
    for (let h = 0; h < f; h++) {
      const [m, y] = c[h];
      Xc(y, Ov(r, m), u, o);
    }
  },
  Ov = (n, r) => {
    let u = n;
    const o = r.split(Xu),
      c = o.length;
    for (let f = 0; f < c; f++) {
      const h = o[f];
      let m = u.nextPart.get(h);
      (m || ((m = Cv()), u.nextPart.set(h, m)), (u = m));
    }
    return u;
  },
  vE = n => 'isThemeGetter' in n && n.isThemeGetter === !0,
  gE = n => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let r = 0,
      u = Object.create(null),
      o = Object.create(null);
    const c = (f, h) => {
      ((u[f] = h), r++, r > n && ((r = 0), (o = u), (u = Object.create(null))));
    };
    return {
      get(f) {
        let h = u[f];
        if (h !== void 0) return h;
        if ((h = o[f]) !== void 0) return (c(f, h), h);
      },
      set(f, h) {
        f in u ? (u[f] = h) : c(f, h);
      },
    };
  },
  Mc = '!',
  zy = ':',
  pE = [],
  Ty = (n, r, u, o, c) => ({
    modifiers: n,
    hasImportantModifier: r,
    baseClassName: u,
    maybePostfixModifierPosition: o,
    isExternal: c,
  }),
  bE = n => {
    const { prefix: r, experimentalParseClassName: u } = n;
    let o = c => {
      const f = [];
      let h = 0,
        m = 0,
        y = 0,
        v;
      const b = c.length;
      for (let Y = 0; Y < b; Y++) {
        const j = c[Y];
        if (h === 0 && m === 0) {
          if (j === zy) {
            (f.push(c.slice(y, Y)), (y = Y + 1));
            continue;
          }
          if (j === '/') {
            v = Y;
            continue;
          }
        }
        j === '[' ? h++ : j === ']' ? h-- : j === '(' ? m++ : j === ')' && m--;
      }
      const p = f.length === 0 ? c : c.slice(y);
      let M = p,
        z = !1;
      p.endsWith(Mc)
        ? ((M = p.slice(0, -1)), (z = !0))
        : p.startsWith(Mc) && ((M = p.slice(1)), (z = !0));
      const L = v && v > y ? v - y : void 0;
      return Ty(f, z, M, L);
    };
    if (r) {
      const c = r + zy,
        f = o;
      o = h =>
        h.startsWith(c) ? f(h.slice(c.length)) : Ty(pE, !1, h, void 0, !0);
    }
    if (u) {
      const c = o;
      o = f => u({ className: f, parseClassName: c });
    }
    return o;
  },
  SE = n => {
    const r = new Map();
    return (
      n.orderSensitiveModifiers.forEach((u, o) => {
        r.set(u, 1e6 + o);
      }),
      u => {
        const o = [];
        let c = [];
        for (let f = 0; f < u.length; f++) {
          const h = u[f],
            m = h[0] === '[',
            y = r.has(h);
          m || y
            ? (c.length > 0 && (c.sort(), o.push(...c), (c = [])), o.push(h))
            : c.push(h);
        }
        return (c.length > 0 && (c.sort(), o.push(...c)), o);
      }
    );
  },
  EE = n => ({
    cache: gE(n.cacheSize),
    parseClassName: bE(n),
    sortModifiers: SE(n),
    ...oE(n),
  }),
  xE = /\s+/,
  RE = (n, r) => {
    const {
        parseClassName: u,
        getClassGroupId: o,
        getConflictingClassGroupIds: c,
        sortModifiers: f,
      } = r,
      h = [],
      m = n.trim().split(xE);
    let y = '';
    for (let v = m.length - 1; v >= 0; v -= 1) {
      const b = m[v],
        {
          isExternal: p,
          modifiers: M,
          hasImportantModifier: z,
          baseClassName: L,
          maybePostfixModifierPosition: Y,
        } = u(b);
      if (p) {
        y = b + (y.length > 0 ? ' ' + y : y);
        continue;
      }
      let j = !!Y,
        k = o(j ? L.substring(0, Y) : L);
      if (!k) {
        if (!j) {
          y = b + (y.length > 0 ? ' ' + y : y);
          continue;
        }
        if (((k = o(L)), !k)) {
          y = b + (y.length > 0 ? ' ' + y : y);
          continue;
        }
        j = !1;
      }
      const W = M.length === 0 ? '' : M.length === 1 ? M[0] : f(M).join(':'),
        I = z ? W + Mc : W,
        J = I + k;
      if (h.indexOf(J) > -1) continue;
      h.push(J);
      const ce = c(k, j);
      for (let le = 0; le < ce.length; ++le) {
        const T = ce[le];
        h.push(I + T);
      }
      y = b + (y.length > 0 ? ' ' + y : y);
    }
    return y;
  },
  wE = (...n) => {
    let r = 0,
      u,
      o,
      c = '';
    for (; r < n.length; )
      (u = n[r++]) && (o = Dv(u)) && (c && (c += ' '), (c += o));
    return c;
  },
  Dv = n => {
    if (typeof n == 'string') return n;
    let r,
      u = '';
    for (let o = 0; o < n.length; o++)
      n[o] && (r = Dv(n[o])) && (u && (u += ' '), (u += r));
    return u;
  },
  zE = (n, ...r) => {
    let u, o, c, f;
    const h = y => {
        const v = r.reduce((b, p) => p(b), n());
        return (
          (u = EE(v)),
          (o = u.cache.get),
          (c = u.cache.set),
          (f = m),
          m(y)
        );
      },
      m = y => {
        const v = o(y);
        if (v) return v;
        const b = RE(y, u);
        return (c(y, b), b);
      };
    return ((f = h), (...y) => f(wE(...y)));
  },
  TE = [],
  xt = n => {
    const r = u => u[n] || TE;
    return ((r.isThemeGetter = !0), r);
  },
  Nv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Uv = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  ME = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  AE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  CE =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  _E = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  OE = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  DE =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ca = n => ME.test(n),
  Ae = n => !!n && !Number.isNaN(Number(n)),
  _a = n => !!n && Number.isInteger(Number(n)),
  pc = n => n.endsWith('%') && Ae(n.slice(0, -1)),
  ta = n => AE.test(n),
  Lv = () => !0,
  NE = n => CE.test(n) && !_E.test(n),
  Qc = () => !1,
  UE = n => OE.test(n),
  LE = n => DE.test(n),
  jE = n => !de(n) && !he(n),
  HE = n => La(n, Bv, Qc),
  de = n => Nv.test(n),
  on = n => La(n, qv, NE),
  My = n => La(n, QE, Ae),
  BE = n => La(n, Gv, Lv),
  qE = n => La(n, Yv, Qc),
  Ay = n => La(n, jv, Qc),
  YE = n => La(n, Hv, LE),
  Lu = n => La(n, Vv, UE),
  he = n => Uv.test(n),
  er = n => hn(n, qv),
  GE = n => hn(n, Yv),
  Cy = n => hn(n, jv),
  VE = n => hn(n, Bv),
  kE = n => hn(n, Hv),
  ju = n => hn(n, Vv, !0),
  XE = n => hn(n, Gv, !0),
  La = (n, r, u) => {
    const o = Nv.exec(n);
    return o ? (o[1] ? r(o[1]) : u(o[2])) : !1;
  },
  hn = (n, r, u = !1) => {
    const o = Uv.exec(n);
    return o ? (o[1] ? r(o[1]) : u) : !1;
  },
  jv = n => n === 'position' || n === 'percentage',
  Hv = n => n === 'image' || n === 'url',
  Bv = n => n === 'length' || n === 'size' || n === 'bg-size',
  qv = n => n === 'length',
  QE = n => n === 'number',
  Yv = n => n === 'family-name',
  Gv = n => n === 'number' || n === 'weight',
  Vv = n => n === 'shadow',
  ZE = () => {
    const n = xt('color'),
      r = xt('font'),
      u = xt('text'),
      o = xt('font-weight'),
      c = xt('tracking'),
      f = xt('leading'),
      h = xt('breakpoint'),
      m = xt('container'),
      y = xt('spacing'),
      v = xt('radius'),
      b = xt('shadow'),
      p = xt('inset-shadow'),
      M = xt('text-shadow'),
      z = xt('drop-shadow'),
      L = xt('blur'),
      Y = xt('perspective'),
      j = xt('aspect'),
      k = xt('ease'),
      W = xt('animate'),
      I = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      J = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      ce = () => [...J(), he, de],
      le = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      T = () => ['auto', 'contain', 'none'],
      Q = () => [he, de, y],
      re = () => [Ca, 'full', 'auto', ...Q()],
      ke = () => [_a, 'none', 'subgrid', he, de],
      xe = () => ['auto', { span: ['full', _a, he, de] }, _a, he, de],
      Oe = () => [_a, 'auto', he, de],
      Ye = () => ['auto', 'min', 'max', 'fr', he, de],
      Pe = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      Se = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      _ = () => ['auto', ...Q()],
      X = () => [
        Ca,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...Q(),
      ],
      ee = () => [
        Ca,
        'screen',
        'full',
        'dvw',
        'lvw',
        'svw',
        'min',
        'max',
        'fit',
        ...Q(),
      ],
      Ee = () => [
        Ca,
        'screen',
        'full',
        'lh',
        'dvh',
        'lvh',
        'svh',
        'min',
        'max',
        'fit',
        ...Q(),
      ],
      K = () => [n, he, de],
      x = () => [...J(), Cy, Ay, { position: [he, de] }],
      B = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      F = () => ['auto', 'cover', 'contain', VE, HE, { size: [he, de] }],
      te = () => [pc, er, on],
      ae = () => ['', 'none', 'full', v, he, de],
      fe = () => ['', Ae, er, on],
      Me = () => ['solid', 'dashed', 'dotted', 'double'],
      nt = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      we = () => [Ae, pc, Cy, Ay],
      wl = () => ['', 'none', L, he, de],
      hl = () => ['none', Ae, he, de],
      et = () => ['none', Ae, he, de],
      Vt = () => [Ae, he, de],
      Dt = () => [Ca, 'full', ...Q()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [ta],
        breakpoint: [ta],
        color: [Lv],
        container: [ta],
        'drop-shadow': [ta],
        ease: ['in', 'out', 'in-out'],
        font: [jE],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [ta],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [ta],
        shadow: [ta],
        spacing: ['px', Ae],
        text: [ta],
        'text-shadow': [ta],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Ca, de, he, j] }],
        container: ['container'],
        columns: [{ columns: [Ae, de, he, m] }],
        'break-after': [{ 'break-after': I() }],
        'break-before': [{ 'break-before': I() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: ce() }],
        overflow: [{ overflow: le() }],
        'overflow-x': [{ 'overflow-x': le() }],
        'overflow-y': [{ 'overflow-y': le() }],
        overscroll: [{ overscroll: T() }],
        'overscroll-x': [{ 'overscroll-x': T() }],
        'overscroll-y': [{ 'overscroll-y': T() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: re() }],
        'inset-x': [{ 'inset-x': re() }],
        'inset-y': [{ 'inset-y': re() }],
        start: [{ 'inset-s': re(), start: re() }],
        end: [{ 'inset-e': re(), end: re() }],
        'inset-bs': [{ 'inset-bs': re() }],
        'inset-be': [{ 'inset-be': re() }],
        top: [{ top: re() }],
        right: [{ right: re() }],
        bottom: [{ bottom: re() }],
        left: [{ left: re() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [_a, 'auto', he, de] }],
        basis: [{ basis: [Ca, 'full', 'auto', m, ...Q()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [Ae, Ca, 'auto', 'initial', 'none', de] }],
        grow: [{ grow: ['', Ae, he, de] }],
        shrink: [{ shrink: ['', Ae, he, de] }],
        order: [{ order: [_a, 'first', 'last', 'none', he, de] }],
        'grid-cols': [{ 'grid-cols': ke() }],
        'col-start-end': [{ col: xe() }],
        'col-start': [{ 'col-start': Oe() }],
        'col-end': [{ 'col-end': Oe() }],
        'grid-rows': [{ 'grid-rows': ke() }],
        'row-start-end': [{ row: xe() }],
        'row-start': [{ 'row-start': Oe() }],
        'row-end': [{ 'row-end': Oe() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': Ye() }],
        'auto-rows': [{ 'auto-rows': Ye() }],
        gap: [{ gap: Q() }],
        'gap-x': [{ 'gap-x': Q() }],
        'gap-y': [{ 'gap-y': Q() }],
        'justify-content': [{ justify: [...Pe(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...Se(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...Se()] }],
        'align-content': [{ content: ['normal', ...Pe()] }],
        'align-items': [{ items: [...Se(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...Se(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': Pe() }],
        'place-items': [{ 'place-items': [...Se(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...Se()] }],
        p: [{ p: Q() }],
        px: [{ px: Q() }],
        py: [{ py: Q() }],
        ps: [{ ps: Q() }],
        pe: [{ pe: Q() }],
        pbs: [{ pbs: Q() }],
        pbe: [{ pbe: Q() }],
        pt: [{ pt: Q() }],
        pr: [{ pr: Q() }],
        pb: [{ pb: Q() }],
        pl: [{ pl: Q() }],
        m: [{ m: _() }],
        mx: [{ mx: _() }],
        my: [{ my: _() }],
        ms: [{ ms: _() }],
        me: [{ me: _() }],
        mbs: [{ mbs: _() }],
        mbe: [{ mbe: _() }],
        mt: [{ mt: _() }],
        mr: [{ mr: _() }],
        mb: [{ mb: _() }],
        ml: [{ ml: _() }],
        'space-x': [{ 'space-x': Q() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': Q() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: X() }],
        'inline-size': [{ inline: ['auto', ...ee()] }],
        'min-inline-size': [{ 'min-inline': ['auto', ...ee()] }],
        'max-inline-size': [{ 'max-inline': ['none', ...ee()] }],
        'block-size': [{ block: ['auto', ...Ee()] }],
        'min-block-size': [{ 'min-block': ['auto', ...Ee()] }],
        'max-block-size': [{ 'max-block': ['none', ...Ee()] }],
        w: [{ w: [m, 'screen', ...X()] }],
        'min-w': [{ 'min-w': [m, 'screen', 'none', ...X()] }],
        'max-w': [
          { 'max-w': [m, 'screen', 'none', 'prose', { screen: [h] }, ...X()] },
        ],
        h: [{ h: ['screen', 'lh', ...X()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...X()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...X()] }],
        'font-size': [{ text: ['base', u, er, on] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [o, XE, BE] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              pc,
              de,
            ],
          },
        ],
        'font-family': [{ font: [GE, qE, r] }],
        'font-features': [{ 'font-features': [de] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [c, he, de] }],
        'line-clamp': [{ 'line-clamp': [Ae, 'none', he, My] }],
        leading: [{ leading: [f, ...Q()] }],
        'list-image': [{ 'list-image': ['none', he, de] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', he, de] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: K() }],
        'text-color': [{ text: K() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...Me(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [Ae, 'from-font', 'auto', he, on] },
        ],
        'text-decoration-color': [{ decoration: K() }],
        'underline-offset': [{ 'underline-offset': [Ae, 'auto', he, de] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: Q() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              he,
              de,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', he, de] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: x() }],
        'bg-repeat': [{ bg: B() }],
        'bg-size': [{ bg: F() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  _a,
                  he,
                  de,
                ],
                radial: ['', he, de],
                conic: [_a, he, de],
              },
              kE,
              YE,
            ],
          },
        ],
        'bg-color': [{ bg: K() }],
        'gradient-from-pos': [{ from: te() }],
        'gradient-via-pos': [{ via: te() }],
        'gradient-to-pos': [{ to: te() }],
        'gradient-from': [{ from: K() }],
        'gradient-via': [{ via: K() }],
        'gradient-to': [{ to: K() }],
        rounded: [{ rounded: ae() }],
        'rounded-s': [{ 'rounded-s': ae() }],
        'rounded-e': [{ 'rounded-e': ae() }],
        'rounded-t': [{ 'rounded-t': ae() }],
        'rounded-r': [{ 'rounded-r': ae() }],
        'rounded-b': [{ 'rounded-b': ae() }],
        'rounded-l': [{ 'rounded-l': ae() }],
        'rounded-ss': [{ 'rounded-ss': ae() }],
        'rounded-se': [{ 'rounded-se': ae() }],
        'rounded-ee': [{ 'rounded-ee': ae() }],
        'rounded-es': [{ 'rounded-es': ae() }],
        'rounded-tl': [{ 'rounded-tl': ae() }],
        'rounded-tr': [{ 'rounded-tr': ae() }],
        'rounded-br': [{ 'rounded-br': ae() }],
        'rounded-bl': [{ 'rounded-bl': ae() }],
        'border-w': [{ border: fe() }],
        'border-w-x': [{ 'border-x': fe() }],
        'border-w-y': [{ 'border-y': fe() }],
        'border-w-s': [{ 'border-s': fe() }],
        'border-w-e': [{ 'border-e': fe() }],
        'border-w-bs': [{ 'border-bs': fe() }],
        'border-w-be': [{ 'border-be': fe() }],
        'border-w-t': [{ 'border-t': fe() }],
        'border-w-r': [{ 'border-r': fe() }],
        'border-w-b': [{ 'border-b': fe() }],
        'border-w-l': [{ 'border-l': fe() }],
        'divide-x': [{ 'divide-x': fe() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': fe() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...Me(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...Me(), 'hidden', 'none'] }],
        'border-color': [{ border: K() }],
        'border-color-x': [{ 'border-x': K() }],
        'border-color-y': [{ 'border-y': K() }],
        'border-color-s': [{ 'border-s': K() }],
        'border-color-e': [{ 'border-e': K() }],
        'border-color-bs': [{ 'border-bs': K() }],
        'border-color-be': [{ 'border-be': K() }],
        'border-color-t': [{ 'border-t': K() }],
        'border-color-r': [{ 'border-r': K() }],
        'border-color-b': [{ 'border-b': K() }],
        'border-color-l': [{ 'border-l': K() }],
        'divide-color': [{ divide: K() }],
        'outline-style': [{ outline: [...Me(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [Ae, he, de] }],
        'outline-w': [{ outline: ['', Ae, er, on] }],
        'outline-color': [{ outline: K() }],
        shadow: [{ shadow: ['', 'none', b, ju, Lu] }],
        'shadow-color': [{ shadow: K() }],
        'inset-shadow': [{ 'inset-shadow': ['none', p, ju, Lu] }],
        'inset-shadow-color': [{ 'inset-shadow': K() }],
        'ring-w': [{ ring: fe() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: K() }],
        'ring-offset-w': [{ 'ring-offset': [Ae, on] }],
        'ring-offset-color': [{ 'ring-offset': K() }],
        'inset-ring-w': [{ 'inset-ring': fe() }],
        'inset-ring-color': [{ 'inset-ring': K() }],
        'text-shadow': [{ 'text-shadow': ['none', M, ju, Lu] }],
        'text-shadow-color': [{ 'text-shadow': K() }],
        opacity: [{ opacity: [Ae, he, de] }],
        'mix-blend': [
          { 'mix-blend': [...nt(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': nt() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [Ae] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': we() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': we() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': K() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': K() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': we() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': we() }],
        'mask-image-t-from-color': [{ 'mask-t-from': K() }],
        'mask-image-t-to-color': [{ 'mask-t-to': K() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': we() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': we() }],
        'mask-image-r-from-color': [{ 'mask-r-from': K() }],
        'mask-image-r-to-color': [{ 'mask-r-to': K() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': we() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': we() }],
        'mask-image-b-from-color': [{ 'mask-b-from': K() }],
        'mask-image-b-to-color': [{ 'mask-b-to': K() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': we() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': we() }],
        'mask-image-l-from-color': [{ 'mask-l-from': K() }],
        'mask-image-l-to-color': [{ 'mask-l-to': K() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': we() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': we() }],
        'mask-image-x-from-color': [{ 'mask-x-from': K() }],
        'mask-image-x-to-color': [{ 'mask-x-to': K() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': we() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': we() }],
        'mask-image-y-from-color': [{ 'mask-y-from': K() }],
        'mask-image-y-to-color': [{ 'mask-y-to': K() }],
        'mask-image-radial': [{ 'mask-radial': [he, de] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': we() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': we() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': K() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': K() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': J() }],
        'mask-image-conic-pos': [{ 'mask-conic': [Ae] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': we() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': we() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': K() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': K() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: x() }],
        'mask-repeat': [{ mask: B() }],
        'mask-size': [{ mask: F() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', he, de] }],
        filter: [{ filter: ['', 'none', he, de] }],
        blur: [{ blur: wl() }],
        brightness: [{ brightness: [Ae, he, de] }],
        contrast: [{ contrast: [Ae, he, de] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', z, ju, Lu] }],
        'drop-shadow-color': [{ 'drop-shadow': K() }],
        grayscale: [{ grayscale: ['', Ae, he, de] }],
        'hue-rotate': [{ 'hue-rotate': [Ae, he, de] }],
        invert: [{ invert: ['', Ae, he, de] }],
        saturate: [{ saturate: [Ae, he, de] }],
        sepia: [{ sepia: ['', Ae, he, de] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', he, de] }],
        'backdrop-blur': [{ 'backdrop-blur': wl() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [Ae, he, de] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [Ae, he, de] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', Ae, he, de] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [Ae, he, de] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', Ae, he, de] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [Ae, he, de] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [Ae, he, de] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', Ae, he, de] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': Q() }],
        'border-spacing-x': [{ 'border-spacing-x': Q() }],
        'border-spacing-y': [{ 'border-spacing-y': Q() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              he,
              de,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [Ae, 'initial', he, de] }],
        ease: [{ ease: ['linear', 'initial', k, he, de] }],
        delay: [{ delay: [Ae, he, de] }],
        animate: [{ animate: ['none', W, he, de] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [Y, he, de] }],
        'perspective-origin': [{ 'perspective-origin': ce() }],
        rotate: [{ rotate: hl() }],
        'rotate-x': [{ 'rotate-x': hl() }],
        'rotate-y': [{ 'rotate-y': hl() }],
        'rotate-z': [{ 'rotate-z': hl() }],
        scale: [{ scale: et() }],
        'scale-x': [{ 'scale-x': et() }],
        'scale-y': [{ 'scale-y': et() }],
        'scale-z': [{ 'scale-z': et() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: Vt() }],
        'skew-x': [{ 'skew-x': Vt() }],
        'skew-y': [{ 'skew-y': Vt() }],
        transform: [{ transform: [he, de, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: ce() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: Dt() }],
        'translate-x': [{ 'translate-x': Dt() }],
        'translate-y': [{ 'translate-y': Dt() }],
        'translate-z': [{ 'translate-z': Dt() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: K() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: K() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              he,
              de,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': Q() }],
        'scroll-mx': [{ 'scroll-mx': Q() }],
        'scroll-my': [{ 'scroll-my': Q() }],
        'scroll-ms': [{ 'scroll-ms': Q() }],
        'scroll-me': [{ 'scroll-me': Q() }],
        'scroll-mbs': [{ 'scroll-mbs': Q() }],
        'scroll-mbe': [{ 'scroll-mbe': Q() }],
        'scroll-mt': [{ 'scroll-mt': Q() }],
        'scroll-mr': [{ 'scroll-mr': Q() }],
        'scroll-mb': [{ 'scroll-mb': Q() }],
        'scroll-ml': [{ 'scroll-ml': Q() }],
        'scroll-p': [{ 'scroll-p': Q() }],
        'scroll-px': [{ 'scroll-px': Q() }],
        'scroll-py': [{ 'scroll-py': Q() }],
        'scroll-ps': [{ 'scroll-ps': Q() }],
        'scroll-pe': [{ 'scroll-pe': Q() }],
        'scroll-pbs': [{ 'scroll-pbs': Q() }],
        'scroll-pbe': [{ 'scroll-pbe': Q() }],
        'scroll-pt': [{ 'scroll-pt': Q() }],
        'scroll-pr': [{ 'scroll-pr': Q() }],
        'scroll-pb': [{ 'scroll-pb': Q() }],
        'scroll-pl': [{ 'scroll-pl': Q() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          {
            'will-change': ['auto', 'scroll', 'contents', 'transform', he, de],
          },
        ],
        fill: [{ fill: ['none', ...K()] }],
        'stroke-w': [{ stroke: [Ae, er, on, My] }],
        stroke: [{ stroke: ['none', ...K()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'inset-bs',
          'inset-be',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pbs', 'pbe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mbs', 'mbe', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-bs',
          'border-w-be',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-bs',
          'border-color-be',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mbs',
          'scroll-mbe',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pbs',
          'scroll-pbe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  KE = zE(ZE);
function cr(...n) {
  return KE(Av(n));
}
function JE({ message: n }) {
  const r = n.role === 'user',
    u = n.status === 'error';
  return ie.jsx('div', {
    className: cr('flex w-full', r ? 'justify-end' : 'justify-start'),
    children: ie.jsx('div', {
      className: cr(
        'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words',
        r ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900',
        u && 'bg-red-100 text-red-900 border border-red-300',
        n.status === 'pending' && 'opacity-60'
      ),
      'data-status': n.status,
      'data-role': n.role,
      children: n.content || (n.status === 'streaming' ? ' ' : ''),
    }),
  });
}
function FE() {
  return ie.jsxs('div', {
    className: 'flex items-center gap-1 px-3 py-2',
    'aria-label': 'Assistant is typing',
    children: [
      ie.jsx('span', {
        className:
          'h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]',
      }),
      ie.jsx('span', {
        className:
          'h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]',
      }),
      ie.jsx('span', {
        className: 'h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400',
      }),
    ],
  });
}
function $E() {
  const n = Ua(f => f.messages),
    r = Ua(f => f.streamingId),
    u = w.useRef(null),
    o = nE({
      count: n.length,
      getScrollElement: () => u.current,
      estimateSize: () => 64,
      overscan: 6,
    });
  w.useEffect(() => {
    const f = u.current;
    if (!f) return;
    f.scrollHeight - f.scrollTop - f.clientHeight < 200 &&
      (f.scrollTop = f.scrollHeight);
  }, [n, r]);
  const c = r !== null && n.find(f => f.id === r)?.content === '';
  return ie.jsxs('div', {
    className: 'flex h-full flex-col',
    children: [
      ie.jsxs('div', {
        ref: u,
        className: 'flex-1 overflow-y-auto',
        children: [
          ie.jsx('div', {
            style: {
              height: o.getTotalSize(),
              width: '100%',
              position: 'relative',
            },
            children: o.getVirtualItems().map(f => {
              const h = n[f.index];
              return h
                ? ie.jsx(
                    'div',
                    {
                      'data-index': f.index,
                      ref: o.measureElement,
                      style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${f.start}px)`,
                      },
                      className: 'px-3 py-1',
                      children: ie.jsx(JE, { message: h }),
                    },
                    f.key
                  )
                : null;
            }),
          }),
          c && ie.jsx(FE, {}),
        ],
      }),
      ie.jsx('div', {
        role: 'log',
        'aria-live': 'polite',
        'aria-atomic': 'false',
        className: 'sr-only',
        'data-testid': 'chat-live-region',
        children: n
          .filter(f => f.role === 'assistant' && f.status === 'final')
          .slice(-1)
          .map(f => ie.jsx('p', { children: f.content }, f.id)),
      }),
    ],
  });
}
const _y = n => (typeof n == 'boolean' ? `${n}` : n === 0 ? '0' : n),
  Oy = Av,
  WE = (n, r) => u => {
    var o;
    if (r?.variants == null) return Oy(n, u?.class, u?.className);
    const { variants: c, defaultVariants: f } = r,
      h = Object.keys(c).map(v => {
        const b = u?.[v],
          p = f?.[v];
        if (b === null) return null;
        const M = _y(b) || _y(p);
        return c[v][M];
      }),
      m =
        u &&
        Object.entries(u).reduce((v, b) => {
          let [p, M] = b;
          return (M === void 0 || (v[p] = M), v);
        }, {}),
      y =
        r == null || (o = r.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((v, b) => {
              let { class: p, className: M, ...z } = b;
              return Object.entries(z).every(L => {
                let [Y, j] = L;
                return Array.isArray(j)
                  ? j.includes({ ...f, ...m }[Y])
                  : { ...f, ...m }[Y] === j;
              })
                ? [...v, p, M]
                : v;
            }, []);
    return Oy(n, h, y, u?.class, u?.className);
  };
function Dy(n, r) {
  if (typeof n == 'function') return n(r);
  n != null && (n.current = r);
}
function IE(...n) {
  return r => {
    let u = !1;
    const o = n.map(c => {
      const f = Dy(c, r);
      return (!u && typeof f == 'function' && (u = !0), f);
    });
    if (u)
      return () => {
        for (let c = 0; c < o.length; c++) {
          const f = o[c];
          typeof f == 'function' ? f() : Dy(n[c], null);
        }
      };
  };
}
function PE(n) {
  const r = tx(n),
    u = w.forwardRef((o, c) => {
      const { children: f, ...h } = o,
        m = w.Children.toArray(f),
        y = m.find(ax);
      if (y) {
        const v = y.props.children,
          b = m.map(p =>
            p === y
              ? w.Children.count(v) > 1
                ? w.Children.only(null)
                : w.isValidElement(v)
                  ? v.props.children
                  : null
              : p
          );
        return ie.jsx(r, {
          ...h,
          ref: c,
          children: w.isValidElement(v) ? w.cloneElement(v, void 0, b) : null,
        });
      }
      return ie.jsx(r, { ...h, ref: c, children: f });
    });
  return ((u.displayName = `${n}.Slot`), u);
}
var ex = PE('Slot');
function tx(n) {
  const r = w.forwardRef((u, o) => {
    const { children: c, ...f } = u;
    if (w.isValidElement(c)) {
      const h = ix(c),
        m = nx(f, c.props);
      return (
        c.type !== w.Fragment && (m.ref = o ? IE(o, h) : h),
        w.cloneElement(c, m)
      );
    }
    return w.Children.count(c) > 1 ? w.Children.only(null) : null;
  });
  return ((r.displayName = `${n}.SlotClone`), r);
}
var lx = Symbol('radix.slottable');
function ax(n) {
  return (
    w.isValidElement(n) &&
    typeof n.type == 'function' &&
    '__radixId' in n.type &&
    n.type.__radixId === lx
  );
}
function nx(n, r) {
  const u = { ...r };
  for (const o in r) {
    const c = n[o],
      f = r[o];
    /^on[A-Z]/.test(o)
      ? c && f
        ? (u[o] = (...m) => {
            const y = f(...m);
            return (c(...m), y);
          })
        : c && (u[o] = c)
      : o === 'style'
        ? (u[o] = { ...c, ...f })
        : o === 'className' && (u[o] = [c, f].filter(Boolean).join(' '));
  }
  return { ...n, ...u };
}
function ix(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, 'ref')?.get,
    u = r && 'isReactWarning' in r && r.isReactWarning;
  return u
    ? n.ref
    : ((r = Object.getOwnPropertyDescriptor(n, 'ref')?.get),
      (u = r && 'isReactWarning' in r && r.isReactWarning),
      u ? n.props.ref : n.props.ref || n.ref);
}
const rx = WE(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);
function kv({
  className: n,
  variant: r = 'default',
  size: u = 'default',
  asChild: o = !1,
  ...c
}) {
  const f = o ? ex : 'button';
  return ie.jsx(f, {
    'data-slot': 'button',
    'data-variant': r,
    'data-size': u,
    className: cr(rx({ variant: r, size: u, className: n })),
    ...c,
  });
}
function ux({ disabled: n, onSend: r }) {
  const [u, o] = w.useState(''),
    c = () => {
      const h = u.trim();
      h && (r(h), o(''));
    },
    f = h => {
      h.key === 'Enter' && !h.shiftKey && (h.preventDefault(), c());
    };
  return ie.jsxs('form', {
    className: 'flex items-end gap-2 border-t bg-white p-3',
    onSubmit: h => {
      (h.preventDefault(), c());
    },
    children: [
      ie.jsx('textarea', {
        className:
          'flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
        placeholder: 'Send a message…',
        value: u,
        onChange: h => o(h.target.value),
        onKeyDown: f,
        rows: 2,
        disabled: n,
        'aria-label': 'Message',
      }),
      ie.jsx(kv, {
        type: 'submit',
        disabled: n || u.trim().length === 0,
        children: 'Send',
      }),
    ],
  });
}
const ox = {
    idle: 'Idle',
    connecting: 'Connecting…',
    open: 'Connected',
    reconnecting: 'Reconnecting…',
    error: 'Disconnected',
    closed: 'Closed',
  },
  sx = {
    idle: 'bg-gray-200 text-gray-700',
    connecting: 'bg-yellow-100 text-yellow-800',
    open: 'bg-green-100 text-green-800',
    reconnecting: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    closed: 'bg-gray-200 text-gray-700',
  };
function cx({ status: n, onReconnect: r }) {
  return ie.jsxs('div', {
    className: 'flex items-center gap-2',
    children: [
      ie.jsx('span', {
        className: cr('rounded-full px-2 py-0.5 text-xs font-medium', sx[n]),
        role: 'status',
        children: ox[n],
      }),
      n === 'error' &&
        ie.jsx('button', {
          type: 'button',
          onClick: r,
          className: 'text-xs text-blue-600 hover:underline',
          children: 'Reconnect',
        }),
    ],
  });
}
function fx({
  conversations: n,
  activeExternalId: r,
  loading: u,
  error: o,
  onSelect: c,
  onNewConversation: f,
}) {
  return ie.jsxs('aside', {
    className: 'flex w-64 flex-col border-r bg-white',
    'aria-label': 'Recent conversations',
    children: [
      ie.jsx('div', {
        className: 'border-b p-3',
        children: ie.jsx(kv, {
          onClick: f,
          className: 'w-full',
          variant: 'default',
          children: 'New chat',
        }),
      }),
      ie.jsxs('nav', {
        className: 'flex-1 overflow-y-auto',
        'aria-busy': u,
        children: [
          u &&
            n.length === 0 &&
            ie.jsx('p', {
              className: 'p-3 text-xs text-gray-500',
              children: 'Loading…',
            }),
          o &&
            ie.jsx('p', { className: 'p-3 text-xs text-red-700', children: o }),
          !u &&
            !o &&
            n.length === 0 &&
            ie.jsx('p', {
              className: 'p-3 text-xs text-gray-500',
              children: 'No previous conversations.',
            }),
          ie.jsx('ul', {
            className: 'flex flex-col',
            children: n.map(h => {
              const m = h.externalId === r;
              return ie.jsx(
                'li',
                {
                  children: ie.jsx('button', {
                    type: 'button',
                    onClick: () => c(h.externalId),
                    'aria-current': m ? 'true' : void 0,
                    className: cr(
                      'block w-full truncate border-b px-3 py-2 text-left text-sm transition-colors',
                      m
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-800 hover:bg-gray-50'
                    ),
                    title: h.title,
                    children: h.title,
                  }),
                },
                h.externalId
              );
            }),
          }),
        ],
      }),
    ],
  });
}
const Ac = 'chat:activeConversationId',
  dx = () => {
    const n = sessionStorage.getItem(Ac);
    if (n) return n;
    const r = crypto.randomUUID();
    return (sessionStorage.setItem(Ac, r), r);
  };
function hx() {
  const [n, r] = w.useState(dx),
    u = Ua(le => le.setConversation),
    o = Ua(le => le.seedFromHistory),
    c = Ua(le => le.reset),
    [f, h] = w.useState([]),
    [m, y] = w.useState(!0),
    [v, b] = w.useState(null),
    [p, M] = w.useState(!1),
    [z, L] = w.useState(null),
    Y = w.useCallback(async () => {
      (y(!0), b(null));
      try {
        const le = await B1();
        h(le);
      } catch (le) {
        b(le.message);
      } finally {
        y(!1);
      }
    }, []);
  (w.useEffect(() => {
    Y();
  }, [Y]),
    w.useEffect(() => {
      (u(n), sessionStorage.setItem(Ac, n));
    }, [n, u]),
    w.useEffect(() => {
      let le = !1;
      return (
        M(!1),
        L(null),
        c(),
        (async () => {
          try {
            const { messages: T } = await V1(n);
            if (le) return;
            o(T);
          } catch (T) {
            le || L(T.message);
          } finally {
            le || M(!0);
          }
        })(),
        () => {
          le = !0;
        }
      );
    }, [n, o, c]));
  const { status: j, lastError: k, reconnect: W, send: I } = X1(n),
    J = w.useCallback(le => {
      r(le);
    }, []),
    ce = w.useCallback(() => {
      const le = crypto.randomUUID();
      (r(le),
        h(T => [
          {
            externalId: le,
            title: 'New conversation',
            startedAt: Date.now(),
            endedAt: null,
            status: 'Active',
          },
          ...T,
        ]));
    }, []);
  return ie.jsxs('div', {
    className: 'flex h-[calc(100vh-4rem)]',
    children: [
      ie.jsx(fx, {
        conversations: f,
        activeExternalId: n,
        loading: m,
        error: v,
        onSelect: J,
        onNewConversation: ce,
      }),
      ie.jsxs('div', {
        className: 'flex flex-1 flex-col',
        children: [
          ie.jsxs('div', {
            className:
              'flex items-center justify-between border-b bg-white px-4 py-2',
            children: [
              ie.jsx('h1', {
                className: 'text-lg font-semibold text-gray-900',
                children: 'Chat',
              }),
              ie.jsx(cx, { status: j, onReconnect: W }),
            ],
          }),
          (k || z) &&
            ie.jsx('div', {
              className:
                'border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-900',
              children: k ?? z,
            }),
          p
            ? ie.jsx($E, {})
            : ie.jsx('div', {
                className:
                  'flex flex-1 items-center justify-center text-sm text-gray-500',
                children: 'Loading conversation…',
              }),
          ie.jsx(ux, {
            disabled: j !== 'open',
            onSend: le => {
              I(le);
            },
          }),
        ],
      }),
    ],
  });
}
const Xv = [
  {
    path: '/',
    element: ie.jsx(AS, {}),
    children: [
      {
        index: !0,
        element: ie.jsx(CS, {}),
        handle: { showInNavigation: !0, label: 'Home' },
      },
      {
        path: 'chat',
        element: ie.jsx(hx, {}),
        handle: { showInNavigation: !0, label: 'Chat' },
      },
      { path: '*', element: ie.jsx(_S, {}) },
    ],
  },
];
var bc = { exports: {} },
  tr = {},
  Sc = { exports: {} },
  Ec = {};
var Ny;
function mx() {
  return (
    Ny ||
      ((Ny = 1),
      (function (n) {
        function r(_, X) {
          var ee = _.length;
          _.push(X);
          e: for (; 0 < ee; ) {
            var Ee = (ee - 1) >>> 1,
              K = _[Ee];
            if (0 < c(K, X)) ((_[Ee] = X), (_[ee] = K), (ee = Ee));
            else break e;
          }
        }
        function u(_) {
          return _.length === 0 ? null : _[0];
        }
        function o(_) {
          if (_.length === 0) return null;
          var X = _[0],
            ee = _.pop();
          if (ee !== X) {
            _[0] = ee;
            e: for (var Ee = 0, K = _.length, x = K >>> 1; Ee < x; ) {
              var B = 2 * (Ee + 1) - 1,
                F = _[B],
                te = B + 1,
                ae = _[te];
              if (0 > c(F, ee))
                te < K && 0 > c(ae, F)
                  ? ((_[Ee] = ae), (_[te] = ee), (Ee = te))
                  : ((_[Ee] = F), (_[B] = ee), (Ee = B));
              else if (te < K && 0 > c(ae, ee))
                ((_[Ee] = ae), (_[te] = ee), (Ee = te));
              else break e;
            }
          }
          return X;
        }
        function c(_, X) {
          var ee = _.sortIndex - X.sortIndex;
          return ee !== 0 ? ee : _.id - X.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == 'object' &&
            typeof performance.now == 'function')
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            m = h.now();
          n.unstable_now = function () {
            return h.now() - m;
          };
        }
        var y = [],
          v = [],
          b = 1,
          p = null,
          M = 3,
          z = !1,
          L = !1,
          Y = !1,
          j = !1,
          k = typeof setTimeout == 'function' ? setTimeout : null,
          W = typeof clearTimeout == 'function' ? clearTimeout : null,
          I = typeof setImmediate < 'u' ? setImmediate : null;
        function J(_) {
          for (var X = u(v); X !== null; ) {
            if (X.callback === null) o(v);
            else if (X.startTime <= _)
              (o(v), (X.sortIndex = X.expirationTime), r(y, X));
            else break;
            X = u(v);
          }
        }
        function ce(_) {
          if (((Y = !1), J(_), !L))
            if (u(y) !== null) ((L = !0), le || ((le = !0), Oe()));
            else {
              var X = u(v);
              X !== null && Se(ce, X.startTime - _);
            }
        }
        var le = !1,
          T = -1,
          Q = 5,
          re = -1;
        function ke() {
          return j ? !0 : !(n.unstable_now() - re < Q);
        }
        function xe() {
          if (((j = !1), le)) {
            var _ = n.unstable_now();
            re = _;
            var X = !0;
            try {
              e: {
                ((L = !1), Y && ((Y = !1), W(T), (T = -1)), (z = !0));
                var ee = M;
                try {
                  t: {
                    for (
                      J(_), p = u(y);
                      p !== null && !(p.expirationTime > _ && ke());
                    ) {
                      var Ee = p.callback;
                      if (typeof Ee == 'function') {
                        ((p.callback = null), (M = p.priorityLevel));
                        var K = Ee(p.expirationTime <= _);
                        if (((_ = n.unstable_now()), typeof K == 'function')) {
                          ((p.callback = K), J(_), (X = !0));
                          break t;
                        }
                        (p === u(y) && o(y), J(_));
                      } else o(y);
                      p = u(y);
                    }
                    if (p !== null) X = !0;
                    else {
                      var x = u(v);
                      (x !== null && Se(ce, x.startTime - _), (X = !1));
                    }
                  }
                  break e;
                } finally {
                  ((p = null), (M = ee), (z = !1));
                }
                X = void 0;
              }
            } finally {
              X ? Oe() : (le = !1);
            }
          }
        }
        var Oe;
        if (typeof I == 'function')
          Oe = function () {
            I(xe);
          };
        else if (typeof MessageChannel < 'u') {
          var Ye = new MessageChannel(),
            Pe = Ye.port2;
          ((Ye.port1.onmessage = xe),
            (Oe = function () {
              Pe.postMessage(null);
            }));
        } else
          Oe = function () {
            k(xe, 0);
          };
        function Se(_, X) {
          T = k(function () {
            _(n.unstable_now());
          }, X);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (n.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Q = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return M;
          }),
          (n.unstable_next = function (_) {
            switch (M) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = M;
            }
            var ee = M;
            M = X;
            try {
              return _();
            } finally {
              M = ee;
            }
          }),
          (n.unstable_requestPaint = function () {
            j = !0;
          }),
          (n.unstable_runWithPriority = function (_, X) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var ee = M;
            M = _;
            try {
              return X();
            } finally {
              M = ee;
            }
          }),
          (n.unstable_scheduleCallback = function (_, X, ee) {
            var Ee = n.unstable_now();
            switch (
              (typeof ee == 'object' && ee !== null
                ? ((ee = ee.delay),
                  (ee = typeof ee == 'number' && 0 < ee ? Ee + ee : Ee))
                : (ee = Ee),
              _)
            ) {
              case 1:
                var K = -1;
                break;
              case 2:
                K = 250;
                break;
              case 5:
                K = 1073741823;
                break;
              case 4:
                K = 1e4;
                break;
              default:
                K = 5e3;
            }
            return (
              (K = ee + K),
              (_ = {
                id: b++,
                callback: X,
                priorityLevel: _,
                startTime: ee,
                expirationTime: K,
                sortIndex: -1,
              }),
              ee > Ee
                ? ((_.sortIndex = ee),
                  r(v, _),
                  u(y) === null &&
                    _ === u(v) &&
                    (Y ? (W(T), (T = -1)) : (Y = !0), Se(ce, ee - Ee)))
                : ((_.sortIndex = K),
                  r(y, _),
                  L || z || ((L = !0), le || ((le = !0), Oe()))),
              _
            );
          }),
          (n.unstable_shouldYield = ke),
          (n.unstable_wrapCallback = function (_) {
            var X = M;
            return function () {
              var ee = M;
              M = X;
              try {
                return _.apply(this, arguments);
              } finally {
                M = ee;
              }
            };
          }));
      })(Ec)),
    Ec
  );
}
var Uy;
function yx() {
  return (Uy || ((Uy = 1), (Sc.exports = mx())), Sc.exports);
}
var Ly;
function vx() {
  if (Ly) return tr;
  Ly = 1;
  var n = yx(),
    r = Cc(),
    u = zv();
  function o(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (f(e) !== e) throw Error(o(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var i = l.return;
      if (i === null) break;
      var s = i.alternate;
      if (s === null) {
        if (((a = i.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (i.child === s.child) {
        for (s = i.child; s; ) {
          if (s === l) return (y(i), e);
          if (s === a) return (y(i), t);
          s = s.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) ((l = i), (a = s));
      else {
        for (var d = !1, g = i.child; g; ) {
          if (g === l) {
            ((d = !0), (l = i), (a = s));
            break;
          }
          if (g === a) {
            ((d = !0), (a = i), (l = s));
            break;
          }
          g = g.sibling;
        }
        if (!d) {
          for (g = s.child; g; ) {
            if (g === l) {
              ((d = !0), (l = s), (a = i));
              break;
            }
            if (g === a) {
              ((d = !0), (a = s), (l = i));
              break;
            }
            g = g.sibling;
          }
          if (!d) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = b(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign,
    M = Symbol.for('react.element'),
    z = Symbol.for('react.transitional.element'),
    L = Symbol.for('react.portal'),
    Y = Symbol.for('react.fragment'),
    j = Symbol.for('react.strict_mode'),
    k = Symbol.for('react.profiler'),
    W = Symbol.for('react.consumer'),
    I = Symbol.for('react.context'),
    J = Symbol.for('react.forward_ref'),
    ce = Symbol.for('react.suspense'),
    le = Symbol.for('react.suspense_list'),
    T = Symbol.for('react.memo'),
    Q = Symbol.for('react.lazy'),
    re = Symbol.for('react.activity'),
    ke = Symbol.for('react.memo_cache_sentinel'),
    xe = Symbol.iterator;
  function Oe(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (xe && e[xe]) || e['@@iterator']),
        typeof e == 'function' ? e : null);
  }
  var Ye = Symbol.for('react.client.reference');
  function Pe(e) {
    if (e == null) return null;
    if (typeof e == 'function')
      return e.$$typeof === Ye ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Y:
        return 'Fragment';
      case k:
        return 'Profiler';
      case j:
        return 'StrictMode';
      case ce:
        return 'Suspense';
      case le:
        return 'SuspenseList';
      case re:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case L:
          return 'Portal';
        case I:
          return e.displayName || 'Context';
        case W:
          return (e._context.displayName || 'Context') + '.Consumer';
        case J:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case T:
          return (
            (t = e.displayName || null),
            t !== null ? t : Pe(e.type) || 'Memo'
          );
        case Q:
          ((t = e._payload), (e = e._init));
          try {
            return Pe(e(t));
          } catch {}
      }
    return null;
  }
  var Se = Array.isArray,
    _ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ee = { pending: !1, data: null, method: null, action: null },
    Ee = [],
    K = -1;
  function x(e) {
    return { current: e };
  }
  function B(e) {
    0 > K || ((e.current = Ee[K]), (Ee[K] = null), K--);
  }
  function F(e, t) {
    (K++, (Ee[K] = e.current), (e.current = t));
  }
  var te = x(null),
    ae = x(null),
    fe = x(null),
    Me = x(null);
  function nt(e, t) {
    switch ((F(fe, t), F(ae, e), F(te, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? em(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = em(t)), (e = tm(t, e)));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (B(te), F(te, e));
  }
  function we() {
    (B(te), B(ae), B(fe));
  }
  function wl(e) {
    e.memoizedState !== null && F(Me, e);
    var t = te.current,
      l = tm(t, e.type);
    t !== l && (F(ae, e), F(te, l));
  }
  function hl(e) {
    (ae.current === e && (B(te), B(ae)),
      Me.current === e && (B(Me), (Zi._currentValue = ee)));
  }
  var et, Vt;
  function Dt(e) {
    if (et === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((et = (t && t[1]) || ''),
          (Vt =
            -1 <
            l.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < l.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      et +
      e +
      Vt
    );
  }
  var li = !1;
  function ml(e, t) {
    if (!e || li) return '';
    li = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var V = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(V.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(V, []);
                } catch (H) {
                  var U = H;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (H) {
                  U = H;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                U = H;
              }
              (V = e()) &&
                typeof V.catch == 'function' &&
                V.catch(function () {});
            }
          } catch (H) {
            if (H && U && typeof H.stack == 'string') return [H.stack, U.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var i = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        'name'
      );
      i &&
        i.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var s = a.DetermineComponentFrameRoot(),
        d = s[0],
        g = s[1];
      if (d && g) {
        var S = d.split(`
`),
          D = g.split(`
`);
        for (
          i = a = 0;
          a < S.length && !S[a].includes('DetermineComponentFrameRoot');
        )
          a++;
        for (; i < D.length && !D[i].includes('DetermineComponentFrameRoot'); )
          i++;
        if (a === S.length || i === D.length)
          for (
            a = S.length - 1, i = D.length - 1;
            1 <= a && 0 <= i && S[a] !== D[i];
          )
            i--;
        for (; 1 <= a && 0 <= i; a--, i--)
          if (S[a] !== D[i]) {
            if (a !== 1 || i !== 1)
              do
                if ((a--, i--, 0 > i || S[a] !== D[i])) {
                  var q =
                    `
` + S[a].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      q.includes('<anonymous>') &&
                      (q = q.replace('<anonymous>', e.displayName)),
                    q
                  );
                }
              while (1 <= a && 0 <= i);
            break;
          }
      }
    } finally {
      ((li = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Dt(l) : '';
  }
  function Ju(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Dt(e.type);
      case 16:
        return Dt('Lazy');
      case 13:
        return e.child !== t && t !== null
          ? Dt('Suspense Fallback')
          : Dt('Suspense');
      case 19:
        return Dt('SuspenseList');
      case 0:
      case 15:
        return ml(e.type, !1);
      case 11:
        return ml(e.type.render, !1);
      case 1:
        return ml(e.type, !0);
      case 31:
        return Dt('Activity');
      default:
        return '';
    }
  }
  function vr(e) {
    try {
      var t = '',
        l = null;
      do ((t += Ju(e, l)), (l = e), (e = e.return));
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var mn = Object.prototype.hasOwnProperty,
    ai = n.unstable_scheduleCallback,
    ni = n.unstable_cancelCallback,
    Fu = n.unstable_shouldYield,
    $u = n.unstable_requestPaint,
    ft = n.unstable_now,
    ja = n.unstable_getCurrentPriorityLevel,
    ii = n.unstable_ImmediatePriority,
    yn = n.unstable_UserBlockingPriority,
    Ut = n.unstable_NormalPriority,
    yl = n.unstable_LowPriority,
    ri = n.unstable_IdlePriority,
    Wu = n.log,
    ui = n.unstable_setDisableYieldValue,
    Ha = null,
    ot = null;
  function vl(e) {
    if (
      (typeof Wu == 'function' && ui(e),
      ot && typeof ot.setStrictMode == 'function')
    )
      try {
        ot.setStrictMode(Ha, e);
      } catch {}
  }
  var Ct = Math.clz32 ? Math.clz32 : pr,
    gr = Math.log,
    Iu = Math.LN2;
  function pr(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((gr(e) / Iu) | 0)) | 0);
  }
  var Ll = 256,
    Ba = 262144,
    aa = 4194304;
  function jl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function qa(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var i = 0,
      s = e.suspendedLanes,
      d = e.pingedLanes;
    e = e.warmLanes;
    var g = a & 134217727;
    return (
      g !== 0
        ? ((a = g & ~s),
          a !== 0
            ? (i = jl(a))
            : ((d &= g),
              d !== 0
                ? (i = jl(d))
                : l || ((l = g & ~e), l !== 0 && (i = jl(l)))))
        : ((g = a & ~s),
          g !== 0
            ? (i = jl(g))
            : d !== 0
              ? (i = jl(d))
              : l || ((l = a & ~e), l !== 0 && (i = jl(l)))),
      i === 0
        ? 0
        : t !== 0 &&
            t !== i &&
            (t & s) === 0 &&
            ((s = i & -i),
            (l = t & -t),
            s >= l || (s === 32 && (l & 4194048) !== 0))
          ? t
          : i
    );
  }
  function Ya(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function br(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ga() {
    var e = aa;
    return ((aa <<= 1), (aa & 62914560) === 0 && (aa = 4194304), e);
  }
  function na(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function ia(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Pu(e, t, l, a, i, s) {
    var d = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var g = e.entanglements,
      S = e.expirationTimes,
      D = e.hiddenUpdates;
    for (l = d & ~l; 0 < l; ) {
      var q = 31 - Ct(l),
        V = 1 << q;
      ((g[q] = 0), (S[q] = -1));
      var U = D[q];
      if (U !== null)
        for (D[q] = null, q = 0; q < U.length; q++) {
          var H = U[q];
          H !== null && (H.lane &= -536870913);
        }
      l &= ~V;
    }
    (a !== 0 && Sr(e, a, 0),
      s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(d & ~t)));
  }
  function Sr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - Ct(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function E(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - Ct(l),
        i = 1 << a;
      ((i & t) | (e[a] & t) && (e[a] |= t), (l &= ~i));
    }
  }
  function A(e, t) {
    var l = t & -t;
    return (
      (l = (l & 42) !== 0 ? 1 : N(l)),
      (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    );
  }
  function N(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Z(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function $() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : wm(e.type));
  }
  function ye(e, t) {
    var l = X.p;
    try {
      return ((X.p = e), t());
    } finally {
      X.p = l;
    }
  }
  var oe = Math.random().toString(36).slice(2),
    P = '__reactFiber$' + oe,
    ne = '__reactProps$' + oe,
    ue = '__reactContainer$' + oe,
    pe = '__reactEvents$' + oe,
    ve = '__reactListeners$' + oe,
    Xe = '__reactHandles$' + oe,
    je = '__reactResources$' + oe,
    Ze = '__reactMarker$' + oe;
  function tt(e) {
    (delete e[P], delete e[ne], delete e[pe], delete e[ve], delete e[Xe]);
  }
  function it(e) {
    var t = e[P];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[ue] || l[P])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = om(e); e !== null; ) {
            if ((l = e[P])) return l;
            e = om(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function Ce(e) {
    if ((e = e[P] || e[ue])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function St(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Lt(e) {
    var t = e[je];
    return (
      t ||
        (t = e[je] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function rt(e) {
    e[Ze] = !0;
  }
  var gl = new Set(),
    kt = {};
  function pl(e, t) {
    (It(e, t), It(e + 'Capture', t));
  }
  function It(e, t) {
    for (kt[e] = t, e = 0; e < t.length; e++) gl.add(t[e]);
  }
  var Hl = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Va = {},
    ka = {};
  function He(e) {
    return mn.call(ka, e)
      ? !0
      : mn.call(Va, e)
        ? !1
        : Hl.test(e)
          ? (ka[e] = !0)
          : ((Va[e] = !0), !1);
  }
  function dt(e, t, l) {
    if (He(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var a = t.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + l);
      }
  }
  function bl(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + l);
    }
  }
  function wt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, '' + a);
    }
  }
  function Be(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function Xa(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    );
  }
  function Er(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var i = a.get,
        s = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (d) {
            ((l = '' + d), s.call(this, d));
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (d) {
            l = '' + d;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function oi(e) {
    if (!e._valueTracker) {
      var t = Xa(e) ? 'checked' : 'value';
      e._valueTracker = Er(e, t, '' + e[t]);
    }
  }
  function Zc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = '';
    return (
      e && (a = Xa(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function xr(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Qv = /[\n"\\]/g;
  function Pt(e) {
    return e.replace(Qv, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function eo(e, t, l, a, i, s, d, g) {
    ((e.name = ''),
      d != null &&
      typeof d != 'function' &&
      typeof d != 'symbol' &&
      typeof d != 'boolean'
        ? (e.type = d)
        : e.removeAttribute('type'),
      t != null
        ? d === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) &&
            (e.value = '' + Be(t))
          : e.value !== '' + Be(t) && (e.value = '' + Be(t))
        : (d !== 'submit' && d !== 'reset') || e.removeAttribute('value'),
      t != null
        ? to(e, d, Be(t))
        : l != null
          ? to(e, d, Be(l))
          : a != null && e.removeAttribute('value'),
      i == null && s != null && (e.defaultChecked = !!s),
      i != null &&
        (e.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      g != null &&
      typeof g != 'function' &&
      typeof g != 'symbol' &&
      typeof g != 'boolean'
        ? (e.name = '' + Be(g))
        : e.removeAttribute('name'));
  }
  function Kc(e, t, l, a, i, s, d, g) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || l != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        oi(e);
        return;
      }
      ((l = l != null ? '' + Be(l) : ''),
        (t = t != null ? '' + Be(t) : l),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? i),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (e.checked = g ? e.checked : !!a),
      (e.defaultChecked = !!a),
      d != null &&
        typeof d != 'function' &&
        typeof d != 'symbol' &&
        typeof d != 'boolean' &&
        (e.name = d),
      oi(e));
  }
  function to(e, t, l) {
    (t === 'number' && xr(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function vn(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < l.length; i++) t['$' + l[i]] = !0;
      for (l = 0; l < e.length; l++)
        ((i = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== i && (e[l].selected = i),
          i && a && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + Be(l), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === l) {
          ((e[i].selected = !0), a && (e[i].defaultSelected = !0));
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jc(e, t, l) {
    if (
      t != null &&
      ((t = '' + Be(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Be(l) : '';
  }
  function Fc(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (Se(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (t = l));
    }
    ((l = Be(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== '' && a !== null && (e.value = a),
      oi(e));
  }
  function gn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Zv = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function $c(e, t, l) {
    var a = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : a
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || Zv.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function Wc(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? e.setProperty(a, '')
            : a === 'float'
              ? (e.cssFloat = '')
              : (e[a] = ''));
      for (var i in t)
        ((a = t[i]), t.hasOwnProperty(i) && l[i] !== a && $c(e, i, a));
    } else for (var s in t) t.hasOwnProperty(s) && $c(e, s, t[s]);
  }
  function lo(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Kv = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    Jv =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rr(e) {
    return Jv.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Bl() {}
  var ao = null;
  function no(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var pn = null,
    bn = null;
  function Ic(e) {
    var t = Ce(e);
    if (t && (e = t.stateNode)) {
      var l = e[ne] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (eo(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === 'radio' && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + Pt('' + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var i = a[ne] || null;
                if (!i) throw Error(o(90));
                eo(
                  a,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              ((a = l[t]), a.form === e.form && Zc(a));
          }
          break e;
        case 'textarea':
          Jc(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && vn(e, !!l.multiple, t, !1));
      }
    }
  }
  var io = !1;
  function Pc(e, t, l) {
    if (io) return e(t, l);
    io = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((io = !1),
        (pn !== null || bn !== null) &&
          (cu(), pn && ((t = pn), (e = bn), (bn = pn = null), Ic(t), e)))
      )
        for (t = 0; t < e.length; t++) Ic(e[t]);
    }
  }
  function si(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[ne] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != 'function') throw Error(o(231, t, typeof l));
    return l;
  }
  var ql = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    ro = !1;
  if (ql)
    try {
      var ci = {};
      (Object.defineProperty(ci, 'passive', {
        get: function () {
          ro = !0;
        },
      }),
        window.addEventListener('test', ci, ci),
        window.removeEventListener('test', ci, ci));
    } catch {
      ro = !1;
    }
  var ra = null,
    uo = null,
    wr = null;
  function ef() {
    if (wr) return wr;
    var e,
      t = uo,
      l = t.length,
      a,
      i = 'value' in ra ? ra.value : ra.textContent,
      s = i.length;
    for (e = 0; e < l && t[e] === i[e]; e++);
    var d = l - e;
    for (a = 1; a <= d && t[l - a] === i[s - a]; a++);
    return (wr = i.slice(e, 1 < a ? 1 - a : void 0));
  }
  function zr(e) {
    var t = e.keyCode;
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Tr() {
    return !0;
  }
  function tf() {
    return !1;
  }
  function jt(e) {
    function t(l, a, i, s, d) {
      ((this._reactName = l),
        (this._targetInst = i),
        (this.type = a),
        (this.nativeEvent = s),
        (this.target = d),
        (this.currentTarget = null));
      for (var g in e)
        e.hasOwnProperty(g) && ((l = e[g]), (this[g] = l ? l(s) : s[g]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Tr
          : tf),
        (this.isPropagationStopped = tf),
        this
      );
    }
    return (
      p(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = Tr));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Tr));
        },
        persist: function () {},
        isPersistent: Tr,
      }),
      t
    );
  }
  var Qa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Mr = jt(Qa),
    fi = p({}, Qa, { view: 0, detail: 0 }),
    Fv = jt(fi),
    oo,
    so,
    di,
    Ar = p({}, fi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: fo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== di &&
              (di && e.type === 'mousemove'
                ? ((oo = e.screenX - di.screenX), (so = e.screenY - di.screenY))
                : (so = oo = 0),
              (di = e)),
            oo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : so;
      },
    }),
    lf = jt(Ar),
    $v = p({}, Ar, { dataTransfer: 0 }),
    Wv = jt($v),
    Iv = p({}, fi, { relatedTarget: 0 }),
    co = jt(Iv),
    Pv = p({}, Qa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    eg = jt(Pv),
    tg = p({}, Qa, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    lg = jt(tg),
    ag = p({}, Qa, { data: 0 }),
    af = jt(ag),
    ng = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    ig = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    rg = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function ug(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = rg[e])
        ? !!t[e]
        : !1;
  }
  function fo() {
    return ug;
  }
  var og = p({}, fi, {
      key: function (e) {
        if (e.key) {
          var t = ng[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = zr(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? ig[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: fo,
      charCode: function (e) {
        return e.type === 'keypress' ? zr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? zr(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    sg = jt(og),
    cg = p({}, Ar, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    nf = jt(cg),
    fg = p({}, fi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: fo,
    }),
    dg = jt(fg),
    hg = p({}, Qa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    mg = jt(hg),
    yg = p({}, Ar, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    vg = jt(yg),
    gg = p({}, Qa, { newState: 0, oldState: 0 }),
    pg = jt(gg),
    bg = [9, 13, 27, 32],
    ho = ql && 'CompositionEvent' in window,
    hi = null;
  ql && 'documentMode' in document && (hi = document.documentMode);
  var Sg = ql && 'TextEvent' in window && !hi,
    rf = ql && (!ho || (hi && 8 < hi && 11 >= hi)),
    uf = ' ',
    of = !1;
  function sf(e, t) {
    switch (e) {
      case 'keyup':
        return bg.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function cf(e) {
    return (
      (e = e.detail),
      typeof e == 'object' && 'data' in e ? e.data : null
    );
  }
  var Sn = !1;
  function Eg(e, t) {
    switch (e) {
      case 'compositionend':
        return cf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((of = !0), uf);
      case 'textInput':
        return ((e = t.data), e === uf && of ? null : e);
      default:
        return null;
    }
  }
  function xg(e, t) {
    if (Sn)
      return e === 'compositionend' || (!ho && sf(e, t))
        ? ((e = ef()), (wr = uo = ra = null), (Sn = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return rf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Rg = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ff(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Rg[e.type] : t === 'textarea';
  }
  function df(e, t, l, a) {
    (pn ? (bn ? bn.push(a) : (bn = [a])) : (pn = a),
      (t = gu(t, 'onChange')),
      0 < t.length &&
        ((l = new Mr('onChange', 'change', null, l, a)),
        e.push({ event: l, listeners: t })));
  }
  var mi = null,
    yi = null;
  function wg(e) {
    Jh(e, 0);
  }
  function Cr(e) {
    var t = St(e);
    if (Zc(t)) return e;
  }
  function hf(e, t) {
    if (e === 'change') return t;
  }
  var mf = !1;
  if (ql) {
    var mo;
    if (ql) {
      var yo = 'oninput' in document;
      if (!yo) {
        var yf = document.createElement('div');
        (yf.setAttribute('oninput', 'return;'),
          (yo = typeof yf.oninput == 'function'));
      }
      mo = yo;
    } else mo = !1;
    mf = mo && (!document.documentMode || 9 < document.documentMode);
  }
  function vf() {
    mi && (mi.detachEvent('onpropertychange', gf), (yi = mi = null));
  }
  function gf(e) {
    if (e.propertyName === 'value' && Cr(yi)) {
      var t = [];
      (df(t, yi, e, no(e)), Pc(wg, t));
    }
  }
  function zg(e, t, l) {
    e === 'focusin'
      ? (vf(), (mi = t), (yi = l), mi.attachEvent('onpropertychange', gf))
      : e === 'focusout' && vf();
  }
  function Tg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
      return Cr(yi);
  }
  function Mg(e, t) {
    if (e === 'click') return Cr(t);
  }
  function Ag(e, t) {
    if (e === 'input' || e === 'change') return Cr(t);
  }
  function Cg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Xt = typeof Object.is == 'function' ? Object.is : Cg;
  function vi(e, t) {
    if (Xt(e, t)) return !0;
    if (
      typeof e != 'object' ||
      e === null ||
      typeof t != 'object' ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var i = l[a];
      if (!mn.call(t, i) || !Xt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function pf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bf(e, t) {
    var l = pf(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = pf(l);
    }
  }
  function Sf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Sf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Ef(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = xr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = xr(e.document);
    }
    return t;
  }
  function vo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var _g = ql && 'documentMode' in document && 11 >= document.documentMode,
    En = null,
    go = null,
    gi = null,
    po = !1;
  function xf(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    po ||
      En == null ||
      En !== xr(a) ||
      ((a = En),
      'selectionStart' in a && vo(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (gi && vi(gi, a)) ||
        ((gi = a),
        (a = gu(go, 'onSelect')),
        0 < a.length &&
          ((t = new Mr('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = En))));
  }
  function Za(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var xn = {
      animationend: Za('Animation', 'AnimationEnd'),
      animationiteration: Za('Animation', 'AnimationIteration'),
      animationstart: Za('Animation', 'AnimationStart'),
      transitionrun: Za('Transition', 'TransitionRun'),
      transitionstart: Za('Transition', 'TransitionStart'),
      transitioncancel: Za('Transition', 'TransitionCancel'),
      transitionend: Za('Transition', 'TransitionEnd'),
    },
    bo = {},
    Rf = {};
  ql &&
    ((Rf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete xn.animationend.animation,
      delete xn.animationiteration.animation,
      delete xn.animationstart.animation),
    'TransitionEvent' in window || delete xn.transitionend.transition);
  function Ka(e) {
    if (bo[e]) return bo[e];
    if (!xn[e]) return e;
    var t = xn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Rf) return (bo[e] = t[l]);
    return e;
  }
  var wf = Ka('animationend'),
    zf = Ka('animationiteration'),
    Tf = Ka('animationstart'),
    Og = Ka('transitionrun'),
    Dg = Ka('transitionstart'),
    Ng = Ka('transitioncancel'),
    Mf = Ka('transitionend'),
    Af = new Map(),
    So =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  So.push('scrollEnd');
  function Sl(e, t) {
    (Af.set(e, t), pl(t, [e]));
  }
  var _r =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == 'object' &&
                  e !== null &&
                  typeof e.message == 'string'
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', e);
              return;
            }
            console.error(e);
          },
    el = [],
    Rn = 0,
    Eo = 0;
  function Or() {
    for (var e = Rn, t = (Eo = Rn = 0); t < e; ) {
      var l = el[t];
      el[t++] = null;
      var a = el[t];
      el[t++] = null;
      var i = el[t];
      el[t++] = null;
      var s = el[t];
      if (((el[t++] = null), a !== null && i !== null)) {
        var d = a.pending;
        (d === null ? (i.next = i) : ((i.next = d.next), (d.next = i)),
          (a.pending = i));
      }
      s !== 0 && Cf(l, i, s);
    }
  }
  function Dr(e, t, l, a) {
    ((el[Rn++] = e),
      (el[Rn++] = t),
      (el[Rn++] = l),
      (el[Rn++] = a),
      (Eo |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function xo(e, t, l, a) {
    return (Dr(e, t, l, a), Nr(e));
  }
  function Ja(e, t) {
    return (Dr(e, null, null, t), Nr(e));
  }
  function Cf(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var i = !1, s = e.return; s !== null; )
      ((s.childLanes |= l),
        (a = s.alternate),
        a !== null && (a.childLanes |= l),
        s.tag === 22 &&
          ((e = s.stateNode), e === null || e._visibility & 1 || (i = !0)),
        (e = s),
        (s = s.return));
    return e.tag === 3
      ? ((s = e.stateNode),
        i &&
          t !== null &&
          ((i = 31 - Ct(l)),
          (e = s.hiddenUpdates),
          (a = e[i]),
          a === null ? (e[i] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        s)
      : null;
  }
  function Nr(e) {
    if (50 < qi) throw ((qi = 0), (Os = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var wn = {};
  function Ug(e, t, l, a) {
    ((this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Qt(e, t, l, a) {
    return new Ug(e, t, l, a);
  }
  function Ro(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Yl(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = Qt(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function _f(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Ur(e, t, l, a, i, s) {
    var d = 0;
    if (((a = e), typeof e == 'function')) Ro(e) && (d = 1);
    else if (typeof e == 'string')
      d = qp(e, l, te.current)
        ? 26
        : e === 'html' || e === 'head' || e === 'body'
          ? 27
          : 5;
    else
      e: switch (e) {
        case re:
          return (
            (e = Qt(31, l, t, i)),
            (e.elementType = re),
            (e.lanes = s),
            e
          );
        case Y:
          return Fa(l.children, i, s, t);
        case j:
          ((d = 8), (i |= 24));
          break;
        case k:
          return (
            (e = Qt(12, l, t, i | 2)),
            (e.elementType = k),
            (e.lanes = s),
            e
          );
        case ce:
          return (
            (e = Qt(13, l, t, i)),
            (e.elementType = ce),
            (e.lanes = s),
            e
          );
        case le:
          return (
            (e = Qt(19, l, t, i)),
            (e.elementType = le),
            (e.lanes = s),
            e
          );
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case I:
                d = 10;
                break e;
              case W:
                d = 9;
                break e;
              case J:
                d = 11;
                break e;
              case T:
                d = 14;
                break e;
              case Q:
                ((d = 16), (a = null));
                break e;
            }
          ((d = 29),
            (l = Error(o(130, e === null ? 'null' : typeof e, ''))),
            (a = null));
      }
    return (
      (t = Qt(d, l, t, i)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = s),
      t
    );
  }
  function Fa(e, t, l, a) {
    return ((e = Qt(7, e, a, t)), (e.lanes = l), e);
  }
  function wo(e, t, l) {
    return ((e = Qt(6, e, null, t)), (e.lanes = l), e);
  }
  function Of(e) {
    var t = Qt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function zo(e, t, l) {
    return (
      (t = Qt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Df = new WeakMap();
  function tl(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Df.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: vr(t) }), Df.set(e, t), t);
    }
    return { value: e, source: t, stack: vr(t) };
  }
  var zn = [],
    Tn = 0,
    Lr = null,
    pi = 0,
    ll = [],
    al = 0,
    ua = null,
    zl = 1,
    Tl = '';
  function Gl(e, t) {
    ((zn[Tn++] = pi), (zn[Tn++] = Lr), (Lr = e), (pi = t));
  }
  function Nf(e, t, l) {
    ((ll[al++] = zl), (ll[al++] = Tl), (ll[al++] = ua), (ua = e));
    var a = zl;
    e = Tl;
    var i = 32 - Ct(a) - 1;
    ((a &= ~(1 << i)), (l += 1));
    var s = 32 - Ct(t) + i;
    if (30 < s) {
      var d = i - (i % 5);
      ((s = (a & ((1 << d) - 1)).toString(32)),
        (a >>= d),
        (i -= d),
        (zl = (1 << (32 - Ct(t) + i)) | (l << i) | a),
        (Tl = s + e));
    } else ((zl = (1 << s) | (l << i) | a), (Tl = e));
  }
  function To(e) {
    e.return !== null && (Gl(e, 1), Nf(e, 1, 0));
  }
  function Mo(e) {
    for (; e === Lr; )
      ((Lr = zn[--Tn]), (zn[Tn] = null), (pi = zn[--Tn]), (zn[Tn] = null));
    for (; e === ua; )
      ((ua = ll[--al]),
        (ll[al] = null),
        (Tl = ll[--al]),
        (ll[al] = null),
        (zl = ll[--al]),
        (ll[al] = null));
  }
  function Uf(e, t) {
    ((ll[al++] = zl),
      (ll[al++] = Tl),
      (ll[al++] = ua),
      (zl = t.id),
      (Tl = t.overflow),
      (ua = e));
  }
  var zt = null,
    lt = null,
    qe = !1,
    oa = null,
    nl = !1,
    Ao = Error(o(519));
  function sa(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? 'text'
          : 'HTML',
        ''
      )
    );
    throw (bi(tl(t, e)), Ao);
  }
  function Lf(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[P] = e), (t[ne] = a), l)) {
      case 'dialog':
        (Ne('cancel', t), Ne('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Ne('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < Gi.length; l++) Ne(Gi[l], t);
        break;
      case 'source':
        Ne('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Ne('error', t), Ne('load', t));
        break;
      case 'details':
        Ne('toggle', t);
        break;
      case 'input':
        (Ne('invalid', t),
          Kc(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ));
        break;
      case 'select':
        Ne('invalid', t);
        break;
      case 'textarea':
        (Ne('invalid', t), Fc(t, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      Ih(t.textContent, l)
        ? (a.popover != null && (Ne('beforetoggle', t), Ne('toggle', t)),
          a.onScroll != null && Ne('scroll', t),
          a.onScrollEnd != null && Ne('scrollend', t),
          a.onClick != null && (t.onclick = Bl),
          (t = !0))
        : (t = !1),
      t || sa(e, !0));
  }
  function jf(e) {
    for (zt = e.return; zt; )
      switch (zt.tag) {
        case 5:
        case 31:
        case 13:
          nl = !1;
          return;
        case 27:
        case 3:
          nl = !0;
          return;
        default:
          zt = zt.return;
      }
  }
  function Mn(e) {
    if (e !== zt) return !1;
    if (!qe) return (jf(e), (qe = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== 'form' && l !== 'button') || Zs(e.type, e.memoizedProps))),
        (l = !l)),
      l && lt && sa(e),
      jf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      lt = um(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      lt = um(e);
    } else
      t === 27
        ? ((t = lt), Ra(e.type) ? ((e = Ws), (Ws = null), (lt = e)) : (lt = t))
        : (lt = zt ? rl(e.stateNode.nextSibling) : null);
    return !0;
  }
  function $a() {
    ((lt = zt = null), (qe = !1));
  }
  function Co() {
    var e = oa;
    return (
      e !== null &&
        (Yt === null ? (Yt = e) : Yt.push.apply(Yt, e), (oa = null)),
      e
    );
  }
  function bi(e) {
    oa === null ? (oa = [e]) : oa.push(e);
  }
  var _o = x(null),
    Wa = null,
    Vl = null;
  function ca(e, t, l) {
    (F(_o, t._currentValue), (t._currentValue = l));
  }
  function kl(e) {
    ((e._currentValue = _o.current), B(_o));
  }
  function Oo(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function Do(e, t, l, a) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var s = i.dependencies;
      if (s !== null) {
        var d = i.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var g = s;
          s = i;
          for (var S = 0; S < t.length; S++)
            if (g.context === t[S]) {
              ((s.lanes |= l),
                (g = s.alternate),
                g !== null && (g.lanes |= l),
                Oo(s.return, l, e),
                a || (d = null));
              break e;
            }
          s = g.next;
        }
      } else if (i.tag === 18) {
        if (((d = i.return), d === null)) throw Error(o(341));
        ((d.lanes |= l),
          (s = d.alternate),
          s !== null && (s.lanes |= l),
          Oo(d, l, e),
          (d = null));
      } else d = i.child;
      if (d !== null) d.return = i;
      else
        for (d = i; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (((i = d.sibling), i !== null)) {
            ((i.return = d.return), (d = i));
            break;
          }
          d = d.return;
        }
      i = d;
    }
  }
  function An(e, t, l, a) {
    e = null;
    for (var i = t, s = !1; i !== null; ) {
      if (!s) {
        if ((i.flags & 524288) !== 0) s = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var d = i.alternate;
        if (d === null) throw Error(o(387));
        if (((d = d.memoizedProps), d !== null)) {
          var g = i.type;
          Xt(i.pendingProps.value, d.value) ||
            (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (i === Me.current) {
        if (((d = i.alternate), d === null)) throw Error(o(387));
        d.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(Zi) : (e = [Zi]));
      }
      i = i.return;
    }
    (e !== null && Do(t, e, l, a), (t.flags |= 262144));
  }
  function jr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Xt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ia(e) {
    ((Wa = e),
      (Vl = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Tt(e) {
    return Hf(Wa, e);
  }
  function Hr(e, t) {
    return (Wa === null && Ia(e), Hf(e, t));
  }
  function Hf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Vl === null)) {
      if (e === null) throw Error(o(308));
      ((Vl = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Vl = Vl.next = t;
    return l;
  }
  var Lg =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    jg = n.unstable_scheduleCallback,
    Hg = n.unstable_NormalPriority,
    yt = {
      $$typeof: I,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function No() {
    return { controller: new Lg(), data: new Map(), refCount: 0 };
  }
  function Si(e) {
    (e.refCount--,
      e.refCount === 0 &&
        jg(Hg, function () {
          e.controller.abort();
        }));
  }
  var Ei = null,
    Uo = 0,
    Cn = 0,
    _n = null;
  function Bg(e, t) {
    if (Ei === null) {
      var l = (Ei = []);
      ((Uo = 0),
        (Cn = Hs()),
        (_n = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Uo++, t.then(Bf, Bf), t);
  }
  function Bf() {
    if (--Uo === 0 && Ei !== null) {
      _n !== null && (_n.status = 'fulfilled');
      var e = Ei;
      ((Ei = null), (Cn = 0), (_n = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function qg(e, t) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (i) {
          l.push(i);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = t));
          for (var i = 0; i < l.length; i++) (0, l[i])(t);
        },
        function (i) {
          for (a.status = 'rejected', a.reason = i, i = 0; i < l.length; i++)
            (0, l[i])(void 0);
        }
      ),
      a
    );
  }
  var qf = _.S;
  _.S = function (e, t) {
    ((xh = ft()),
      typeof t == 'object' &&
        t !== null &&
        typeof t.then == 'function' &&
        Bg(e, t),
      qf !== null && qf(e, t));
  };
  var Pa = x(null);
  function Lo() {
    var e = Pa.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function Br(e, t) {
    t === null ? F(Pa, Pa.current) : F(Pa, t.pool);
  }
  function Yf() {
    var e = Lo();
    return e === null ? null : { parent: yt._currentValue, pool: e };
  }
  var On = Error(o(460)),
    jo = Error(o(474)),
    qr = Error(o(542)),
    Yr = { then: function () {} };
  function Gf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Vf(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(Bl, Bl), (t = l)),
      t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Xf(e), e);
      default:
        if (typeof t.status == 'string') t.then(Bl, Bl);
        else {
          if (((e = Ie), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (a) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'fulfilled'), (i.value = a));
                }
              },
              function (a) {
                if (t.status === 'pending') {
                  var i = t;
                  ((i.status = 'rejected'), (i.reason = a));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Xf(e), e);
        }
        throw ((tn = t), On);
    }
  }
  function en(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function'
        ? ((tn = l), On)
        : l;
    }
  }
  var tn = null;
  function kf() {
    if (tn === null) throw Error(o(459));
    var e = tn;
    return ((tn = null), e);
  }
  function Xf(e) {
    if (e === On || e === qr) throw Error(o(483));
  }
  var Dn = null,
    xi = 0;
  function Gr(e) {
    var t = xi;
    return ((xi += 1), Dn === null && (Dn = []), Vf(Dn, e, t));
  }
  function Ri(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Vr(e, t) {
    throw t.$$typeof === M
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]'
              ? 'object with keys {' + Object.keys(t).join(', ') + '}'
              : e
          )
        ));
  }
  function Qf(e) {
    function t(C, R) {
      if (e) {
        var O = C.deletions;
        O === null ? ((C.deletions = [R]), (C.flags |= 16)) : O.push(R);
      }
    }
    function l(C, R) {
      if (!e) return null;
      for (; R !== null; ) (t(C, R), (R = R.sibling));
      return null;
    }
    function a(C) {
      for (var R = new Map(); C !== null; )
        (C.key !== null ? R.set(C.key, C) : R.set(C.index, C), (C = C.sibling));
      return R;
    }
    function i(C, R) {
      return ((C = Yl(C, R)), (C.index = 0), (C.sibling = null), C);
    }
    function s(C, R, O) {
      return (
        (C.index = O),
        e
          ? ((O = C.alternate),
            O !== null
              ? ((O = O.index), O < R ? ((C.flags |= 67108866), R) : O)
              : ((C.flags |= 67108866), R))
          : ((C.flags |= 1048576), R)
      );
    }
    function d(C) {
      return (e && C.alternate === null && (C.flags |= 67108866), C);
    }
    function g(C, R, O, G) {
      return R === null || R.tag !== 6
        ? ((R = wo(O, C.mode, G)), (R.return = C), R)
        : ((R = i(R, O)), (R.return = C), R);
    }
    function S(C, R, O, G) {
      var ge = O.type;
      return ge === Y
        ? q(C, R, O.props.children, G, O.key)
        : R !== null &&
            (R.elementType === ge ||
              (typeof ge == 'object' &&
                ge !== null &&
                ge.$$typeof === Q &&
                en(ge) === R.type))
          ? ((R = i(R, O.props)), Ri(R, O), (R.return = C), R)
          : ((R = Ur(O.type, O.key, O.props, null, C.mode, G)),
            Ri(R, O),
            (R.return = C),
            R);
    }
    function D(C, R, O, G) {
      return R === null ||
        R.tag !== 4 ||
        R.stateNode.containerInfo !== O.containerInfo ||
        R.stateNode.implementation !== O.implementation
        ? ((R = zo(O, C.mode, G)), (R.return = C), R)
        : ((R = i(R, O.children || [])), (R.return = C), R);
    }
    function q(C, R, O, G, ge) {
      return R === null || R.tag !== 7
        ? ((R = Fa(O, C.mode, G, ge)), (R.return = C), R)
        : ((R = i(R, O)), (R.return = C), R);
    }
    function V(C, R, O) {
      if (
        (typeof R == 'string' && R !== '') ||
        typeof R == 'number' ||
        typeof R == 'bigint'
      )
        return ((R = wo('' + R, C.mode, O)), (R.return = C), R);
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case z:
            return (
              (O = Ur(R.type, R.key, R.props, null, C.mode, O)),
              Ri(O, R),
              (O.return = C),
              O
            );
          case L:
            return ((R = zo(R, C.mode, O)), (R.return = C), R);
          case Q:
            return ((R = en(R)), V(C, R, O));
        }
        if (Se(R) || Oe(R))
          return ((R = Fa(R, C.mode, O, null)), (R.return = C), R);
        if (typeof R.then == 'function') return V(C, Gr(R), O);
        if (R.$$typeof === I) return V(C, Hr(C, R), O);
        Vr(C, R);
      }
      return null;
    }
    function U(C, R, O, G) {
      var ge = R !== null ? R.key : null;
      if (
        (typeof O == 'string' && O !== '') ||
        typeof O == 'number' ||
        typeof O == 'bigint'
      )
        return ge !== null ? null : g(C, R, '' + O, G);
      if (typeof O == 'object' && O !== null) {
        switch (O.$$typeof) {
          case z:
            return O.key === ge ? S(C, R, O, G) : null;
          case L:
            return O.key === ge ? D(C, R, O, G) : null;
          case Q:
            return ((O = en(O)), U(C, R, O, G));
        }
        if (Se(O) || Oe(O)) return ge !== null ? null : q(C, R, O, G, null);
        if (typeof O.then == 'function') return U(C, R, Gr(O), G);
        if (O.$$typeof === I) return U(C, R, Hr(C, O), G);
        Vr(C, O);
      }
      return null;
    }
    function H(C, R, O, G, ge) {
      if (
        (typeof G == 'string' && G !== '') ||
        typeof G == 'number' ||
        typeof G == 'bigint'
      )
        return ((C = C.get(O) || null), g(R, C, '' + G, ge));
      if (typeof G == 'object' && G !== null) {
        switch (G.$$typeof) {
          case z:
            return (
              (C = C.get(G.key === null ? O : G.key) || null),
              S(R, C, G, ge)
            );
          case L:
            return (
              (C = C.get(G.key === null ? O : G.key) || null),
              D(R, C, G, ge)
            );
          case Q:
            return ((G = en(G)), H(C, R, O, G, ge));
        }
        if (Se(G) || Oe(G))
          return ((C = C.get(O) || null), q(R, C, G, ge, null));
        if (typeof G.then == 'function') return H(C, R, O, Gr(G), ge);
        if (G.$$typeof === I) return H(C, R, O, Hr(R, G), ge);
        Vr(R, G);
      }
      return null;
    }
    function se(C, R, O, G) {
      for (
        var ge = null, Ge = null, me = R, Te = (R = 0), Le = null;
        me !== null && Te < O.length;
        Te++
      ) {
        me.index > Te ? ((Le = me), (me = null)) : (Le = me.sibling);
        var Ve = U(C, me, O[Te], G);
        if (Ve === null) {
          me === null && (me = Le);
          break;
        }
        (e && me && Ve.alternate === null && t(C, me),
          (R = s(Ve, R, Te)),
          Ge === null ? (ge = Ve) : (Ge.sibling = Ve),
          (Ge = Ve),
          (me = Le));
      }
      if (Te === O.length) return (l(C, me), qe && Gl(C, Te), ge);
      if (me === null) {
        for (; Te < O.length; Te++)
          ((me = V(C, O[Te], G)),
            me !== null &&
              ((R = s(me, R, Te)),
              Ge === null ? (ge = me) : (Ge.sibling = me),
              (Ge = me)));
        return (qe && Gl(C, Te), ge);
      }
      for (me = a(me); Te < O.length; Te++)
        ((Le = H(me, C, Te, O[Te], G)),
          Le !== null &&
            (e &&
              Le.alternate !== null &&
              me.delete(Le.key === null ? Te : Le.key),
            (R = s(Le, R, Te)),
            Ge === null ? (ge = Le) : (Ge.sibling = Le),
            (Ge = Le)));
      return (
        e &&
          me.forEach(function (Aa) {
            return t(C, Aa);
          }),
        qe && Gl(C, Te),
        ge
      );
    }
    function be(C, R, O, G) {
      if (O == null) throw Error(o(151));
      for (
        var ge = null,
          Ge = null,
          me = R,
          Te = (R = 0),
          Le = null,
          Ve = O.next();
        me !== null && !Ve.done;
        Te++, Ve = O.next()
      ) {
        me.index > Te ? ((Le = me), (me = null)) : (Le = me.sibling);
        var Aa = U(C, me, Ve.value, G);
        if (Aa === null) {
          me === null && (me = Le);
          break;
        }
        (e && me && Aa.alternate === null && t(C, me),
          (R = s(Aa, R, Te)),
          Ge === null ? (ge = Aa) : (Ge.sibling = Aa),
          (Ge = Aa),
          (me = Le));
      }
      if (Ve.done) return (l(C, me), qe && Gl(C, Te), ge);
      if (me === null) {
        for (; !Ve.done; Te++, Ve = O.next())
          ((Ve = V(C, Ve.value, G)),
            Ve !== null &&
              ((R = s(Ve, R, Te)),
              Ge === null ? (ge = Ve) : (Ge.sibling = Ve),
              (Ge = Ve)));
        return (qe && Gl(C, Te), ge);
      }
      for (me = a(me); !Ve.done; Te++, Ve = O.next())
        ((Ve = H(me, C, Te, Ve.value, G)),
          Ve !== null &&
            (e &&
              Ve.alternate !== null &&
              me.delete(Ve.key === null ? Te : Ve.key),
            (R = s(Ve, R, Te)),
            Ge === null ? (ge = Ve) : (Ge.sibling = Ve),
            (Ge = Ve)));
      return (
        e &&
          me.forEach(function ($p) {
            return t(C, $p);
          }),
        qe && Gl(C, Te),
        ge
      );
    }
    function We(C, R, O, G) {
      if (
        (typeof O == 'object' &&
          O !== null &&
          O.type === Y &&
          O.key === null &&
          (O = O.props.children),
        typeof O == 'object' && O !== null)
      ) {
        switch (O.$$typeof) {
          case z:
            e: {
              for (var ge = O.key; R !== null; ) {
                if (R.key === ge) {
                  if (((ge = O.type), ge === Y)) {
                    if (R.tag === 7) {
                      (l(C, R.sibling),
                        (G = i(R, O.props.children)),
                        (G.return = C),
                        (C = G));
                      break e;
                    }
                  } else if (
                    R.elementType === ge ||
                    (typeof ge == 'object' &&
                      ge !== null &&
                      ge.$$typeof === Q &&
                      en(ge) === R.type)
                  ) {
                    (l(C, R.sibling),
                      (G = i(R, O.props)),
                      Ri(G, O),
                      (G.return = C),
                      (C = G));
                    break e;
                  }
                  l(C, R);
                  break;
                } else t(C, R);
                R = R.sibling;
              }
              O.type === Y
                ? ((G = Fa(O.props.children, C.mode, G, O.key)),
                  (G.return = C),
                  (C = G))
                : ((G = Ur(O.type, O.key, O.props, null, C.mode, G)),
                  Ri(G, O),
                  (G.return = C),
                  (C = G));
            }
            return d(C);
          case L:
            e: {
              for (ge = O.key; R !== null; ) {
                if (R.key === ge)
                  if (
                    R.tag === 4 &&
                    R.stateNode.containerInfo === O.containerInfo &&
                    R.stateNode.implementation === O.implementation
                  ) {
                    (l(C, R.sibling),
                      (G = i(R, O.children || [])),
                      (G.return = C),
                      (C = G));
                    break e;
                  } else {
                    l(C, R);
                    break;
                  }
                else t(C, R);
                R = R.sibling;
              }
              ((G = zo(O, C.mode, G)), (G.return = C), (C = G));
            }
            return d(C);
          case Q:
            return ((O = en(O)), We(C, R, O, G));
        }
        if (Se(O)) return se(C, R, O, G);
        if (Oe(O)) {
          if (((ge = Oe(O)), typeof ge != 'function')) throw Error(o(150));
          return ((O = ge.call(O)), be(C, R, O, G));
        }
        if (typeof O.then == 'function') return We(C, R, Gr(O), G);
        if (O.$$typeof === I) return We(C, R, Hr(C, O), G);
        Vr(C, O);
      }
      return (typeof O == 'string' && O !== '') ||
        typeof O == 'number' ||
        typeof O == 'bigint'
        ? ((O = '' + O),
          R !== null && R.tag === 6
            ? (l(C, R.sibling), (G = i(R, O)), (G.return = C), (C = G))
            : (l(C, R), (G = wo(O, C.mode, G)), (G.return = C), (C = G)),
          d(C))
        : l(C, R);
    }
    return function (C, R, O, G) {
      try {
        xi = 0;
        var ge = We(C, R, O, G);
        return ((Dn = null), ge);
      } catch (me) {
        if (me === On || me === qr) throw me;
        var Ge = Qt(29, me, null, C.mode);
        return ((Ge.lanes = G), (Ge.return = C), Ge);
      }
    };
  }
  var ln = Qf(!0),
    Zf = Qf(!1),
    fa = !1;
  function Ho(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Bo(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function da(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ha(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Qe & 2) !== 0)) {
      var i = a.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (a.pending = t),
        (t = Nr(e)),
        Cf(e, null, l),
        t
      );
    }
    return (Dr(e, a, t, l), Nr(e));
  }
  function wi(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), E(e, l));
    }
  }
  function qo(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var i = null,
        s = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var d = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (s === null ? (i = s = d) : (s = s.next = d), (l = l.next));
        } while (l !== null);
        s === null ? (i = s = t) : (s = s.next = t);
      } else i = s = t;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: s,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var Yo = !1;
  function zi() {
    if (Yo) {
      var e = _n;
      if (e !== null) throw e;
    }
  }
  function Ti(e, t, l, a) {
    Yo = !1;
    var i = e.updateQueue;
    fa = !1;
    var s = i.firstBaseUpdate,
      d = i.lastBaseUpdate,
      g = i.shared.pending;
    if (g !== null) {
      i.shared.pending = null;
      var S = g,
        D = S.next;
      ((S.next = null), d === null ? (s = D) : (d.next = D), (d = S));
      var q = e.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (g = q.lastBaseUpdate),
        g !== d &&
          (g === null ? (q.firstBaseUpdate = D) : (g.next = D),
          (q.lastBaseUpdate = S)));
    }
    if (s !== null) {
      var V = i.baseState;
      ((d = 0), (q = D = S = null), (g = s));
      do {
        var U = g.lane & -536870913,
          H = U !== g.lane;
        if (H ? (Ue & U) === U : (a & U) === U) {
          (U !== 0 && U === Cn && (Yo = !0),
            q !== null &&
              (q = q.next =
                {
                  lane: 0,
                  tag: g.tag,
                  payload: g.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var se = e,
              be = g;
            U = t;
            var We = l;
            switch (be.tag) {
              case 1:
                if (((se = be.payload), typeof se == 'function')) {
                  V = se.call(We, V, U);
                  break e;
                }
                V = se;
                break e;
              case 3:
                se.flags = (se.flags & -65537) | 128;
              case 0:
                if (
                  ((se = be.payload),
                  (U = typeof se == 'function' ? se.call(We, V, U) : se),
                  U == null)
                )
                  break e;
                V = p({}, V, U);
                break e;
              case 2:
                fa = !0;
            }
          }
          ((U = g.callback),
            U !== null &&
              ((e.flags |= 64),
              H && (e.flags |= 8192),
              (H = i.callbacks),
              H === null ? (i.callbacks = [U]) : H.push(U)));
        } else
          ((H = {
            lane: U,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null,
          }),
            q === null ? ((D = q = H), (S = V)) : (q = q.next = H),
            (d |= U));
        if (((g = g.next), g === null)) {
          if (((g = i.shared.pending), g === null)) break;
          ((H = g),
            (g = H.next),
            (H.next = null),
            (i.lastBaseUpdate = H),
            (i.shared.pending = null));
        }
      } while (!0);
      (q === null && (S = V),
        (i.baseState = S),
        (i.firstBaseUpdate = D),
        (i.lastBaseUpdate = q),
        s === null && (i.shared.lanes = 0),
        (pa |= d),
        (e.lanes = d),
        (e.memoizedState = V));
    }
  }
  function Kf(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Jf(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Kf(l[e], t);
  }
  var Nn = x(null),
    kr = x(0);
  function Ff(e, t) {
    ((e = Il), F(kr, e), F(Nn, t), (Il = e | t.baseLanes));
  }
  function Go() {
    (F(kr, Il), F(Nn, Nn.current));
  }
  function Vo() {
    ((Il = kr.current), B(Nn), B(kr));
  }
  var Zt = x(null),
    il = null;
  function ma(e) {
    var t = e.alternate;
    (F(ht, ht.current & 1),
      F(Zt, e),
      il === null &&
        (t === null || Nn.current !== null || t.memoizedState !== null) &&
        (il = e));
  }
  function ko(e) {
    (F(ht, ht.current), F(Zt, e), il === null && (il = e));
  }
  function $f(e) {
    e.tag === 22
      ? (F(ht, ht.current), F(Zt, e), il === null && (il = e))
      : ya();
  }
  function ya() {
    (F(ht, ht.current), F(Zt, Zt.current));
  }
  function Kt(e) {
    (B(Zt), il === e && (il = null), B(ht));
  }
  var ht = x(0);
  function Xr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Fs(l) || $s(l)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Xl = 0,
    ze = null,
    Fe = null,
    vt = null,
    Qr = !1,
    Un = !1,
    an = !1,
    Zr = 0,
    Mi = 0,
    Ln = null,
    Yg = 0;
  function st() {
    throw Error(o(321));
  }
  function Xo(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Xt(e[l], t[l])) return !1;
    return !0;
  }
  function Qo(e, t, l, a, i, s) {
    return (
      (Xl = s),
      (ze = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? Nd : rs),
      (an = !1),
      (s = l(a, i)),
      (an = !1),
      Un && (s = If(t, l, a, i)),
      Wf(e),
      s
    );
  }
  function Wf(e) {
    _.H = _i;
    var t = Fe !== null && Fe.next !== null;
    if (((Xl = 0), (vt = Fe = ze = null), (Qr = !1), (Mi = 0), (Ln = null), t))
      throw Error(o(300));
    e === null ||
      gt ||
      ((e = e.dependencies), e !== null && jr(e) && (gt = !0));
  }
  function If(e, t, l, a) {
    ze = e;
    var i = 0;
    do {
      if ((Un && (Ln = null), (Mi = 0), (Un = !1), 25 <= i))
        throw Error(o(301));
      if (((i += 1), (vt = Fe = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((_.H = Ud), (s = t(l, a)));
    } while (Un);
    return s;
  }
  function Gg() {
    var e = _.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Ai(t) : t),
      (e = e.useState()[0]),
      (Fe !== null ? Fe.memoizedState : null) !== e && (ze.flags |= 1024),
      t
    );
  }
  function Zo() {
    var e = Zr !== 0;
    return ((Zr = 0), e);
  }
  function Ko(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Jo(e) {
    if (Qr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Qr = !1;
    }
    ((Xl = 0), (vt = Fe = ze = null), (Un = !1), (Mi = Zr = 0), (Ln = null));
  }
  function Nt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (vt === null ? (ze.memoizedState = vt = e) : (vt = vt.next = e), vt);
  }
  function mt() {
    if (Fe === null) {
      var e = ze.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Fe.next;
    var t = vt === null ? ze.memoizedState : vt.next;
    if (t !== null) ((vt = t), (Fe = e));
    else {
      if (e === null)
        throw ze.alternate === null ? Error(o(467)) : Error(o(310));
      ((Fe = e),
        (e = {
          memoizedState: Fe.memoizedState,
          baseState: Fe.baseState,
          baseQueue: Fe.baseQueue,
          queue: Fe.queue,
          next: null,
        }),
        vt === null ? (ze.memoizedState = vt = e) : (vt = vt.next = e));
    }
    return vt;
  }
  function Kr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ai(e) {
    var t = Mi;
    return (
      (Mi += 1),
      Ln === null && (Ln = []),
      (e = Vf(Ln, e, t)),
      (t = ze),
      (vt === null ? t.memoizedState : vt.next) === null &&
        ((t = t.alternate),
        (_.H = t === null || t.memoizedState === null ? Nd : rs)),
      e
    );
  }
  function Jr(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Ai(e);
      if (e.$$typeof === I) return Tt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Fo(e) {
    var t = null,
      l = ze.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ze.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = Kr()), (ze.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = ke;
    return (t.index++, l);
  }
  function Ql(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Fr(e) {
    var t = mt();
    return $o(t, Fe, e);
  }
  function $o(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var i = e.baseQueue,
      s = a.pending;
    if (s !== null) {
      if (i !== null) {
        var d = i.next;
        ((i.next = s.next), (s.next = d));
      }
      ((t.baseQueue = i = s), (a.pending = null));
    }
    if (((s = e.baseState), i === null)) e.memoizedState = s;
    else {
      t = i.next;
      var g = (d = null),
        S = null,
        D = t,
        q = !1;
      do {
        var V = D.lane & -536870913;
        if (V !== D.lane ? (Ue & V) === V : (Xl & V) === V) {
          var U = D.revertLane;
          if (U === 0)
            (S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              V === Cn && (q = !0));
          else if ((Xl & U) === U) {
            ((D = D.next), U === Cn && (q = !0));
            continue;
          } else
            ((V = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              S === null ? ((g = S = V), (d = s)) : (S = S.next = V),
              (ze.lanes |= U),
              (pa |= U));
          ((V = D.action),
            an && l(s, V),
            (s = D.hasEagerState ? D.eagerState : l(s, V)));
        } else
          ((U = {
            lane: V,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            S === null ? ((g = S = U), (d = s)) : (S = S.next = U),
            (ze.lanes |= V),
            (pa |= V));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (S === null ? (d = s) : (S.next = g),
        !Xt(s, e.memoizedState) && ((gt = !0), q && ((l = _n), l !== null)))
      )
        throw l;
      ((e.memoizedState = s),
        (e.baseState = d),
        (e.baseQueue = S),
        (a.lastRenderedState = s));
    }
    return (i === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function Wo(e) {
    var t = mt(),
      l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      i = l.pending,
      s = t.memoizedState;
    if (i !== null) {
      l.pending = null;
      var d = (i = i.next);
      do ((s = e(s, d.action)), (d = d.next));
      while (d !== i);
      (Xt(s, t.memoizedState) || (gt = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (l.lastRenderedState = s));
    }
    return [s, a];
  }
  function Pf(e, t, l) {
    var a = ze,
      i = mt(),
      s = qe;
    if (s) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = t();
    var d = !Xt((Fe || i).memoizedState, l);
    if (
      (d && ((i.memoizedState = l), (gt = !0)),
      (i = i.queue),
      es(ld.bind(null, a, i, e), [e]),
      i.getSnapshot !== t || d || (vt !== null && vt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        jn(9, { destroy: void 0 }, td.bind(null, a, i, l, t), null),
        Ie === null)
      )
        throw Error(o(349));
      s || (Xl & 127) !== 0 || ed(a, t, l);
    }
    return l;
  }
  function ed(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ze.updateQueue),
      t === null
        ? ((t = Kr()), (ze.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function td(e, t, l, a) {
    ((t.value = l), (t.getSnapshot = a), ad(t) && nd(e));
  }
  function ld(e, t, l) {
    return l(function () {
      ad(t) && nd(e);
    });
  }
  function ad(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Xt(e, l);
    } catch {
      return !0;
    }
  }
  function nd(e) {
    var t = Ja(e, 2);
    t !== null && Gt(t, e, 2);
  }
  function Io(e) {
    var t = Nt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), an)) {
        vl(!0);
        try {
          l();
        } finally {
          vl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ql,
        lastRenderedState: e,
      }),
      t
    );
  }
  function id(e, t, l, a) {
    return ((e.baseState = l), $o(e, Fe, typeof a == 'function' ? a : Ql));
  }
  function Vg(e, t, l, a, i) {
    if (Ir(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var s = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (d) {
          s.listeners.push(d);
        },
      };
      (_.T !== null ? l(!0) : (s.isTransition = !1),
        a(s),
        (l = t.pending),
        l === null
          ? ((s.next = t.pending = s), rd(t, s))
          : ((s.next = l.next), (t.pending = l.next = s)));
    }
  }
  function rd(e, t) {
    var l = t.action,
      a = t.payload,
      i = e.state;
    if (t.isTransition) {
      var s = _.T,
        d = {};
      _.T = d;
      try {
        var g = l(i, a),
          S = _.S;
        (S !== null && S(d, g), ud(e, t, g));
      } catch (D) {
        Po(e, t, D);
      } finally {
        (s !== null && d.types !== null && (s.types = d.types), (_.T = s));
      }
    } else
      try {
        ((s = l(i, a)), ud(e, t, s));
      } catch (D) {
        Po(e, t, D);
      }
  }
  function ud(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            od(e, t, a);
          },
          function (a) {
            return Po(e, t, a);
          }
        )
      : od(e, t, l);
  }
  function od(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      sd(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), rd(e, l))));
  }
  function Po(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = 'rejected'), (t.reason = l), sd(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function sd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function cd(e, t) {
    return t;
  }
  function fd(e, t) {
    if (qe) {
      var l = Ie.formState;
      if (l !== null) {
        e: {
          var a = ze;
          if (qe) {
            if (lt) {
              t: {
                for (var i = lt, s = nl; i.nodeType !== 8; ) {
                  if (!s) {
                    i = null;
                    break t;
                  }
                  if (((i = rl(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                ((s = i.data), (i = s === 'F!' || s === 'F' ? i : null));
              }
              if (i) {
                ((lt = rl(i.nextSibling)), (a = i.data === 'F!'));
                break e;
              }
            }
            sa(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = Nt()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cd,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = _d.bind(null, ze, a)),
      (a.dispatch = l),
      (a = Io(!1)),
      (s = is.bind(null, ze, !1, a.queue)),
      (a = Nt()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = i),
      (l = Vg.bind(null, ze, i, s, l)),
      (i.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function dd(e) {
    var t = mt();
    return hd(t, Fe, e);
  }
  function hd(e, t, l) {
    if (
      ((t = $o(e, t, cd)[0]),
      (e = Fr(Ql)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var a = Ai(t);
      } catch (d) {
        throw d === On ? qr : d;
      }
    else a = t;
    t = mt();
    var i = t.queue,
      s = i.dispatch;
    return (
      l !== t.memoizedState &&
        ((ze.flags |= 2048),
        jn(9, { destroy: void 0 }, kg.bind(null, i, l), null)),
      [a, s, e]
    );
  }
  function kg(e, t) {
    e.action = t;
  }
  function md(e) {
    var t = mt(),
      l = Fe;
    if (l !== null) return hd(t, l, e);
    (mt(), (t = t.memoizedState), (l = mt()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = e), [t, a, !1]);
  }
  function jn(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ze.updateQueue),
      t === null && ((t = Kr()), (ze.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function yd() {
    return mt().memoizedState;
  }
  function $r(e, t, l, a) {
    var i = Nt();
    ((ze.flags |= e),
      (i.memoizedState = jn(
        1 | t,
        { destroy: void 0 },
        l,
        a === void 0 ? null : a
      )));
  }
  function Wr(e, t, l, a) {
    var i = mt();
    a = a === void 0 ? null : a;
    var s = i.memoizedState.inst;
    Fe !== null && a !== null && Xo(a, Fe.memoizedState.deps)
      ? (i.memoizedState = jn(t, s, l, a))
      : ((ze.flags |= e), (i.memoizedState = jn(1 | t, s, l, a)));
  }
  function vd(e, t) {
    $r(8390656, 8, e, t);
  }
  function es(e, t) {
    Wr(2048, 8, e, t);
  }
  function Xg(e) {
    ze.flags |= 4;
    var t = ze.updateQueue;
    if (t === null) ((t = Kr()), (ze.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function gd(e) {
    var t = mt().memoizedState;
    return (
      Xg({ ref: t, nextImpl: e }),
      function () {
        if ((Qe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function pd(e, t) {
    return Wr(4, 2, e, t);
  }
  function bd(e, t) {
    return Wr(4, 4, e, t);
  }
  function Sd(e, t) {
    if (typeof t == 'function') {
      e = e();
      var l = t(e);
      return function () {
        typeof l == 'function' ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Ed(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), Wr(4, 4, Sd.bind(null, t, e), l));
  }
  function ts() {}
  function xd(e, t) {
    var l = mt();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Xo(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function Rd(e, t) {
    var l = mt();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Xo(t, a[1])) return a[0];
    if (((a = e()), an)) {
      vl(!0);
      try {
        e();
      } finally {
        vl(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  }
  function ls(e, t, l) {
    return l === void 0 || ((Xl & 1073741824) !== 0 && (Ue & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = wh()), (ze.lanes |= e), (pa |= e), l);
  }
  function wd(e, t, l, a) {
    return Xt(l, t)
      ? l
      : Nn.current !== null
        ? ((e = ls(e, l, a)), Xt(e, t) || (gt = !0), e)
        : (Xl & 42) === 0 || ((Xl & 1073741824) !== 0 && (Ue & 261930) === 0)
          ? ((gt = !0), (e.memoizedState = l))
          : ((e = wh()), (ze.lanes |= e), (pa |= e), t);
  }
  function zd(e, t, l, a, i) {
    var s = X.p;
    X.p = s !== 0 && 8 > s ? s : 8;
    var d = _.T,
      g = {};
    ((_.T = g), is(e, !1, t, l));
    try {
      var S = i(),
        D = _.S;
      if (
        (D !== null && D(g, S),
        S !== null && typeof S == 'object' && typeof S.then == 'function')
      ) {
        var q = qg(S, a);
        Ci(e, t, q, $t(e));
      } else Ci(e, t, a, $t(e));
    } catch (V) {
      Ci(e, t, { then: function () {}, status: 'rejected', reason: V }, $t());
    } finally {
      ((X.p = s),
        d !== null && g.types !== null && (d.types = g.types),
        (_.T = d));
    }
  }
  function Qg() {}
  function as(e, t, l, a) {
    if (e.tag !== 5) throw Error(o(476));
    var i = Td(e).queue;
    zd(
      e,
      i,
      t,
      ee,
      l === null
        ? Qg
        : function () {
            return (Md(e), l(a));
          }
    );
  }
  function Td(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ql,
        lastRenderedState: ee,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ql,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Md(e) {
    var t = Td(e);
    (t.next === null && (t = e.alternate.memoizedState),
      Ci(e, t.next.queue, {}, $t()));
  }
  function ns() {
    return Tt(Zi);
  }
  function Ad() {
    return mt().memoizedState;
  }
  function Cd() {
    return mt().memoizedState;
  }
  function Zg(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = $t();
          e = da(l);
          var a = ha(t, e, l);
          (a !== null && (Gt(a, t, l), wi(a, t, l)),
            (t = { cache: No() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Kg(e, t, l) {
    var a = $t();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ir(e)
        ? Od(t, l)
        : ((l = xo(e, t, l, a)), l !== null && (Gt(l, e, a), Dd(l, t, a))));
  }
  function _d(e, t, l) {
    var a = $t();
    Ci(e, t, l, a);
  }
  function Ci(e, t, l, a) {
    var i = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ir(e)) Od(t, i);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var d = t.lastRenderedState,
            g = s(d, l);
          if (((i.hasEagerState = !0), (i.eagerState = g), Xt(g, d)))
            return (Dr(e, t, i, 0), Ie === null && Or(), !1);
        } catch {}
      if (((l = xo(e, t, i, a)), l !== null))
        return (Gt(l, e, a), Dd(l, t, a), !0);
    }
    return !1;
  }
  function is(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Hs(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ir(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = xo(e, l, a, 2)), t !== null && Gt(t, e, 2));
  }
  function Ir(e) {
    var t = e.alternate;
    return e === ze || (t !== null && t === ze);
  }
  function Od(e, t) {
    Un = Qr = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t));
  }
  function Dd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), E(e, l));
    }
  }
  var _i = {
    readContext: Tt,
    use: Jr,
    useCallback: st,
    useContext: st,
    useEffect: st,
    useImperativeHandle: st,
    useLayoutEffect: st,
    useInsertionEffect: st,
    useMemo: st,
    useReducer: st,
    useRef: st,
    useState: st,
    useDebugValue: st,
    useDeferredValue: st,
    useTransition: st,
    useSyncExternalStore: st,
    useId: st,
    useHostTransitionStatus: st,
    useFormState: st,
    useActionState: st,
    useOptimistic: st,
    useMemoCache: st,
    useCacheRefresh: st,
  };
  _i.useEffectEvent = st;
  var Nd = {
      readContext: Tt,
      use: Jr,
      useCallback: function (e, t) {
        return ((Nt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Tt,
      useEffect: vd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null),
          $r(4194308, 4, Sd.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return $r(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        $r(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = Nt();
        t = t === void 0 ? null : t;
        var a = e();
        if (an) {
          vl(!0);
          try {
            e();
          } finally {
            vl(!1);
          }
        }
        return ((l.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, l) {
        var a = Nt();
        if (l !== void 0) {
          var i = l(t);
          if (an) {
            vl(!0);
            try {
              l(t);
            } finally {
              vl(!1);
            }
          }
        } else i = t;
        return (
          (a.memoizedState = a.baseState = i),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: i,
          }),
          (a.queue = e),
          (e = e.dispatch = Kg.bind(null, ze, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Nt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Io(e);
        var t = e.queue,
          l = _d.bind(null, ze, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: ts,
      useDeferredValue: function (e, t) {
        var l = Nt();
        return ls(l, e, t);
      },
      useTransition: function () {
        var e = Io(!1);
        return (
          (e = zd.bind(null, ze, e.queue, !0, !1)),
          (Nt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ze,
          i = Nt();
        if (qe) {
          if (l === void 0) throw Error(o(407));
          l = l();
        } else {
          if (((l = t()), Ie === null)) throw Error(o(349));
          (Ue & 127) !== 0 || ed(a, t, l);
        }
        i.memoizedState = l;
        var s = { value: l, getSnapshot: t };
        return (
          (i.queue = s),
          vd(ld.bind(null, a, s, e), [e]),
          (a.flags |= 2048),
          jn(9, { destroy: void 0 }, td.bind(null, a, s, l, t), null),
          l
        );
      },
      useId: function () {
        var e = Nt(),
          t = Ie.identifierPrefix;
        if (qe) {
          var l = Tl,
            a = zl;
          ((l = (a & ~(1 << (32 - Ct(a) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = Zr++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = Yg++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: ns,
      useFormState: fd,
      useActionState: fd,
      useOptimistic: function (e) {
        var t = Nt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = l),
          (t = is.bind(null, ze, !0, l)),
          (l.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Fo,
      useCacheRefresh: function () {
        return (Nt().memoizedState = Zg.bind(null, ze));
      },
      useEffectEvent: function (e) {
        var t = Nt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Qe & 2) !== 0) throw Error(o(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    rs = {
      readContext: Tt,
      use: Jr,
      useCallback: xd,
      useContext: Tt,
      useEffect: es,
      useImperativeHandle: Ed,
      useInsertionEffect: pd,
      useLayoutEffect: bd,
      useMemo: Rd,
      useReducer: Fr,
      useRef: yd,
      useState: function () {
        return Fr(Ql);
      },
      useDebugValue: ts,
      useDeferredValue: function (e, t) {
        var l = mt();
        return wd(l, Fe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Fr(Ql)[0],
          t = mt().memoizedState;
        return [typeof e == 'boolean' ? e : Ai(e), t];
      },
      useSyncExternalStore: Pf,
      useId: Ad,
      useHostTransitionStatus: ns,
      useFormState: dd,
      useActionState: dd,
      useOptimistic: function (e, t) {
        var l = mt();
        return id(l, Fe, e, t);
      },
      useMemoCache: Fo,
      useCacheRefresh: Cd,
    };
  rs.useEffectEvent = gd;
  var Ud = {
    readContext: Tt,
    use: Jr,
    useCallback: xd,
    useContext: Tt,
    useEffect: es,
    useImperativeHandle: Ed,
    useInsertionEffect: pd,
    useLayoutEffect: bd,
    useMemo: Rd,
    useReducer: Wo,
    useRef: yd,
    useState: function () {
      return Wo(Ql);
    },
    useDebugValue: ts,
    useDeferredValue: function (e, t) {
      var l = mt();
      return Fe === null ? ls(l, e, t) : wd(l, Fe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Wo(Ql)[0],
        t = mt().memoizedState;
      return [typeof e == 'boolean' ? e : Ai(e), t];
    },
    useSyncExternalStore: Pf,
    useId: Ad,
    useHostTransitionStatus: ns,
    useFormState: md,
    useActionState: md,
    useOptimistic: function (e, t) {
      var l = mt();
      return Fe !== null
        ? id(l, Fe, e, t)
        : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Fo,
    useCacheRefresh: Cd,
  };
  Ud.useEffectEvent = gd;
  function us(e, t, l, a) {
    ((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : p({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var os = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = $t(),
        i = da(a);
      ((i.payload = t),
        l != null && (i.callback = l),
        (t = ha(e, i, a)),
        t !== null && (Gt(t, e, a), wi(t, e, a)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = $t(),
        i = da(a);
      ((i.tag = 1),
        (i.payload = t),
        l != null && (i.callback = l),
        (t = ha(e, i, a)),
        t !== null && (Gt(t, e, a), wi(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = $t(),
        a = da(l);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = ha(e, a, l)),
        t !== null && (Gt(t, e, l), wi(t, e, l)));
    },
  };
  function Ld(e, t, l, a, i, s, d) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(a, s, d)
        : t.prototype && t.prototype.isPureReactComponent
          ? !vi(l, a) || !vi(i, s)
          : !0
    );
  }
  function jd(e, t, l, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && os.enqueueReplaceState(t, t.state, null));
  }
  function nn(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var a in t) a !== 'ref' && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = p({}, l));
      for (var i in e) l[i] === void 0 && (l[i] = e[i]);
    }
    return l;
  }
  function Hd(e) {
    _r(e);
  }
  function Bd(e) {
    console.error(e);
  }
  function qd(e) {
    _r(e);
  }
  function Pr(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Yd(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function ss(e, t, l) {
    return (
      (l = da(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Pr(e, t);
      }),
      l
    );
  }
  function Gd(e) {
    return ((e = da(e)), (e.tag = 3), e);
  }
  function Vd(e, t, l, a) {
    var i = l.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var s = a.value;
      ((e.payload = function () {
        return i(s);
      }),
        (e.callback = function () {
          Yd(t, l, a);
        }));
    }
    var d = l.stateNode;
    d !== null &&
      typeof d.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Yd(t, l, a),
          typeof i != 'function' &&
            (ba === null ? (ba = new Set([this])) : ba.add(this)));
        var g = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: g !== null ? g : '',
        });
      });
  }
  function Jg(e, t, l, a, i) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == 'object' && typeof a.then == 'function')
    ) {
      if (
        ((t = l.alternate),
        t !== null && An(t, l, i, !0),
        (l = Zt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              il === null ? fu() : l.alternate === null && ct === 0 && (ct = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = i),
              a === Yr
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  Us(e, a, i)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Yr
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  Us(e, a, i)),
              !1
            );
        }
        throw Error(o(435, l.tag));
      }
      return (Us(e, a, i), fu(), !1);
    }
    if (qe)
      return (
        (t = Zt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            a !== Ao && ((e = Error(o(422), { cause: a })), bi(tl(e, l))))
          : (a !== Ao && ((t = Error(o(423), { cause: a })), bi(tl(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (a = tl(a, l)),
            (i = ss(e.stateNode, a, i)),
            qo(e, i),
            ct !== 4 && (ct = 2)),
        !1
      );
    var s = Error(o(520), { cause: a });
    if (
      ((s = tl(s, l)),
      Bi === null ? (Bi = [s]) : Bi.push(s),
      ct !== 4 && (ct = 2),
      t === null)
    )
      return !0;
    ((a = tl(a, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = i & -i),
            (l.lanes |= e),
            (e = ss(l.stateNode, a, e)),
            qo(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (s = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (s !== null &&
                  typeof s.componentDidCatch == 'function' &&
                  (ba === null || !ba.has(s)))))
          )
            return (
              (l.flags |= 65536),
              (i &= -i),
              (l.lanes |= i),
              (i = Gd(i)),
              Vd(i, e, l, a),
              qo(l, i),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var cs = Error(o(461)),
    gt = !1;
  function Mt(e, t, l, a) {
    t.child = e === null ? Zf(t, null, l, a) : ln(t, e.child, l, a);
  }
  function kd(e, t, l, a, i) {
    l = l.render;
    var s = t.ref;
    if ('ref' in a) {
      var d = {};
      for (var g in a) g !== 'ref' && (d[g] = a[g]);
    } else d = a;
    return (
      Ia(t),
      (a = Qo(e, t, l, d, s, i)),
      (g = Zo()),
      e !== null && !gt
        ? (Ko(e, t, i), Zl(e, t, i))
        : (qe && g && To(t), (t.flags |= 1), Mt(e, t, a, i), t.child)
    );
  }
  function Xd(e, t, l, a, i) {
    if (e === null) {
      var s = l.type;
      return typeof s == 'function' &&
        !Ro(s) &&
        s.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = s), Qd(e, t, s, a, i))
        : ((e = Ur(l.type, null, a, t, t.mode, i)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((s = e.child), !ps(e, i))) {
      var d = s.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : vi), l(d, a) && e.ref === t.ref)
      )
        return Zl(e, t, i);
    }
    return (
      (t.flags |= 1),
      (e = Yl(s, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Qd(e, t, l, a, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (vi(s, a) && e.ref === t.ref)
        if (((gt = !1), (t.pendingProps = a = s), ps(e, i)))
          (e.flags & 131072) !== 0 && (gt = !0);
        else return ((t.lanes = e.lanes), Zl(e, t, i));
    }
    return fs(e, t, l, a, i);
  }
  function Zd(e, t, l, a) {
    var i = a.children,
      s = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((s = s !== null ? s.baseLanes | l : l), e !== null)) {
          for (a = t.child = e.child, i = 0; a !== null; )
            ((i = i | a.lanes | a.childLanes), (a = a.sibling));
          a = i & ~s;
        } else ((a = 0), (t.child = null));
        return Kd(e, t, s, l, a);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Br(t, s !== null ? s.cachePool : null),
          s !== null ? Ff(t, s) : Go(),
          $f(t));
      else
        return (
          (a = t.lanes = 536870912),
          Kd(e, t, s !== null ? s.baseLanes | l : l, l, a)
        );
    } else
      s !== null
        ? (Br(t, s.cachePool), Ff(t, s), ya(), (t.memoizedState = null))
        : (e !== null && Br(t, null), Go(), ya());
    return (Mt(e, t, i, l), t.child);
  }
  function Oi(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Kd(e, t, l, a, i) {
    var s = Lo();
    return (
      (s = s === null ? null : { parent: yt._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: l, cachePool: s }),
      e !== null && Br(t, null),
      Go(),
      $f(t),
      e !== null && An(e, t, a, !0),
      (t.childLanes = i),
      null
    );
  }
  function eu(e, t) {
    return (
      (t = lu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Jd(e, t, l) {
    return (
      ln(t, e.child, null, l),
      (e = eu(t, t.pendingProps)),
      (e.flags |= 2),
      Kt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Fg(e, t, l) {
    var a = t.pendingProps,
      i = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (qe) {
        if (a.mode === 'hidden')
          return ((e = eu(t, a)), (t.lanes = 536870912), Oi(null, e));
        if (
          (ko(t),
          (e = lt)
            ? ((e = rm(e, nl)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ua !== null ? { id: zl, overflow: Tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Of(e)),
                (l.return = t),
                (t.child = l),
                (zt = t),
                (lt = null)))
            : (e = null),
          e === null)
        )
          throw sa(t);
        return ((t.lanes = 536870912), null);
      }
      return eu(t, a);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var d = s.dehydrated;
      if ((ko(t), i))
        if (t.flags & 256) ((t.flags &= -257), (t = Jd(e, t, l)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if (
        (gt || An(e, t, l, !1), (i = (l & e.childLanes) !== 0), gt || i)
      ) {
        if (
          ((a = Ie),
          a !== null && ((d = A(a, l)), d !== 0 && d !== s.retryLane))
        )
          throw ((s.retryLane = d), Ja(e, d), Gt(a, e, d), cs);
        (fu(), (t = Jd(e, t, l)));
      } else
        ((e = s.treeContext),
          (lt = rl(d.nextSibling)),
          (zt = t),
          (qe = !0),
          (oa = null),
          (nl = !1),
          e !== null && Uf(t, e),
          (t = eu(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Yl(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function tu(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(o(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function fs(e, t, l, a, i) {
    return (
      Ia(t),
      (l = Qo(e, t, l, a, void 0, i)),
      (a = Zo()),
      e !== null && !gt
        ? (Ko(e, t, i), Zl(e, t, i))
        : (qe && a && To(t), (t.flags |= 1), Mt(e, t, l, i), t.child)
    );
  }
  function Fd(e, t, l, a, i, s) {
    return (
      Ia(t),
      (t.updateQueue = null),
      (l = If(t, a, l, i)),
      Wf(e),
      (a = Zo()),
      e !== null && !gt
        ? (Ko(e, t, s), Zl(e, t, s))
        : (qe && a && To(t), (t.flags |= 1), Mt(e, t, l, s), t.child)
    );
  }
  function $d(e, t, l, a, i) {
    if ((Ia(t), t.stateNode === null)) {
      var s = wn,
        d = l.contextType;
      (typeof d == 'object' && d !== null && (s = Tt(d)),
        (s = new l(a, s)),
        (t.memoizedState =
          s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = os),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = a),
        (s.state = t.memoizedState),
        (s.refs = {}),
        Ho(t),
        (d = l.contextType),
        (s.context = typeof d == 'object' && d !== null ? Tt(d) : wn),
        (s.state = t.memoizedState),
        (d = l.getDerivedStateFromProps),
        typeof d == 'function' && (us(t, l, d, a), (s.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((d = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' &&
            s.UNSAFE_componentWillMount(),
          d !== s.state && os.enqueueReplaceState(s, s.state, null),
          Ti(t, a, s, i),
          zi(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      s = t.stateNode;
      var g = t.memoizedProps,
        S = nn(l, g);
      s.props = S;
      var D = s.context,
        q = l.contextType;
      ((d = wn), typeof q == 'object' && q !== null && (d = Tt(q)));
      var V = l.getDerivedStateFromProps;
      ((q =
        typeof V == 'function' ||
        typeof s.getSnapshotBeforeUpdate == 'function'),
        (g = t.pendingProps !== g),
        q ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((g || D !== d) && jd(t, s, a, d)),
        (fa = !1));
      var U = t.memoizedState;
      ((s.state = U),
        Ti(t, a, s, i),
        zi(),
        (D = t.memoizedState),
        g || U !== D || fa
          ? (typeof V == 'function' && (us(t, l, V, a), (D = t.memoizedState)),
            (S = fa || Ld(t, l, S, a, U, D, d))
              ? (q ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' &&
                    s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' &&
                  (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = D)),
            (s.props = a),
            (s.state = D),
            (s.context = d),
            (a = S))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((s = t.stateNode),
        Bo(e, t),
        (d = t.memoizedProps),
        (q = nn(l, d)),
        (s.props = q),
        (V = t.pendingProps),
        (U = s.context),
        (D = l.contextType),
        (S = wn),
        typeof D == 'object' && D !== null && (S = Tt(D)),
        (g = l.getDerivedStateFromProps),
        (D =
          typeof g == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((d !== V || U !== S) && jd(t, s, a, S)),
        (fa = !1),
        (U = t.memoizedState),
        (s.state = U),
        Ti(t, a, s, i),
        zi());
      var H = t.memoizedState;
      d !== V ||
      U !== H ||
      fa ||
      (e !== null && e.dependencies !== null && jr(e.dependencies))
        ? (typeof g == 'function' && (us(t, l, g, a), (H = t.memoizedState)),
          (q =
            fa ||
            Ld(t, l, q, a, U, H, S) ||
            (e !== null && e.dependencies !== null && jr(e.dependencies)))
            ? (D ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' &&
                  s.componentWillUpdate(a, H, S),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(a, H, S)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' &&
                (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (d === e.memoizedProps && U === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (d === e.memoizedProps && U === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = H)),
          (s.props = a),
          (s.state = H),
          (s.context = S),
          (a = q))
        : (typeof s.componentDidUpdate != 'function' ||
            (d === e.memoizedProps && U === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (d === e.memoizedProps && U === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (s = a),
      tu(e, t),
      (a = (t.flags & 128) !== 0),
      s || a
        ? ((s = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != 'function'
              ? null
              : s.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = ln(t, e.child, null, i)),
              (t.child = ln(t, null, l, i)))
            : Mt(e, t, l, i),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = Zl(e, t, i)),
      e
    );
  }
  function Wd(e, t, l, a) {
    return ($a(), (t.flags |= 256), Mt(e, t, l, a), t.child);
  }
  var ds = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function hs(e) {
    return { baseLanes: e, cachePool: Yf() };
  }
  function ms(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Ft), e);
  }
  function Id(e, t, l) {
    var a = t.pendingProps,
      i = !1,
      s = (t.flags & 128) !== 0,
      d;
    if (
      ((d = s) ||
        (d =
          e !== null && e.memoizedState === null ? !1 : (ht.current & 2) !== 0),
      d && ((i = !0), (t.flags &= -129)),
      (d = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (qe) {
        if (
          (i ? ma(t) : ya(),
          (e = lt)
            ? ((e = rm(e, nl)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ua !== null ? { id: zl, overflow: Tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Of(e)),
                (l.return = t),
                (t.child = l),
                (zt = t),
                (lt = null)))
            : (e = null),
          e === null)
        )
          throw sa(t);
        return ($s(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var g = a.children;
      return (
        (a = a.fallback),
        i
          ? (ya(),
            (i = t.mode),
            (g = lu({ mode: 'hidden', children: g }, i)),
            (a = Fa(a, i, l, null)),
            (g.return = t),
            (a.return = t),
            (g.sibling = a),
            (t.child = g),
            (a = t.child),
            (a.memoizedState = hs(l)),
            (a.childLanes = ms(e, d, l)),
            (t.memoizedState = ds),
            Oi(null, a))
          : (ma(t), ys(t, g))
      );
    }
    var S = e.memoizedState;
    if (S !== null && ((g = S.dehydrated), g !== null)) {
      if (s)
        t.flags & 256
          ? (ma(t), (t.flags &= -257), (t = vs(e, t, l)))
          : t.memoizedState !== null
            ? (ya(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (ya(),
              (g = a.fallback),
              (i = t.mode),
              (a = lu({ mode: 'visible', children: a.children }, i)),
              (g = Fa(g, i, l, null)),
              (g.flags |= 2),
              (a.return = t),
              (g.return = t),
              (a.sibling = g),
              (t.child = a),
              ln(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = hs(l)),
              (a.childLanes = ms(e, d, l)),
              (t.memoizedState = ds),
              (t = Oi(null, a)));
      else if ((ma(t), $s(g))) {
        if (((d = g.nextSibling && g.nextSibling.dataset), d)) var D = d.dgst;
        ((d = D),
          (a = Error(o(419))),
          (a.stack = ''),
          (a.digest = d),
          bi({ value: a, source: null, stack: null }),
          (t = vs(e, t, l)));
      } else if (
        (gt || An(e, t, l, !1), (d = (l & e.childLanes) !== 0), gt || d)
      ) {
        if (
          ((d = Ie),
          d !== null && ((a = A(d, l)), a !== 0 && a !== S.retryLane))
        )
          throw ((S.retryLane = a), Ja(e, a), Gt(d, e, a), cs);
        (Fs(g) || fu(), (t = vs(e, t, l)));
      } else
        Fs(g)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = S.treeContext),
            (lt = rl(g.nextSibling)),
            (zt = t),
            (qe = !0),
            (oa = null),
            (nl = !1),
            e !== null && Uf(t, e),
            (t = ys(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (ya(),
        (g = a.fallback),
        (i = t.mode),
        (S = e.child),
        (D = S.sibling),
        (a = Yl(S, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = S.subtreeFlags & 65011712),
        D !== null ? (g = Yl(D, g)) : ((g = Fa(g, i, l, null)), (g.flags |= 2)),
        (g.return = t),
        (a.return = t),
        (a.sibling = g),
        (t.child = a),
        Oi(null, a),
        (a = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = hs(l))
          : ((i = g.cachePool),
            i !== null
              ? ((S = yt._currentValue),
                (i = i.parent !== S ? { parent: S, pool: S } : i))
              : (i = Yf()),
            (g = { baseLanes: g.baseLanes | l, cachePool: i })),
        (a.memoizedState = g),
        (a.childLanes = ms(e, d, l)),
        (t.memoizedState = ds),
        Oi(e.child, a))
      : (ma(t),
        (l = e.child),
        (e = l.sibling),
        (l = Yl(l, { mode: 'visible', children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((d = t.deletions),
          d === null ? ((t.deletions = [e]), (t.flags |= 16)) : d.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function ys(e, t) {
    return (
      (t = lu({ mode: 'visible', children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function lu(e, t) {
    return ((e = Qt(22, e, null, t)), (e.lanes = 0), e);
  }
  function vs(e, t, l) {
    return (
      ln(t, e.child, null, l),
      (e = ys(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Pd(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), Oo(e.return, t, l));
  }
  function gs(e, t, l, a, i, s) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: i,
          treeForkCount: s,
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = a),
        (d.tail = l),
        (d.tailMode = i),
        (d.treeForkCount = s));
  }
  function eh(e, t, l) {
    var a = t.pendingProps,
      i = a.revealOrder,
      s = a.tail;
    a = a.children;
    var d = ht.current,
      g = (d & 2) !== 0;
    if (
      (g ? ((d = (d & 1) | 2), (t.flags |= 128)) : (d &= 1),
      F(ht, d),
      Mt(e, t, a, l),
      (a = qe ? pi : 0),
      !g && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Pd(e, l, t);
        else if (e.tag === 19) Pd(e, l, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (i) {
      case 'forwards':
        for (l = t.child, i = null; l !== null; )
          ((e = l.alternate),
            e !== null && Xr(e) === null && (i = l),
            (l = l.sibling));
        ((l = i),
          l === null
            ? ((i = t.child), (t.child = null))
            : ((i = l.sibling), (l.sibling = null)),
          gs(t, !1, i, l, s, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Xr(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = l), (l = i), (i = e));
        }
        gs(t, !0, l, null, s, a);
        break;
      case 'together':
        gs(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (pa |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((An(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, l = Yl(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (l = l.sibling = Yl(e, e.pendingProps)),
          (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function ps(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && jr(e)));
  }
  function $g(e, t, l) {
    switch (t.tag) {
      case 3:
        (nt(t, t.stateNode.containerInfo),
          ca(t, yt, e.memoizedState.cache),
          $a());
        break;
      case 27:
      case 5:
        wl(t);
        break;
      case 4:
        nt(t, t.stateNode.containerInfo);
        break;
      case 10:
        ca(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), ko(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ma(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? Id(e, t, l)
              : (ma(t), (e = Zl(e, t, l)), e !== null ? e.sibling : null);
        ma(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (An(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          i)
        ) {
          if (a) return eh(e, t, l);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          F(ht, ht.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Zd(e, t, l, t.pendingProps));
      case 24:
        ca(t, yt, e.memoizedState.cache);
    }
    return Zl(e, t, l);
  }
  function th(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) gt = !0;
      else {
        if (!ps(e, l) && (t.flags & 128) === 0) return ((gt = !1), $g(e, t, l));
        gt = (e.flags & 131072) !== 0;
      }
    else ((gt = !1), qe && (t.flags & 1048576) !== 0 && Nf(t, pi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (((e = en(t.elementType)), (t.type = e), typeof e == 'function'))
            Ro(e)
              ? ((a = nn(e, a)), (t.tag = 1), (t = $d(null, t, e, a, l)))
              : ((t.tag = 0), (t = fs(null, t, e, a, l)));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === J) {
                ((t.tag = 11), (t = kd(null, t, e, a, l)));
                break e;
              } else if (i === T) {
                ((t.tag = 14), (t = Xd(null, t, e, a, l)));
                break e;
              }
            }
            throw ((t = Pe(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return fs(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((a = t.type), (i = nn(a, t.pendingProps)), $d(e, t, a, i, l));
      case 3:
        e: {
          if ((nt(t, t.stateNode.containerInfo), e === null))
            throw Error(o(387));
          a = t.pendingProps;
          var s = t.memoizedState;
          ((i = s.element), Bo(e, t), Ti(t, a, null, l));
          var d = t.memoizedState;
          if (
            ((a = d.cache),
            ca(t, yt, a),
            a !== s.cache && Do(t, [yt], l, !0),
            zi(),
            (a = d.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: a, isDehydrated: !1, cache: d.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = Wd(e, t, a, l);
              break e;
            } else if (a !== i) {
              ((i = tl(Error(o(424)), t)), bi(i), (t = Wd(e, t, a, l)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === 'HTML' ? e.ownerDocument.body : e),
                  lt = rl(e.firstChild),
                  zt = t,
                  qe = !0,
                  oa = null,
                  nl = !0,
                  l = Zf(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if (($a(), a === i)) {
              t = Zl(e, t, l);
              break e;
            }
            Mt(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          tu(e, t),
          e === null
            ? (l = dm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : qe ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = pu(fe.current).createElement(l)),
                (a[P] = t),
                (a[ne] = e),
                At(a, l, e),
                rt(a),
                (t.stateNode = a))
            : (t.memoizedState = dm(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          wl(t),
          e === null &&
            qe &&
            ((a = t.stateNode = sm(t.type, t.pendingProps, fe.current)),
            (zt = t),
            (nl = !0),
            (i = lt),
            Ra(t.type) ? ((Ws = i), (lt = rl(a.firstChild))) : (lt = i)),
          Mt(e, t, t.pendingProps.children, l),
          tu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            qe &&
            ((i = a = lt) &&
              ((a = Tp(a, t.type, t.pendingProps, nl)),
              a !== null
                ? ((t.stateNode = a),
                  (zt = t),
                  (lt = rl(a.firstChild)),
                  (nl = !1),
                  (i = !0))
                : (i = !1)),
            i || sa(t)),
          wl(t),
          (i = t.type),
          (s = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (a = s.children),
          Zs(i, s) ? (a = null) : d !== null && Zs(i, d) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((i = Qo(e, t, Gg, null, null, l)), (Zi._currentValue = i)),
          tu(e, t),
          Mt(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            qe &&
            ((e = l = lt) &&
              ((l = Mp(l, t.pendingProps, nl)),
              l !== null
                ? ((t.stateNode = l), (zt = t), (lt = null), (e = !0))
                : (e = !1)),
            e || sa(t)),
          null
        );
      case 13:
        return Id(e, t, l);
      case 4:
        return (
          nt(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = ln(t, null, a, l)) : Mt(e, t, a, l),
          t.child
        );
      case 11:
        return kd(e, t, t.type, t.pendingProps, l);
      case 7:
        return (Mt(e, t, t.pendingProps, l), t.child);
      case 8:
        return (Mt(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (Mt(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          ca(t, t.type, a.value),
          Mt(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (i = t.type._context),
          (a = t.pendingProps.children),
          Ia(t),
          (i = Tt(i)),
          (a = a(i)),
          (t.flags |= 1),
          Mt(e, t, a, l),
          t.child
        );
      case 14:
        return Xd(e, t, t.type, t.pendingProps, l);
      case 15:
        return Qd(e, t, t.type, t.pendingProps, l);
      case 19:
        return eh(e, t, l);
      case 31:
        return Fg(e, t, l);
      case 22:
        return Zd(e, t, l, t.pendingProps);
      case 24:
        return (
          Ia(t),
          (a = Tt(yt)),
          e === null
            ? ((i = Lo()),
              i === null &&
                ((i = Ie),
                (s = No()),
                (i.pooledCache = s),
                s.refCount++,
                s !== null && (i.pooledCacheLanes |= l),
                (i = s)),
              (t.memoizedState = { parent: a, cache: i }),
              Ho(t),
              ca(t, yt, i))
            : ((e.lanes & l) !== 0 && (Bo(e, t), Ti(t, null, null, l), zi()),
              (i = e.memoizedState),
              (s = t.memoizedState),
              i.parent !== a
                ? ((i = { parent: a, cache: a }),
                  (t.memoizedState = i),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = i),
                  ca(t, yt, a))
                : ((a = s.cache),
                  ca(t, yt, a),
                  a !== i.cache && Do(t, [yt], l, !0))),
          Mt(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Kl(e) {
    e.flags |= 4;
  }
  function bs(e, t, l, a, i) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (i & 335544128) === i))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ah()) e.flags |= 8192;
        else throw ((tn = Yr), jo);
    } else e.flags &= -16777217;
  }
  function lh(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !gm(t)))
      if (Ah()) e.flags |= 8192;
      else throw ((tn = Yr), jo);
  }
  function au(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Ga() : 536870912), (e.lanes |= t), (Yn |= t)));
  }
  function Di(e, t) {
    if (!qe)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var l = null; t !== null; )
            (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = e.tail;
          for (var a = null; l !== null; )
            (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function at(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var i = e.child; i !== null; )
        ((l |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags & 65011712),
          (a |= i.flags & 65011712),
          (i.return = e),
          (i = i.sibling));
    else
      for (i = e.child; i !== null; )
        ((l |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags),
          (a |= i.flags),
          (i.return = e),
          (i = i.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = l), t);
  }
  function Wg(e, t, l) {
    var a = t.pendingProps;
    switch ((Mo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (at(t), null);
      case 1:
        return (at(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          kl(yt),
          we(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Mn(t)
              ? Kl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Co())),
          at(t),
          null
        );
      case 26:
        var i = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (Kl(t),
              s !== null ? (at(t), lh(t, s)) : (at(t), bs(t, i, null, a, l)))
            : s
              ? s !== e.memoizedState
                ? (Kl(t), at(t), lh(t, s))
                : (at(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== a && Kl(t),
                at(t),
                bs(t, i, e, a, l)),
          null
        );
      case 27:
        if (
          (hl(t),
          (l = fe.current),
          (i = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== a && Kl(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (at(t), null);
          }
          ((e = te.current),
            Mn(t) ? Lf(t) : ((e = sm(i, a, l)), (t.stateNode = e), Kl(t)));
        }
        return (at(t), null);
      case 5:
        if ((hl(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Kl(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (at(t), null);
          }
          if (((s = te.current), Mn(t))) Lf(t);
          else {
            var d = pu(fe.current);
            switch (s) {
              case 1:
                s = d.createElementNS('http://www.w3.org/2000/svg', i);
                break;
              case 2:
                s = d.createElementNS('http://www.w3.org/1998/Math/MathML', i);
                break;
              default:
                switch (i) {
                  case 'svg':
                    s = d.createElementNS('http://www.w3.org/2000/svg', i);
                    break;
                  case 'math':
                    s = d.createElementNS(
                      'http://www.w3.org/1998/Math/MathML',
                      i
                    );
                    break;
                  case 'script':
                    ((s = d.createElement('div')),
                      (s.innerHTML = '<script><\/script>'),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case 'select':
                    ((s =
                      typeof a.is == 'string'
                        ? d.createElement('select', { is: a.is })
                        : d.createElement('select')),
                      a.multiple
                        ? (s.multiple = !0)
                        : a.size && (s.size = a.size));
                    break;
                  default:
                    s =
                      typeof a.is == 'string'
                        ? d.createElement(i, { is: a.is })
                        : d.createElement(i);
                }
            }
            ((s[P] = t), (s[ne] = a));
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6) s.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ((d.child.return = d), (d = d.child));
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t) break e;
                d = d.return;
              }
              ((d.sibling.return = d.return), (d = d.sibling));
            }
            t.stateNode = s;
            e: switch ((At(s, i, a), i)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break e;
              case 'img':
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Kl(t);
          }
        }
        return (
          at(t),
          bs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Kl(t);
        else {
          if (typeof a != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = fe.current), Mn(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (i = zt),
              i !== null)
            )
              switch (i.tag) {
                case 27:
                case 5:
                  a = i.memoizedProps;
              }
            ((e[P] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Ih(e.nodeValue, l)
              )),
              e || sa(t, !0));
          } else ((e = pu(e).createTextNode(a)), (e[P] = t), (t.stateNode = e));
        }
        return (at(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = Mn(t)), l !== null)) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(o(557));
              e[P] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (at(t), (e = !1));
          } else
            ((l = Co()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Kt(t), t) : (Kt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (at(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = Mn(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(o(318));
              if (
                ((i = t.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(o(317));
              i[P] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (at(t), (i = !1));
          } else
            ((i = Co()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = i),
              (i = !0));
          if (!i) return t.flags & 256 ? (Kt(t), t) : (Kt(t), null);
        }
        return (
          Kt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = a !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((a = t.child),
                (i = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (i = a.alternate.memoizedState.cachePool.pool),
                (s = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (s = a.memoizedState.cachePool.pool),
                s !== i && (a.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              au(t, t.updateQueue),
              at(t),
              null)
        );
      case 4:
        return (we(), e === null && Gs(t.stateNode.containerInfo), at(t), null);
      case 10:
        return (kl(t.type), at(t), null);
      case 19:
        if ((B(ht), (a = t.memoizedState), a === null)) return (at(t), null);
        if (((i = (t.flags & 128) !== 0), (s = a.rendering), s === null))
          if (i) Di(a, !1);
          else {
            if (ct !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = Xr(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      Di(a, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      au(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (_f(l, e), (l = l.sibling));
                  return (
                    F(ht, (ht.current & 1) | 2),
                    qe && Gl(t, a.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            a.tail !== null &&
              ft() > ou &&
              ((t.flags |= 128), (i = !0), Di(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = Xr(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                au(t, e),
                Di(a, !0),
                a.tail === null &&
                  a.tailMode === 'hidden' &&
                  !s.alternate &&
                  !qe)
              )
                return (at(t), null);
            } else
              2 * ft() - a.renderingStartTime > ou &&
                l !== 536870912 &&
                ((t.flags |= 128), (i = !0), Di(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = a.last),
              e !== null ? (e.sibling = s) : (t.child = s),
              (a.last = s));
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = ft()),
            (e.sibling = null),
            (l = ht.current),
            F(ht, i ? (l & 1) | 2 : l & 1),
            qe && Gl(t, a.treeForkCount),
            e)
          : (at(t), null);
      case 22:
      case 23:
        return (
          Kt(t),
          Vo(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (at(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : at(t),
          (l = t.updateQueue),
          l !== null && au(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && B(Pa),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          kl(yt),
          at(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Ig(e, t) {
    switch ((Mo(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          kl(yt),
          we(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (hl(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Kt(t), t.alternate === null)) throw Error(o(340));
          $a();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (Kt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          $a();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (B(ht), null);
      case 4:
        return (we(), null);
      case 10:
        return (kl(t.type), null);
      case 22:
      case 23:
        return (
          Kt(t),
          Vo(),
          e !== null && B(Pa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (kl(yt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ah(e, t) {
    switch ((Mo(t), t.tag)) {
      case 3:
        (kl(yt), we());
        break;
      case 26:
      case 27:
      case 5:
        hl(t);
        break;
      case 4:
        we();
        break;
      case 31:
        t.memoizedState !== null && Kt(t);
        break;
      case 13:
        Kt(t);
        break;
      case 19:
        B(ht);
        break;
      case 10:
        kl(t.type);
        break;
      case 22:
      case 23:
        (Kt(t), Vo(), e !== null && B(Pa));
        break;
      case 24:
        kl(yt);
    }
  }
  function Ni(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var s = l.create,
              d = l.inst;
            ((a = s()), (d.destroy = a));
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (g) {
      Je(t, t.return, g);
    }
  }
  function va(e, t, l) {
    try {
      var a = t.updateQueue,
        i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst,
              g = d.destroy;
            if (g !== void 0) {
              ((d.destroy = void 0), (i = t));
              var S = l,
                D = g;
              try {
                D();
              } catch (q) {
                Je(i, S, q);
              }
            }
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (q) {
      Je(t, t.return, q);
    }
  }
  function nh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Jf(t, l);
      } catch (a) {
        Je(e, e.return, a);
      }
    }
  }
  function ih(e, t, l) {
    ((l.props = nn(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      Je(e, t, a);
    }
  }
  function Ui(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == 'function' ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (i) {
      Je(e, t, i);
    }
  }
  function Ml(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (i) {
          Je(e, t, i);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (i) {
          Je(e, t, i);
        }
      else l.current = null;
  }
  function rh(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break e;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (i) {
      Je(e, e.return, i);
    }
  }
  function Ss(e, t, l) {
    try {
      var a = e.stateNode;
      (Sp(a, e.type, l, t), (a[ne] = t));
    } catch (i) {
      Je(e, e.return, i);
    }
  }
  function uh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ra(e.type)) ||
      e.tag === 4
    );
  }
  function Es(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || uh(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Ra(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function xs(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === 'HTML'
                  ? l.ownerDocument.body
                  : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Bl)));
    else if (
      a !== 4 &&
      (a === 27 && Ra(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (xs(e, t, l), e = e.sibling; e !== null; )
        (xs(e, t, l), (e = e.sibling));
  }
  function nu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (
      a !== 4 &&
      (a === 27 && Ra(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (nu(e, t, l), e = e.sibling; e !== null; )
        (nu(e, t, l), (e = e.sibling));
  }
  function oh(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      (At(t, a, l), (t[P] = e), (t[ne] = l));
    } catch (s) {
      Je(e, e.return, s);
    }
  }
  var Jl = !1,
    pt = !1,
    Rs = !1,
    sh = typeof WeakSet == 'function' ? WeakSet : Set,
    Rt = null;
  function Pg(e, t) {
    if (((e = e.containerInfo), (Xs = zu), (e = Ef(e)), vo(e))) {
      if ('selectionStart' in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var i = a.anchorOffset,
              s = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, s.nodeType);
            } catch {
              l = null;
              break e;
            }
            var d = 0,
              g = -1,
              S = -1,
              D = 0,
              q = 0,
              V = e,
              U = null;
            t: for (;;) {
              for (
                var H;
                V !== l || (i !== 0 && V.nodeType !== 3) || (g = d + i),
                  V !== s || (a !== 0 && V.nodeType !== 3) || (S = d + a),
                  V.nodeType === 3 && (d += V.nodeValue.length),
                  (H = V.firstChild) !== null;
              )
                ((U = V), (V = H));
              for (;;) {
                if (V === e) break t;
                if (
                  (U === l && ++D === i && (g = d),
                  U === s && ++q === a && (S = d),
                  (H = V.nextSibling) !== null)
                )
                  break;
                ((V = U), (U = V.parentNode));
              }
              V = H;
            }
            l = g === -1 || S === -1 ? null : { start: g, end: S };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      Qs = { focusedElem: e, selectionRange: l }, zu = !1, Rt = t;
      Rt !== null;
    )
      if (
        ((t = Rt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (Rt = e));
      else
        for (; Rt !== null; ) {
          switch (((t = Rt), (s = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (l = 0; l < e.length; l++)
                  ((i = e[l]), (i.ref.impl = i.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                ((e = void 0),
                  (l = t),
                  (i = s.memoizedProps),
                  (s = s.memoizedState),
                  (a = l.stateNode));
                try {
                  var se = nn(l.type, i);
                  ((e = a.getSnapshotBeforeUpdate(se, s)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (be) {
                  Je(l, l.return, be);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  Js(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Js(e);
                      break;
                    default:
                      e.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Rt = e));
            break;
          }
          Rt = t.return;
        }
  }
  function ch(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ($l(e, l), a & 4 && Ni(5, l));
        break;
      case 1:
        if (($l(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (d) {
              Je(l, l.return, d);
            }
          else {
            var i = nn(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (d) {
              Je(l, l.return, d);
            }
          }
        (a & 64 && nh(l), a & 512 && Ui(l, l.return));
        break;
      case 3:
        if (($l(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Jf(e, t);
          } catch (d) {
            Je(l, l.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && oh(l);
      case 26:
      case 5:
        ($l(e, l), t === null && a & 4 && rh(l), a & 512 && Ui(l, l.return));
        break;
      case 12:
        $l(e, l);
        break;
      case 31:
        ($l(e, l), a & 4 && hh(e, l));
        break;
      case 13:
        ($l(e, l),
          a & 4 && mh(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = op.bind(null, l)), Ap(e, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Jl), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || pt), (i = Jl));
          var s = pt;
          ((Jl = a),
            (pt = t) && !s ? Wl(e, l, (l.subtreeFlags & 8772) !== 0) : $l(e, l),
            (Jl = i),
            (pt = s));
        }
        break;
      case 30:
        break;
      default:
        $l(e, l);
    }
  }
  function fh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), fh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && tt(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var ut = null,
    Ht = !1;
  function Fl(e, t, l) {
    for (l = l.child; l !== null; ) (dh(e, t, l), (l = l.sibling));
  }
  function dh(e, t, l) {
    if (ot && typeof ot.onCommitFiberUnmount == 'function')
      try {
        ot.onCommitFiberUnmount(Ha, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (pt || Ml(l, t),
          Fl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        pt || Ml(l, t);
        var a = ut,
          i = Ht;
        (Ra(l.type) && ((ut = l.stateNode), (Ht = !1)),
          Fl(e, t, l),
          ki(l.stateNode),
          (ut = a),
          (Ht = i));
        break;
      case 5:
        pt || Ml(l, t);
      case 6:
        if (
          ((a = ut),
          (i = Ht),
          (ut = null),
          Fl(e, t, l),
          (ut = a),
          (Ht = i),
          ut !== null)
        )
          if (Ht)
            try {
              (ut.nodeType === 9
                ? ut.body
                : ut.nodeName === 'HTML'
                  ? ut.ownerDocument.body
                  : ut
              ).removeChild(l.stateNode);
            } catch (s) {
              Je(l, t, s);
            }
          else
            try {
              ut.removeChild(l.stateNode);
            } catch (s) {
              Je(l, t, s);
            }
        break;
      case 18:
        ut !== null &&
          (Ht
            ? ((e = ut),
              nm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === 'HTML'
                    ? e.ownerDocument.body
                    : e,
                l.stateNode
              ),
              Jn(e))
            : nm(ut, l.stateNode));
        break;
      case 4:
        ((a = ut),
          (i = Ht),
          (ut = l.stateNode.containerInfo),
          (Ht = !0),
          Fl(e, t, l),
          (ut = a),
          (Ht = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (va(2, l, t), pt || va(4, l, t), Fl(e, t, l));
        break;
      case 1:
        (pt ||
          (Ml(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == 'function' && ih(l, t, a)),
          Fl(e, t, l));
        break;
      case 21:
        Fl(e, t, l);
        break;
      case 22:
        ((pt = (a = pt) || l.memoizedState !== null), Fl(e, t, l), (pt = a));
        break;
      default:
        Fl(e, t, l);
    }
  }
  function hh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Jn(e);
      } catch (l) {
        Je(t, t.return, l);
      }
    }
  }
  function mh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Jn(e);
      } catch (l) {
        Je(t, t.return, l);
      }
  }
  function ep(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new sh()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new sh()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function iu(e, t) {
    var l = ep(e);
    t.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var i = sp.bind(null, e, a);
        a.then(i, i);
      }
    });
  }
  function Bt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var i = l[a],
          s = e,
          d = t,
          g = d;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (Ra(g.type)) {
                ((ut = g.stateNode), (Ht = !1));
                break e;
              }
              break;
            case 5:
              ((ut = g.stateNode), (Ht = !1));
              break e;
            case 3:
            case 4:
              ((ut = g.stateNode.containerInfo), (Ht = !0));
              break e;
          }
          g = g.return;
        }
        if (ut === null) throw Error(o(160));
        (dh(s, d, i),
          (ut = null),
          (Ht = !1),
          (s = i.alternate),
          s !== null && (s.return = null),
          (i.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (yh(t, e), (t = t.sibling));
  }
  var El = null;
  function yh(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Bt(t, e),
          qt(e),
          a & 4 && (va(3, e, e.return), Ni(3, e), va(5, e, e.return)));
        break;
      case 1:
        (Bt(t, e),
          qt(e),
          a & 512 && (pt || l === null || Ml(l, l.return)),
          a & 64 &&
            Jl &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var i = El;
        if (
          (Bt(t, e),
          qt(e),
          a & 512 && (pt || l === null || Ml(l, l.return)),
          a & 4)
        ) {
          var s = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type),
                    (l = e.memoizedProps),
                    (i = i.ownerDocument || i));
                  t: switch (a) {
                    case 'title':
                      ((s = i.getElementsByTagName('title')[0]),
                        (!s ||
                          s[Ze] ||
                          s[P] ||
                          s.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          s.hasAttribute('itemprop')) &&
                          ((s = i.createElement(a)),
                          i.head.insertBefore(
                            s,
                            i.querySelector('head > title')
                          )),
                        At(s, a, l),
                        (s[P] = e),
                        rt(s),
                        (a = s));
                      break e;
                    case 'link':
                      var d = ym('link', 'href', i).get(a + (l.href || ''));
                      if (d) {
                        for (var g = 0; g < d.length; g++)
                          if (
                            ((s = d[g]),
                            s.getAttribute('href') ===
                              (l.href == null || l.href === ''
                                ? null
                                : l.href) &&
                              s.getAttribute('rel') ===
                                (l.rel == null ? null : l.rel) &&
                              s.getAttribute('title') ===
                                (l.title == null ? null : l.title) &&
                              s.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            d.splice(g, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(a)),
                        At(s, a, l),
                        i.head.appendChild(s));
                      break;
                    case 'meta':
                      if (
                        (d = ym('meta', 'content', i).get(
                          a + (l.content || '')
                        ))
                      ) {
                        for (g = 0; g < d.length; g++)
                          if (
                            ((s = d[g]),
                            s.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              s.getAttribute('name') ===
                                (l.name == null ? null : l.name) &&
                              s.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              s.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              s.getAttribute('charset') ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            d.splice(g, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(a)),
                        At(s, a, l),
                        i.head.appendChild(s));
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  ((s[P] = e), rt(s), (a = s));
                }
                e.stateNode = a;
              } else vm(i, e.type, e.stateNode);
            else e.stateNode = mm(i, a, e.memoizedProps);
          else
            s !== a
              ? (s === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : s.count--,
                a === null
                  ? vm(i, e.type, e.stateNode)
                  : mm(i, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                Ss(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Bt(t, e),
          qt(e),
          a & 512 && (pt || l === null || Ml(l, l.return)),
          l !== null && a & 4 && Ss(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (Bt(t, e),
          qt(e),
          a & 512 && (pt || l === null || Ml(l, l.return)),
          e.flags & 32)
        ) {
          i = e.stateNode;
          try {
            gn(i, '');
          } catch (se) {
            Je(e, e.return, se);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Ss(e, i, l !== null ? l.memoizedProps : i)),
          a & 1024 && (Rs = !0));
        break;
      case 6:
        if ((Bt(t, e), qt(e), a & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((a = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = a;
          } catch (se) {
            Je(e, e.return, se);
          }
        }
        break;
      case 3:
        if (
          ((Eu = null),
          (i = El),
          (El = bu(t.containerInfo)),
          Bt(t, e),
          (El = i),
          qt(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Jn(t.containerInfo);
          } catch (se) {
            Je(e, e.return, se);
          }
        Rs && ((Rs = !1), vh(e));
        break;
      case 4:
        ((a = El),
          (El = bu(e.stateNode.containerInfo)),
          Bt(t, e),
          qt(e),
          (El = a));
        break;
      case 12:
        (Bt(t, e), qt(e));
        break;
      case 31:
        (Bt(t, e),
          qt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), iu(e, a))));
        break;
      case 13:
        (Bt(t, e),
          qt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (uu = ft()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), iu(e, a))));
        break;
      case 22:
        i = e.memoizedState !== null;
        var S = l !== null && l.memoizedState !== null,
          D = Jl,
          q = pt;
        if (
          ((Jl = D || i),
          (pt = q || S),
          Bt(t, e),
          (pt = q),
          (Jl = D),
          qt(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (l === null || S || Jl || pt || rn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                S = l = t;
                try {
                  if (((s = S.stateNode), i))
                    ((d = s.style),
                      typeof d.setProperty == 'function'
                        ? d.setProperty('display', 'none', 'important')
                        : (d.display = 'none'));
                  else {
                    g = S.stateNode;
                    var V = S.memoizedProps.style,
                      U =
                        V != null && V.hasOwnProperty('display')
                          ? V.display
                          : null;
                    g.style.display =
                      U == null || typeof U == 'boolean' ? '' : ('' + U).trim();
                  }
                } catch (se) {
                  Je(S, S.return, se);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                S = t;
                try {
                  S.stateNode.nodeValue = i ? '' : S.memoizedProps;
                } catch (se) {
                  Je(S, S.return, se);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                S = t;
                try {
                  var H = S.stateNode;
                  i ? im(H, !0) : im(S.stateNode, !1);
                } catch (se) {
                  Je(S, S.return, se);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (l === t && (l = null), (t = t.return));
            }
            (l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), iu(e, l))));
        break;
      case 19:
        (Bt(t, e),
          qt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), iu(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Bt(t, e), qt(e));
    }
  }
  function qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (uh(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var i = l.stateNode,
              s = Es(e);
            nu(e, s, i);
            break;
          case 5:
            var d = l.stateNode;
            l.flags & 32 && (gn(d, ''), (l.flags &= -33));
            var g = Es(e);
            nu(e, g, d);
            break;
          case 3:
          case 4:
            var S = l.stateNode.containerInfo,
              D = Es(e);
            xs(e, D, S);
            break;
          default:
            throw Error(o(161));
        }
      } catch (q) {
        Je(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function vh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (vh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function $l(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (ch(e, t.alternate, t), (t = t.sibling));
  }
  function rn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (va(4, t, t.return), rn(t));
          break;
        case 1:
          Ml(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && ih(t, t.return, l),
            rn(t));
          break;
        case 27:
          ki(t.stateNode);
        case 26:
        case 5:
          (Ml(t, t.return), rn(t));
          break;
        case 22:
          t.memoizedState === null && rn(t);
          break;
        case 30:
          rn(t);
          break;
        default:
          rn(t);
      }
      e = e.sibling;
    }
  }
  function Wl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        i = e,
        s = t,
        d = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (Wl(i, s, l), Ni(4, s));
          break;
        case 1:
          if (
            (Wl(i, s, l),
            (a = s),
            (i = a.stateNode),
            typeof i.componentDidMount == 'function')
          )
            try {
              i.componentDidMount();
            } catch (D) {
              Je(a, a.return, D);
            }
          if (((a = s), (i = a.updateQueue), i !== null)) {
            var g = a.stateNode;
            try {
              var S = i.shared.hiddenCallbacks;
              if (S !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < S.length; i++)
                  Kf(S[i], g);
            } catch (D) {
              Je(a, a.return, D);
            }
          }
          (l && d & 64 && nh(s), Ui(s, s.return));
          break;
        case 27:
          oh(s);
        case 26:
        case 5:
          (Wl(i, s, l), l && a === null && d & 4 && rh(s), Ui(s, s.return));
          break;
        case 12:
          Wl(i, s, l);
          break;
        case 31:
          (Wl(i, s, l), l && d & 4 && hh(i, s));
          break;
        case 13:
          (Wl(i, s, l), l && d & 4 && mh(i, s));
          break;
        case 22:
          (s.memoizedState === null && Wl(i, s, l), Ui(s, s.return));
          break;
        case 30:
          break;
        default:
          Wl(i, s, l);
      }
      t = t.sibling;
    }
  }
  function ws(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Si(l)));
  }
  function zs(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Si(e)));
  }
  function xl(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (gh(e, t, l, a), (t = t.sibling));
  }
  function gh(e, t, l, a) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (xl(e, t, l, a), i & 2048 && Ni(9, t));
        break;
      case 1:
        xl(e, t, l, a);
        break;
      case 3:
        (xl(e, t, l, a),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Si(e))));
        break;
      case 12:
        if (i & 2048) {
          (xl(e, t, l, a), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              d = s.id,
              g = s.onPostCommit;
            typeof g == 'function' &&
              g(
                d,
                t.alternate === null ? 'mount' : 'update',
                e.passiveEffectDuration,
                -0
              );
          } catch (S) {
            Je(t, t.return, S);
          }
        } else xl(e, t, l, a);
        break;
      case 31:
        xl(e, t, l, a);
        break;
      case 13:
        xl(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (d = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? xl(e, t, l, a)
              : Li(e, t)
            : s._visibility & 2
              ? xl(e, t, l, a)
              : ((s._visibility |= 2),
                Hn(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && ws(d, t));
        break;
      case 24:
        (xl(e, t, l, a), i & 2048 && zs(t.alternate, t));
        break;
      default:
        xl(e, t, l, a);
    }
  }
  function Hn(e, t, l, a, i) {
    for (
      i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var s = e,
        d = t,
        g = l,
        S = a,
        D = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (Hn(s, d, g, S, i), Ni(8, d));
          break;
        case 23:
          break;
        case 22:
          var q = d.stateNode;
          (d.memoizedState !== null
            ? q._visibility & 2
              ? Hn(s, d, g, S, i)
              : Li(s, d)
            : ((q._visibility |= 2), Hn(s, d, g, S, i)),
            i && D & 2048 && ws(d.alternate, d));
          break;
        case 24:
          (Hn(s, d, g, S, i), i && D & 2048 && zs(d.alternate, d));
          break;
        default:
          Hn(s, d, g, S, i);
      }
      t = t.sibling;
    }
  }
  function Li(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          i = a.flags;
        switch (a.tag) {
          case 22:
            (Li(l, a), i & 2048 && ws(a.alternate, a));
            break;
          case 24:
            (Li(l, a), i & 2048 && zs(a.alternate, a));
            break;
          default:
            Li(l, a);
        }
        t = t.sibling;
      }
  }
  var ji = 8192;
  function Bn(e, t, l) {
    if (e.subtreeFlags & ji)
      for (e = e.child; e !== null; ) (ph(e, t, l), (e = e.sibling));
  }
  function ph(e, t, l) {
    switch (e.tag) {
      case 26:
        (Bn(e, t, l),
          e.flags & ji &&
            e.memoizedState !== null &&
            Yp(l, El, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Bn(e, t, l);
        break;
      case 3:
      case 4:
        var a = El;
        ((El = bu(e.stateNode.containerInfo)), Bn(e, t, l), (El = a));
        break;
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = ji), (ji = 16777216), Bn(e, t, l), (ji = a))
            : Bn(e, t, l));
        break;
      default:
        Bn(e, t, l);
    }
  }
  function bh(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Hi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((Rt = a), Eh(a, e));
        }
      bh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Sh(e), (e = e.sibling));
  }
  function Sh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Hi(e), e.flags & 2048 && va(9, e, e.return));
        break;
      case 3:
        Hi(e);
        break;
      case 12:
        Hi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ru(e))
          : Hi(e);
        break;
      default:
        Hi(e);
    }
  }
  function ru(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((Rt = a), Eh(a, e));
        }
      bh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (va(8, t, t.return), ru(t));
          break;
        case 22:
          ((l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), ru(t)));
          break;
        default:
          ru(t);
      }
      e = e.sibling;
    }
  }
  function Eh(e, t) {
    for (; Rt !== null; ) {
      var l = Rt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          va(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Si(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (Rt = a));
      else
        e: for (l = e; Rt !== null; ) {
          a = Rt;
          var i = a.sibling,
            s = a.return;
          if ((fh(a), a === l)) {
            Rt = null;
            break e;
          }
          if (i !== null) {
            ((i.return = s), (Rt = i));
            break e;
          }
          Rt = s;
        }
    }
  }
  var tp = {
      getCacheForType: function (e) {
        var t = Tt(yt),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return Tt(yt).controller.signal;
      },
    },
    lp = typeof WeakMap == 'function' ? WeakMap : Map,
    Qe = 0,
    Ie = null,
    De = null,
    Ue = 0,
    Ke = 0,
    Jt = null,
    ga = !1,
    qn = !1,
    Ts = !1,
    Il = 0,
    ct = 0,
    pa = 0,
    un = 0,
    Ms = 0,
    Ft = 0,
    Yn = 0,
    Bi = null,
    Yt = null,
    As = !1,
    uu = 0,
    xh = 0,
    ou = 1 / 0,
    su = null,
    ba = null,
    Et = 0,
    Sa = null,
    Gn = null,
    Pl = 0,
    Cs = 0,
    _s = null,
    Rh = null,
    qi = 0,
    Os = null;
  function $t() {
    return (Qe & 2) !== 0 && Ue !== 0 ? Ue & -Ue : _.T !== null ? Hs() : $();
  }
  function wh() {
    if (Ft === 0)
      if ((Ue & 536870912) === 0 || qe) {
        var e = Ba;
        ((Ba <<= 1), (Ba & 3932160) === 0 && (Ba = 262144), (Ft = e));
      } else Ft = 536870912;
    return ((e = Zt.current), e !== null && (e.flags |= 32), Ft);
  }
  function Gt(e, t, l) {
    (((e === Ie && (Ke === 2 || Ke === 9)) || e.cancelPendingCommit !== null) &&
      (Vn(e, 0), Ea(e, Ue, Ft, !1)),
      ia(e, l),
      ((Qe & 2) === 0 || e !== Ie) &&
        (e === Ie &&
          ((Qe & 2) === 0 && (un |= l), ct === 4 && Ea(e, Ue, Ft, !1)),
        Al(e)));
  }
  function zh(e, t, l) {
    if ((Qe & 6) !== 0) throw Error(o(327));
    var a = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ya(e, t),
      i = a ? ip(e, t) : Ns(e, t, !0),
      s = a;
    do {
      if (i === 0) {
        qn && !a && Ea(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), s && !ap(l))) {
          ((i = Ns(e, t, !1)), (s = !1));
          continue;
        }
        if (i === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var d = 0;
          else
            ((d = e.pendingLanes & -536870913),
              (d = d !== 0 ? d : d & 536870912 ? 536870912 : 0));
          if (d !== 0) {
            t = d;
            e: {
              var g = e;
              i = Bi;
              var S = g.current.memoizedState.isDehydrated;
              if ((S && (Vn(g, d).flags |= 256), (d = Ns(g, d, !1)), d !== 2)) {
                if (Ts && !S) {
                  ((g.errorRecoveryDisabledLanes |= s), (un |= s), (i = 4));
                  break e;
                }
                ((s = Yt),
                  (Yt = i),
                  s !== null &&
                    (Yt === null ? (Yt = s) : Yt.push.apply(Yt, s)));
              }
              i = d;
            }
            if (((s = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (Vn(e, 0), Ea(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (s = i), s)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ea(a, t, Ft, !ga);
              break e;
            case 2:
              Yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((i = uu + 300 - ft()), 10 < i)) {
            if ((Ea(a, t, Ft, !ga), qa(a, 0, !0) !== 0)) break e;
            ((Pl = t),
              (a.timeoutHandle = lm(
                Th.bind(
                  null,
                  a,
                  l,
                  Yt,
                  su,
                  As,
                  t,
                  Ft,
                  un,
                  Yn,
                  ga,
                  s,
                  'Throttled',
                  -0,
                  0
                ),
                i
              )));
            break e;
          }
          Th(a, l, Yt, su, As, t, Ft, un, Yn, ga, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Al(e);
  }
  function Th(e, t, l, a, i, s, d, g, S, D, q, V, U, H) {
    if (
      ((e.timeoutHandle = -1),
      (V = t.subtreeFlags),
      V & 8192 || (V & 16785408) === 16785408)
    ) {
      ((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bl,
      }),
        ph(t, s, V));
      var se =
        (s & 62914560) === s ? uu - ft() : (s & 4194048) === s ? xh - ft() : 0;
      if (((se = Gp(V, se)), se !== null)) {
        ((Pl = s),
          (e.cancelPendingCommit = se(
            Uh.bind(null, e, t, s, l, a, i, d, g, S, q, V, null, U, H)
          )),
          Ea(e, s, d, !D));
        return;
      }
    }
    Uh(e, t, s, l, a, i, d, g, S);
  }
  function ap(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var i = l[a],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!Xt(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        ((l.return = t), (t = l));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Ea(e, t, l, a) {
    ((t &= ~Ms),
      (t &= ~un),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var i = t; 0 < i; ) {
      var s = 31 - Ct(i),
        d = 1 << s;
      ((a[s] = -1), (i &= ~d));
    }
    l !== 0 && Sr(e, l, t);
  }
  function cu() {
    return (Qe & 6) === 0 ? (Yi(0), !1) : !0;
  }
  function Ds() {
    if (De !== null) {
      if (Ke === 0) var e = De.return;
      else ((e = De), (Vl = Wa = null), Jo(e), (Dn = null), (xi = 0), (e = De));
      for (; e !== null; ) (ah(e.alternate, e), (e = e.return));
      De = null;
    }
  }
  function Vn(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), Rp(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Pl = 0),
      Ds(),
      (Ie = e),
      (De = l = Yl(e.current, null)),
      (Ue = t),
      (Ke = 0),
      (Jt = null),
      (ga = !1),
      (qn = Ya(e, t)),
      (Ts = !1),
      (Yn = Ft = Ms = un = pa = ct = 0),
      (Yt = Bi = null),
      (As = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var i = 31 - Ct(a),
          s = 1 << i;
        ((t |= e[i]), (a &= ~s));
      }
    return ((Il = t), Or(), l);
  }
  function Mh(e, t) {
    ((ze = null),
      (_.H = _i),
      t === On || t === qr
        ? ((t = kf()), (Ke = 3))
        : t === jo
          ? ((t = kf()), (Ke = 4))
          : (Ke =
              t === cs
                ? 8
                : t !== null &&
                    typeof t == 'object' &&
                    typeof t.then == 'function'
                  ? 6
                  : 1),
      (Jt = t),
      De === null && ((ct = 1), Pr(e, tl(t, e.current))));
  }
  function Ah() {
    var e = Zt.current;
    return e === null
      ? !0
      : (Ue & 4194048) === Ue
        ? il === null
        : (Ue & 62914560) === Ue || (Ue & 536870912) !== 0
          ? e === il
          : !1;
  }
  function Ch() {
    var e = _.H;
    return ((_.H = _i), e === null ? _i : e);
  }
  function _h() {
    var e = _.A;
    return ((_.A = tp), e);
  }
  function fu() {
    ((ct = 4),
      ga || ((Ue & 4194048) !== Ue && Zt.current !== null) || (qn = !0),
      ((pa & 134217727) === 0 && (un & 134217727) === 0) ||
        Ie === null ||
        Ea(Ie, Ue, Ft, !1));
  }
  function Ns(e, t, l) {
    var a = Qe;
    Qe |= 2;
    var i = Ch(),
      s = _h();
    ((Ie !== e || Ue !== t) && ((su = null), Vn(e, t)), (t = !1));
    var d = ct;
    e: do
      try {
        if (Ke !== 0 && De !== null) {
          var g = De,
            S = Jt;
          switch (Ke) {
            case 8:
              (Ds(), (d = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (t = !0);
              var D = Ke;
              if (((Ke = 0), (Jt = null), kn(e, g, S, D), l && qn)) {
                d = 0;
                break e;
              }
              break;
            default:
              ((D = Ke), (Ke = 0), (Jt = null), kn(e, g, S, D));
          }
        }
        (np(), (d = ct));
        break;
      } catch (q) {
        Mh(e, q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Vl = Wa = null),
      (Qe = a),
      (_.H = i),
      (_.A = s),
      De === null && ((Ie = null), (Ue = 0), Or()),
      d
    );
  }
  function np() {
    for (; De !== null; ) Oh(De);
  }
  function ip(e, t) {
    var l = Qe;
    Qe |= 2;
    var a = Ch(),
      i = _h();
    Ie !== e || Ue !== t
      ? ((su = null), (ou = ft() + 500), Vn(e, t))
      : (qn = Ya(e, t));
    e: do
      try {
        if (Ke !== 0 && De !== null) {
          t = De;
          var s = Jt;
          t: switch (Ke) {
            case 1:
              ((Ke = 0), (Jt = null), kn(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (Gf(s)) {
                ((Ke = 0), (Jt = null), Dh(t));
                break;
              }
              ((t = function () {
                ((Ke !== 2 && Ke !== 9) || Ie !== e || (Ke = 7), Al(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              Ke = 7;
              break e;
            case 4:
              Ke = 5;
              break e;
            case 7:
              Gf(s)
                ? ((Ke = 0), (Jt = null), Dh(t))
                : ((Ke = 0), (Jt = null), kn(e, t, s, 7));
              break;
            case 5:
              var d = null;
              switch (De.tag) {
                case 26:
                  d = De.memoizedState;
                case 5:
                case 27:
                  var g = De;
                  if (d ? gm(d) : g.stateNode.complete) {
                    ((Ke = 0), (Jt = null));
                    var S = g.sibling;
                    if (S !== null) De = S;
                    else {
                      var D = g.return;
                      D !== null ? ((De = D), du(D)) : (De = null);
                    }
                    break t;
                  }
              }
              ((Ke = 0), (Jt = null), kn(e, t, s, 5));
              break;
            case 6:
              ((Ke = 0), (Jt = null), kn(e, t, s, 6));
              break;
            case 8:
              (Ds(), (ct = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        rp();
        break;
      } catch (q) {
        Mh(e, q);
      }
    while (!0);
    return (
      (Vl = Wa = null),
      (_.H = a),
      (_.A = i),
      (Qe = l),
      De !== null ? 0 : ((Ie = null), (Ue = 0), Or(), ct)
    );
  }
  function rp() {
    for (; De !== null && !Fu(); ) Oh(De);
  }
  function Oh(e) {
    var t = th(e.alternate, e, Il);
    ((e.memoizedProps = e.pendingProps), t === null ? du(e) : (De = t));
  }
  function Dh(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Fd(l, t, t.pendingProps, t.type, void 0, Ue);
        break;
      case 11:
        t = Fd(l, t, t.pendingProps, t.type.render, t.ref, Ue);
        break;
      case 5:
        Jo(t);
      default:
        (ah(l, t), (t = De = _f(t, Il)), (t = th(l, t, Il)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? du(e) : (De = t));
  }
  function kn(e, t, l, a) {
    ((Vl = Wa = null), Jo(t), (Dn = null), (xi = 0));
    var i = t.return;
    try {
      if (Jg(e, i, t, l, Ue)) {
        ((ct = 1), Pr(e, tl(l, e.current)), (De = null));
        return;
      }
    } catch (s) {
      if (i !== null) throw ((De = i), s);
      ((ct = 1), Pr(e, tl(l, e.current)), (De = null));
      return;
    }
    t.flags & 32768
      ? (qe || a === 1
          ? (e = !0)
          : qn || (Ue & 536870912) !== 0
            ? (e = !1)
            : ((ga = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = Zt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        Nh(t, e))
      : du(t);
  }
  function du(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Nh(t, ga);
        return;
      }
      e = t.return;
      var l = Wg(t.alternate, t, Il);
      if (l !== null) {
        De = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        De = t;
        return;
      }
      De = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function Nh(e, t) {
    do {
      var l = Ig(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (De = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        De = e;
        return;
      }
      De = e = l;
    } while (e !== null);
    ((ct = 6), (De = null));
  }
  function Uh(e, t, l, a, i, s, d, g, S) {
    e.cancelPendingCommit = null;
    do hu();
    while (Et !== 0);
    if ((Qe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= Eo),
        Pu(e, l, s, d, g, S),
        e === Ie && ((De = Ie = null), (Ue = 0)),
        (Gn = t),
        (Sa = e),
        (Pl = l),
        (Cs = s),
        (_s = i),
        (Rh = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            cp(Ut, function () {
              return (qh(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = _.T), (_.T = null), (i = X.p), (X.p = 2), (d = Qe), (Qe |= 4));
        try {
          Pg(e, t, l);
        } finally {
          ((Qe = d), (X.p = i), (_.T = a));
        }
      }
      ((Et = 1), Lh(), jh(), Hh());
    }
  }
  function Lh() {
    if (Et === 1) {
      Et = 0;
      var e = Sa,
        t = Gn,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = _.T), (_.T = null));
        var a = X.p;
        X.p = 2;
        var i = Qe;
        Qe |= 4;
        try {
          yh(t, e);
          var s = Qs,
            d = Ef(e.containerInfo),
            g = s.focusedElem,
            S = s.selectionRange;
          if (
            d !== g &&
            g &&
            g.ownerDocument &&
            Sf(g.ownerDocument.documentElement, g)
          ) {
            if (S !== null && vo(g)) {
              var D = S.start,
                q = S.end;
              if ((q === void 0 && (q = D), 'selectionStart' in g))
                ((g.selectionStart = D),
                  (g.selectionEnd = Math.min(q, g.value.length)));
              else {
                var V = g.ownerDocument || document,
                  U = (V && V.defaultView) || window;
                if (U.getSelection) {
                  var H = U.getSelection(),
                    se = g.textContent.length,
                    be = Math.min(S.start, se),
                    We = S.end === void 0 ? be : Math.min(S.end, se);
                  !H.extend && be > We && ((d = We), (We = be), (be = d));
                  var C = bf(g, be),
                    R = bf(g, We);
                  if (
                    C &&
                    R &&
                    (H.rangeCount !== 1 ||
                      H.anchorNode !== C.node ||
                      H.anchorOffset !== C.offset ||
                      H.focusNode !== R.node ||
                      H.focusOffset !== R.offset)
                  ) {
                    var O = V.createRange();
                    (O.setStart(C.node, C.offset),
                      H.removeAllRanges(),
                      be > We
                        ? (H.addRange(O), H.extend(R.node, R.offset))
                        : (O.setEnd(R.node, R.offset), H.addRange(O)));
                  }
                }
              }
            }
            for (V = [], H = g; (H = H.parentNode); )
              H.nodeType === 1 &&
                V.push({ element: H, left: H.scrollLeft, top: H.scrollTop });
            for (
              typeof g.focus == 'function' && g.focus(), g = 0;
              g < V.length;
              g++
            ) {
              var G = V[g];
              ((G.element.scrollLeft = G.left), (G.element.scrollTop = G.top));
            }
          }
          ((zu = !!Xs), (Qs = Xs = null));
        } finally {
          ((Qe = i), (X.p = a), (_.T = l));
        }
      }
      ((e.current = t), (Et = 2));
    }
  }
  function jh() {
    if (Et === 2) {
      Et = 0;
      var e = Sa,
        t = Gn,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = _.T), (_.T = null));
        var a = X.p;
        X.p = 2;
        var i = Qe;
        Qe |= 4;
        try {
          ch(e, t.alternate, t);
        } finally {
          ((Qe = i), (X.p = a), (_.T = l));
        }
      }
      Et = 3;
    }
  }
  function Hh() {
    if (Et === 4 || Et === 3) {
      ((Et = 0), $u());
      var e = Sa,
        t = Gn,
        l = Pl,
        a = Rh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Et = 5)
        : ((Et = 0), (Gn = Sa = null), Bh(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && (ba = null),
        Z(l),
        (t = t.stateNode),
        ot && typeof ot.onCommitFiberRoot == 'function')
      )
        try {
          ot.onCommitFiberRoot(Ha, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = _.T), (i = X.p), (X.p = 2), (_.T = null));
        try {
          for (var s = e.onRecoverableError, d = 0; d < a.length; d++) {
            var g = a[d];
            s(g.value, { componentStack: g.stack });
          }
        } finally {
          ((_.T = t), (X.p = i));
        }
      }
      ((Pl & 3) !== 0 && hu(),
        Al(e),
        (i = e.pendingLanes),
        (l & 261930) !== 0 && (i & 42) !== 0
          ? e === Os
            ? qi++
            : ((qi = 0), (Os = e))
          : (qi = 0),
        Yi(0));
    }
  }
  function Bh(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Si(t)));
  }
  function hu() {
    return (Lh(), jh(), Hh(), qh());
  }
  function qh() {
    if (Et !== 5) return !1;
    var e = Sa,
      t = Cs;
    Cs = 0;
    var l = Z(Pl),
      a = _.T,
      i = X.p;
    try {
      ((X.p = 32 > l ? 32 : l), (_.T = null), (l = _s), (_s = null));
      var s = Sa,
        d = Pl;
      if (((Et = 0), (Gn = Sa = null), (Pl = 0), (Qe & 6) !== 0))
        throw Error(o(331));
      var g = Qe;
      if (
        ((Qe |= 4),
        Sh(s.current),
        gh(s, s.current, d, l),
        (Qe = g),
        Yi(0, !1),
        ot && typeof ot.onPostCommitFiberRoot == 'function')
      )
        try {
          ot.onPostCommitFiberRoot(Ha, s);
        } catch {}
      return !0;
    } finally {
      ((X.p = i), (_.T = a), Bh(e, t));
    }
  }
  function Yh(e, t, l) {
    ((t = tl(l, t)),
      (t = ss(e.stateNode, t, 2)),
      (e = ha(e, t, 2)),
      e !== null && (ia(e, 2), Al(e)));
  }
  function Je(e, t, l) {
    if (e.tag === 3) Yh(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Yh(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' &&
              (ba === null || !ba.has(a)))
          ) {
            ((e = tl(l, e)),
              (l = Gd(2)),
              (a = ha(t, l, 2)),
              a !== null && (Vd(l, a, t, e), ia(a, 2), Al(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Us(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new lp();
      var i = new Set();
      a.set(t, i);
    } else ((i = a.get(t)), i === void 0 && ((i = new Set()), a.set(t, i)));
    i.has(l) ||
      ((Ts = !0), i.add(l), (e = up.bind(null, e, t, l)), t.then(e, e));
  }
  function up(e, t, l) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ie === e &&
        (Ue & l) === l &&
        (ct === 4 || (ct === 3 && (Ue & 62914560) === Ue && 300 > ft() - uu)
          ? (Qe & 2) === 0 && Vn(e, 0)
          : (Ms |= l),
        Yn === Ue && (Yn = 0)),
      Al(e));
  }
  function Gh(e, t) {
    (t === 0 && (t = Ga()), (e = Ja(e, t)), e !== null && (ia(e, t), Al(e)));
  }
  function op(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Gh(e, l));
  }
  function sp(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          i = e.memoizedState;
        i !== null && (l = i.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(t), Gh(e, l));
  }
  function cp(e, t) {
    return ai(e, t);
  }
  var mu = null,
    Xn = null,
    Ls = !1,
    yu = !1,
    js = !1,
    xa = 0;
  function Al(e) {
    (e !== Xn &&
      e.next === null &&
      (Xn === null ? (mu = Xn = e) : (Xn = Xn.next = e)),
      (yu = !0),
      Ls || ((Ls = !0), dp()));
  }
  function Yi(e, t) {
    if (!js && yu) {
      js = !0;
      do
        for (var l = !1, a = mu; a !== null; ) {
          if (e !== 0) {
            var i = a.pendingLanes;
            if (i === 0) var s = 0;
            else {
              var d = a.suspendedLanes,
                g = a.pingedLanes;
              ((s = (1 << (31 - Ct(42 | e) + 1)) - 1),
                (s &= i & ~(d & ~g)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((l = !0), Qh(a, s));
          } else
            ((s = Ue),
              (s = qa(
                a,
                a === Ie ? s : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (s & 3) === 0 || Ya(a, s) || ((l = !0), Qh(a, s)));
          a = a.next;
        }
      while (l);
      js = !1;
    }
  }
  function fp() {
    Vh();
  }
  function Vh() {
    yu = Ls = !1;
    var e = 0;
    xa !== 0 && xp() && (e = xa);
    for (var t = ft(), l = null, a = mu; a !== null; ) {
      var i = a.next,
        s = kh(a, t);
      (s === 0
        ? ((a.next = null),
          l === null ? (mu = i) : (l.next = i),
          i === null && (Xn = l))
        : ((l = a), (e !== 0 || (s & 3) !== 0) && (yu = !0)),
        (a = i));
    }
    ((Et !== 0 && Et !== 5) || Yi(e), xa !== 0 && (xa = 0));
  }
  function kh(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        i = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var d = 31 - Ct(s),
        g = 1 << d,
        S = i[d];
      (S === -1
        ? ((g & l) === 0 || (g & a) !== 0) && (i[d] = br(g, t))
        : S <= t && (e.expiredLanes |= g),
        (s &= ~g));
    }
    if (
      ((t = Ie),
      (l = Ue),
      (l = qa(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (Ke === 2 || Ke === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && ni(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Ya(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && ni(a), Z(l))) {
        case 2:
        case 8:
          l = yn;
          break;
        case 32:
          l = Ut;
          break;
        case 268435456:
          l = ri;
          break;
        default:
          l = Ut;
      }
      return (
        (a = Xh.bind(null, e)),
        (l = ai(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && ni(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Xh(e, t) {
    if (Et !== 0 && Et !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (hu() && e.callbackNode !== l) return null;
    var a = Ue;
    return (
      (a = qa(
        e,
        e === Ie ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (zh(e, a, t),
          kh(e, ft()),
          e.callbackNode != null && e.callbackNode === l
            ? Xh.bind(null, e)
            : null)
    );
  }
  function Qh(e, t) {
    if (hu()) return null;
    zh(e, t, !0);
  }
  function dp() {
    wp(function () {
      (Qe & 6) !== 0 ? ai(ii, fp) : Vh();
    });
  }
  function Hs() {
    if (xa === 0) {
      var e = Cn;
      (e === 0 && ((e = Ll), (Ll <<= 1), (Ll & 261888) === 0 && (Ll = 256)),
        (xa = e));
    }
    return xa;
  }
  function Zh(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Rr('' + e);
  }
  function Kh(e, t) {
    var l = t.ownerDocument.createElement('input');
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute('form', e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function hp(e, t, l, a, i) {
    if (t === 'submit' && l && l.stateNode === i) {
      var s = Zh((i[ne] || null).action),
        d = a.submitter;
      d &&
        ((t = (t = d[ne] || null)
          ? Zh(t.formAction)
          : d.getAttribute('formAction')),
        t !== null && ((s = t), (d = null)));
      var g = new Mr('action', 'action', null, a, i);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (xa !== 0) {
                  var S = d ? Kh(i, d) : new FormData(i);
                  as(
                    l,
                    { pending: !0, data: S, method: i.method, action: s },
                    null,
                    S
                  );
                }
              } else
                typeof s == 'function' &&
                  (g.preventDefault(),
                  (S = d ? Kh(i, d) : new FormData(i)),
                  as(
                    l,
                    { pending: !0, data: S, method: i.method, action: s },
                    s,
                    S
                  ));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var Bs = 0; Bs < So.length; Bs++) {
    var qs = So[Bs],
      mp = qs.toLowerCase(),
      yp = qs[0].toUpperCase() + qs.slice(1);
    Sl(mp, 'on' + yp);
  }
  (Sl(wf, 'onAnimationEnd'),
    Sl(zf, 'onAnimationIteration'),
    Sl(Tf, 'onAnimationStart'),
    Sl('dblclick', 'onDoubleClick'),
    Sl('focusin', 'onFocus'),
    Sl('focusout', 'onBlur'),
    Sl(Og, 'onTransitionRun'),
    Sl(Dg, 'onTransitionStart'),
    Sl(Ng, 'onTransitionCancel'),
    Sl(Mf, 'onTransitionEnd'),
    It('onMouseEnter', ['mouseout', 'mouseover']),
    It('onMouseLeave', ['mouseout', 'mouseover']),
    It('onPointerEnter', ['pointerout', 'pointerover']),
    It('onPointerLeave', ['pointerout', 'pointerover']),
    pl(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    pl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    pl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    pl(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    pl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    pl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Gi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    vp = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'
        .split(' ')
        .concat(Gi)
    );
  function Jh(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        i = a.event;
      a = a.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var g = a[d],
              S = g.instance,
              D = g.currentTarget;
            if (((g = g.listener), S !== s && i.isPropagationStopped()))
              break e;
            ((s = g), (i.currentTarget = D));
            try {
              s(i);
            } catch (q) {
              _r(q);
            }
            ((i.currentTarget = null), (s = S));
          }
        else
          for (d = 0; d < a.length; d++) {
            if (
              ((g = a[d]),
              (S = g.instance),
              (D = g.currentTarget),
              (g = g.listener),
              S !== s && i.isPropagationStopped())
            )
              break e;
            ((s = g), (i.currentTarget = D));
            try {
              s(i);
            } catch (q) {
              _r(q);
            }
            ((i.currentTarget = null), (s = S));
          }
      }
    }
  }
  function Ne(e, t) {
    var l = t[pe];
    l === void 0 && (l = t[pe] = new Set());
    var a = e + '__bubble';
    l.has(a) || (Fh(t, e, 2, !1), l.add(a));
  }
  function Ys(e, t, l) {
    var a = 0;
    (t && (a |= 4), Fh(l, e, a, t));
  }
  var vu = '_reactListening' + Math.random().toString(36).slice(2);
  function Gs(e) {
    if (!e[vu]) {
      ((e[vu] = !0),
        gl.forEach(function (l) {
          l !== 'selectionchange' && (vp.has(l) || Ys(l, !1, e), Ys(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[vu] || ((t[vu] = !0), Ys('selectionchange', !1, t));
    }
  }
  function Fh(e, t, l, a) {
    switch (wm(t)) {
      case 2:
        var i = Xp;
        break;
      case 8:
        i = Qp;
        break;
      default:
        i = lc;
    }
    ((l = i.bind(null, t, l, e)),
      (i = void 0),
      !ro ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (i = !0),
      a
        ? i !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: i })
          : e.addEventListener(t, l, !0)
        : i !== void 0
          ? e.addEventListener(t, l, { passive: i })
          : e.addEventListener(t, l, !1));
  }
  function Vs(e, t, l, a, i) {
    var s = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var g = a.stateNode.containerInfo;
          if (g === i) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var S = d.tag;
              if ((S === 3 || S === 4) && d.stateNode.containerInfo === i)
                return;
              d = d.return;
            }
          for (; g !== null; ) {
            if (((d = it(g)), d === null)) return;
            if (((S = d.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              a = s = d;
              continue e;
            }
            g = g.parentNode;
          }
        }
        a = a.return;
      }
    Pc(function () {
      var D = s,
        q = no(l),
        V = [];
      e: {
        var U = Af.get(e);
        if (U !== void 0) {
          var H = Mr,
            se = e;
          switch (e) {
            case 'keypress':
              if (zr(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              H = sg;
              break;
            case 'focusin':
              ((se = 'focus'), (H = co));
              break;
            case 'focusout':
              ((se = 'blur'), (H = co));
              break;
            case 'beforeblur':
            case 'afterblur':
              H = co;
              break;
            case 'click':
              if (l.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              H = lf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              H = Wv;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              H = dg;
              break;
            case wf:
            case zf:
            case Tf:
              H = eg;
              break;
            case Mf:
              H = mg;
              break;
            case 'scroll':
            case 'scrollend':
              H = Fv;
              break;
            case 'wheel':
              H = vg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              H = lg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              H = nf;
              break;
            case 'toggle':
            case 'beforetoggle':
              H = pg;
          }
          var be = (t & 4) !== 0,
            We = !be && (e === 'scroll' || e === 'scrollend'),
            C = be ? (U !== null ? U + 'Capture' : null) : U;
          be = [];
          for (var R = D, O; R !== null; ) {
            var G = R;
            if (
              ((O = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                O === null ||
                C === null ||
                ((G = si(R, C)), G != null && be.push(Vi(R, G, O))),
              We)
            )
              break;
            R = R.return;
          }
          0 < be.length &&
            ((U = new H(U, se, null, l, q)),
            V.push({ event: U, listeners: be }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((U = e === 'mouseover' || e === 'pointerover'),
            (H = e === 'mouseout' || e === 'pointerout'),
            U &&
              l !== ao &&
              (se = l.relatedTarget || l.fromElement) &&
              (it(se) || se[ue]))
          )
            break e;
          if (
            (H || U) &&
            ((U =
              q.window === q
                ? q
                : (U = q.ownerDocument)
                  ? U.defaultView || U.parentWindow
                  : window),
            H
              ? ((se = l.relatedTarget || l.toElement),
                (H = D),
                (se = se ? it(se) : null),
                se !== null &&
                  ((We = f(se)),
                  (be = se.tag),
                  se !== We || (be !== 5 && be !== 27 && be !== 6)) &&
                  (se = null))
              : ((H = null), (se = D)),
            H !== se)
          ) {
            if (
              ((be = lf),
              (G = 'onMouseLeave'),
              (C = 'onMouseEnter'),
              (R = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((be = nf),
                (G = 'onPointerLeave'),
                (C = 'onPointerEnter'),
                (R = 'pointer')),
              (We = H == null ? U : St(H)),
              (O = se == null ? U : St(se)),
              (U = new be(G, R + 'leave', H, l, q)),
              (U.target = We),
              (U.relatedTarget = O),
              (G = null),
              it(q) === D &&
                ((be = new be(C, R + 'enter', se, l, q)),
                (be.target = O),
                (be.relatedTarget = We),
                (G = be)),
              (We = G),
              H && se)
            )
              t: {
                for (be = gp, C = H, R = se, O = 0, G = C; G; G = be(G)) O++;
                G = 0;
                for (var ge = R; ge; ge = be(ge)) G++;
                for (; 0 < O - G; ) ((C = be(C)), O--);
                for (; 0 < G - O; ) ((R = be(R)), G--);
                for (; O--; ) {
                  if (C === R || (R !== null && C === R.alternate)) {
                    be = C;
                    break t;
                  }
                  ((C = be(C)), (R = be(R)));
                }
                be = null;
              }
            else be = null;
            (H !== null && $h(V, U, H, be, !1),
              se !== null && We !== null && $h(V, We, se, be, !0));
          }
        }
        e: {
          if (
            ((U = D ? St(D) : window),
            (H = U.nodeName && U.nodeName.toLowerCase()),
            H === 'select' || (H === 'input' && U.type === 'file'))
          )
            var Ge = hf;
          else if (ff(U))
            if (mf) Ge = Ag;
            else {
              Ge = Tg;
              var me = zg;
            }
          else
            ((H = U.nodeName),
              !H ||
              H.toLowerCase() !== 'input' ||
              (U.type !== 'checkbox' && U.type !== 'radio')
                ? D && lo(D.elementType) && (Ge = hf)
                : (Ge = Mg));
          if (Ge && (Ge = Ge(e, D))) {
            df(V, Ge, l, q);
            break e;
          }
          (me && me(e, U, D),
            e === 'focusout' &&
              D &&
              U.type === 'number' &&
              D.memoizedProps.value != null &&
              to(U, 'number', U.value));
        }
        switch (((me = D ? St(D) : window), e)) {
          case 'focusin':
            (ff(me) || me.contentEditable === 'true') &&
              ((En = me), (go = D), (gi = null));
            break;
          case 'focusout':
            gi = go = En = null;
            break;
          case 'mousedown':
            po = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((po = !1), xf(V, l, q));
            break;
          case 'selectionchange':
            if (_g) break;
          case 'keydown':
          case 'keyup':
            xf(V, l, q);
        }
        var Te;
        if (ho)
          e: {
            switch (e) {
              case 'compositionstart':
                var Le = 'onCompositionStart';
                break e;
              case 'compositionend':
                Le = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Le = 'onCompositionUpdate';
                break e;
            }
            Le = void 0;
          }
        else
          Sn
            ? sf(e, l) && (Le = 'onCompositionEnd')
            : e === 'keydown' &&
              l.keyCode === 229 &&
              (Le = 'onCompositionStart');
        (Le &&
          (rf &&
            l.locale !== 'ko' &&
            (Sn || Le !== 'onCompositionStart'
              ? Le === 'onCompositionEnd' && Sn && (Te = ef())
              : ((ra = q),
                (uo = 'value' in ra ? ra.value : ra.textContent),
                (Sn = !0))),
          (me = gu(D, Le)),
          0 < me.length &&
            ((Le = new af(Le, e, null, l, q)),
            V.push({ event: Le, listeners: me }),
            Te
              ? (Le.data = Te)
              : ((Te = cf(l)), Te !== null && (Le.data = Te)))),
          (Te = Sg ? Eg(e, l) : xg(e, l)) &&
            ((Le = gu(D, 'onBeforeInput')),
            0 < Le.length &&
              ((me = new af('onBeforeInput', 'beforeinput', null, l, q)),
              V.push({ event: me, listeners: Le }),
              (me.data = Te))),
          hp(V, e, D, l, q));
      }
      Jh(V, t);
    });
  }
  function Vi(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function gu(e, t) {
    for (var l = t + 'Capture', a = []; e !== null; ) {
      var i = e,
        s = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          s === null ||
          ((i = si(e, l)),
          i != null && a.unshift(Vi(e, i, s)),
          (i = si(e, t)),
          i != null && a.push(Vi(e, i, s))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function gp(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $h(e, t, l, a, i) {
    for (var s = t._reactName, d = []; l !== null && l !== a; ) {
      var g = l,
        S = g.alternate,
        D = g.stateNode;
      if (((g = g.tag), S !== null && S === a)) break;
      ((g !== 5 && g !== 26 && g !== 27) ||
        D === null ||
        ((S = D),
        i
          ? ((D = si(l, s)), D != null && d.unshift(Vi(l, D, S)))
          : i || ((D = si(l, s)), D != null && d.push(Vi(l, D, S)))),
        (l = l.return));
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var pp = /\r\n?/g,
    bp = /\u0000|\uFFFD/g;
  function Wh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        pp,
        `
`
      )
      .replace(bp, '');
  }
  function Ih(e, t) {
    return ((t = Wh(t)), Wh(e) === t);
  }
  function $e(e, t, l, a, i, s) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? t === 'body' || (t === 'textarea' && a === '') || gn(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') &&
            t !== 'body' &&
            gn(e, '' + a);
        break;
      case 'className':
        bl(e, 'class', a);
        break;
      case 'tabIndex':
        bl(e, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        bl(e, l, a);
        break;
      case 'style':
        Wc(e, a, s);
        break;
      case 'data':
        if (t !== 'object') {
          bl(e, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (t !== 'a' || l !== 'href')) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == 'function' ||
          typeof a == 'symbol' ||
          typeof a == 'boolean'
        ) {
          e.removeAttribute(l);
          break;
        }
        ((a = Rr('' + a)), e.setAttribute(l, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && $e(e, t, 'name', i.name, i, null),
                $e(e, t, 'formEncType', i.formEncType, i, null),
                $e(e, t, 'formMethod', i.formMethod, i, null),
                $e(e, t, 'formTarget', i.formTarget, i, null))
              : ($e(e, t, 'encType', i.encType, i, null),
                $e(e, t, 'method', i.method, i, null),
                $e(e, t, 'target', i.target, i, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((a = Rr('' + a)), e.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (e.onclick = Bl);
        break;
      case 'onScroll':
        a != null && Ne('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && Ne('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (i.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        e.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        e.muted = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (
          a == null ||
          typeof a == 'function' ||
          typeof a == 'boolean' ||
          typeof a == 'symbol'
        ) {
          e.removeAttribute('xlink:href');
          break;
        }
        ((l = Rr('' + a)),
          e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        a != null && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '' + a)
          : e.removeAttribute(l);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        a && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '')
          : e.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? e.setAttribute(l, '')
          : a !== !1 &&
              a != null &&
              typeof a != 'function' &&
              typeof a != 'symbol'
            ? e.setAttribute(l, a)
            : e.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null &&
        typeof a != 'function' &&
        typeof a != 'symbol' &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case 'popover':
        (Ne('beforetoggle', e), Ne('toggle', e), dt(e, 'popover', a));
        break;
      case 'xlinkActuate':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        wt(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        wt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        wt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        wt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        dt(e, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== 'o' && l[0] !== 'O') ||
          (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Kv.get(l) || l), dt(e, l, a));
    }
  }
  function ks(e, t, l, a, i, s) {
    switch (l) {
      case 'style':
        Wc(e, a, s);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (i.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? gn(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && gn(e, '' + a);
        break;
      case 'onScroll':
        a != null && Ne('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && Ne('scrollend', e);
        break;
      case 'onClick':
        a != null && (e.onclick = Bl);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!kt.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((i = l.endsWith('Capture')),
              (t = l.slice(2, i ? l.length - 7 : void 0)),
              (s = e[ne] || null),
              (s = s != null ? s[l] : null),
              typeof s == 'function' && e.removeEventListener(t, s, i),
              typeof a == 'function')
            ) {
              (typeof s != 'function' &&
                s !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, i));
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
                ? e.setAttribute(l, '')
                : dt(e, l, a);
          }
    }
  }
  function At(e, t, l) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (Ne('error', e), Ne('load', e));
        var a = !1,
          i = !1,
          s;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var d = l[s];
            if (d != null)
              switch (s) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  i = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  $e(e, t, s, d, l, null);
              }
          }
        (i && $e(e, t, 'srcSet', l.srcSet, l, null),
          a && $e(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        Ne('invalid', e);
        var g = (s = d = i = null),
          S = null,
          D = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var q = l[a];
            if (q != null)
              switch (a) {
                case 'name':
                  i = q;
                  break;
                case 'type':
                  d = q;
                  break;
                case 'checked':
                  S = q;
                  break;
                case 'defaultChecked':
                  D = q;
                  break;
                case 'value':
                  s = q;
                  break;
                case 'defaultValue':
                  g = q;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (q != null) throw Error(o(137, t));
                  break;
                default:
                  $e(e, t, a, q, l, null);
              }
          }
        Kc(e, s, g, S, D, d, i, !1);
        return;
      case 'select':
        (Ne('invalid', e), (a = d = s = null));
        for (i in l)
          if (l.hasOwnProperty(i) && ((g = l[i]), g != null))
            switch (i) {
              case 'value':
                s = g;
                break;
              case 'defaultValue':
                d = g;
                break;
              case 'multiple':
                a = g;
              default:
                $e(e, t, i, g, l, null);
            }
        ((t = s),
          (l = d),
          (e.multiple = !!a),
          t != null ? vn(e, !!a, t, !1) : l != null && vn(e, !!a, l, !0));
        return;
      case 'textarea':
        (Ne('invalid', e), (s = i = a = null));
        for (d in l)
          if (l.hasOwnProperty(d) && ((g = l[d]), g != null))
            switch (d) {
              case 'value':
                a = g;
                break;
              case 'defaultValue':
                i = g;
                break;
              case 'children':
                s = g;
                break;
              case 'dangerouslySetInnerHTML':
                if (g != null) throw Error(o(91));
                break;
              default:
                $e(e, t, d, g, l, null);
            }
        Fc(e, a, i, s);
        return;
      case 'option':
        for (S in l)
          l.hasOwnProperty(S) &&
            ((a = l[S]), a != null) &&
            (S === 'selected'
              ? (e.selected =
                  a && typeof a != 'function' && typeof a != 'symbol')
              : $e(e, t, S, a, l, null));
        return;
      case 'dialog':
        (Ne('beforetoggle', e),
          Ne('toggle', e),
          Ne('cancel', e),
          Ne('close', e));
        break;
      case 'iframe':
      case 'object':
        Ne('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Gi.length; a++) Ne(Gi[a], e);
        break;
      case 'image':
        (Ne('error', e), Ne('load', e));
        break;
      case 'details':
        Ne('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Ne('error', e), Ne('load', e));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (D in l)
          if (l.hasOwnProperty(D) && ((a = l[D]), a != null))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, t));
              default:
                $e(e, t, D, a, l, null);
            }
        return;
      default:
        if (lo(t)) {
          for (q in l)
            l.hasOwnProperty(q) &&
              ((a = l[q]), a !== void 0 && ks(e, t, q, a, l, void 0));
          return;
        }
    }
    for (g in l)
      l.hasOwnProperty(g) && ((a = l[g]), a != null && $e(e, t, g, a, l, null));
  }
  function Sp(e, t, l, a) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var i = null,
          s = null,
          d = null,
          g = null,
          S = null,
          D = null,
          q = null;
        for (H in l) {
          var V = l[H];
          if (l.hasOwnProperty(H) && V != null)
            switch (H) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                S = V;
              default:
                a.hasOwnProperty(H) || $e(e, t, H, null, a, V);
            }
        }
        for (var U in a) {
          var H = a[U];
          if (((V = l[U]), a.hasOwnProperty(U) && (H != null || V != null)))
            switch (U) {
              case 'type':
                s = H;
                break;
              case 'name':
                i = H;
                break;
              case 'checked':
                D = H;
                break;
              case 'defaultChecked':
                q = H;
                break;
              case 'value':
                d = H;
                break;
              case 'defaultValue':
                g = H;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (H != null) throw Error(o(137, t));
                break;
              default:
                H !== V && $e(e, t, U, H, a, V);
            }
        }
        eo(e, d, g, S, D, q, s, i);
        return;
      case 'select':
        H = d = g = U = null;
        for (s in l)
          if (((S = l[s]), l.hasOwnProperty(s) && S != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                H = S;
              default:
                a.hasOwnProperty(s) || $e(e, t, s, null, a, S);
            }
        for (i in a)
          if (
            ((s = a[i]),
            (S = l[i]),
            a.hasOwnProperty(i) && (s != null || S != null))
          )
            switch (i) {
              case 'value':
                U = s;
                break;
              case 'defaultValue':
                g = s;
                break;
              case 'multiple':
                d = s;
              default:
                s !== S && $e(e, t, i, s, a, S);
            }
        ((t = g),
          (l = d),
          (a = H),
          U != null
            ? vn(e, !!l, U, !1)
            : !!a != !!l &&
              (t != null ? vn(e, !!l, t, !0) : vn(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        H = U = null;
        for (g in l)
          if (
            ((i = l[g]),
            l.hasOwnProperty(g) && i != null && !a.hasOwnProperty(g))
          )
            switch (g) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                $e(e, t, g, null, a, i);
            }
        for (d in a)
          if (
            ((i = a[d]),
            (s = l[d]),
            a.hasOwnProperty(d) && (i != null || s != null))
          )
            switch (d) {
              case 'value':
                U = i;
                break;
              case 'defaultValue':
                H = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(o(91));
                break;
              default:
                i !== s && $e(e, t, d, i, a, s);
            }
        Jc(e, U, H);
        return;
      case 'option':
        for (var se in l)
          ((U = l[se]),
            l.hasOwnProperty(se) &&
              U != null &&
              !a.hasOwnProperty(se) &&
              (se === 'selected'
                ? (e.selected = !1)
                : $e(e, t, se, null, a, U)));
        for (S in a)
          ((U = a[S]),
            (H = l[S]),
            a.hasOwnProperty(S) &&
              U !== H &&
              (U != null || H != null) &&
              (S === 'selected'
                ? (e.selected =
                    U && typeof U != 'function' && typeof U != 'symbol')
                : $e(e, t, S, U, a, H)));
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var be in l)
          ((U = l[be]),
            l.hasOwnProperty(be) &&
              U != null &&
              !a.hasOwnProperty(be) &&
              $e(e, t, be, null, a, U));
        for (D in a)
          if (
            ((U = a[D]),
            (H = l[D]),
            a.hasOwnProperty(D) && U !== H && (U != null || H != null))
          )
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (U != null) throw Error(o(137, t));
                break;
              default:
                $e(e, t, D, U, a, H);
            }
        return;
      default:
        if (lo(t)) {
          for (var We in l)
            ((U = l[We]),
              l.hasOwnProperty(We) &&
                U !== void 0 &&
                !a.hasOwnProperty(We) &&
                ks(e, t, We, void 0, a, U));
          for (q in a)
            ((U = a[q]),
              (H = l[q]),
              !a.hasOwnProperty(q) ||
                U === H ||
                (U === void 0 && H === void 0) ||
                ks(e, t, q, U, a, H));
          return;
        }
    }
    for (var C in l)
      ((U = l[C]),
        l.hasOwnProperty(C) &&
          U != null &&
          !a.hasOwnProperty(C) &&
          $e(e, t, C, null, a, U));
    for (V in a)
      ((U = a[V]),
        (H = l[V]),
        !a.hasOwnProperty(V) ||
          U === H ||
          (U == null && H == null) ||
          $e(e, t, V, U, a, H));
  }
  function Ph(e) {
    switch (e) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function Ep() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var i = l[a],
          s = i.transferSize,
          d = i.initiatorType,
          g = i.duration;
        if (s && g && Ph(d)) {
          for (d = 0, g = i.responseEnd, a += 1; a < l.length; a++) {
            var S = l[a],
              D = S.startTime;
            if (D > g) break;
            var q = S.transferSize,
              V = S.initiatorType;
            q &&
              Ph(V) &&
              ((S = S.responseEnd), (d += q * (S < g ? 1 : (g - D) / (S - D))));
          }
          if ((--a, (t += (8 * (s + d)) / (i.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Xs = null,
    Qs = null;
  function pu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function em(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function tm(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function Zs(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ks = null;
  function xp() {
    var e = window.event;
    return e && e.type === 'popstate'
      ? e === Ks
        ? !1
        : ((Ks = e), !0)
      : ((Ks = null), !1);
  }
  var lm = typeof setTimeout == 'function' ? setTimeout : void 0,
    Rp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    am = typeof Promise == 'function' ? Promise : void 0,
    wp =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof am < 'u'
          ? function (e) {
              return am.resolve(null).then(e).catch(zp);
            }
          : lm;
  function zp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ra(e) {
    return e === 'head';
  }
  function nm(e, t) {
    var l = t,
      a = 0;
    do {
      var i = l.nextSibling;
      if ((e.removeChild(l), i && i.nodeType === 8))
        if (((l = i.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (e.removeChild(i), Jn(t));
            return;
          }
          a--;
        } else if (
          l === '$' ||
          l === '$?' ||
          l === '$~' ||
          l === '$!' ||
          l === '&'
        )
          a++;
        else if (l === 'html') ki(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), ki(l));
          for (var s = l.firstChild; s; ) {
            var d = s.nextSibling,
              g = s.nodeName;
            (s[Ze] ||
              g === 'SCRIPT' ||
              g === 'STYLE' ||
              (g === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(s),
              (s = d));
          }
        } else l === 'body' && ki(e.ownerDocument.body);
      l = i;
    } while (l);
    Jn(t);
  }
  function im(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? t
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = 'none'))
            : ((l.style.display = l._stashedDisplay || ''),
              l.getAttribute('style') === '' && l.removeAttribute('style'))
          : l.nodeType === 3 &&
            (t
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
              : (l.nodeValue = l._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === '/$')) {
          if (e === 0) break;
          e--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || e++;
      l = a;
    } while (l);
  }
  function Js(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Js(l), tt(l));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(l);
    }
  }
  function Tp(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var i = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (a) {
        if (!e[Ze])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((s = e.getAttribute('rel')),
                s === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                s !== i.rel ||
                e.getAttribute('href') !==
                  (i.href == null || i.href === '' ? null : i.href) ||
                e.getAttribute('crossorigin') !==
                  (i.crossOrigin == null ? null : i.crossOrigin) ||
                e.getAttribute('title') !== (i.title == null ? null : i.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((s = e.getAttribute('src')),
                (s !== (i.src == null ? null : i.src) ||
                  e.getAttribute('type') !== (i.type == null ? null : i.type) ||
                  e.getAttribute('crossorigin') !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  s &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var s = i.name == null ? null : '' + i.name;
        if (i.type === 'hidden' && e.getAttribute('name') === s) return e;
      } else return e;
      if (((e = rl(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Mp(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') &&
          !l) ||
        ((e = rl(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function rm(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') &&
          !t) ||
        ((e = rl(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Fs(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function $s(e) {
    return (
      e.data === '$!' ||
      (e.data === '$?' && e.ownerDocument.readyState !== 'loading')
    );
  }
  function Ap(e, t) {
    var l = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || l.readyState !== 'loading') t();
    else {
      var a = function () {
        (t(), l.removeEventListener('DOMContentLoaded', a));
      };
      (l.addEventListener('DOMContentLoaded', a), (e._reactRetry = a));
    }
  }
  function rl(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' ||
            t === '$!' ||
            t === '$?' ||
            t === '$~' ||
            t === '&' ||
            t === 'F!' ||
            t === 'F')
        )
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return e;
  }
  var Ws = null;
  function um(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return rl(e.nextSibling);
          t--;
        } else
          (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function om(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
          if (t === 0) return e;
          t--;
        } else (l !== '/$' && l !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function sm(e, t, l) {
    switch (((t = pu(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function ki(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    tt(e);
  }
  var ul = new Map(),
    cm = new Set();
  function bu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ea = X.d;
  X.d = { f: Cp, r: _p, D: Op, C: Dp, L: Np, m: Up, X: jp, S: Lp, M: Hp };
  function Cp() {
    var e = ea.f(),
      t = cu();
    return e || t;
  }
  function _p(e) {
    var t = Ce(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Md(t) : ea.r(e);
  }
  var Qn = typeof document > 'u' ? null : document;
  function fm(e, t, l) {
    var a = Qn;
    if (a && typeof t == 'string' && t) {
      var i = Pt(t);
      ((i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof l == 'string' && (i += '[crossorigin="' + l + '"]'),
        cm.has(i) ||
          (cm.add(i),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(i) === null &&
            ((t = a.createElement('link')),
            At(t, 'link', e),
            rt(t),
            a.head.appendChild(t))));
    }
  }
  function Op(e) {
    (ea.D(e), fm('dns-prefetch', e, null));
  }
  function Dp(e, t) {
    (ea.C(e, t), fm('preconnect', e, t));
  }
  function Np(e, t, l) {
    ea.L(e, t, l);
    var a = Qn;
    if (a && e && t) {
      var i = 'link[rel="preload"][as="' + Pt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((i += '[imagesrcset="' + Pt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' &&
            (i += '[imagesizes="' + Pt(l.imageSizes) + '"]'))
        : (i += '[href="' + Pt(e) + '"]');
      var s = i;
      switch (t) {
        case 'style':
          s = Zn(e);
          break;
        case 'script':
          s = Kn(e);
      }
      ul.has(s) ||
        ((e = p(
          {
            rel: 'preload',
            href: t === 'image' && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        ul.set(s, e),
        a.querySelector(i) !== null ||
          (t === 'style' && a.querySelector(Xi(s))) ||
          (t === 'script' && a.querySelector(Qi(s))) ||
          ((t = a.createElement('link')),
          At(t, 'link', e),
          rt(t),
          a.head.appendChild(t)));
    }
  }
  function Up(e, t) {
    ea.m(e, t);
    var l = Qn;
    if (l && e) {
      var a = t && typeof t.as == 'string' ? t.as : 'script',
        i =
          'link[rel="modulepreload"][as="' + Pt(a) + '"][href="' + Pt(e) + '"]',
        s = i;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          s = Kn(e);
      }
      if (
        !ul.has(s) &&
        ((e = p({ rel: 'modulepreload', href: e }, t)),
        ul.set(s, e),
        l.querySelector(i) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(Qi(s))) return;
        }
        ((a = l.createElement('link')),
          At(a, 'link', e),
          rt(a),
          l.head.appendChild(a));
      }
    }
  }
  function Lp(e, t, l) {
    ea.S(e, t, l);
    var a = Qn;
    if (a && e) {
      var i = Lt(a).hoistableStyles,
        s = Zn(e);
      t = t || 'default';
      var d = i.get(s);
      if (!d) {
        var g = { loading: 0, preload: null };
        if ((d = a.querySelector(Xi(s)))) g.loading = 5;
        else {
          ((e = p({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = ul.get(s)) && Is(e, l));
          var S = (d = a.createElement('link'));
          (rt(S),
            At(S, 'link', e),
            (S._p = new Promise(function (D, q) {
              ((S.onload = D), (S.onerror = q));
            })),
            S.addEventListener('load', function () {
              g.loading |= 1;
            }),
            S.addEventListener('error', function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            Su(d, t, a));
        }
        ((d = { type: 'stylesheet', instance: d, count: 1, state: g }),
          i.set(s, d));
      }
    }
  }
  function jp(e, t) {
    ea.X(e, t);
    var l = Qn;
    if (l && e) {
      var a = Lt(l).hoistableScripts,
        i = Kn(e),
        s = a.get(i);
      s ||
        ((s = l.querySelector(Qi(i))),
        s ||
          ((e = p({ src: e, async: !0 }, t)),
          (t = ul.get(i)) && Ps(e, t),
          (s = l.createElement('script')),
          rt(s),
          At(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        a.set(i, s));
    }
  }
  function Hp(e, t) {
    ea.M(e, t);
    var l = Qn;
    if (l && e) {
      var a = Lt(l).hoistableScripts,
        i = Kn(e),
        s = a.get(i);
      s ||
        ((s = l.querySelector(Qi(i))),
        s ||
          ((e = p({ src: e, async: !0, type: 'module' }, t)),
          (t = ul.get(i)) && Ps(e, t),
          (s = l.createElement('script')),
          rt(s),
          At(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        a.set(i, s));
    }
  }
  function dm(e, t, l, a) {
    var i = (i = fe.current) ? bu(i) : null;
    if (!i) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = Zn(l.href)),
            (l = Lt(i).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: 'style', instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          e = Zn(l.href);
          var s = Lt(i).hoistableStyles,
            d = s.get(e);
          if (
            (d ||
              ((i = i.ownerDocument || i),
              (d = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(e, d),
              (s = i.querySelector(Xi(e))) &&
                !s._p &&
                ((d.instance = s), (d.state.loading = 5)),
              ul.has(e) ||
                ((l = {
                  rel: 'preload',
                  as: 'style',
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                ul.set(e, l),
                s || Bp(i, e, l, d.state))),
            t && a === null)
          )
            throw Error(o(528, ''));
          return d;
        }
        if (t && a !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' &&
          t &&
          typeof t != 'function' &&
          typeof t != 'symbol'
            ? ((t = Kn(l)),
              (l = Lt(i).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: 'script',
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Zn(e) {
    return 'href="' + Pt(e) + '"';
  }
  function Xi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function hm(e) {
    return p({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Bp(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (a.loading = 1)
      : ((t = e.createElement('link')),
        (a.preload = t),
        t.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        At(t, 'link', l),
        rt(t),
        e.head.appendChild(t));
  }
  function Kn(e) {
    return '[src="' + Pt(e) + '"]';
  }
  function Qi(e) {
    return 'script[async]' + e;
  }
  function mm(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var a = e.querySelector('style[data-href~="' + Pt(l.href) + '"]');
          if (a) return ((t.instance = a), rt(a), a);
          var i = p({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement('style')),
            rt(a),
            At(a, 'style', i),
            Su(a, l.precedence, e),
            (t.instance = a)
          );
        case 'stylesheet':
          i = Zn(l.href);
          var s = e.querySelector(Xi(i));
          if (s) return ((t.state.loading |= 4), (t.instance = s), rt(s), s);
          ((a = hm(l)),
            (i = ul.get(i)) && Is(a, i),
            (s = (e.ownerDocument || e).createElement('link')),
            rt(s));
          var d = s;
          return (
            (d._p = new Promise(function (g, S) {
              ((d.onload = g), (d.onerror = S));
            })),
            At(s, 'link', a),
            (t.state.loading |= 4),
            Su(s, l.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = Kn(l.src)),
            (i = e.querySelector(Qi(s)))
              ? ((t.instance = i), rt(i), i)
              : ((a = l),
                (i = ul.get(s)) && ((a = p({}, l)), Ps(a, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement('script')),
                rt(i),
                At(i, 'link', a),
                e.head.appendChild(i),
                (t.instance = i))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Su(a, l.precedence, e));
    return t.instance;
  }
  function Su(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        i = a.length ? a[a.length - 1] : null,
        s = i,
        d = 0;
      d < a.length;
      d++
    ) {
      var g = a[d];
      if (g.dataset.precedence === t) s = g;
      else if (s !== i) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Is(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Ps(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Eu = null;
  function ym(e, t, l) {
    if (Eu === null) {
      var a = new Map(),
        i = (Eu = new Map());
      i.set(l, a);
    } else ((i = Eu), (a = i.get(l)), a || ((a = new Map()), i.set(l, a)));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), i = 0;
      i < l.length;
      i++
    ) {
      var s = l[i];
      if (
        !(
          s[Ze] ||
          s[P] ||
          (e === 'link' && s.getAttribute('rel') === 'stylesheet')
        ) &&
        s.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var d = s.getAttribute(t) || '';
        d = e + d;
        var g = a.get(d);
        g ? g.push(s) : a.set(d, [s]);
      }
    }
    return a;
  }
  function vm(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === 'title' ? e.querySelector('head > title') : null
      ));
  }
  function qp(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (
          typeof t.precedence != 'string' ||
          typeof t.href != 'string' ||
          t.href === ''
        )
          break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === 'stylesheet'
          ? ((e = t.disabled), typeof t.precedence == 'string' && e == null)
          : !0;
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function gm(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Yp(e, t, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var i = Zn(a.href),
          s = t.querySelector(Xi(i));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = xu.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = s),
            rt(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (a = hm(a)),
          (i = ul.get(i)) && Is(a, i),
          (s = s.createElement('link')),
          rt(s));
        var d = s;
        ((d._p = new Promise(function (g, S) {
          ((d.onload = g), (d.onerror = S));
        })),
          At(s, 'link', a),
          (l.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = xu.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var ec = 0;
  function Gp(e, t) {
    return (
      e.stylesheets && e.count === 0 && wu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((e.stylesheets && wu(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && ec === 0 && (ec = 62500 * Ep());
            var i = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && wu(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > ec ? 50 : 800) + t
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(a), clearTimeout(i));
              }
            );
          }
        : null
    );
  }
  function xu() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) wu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ru = null;
  function wu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Ru = new Map()),
        t.forEach(Vp, e),
        (Ru = null),
        xu.call(e)));
  }
  function Vp(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Ru.get(e);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), Ru.set(e, l));
        for (
          var i = e.querySelectorAll(
              'link[data-precedence],style[data-precedence]'
            ),
            s = 0;
          s < i.length;
          s++
        ) {
          var d = i[s];
          (d.nodeName === 'LINK' || d.getAttribute('media') !== 'not all') &&
            (l.set(d.dataset.precedence, d), (a = d));
        }
        a && l.set(null, a);
      }
      ((i = t.instance),
        (d = i.getAttribute('data-precedence')),
        (s = l.get(d) || a),
        s === a && l.set(null, i),
        l.set(d, i),
        this.count++,
        (a = xu.bind(this)),
        i.addEventListener('load', a),
        i.addEventListener('error', a),
        s
          ? s.parentNode.insertBefore(i, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Zi = {
    $$typeof: I,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0,
  };
  function kp(e, t, l, a, i, s, d, g, S) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = na(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = na(0)),
      (this.hiddenUpdates = na(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = i),
      (this.onCaughtError = s),
      (this.onRecoverableError = d),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function pm(e, t, l, a, i, s, d, g, S, D, q, V) {
    return (
      (e = new kp(e, t, l, d, S, D, q, V, g)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = Qt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = No()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: a, isDehydrated: l, cache: t }),
      Ho(s),
      e
    );
  }
  function bm(e) {
    return e ? ((e = wn), e) : wn;
  }
  function Sm(e, t, l, a, i, s) {
    ((i = bm(i)),
      a.context === null ? (a.context = i) : (a.pendingContext = i),
      (a = da(t)),
      (a.payload = { element: l }),
      (s = s === void 0 ? null : s),
      s !== null && (a.callback = s),
      (l = ha(e, a, t)),
      l !== null && (Gt(l, e, t), wi(l, e, t)));
  }
  function Em(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function tc(e, t) {
    (Em(e, t), (e = e.alternate) && Em(e, t));
  }
  function xm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ja(e, 67108864);
      (t !== null && Gt(t, e, 67108864), tc(e, 67108864));
    }
  }
  function Rm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $t();
      t = N(t);
      var l = Ja(e, t);
      (l !== null && Gt(l, e, t), tc(e, t));
    }
  }
  var zu = !0;
  function Xp(e, t, l, a) {
    var i = _.T;
    _.T = null;
    var s = X.p;
    try {
      ((X.p = 2), lc(e, t, l, a));
    } finally {
      ((X.p = s), (_.T = i));
    }
  }
  function Qp(e, t, l, a) {
    var i = _.T;
    _.T = null;
    var s = X.p;
    try {
      ((X.p = 8), lc(e, t, l, a));
    } finally {
      ((X.p = s), (_.T = i));
    }
  }
  function lc(e, t, l, a) {
    if (zu) {
      var i = ac(a);
      if (i === null) (Vs(e, t, a, Tu, l), zm(e, a));
      else if (Kp(i, e, t, l, a)) a.stopPropagation();
      else if ((zm(e, a), t & 4 && -1 < Zp.indexOf(e))) {
        for (; i !== null; ) {
          var s = Ce(i);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var d = jl(s.pendingLanes);
                  if (d !== 0) {
                    var g = s;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; d; ) {
                      var S = 1 << (31 - Ct(d));
                      ((g.entanglements[1] |= S), (d &= ~S));
                    }
                    (Al(s), (Qe & 6) === 0 && ((ou = ft() + 500), Yi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((g = Ja(s, 2)), g !== null && Gt(g, s, 2), cu(), tc(s, 2));
            }
          if (((s = ac(a)), s === null && Vs(e, t, a, Tu, l), s === i)) break;
          i = s;
        }
        i !== null && a.stopPropagation();
      } else Vs(e, t, a, null, l);
    }
  }
  function ac(e) {
    return ((e = no(e)), nc(e));
  }
  var Tu = null;
  function nc(e) {
    if (((Tu = null), (e = it(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Tu = e), null);
  }
  function wm(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (ja()) {
          case ii:
            return 2;
          case yn:
            return 8;
          case Ut:
          case yl:
            return 32;
          case ri:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ic = !1,
    wa = null,
    za = null,
    Ta = null,
    Ki = new Map(),
    Ji = new Map(),
    Ma = [],
    Zp =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function zm(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        wa = null;
        break;
      case 'dragenter':
      case 'dragleave':
        za = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Ta = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ki.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ji.delete(t.pointerId);
    }
  }
  function Fi(e, t, l, a, i, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: s,
          targetContainers: [i],
        }),
        t !== null && ((t = Ce(t)), t !== null && xm(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function Kp(e, t, l, a, i) {
    switch (t) {
      case 'focusin':
        return ((wa = Fi(wa, e, t, l, a, i)), !0);
      case 'dragenter':
        return ((za = Fi(za, e, t, l, a, i)), !0);
      case 'mouseover':
        return ((Ta = Fi(Ta, e, t, l, a, i)), !0);
      case 'pointerover':
        var s = i.pointerId;
        return (Ki.set(s, Fi(Ki.get(s) || null, e, t, l, a, i)), !0);
      case 'gotpointercapture':
        return (
          (s = i.pointerId),
          Ji.set(s, Fi(Ji.get(s) || null, e, t, l, a, i)),
          !0
        );
    }
    return !1;
  }
  function Tm(e) {
    var t = it(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = h(l)), t !== null)) {
            ((e.blockedOn = t),
              ye(e.priority, function () {
                Rm(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = m(l)), t !== null)) {
            ((e.blockedOn = t),
              ye(e.priority, function () {
                Rm(l);
              }));
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Mu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = ac(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((ao = a), l.target.dispatchEvent(a), (ao = null));
      } else return ((t = Ce(l)), t !== null && xm(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Mm(e, t, l) {
    Mu(e) && l.delete(t);
  }
  function Jp() {
    ((ic = !1),
      wa !== null && Mu(wa) && (wa = null),
      za !== null && Mu(za) && (za = null),
      Ta !== null && Mu(Ta) && (Ta = null),
      Ki.forEach(Mm),
      Ji.forEach(Mm));
  }
  function Au(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ic ||
        ((ic = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, Jp)));
  }
  var Cu = null;
  function Am(e) {
    Cu !== e &&
      ((Cu = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Cu === e && (Cu = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            i = e[t + 2];
          if (typeof a != 'function') {
            if (nc(a || l) === null) continue;
            break;
          }
          var s = Ce(l);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            as(s, { pending: !0, data: i, method: l.method, action: a }, a, i));
        }
      }));
  }
  function Jn(e) {
    function t(S) {
      return Au(S, e);
    }
    (wa !== null && Au(wa, e),
      za !== null && Au(za, e),
      Ta !== null && Au(Ta, e),
      Ki.forEach(t),
      Ji.forEach(t));
    for (var l = 0; l < Ma.length; l++) {
      var a = Ma[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Ma.length && ((l = Ma[0]), l.blockedOn === null); )
      (Tm(l), l.blockedOn === null && Ma.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var i = l[a],
          s = l[a + 1],
          d = i[ne] || null;
        if (typeof s == 'function') d || Am(l);
        else if (d) {
          var g = null;
          if (s && s.hasAttribute('formAction')) {
            if (((i = s), (d = s[ne] || null))) g = d.formAction;
            else if (nc(i) !== null) continue;
          } else g = d.action;
          (typeof g == 'function' ? (l[a + 1] = g) : (l.splice(a, 3), (a -= 3)),
            Am(l));
        }
      }
  }
  function Cm() {
    function e(s) {
      s.canIntercept &&
        s.info === 'react-transition' &&
        s.intercept({
          handler: function () {
            return new Promise(function (d) {
              return (i = d);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (i !== null && (i(), (i = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        i = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            i !== null && (i(), (i = null)));
        }
      );
    }
  }
  function rc(e) {
    this._internalRoot = e;
  }
  ((_u.prototype.render = rc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var l = t.current,
        a = $t();
      Sm(l, a, e, t, null, null);
    }),
    (_u.prototype.unmount = rc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Sm(e.current, 2, null, e, null, null), cu(), (t[ue] = null));
        }
      }));
  function _u(e) {
    this._internalRoot = e;
  }
  _u.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = $();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Ma.length && t !== 0 && t < Ma[l].priority; l++);
      (Ma.splice(l, 0, e), l === 0 && Tm(e));
    }
  };
  var _m = r.version;
  if (_m !== '19.2.5') throw Error(o(527, _m, '19.2.5'));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return (
      (e = v(t)),
      (e = e !== null ? b(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Fp = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: _,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Ou = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ou.isDisabled && Ou.supportsFiber)
      try {
        ((Ha = Ou.inject(Fp)), (ot = Ou));
      } catch {}
  }
  return (
    (tr.createRoot = function (e, t) {
      if (!c(e)) throw Error(o(299));
      var l = !1,
        a = '',
        i = Hd,
        s = Bd,
        d = qd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (d = t.onRecoverableError)),
        (t = pm(e, 1, !1, null, null, l, a, null, i, s, d, Cm)),
        (e[ue] = t.current),
        Gs(e),
        new rc(t)
      );
    }),
    (tr.hydrateRoot = function (e, t, l) {
      if (!c(e)) throw Error(o(299));
      var a = !1,
        i = '',
        s = Hd,
        d = Bd,
        g = qd,
        S = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (i = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (s = l.onUncaughtError),
          l.onCaughtError !== void 0 && (d = l.onCaughtError),
          l.onRecoverableError !== void 0 && (g = l.onRecoverableError),
          l.formState !== void 0 && (S = l.formState)),
        (t = pm(e, 1, !0, t, l ?? null, a, i, S, s, d, g, Cm)),
        (t.context = bm(null)),
        (l = t.current),
        (a = $t()),
        (a = N(a)),
        (i = da(a)),
        (i.callback = null),
        ha(l, i, a),
        (l = a),
        (t.current.lanes = l),
        ia(t, l),
        Al(t),
        (e[ue] = t.current),
        Gs(e),
        new _u(t)
      );
    }),
    (tr.version = '19.2.5'),
    tr
  );
}
var jy;
function gx() {
  if (jy) return bc.exports;
  jy = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return (n(), (bc.exports = vx()), bc.exports);
}
var px = gx();
const Hy = globalThis.SFDC_ENV?.basePath,
  bx = typeof Hy == 'string' ? Hy.replace(/\/+$/, '') : void 0,
  Sx = yS(Xv, { basename: bx });
px.createRoot(document.getElementById('root')).render(
  ie.jsx(w.StrictMode, { children: ie.jsx(Gb, { router: Sx }) })
);
