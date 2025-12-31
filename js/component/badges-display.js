class BadgesDisplay extends HTMLElement {
    static observedAttributes = ["type"];

    constructor() {
        super();
    }

    connectedCallback() {

        let type = "learn";
        if (this.hasAttribute("type")) {
            type = this.getAttribute("type");
        }

        if (type == "main") {
            this.innerHTML = `
                <div class="blinkies-grid" > 
                    <img src="img/asset/redblink.gif" alt="blinkie" /> 
                    <img src="img/asset/redblink2.gif" alt="blinkie" /> 
                    <img src="img/asset/orangeblink.gif" alt="blinkie" /> 
                    <img src="img/asset/orangeblink2.gif" alt="blinkie" /> 
                    <img src="img/asset/yellowblink.gif" alt="blinkie" /> 
                    <img src="img/asset/yellowblink2.gif" alt="blinkie" /> 
                    <img src="img/asset/greenblink.gif" alt="blinkie" /> 
                    <img src="img/asset/greenblink2.gif" alt="blinkie" /> 
                    <img src="img/asset/blueblink.gif" alt="blinkie" /> 
                    <img src="img/asset/blueblink2.gif" alt="blinkie" /> 
                    <img src="img/asset/blueblink3.gif" alt="blinkie" /> 
                    <img src="img/asset/blueblink4.gif" alt="blinkie" /> 
                    <img src="img/asset/purpleblink.gif" alt="blinkie" /> 
                    <img src="img/asset/purpleblink2.gif" alt="blinkie" /> 
                </div >
            `;
        } else if (type == "extra") {
            this.innerHTML = `
                <div class="badges-container stamps">
                    <img src="img/asset/stamp1.png" />
                    <img src="img/asset/stamp26.gif" />
                    <img src="img/asset/stamp27.gif" />
                    <img src="img/asset/stamp22.png" />
                    <img src="img/asset/stamp10.gif" />
                    <img src="img/asset/stamp3.gif" />
                    <img src="img/asset/stamp11.gif" />
                    <img src="img/asset/stamp11.png" />
                    <img src="img/asset/stamp17.gif" />
                    <img src="img/asset/stamp20.png" />
                    <img src="img/asset/stamp23.png" />
                    <img src="img/asset/stamp24.png" />
                    <img src="img/asset/stamp19.png" />
                    <img src="img/asset/stamp12.png" />
                    <img src="img/asset/stamp13.png" />
                    <img src="img/asset/stamp14.gif" />
                    <img src="img/asset/stamp21.gif" />
                    <img src="img/asset/stamp18.png" />
                    <img src="img/asset/stamp25.png" />
                    <img src="img/asset/stamp4.gif" />
                    <img src="img/asset/stamp8.gif" />
                    <img src="img/asset/stamp9.gif" />
                    <img src="img/asset/stamp7.gif" />
                    <img src="img/asset/stamp16.gif" />
                    <img src="img/asset/stamp15.png" />
                    <img src="img/asset/stamp6.gif" />
                    <img src="img/asset/stamp5.gif" />

                    <iframe
                      src="https://incr.easrng.net/badge?key=stringpea"
                      title="increment badge"
                      width="99"
                      height="56"
                      frameborder="0">
                    </iframe>
                </div>
            `;
        }

    }

}

customElements.define('badges-display', BadgesDisplay);
