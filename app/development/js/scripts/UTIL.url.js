/* Returns the current url, minus the html document and parameters */
(function() {

    UTIL.getPath = function() {
        var path = window.location.pathname.split('/');
        var newPath = '';

        for(var i = 0; i < path.length -1; i++) {
            newPath += path[i] + '/';
        }

        return window.location.protocol + '//' + window.location.host + newPath;
    };

})();