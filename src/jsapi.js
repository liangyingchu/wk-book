

/**
 *  判断是否是iOS
 */
export function isIOS() {
    // body...
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
}


function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge(function (bridge) {
    //注册app调用方法
    bridge.registerHandler("event", function (data, responseCallback) {
        var event = data['event']
        appEvent(event)
    })
    
    bridge.registerHandler("result", function (data, responseCallback) {
        
        result(data['opType'], data['code'], data['msg'])
        
    })
    
});

//分享URL
export function shareUrl(url,title,desc,imgUrl){
    console.log("share");
    if(isIOS()){
        setupWebViewJavascriptBridge(function (bridge) {
            var data = {'shareUrl': url, 'title': title, 'desc': desc, 'imgUrl': imgUrl}
            bridge.callHandler('shareUrl', data, function responseCallback(responseData) {
                var success = responseData['success']
                if (success == true) {// JS处理成功回调
                
                }
            });
        });
    }else{
        //android
        window.client.shareUrl(url,title,desc,imgUrl);
    }
    
}

// 绑定微信
export function bindWechat(){
    setupWebViewJavascriptBridge(function (bridge) {
        var data = {'platform': 1}
        bridge.callHandler('bindWithDrawAccount', data)
    })
    
    //android
    window.client.bindWithDrawAccount(1);
}

//每日任务分享
function dailyShareReward(url,title,desc,imgUrl){
    console.log("share");
    if(isIOS()){
        setupWebViewJavascriptBridge(function (bridge) {
            var data = {'shareUrl': url, 'title': title, 'desc': desc, 'imgUrl': imgUrl}
            bridge.callHandler('dailyShareReward', data, function responseCallback(responseData) {
                var success = responseData['success']
                if (success == true) {// JS处理成功回调
                
                }
            });
        });
    }else{
        //android
        window.client.dailyShareReward(url,title,desc,imgUrl);
    }
    
}

//设置标题
export function setTitle(title){
    if(isIOS()){
        setupWebViewJavascriptBridge(function (bridge) {
            var data = {'title': title}
            bridge.callHandler('setTitle', data)
        })
    }else{
        //android
        window.client.setTitle(title);
        
    }
}

/**
 * 设置右侧按钮标题和URL
 */
export function setRigntBtn(title,url){
    setupWebViewJavascriptBridge(function (bridge) {
        var data = {'title': title,'url':url}
        bridge.callHandler('setRightBtn', data)
    })
    //android
    window.client.setRightBtn(title,url);
}

// 跳转
export function clickClient(actionId,action){
    setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('click', {'actionID': actionId,'content':action}, function(response) {
            log('JS got response', response)
        })
    })
    //android
    window.client.click(actionId,action);
}

// APP生命周期事件
function appEvent(event){
    if (event === 'onResume()'){
        log('app calling handler "onResume"')
    }
    
    if(event === 'onPause()'){
        log('app calling handler "onPause"')
    }
    
    if(event === 'onDestroy()'){
        log('app calling handler "onDestroy"')
    }
}


function result(opTpye,code,msg){
}










