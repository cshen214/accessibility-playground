const contrastButton = document.getElementById("contrastButton");
const motionButton = document.getElementById("motionButton");


// =========================
// High Contrast
// =========================

contrastButton.addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

    const enabled = document.body.classList.contains("high-contrast");

    contrastButton.textContent =
        enabled
            ? "Disable High Contrast"
            : "Enable High Contrast";
});


// =========================
// Reduced Motion
// =========================

motionButton.addEventListener("click", () => {

    document.body.classList.toggle("reduced-motion");

    const enabled = document.body.classList.contains("reduced-motion");

    motionButton.textContent =
        enabled
            ? "Enable Motion"
            : "Reduce Motion";
});

// =========================
// Font Size
// =========================

const decreaseFontButton =
    document.getElementById("decreaseFontButton");

const increaseFontButton =
    document.getElementById("increaseFontButton");

const fontSizeDisplay =
    document.getElementById("fontSizeDisplay");

let fontSize = 100;

const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 130;
const FONT_SIZE_STEP = 10;


function updateFontSize() {

    document.documentElement.style.fontSize =
        `${fontSize}%`;

    fontSizeDisplay.textContent =
        `${fontSize}%`;

    decreaseFontButton.disabled =
        fontSize <= MIN_FONT_SIZE;

    increaseFontButton.disabled =
        fontSize >= MAX_FONT_SIZE;
}


decreaseFontButton.addEventListener("click", () => {

    if (fontSize > MIN_FONT_SIZE) {

        fontSize -= FONT_SIZE_STEP;

        updateFontSize();
    }
});


increaseFontButton.addEventListener("click", () => {

    if (fontSize < MAX_FONT_SIZE) {

        fontSize += FONT_SIZE_STEP;

        updateFontSize();
    }
});


updateFontSize();
