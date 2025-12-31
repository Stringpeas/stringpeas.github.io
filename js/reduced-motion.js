
/**
 * KEY
 * rm-freeze :: freezes animated images (includes backgrounds)
 * rm-pause :: pauses transitions and animations
 * rm-hide :: hides the element
 */

// List of documents to look for elements to process. For most pages, this is just the main document.
var documentsToProcess = [document];

/* Enable reduced motion. */
function enableReducedMotion() {
    for (let doc of documentsToProcess) {
        // Freeze animated images and backgrounds
        //const imageElements = doc.querySelectorAll('img[src$=".gif"]');
        //for (let element of imageElements) {
        //    if (element.classList.contains("rm-ignore")) continue;
        //    basePath = new URL(element.src).pathname
        //    if (!basePath.startsWith("/static")) {
        //        element.src = "/static"+basePath;
        //    }
        //}
        const bgElements = doc.getElementsByClassName("rm-freeze");

        for (let element of bgElements) {
            if (element.classList.contains("rm-ignore")) continue;

            const bg = getComputedStyle(element).backgroundImage;
            if (!bg || bg === "none") continue;

            // Store original once
            if (!element.dataset.bgOriginal) {
                element.dataset.bgOriginal = bg;
            }

            // OPTIONAL: only replace if you *actually* have static versions
            // Otherwise just keep the same image
        }

        // Pause animations
        const animatedElements = doc.getElementsByClassName("rm-pause");
        for (let element of animatedElements) {
            if (element.classList.contains("rm-ignore")) continue;
            element.classList.add("rm-active");
        }
        
        // Hide moving elements
        const movingElements = doc.getElementsByClassName("rm-hide");
        for (let element of movingElements) {
            if (element.classList.contains("rm-ignore")) continue;
            element.classList.add("rm-active");
        }
    }
}

/* Disable reduced motion. */
function disableReducedMotion() {
    for (let doc of documentsToProcess) {
        // Unfreeze animated images

        const bgElements = doc.getElementsByClassName("rm-freeze");

        for (let element of bgElements) {
            if (element.dataset.bgOriginal) {
                element.style.backgroundImage = element.dataset.bgOriginal;
                delete element.dataset.bgOriginal;
            }
        }

        // Play animations
        const animatedElements = doc.getElementsByClassName("rm-pause");
        for (let element of animatedElements) {
            element.classList.remove("rm-active");
        }

        // Show moving elements
        const movingElements = doc.getElementsByClassName("rm-hide");
        for (let element of movingElements) {
            element.classList.remove("rm-active");
        }
    }
}

/* Refreshes reduced motion. */
function refreshReducedMotion() {
    if (Settings.getReducedMotionSetting()) {
        enableReducedMotion();
    } else {
        disableReducedMotion();
    }
}

/* Toggles reduced motion. Used for control panel. */
function toggleReducedMotion() {
    Settings.setReducedMotionSetting(!Settings.getReducedMotionSetting());
}

/* Setup reduced motion. Used for control panel. */
function setupReducedMotion() {
    const currentSetting = Settings.getReducedMotionSetting();
    const reducedMotionCheck = document.getElementById("reducedmotion");
    if (reducedMotionCheck) {
        if (currentSetting) {
            reducedMotionCheck.classList.add("rm-check-enabled");
            reducedMotionCheck.classList.remove("rm-check-disabled");
        } else {
            reducedMotionCheck.classList.add("rm-check-disabled");
            reducedMotionCheck.classList.remove("rm-check-enabled");
        }
    }

    // Initialize
    if (currentSetting) {
        enableReducedMotion();
    }

    // Look for objects
    const objects = document.getElementsByTagName("object");
    for (let object of objects) {
        object.addEventListener("load", function () {
            documentsToProcess.push(this.contentDocument);
            refreshReducedMotion();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.code == 'KeyP') toggleReducedMotion();
    })

    setReducedMotionChangedEvent(refreshReducedMotion)
}

/* Setup reduced motion changed event. */
function setReducedMotionChangedEvent(lambda) {
    document.addEventListener("settingchanged", (e) => {
        if (e.detail.name !== SettingType.REDUCED_MOTION) return;
        lambda()
    });
}

setupReducedMotion();
