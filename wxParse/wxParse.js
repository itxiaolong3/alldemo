var _showdown = require("./showdown.js"), _showdown2 = _interopRequireDefault(_showdown), _html2json = require("./html2json.js"), _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var realWindowWidth = 0, realWindowHeight = 0;

function wxParse() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', r = arguments[3], i = arguments[4], n = r, o = {};
    if ("html" == t) o = _html2json2.default.html2json(a, e); else if ("md" == t || "markdown" == t) {
        var d = new _showdown2.default.Converter().makeHtml(a);
        o = _html2json2.default.html2json(d, e);
    }
    o.view = {}, void (o.view.imagePadding = 0) !== i && (o.view.imagePadding = i);
    var s = {};
    s[e] = o, n.setData(s), n.wxParseImgLoad = wxParseImgLoad, n.wxParseImgTap = wxParseImgTap;
}

function wxParseImgTap(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && 0 < a.length && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function wxParseImgLoad(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && 0 < t.length && calMoreImageInfo(e, a, this, t);
}

function calMoreImageInfo(e, t, a, r) {
    var i, n = a.data[r];
    if (n && 0 != n.images.length) {
        var o = n.images, d = wxAutoImageCal(e.detail.width, e.detail.height, a, r), s = o[t].index, l = "" + r, m = !0, h = !1, g = void 0;
        try {
            for (var w, u = s.split(".")[Symbol.iterator](); !(m = (w = u.next()).done); m = !0) {
                l += ".nodes[" + w.value + "]";
            }
        } catch (e) {
            h = !0, g = e;
        } finally {
            try {
                !m && u.return && u.return();
            } finally {
                if (h) throw g;
            }
        }
        var f = l + ".width", v = l + ".height";
        a.setData((_defineProperty(i = {}, f, d.imageWidth), _defineProperty(i, v, d.imageheight), 
        i));
    }
}

function wxAutoImageCal(e, t, a, r) {
    var i, n = 0, o = 0, d = {}, s = a.data[r].view.imagePadding;
    return realWindowHeight, (i = realWindowWidth - 2 * s) < e ? (o = (n = i) * t / e, 
    d.imageWidth = n, d.imageheight = o) : (d.imageWidth = e, d.imageheight = t), d;
}

function wxParseTemArray(e, t, a, r) {
    for (var i = [], n = r.data, o = null, d = 0; d < a; d++) {
        var s = n[t + d].nodes;
        i.push(s);
    }
    e = e || "wxParseTemArray", (o = JSON.parse('{"' + e + '":""}'))[e] = i, r.setData(o);
}

function emojisInit() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
    _html2json2.default.emojisInit(e, t, a);
}

wx.getSystemInfo({
    success: function(e) {
        realWindowWidth = e.screenWidth, realWindowHeight = e.screenHeight;
    }
}), module.exports = {
    wxParse: wxParse,
    wxParseTemArray: wxParseTemArray,
    emojisInit: emojisInit
};