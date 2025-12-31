
class HomePortal extends HTMLElement {
    static observedAttributes = ["img", "name", "link", "top", "right", "id", "size", "node-align", "locked"];

    constructor() {
      super();
    }

    connectedCallback() {
        let id = "";
        if (this.hasAttribute("id")) {
            id = this.getAttribute("id");
        }

        let name = "";
        if (this.hasAttribute("name")) {
            name = this.getAttribute("name");
        }

        let img = "/#";
        if (this.hasAttribute("img")) {
            img = this.getAttribute("img");
        }

        let link = "/#";
        if (this.hasAttribute("link")) {
            link = this.getAttribute("link");
        }

        let top = "0";
        if (this.hasAttribute("top")) {
            top = this.getAttribute("top");
        }

        let right = "0";
        if (this.hasAttribute("right")) {
            right = this.getAttribute("right");
        }

        let size = "100%";
        if (this.hasAttribute("size")) {
            size = this.getAttribute("size");
        }

        let nodeAlign = "portal-node-right";
        if (this.hasAttribute("node-align")) {
            nodeAlign = this.getAttribute("node-align");
        }

        let indicatorAlign = "portal-indicator-left";
        if (nodeAlign.includes("portal-node-left")) {
            indicatorAlign = "portal-indicator-right";
        }

        let locked = false;
        if (this.hasAttribute("locked")) {
            locked = this.getAttribute("locked") === 'true';
        }

        let lockedClass = "";
        if (locked) {
            lockedClass = "portal-locked";
            link = "javascript: void(0)";
        }

        this.innerHTML = `
        <a href='${link}' class="portal-link" id="${id}" draggable="false">
            <div class="portal ${lockedClass}" style="top: ${top}; right: ${right}; width: ${size}; height: ${size}">
                <div class="portal-indicator ${indicatorAlign}">
                    <div class="portal-line" ">
                    </div>
                    <p class="portal-name">${name}</p>
                </div>
                <img alt="" src="${img}" class="portal-node ${nodeAlign}"/>
            </div>
        </a>
        `;
    }

    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.innerHTML = "";
        this.connectedCallback();
    }

  }

  customElements.define('home-portal', HomePortal);
  