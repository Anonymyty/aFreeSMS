var xajaxRequestUri = "http://afreesms.com/intl/philippines";
var xajaxDebug = false;
var xajaxStatusMessages = true;
var xajaxWaitCursor = true;
var xajaxDefinedGet = 0;
var xajaxDefinedPost = 1;
var xajaxLoaded = false;

function textCounter(e, t, n) {
    if (e.value.length > n) {
        e.value = e.value.substring(0, n)
    } else {
        t.value = n - e.value.length
    }
}

function createCookie(e, t, n) {
    if (n) {
        var r = new Date;
        r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
        var i = "; expires=" + r.toGMTString()
    } else var i = "";
    document.cookie = e + "=" + t + i + "; path=/"
}

function eraseCookie(e) {
    createCookie(e, "", -1)
}

function RDset(e) {
    var t = new Date;
    var n = window.location.hostname;
    t.setTime(t.getTime() + e * 24 * 60 * 60 * 1e3);
    var r = "expires=" + t.toGMTString();
    document.cookie = "rd=" + n + "; " + r
}
