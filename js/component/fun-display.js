class FunDisplay extends HTMLElement {

    connectedCallback() {

        const type = this.getAttribute("type") ?? "learn";


        if (type == "learn") {
            this.innerHTML = `
				<p>T :: MIGUEL DOMINGUES</p>
                <p>> myemail@gmail.com</p>
				<p>--------------------------------</p>
				<p>> system clock synchronized</p>
				<p>> environment variables loaded</p>
				<p>> user session detected</p>
				<p>> integrity check .......... PASS</p>
                <p>> no critical errors found</p>
                <p>> background processes idle</p>
                <p>> render pipeline engaged</p>
                <p>--------------------------------</p>
                <p>> awaiting input_</p>

			`;
        } else if (type == "notes") {
            this.innerHTML = `
                <p>FILE TRACE :: /usr/stringpeas</p>
                <p>--------------------------------</p>
                <p>index.map ............... FOUND</p>
                <p>portfolio.cfg .......... LOADED</p>
                <p>assets.pkg ............. LINKED</p>
                <p>logs/ .................. OK</p>
                <p>cache/ ................. CLEAN</p>
                <p>backup.img ............. VERIFIED</p>
                <p>checksum ............... MATCH</p>
                <p>--------------------------------</p>
                <p>trace complete_</p>
			`;
        }
    }

}

customElements.define('fun-display', FunDisplay);
