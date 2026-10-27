# Mohit & Mansi — Wedding Invitation Website

A luxury, interactive digital wedding invitation for **Mohit & Mansi** celebrating their auspicious union on **18 January 2027** at **Kaka Place**.

Live Website: [https://mohit01-beep.github.io/mohit-mansi-wedding/](https://mohit01-beep.github.io/mohit-mansi-wedding/)

---

## ✨ Features & Enhancements

1. **Royal Heritage Theme & Typography**
   - Palette: Deep Royal Maroon (`#57282f`), Champagne Gold (`#a48650`), and Warm Ivory (`#f5f0e7`).
   - Cormorant Garamond & DM Sans typography with traditional corner ornaments.
   - Traditional Sanskrit Shloka: *॥ श्री गणेशाय नमः ॥* and *मंगलम् भगवान विष्णुः...*

2. **Interactive Petal Shower (60fps Canvas)**
   - Falling marigold and rose petals drifting naturally across the screen.
   - Interactive "Shower Blessings 🌸" button for guests to shower celebration petals.

3. **Live Royal Countdown Clock**
   - Live Days, Hours, Minutes, and Seconds counting down to 18 January 2027.

4. **1-Click "Add to Calendar"**
   - Direct Google Calendar sync with event description and venue.
   - 1-click download of `.ics` file for Apple Calendar, Outlook, and mobile devices.

5. **Complete Celebrations Itinerary (17 & 18 January 2027)**
   - **Haldi** (17 Jan, 10:00 AM) — *Yellows & Mustard Gold*
   - **Mandha** (17 Jan, 02:00 PM) — *Pastels & Traditional Wear*
   - **Mehndi** (17 Jan, 05:00 PM) — *Henna Greens & Floral*
   - **DJ Night** (17 Jan, 08:00 PM) — *Glamour & Indo-Western*
   - **The Wedding** (18 Jan, 07:00 PM) — *Royal Maroon, Pastel & Gold*
   - Each event features an attire color palette guide for guests.

6. **Venue & Navigation (Kaka Place)**
   - Dedicated venue card with travel information and direct Google Maps navigation link.

7. **Digital Blessings Wall & RSVP Guestbook**
   - Guests can leave warm heartfelt wishes that appear instantly on the Blessings Wall.
   - Preserved locally via browser storage (`localStorage`).
   - "Confirm via WhatsApp" generates a prefilled WhatsApp RSVP message for quick family coordination.

8. **Ambient Procedural Audio Experience**
   - Built-in Web Audio API romantic harp/sitar-like pentatonic arpeggio chords.
   - Zero external audio file download failure.
   - Floating audio toggle with animated soundwave visualizer.

9. **Social Sharing & Save the Date**
   - Official hashtags: `#MohitWedsMansi` & `#MM2027`.
   - Web Share API for mobile native sharing and one-click link copying with toast notifications.

---

## 🛠️ Personalization Guide

- **Custom Wedding Times/Details**: Update the times in `index.html` under the `<section class="events">`.
- **Target Countdown Date**: Update the ISO date string in `js/script.js` (`targetWeddingDate = new Date("2027-01-18T10:00:00+05:30")`).
- **Venue Google Maps Link**: Update the `href` in `#venueSection` in `index.html` with your exact Google Maps pin URL.
