export default class CookieConsent {
    constructor(options) {
        this.defaults = {
            cookieName: 'cookieConsent',
            btn: {
                accept: 'js-cookie-accept',
                close: 'js-cookie-close'
            },
            toggleClass: 'is-shown'
        }

        this.options = {...this.defaults, ...options};
    }
    init(element) {
        this.element = document.querySelector(element);

        if(!this.element) {
            throw (new Error('Cookie element required: not found'));
            return;
        }

        this._events();
        this.check();
    }
    _events() {
        this.element.addEventListener('click', (event) => {
            if(event.target.classList.contains(this.options.btn.accept)) {
                event.preventDefault();

                this._setStatus('allowed');
                this.onAccept(this, this.element);

                this.hide(event);
            }

            if(event.target.classList.contains(this.options.btn.close)) {
                event.preventDefault();

                this.hide(event);
            }

        }, false)
    }
    _getStatus(){
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1, c.length);
            if (c.indexOf(this.options.cookieName) === 0){
                return c.substring(this.options.cookieName.length + 1,c.length);
            }
        }

        return null;
    }
    _setStatus(value){
        var date = new Date();
        date.setTime(date.getTime()+315532800000);
        document.cookie = this.options.cookieName+"="+value+"; expires="+date.toGMTString()+"; path=/";
    }
    check() {
        const status = this._getStatus();

        this.onCheck(this.element, status);

        if (status === null){
            this.show();
        }
    }
    show() {
        this.element.classList.add(this.options.toggleClass);
        this.onShow(this, this.element);
    }

    hide(event) {
        this.element.classList.remove(this.options.toggleClass);
        this.onHide(event, this.element);
    }

    onCheck(){}
    onAccept(){}
    onShow(){}
    onHide(){}
}
