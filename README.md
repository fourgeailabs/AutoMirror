# AutoMirror for Android Auto

> **Full-Screen Live Phone Mirroring & Touch Relay for Android Auto Vehicle Head Units**  
> Developed by **[FourgeAI LABS](https://github.com/fourgeailabs)**  
> **Application ID:** `com.fourgeailabs.automirror`  
> **Current Version:** `1.03.00` (VersionCode: `4`)  
> **License:** FOURGEAI LABS PROPRIETARY SOFTWARE LICENSE Version 1.0  

---

## Overview

**AutoMirror** is a high-performance Android application built specifically for **Android Auto** (projected from an Android phone onto vehicle infotainment screens, *not* Android Automotive OS standalone). 

It empowers drivers and passengers to **mirror their entire Android phone screen live directly onto their vehicle's dashboard display**, taking over the entire display edge-to-edge without restrictive borders, pillarboxing, or letterboxing.

---

## Visual Branding & App Icon (v1.03.00)

AutoMirror features a **badass feminine lavender-centric app icon** on Android Auto and the phone launcher:
- **Stylized Chrome Cyber Wings & Emblem**: Sleek metallic chrome wings framing a central faceted diamond mirror crest with glowing lavender and deep violet neon accents.
- **Dark Carbon Fiber Texture**: Textured background built for luxury and high-tech automotive cockpits.
- **Lavender Neon Highlights**: Rendered as vector assets (`ic_launcher.xml` and `automirror_lavender_icon.svg`) for maximum sharpness at any DPI on vehicle infotainment screens.

---

## Phone Companion Control Center

The phone side contains comprehensive control settings menus and driving configurations:

1. **One-Tap Live Projection Controller**: Immediate screen capture start/stop with live stream metrics (FPS, resolution, latency).
2. **Vehicle Aspect Ratio Preset Menu**:
   - **24:9 Panoramic Ultrawide** (2880x1080 / 1920x720) — *Default*
   - **21:9 Ultrawide** (2560x1080)
   - **16:9 Standard Widescreen** (1920x1080)
   - **4:3 Portrait Tablet** (Subaru/Volvo)
   - **Full Window Fill**
3. **Hardware Streaming & Performance Tuning**:
   - Framerate switch (60 FPS Ultra-Smooth vs 30 FPS Power-Saver)
   - Hardware Bitrate slider (4 Mbps to 25 Mbps)
   - H.264 / HEVC hardware virtual display pipeline
4. **Bi-Directional Touch Relay (Accessibility)**:
   - Full coordinate translation from car touchscreen back to phone
   - Tap and gesture forwarder with sub-10ms response
5. **Vehicle Audio Pass-Through**:
   - Stream phone internal audio to car stereo system via Android 10+ audio playback capture
6. **In-Motion Driver Distraction Exemption**:
   - Categorized under `androidx.car.app.category.NAVIGATION` with `distractionOptimized="true"` to prevent driving locks.
7. **Power & Screen Safeguards**:
   - Keep Phone Awake (`SCREEN_DIM_WAKE_LOCK`)
   - Dim Phone Screen while vehicle display remains at 100% brightness
   - Auto-launch on Android Auto USB connection
8. **What's New Menu**:
   - Single-open accordion dropdown displaying the latest update and historical release logs.
9. **About Section**:
   - Links to creator **FourgeAI LABS** (`https://github.com/fourgeailabs`), version 1.03.00, package `com.fourgeailabs.automirror`, and GitHub repository link.

---

## Architecture & How It Works

```
+--------------------------------------------------------------------------+
|                              ANDROID PHONE                               |
|                                                                          |
|   +---------------------+        +-----------------------------------+   |
|   |   Phone Display     |        |    MirrorProjectionService        |   |
|   |  (Apps, Video, Maps)| -----> | (MediaProjection + VirtualDisplay)|   |
|   +---------------------+        +-----------------+-----------------+   |
|              ^                                     |                     |
|              | Gesture Dispatch                    | Native 24:9         |
|              |                                     | Stream              |
|   +----------+-------------+                       v                     |
|   | TouchAccessibilitySvc  |             +---------+----------+          |
|   | (Coordinates Mapping)  |             |  AutoMirrorScreen  |          |
|   +------------------------+             | (SurfaceCallback)  |          |
|              ^                           +---------+----------+          |
+--------------|-------------------------------------|---------------------+
               |                                     |
               | Touch Taps / Swipes                 | USB / AAWireless Video
               |                                     v
+--------------+-------------------------------------+---------------------+
|                      ANDROID AUTO VEHICLE HEAD UNIT                      |
|                                                                          |
|     +-------------------------------------------------------------+      |
|     |     24:9 Panoramic Edge-to-Edge Live Screen Takeover        |      |
|     +-------------------------------------------------------------+      |
+--------------------------------------------------------------------------+
```

---

## Installation & Android Auto Activation

Because Google restricts 3rd-party screen mirroring apps on Google Play, install the APK using one of the established methods:

### Method 1: Using KingInstaller or AAAD (Recommended for Non-Root)
1. Download the latest release `AutoMirror-1.03.00-release.apk` from the [Releases](https://github.com/fourgeailabs) section.
2. Install via **KingInstaller** or **AAAD** (Android Auto Apps Downloader) with the package installer flag enabled.
3. Open **Android Auto Settings** on your phone:
   - Tap **Version** 10 times to enable **Developer Settings**.
   - Tap the 3 dots in the top right -> **Developer settings**.
   - Check **Unknown sources**.
4. Launch **AutoMirror** on your phone, grant **MediaProjection** and **Accessibility** permissions, and plug into your car!

### Method 2: Testing with Google Desktop Head Unit (DHU)
1. In Android Auto Developer settings, tap **Start head unit server**.
2. Run `adb forward tcp:5277 tcp:5277`.
3. Launch Google DHU: `./desktop-head-unit` on your PC.
4. AutoMirror will appear on the DHU screen and immediately stream your phone's display without speed restrictions.

---

## Release History & What's New

### Version 1.03.00 (Current Production Release)
- **Badass Feminine Lavender App Icon**: Added custom chrome cyber wings and violet neon emblem vector icon for Android Auto head unit and phone launcher.
- **Phone Companion Control Center**: Added full control settings menus on the phone side (video quality, 24:9 aspect ratio, touch relay, audio pass-through, wake lock, dimming).
- **Lavender Aesthetic Theming**: Styled phone dashboard with velvet dark surfaces, glowing lavender accents, and high-contrast typography.
- **Incremented Versioning**: Updated `versionCode` to 4 and `versionName` to `1.03.00`.

### Version 1.02.00
- **24:9 Aspect Ratio Support**: Added native support for 24:9 super ultrawide automotive displays (2880x1080 / 1920x720 / 3840x1440 panoramic cockpits) with edge-to-edge projection and zero pillarboxing.
- **Surface Matrix Alignment**: Configured `VirtualDisplay` to dynamically adapt to 24:9 aspect geometry.

### Version 1.01.00
- **Driver Distraction Exemption**: Declared `distractionOptimized="true"` and categorized under `androidx.car.app.category.NAVIGATION`, ensuring the stream continues uninterrupted while the vehicle is in motion (driving at speed).
- **Stripped Redundant UI Clutter**: Removed extraneous buttons, secondary template layers, and menus from the automotive projection surface for clean, 100% full-screen screen capture.
- **Direct 1-Tap Trigger**: Streamlined phone companion UI to directly initiate and manage screen projection without distraction.
- **Connection Broadcast Receiver (`AutoConnectionReceiver.kt`)**: Added receiver for `CAR_CONNECTION_STATE` broadcasts.

### Version 1.00.00
- **Full-Screen Takeover**: Native `NavigationTemplate` surface pipeline providing edge-to-edge mirroring without bezel cutoffs.
- **MediaProjection Service**: Real-time 60 FPS hardware-accelerated video rendering.
- **Touch Relay**: Bi-directional input forwarder using Android Accessibility gestures.
- **Automated CI/CD**: GitHub Actions workflow (`.github/workflows/build.yml`) generating signed release APKs with consistent keystore.

---

## About & Creator

- **App Name**: AutoMirror
- **Package ID**: `com.fourgeailabs.automirror`
- **Created by**: **FourgeAI LABS**
- **Creator GitHub**: [https://github.com/fourgeailabs](https://github.com/fourgeailabs)
- **App Repository**: [https://github.com/fourgeailabs/AutoMirror](https://github.com/fourgeailabs/AutoMirror)

---

## License

This software is released under the **FOURGEAI LABS PROPRIETARY SOFTWARE LICENSE Version 1.0**.  
See the [LICENSE](LICENSE) file for complete details.  
Copyright © 2026 FourgeAI Labs / FourgeMan. All Rights Reserved.
