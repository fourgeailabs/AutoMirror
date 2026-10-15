import { ReleaseNote } from '../types';

export const CURRENT_VERSION = '1.04.00';
export const CURRENT_VERSION_CODE = 5;
export const CREATOR_NAME = 'FourgeAI LABS';
export const CREATOR_GITHUB_URL = 'https://github.com/fourgeailabs';
export const APP_ID = 'com.fourgeailabs.automirror';
export const APP_REPO_URL = 'https://github.com/fourgeailabs/AutoMirror';

export const HISTORICAL_RELEASES: ReleaseNote[] = [
  {
    version: '1.04.00',
    date: 'October 2026',
    title: 'CI/CD Build.yml Overhaul & Zero-Failure APK Pipeline',
    highlights: [
      'Fixed GitHub Actions workflow (.github/workflows/build.yml) using official gradle/actions/setup-gradle@v4 with Gradle 8.7.',
      'Automated keystore restoration from app/debug.keystore.base64 to prevent CI signature failures.',
      'Added executable ./gradlew wrapper script for deterministic compilation on Linux runners.',
      'Hardened release artifact staging to reliably package and publish AutoMirror-1.04.00-release.apk to GitHub Releases.',
      'Bumping version code to 5 and version name to 1.04.00 per release rules.'
    ],
    notes: 'Major CI/CD fix resolving GitHub Actions workflow execution, ensuring automated, repeatable APK compilation and release deployment.'
  },
  {
    version: '1.03.00',
    date: 'October 2026',
    title: 'Badass Lavender Icon & Complete Phone Control Center',
    highlights: [
      'Badass Feminine Lavender App Icon: Cyber chrome wings with radiant lilac and lavender neon accents on dark velvet carbon fiber for Android Auto and phone launcher.',
      'Comprehensive Phone Companion Menus: Complete settings suite on the phone side including hardware framerate (60/30 FPS), bitrate slider (4-25 Mbps), audio routing, and wake lock.',
      'Touch Relay Calibration: Real-time touch coordinate translation from vehicle screen back to phone via Accessibility Service.',
      'Lavender Aesthetic Theme: High-contrast luxury automotive UI styling with lavender glow and velvet surfaces.'
    ],
    notes: 'Major update delivering a badass feminine lavender app icon for Android Auto alongside all phone companion control settings menus.'
  },
  {
    version: '1.02.00',
    date: 'October 2026',
    title: '24:9 Panoramic Ultrawide Aspect Ratio Engine',
    highlights: [
      'Native 24:9 Aspect Ratio: Full-bleed projection tailored for 24:9 panoramic automotive displays (2880x1080 / 1920x720 / 3840x1440).',
      'Zero Pillarboxing: Phone screen projection maps horizontally across ultra-wide car cockpits without black borders.',
      'Surface Geometry Calibration: VirtualDisplay projection matrix auto-aligns to 24:9 surface containers.',
      'Touch Normalization: Calibrated touch relay coordinates for 24:9 screen dimensions.'
    ],
    notes: 'Delivered native 24:9 panoramic aspect ratio support for super-ultrawide Android Auto vehicle screens.'
  },
  {
    version: '1.01.00',
    date: 'October 2026',
    title: 'Driver Distraction Exemption & Straight Screen Capture Overhaul',
    highlights: [
      'Driver Distraction Exemption: Declared distractionOptimized="true" in manifest and services.',
      'Navigation Category Exemption: Configured under androidx.car.app.category.NAVIGATION so video streaming continues completely unhindered while the vehicle is driving in motion.',
      'Stripped all redundant buttons and secondary UI templates from the car surface to provide 100% pure screen capture.',
      'Added AutoConnectionReceiver.kt for automated car connection broadcast handling.'
    ],
    notes: 'Major update ensuring Android Auto treats the app as driving-safe (navigation-class surface), eliminating "disabled while driving" speed locks and stripping out all unnecessary UI clutter for a direct, unobstructed live mirror.'
  },
  {
    version: '1.00.00',
    date: 'October 2026',
    title: 'Initial Production Release: Full-Screen Android Auto Mirroring',
    highlights: [
      'Edge-to-edge hardware Surface takeover via NavigationTemplate without restrictive AA cards or borders.',
      'Hardware-accelerated live phone screen projection using Android MediaProjection API at 60 FPS.',
      'Bi-directional touch relay forwarding vehicle infotainment taps to phone screen via Accessibility Service.',
      'Custom automotive aspect ratio engine supporting widescreen and ultrawide.',
      'GitHub Actions automated build workflow (build.yml) with persistent FourgeAI Labs debug.keystore.',
      'FourgeAI Labs Proprietary Software License Version 1.0 integration.'
    ],
    notes: 'Initial release delivering complete edge-to-edge screen mirroring on Android Auto vehicle displays with ultra-low latency and touch pass-through.'
  }
];
