// JavaScript Document
function GetQueryString() {
        if (document.location.search.length <= 1) {
                return null;
        }
        var result = new Object();
        var query = window.location.search.substring(1);
        var params = query.split("&");
		
        for (var i = 0; i < params.length; i++) {
                var keyval = params[i].split("=");
                result[keyval[0]] = keyval[1];
        }
		
        return result;
		
}
