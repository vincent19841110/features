(function($) {
    $.fn.card = function(options) {

        /*        var defaults = {
            effect: rotate
        };
        var options = $.extend(defaults, options);*/

        document.addEventListener && document.addEventListener("touchmove", function(a) {
            a.preventDefault()
        });

        var rotatePrevStyle = {
                'z-index': '99',
                'transition': '0s',
                'transform': 'rotate3d(1,0,0,25deg) translate3d(0,0,0)'
            },
            rotateCurrentStyle = {
                'z-index': '100',
                'transition': '0s',
                'transform': 'rotate3d(1,0,0,0deg) translate3d(0,0,0)'
            },
            rotateNextStyle = {
                'z-index': '101',
                'transition': '0s',
                'transform': 'rotate3d(1,0,0,-25deg) translate3d(0,100%,0)'
            },
            rotateOtherStyle = {
                'transition': '0s',
                'transform': 'translate3d(0,100%,0)'
            };

        var rotate = function(y) {
            if (y >= 0) {
                prev.css('transform', 'rotate3d(1,0,0,' + 25 * (1 - y) + 'deg) translate3d(0,0,0)');
                current.css('transform', 'rotate3d(1,0,0,' + 25 * (0 - y) + 'deg) translate3d(0,' + 100 * (0 + y) + '%,0)');
                next.css('transform', 'rotate3d(1,0,0,25deg) translate3d(0,100%,0)');
            } else {
                prev.css('transform', 'rotate3d(1,0,0,25deg) translate3d(0,0,0)');
                current.css('transform', 'rotate3d(1,0,0,' + 25 * (0 - y) + 'deg) translate3d(0,0,0)');
                next.css('transform', 'rotate3d(1,0,0,' + 25 * (-1 - y) + 'deg) translate3d(0,' + 100 * (1 + y) + '%,0)');
            };
        };

        var wrapper = this,
            all = this.children(),
            current,
            next,
            prev,
            prevStyle = rotatePrevStyle,
            currentStyle = rotateCurrentStyle,
            nextStyle = rotateNextStyle,
            otherStyle = rotateOtherStyle,
            dragY = 0,
            isTurning = false,
            isTurned = false;

        var setOrder = function() {

            current = $('.hover');
            if ($('.hover').next().length !== 0) {
                next = current.next();
            } else {
                next = all.first();
            };
            if ($('.hover').prev().length !== 0) {
                prev = current.prev();
            } else {
                prev = all.last();
            };

            all.css(otherStyle);
            prev.css(prevStyle);
            current.css(currentStyle);
            next.css(nextStyle);

            isTurning = false;
            isTurned = false;
        };

        var setTime = function() {
            if ($('.hover').hasClass('cover')) {
                $('#timeline, #time').css('opacity', '0');
                $('#highlight').css('height', '0%');
                $('#time').css('top', '1%');
            } else {
                $('#timeline, #time').css('opacity', '1');
                $('#time').css('opacity', '0.7');
                var time = $('.hover').attr('data-time');
                var top = time / 2400;
                var timeTop = top - $('#time').height() / 2 / $(window).height();

                $('#highlight').css('height', top * 100 + '%');
                $('#time').css('top', timeTop * 100 + '%');

                var timeArr = (time + '').split('');
                var timeText = timeArr[0] + timeArr[1] + ":" + timeArr[2] + timeArr[3];
                $('#time-text').html(timeText);
            };
        };

        var turn = function(effect, y, transition) {
            if (transition) {
                all.css('transition', '0.28s');
            } else {
                all.css('transition', '0s');
            };
            effect(y);
        };

        var init = function() {

            wrapper.css('perspective', '300px');
            all.css('transform-origin', '0 100% 0');
            all.first().addClass('hover');

            setOrder();
            setTime();

            wrapper.hammer().on('swipeup swipedown dragup dragdown release', function(e) {
                dragY = e.gesture.deltaY / $(window).height();
                switch (e.type) {
                    case 'swipeup':
                        turn(rotate, -1, true);
                        break;
                    case 'swipedown':
                        turn(rotate, 1, true);
                        break;
                    case 'dragup':
                    case 'dragdown':
                        if (!isTurning) {
                            turn(rotate, dragY, false);
                        };
                        break;
                    case 'release':
                        isTurning = true;
                        if (dragY > 0.2) {
                            isTurned = true;
                            turn(rotate, 1, true);
                            current.removeClass('hover');
                            prev.addClass('hover');
                        } else if (dragY < -0.2) {
                            isTurned = true;
                            turn(rotate, -1, true);
                            current.removeClass('hover');
                            next.addClass('hover');
                        } else {
                            turn(rotate, 0, true);
                            isTurned = false;
                        };
                        break;
                };
            });

            wrapper.on('webkitTransitionEnd', function() {
                if (isTurned) {
                    setOrder();
                    setTime();
                };
                isTurning = false;
                isTurned = false;
            });
        }();
    };
})(jQuery);