var STARZ = STARZ || {};
!function () {
    STARZ.PhotoEditor = function () {
        function a() {
            j = $("#imageFrame"), l = $("#photoEditorContainer"), k = $("#frameContainer"), m = $("#scaleUp"), n = $("#scaleDown"), o = l.find(".save"), p = l.find(".confirm"), r = $("#resetImage"), p.hide(), r.click(function () {
                h()
            }), o.click(function () {
                k.show(), x = !1;
                var b = k.offset(), c = q.offset(), d = {left: b.left - c.left, top: b.top - c.top, width: k.width(), height: k.height()};
                location.href = "index.php?edit_image=true&crop_l=" + d.left + "&crop_t=" + d.top + "&crop_w=" + d.width + "&crop_h=" + d.height + "&scale=" + u + "&template=" + v
            }), b(), d(), f(), g()
        }

        function b() {
            $("[data-color]").each(function () {
                var a = $(this), b = a.attr("data-color");
                a.addClass(b), a.click(function () {
                    c(b)
                })
            })
        }

        function c(a) {
            var b = "img/frame_green.png", c = j.attr("src");
            switch (a) {
                case"color1":
                    v = 1, b = "overlays/frame_green.png";
                    break;
                case"color2":
                    v = 2, b = "overlays/frame_orange.png";
                    break;
                case"color3":
                    v = 3, b = "overlays/frame_purple.png";
                    break;
                case"color4":
                    v = 4, b = "overlays/frame_blue.png"
                    break;
            }
            b != c ? j.fadeTo("fast", 0, function () {
                x = !1, k.show(), j.attr("src", b), j.fadeTo("fast", 1)
            }) : x === !0 && k.show()
        }

        function d() {
            m.click(function () {
                1 > u ? (u += w, e(u), TweenLite.to(n, .5, {alpha: 1})) : TweenLite.to(m, .5, {alpha: t})
            }), n.click(function () {
                u > .2 ? (u -= w, e(u), TweenLite.to(m, .5, {alpha: 1})) : TweenLite.to(n, .5, {alpha: t})
            }), TweenLite.to(m, .5, {alpha: t})
        }

        function e(a) {
            TweenLite.to(q, .25, {scaleX: a, scaleY: a})
        }

        function f() {
            s = q.css("z-index"), Draggable.create(q, {type: "x,y", onDragEnd: function () {
                q.css("z-index", s)
            }}), $("#dragToggle").on("click", function () {
                x = !x, x ? k.hide() : k.show()
            })
        }

        function g() {
            var a, b, c = q.attr("width"), d = q.attr("height"), e = k.width(), f = k.height();
            a = d > f ? -1 * (d - f) / 2 : (f - d) / 2, b = c > e ? -1 * (c - e) / 2 : (e - c) / 2, q.css({position: "absolute", left: b + "px", top: a + "px"})
        }

        function h() {
            TweenLite.to(q, .25, {scaleX: 1, scaleY: 1, x: 0, y: 0, onComplete: function () {
                u = 1, g()
            }})
        }

        function i() {
            var b = $("[data-image]").attr("data-image");
            $("#userImage").attr("src", b), q = $("#imgContainer > img"), a()
        }

        var j, k, l, m, n, o, p, q, r, s, t = .5, u = 1, v = 1, w = .1, x = !1;
        return{setImage: i}
    }()
}();