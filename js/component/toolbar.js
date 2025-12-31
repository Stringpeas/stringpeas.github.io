class Toolbar extends HTMLElement {
    static observedAttributes = ["href", "target", "hideback", "toindex", "hidehome", "hidesettings", "altlinks"];

    constructor() {
        super();
        document.addEventListener("settingchanged", (e) => {
            if (e.detail.name !== SettingType.REDUCED_MOTION) return;
            document.getElementById("reducedmotion").checked = Settings.getReducedMotionSetting();
        });
    }

    connectedCallback() {
        let href = this.getAttribute("href") ?? "home.html";
        let target = this.getAttribute("target");

        // Alternate backlinks
        let altlinks = this.getAttribute("altlinks")?.split(" ") ?? [];
        if (window.location.href.includes("/log/")) altlinks.push("/home.html");

        const referrer = document.referrer;
        const currLink = window.location.href;
        
        // On-site pages that link to log posts
        const fromLogBacklinks = ["/log.html", "/info.html", "/webmaster/how.html"]; 

        if ((referrer.startsWith("http://127.0.0.1") || referrer.startsWith("https://espy.world/"))) {
            if (altlinks) {
                if (currLink.includes("/log/")) {
                    altlinks = [...altlinks, ...fromLogBacklinks];
                }
                altlinks.forEach((altlink) => {
                    if (referrer.endsWith(altlink) || referrer.endsWith(altlink.replace(".html", ""))) {
                        href = altlink;
                        return;
                    }
                });
            }
            // Special case for logs (do not continue if both current link and backlink are log entries)
            if (!(currLink.includes("/log/") && referrer.includes("/log/"))) {
                if (referrer.includes("/log/")) {
                    let valid = true;
                    fromLogBacklinks.forEach((backlink) => {
                        if (currLink.endsWith(backlink) || currLink.endsWith(backlink.replace(".html", ""))) {
                            valid = false;
                        }
                    })
                    if (valid) href = referrer;
                }
            }
        }

        let hidehome = this.getAttribute("hidehome") ?? false;
        let hideback = this.getAttribute("hideback") ?? false;
        let hidesettings = this.getAttribute("hidesettings") ?? false;
        let toindex = this.getAttribute("toindex") ?? false;

        let musicMuted = Settings.getMusicMuted();
        let soundMuted = Settings.getSoundMuted();
    
        this.innerHTML = `
        <a id="homelink" class="t-link" href=${toindex ? "/" : "/home.html"} style="${hidehome ? 'display: none' : ''}">
            <img src="${toindex ? "/svg/eject.svg" : "svg/home.svg"}"/>
        </a>

        <a id="settingslink" class="t-link" href="javascript: Toolbar.toggleSettings();" style="${hidehome ? 'right: 0px' : ''}; ${hidesettings ? 'display: none' : ''}">
            <img id="settingsimg" class="rm-pause" style="transform: none;" src="svg/gear-solid.svg"/>
        </a>

        <a id="backlink" class="t-link" style="display: ${hideback ? "none" : "flex"}" href="${href}" ${target != undefined ? `target=${target}` : ''}>
            <img src="svg/back-arrow.svg" />
        </a>

        <div id='settings' class="rm-pause"}>

            <div class='setting check'>
                <input type="checkbox" id="reducedmotion" name="reducedmotion" ${Settings.getReducedMotionSetting() ? "checked" : ""} />
                <label for="reducedmotion">REDUCED MOTION</label>
            </div>

            <div class='audio-settings'>
                <div class='setting range'>
                    <a class="s-link" href="javascript: Settings.setMusicMuted(!Settings.getMusicMuted())">
                        <img id="musicimg" src=${musicMuted ? "/svg/music-muted.svg" : "/svg/music.svg"} />
                    </a>
                    <input type="range" min="0" max="100" value="${Settings.getMusicVolume()}" class="slider" id="music-volume" 
                    oninput="this.nextElementSibling.value = this.value" ${musicMuted ? "disabled" : ""}>
                    <output id="music-volume-output" style="${musicMuted ? "opacity: 0.5" : ""}">${Settings.getMusicVolume()}</output>
                </div>
                <div class='setting range'>
                    <a class="s-link" href="javascript: Settings.setSoundMuted(!Settings.getSoundMuted())">
                        <img id="soundimg" src=${soundMuted ? "/svg/sound-muted.svg" : "/svg/sound.svg"} />
                    </a>
                    <input type="range" min="0" max="100" value="${Settings.getSoundVolume()}" class="slider" id="sound-volume"
                    oninput="this.nextElementSibling.value = this.value" ${soundMuted ? "disabled" : ""}>
                    <output id="sound-volume-output" style="${soundMuted ? "opacity: 0.5" : ""}">${Settings.getSoundVolume()}</output>
                </div>
                <div id='now-playing'>
                    <span style="padding-right: 10px">NOW PLAYING:</span>
                        <span id="song-wrapper">
                            <span id="song-name" class="rm-pause">
                            <span id="song-author">N/A</span> - <span id="song-title">N/A</span>
                        </span
                    </span>
                </div>
                <div id='no-audio'>
                    <span>(Current page does not contain <span id="audio-type">audio</span>.)</span>
                </div>
            </div>

        </div>
        `;

        const musicVolumeSlider = document.getElementById("music-volume"); 
        const musicVolumeOutput = document.getElementById("music-volume-output");
        const soundVolumeSlider = document.getElementById("sound-volume"); 
        const soundVolumeOutput = document.getElementById("sound-volume-output");

        musicVolumeSlider?.addEventListener("input", () => {
            Settings.setMusicVolume(musicVolumeSlider.value);
        });
        soundVolumeSlider?.addEventListener("input", () => {
            Settings.setSoundVolume(soundVolumeSlider.value);
        });

        document.addEventListener("settingchanged", (e) => {
            // Update when music/sound is muted/unmuted
            if (e.detail.name == SettingType.MUSIC_MUTED) {
                const musicImgEl = document.getElementById("musicimg");
                musicImgEl.src = e.detail.value ? "/svg/music-muted.svg" : "/svg/music.svg";
                musicVolumeSlider.disabled = e.detail.value;
                musicVolumeOutput.style.opacity = e.detail.value ? 0.5 : 1;
            } else if (e.detail.name == SettingType.SOUND_MUTED) {
                const soundImgEl = document.getElementById("soundimg");
                soundImgEl.src = e.detail.value ? "/svg/sound-muted.svg" : "/svg/sound.svg";
                soundVolumeSlider.disabled = e.detail.value;
                soundVolumeOutput.style.opacity = e.detail.value ? 0.5 : 1;
            }
        });

        // Update reduced motion checkbox value on change
        const reducedMotionCheckEl = document.getElementById("reducedmotion");
        reducedMotionCheckEl?.addEventListener("click", () => {
            Settings.setReducedMotionSetting(reducedMotionCheckEl.checked);
        });
    }

    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.innerHTML = "";
        this.connectedCallback();
    }

    static toggleSettings() {
        const settingsEl = document.getElementById("settings");
        const settingsImgEl = document.getElementById("settingsimg");
        const settingsLinkEl = document.getElementById("settingslink");

        if (!settingsLinkEl) return;

        if (settingsLinkEl.classList.contains("s-active")) {
            settingsEl.style.right = '-340px';
            settingsImgEl.style.transform = 'rotateZ(180deg)';
            settingsLinkEl.classList.remove("s-active");
        } else {
            settingsEl.style.right = '0px';
            settingsImgEl.style.transform = 'none';
            settingsLinkEl.classList.add("s-active");
        }
    }
  }

  customElements.define('tool-bar', Toolbar);
  