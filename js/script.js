/**
 * Royal Wedding Invitation — Mohit & Mansi
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
            triggerPetalBurst(30);

            // Start ambient music gently if user hasn't explicitly disabled it
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
        const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
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
                "PRODID:-//Mohit and Mansi//Wedding Invitation//EN",
                "CALSCALE:GREGORIAN",
                "METHOD:PUBLISH",
                "BEGIN:VEVENT",
                "UID:mohit-mansi-wedding-2027@mohitdeshwal.com",
                "DTSTAMP:20261027T000000Z",
                "DTSTART:20270117T043000Z",
                "DTEND:20270118T183000Z",
                "SUMMARY:Mohit & Mansi Wedding Festivities",
                "DESCRIPTION:Join us for the wedding celebrations of Mohit & Mansi! Festivities begin 17 January (Haldi, Mandha, Mehndi, DJ Night) and Wedding on 18 January 2027 at Kaka Place.",
                "LOCATION:Kaka Place",
                "STATUS:CONFIRMED",
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\r\n");

            const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "mohit-mansi-wedding.ics");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("📅 Calendar event downloaded!");
        });
    }


    /* ========================================================
       4. AMBIENT PROCEDURAL WEDDING MUSIC (Web Audio API)
       Pure synthesized tranquil acoustic arpeggio (Bhairavi / Pentatonic)
       Zero audio file dependency, zero broken links, works anywhere.
    ======================================================== */
    const audioState = {
        ctx: null,
        isPlaying: false,
        timer: null,
        hasInteracted: false
    };

    const notes = [
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
        587.33, // D5
        659.25  // E5
    ];

    const melodyPattern = [0, 2, 4, 3, 5, 4, 2, 1, 0, 3, 5, 7, 5, 4, 2, 0];
    let melodyIndex = 0;

    function playSoftHarpNote(freq) {
        if (!audioState.ctx) return;

        try {
            const osc = audioState.ctx.createOscillator();
            const gain = audioState.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, audioState.ctx.currentTime);

            // Delicate acoustic plucked harp envelope
            gain.gain.setValueAtTime(0.001, audioState.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.06, audioState.ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioState.ctx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(audioState.ctx.destination);

            osc.start();
            osc.stop(audioState.ctx.currentTime + 1.9);
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
                        const noteIdx = melodyPattern[melodyIndex % melodyPattern.length];
                        playSoftHarpNote(notes[noteIdx]);
                        melodyIndex++;
                    }
                }, 480);
            }
            showToast("🎵 Ambient wedding music playing");
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
       5. INTERACTIVE PETAL SHOWER CANVAS
       Lightweight 60fps marigold & rose petals falling
    ======================================================== */
    const canvas = document.getElementById("petalCanvas");
    let ctx = canvas ? canvas.getContext("2d") : null;
    let petals = [];

    const petalColors = [
        "rgba(214, 64, 69, 0.75)",   // Rose Crimson
        "rgba(244, 162, 97, 0.75)",  // Marigold Orange
        "rgba(233, 196, 106, 0.75)", // Golden Amber
        "rgba(197, 173, 125, 0.8)",  // Champagne Gold
        "rgba(224, 122, 95, 0.75)"   // Coral Rose
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
            this.y = isBurst ? Math.random() * (canvas ? canvas.height * 0.4 : 200) : -20;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.flip = Math.random();
            this.flipSpeed = Math.random() * 0.03;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.angle) * 0.8 + this.speedX;
            this.angle += this.rotationSpeed;
            this.flip += this.flipSpeed;

            if (canvas && this.y > canvas.height + 20) {
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
            ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size * 1.2);
            ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize initial ambient petals
    const AMBIENT_COUNT = 22;
    for (let i = 0; i < AMBIENT_COUNT; i++) {
        const p = new Petal();
        p.y = Math.random() * (canvas ? canvas.height : 800);
        petals.push(p);
    }

    function triggerPetalBurst(count = 35) {
        for (let i = 0; i < count; i++) {
            petals.push(new Petal(true));
        }
        if (petals.length > 80) {
            petals = petals.slice(petals.length - 80);
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
            triggerPetalBurst(35);
            showToast("🌸 Showering blessings upon Mohit & Mansi!");
        });
    }


    /* ========================================================
       6. BLESSINGS WALL & RSVP GUESTBOOK
       Connected to Google Sheets Web App + LocalStorage Cache
    ======================================================== */
    const defaultWishes = [
        {
            name: "Rohit & Priya Deshwal",
            status: "Joyfully Attending",
            msg: "Wishing Mohit & Mansi a lifetime of endless joy, laughter, and togetherness! Looking forward to dancing our hearts out at the DJ Night! 💛"
        },
        {
            name: "Sharma Family",
            status: "Attending with Family",
            msg: "Heartiest congratulations to both families. May God shower His choicest blessings upon this royal union with harmony and peace."
        },
        {
            name: "Ankit & Neha",
            status: "Joyfully Attending",
            msg: "Can't wait to celebrate the big day at Kaka Place! You two are truly made for each other. Lots of love and hugs! ✨"
        }
    ];

    const STORAGE_KEY = "mohit_mansi_wedding_wishes";

    function loadLocalWishes() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : defaultWishes;
        } catch (e) {
            return defaultWishes;
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

        const currentWishes = wishesToDisplay || loadLocalWishes();
        if (countBadge) {
            countBadge.textContent = `${currentWishes.length} ${currentWishes.length === 1 ? 'Wish' : 'Wishes'}`;
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

    // Fetch live wishes from Google Sheet on page load
    if (GOOGLE_SHEET_ENDPOINT) {
        fetch(GOOGLE_SHEET_ENDPOINT)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Combine Google Sheet rows with default pre-seeded wishes if fewer than 3
                    const combined = [...data];
                    defaultWishes.forEach(dw => {
                        if (!combined.some(c => c.name === dw.name && c.msg === dw.msg)) {
                            combined.push(dw);
                        }
                    });
                    renderWishes(combined);
                    saveWishesToStorage(combined);
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
                showToast("Please enter your name!");
                if (inputName) inputName.focus();
                return;
            }

            if (!msg) {
                showToast("Please write a warm blessing note!");
                if (inputMessage) inputMessage.focus();
                return;
            }

            const newWish = { name, status, msg };
            const current = loadLocalWishes();
            current.unshift(newWish);

            saveWishesToStorage(current);
            renderWishes(current);
            triggerPetalBurst(25);
            showToast("✨ Blessing added! Tap WhatsApp to notify Mohit!");

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

            // Clear input message
            if (inputMessage) inputMessage.value = "";
        });
    }

    // WhatsApp Direct RSVP to Mohit
    if (whatsappRsvpBtn) {
        whatsappRsvpBtn.addEventListener("click", () => {
            const name = (inputName ? inputName.value : "").trim() || "Guest";
            const status = inputStatus ? inputStatus.value : "Joyfully Attending";
            const count = inputCount ? inputCount.value : "2";
            const msg = (inputMessage ? inputMessage.value : "").trim() || "Heartiest congratulations to Mohit & Mansi!";

            const text = `✨ *Wedding RSVP — Mohit & Mansi* ✨\n\n` +
                         `*Name:* ${name}\n` +
                         `*Status:* ${status}\n` +
                         `*Number of Guests:* ${count}\n` +
                         `*Wishes & Blessings:* "${msg}"\n\n` +
                         `Looking forward to celebrating with you at Kaka Place! 🌸`;

            const encoded = encodeURIComponent(text);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${HOST_WHATSAPP_NUMBER}&text=${encoded}`;
            window.open(whatsappUrl, "_blank");
        });
    }


    /* ========================================================
       7. SHARING & COPY LINK
    ======================================================== */
    const shareData = {
        title: "Mohit & Mansi Wedding Invitation",
        text: "Celebrate the wedding festivities of Mohit & Mansi on 18 January 2027 at Kaka Place!",
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
                showToast("📋 Invitation link copied to clipboard!");
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
            const shareText = `💍 *Mohit & Mansi are getting married!* 💍\n\n` +
                              `Join us in celebrating the beginning of our forever on 17 & 18 January 2027 at Kaka Place.\n\n` +
                              `View full invitation & RSVP here: ${window.location.href}`;
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
        }, 3200);
    }

});
