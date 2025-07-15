
function setAppWidth() {
    let controlChar = document.getElementById("control-char");
    if (!controlChar) {
        controlChar = document.createElement("span");
        controlChar.style.width = "1ch";
        controlChar.style.visibility = "hidden";
        controlChar.innerText = "0";
        controlChar.id = "control-char";
        document.body.appendChild(controlChar);

    }
    const chCount = Math.floor(window.innerWidth / controlChar.offsetWidth);
    const diff = Math.floor((controlChar.offsetWidth * chCount) - window.innerWidth);
    const app = document.getElementById("app");
    const paddingCount = 1;
    const offset = (diff / 2) + (paddingCount * controlChar.offsetWidth);
    const finalWidth = chCount - (paddingCount * 2);

    app.marginInline = `${offset}px`;
    app.style.width = `${finalWidth}ch`;

    if (finalWidth < 100) {
        app.classList.add("layout1");
        app.classList.remove("layout2");
    } else {
        app.classList.remove("layout1");
        app.classList.add("layout2");
    }
}

let lastScreenWidth = window.innerWidth;
window.addEventListener("resize", () => {
    lastScreenWidth = window.innerWidth;
    setTimeout(() => {
        if (lastScreenWidth === window.innerWidth) {
            setAppWidth();
        }
    }, 500);
});

window.addEventListener("load", setAppWidth);
