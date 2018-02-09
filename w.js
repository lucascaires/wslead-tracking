if(!window.JSON){window.JSON={parse:function(sJSON){return eval("("+sJSON+")")},stringify:function(){var toString=Object.prototype.toString;var hasOwnProperty=Object.prototype.hasOwnProperty;var isArray=Array.isArray||function(a){return toString.call(a)==="[object Array]"};var escMap={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};var escFunc=function(m){return escMap[m]||"\\u"+(m.charCodeAt(0)+65536).toString(16).substr(1)};var escRE=/[\\"\u0000-\u001F\u2028\u2029]/g;return function stringify(value){if(value==null){return"null"}else if(typeof value==="number"){return isFinite(value)?value.toString():"null"}else if(typeof value==="boolean"){return value.toString()}else if(typeof value==="object"){if(typeof value.toJSON==="function"){return stringify(value.toJSON())}else if(isArray(value)){var res="[";for(var i=0;i<value.length;i++)res+=(i?", ":"")+stringify(value[i]);return res+"]"}else if(toString.call(value)==="[object Object]"){var tmp=[];for(var k in value){if(hasOwnProperty.call(value,k))tmp.push(stringify(k)+": "+stringify(value[k]))}return"{"+tmp.join(", ")+"}"}}return'"'+value.toString().replace(escRE,escFunc)+'"'}}()}}if(!document.querySelector){document.querySelector=function(selectors){var elements=document.querySelectorAll(selectors);return elements.length?elements[0]:null}}if(!document.querySelectorAll){document.querySelectorAll=function(selectors){var style=document.createElement("style"),elements=[],element;document.documentElement.firstChild.appendChild(style);document._qsa=[];style.styleSheet.cssText=selectors+"{x-qsa:expression(document._qsa && document._qsa.push(this))}";window.scrollBy(0,0);style.parentNode.removeChild(style);while(document._qsa.length){element=document._qsa.shift();element.style.removeAttribute("x-qsa");elements.push(element)}document._qsa=null;return elements}}function Xhr(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}return null}(function(){if(!localStorage.getItem("wslead-track")){var obj={path:window.document.referrer,useragent:window.navigator.userAgent};localStorage.setItem("wslead-track",JSON.stringify(obj))}})();function WSLead(formId,data){this._apiPath="https://wslead.dev/api/v2/leads";this._formId=formId;this._rawData=data;this.post(function(res){console.log(res)})}WSLead.prototype.sanitize=function(obj){var e={extra:{}};for(key in obj){if(document.querySelectorAll(obj[key]).length){var a="string"===typeof obj[key]?document.querySelector(obj[key]).value:obj[key].value;if("name"==key||"email"==key||"phone"==key){e[key]=a}else{e.extra[key]=a}}}return e};WSLead.prototype.extrafy=function(obj){var a=[],c;for(c in obj){var d={};d.key=c;d.value=obj[c];a.push(d)}return JSON.stringify(a)};WSLead.prototype.jsonfy=function(data){var obj=this.sanitize(data);obj.formId=this._formId;obj.extra&&(obj.extra=this.extrafy(obj.extra));obj.references=localStorage.getItem("wslead-track");return JSON.stringify(obj)};WSLead.prototype.post=function(callback){var xhr=new Xhr;xhr.open("POST",this._apiPath,true);xhr.onreadystatechange=function(){if(xhr.readyState===4){callback(xhr);return true}};xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");xhr.send(this.jsonfy(this._rawData))};