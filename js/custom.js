jQuery(document).ready(function ($) {
    "use strict";

    $(window).on('load',function() {setTimeout(function () { $('html,body').scrollTop(0) },0); });

    /* One page scroll - - - - */
    $("#menu").localScroll({
        target: '#content', // could be a selector or a jQuery object too.
        queue: true,
        duration: 1000,
        hash: false,
    });
    $('#menu nav li').click(function () {
        $(this).addClass('active');
        $(this).parent().children('li').not(this).removeClass('active');
        var currentPos = $(this).parent().prevAll().length;
        $(this).parent().children('li').not(this).removeClass('active');
        $(this).find('li').eq(currentPos).addClass('active');
    });

    var $element = $("#svg #MyGradient stop");
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
        var st = $(this).scrollTop();
        if (st < lastScrollTop) {
            var percentage = percentageSeen();
            drawSVG(percentage);
        }
        else if (st > lastScrollTop) {
            var percentage = percentageSeen();
            drawSVG(percentage);
        }
        lastScrollTop = st;
    });

    var oldOffset = 0;

    function drawSVG(offset) {
        $element.stop().attr("offset", oldOffset);
        $element.animate(
            {
                top: offset
            },
            {
                duration: 1000,
                step: function (now) {
                    $(this).attr("offset", now);
                }
            }
        );
        oldOffset = offset;
    }

    function percentageSeen() {

        var viewportHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            elementOffsetTop = $('.visual-container').offset().top,
            elementHeight = $('.visual-container').height();

        var bottom = scrollTop + viewportHeight;


        if (elementOffsetTop > bottom) {
            return 0;
        } else if (elementOffsetTop + elementHeight <= bottom) {
            return 1;
        } else {
            var bottomElement = elementOffsetTop + elementHeight - bottom
            return 1.05 - bottomElement / elementHeight;
        }
    }

    /* price slider */
    $("#slider").slider({
        animate: false,
        value: 102000,
        min: 2000,
        max: 200000,
        step: 10000,
        slide: function (event, ui) {
            update(ui.value); //changed
        }
    });

    update();


//changed. now with parameter
    function update(val) {
        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $amount = val ? val : 102000;
        $('#slider a').html('<div class="amount"> ' + $amount + '</div>');
    }

});
