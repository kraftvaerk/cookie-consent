# What is Cookie Consent?
Cookie Consent is a lightweight JavaScript plugin for alerting users about the use of cookies on your website.
It is designed to help you comply with the hideous EU Cookie Law.

## Installation
```
npm install kv.cookie-consent
```

## Usage
```javascript
import CookieConsent from 'kv.cookieconsent';

const cookieConsent = new CookieConsent({
    cookieName: 'cookieConsent',
    btn: {
        accept: 'js-cookie-accept',
        close: 'js-cookie-close'
    }
    toggleClass: 'is-shown'
});

cookieConsent.onCheck(){}
cookieConsent.onAccept(){}
cookieConsent.onShow(){}
cookieConsent.onHide(){}

cookieConsent.init('#cookieContent');
```

## Version 1.0.0
Version 1.0.0 is a complete rewrite. The most substantial new features are:

- no jQuery dependency 
- callback hooks for showing/accepting/revoking the banner
- easy no-fuss styling
