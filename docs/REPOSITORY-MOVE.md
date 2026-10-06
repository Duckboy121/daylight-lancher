# Repository move: 2.20.2

Destination: https://github.com/Duckboy121/daylight-lancher

Desktop update metadata, release notes, the publishing helper and the Linux install script now target the new repository. The local origin remote also points there. The Android home link is updated in source; Android updates remain manual and its existing APK has not been rebuilt for this change.

The application ID, executable identity and .daylight data directory are unchanged. Install the new Windows build over the existing application; do not uninstall or delete instance data.

## Publishing order

1. Publish a normal latest release tagged v2.20.2 in the new public repository. Upload the matching Windows EXE, EXE.blockmap and latest.yml from Documents/day/GitHub-2.20.2. Keep their filenames unchanged. The Linux portable archive can be uploaded separately; it uses manual updates.
2. To reach users on the old feed, publish the exact same Windows files as v2.20.2 in Duckboy121/daylight-. Old clients download this bridge update there. Once installed, 2.20.2 checks daylight-lancher for subsequent releases.
3. Keep the old repository public and retain the bridge release while old installations migrate. If the old repository is unavailable, players must install the new EXE manually from the new repository.
4. Publish subsequent releases only to daylight-lancher. Do not use an older version number or replace the already published 2.20.1 assets with differently built files.

Copying old binaries into the new repository does not change their embedded update address. Changing only the Git remote also does not migrate installed applications.

No releases, commits, tags or remote branches were created by this local migration. Do not push the old local history to the new repository if the objective is to start with clean history. Review and publish a clean source snapshot separately, preserving required licenses and notices.

This migration does not fix the separately reported NVIDIA native crash or the Android emulator save-and-exit stall. It does not add Android auto-updates or a macOS installer.
