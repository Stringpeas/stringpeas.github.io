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
    MUSIC_PLAYING: "musicplaying",
    MUSIC_VOLUME: "musicvolume",
    MUSIC_MUTED: "musicmuted",
    SOUND_VOLUME: "soundvolume",
    SOUND_MUTED: "soundmuted"
}

class Settings {
    static settingChangedEventKey = "settingchanged";

    static getReducedMotionSetting() {
        return localStorage.getItem(SettingType.REDUCED_MOTION) === "true";
    }

    static setReducedMotionSetting(enabled) {
        localStorage.setItem(SettingType.REDUCED_MOTION, enabled ? "true" : "false");
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.REDUCED_MOTION, value: enabled}}));
    }

    static getComicScrollSetting() {
        return localStorage.getItem(SettingType.COMIC_SCROLL) === "true";
    }

    static setComicScrollSetting(enabled) {
        localStorage.setItem(SettingType.COMIC_SCROLL, enabled ? "true" : "false");
    }

    /** Music playing — defaults OFF */
    static getMusicPlaying() {
        return localStorage.getItem(SettingType.MUSIC_PLAYING) === "true";
    }

    static setMusicPlaying(playing) {
        localStorage.setItem(SettingType.MUSIC_PLAYING, playing ? "true" : "false");
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.MUSIC_PLAYING, value: playing}}));
    }

    static getMusicVolume() {
        return parseInt(localStorage.getItem(SettingType.MUSIC_VOLUME) ?? "50");
    }

    static setMusicVolume(volume) {
        localStorage.setItem(SettingType.MUSIC_VOLUME, `${volume}`);
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.MUSIC_VOLUME, value: volume}}));
    }

    static getMusicMuted() {
        return localStorage.getItem(SettingType.MUSIC_MUTED) === "false" ? false : true;
    }

    static setMusicMuted(muted) {
        localStorage.setItem(SettingType.MUSIC_MUTED, muted ? "true" : "false");
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.MUSIC_MUTED, value: muted}}));
    }

    static getSoundVolume() {
        return parseInt(localStorage.getItem(SettingType.SOUND_VOLUME) ?? "50");
    }

    static setSoundVolume(volume) {
        localStorage.setItem(SettingType.SOUND_VOLUME, `${volume}`);
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.SOUND_VOLUME, value: volume}}));
    }

    static getSoundMuted() {
        return localStorage.getItem(SettingType.SOUND_MUTED) === "false" ? false : true;
    }

    static setSoundMuted(muted) {
        localStorage.setItem(SettingType.SOUND_MUTED, muted ? "true" : "false");
        document.dispatchEvent(new CustomEvent(this.settingChangedEventKey, {detail: {name: SettingType.SOUND_MUTED, value: muted}}));
    }
}

// ── DEEP SPACE FM ────────────────────────────────────────────────────────────
var SpaceFM = (function() {
    var SONG_SRC  = 'img/music/TheRahBand_MessagesFromTheStars.mp3';
    var POS_KEY   = 'spacefm_pos';

    var audio = new Audio(SONG_SRC);
    audio.loop = true;

    // Restore position so music continues where it left off across pages
    var savedPos = parseFloat(localStorage.getItem(POS_KEY) || '0');
    if (savedPos) {
        audio.addEventListener('loadedmetadata', function() {
            audio.currentTime = savedPos;
        }, { once: true });
    }

    // Save position on navigation
    window.addEventListener('beforeunload', function() {
        localStorage.setItem(POS_KEY, audio.currentTime);
    });

    // React to MUSIC_PLAYING changes (from toolbar checkbox or home.html buttons)
    document.addEventListener('settingchanged', function(e) {
        if (e.detail.name !== SettingType.MUSIC_PLAYING) return;
        if (e.detail.value) audio.play().catch(function() {});
        else audio.pause();
    });

    // Auto-resume on non-home pages if music was playing when they left
    document.addEventListener('DOMContentLoaded', function() {
        var isHome = window.location.pathname.endsWith('home.html') || window.location.pathname === '/';
        if (!isHome && Settings.getMusicPlaying()) {
            audio.play().catch(function() {});
        }
    });

    return {
        audio: audio,
        isPlaying: function() { return !audio.paused; }
    };
})();