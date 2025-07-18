
function calcLh(mult = 1) {
    // More accuracy since, it has to be more exact. Unlike ch which has a buffer area
    return parseFloat(getComputedStyle(document.getElementById("control-char")).lineHeight) * mult;
}

function calcCh(mult = 1) {
    return document.getElementById("control-char").offsetWidth * mult;
}

function setAppWidth() {
    const chCount = Math.floor(window.innerWidth / calcCh());
    const diff = Math.floor(calcCh(chCount) - window.innerWidth);
    const app = document.getElementById("app");
    const paddingCount = 1;
    const offset = (diff / 2) + calcCh(paddingCount);
    const finalWidth = Math.min(chCount - (paddingCount * 2), 130);

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

function moveToItem({ index, item, direction }) {
    const items = document.getElementsByClassName("ar");
    const activeItem = document.querySelector(".ar.active");
    let activeIndex = 0;
    if (activeItem) {
        activeIndex = Array.from(items).indexOf(activeItem);
    }

    activeItem.classList.remove("active");

    if (typeof index === "number") { 
        activeIndex = index; 
    }
    else if (direction) {
        activeIndex = direction === "down" ? Math.min(activeIndex+1,items.length-1) : Math.max(activeIndex-1,0);
    } 
    else if (item) {
        activeIndex = Array.from(items).indexOf(item);
    }

    const newActiveItem = items[activeIndex];
    newActiveItem.classList.add("active");
    
    if (activeIndex < 3 && window.innerHeight > calcLh(50)) {
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
        return;
    }

    newActiveItem.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function clickActiveArticle() {
    document.querySelector(".ar.active a.article-hyperlink.main-anchor")?.click();
}

// Usually wouldn't repeat this code, but I think it makes sense to avoid branching
function highlightModKey(mod, highlight = true) {
    document.querySelectorAll(`[data-mod-key="${mod}"]`).forEach(item => {
        if (highlight) item.classList.add("highlight");
        else item.classList.remove("highlight");
    });
}
function highlightBindKey(bind, highlight = true) {
    document.querySelectorAll(`[data-bind-key="${bind}"]`).forEach(item => {
        if (highlight) item.classList.add("highlight");
        else item.classList.remove("highlight");
    });
}
function removeBindHighlights() {
    document.querySelectorAll(`[data-bind-key]`).forEach(item => {
        item.classList.remove("highlight");
    });
}

function focusAndSelect(inputElement, selectAll = true, range) {
    inputElement.focus();
    const len = inputElement.value.length;
    if (selectAll) {
        inputElement.setSelectionRange(0, len);
    } else {
        inputElement.setSelectionRange(range?.[0] || len, range?.[1] || len);
    }
}

let LAYER = "normal", LAYER_TYPE = "normal";
let dataShortcuts = [];
let nearestFocusable;

function setLayer(newLayer, newLayerType) {
    LAYER = newLayer;
    LAYER_TYPE = newLayerType;
    Array.from(document.getElementsByClassName("layer-label"))?.forEach(element => {
        element.textContent = LAYER.toUpperCase();
    });
    return [ LAYER, LAYER_TYPE ];
}


function setupDataShortcuts() {
    const shortcutElements = document.querySelectorAll("[data-shortcut]");
    dataShortcuts = Array.from(shortcutElements).map((element, index) => {
        const split = element.getAttribute("data-shortcut").split(',');
        const intermediatActions = split[3].split("/");
        let actions;
        if (intermediatActions.length > 1) {
            actions = {
                // This is on purpose, third action can only be browser default
                type: intermediatActions.length > 2 ? "tripple" : "double",
                groups: [
                    intermediatActions[0].split('+'),
                    intermediatActions[1].split('+')
                ]
            };
        } else {
            actions = {
                type: "single",
                groups: [
                    intermediatActions[0].split('+'),
                ]
            };
        }
        return {
            layer:    split[0],
            mod:      split[1],
            bind:     split[2].toLowerCase(),
            actions,
            element 
        }
    });
}

function modDown(mod, event) {
    return (mod === "ctrl"  && event.ctrlKey)  ||
           (mod === "shift" && event.shiftKey) ||
           (mod === "alt"   && event.altKey);
}

function getFocusableElements(container) {
    const focusableElements = Array.from(container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));

    const current = document.activeElement;
    const currentIndex = focusableElements.indexOf(current);

    const currentRect = current.getBoundingClientRect();
    
    const aboveElements = focusableElements 
        .map((el, idx) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < currentRect.top && rect.right > currentRect.left && rect.left < currentRect.right) {
                return { el, distance: (currentRect.top - rect.bottom) + Math.abs(rect.left - currentRect.left) };
            }
            return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);
    const belowElements = focusableElements
        .map((el, idx) => {
            const rect = el.getBoundingClientRect();
            if (rect.top > currentRect.top && rect.right > currentRect.left && rect.left < currentRect.right) {
                return { el, distance: (rect.top - currentRect.bottom) + Math.abs(rect.left - currentRect.left) };
            }
            return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

    return {
        left: nextIndex =  focusableElements[Math.max(0, currentIndex - 1)],
        right: nextIndex = focusableElements[Math.min(focusableElements.length - 1, currentIndex + 1)],
        top: aboveElements?.[0]?.el || current,
        bottom: belowElements?.[0]?.el || current
    };
    
}

function runActionGroup(shortcut, groupIndex) {
    shortcut.actions.groups[groupIndex].forEach(action => {
        switch (action) {
            case "scroll":
                shortcut.element.scrollIntoView({ behavior: "smooth", block: "center" });
                break;
            case "click":
                shortcut.element.click();
                break;
            case "focus":
                shortcut.element.focus();
                break;
            case "selectAll":
                focusAndSelect(shortcut.element, true);
                break;
            case "selectEnd":
                focusAndSelect(shortcut.element, false);
                break;
            case "setLayer":
                setLayer(
                    shortcut.element.getAttribute("data-layername"),
                    shortcut.element.getAttribute("data-layertype")
                );
                break;
            case "sectionNavigationLayer":
                nearestFocusable = getFocusableElements(shortcut.element);
                nearestFocusable.left.focus();
                nearestFocusable = getFocusableElements(shortcut.element);
                setLayer(
                    shortcut.element.getAttribute("data-layername"),
                    "section-navigation"
                )
                break;
            case "preventDefault":
               event.preventDefault();
               break;
        }
    });

}

function runDataShortcuts(shortcuts) {
    shortcuts.forEach(shortcut => {
        function resetActionCounter() {
            if (document.activeElement === shortcut.element) {
                setTimeout(resetActionCounter, 1000);
                return;
            }
            shortcut.element.removeAttribute("data-action-counter");
        }
        // Only doing tripples for now, and the third time it will run the default browser action
        if (shortcut.actions.type === "double" || shortcut.actions.type === "tripple") {
            if (shortcut.element.getAttribute("data-action-counter") > 1) {
                // this should just allow a default action
                shortcut.element.removeAttribute("data-action-counter");
                return true;
            } 
            else if (shortcut.element.getAttribute("data-action-counter") > 0) {
                runActionGroup(shortcut, 1);
                if (shortcut.actions.type === "double") {
                    shortcut.element.removeAttribute("data-action-counter");
                } else {
                    shortcut.element.setAttribute("data-action-counter", 2);
                }
                return true;
            } else {
                shortcut.element.setAttribute("data-action-counter", 1);
                setTimeout(resetActionCounter, 500);
            }
        }
        runActionGroup(shortcut, 0);
        return true;
    });
}

function dataShortcutSystem(event) {
    // I'm allow multiple, it's a feature, not a bug
    // The reason is so I can attach a shortcut to act on multiple elements easier
    const shortcuts = dataShortcuts.filter(data => {
        return (data.layer === "all" || data.layer === LAYER) &&
               (modDown(data.mod, event) || data.mod === "none") && 
               (event.key.toLowerCase() === data.bind);
    });
    runDataShortcuts(shortcuts);
    return false;
}

window.addEventListener("keydown", event => {
    highlightBindKey(event.key.toLowerCase());
    // Update later for multiple mods on a bind
    if (event.ctrlKey && (!event.shiftKey && !event.altKey)) {
        highlightModKey("ctrl");
    } else
    if (event.shiftKey && (!event.ctrlKey && !event.altKey)) {
        highlightModKey("shift");
    } else
    if (event.altKey && (!event.ctrlKey && !event.shiftKey)) {
        highlightModKey("alt");
    }
    if (event.key === "Escape") {
        // Should be handeld better when I have popovers
        setLayer("normal", "normal");
        if (document.activeElement) {
            document.activeElement.blur();
            document.body.focus();
        }
        return;
    }
    if (dataShortcutSystem(event)) return;
    if (LAYER === "normal" && window.location.pathname === "/search") {
        if (event.ctrlKey && (!event.shiftKey && !event.altKey)) {
            switch (event.key) {
                // Hardcoded for performance, maybe
                // Realistically it's inconsequential
                case "1":
                    moveToItem({ index: 0 });
                    clickActiveArticle();
                    break;
                case "2":
                    moveToItem({ index: 1 });
                    clickActiveArticle();
                    break;
                case "3":
                    moveToItem({ index: 2 });
                    clickActiveArticle();
                    break;
                case "4":
                    moveToItem({ index: 3 });
                    clickActiveArticle();
                    break;
                case "5":
                    moveToItem({ index: 4 });
                    clickActiveArticle();
                    break;
                case "6":
                    moveToItem({ index: 5 });
                    clickActiveArticle();
                    break;
                case "7":
                    moveToItem({ index: 6 });
                    clickActiveArticle();
                    break;
                case "8":
                    moveToItem({ index: 7 });
                    clickActiveArticle();
                    break;
                case "9":
                    moveToItem({ index: 8 });
                    clickActiveArticle();
                    break;
                case "0":
                    moveToItem({ index: 9 });
                    clickActiveArticle();
                    break;
            }
        }
        if (event.shiftKey && (!event.ctrlKey && !event.altKey)) {
            switch (event.key) {
                // Hardcoded for performance, maybe
                // Realistically it's inconsequential
                case "!":
                    moveToItem({ index: 0 });
                    break;
                case "@":
                    moveToItem({ index: 1 });
                    break;
                case "#":
                    moveToItem({ index: 2 });
                    break;
                case "$":
                    moveToItem({ index: 3 });
                    break;
                case "%":
                    moveToItem({ index: 4 });
                    break;
                case "^":
                    moveToItem({ index: 5 });
                    break;
                case "&":
                    moveToItem({ index: 6 });
                    break;
                case "*":
                    moveToItem({ index: 7 });
                    break;
                case "(":
                    moveToItem({ index: 8 });
                    break;
                case ")":
                    moveToItem({ index: 9 });
                    break;
            }
        }
        switch (event.key) {
            case "j":
                moveToItem({ direction: "down" });
                break;
            case "k":
                moveToItem({ direction: "up" });
                break;
            case "Enter":
                clickActiveArticle();
                break;
        }
        return;
    } else if (LAYER === "normal") {
        let lh;
        switch (event.key) {
            case "j":
                window.scrollBy({
                    top: calcLh(10),
                    behavior: 'smooth'
                });
                break;
            case "k":
                if ((window.scrollY || document.documentElement.scrollTop) < 250) {
                    scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                } else {
                    window.scrollBy({
                        top: -calcLh(10),
                        behavior: 'smooth'
                    });
                }
                break;
            case "Enter":
                clickActiveArticle();
                break;
        }
    }
    if (LAYER_TYPE === "section-navigation") {
        nearestFocusable = getFocusableElements(document.querySelector(`[data-layername="${LAYER}"]`));
        switch (event.key) {
            case "h":
                nearestFocusable.left.focus();
                nearestFocusable = getFocusableElements(document.querySelector(`[data-layername="${LAYER}"]`));
                break;
            case "l":
                nearestFocusable.right.focus();
                nearestFocusable = getFocusableElements(document.querySelector(`[data-layername="${LAYER}"]`));
                break;          
            case "j":
                nearestFocusable.bottom.focus();
                nearestFocusable = getFocusableElements(document.querySelector(`[data-layername="${LAYER}"]`));
                break;
            case "k":
                nearestFocusable.top.focus();
                nearestFocusable = getFocusableElements(document.querySelector(`[data-layername="${LAYER}"]`));
                break;
        }
    }
});

window.addEventListener("keyup", event => {
    if (!event.ctrlKey)  { highlightModKey("ctrl",  false); }
    if (!event.shiftKey) { highlightModKey("shift", false); }
    if (!event.altKey)   { highlightModKey("alt",   false); }
    if (event.key) {
        highlightBindKey(event.key.toLowerCase(), false);
    }
});

window.addEventListener("focus", ({ target }) => {
    if (document.activeElement === document.body) {
        setLayer("normal", "normal");
        return;
    }
    const layeredElement = target.closest("[data-layername]");
    if (!layeredElement) {
        setLayer("normal", "normal");
        return;
    }

    /*const [ newLayer, newLayerType ] = */setLayer(
        layeredElement.getAttribute("data-layername"),
        layeredElement.getAttribute("data-layertype")
    );

    if (!target.getAttribute("data-runshortcuton")?.contains(/\bfocus\b/)) return;
    const shortcut = dataShortcuts.find(shortcut => shortcut.element === target);
    if (!shortcut) return;
    
    runDataShortcuts([ shortcut ]);
}, true);

window.addEventListener("blur", ({ target }) => {
    if (document.activeElement === document.body) setLayer("normal", "normal");
}, true);

let APP_READY = false;
function setup() {
    if (APP_READY) return;
    APP_READY = true;
    setAppWidth();
    setupDataShortcuts();
    removeBindHighlights();
}

window.addEventListener("load", () => {
    setup();
    if (!event.ctrlKey)  { highlightModKey("ctrl",  false); }
    if (!event.shiftKey) { highlightModKey("shift", false); }
    if (!event.altKey)   { highlightModKey("alt",   false); }
    if (event.key) {
        highlightBindKey(event.key.toLowerCase());
    }
});
// Fallback incase jsdeliver decides it's going to be "loading" forever
// I might even just auto cache libraries on the server incase they don't load
setTimeout(setup, 1000);
