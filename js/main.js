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
            $('.sidebar').css({
                'animation-name': 'move'
            });
            $('.circle').css({
                'width': '1600px',
                'height': '1600px',
            });
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
            $('.sidebar').css({
                'animation-name': 'moveBack'
            });
        }
    });

    $('.mainslider').slick({
        fade: true
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
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
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

    /*if ( $('.scroll').length > 0 ) {
        $('.scroll').perfectScrollbar();
        $(window).resize(function(event) {
            $('.scroll').perfectScrollbar('update');
        });    
    }*/
    


    /*----------------------------
                              SLIDER
    -------------------------*/

    /*initialization*/
    if ( $('.slider, .roomslider').length > 0 ) {

        $('.slider, .roomslider').on('init', function(event, slick){
            $(slick.$slides[0]).css('background-image', 'url('+$(slick.$slides[0]).data('image')+')');
            $(slick.$slides[1]).css('background-image', 'url('+$(slick.$slides[1]).data('image')+')');

            $(this).append('<div class="counter"><span class="current"></span>/<span class="total"></span></div>')
        });


        $('.slider, .roomslider').on('afterChange', function(event, slick, currentSlide){
            $(slick.$slides[currentSlide+1]).css('background-image', 'url('+$(slick.$slides[currentSlide+1]).data('image')+')');
            $('.counter .current').text(currentSlide+1)
        });
    }

    
    $('.room').click(function(){
        var roomDetails = $(this).find('.room__info__details');
        roomDetails.css({
                'position': 'fixed',
                'max-width': '3000px',
                'height': '100%',
                'left': '140px',
                'transform': 'scale(1)'
        });
        roomDetails.children('.column').css('display', 'block');
        roomDetails.find('.roomslider').slick();
    });

    $('.back').click(function(){
        var parent = $(this).parent().parent();
        parent.find('.roomslider').unslick();
        parent.css({
            'position': 'absolute',
            'max-width': '1px',
            'height': '0',
            'transform': 'scale(0)'
        });
    });

    /*----------------------------
                              Services columns
    -------------------------*/
    $('.services__list').each(function(index, el) {
        if ( $(this).find('li').length <= 4 ) {
            $(this).find('li').css('width', '100%');
        }
    });



}); // end file