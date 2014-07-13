define(function(require, exports, module) {
    var _ = require('underscore');
    
    var mount = "dj";
    var urlpatterns = {"home": [{"pattern": "/en-us/", "kwargs": {}, "app": ""}, {"pattern": "/homefx/", "kwargs": {}, "app": "homefx"}, {"pattern": "/quickstartfx/home/", "kwargs": {}, "app": "quickstartfx"}, {"pattern": "/splunk_app_windows_infrastructure/home/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "login": [{"pattern": "/en-us/accounts/login/", "kwargs": {}, "app": ""}, {"pattern": "/quickstartfx/login/", "kwargs": {"template_name": "quickstartfx:login.html"}, "app": "quickstartfx"}], "logout": [{"pattern": "/en-us/accounts/logout/", "kwargs": {}, "app": ""}, {"pattern": "/homefx/logout/", "kwargs": {}, "app": "homefx"}], "page_config": [{"pattern": "/en-us/page_config/", "kwargs": {}, "app": ""}], "redirector": [{"pattern": "/en-us/redirector/<app>/<view>/", "kwargs": {}, "app": ""}], "flashtimeline": [{"pattern": "/homefx/flashtimeline/", "kwargs": {}, "app": "homefx"}, {"pattern": "/quickstartfx/flashtimeline/", "kwargs": {}, "app": "quickstartfx"}, {"pattern": "/splunk_app_windows_infrastructure/flashtimeline/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "search": [{"pattern": "/homefx/search/", "kwargs": {}, "app": "homefx"}, {"pattern": "/quickstartfx/search/", "kwargs": {}, "app": "quickstartfx"}, {"pattern": "/splunk_app_windows_infrastructure/search/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "template_render": [{"pattern": "/homefx/<template_name>/", "kwargs": {}, "app": "homefx"}, {"pattern": "/quickstartfx/<template_name>/", "kwargs": {}, "app": "quickstartfx"}, {"pattern": "/splunk_app_windows_infrastructure/<template_name>/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "credentials": [{"pattern": "/quickstartfx/steps/credentials/", "kwargs": {"template_name": "quickstartfx:credentials.html"}, "app": "quickstartfx"}], "steps": [{"pattern": "/quickstartfx/steps/<id>/", "kwargs": {}, "app": "quickstartfx"}], "setup": [{"pattern": "/splunk_app_windows_infrastructure/setup/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "windowssetup": [{"pattern": "/splunk_app_windows_infrastructure/windows/setup/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "unconfigure": [{"pattern": "/splunk_app_windows_infrastructure/unconfigure/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "set_last_nav_rev": [{"pattern": "/splunk_app_windows_infrastructure/set_last_nav_rev/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "get_nav_needs_breaking": [{"pattern": "/splunk_app_windows_infrastructure/get_nav_needs_breaking/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "get_license_status": [{"pattern": "/splunk_app_windows_infrastructure/get_license_status/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "post_lm_config": [{"pattern": "/splunk_app_windows_infrastructure/post_lm_config/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "palletes": [{"pattern": "/splunk_app_windows_infrastructure/palette/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "pallete": [{"pattern": "/splunk_app_windows_infrastructure/palette/<palette>/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "ad": [{"pattern": "/splunk_app_windows_infrastructure/ad/<tmpl>/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "windows": [{"pattern": "/splunk_app_windows_infrastructure/windows/<tmpl>/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}], "tmpl_render": [{"pattern": "/splunk_app_windows_infrastructure/<tmpl>/", "kwargs": {}, "app": "splunk_app_windows_infrastructure"}]};
    
    var reverse = function(name, app, args) {
        if (!args && _.isObject(app)) {
            args = app;
            app = '';
        }
        
        if (!name) {
            throw new Error("Must provide a name for path reverse.");
        }
      
        if (name.indexOf(":") > -1 && !app) {
            var parts = name.split(":");
            name = parts[1];
            app = parts[0];  
        }
        
        if (!name) {
            throw new Error("Must provide a name for path reverse.");
        }
        
        if (!urlpatterns.hasOwnProperty(name)) {
            throw new Error("No URL path with name '" + name + "' exists.");
        }
        
        var pattern = null;
        var patterns = urlpatterns[name];
        
        // If there is only one pattern and the user
        // didn't specify an app, return the first one
        if (patterns.length === 1 && !app) {
            pattern = patterns[0];
        }
        else {
            for(var i = 0; i < patterns.length; i++) {
                if (patterns[i].app === app) {
                    pattern = patterns[i];
                }
            }
        }
        
        if (!pattern) {
            throw new Error("No URL path with name '" + name + "' in app '" + app + "' exists.");
        }
        
        var path = "/" + mount + pattern.pattern;
        args = _.extend(_.clone(pattern.kwargs), args);
        _.each(args, function(value, key) {
            if (!path.match("<" + key + ">")) {
                throw new Error("Key '" + key + "' does not exist in path: '" + path + "'");
            }
            
            path = path.replace("<" + key + ">", value);
        });
        
        var re = new RegExp("<[a-zA-Z0-9-_]{1,}>", "g");
        var missingArgs = path.match(re);
        if (missingArgs) {
            throw("Missing arguments (" + missingArgs.join(", ") + ") for path '" + path + "'");
        }
        
        return path;
    };
    
    return {
        reverse: reverse
    };
});