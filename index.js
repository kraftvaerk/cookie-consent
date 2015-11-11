/*!
* jQuery cookie consent plugin
* Original author: @mi2oon
* Further changes, comments: @mi2oon
* Licensed under the MIT license
*/

(function ( $, window, document, undefined ) {
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
	// The plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function () {
		var elm = $(this.element),
			opt = this.options;

		elm.on('click', 'a', function(e){
			if($(this).is(opt.btn.close)){
				elm[opt.transition.hide.type](opt.transition.hide.duration);

				if(opt.consentType === 'implied'){
					cookie.set('allowed');
					opt.onAccepted.call(this, elm);
				}
				e.preventDefault();
			}

			if($(this).is(opt.btn.accept)){
				cookie.set('allowed');
				opt.onAccepted.call(this, elm);
				elm[opt.transition.hide.type](opt.transition.hide.duration, function(){
					opt.onHide.call(this, elm);
				});
				e.preventDefault();
			}

			if($(this).is(opt.btn.decline)){
				cookie.set('disallowed');
				opt.onDeclined.call(this, elm);
				elm[opt.transition.hide.type](opt.transition.hide.duration, function(){
					opt.onHide.call(this, elm);
				});
				e.preventDefault();
			}
		});

		var status = cookie.get();
		opt.onCheck.call(elm, status);
		if (status === null){
			elm[opt.transition.show.type](opt.transition.show.duration, function(){
					opt.onShow.call(this, elm);
			});
		}
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Plugin( this, options ));
			}
		});
	};
})( jQuery, window, document );