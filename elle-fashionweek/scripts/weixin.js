var appid = 'wx0de0bfa56da2b49a',
    shareTitle = $('meta[property=data-title]').attr('content'),
    shareDesc = $('meta[property=data-description]').attr('content'),
    shareImg = $('meta[property=data-image]').attr('content'),
    shareLink = location.href;

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": shareImg,
        "img_width": "438",
        "img_height": "145",
        "link": shareLink,
        "desc": shareDesc,
        "title": shareTitle
    }, function(res) {
        _report('send_msg', res.err_msg);
    })
}

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": shareImg,
        "img_width": "438",
        "img_height": "145",
        "link": shareLink,
        "desc": shareDesc,
        "title": shareTitle
    }, function(res) {
        _report('timeline', res.err_msg);
    });
}

function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": shareDesc,
        "url": shareLink,
    }, function(res) {
        _report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        shareFriend();
    });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        shareTimeline();
    });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        shareWeibo();
    });
}, false);