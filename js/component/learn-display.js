class LearnDisplay extends HTMLElement {
    static observedAttributes = ["type"];

    constructor() {
      super();
    }

    connectedCallback() {

        let type = "updates";
        if (this.hasAttribute("type")) {
            type = this.getAttribute("type");
        }

        if (type == "updates") {
            this.innerHTML = `
            <ul>
                <li>Multiplayer / Networking</li>
                <li>Shaders</</li>
                <li>Accessibility</li>
                <li>Game Feel / Game Polish</li>
                <li>Procedural Generation</li>
                <li>Procedural Animations</li>
            </ul>`;
        } else if (type == "issues") {
            this.innerHTML = `
            <ul>
                <li>Procedural animations always look so crisp and smooth I must know how its done.</li>
                <li>Cartoon and Pixel Shaders will have my heart forever.</li>
                <li>I always hear that multiplayer is a great giant beast, and I want to learn how to slay it.</li>
			</ul>`
        }
    }

  }

  customElements.define('learn-display', LearnDisplay);
  