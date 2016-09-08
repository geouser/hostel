// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();

        $(this).toggleClass('active');
        $('.sideMenu').toggleClass('active');

        if ($('.sideMenu').hasClass('active')) {
            $('.sideMenu').css({
                'left': '0%',
                'transition-delay': '.0s'
            });
            $('.sideMenu .wrapper').css({
                'opacity': '1',
                'transition': 'opacity .2s .4s'
            });
            if ($(window).width() > 600) {
                $('.sidebar').css({
                    'animation-name': 'move'
                });
            }
            if ($(window).width() < 750) {
               $('.circle').css({
                    'width': '1220px',
                    'height': '1220px',
                });
            } else if ($(window).width() < 1200) {
                $('.circle').css({
                    'width': '1900px',
                    'height': '1900px',
                });
            } else  {
                $('.circle').css({
                    'width': '1600px',
                    'height': '1600px',
                });
            }
            $('body').css('overflow', 'hidden');

        } else {
            $('.circle').css({
                'width': '1px',
                'height': '1px',
                'border-radius': '50%'
            });
            $('.sideMenu .wrapper').css({
                'transition-delay': '0s',
                'opacity': '0'
            });
            $('.sideMenu').css({
                'transition': '.0s',
                'transition-delay': '.6s',
                'left': '-200%'
            });
            if ($(window).width() > 600) {
                $('.sidebar').css({
                    'animation-name': 'moveBack'
                });
            }
            $('body').css('overflow', 'visible');
        }
    });

    $('.mainslider').slick({
        fade: true,
        arrows: false
    });

    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    $('.advantagestSlider').slick({
        dots: false,
        arrows: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        daptiveHeight: true,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
        ]
    });

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }


    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });

    /*----------------------------
                              CUSTOM SCROLLBAR
    -------------------------*/
    if ( $('.scroll').length > 0 ) {
        $('.scroll').perfectScrollbar();
        if ( $(window).width() < 992 ) {
            $('.scroll').perfectScrollbar('destroy');
        }
        $(window).resize(function(event) {
            $('.scroll').perfectScrollbar('update');
            if ( $(window).width() < 992 ) {
                $('.scroll').perfectScrollbar('destroy');
            } else {
                $('.scroll').perfectScrollbar();
            }
        });    
    }

    if ( $('.menu-scroll').length > 0 ) {
        $('.menu-scroll').perfectScrollbar();
        $(window).resize(function(event) {
            $('.menu-scroll').perfectScrollbar('update');
        });  
    }


    /*----------------------------
                              SLIDER
    -------------------------*/
    /*initialization*/
    if ( $('.slider').length > 0 ) {
        
        $('.slider').on('init', function(event, slick){
            $(slick.$slides[0]).css('background-image', 'url('+$(slick.$slides[0]).data('image')+')');
            $(slick.$slides[1]).css('background-image', 'url('+$(slick.$slides[1]).data('image')+')');

            $(this).append('<div class="counter"><span class="current"></span>/<span class="total"></span></div>')

            $('.counter .total').text(slick.slideCount);
            $('.counter .current').text(1)
        });

        $('.slider').on('afterChange', function(event, slick, currentSlide){
            $(slick.$slides[currentSlide+1]).css('background-image', 'url('+$(slick.$slides[currentSlide+1]).data('image')+')');
            $('.counter .current').text(currentSlide+1)
        });

        $('.slider').slick({
            dots: false,
            infinite: false,
            fade: true
        });
    }


        $('.back').click(function(){
            var parent = $(this).parent().parent().parent().parent();
            parent.css({
                'position': 'absolute',
                'left': '0',
                'transform': 'scale(0)',
                'margin-top': '-80px',
                'border-radius': '50%',
                'transition' : 'transform .4s'
            });
            parent.children('.column').css('display', 'none');
        });

        $('.room__card').click(function(){
            var roomDetails = $(this).next('.room__info__details');
            roomDetails.css({
                    'transform': 'scale(1)',
                    'position': 'fixed',
                    'margin-top': '0px',
                    'border-radius': '0%',
                    'transition' : '.4s transform .2s'
            });
            roomDetails.children('.column').css('display', 'block');
            roomDetails.find('.roomslider').slick('setPosition');
        });

        $('.roomslider').on('init', function(event, slick){
            $(slick.$slides[0]).css('background-image', 'url('+$(slick.$slides[0]).data('image')+')');
            $(slick.$slides[1]).css('background-image', 'url('+$(slick.$slides[1]).data('image')+')');

            $(this).append('<div class="counter"><span class="current"></span>/<span class="total"></span></div>');

            $('.counter .total').text(slick.slideCount);
            $('.counter .current').text(1)
        });

        $('.roomslider').on('afterChange', function(event, slick, currentSlide){
            $(slick.$slides[currentSlide+1]).css('background-image', 'url('+$(slick.$slides[currentSlide+1]).data('image')+')');
            $('.counter .current').text(currentSlide+1)
        });

        if ( $('.roomslider').length > 0 ) {
            $('.roomslider').slick({
                infinite: false,
                fade: true
            });
        }



    
    /*---------------------------
                                GOOGLE MAP
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);


        var mapOptions = {
            center: mapCenterCoord,
            zoom: 14,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var image = {
            url: 'images/location.png',
            size: new google.maps.Size(62, 57),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(22, 57),
        };
        var marker = new google.maps.Marker({
            icon: image,
            position: mapMarkerCoord, 
            map: map
        });

        map.addListener('click', function(e) {
            console.log('{lat: '+e.latLng.lat()+', lng: '+e.latLng.lng()+'},');
        });

        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( $('#map_canvas').length > 0) {
        googleMap_initialize();   
    }



}); // end file