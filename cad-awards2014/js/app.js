$(document).ready(function() {

	imagesLoaded($('#container'), function(){
		$('#loading').hide();
		pageInit();
	});

	$(window).resize (function () {
		setLayout();
	});

    function stopScrolling( touchEvent ) {   
        touchEvent.preventDefault();   
    }  
    document.addEventListener( 'touchstart' , stopScrolling , false );  
    document.addEventListener( 'touchmove' , stopScrolling , false );  

});

var pageInit = function() {
	setLayout();
	showImage();
	showVideo();
	carouselInit($('#p16'));
	carouselInit($('#p17'));
	var initPage;
	if(location.hash.length == 0) {
		initPage = "p1";
	} else {
		initPage = location.hash.replace('#', '');
	};
	$('#'+initPage).addClass('hover');
	location.hash = $('.hover').attr('id');
	animate();

	$('#cars').tap(function(){
		turnPage($('#p1'), 'up')
	});
	$('#table').tap(function(){
		turnPage($('#p1'), 'down')
	});

	$('.content').swipeUp(function(event){
		event.preventDefault();
		turnPage($('.hover'), 'up');
	});
	$('.content').swipeDown(function(event){
		event.preventDefault();
		turnPage($('.hover'), 'down');
	});
};
var showVideo = function(){
	$('.video').tap(function(){
		var id = $('.hover').attr('data-id');
		$('#video').html(
			'<video controls autoplay><source src="video/'
			+ (id-1) +
			'.mp4" type="video/mp4" />你的浏览器不支持HTML5格式的播放器</video>'
		).show();
		$('#mask,#video-close').show();
		$('.hover').addClass('blur');
		TweenLite.to([$('#video'), $('#video-close')], .4, {opacity: "1"});
	});
	$('#video-close').tap(function(){
		$('.hover').removeClass('blur');
		TweenLite.to([$('#video'), $('#video-close')], .4, {opacity: "0", onComplete: callBack});
		function callBack() {
			$('#mask,#video,#video-close').hide();
		}
	})
};

var showImage = function() {
	$('.plus').tap(function(){
		TweenLite.to(this, .5, {opacity: "0", left: "-10%"});
		TweenLite.to($('.hover .image'), .4, {width: "100%"});
		TweenLite.to($('.hover .close'), .3, {right: "3%", delay: .3});
	});
	$('.close').tap(function(){
		TweenLite.to(this, .3, {right: "-10%"});
		TweenLite.to($('.hover .image'), .4, {width: "1%"});
		TweenLite.to($('.hover .plus'), .3, {opacity: "1", left: "6.875%", delay: .3});
	})
};

var turnPage = function(elem,direction) {
	var height;
	var i = $(elem).attr('data-id');
	if(direction == 'up') {
		height = $('.hover').height();
		i++;
		if(i == 18) {i = 1}
	} else if(direction == 'down') {
		height = -$('.hover').height();
		i--;
		if (i == 0) {i = 17}
	};
	$('#mask').show();
	TweenLite.to(elem, .5, {top: -height});
	$('#p'+i).addClass('hover');
	TweenLite.from($('#p'+i), .5, {top: height, onComplete: callBack});
	function callBack() {
		$(elem).removeClass('hover').css('top', "0px").find('div').css('opacity','0');
		$('#mask').hide();
		location.hash = $('.hover').attr('id');
		animate();
	}
};

var setLayout = function() {
	var width = $(document).width();
	var height = $(window).height();
	var ratio;
	if(width <= 640 && width >= 320) {
		ratio = width/320;
	} else if(width > 640) {
		ratio = 2;
	} else {
		ratio = 1;
	};
	if(height<450) {
		$('#wrapper').height(height);
		$('#container').height(height-40);
		$('header').css('marginTop','-30px');
		$('.text').css('bottom','-30px');
		$('#p14 .text').css('bottom', "-20px");
		$('#p7 .text').css('bottom', "-40px");
		$('#mask').css('top', "-32px");
		$('.bottomimage').css('bottom', "-60px");
		$('#cars,#table').css('bottom', "5%");
	} else if (height>450 && height < 480){
		$('#wrapper').height(height);
		$('#container').height(height-76);
		$('.text').css('bottom',"-20px");
		$('.bottomimage').css('bottom', "-15px");
	} else {
		$('#wrapper').height(480*ratio);
		$('#container').height(407*ratio);
	}
};

var animate = function() {
	if($('.hover').attr('data-id') == "1") {
		TweenLite.to($('#p1 .subheader'), .5, {opacity: "1"});
		TweenLite.from($('#p1 #hometitle'), .5, {css: {marginTop: "+=40px"}, delay: .3});
		TweenLite.to($('#p1 #hometitle'), .5, {opacity: "1", delay: .3});
		TweenLite.from($('#p1 #hometext'), .5, {css: {marginTop: "+=40px"}, delay: .6});
		TweenLite.to($('#p1 #hometext'), .5, {opacity: "1", delay: .6});
		TweenLite.from($('#p1 #homeimage'), .5, {css: {marginTop: "+=40px"}, delay: .9});
		TweenLite.to($('#p1 #homeimage'), .5, {opacity: "1", delay: .9});
		TweenLite.from($('#p1 #table,#p1 #cars'), .5, {css: {marginTop: "+=40px"}, delay: 1.1});
		TweenLite.to($('#p1 #table,#p1 #cars'), .5, {opacity: "1", delay: 1.1});
	} else if($('.hover').attr('data-id') == "16" || $('.hover').attr('data-id') == "17") {
		TweenLite.to($('.hover div'), .3, {opacity: "1"});
	} else {
		TweenLite.from($('.hover .tag'), .4, {left: "-60px", ease: Bounce.easeOut});
		TweenLite.to($('.hover .tag'), .3, {opacity: "1"});
		TweenLite.from($('.hover .title'), .3, {width: "80%"});
		TweenLite.to($('.hover .title'), .3, {opacity: "1"});
		TweenLite.from($('.hover .car'), .4, {width: "80%",delay: .4});
		TweenLite.to($('.hover .car'), .2, {opacity: "1",delay: .4});
		TweenLite.from($('.hover .text'), .4, {width: "80%", delay: .8, ease: Bounce.easeOut});
		TweenLite.to($('.hover .text'), .2, {opacity: "1", delay: .8});
		TweenLite.from($('.hover .video'), .2, {bottom: "-=20px", delay: 1});
		TweenLite.to($('.hover .video'), .2, {opacity: "1", delay: 1});
		TweenLite.to($('.hover .awards, .awards div'), .2, {opacity: "1", delay: 1.2});
	}
};

var carousel = function(page,thisPic,direction){
	var width,
		nextPic;
	if(direction == 'left') {
		width=$(document).width();
		nextPic = $(thisPic).next();
		if($(thisPic).index() + 1 == page.find('li').length) {
			nextPic = page.find('.first');
		};
	} else if(direction == 'right'){
		width= -$(document).width();
		nextPic = $(thisPic).prev();
		if($(thisPic).index() + 1 == 1) {
			nextPic = page.find('.last');
		};
	};
	TweenLite.to(thisPic, .5, {left: -width});
	nextPic.addClass('hoverPic');
	TweenLite.from(nextPic, .5, {left: width, onComplete: callBack});
	function callBack() {
		$(thisPic).removeClass('hoverPic').css('left', "0px");
	};
};
var carouselInit = function(page) {
	page.find('.first').addClass('hoverPic');
	page.find('li').swipeLeft(function(){
		event.stopPropagation();
		event.preventDefault();
		carousel(page, this, 'left');
	});
	page.find('li').swipeRight(function(){
		event.stopPropagation();
		event.preventDefault();
		carousel(page, this, 'right');
	});
	page.find('.next').tap(function(){
		event.stopPropagation();
		event.preventDefault();
		carousel(page, $('.hoverPic'), 'left');
	});
	page.find('.prev').tap(function(){
		event.stopPropagation();
		event.preventDefault();
		carousel(page, $('.hoverPic'), 'right');
	});
}


//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)