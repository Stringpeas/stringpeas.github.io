
class SmallScreenWarning extends HTMLElement {
    static observedAttributes = ["backlink"];

    constructor() {
      super();
    }

    connectedCallback() {
        let backLink = "/#";
        if (this.hasAttribute("backlink")) {
            backLink = this.getAttribute("backlink");
        }

        document.body.style.overflow = "hidden";
    
        this.innerHTML = `
        <div class="small-screen-warning" id="small-screen-warning">
            <div>
                <p>
                The following content is not intended for devices with small screens.
                Do you still wish to continue?
                </p>
            </div>
            <div>
                <button id="yes">yes</button>
                <button id="no">no</button>
            </div>
        </div>
        `;

        var smallScreenWarning = document.getElementById("small-screen-warning")
        var yesButton = document.getElementById("yes");
        var noButton = document.getElementById("no");

        yesButton.onclick = function () {
            smallScreenWarning.style.display = "none";
            document.body.style.overflow = "visible";
            this.innerHTML = "";
        };
        noButton.onclick = function () {
            window.location.href = backLink;
        };
    }
  }

  customElements.define('small-screen-warning', SmallScreenWarning);
  