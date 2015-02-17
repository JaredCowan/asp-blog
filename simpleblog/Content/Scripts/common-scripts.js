$(function () {

    //    fancybox
    //$(".fancybox").fancybox();

    //    nicescroll
    $(document).ready(function () { $("html").niceScroll({ styler: "fb", cursorcolor: "#8cd600", cursorwidth: '9', cursorborderradius: '0px', background: '#323232', spacebarenabled: false, cursorborder: '', zindex: '9000' }); });

    //    tool tips
    $('.tooltips').tooltip();

    //    popovers
    $('.popovers').popover();


    $(function () {
        var thriiiCarousel = $(".thriii__landing--slider .carousel");
        thriiiCarousel.each(function () {
            $(this).carousel({
                interval: 4000,
                duration: 700,
                keyboard: false,
                pause: false
            });
        });
    });


    var _path = window.location.pathname == "/";

    if (_path) {
        //  sticky nav
        $(window).on('scroll load', function() {
            var nav = $(".thriii__landing--nav"),
                nav_cont = $(".thriii__landing").innerHeight() - $(window).scrollTop(),
                nav_pos = nav.offset().top - $(window).scrollTop();

            if (nav_pos < 1 && nav_cont < nav.innerHeight()) {
                nav.addClass("thriii__landing--nav--stuck");
            } else if (nav_cont > nav.innerHeight()) {
                nav.removeClass("thriii__landing--nav--stuck");
            }
        }); //  END sticky nav


        //  scroll to page section on click
        $('.thriii__landing--nav--item a').on('click', function(e) {
            e.preventDefault();
            var el = $(this).attr('href'),
                el_pos = $(el).offset().top,
                win_pos = $(window).scrollTop(),
                o = $(el).offset().top - win_pos - $(".thriii__landing--nav").innerHeight(),
                current = window.location.hash,
                el_scroll_to;
            if (el === "#sales-orders") {
                el_scroll_to = el_pos;
            } else {
                el_scroll_to = el_pos - 100;
            }

            $('html, body').animate({
                    scrollTop: el_scroll_to
                }, 800
            );
            window.location.name = el;
        }); //  END scroll to section on click

        // Custom Scrollspy
        $(window).on('scroll load', function() {
            var $nav = $('.thriii__landing--nav--item'),
                $windowheight = $(window).scrollTop() + 130,
                $el1height = $("#sales-orders").height(),
                $el1pos = $("#sales-orders").position().top,
                $el2height = $("#warehousing").height(),
                $el2pos = $("#warehousing").position().top,
                $el3height = $("#payments").height(),
                $el3pos = $("#payments").position().top,
                $el4height = $("#shipping").height(),
                $el4pos = $("#shipping").position().top;

            if ($windowheight < $el1pos) {
                $nav.removeClass('active');
            } else {
                if (($el1pos <= $windowheight)) {
                    $nav.removeClass('active');
                    $('.sales').addClass('active');
                }
                if (($el2pos <= $windowheight)) {
                    $nav.removeClass('active');
                    $('.warehouse').addClass('active');
                }
                if (($el3pos <= $windowheight)) {
                    $nav.removeClass('active');
                    $('.payments').addClass('active');
                }
                if ($el4pos <= $windowheight) {
                    $nav.removeClass('active');
                    $('.shipping').addClass('active');
                }
            }
        }); // End Scrollspy
    } // Close if

    // fixed back-to-top link
    var $topLink = $(".back-to-top") // Set variable of element
      , $windowHeight = $(window).innerHeight() - 130; // Get the height of window
    $topLink.hide(); // Initially hide element

    $(window).on("scroll", function(e) { // Spy on scroll position to show/hide element
        var $windowPos = $(window).scrollTop();
        if ($windowPos > $windowHeight) {
            $topLink.show();
        } else {
            $topLink.hide();
        }
    }); // Close

}(jQuery));
