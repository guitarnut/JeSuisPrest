var STARZ=STARZ||{},UTIL=UTIL||{},UI=UI||{};!function(){for(var a=["overlays/frame_lightText_40.png","overlays/frame_lightText_65.png","overlays/frame_lightText_90.png","overlays/frame_darkText_40.png","overlays/frame_darkText_65.png","overlays/frame_darkText_90.png"],b=0;b<a.length;b++){var c=new Image;c.src=a[b]}}(),function(){UTIL.getPath=function(){for(var a=window.location.pathname.split("/"),b="",c=0;c<a.length-1;c++)b+=a[c]+"/";return window.location.protocol+"//"+window.location.host+b}}(),function(){UI.StepNav=function(){function a(a){d=$(a),a=a.replace("#",""),e=document.getElementById(a),f=d.find("[ui-stepwrapper]:eq(0)"),f.css("left","0"),window.onresize=function(){b("ui-step")},b("ui-step"),$("[ui-step]").each(function(){var a=$(this);a.find("[ui-next]:eq(0)").click(function(){c(-1)}),a.find("[ui-prev]:eq(0)").click(function(){c(1)}),g.push(a)}),h=g.length,i=1}function b(a){j=d.width(),k=d.height(),$("["+a+"]").css({width:j+"px",height:k+"px"})}function c(a){i-=a;var b=a*j,c=f.css("left");c=Number(c.replace("px","")),c+=b,new TweenLite(f,.5,{left:c+"px",ease:Quad.easeInOut})}var d,e,f,g=[],h=0,i=0,j=0,k=0;return{init:a}}()}(),function(){STARZ.ValidateForm=function(){function a(){i=i||$("#errors"),j=j||$("#imgForm"),k=k||$("#img_upload"),l=l||$("#img_upload_submit"),m=m||$("#loading"),h=h||$("#pseudo_upload"),-1!=navigator.appName.indexOf("Internet Explorer")&&(q=navigator.appVersion.indexOf("MSIE 9")>-1||navigator.appVersion.indexOf("MSIE 10")>-1),q?h.parent("p").hide():(k.css("display","none"),l.css("display","none")),q||k.bind("change",function(){n=this.files[0].size,l.click()}),q?j.on("submit",function(){return m.fadeTo("fast",p),!0}):j.on("submit",function(a){return m.fadeTo("fast",p),f=[],g=k.val(),b()?!0:(a.preventDefault(),void c())})}function b(){var a=!0;return d(g)||(f.push("<p>You must select a JPEG file.</p>"),a=!1),n>o&&(f.push("<p>Your image must be 3MB or smaller</p>"),a=!1),a}function c(){if((g=null)||f.length>0){for(var a=0;a<f.length;a++)$(f[a]).appendTo(i);STARZ.CustomElements.screenOne(),m.fadeTo("fast",0,function(){m.hide()})}}function d(a){return a=a.toLowerCase(),/\.(jpg|jpeg)$/i.test(a)}function e(){i.empty()}var f,g,h,i,j,k,l,m,n=0,o=35e5,p=.7,q=!1;return{init:a,clearErrors:e}}()}(),function(){STARZ.PhotoEditor=function(){function a(){b(),q.addEventListener("navEvent",c),w.hide(),v.click(function(){o.show(),F=!1,A=window.innerWidth<=450?1.333333:1;var a=o.offset(),b=x.offset(),c={left:Math.round(a.left*A)-Math.round(b.left*A),top:Math.round(a.top*A)-Math.round(b.top*A),width:Math.round(o.width()*A),height:Math.round(o.height()*A)};C*=A,location.href="index.php?edit_image=true&crop_l="+c.left+"&crop_t="+c.top+"&crop_w="+c.width+"&crop_h="+c.height+"&scale="+C+"&template="+D}),e(),f(),i(),k(),l(),d(),o.hide(),F=!0}function b(){n=$("#imageFrame"),p=$("#photoEditorContainer"),o=$("#frameContainer"),r=$("#scaleUp"),s=$("#scaleDown"),u=$("[data-text]"),t=$("[data-opacity]"),v=p.find(".save"),w=p.find(".confirm"),q=document.getElementById("photoUIWrapper")}function c(a){switch(a.detail){case 1:F=!0,o.fadeTo("fast",0,function(){o.hide()});break;case 2:F=!1,o.fadeTo("fast",1);break;case 3:break;case 4:}}function d(){y.onload=function(){var a,b;a=x.width()<o.width()?(o.width()-x.width())/2:-1*(x.width()-o.width())/2,b=x.height()<o.height()?(o.height()-x.height())/2:-1*(x.height()-o.height())/2,x.css({left:a+"px",top:b+"px"})}}function e(){u.each(function(){var a=$(this),b=a.attr("data-text");a.addClass(b),a.click(function(){h(b)})})}function f(){t.each(function(){var a=$(this),b=Number(a.attr("data-opacity"));a.click(function(){-1===b?D-=G:D+=G,D>H?D-=G:1>D?D+=G:(t.css("opacity","1"),h(String(D)),g(a))})})}function g(a){(D===H||D===H-1)&&a.css("opacity","0.5"),(1===D||2===D)&&a.css("opacity","0.5")}function h(a){var b,c=n.attr("src");switch(a){case"1":D=1,b="overlays/frame_lightText_90.png";break;case"2":D=2,b="overlays/frame_darkText_90.png";break;case"3":D=3,b="overlays/frame_lightText_65.png";break;case"4":D=4,b="overlays/frame_darkText_65.png";break;case"5":D=5,b="overlays/frame_lightText_40.png";break;case"6":D=6,b="overlays/frame_darkText_40.png"}b!=c?n.fadeTo("fast",0,function(){o.show(),n.attr("src",b),n.fadeTo("fast",1)}):o.show()}function i(){r.click(function(){1>C?(C+=E,j(C),TweenLite.to(s,.5,{alpha:1})):TweenLite.to(r,.5,{alpha:B})}),s.click(function(){C>.2?(C-=E,j(C),TweenLite.to(r,.5,{alpha:1})):TweenLite.to(s,.5,{alpha:B})}),TweenLite.to(r,.5,{alpha:B})}function j(a){TweenLite.to(x,.25,{scaleX:a,scaleY:a})}function k(){z=x.css("z-index"),Draggable.create(x,{type:"x,y",onDragEnd:function(){x.css("z-index",z)}}),$("#dragToggle").on("click",function(){F=!F,F?o.hide():o.show()})}function l(){var a,b,c=x.attr("width"),d=x.attr("height"),e=o.width(),f=o.height();a=d>f?-1*(d-f)/2:(f-d)/2,b=c>e?-1*(c-e)/2:(e-c)/2,x.css({position:"absolute",left:b+"px",top:a+"px"})}function m(){var b=$("[data-image]").attr("data-image");$("#userImage").attr("src",b),x=$("#imgContainer").children("img"),y=document.getElementById("imgContainer").children[0],a()}var n,o,p,q,r,s,t,u,v,w,x,y,z,A=1.33,B=.5,C=1,D=3,E=.1,F=!1,G=2,H=6;return{setImage:m}}()}(),function(){STARZ.CustomElements=function(){function a(){l.css({height:window.innerHeight+"px"})}function b(){e=e||$("#img_upload"),f=f||$("#img_upload_submit"),g=g||$("#pseudo_upload"),l=l||$("#loading"),a(),g.show(),g.fadeTo("fast",1),g.unbind("click"),g.click(function(){STARZ.ValidateForm.clearErrors(),e.click()})}function c(){j=j||$("#moveIcon"),k=k||$("#userImage"),h=h||$("#img_save"),i=i||$("#pseudo_save"),i.unbind("click"),l=l||$("#loading"),a(),l.fadeTo("fast",n),k.load(function(){j.fadeTo("fast",1),l.fadeTo("fast",0,function(){l.hide()}),setTimeout(function(){var a=k.position();k.animate({left:a.left-50+"px",top:a.left-50+"px"},1e3).animate({left:a.left+"px",top:a.top+"px"},1e3);var b=j.position();j.animate({left:b.left-50+"px",top:b.left-50+"px"},1e3).animate({left:b.left+"px",top:b.top+"px"},1e3,function(){j.fadeTo("show",0,function(){$(this).hide()})})},1e3)}),i.click(function(){h.click()})}function d(){l=l||$("#loading"),m=m||$("#createNew"),m.click(function(){window.open(UTIL.getPath()+"index.php?new=true","_parent")})}var e,f,g,h,i,j,k,l,m,n=.8;return window.onresize=function(){a()},{screenOne:b,screenTwo:c,screenThree:d}}()}(),window.fbAsyncInit=function(){FB.init({appId:"680281595342201",xfbml:!0,version:"v2.0"})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk"),function(){STARZ.Social=function(){function a(){null===f&&b()}function b(){f=document.getElementById("shareFB"),f.onclick=function(){c()},e=document.getElementById("shareTW"),e.onclick=function(){d()}}function c(){FB.ui({method:g.method,name:g.name,caption:g.caption,description:g.description,picture:STARZ_img})}function d(){var a=e.getAttribute("data-image");window.open("https://twitter.com/intent/tweet?url="+UTIL.getPath()+a+"&text="+encodeURIComponent(h.text+" "+h.hashtags))}var e,f=null,g={method:"feed",name:"Je Suis Prest",caption:"I am ready!",description:"Show the world you're ready: http://stage.outlandercommunity.com/photo/",link:"http://stage.outlandercommunity.com/photo"},h={text:"I am ready",hashtags:"#Outlander, #JeSuisPrest"};return{init:a}}()}(),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-51853607-2","starz.com"),ga("send","pageview");