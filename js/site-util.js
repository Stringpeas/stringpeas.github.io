/*
*   Author: espimyte (https://espy.world)
*/

// The minimum width of the screen before it is determined to be a "small screen".
const SMALL_SCREEN_WIDTH = 600;

/** Checks if the current window is a small screen. */
function isSmallScreen() {
    return window.innerWidth <= SMALL_SCREEN_WIDTH;
}

// Event for when size changes from small screen to not or vice versa.
let smallScreenEvent = new CustomEvent("smallScreenUpdate");
let smallScreen = isSmallScreen();
addEventListener("resize", (e) => {
    if (isSmallScreen() && !smallScreen) {
        smallScreen = true;
        dispatchEvent(smallScreenEvent);
    } else if (!isSmallScreen() && smallScreen) {
        dispatchEvent(smallScreenEvent)
        smallScreen = false;
    }
});

/** Gets the address anchor. */
function getAnchor() {
    const anchor = window.location.hash.substring(1);

    if (anchor.length > 0) {
        return anchor;
    }
}

/** Sets the address anchor. */
function setAnchor(anchor) {
    window.history.replaceState(
        null,
        document.title,
        `${window.location.pathname}#${anchor}`
    );
}

/** Removes the address anchor. */
function removeAnchor() {
    window.history.replaceState(
        null,
        document.title,
        `${window.location.pathname}`
    );
}

/** Clears anchors and queries from the address. */
function clearAddress() {
    window.history.replaceState(null, document.title, window.location.pathname);
}

/** Get address queries. */
function getAddressQuery(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/** Set address queries. */
function setAddressQuery(name, value) {
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set(name, value);
    window.history.replaceState(null, '', newUrl.toString())
}

/** Remove a certain address query. */
function removeAddressQuery(name) {
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete(name);
    window.history.replaceState(null, '', newUrl.toString())
}

/** Helper function to create an element. */
function createEl(tag, {className, src, textContent, width, height, innerHTML, href, id, type, name, order}) {
    var el = document.createElement(tag);
    el.src = src;
    el.textContent = textContent;
    el.style.width = width;
    el.style.height = height;
    el.style.order = order;
    el.href = href;

    if (name) el.name = name;
    if (type) el.type = type;
    if (className) el.className = className;
    if (id) el.id = id;
    if (innerHTML) el.innerHTML = innerHTML;

    return el;
}

/** SETTINGS */
const SettingType = {
    REDUCED_MOTION: "reducedmotion",
    COMIC_SCROLL: "comicscroll",
    MUSIC_VOLUME: "musicvolume",
    MUSIC_MUTED: "musicmuted",
    SOUND_VOLUME: "soundvolume",
    SOUND_MUTED: "soundmuted"
}

class Settings {
    static settingChangedEventKey = "settingchanged";

    /** Gets the current reduced motion setting. */
    static getReducedMotionSetting() {
        return localStorage.getItem(SettingType.REDUCED_MOTION) === "true" ? true : false;
    }

    /** Sets reduced motion setting. */
    static setReducedMotionSetting(enabled) {
        localStorage.setItem(SettingType.REDUCED_MOTION, enabled ? "true" : "false");
        var changedEvent = new CustomEvent(this.settingChangedEventKey, {'detail': {name: SettingType.REDUCED_MOTION, value: enabled}});
        document.dispatchEvent(changedEvent);
    }

    /** Gets the current readstyle setting. */
    static getComicScrollSetting() {
        return localStorage.getItem(SettingType.COMIC_SCROLL) === "true" ? true : false;
    }

    /** Sets readstyle setting. */
    static setComicScrollSetting(enabled) {
        localStorage.setItem(SettingType.COMIC_SCROLL, enabled ? "true" : "false");
    }

    /** Gets current music volume. */
    static getMusicVolume() {
        return parseInt(localStorage.getItem(SettingType.MUSIC_VOLUME) ?? "50");
    }

    /** Sets current music volume. */
    static setMusicVolume(volume) {
        localStorage.setItem(SettingType.MUSIC_VOLUME, `${volume}`);
        var changedEvent = new CustomEvent(this.settingChangedEventKey, {'detail': {name: SettingType.MUSIC_VOLUME, value: volume}});
        document.dispatchEvent(changedEvent);
    }

    /** Gets music mute setting. */
    static getMusicMuted() {
        return localStorage.getItem(SettingType.MUSIC_MUTED) === "false" ? false : true;
    }

    /** Sets music mute setting. */
    static setMusicMuted(muted) {
        localStorage.setItem(SettingType.MUSIC_MUTED, muted ? "true" : "false");
        var changedEvent = new CustomEvent(this.settingChangedEventKey, {'detail': {name: SettingType.MUSIC_MUTED, value: muted}});
        document.dispatchEvent(changedEvent);
    }

    /** Gets current sound volume. */
    static getSoundVolume() {
        return parseInt(localStorage.getItem(SettingType.SOUND_VOLUME) ?? "50");
    }

    /** Sets current sound volume. */
    static setSoundVolume(volume) {
        localStorage.setItem(SettingType.SOUND_VOLUME, `${volume}`);
        var changedEvent = new CustomEvent(this.settingChangedEventKey, {'detail': {name: SettingType.SOUND_VOLUME, value: volume}});
        document.dispatchEvent(changedEvent);
    }

    /** Gets sound mute setting. */
    static getSoundMuted() {
        return localStorage.getItem(SettingType.SOUND_MUTED) === "false" ? false : true;
    }

    /** Sets sound mute setting. */
    static setSoundMuted(muted) {
        localStorage.setItem(SettingType.SOUND_MUTED, muted ? "true" : "false");
        var changedEvent = new CustomEvent(this.settingChangedEventKey, {'detail': {name: SettingType.SOUND_MUTED, value: muted}});
        document.dispatchEvent(changedEvent);
    }
}