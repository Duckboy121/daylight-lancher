# Daylight 2.20.0 platform builds

## Files on this PC

Normal artifacts are saved to `C:\Users\Alexj\Documents\day`:

- `Daylight Setup 2.20.0.exe`: normal Windows upgrade, not a side-by-side preview.
- `Daylight Setup 2.20.0.exe.blockmap` and `latest.yml`: matching Windows update files.
- `GitHub-2.20.0/`: Windows assets already named exactly as `latest.yml` expects. Upload all files from this folder to a normal `v2.20.0` GitHub release; do not mark it as a prerelease. Keep the filenames unchanged. This avoids the mismatch caused by GitHub renaming spaces during website uploads.
- `Daylight-2.20.0-linux-x64.tar.gz`: normal Linux x64 portable launcher. Extract and run `./daylight`; it is not an AppImage auto-update package.
- `Daylight-Android-2.20.0.apk`: signed normal Android application, package `gg.daylight.launcher`, version code `220000`. Installs independently of Pojav, Mojo and the earlier `.debug` preview.

Older preview files are retained but are not these update builds. The old Windows update manifest is recoverable from `previous-update-files/`. No GitHub changes were pushed or published.

## Build commands

Windows: `npm run dist`. Linux portable from Windows: `npm run dist:linux:portable`.

On Linux: `npm ci`, `npm run dist:linux`. This creates an AppImage, tar archive and `latest-linux.yml`. The existing release workflow stages the redesigned client modules before building. A separate manual `Build Linux update (artifacts only)` workflow can produce files without publishing.

On macOS: `npm ci`, `npm run dist:mac`. Intel and Apple Silicon builds have distinct filenames, with DMG, ZIP and `latest-mac.yml` output. The manual `Build macOS update (artifacts only)` workflow is prepared locally but has not been pushed or run. A native Mac runner is still needed. Unsigned builds need manual security approval; signed/notarized distribution and seamless Mac updates require the owner's Apple Developer credentials.

Android: in `../daylight-android`, run `tools/build-release.ps1`. Android SDK/NDK/CMake are installed under `%LOCALAPPDATA%\Android\Sdk` following explicit acceptance of Google's SDK terms. The build uses a persistent private signing key outside Git at `C:\Users\Alexj\.daylight-signing`. Keep this folder privately backed up. Its password file is Windows-user-encrypted; exporting the password securely is necessary before moving to a different Windows account or machine. Never publish the signing folder.

## Verification and limits

- Desktop unit/install tests and hidden Electron UI fixture pass. Stable data paths and update IPC are checked without opening real user profiles.
- Windows and Linux packages are checked against current source and all 28 bundled client jars. The Linux tar preserves executable permissions. No Linux runtime launch was tested on this Windows PC.
- Android release compiles native code for ARM64, ARMv7, x86 and x86_64. APK signing and version-floor tests pass. On an Android 15 x86_64 emulator, installation, opening the dashboard, creating/editing an instance, the picker stopping at 1.19, and reinstalling a signed APK without losing existing instances have been checked. This is not a real-device Minecraft performance or Microsoft sign-in test.
- Android currently provides native instance creation and upstream Java/renderer/touch-control launching. Desktop-only search/cosmetics features and automatic Daylight mod provisioning are not yet ported. Android updates are installed manually from an APK signed with the same key; there is no silent Android updater.
- Android's bundled GL4ES renderer is labeled for Minecraft 1.21.4 and lower. New Android instances therefore start at 1.21.4; existing instances are not rewritten. Newer versions remain in the 1.19+ picker but need a suitable additional renderer before gameplay can be supported. LTW/Mesa components are not bundled in this APK.
- The version picker starts at 1.19. Existing older instances are retained. Module metadata is verified across 25 new builds; that is not in-game certification for every version.

Before publishing broadly, have friends test real Mac/Linux/Android devices, Microsoft login, Minecraft launch, close/relaunch, memory settings, and preserving instances through an update. Use a game account that owns Minecraft; no account credentials are bundled.
