/* Facebook SDK */
window.fbAsyncInit = function() {
    FB.init({
        appId      : '680281595342201',
        xfbml      : true,
        version    : 'v2.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* Handles Twitter and Facebook share dialogues */

(function () {

    STARZ.Social = function () {

        var facebook = null,
            twitter;

        var fb = {
            'method': 'feed',
            'name': 'Je Suis Prest',
            'caption': 'I am ready!',
            'description': 'Show the world you\'re ready: http://stage.outlandercommunity.com/photo/',
            'link': 'http://stage.outlandercommunity.com/photo'
        };

        var tw = {
            'text': 'I am ready',
            'hashtags': '#Outlander, #JeSuisPrest'
        };

        function init() {
            if (facebook === null) {
                setupButtons();
            }
        }

        function setupButtons() {
            facebook = document.getElementById("shareFB");
            facebook.onclick = function () {
                shareFB();
            };

            twitter = document.getElementById("shareTW");
            twitter.onclick = function() {
                shareTW();
            }
        }

        function shareFB() {
            FB.ui({
                method: fb.method,
                name: fb.name,
                caption: fb.caption,
                description: (fb.description),
                picture: STARZ_img
            })
        }

        function shareTW() {
            //PHP value appended to HTML element
            var img = twitter.getAttribute("data-image");
            window.open('https://twitter.com/intent/tweet?url='+UTIL.getPath()+img+'&text=' + encodeURIComponent(tw.text+' '+tw.hashtags));
        }

        return {
            init: init
        }

    }();

})();

