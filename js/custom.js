jQuery(document).ready(function ($) {
    "use strict";

    if ($("#content").length > 0) {
        $(window).on('load', function () {
            setTimeout(function () {
                $('html,body').scrollTop(0)
            }, 0);
        });
    }

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
    });

    if ($("#content").length > 0) {
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
    }

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

    // checkbox
    $(".checkbox-huge input:checkbox").click(function () {
        $(".checkbox-huge input:checkbox").not($(this)).removeAttr("checked");
        $(this).attr("checked", $(this).attr("checked"));
    });

    // search properties adding class
    var $sv = $('.search-properties .property-fields ul li');
    $sv.on('click', function () {
        $sv.not($(this)).removeClass('checked');
        $(this).addClass('checked', $(this).addClass('checked'));
    });

    /* START HEADER MAP */
    function initialize() {

        var $left_map = $('#map');
        if ($left_map.length > 0) {
            var loc, map, marker, infobox;

            loc = new google.maps.LatLng(-33.890542, 151.274856);

            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            });


            var Grayscale = new google.maps.StyledMapType([
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#d3d3d3"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "color": "#808080"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#b3b3b3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d7d7d7"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ebebeb"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a7a7a7"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#efefef"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#696969"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#737373"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d6d6d6"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {},
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                }
            ], {name: 'Grayscale'});


            map.mapTypes.set('grayscale', Grayscale);
            map.setMapTypeId('grayscale');

            marker = new google.maps.Marker({
                map: map,
                position: loc,
                visible: true,
                icon: 'img/marker.png'
            });

            infobox = new InfoBox({
                content: document.getElementById("infobox"),
                disableAutoPan: true,
                maxWidth: 150,
                pixelOffset: new google.maps.Size(-220, -230),
                zIndex: null,
                boxStyle: {
                    opacity: 1,
                    width: "400px"
                },
                closeBoxMargin: "12px 4px 2px 2px",
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                infoBoxClearance: new google.maps.Size(1, 1)
            });

            google.maps.event.addListener(marker, 'click', function () {
                infobox.open(map, this);
                marker.setIcon('img/marker_clicked.png');
            });

        }
    }


    google.maps.event.addDomListener(window, 'load', initialize);

    /* STRECH MAP TO FULL HEIGHT ON SEARCH PAGE STYLE LEFT */
    function calc_side_map_search() {
        if ($('.map-listing .container-fluid').length > 0) {
            var offset = 0;
            $('.navigation').css({
                position: 'fixed',
                top: offset,
                left: '0px',
                right: '0px',
                zIndex: 10
            });
            $('.header-map').css({
                top: $('header').outerHeight(true) + $('.search-bar').outerHeight(true) + offset + 2,
                left: '0px',
                bottom: '0px',
                width: $('.map-size').outerWidth(true),
                position: 'fixed',
                zIndex: 10
            });

            $('.header-map #map').css({
                height: $('.header-map').height()
            });
        }
    }

    calc_side_map_search();
    $(window).resize(function () {
        calc_side_map_search();
    });

    // SINGLE MAP
    var $single_map = $('#single-map');
    if ($single_map.length > 0) {
        var location = new google.maps.LatLng(-33.890542, 151.274856);

        var map = new google.maps.Map(document.getElementById("single-map"), {
            zoom: 16,
            center: location,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        });

        var marker = new google.maps.Marker({
            map: map,
            position: location,
            visible: true,
            icon: 'img/icon_single_marker.png'
        });

        var Grayscale = new google.maps.StyledMapType([
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d3d3d3"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b3b3b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 1.8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d7d7d7"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a7a7a7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#efefef"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#696969"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d6d6d6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {},
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            }
        ], {name: 'Grayscale'});

        map.mapTypes.set('grayscale', Grayscale);
        map.setMapTypeId('grayscale');
    }

    // mobile step add color blue
    if ($('.breadcrumb li:last-child').hasClass('active')) {
        $('.breadcrumb li:last-child').parent().css('background-color', '#154067');
    }

    if ($(window).width() < 1030) {
        $('.more-filter').on('click', function () {
            $('.mobile-search-filter').slideDown();
        });
    } else {
        $('.more-filter.modal-filter').click(function () {
            $('#myModal').modal();
        });
    }
    $('.close-filter').on('click', function () {
        $('.mobile-search-filter').slideUp();
    });

    // Inside filter dropdowns
    $('.dropdown-filter > li').on('click', function () {
        $(this).find($('.d-filter-inside')).slideDown();
    });
    $('.mobile-options .done').on('click', function (e) {
        e.preventDefault();
        $(this).closest($('.d-filter-inside')).slideUp();
        $(this).closest('options').closest('.option').focus().find('.result').html($(event.target).text());
        e.stopPropagation();
    });

    var $first = $('li:first', '.options'),
        $last = $('li:last', '.options');
// Have the first and last li's set to a variable
    $(".m-arrows .next").click(function () {

        var $next,
            $selected = $(this).parents('.d-filter-inside').find(".selected");
        // get the selected item
        // If next li is empty , get the first
        $next = $selected.next('li').length ? $selected.next('li') : $first;
        $selected.removeClass("selected");
        $next.addClass('selected');
        if ($selected) {
            $selected.find('a').focus();
        }
    });

    $(".prev").click(function () {
        var $prev,
            $selected = $(".selected");
        // get the selected item
        // If prev li is empty , get the last
        $prev = $selected.prev('li').length ? $selected.prev('li') : $last;
        $selected.removeClass("selected");
        $prev.addClass('selected');
        if ($selected) {
            $selected.find('a').focus();
        }
    });

    $('.options a').on('click', function (e) {
        e.preventDefault();
        $(this).focus().closest('.option').find('.result').html($(event.target).text());
        $(this).closest('.options').find('li').removeClass('selected')
        $(this).parent().addClass('selected')
    });

    $('.options a').on('focus', function() {
        $(this).closest('.option').find('.result').html($(event.target).text());
    });

});
