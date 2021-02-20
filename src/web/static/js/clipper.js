/**
 * @typedef {Object} ClipperElement
 * @property {{initialized: Boolean | null, clipboard: String | null}} dataset
 */

// eslint-disable-next-line no-unused-vars
class Clipper {
    static copyText = "Copy to Clipboard";
    static copiedText = "Copied!";

    /**
     * Initialized HTML Elements for clipper use
     * @static
     * @memberof Clipper
     */
    static initializeClipper() {
        const toInitialize = [...document.querySelectorAll(".js-clipper:not([data-initialized])")];
        toInitialize.forEach(toInit => {
            /** @type {HTMLElement & ClipperElement} */
            const clipperElement = (toInit);
            clipperElement.dataset.initialized = true;

            if(!clipperElement.dataset.clipboard) {
                return;
            }

            clipperElement.setAttribute("title", Clipper.copyText);
            clipperElement.dataset.bsToggle = "tooltip";
            clipperElement.style.cursor = "pointer";
            // @ts-ignore
            // eslint-disable-next-line no-unused-vars
            const tooltip = new bootstrap.Tooltip(clipperElement);

            clipperElement.addEventListener("click", () => {
                this.copyToClipboard(clipperElement.dataset.clipboard);
                clipperElement.setAttribute("data-bs-original-title", Clipper.copiedText);
                tooltip.show();
                clipperElement.setAttribute("data-bs-original-title", Clipper.copyText);
            });
        });
    }

    /**
     * @static
     * @param {String} text
     * @memberof Clipper
     */
    static copyToClipboard(text = "") {
        const pElement = document.createElement("input");
        pElement.value = text;
        document.querySelector("body").appendChild(pElement);
        pElement.select();
        pElement.setSelectionRange(0, 999999);
        document.execCommand("copy");
        document.querySelector("body").removeChild(pElement);
    }
}
