function Xajax() {
    this.arrayContainsValue = function(e, t) {
        for (i in e) {
            if (e[i] == t) return true
        }
        return false
    };
    this.DebugMessage = function(e) {
        if (e.length > 1e3) e = e.substr(0, 1e3) + "...\n[long response]\n...";
        try {
            if (this.debugWindow == undefined || this.debugWindow.closed == true) {
                this.debugWindow = window.open("about:blank", "xajax-debug", "width=800,height=600,scrollbars=1,resizable,status");
                this.debugWindow.document.write('<html><head><title>Xajax debug output</title></head><body><h2>Xajax debug output</h2><div id="debugTag"></div></body></html>')
            }
            debugTag = this.debugWindow.document.getElementById("debugTag");
            if (!debugTag) throw new Error;
            e = e.replace(/&/g, "&");
            e = e.replace(/</g, "&lt;");
            e = e.replace(/>/g, "&gt;");
            debugTag.innerHTML = "<b>" + (new Date).toString() + "</b>: " + e + "<hr/>" + debugTag.innerHTML
        } catch (t) {
            alert("Xajax Debug:\n " + e)
        }
    };
    this.workId = "xajaxWork" + (new Date).getTime();
    this.depth = 0;
    this.responseErrorsForAlert = ["400", "401", "402", "403", "404", "500", "501", "502", "503"];
    this.getRequestObject = function() {
        if (xajaxDebug) this.DebugMessage("Initializing Request Object..");
        var e = null;
        if (typeof XMLHttpRequest != "undefined") e = new XMLHttpRequest;
        if (!e && typeof ActiveXObject != "undefined") {
            try {
                e = new ActiveXObject("Msxml2.XMLHTTP");
                XMLHttpRequest = function() {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }
            } catch (t) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP");
                    XMLHttpRequest = function() {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    }
                } catch (n) {
                    try {
                        e = new ActiveXObject("Msxml2.XMLHTTP.4.0");
                        XMLHttpRequest = function() {
                            return new ActiveXObject("Msxml2.XMLHTTP.4.0")
                        }
                    } catch (r) {
                        e = null
                    }
                }
            }
        }
        if (!e && window.createRequest) e = window.createRequest();
        if (!e) this.DebugMessage("Request Object Instantiation failed.");
        return e
    };
    this.$ = function(e) {
        if (!e) {
            return null
        }
        var t = document.getElementById(e);
        if (!t && document.all) {
            t = document.all[e]
        }
        if (xajaxDebug && !t && e != this.workId) {
            this.DebugMessage('Element with the id "' + e + '" not found.')
        }
        return t
    };
    this.include = function(e) {
        var t = document.getElementsByTagName("head");
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.src = e;
        t[0].appendChild(n)
    };
    this.stripOnPrefix = function(e) {
        e = e.toLowerCase();
        if (e.indexOf("on") == 0) {
            e = e.replace(/on/, "")
        }
        return e
    };
    this.addOnPrefix = function(e) {
        e = e.toLowerCase();
        if (e.indexOf("on") != 0) {
            e = "on" + e
        }
        return e
    };
    this.addHandler = function(sElementId, sEvent, sFunctionName) {
        if (window.addEventListener) {
            sEvent = this.stripOnPrefix(sEvent);
            eval("this.$('" + sElementId + "').addEventListener('" + sEvent + "'," + sFunctionName + ",false);")
        } else if (window.attachEvent) {
            sAltEvent = this.addOnPrefix(sEvent);
            if (eval("this.$('" + sElementId + "').attachEvent('" + sAltEvent + "'," + sFunctionName + ");")) window.attachEvent("onunload", eval("function(){xajax.$('" + sElementId + "').detachEvent('" + sAltEvent + "'," + sFunctionName + ");}"))
        } else {
            sAltEvent = this.addOnPrefix(sEvent);
            eval("this.$('" + sElementId + "')." + sAltEvent + " = " + sFunctionName)
        }
    };
    this.removeHandler = function(sElementId, sEvent, sFunctionName) {
        if (window.removeEventListener) {
            sEvent = this.stripOnPrefix(sEvent);
            eval("this.$('" + sElementId + "').removeEventListener('" + sEvent + "'," + sFunctionName + ",false);")
        } else if (window.detachEvent) {
            sAltEvent = this.addOnPrefix(sEvent);
            try {
                eval("this.$('" + sElementId + "').detachEvent('" + sAltEvent + "'," + sFunctionName + ");")
            } catch (ignore) {}
        } else {
            sAltEvent = this.addOnPrefix(sEvent);
            eval("this.$('" + sElementId + "')." + sAltEvent + " = null")
        }
    };
    this.create = function(e, t, n) {
        var r = this.$(e);
        objElement = document.createElement(t);
        objElement.setAttribute("id", n);
        if (r) r.appendChild(objElement)
    };
    this.insert = function(e, t, n) {
        var r = this.$(e);
        objElement = document.createElement(t);
        objElement.setAttribute("id", n);
        r.parentNode.insertBefore(objElement, r)
    };
    this.insertAfter = function(e, t, n) {
        var r = this.$(e);
        objElement = document.createElement(t);
        objElement.setAttribute("id", n);
        r.parentNode.insertBefore(objElement, r.nextSibling)
    };
    this.getInput = function(e, t, n) {
        var r;
        if (!window.addEventListener) {
            r = document.createElement('<input type="' + e + '" id="' + n + '" name="' + t + '">')
        } else {
            r = document.createElement("input");
            r.setAttribute("type", e);
            r.setAttribute("name", t);
            r.setAttribute("id", n)
        }
        return r
    };
    this.createInput = function(e, t, n, r) {
        var i = this.$(e);
        var s = this.getInput(t, n, r);
        if (i && s) i.appendChild(s)
    };
    this.insertInput = function(e, t, n, r) {
        var i = this.$(e);
        var s = this.getInput(t, n, r);
        if (s && i && i.parentNode) i.parentNode.insertBefore(s, i)
    };
    this.insertInputAfter = function(e, t, n, r) {
        var i = this.$(e);
        var s = this.getInput(t, n, r);
        if (s && i && i.parentNode) {
            i.parentNode.insertBefore(s, i.nextSibling)
        }
    };
    this.remove = function(e) {
        objElement = this.$(e);
        if (objElement && objElement.parentNode && objElement.parentNode.removeChild) {
            objElement.parentNode.removeChild(objElement)
        }
    };
    this.replace = function(sId, sAttribute, sSearch, sReplace) {
        var bFunction = false;
        if (sAttribute == "innerHTML") sSearch = this.getBrowserHTML(sSearch);
        eval("var txt=this.$('" + sId + "')." + sAttribute);
        if (typeof txt == "function") {
            txt = txt.toString();
            bFunction = true
        }
        if (txt.indexOf(sSearch) > -1) {
            var newTxt = "";
            while (txt.indexOf(sSearch) > -1) {
                x = txt.indexOf(sSearch) + sSearch.length + 1;
                newTxt += txt.substr(0, x).replace(sSearch, sReplace);
                txt = txt.substr(x, txt.length - x)
            }
            newTxt += txt;
            if (bFunction) {
                eval('this.$("' + sId + '").' + sAttribute + "=newTxt;")
            } else if (this.willChange(sId, sAttribute, newTxt)) {
                eval('this.$("' + sId + '").' + sAttribute + "=newTxt;")
            }
        }
    };
    this.getFormValues = function(e) {
        var t;
        var n = false;
        if (arguments.length > 1 && arguments[1] == true) n = true;
        var r = "";
        if (arguments.length > 2) r = arguments[2];
        if (typeof e == "string") t = this.$(e);
        else t = e;
        var i = "<xjxquery><q>";
        if (t && t.tagName.toUpperCase() == "FORM") {
            var s = t.elements;
            for (var o = 0; o < s.length; o++) {
                if (!s[o].name) continue;
                if (s[o].name.substring(0, r.length) != r) continue;
                if (s[o].type && (s[o].type == "radio" || s[o].type == "checkbox") && s[o].checked == false) continue;
                if (s[o].disabled && s[o].disabled == true && n == false) continue;
                var u = s[o].name;
                if (u) {
                    if (i != "<xjxquery><q>") i += "&";
                    if (s[o].type == "select-multiple") {
                        for (var a = 0; a < s[o].length; a++) {
                            if (s[o].options[a].selected == true) i += u + "=" + encodeURIComponent(s[o].options[a].value) + "&"
                        }
                    } else {
                        i += u + "=" + encodeURIComponent(s[o].value)
                    }
                }
            }
        }
        i += "</q></xjxquery>";
        return i
    };
    this.objectToXML = function(e) {
        var t = "<xjxobj>";
        for (i in e) {
            try {
                if (i == "constructor") continue;
                if (e[i] && typeof e[i] == "function") continue;
                var n = i;
                var r = e[i];
                if (r && typeof r == "object" && this.depth <= 50) {
                    this.depth++;
                    r = this.objectToXML(r);
                    this.depth--
                }
                t += "<e><k>" + n + "</k><v>" + r + "</v></e>"
            } catch (s) {
                if (xajaxDebug) this.DebugMessage(s.name + ": " + s.message)
            }
        }
        t += "</xjxobj>";
        return t
    };
    this._nodeToObject = function(e) {
        if (!e) return "";
        if (e.nodeName == "#cdata-section" || e.nodeName == "#text") {
            var t = "";
            for (var n = 0; n < e.parentNode.childNodes.length; n++) {
                t += e.parentNode.childNodes[n].data
            }
            return t
        } else if (e.nodeName == "xjxobj") {
            var t = new Array;
            for (var n = 0; n < e.childNodes.length; n++) {
                var r = e.childNodes[n];
                var i;
                var s;
                if (r.nodeName == "e") {
                    for (var o = 0; o < r.childNodes.length; o++) {
                        if (r.childNodes[o].nodeName == "k") {
                            i = r.childNodes[o].firstChild.data
                        } else if (r.childNodes[o].nodeName == "v") {
                            s = this._nodeToObject(r.childNodes[o].firstChild)
                        }
                    }
                    if (i != null && s != null) {
                        t[i] = s;
                        i = s = null
                    }
                }
            }
            return t
        }
    };
    this.loadingFunction = function() {};
    this.doneLoadingFunction = function() {};
    var loadingTimeout;
    this.call = function(e, t, n) {
        var r, i, s;
        if (document.body && xajaxWaitCursor) document.body.style.cursor = "wait";
        if (xajaxStatusMessages == true) window.status = "Sending Request...";
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout("xajax.loadingFunction();", 400);
        if (xajaxDebug) this.DebugMessage("Starting xajax...");
        if (n == null) {
            var o = xajaxDefinedPost
        } else {
            var o = n
        }
        var u = xajaxRequestUri;
        var a;
        switch (o) {
            case xajaxDefinedGet:
                {
                    var f = u.indexOf("?") == -1 ? "?xajax=" + encodeURIComponent(e) : "&xajax=" + encodeURIComponent(e);
                    if (t) {
                        for (r = 0; r < t.length; r++) {
                            a = t[r];
                            if (typeof a == "object") a = this.objectToXML(a);
                            f += "&xajaxargs[]=" + encodeURIComponent(a)
                        }
                    }
                    f += "&xajaxr=" + (new Date).getTime();
                    u += f;
                    s = null
                }
                break;
            case xajaxDefinedPost:
                {
                    s = "xajax=" + encodeURIComponent(e);
                    s += "&xajaxr=" + (new Date).getTime();
                    if (t) {
                        for (r = 0; r < t.length; r++) {
                            a = t[r];
                            if (typeof a == "object") a = this.objectToXML(a);
                            s = s + "&xajaxargs[]=" + encodeURIComponent(a)
                        }
                    }
                }
                break;
            default:
                alert("Illegal request type: " + o);
                return false;
                break
        }
        i = this.getRequestObject();
        if (!i) return false;
        i.open(o == xajaxDefinedGet ? "GET" : "POST", u, true);
        if (o == xajaxDefinedPost) {
            try {
                i.setRequestHeader("Method", "POST " + u + " HTTP/1.1");
                i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            } catch (l) {
                alert("Your browser does not appear to support asynchronous requests using POST.");
                return false
            }
        }
        i.onreadystatechange = function() {
            if (i.readyState != 4) return;
            if (i.status == 200) {
                if (xajaxDebug) xajax.DebugMessage("Received:\n" + i.responseText);
                if (i.responseXML && i.responseXML.documentElement) xajax.processResponse(i.responseXML);
                else {
                    var e = "Error: Your Session is timed out!";
                    trimmedResponseText = i.responseText.replace(/^\s+/g, "");
                    trimmedResponseText = trimmedResponseText.replace(/\s+$/g, "");
                    if (trimmedResponseText != i.responseText) alert(e);
                    window.location.href = "/";
                    document.body.style.cursor = "default";
                    if (xajaxStatusMessages == true) window.status = "Error: Your Session is timed out!"
                }
            } else {
                if (xajax.arrayContainsValue(xajax.responseErrorsForAlert, i.status)) {
                    var e = "Error: the server returned the following HTTP status: " + i.status;
                    e += "\nReceived:\n" + i.responseText;
                    alert(e)
                }
                document.body.style.cursor = "default";
                if (xajaxStatusMessages == true) window.status = "Invalid XML response error"
            }
            delete i;
            i = null
        };
        if (xajaxDebug) this.DebugMessage("Calling " + e + " uri=" + u + " (post:" + s + ")");
        i.send(s);
        if (xajaxStatusMessages == true) window.status = "Waiting for data...";
        delete i;
        return true
    };
    this.getBrowserHTML = function(e) {
        tmpXajax = this.$(this.workId);
        if (!tmpXajax) {
            tmpXajax = document.createElement("div");
            tmpXajax.setAttribute("id", this.workId);
            tmpXajax.style.display = "none";
            tmpXajax.style.visibility = "hidden";
            document.body.appendChild(tmpXajax)
        }
        tmpXajax.innerHTML = e;
        var t = tmpXajax.innerHTML;
        tmpXajax.innerHTML = "";
        return t
    };
    this.willChange = function(element, attribute, newData) {
        if (!document.body) {
            return true
        }
        if (attribute == "innerHTML") {
            newData = this.getBrowserHTML(newData)
        }
        elementObject = this.$(element);
        if (elementObject) {
            var oldData;
            eval("oldData=this.$('" + element + "')." + attribute);
            if (newData !== oldData) return true
        }
        return false
    };
    this.viewSource = function() {
        return "<html>" + document.getElementsByTagName("HTML")[0].innerHTML + "</html>"
    };
    this.processResponse = function(xml) {
        clearTimeout(loadingTimeout);
        this.doneLoadingFunction();
        if (xajaxStatusMessages == true) window.status = "Processing...";
        var tmpXajax = null;
        xml = xml.documentElement;
        if (xml == null) return;
        var skipCommands = 0;
        for (var i = 0; i < xml.childNodes.length; i++) {
            if (skipCommands > 0) {
                skipCommands--;
                continue
            }
            if (xml.childNodes[i].nodeName == "cmd") {
                var cmd;
                var id;
                var property;
                var data;
                var search;
                var type;
                var before;
                var objElement = null;
                for (var j = 0; j < xml.childNodes[i].attributes.length; j++) {
                    if (xml.childNodes[i].attributes[j].name == "n") {
                        cmd = xml.childNodes[i].attributes[j].value
                    } else if (xml.childNodes[i].attributes[j].name == "t") {
                        id = xml.childNodes[i].attributes[j].value
                    } else if (xml.childNodes[i].attributes[j].name == "p") {
                        property = xml.childNodes[i].attributes[j].value
                    } else if (xml.childNodes[i].attributes[j].name == "c") {
                        type = xml.childNodes[i].attributes[j].value
                    }
                }
                if (xml.childNodes[i].childNodes.length > 1 && (xml.childNodes[i].firstChild.nodeName == "#cdata-section" || xml.childNodes[i].firstChild.nodeName == "#text")) {
                    data = "";
                    for (var j = 0; j < xml.childNodes[i].childNodes.length; j++) {
                        data += xml.childNodes[i].childNodes[j].data
                    }
                } else if (xml.childNodes[i].firstChild && xml.childNodes[i].firstChild.nodeName == "xjxobj") {
                    data = this._nodeToObject(xml.childNodes[i].firstChild);
                    objElement = "XJX_SKIP"
                } else if (xml.childNodes[i].childNodes.length > 1) {
                    for (var j = 0; j < xml.childNodes[i].childNodes.length; j++) {
                        if (xml.childNodes[i].childNodes[j].childNodes.length > 1 && (xml.childNodes[i].childNodes[j].firstChild.nodeName == "#cdata-section" || xml.childNodes[i].childNodes[j].firstChild.nodeName == "#text")) {
                            var internalData = "";
                            for (var k = 0; k < xml.childNodes[i].childNodes[j].childNodes.length; k++) {
                                internalData += xml.childNodes[i].childNodes[j].childNodes[k].nodeValue
                            }
                        } else {
                            var internalData = xml.childNodes[i].childNodes[j].firstChild.nodeValue
                        }
                        if (xml.childNodes[i].childNodes[j].nodeName == "s") {
                            search = internalData
                        }
                        if (xml.childNodes[i].childNodes[j].nodeName == "r") {
                            data = internalData
                        }
                    }
                } else if (xml.childNodes[i].firstChild) data = xml.childNodes[i].firstChild.nodeValue;
                else data = "";
                if (objElement != "XJX_SKIP") objElement = this.$(id);
                var cmdFullname;
                try {
                    if (cmd == "cc") {
                        cmdFullname = "addConfirmCommands";
                        var confirmResult = confirm(data);
                        if (!confirmResult) {
                            skipCommands = id
                        }
                    }
                    if (cmd == "al") {
                        cmdFullname = "addAlert";
                        alert(data)
                    } else if (cmd == "js") {
                        cmdFullname = "addScript/addRedirect";
                        eval(data)
                    } else if (cmd == "jc") {
                        cmdFullname = "addScriptCall";
                        var scr = id + "(";
                        if (data[0] != null) {
                            scr += "data[0]";
                            for (var l = 1; l < data.length; l++) {
                                scr += ",data[" + l + "]"
                            }
                        }
                        scr += ");";
                        eval(scr)
                    } else if (cmd == "in") {
                        cmdFullname = "addIncludeScript";
                        this.include(data)
                    } else if (cmd == "as") {
                        cmdFullname = "addAssign/addClear";
                        if (this.willChange(id, property, data)) {
                            eval("objElement." + property + "=data;")
                        }
                    } else if (cmd == "ap") {
                        cmdFullname = "addAppend";
                        eval("objElement." + property + "+=data;")
                    } else if (cmd == "pp") {
                        cmdFullname = "addPrepend";
                        eval("objElement." + property + "=data+objElement." + property)
                    } else if (cmd == "rp") {
                        cmdFullname = "addReplace";
                        this.replace(id, property, search, data)
                    } else if (cmd == "rm") {
                        cmdFullname = "addRemove";
                        this.remove(id)
                    } else if (cmd == "ce") {
                        cmdFullname = "addCreate";
                        this.create(id, data, property)
                    } else if (cmd == "ie") {
                        cmdFullname = "addInsert";
                        this.insert(id, data, property)
                    } else if (cmd == "ia") {
                        cmdFullname = "addInsertAfter";
                        this.insertAfter(id, data, property)
                    } else if (cmd == "ci") {
                        cmdFullname = "addCreateInput";
                        this.createInput(id, type, data, property)
                    } else if (cmd == "ii") {
                        cmdFullname = "addInsertInput";
                        this.insertInput(id, type, data, property)
                    } else if (cmd == "iia") {
                        cmdFullname = "addInsertInputAfter";
                        this.insertInputAfter(id, type, data, property)
                    } else if (cmd == "ev") {
                        cmdFullname = "addEvent";
                        property = this.addOnPrefix(property);
                        eval("this.$('" + id + "')." + property + "= function(){" + data + ";}")
                    } else if (cmd == "ah") {
                        cmdFullname = "addHandler";
                        this.addHandler(id, property, data)
                    } else if (cmd == "rh") {
                        cmdFullname = "addRemoveHandler";
                        this.removeHandler(id, property, data)
                    }
                } catch (e) {
                    if (xajaxDebug) alert("While trying to '" + cmdFullname + "' (command number " + i + "), the following error occured:\n" + e.name + ": " + e.message + "\n" + (id && !objElement ? "Object with id='" + id + "' wasn't found.\n" : ""))
                }
                delete objElement;
                delete cmd;
                delete cmdFullname;
                delete id;
                delete property;
                delete search;
                delete data;
                delete type;
                delete before;
                delete internalData;
                delete j;
                delete k
            }
        }
        delete xml;
        delete i;
        document.body.style.cursor = "default";
        if (xajaxStatusMessages == true) window.status = "Done"
    }
}
var xajax = new Xajax;
xajaxLoaded = true
