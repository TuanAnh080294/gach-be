window.$zopim || (function (d, s) {
    var z = $zopim = function (c) {
            z._.push(c)
        },
        $ = z.s = d.createElement(s),
        e = d.getElementsByTagName(s)[0];
    z.set = function (o) {
        z.set._.push(o)
    };
    z._ = [];
    z.set._ = [];
    $.async = !0;
    $.setAttribute('charset', 'utf-8');
    $.src = '//v2.zopim.com/?4j2ScCKvrloV3PhA6ESjgThZLA7gftKE';
    z.t = +new Date;
    $.type = 'text/javascript';
    e.parentNode.insertBefore($, e)
})(document, 'script');
$(document).on("click", ".mobile-menu-icon .dropdown-menu ,.drop-control .dropdown-menu, .drop-control .input-dropdown", function (e) {
    e.stopPropagation();
});

//
$(function () {
    $('nav#menu-mobile').mmenu();
});
$(document).ready(function () {
    flagg = true;
    if (flagg) {
        $('.click-menu-mobile a').click(function () {
            $('#menu-mobile').removeClass('hidden');
            flagg = false;
        })
    }
})