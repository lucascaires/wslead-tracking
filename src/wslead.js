//XMLHttpRequest
function Xhr(){
    try{return new XMLHttpRequest();}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP");}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}return null;
}

(function() {
    if(!localStorage.getItem('wslead-track')) {
        var obj = {
            originPath: window.document.referrer,
            initialPath: window.document.location.href,
            useragent: window.navigator.userAgent
        }
        localStorage.setItem('wslead-track', JSON.stringify(obj));   
    }    
})()

function WSLead(formId, data) {
    this._apiPath = 'https://wslead.wsiconsultores.com.br/api/v2/leads'
    this._formId = formId //ID of 
    this._rawData = data //Raw data with values and selectors
    this.post()
}

WSLead.prototype.sanitize = function(obj) {
    var e = {
        extra: {}
    }
    for (key in obj) {
        if (document.querySelectorAll(obj[key]).length) {
            var a = ("string" === typeof obj[key]) ? document.querySelector(obj[key]).value : obj[key].value;
            if("name" == key || "email" == key || "phone" == key) {
                e[key] = a
            } else {
                e.extra[key] = a
            }
        }
    }            
    return e
}

WSLead.prototype.extrafy = function(obj) {
    var a = [], c
    for (c in obj) {
        var d = {}
        d.key = c
        d.value = obj[c]
        a.push(d)
    }
    return JSON.stringify(a)
}

WSLead.prototype.jsonfy = function(data) {
    var obj = this.sanitize(data)
    obj.formId = this._formId
    obj.extra && (obj.extra = this.extrafy(obj.extra))
    obj.references = localStorage.getItem('wslead-track')
    return JSON.stringify(obj)
}

WSLead.prototype.post = function(callback) {
    var xhr = new Xhr()
    xhr.open("POST", this._apiPath, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr)
            return true;
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(this.jsonfy(this._rawData))
}
