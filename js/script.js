/**
 * Royal Indian Wedding Invitation — Mohit & Mansi
 * Date: 18 January 2027 · Venue: Kaka Place
 */

document.addEventListener("DOMContentLoaded", () => {

    // Dedicated WhatsApp Host Number for direct RSVPs
    const HOST_WHATSAPP_NUMBER = "918076469889";

    // Google Apps Script Web App URL for real-time global Google Sheet sync
    const GOOGLE_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzJvrNZ_Gz3qYxMwFUEUwMz-GXZPFmlo3BmowOqwAtLyOXEAZzzg5ZNq0C8iaU_qflD/exec"; 

    /* ========================================================
       1. CORE NAVIGATION & HERO OPEN
    ======================================================== */
    const openButton = document.getElementById("openInvitation");
    const invitationContent = document.getElementById("invitationContent");

    if (openButton && invitationContent) {
        openButton.addEventListener("click", () => {
            document.body.classList.add("invitation-open");

            invitationContent.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Trigger celebration petal burst on open
            triggerPetalBurst(40);

            // Start ambient Indian Shehnai / Raag music gently
            if (!audioState.hasInteracted) {
                toggleMusic(true);
            }
        });
    }


    /* ========================================================
       2. LIVE COUNTDOWN TIMER
       Target: 18 January 2027, 10:00:00 AM IST (UTC+5:30)
    ======================================================== */
    const targetWeddingDate = new Date("2027-01-18T10:00:00+05:30").getTime();

    const elDays = document.getElementById("countDays");
    const elHours = document.getElementById("countHours");
    const elMinutes = document.getElementById("countMinutes");
    const elSeconds = document.getElementById("countSeconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetWeddingDate - now;

        if (difference <= 0) {
            if (elDays) elDays.textContent = "00";
            if (elHours) elHours.textContent = "00";
            if (elMinutes) elMinutes.textContent = "00";
            if (elSeconds) elSeconds.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (elDays) elDays.textContent = String(days).padStart(2, "0");
        if (elHours) elHours.textContent = String(hours).padStart(2, "0");
        if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, "0");
        if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ========================================================
       3. ADD TO CALENDAR (iCal / Apple / Outlook)
    ======================================================== */
    const iCalBtn = document.getElementById("iCalBtn");
    if (iCalBtn) {
        iCalBtn.addEventListener("click", () => {
            const icsContent = [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "PRODID:-//Mohit and Mansi//Shubh Vivah Invitation//EN",
                "CALSCALE:GREGORIAN",
                "METHOD:PUBLISH",
                "BEGIN:VEVENT",
                "UID:mohit-mansi-wedding-2027@mohitdeshwal.com",
                "DTSTAMP:20261027T000000Z",
                "DTSTART:20270117T043000Z",
                "DTEND:20270118T183000Z",
                "SUMMARY:॥ शुभ विवाह ॥ Mohit & Mansi Wedding Festivities",
                "DESCRIPTION:Join us for the auspicious wedding celebrations of Mohit & Mansi! Festivities begin 17 January (Haldi, Mandha, Mehndi, DJ Night) and Shubh Vivah on 18 January 2027 at Kaka Place.",
                "LOCATION:Kaka Place",
                "STATUS:CONFIRMED",
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\r\n");

            const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "mohit-mansi-shubh-vivah.ics");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("📅 Shubh Vivah added to Calendar!");
        });
    }


    /* ========================================================
       4. AMBIENT TRADITIONAL INDIAN WEDDING SHEHNAI & SITAR HARMONY
       Synthesized Raag Bhairavi / Kalyani auspicious Indian notes
       using Web Audio API (zero audio file dependencies, instant, works offline).
    ======================================================== */
    const audioState = {
        ctx: null,
        isPlaying: false,
        timer: null,
        droneTimer: null,
        hasInteracted: false
    };

    // Indian Classical Raag Yaman / Bhairavi notes (Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa)
    const indianNotes = [
        261.63, // Sa  (C4)
        293.66, // Re  (D4)
        329.63, // Ga  (E4)
        369.99, // Tivra Ma (F#4)
        392.00, // Pa  (G4)
        440.00, // Dha (A4)
        493.88, // Ni  (B4)
        523.25, // Taar Sa (C5)
        587.33, // Taar Re (D5)
        659.25  // Taar Ga (E5)
    ];

    // Traditional auspicious wedding Shehnai melody curve
    const shehnaiPattern = [0, 2, 4, 3, 4, 6, 7, 6, 7, 9, 7, 6, 4, 2, 0, 4, 7, 4, 0];
    let melodyIndex = 0;

    function playIndianShehnaiNote(freq) {
        if (!audioState.ctx) return;

        try {
            // Main melodic reed oscillator (Shehnai/Sitar tone)
            const osc = audioState.ctx.createOscillator();
            const gain = audioState.ctx.createGain();

            // Harmonic overtone for that rich Indian wedding Shehnai buzz
            const subOsc = audioState.ctx.createOscillator();
            const subGain = audioState.ctx.createGain();

            osc.type = "triangle";
            subOsc.type = "sawtooth";

            const now = audioState.ctx.currentTime;
            osc.frequency.setValueAtTime(freq, now);
            // Meend / Gamak (gentle pitch bend characteristic of Indian classical)
            osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.15);
            osc.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

            subOsc.frequency.setValueAtTime(freq * 0.5, now);

            // Pluck and sustain envelope
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.065, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

            subGain.gain.setValueAtTime(0.0001, now);
            subGain.gain.linearRampToValueAtTime(0.015, now + 0.08);
            subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            osc.connect(gain);
            subOsc.connect(subGain);
            gain.connect(audioState.ctx.destination);
            subGain.connect(audioState.ctx.destination);

            osc.start(now);
            subOsc.start(now);
            osc.stop(now + 1.65);
            subOsc.stop(now + 1.65);
        } catch (e) {
            console.warn("Audio note error", e);
        }
    }

    function toggleMusic(forcePlay = null) {
        audioState.hasInteracted = true;
        const shouldPlay = forcePlay !== null ? forcePlay : !audioState.isPlaying;

        if (shouldPlay) {
            if (!audioState.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    audioState.ctx = new AudioContext();
                }
            }

            if (audioState.ctx && audioState.ctx.state === "suspended") {
                audioState.ctx.resume();
            }

            audioState.isPlaying = true;
            document.body.classList.add("music-playing");

            if (!audioState.timer) {
                melodyIndex = 0;
                audioState.timer = setInterval(() => {
                    if (audioState.isPlaying && audioState.ctx) {
                        const noteIdx = shehnaiPattern[melodyIndex % shehnaiPattern.length];
                        playIndianShehnaiNote(indianNotes[noteIdx]);
                        melodyIndex++;
                    }
                }, 440);
            }
            showToast("🎶 मंगल शहनाई धुन (Shehnai Music Playing)");
        } else {
            audioState.isPlaying = false;
            document.body.classList.remove("music-playing");
            if (audioState.timer) {
                clearInterval(audioState.timer);
                audioState.timer = null;
            }
            showToast("🔇 Music muted");
        }
    }

    const musicToggle = document.getElementById("musicToggle");
    if (musicToggle) {
        musicToggle.addEventListener("click", () => toggleMusic());
    }


    /* ========================================================
       5. INTERACTIVE VIBRANT MARIGOLD (GENDA PHOOL) & ROSE PETAL SHOWER
       Traditional vibrant red rose, yellow genda, orange genda petals falling
    ======================================================== */
    const canvas = document.getElementById("petalCanvas");
    let ctx = canvas ? canvas.getContext("2d") : null;
    let petals = [];

    // Indian Wedding colors: Genda Phool Orange, Haldi Yellow, Deep Sindoor Red, Zari Gold
    const petalColors = [
        "rgba(232, 93, 4, 0.85)",    // Genda Phool Orange
        "rgba(244, 162, 97, 0.9)",   // Haldi Ochre Yellow
        "rgba(193, 18, 31, 0.85)",   // Gulab / Sindoor Red
        "rgba(212, 175, 55, 0.8)",   // Shahi Zari Gold
        "rgba(255, 183, 3, 0.9)"     // Sunshine Yellow Genda
    ];

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Petal {
        constructor(isBurst = false) {
            this.reset(isBurst);
        }

        reset(isBurst = false) {
            this.x = Math.random() * (canvas ? canvas.width : 500);
            this.y = isBurst ? Math.random() * (canvas ? canvas.height * 0.4 : 200) : -25;
            this.size = Math.random() * 10 + 7;
            this.speedY = Math.random() * 1.6 + 0.9;
            this.speedX = (Math.random() - 0.5) * 1.4;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.04;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.flip = Math.random();
            this.flipSpeed = Math.random() * 0.035;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.angle) * 1.1 + this.speedX;
            this.angle += this.rotationSpeed;
            this.flip += this.flipSpeed;

            if (canvas && this.y > canvas.height + 25) {
                this.reset();
            }
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.scale(1, Math.cos(this.flip));

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size * 1.3);
            ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize initial ambient petals
    const AMBIENT_COUNT = 28;
    for (let i = 0; i < AMBIENT_COUNT; i++) {
        const p = new Petal();
        p.y = Math.random() * (canvas ? canvas.height : 800);
        petals.push(p);
    }

    function triggerPetalBurst(count = 45) {
        for (let i = 0; i < count; i++) {
            petals.push(new Petal(true));
        }
        if (petals.length > 95) {
            petals = petals.slice(petals.length - 95);
        }
    }

    function animatePetals() {
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < petals.length; i++) {
                petals[i].update();
                petals[i].draw();
            }
        }
        requestAnimationFrame(animatePetals);
    }

    animatePetals();

    const petalBtn = document.getElementById("petalBtn");
    if (petalBtn) {
        petalBtn.addEventListener("click", () => {
            triggerPetalBurst(40);
            showToast("🌺 वर-वधू पर पुष्प वर्षा (Shower of Blessings)!");
        });
    }


    /* ========================================================
       6. BLESSINGS WALL & RSVP GUESTBOOK (आशीर्वाद दीवार)
       Connected to Google Sheets Web App
    ======================================================== */
    const STORAGE_KEY = "mohit_mansi_wedding_wishes";

    function loadLocalWishes() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    function saveWishesToStorage(wishesList) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(wishesList));
        } catch (e) {
            console.warn("Could not save to localStorage", e);
        }
    }

    function renderWishes(wishesToDisplay) {
        const stream = document.getElementById("wishesStream");
        const countBadge = document.getElementById("wishesCount");
        if (!stream) return;

        const currentWishes = wishesToDisplay !== undefined ? wishesToDisplay : loadLocalWishes();
        
        if (countBadge) {
            countBadge.textContent = `${currentWishes.length} ${currentWishes.length === 1 ? 'Wish' : 'Wishes'}`;
        }

        if (!currentWishes || currentWishes.length === 0) {
            stream.innerHTML = `
                <div class="empty-wishes-placeholder" style="text-align:center; padding:35px 15px;">
                    <p style="font-family:'Rozha One','Cormorant Garamond',serif; font-size:17px; color:var(--royal-crimson); line-height:1.8;">
                        नव-दम्पति मोहित व मानसी को सर्वप्रथम आशीर्वाद व स्नेह प्रदान करें! 🪔✨
                    </p>
                </div>
            `;
            return;
        }

        stream.innerHTML = currentWishes.map(item => `
            <article class="wish-item">
                <div class="wish-head">
                    <span class="wish-author">${escapeHTML(item.name)}</span>
                    <span class="wish-status">${escapeHTML(item.status)}</span>
                </div>
                <p class="wish-msg">"${escapeHTML(item.msg)}"</p>
            </article>
        `).join("");
    }

    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initial render from local cache
    renderWishes();

    // Fetch live wishes directly from Google Sheet on page load
    if (GOOGLE_SHEET_ENDPOINT) {
        fetch(GOOGLE_SHEET_ENDPOINT)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    renderWishes(data);
                    saveWishesToStorage(data);
                }
            })
            .catch(err => console.log("Google Sheets sync offline, using local data", err));
    }

    // Form Interactions
    const saveWishBtn = document.getElementById("saveWishBtn");
    const whatsappRsvpBtn = document.getElementById("whatsappRsvpBtn");
    const inputName = document.getElementById("guestName");
    const inputStatus = document.getElementById("attendanceStatus");
    const inputCount = document.getElementById("guestCount");
    const inputMessage = document.getElementById("guestMessage");

    if (saveWishBtn) {
        saveWishBtn.addEventListener("click", () => {
            const name = (inputName ? inputName.value : "").trim();
            const msg = (inputMessage ? inputMessage.value : "").trim();
            const status = inputStatus ? inputStatus.value : "Joyfully Attending";
            const count = inputCount ? inputCount.value : "2";

            if (!name) {
                showToast("कृपया अपना नाम लिखें (Please enter your name)");
                if (inputName) inputName.focus();
                return;
            }

            if (!msg) {
                showToast("कृपया आशीर्वाद व शुभकामनाएं लिखें (Please write blessings)");
                if (inputMessage) inputMessage.focus();
                return;
            }

            const newWish = { name, status, msg };
            const current = loadLocalWishes();
            current.unshift(newWish);

            saveWishesToStorage(current);
            renderWishes(current);
            triggerPetalBurst(35);
            showToast("✨ आशीर्वाद दर्ज हो गया! WhatsApp द्वारा मोहित को सूचित करें!");

            // Send to Google Sheet in background
            if (GOOGLE_SHEET_ENDPOINT) {
                try {
                    fetch(GOOGLE_SHEET_ENDPOINT, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, status, count, msg, timestamp: new Date().toISOString() })
                    }).catch(e => console.log("Google Sheet sync error", e));
                } catch (e) {}
            }

            if (inputMessage) inputMessage.value = "";
        });
    }

    // WhatsApp Direct RSVP to Mohit
    if (whatsappRsvpBtn) {
        whatsappRsvpBtn.addEventListener("click", () => {
            const name = (inputName ? inputName.value : "").trim() || "Guest (अतिथि)";
            const status = inputStatus ? inputStatus.value : "Joyfully Attending (सपरिवार पधारेंगे)";
            const count = inputCount ? inputCount.value : "2";
            const msg = (inputMessage ? inputMessage.value : "").trim() || "मोहित व मानसी को वैवाहिक जीवन की हार्दिक बधाई व अनंत शुभकामनाएं!";

            const text = `🪔 *॥ शुभ विवाह निमंत्रण पुष्टि (RSVP) — मोहित एवं मानसी ॥* 🪔\n\n` +
                         `*अतिथि का नाम (Name):* ${name}\n` +
                         `*उपस्थिति (Status):* ${status}\n` +
                         `*सदस्यों की संख्या (Guests):* ${count}\n` +
                         `*आशीर्वाद व संदेश (Blessings):* "${msg}"\n\n` +
                         `काका प्लेस में आपके साथ उत्सव मनाने की प्रतीक्षा में! 🌸`;

            const encoded = encodeURIComponent(text);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${HOST_WHATSAPP_NUMBER}&text=${encoded}`;
            window.open(whatsappUrl, "_blank");
        });
    }


    /* ========================================================
       7. SHARING & COPY LINK
    ======================================================== */
    const shareData = {
        title: "॥ शुभ विवाह ॥ Mohit & Mansi Wedding Invitation",
        text: "मोहित एवं मानसी के पावन वैवाहिक उत्सव में आपका स्नेहपूर्वक स्वागत है — 17 व 18 जनवरी 2027, काका प्लेस।",
        url: window.location.href
    };

    function handleShare() {
        if (navigator.share) {
            navigator.share(shareData).catch(() => copyToClipboard());
        } else {
            copyToClipboard();
        }
    }

    function copyToClipboard() {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showToast("📋 Shubh Nimantran link copied!");
            }).catch(() => {
                showToast("Invitation URL: " + url);
            });
        } else {
            showToast("Invitation URL: " + url);
        }
    }

    const copyLinkBtn = document.getElementById("copyLinkBtn");
    const shareTopBtn = document.getElementById("shareTopBtn");
    const whatsappShareBtn = document.getElementById("whatsappShareBtn");

    if (copyLinkBtn) copyLinkBtn.addEventListener("click", copyToClipboard);
    if (shareTopBtn) shareTopBtn.addEventListener("click", handleShare);

    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener("click", () => {
            const shareText = `🪔 *॥ श्री गणेशाय नमः ॥* 🪔\n` +
                              `*॥ शुभ विवाह निमंत्रण — मोहित संग मानसी ॥*\n\n` +
                              `परमपिता परमात्मा की असीम कृपा से हमारे वैवाहिक उत्सव (17 व 18 जनवरी 2027, काका प्लेस) पर आप सपरिवार सादर आमंत्रित हैं।\n\n` +
                              `डिजिटल पत्रिका व उपस्थिति सूचना (RSVP) यहाँ देखें:\n` +
                              `${window.location.href}`;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
        });
    }


    /* ========================================================
       8. TOAST NOTIFICATIONS HELPER
    ======================================================== */
    let toastTimeout = null;
    function showToast(message) {
        const toast = document.getElementById("toastNotification");
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3400);
    }

});
