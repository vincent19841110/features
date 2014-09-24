$(document).ready(function() {

    var setLayout = function() {

        $('#time').height($('#time').width());

        if ($('.tpl6').length > 0) {

            var circleWidth = $('.mid-circle').width(),
                circleHeight = circleWidth,
                circleTop = ($(window).height() - circleHeight) / 2,
                circleLeft = ($(window).width() - circleWidth) / 2;

            $('.mid-circle').css({
                'height': circleHeight,
                'top': circleTop,
                'left': circleLeft
            });
        };
    }();

    $('#cards').card();

    var playMusic = function() {
        var audio = $('audio')[0],
            icon = $('#play-icon'),
            isPlaying = false;

        audio.addEventListener('play', function() {
            icon.addClass('on');
            isPlaying = true;
        });
        audio.addEventListener('pause', function() {
            icon.removeClass('on');
            isPlaying = false;
        });

        $(document).one('touchstart', function(e) {
            audio.play();
        });

        icon.hammer().on('tap', function(e) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            };
        });
    }();

    imagesLoaded($('img'), function() {
        $('#loading').fadeOut();
    });
});