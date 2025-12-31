class ContactPortal extends HTMLElement {
    static observedAttributes = ["dest", "img", "title"];

    constructor() {
      super();
    }

    connectedCallback() {
    let title = "";
    if (this.hasAttribute("title")) {
        title = this.getAttribute("title");
    }

    let img = "/#";
    if (this.hasAttribute("img")) {
        img = this.getAttribute("img");
    }

    let link = "/#";
    if (this.hasAttribute("link")) {
        link = this.getAttribute("link");
    }

    this.innerHTML = `
    <a href="${link}" class="box-link">
        <div class="box-wrapper">
            <div class="box-border">
            <p class="box-title">${title}</p>
                <div class="box">
                    <img src="${img}"; style="image-rendering: pixelated; max-width: 100%; max-height: 100%; margin: auto;" />
                    ${this.innerHTML}
                </div>
            </div>
        </div>
    </a>
    `;
    }

  }

  customElements.define('contact-portal', ContactPortal);
  