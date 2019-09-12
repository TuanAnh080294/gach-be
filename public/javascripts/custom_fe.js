(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', './www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-97086989-1', 'auto');
try {

} catch (e) {};
ga('send', 'pageview');

//
! function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
        n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
}(window,
    document, 'script', './connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '905600829489553');
fbq('track', 'PageView');
//]]>

//
// img height = '1'
// width = '1'
// style = 'display: none'
// src = 'https://www.facebook.com/tr?id=905600829489553&amp;ev=PageView&amp;noscript=1' / > //</noscript>
//     //<!-- <script type='text/javascript'>
//     //<![CDATA[
//     if ((typeof Haravan) === 'undefined') {
//         Haravan = {};
//     }
// Haravan.culture = 'vi-VN';
// Haravan.shop = 'happylive.myharavan.com';
// Haravan.theme = {
//     "name": "Theme mặc định",
//     "id": 1000229231,
//     "role": "main"
// };
// Haravan.domain = 'happylive.vn';
//]]>

//
(function () {
    function asyncLoad() {
        var urls = ["/javascripts/noname.js"];
        for (var i = 0; i < urls.length; i++) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = urls[i];
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }
    }
    window.attachEvent ? window.attachEvent('onload', asyncLoad) : window.addEventListener('load', asyncLoad, false);
})();

//
/* QUICK VIEW JS */
jQuery(document).ready(function () {
    var callBack = function (variant, selector) {
        if (variant) {
            item = $('.wrapper-quickview');
            if (variant != null && variant.featured_image != null) {
                item.find(".product-thumb a[data-image='" + Haravan.resizeImage(variant.featured_image.src, 'large') + "']").click();
            }
            item.find('.quickview-price').find('span').html(Haravan.formatMoney(variant.price, "{{amount}}₫"));

            if (variant.compare_at_price > variant.price)
                item.find('.quickview-price').find('del').html(Haravan.formatMoney(variant.compare_at_price, "{{amount}}₫"));
            else
                item.find('.quickview-price').find('del').html('');
            if (variant.available) {
                item.find('.btn-addcart').css('display', 'block');
                item.find('.btn-soldout').css('display', 'none');
            } else {
                item.find('.btn-addcart').css('display', 'none');
                item.find('.btn-soldout').css('display', 'block');
            }
        } else {
            item.find('.btn-addcart').css('display', 'none');
            item.find('.btn-soldout').css('display', 'block');
        }
    }
    var quickview_html_variants = $('.quickview-variants').html();
    var quickview_image_zoom = $('.quickview-image').html();
    var quickViewProduct = function (purl) {
        if ($(window).width() < 680) {
            window.location = purl;
            return false;
        }
        item = $('.wrapper-quickview');
        $.ajax({
            url: purl + '.js',
            async: false,
            success: function (product) {
                $.each(product.options, function (i, v) {
                    product.options[i] = v.name;
                })
                item.find('.quickview-title').attr('title', product.title).attr('href', product.url).find('h4').html(product.title);
                item.find('.quickview-variants').html(quickview_html_variants);
                $('.quickview-image').html(quickview_image_zoom);
                $.each(product.variants, function (i, v) {
                    item.find('#quickview-select').append("<option value='" + v.id + "'>" + v.title + ' - ' + v.price + "</option>");
                })
                if (product.variants.length == 1 && product.variants[0].title.indexOf('Default') != -1)
                    $('#quickview-select').hide();
                else
                    $('#quickview-select').show();
                if (product.variants.length == 1 && product.variants[0].title.indexOf('Default') != -1) {
                    callBack(product.variants[0], null);
                } else {
                    new Haravan.OptionSelectors("quickview-select", {
                        product: product,
                        onVariantSelected: callBack
                    });
                    if (product.options.length == 1 && product.options[0].indexOf('Tiêu đề') == -1)
                        item.find('.selector-wrapper:eq(0)').prepend('<label>' + product.options[0] + '</label>');
                    $('.p-option-wrapper select:not(#p-select)').each(function () {
                        $(this).wrap('<span class="custom-dropdown custom-dropdown--white"></span>');
                        $(this).addClass("custom-dropdown__select custom-dropdown__select--white");
                    });
                    callBack(product.variants[0], null);
                }
                if (product.images.length == 0) {
                    item.find('.quickview-image').find('img').attr('alt', product.title).attr('src', '../public/images/theme-default/no-image.png');
                } else {
                    $('.quickview-slider').remove();
                    $('#quickview-sliderproduct').append("<div class='quickview-slider' class='flexslider'>");
                    $('.quickview-slider').append("<ul class='owl-carousel'>");
                    $.each(product.images, function (i, v) {
                        elem = $('<li class="product-thumb">').append('<a href="javascript:void(0);" data-image=""><img /></a>');
                        elem.find('a').attr('data-image', Haravan.resizeImage(v, 'large'));
                        elem.find('img').attr('src', Haravan.resizeImage(v, 'small'));
                        item.find('.owl-carousel').append(elem);
                    });
                    item.find('.quickview-image img').attr('alt', product.title).attr('src', Haravan.resizeImage(product.featured_image, 'large'));

                    $('.quickview-slider img').imagesLoaded(function () {
                        var owl = $('.owl-carousel');
                        owl.owlCarousel({
                            items: 3,
                            navigation: true,
                            navigationText: ['owl-prev', 'owl-next']
                        });
                        $('.quickview-slider .owl-carousel .owl-item').first().children('.product-thumb').addClass('active');
                    });

                }

            }
        });
        return false;
    }
    //final width --> this is the quick view image slider width
    //maxQuickWidth --> this is the max-width of the quick-view panel
    var sliderFinalWidth = 500,
        maxQuickWidth = 900;

    //open the quick view panel
    jQuery(document).on("click", ".quickview", function (event) {
        var selectedImage = $(this).parents('.product-block').find('.product-img img'),
            slectedImageUrl = selectedImage.attr('src');
        quickViewProduct($(this).attr('data-handle'));

        animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');

        //update the visible slider image in the quick view panel
        //you don't need to implement/use the updateQuickView if retrieving the quick view data with ajax

    });

    $('.wrapper-quickview').on('click', '.product-thumb a', function () {
        item = $('.wrapper-quickview');
        item.find('.quickview-image img').attr('src', $(this).attr('data-image'));
        item.find('.product-thumb').removeClass('active');
        $(this).parents('li').addClass('active');
        return false;
    });
    //close the quick view panel

    $(document).on('click', '.quickview-close, .quickviewOverlay', function (e) {
        $(".wrapper-quickview").fadeOut(500);

        $('.jsQuickview').fadeOut(500);
    });


    //center quick-view on window resize
    $(window).on('resize', function () {
        if ($('.wrapper-quickview').hasClass('is-visible')) {
            window.requestAnimationFrame(resizeQuickView);
        }
    });

    function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {

        $('.wrapper-quickview').fadeIn(500);
        $('.jsQuickview').fadeIn(500);
    }

    $(document).on("click", ".btn-addcart", function (event) {
        event.preventDefault();
        variant_id_quickview = $('#quickview-select').val();
        quantity_quickview = $('#quantity-quickview').val();
        var params = {
            type: 'POST',
            url: '/cart/add.js',
            async: true,
            data: 'quantity=' + quantity_quickview + '&id=' + variant_id_quickview,
            dataType: 'json',
            success: function (line_item) {
                window.location = '/cart';
            },
            error: function (XMLHttpRequest, textStatus) {
                alert('Sản phẩm bạn vừa mua đã vượt quá tồn kho');
            }
        };
        jQuery.ajax(params);
    });


});

//
$(window).resize(function () {
    $('li.dropdown li.active').parents('.dropdown').addClass('active');
    if ($('.right-menu').width() + $('#navbar').width() > $('.check_nav.nav-wrapper').width() - 40) {
        $('.nav-wrapper').addClass('responsive-menu');
    } else {
        $('.nav-wrapper').removeClass('responsive-menu');
    }
})

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

//slider
jQuery(document).ready(function () {
    if ($('.slides li').size() > 0) {
        $(".hrv-banner-container .slides").owlCarousel({
            singleItem: true,
            autoPlay: 5000,
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],
            slideSpeed: 500,
            paginationSpeed: 500,
            rewindSpeed: 500,
            addClassActive: true,
            navigation: true,
            stopOnHover: true,
            pagination: false,
            scrollPerPage: true,
            afterMove: nextslide,
            afterInit: nextslide,
        });

        function nextslide() {
            $(".hrv-banner-container .owl-item .hrv-banner-caption").css('display', 'none');
            $(".hrv-banner-container .owl-item .hrv-banner-caption").removeClass('hrv-caption')
            $(".hrv-banner-container .owl-item.active .hrv-banner-caption").css('display', 'block');

            var heading = $('.hrv-banner-container .owl-item.active .hrv-banner-caption').clone().removeClass();
            $('.hrv-banner-container .owl-item.active .hrv-banner-caption').remove();
            $('.hrv-banner-container .owl-item.active>li').append(heading);
            $('.hrv-banner-container .owl-item.active>li>div').addClass('hrv-banner-caption hrv-caption');
        }

    }
})