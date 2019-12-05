"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    this.options = _objectSpread({}, this.defaults, {}, options);
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
