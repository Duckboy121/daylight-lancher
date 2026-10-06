# Daylight 2.20.0 redesign

## Normal update build

`npm run dist` creates `Daylight Setup 2.20.0.exe` in `C:\Users\Alexj\Documents\day`. It uses the existing Daylight application identity and stable update feed. The installer is unsigned. Building does not publish anything.

The normal update retains existing settings and `%APPDATA%\.daylight` Minecraft instances. It does not import the separate preview profile. Automatic updates are enabled for packaged normal releases. The local `latest.yml` now describes 2.20.0; its previous copy is backed up under `Documents\day\previous-update-files`. Nothing has been committed, pushed or published to GitHub.

## Implemented

- Amber instance-card dashboard; artwork, tags, per-instance RAM and JVM overrides; instance log shortcuts.
- Ctrl/Cmd+K search across local instances, installed mods/resource packs and compatible Modrinth projects. Local search does not wait for remote results.
- New Minecraft version choices start at 1.19. Existing older instances are preserved; matching legacy mod jars remain bundled.
- Required Modrinth dependency resolution, bounded concurrent downloads, SHA-1 validation, staged installation/rollback, duplicate protection for catalog installs, and per-instance operation locking.
- Launch-in-progress guard, bounded/batched/redacted launcher logs, crash notifications and validated heap allocation.
- Redesigned Right Shift menu with category chips, toggles and live FPS/keystrokes/crosshair mini-previews. Edit HUD has an optional 8 px grid, center snapping and screen-bound clamping.
- Interactive wardrobe player rotation/zoom and local cape/emote/aura previews **on 1.21.9–1.21.11 only**. The other source trees do not yet have this cosmetics subsystem. Aura preview uses the emitters' positions, not the full world particle renderer.

## Verification

- `npm test`: launcher unit tests and real install-handler tests in isolated temporary directories. Covers dependency failures/rollback, duplicates, search, native-library rules, RAM/JVM validation, log redaction and preview/update isolation.
- `tools/test-ui.cjs`: hidden Electron renderer fixture, including cards, selecting/editing an instance, local/remote search and minimum-window sizing.
- `tools/build-mod-matrix.ps1`: 25 compiled targets: 1.19–1.19.4; 1.20–1.20.6; 1.21–1.21.11; 26.2. These are compile checks, not in-game runtime certification.
- `node tools/verify-mod-matrix.cjs`: checks the redesigned menu and exact Minecraft/Java/mixin metadata in all 25 new jars.
- `node tools/verify-release.cjs win` / `linux`: checks packaged sources, all 28 bundled jars (25 new plus 3 legacy), stable identity and update feed.

Normal builds are under `dist/`; logs and staging are under `out/`. All normal dist commands stage the redesigned mods into `out/release-bundled`; legacy `bundled/` is not overwritten. Verified portable mod builds are stored in `build/preview-bundled` (an internal historical directory name, not a prerelease channel). Java sources are in sibling `daylight-mod*` projects. Their original backups are under `out/redesign-backup-20260924-055539`.

Explanatory source comments have been moved to [CODE-NOTES.md](CODE-NOTES.md), with recoverable originals in `out/comment-backup-2026-09-25T21-47-49-021Z`. Required notices, shebangs and tool directives remain. External dependencies, native submodules and generated wrappers are not rewritten.

## Manual Windows checks

1. Install the normal update over stable Daylight. Confirm accounts and existing instances remain. Create a Fabric 1.21.11 test instance and launch; confirm log and game status recover when the game closes.
2. Test artwork/tags/RAM/JVM overrides. Install a Modrinth mod with dependencies; repeat the install and verify it stays Installed without a second copy.
3. Check the default browse page in Mods and Resource Packs and Ctrl+K local/remote search, including offline behavior.
4. Open Right Shift in a test world; exercise category/search/scroll/toggles. In Edit HUD, drag elements against screen edges and the center with the grid on/off; reopen to check persistence.
5. On 1.21.11, test wardrobe capes, emotes and auras; rotate/zoom the preview and verify hovering does not equip cosmetics or broadcast emotes.
6. Exercise representative older versions (1.19, 1.20.1, 1.21.1) and 26.2. Check for Fabric/mixin/runtime failures and HUD scaling. Compare frame times with the menu closed/open. Zero-lag rendering has not been established by benchmarking.

## Platforms

See [PLATFORMS.md](PLATFORMS.md) for completed builds, update-file naming and remaining native-system checks.

Android is a separate native launcher in `../daylight-android`, based on Mojo/Pojav. It now produces a signed normal Daylight APK. See that project's `DAYLIGHT.md` for build instructions, credits and limitations.
