/**
 * @param {HTMLElement} input
 * @param {Boolean} state
 * @returns {Boolean} Returns the same boolean as passed into the state parameter.
 */
const updateInputBorder = function(input, state) {
    input.classList.remove("border-danger");
    input.classList.remove("border-success");
    input.classList.add(state ? "border-success" : "border-danger");

    return state;
};

const isInputValid = function(input) {
    const pattern = input.dataset.validationregex;
    if(!pattern) return true;
    const regex = new RegExp(pattern);

    return updateInputBorder(input, !!input?.value?.match(regex));
};

const setupForms = function() {
    document.querySelectorAll(".js-regex-validator").forEach(form => {
        form.querySelectorAll("input").forEach(x => x.addEventListener("change", () => isInputValid(x)));

        form.onsubmit = (ev) => {
            if([...form.querySelectorAll("input")]
                .map(input => isInputValid(input))
                .filter(x => !x).length !== 0) ev.preventDefault();
        };
    });
};

window.addEventListener("load", () => {
    setupForms();
});
