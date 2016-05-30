/*!
* jQuery cookie consent plugin
* Original author: @mi2oon
* Further changes, comments: @mi2oon
* Licensed under the MIT license
*/

!function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function($) {
    'use strict';

    var pluginName = 'cookieConsent',
        defaults = {
            cookieName: 'cookieConsent',
            btn: {
                accept: '.accept',
                decline: '.decline',
                close: '.close'
            },
            transition: {
                show: {
                    type: 'fadeIn',
                    duration: 800
                },
                hide: {
                    type: 'fadeOut',
                    duration: 800
                }
            },
            consentType: 'explicit', // implied
            onAccepted: function(elm){},
            onDeclined: function(elm){},
            onShow: function(elm){},
            onHide: function(elm){},
            onCheck: function(){}
        },
        cookie = {
            get: function(){
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1, c.length);
                    if (c.indexOf(defaults.cookieName) === 0){
                        return c.substring(defaults.cookieName.length + 1,c.length);
                    }
                }
                return null;
            },
            set: function(value){
                var date = new Date();
                date.setTime(date.getTime()+315532800000);
                document.cookie = defaults.cookieName+"="+value+"; expires="+date.toGMTString()+"; path=/";
            }
       };

    // Constructor, initialise everything you need here
    var Plugin = function(element, options) {
        this.element = element;
        this.options = options;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

    // Plugin methods and shared properties
    Plugin.prototype = {
        // Reset constructor - http://goo.gl/EcWdiy
        constructor: Plugin,

        init: function() {
            var elm = $(this.element),
                opt = this.options,
                status = cookie.get();

            elm.on('click', 'a', function(e){

                if($(this).is(opt.btn.close)){
                    e.preventDefault();
                    elm[opt.transition.hide.type](opt.transition.hide.duration);

                    if(opt.consentType === 'implied'){
                        cookie.set('allowed');
                        opt.onAccepted.call(this, elm);
                    }
                }

                if($(this).is(opt.btn.accept)){
                    e.preventDefault();
                    cookie.set('allowed');

                    opt.onAccepted.call(this, elm);

                    elm[opt.transition.hide.type](opt.transition.hide.duration, function(){
                        opt.onHide.call(this, elm);
                    });
                }

                if($(this).is(opt.btn.decline)){
                    e.preventDefault();
                    cookie.set('disallowed');

                    opt.onDeclined.call(this, elm);

                    elm[opt.transition.hide.type](opt.transition.hide.duration, function(){
                        opt.onHide.call(this, elm);
                    });
                }
            });

            opt.onCheck.call(elm, status);
            if (status === null){
                elm[opt.transition.show.type](opt.transition.show.duration, function(){
                        opt.onShow.call(this, elm);
                });
            }
        }
    }

    // Create the jQuery plugin
    $.fn[pluginName] = function(options) {
        // Do a deep copy of the options - http://goo.gl/gOSSrg
        options = $.extend(true, {}, defaults, options);

        return this.each(function() {
            var $this = $(this);
            // Create a new instance for each element in the matched jQuery set
            // Also save the instance so it can be accessed later to use methods/properties etc
            // e.g.
            //    var instance = $('.element').data('plugin');
            //    instance.someMethod();
            $this.data('plugin_' + pluginName, new Plugin($this, options));
        });
    };

    // Expose defaults and Constructor (allowing overriding of prototype methods for example)
    $.fn[pluginName].defaults = defaults;
    $.fn[pluginName].Plugin = Plugin;
});
