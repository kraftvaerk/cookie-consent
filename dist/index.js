"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.split");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CookieConsent =
/*#__PURE__*/
function () {
  function CookieConsent(options) {
    _classCallCheck(this, CookieConsent);

    this.defaults = {
      cookieName: 'cookieConsent',
      btn: {
        accept: 'js-cookie-accept',
        close: 'js-cookie-close'
      },
      toggleClass: 'is-shown'
    };
    this.options = _extends({}, this.defaults, options);
  }

  _createClass(CookieConsent, [{
    key: "init",
    value: function init(element) {
      this.element = document.querySelector(element);

      if (!this.element) {
        throw new Error('Cookie element required: not found');
        return;
      }

      this._events();

      this.check();
    }
  }, {
    key: "_events",
    value: function _events() {
      var _this = this;

      this.element.addEventListener('click', function (event) {
        if (event.target.classList.contains(_this.options.btn.accept)) {
          event.preventDefault();

          _this._setStatus('allowed');

          _this.onAccept(_this, _this.element);

          _this.hide(event);
        }

        if (event.target.classList.contains(_this.options.btn.close)) {
          event.preventDefault();

          _this.hide(event);
        }
      }, false);
    }
  }, {
    key: "_getStatus",
    value: function _getStatus() {
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(this.options.cookieName) === 0) {
          return c.substring(this.options.cookieName.length + 1, c.length);
        }
      }

      return null;
    }
  }, {
    key: "_setStatus",
    value: function _setStatus(value) {
      var date = new Date();
      date.setTime(date.getTime() + 315532800000);
      document.cookie = this.options.cookieName + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    }
  }, {
    key: "check",
    value: function check() {
      var status = this._getStatus();

      this.onCheck(this.element, status);

      if (status === null) {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.element.classList.add(this.options.toggleClass);
      this.onShow(this, this.element);
    }
  }, {
    key: "hide",
    value: function hide(event) {
      this.element.classList.remove(this.options.toggleClass);
      this.onHide(event, this.element);
    }
  }, {
    key: "onCheck",
    value: function onCheck() {}
  }, {
    key: "onAccept",
    value: function onAccept() {}
  }, {
    key: "onShow",
    value: function onShow() {}
  }, {
    key: "onHide",
    value: function onHide() {}
  }]);

  return CookieConsent;
}();

exports.default = CookieConsent;
