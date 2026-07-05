(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        var $spinner = $('#spinner');
        if (!$spinner.length) {
            return;
        }

        var hidden = false;
        var pageLoaded = false;
        var videoDone = false;

        var hideSpinner = function () {
            if (!hidden) {
                hidden = true;
                $spinner.removeClass('show');
            }
        };

        var checkHide = function () {
            if (pageLoaded && videoDone) {
                setTimeout(hideSpinner, 300);
            }
        };

        $(window).on('load', function () {
            pageLoaded = true;
            checkHide();
        });

        var video = document.getElementById('preloaderVideo');
        if (video) {
            video.muted = true;

            var markVideoDone = function () {
                videoDone = true;
                checkHide();
            };

            video.addEventListener('ended', markVideoDone);
            video.addEventListener('error', markVideoDone);

            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(markVideoDone);
            }
        } else {
            videoDone = true;
        }

        setTimeout(function () {
            pageLoaded = true;
            videoDone = true;
            checkHide();
        }, 6000);
    };
    spinner();
    
    
    // Ensure logo videos autoplay on all devices
    document.querySelectorAll('.brand-logo-video').forEach(function (video) {
        video.muted = true;
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {});
        }
    });
    new WOW().init();


    // Sticky Navbar color on scroll
    var updateNavbar = function () {
        var $navbar = $('.navbar.sticky-top');

        if ($(window).scrollTop() > 60) {
            $navbar.addClass('navbar-scrolled');
        } else {
            $navbar.removeClass('navbar-scrolled');
        }
    };

    updateNavbar();
    $(window).on('scroll', updateNavbar);
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    var $headerCarousel = $(".header-carousel");
    if ($headerCarousel.length && !$headerCarousel.hasClass('owl-loaded')) {
        $headerCarousel.owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            dotsData: true,
            autoplayHoverPause: true
        });
    }


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);

