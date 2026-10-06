# Daylight

A Minecraft launcher with a dark amber interface, instance management, Microsoft sign-in and Modrinth browsing.

[Download Daylight](https://github.com/Duckboy121/daylight-lancher/releases/latest)

## What's in 2.20.2

Desktop updates and the release-notes page now use this repository. The application identity and existing instance folders are unchanged.

- Instance cards with artwork, tags, memory settings and JVM options.
- Global search across instances, installed mods, resource packs and Modrinth projects.
- Mods and resource packs show a browse page before you enter a search.
- Installed-mod detection and duplicate-install protection.
- New Minecraft version choices start at 1.19; existing older instances are retained.
- Optional Daylight client modules for supported Fabric versions, including a Right Shift menu and HUD editing.

## Downloads

### Windows

Download `Daylight-Setup-2.20.2.exe` from Releases and run it over your existing installation. Back up important worlds first. The installer is unsigned, so Windows may show a publisher warning.

Existing installations still using the old repository need either a bridge update published there or a manual installation of 2.20.2. See [repository migration instructions](docs/REPOSITORY-MOVE.md).

### Linux

Download `Daylight-2.20.2-linux-x64.tar.gz`, extract it, and open a terminal inside the extracted folder:

```bash
chmod +x daylight
./daylight
```

This portable archive is for Intel/AMD x64 Linux, not ARM. Updates are manual. The repository also contains AppImage build support, but `install.sh` requires an actual AppImage release asset and will not install the portable archive.

### Android and macOS

Android is a separate native app whose source is maintained separately. This repository move does not include a new APK or add Android auto-updates. Android APK upgrades must use the same signing key and be installed without uninstalling the existing app.

macOS build configuration is included, but a tested macOS installer is not provided by this update.

## In-game modules

For supported desktop Fabric instances, enable the Daylight mod in the launcher. Open its module menu with **Right Shift** and use **Edit HUD** to arrange overlays.

Bundled mod builds cover 1.18–1.21.11 release variants and 26.2; this is not a promise of support for every later version or compatibility with every modpack. Newer versions can launch without a matching Daylight module build. Java mod source trees are maintained separately; the portable build inputs here contain the compiled JARs and their checksum manifest.

Android's HUD shortcut does not install the mod automatically. The tested Android setup uses Minecraft 1.21.4, Fabric, a matching Daylight JAR and Fabric API. Desktop-like mobile mod management remains incomplete.

## Build from source

Install Node.js and npm. The build workflows use Node.js 24.

```bash
npm ci
npm test
npm start
```

Package locally without publishing:

```bash
npm run dist                 # Windows installer
npm run dist:linux:portable  # Linux x64 portable archive
npm run dist:linux           # Linux AppImage and archive, on Linux
npm run dist:mac             # macOS DMG and ZIP, on macOS
```

Artifacts are written to `dist/`. Builds on the maintainer's Windows PC also copy release files into `Documents/day`. Use the matching installer, blockmap and update manifest together when publishing Windows releases.

`npm run release` publishes to GitHub and requires an authorized `GH_TOKEN` supplied through the environment. Never commit tokens, account files or signing keys.

The launcher uses `msmc` for Microsoft authentication and supports a client ID in Settings. Distributors are responsible for their own Microsoft application registration and required Minecraft API permissions. Never share passwords or access tokens in issues.

## Testing and known limitations

- Launcher regression tests and Windows/Linux package checks passed for 2.20.2. These are not full gameplay certification.
- The repository move does not fix the separately reported Windows native graphics crashes. One recorded failure occurred in the NVIDIA driver; the underlying trigger has not been isolated.
- Android emulator testing verified selected HUD controls and saved positions on 1.21.4, but later save-and-exit tests stalled, including without the Daylight mod. That issue remains unresolved.
- Physical-phone gameplay, macOS runtime testing and full Linux gameplay coverage remain incomplete.

Report problems through [Issues](https://github.com/Duckboy121/daylight-lancher/issues) with your OS, Minecraft version, loader and relevant logs. Redact account tokens, session secrets and other private information before posting.

The documents under `docs/` also contain historical development notes; older version numbers and testing statements there describe their original snapshots, not the current release status.
