# Tracking Code 2.0.1
Tracking code used for WSLead system


## Global Tracking V2
Paste the following code inside your <head></head>

```html
<script type="text/javascript">
;(function(w,s,i){
  a=w.createElement(s);a.async=1;a.src=i;w.head.appendChild(a);
})(document, 'script', '//wslead.wsiconsultores.com.br/tracking/v2/w.js');
</script>
```


## Meta Tracking
Change the form_id (99999) for the properly form ID and you also have to change the object data

```html
<script type="text/javascript">
;(function(){  
  new WSLead(99999999, {
    name : "input[name=name]",
    email : "input[name=email]",
    phone : "input[name=tel]",
    'Mensagem' : "textarea[name=message]"
  })
})();
</script>
```

## CF7 Helper
Paste the following code inside your CF7 Fields and put your meta tracking inside it

```html
<script type="text/javascript">
(function(){
    var ds = document.scripts; ds = ds[ds.length-1];
    var parent = ds.parentNode;    
    while(parent.tagName.toUpperCase() != "FORM") parent = parent.parentNode;    
    parent.addEventListener( 'submit', function(e) {       
        e.preventDefault()            
        
        <!-- Meta Tracking Here -->
  
    }, false );
})();
</script>
```


