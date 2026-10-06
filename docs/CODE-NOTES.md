# Source notes moved out of code

These explanations were moved from source comments. Paths and line numbers refer to the code before comment cleanup. Required license notices and functional tool directives remain in source.

The Android control editor's `setupRealTimeListeners` connects popup controls to the button currently being edited. Its inspection directive stays beside the method; the explanatory Javadoc was removed. The ByteDance MIT notice in `gradle/prefab_bypass.gradle` is retained intact, including its permission and warranty paragraphs.

## daylight/.github/workflows/build-linux.yml

Line 3

~~~~~~text
# Produces the Linux AppImage on a real Linux runner (the launcher is released
~~~~~~

Line 4

~~~~~~text
# from a Windows machine, which can't build it) and attaches it — plus the
~~~~~~

Line 5

~~~~~~text
# latest-linux.yml auto-update metadata — to the GitHub release.
~~~~~~

Line 6

~~~~~~text
#
~~~~~~

Line 7

~~~~~~text
# Fires automatically when a release is published (the moment `npm run release`
~~~~~~

Line 8

~~~~~~text
# flips the draft public), and can be run by hand from the Actions tab for any
~~~~~~

Line 9

~~~~~~text
# existing tag.
~~~~~~

Line 16

~~~~~~text
# lets electron-builder upload assets to the release
~~~~~~

Line 40

~~~~~~text
# Build locally with matching redesigned mods. Only the explicit upload
~~~~~~

Line 41

~~~~~~text
# step below publishes assets to the already-created release.
~~~~~~

## daylight/install.sh

Line 2

~~~~~~text
# Daylight launcher — Linux installer.
~~~~~~

Line 3

~~~~~~text
#
~~~~~~

Line 4

~~~~~~text
#   curl -fsSL https://raw.githubusercontent.com/Duckboy121/daylight-/main/install.sh | bash
~~~~~~

Line 5

~~~~~~text
#
~~~~~~

Line 6

~~~~~~text
# Downloads the latest Daylight AppImage from GitHub Releases, installs it under
~~~~~~

Line 7

~~~~~~text
# ~/.local, adds a `daylight` command and an application-menu entry. No root,
~~~~~~

Line 8

~~~~~~text
# no package manager. Re-run any time to update to the latest release.
~~~~~~

Line 25

~~~~~~text
# --- prerequisites -----------------------------------------------------------
~~~~~~

Line 37

~~~~~~text
# --- find the AppImage asset on the latest release ---------------------------
~~~~~~

Line 42

~~~~~~text
# All .AppImage download URLs on the release, newest asset first.
~~~~~~

Line 48

~~~~~~text
# Never install another CPU's AppImage. Older unqualified Daylight releases
~~~~~~

Line 49

~~~~~~text
# were x64-only, so only x64 machines may use that legacy fallback.
~~~~~~

Line 66

~~~~~~text
# --- download + install ------------------------------------------------------
~~~~~~

Line 77

~~~~~~text
# `daylight` command
~~~~~~

Line 80

~~~~~~text
# Application-menu entry (best-effort icon extraction; needs no FUSE).
~~~~~~

Line 100

~~~~~~text
# --- post-install notes ------------------------------------------------------
~~~~~~

Line 109

~~~~~~text
# AppImages need FUSE 2 to run. Extraction above works without it, but launching
~~~~~~

Line 110

~~~~~~text
# does not — surface the fix rather than let it fail cryptically at first run.
~~~~~~

## daylight/src/catalog-search.js

Line 5

~~~~~~text
// Async directory reads, no file contents/hashing or remote calls on the local path.
~~~~~~

Line 35

~~~~~~text
// Target instance is not part of cached catalog data.
~~~~~~

## daylight/src/dependency-plan.js

Line 2

~~~~~~text
// Resolve the complete required graph before downloading anything. Optional and
~~~~~~

Line 3

~~~~~~text
// embedded dependencies are intentionally not installed as extra jars.
~~~~~~

## daylight/src/instance-options.js

Line 16

~~~~~~text
// Arguments go straight to Java, never through a shell. Heap has one owner.
~~~~~~

## daylight/src/java-runtime.js

Line 18

~~~~~~text
// javaw hides output on some Windows distributions; inspect its console twin.
~~~~~~

Line 49

~~~~~~text
/* stale symlink, wrong CPU or an inaccessible installation */
~~~~~~

Line 58

~~~~~~text
/* optional search root */
~~~~~~

Line 64

~~~~~~text
/* not a JRE */
~~~~~~

## daylight/src/main.js

Line 10

~~~~~~text
// MCLC's legacy rule matcher ignores CPU architecture. Adapt through its
~~~~~~

Line 11

~~~~~~text
// initialization hook, without modifying installed dependencies.
~~~~~~

Line 27

~~~~~~text
// Prerelease builds are side-by-side test installs, not upgrades to stable.
~~~~~~

Line 28

~~~~~~text
// Keep both launcher state and Minecraft worlds separate before acquiring
~~~~~~

Line 29

~~~~~~text
// Electron's single-instance lock or reading any configuration.
~~~~~~

Line 37

~~~~~~text
// Canonicalize the game root to its real on-disk path. Under a Windows
~~~~~~

Line 38

~~~~~~text
// AppContainer, %APPDATA% is redirected (e.g. to LocalCache\Roaming); if we
~~~~~~

Line 39

~~~~~~text
// hand MCLC the un-redirected path, the classpath strings won't match the
~~~~~~

Line 40

~~~~~~text
// paths the JVM actually loads jars from, and Fabric Loader 0.16+ then fails
~~~~~~

Line 41

~~~~~~text
// to recognize its own libraries (sponge-mixin etc.) — every mod's mixin
~~~~~~

Line 42

~~~~~~text
// plugin dies with a "loader 'knot' vs 'app'" ClassCastException. realpath
~~~~~~

Line 43

~~~~~~text
// is a harmless no-op when there's no redirection.
~~~~~~

Line 48

~~~~~~text
// Under AppContainer redirection, realpath of a *directory* returns the
~~~~~~

Line 49

~~~~~~text
// un-redirected path, but realpath of a *file* returns the real location
~~~~~~

Line 50

~~~~~~text
// the JVM will actually load from. Probe with a file and take its dirname.
~~~~~~

Line 62

~~~~~~text
// True when this process runs inside a Windows AppContainer sandbox (e.g. a
~~~~~~

Line 63

~~~~~~text
// dev-tool test launch): %APPDATA% is then silently redirected into the
~~~~~~

Line 64

~~~~~~text
// container's LocalCache, so packs/config written here never reach the user's
~~~~~~

Line 65

~~~~~~text
// normal install. The UI shows a warning badge so such a launch is unmistakable.
~~~~~~

Line 76

~~~~~~text
// Default MC version for packs (matches the user's server).
~~~~~~

Line 79

~~~~~~text
// The built-in Daylight mod's filename in a pack's mods folder. It is
~~~~~~

Line 80

~~~~~~text
// protected from deletion in the UI.
~~~~~~

Line 83

~~~~~~text
// The Daylight mod is compiled per MC version. Any `daylight-mod-<version>.jar`
~~~~~~

Line 84

~~~~~~text
// present in the bundled folder is automatically available, so adding a new
~~~~~~

Line 85

~~~~~~text
// version build needs no code change here.
~~~~~~

Line 91

~~~~~~text
// Mod loaders a pack can run on. Fabric is the default and the only one the
~~~~~~

Line 92

~~~~~~text
// bundled Daylight mod is built for; Forge/NeoForge packs launch and manage
~~~~~~

Line 93

~~~~~~text
// mods normally, they just don't get the in-game module GUI.
~~~~~~

Line 97

~~~~~~text
// Client-side performance mods (Modrinth slugs) per loader — Sodium & friends
~~~~~~

Line 98

~~~~~~text
// are where the real FPS gains come from. Anything with no build for the
~~~~~~

Line 99

~~~~~~text
// pack's version is skipped rather than failing the launch.
~~~~~~

Line 106

~~~~~~text
// Tuned G1GC flags for smoother frametimes than JVM defaults.
~~~~~~

Line 118

~~~~~~text
// Heap sized to the machine: an undersized heap on a big modpack means
~~~~~~

Line 119

~~~~~~text
// constant GC stutter, the most common "modded Minecraft is laggy" cause.
~~~~~~

Line 122

~~~~~~text
// Every pack — built-in and custom — includes the Daylight mod and the
~~~~~~

Line 123

~~~~~~text
// performance mod set as a baseline.
~~~~~~

Line 133

~~~~~~text
// when minecraftToken was minted — stale tokens cause "Invalid session"
~~~~~~

Line 139

~~~~~~text
// ---------- config ----------
~~~~~~

Line 143

~~~~~~text
// per-pack state: { version, name?, custom? }
~~~~~~

Line 148

~~~~~~text
// [{ uuid, name, refreshToken }]
~~~~~~

Line 152

~~~~~~text
/**
 * 2.19.0 had a single switch for every pack; 2.19.1 moved it onto each one.
 * Carry a user's "off" across rather than silently switching the mod back on.
 */
~~~~~~

Line 171

~~~~~~text
// Re-registers any custom pack whose folder exists on disk but is missing
~~~~~~

Line 172

~~~~~~text
// from config — so packs survive even if the config is ever lost/reset.
~~~~~~

Line 186

~~~~~~text
/* no manifest — use default version */
~~~~~~

Line 190

~~~~~~text
/* ignore */
~~~~~~

Line 195

~~~~~~text
// Prefer the live config, fall back to the last-good backup if the live one
~~~~~~

Line 196

~~~~~~text
// is corrupt/truncated (e.g. an unclean shutdown mid-write).
~~~~~~

Line 202

~~~~~~text
/* both gone */
~~~~~~

Line 207

~~~~~~text
// Pre-2.1 single-account field, superseded by accounts[] once activeUuid is
~~~~~~

Line 208

~~~~~~text
// set — drop it so a long-dead token can't linger in the config forever.
~~~~~~

Line 219

~~~~~~text
// Configs still on the old universal default (2/4 GB) get upgraded to the
~~~~~~

Line 220

~~~~~~text
// machine-sized heap — an undersized heap causes GC lag on big packs.
~~~~~~

Line 226

~~~~~~text
// selected pack may be gone (removed builtin or deleted custom pack)
~~~~~~

Line 231

~~~~~~text
// Repair the live config file whenever we recovered packs, fell back to the
~~~~~~

Line 232

~~~~~~text
// backup, or had nothing readable at all.
~~~~~~

Line 234

~~~~~~text
/* ignore */
~~~~~~

Line 239

~~~~~~text
// Atomic write (temp + rename) with a rolling backup so a crash mid-write can
~~~~~~

Line 240

~~~~~~text
// never leave a truncated config.
~~~~~~

Line 248

~~~~~~text
/* backup is best-effort */
~~~~~~

Line 249

~~~~~~text
// atomic replace on the same volume
~~~~~~

Line 254

~~~~~~text
// ---------- java provisioning ----------
~~~~~~

Line 258

~~~~~~text
// Runtime downloads and CPU validation follow the actual launcher binary.
~~~~~~

Line 260

~~~~~~text
// The launcher binary: on Windows javaw.exe (no console window); on Unix
~~~~~~

Line 261

~~~~~~text
// there's no separate "w" binary, plain `java` is used.
~~~~~~

Line 263

~~~~~~text
// Adoptium API path components + the archive format it hands back per OS.
~~~~~~

Line 268

~~~~~~text
// Which Java major an MC version needs.
~~~~~~

Line 271

~~~~~~text
// year-based versions (26.x+)
~~~~~~

Line 281

~~~~~~text
// Directories that hold one JDK/JRE per subfolder, per OS. Each subfolder name
~~~~~~

Line 282

~~~~~~text
// carries its major version (jdk-21, temurin-17-jre, zulu21.*, etc.).
~~~~~~

Line 285

~~~~~~text
// JetBrains IDEs and Toolbox install JDKs here on every platform, and it is
~~~~~~

Line 286

~~~~~~text
// often the only place a developer machine has the older JDK a given
~~~~~~

Line 287

~~~~~~text
// Minecraft version needs.
~~~~~~

Line 298

~~~~~~text
// Linux — distro packages, Adoptium's apt repo, SDKMAN, manual /opt installs.
~~~~~~

Line 303

~~~~~~text
// javaw.exe on Windows; on macOS the runtime is nested under Contents/Home.
~~~~~~

Line 312

~~~~~~text
// Newest system JDK that satisfies the requirement. Old MC (Java 8 era)
~~~~~~

Line 313

~~~~~~text
// breaks on modern JVMs, so for those only an exact major counts.
~~~~~~

Line 314

~~~~~~text
// Minecraft bundles its own LWJGL, and LWJGL 3.3.3 and older abort with
~~~~~~

Line 315

~~~~~~text
// "Unsupported JNI version detected" on Java 24+ and then die in native code
~~~~~~

Line 316

~~~~~~text
// during render init (exit 0xC0000005). Every 1.x release ships such an LWJGL,
~~~~~~

Line 317

~~~~~~text
// so they must stay below that line; the year-based versions carry a newer
~~~~~~

Line 318

~~~~~~text
// LWJGL and want Java 25. A newer JDK is emphatically not always better.
~~~~~~

Line 327

~~~~~~text
// A runtime we downloaded ourselves lives under runtime/jdk-<major>/…/bin/<java>
~~~~~~

Line 330

~~~~~~text
// reuse old installs only if their CPU matches
~~~~~~

Line 335

~~~~~~text
// Unpacks the Adoptium archive: a .tar.gz on Linux/macOS, a .zip on Windows.
~~~~~~

Line 336

~~~~~~text
// GNU tar auto-detects gzip with -xf; Windows' bsdtar reads zips the same way,
~~~~~~

Line 337

~~~~~~text
// so `tar -xf` covers both. PowerShell's Expand-Archive is a Windows-only
~~~~~~

Line 338

~~~~~~text
// fallback for the rare box without tar.
~~~~~~

Line 352

~~~~~~text
// Returns a java binary suitable for the given MC version, downloading a JRE
~~~~~~

Line 353

~~~~~~text
// from Adoptium if the machine has nothing suitable — so a fresh PC (Windows
~~~~~~

Line 354

~~~~~~text
// or Linux) can install, log in and play with zero setup.
~~~~~~

Line 395

~~~~~~text
// Leave any old invalid runtime recoverable; only remove our temporary download.
~~~~~~

Line 400

~~~~~~text
// ---------- auth ----------
~~~~~~

Line 421

~~~~~~text
// Accounts shown to the renderer never include the refresh token.
~~~~~~

Line 430

~~~~~~text
// Opens the Microsoft login popup and stores the account (or updates it if the
~~~~~~

Line 431

~~~~~~text
// same account logs in again), making it the active one.
~~~~~~

Line 451

~~~~~~text
// Silently re-authenticates a stored account and makes it active.
~~~~~~

Line 476

~~~~~~text
// Migrate a pre-2.1 single-account config (refreshToken field) into the
~~~~~~

Line 477

~~~~~~text
// accounts list, so updating the app never logs anyone out.
~~~~~~

Line 504

~~~~~~text
// token expired/revoked — user re-adds the account
~~~~~~

Line 508

~~~~~~text
// Repairs a stale login ("Invalid session" in game): silently re-refresh the
~~~~~~

Line 509

~~~~~~text
// active account's token; if the refresh token itself is dead, fall back to a
~~~~~~

Line 510

~~~~~~text
// full Microsoft re-login popup. Either way the stored account is updated.
~~~~~~

Line 515

~~~~~~text
/* refresh token dead — needs interactive login */
~~~~~~

Line 520

~~~~~~text
// ---------- in-game session bridge ----------
~~~~~~

Line 521

~~~~~~text
//
~~~~~~

Line 522

~~~~~~text
// A running Minecraft client can't refresh its own Microsoft token (the refresh
~~~~~~

Line 523

~~~~~~text
// token lives here in the launcher). This tiny loopback server lets the in-game
~~~~~~

Line 524

~~~~~~text
// Daylight mod ask the launcher — which stays alive in the tray — to mint a
~~~~~~

Line 525

~~~~~~text
// fresh Minecraft access token so its title-screen "Fix session" button can
~~~~~~

Line 526

~~~~~~text
// swap it into the live session and cure "Invalid session" without a restart.
~~~~~~

Line 527

~~~~~~text
//
~~~~~~

Line 528

~~~~~~text
// Bound to 127.0.0.1 and gated by a per-run secret handed to the game as a JVM
~~~~~~

Line 529

~~~~~~text
// -D property. The MC access token is already on the game's own command line
~~~~~~

Line 530

~~~~~~text
// (MCLC passes --accessToken), so this exposes nothing a local process couldn't
~~~~~~

Line 531

~~~~~~text
// already read.
~~~~~~

Line 535

~~~~~~text
/** The base64 body of a PEM block, which for these keys is the DER itself. */
~~~~~~

Line 540

~~~~~~text
/**
 * Fetches this account's Mojang-signed keypair.
 *
 * The game normally hands this to the mod itself, but only when its own user
 * API service came up online. When that quietly falls back to offline there is
 * no key, no proof of identity, and cosmetics cannot be saved -- while every
 * other symptom looks like a network fault. The launcher holds a token it has
 * just refreshed and has no such fallback, so it asks Mojang directly and
 * passes the answer through.
 */
~~~~~~

Line 552

~~~~~~text
// refresh + persist
~~~~~~

Line 566

~~~~~~text
// v2 signs uuid || expiresAt || key, which is what the cosmetics service
~~~~~~

Line 567

~~~~~~text
// checks; v1 covers different bytes and would never verify.
~~~~~~

Line 590

~~~~~~text
// refresh + persist
~~~~~~

Line 597

~~~~~~text
// bridge is best-effort
~~~~~~

Line 601

~~~~~~text
// ---------- fabric / versions ----------
~~~~~~

Line 618

~~~~~~text
/* cache is best-effort */
~~~~~~

Line 621

~~~~~~text
// Offline (e.g. cold boot): fall back to the last cached list so the
~~~~~~

Line 622

~~~~~~text
// version pickers still work.
~~~~~~

Line 651

~~~~~~text
// ---------- forge / neoforge ----------
~~~~~~

Line 652

~~~~~~text
//
~~~~~~

Line 653

~~~~~~text
// Forge and NeoForge can't be described by a downloadable profile JSON the way
~~~~~~

Line 654

~~~~~~text
// Fabric can: their client install binary-patches the vanilla jar and unpacks a
~~~~~~

Line 655

~~~~~~text
// tree of libraries. The official installers do exactly that in headless mode
~~~~~~

Line 656

~~~~~~text
// (`--installClient <dir>`), and leave behind a versions/<id>/<id>.json that
~~~~~~

Line 657

~~~~~~text
// MCLC can then launch through `version.custom`, identically to Fabric.
~~~~~~

Line 658

~~~~~~text
//
~~~~~~

Line 659

~~~~~~text
// We deliberately do NOT use MCLC's own `forge:` option: it drives the legacy
~~~~~~

Line 660

~~~~~~text
// ForgeWrapper path, which only recognises net.minecraftforge coordinates and
~~~~~~

Line 661

~~~~~~text
// so cannot install NeoForge at all.
~~~~~~

Line 679

~~~~~~text
/* index is a cache; a failed write only costs a re-install */
~~~~~~

Line 682

~~~~~~text
// Newest Forge build for a game version. Forge publishes a "recommended" and a
~~~~~~

Line 683

~~~~~~text
// "latest" per version; recommended is the safer default when it exists.
~~~~~~

Line 691

~~~~~~text
// NeoForge versions encode the game version: MC 1.21.1 -> 21.1.x, MC 1.21 -> 21.0.x.
~~~~~~

Line 706

~~~~~~text
// Maven metadata is oldest-first, but sort by build number so we don't rely on it.
~~~~~~

Line 711

~~~~~~text
// The installers refuse to run against a folder that doesn't look like an
~~~~~~

Line 712

~~~~~~text
// official-launcher install, and a missing profiles file is the usual reason.
~~~~~~

Line 730

~~~~~~text
// javaw has no console and swallows the installer's output; the installer is a
~~~~~~

Line 731

~~~~~~text
// headless CLI here, so use the plain java binary next to it.
~~~~~~

Line 755

~~~~~~text
/**
 * Installs Forge/NeoForge for a game version if it isn't installed already, and
 * returns the version id to launch through (e.g. `1.20.1-forge-47.3.0` or
 * `neoforge-21.1.90`). Fabric packs take the profile-JSON path instead.
 */
~~~~~~

Line 791

~~~~~~text
// A truncated or half-downloaded installer would fail the same way forever.
~~~~~~

Line 796

~~~~~~text
// The installer also drops the vanilla version folder, so match the loader's
~~~~~~

Line 797

~~~~~~text
// own name rather than taking whatever is new — picking the vanilla id here
~~~~~~

Line 798

~~~~~~text
// would launch an unmodded game that looks like it worked.
~~~~~~

Line 803

~~~~~~text
// Re-install over an existing folder adds nothing new: fall back to the name
~~~~~~

Line 804

~~~~~~text
// the installer documents.
~~~~~~

Line 813

~~~~~~text
// MCLC builds its own JVM arguments and never reads the ones in a version
~~~~~~

Line 814

~~~~~~text
// profile. Fabric needs none, but modern Forge/NeoForge do not boot without
~~~~~~

Line 815

~~~~~~text
// them: the module path, the --add-opens/--add-exports set and
~~~~~~

Line 816

~~~~~~text
// -DlibraryDirectory all live in arguments.jvm. Read them back out and pass
~~~~~~

Line 817

~~~~~~text
// them through customArgs, resolving the placeholders the vanilla launcher
~~~~~~

Line 818

~~~~~~text
// would have filled in.
~~~~~~

Line 831

~~~~~~text
// Rule-gated entries are the OS-specific vanilla ones; MCLC already covers those.
~~~~~~

Line 839

~~~~~~text
// ---------- packs ----------
~~~~~~

Line 846

~~~~~~text
// Built-in packs are always Fabric — that's what the bundled mod is built for.
~~~~~~

Line 866

~~~~~~text
// Fabric-only, and only if this pack still wants it. Kept per pack rather
~~~~~~

Line 867

~~~~~~text
// than globally so one pack can run Daylight while another runs clean --
~~~~~~

Line 868

~~~~~~text
// useful when a server does not allow client mods.
~~~~~~

Line 872

~~~~~~text
// Whether a Daylight mod build exists for this pack's MC version — the UI
~~~~~~

Line 873

~~~~~~text
// says so up front instead of the mod quietly not being there.
~~~~~~

Line 918

~~~~~~text
// Tracks which file each Modrinth slug resolved to, so we don't re-download
~~~~~~

Line 919

~~~~~~text
// and can clean up on version change.
~~~~~~

Line 924

~~~~~~text
// auto-installed mods the user deleted on purpose
~~~~~~

Line 925

~~~~~~text
// catalog project id -> installed filename
~~~~~~

Line 946

~~~~~~text
// True when two files are byte-identical. Used for the built-in mod jar, where
~~~~~~

Line 947

~~~~~~text
// a same-size-but-different build must still be copied over.
~~~~~~

Line 963

~~~~~~text
// Version changed since last launch: drop auto-installed mods, they're
~~~~~~

Line 964

~~~~~~text
// compiled per-version. User-added mods are left alone.
~~~~~~

Line 978

~~~~~~text
// user deleted it — respect that
~~~~~~

Line 983

~~~~~~text
// mod not available for this version yet — skip
~~~~~~

Line 988

~~~~~~text
// Bundled Daylight mod jar — pick the build compiled for this pack's MC
~~~~~~

Line 989

~~~~~~text
// version; if there is none, make sure the jar is absent so Fabric doesn't
~~~~~~

Line 990

~~~~~~text
// refuse to launch over an unsatisfiable dependency. While it is switched on
~~~~~~

Line 991

~~~~~~text
// it is always (re)copied, so a stale build can't linger; switched off, the
~~~~~~

Line 992

~~~~~~text
// jar is deleted rather than merely skipped, so turning it back on is the
~~~~~~

Line 993

~~~~~~text
// only way it returns.
~~~~~~

Line 998

~~~~~~text
// Compare contents, not size: a one-constant change (e.g. an FOV cap)
~~~~~~

Line 999

~~~~~~text
// produces a jar of exactly the same length, and a size check would then
~~~~~~

Line 1000

~~~~~~text
// leave the stale jar in place forever.
~~~~~~

Line 1011

~~~~~~text
// ---------- mods (Modrinth search) ----------
~~~~~~

Line 1023

~~~~~~text
// Fetch a wide batch; the renderer paginates it 20 at a time.
~~~~~~

Line 1038

~~~~~~text
// ---------- resource packs (Modrinth) ----------
~~~~~~

Line 1039

~~~~~~text
//
~~~~~~

Line 1040

~~~~~~text
// Resource packs aren't loader-specific, so unlike mods they resolve by game
~~~~~~

Line 1041

~~~~~~text
// version alone (no 'fabric' facet), and install into the pack's own
~~~~~~

Line 1042

~~~~~~text
// resourcepacks/ folder rather than mods/.
~~~~~~

Line 1050

~~~~~~text
// Fetch a wide batch; the renderer paginates it 20 at a time.
~~~~~~

Line 1113

~~~~~~text
// Small, bounded worker pool. No pack mutation until every download passes.
~~~~~~

Line 1137

~~~~~~text
// Installing one of the auto-installed mods again clears its "removed" mark,
~~~~~~

Line 1138

~~~~~~text
// so it resumes being kept up to date on launch.
~~~~~~

Line 1150

~~~~~~text
/* not one of ours, or offline — nothing to un-mark */
~~~~~~

Line 1156

~~~~~~text
// ---------- modpack import ----------
~~~~~~

Line 1158

~~~~~~text
// Turns a name into a unique custom pack id.
~~~~~~

Line 1167

~~~~~~text
// Some exports wrap everything in a single top-level folder; step into it so
~~~~~~

Line 1168

~~~~~~text
// the mods/config folders land at the pack root rather than one level down.
~~~~~~

Line 1178

~~~~~~text
/**
 * Imports a modpack file into a new pack. Understands:
 *  - Modrinth `.mrpack` (modrinth.index.json: downloads every listed file and
 *    copies the overrides folder)
 *  - CurseForge-style exports (manifest.json — overrides are copied; its mods
 *    are project ids rather than URLs, so those are reported as not fetchable)
 *  - any plain `.zip` that contains a mods folder (Dawn and most hand-made
 *    packs) — the whole tree is copied in as-is
 */
~~~~~~

Line 1218

~~~~~~text
// The index names its loader as a dependency key.
~~~~~~

Line 1227

~~~~~~text
// e.g. "neoforge-21.1.90", "forge-47.3.0", "fabric-0.16.5"
~~~~~~

Line 1236

~~~~~~text
// plain zip: copy the tree in and hope it looks like a game folder
~~~~~~

Line 1247

~~~~~~text
// copy overrides / raw contents
~~~~~~

Line 1252

~~~~~~text
// never let a pack's own manifest land in the game folder
~~~~~~

Line 1258

~~~~~~text
// download the Modrinth-listed files
~~~~~~

Line 1266

~~~~~~text
/* one bad file shouldn't sink the whole import */
~~~~~~

Line 1279

~~~~~~text
// ---------- release notes ----------
~~~~~~

Line 1283

~~~~~~text
// a tray session can outlive a release
~~~~~~

Line 1285

~~~~~~text
// The launcher's own changelog, straight from the published releases.
~~~~~~

Line 1301

~~~~~~text
// Copy user-picked .jar files into a pack's mods folder.
~~~~~~

Line 1322

~~~~~~text
// ---------- launch ----------
~~~~~~

Line 1324

~~~~~~text
// Lines in the game/launcher output that mean the account token has gone
~~~~~~

Line 1325

~~~~~~text
// stale — the game then rejects server joins with "Invalid session".
~~~~~~

Line 1352

~~~~~~text
// Minecraft session tokens expire after ~24h; an app left running in the
~~~~~~

Line 1353

~~~~~~text
// tray for days would launch the game with a dead token. Refresh silently
~~~~~~

Line 1354

~~~~~~text
// when the token is over an hour old; if that fails, keep the old token and
~~~~~~

Line 1355

~~~~~~text
// let the in-game detector below offer the one-click fix.
~~~~~~

Line 1360

~~~~~~text
/* offline or token dead — detector handles it */
~~~~~~

Line 1372

~~~~~~text
// Fabric resolves to a downloadable profile JSON; Forge/NeoForge have to run
~~~~~~

Line 1373

~~~~~~text
// their official installer once, which needs the JVM resolved above.
~~~~~~

Line 1379

~~~~~~text
// Watch the stream for stale-session symptoms and tell the renderer once,
~~~~~~

Line 1380

~~~~~~text
// so it can offer a one-click "fix login & relaunch".
~~~~~~

Line 1400

~~~~~~text
// Hand the in-game mod the loopback bridge coordinates so its "Fix session"
~~~~~~

Line 1401

~~~~~~text
// button can reach the launcher (see startSessionBridge). Only when the
~~~~~~

Line 1402

~~~~~~text
// bridge actually came up.
~~~~~~

Line 1434

~~~~~~text
// ---------- IPC ----------
~~~~~~

Line 1436

~~~~~~text
// msmc reports a failure as a bare lexicon code, or as {response, ts} -- never
~~~~~~

Line 1437

~~~~~~text
// as an Error. So the obvious `err.message || String(err)` turns every single
~~~~~~

Line 1438

~~~~~~text
// auth failure into "[object Object]" and throws away the one thing the person
~~~~~~

Line 1439

~~~~~~text
// staring at the toast actually needs: which step failed and why.
~~~~~~

Line 1451

~~~~~~text
/* circular; fall through */
~~~~~~

Line 1462

~~~~~~text
// Also to disk: the toast is gone in seconds, and "it said login failed"
~~~~~~

Line 1463

~~~~~~text
// is not something anyone can act on when they report it.
~~~~~~

Line 1528

~~~~~~text
// Manual rescue: re-read the config from disk and re-register any pack whose
~~~~~~

Line 1529

~~~~~~text
// folder exists but is missing from the list — same self-heal as startup, on
~~~~~~

Line 1530

~~~~~~text
// demand. Safe to run any time; changes nothing when all packs are present.
~~~~~~

Line 1603

~~~~~~text
// If this was one of the auto-installed mods, remember that the user removed
~~~~~~

Line 1604

~~~~~~text
// it so the next launch doesn't silently download it again. Only the Daylight
~~~~~~

Line 1605

~~~~~~text
// mod itself is unconditionally restored.
~~~~~~

Line 1656

~~~~~~text
// ---------- window / tray ----------
~~~~~~

Line 1666

~~~~~~text
// If a first (possibly cold-boot) instance was left half-loaded in the tray,
~~~~~~

Line 1667

~~~~~~text
// reloading its data on focus guarantees packs/account are populated.
~~~~~~

Line 1671

~~~~~~text
// Records what loadConfig actually saw (at startup and on manual restores),
~~~~~~

Line 1672

~~~~~~text
// so a recurrence of the "packs missing after restart" report is diagnosable
~~~~~~

Line 1673

~~~~~~text
// from disk. Version + exe path + SANDBOXED flag identify exactly which
~~~~~~

Line 1674

~~~~~~text
// install and data root produced each entry.
~~~~~~

Line 1682

~~~~~~text
/* non-fatal */
~~~~~~

Line 1685

~~~~~~text
// Custom title-bar controls (the window is frameless).
~~~~~~

Line 1690

~~~~~~text
// hides to tray via the close handler
~~~~~~

Line 1700

~~~~~~text
// custom title bar (see .topbar in the renderer)
~~~~~~

Line 1711

~~~~~~text
// closing hides to tray; Daylight keeps running in the background
~~~~~~

Line 1732

~~~~~~text
// ---------- auto-update ----------
~~~~~~

Line 1769

~~~~~~text
// otherwise stay alive in the tray
~~~~~~

## daylight/src/mod-catalog.js

Line 5

~~~~~~text
// Identify existing jars by their contents, including renamed and older builds.
~~~~~~

Line 32

~~~~~~text
// Queue operations per pack so simultaneous clicks cannot download duplicates.
~~~~~~

## daylight/src/platform-libraries.js

Line 1

~~~~~~text
// Mojang library rules are ordered; the last matching rule wins.
~~~~~~

## daylight/src/renderer/app.js

Line 8

~~~~~~text
// Mod loaders a pack can run on; comes from the main process so the list
~~~~~~

Line 9

~~~~~~text
// can't drift from what the launcher actually knows how to install.
~~~~~~

Line 11

~~~~~~text
// which pack the Mods tab installs into
~~~~~~

Line 13

~~~~~~text
// ---------- helpers ----------
~~~~~~

Line 30

~~~~~~text
// Log lines stream in fast during a modded launch; writing the DOM per line
~~~~~~

Line 31

~~~~~~text
// causes a reflow each time. Buffer and flush at most every 150ms, and cap
~~~~~~

Line 32

~~~~~~text
// the kept text so a long session can't grow memory forever.
~~~~~~

Line 54

~~~~~~text
// ---------- tabs ----------
~~~~~~

Line 68

~~~~~~text
// ---------- window controls (frameless) ----------
~~~~~~

Line 74

~~~~~~text
// ---------- account switcher ----------
~~~~~~

Line 115

~~~~~~text
// switched-away or none left
~~~~~~

Line 167

~~~~~~text
// Closing the Microsoft window is a decision, not a failure.
~~~~~~

Line 174

~~~~~~text
// Forces a fresh Microsoft token (silent refresh, or full re-login if the
~~~~~~

Line 175

~~~~~~text
// stored token is dead) — the cure for in-game "Invalid session" errors.
~~~~~~

Line 206

~~~~~~text
// Main detected "Invalid session" / 401 in the game output.
~~~~~~

Line 229

~~~~~~text
// ---------- packs ----------
~~~~~~

Line 251

~~~~~~text
// Cold boot can hand the renderer a transiently-empty result; retry a few
~~~~~~

Line 252

~~~~~~text
// times until packs appear so a restart never leaves the list blank.
~~~~~~

Line 258

~~~~~~text
/* retry */
~~~~~~

Line 263

~~~~~~text
// Main process asks us to re-pull data when the window is re-focused from tray.
~~~~~~

Line 270

~~~~~~text
/* keep current */
~~~~~~

Line 278

~~~~~~text
// Manual rescue for the "packs missing after a restart" case: main re-reads
~~~~~~

Line 279

~~~~~~text
// the config from disk and re-registers any pack folder it finds.
~~~~~~

Line 298

~~~~~~text
// Import a Modrinth .mrpack, a Dawn/CurseForge export, or a plain modpack zip.
~~~~~~

Line 321

~~~~~~text
// ---------- updates panel ----------
~~~~~~

Line 331

~~~~~~text
// release bodies are markdown; show them as readable plain text
~~~~~~

Line 381

~~~~~~text
// Say up front when this MC version has no Daylight mod build — the pack
~~~~~~

Line 382

~~~~~~text
// still works, it just gets the performance mods only.
~~~~~~

Line 421

~~~~~~text
// Loader picker. Built-in packs are Fabric-only (that's what the bundled
~~~~~~

Line 422

~~~~~~text
// Daylight mod is built for), so they just show the label above.
~~~~~~

Line 431

~~~~~~text
// The bundled Daylight mod is a Fabric build, so built-in packs can't move.
~~~~~~

Line 447

~~~~~~text
// Per-pack Daylight switch. Only where it could actually apply: a Forge pack
~~~~~~

Line 448

~~~~~~text
// or a version with no build has nothing to turn off, and the card already
~~~~~~

Line 449

~~~~~~text
// says so above.
~~~~~~

Line 564

~~~~~~text
// ---------- launch ----------
~~~~~~

Line 586

~~~~~~text
// ---------- game log card ----------
~~~~~~

Line 619

~~~~~~text
// ---------- mods ----------
~~~~~~

Line 628

~~~~~~text
// ---------- shared paginated search results (mods + resource packs) ----------
~~~~~~

Line 632

~~~~~~text
// One search-result row: icon, title/description, Install button.
~~~~~~

Line 675

~~~~~~text
// Renders one page (PER_PAGE items) of state.hits into container, with prev/next
~~~~~~

Line 676

~~~~~~text
// controls in pager. state = { hits, page }.
~~~~~~

Line 761

~~~~~~text
// built-in mod first
~~~~~~

Line 827

~~~~~~text
// ---------- resource packs ----------
~~~~~~

Line 926

~~~~~~text
// ---------- settings ----------
~~~~~~

Line 961

~~~~~~text
// ---------- updates ----------
~~~~~~

Line 996

~~~~~~text
// ---------- init ----------
~~~~~~

Line 998

~~~~~~text
// The version list needs the network; keep trying in the background so a
~~~~~~

Line 999

~~~~~~text
// cold boot (network not up yet) never blocks anything.
~~~~~~

Line 1005

~~~~~~text
/* keep the Fabric-only fallback */
~~~~~~

Line 1011

~~~~~~text
/* offline — retry below */
~~~~~~

Line 1016

~~~~~~text
// 0. If this launch runs inside a dev sandbox (redirected %APPDATA%), say so
~~~~~~

Line 1017

~~~~~~text
//    loudly — packs/logins created here never reach the normal install.
~~~~~~

Line 1025

~~~~~~text
/* cosmetic only */
~~~~~~

Line 1027

~~~~~~text
// 1. Local data first — this reads config on disk and must NEVER be blocked
~~~~~~

Line 1028

~~~~~~text
//    by the network, or a cold boot hides the user's packs. Each step is
~~~~~~

Line 1029

~~~~~~text
//    independent so one failure can't skip the others, and packs retry.
~~~~~~

Line 1030

~~~~~~text
/* settings are non-critical */
~~~~~~

Line 1033

~~~~~~text
// 2. Version list + release notes (network) — optional; failure must not hide packs.
~~~~~~

Line 1037

~~~~~~text
// 3. Account (network) — optional.
~~~~~~

Line 1041

~~~~~~text
/* stay logged out */
~~~~~~

## daylight/src/renderer/index.html

Line 11

~~~~~~text
<!-- ————— left icon rail ————— -->
~~~~~~

Line 39

~~~~~~text
<!-- ————— content column ————— -->
~~~~~~

Line 41

~~~~~~text
<!-- custom title bar (draggable) -->
~~~~~~

Line 50

~~~~~~text
<!-- account switcher -->
~~~~~~

Line 64

~~~~~~text
<!-- window controls -->
~~~~~~

Line 74

~~~~~~text
<!-- ————— HOME ————— -->
~~~~~~

Line 126

~~~~~~text
<!-- right panel: what's new, page back through past releases -->
~~~~~~

Line 146

~~~~~~text
<!-- ————— PACKS ————— -->
~~~~~~

Line 158

~~~~~~text
<!-- ————— MODS ————— -->
~~~~~~

Line 185

~~~~~~text
<!-- ————— RESOURCE PACKS (wired in the next pass) ————— -->
~~~~~~

Line 211

~~~~~~text
<!-- ————— SETTINGS ————— -->
~~~~~~

Line 251

~~~~~~text
<!-- new pack dialog -->
~~~~~~

## daylight/src/renderer/style.css

Line 1

~~~~~~text
/* ————— Daylight — modern dark redesign ————— */
~~~~~~

Line 10

~~~~~~text
/* Warm-tinted darks: shadow cast by a sunlit yellow, never a cool blue-black */
~~~~~~

Line 14

~~~~~~text
/* raised card */
~~~~~~

Line 15

~~~~~~text
/* inputs / hover */
~~~~~~

Line 24

~~~~~~text
/* Signature: yellow falling off into deep amber shadow */
~~~~~~

Line 27

~~~~~~text
/* text on a yellow fill */
~~~~~~

Line 53

~~~~~~text
/* ————— left icon rail ————— */
~~~~~~

Line 106

~~~~~~text
/* rail tooltip */
~~~~~~

Line 125

~~~~~~text
/* ————— content column ————— */
~~~~~~

Line 128

~~~~~~text
/* custom title bar */
~~~~~~

Line 141

~~~~~~text
/* the signature: bright yellow falling off into deep amber */
~~~~~~

Line 148

~~~~~~text
/* account switcher (in topbar) */
~~~~~~

Line 193

~~~~~~text
/* window controls */
~~~~~~

Line 206

~~~~~~text
/* ————— stage / tabs ————— */
~~~~~~

Line 223

~~~~~~text
/* ————— home layout ————— */
~~~~~~

Line 246

~~~~~~text
/* sunlit at the top, falling into shadow at the baseline */
~~~~~~

Line 258

~~~~~~text
/* launch bar */
~~~~~~

Line 296

~~~~~~text
/* session-expired bar */
~~~~~~

Line 305

~~~~~~text
/* game log card */
~~~~~~

Line 326

~~~~~~text
/* home right info panel */
~~~~~~

Line 334

~~~~~~text
/* what's-new panel */
~~~~~~

Line 356

~~~~~~text
/* ————— buttons / inputs ————— */
~~~~~~

Line 396

~~~~~~text
/* ————— packs ————— */
~~~~~~

Line 415

~~~~~~text
/* ————— mods / resource packs ————— */
~~~~~~

Line 435

~~~~~~text
/* paginated grid (resource packs + future mods) */
~~~~~~

Line 443

~~~~~~text
/* ————— settings ————— */
~~~~~~

Line 449

~~~~~~text
/* the per-pack Daylight switch, sitting with the version and loader pickers */
~~~~~~

Line 459

~~~~~~text
/* ————— misc ————— */
~~~~~~

Line 490

~~~~~~text
/* scrollbars */
~~~~~~

## daylight/src/renderer/workspace.css

Line 1

~~~~~~text
/* Workspace layer: warm obsidian, restrained amber, static artwork (no GPU loops). */
~~~~~~

## daylight/src/renderer/workspace.js

Line 1

~~~~~~text
/* Shared instance cards and command palette. Backend owns all filesystem access. */
~~~~~~

## daylight/tools/after-build.js

Line 1

~~~~~~text
// Copy local artifacts and matching update manifests to the user's share folder.
~~~~~~

Line 8

~~~~~~text
// Native Mac/Linux runners don't have this Windows share folder.
~~~~~~

Line 26

~~~~~~text
// electron-builder does not always list the update manifest as an
~~~~~~

Line 27

~~~~~~text
// artifact, but it is emitted beside the Windows installer.
~~~~~~

Line 28

~~~~~~text
// Preview installers must never overwrite the stable update manifest.
~~~~~~

## daylight/tools/dev-isolated.js

Line 1

~~~~~~text
// Dev-only entry point: run the launcher with a throwaway userData profile so
~~~~~~

Line 2

~~~~~~text
// a test instance never fights the installed app's single-instance lock and
~~~~~~

Line 3

~~~~~~text
// never reads or writes the real config. Usage:
~~~~~~

Line 4

~~~~~~text
//   npx electron tools/dev-isolated.js [--remote-debugging-port=9223]
~~~~~~

## daylight/tools/dump-args.js

Line 1

~~~~~~text
// Reproduces the launcher's MCLC call with offline auth and dumps the exact
~~~~~~

Line 2

~~~~~~text
// java argv (especially -cp) to a file, then kills java before the window.
~~~~~~

Line 19

~~~~~~text
// find the -cp value and pretty-print each entry
~~~~~~

## daylight/tools/make-icon.js

Line 1

~~~~~~text
// Generates the Daylight app icon (sun on dark rounded square) as PNG + ICO,
~~~~~~

Line 2

~~~~~~text
// with no image library — raw RGBA buffer + hand-rolled PNG/ICO encoding.
~~~~~~

Line 7

~~~~~~text
// ---------- drawing ----------
~~~~~~

Line 19

~~~~~~text
// #0d1119
~~~~~~

Line 20

~~~~~~text
// #ffe37a
~~~~~~

Line 21

~~~~~~text
// #f5a524
~~~~~~

Line 27

~~~~~~text
// rounded-rect coverage (signed distance)
~~~~~~

Line 39

~~~~~~text
// sun disc with soft radial gradient
~~~~~~

Line 42

~~~~~~text
// 8 rays
~~~~~~

Line 78

~~~~~~text
// ---------- PNG encoding ----------
~~~~~~

Line 109

~~~~~~text
// bit depth
~~~~~~

Line 110

~~~~~~text
// RGBA
~~~~~~

Line 113

~~~~~~text
// filter: none
~~~~~~

Line 124

~~~~~~text
// ---------- ICO (PNG-embedded, valid on Vista+) ----------
~~~~~~

Line 129

~~~~~~text
// type: icon
~~~~~~

Line 130

~~~~~~text
// one image
~~~~~~

Line 132

~~~~~~text
// 256px
~~~~~~

Line 134

~~~~~~text
// planes
~~~~~~

Line 135

~~~~~~text
// bpp
~~~~~~

Line 141

~~~~~~text
// ---------- write files ----------
~~~~~~

Line 150

~~~~~~text
// Linux AppImage wants a 512px PNG (electron-builder picks up build/icon.png).
~~~~~~

## daylight/tools/pack-linux-portable.cjs

Line 1

~~~~~~text
// Cross-host tar packaging must restore POSIX executable bits: Windows file
~~~~~~

Line 2

~~~~~~text
// stats otherwise turn Electron and its crash handler into non-executable files.
~~~~~~

## daylight/tools/prepare-bundles.cjs

Line 19

~~~~~~text
// Keep existing legacy jars for already-created instances, while all new
~~~~~~

Line 20

~~~~~~text
// selections remain 1.19+. Never mutate the production bundled directory.
~~~~~~

## daylight/tools/prepare-preview.cjs

Line 1

~~~~~~text
// Retain the opt-in, isolated development build; normal dist commands release Daylight.
~~~~~~

## daylight/tools/publish-release.js

Line 1

~~~~~~text
// Publishes the draft release electron-builder just created.
~~~~~~

Line 2

~~~~~~text
// Handles the electron-builder quirk of creating duplicate drafts for one tag:
~~~~~~

Line 3

~~~~~~text
// consolidates assets onto the complete draft, deletes the rest, publishes.
~~~~~~

Line 4

~~~~~~text
//
~~~~~~

Line 5

~~~~~~text
// Usage:  set GH_TOKEN, then:  node tools/publish-release.js
~~~~~~

Line 35

~~~~~~text
// the "complete" draft is the one carrying latest.yml
~~~~~~

Line 39

~~~~~~text
// move any assets that only exist on duplicate drafts (e.g. the blockmap)
~~~~~~

Line 44

~~~~~~text
// prefer the local dist copy (identical bytes) for re-upload
~~~~~~

Line 60

~~~~~~text
// electron-builder leaves the body empty; use the release commit's message so
~~~~~~

Line 61

~~~~~~text
// the launcher's Updates panel has something to show.
~~~~~~

Line 68

~~~~~~text
/* notes are a nicety, not worth failing the publish over */
~~~~~~

## daylight/tools/snapshot-preview-bundles.cjs

Line 1

~~~~~~text
// Generated, platform-neutral mod assets for clean native-host/CI checkouts.
~~~~~~

Line 2

~~~~~~text
// Stable bundled/ is never changed by this command.
~~~~~~

## daylight/tools/stage-dev-jar.ps1

Line 1

~~~~~~text
# Copies a freshly built Daylight mod jar into the INSTALLED launcher, so a dev
~~~~~~

Line 2

~~~~~~text
# build can be tested without reinstalling.
~~~~~~

Line 3

~~~~~~text
#
~~~~~~

Line 4

~~~~~~text
# The installed app reads its bundled jars from its own program directory, not
~~~~~~

Line 5

~~~~~~text
# from this repo -- copying into the repo's bundled/ folder has no effect on an
~~~~~~

Line 6

~~~~~~text
# installed copy. That trips people up, so this does both.
~~~~~~

Line 7

~~~~~~text
#
~~~~~~

Line 8

~~~~~~text
# Usage:  powershell -ExecutionPolicy Bypass -File tools\stage-dev-jar.ps1
~~~~~~

Line 9

~~~~~~text
#         powershell -ExecutionPolicy Bypass -File tools\stage-dev-jar.ps1 -Version 1.21.8
~~~~~~

Line 37

~~~~~~text
# The launcher copies bundled -> pack by content hash at launch, so refreshing
~~~~~~

Line 38

~~~~~~text
# the installed copy is enough. Drop the pack copy too in case the game is
~~~~~~

Line 39

~~~~~~text
# mid-session and would otherwise keep the stale one.
~~~~~~

## daylight/tools/test-fix.js

Line 1

~~~~~~text
// Launches the exact MCLC java command with an extra JVM flag, captures output,
~~~~~~

Line 2

~~~~~~text
// kills after a timeout, and reports whether the mixin classloader crash occurred.
~~~~~~

Line 10

~~~~~~text
// Parse launch-args.txt: args are one-per-line until the "=== CLASSPATH" marker.
~~~~~~

Line 15

~~~~~~text
// JVM flags to inject
~~~~~~

Line 22

~~~~~~text
// insert extra flags right before -cp
~~~~~~

Line 27

~~~~~~text
// canonicalize every classpath entry, the natives path, and the gameDir so
~~~~~~

Line 28

~~~~~~text
// they match what the JVM records as code sources under AppContainer redirection
~~~~~~

Line 61

~~~~~~text
// print last meaningful lines
~~~~~~

## daylight/tools/test-install.cjs

Line 75

~~~~~~text
// Node does not normally provide Electron's resourcesPath.
~~~~~~

## daylight/tools/test-ui.cjs

Line 1

~~~~~~text
// Hidden renderer fixture test. Never loads main.js or touches real profiles.
~~~~~~

Line 73

~~~~~~text
// Let Chromium paint the last navigation before capturing a visual artifact.
~~~~~~

## daylight/tools/test-workspace.js

Line 53

~~~~~~text
// Stream close is asynchronous; wait for the test-owned file to be flushed.
~~~~~~

## daylight/tools/verify-1.21.11.js

Line 1

~~~~~~text
// Full end-to-end test of the default (1.21.11) Daylight pack: replicates the
~~~~~~

Line 2

~~~~~~text
// launcher's ensurePackReady + ensureFabricProfile, then launches offline and
~~~~~~

Line 3

~~~~~~text
// reports whether Fabric + all mods load cleanly.
~~~~~~

Line 45

~~~~~~text
// clear old-version mods (same as manifest version-change logic)
~~~~~~

Line 60

~~~~~~text
// fabric profile
~~~~~~

## daylight/tools/verify-java-provision.js

Line 1

~~~~~~text
// Fresh-PC simulation: force-download a JRE from Adoptium (ignoring system
~~~~~~

Line 2

~~~~~~text
// JDKs), then launch MC 1.21.11 using ONLY that runtime.
~~~~~~

Line 45

~~~~~~text
// wipe managed runtime to force the download path (fresh-PC simulation)
~~~~~~

## daylight/tools/verify-launch.js

Line 1

~~~~~~text
// End-to-end proof of the main.js fix: build MCLC options with the SAME
~~~~~~

Line 2

~~~~~~text
// canonical root logic main.js uses, launch with offline auth, and report
~~~~~~

Line 3

~~~~~~text
// whether Fabric got past the preLaunch classloader crash.
~~~~~~

## daylight/tools/verify-preview.cjs

Line 1

~~~~~~text
// Read-only verification of the packaged Windows preview and its share copy.
~~~~~~

## daylight-android/.github/stale.yml

Line 1

~~~~~~text
# Number of days of inactivity before an issue becomes stale
~~~~~~

Line 3

~~~~~~text
# Number of days of inactivity before a stale issue is closed
~~~~~~

Line 5

~~~~~~text
# Issues with these labels will never be considered stale
~~~~~~

Line 9

~~~~~~text
# Label to use when marking an issue as stale
~~~~~~

Line 11

~~~~~~text
# Comment to post when marking an issue as stale. Set to `false` to disable
~~~~~~

Line 16

~~~~~~text
# Comment to post when closing a stale issue. Set to `false` to disable
~~~~~~

## daylight-android/.github/workflows/android.yml

Line 63

~~~~~~text
# Build the launcher
~~~~~~

## daylight-android/app_pojavlauncher/build.gradle

Line 94

~~~~~~text
// Increase monotonically for every published APK; never use CI run IDs.
~~~~~~

Line 97

~~~~~~text
//important
~~~~~~

Line 138

~~~~~~text
// Don't set to true or java.awt will be a.a or something similar.
~~~~~~

Line 141

~~~~~~text
// defaultConfig already set
~~~~~~

Line 142

~~~~~~text
// multiDexEnabled = true
~~~~~~

Line 143

~~~~~~text
// debuggable = true
~~~~~~

Line 275

~~~~~~text
// Nasty hack: explicitly reference project by name to force Gradle to configure it.
~~~~~~

Line 276

~~~~~~text
// Makes jar task search below work properly for fresh configurations.
~~~~~~

Line 337

~~~~~~text
// implementation 'com.wu-man:android-bsf-api:3.1.3'
~~~~~~

Line 339

~~~~~~text
//implementation 'androidx.core:core:1.7.0'
~~~~~~

Line 353

~~~~~~text
// implementation 'com.intuit.sdp:sdp-android:1.0.5'
~~~~~~

Line 354

~~~~~~text
// implementation 'com.intuit.ssp:ssp-android:1.0.5'
~~~~~~

Line 357

~~~~~~text
// Our version of exp4j can be built from source at
~~~~~~

Line 358

~~~~~~text
// https://github.com/PojavLauncherTeam/exp4j
~~~~~~

Line 366

~~~~~~text
// implementation 'net.sourceforge.streamsupport:streamsupport-cfuture:1.7.0'
~~~~~~

## daylight-android/app_pojavlauncher/proguard-rules.pro

Line 1

~~~~~~text
# Add project specific ProGuard rules here.
~~~~~~

Line 2

~~~~~~text
# By default, the flags in this file are appended to flags specified
~~~~~~

Line 3

~~~~~~text
# in C:\tools\adt-bundle-windows-x86_64-20131030\sdk/tools/proguard/proguard-android.txt
~~~~~~

Line 4

~~~~~~text
# You can edit the include path and order by changing the proguardFiles
~~~~~~

Line 5

~~~~~~text
# directive in build.gradle.
~~~~~~

Line 6

~~~~~~text
#
~~~~~~

Line 7

~~~~~~text
# For more details, see
~~~~~~

Line 8

~~~~~~text
#   http://developer.android.com/guide/developing/tools/proguard.html
~~~~~~

Line 10

~~~~~~text
# Add any project specific keep options here:
~~~~~~

Line 12

~~~~~~text
# If your project uses WebView with JS, uncomment the following
~~~~~~

Line 13

~~~~~~text
# and specify the fully qualified class name to the JavaScript interface
~~~~~~

Line 14

~~~~~~text
# class:
~~~~~~

Line 15

~~~~~~text
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
~~~~~~

Line 16

~~~~~~text
#   public *;
~~~~~~

Line 17

~~~~~~text
#}
~~~~~~

Line 19

~~~~~~text
# We use Reflection on the builder to avoid creating too many objects
~~~~~~

Line 24

~~~~~~text
# Option screens
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/ipaulpro/afilechooser/FileListAdapter.java

Line 28

~~~~~~text
/**
 * List adapter for Files.
 * 
 * @version 2013-12-11
 * @author paulburke (ipaulpro)
 *
 * @addDate 2018-08-08
 * @addToMyProject khanhduy032
 */
~~~~~~

Line 89

~~~~~~text
/**
     * Set the list items without notifying on the clear. This prevents loss of
     * scroll position.
     *
     * @param data
     */
~~~~~~

Line 109

~~~~~~text
// Get the file at the current position
~~~~~~

Line 112

~~~~~~text
// Set the TextView as the file name
~~~~~~

Line 115

~~~~~~text
// If the item is not a directory, use the file icon
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/CustomSeekbar.java

Line 14

~~~~~~text
/**
 * Seekbar with ability to handle ranges and increments
 */
~~~~~~

Line 24

~~~~~~text
/** When using increments, this flag is used to prevent double calls to the listener */
~~~~~~

Line 26

~~~~~~text
/** Store the previous progress to prevent double calls with increments */
~~~~~~

Line 43

~~~~~~text
// Forces the thumb to snap to the increment
~~~~~~

Line 116

~~~~~~text
//todo perform something to update the progress ?
~~~~~~

Line 121

~~~~~~text
/**
     * Wrapper to allow for a listener to be set around the internal listener
     */
~~~~~~

Line 139

~~~~~~text
// Due to issues with negative progress when setting up the seekbar
~~~~~~

Line 140

~~~~~~text
// We need to set a random progress to force the refresh of the thumb
~~~~~~

Line 152

~~~~~~text
/**
     * Apply increment to the progress
     * @param progress Progress to apply increment to
     * @return Progress with increment applied
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/DefocusableScrollView.java

Line 8

~~~~~~text
/**
    Class allowing to ignore the focusing from an item such an EditText within it.
    Ignoring it will stop the scrollView from refocusing on the view
*/
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/LoggerView.java

Line 18

~~~~~~text
/**
 * A class able to display logs to the user.
 * It has support for the Logger class
 */
~~~~~~

Line 41

~~~~~~text
// Triggers the log view shown state by default when viewing it
~~~~~~

Line 45

~~~~~~text
/**
     * Inflate the layout, and add component behaviors
     */
~~~~~~

Line 52

~~~~~~text
//TODO clamp the max text so it doesn't go oob
~~~~~~

Line 57

~~~~~~text
// Toggle log visibility
~~~~~~

Line 66

~~~~~~text
// Makes the JNI code be able to skip expensive logger callbacks
~~~~~~

Line 67

~~~~~~text
// NOTE: was tested by rapidly smashing the log on/off button, no sync issues found :)
~~~~~~

Line 72

~~~~~~text
// Remove the loggerView from the user View
~~~~~~

Line 76

~~~~~~text
// Set the scroll view
~~~~~~

Line 80

~~~~~~text
//Set up the autoscroll switch
~~~~~~

Line 90

~~~~~~text
// Listen to logs
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/mcgui/AccountSpinner.java

Line 52

~~~~~~text
/* Login progress bar stuff */
~~~~~~

Line 74

~~~~~~text
/* Login listeners */
~~~~~~

Line 87

~~~~~~text
/* Account main menu refresh listener */
~~~~~~

Line 170

~~~~~~text
// Wait until all tasks (including other possible login tasks) are done before
~~~~~~

Line 171

~~~~~~text
// attempting to refresh the account.
~~~~~~

Line 173

~~~~~~text
// Reload the account data before attempting to refresh (what if it was already refreshed in the background?)
~~~~~~

Line 313

~~~~~~text
// "Add account" button
~~~~~~

Line 318

~~~~~~text
// Only activate the listener behaviour when in drop-down mode
~~~~~~

Line 319

~~~~~~text
// or when there's no accounts
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/mcgui/LauncherMenuButton.java

Line 33

~~~~~~text
/** Set style stuff */
~~~~~~

Line 44

~~~~~~text
// Set drawable size
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/mcgui/mcVersionSpinner.java

Line 41

~~~~~~text
/**
 * A class implementing custom spinner like behavior, notably:
 * dropdown popup view with a custom direction.
 */
~~~~~~

Line 60

~~~~~~text
/* The class is in charge of displaying its own list with adapter content being known in advance */
~~~~~~

Line 73

~~~~~~text
/** Set the selection AND saves it as a shared preference */
~~~~~~

Line 100

~~~~~~text
/** Reload profiles from the file, forcing the spinner to consider the new data */
~~~~~~

Line 112

~~~~~~text
/** Initialize various behaviors */
~~~~~~

Line 114

~~~~~~text
// Setup various attributes
~~~~~~

Line 124

~~~~~~text
// Popup window behavior
~~~~~~

Line 136

~~~~~~text
// Post() is required for the layout inflation phase
~~~~~~

Line 143

~~~~~~text
//Replace with switch-case if you want to add more extra actions
~~~~~~

Line 151

~~~~~~text
/** Create the listView and popup window for the interface, and set up the click behavior */
~~~~~~

Line 171

~~~~~~text
// Block clicking outside of the popup window
~~~~~~

Line 183

~~~~~~text
// Custom animation, nice slide in
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/mcgui/ProgressLayout.java

Line 26

~~~~~~text
/** Class staring at specific values and automatically show something if the progress is present
 * Since progress is posted in a specific way, The packing/unpacking is handheld by the class
 *
 * This class relies on ExtraCore for its behavior.
 */
~~~~~~

Line 91

~~~~~~text
/** Update the progress bar content */
~~~~~~

Line 96

~~~~~~text
/** Update the text and progress content */
~~~~~~

Line 101

~~~~~~text
/** Update the text and progress content */
~~~~~~

Line 106

~~~~~~text
/** Update the text and progress content */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/pickafile/FileListView.java

Line 16

~~~~~~text
//For list view:
~~~~~~

Line 21

~~~~~~text
//For File selected listener:
~~~~~~

Line 26

~~~~~~text
//For filtering by file types:
~~~~~~

Line 69

~~~~~~text
//Main setup:
~~~~~~

Line 79

~~~~~~text
// TODO: Implement this method
~~~~~~

Line 89

~~~~~~text
// TODO: Implement this method
~~~~~~

Line 101

~~~~~~text
// Android 10+ disallows access to sdcard
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/SideDialogView.java

Line 26

~~~~~~text
/**
 * The base class for side dialog views
 * A side dialog is a dialog appearing from one side of the screen
 */
~~~~~~

Line 42

~~~~~~text
/* UI elements */
~~~~~~

Line 47

~~~~~~text
/* Data to store when the UI element has yet to be inflated */
~~~~~~

Line 92

~~~~~~text
// Inflate layouts
~~~~~~

Line 103

~~~~~~text
// Attach layouts
~~~~~~

Line 115

~~~~~~text
//TODO offset better according to view width
~~~~~~

Line 118

~~~~~~text
// Set up UI elements
~~~~~~

Line 124

~~~~~~text
/** Destroy the layout, cleanup variables */
~~~~~~

Line 147

~~~~~~text
/**
     * Slide the layout into the visible screen area
     */
~~~~~~

Line 157

~~~~~~text
// To avoid UI sizing issue when the dialog is not fully inflated
~~~~~~

Line 184

~~~~~~text
/**
     * Slide out the layout
     * @param destroy Whether the layout should be destroyed after disappearing.
     *                Recommended to be true if the layout is not going to be used anymore
     */
~~~~~~

Line 229

~~~~~~text
/** @return Whether the dialog is currently displaying */
~~~~~~

Line 234

~~~~~~text
/**
     * Called when the dialog is inflated, ideal for setting up UI elements bindings
     */
~~~~~~

Line 239

~~~~~~text
/**
     * Called after the dialog has appeared
     */
~~~~~~

Line 244

~~~~~~text
/**
     * Called after the dialog has disappeared
     */
~~~~~~

Line 249

~~~~~~text
/**
     * Called before the dialog gets destroyed (removing views from parent)
     * Ideal for cleaning up resources
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/com/kdt/SimpleArrayAdapter.java

Line 17

~~~~~~text
/**
 * Basic adapter, expect it uses the what is passed by the code, no the resources
 * @param <T>
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/dalvik/annotation/optimization/CriticalNative.java

Line 7

~~~~~~text
//  Dummy CriticalNative annotation. On devices which dont have it this declaration will prevent errors.
~~~~~~

Line 8

~~~~~~text
//  On devices that do have it it will be overridden by the system one and work as usual
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/Architecture.java

Line 5

~~~~~~text
/**
 * This class aims at providing a simple and easy way to deal with the device architecture.
 */
~~~~~~

Line 15

~~~~~~text
/* On both 32-bit ARM and x86, the top 1GB is reserved for kernel use. */
~~~~~~

Line 17

~~~~~~text
/*
	 * Technically, this is supposed to be 48 bits on x86_64, but nobody's allocating
	 * 524288 terabytes of RAM on Pojav any time soon.
	 */
~~~~~~

Line 23

~~~~~~text
/**
	 * Get the highest byte accessible within the process's address space.
	 * @return the highest byte accessible within the process's address space.
	 */
~~~~~~

Line 31

~~~~~~text
/**
	 * Tell us if the device supports 64 bits architecture
	 * @return If the device supports 64 bits architecture
	 */
~~~~~~

Line 39

~~~~~~text
/**
	 * Tell us if the device supports 32 bits architecture
	 * Note, that a 64 bits device won't be reported as supporting 32 bits.
	 * @return If the device supports 32 bits architecture
	 */
~~~~~~

Line 48

~~~~~~text
/**
	 * Tells the device supported architecture.
	 * Since mips(/64) has been phased out long ago, is isn't checked here.
	 *
	 * @return ARCH_ARM || ARCH_ARM64 || ARCH_X86 || ARCH_86_64
	 */
~~~~~~

Line 61

~~~~~~text
/**
	 * Tell is the device is based on an x86 processor.
	 * It doesn't tell if the device is 64 or 32 bits.
	 * @return Whether or not the device is x86 based.
	 */
~~~~~~

Line 67

~~~~~~text
//We check the whole range of supported ABIs,
~~~~~~

Line 68

~~~~~~text
//Since asus zenfones can place arm before their native instruction set.
~~~~~~

Line 79

~~~~~~text
/**
	 * Convert an architecture from a String to an int.
	 * @param arch The architecture as a String
	 * @return The architecture as an int, can be UNSUPPORTED_ARCH if unknown.
	 */
~~~~~~

Line 90

~~~~~~text
//Shouldn't happen
~~~~~~

Line 94

~~~~~~text
/**
	 * Convert to a string an architecture.
	 * @param arch The architecture as an int.
	 * @return "arm64" || "arm" || "x86_64" || "x86" || "UNSUPPORTED_ARCH"
	 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/authenticator/accounts/Account.java

Line 26

~~~~~~text
// access token
~~~~~~

Line 27

~~~~~~text
// profile UUID, for obtaining skin
~~~~~~

Line 45

~~~~~~text
// Streaming it directly breaks on some devices
~~~~~~

Line 57

~~~~~~text
// Skin refresh limit, no internet connection, etc...
~~~~~~

Line 58

~~~~~~text
// Simply ignore updating skin face
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/authenticator/accounts/SkinHeadRenderer.java

Line 17

~~~~~~text
// Points of an isometric cube
~~~~~~

Line 19

~~~~~~text
// 0 Bottom-most point
~~~~~~

Line 20

~~~~~~text
// 1 Bottom right point
~~~~~~

Line 21

~~~~~~text
// 2 Bottom left point
~~~~~~

Line 22

~~~~~~text
// 3 Topmost point
~~~~~~

Line 23

~~~~~~text
// 4 Top right point
~~~~~~

Line 24

~~~~~~text
// 5 Top left point
~~~~~~

Line 25

~~~~~~text
// 6 Center point
~~~~~~

Line 28

~~~~~~text
// Faces of an isometric cube
~~~~~~

Line 58

~~~~~~text
// Provision for HD skins: scale regular skin coordinate inputs
~~~~~~

Line 70

~~~~~~text
/**
     * Write one face of an isometric cube as mesh points suitable for drawBitmapMesh()
     * @param dst destination array for mesh (should have length of 8)
     * @param face the face to write (one of the face constants)
     * @param mul the amount by how much each point should be multiplied
     * @param off the amount by how much each point should be offset to the right
     */
~~~~~~

Line 138

~~~~~~text
// Bitmap overlay regions
~~~~~~

Line 146

~~~~~~text
// Bitmap head regions
~~~~~~

Line 156

~~~~~~text
// The head should be slightly smaller than the accessory overlay around it,
~~~~~~

Line 157

~~~~~~text
// and should appear to be in the middle of the accessory overlay.
~~~~~~

Line 161

~~~~~~text
// Rear side of overlay layer
~~~~~~

Line 166

~~~~~~text
// Player head
~~~~~~

Line 171

~~~~~~text
// Front side of the overlay layer
~~~~~~

Line 176

~~~~~~text
// Free all regions
~~~~~~

Line 179

~~~~~~text
// Done!
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/authenticator/AuthType.java

Line 16

~~~~~~text
// Switched from mc-heads.net cause blocked in Russia
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/authenticator/impl/CommonLoginUtils.java

Line 46

~~~~~~text
/**
     * @param data A series a strings: key1, value1, key2, value2...
     * @return the data converted as a form string for a POST request
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/authenticator/impl/MicrosoftBackgroundLogin.java

Line 35

~~~~~~text
/** Allow to perform a background login on a given account */
~~~~~~

Line 56

~~~~~~text
/* Fields used to fill the account  */
~~~~~~

Line 169

~~~~~~text
//acquireXsts(jo.getString("Token"));
~~~~~~

Line 175

~~~~~~text
/** @return [uhs, token]*/
~~~~~~

Line 205

~~~~~~text
//acquireMinecraftToken(uhs,jo.getString("Token"));
~~~~~~

Line 241

~~~~~~text
//checkMcProfile(jo.getString("access_token"));
~~~~~~

Line 258

~~~~~~text
// We don't need any data from this request, it just needs to happen in order for
~~~~~~

Line 259

~~~~~~text
// the MS servers to work properly. The data from this is practically useless
~~~~~~

Line 260

~~~~~~text
// as it does not indicate whether the user owns the game through Game Pass.
~~~~~~

Line 290

~~~~~~text
//throwResponseError(conn);
~~~~~~

Line 294

~~~~~~text
/** Wrapper to ease notifying the listener */
~~~~~~

Line 301

~~~~~~text
/** Set common properties for the connection. Given that all requests are POST, interactivity is always enabled */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/awt/AWTActivity.java

Line 115

~~~~~~text
// MotionEvent reports input details from the touch screen
~~~~~~

Line 116

~~~~~~text
// and other input controls. In this case, you are only
~~~~~~

Line 117

~~~~~~text
// interested in events where the touch position changed.
~~~~~~

Line 118

~~~~~~text
// int index = event.getActionIndex();
~~~~~~

Line 132

~~~~~~text
// 2
~~~~~~

Line 156

~~~~~~text
// 1
~~~~~~

Line 157

~~~~~~text
// 3
~~~~~~

Line 158

~~~~~~text
// 6
~~~~~~

Line 160

~~~~~~text
// 2
~~~~~~

Line 295

~~~~~~text
// 0
~~~~~~

Line 296

~~~~~~text
// 5
~~~~~~

Line 299

~~~~~~text
// 1
~~~~~~

Line 300

~~~~~~text
// 3
~~~~~~

Line 301

~~~~~~text
// 6
~~~~~~

Line 341

~~~~~~text
// Clamp positions to the borders of the usable view, then scale them
~~~~~~

Line 347

~~~~~~text
// There's no grab on AWT
~~~~~~

Line 436

~~~~~~text
// there isn't even an arm64 port of jre 1.1 (or anything before 1.8 in fact)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/awt/AWTBridge.java

Line 13

~~~~~~text
// Used from native
~~~~~~

Line 21

~~~~~~text
// Used from native
~~~~~~

Line 28

~~~~~~text
// Used from native
~~~~~~

Line 33

~~~~~~text
// Used from native
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/awt/AWTView.java

Line 28

~~~~~~text
/**
     * Make the view fit the proper aspect ratio of the surface
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/BaseActivity.java

Line 28

~~~~~~text
/** @return Whether the activity should be set as a fullscreen one */
~~~~~~

Line 71

~~~~~~text
/** @return Whether or not the notch should be ignored */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/CallbackBridge.java

Line 120

~~~~~~text
//TODO: actually use it
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/colorselector/AlphaView.java

Line 29

~~~~~~text
// for quick pos->alpha multiplication
~~~~~~

Line 30

~~~~~~text
// for quick alpha->pos multiplication
~~~~~~

Line 31

~~~~~~text
// 1/3 of the view size for cursor
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/colorselector/ColorSelectionListener.java

Line 4

~~~~~~text
/**
     * This method gets called by the ColorSelector when the color is selected
     * @param color the selected color
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/colorselector/ColorSelector.java

Line 44

~~~~~~text
// Initialize the view contents
~~~~~~

Line 58

~~~~~~text
// Set elevation to show above other side dialogs.
~~~~~~

Line 59

~~~~~~text
// Jank, should be done better
~~~~~~

Line 68

~~~~~~text
/**
     * Shows the color selector with the default (red) color selected.
     */
~~~~~~

Line 75

~~~~~~text
/**
     * Shows the color selector with the desired ARGB color selected
     * @param previousColor the desired ARGB color
     */
~~~~~~

Line 81

~~~~~~text
// initialize
~~~~~~

Line 82

~~~~~~text
// set the hex text
~~~~~~

Line 105

~~~~~~text
/**
     * Replaces the alpha value of the color passed in, and returns the result.
     * @param color the color to replace the alpha of
     * @param alpha the alpha to use
     * @return the new color
     */
~~~~~~

Line 115

~~~~~~text
//IUO: called on all color changes
~~~~~~

Line 124

~~~~~~text
//IUO: sets all Views to render the desired color. Used for initialization and HEX color input
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/contracts/OpenDocumentWithExtension.java

Line 18

~~~~~~text
// Android's OpenDocument contract is the basicmost crap that doesn't allow
~~~~~~

Line 19

~~~~~~text
// you to specify practically anything. So i made this instead.
~~~~~~

Line 23

~~~~~~text
/**
     * Create a new OpenDocumentWithExtension contract.
     * If the extension provided to the constructor is not available in the device's MIME
     * type database, the filter will default to "all types"
     * @param extension the extension to filter by
     */
~~~~~~

Line 30

~~~~~~text
// Who would have thought that loading the MIME map takes a significant amount of time?
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/buttons/ControlButton.java

Line 41

~~~~~~text
/* Cache value from the ControlData radius for drawing purposes */
~~~~~~

Line 54

~~~~~~text
// Nullify the default size setting
~~~~~~

Line 55

~~~~~~text
// Disable shadow casting, removing one drawing pass
~~~~~~

Line 57

~~~~~~text
//setOnLongClickListener(this);
~~~~~~

Line 59

~~~~~~text
//When a button is created, the width/height has yet to be processed to fit the scaling.
~~~~~~

Line 83

~~~~~~text
//For the toggle layer
~~~~~~

Line 109

~~~~~~text
// Bitmap uses a tint list, so don't do any custom rendering
~~~~~~

Line 116

~~~~~~text
// Any possible side effects?
~~~~~~

Line 124

~~~~~~text
/** Add another instance of the ControlButton to the parent layout */
~~~~~~

Line 132

~~~~~~text
/** Remove any trace of this button from the layout */
~~~~~~

Line 161

~~~~~~text
// 1
~~~~~~

Line 162

~~~~~~text
// 3
~~~~~~

Line 163

~~~~~~text
// 6
~~~~~~

Line 165

~~~~~~text
//Send the event to be taken as a mouse action
~~~~~~

Line 178

~~~~~~text
// 0
~~~~~~

Line 179

~~~~~~text
// 5
~~~~~~

Line 182

~~~~~~text
// 1
~~~~~~

Line 183

~~~~~~text
// 3
~~~~~~

Line 184

~~~~~~text
// 6
~~~~~~

Line 198

~~~~~~text
//returns true a the toggle system is triggered
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/buttons/ControlDrawer.java

Line 60

~~~~~~text
//Syncing stuff
~~~~~~

Line 108

~~~~~~text
/**
     * Check whether or not the button passed as a parameter belongs to this drawer.
     *
     * @param button The button to look for
     * @return Whether the button is in the buttons list of the drawer.
     */
~~~~~~

Line 144

~~~~~~text
// 1
~~~~~~

Line 145

~~~~~~text
// 6
~~~~~~

Line 180

~~~~~~text
//Getters
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/buttons/ControlInterface.java

Line 31

~~~~~~text
/**
 * Interface injecting custom behavior to a View.
 * Most of the injected behavior is editing behavior,
 * sending keys has to be implemented by sub classes.
 */
~~~~~~

Line 37

~~~~~~text
/**
     * Get this ControlInterface implementation as a View.
     * @return this
     */
~~~~~~

Line 49

~~~~~~text
/**
     * Remove the button presence from the CustomControl object
     * You need to use {getControlParent()} for this.
     */
~~~~~~

Line 55

~~~~~~text
/**
     * Duplicate the data of the button and add a view with the duplicated data
     * Relies on the ControlLayout for the implementation.
     */
~~~~~~

Line 69

~~~~~~text
/**
     * Load the values and hide non useful forms
     */
~~~~~~

Line 76

~~~~~~text
// Disable when edited
~~~~~~

Line 85

~~~~~~text
/**
     * Apply conversion steps for when the view is created
     */
~~~~~~

Line 89

~~~~~~text
//Size
~~~~~~

Line 93

~~~~~~text
//Visibility
~~~~~~

Line 103

~~~~~~text
/* This function should be overridden to store the properties */
~~~~~~

Line 111

~~~~~~text
/**
     * Apply the background according to properties
     */
~~~~~~

Line 137

~~~~~~text
/**
     * Apply the dynamic equation on the x axis.
     *
     * @param dynamicX The equation to compute the position from
     */
~~~~~~

Line 146

~~~~~~text
/**
     * Apply the dynamic equation on the y axis.
     *
     * @param dynamicY The equation to compute the position from
     */
~~~~~~

Line 155

~~~~~~text
/**
     * Generate a dynamic equation from an absolute position, used to scale properly across devices
     *
     * @param x The absolute position on the horizontal axis
     * @return The equation as a String
     */
~~~~~~

Line 170

~~~~~~text
/**
     * Generate a dynamic equation from an absolute position, used to scale properly across devices
     *
     * @param y The absolute position on the vertical axis
     * @return The equation as a String
     */
~~~~~~

Line 185

~~~~~~text
/**
     * Regenerate and apply coordinates with supposedly modified properties
     */
~~~~~~

Line 194

~~~~~~text
/**
     * Do a pre-conversion of an equation using values from a button,
     * so the variables can be used for another button
     * <p>
     * Internal use only.
     *
     * @param equation The dynamic position as a String
     * @param button   The button to get the values from.
     * @return The pre-processed equation as a String.
     */
~~~~~~

Line 213

~~~~~~text
/**
     * Convert a corner radius percentage into a px corner radius
     */
~~~~~~

Line 221

~~~~~~text
/**
     * Passe a series of checks to determine if the ControlButton isn't available to be snapped on.
     *
     * @param button The button to check
     * @return whether or not the button
     */
~~~~~~

Line 241

~~~~~~text
/**
     * Try to snap, then align to neighboring buttons, given the provided coordinates.
     * The new position is automatically applied to the View,
     * regardless of if the View snapped or not.
     * <p>
     * The new position is always dynamic, thus replacing previous dynamic positions
     *
     * @param x Coordinate on the x axis
     * @param y Coordinate on the y axis
     */
~~~~~~

Line 260

~~~~~~text
//Step 1: Filter unwanted buttons
~~~~~~

Line 263

~~~~~~text
//Step 2: Get Coordinates
~~~~~~

Line 274

~~~~~~text
//Step 3: For each axis, we try to snap to the nearest
~~~~~~

Line 275

~~~~~~text
// Bottom snap
~~~~~~

Line 277

~~~~~~text
//Top snap
~~~~~~

Line 280

~~~~~~text
//If we snapped
~~~~~~

Line 281

~~~~~~text
//Left align snap
~~~~~~

Line 283

~~~~~~text
//Right align snap
~~~~~~

Line 288

~~~~~~text
//Left snap
~~~~~~

Line 290

~~~~~~text
//Right snap
~~~~~~

Line 293

~~~~~~text
//If we snapped
~~~~~~

Line 294

~~~~~~text
//Top align snap
~~~~~~

Line 296

~~~~~~text
//Bottom align snap
~~~~~~

Line 307

~~~~~~text
/**
     * Wrapper for multiple injections at once
     */
~~~~~~

Line 317

~~~~~~text
/**
     * Inject the grab listener, remove it when the view is gone
     */
~~~~~~

Line 345

~~~~~~text
/**
     * Inject a touch listener on the view to make editing controls straight forward
     */
~~~~~~

Line 358

~~~~~~text
// Basically, editing behavior is forced while in game behavior is specific
~~~~~~

Line 383

~~~~~~text
// Internally, setX and setY just set the view translation.
~~~~~~

Line 384

~~~~~~text
// Reset before layout to apply the layout pos correctly.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/buttons/ControlJoystick.java

Line 32

~~~~~~text
// Directions keycode
~~~~~~

Line 115

~~~~~~text
/*STUB since non swipeable*/
~~~~~~

Line 118

~~~~~~text
/*STUB since non swipeable*/
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/buttons/ControlSubButton.java

Line 34

~~~~~~text
// STUB, visibility handled by the ControlDrawer
~~~~~~

Line 35

~~~~~~text
//setVisibility(isVisible ? VISIBLE : (!mProperties.isHideable && parentDrawer.getVisibility() == GONE) ? VISIBLE : View.GONE);
~~~~~~

Line 40

~~~~~~text
// STUB, visibility lifecycle handled by the ControlDrawer
~~~~~~

Line 60

~~~~~~text
//mCanTriggerLongClick = true;
~~~~~~

Line 89

~~~~~~text
// Else the button is forced into place
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/ControlData.java

Line 45

~~~~~~text
// Internal usage only
~~~~~~

Line 47

~~~~~~text
/**
     * Both fields below are dynamic position data, auto updates
     * X and Y position, unlike the original one which uses fixed
     * position, so it does not provide auto-location when a control
     * is made on a small device, then import the control to a
     * bigger device or vice versa.
     */
~~~~~~

Line 57

~~~~~~text
//Should store up to 4 keys
~~~~~~

Line 58

~~~~~~text
//Alpha value from 0 to 1;
~~~~~~

Line 61

~~~~~~text
// Dp instead of % now
~~~~~~

Line 62

~~~~~~text
//0-100%
~~~~~~

Line 67

~~~~~~text
//Dp instead of Px now
~~~~~~

Line 68

~~~~~~text
//Dp instead of Px now
~~~~~~

Line 134

~~~~~~text
//Deep copy constructor
~~~~~~

Line 201

~~~~~~text
/**
     * Create a builder, keep a weak reference to it to use it with all views on first inflation
     */
~~~~~~

Line 221

~~~~~~text
/**
     * wrapper for the WeakReference to the expressionField.
     *
     * @param stringExpression the expression to set.
     */
~~~~~~

Line 231

~~~~~~text
/**
     * Build a shared conversion map without the ControlData dependent values
     * You need to set the view dependent values before using it.
     */
~~~~~~

Line 236

~~~~~~text
// Values in the map below may be always changed
~~~~~~

Line 253

~~~~~~text
// Insert value to ${variable}
~~~~~~

Line 256

~~~~~~text
// Calculate, because the dynamic position contains some math equations
~~~~~~

Line 269

~~~~~~text
//Getters || setters (with conversion for ease of use)
~~~~~~

Line 286

~~~~~~text
/**
     * Fill the conversionMap with controlData dependent values.
     * The returned valueMap should NOT be kept in memory.
     *
     * @return the valueMap to use.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/ControlJoystickData.java

Line 5

~~~~~~text
/* Whether the joystick can stay forward */
~~~~~~

Line 7

~~~~~~text
/*
     * Whether the finger tracking is absolute (joystick jumps to where you touched)
     * or relative (joystick stays in the center)
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/ControlLayout.java

Line 51

~~~~~~text
/* Accessible when inside the game by ControlInterface implementations, cached for perf. */
~~~~~~

Line 54

~~~~~~text
/* Cache to buttons for performance purposes */
~~~~~~

Line 84

~~~~~~text
// Load an empty layout on exception to avoid breakage when adding buttons in the editor
~~~~~~

Line 112

~~~~~~text
// Cleanup buttons only when input layout is null
~~~~~~

Line 118

~~~~~~text
// Joystick(s) first, to workaround the touch dispatch
~~~~~~

Line 123

~~~~~~text
//CONTROL BUTTON
~~~~~~

Line 128

~~~~~~text
//CONTROL DRAWER
~~~~~~

Line 138

~~~~~~text
// Force refresh
~~~~~~

Line 139

~~~~~~text
// loadLayout
~~~~~~

Line 141

~~~~~~text
//CONTROL BUTTON
~~~~~~

Line 160

~~~~~~text
// CONTROL DRAWER
~~~~~~

Line 180

~~~~~~text
//CONTROL SUB BUTTON
~~~~~~

Line 189

~~~~~~text
//CONTROL SUB-BUTTON
~~~~~~

Line 191

~~~~~~text
//Yep there isn't much here
~~~~~~

Line 214

~~~~~~text
// JOYSTICK BUTTON
~~~~~~

Line 239

~~~~~~text
//i wanna be sure that all the removed Views will be removed after a reload
~~~~~~

Line 240

~~~~~~text
//because if frames will slowly go down after many control changes it will be warm and bad
~~~~~~

Line 262

~~~~~~text
// Not using on custom controls activity
~~~~~~

Line 266

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 313

~~~~~~text
/**
	 * Load the layout if needed, and pass down the burden of filling values
	 * to the button at hand.
	 */
~~~~~~

Line 319

~~~~~~text
// When the panel is null, it needs to inflate first.
~~~~~~

Line 320

~~~~~~text
// So inflate it, then process it on the next frame
~~~~~~

Line 342

~~~~~~text
//mHandleView.show();
~~~~~~

Line 345

~~~~~~text
/** Swap the panel if the button position requires it */
~~~~~~

Line 359

~~~~~~text
//While this is called onTouch, this should only be called from a ControlButton.
~~~~~~

Line 364

~~~~~~text
// Map location to screen coordinates
~~~~~~

Line 368

~~~~~~text
//Check if the action is cancelling, reset the lastControl button associated to the view
~~~~~~

Line 379

~~~~~~text
//Optimization pass to avoid looking at all children again
~~~~~~

Line 386

~~~~~~text
//Release last keys
~~~~~~

Line 390

~~~~~~text
// Update the state of all swipeable buttons
~~~~~~

Line 394

~~~~~~text
//Press the new key
~~~~~~

Line 425

~~~~~~text
// When the input window cannot be hidden (meaning it's already hidden), it returns false
~~~~~~

Line 426

~~~~~~text
// Docs don't seem to suggest that this is the case anymore. But it is on a10 and i
~~~~~~

Line 427

~~~~~~text
// don't want to mess with the way insets are done on a10
~~~~~~

Line 442

~~~~~~text
// When the input window cannot be hidden, it returns false
~~~~~~

Line 477

~~~~~~text
/** Cached getter for perf purposes */
~~~~~~

Line 615

~~~~~~text
// Copied from https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/widget/FrameLayout.java
~~~~~~

Line 616

~~~~~~text
// (and edited to avoid laying out control buttons)
~~~~~~

Line 617

~~~~~~text
// Handled explicitly via getAbsoluteGravity()
~~~~~~

Line 711

~~~~~~text
// In edit mode, all controls have to be shown
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/CustomControls.java

Line 35

~~~~~~text
// Generate default control
~~~~~~

Line 36

~~~~~~text
// Here for historical reasons
~~~~~~

Line 37

~~~~~~text
// Just admire it idk
~~~~~~

Line 41

~~~~~~text
// Keyboard
~~~~~~

Line 42

~~~~~~text
// GUI
~~~~~~

Line 43

~~~~~~text
// Primary Mouse mControlDataList
~~~~~~

Line 44

~~~~~~text
// Secondary Mouse mControlDataList
~~~~~~

Line 45

~~~~~~text
// Virtual mouse toggle
~~~~~~

Line 64

~~~~~~text
//The default controls are conform to the V3
~~~~~~

Line 69

~~~~~~text
//Current version is the V3.2 so the version as to be marked as 8 !
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/DefaultDataProvider.java

Line 11

~~~~~~text
// Cannot instantiate this class publicly
~~~~~~

Line 27

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/Gamepad.java

Line 45

~~~~~~text
/* Sensitivity, adjusted according to screen size */
~~~~~~

Line 68

~~~~~~text
/* Choreographer with time to compute delta on ticking */
~~~~~~

Line 116

~~~~~~text
// Force state refresh
~~~~~~

Line 117

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 174

~~~~~~text
/**
     * Send the new mouse position, computing the delta
     * @param frameTimeNanos The time to render the frame, used to compute mouse delta
     */
~~~~~~

Line 179

~~~~~~text
//update mouse position
~~~~~~

Line 186

~~~~~~text
// Compute delta since last tick time
~~~~~~

Line 189

~~~~~~text
// More accurate delta
~~~~~~

Line 190

~~~~~~text
// Scale of 1 = 60Hz
~~~~~~

Line 197

~~~~~~text
//Send the mouse to the game
~~~~~~

Line 201

~~~~~~text
// Update last nano time
~~~~~~

Line 277

~~~~~~text
/** Update the grabbing state, and change the currentMap, mouse position and sensibility */
~~~~~~

Line 284

~~~~~~text
// Switch grabbing state then
~~~~~~

Line 293

~~~~~~text
// removing what we were doing
~~~~~~

Line 295

~~~~~~text
// Sensitivity in menu is MC and HARDWARE resolution dependent
~~~~~~

Line 317

~~~~~~text
//Shoulders
~~~~~~

Line 325

~~~~~~text
//Triggers
~~~~~~

Line 333

~~~~~~text
//L3 || R3
~~~~~~

Line 341

~~~~~~text
//DPAD
~~~~~~

Line 361

~~~~~~text
//Start/select
~~~~~~

Line 369

~~~~~~text
/* Now, it is time for motionEvents */
~~~~~~

Line 379

~~~~~~text
// Left joystick
~~~~~~

Line 389

~~~~~~text
// Right joystick
~~~~~~

Line 399

~~~~~~text
// Triggers
~~~~~~

Line 414

~~~~~~text
/**
     * Stops the Gamepad and removes all traces of the Gamepad from the view hierarchy.
     * After this call, the Gamepad is not recoverable and a new one must be made.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/GamepadButton.java

Line 3

~~~~~~text
/**
 *  This class corresponds to a button that does exist on the gamepad
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/GamepadEmulatedButton.java

Line 5

~~~~~~text
/**
 * This class corresponds to a button that does not physically exist on the gamepad, but is
 * emulated from other inputs on it (like WASD directional keys)
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/GamepadJoystick.java

Line 14

~~~~~~text
//Directions
~~~~~~

Line 15

~~~~~~text
//GamepadJoystick at the center
~~~~~~

Line 40

~~~~~~text
//From -PI to PI
~~~~~~

Line 41

~~~~~~text
// TODO misuse of the deadzone here !
~~~~~~

Line 47

~~~~~~text
//From 0 to 360 degrees
~~~~~~

Line 81

~~~~~~text
/* Setters */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/GamepadMap.java

Line 12

~~~~~~text
// Made mouse keycodes their own specials because managing special keycodes above 0
~~~~~~

Line 13

~~~~~~text
// proved to be complicated
~~~~~~

Line 17

~~~~~~text
// Workaround, because GLFW_KEY_UNKNOWN and GLFW_MOUSE_BUTTON_LEFT are both 0
~~~~~~

Line 20

~~~~~~text
/*
    This class is just here to store the mapping
    can be modified to create re-mappable controls I guess

    Be warned, you should define ALL keys if you want to avoid a non defined exception
   */
~~~~~~

Line 33

~~~~~~text
/*
     * Sets all buttons to a not pressed state, sending an input if needed
     */
~~~~~~

Line 92

~~~~~~text
/*
     * Returns a pre-done mapping used when the mouse is grabbed by the game.
     */
~~~~~~

Line 109

~~~~~~text
//For mods ?
~~~~~~

Line 110

~~~~~~text
//For mods ?
~~~~~~

Line 111

~~~~~~text
//For mods ?
~~~~~~

Line 129

~~~~~~text
/*
     * Returns a pre-done mapping used when the mouse is NOT grabbed by the game.
     */
~~~~~~

Line 153

~~~~~~text
//For mods ?
~~~~~~

Line 154

~~~~~~text
//For mods ?
~~~~~~

Line 155

~~~~~~text
//For mods ?
~~~~~~

Line 165

~~~~~~text
/*
     * Returns all GamepadEmulatedButtons of the controller key map.
     */
~~~~~~

Line 179

~~~~~~text
/*
     * Returns an pre-initialized GamepadMap with only empty keycodes
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/gamepad/GamepadMapperAdapter.java

Line 126

~~~~~~text
// Which stick is used for keyboard emulation depends on grab state, so we need
~~~~~~

Line 127

~~~~~~text
// to update the mapper UI icons accordingly
~~~~~~

Line 214

~~~~~~text
// Populate spinners with known keycodes until we run out of keycodes
~~~~~~

Line 224

~~~~~~text
// In case if there is too much spinners, disable the rest of them
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/handleview/ActionButtonInterface.java

Line 7

~~~~~~text
/** Interface defining the behavior of action buttons */
~~~~~~

Line 10

~~~~~~text
/** HAS TO BE CALLED BY THE CONSTRUCTOR */
~~~~~~

Line 13

~~~~~~text
/** Called when the button should be made aware of the current target */
~~~~~~

Line 16

~~~~~~text
/** Called when the button action should be executed on the target */
~~~~~~

Line 19

~~~~~~text
/** Whether the button should be shown, given the current contextual information that it has */
~~~~~~

Line 22

~~~~~~text
// Wrapper to remove the arg
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/handleview/ActionRow.java

Line 16

~~~~~~text
/**
 * Layout floating around a Control Button, displaying contextual actions
 */
~~~~~~

Line 50

~~~~~~text
/** Add action buttons and configure them */
~~~~~~

Line 64

~~~~~~text
// This is not pretty code, don't do this.
~~~~~~

Line 117

~~~~~~text
//Value should not matter
~~~~~~

Line 120

~~~~~~text
//TODO improve the "algo"
~~~~~~

Line 122

~~~~~~text
//Value should not matter
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/handleview/DrawerPullButton.java

Line 39

~~~~~~text
// Move the button to the third quarter of the screen
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/handleview/EditControlSideDialog.java

Line 45

~~~~~~text
// True when we programmatically change stuff.
~~~~~~

Line 77

~~~~~~text
// Decorative textviews
~~~~~~

Line 82

~~~~~~text
// Color selector related stuff
~~~~~~

Line 108

~~~~~~text
/**
     * Slide the layout into the visible screen area
     */
~~~~~~

Line 115

~~~~~~text
/**
     * Slide out the layout
     */
~~~~~~

Line 122

~~~~~~text
/**
     * Slide out the first visible layer.
     *
     * @return True if the last layer is disappearing
     */
~~~~~~

Line 137

~~~~~~text
/**
     * Switch the panels position if needed
     */
~~~~~~

Line 157

~~~~~~text
/* LOADING VALUES */
~~~~~~

Line 159

~~~~~~text
/**
     * Load values for basic control data
     */
~~~~~~

Line 200

~~~~~~text
// Don't allow editing the bitmap in-game (i don't want to bother with implementing that,
~~~~~~

Line 201

~~~~~~text
// and it has potential to kill the game during icon selection)
~~~~~~

Line 206

~~~~~~text
/**
     * Load values for extended control data
     */
~~~~~~

Line 229

~~~~~~text
/**
     * Load values for the joystick
     */
~~~~~~

Line 261

~~~~~~text
/**
     * Load values for sub buttons
     */
~~~~~~

Line 267

~~~~~~text
// Size linked to the parent drawer depending on the drawer settings
~~~~~~

Line 275

~~~~~~text
// No conditional, already depends on the parent drawer visibility
~~~~~~

Line 282

~~~~~~text
//Initialize adapter for keycodes
~~~~~~

Line 294

~~~~~~text
// Orientation spinner
~~~~~~

Line 316

~~~~~~text
// Disable all settings not available in bitmap background mode
~~~~~~

Line 325

~~~~~~text
// Show the warning that will notify the user that color selection will reset the bitmap
~~~~~~

Line 359

~~~~~~text
//Decorative stuff
~~~~~~

Line 390

~~~~~~text
// Cheap and unoptimized, doesn't break the abstraction layer
~~~~~~

Line 402

~~~~~~text
// Joysticks are square
~~~~~~

Line 407

~~~~~~text
// Unset after the layout pass, to avoid resetting the text in the edittext
~~~~~~

Line 419

~~~~~~text
// Joysticks are square
~~~~~~

Line 479

~~~~~~text
// Side note, spinner listeners are fired later than all the other ones.
~~~~~~

Line 480

~~~~~~text
// Meaning the internalChanges bool is useless here.
~~~~~~

Line 492

~~~~~~text
// Side note, spinner listeners are fired later than all the other ones.
~~~~~~

Line 493

~~~~~~text
// Meaning the internalChanges bool is useless here.
~~~~~~

Line 567

~~~~~~text
// -1
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/keyboard/TouchCharInput.java

Line 22

~~~~~~text
/**
 * This class is intended for sending characters used in chat via the virtual keyboard
 */
~~~~~~

Line 41

~~~~~~text
/**
     * When we change from app to app, the keyboard gets disabled.
     * So, we disable the object
     */
~~~~~~

Line 51

~~~~~~text
/**
     * Intercepts the back key to disable focus
     * Does not affect the rest of the activity.
     */
~~~~~~

Line 64

~~~~~~text
/**
     * Toggle on and off the soft keyboard, depending of the state
     */
~~~~~~

Line 69

~~~~~~text
// Allow, regardless of whether or not a hardware keyboard is declared
~~~~~~

Line 79

~~~~~~text
/**
     * Force keyboard state
     */
~~~~~~

Line 94

~~~~~~text
/**
     * Clear the EditText from any leftover inputs
     * It does not affect the in-game input
     */
~~~~~~

Line 100

~~~~~~text
// Edit the Editable directly as it doesn't affect the state
~~~~~~

Line 101

~~~~~~text
// of the TextView.
~~~~~~

Line 104

~~~~~~text
//Braille space, doesn't trigger keyboard auto-complete
~~~~~~

Line 110

~~~~~~text
/** Regain ability to exist, take focus and have some text being input */
~~~~~~

Line 118

~~~~~~text
/** Lose ability to exist, take focus and have some text being input */
~~~~~~

Line 124

~~~~~~text
//setFocusable(false);
~~~~~~

Line 127

~~~~~~text
/** Send the enter key. */
~~~~~~

Line 133

~~~~~~text
/** This function deals with anything that has to be executed when the constructor is called */
~~~~~~

Line 135

~~~~~~text
// Using TextWatcher instead of overriding onTextChanged because some Huawei firmware
~~~~~~

Line 136

~~~~~~text
// calls setText in constructor, causing havoc for our listener
~~~~~~

Line 153

~~~~~~text
/**
         * We take the new chars, and send them to the game.
         * If less chars are present, remove some.
         * The text is always cleaned up.
         */
~~~~~~

Line 171

~~~~~~text
// Moved from onTextChanged because "It is an error to attempt to make changes to s from this callback."
~~~~~~

Line 172

~~~~~~text
// reference: https://developer.android.com/reference/android/text/TextWatcher#onTextChanged(java.lang.CharSequence,%20int,%20int,%20int)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/LayoutConverter.java

Line 38

~~~~~~text
// Fixed conversion, layout object is completely rebuilt
~~~~~~

Line 44

~~~~~~text
// Almost-fixed conversion due to data structure changes
~~~~~~

Line 48

~~~~~~text
// On version 3 and above, the data structure is pretty much fixed. Changes were
~~~~~~

Line 49

~~~~~~text
// only made to fix bugs or improve scalability.
~~~~~~

Line 74

~~~~~~text
/**
     * Normalize the layout to v8 from v6/7. An issue from the joystick height and position has to be fixed.
     * @param layout The layout object to upgrade
     */
~~~~~~

Line 81

~~~~~~text
// Make the size square, adjust the dynamic position related to height
~~~~~~

Line 93

~~~~~~text
/**
     * Normalize the layout to v6 from v3/4: The stroke width is no longer dependant on the button size
     */
~~~~~~

Line 112

~~~~~~text
// Joysticks shouldn't be in v2 layouts
~~~~~~

Line 217

~~~~~~text
/**
     * Upgrade v8 layout to v9. Switched button keycodes from GLFW to Android
     */
~~~~~~

Line 256

~~~~~~text
/**
     * Convert a size percentage into a px size, used by older layout versions
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/LayoutSanitizer.java

Line 8

~~~~~~text
// Maybe add more conditions here later?
~~~~~~

Line 41

~~~~~~text
/**
     * Check all buttons in a control layout and ensure they're sane (contain values valid enough
     * to be displayed properly). Removes any buttons deemed not sane.
     * @param controls the original control layout.
     * @return whether the sanitization process made any changes to the layout
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/AbstractTouchpad.java

Line 4

~~~~~~text
/**
     * Get the supposed display state of the mouse (whether it should be shown when the user is in a GUI)
     * Note that this does *not* reflect the actual visibility state of the mouse
     * @return current supposed enabled state
     */
~~~~~~

Line 11

~~~~~~text
/**
     * Apply a motion vector to the mouse in form of a two-entry float array. This will move the mouse
     * on the screen and send the new cursor position to the game.
     * @param vector the array that contains the vector
     */
~~~~~~

Line 20

~~~~~~text
/**
     * Apply a motion vector to the mouse in form of the separate X/Y coordinates. This will move the mouse
     * on the screen and send the new cursor position to the game.
     * @param x the relative X coordinate of the vector
     * @param y the relative Y coordinate for the vector
     */
~~~~~~

Line 28

~~~~~~text
/**
     * Sets the state of the touchpad to "enabled"
     * @param supposed if set to true, this will set the supposed display state to enabled but may not
     *                 affect the touchpad until internal conditions are met
     *                 if set to false it will turn the touchpad on regardless of internal conditions
     */
~~~~~~

Line 35

~~~~~~text
/**
     * Sets the state of the touchpad to "disabled".
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/AndroidPointerCapture.java

Line 65

~~~~~~text
// Yes, we actually not only receive relative mouse events here, but also absolute touchpad ones!
~~~~~~

Line 66

~~~~~~text
// Therefore, we need to know when it's a touchpad and when it's a mouse.
~~~~~~

Line 69

~~~~~~text
// If the source claims to be a relative device by belonging to the trackball class,
~~~~~~

Line 70

~~~~~~text
// use its coordinates directly.
~~~~~~

Line 72

~~~~~~text
// If some OEM decides to do a funny and make an absolute touchpad report itself as
~~~~~~

Line 73

~~~~~~text
// a trackball, we will at least have semi-valid relative positions
~~~~~~

Line 76

~~~~~~text
// Otherwise trust the OS, i guess??
~~~~~~

Line 80

~~~~~~text
// If it's not a trackball, it's likely a touchpad and needs tracking like a touchscreen.
~~~~~~

Line 82

~~~~~~text
// The relative position will already be written down into the mVector variable.
~~~~~~

Line 85

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 88

~~~~~~text
// Yes, if the user's touchpad is multi-touch we will also receive events for that.
~~~~~~

Line 89

~~~~~~text
// So, handle the scrolling gesture ourselves.
~~~~~~

Line 99

~~~~~~text
// Position is updated by many events, hence it is send regardless of the event value
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/CursorContainer.java

Line 8

~~~~~~text
/**
 * Contains cursor data and the draw method
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/GyroControl.java

Line 22

~~~~~~text
/* How much distance has to be moved before taking into account the gyro */
~~~~~~

Line 25

~~~~~~text
// Warmup period of 2 since the first read from the sensor seems to produce a bogus value,
~~~~~~

Line 26

~~~~~~text
// which creates a far too large of a difference on the Y axis once actual sensor data comes in
~~~~~~

Line 36

~~~~~~text
// -1 or 1 depending on device orientation
~~~~~~

Line 45

~~~~~~text
/* Used to average the last values, if smoothing is enabled */
~~~~~~

Line 56

~~~~~~text
/* Store the gyro movement under the threshold */
~~~~~~

Line 74

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 90

~~~~~~text
// Copy the old array content
~~~~~~

Line 95

~~~~~~text
// Setup initial position
~~~~~~

Line 136

~~~~~~text
/** Update the axis mapping in accordance to activity rotation, used for initial rotation */
~~~~~~

Line 177

~~~~~~text
/**
     * Compute the moving average of the gyroscope to reduce jitter
     * @param newAngleDifference The new angle difference
     */
~~~~~~

Line 193

~~~~~~text
// compute the moving average
~~~~~~

Line 198

~~~~~~text
/** Reset the moving average data */
~~~~~~

Line 218

~~~~~~text
// Force to wait to be in game before setting factors
~~~~~~

Line 219

~~~~~~text
// Theoretically, one could use the whole interface in portrait...
~~~~~~

Line 223

~~~~~~text
//change nothing
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/HotbarView.java

Line 59

~~~~~~text
// You suggested me this constructor, Android
~~~~~~

Line 97

~~~~~~text
// performClick does not report coordinates.
~~~~~~

Line 100

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 104

~~~~~~text
// Check if we need to cancel the drop event
~~~~~~

Line 108

~~~~~~text
// Determine the hotbar slot
~~~~~~

Line 110

~~~~~~text
// Ignore positions equal to mWidth because they would translate into an out-of-bounds hotbar index
~~~~~~

Line 112

~~~~~~text
// If out of bounds, cancel the hotbar gesture to avoid dropping items on last hotbar slots
~~~~~~

Line 117

~~~~~~text
// Check if the slot changed and we need to make a key press
~~~~~~

Line 119

~~~~~~text
// Only check for doubletapping if the slot has not changed
~~~~~~

Line 126

~~~~~~text
// Cancel the event since we changed hotbar slots.
~~~~~~

Line 128

~~~~~~text
// Only resubmit the gesture only if it isn't the last event we will receive.
~~~~~~

Line 141

~~~~~~text
/** Forces the view to reposition itself. */
~~~~~~

Line 164

~~~~~~text
// We need to check whether dimensions match or not because here we are looking specifically for changes of dimensions
~~~~~~

Line 165

~~~~~~text
// and Android keeps calling this without dimensions actually changing for some reason.
~~~~~~

Line 167

~~~~~~text
// Need to post this, because it is not correct to resize the view
~~~~~~

Line 168

~~~~~~text
// during a layout pass.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/LeftClickGesture.java

Line 40

~~~~~~text
// If the finger is still, fire the gesture.
~~~~~~

Line 45

~~~~~~text
// Otherwise, don't click but still keep it active
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/RightClickGesture.java

Line 36

~~~~~~text
// If the validate() method was called, it means that the user held on for too long. The cancellation should be ignored.
~~~~~~

Line 38

~~~~~~text
// Never call onGestureCancelled. This way we will be able to reserve that only for when
~~~~~~

Line 39

~~~~~~text
// the gesture is stopped in the code (when the user lets go of the screen or the tap was
~~~~~~

Line 40

~~~~~~text
// cancelled by turning on the grab)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/Scroller.java

Line 14

~~~~~~text
/**
     * Perform a scrolling gesture.
     * @param dx the X coordinate of the primary pointer's vector
     * @param dy the Y coordinate of the primary pointer's vector
     */
~~~~~~

Line 28

~~~~~~text
/**
     * Perform a scrolling gesture.
     * @param vector a 2-component vector that stores the relative position of the primary pointer.
     */
~~~~~~

Line 36

~~~~~~text
/**
     * Reset scroll overshoot values. Scroll overshoot makes the scrolling feel less
     * choppy, but will cause anomailes if not reset on the end of a scrolling gesture.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/TapDetector.java

Line 12

~~~~~~text
/**
 * Class aiming at better detecting X-tap events regardless of the POINTERS
 * Only uses the least amount of events possible,
 * since we aren't guaranteed to have all events in order
 */
~~~~~~

Line 21

~~~~~~text
//Unused for now
~~~~~~

Line 36

~~~~~~text
/**
     * @param tapNumberToDetect How many taps are needed before onTouchEvent returns True.
     * @param detectionMethod Method used to detect touches. See DETECTION_METHOD constants above.
     */
~~~~~~

Line 42

~~~~~~text
//We expect both ACTION_DOWN and ACTION_UP for the DETECTION_METHOD_BOTH
~~~~~~

Line 46

~~~~~~text
/**
     * A function to call when you have a touch event.
     * @param e The MotionEvent to inspect
     * @return whether or not a X-tap happened for a pointer
     */
~~~~~~

Line 55

~~~~~~text
//Get the event to look forward
~~~~~~

Line 65

~~~~~~text
// Useless event
~~~~~~

Line 67

~~~~~~text
//Store current event info
~~~~~~

Line 72

~~~~~~text
//Compute deltas
~~~~~~

Line 77

~~~~~~text
//Store current event info to persist on next event
~~~~~~

Line 82

~~~~~~text
//Check for high enough speed and precision
~~~~~~

Line 87

~~~~~~text
// For the both method, the user is expected to start with a down action.
~~~~~~

Line 91

~~~~~~text
// We invalidate previous taps, not this one though
~~~~~~

Line 97

~~~~~~text
//A worthy tap happened
~~~~~~

Line 104

~~~~~~text
//If not enough taps are reached
~~~~~~

Line 108

~~~~~~text
/**
     * Reset the double tap values.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/customcontrols/mouse/ValidatorGesture.java

Line 5

~~~~~~text
/**
 * This class implements an abstract "validator gesture", meant as a base for implementation of
 * more complex gestures with finger position tracking and such.
 */
~~~~~~

Line 13

~~~~~~text
/**
     * @param mHandler the Handler that will be used for calling back the checkAndTrigger() method.
     *                 This Handler should run on the same thread as the callee of submit()/cancel()
     */
~~~~~~

Line 21

~~~~~~text
/**
     * Submit the gesture, starting the timer and marking this gesture as "active".
     * If the gesture was already active, this call will be ignored
     * @return true if the gesture was submitted, false if the call was ignored
     */
~~~~~~

Line 33

~~~~~~text
/**
     * Cancel the gesture, stopping the timer and marking this gesture as "inactive".
     * If the gesture was already inactive, this call will be ignored.
     * @param isSwitching true if this gesture was cancelled due to user interaction (the user let go of the finger)
     *                    false if this gesture is cancelled due a request from the programmer or the OS.
     *                    Note that returning false from checkAndTrigger() counts as user interaction.
     */
~~~~~~

Line 54

~~~~~~text
/**
     * This method will be called during gesture submission to determine the gesture check duration.
     * @return the required gesture check duration in milliseconds
     */
~~~~~~

Line 60

~~~~~~text
/**
     * This method will be called after getGestureDelay() milliseconds, if the gesture was not cancelled.
     * @return false if you want to mark this gesture as "inactive"
     *         true otherwise
     */
~~~~~~

Line 67

~~~~~~text
/**
     * This method will be called if the gesture was cancelled using the cancel() method or by returning false
     * from checkAndTrigger().
     * @param isSwitching true if this gesture was cancelled due to user interaction (the user let go of the finger)
     *                    false if this gesture is cancelled due a request from the programmer or the OS.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/CustomControlsActivity.java

Line 62

~~~~~~text
// Saving the currently shown control
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/daylight/InstanceGrid.java

Line 22

~~~~~~text
/** Native Android instance dashboard; all disk reads are on upstream's task executor. */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/daylight/SupportedVersions.java

Line 3

~~~~~~text
/** Release-picker policy only: never deletes or rewrites an existing instance. */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/downloader/AcquireableTaskMetadata.java

Line 10

~~~~~~text
/**
     * Fill the missing fields of this AcquireableTaskMetadata (by, for example, performing an API request)
     * @throws IOException if metadata acquisition failed
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/downloader/CompleteMetadataTask.java

Line 38

~~~~~~text
// No need to try and obtain the hash if the file is qualified for rapid start check skip
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/downloader/DownloadFileTask.java

Line 19

~~~~~~text
// It will get readded again on next tryDownload() if range is allowed
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/ExitActivity.java

Line 21

~~~~~~text
//invalid on some translations but valid on most, cant fix that atm
~~~~~~

Line 42

~~~~~~text
//used by native jre_launcher_new
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/extra/ExtraConstants.java

Line 4

~~~~~~text
/* ExtraCore constant: a HashMap for converting values such as latest-snapshot or latest-release to actual game version names */
~~~~~~

Line 6

~~~~~~text
/* ExtraCore constant: Serpent's back button tracking thing */
~~~~~~

Line 8

~~~~~~text
/* ExtraCore constant: The OPENGL version that should be exposed */
~~~~~~

Line 10

~~~~~~text
/* ExtraCore constant: When the microsoft authentication via webview is done */
~~~~~~

Line 12

~~~~~~text
/* ExtraCore constant: Mojang or "local" authentication to perform */
~~~~~~

Line 14

~~~~~~text
/* ExtraCore constant: Ely.by authentication to perform */
~~~~~~

Line 16

~~~~~~text
/* ExtraCore constant: Add minecraft account procedure, the user has to select between mojang or microsoft */
~~~~~~

Line 18

~~~~~~text
/* ExtraCore constant: Selected file or folder, as a String */
~~~~~~

Line 20

~~~~~~text
/* ExtraCore constant: Need to refresh the version spinner, selecting the uuid at the same time. Can be DELETED_PROFILE */
~~~~~~

Line 22

~~~~~~text
/* ExtraCore Constant: When we want to launch the game */
~~~~~~

Line 24

~~~~~~text
/* ExtraCore constant: Notify the account spinner that user has returned to the main menu. */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/extra/ExtraCore.java

Line 8

~~~~~~text
/**
 * Class providing callback across all of a program
 * to allow easy thread safe implementations of UI update without context leak
 * It is also perfectly engineered to make it unpleasant to use.
 *
 * This class uses a singleton pattern to simplify access to it
 */
~~~~~~

Line 17

~~~~~~text
// No unwanted instantiation
~~~~~~

Line 20

~~~~~~text
// Singleton instance
~~~~~~

Line 23

~~~~~~text
// Store the key-value pair
~~~~~~

Line 26

~~~~~~text
// Store what each ExtraListener listen to
~~~~~~

Line 29

~~~~~~text
// All public methods will pass through this one
~~~~~~

Line 41

~~~~~~text
/**
     * Set the value associated to a key and trigger all listeners
     * @param key The key
     * @param value The value
     */
~~~~~~

Line 47

~~~~~~text
// null values create an NPE on insertion
~~~~~~

Line 51

~~~~~~text
//No listeners
~~~~~~

Line 58

~~~~~~text
//Notify the listener about a state change and remove it if asked for
~~~~~~

Line 65

~~~~~~text
/** @return The value behind the key */
~~~~~~

Line 70

~~~~~~text
/** @return The value behind the key, or the default value */
~~~~~~

Line 76

~~~~~~text
/** Remove the key and its value from the valueMap */
~~~~~~

Line 87

~~~~~~text
/** Remove all values */
~~~~~~

Line 92

~~~~~~text
/**
     * Link an ExtraListener to a value
     * @param key The value key to look for
     * @param listener The ExtraListener to link
     */
~~~~~~

Line 99

~~~~~~text
// Look for new sets
~~~~~~

Line 105

~~~~~~text
// This is kinda naive, I should look for duplicates
~~~~~~

Line 109

~~~~~~text
/**
     * Unlink an ExtraListener from a value.
     * Unlink null references found along the way
     * @param key The value key to ignore now
     * @param listener The ExtraListener to unlink
     */
~~~~~~

Line 117

~~~~~~text
// Look for new sets
~~~~~~

Line 123

~~~~~~text
// Removes all occurrences of ExtraListener and all null references
~~~~~~

Line 133

~~~~~~text
/**
     * Unlink all ExtraListeners from a value
     * @param key The key to which ExtraListener are linked
     */
~~~~~~

Line 139

~~~~~~text
// Look for new sets
~~~~~~

Line 148

~~~~~~text
/**
     * Remove all ExtraListeners from listening to any value
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/extra/ExtraListener.java

Line 5

~~~~~~text
/**
 * Listener class for the ExtraCore
 * An ExtraListener can listen to a virtually unlimited amount of values
 */
~~~~~~

Line 11

~~~~~~text
/**
     * Called upon a new value being set
     * @param key The name of the value
     * @param value The new value as a string
     * @return Whether you consume the Listener (stop listening)
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/BTAInstallFragment.java

Line 50

~~~~~~text
// We don't have to do anything after the BTADownloadTask ends, so this is a stub
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/FabriclikeInstallFragment.java

Line 148

~~~~~~text
// This works because the due to the fact that we have transitioned here
~~~~~~

Line 149

~~~~~~text
// without adding a transaction to the back stack, which caused the previous
~~~~~~

Line 150

~~~~~~text
// transaction to be amended (i guess?? thats how the back stack dump looks like)
~~~~~~

Line 151

~~~~~~text
// we can get back to the main fragment with just one back stack pop.
~~~~~~

Line 152

~~~~~~text
// For some reason that amendment causes the transaction to lose its tag
~~~~~~

Line 153

~~~~~~text
// so we cant use the tag here.
~~~~~~

Line 193

~~~~~~text
// The "visibility on" is managed by the spinners
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/InstanceEditorFragment.java

Line 67

~~~~~~text
// Paths, which can be changed
~~~~~~

Line 86

~~~~~~text
// Set up behaviors
~~~~~~

Line 102

~~~~~~text
// Setup the expendable list behavior
~~~~~~

Line 107

~~~~~~text
// Set up the icon change click listener
~~~~~~

Line 109

~~~~~~text
// Fill recommended size on click to ge the most up to date data
~~~~~~

Line 157

~~~~~~text
// Runtime spinner
~~~~~~

Line 167

~~~~~~text
// Renderer spinner
~~~~~~

Line 199

~~~~~~text
//First, check for potential issues in the inputs
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/LocalLoginFragment.java

Line 49

~~~~~~text
/** @return Whether the mail (and password) text are eligible to make an auth request  */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/ModVersionListFragment.java

Line 123

~~~~~~text
// Read the comment in FabricInstallFragment.onDownloadFinished() to see how this works
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/OAuthFragment.java

Line 44

~~~~~~text
// Access denied - means the user exited out of the oauth dialog. Just leave the fragment
~~~~~~

Line 46

~~~~~~text
// On other unknown errors, show a dialog
~~~~~~

Line 50

~~~~~~text
// Captured by the listener in the mcAccountSpinner
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/ProfileTypeSelectFragment.java

Line 26

~~~~~~text
// These loaders only target pre-1.19 releases. Existing imported/local
~~~~~~

Line 27

~~~~~~text
// instances remain available; do not offer them as new Daylight choices.
~~~~~~

Line 41

~~~~~~text
// NOTE: Special care needed! If you wll decide to add these to the back stack, please read
~~~~~~

Line 42

~~~~~~text
// the comment in FabricInstallFragment.onDownloadFinished() and amend the code
~~~~~~

Line 43

~~~~~~text
// in FabricInstallFragment.onDownloadFinished() and ModVersionListFragment.onDownloadFinished()
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/SearchModFragment.java

Line 55

~~~~~~text
// Padding cache reduce resource lookup
~~~~~~

Line 127

~~~~~~text
// You can only access resources after attaching to current context
~~~~~~

Line 214

~~~~~~text
// setup the view behavior
~~~~~~

Line 224

~~~~~~text
// Setup the expendable list behavior
~~~~~~

Line 227

~~~~~~text
// Apply visually all the current settings
~~~~~~

Line 230

~~~~~~text
// Apply the new settings
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/fragments/WebViewCompletionFragment.java

Line 24

~~~~~~text
// Technically the client is blank (or there is none) when the fragment is initialized
~~~~~~

Line 42

~~~~~~text
// WebView.restoreState() does not restore the WebSettings or the client, so set them there
~~~~~~

Line 43

~~~~~~text
// separately. Note that general state should not be altered here (aka no loading pages, no manipulating back/front lists),
~~~~~~

Line 44

~~~~~~text
// to avoid "undesirable side-effects"
~~~~~~

Line 67

~~~~~~text
// if, for some reason, we failed to restore our session,
~~~~~~

Line 68

~~~~~~text
// just start afresh
~~~~~~

Line 76

~~~~~~text
// If we have switched to a blank client and haven't fully gone though the lifecycle callbacks to restore it,
~~~~~~

Line 77

~~~~~~text
// restore it here.
~~~~~~

Line 83

~~~~~~text
// Since the value cannot be null, just create a "blank" client. This is done to not let Android
~~~~~~

Line 84

~~~~~~text
// kill us if something happens after the state gets saved, when we can't do fragment transitions
~~~~~~

Line 86

~~~~~~text
// For some dumb reason state is saved even when Android won't actually destroy the activity.
~~~~~~

Line 87

~~~~~~text
// Let the fragment know that the client is blank so that we can restore it in onStart()
~~~~~~

Line 88

~~~~~~text
// (it was the earliest lifecycle call actually invoked in this case)
~~~~~~

Line 94

~~~~~~text
/* Expose webview actions to others */
~~~~~~

Line 98

~~~~~~text
/** Client to track when to sent the data to the launcher */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/GameActivity.java

Line 137

~~~~~~text
// Start the service a bit early
~~~~~~

Line 145

~~~~~~text
// Enabling this on TextureView results in a broken white result
~~~~~~

Line 149

~~~~~~text
// Set the sustained performance mode for available APIs
~~~~~~

Line 153

~~~~~~text
// This is required on Android 10 for the insets listener
~~~~~~

Line 154

~~~~~~text
// https://issuetracker.google.com/issues/266331465
~~~~~~

Line 158

~~~~~~text
// Make keyboard pan the activity so the user sees what they're typing
~~~~~~

Line 171

~~~~~~text
// AndroidX keeps SystemUI visible for some reason after IME session
~~~~~~

Line 182

~~~~~~text
// Autopanning (if keyboardPan wasn't clicked)
~~~~~~

Line 211

~~~~~~text
// Recompute the gui scale when options are changed
~~~~~~

Line 216

~~~~~~text
// Set the activity for the executor. Must do this here, or else Tools.showErrorRemote() may not
~~~~~~

Line 217

~~~~~~text
// execute the correct method
~~~~~~

Line 219

~~~~~~text
//Now, attach to the service. The game will only start when this happens, to make sure that we know the right state.
~~~~~~

Line 251

~~~~~~text
// Menu
~~~~~~

Line 290

~~~~~~text
// Load keys
~~~~~~

Line 308

~~~~~~text
// Post to get the correct display dimensions after layout.
~~~~~~

Line 315

~~~~~~text
/** Boilerplate binding */
~~~~~~

Line 340

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 374

~~~~~~text
// Layout resize is practically guaranteed on a configuration change, and `onConfigurationChanged`
~~~~~~

Line 375

~~~~~~text
// does not implicitly start a layout. So, request a layout and expect the screen dimensions to be valid after the]
~~~~~~

Line 376

~~~~~~text
// post.
~~~~~~

Line 380

~~~~~~text
// Child of mControlLayout, so refreshing size here is correct
~~~~~~

Line 390

~~~~~~text
// Useful when backing out of the app
~~~~~~

Line 399

~~~~~~text
// Reload PREF_DEFAULTCTRL_PATH
~~~~~~

Line 400

~~~~~~text
// If the storage root got unmounted/unreadable we won't be able to load the file anyway,
~~~~~~

Line 401

~~~~~~text
// and MissingStorageActivity will be started.
~~~~~~

Line 417

~~~~~~text
//Note that we actually stall in the above function, even if the game crashes. But let's be safe.
~~~~~~

Line 472

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 504

~~~~~~text
// We eat it anyway
~~~~~~

Line 574

~~~~~~text
/*
     * Android 14 (or some devices, at least) seems to dispatch the the captured mouse events as trackball events
     * due to a bug(?) somewhere(????)
     */
~~~~~~

Line 581

~~~~~~text
// On my device, the mouse sends events as a relative mouse device.
~~~~~~

Line 582

~~~~~~text
// Not comparing with == here because apparently `eventSource` is a mask that can
~~~~~~

Line 583

~~~~~~text
// sometimes indicate multiple sources, like in the case of InputDevice.SOURCE_TOUCHPAD
~~~~~~

Line 584

~~~~~~text
// (which is *also* an InputDevice.SOURCE_MOUSE when controlling a cursor)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/GameCursorView.java

Line 19

~~~~~~text
/**
 * A view that draws the platform cursor on the screen
 */
~~~~~~

Line 50

~~~~~~text
// Scale coordinates back to the full unresized screen size
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/GameView.java

Line 47

~~~~~~text
/**
 * Class dealing with showing minecraft surface and taking inputs to dispatch them to minecraft
 */
~~~~~~

Line 52

~~~~~~text
/* Sensitivity, adjusted according to screen size */
~~~~~~

Line 57

~~~~~~text
/* Surface ready listener, used by the activity to launch minecraft */
~~~~~~

Line 60

~~~~~~text
/* View holding the surface, either a SurfaceView or a TextureView */
~~~~~~

Line 83

~~~~~~text
// This is required to actually get the CursorView object
~~~~~~

Line 97

~~~~~~text
/** Initialize the view and all its settings
     * @param isAlreadyRunning set to true to tell the view that the game is already running
     *                         (only updates the window without calling the start listener)
     */
~~~~~~

Line 111

~~~~~~text
/**
     * The touch event for both grabbed an non-grabbed mouse state on the touch screen
     * Does not cover the virtual mouse touchpad
     */
~~~~~~

Line 118

~~~~~~text
// Kinda need to send this back to the layout
~~~~~~

Line 120

~~~~~~text
// Looking for a mouse to handle, won't have an effect if no mouse exists.
~~~~~~

Line 131

~~~~~~text
// Mouse found
~~~~~~

Line 132

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 137

~~~~~~text
//mouse event handled successfully
~~~~~~

Line 141

~~~~~~text
// Keep cursor on screen if panning with IME inset
~~~~~~

Line 149

~~~~~~text
// If the view was force panned (KeyboardPan keycode) apply an animation instead of immediate override
~~~~~~

Line 150

~~~~~~text
// This fixes weird jumps when the user moves the cursor first time after pressing that keycode
~~~~~~

Line 163

~~~~~~text
/**
     * The event for mouse/joystick movements
     */
~~~~~~

Line 180

~~~~~~text
// Mouse found
~~~~~~

Line 184

~~~~~~text
// we cant consoom that, theres no mice!
~~~~~~

Line 186

~~~~~~text
// Make sure we grabbed the mouse if necessary
~~~~~~

Line 187

~~~~~~text
// Avoid going through the JNI each time.
~~~~~~

Line 206

~~~~~~text
/** The event for keyboard/ gamepad button inputs */
~~~~~~

Line 208

~~~~~~text
//Log.i("KeyEvent", event.toString());
~~~~~~

Line 210

~~~~~~text
//Filtering useless events by order of probability
~~~~~~

Line 218

~~~~~~text
// Ignore the cancelled up events. They occur when the user switches layouts.
~~~~~~

Line 219

~~~~~~text
// In accordance with https://developer.android.com/reference/android/view/KeyEvent#FLAG_CANCELED
~~~~~~

Line 223

~~~~~~text
//Sometimes, key events comes from SOME keys of the software keyboard
~~~~~~

Line 224

~~~~~~text
//Even weirder, is is unknown why a key or another is selected to trigger a keyEvent
~~~~~~

Line 226

~~~~~~text
//We already listen to it.
~~~~~~

Line 231

~~~~~~text
//Sometimes, key events may come from the mouse
~~~~~~

Line 254

~~~~~~text
// Some events will be generated an infinite number of times when no consumed
~~~~~~

Line 258

~~~~~~text
/** Called when the size need to be set at any point during the surface lifecycle **/
~~~~~~

Line 263

~~~~~~text
/** Same as refreshSize, but allows you to force an immediate size update **/
~~~~~~

Line 269

~~~~~~text
// Use the width and height of the View instead of display dimensions to avoid
~~~~~~

Line 270

~~~~~~text
// getting squiched/stretched due to inconsistencies between the layout and
~~~~~~

Line 271

~~~~~~text
// screen dimensions.
~~~~~~

Line 281

~~~~~~text
// Update cursor ratio values
~~~~~~

Line 282

~~~~~~text
// Mouse events are sent in the full view coordinate space, the game accepts them only in the window space
~~~~~~

Line 296

~~~~~~text
// Initial size set. Request immedate refresh, otherwise the initial width and height for the game
~~~~~~

Line 297

~~~~~~text
// may be broken/unknown.
~~~~~~

Line 300

~~~~~~text
//Load Minecraft options:
~~~~~~

Line 309

~~~~~~text
// Wait until the listener is attached
~~~~~~

Line 359

~~~~~~text
/** A small interface called when the listener is ready for the first time */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/InGameEventProcessor.java

Line 61

~~~~~~text
// Only register right click events if it's a fresh event stream, not one after a transition.
~~~~~~

Line 62

~~~~~~text
// This is done to avoid problems when people hold the button for just a bit too long after
~~~~~~

Line 63

~~~~~~text
// exiting a menu for example.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/InGUIEventProcessor.java

Line 41

~~~~~~text
// disabled gestures means no scrolling possible, send gesture early
~~~~~~

Line 73

~~~~~~text
// Handle single tap on gestures
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/backend/AWTBackend.java

Line 18

~~~~~~text
// AWT requires us to manually draw on the screen
~~~~~~

Line 25

~~~~~~text
// There's no need of updating AWT Surface... for now
~~~~~~

Line 60

~~~~~~text
// Unsupported
~~~~~~

Line 75

~~~~~~text
// Unsupported
~~~~~~

Line 80

~~~~~~text
// Unsupported
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/backend/DummyBackend.java

Line 6

~~~~~~text
/**
 * Null (dummy) Platform implementation. Use when none of other platforms are available
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/backend/GLFWBackend.java

Line 12

~~~~~~text
/**
 * GLFW Platform implementation
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/backend/PlatformBackend.java

Line 5

~~~~~~text
/**
 * Platform abstraction to send events to the running app
 */
~~~~~~

Line 9

~~~~~~text
/**
     * Send a surface object to the implementation. Call this whenever the surface was recreated/became invalid
     *
     * @param surface Surface
     */
~~~~~~

Line 16

~~~~~~text
/**
     * Update implementation surface parameters. Call this when the surface has been resized
     */
~~~~~~

Line 21

~~~~~~text
/**
     * Destroy implementation surface
     */
~~~~~~

Line 26

~~~~~~text
/**
     * Send current mouse position set in Platform to an implementation
     *
     * @param x        cursor X position
     * @param y        cursor Y position
     * @param relative whether the input is relative
     */
~~~~~~

Line 35

~~~~~~text
/**
     * Send mouse event to an implementation
     *
     * @param button   Android mouse button to send
     * @param state    State (down/up)
     * @param mods     Modifier keys
     * @param x        cursor X position
     * @param y        cursor Y position
     * @param relative whether the input is relative
     */
~~~~~~

Line 47

~~~~~~text
/**
     * Send keyboard key press event to an implementation
     *
     * @param key       Android keycode to send
     * @param state     State (down/up)
     * @param mods      Modifier keys
     * @param codepoint Unicode symbol tied to the sent keycode
     * @return True if succeeded, false if unknown/unsupported keycode
     */
~~~~~~

Line 58

~~~~~~text
/**
     * Send keyboard key press event to an implementation
     *
     * @param key   Android keycode to send
     * @param state State (down/up)
     * @param mods  Modifier keys
     * @return True if succeeded, false if unknown/unsupported keycode
     */
~~~~~~

Line 68

~~~~~~text
/**
     * Send keyboard key press event to an implementation
     *
     * @param key   Android keycode to send
     * @param state State (down/up)
     * @param mods  Modifier keys
     * @return True if succeeded, false if unknown/unsupported keycode
     */
~~~~~~

Line 78

~~~~~~text
/**
     * Send mouse wheel/touchpad scroll event to an implementation
     *
     * @param x X axis scroll
     * @param y Y axis scroll
     */
~~~~~~

Line 86

~~~~~~text
/**
     * Send a text bulk to an implementation
     *
     * @param text String (text) to send
     * @param mods Modifier keys
     */
~~~~~~

Line 94

~~~~~~text
/**
     * Get current implementation backend name
     *
     * @return Backend name
     */
~~~~~~

Line 101

~~~~~~text
/**
     * Set window hover state on an implementation
     *
     * @param hovered Hover state
     */
~~~~~~

Line 108

~~~~~~text
/**
     * Set visibility state on an implementation
     *
     * @param visible Visibility state
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/backend/SDLBackend.java

Line 15

~~~~~~text
/**
 * SDL3 Platform implementation
 */
~~~~~~

Line 31

~~~~~~text
// SDL really expects cursor to be at 0x0 position when relative mode (grabbing = true) is enabled
~~~~~~

Line 32

~~~~~~text
// This caused weird jumps when gaining grab because Platform cursor position values contain stale non-zero values at that point.
~~~~~~

Line 33

~~~~~~text
// Reset position to 0x0 when gaining grab state
~~~~~~

Line 41

~~~~~~text
// TODO: check what can be moved to the initialize point
~~~~~~

Line 42

~~~~~~text
// we need to setup enough SDL for the game to not crash to initialize it later
~~~~~~

Line 54

~~~~~~text
// Update initial size
~~~~~~

Line 77

~~~~~~text
// In grabbing (relative) mode SDL expects relative cursor coordinates with center located at 0,0
~~~~~~

Line 78

~~~~~~text
// We need to accumulate a delta between mouse positions to correctly handle such position changes
~~~~~~

Line 96

~~~~~~text
// In relative mode we need to send mouse clicks at zero position to not accidentally trigger a motion event
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/clipboard/AndroidClipboard.java

Line 10

~~~~~~text
/**
 * Android clipboard implementation for GLFW/SDL
 */
~~~~~~

Line 20

~~~~~~text
/**
     * Get clipboard contents
     *
     * @return content String
     */
~~~~~~

Line 36

~~~~~~text
/**
     * Set clipboard contents
     *
     * @param content content String
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/cursor/PlatformCursor.java

Line 5

~~~~~~text
/**
 * Platform cursor object. Direct copy of GLFWCursor. Holds hotspot offsets and a bitmap of a custom cursor
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/cursor/PlatformCursorImplementor.java

Line 5

~~~~~~text
/**
 * Platform cursor implementor. Receives cursor updates
 */
~~~~~~

Line 9

~~~~~~text
/**
     * Update cursor position on the screen
     */
~~~~~~

Line 14

~~~~~~text
/**
     * Update cursor drawable on the screen
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/input/gamepad/GenericGamepad.java

Line 13

~~~~~~text
/**
 * Generic gamepad implementation (a {@link Gamepad} wrapper). Emulates keyboard/mouse input from gamepad events.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/input/gamepad/GLFWGamepad.java

Line 14

~~~~~~text
/**
 * GLFW Gamepad implementation
 */
~~~~~~

Line 58

~~~~~~text
// Behave the same way as the Gamepad here, as GLFW doesn't have a keycode
~~~~~~

Line 59

~~~~~~text
// for the dpad center.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/input/gamepad/SDLGamepad.java

Line 11

~~~~~~text
/**
 * SDL3 Gamepad implementation
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/input/PlatformGamepad.java

Line 6

~~~~~~text
/**
 * Platform gamepad event consumer. Use this to override emulated gamepad input
 */
~~~~~~

Line 10

~~~~~~text
/**
     * Send gamepad key event directly
     *
     * @param event Android KeyEvent
     */
~~~~~~

Line 17

~~~~~~text
/**
     * Send gamepad motion event directly
     *
     * @param event Android MotionEvent
     */
~~~~~~

Line 24

~~~~~~text
/**
     * Destroy gamepad instance
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/input/PlatformGrabListener.java

Line 3

~~~~~~text
/**
 * Platform grab change listener. Accepts grab and ungrab events
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/platform/Platform.java

Line 41

~~~~~~text
/**
 * Launcher Platform frontend used to manage different window system & input implementations. Currently supports SDL&GLFW
 */
~~~~~~

Line 45

~~~~~~text
// Always reset cursor on grab lost - makes it move to the center as should if the game didn't move it
~~~~~~

Line 60

~~~~~~text
/**
     * Initialize Platform, set platform implementations' init callbacks and fire early initializers
     *
     * @param activity an activity to bind to
     * @param view a host view used for input handling
     */
~~~~~~

Line 75

~~~~~~text
// SDL can handle gamepads on its own, so route all events through it
~~~~~~

Line 76

~~~~~~text
// if SDL was detected of course (the check is based on detectDevices)
~~~~~~

Line 77

~~~~~~text
// Vanilla SDL client shouldn't touch input system and thus cause emulated input to break
~~~~~~

Line 79

~~~~~~text
// GLFW also has equivalent "onDirectGamepadEnable". Hook it up
~~~~~~

Line 88

~~~~~~text
// Do not set backend init callbacks here, as this will be functioning in single-platform mode
~~~~~~

Line 92

~~~~~~text
// We probably already initialized at this point. Don't try to initialize again
~~~~~~

Line 99

~~~~~~text
/**
     * Is current platform implementation grabbed the cursor
     *
     * @return grab state
     */
~~~~~~

Line 108

~~~~~~text
/**
     * Change grab state of a platform. Called from implementation-specific grab listeners. Safe to call from non-UI threads.
     *
     * @param grabbing new grab state
     */
~~~~~~

Line 125

~~~~~~text
/**
     * Get Platform gamepad implementation
     *
     * @return Platform gamepad object
     */
~~~~~~

Line 134

~~~~~~text
/**
     * Get Platform custom cursor
     *
     * @return cursor object
     */
~~~~~~

Line 143

~~~~~~text
/**
     * Set Platform custom cursor
     *
     * @param bitmap Custom cursor bitmap
     * @param xhot   x offset of the cursor hotspot
     * @param yhot   y offset of the cursor hotspot
     */
~~~~~~

Line 155

~~~~~~text
/**
     * Get currently used cursor implementor
     *
     * @return Cursor implementor
     */
~~~~~~

Line 164

~~~~~~text
/**
     * Set cursor implementor for Platform
     *
     * @param implementor cursor implementor
     */
~~~~~~

Line 179

~~~~~~text
/**
     * Create a generic gamepad implementation
     *
     * @param device Input device to accept events from
     * @param touchpadView A view representing on-screen "trackpad"
     */
~~~~~~

Line 186

~~~~~~text
// Running in minimal mode
~~~~~~

Line 191

~~~~~~text
/**
     * Set current cursor position
     *
     * @param x Cursor X
     * @param y Cursor Y
     */
~~~~~~

Line 204

~~~~~~text
/**
     * Clamp cursor position on the screen. Prevents the cursor from moving outside the game window
     */
~~~~~~

Line 212

~~~~~~text
/**
     * Reset current cursor position and set it to the center of a window
     */
~~~~~~

Line 221

~~~~~~text
/**
     * Send current cursor position to the implementation after clamping and updating its view position.
     * Prefer using this over {@link PlatformBackend#sendMousePosition(double, double, boolean)}
     *
     */
~~~~~~

Line 232

~~~~~~text
/**
     * Send mouse event (click) to the platform implementation
     * Prefer using this over {@link PlatformBackend#sendMouseEvent(int, int, int, double, double, boolean)}
     *
     */
~~~~~~

Line 241

~~~~~~text
/**
     * Register Platform grab listener
     *
     * @param pgl Grab listener
     */
~~~~~~

Line 250

~~~~~~text
/**
     * Trigger surface recreate on implementation. Needs to be called each time a surface object becomes invalid
     *
     * @param surface Surface object
     */
~~~~~~

Line 260

~~~~~~text
/**
     * Set platform implementation backend
     *
     * @param backend implementation backend
     */
~~~~~~

Line 268

~~~~~~text
// To be picked by platform library
~~~~~~

Line 273

~~~~~~text
/**
     * Get Platform clipboard
     * @return clipboard object
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/def/GLESConstants.java

Line 4

~~~~~~text
// ANGLE library definitions
~~~~~~

Line 8

~~~~~~text
// System OpenGLES library definitions
~~~~~~

Line 12

~~~~~~text
// custom GLES environment variables (works on GL4ES/LTW)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/extra/GLESProvider.java

Line 19

~~~~~~text
/**
 * OpenGL ES driver provider for {@link GLESRenderSpec} based renderers (a.k.a. wrappers on-top of OpenGL ES)
 */
~~~~~~

Line 23

~~~~~~text
/**
     * Get fitting OpenGL ES provider for the current device
     *
     * @param context     Application context
     * @param preferAngle Whether the ANGLE provider should be selected
     * @return OpenGL ES provider
     */
~~~~~~

Line 33

~~~~~~text
// External ANGLE takes priority over system ANGLE so we can override it easily
~~~~~~

Line 46

~~~~~~text
/**
     * Name of the provider
     *
     * @return name
     */
~~~~~~

Line 53

~~~~~~text
/**
     * OpenGL EGL library name or the absolute path to it
     *
     * @return path
     */
~~~~~~

Line 61

~~~~~~text
/**
     * OpenGL ES driver library name or the absolute path to it
     *
     * @return path
     */
~~~~~~

Line 68

~~~~~~text
/**
     * {@link File} of the EGL library. You can use this to check if the library exists
     *
     * @return instance of {@link File}
     */
~~~~~~

Line 75

~~~~~~text
/**
     * {@link File} of the OpenGL ES library. ou can use this to check if the library exists
     *
     * @return instance of {@link File}
     */
~~~~~~

Line 82

~~~~~~text
/**
     * Set environment needed for this OpenGL ES provider
     *
     * @param envMap environment map
     */
~~~~~~

Line 92

~~~~~~text
/**
     * Check if the current device supports this OpenGL ES provider
     *
     * @return state
     */
~~~~~~

Line 99

~~~~~~text
/**
     * Check if the current OpenGL ES provider requires to load its libraries in a global/unrestricted namespace to avoid linker issues
     *
     * @return state
     */
~~~~~~

Line 106

~~~~~~text
/**
     * Native OpenGL ES provider. Doesn't do much as the wrappers already use it automatically if no EGL/GLES override was given, but we still implement this
     * for the correctness
     */
~~~~~~

Line 129

~~~~~~text
// Native GLES is always present even in a form of ANGLE (hello Samsung)
~~~~~~

Line 136

~~~~~~text
/**
     * System ANGLE provider. Android 15+ devices often have ANGLE libraries located in their system partition, so we can take advantage of them
     */
~~~~~~

Line 164

~~~~~~text
/**
     * External ANGLE provider. Loads ANGLE libraries through {@link LibraryPlugin} (AnglePlugin) hence requires it to be installed on the device.
     * Useful for using newer ANGLE, patching ANGLE to overcome OpenGL ES restrictions or when nsbypass misbehaves on this device
     */
~~~~~~

Line 195

~~~~~~text
// One might add other OpenGLES providers (such as Mesa and/or bundled ANGLE), but this is not something we want right now
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/GameRenderer.java

Line 27

~~~~~~text
/*
 How to add an extra renderer (guide 2026 mediafire works):

 1. Create RenderSpec for that renderer
 2. Add all requires locale strings and wire them up inside your freshly cooked RenderSpec
 3. Add the renderer tag onto the getKnownRenderer() mapping
 4. (Optional): Add the renderer tag into constant list in Renderers class
 5. Add the renderer tag onto the list of renderers to check for the compatibility (see RendererCache)
 6. ???
 7. PROFIT

*/
~~~~~~

Line 40

~~~~~~text
/**
 * Class for managing game renderers (OpenGL ES & Vulkan)
 */
~~~~~~

Line 55

~~~~~~text
/**
     * Map renderer string to a known RenderSpec
     *
     * @param renderer renderer string
     * @return RenderSpec instance if found, null otherwise
     */
~~~~~~

Line 63

~~~~~~text
// For compatibility
~~~~~~

Line 79

~~~~~~text
/**
     * Set renderer library path
     *
     * @param mainPath       base library path
     * @param additionalPath additional library path to search libs at
     */
~~~~~~

Line 92

~~~~~~text
/**
     * Setup current selected renderer environment. Call before using {@link GameRenderer#maybeSetupRenderer()}
     *
     * @param context application context
     * @throws ErrnoException if underlying Os#setenv call threw an exception
     */
~~~~~~

Line 112

~~~~~~text
/**
     * Get current selected renderer in this GameRenderer instance
     *
     * @return renderer
     */
~~~~~~

Line 121

~~~~~~text
/**
     * Set current selected renderer. Call this before {@link GameRenderer#setupEnvironment} or bad things may happen
     *
     * @param spec renderer
     */
~~~~~~

Line 131

~~~~~~text
/**
     * Set current selected renderer. Call this before {@link GameRenderer#setupEnvironment} or bad things may happen
     *
     * @param renderer renderer string
     * @throws IllegalArgumentException if incorrect renderer string is given
     */
~~~~~~

Line 143

~~~~~~text
/**
     * Set up the current renderer or fallback to {@link GameRenderer#FALLBACK_RENDERER} if failed
     *
     * @return whether the renderer setup was successful
     */
~~~~~~

Line 152

~~~~~~text
// Hopefully (yes, it's going to be fun if it returns null for the fallback renderer. Shouldn't happen though)
~~~~~~

Line 158

~~~~~~text
/**
     * Enable custom Vulkan driver (Turnip) usage
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/impl/GLESRenderSpec.java

Line 22

~~~~~~text
/**
 * Base GLES RenderSpec. Represents a desktop OpenGL wrapper running on-top of {@link GLESProvider}
 */
~~~~~~

Line 38

~~~~~~text
// Prevent OptiFine (and other error-reporting stuff in Minecraft) from balooning the log
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/impl/MesaRenderSpec.java

Line 22

~~~~~~text
/**
 * Mesa3D RenderSpec. Provides desktop Mesa, zink & freedreno
 */
~~~~~~

Line 63

~~~~~~text
// This is needed because mobile drivers often don't implement required features for zink
~~~~~~

Line 64

~~~~~~text
// hence making it fall back to OpenGL 2.1 and break the modern game completely
~~~~~~

Line 65

~~~~~~text
// We don't care much about passing CTS hence this is fine
~~~~~~

Line 96

~~~~~~text
// On Adreno 5XX and lower only Core 3.1 is exposed by default due to missing hardware extensions.
~~~~~~

Line 97

~~~~~~text
// 3.3 is required for modern games so let's force 3.3 if running on such GPU - it's known to be working.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/RendererCache.java

Line 17

~~~~~~text
/**
 * Compatible renderers cache. Used for the UI renderer list
 */
~~~~~~

Line 31

~~~~~~text
/**
     * Return a list of renderers compatible with the current device
     * Don't forget to clean the cache when the list isn't needed anymore
     *
     * @param context application context
     * @return RenderersList containing all compatible renderers
     */
~~~~~~

Line 41

~~~~~~text
// This is the list that controls em all!
~~~~~~

Line 59

~~~~~~text
/**
     * Destroy compatible renderers cache
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/game/renderer/RenderSpec.java

Line 7

~~~~~~text
/**
 * Interface representing a renderer specification
 */
~~~~~~

Line 11

~~~~~~text
/**
     * Check if the current device is able to use this renderer
     *
     * @param context application context
     * @return whether the renderer is compatible
     */
~~~~~~

Line 19

~~~~~~text
/**
     * Renderer name (or tag?)
     *
     * @return name
     */
~~~~~~

Line 26

~~~~~~text
/**
     * Renderer resource display name
     *
     * @return resource id
     */
~~~~~~

Line 33

~~~~~~text
/**
     * Renderer tag
     *
     * @return tag
     */
~~~~~~

Line 40

~~~~~~text
/**
     * Renderer EGL library
     *
     * @return library name or path
     */
~~~~~~

Line 47

~~~~~~text
/**
     * Optional library path if the renderer is linked with libs outside of the launcher native directory
     * @return String (or null if the extra search path is not needed)
     */
~~~~~~

Line 55

~~~~~~text
/**
     * Prepare renderer usage in the game. Sets up environment and some other things
     *
     * @param context application context
     * @param envMap  environment map
     */
~~~~~~

Line 63

~~~~~~text
/**
     * Setup this renderer in MojoExec. Prefer using {@link GameRenderer#maybeSetupRenderer()}
     *
     * @return whether the setup was successful
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/imgcropper/BitmapCropBehaviour.java

Line 27

~~~~~~text
// Actually translate and refresh only if either of the pan deltas are nonzero
~~~~~~

Line 35

~~~~~~text
// Do this to avoid constantly inverting the same matrix on each touch event.
~~~~~~

Line 86

~~~~~~text
// By inverting the matrix we will effectively "divide" our rectangle by it, thus getting
~~~~~~

Line 87

~~~~~~text
// its two points on the surface of the bitmap. Math be cool indeed.
~~~~~~

Line 90

~~~~~~text
// Pick the best dimensions for the crop result, shrinking the target if necessary.
~~~~~~

Line 105

~~~~~~text
// Draw the bitmap on the target. Doing this allows us to not bother with making sure
~~~~~~

Line 106

~~~~~~text
// that targetRect is fully contained within image bounds.
~~~~~~

Line 118

~~~~~~text
/**
     * Computes a prescale matrix.
     * This matrix basically centers the source image in the selection rect.
     * Mainly intended for convenience of implementing a "Reset" button.
     */
~~~~~~

Line 127

~~~~~~text
// A basic "scale to fit while preserving aspect ratio" I have taken from
~~~~~~

Line 128

~~~~~~text
// https://stackoverflow.com/a/23105310
~~~~~~

Line 136

~~~~~~text
// By doing setScale() we don't have to reset() the matrix beforehand saving us a
~~~~~~

Line 137

~~~~~~text
// JNI transition
~~~~~~

Line 152

~~~~~~text
// Don't set the mTranslateInverseOutdated flag to true here as
~~~~~~

Line 153

~~~~~~text
// the inverse of an identity matrix (aka the matrix we're setting ours to on reset())
~~~~~~

Line 154

~~~~~~text
// is an identity matrix, which technically means that mTranslateInverse gets up-to-date there
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/imgcropper/CropperBehaviour.java

Line 7

~~~~~~text
/**
     * Get the largest side of the image currently loaded into this CropperBehaviour.
     * @return the largest side of the loaded image
     */
~~~~~~

Line 13

~~~~~~text
/**
     * This method is called by CropperView for the CropperBehaviour to draw its image with all
     * the transforms applied, It is called before the selection rectangle is drawn.
     * @param canvas the canvas to draw the image on
     */
~~~~~~

Line 20

~~~~~~text
/**
     * This method is called by CropperView to let the behaviour know that the selection rect
     * dimensions were updated.
     */
~~~~~~

Line 26

~~~~~~text
/**
     * This method is called by CropperView or by the programmer to reset all current transforms
     * applied to the image loaded within this CropperBehaviour
     */
~~~~~~

Line 32

~~~~~~text
/**
     * Prepares this behaviour for being rendered in CropperView.
     */
~~~~~~

Line 37

~~~~~~text
/**
     * This method is called by CropperView to pan the image
     * @param dx pan delta-X
     * @param dy pan delta-Y
     */
~~~~~~

Line 44

~~~~~~text
/**
     * This method is called by CropperView to zoom the image
     * @param dz zoom delta-Z
     * @param originX the X coordinate of a point at which the image should be zoomed
     * @param originY the Y coordinate of a point at which the image should be zoomed
     */
~~~~~~

Line 52

~~~~~~text
/**
     * Crop the image according to current transforms, with the targetMaxSide specifying the
     * maximum side of the resulting 1:1 bitmap.
     * @param targetMaxSide the maximum side of the 1:1 bitmap
     * @return the crop of the behaviour's image
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/imgcropper/CropperView.java

Line 31

~~~~~~text
// w/h
~~~~~~

Line 62

~~~~~~text
// Divide the thickness by 2 since we will be needing only half of it for
~~~~~~

Line 63

~~~~~~text
// rect highlight correction.
~~~~~~

Line 73

~~~~~~text
// More than 1 pointer = pinching
~~~~~~

Line 74

~~~~~~text
// Compute the distance and zoom the image with it
~~~~~~

Line 98

~~~~~~text
// Reset lastDistance as it's fairly reliable to assume that when
~~~~~~

Line 99

~~~~~~text
// there's less than 2 pointers on the screen, the zoom gesture is over
~~~~~~

Line 103

~~~~~~text
// When not pinching, pan around. Simultaneous panning and zooming proved to be confusing in my testing.
~~~~~~

Line 104

~~~~~~text
// Lots of code there to allow seamless finger changing while panning.
~~~~~~

Line 109

~~~~~~text
// Remember the pointer index from the start of the gesture.
~~~~~~

Line 110

~~~~~~text
// We will be tracking it for the rest of the gesture unless it gets released.
~~~~~~

Line 114

~~~~~~text
// Fond the pointer we should be tracking
~~~~~~

Line 116

~~~~~~text
// By default, we query the X/Y coordinates of pointer index 0. If our tracked
~~~~~~

Line 117

~~~~~~text
// pointer is no longer at index 0 and is still tracked, overwrite the coordinates
~~~~~~

Line 118

~~~~~~text
// with the expected ones
~~~~~~

Line 124

~~~~~~text
// If we still track out current pointer, pan the image by the movement delta
~~~~~~

Line 127

~~~~~~text
// Otherwise, mark the new tracked pointer without panning.
~~~~~~

Line 145

~~~~~~text
// the view is not clickable
~~~~~~

Line 162

~~~~~~text
// Calculate the corners of the new selection frame. It should always appear at the center of the view.
~~~~~~

Line 163

~~~~~~text
// Accounts for the aspect ratio.
~~~~~~

Line 181

~~~~~~text
// Adjust the selection highlight rectangle to be bigger than the selection area
~~~~~~

Line 182

~~~~~~text
// by the highlight thickness, to make sure that the entire inside of the selection highlight
~~~~~~

Line 183

~~~~~~text
// will fit into the image
~~~~~~

Line 195

~~~~~~text
// No leeway. Size to spec.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/imgcropper/RegionDecoderCropBehaviour.java

Line 42

~~~~~~text
/**
     * Decode a region from this Bitmap based on a subsection in the View coordinate space.
     * @param targetDrawRect an output Rect. This Rect is the position at which the region must
     *                       be rendered within subsectionRect.
     * @param subsectionRect the subsection in View coordinate space. Note that this Rect is modified
     *                       by this function and shouldn't be re-used.
     * @return null if the resulting region is bigger than the original image
     *         null if the resulting region is completely out of the original image bounds
     *         null if the resulting region is smaller than 16x16 pixels
     *         null if a region decoding error has occurred
     *         the resulting Bitmap region otherwise.
     */
~~~~~~

Line 60

~~~~~~text
// If our current sub-section is bigger than the decoder rect, skip.
~~~~~~

Line 61

~~~~~~text
// We do this to avoid unnecessarily loading the image at full resolution.
~~~~~~

Line 64

~~~~~~text
// If our current sub-section doesn't even intersect the decoder rect, we won't even
~~~~~~

Line 65

~~~~~~text
// be able to create an overlay. So, skip.
~~~~~~

Line 67

~~~~~~text
// In my testing, decoding a region smaller than that breaks the current region decoder instance.
~~~~~~

Line 68

~~~~~~text
// So, if it is smaller, skip.
~~~~~~

Line 70

~~~~~~text
// We can't really create a floating-point subsection from a bitmap, so convert the intersected
~~~~~~

Line 71

~~~~~~text
// rectangle that we want to get from the decoder into an integer Rect.
~~~~~~

Line 85

~~~~~~text
// Putting false here as I don't know how BitmapRegionDecoder will behave when interrupted
~~~~~~

Line 141

~~~~~~text
/**
     * Load a scaled down version of the Bitmap that will be used for zooming and panning in the view.
     * BitmapCropBehaviour will base its prescale matrix off of this Bitmap.
     */
~~~~~~

Line 168

~~~~~~text
/**
     * Compute the prescale matrix for the image bounds of the BitmapRegionDecoder. Used to
     * align the transforms done on the scaled source bitmap with the bitmap region decoder.
     */
~~~~~~

Line 180

~~~~~~text
/**
     * Create a Matrix that can be used to transform points from the bitmap coordinate space into the
     * View coordinate space.
     */
~~~~~~

Line 197

~~~~~~text
// If we can't decode a hi-res region, just crop out of the low-res preview. Yes, this will in fact
~~~~~~

Line 198

~~~~~~text
// cause the image to be low res, but we can't really avoid that in this case.
~~~~~~

Line 201

~~~~~~text
// Offset the drawRect by the host selection's top-right corner, to properly position it within the resulting bitmap
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/ImportControlActivity.java

Line 30

~~~~~~text
/**
 * An activity dedicated to importing control files.
 */
~~~~~~

Line 49

~~~~~~text
// Return early, no initialization needed.
~~~~~~

Line 57

~~~~~~text
/**
     * Override the previous loaded intent
     * @param intent the intent used to replace the old one.
     */
~~~~~~

Line 67

~~~~~~text
/**
     * Update all over again if the intent changed.
     */
~~~~~~

Line 74

~~~~~~text
// Don't try to read the file as when this check fails, external storage paths
~~~~~~

Line 75

~~~~~~text
// are no longer valid (likely unmounted).
~~~~~~

Line 76

~~~~~~text
// checkStorageInteractive() will finish this activity for us.
~~~~~~

Line 89

~~~~~~text
//Import and verify thread
~~~~~~

Line 90

~~~~~~text
//Kill the app if the file isn't valid.
~~~~~~

Line 104

~~~~~~text
//Auto show the keyboard
~~~~~~

Line 112

~~~~~~text
/**
     * Start the import.
     * @param view the view which called the function
     */
~~~~~~

Line 118

~~~~~~text
//Step 1 check for suffixes.
~~~~~~

Line 133

~~~~~~text
/**
     * Copy a the file from the Intent data with a provided name into the controlmap folder.
     */
~~~~~~

Line 150

~~~~~~text
/**
     * Tell if the clean version of the filename is valid.
     * @param fileName the string to test
     * @return whether the filename is valid
     */
~~~~~~

Line 162

~~~~~~text
/**
     * Remove or undesirable chars from the string
     * @param fileName The string to trim
     * @return The trimmed string
     */
~~~~~~

Line 176

~~~~~~text
/**
     * Tries to get an Uri from the various sources
     */
~~~~~~

Line 187

~~~~~~text
/**
     * Verify if the control file is valid
     * @return Whether the control file is valid
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/instances/Instance.java

Line 48

~~~~~~text
/**
     * Write the current contents of the instance to persistent storage.
     * @throws IOException in case of write errors
     */
~~~~~~

Line 56

~~~~~~text
/**
     * Try to write the contents of the instance, ignore any exceptions
     */
~~~~~~

Line 67

~~~~~~text
/**
     * Encode the Bitmap as the new profile icon with required encoding settings.
     * @param bitmap the target bitmap
     * @throws IOException in case of errors while storing the icon
     */
~~~~~~

Line 76

~~~~~~text
// On Android < 30, there was no distinction between "lossy" and "lossless",
~~~~~~

Line 77

~~~~~~text
// and the type is picked by the quality parameter. We set the quality to 60.
~~~~~~

Line 78

~~~~~~text
// so it should be lossy,
~~~~~~

Line 80

~~~~~~text
// On Android >= 30, we can explicitly specify that we want lossy compression
~~~~~~

Line 81

~~~~~~text
// with the visual quality of 60.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/instances/InstanceAdapter.java

Line 18

~~~~~~text
/*
 * Adapter for listing launcher profiles in a Spinner
 */
~~~~~~

Line 31

~~~~~~text
/**
     * @return how much entries (both instances and extra adapter entries) are in the adapter right now
     */
~~~~~~

Line 39

~~~~~~text
/**
     * Gets the adapter entry at a given index
     * @param position index to retrieve
     * @return Instance, ProfileAdapterExtra or null
     */
~~~~~~

Line 73

~~~~~~text
//MinecraftProfile minecraftProfile = mProfiles.get(nm);
~~~~~~

Line 74

~~~~~~text
//if(minecraftProfile == null) minecraftProfile = dummy;
~~~~~~

Line 78

~~~~~~text
// Historically, the profile name "New" was hardcoded as the default profile name
~~~~~~

Line 79

~~~~~~text
// We consider "New" the same as putting no name at all
~~~~~~

Line 95

~~~~~~text
// Set selected background if needed
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/instances/InstanceIconProvider.java

Line 33

~~~~~~text
/**
     * Fetch an icon from the cache, or load it if it's not cached.
     * @param resources the Resources object, used for creating drawables
     * @param instance the instance
     * @return an icon drawable
     */
~~~~~~

Line 51

~~~~~~text
/**
     * Drop an icon from the icon cache. When dropped, it's Drawable will be re-read from the
     * instance icon file (or re-fetched from the static cache)
     * @param key the instance
     */
~~~~~~

Line 101

~~~~~~text
/**
     * Check whether the icon under the specified name is a static icon available in the provider.
     * @param name static icon name to check
     * @return whether the icon is available or not
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/instances/Instances.java

Line 116

~~~~~~text
/**
     * Set the currently selected instance and save it in user preferences
     * @param instance new selected instance
     */
~~~~~~

Line 128

~~~~~~text
/**
     * Remove the instance. This also removes its data storage folder.
     * @param instance the Instance to remove
     * @throws IOException in case of errors during directory removal
     */
~~~~~~

Line 139

~~~~~~text
/**
     * Create a new instance intended for first-time launcher users.
     */
~~~~~~

Line 150

~~~~~~text
/**
     * Create a new instance based on a default template.
     * @return the new instance
     */
~~~~~~

Line 161

~~~~~~text
/**
     * Create an instance without attempting to load the instance list first. Only use this
     * method during initialization.
     */
~~~~~~

Line 175

~~~~~~text
/**
     * Create a new instance with defaults set by user
     * @param instanceSetter setter function called to set user parameters
     * @param namePrefix a name prefix (for the user to easily distinguish installed instances)
     * @return the created instance
     * @throws IOException if directory creation/instance writing fails
     */
~~~~~~

Line 186

~~~~~~text
/**
     * Load the currently selected instance. Note that this method must not be used along with any code
     * which uses getImmutableInstanceList()
     * @return currently selected instance
     */
~~~~~~

Line 199

~~~~~~text
/**
     * Rename the provided instance directory. This will apply the new name only if it's unique.
     * If no name provided - using bare UUID. If a name conflict - newName as prefix + UUID.
     * @param instance Instance
     * @param newName New instance name
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/JAssets.java

Line 11

~~~~~~text
/* Used by older versions of mc, when the files were named and under .minecraft/resources  */
~~~~~~

Line 15

~~~~~~text
/* Used by the legacy.json (~1.6.X) asset file, used for paths at the root of the .minecraft/assets folder */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/JVersionList.java

Line 8

~~~~~~text
// all unused fields here are parts of JSON structures
~~~~~~

Line 21

~~~~~~text
// Since 1.13, so it's one of ways to check
~~~~~~

Line 42

~~~~~~text
// parameter used by LabyMod 4
~~~~~~

Line 55

~~~~~~text
// Since 1.13
~~~~~~

Line 66

~~~~~~text
// TLauncher styled argument...
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/LauncherActivity.java

Line 64

~~~~~~text
/* Allows to switch from one button "type" to another */
~~~~~~

Line 73

~~~~~~text
/* Listener for the back button in settings */
~~~~~~

Line 79

~~~~~~text
/* Listener for the auth method selection screen */
~~~~~~

Line 81

~~~~~~text
// The "false" value is used to stop auth method selection
~~~~~~

Line 85

~~~~~~text
// Allow starting the add account only from the main menu, should it be moved to fragment itself ?
~~~~~~

Line 92

~~~~~~text
/* Listener for the settings fragment */
~~~~~~

Line 100

~~~~~~text
// The setting button doubles as a home button now
~~~~~~

Line 145

~~~~~~text
// Hide the notification that starts the game if there are tasks executing.
~~~~~~

Line 146

~~~~~~text
// Prevents the user from trying to launch the game with tasks ongoing.
~~~~~~

Line 245

~~~~~~text
/** Custom implementation to feel more natural when a backstack isn't present */
~~~~~~

Line 297

~~~~~~text
// Call async
~~~~~~

Line 331

~~~~~~text
/** Stuff all the view boilerplate here */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/lifecycle/ActivityRunnable.java

Line 6

~~~~~~text
/**
     * ContextExecutor will execute this function first if a foreground Activity that was attached to the
     * ContextExecutor is available.
     * @param activity the activity
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/lifecycle/ContextAwareDoneListener.java

Line 54

~~~~~~text
//You should kill yourself, NOW!
~~~~~~

Line 63

~~~~~~text
// Since the game is a separate process anyway, it does not matter if it gets invoked
~~~~~~

Line 64

~~~~~~text
// from somewhere other than the launcher activity.
~~~~~~

Line 65

~~~~~~text
// The only problem may arise if the launcher starts doing something when the user starts the notification.
~~~~~~

Line 66

~~~~~~text
// So, the notification is automatically removed once there are tasks ongoing in the ProgressKeeper
~~~~~~

Line 74

~~~~~~text
// You should keep yourself safe, NOW!
~~~~~~

Line 75

~~~~~~text
// otherwise android does weird things...
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/lifecycle/ContextExecutor.java

Line 15

~~~~~~text
/**
     * Schedules a ContextExecutorTask to be executed. For more info on tasks, please read
     * ContextExecutorTask.java
     * @param contextExecutorTask the task to be executed
     */
~~~~~~

Line 24

~~~~~~text
/**
     * Schedules an ActivityRunnable to be executed ONLY if there is an Activity currently attached and in foreground
     * @param activityRunnable the activity runnable
     */
~~~~~~

Line 49

~~~~~~text
/**
     * Set the Activity that this ContextExecutor will use for executing tasks
     * @param activity the activity to be used
     */
~~~~~~

Line 57

~~~~~~text
/**
     * Clear the Activity previously set, so thet ContextExecutor won't use it to execute tasks.
     */
~~~~~~

Line 65

~~~~~~text
/**
     * Set the Application that will be used to execute tasks if the Activity won't be available.
     * @param application the application to use as the fallback
     */
~~~~~~

Line 73

~~~~~~text
/**
     * Clear the Application previously set, so that ContextExecutor will notify the user of a critical error
     * that is executing code after the application is ended by the system.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/lifecycle/ContextExecutorTask.java

Line 5

~~~~~~text
/**
 * A ContextExecutorTask is a task that can dynamically change its behaviour, based on the context
 * used for its execution. This can be used to implement for ex. error/finish notifications from
 * background threads that may live with the Service after the activity that started them died.
 */
~~~~~~

Line 11

~~~~~~text
/**
     * ContextExecutor will execute this function if a foreground Activity is not available, but the app
     * is still running.
     * @param context the application context
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/lifecycle/LifecycleAwareAlertDialog.java

Line 16

~~~~~~text
/**
 * A class that implements a form of lifecycle awareness for AlertDialog
 */
~~~~~~

Line 24

~~~~~~text
/**
     * Show the lifecycle-aware dialog.
     * Note that the DialogCreator may not be always invoked.
     * @param lifecycle the lifecycle to follow
     * @param context the context for the dialog
     * @param dialogCreator an interface used to create the dialog.
     *                      Note that any dismiss listeners added to the dialog must be wrapped
     *                      with wrapDismissListener().
     */
~~~~~~

Line 42

~~~~~~text
// Install the default cancel/dismiss handling
~~~~~~

Line 49

~~~~~~text
/**
     * Invoked when the dialog gets hidden either by cancel()/dismiss(), or if a lifecycle event
     * happens.
     * @param lifecycleEnded if the dialog was hidden due to a lifecycle event
     */
~~~~~~

Line 69

~~~~~~text
/**
     * Wrap an OnDismissListener for use with this LifecycleAwareAlertDialog. Pass null to only invoke the
     * default dialog hidden handling.
     * @param listener your listener
     * @return the wrapped listener
     */
~~~~~~

Line 83

~~~~~~text
/**
         * This methods is called when the LifecycleAwareAlertDialog needs to set up its dialog.
         * @param alertDialog an instance of LifecycleAwareAlertDialog for wrapping listeners
         * @param dialogBuilder the AlertDialog builder
         */
~~~~~~

Line 91

~~~~~~text
/**
     * Show a dialog and halt the current thread until the dialog gets closed either due to user action or a lifecycle event.
     * @param lifecycle the Lifecycle object that this dialog will track to automatically close upon destruction
     * @param context the context used to show the dialog
     * @param dialogCreator a DialogCreator that creates the dialog
     * @return true if the dialog was automatically dismissed due to a lifecycle event. This may happen
     *              before the dialog creator is used, so make sure to to handle the return value of the function.
     *         false otherwise
     * @throws InterruptedException if the thread was interrupted while waiting for the dialog
     */
~~~~~~

Line 105

~~~~~~text
// This runnable is moved here in order to reduce bracket/lambda hell
~~~~~~

Line 118

~~~~~~text
// the wait() method makes the thread wait on the end of the synchronized block.
~~~~~~

Line 119

~~~~~~text
// so we put it here to make sure that the thread won't get notified before wait()
~~~~~~

Line 120

~~~~~~text
// is called
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/Logger.java

Line 5

~~~~~~text
/** Singleton class made to log on one file
 * The singleton part can be removed but will require more implementation from the end-dev
 */
~~~~~~

Line 10

~~~~~~text
/** Print the text to the log file if not censored */
~~~~~~

Line 14

~~~~~~text
/** Reset the log file, effectively erasing any previous logs */
~~~~~~

Line 17

~~~~~~text
/** Small listener for anything listening to the log */
~~~~~~

Line 23

~~~~~~text
/** Link a log listener to the logger */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/LwjglGlfwKeycode.java

Line 1

~~~~~~text
// Keycodes from https://github.com/glfw/glfw/blob/master/include/GLFW/glfw3.h
~~~~~~

Line 35

~~~~~~text
/** The unknown key. */
~~~~~~

Line 36

~~~~~~text
// should be -1
~~~~~~

Line 38

~~~~~~text
/** Printable keys. */
~~~~~~

Line 91

~~~~~~text
/** Function keys. */
~~~~~~

Line 165

~~~~~~text
/** If this bit is set one or more Shift keys were held down. */
~~~~~~

Line 168

~~~~~~text
/** If this bit is set one or more Control keys were held down. */
~~~~~~

Line 171

~~~~~~text
/** If this bit is set one or more Alt keys were held down. */
~~~~~~

Line 174

~~~~~~text
/** If this bit is set one or more Super keys were held down. */
~~~~~~

Line 177

~~~~~~text
/** If this bit is set the Caps Lock key is enabled and the LOCK_KEY_MODS input mode is set. */
~~~~~~

Line 180

~~~~~~text
/** If this bit is set the Num Lock key is enabled and the LOCK_KEY_MODS input mode is set. */
~~~~~~

Line 184

~~~~~~text
/** Mouse buttons. See <a target="_blank" href="http://www.glfw.org/docs/latest/input.html#input_mouse_button">mouse button input</a> for how these are used. */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/mirrors/DownloadMirror.java

Line 23

~~~~~~text
/**
     * Download a file with the current mirror (or no mirror)
     * @param downloadClass Class of the download. Can either be DOWNLOAD_CLASS_LIBRARIES,
     *                      DOWNLOAD_CLASS_METADATA or DOWNLOAD_CLASS_ASSETS
     * @param urlInput The original (Mojang) URL for the download
     * @param outputFile The output file for the download
     */
~~~~~~

Line 35

~~~~~~text
/**
     * Check if the current download source is a mirror and not an official source.
     * @return true if the source is a mirror, false otherwise
     */
~~~~~~

Line 52

~~~~~~text
//TODO make use of this
~~~~~~

Line 54

~~~~~~text
/**
     * Get the transformed URL for downloading a file through a mirror.
     * @param downloadClass the download class (one of the constants above)
     * @param mojangUrl the original URL
     * @return the transformed URL
     * @throws MalformedURLException if the URL isn't formatted correctly
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/mirrors/MirrorTamperedException.java

Line 14

~~~~~~text
// Do not change. Android really hates when this value changes for some reason.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/BTADownloadTask.java

Line 59

~~~~~~text
// BTA doesn't have SHA1 checksums in its repositories, so the user may try to reinstall it
~~~~~~

Line 60

~~~~~~text
// if it didn't work due to a broken download. So, for reinstalls like that to work,
~~~~~~

Line 61

~~~~~~text
// we need to delete the old client jar to force the download of a new one.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/BTAUtils.java

Line 57

~~~~~~text
// The original list is guaranteed to be in ascending order - the earliest versions
~~~~~~

Line 58

~~~~~~text
// are at the top, but for user convenience we need to put the newest versions at the top,
~~~~~~

Line 59

~~~~~~text
// so the BTAVersion list is made from the reverse of the string list.
~~~~~~

Line 85

~~~~~~text
// Checking for presence in testing array here to avoid accidentally adding nonexistent
~~~~~~

Line 86

~~~~~~text
// versions if some of them end up getting removed.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/ComparableVersionString.java

Line 37

~~~~~~text
/**
     * @return the original but if the patch was .0 it will not include it, e.g.
     *         "1.20.0" -> "1.20"
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/FabriclikeUtils.java

Line 107

~~~~~~text
//Quilt has a skill issue and does not say which versions are stable or not
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/ForgelikeUtils.java

Line 50

~~~~~~text
// if we cant make a parser we might as well not even try to parse anything
~~~~~~

Line 54

~~~~~~text
//of_test();
~~~~~~

Line 60

~~~~~~text
// IOException is present here StringReader throws it only if the parser called close()
~~~~~~

Line 61

~~~~~~text
// sooner than needed, which is a parser issue and not an I/O one
~~~~~~

Line 116

~~~~~~text
// I feel like it's necessary to explain the NeoForge versioning format
~~~~~~

Line 117

~~~~~~text
// basically, what it does is it trims the major version from minecrafts version
~~~~~~

Line 118

~~~~~~text
// e.g.: 1.20.1 -> 20.1, and then appends its own "patch" version to that
~~~~~~

Line 119

~~~~~~text
// e.g.: 20.1 -> 20.1.8, which means the version string includes both, the minecraft
~~~~~~

Line 120

~~~~~~text
// and the loader version at once
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/ApiHandler.java

Line 54

~~~~~~text
//Make a get request and return the response as a raw string;
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/CommonApi.java

Line 24

~~~~~~text
/**
 * Group all apis under the same umbrella, as another layer of abstraction
 */
~~~~~~

Line 51

~~~~~~text
// If there are no previous page results, create a new array. Otherwise, use the one from the previous page
~~~~~~

Line 59

~~~~~~text
// If there is an array and its length is zero, this means that we've exhausted the results for this
~~~~~~

Line 60

~~~~~~text
// search query and we don't need to actually do the search
~~~~~~

Line 62

~~~~~~text
// If the previous page result is not null (aka the arrays aren't fresh)
~~~~~~

Line 63

~~~~~~text
// and the previous result is null, it means that na error has occured on the previous
~~~~~~

Line 64

~~~~~~text
// page. We lost contingency anyway, so don't bother requesting.
~~~~~~

Line 75

~~~~~~text
// Count up all the results
~~~~~~

Line 93

~~~~~~text
// Then build an array with all the mods
~~~~~~

Line 96

~~~~~~text
// Sanitize returned values
~~~~~~

Line 100

~~~~~~text
// If the length is zero, we don't need to perform needless copies
~~~~~~

Line 109

~~~~~~text
// Recycle or create new search result
~~~~~~

Line 166

~~~~~~text
// return this if no modpack was detected
~~~~~~

Line 172

~~~~~~text
/** Fuse the arrays in a way that's fair for every endpoint */
~~~~~~

Line 176

~~~~~~text
// Calculate the total size of the merged array
~~~~~~

Line 186

~~~~~~text
// Find the maximum length of arrays
~~~~~~

Line 193

~~~~~~text
// Populate the merged array
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/CurseforgeApi.java

Line 44

~~~~~~text
// Stolen from
~~~~~~

Line 45

~~~~~~text
// https://github.com/AnzhiZhang/CurseForgeModpackDownloader/blob/6cb3f428459f0cc8f444d16e54aea4cd1186fd7b/utils/requester.py#L93
~~~~~~

Line 48

~~~~~~text
// https://api.curseforge.com/v1/categories?gameId=432 and search for "Mods" (case-sensitive)
~~~~~~

Line 84

~~~~~~text
// Gson automatically casts null to false, which leans to issues
~~~~~~

Line 85

~~~~~~text
// So, only check the distribution flag if it is non-null
~~~~~~

Line 144

~~~~~~text
//TODO considering only modpacks for now
~~~~~~

Line 169

~~~~~~text
// we read the remainder! yay!
~~~~~~

Line 219

~~~~~~text
//TODO: Quilt is also Forge? How does that work?
~~~~~~

Line 228

~~~~~~text
// First try the official api endpoint
~~~~~~

Line 233

~~~~~~text
// Otherwise, fallback to building an edge link
~~~~~~

Line 260

~~~~~~text
// The sha1 = 1; md5 = 2;
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/ModpackApi.java

Line 20

~~~~~~text
/**
 *
 */
~~~~~~

Line 25

~~~~~~text
/**
     * @param searchFilters Filters
     * @param previousPageResult The result from the previous page
     * @return the list of mod items from specified offset
     */
~~~~~~

Line 32

~~~~~~text
/**
     * @param searchFilters Filters
     * @return A list of mod items
     */
~~~~~~

Line 40

~~~~~~text
/**
     * Fetch the mod details
     * @param item The moditem that was selected
     * @return Detailed data about a mod(pack)
     */
~~~~~~

Line 47

~~~~~~text
/**
     * Download and install the modpack
     * @param modDetail The mod detail data
     * @param selectedVersion The selected version
     */
~~~~~~

Line 53

~~~~~~text
// Doing this here since when starting installation, the progress does not start immediately
~~~~~~

Line 54

~~~~~~text
// which may lead to two concurrent installations (very bad)
~~~~~~

Line 67

~~~~~~text
/**
     * Install the mod(pack).
     * May require the download of additional files.
     * May requires launching the installation of a modloader
     * @param modDetail The mod detail data
     * @param selectedVersion The selected version
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/ModpackInstaller.java

Line 29

~~~~~~text
// Build a new minecraft instance, folder first
~~~~~~

Line 33

~~~~~~text
// Install the modpack
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/api/ModrinthApi.java

Line 46

~~~~~~text
// Fixes an issue where the offset being equal or greater than total_hits is ignored
~~~~~~

Line 56

~~~~~~text
// Build the facets filters
~~~~~~

Line 111

~~~~~~text
// Assume there may not be hashes, in case the API changes
~~~~~~

Line 127

~~~~~~text
//TODO considering only modpacks for now
~~~~~~

Line 150

~~~~~~text
// "Vanilla" pack. Possibly GT:NH, let's try to detect lwjgl3ify
~~~~~~

Line 193

~~~~~~text
// TODO source selection
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/imagecache/DownloadImageTask.java

Line 26

~~~~~~text
// restart the parent task to read the image and send it to the receiver
~~~~~~

Line 27

~~~~~~text
// if it wasn't cancelled. If it was, then we just die here
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/imagecache/IconCacheJanitor.java

Line 13

~~~~~~text
/**
 * This image is intended to keep the mod icon cache tidy (aka under 100 megabytes)
 */
~~~~~~

Line 17

~~~~~~text
// The cache size limit, 100 megabytes
~~~~~~

Line 18

~~~~~~text
// The size to which the cache should be brought
~~~~~~

Line 19

~~~~~~text
// in case of an overflow, 50 mb
~~~~~~

Line 23

~~~~~~text
// don't allow others to create this
~~~~~~

Line 62

~~~~~~text
/**
     * Runs the janitor task, unless there was one running already or one has ran already
     */
~~~~~~

Line 72

~~~~~~text
/**
     * Waits for the janitor task to finish, if there is one running already
     * Note that the thread waiting must not be interrupted.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/imagecache/ImageReceiver.java

Line 5

~~~~~~text
/**
 * ModIconCache will call your view back when the image becomes available with this interface
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/imagecache/ModIconCache.java

Line 40

~~~~~~text
/**
     * Get an image for a mod with the associated tag and URL to download it in case if its not cached
     * @param imageReceiver the receiver interface that would get called when the image loads
     * @param imageTag the tag of the image to keep track of it
     * @param imageUrl the URL of the image in case if it's not cached
     */
~~~~~~

Line 50

~~~~~~text
/**
     * Mark the image obtainment task requested with this receiver as "cancelled". This means that
     * this receiver will not be called back and that some tasks related to this image may be
     * prevented from happening or interrupted.
     * @param imageReceiver the receiver to cancel
     */
~~~~~~

Line 81

~~~~~~text
/**
     * Get the base64-encoded version of a cached icon by its tag.
     * Note: this functions performs I/O operations, and should not be called on the UI
     * thread.
     * @param imageTag the icon tag
     * @return the base64 encoded image or null if not cached
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/imagecache/ReadFromDiskTask.java

Line 38

~~~~~~text
// do not leak the bitmap if the task got cancelled right at the end
~~~~~~

Line 47

~~~~~~text
// don't run the download task if the task got canceled
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/models/Constants.java

Line 6

~~~~~~text
/** Types of modpack apis */
~~~~~~

Line 11

~~~~~~text
/** Modrinth api, file environments */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/models/ModDetail.java

Line 9

~~~~~~text
/* A cheap way to map from the front facing name to the underlying id */
~~~~~~

Line 13

~~~~~~text
/* SHA 1 hashes, null if a hash is unavailable */
~~~~~~

Line 22

~~~~~~text
// Add the mc version to the version model
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/models/ModrinthIndex.java

Line 11

~~~~~~text
/**
 * POJO to represent the modrinth index inside mrpacks
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/models/SearchFilters.java

Line 5

~~~~~~text
/**
 * Search filters, passed to APIs
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/modpacks/ModItemAdapter.java

Line 47

~~~~~~text
/* Used when versions haven't loaded yet, default text to reduce layout shifting */
~~~~~~

Line 49

~~~~~~text
/* This my seem horribly inefficient but it is in fact the most efficient way without effectively writing a weak collection from scratch */
~~~~~~

Line 56

~~~~~~text
/* Cache for ever so slightly rounding the image for the corner not to stick out of the layout */
~~~~~~

Line 91

~~~~~~text
// Create a new view, which defines the UI of the list item
~~~~~~

Line 95

~~~~~~text
// Create a new view, which is actually just the progress bar
~~~~~~

Line 147

~~~~~~text
/**
     * Basic viewholder with expension capabilities
     */
~~~~~~

Line 165

~~~~~~text
/* Used to display available versions of the mod(pack) */
~~~~~~

Line 173

~~~~~~text
// Inflate the ViewStub
~~~~~~

Line 189

~~~~~~text
// only reload if no reloads are in progress
~~~~~~

Line 191

~~~~~~text
/*
                     * Why do we do this?
                     * The reason is simple: multithreading is difficult as hell to manage
                     * Let me explain:
                     */
~~~~~~

Line 197

~~~~~~text
/*
                         * While we are sitting in the function below doing networking, the view might have already gotten recycled.
                         * If we didn't use a Future, we would have extended a ViewHolder with completely unrelated content
                         * or with an error that has never actually happened
                         */
~~~~~~

Line 205

~~~~~~text
/*
                             * Once we enter here, the state we're in is already defined - no view shuffling can happen on the UI
                             * thread while we are on the UI thread ourselves. If we were cancelled, this means that the future
                             * we were supposed to have no longer makes sense, so we return and do not alter the state (since we might
                             * alter the state of an unrelated item otherwise)
                             */
~~~~~~

Line 212

~~~~~~text
/*
                             * We do not null the future before returning since this field might already belong to a different item with its
                             * own Future, which we don't want to interfere with.
                             * But if the future is not cancelled, it is the right one for this ViewHolder, and we don't need it anymore, so
                             * let's help GC clean it up once we exit!
                             */
~~~~~~

Line 225

~~~~~~text
// Define click listener for the ViewHolder's View
~~~~~~

Line 232

~~~~~~text
/** Display basic info about the moditem */
~~~~~~

Line 243

~~~~~~text
/*
                 * Since this method reinitializes the ViewHolder for a new mod, this Future stops being ours, so we cancel it
                 * and null it. The rest is handled above
                 */
~~~~~~

Line 252

~~~~~~text
// here the previous reference to the image receiver will disappear
~~~~~~

Line 270

~~~~~~text
/** Display extended info/interaction about a modpack */
~~~~~~

Line 290

~~~~~~text
// We need to align to the longer section
~~~~~~

Line 339

~~~~~~text
/**
     * The view holder used to hold the progress bar at the end of the list
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/modloaders/OptiFineDownloadTask.java

Line 52

~~~~~~text
// the string is always normalized
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/multirt/MultiRTConfigDialog.java

Line 18

~~~~~~text
/** Show the dialog, refreshes the adapter data before showing it */
~~~~~~

Line 24

~~~~~~text
//only used to completely refresh the list, it is necessary
~~~~~~

Line 30

~~~~~~text
/** Build the dialog behavior and style */
~~~~~~

Line 44

~~~~~~text
// Custom button behavior without dismiss
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/multirt/MultiRTUtils.java

Line 103

~~~~~~text
// Refresh libraries
~~~~~~

Line 206

~~~~~~text
/**
     * Unpacks all .pack files into .jar Serves only for java 8, as java 9 brought project jigsaw
     * @param nativeLibraryDir The native lib path, required to execute the unpack200 binary
     * @param runtimePath The path to the runtime to walk into
     */
~~~~~~

Line 250

~~~~~~text
// tarIn is a TarArchiveInputStream
~~~~~~

Line 260

~~~~~~text
// android.system.Os
~~~~~~

Line 261

~~~~~~text
// Libcore one support all Android versions
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/multirt/RTRecyclerViewAdapter.java

Line 54

~~~~~~text
//not a problem, given the typical size of the list
~~~~~~

Line 61

~~~~~~text
//not a problem, given the typical size of the list
~~~~~~

Line 95

~~~~~~text
// same as all the other ones
~~~~~~

Line 150

~~~~~~text
// Problematic runtime moment, force propose deletion
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/NewJREUtil.java

Line 54

~~~~~~text
// We failed to get the version of the runtime available on the web server.
~~~~~~

Line 55

~~~~~~text
// Let's just hope that we have an internal version installed in that case.
~~~~~~

Line 60

~~~~~~text
// this implicitly checks for null, so it will unpack the runtime even if we don't have one installed
~~~~~~

Line 127

~~~~~~text
// Those files being deleted are on a "i wish" basis
~~~~~~

Line 154

~~~~~~text
//Now we have the reliable information to check if our runtime settings are good enough
~~~~~~

Line 162

~~~~~~text
// Partly trust the user with his own selection, if the game can even try to run in this case
~~~~~~

Line 164

~~~~~~text
// Check whether the selection is an internal runtime
~~~~~~

Line 166

~~~~~~text
// If it is, check if updates are available from the APK file
~~~~~~

Line 168

~~~~~~text
// Not calling showRuntimeFail on failure here because we did, technically, find the compatible runtime
~~~~~~

Line 174

~~~~~~text
// If the runtime version selected by the user is not appropriate for this version (which means the game won't run at all)
~~~~~~

Line 175

~~~~~~text
// automatically pick from either an already installed runtime, or a runtime packed with the launcher
~~~~~~

Line 183

~~~~~~text
// No possible selections
~~~~~~

Line 192

~~~~~~text
// Perform checks on the picked runtime
~~~~~~

Line 194

~~~~~~text
// If it's an already installed runtime, save its name and check if
~~~~~~

Line 195

~~~~~~text
// it's actually an internal one (just in case)
~~~~~~

Line 200

~~~~~~text
// If it's an internal runtime, set it's name as the appropriate one.
~~~~~~

Line 207

~~~~~~text
// If it turns out the selected runtime is actually an internal one, attempt automatic installation or update
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/plugins/LibraryPlugin.java

Line 15

~~~~~~text
// Known plugins constants
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/PojavApplication.java

Line 47

~~~~~~text
// Write to file, since some devices may not able to show error
~~~~~~

Line 73

~~~~~~text
// Disable fatal errors on gplay. This is necessary so that google can collect crash report data and send it to me
~~~~~~

Line 74

~~~~~~text
// (where i can find the cause and fix it)
~~~~~~

Line 81

~~~~~~text
// Implicitly initializes early constants and storage constants.
~~~~~~

Line 82

~~~~~~text
// Required to run the main activity properly.
~~~~~~

Line 85

~~~~~~text
// In other cases, only initialize enough for the basicmost basics to work
~~~~~~

Line 86

~~~~~~text
// and not explode.
~~~~~~

Line 90

~~~~~~text
//Force x86 lib directory for Asus x86 based zenfones
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/BackButtonPreference.java

Line 34

~~~~~~text
// It is caught by an ExtraListener in the LauncherActivity
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/CustomSeekBarPreference.java

Line 20

~~~~~~text
/** The suffix displayed */
~~~~~~

Line 22

~~~~~~text
/** Custom minimum value to provide the same behavior as the usual setMin */
~~~~~~

Line 24

~~~~~~text
/** The textview associated by default to the preference */
~~~~~~

Line 26

~~~~~~text
/** Seekbar increment in case the max gets set */
~~~~~~

Line 54

~~~~~~text
//Note: since the max (setMax is a final function) is not taken into account properly, setting the min over the max may produce funky results
~~~~~~

Line 102

~~~~~~text
/**
     * Set a suffix to be appended on the TextView associated to the value
     * @param suffix The suffix to append as a String
     */
~~~~~~

Line 110

~~~~~~text
/**
     * Convenience function to set both min and max at the same time.
     * @param min The minimum value
     * @param max The maximum value
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/LauncherPreferences.java

Line 80

~~~~~~text
//Required for CTRLDEF_FILE and MultiRT
~~~~~~

Line 129

~~~~~~text
// purge arg
~~~~~~

Line 146

~~~~~~text
/**
     * This functions aims at finding the best default RAM amount,
     * according to the RAM amount of the physical device.
     * Put not enough RAM ? Minecraft will lag and crash.
     * Put too much RAM ?
     * The GC will lag, android won't be able to breathe properly.
     * @param ctx Context needed to get the total memory of the device.
     * @return The best default value found.
     */
~~~~~~

Line 160

~~~~~~text
// Limit the max for 32 bits devices more harshly
~~~~~~

Line 166

~~~~~~text
//Default RAM allocation for 64 bits
~~~~~~

Line 169

~~~~~~text
/// Find a correct resolution for the device
~~~~~~

Line 170

~~~~~~text
///
~~~~~~

Line 171

~~~~~~text
/// Some devices are shipped with a ridiculously high resolution, which can cause performance issues
~~~~~~

Line 172

~~~~~~text
/// This function will try to find a resolution that is good enough for the device
~~~~~~

Line 177

~~~~~~text
// No need to scale down
~~~~~~

Line 180

~~~~~~text
// The value must match the seekbar values
~~~~~~

Line 185

~~~~~~text
/// Check if the device is considered powerful.
~~~~~~

Line 186

~~~~~~text
/// Powerful devices will have some energy saving tweaks enabled by default
~~~~~~

Line 209

~~~~~~text
/** Check if the device has a display cutout */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/QuickSettingSideDialog.java

Line 27

~~~~~~text
/**
 * Side dialog for quick settings that you can change in game
 * The implementation has to take action on some preference changes
 */
~~~~~~

Line 65

~~~~~~text
// Bind layout elements
~~~~~~

Line 235

~~~~~~text
/** Resets all settings to their original values */
~~~~~~

Line 237

~~~~~~text
// Reset all settings if we were editing
~~~~~~

Line 258

~~~~~~text
/** Called when the resolution is changed. Use {@link LauncherPreferences#PREF_SCALE_FACTOR} */
~~~~~~

Line 261

~~~~~~text
/** Called when the gyro state is changed.
     * Use {@link LauncherPreferences#PREF_ENABLE_GYRO}
     * Use {@link LauncherPreferences#PREF_GYRO_INVERT_X}
     * Use {@link LauncherPreferences#PREF_GYRO_INVERT_Y}
     */
~~~~~~

Line 268

~~~~~~text
/**
     * Called when the button transparency state is changed. Use {@link LauncherPreferences#PREF_BUTTON_TRANSPARENCY}
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/screens/LauncherPreferenceControlFragment.java

Line 18

~~~~~~text
// Get values
~~~~~~

Line 28

~~~~~~text
//Triggers a write for some reason which resets the value
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/screens/LauncherPreferenceFragment.java

Line 19

~~~~~~text
/**
 * Preference for the main screen, any sub-screen should inherit this class for consistent behavior,
 * overriding only onCreatePreferences
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/screens/LauncherPreferenceJavaFragment.java

Line 29

~~~~~~text
// Triggers a write for some reason
~~~~~~

Line 39

~~~~~~text
//To have a minimum for the device to breathe
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/prefs/screens/LauncherPreferenceVideoFragment.java

Line 24

~~~~~~text
/**
 * Fragment for any settings video related
 */
~~~~~~

Line 38

~~~~~~text
// #724 bug fix
~~~~~~

Line 45

~~~~~~text
// Sustained performance is only available since Nougat
~~~~~~

Line 59

~~~~~~text
// Show ANGLE switch only if AnglePlugin is available
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/profiles/VersionListAdapter.java

Line 36

~~~~~~text
// Query installed versions
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/progresskeeper/DownloaderProgressWrapper.java

Line 13

~~~~~~text
/**
     * A simple wrapper to send the downloader progress to ProgressKeeper
     * @param progressString the string that will be used in the progress reporter
     * @param progressRecord the record for ProgressKeeper
     */
~~~~~~

Line 37

~~~~~~text
// the allocations are fine because thats how java implements variadic arguments in bytecode: an array of whatever
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/progresskeeper/ProgressKeeper.java

Line 87

~~~~~~text
/**
     * Waits until all tasks are done and runs the runnable, or if there were no pending process remaining
     * The runnable runs from the thread that updated the task count last, and it might be the UI thread,
     * so don't put long running processes in it
     * @param runnable the runnable to run when no tasks are remaining
     */
~~~~~~

Line 94

~~~~~~text
// If we do it the other way the listener would be removed before it was added, which will cause a listener object leak
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/progresskeeper/TaskCountListener.java

Line 4

~~~~~~text
/**
     * @return whether to remove self after this callback.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/scoped/FolderProvider.java

Line 36

~~~~~~text
/**
 * A document provider for the Storage Access Framework which exposes the files in the
 * $HOME/ directory to other apps.
 * <p/>
 * Note that this replaces providing an activity matching the ACTION_GET_CONTENT intent:
 * <p/>
 * "A document provider and ACTION_GET_CONTENT should be considered mutually exclusive. If you
 * support both of them simultaneously, your app will appear twice in the system picker UI,
 * offering two different ways of accessing your stored data. This would be confusing for users."
 * - <a href="http://developer.android.com/guide/topics/providers/document-provider.html#43">...</a>
 */
~~~~~~

Line 58

~~~~~~text
// The default columns to return information about a root if no specific
~~~~~~

Line 59

~~~~~~text
// columns are requested in a query.
~~~~~~

Line 71

~~~~~~text
// The default columns to return information about a document if no specific
~~~~~~

Line 72

~~~~~~text
// columns are requested in a query.
~~~~~~

Line 108

~~~~~~text
// Future-proofing in case if we implement realtime file watching
~~~~~~

Line 125

~~~~~~text
// Set the notification URI as that's what the "Files" app will be listening to in case of file deletion
~~~~~~

Line 179

~~~~~~text
// Notify the file manager that the parent directory has changed
~~~~~~

Line 225

~~~~~~text
// Notify the file manager that the parent directory has changed
~~~~~~

Line 241

~~~~~~text
// This example implementation searches file names for the query and doesn't rank search
~~~~~~

Line 242

~~~~~~text
// results, so we can stop as soon as we find a sufficient number of matches.  Other
~~~~~~

Line 243

~~~~~~text
// implementations might rank results and use other data about files, rather than the file
~~~~~~

Line 244

~~~~~~text
// name, to produce a match.
~~~~~~

Line 251

~~~~~~text
// Avoid directories outside the $HOME directory linked with symlinks (to avoid e.g. search
~~~~~~

Line 252

~~~~~~text
// through the whole SD card).
~~~~~~

Line 279

~~~~~~text
/**
     * Get the document id given a file. This document id must be consistent across time as other
     * applications may save the ID and use it to reference documents later.
     * <p/>
     * The reverse of @{link #getFileForDocId}.
     */
~~~~~~

Line 289

~~~~~~text
/**
     * Get the file given a document id (the reverse of {@link #getDocIdForFile(File)}).
     */
~~~~~~

Line 313

~~~~~~text
/**
     * Add a representation of a file to a cursor.
     *
     * @param result the cursor to modify
     * @param docId  the document ID representing the desired file (may be null if given file)
     * @param file   the File object representing the desired file (may be null if given docID)
     */
~~~~~~

Line 335

~~~~~~text
// Only fails in one case: when the parent is /, which you can't delete.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/services/GameService.java

Line 62

~~~~~~text
// non-sticky so android wont try restarting the game after the user uses the "Quit" button
~~~~~~

Line 67

~~~~~~text
//At this point in time  only the game runs and the user poofed the window, time to die
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/services/ProgressService.java

Line 26

~~~~~~text
/**
 * Lazy service which allows the process not to get killed.
 * Can be created from context, can be killed statically
 */
~~~~~~

Line 34

~~~~~~text
/** Simple wrapper to start the service */
~~~~~~

Line 62

~~~~~~text
// otherwise Android tries to restart the service since it "crashed"
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/ShowErrorActivity.java

Line 72

~~~~~~text
/**
     * Install remote dialog handling onto a dialog. This should be used when the dialog is planned to be presented
     * through Tools.showError or Tools.showErrorRemote as a Throwable implementing a ContextExecutorTask.
     * @param callerActivity the activity provided by the ContextExecutorTask.executeWithActivity
     * @param builder the alert dialog builder.
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/AsyncAssetManager.java

Line 29

~~~~~~text
/**
     * Attempt to install the java 8 runtime, if necessary
     * @param am App context
     */
~~~~~~

Line 34

~~~~~~text
/* Check if JRE is included */
~~~~~~

Line 43

~~~~~~text
/*this clause is for when the internal runtime is goofed*/
~~~~~~

Line 47

~~~~~~text
// Install the runtime in an async manner, hope for the best
~~~~~~

Line 63

~~~~~~text
/** Unpack single files, with no regard to version tracking */
~~~~~~

Line 143

~~~~~~text
// Always write the version file separately after extracting everything else, to improve
~~~~~~

Line 144

~~~~~~text
// reliability.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/AsyncVersionList.java

Line 14

~~~~~~text
/** Class getting the version list, and that's all really */
~~~~~~

Line 48

~~~~~~text
/** Basic listener, acting as a callback */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/DataMigrator.java

Line 26

~~~~~~text
/**
 * A class for migrating data from other launcher installations
 */
~~~~~~

Line 33

~~~~~~text
// required free space in megabytes
~~~~~~

Line 40

~~~~~~text
/** Initialize data migrator
     * @param activity App activity
     * @param uri Uri to the external root directory of the source installation (i.e. /sdcard/Android/data/git.artdeell.../). Must have "files" subdir
     */
~~~~~~

Line 55

~~~~~~text
// Extract files subdirectory not to confuse copyFileTree
~~~~~~

Line 56

~~~~~~text
// Actually it shouldn't confuse anymore, but we copy files directly into "files" subdir already
~~~~~~

Line 90

~~~~~~text
/**
     * Migrate data from other MojoLauncher installations.
    */
~~~~~~

Line 96

~~~~~~text
// Shouldn't allow importing from any non-Mojo app
~~~~~~

Line 101

~~~~~~text
// also shouldn't allow importing from self
~~~~~~

Line 109

~~~~~~text
// Copy a file tree into the home directory
~~~~~~

Line 110

~~~~~~text
// The progress bar here works easy & dumb: each entry is a portion of initial 100 percents
~~~~~~

Line 111

~~~~~~text
// Each file will increment the progress by this portion, each directory will receive the portion
~~~~~~

Line 112

~~~~~~text
// to further divide it by files/folders amount in this directory
~~~~~~

Line 113

~~~~~~text
// both files in the end will increment the progress bar by the portion this call received
~~~~~~

Line 114

~~~~~~text
// Folder1(100%)
~~~~~~

Line 115

~~~~~~text
//          -> Folder2(50%), File2(50%)
~~~~~~

Line 116

~~~~~~text
//                  -> Folder3(25%), File3(25%)
~~~~~~

Line 117

~~~~~~text
//                          -> (File4(12,5%), File5(12,5%)
~~~~~~

Line 118

~~~~~~text
// Surprisingly no LLM model told me about this algorithm lol
~~~~~~

Line 134

~~~~~~text
// Prevent instance collisions
~~~~~~

Line 140

~~~~~~text
// Assuming file
~~~~~~

Line 143

~~~~~~text
// Ignore files with the same size
~~~~~~

Line 144

~~~~~~text
// I mean this check may trigger for non-equal files, but this is designed only for clean import anyway
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/MoJsonDownloader.java

Line 65

~~~~~~text
// The source client JAR picked during the inheritance process
~~~~~~

Line 66

~~~~~~text
// The destination client JAR to which the source will be copied to.
~~~~~~

Line 80

~~~~~~text
/**
     * Start the game version download process on the global executor service.
     * @param assetManager AssetManager, used for automatic installation of JRE 17 if needed
     * @param version The JMinecraftVersionList.Version from the version list, if available
     * @param realVersion The version ID (necessary)
     * @param listener The download status listener
     */
~~~~~~

Line 88

~~~~~~text
// this was there for a reason
~~~~~~

Line 95

~~~~~~text
// Handled separately from the general case because it subclasses RuntimeException. Ugh.
~~~~~~

Line 97

~~~~~~text
// log fatal errors to Google Play
~~~~~~

Line 105

~~~~~~text
/**
     * Download the game version.
     * @param assetManager AssetManager, used for automatic installation of JRE 17 if needed
     * @param verInfo The JMinecraftVersionList.Version from the version list, if available
     * @param versionName The version ID (necessary)
     * @throws Exception when an exception occurs in the function body or in any of the downloading threads.
     */
~~~~~~

Line 113

~~~~~~text
// Put up a dummy progress line, for the activity to start the service and do all the other necessary
~~~~~~

Line 114

~~~~~~text
// work to keep the launcher alive. We will replace this line when we will start downloading stuff.
~~~~~~

Line 150

~~~~~~text
/**
     * Ensure that there is a copy of the client JAR file in the version folder, if a copy is
     * needed.
     * @throws IOException if the copy fails
     */
~~~~~~

Line 173

~~~~~~text
// Mark version-wildcard libraries as processed to allow replacing libraries using wildcard
~~~~~~

Line 192

~~~~~~text
// Special handling for JNA Android natives
~~~~~~

Line 197

~~~~~~text
// Refuse to process asm-all when modern, modularized asm is present
~~~~~~

Line 265

~~~~~~text
/**
     * Download (if necessary) and process a version's metadata, scheduling all downloads that this
     * version needs.
     * @param assetManager AssetManager, used for automatic installation of JRE 17 if needed
     * @param verInfo The JMinecraftVersionList.Version from the version list, if available
     * @param versionName The version ID (necessary)
     * @throws IOException if the download of any of the metadata files fails
     */
~~~~~~

Line 301

~~~~~~text
// Infinite inheritance !?! :noway:
~~~~~~

Line 320

~~~~~~text
/**
     * Schedule the download of an AAR library containing the required natives, for later extraction
     * and adding to the library path.
     * @param baseRepository the source Maven repository to download from.
     * @param dependentLibrary the DependentLibrary to get the path from
     * @throws IOException in case if download scheduling fails.
     */
~~~~~~

Line 454

~~~~~~text
// Store the path of the JAR to copy it into our new version folder later.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/MoJsonExtras.java

Line 21

~~~~~~text
// can't have listed versions if there's no list
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/NativesExtractor.java

Line 28

~~~~~~text
/**
     * Create a library blacklist so that downloaded natives are not able to
     * override built-in libraries.
     * @return the resulting blacklist of library file names
     */
~~~~~~

Line 37

~~~~~~text
// allow overriding jnidispatch (as the integrated version may be too old)
~~~~~~

Line 64

~~~~~~text
// Wrap the ZIP input stream into a non-closeable stream to
~~~~~~

Line 65

~~~~~~text
// avoid it being closed by processEntry()
~~~~~~

Line 71

~~~~~~text
// Entry name is actually the full path, so we need to strip the path before extraction
~~~~~~

Line 73

~~~~~~text
// getFileName may make the file name null, avoid that case.
~~~~~~

Line 112

~~~~~~text
// File in archive is the same as the local one, don't extract
~~~~~~

Line 115

~~~~~~text
// copyInputStreamToFile copies the stream to a file and then closes it.
~~~~~~

Line 131

~~~~~~text
// Do nothing (the point of this class)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/tasks/SpeedCalculator.java

Line 3

~~~~~~text
/**
 * A simple class to calculate the average Internet speed using a simple moving average.
 */
~~~~~~

Line 30

~~~~~~text
/**
     * Update the current amount of bytes downloaded.
     * @param bytes the new amount of bytes downloaded
     * @return the current download speed in bytes per second
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/TestStorageActivity.java

Line 74

~~~~~~text
//Getting the permission status
~~~~~~

Line 79

~~~~~~text
//If permission is granted returning true
~~~~~~

Line 95

~~~~~~text
//Initialize constants (implicitly) and preferences after we confirm that we have storage.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/Tools.java

Line 105

~~~~~~text
//Initialized later to get context
~~~~~~

Line 110

~~~~~~text
// New since 3.3.1
~~~~~~

Line 115

~~~~~~text
// New since 2.4.2
~~~~~~

Line 140

~~~~~~text
/**
     * Checks if the Pojav's storage root is accessible and read-writable
     * @param context context to get the storage root if it's not set yet
     * @return true if storage is fine, false if storage is not accessible
     */
~~~~~~

Line 149

~~~~~~text
/**
     * Checks if the Pojav's storage root is accessible and read-writable. If it's not, starts
     * the MissingStorageActivity and finishes the supplied activity.
     * @param context the Activity that checks for storage availability
     * @return whether the storage is available or not.
     */
~~~~~~

Line 164

~~~~~~text
/**
     * Initialize context constants most necessary for launcher's early startup phase
     * that are not dependent on user storage.
     * All values that depend on DIR_DATA and are not dependent on DIR_GAME_HOME must
     * be initialized here.
     * @param ctx the context for initialization.
     */
~~~~~~

Line 179

~~~~~~text
/**
     * Initialize context constants that depend on user storage.
     * Any value (in)directly dependent on DIR_GAME_HOME should be set only here.
     * You ABSOLUTELY MUST check for storage presence using checkStorageRoot() before calling this.
     */
~~~~~~

Line 213

~~~~~~text
//For devices with free form/split screen, we need window size, not screen size.
~~~~~~

Line 218

~~~~~~text
// Removed the clause for devices with unofficial notch support, since it also ruins all devices with virtual nav bars before P
~~~~~~

Line 258

~~~~~~text
// Don't ignore system bars in window mode (will put game behind window button bar)
~~~~~~

Line 262

~~~~~~text
// The status bars are completely transparent and will take their color from the inset view
~~~~~~

Line 263

~~~~~~text
// background drawable.
~~~~~~

Line 267

~~~~~~text
// On API 35 onwards, apps are edge-to-edge by default and are controlled entirely though the
~~~~~~

Line 268

~~~~~~text
// inset API. On levels below, we still need to set the correct cutout mode.
~~~~~~

Line 271

~~~~~~text
// The AppCompat APIs don't work well, and break when opening alert dialogs on older Android
~~~~~~

Line 272

~~~~~~text
// versions. Use the legacy fullscreen flags for lower APIs. (notch is already handled above)
~~~~~~

Line 277

~~~~~~text
// Code below expects this to be set to false, since that's the SDK 35 default.
~~~~~~

Line 307

~~~~~~text
// Note: this should *NOT* be used for positioning and sizing things on the screen
~~~~~~

Line 311

~~~~~~text
//Better hope for the currentDisplayMetrics to be good
~~~~~~

Line 316

~~~~~~text
//Better hope for the currentDisplayMetrics to be good
~~~~~~

Line 409

~~~~~~text
/**
     * Show the error remotely in a context-aware fashion. Has generally the same behaviour as
     * Tools.showError when in an activity, but when not in one, sends a notification that opens an
     * activity and calls Tools.showError().
     * NOTE: If the Throwable is a ContextExecutorTask and when not in an activity,
     * its executeWithApplication() method will never be called.
     * @param e the error (throwable)
     */
~~~~~~

Line 424

~~~~~~text
// I WILL embrace layer violations because Android's concept of layers is STUPID
~~~~~~

Line 425

~~~~~~text
// We live in the same process anyway, why make it any more harder with this needless
~~~~~~

Line 426

~~~~~~text
// abstraction?
~~~~~~

Line 428

~~~~~~text
// Add your Context-related rage here
~~~~~~

Line 472

~~~~~~text
// Special handling for LabyMod 1.8.9, Forge 1.12.2(?) and oshi
~~~~~~

Line 473

~~~~~~text
// we have libjnidispatch 5.13.0 in jniLibs directory
~~~~~~

Line 485

~~~~~~text
//if (Integer.parseInt(version[0]) >= 6 && Integer.parseInt(version[1]) >= 3) return;
~~~~~~

Line 486

~~~~~~text
// FIXME: ensure compatibility
~~~~~~

Line 569

~~~~~~text
//If it won't download, just search for it
~~~~~~

Line 575

~~~~~~text
//inheritsVer.inheritsFrom = inheritsVer.id;
~~~~~~

Line 583

~~~~~~text
// Inheriting Minecraft 1.13+ with append custom args
~~~~~~

Line 598

~~~~~~text
// Check if there is a duplicate argument on combine
~~~~~~

Line 603

~~~~~~text
// If the next is argument value, skip it
~~~~~~

Line 622

~~~~~~text
// LabyMod 4 sets version instead of majorVersion
~~~~~~

Line 643

~~~~~~text
// Prevent NullPointerException
~~~~~~

Line 720

~~~~~~text
// idk myself but it happens on asus file manager
~~~~~~

Line 726

~~~~~~text
// Turns out that the content resolver can throw you literally anything if the underlying provider crashes
~~~~~~

Line 727

~~~~~~text
// Fall back in that case
~~~~~~

Line 732

~~~~~~text
/** Swap the main fragment with another */
~~~~~~

Line 735

~~~~~~text
// When people tab out, it might happen
~~~~~~

Line 736

~~~~~~text
//TODO handle custom animations
~~~~~~

Line 748

~~~~~~text
/** Remove the current fragment */
~~~~~~

Line 753

~~~~~~text
/** Launch the mod installer activity. The Uri must be from our own content provider or
     * from ACTION_OPEN_DOCUMENT
     */
~~~~~~

Line 801

~~~~~~text
/** Triggers the share intent chooser, with the latestlog file attached to it */
~~~~~~

Line 806

~~~~~~text
/**
     * Determine the MIME type of a File.
     * @param file The file to determine the type of
     * @return the type, or the default value *slash* if cannot be determined
     */
~~~~~~

Line 815

~~~~~~text
// Theoretically we don't even need the buffer since we don't care about the
~~~~~~

Line 816

~~~~~~text
// contents of the file after the guess, but mark-supported streams
~~~~~~

Line 817

~~~~~~text
// are a requirement of URLConnection.guessContentTypeFromStream()
~~~~~~

Line 830

~~~~~~text
/**
     * Open the path specified by a File in a file explorer or in a relevant application.
     * @param context the current Context
     * @param file the File to open
     * @param share whether to open a "Share" or an "Open" dialog.
     */
~~~~~~

Line 854

~~~~~~text
/** Mesure the textview height, given its current parameters */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/CropperUtils.java

Line 86

~~~~~~text
// Fixes the chin that the dialog has on my huawei fon
~~~~~~

Line 91

~~~~~~text
// width
~~~~~~

Line 92

~~~~~~text
// height
~~~~~~

Line 123

~~~~~~text
// Catch IOE here to detect the case when BitmapRegionDecoder does not support this image format.
~~~~~~

Line 124

~~~~~~text
// If it does not, we will just have to load the bitmap in full resolution using BitmapFactory.
~~~~~~

Line 128

~~~~~~text
// We can safely re-open the stream here as ACTION_OPEN_DOCUMENT grants us long-term access
~~~~~~

Line 129

~~~~~~text
// to the file that we have picked.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/DateUtils.java

Line 14

~~~~~~text
// Utils for date-based activation for certain launcher workarounds.
~~~~~~

Line 16

~~~~~~text
/**
     * Parse the release date of a game version from the JMinecraftVersionList.Version time or releaseTime fields
     * @param releaseTime the time or releaseTime string from JMinecraftVersionList.Version
     * @return the date object
     * @throws ParseException if date parsing fails
     */
~~~~~~

Line 29

~~~~~~text
/**
     * Checks if the Date object is before the date denoted by
     * year, month, dayOfMonth parameters
     * @param date the Date object that we compare against
     * @param year the year
     * @param month the month (zero-based)
     * @param dayOfMonth the day of the month
     * @return true if the Date is before year, month, dayOfMonth, false otherwise
     */
~~~~~~

Line 42

~~~~~~text
/**
     * Extracts the original release date of a game version, ignoring any mods (if present)
     * @param gameVersion the JMinecraftVersionList.Version object
     * @return the game's original release date
     */
~~~~~~

Line 51

~~~~~~text
// The launcher's inheritor mutilates the version object, causing it to have the original
~~~~~~

Line 52

~~~~~~text
// version's ID but modded version's dates. Work around it by re-reading the version without
~~~~~~

Line 53

~~~~~~text
// inheriting.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/DownloadUtils.java

Line 26

~~~~~~text
// System.out.println("Connecting: " + url.toString());
~~~~~~

Line 103

~~~~~~text
// if we download the file and fail parsing it, we will yeet outta there
~~~~~~

Line 104

~~~~~~text
// and not cache the unparseable sting. We will return this after trying to save the downloaded
~~~~~~

Line 105

~~~~~~text
// string into cache
~~~~~~

Line 139

~~~~~~text
// Skip if needed
~~~~~~

Line 141

~~~~~~text
// If the file exists and we don't know it's SHA1, don't try to redownload it.
~~~~~~

Line 158

~~~~~~text
/**
     * Get the content length for a given URL.
     * @param url the URL to get the length for
     * @return the length in bytes or -1 if not available
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/FileUtils.java

Line 7

~~~~~~text
/**
     * Check if a file denoted by a String path exists.
     * @param filePath the path to check
     * @return whether it exists (same as File.exists()
     */
~~~~~~

Line 16

~~~~~~text
/**
     * Get the file name from a path/URL string.
     * @param pathOrUrl the path or the URL of the file
     * @return the file's name
     */
~~~~~~

Line 27

~~~~~~text
/**
     * Remove the extension (all text after the last dot) from a path/URL string.
     * @param pathOrUrl the path or the URL of the file
     * @return the input with the extension removed
     */
~~~~~~

Line 38

~~~~~~text
/**
     * Ensure that a directory exists, is a directory and is writable.
     * @param targetFile the directory to check
     * @return if the check has succeeded
     */
~~~~~~

Line 50

~~~~~~text
/**
     * Ensure that the parent directory of a file exists and is writable
     * @param targetFile the File whose parent should be checked
     * @return if the check as succeeded
     */
~~~~~~

Line 61

~~~~~~text
/**
     * Same as ensureDirectorySilently(), but throws an IOException telling why the check failed.
     * @param targetFile the directory to check
     * @throws IOException when the checks fail
     */
~~~~~~

Line 71

~~~~~~text
// check again just in case (???)
~~~~~~

Line 76

~~~~~~text
/**
     * Same as ensureParentDirectorySilently(), but throws an IOException telling why the check failed.
     * @param targetFile the File whose parent should be checked
     * @throws IOException when the checks fail
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/FilteredSubList.java

Line 13

~~~~~~text
/**
 * Provide a "mostly immutable" view to a "mother" list, by reference.
 * The difference from List.sublist() is:
 *  - the ability to apply a FILTER on listGeneration
 *  - "immutability", you can't add elements to the list from here, but it is backed by the real list.
 * @param <E>
 */
~~~~~~

Line 37

~~~~~~text
// Should we trim ?
~~~~~~

Line 102

~~~~~~text
// Predicate is API 24+, so micro backport
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/GameOptionsUtils.java

Line 6

~~~~~~text
/**
     * Parse an integer. If the input value is null or not a valid integer, return the default value.
     * @param value the String to parse
     * @param defaultValue the default value
     * @return the parsed value or default
     */
~~~~~~

Line 21

~~~~~~text
/**
     * Decrease cloud rendering distance in order to avoid the Mali cloud rendering slowdown bug
     */
~~~~~~

Line 26

~~~~~~text
// Not an affected GPU
~~~~~~

Line 28

~~~~~~text
// Not affected below 117 (but let's err on the safe side)
~~~~~~

Line 32

~~~~~~text
/**
     * Disable the Narrator. Clicking on the button, even though it says "Not Supported", turns it
     * on and causes MC to generate insanely large log files when starting again
     */
~~~~~~

Line 41

~~~~~~text
/**
     * Disable fullscreen. The launcher runs always in fullscreen anyway, and this
     * helps with some mods that can't tolerate an empty video mode list
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/GpuUtils.java

Line 39

~~~~~~text
// LTW depends on the ability to create a context with a major version of 3,
~~~~~~

Line 40

~~~~~~text
// and even if the string parse returns 3 while EGL can only create 2,
~~~~~~

Line 41

~~~~~~text
// it's still a noncompilant implementation
~~~~~~

Line 64

~~~~~~text
// Old Mali drivers are broken, and will actually let us create a context with GLES 3
~~~~~~

Line 65

~~~~~~text
// But won't let us make it current, which will break the check anyway...
~~~~~~

Line 82

~~~~~~text
// This is here just to satisfy Android M which incorrectly null-checks it
~~~~~~

Line 106

~~~~~~text
// Create PBuffer surface as some devices might actually not support surfaceless.
~~~~~~

Line 127

~~~~~~text
// Creation/currenting failed in both cases
~~~~~~

Line 157

~~~~~~text
/**
     * Get the information about the current OpenGL ES device, which consists of the vendor,
     * the renderer and the major GLES version
     * @return the info
     */
~~~~~~

Line 187

~~~~~~text
/**
         * Check if this GLInfo belongs to a Qualcomm Adreno graphics adapter
         * @return
         */
~~~~~~

Line 195

~~~~~~text
/**
         * Check if this GLInfo belongs to a Qualcomm Adreno 200/300/400/500 graphics adapter
         * @return
         */
~~~~~~

Line 207

~~~~~~text
/**
         * Check if this GLInfo belongs to a ARM Mali/Immortalis graphics adapter
         * @return
         */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/GsonJsonUtils.java

Line 8

~~~~~~text
/**
     * Safely converts a JsonElement into a JsonObject.
     * @param element the input JsonElement
     * @return the JsonObject if:
     *         the JsonElement is not null
     *         the JsonElement is not Json null
     *         the JsonElement is a JsonObjet
     *         null otherwise
     */
~~~~~~

Line 23

~~~~~~text
/**
     * Safely gets a JsonElement from a JsonObject
     * @param jsonObject the input JsonObject
     * @param memberName the member name of the JsonElement
     * @return the JsonElement if:
     *         the input JsonObject is not null
     *         the input JsonObject contains an element with the specified memberName
     *         the JsonElement is not Json null
     *         null otherwise
     */
~~~~~~

Line 41

~~~~~~text
/**
     * Safely gets a JsonObject from a JsonObject
     * @param jsonObject the input JsonObject
     * @param memberName the member name of the output JsonObject
     * @return the output JsonObject if:
     *         the input JsonObject is not null
     *         the input JsonObject contains an element with the specified memberName
     *         the output JsonObject is not Json null
     *         the output JsonObject is a JsonObjet
     *         null otherwise
     */
~~~~~~

Line 56

~~~~~~text
/**
     * Safely gets a JsonArray from a JsonObject
     * @param jsonObject the input JsonObject
     * @param memberName the member name of the JsonArray
     * @return the JsonArray if:
     *         the input JsonObject is not null
     *         the input JsonObject contains an element with the specified memberName
     *         the JsonArray is not Json null
     *         the JsonArray is a JsonArray
     *         null otherwise
     */
~~~~~~

Line 73

~~~~~~text
/**
     * Safely gets an int from a JsonObject
     * @param jsonObject the input JsonObject
     * @param memberName the member name of the int
     * @param onNullValue the value that will be returned if any of the checks fail
     * @return the int if:
     *         the input JsonObject is not null
     *         the input JsonObject contains an element with the specified memberName
     *         the int is not Json null
     *         the int is an actual integer
     *         onNullValue otherwise
     */
~~~~~~

Line 95

~~~~~~text
/**
     * Safely gets a String from a JsonObject
     * @param jsonObject the input JsonObject
     * @param memberName the member name of the int
     * @return the String if:
     *         the input JsonObject is not null
     *         the input JsonObject contains an element with the specified memberName
     *         the String is not a Json null
     *         the String is an actual String
     *         null otherwise
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/interfaces/SimpleItemSelectedListener.java

Line 6

~~~~~~text
/**
 * Most interfaces implementations of {@link AdapterView.OnItemSelectedListener}
 * only implement the {@link AdapterView.OnItemSelectedListener#onItemSelected(AdapterView, View, int, long)} onItemClick method.
 * This class provides a default for other methods.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/interfaces/SimpleSeekBarListener.java

Line 5

~~~~~~text
/**
 * Most interfaces implementations of {@link SeekBar.OnSeekBarChangeListener}
 * only implement the onProgressChanged method. This class provides a default for other methods.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/interfaces/SimpleTextWatcher.java

Line 6

~~~~~~text
/**
 * Most interfaces implementations of {@link TextWatcher} only implement the afterTextChanged method.
 * This class provides a default for other methods.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/jre/GameRunner.java

Line 46

~~~~~~text
/**
     * Optimization mods based on Sodium can mitigate the render distance issue. Check if Sodium
     * or its derivative is currently installed to skip the render distance check.
     * @param gameDir current game directory
     * @return whether sodium or a sodium-based mod is installed
     */
~~~~~~

Line 65

~~~~~~text
/**
     * Check if Angelica is currently installed to allow usage of LTW
     * @param gameDir current game directory
     * @return whether Angelica is installed
     */
~~~~~~

Line 81

~~~~~~text
/**
     * Initialize OpenGL and do checks to see if the GPU of the device is affected by the render
     * distance issue.

     * Currently only checks whether the user has an Adreno GPU capable of OpenGL ES 3.

     * This issue is caused by a very severe limit on the amount of GL buffer names that could be allocated
     * by the Adreno properietary GLES driver.

     * @return whether the GPU is affected by the Large Thin Wrapper render distance issue on vanilla
     */
~~~~~~

Line 98

~~~~~~text
// 1.21.5 fixes the RD issue, released on march 25 2025
~~~~~~

Line 111

~~~~~~text
// 7 is the render distance "magic number" above which MC creates too many buffers
~~~~~~

Line 112

~~~~~~text
// for Adreno's OpenGL ES implementation
~~~~~~

Line 121

~~~~~~text
// Day before the release date of 21w10a, the first OpenGL 3 Core Minecraft version
~~~~~~

Line 133

~~~~~~text
// Autoswitch to provided renderer if supported, otherwise - crash with resId dialog message
~~~~~~

Line 181

~~~~~~text
// If the dialog's lifecycle has ended, return without
~~~~~~

Line 182

~~~~~~text
// actually launching the game, thus giving us the opportunity
~~~~~~

Line 183

~~~~~~text
// to start after the activity is shown again
~~~~~~

Line 188

~~~~~~text
// We don't need the library list, the asset index, client download info for the code below
~~~~~~

Line 194

~~~~~~text
// Switch renderer to GL4ES when running a compat context version on LTW
~~~~~~

Line 202

~~~~~~text
// Block Sodium from running with GL4ES on 1.17+
~~~~~~

Line 207

~~~~~~text
// Switch renderer to LTW when running 1.21.5
~~~~~~

Line 216

~~~~~~text
// If the code goes here, it means that the user clicked "OK". Fix the render distance.
~~~~~~

Line 236

~~~~~~text
// Pre-process specific files
~~~~~~

Line 240

~~~~~~text
// Select the appropriate openGL version
~~~~~~

Line 251

~~~~~~text
// Unreference the classpath entry to avoid retaining it on heap
~~~~~~

Line 273

~~~~~~text
// Sometimes, the game can extract natives itself onto this path
~~~~~~

Line 292

~~~~~~text
// TODO: this should be decoupled from GameRunner completely
~~~~~~

Line 353

~~~~~~text
// Skip setting essential flags from the version JSON as we already override them
~~~~~~

Line 376

~~~~~~text
// Parse Forge 1.17+ additional JVM Arguments
~~~~~~

Line 392

~~~~~~text
//TODO: implement (?maybe?)
~~~~~~

Line 408

~~~~~~text
// Minecraft 22w43a which adds chat reporting (and signing) was released on
~~~~~~

Line 409

~~~~~~text
// 26th October 2022. So, if the date is not before that (meaning it is equal or higher)
~~~~~~

Line 410

~~~~~~text
// change the userType to MSA to fix the missing signature
~~~~~~

Line 420

~~~~~~text
// For legacy versions of MC
~~~~~~

Line 436

~~~~~~text
// Support Minecraft 1.13+
~~~~~~

Line 440

~~~~~~text
//TODO: implement else clause
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/jre/JavaRunner.java

Line 32

~~~~~~text
// Caciocavallo config AWT-enabled version
~~~~~~

Line 89

~~~~~~text
/**
     *  Gives an argument list filled with both the user args
     *  and the auto-generated ones (eg. the window resolution).
     * @return A list filled with args.
     */
~~~~~~

Line 118

~~~~~~text
//LWJGL 3 DEBUG FLAGS
~~~~~~

Line 119

~~~~~~text
//"-Dorg.lwjgl.util.Debug=true",
~~~~~~

Line 120

~~~~~~text
//"-Dorg.lwjgl.util.DebugFunctions=true",
~~~~~~

Line 121

~~~~~~text
//"-Dorg.lwjgl.util.DebugLoader=true",
~~~~~~

Line 123

~~~~~~text
//Log4j RCE mitigation
~~~~~~

Line 124

~~~~~~text
//Forge 1.14+ workaround
~~~~~~

Line 126

~~~~~~text
// Default is POSIX_SPAWN which requires starting jspawnhelper, which doesn't work on Android
~~~~~~

Line 144

~~~~~~text
//Add all the arguments
~~~~~~

Line 177

~~~~~~text
// Java directory layout:
~~~~~~

Line 178

~~~~~~text
// .../server/libjvm.so
~~~~~~

Line 179

~~~~~~text
// .../libjava.so
~~~~~~

Line 180

~~~~~~text
// and so on. Hotspot itself relies on this we also rely on this.
~~~~~~

Line 242

~~~~~~text
// remove classpath and the next argument (which is either garbage or pointless classpath definition)
~~~~~~

Line 258

~~~~~~text
// On Marshmallow x86, something related to signal handling is broken inside of ART/sigchain library
~~~~~~

Line 259

~~~~~~text
// is broken, causing unclaimed signals to be sent into the sigchain. This drops the whole launcher into an abort.
~~~~~~

Line 260

~~~~~~text
// Enabling -Xrs prevents the VM from sending those signals (
~~~~~~

Line 264

~~~~~~text
/**
     * Start the Java(tm) Virtual Machine.
     * @param runtime the Runtime that we're starting.
     * @param vmArgs the command line parameters for the virtual machine
     * @param classpathEntries the absolute path for each classpath entry
     * @param mainClass the application main class
     * @param applicationArgs the application arguments
     * @throws VMLoadException if an error occurred during VM loading
     */
~~~~~~

Line 299

~~~~~~text
//JREUtils.initializeHooks();
~~~~~~

Line 304

~~~~~~text
// Since this function never returns, under normal circumstances these strings will never be
~~~~~~

Line 305

~~~~~~text
// freed. Move them to manually-managed memory and invalidate references here to reduce memory
~~~~~~

Line 306

~~~~~~text
// footprint
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/jre/RuntimeSelectionException.java

Line 14

~~~~~~text
// Do not change. Android really hates when this value changes for some reason.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/JREUtils.java

Line 27

~~~~~~text
// No filtering by tag anymore as that relied on incorrect log levels set in log.h
~~~~~~

Line 28

~~~~~~text
/* "-G", "1mb", */
~~~~~~

Line 69

~~~~~~text
// Not use split() as only split first one
~~~~~~

Line 83

~~~~~~text
// This is currently required for YSM mod to function
~~~~~~

Line 109

~~~~~~text
// Force LWJGL to use the Freetype library intended for it, instead of using the one
~~~~~~

Line 110

~~~~~~text
// that we ship with Java (since it may be older than what's needed)
~~~~~~

Line 111

~~~~~~text
//
~~~~~~

Line 115

~~~~~~text
/**
     * Parse and separate java arguments in a user friendly fashion
     * It supports multi line and absence of spaces between arguments
     * The function also supports auto-removal of improper arguments, although it may miss some.
     *
     * @param args The un-parsed argument list.
     * @return Parsed args as an ArrayList
     */
~~~~~~

Line 126

~~~~~~text
//For each prefixes, we separate args.
~~~~~~

Line 132

~~~~~~text
//Get the end of the current argument by checking the nearest separator
~~~~~~

Line 143

~~~~~~text
//Fallback
~~~~~~

Line 146

~~~~~~text
//Extract it
~~~~~~

Line 150

~~~~~~text
//Check if two args aren't bundled together by mistake
~~~~~~

Line 155

~~~~~~text
// Looking for list elements
~~~~~~

Line 164

~~~~~~text
// --a-b= handling (with multiple signs so we don't accidentally remove mandatory args)
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/KeycodeUtils.java

Line 13

~~~~~~text
/* = new String[androidKeycodes.length]; */
~~~~~~

Line 18

~~~~~~text
// Escape key
~~~~~~

Line 21

~~~~~~text
// 0-9 keys
~~~~~~

Line 22

~~~~~~text
//7
~~~~~~

Line 31

~~~~~~text
//16
~~~~~~

Line 35

~~~~~~text
// Arrow keys
~~~~~~

Line 36

~~~~~~text
//19
~~~~~~

Line 39

~~~~~~text
//22
~~~~~~

Line 41

~~~~~~text
// A-Z keys
~~~~~~

Line 42

~~~~~~text
//29
~~~~~~

Line 67

~~~~~~text
//54
~~~~~~

Line 73

~~~~~~text
// Alt keys
~~~~~~

Line 77

~~~~~~text
// Shift keys
~~~~~~

Line 83

~~~~~~text
//66
~~~~~~

Line 84

~~~~~~text
// Backspace
~~~~~~

Line 91

~~~~~~text
//74
~~~~~~

Line 93

~~~~~~text
//76
~~~~~~

Line 98

~~~~~~text
// Page keys
~~~~~~

Line 99

~~~~~~text
//92
~~~~~~

Line 104

~~~~~~text
// Control keys
~~~~~~

Line 115

~~~~~~text
// Fn keys
~~~~~~

Line 116

~~~~~~text
//131
~~~~~~

Line 127

~~~~~~text
//142
~~~~~~

Line 129

~~~~~~text
// Num keys
~~~~~~

Line 130

~~~~~~text
//143
~~~~~~

Line 148

~~~~~~text
//161
~~~~~~

Line 165

~~~~~~text
//Send a quick key press.
~~~~~~

Line 174

~~~~~~text
/** @return the index at which the key is in the array, searching binary */
~~~~~~

Line 176

~~~~~~text
//You should avoid using this function on performance critical areas
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/LocaleUtils.java

Line 24

~~~~~~text
// Too early to initialize all prefs here, as this is called by PojavApplication
~~~~~~

Line 25

~~~~~~text
// before storage checks are done and before the storage paths are initialized.
~~~~~~

Line 26

~~~~~~text
// So only initialize PREF_FORCE_ENGLISH for the check below.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/MathUtils.java

Line 7

~~~~~~text
//Ported from https://www.arduino.cc/reference/en/language/functions/math/map/
~~~~~~

Line 12

~~~~~~text
/** Returns the distance between two points. */
~~~~~~

Line 23

~~~~~~text
/**
     * Find the object T with the closest (or higher) value compared to targetValue
     * @param targetValue the target value
     * @param objects the list of objects that the search will be performed on
     * @param valueProvider the provider for each values
     * @return the RankedValue that wraps the object which has the closest value to targetValue, or null if values of all
     *         objects are less than targetValue
     * @param <T> the object type that is used for the search.
     */
~~~~~~

Line 63

~~~~~~text
/**
     * Out of two objects, select one with the lowest value.
     * @param object1 Object 1 for comparsion
     * @param object2 Object 2 for comparsion
     * @param valueProvider Value provider for the objects
     * @return If value of object 1 is lower than or equal to object 2, returns object 1
     *         Otherwise, returns object 2
     * @param <T> Type of objects
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/MatrixUtils.java

Line 10

~~~~~~text
/**
     * Transform the coordinates of the RectF using the supplied Matrix, and write the result back into
     * the RectF
     * @param inOutRect the RectF for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 20

~~~~~~text
/**
     * Transform the coordinates of the RectF using the supplied Matrix, and write the result back into
     * the RectF
     * @param inOutRect the RectF for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 30

~~~~~~text
/**
     * Transform the coordinates of the input RectF using the supplied Matrix, and write the result
     * into the output Rect
     * @param inRect the input RectF for this operation
     * @param outRect the output Rect for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 45

~~~~~~text
/**
     * Transform the coordinates of the input Rect using the supplied Matrix, and write the result
     * into the output RectF
     * @param inRect the input Rect for this operation
     * @param outRect the output RectF for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 60

~~~~~~text
/**
     * Transform the coordinates of the input Rect using the supplied Matrix, and write the result
     * into the output Rect
     * @param inRect the input Rect for this operation
     * @param outRect the output Rect for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 75

~~~~~~text
/**
     * Transform the coordinates of the input RectF using the supplied Matrix, and write the result
     * into the output RectF
     * @param inRect the input RectF for this operation
     * @param outRect the output RectF for this operation
     * @param transformMatrix the Matrix for transforming the Rect.
     */
~~~~~~

Line 90

~~~~~~text
// The group of functions below are used as building blocks of the transformRect() functions
~~~~~~

Line 91

~~~~~~text
// in order to not repeat the same exact code a lot of times.
~~~~~~

Line 122

~~~~~~text
// We need an array of 8 floats because each point is two floats,
~~~~~~

Line 123

~~~~~~text
// we need to transform two points and we need to have a separated input and output
~~~~~~

Line 131

~~~~~~text
/**
     * Invert the source matrix, and write the result into the destination matrix.
     * Android's integrated Matrix.invert() has some unexpected conditions when the matrix
     * can't be inverted, and in that case the method inverts the matrix by hand.
     * @param source Source matrix
     * @param destination The inverse of the source matrix
     * @throws IllegalArgumentException when the matrix is not invertible
     */
~~~~~~

Line 147

~~~~~~text
// This was made by ChatGPT and i have no clue what's happening here, but it works so eh
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/maven/MavenName.java

Line 64

~~~~~~text
/**
     * Arranges the library name components into a file system path.
     * For example, org.lwjgl:lwjgl:3.3.1 will become org/lwjgl/lwjgl/lwjgl-3.3.1[suffix][fileExtension]
     *              org.lwjgl:lwjgl:3.3.1:natives-linux will become org/lwjgl/lwjgl/lwjgl-3.3.1-natives-linux[suffix][fileExtension]
     * @return the resulting path
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/MCOptionUtils.java

Line 31

~~~~~~text
/** Called when an option is changed. Don't know which one though */
~~~~~~

Line 45

~~~~~~text
// Needed for new instances I guess  :think:
~~~~~~

Line 54

~~~~~~text
// Yeah I know, it may be redundant
~~~~~~

Line 79

~~~~~~text
/** Set an array of String, instead of a simple value. Not supported on all options */
~~~~~~

Line 88

~~~~~~text
/** @return A list of values from an array stored as a string */
~~~~~~

Line 92

~~~~~~text
// Fallback if the value doesn't exist
~~~~~~

Line 95

~~~~~~text
// Remove the edges
~~~~~~

Line 119

~~~~~~text
/** @return The stored Minecraft GUI scale, also auto-computed if on auto-mode or improper setting */
~~~~~~

Line 132

~~~~~~text
/** Add a file observer to reload options on file change
     * Listeners get notified of the change */
~~~~~~

Line 156

~~~~~~text
/** Notify the option listeners */
~~~~~~

Line 166

~~~~~~text
/** Add an option listener, notice how we don't have a reference to it */
~~~~~~

Line 171

~~~~~~text
/** Remove a listener from existence, or at least, its reference here */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/OldVersionsUtils.java

Line 13

~~~~~~text
/** Class here to help with various stuff to help run lower versions smoothly */
~~~~~~

Line 15

~~~~~~text
/** Lower minecraft versions fare better with opengl 1
     * @param version The version about to be launched
     */
~~~~~~

Line 19

~~~~~~text
// 1309989600 is 2011-07-07  2011-07-07T22:00:00+00:00
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/SignatureCheckUtil.java

Line 26

~~~~~~text
/**
     * Decode a bundle of signatures. A bundle of signatures has the following format:
     * fileName1:base64-rsa4096-signature
     * fileName2:base64-rsa4096-signature
     * Invalid signatures aren't included in the resulting Map.
     * @param bundle the original string of the bundle
     * @return each decoded signature mapped to each file name
     */
~~~~~~

Line 49

~~~~~~text
/**
     * Decode an RSA4096-encrypted signature from a Base64 string
     * @param base64 the original base64 data
     * @return the decoded bytes, or null if the data length isn't correct
     */
~~~~~~

Line 60

~~~~~~text
/**
     * Verifies the signature of an input stream against the cert.pem certificate from app assets
     * @param inputStream the original file stream
     * @param signatureBytes the bytes of the encrypted signature
     * @return whether the file signature check passed or not
     * @throws IOException if there was an error while reading the file
     */
~~~~~~

Line 81

~~~~~~text
/**
     * Reads in the cert.pem certificate from application assets and creates a SignatureCheckUtil
     * to verify data against this certificate
     * @param assetManager the AssetManager used to read the cert.pem file
     * @return the SignatureCheckUtil instance
     * @throws IOException if reading fails
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/utils/ZipUtils.java

Line 15

~~~~~~text
/**
     * Gets an InputStream for a given ZIP entry, throwing an IOException if the ZIP entry does not
     * exist.
     * @param zipFile The ZipFile to get the entry from
     * @param entryPath The full path inside of the ZipFile
     * @return The InputStream provided by the ZipFile
     * @throws IOException if the entry was not found
     */
~~~~~~

Line 29

~~~~~~text
/**
     * Extracts all files in a ZipFile inside of a given directory to a given destination directory
     * How to specify dirName:
     * If you want to extract all files in the ZipFile, specify ""
     * If you want to extract a single directory, specify its full path followed by a trailing /
     * @param zipFile The ZipFile to extract files from
     * @param dirName The directory to extract the files from
     * @param destination The destination directory to extract the files into
     * @throws IOException if it was not possible to create a directory or file extraction failed
     */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/java/net/kdt/pojavlaunch/value/MoJsonRule.java

Line 52

~~~~~~text
// TODO: version matching
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/affinity.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 19.06.2023.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 5

~~~~~~text
// we are GNU GPLv3
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/anw.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 21.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 5

~~~~~~text
// ANativeWindow internals accessor
~~~~~~

Line 15

~~~~~~text
// Layout mirrors struct ANativeWindow from <system/window.h> up to perform().
~~~~~~

Line 41

~~~~~~text
//POJAVLAUNCHER_ANW_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 20.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 22

~~~~~~text
// This is used across all PojavExec AWT library
~~~~~~

Line 27

~~~~~~text
//Save dalvik global JavaVM pointer
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 20.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 24

~~~~~~text
// Runtime VM can appear later
~~~~~~

Line 50

~~~~~~text
//POJAVLAUNCHER_AWT_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_clipboard.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 20.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_input.c

Line 75

~~~~~~text
// Dogshit
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_keycodes.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 22.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 320

~~~~~~text
//POJAVLAUNCHER_AWT_KEYCODES_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_mapper.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 22.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 20

~~~~~~text
// Other keycodes require keyboard mapping and modifier handling
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_util.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 20.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt/awt_window.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by whbex on 20.08.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 84

~~~~~~text
// If the VM was not connected but thread shutdown is wanted, then do not proceed,
~~~~~~

Line 85

~~~~~~text
// just release and exit.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/awt_xawt/xawt_fake.c

Line 3

~~~~~~text
// java.awt.*
~~~~~~

Line 135

~~~~~~text
// java.awt.event.*
~~~~~~

Line 150

~~~~~~text
// Maybe implement this?
~~~~~~

Line 153

~~~~~~text
// sun.awt.SunToolkit
~~~~~~

Line 160

~~~~~~text
// sun.awt.UNIXToolkit
~~~~~~

Line 169

~~~~~~text
// return GTK_ANY;
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/CMakeLists.txt

Line 4

~~~~~~text
# Use the checked-out native submodules directly. Git's symlink placeholders on
~~~~~~

Line 5

~~~~~~text
# Windows are plain text files unless Developer Mode is enabled.
~~~~~~

Line 8

~~~~~~text
# ------ MojoExec ------
~~~~~~

Line 12

~~~~~~text
# ------   GLFW   ------
~~~~~~

Line 26

~~~~~~text
# ------   SDL   ------
~~~~~~

Line 39

~~~~~~text
# ----------------------
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/elf_defs.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 11.05.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 30

~~~~~~text
//POJAVLAUNCHER_ELF_DEFS_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/abort_wait.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 28.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 38

~~~~~~text
// This will call System.exit()
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/elf_hinter.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 20.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 38

~~~~~~text
// If there's a warning below, it's bogus, ignore it
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/elf_hinter.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 20.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 16

~~~~~~text
//POJAVLAUNCHER_ELF_HINTER_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/jre_launcher.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 20.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 33

~~~~~~text
// Android 7+ requires the hinter to to provide proper library load paths.
~~~~~~

Line 82

~~~~~~text
// Some preloaded libs are still required. The main one is awt_headless, we must force Android to
~~~~~~

Line 83

~~~~~~text
// discover the correct version of libawt_xawt first.
~~~~~~

Line 84

~~~~~~text
// Separate hooks for agents are required because loading agents requires libinstrument which can't be loaded
~~~~~~

Line 85

~~~~~~text
// through our class loader hooks.
~~~~~~

Line 115

~~~~~~text
// for exit and abort hooks
~~~~~~

Line 181

~~~~~~text
// Unset all signal handlers to create a good slate for JVM signal detection.
~~~~~~

Line 185

~~~~~~text
// For some reason Android specifically checks if you set SIGSEGV to SIG_DFL.
~~~~~~

Line 186

~~~~~~text
// There's probably a good reason for that but the signal handler here is
~~~~~~

Line 187

~~~~~~text
// temporary and will be replaced by the Java VM's signal/crash handler.
~~~~~~

Line 188

~~~~~~text
// Work around the warning by using SIG_IGN for SIGSEGV
~~~~~~

Line 234

~~~~~~text
// If the main method exits
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/load_stages.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 21.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 20

~~~~~~text
//POJAVLAUNCHER_LOAD_STAGES_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jre_launcher/native_library_hook.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 20.09.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 19

~~~~~~text
// Java 21 style hook
~~~~~~

Line 22

~~~~~~text
// Java 17 style hook
~~~~~~

Line 25

~~~~~~text
// Java 8 style hook
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jvm_hooks/emui_iterator_fix_hook.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 23.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 11

~~~~~~text
/**
 * This function is meant as a substitute for SharedLibraryUtil.getLibraryPath() that just returns 0
 * (thus making the parent Java function return null). This is done to avoid using the LWJGL's default function,
 * which will hang the crappy EMUI linker by dlopen()ing inside of dl_iterate_phdr().
 * @return 0, to make the parent Java function return null immediately.
 * For reference: https://github.com/PojavLauncherTeam/lwjgl3/blob/fix_huawei_hang/modules/lwjgl/core/src/main/java/org/lwjgl/system/SharedLibraryUtil.java
 */
~~~~~~

Line 26

~~~~~~text
/**
 * Install the linker hang mitigation that is meant to prevent linker hangs on old EMUI firmware.
 * Also silences a massive amount of linker warnings on newer Android versions.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jvm_hooks/java_exec_hooks.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 05.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 15

~~~~~~text
// Turn a C-style string into a Java byte array
~~~~~~

Line 23

~~~~~~text
// Replace the env block with the one that has the desired LD_LIBRARY_PATH/PATH.
~~~~~~

Line 24

~~~~~~text
// (Due to my laziness this ignores the current contents of the block)
~~~~~~

Line 39

~~~~~~text
/**
 * Hooked version of java.lang.UNIXProcess.forkAndExec()
 * which is used to handle the "open" command and "ffmpeg" invocations
 */
~~~~~~

Line 52

~~~~~~text
// When invoking xdg-open, send the open URL into Android
~~~~~~

Line 58

~~~~~~text
// When invoking ffmpeg, always replace the program path with the path to ffmpeg from the plugin.
~~~~~~

Line 59

~~~~~~text
// This allows us to replace the executable name, which is needed because android doesn't allow
~~~~~~

Line 60

~~~~~~text
// us to put files that don't start with "lib" and end with ".so" into folders that we can execute
~~~~~~

Line 61

~~~~~~text
// from
~~~~~~

Line 63

~~~~~~text
// Also add LD_LIBRARY_PATH and PATH for the lib in order to override the ones from the launcher, since
~~~~~~

Line 64

~~~~~~text
// they may interfere with ffmpeg dependencies.
~~~~~~

Line 74

~~~~~~text
// Hook the forkAndExec method in the Java runtime for custom executable overriding.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jvm_hooks/jvm_hooks.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 23.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 14

~~~~~~text
//POJAVLAUNCHER_JVM_HOOKS_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/jvm_hooks/lwjgl_dlopen_hook.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 06.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 18

~~~~~~text
/**
 * Basically a verbatim implementation of ndlopen(), found at
 * https://github.com/PojavLauncherTeam/lwjgl3/blob/3.3.1/modules/lwjgl/core/src/generated/c/linux/org_lwjgl_system_linux_DynamicLinkLoader.c#L11
 * but with our own additions for stuff like vulkanmod.
 */
~~~~~~

Line 29

~~~~~~text
// Oveeride vulkan loading to let us load vulkan ourselves
~~~~~~

Line 34

~~~~~~text
// Load renderer using egl_acquire
~~~~~~

Line 40

~~~~~~text
// This hook also serves the task of mitigating a bug: the idea is that since, on Android 10 and
~~~~~~

Line 41

~~~~~~text
// earlier, the linker doesn't really do namespace nesting.
~~~~~~

Line 42

~~~~~~text
// It is not a problem as most of the libraries are in the launcher path, but when you try to run
~~~~~~

Line 43

~~~~~~text
// VulkanMod which loads shaderc outside of the default jni libs directory through this method,
~~~~~~

Line 44

~~~~~~text
// it can't load it because the path is not in the allowed paths for the anonymous namesapce.
~~~~~~

Line 45

~~~~~~text
// This method fixes the issue by being in libpojavexec, and thus being in the classloader namespace
~~~~~~

Line 51

~~~~~~text
/**
 * Install the LWJGL dlopen hook. This allows us to mitigate linker bugs and add custom library overrides.
 */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/minibridge.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 09.04.2026.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/native_hooks/chmod_hook.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 23.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 12

~~~~~~text
// Hooks for chmod and fchmod that always return success.
~~~~~~

Line 13

~~~~~~text
// This allows older Android versions to work with Java NIO zipfs inside of the Pojav folder.
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/native_hooks/exit_hook.c

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 15.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 17

~~~~~~text
// Only apply chmod hooks on devices where the game directory is in games/PojavLauncher
~~~~~~

Line 18

~~~~~~text
// which is below API 29
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/native_hooks/native_hooks.h

Line 1

~~~~~~text
//
~~~~~~

Line 2

~~~~~~text
// Created by maks on 23.01.2025.
~~~~~~

Line 3

~~~~~~text
//
~~~~~~

Line 15

~~~~~~text
//POJAVLAUNCHER_NATIVE_HOOKS_H
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/stdio_is.c

Line 12

~~~~~~text
//
~~~~~~

Line 13

~~~~~~text
// Created by maks on 17.02.21.
~~~~~~

Line 14

~~~~~~text
//
~~~~~~

Line 40

~~~~~~text
//record with newline int latestlog
~~~~~~

Line 42

~~~~~~text
//truncate
~~~~~~

Line 46

~~~~~~text
//send to app without newline
~~~~~~

Line 70

~~~~~~text
// make stdout line-buffered
~~~~~~

Line 71

~~~~~~text
// make stderr unbuffered
~~~~~~

Line 73

~~~~~~text
/* create the pipe and redirect stdout and stderr */
~~~~~~

Line 78

~~~~~~text
/* open latestlog.txt for writing */
~~~~~~

Line 91

~~~~~~text
/* spawn the logging thread */
~~~~~~

## daylight-android/app_pojavlauncher/src/main/jni/utils.c

Line 81

~~~~~~text
// jclass exception_cls = (*env)->FindClass(env, "java/lang/UnsatisfiedLinkError");
~~~~~~

Line 92

~~~~~~text
// (*env)->ThrowNew(env, exception_cls, dl_error_c);
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/activity_pojav_launcher.xml

Line 20

~~~~~~text
<!-- Ignore because it's  done to fit the ImageButton within spinner background -->
~~~~~~

Line 34

~~~~~~text
<!-- Holding most of the dynamic content -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/dialog_control_button_setting.xml

Line 15

~~~~~~text
<!-- EDIT NAME SECTION -->
~~~~~~

Line 40

~~~~~~text
<!--  SIZE SECTION -->
~~~~~~

Line 89

~~~~~~text
<!-- MAPPING SECTION -->
~~~~~~

Line 101

~~~~~~text
<!--
        Spinners are hidden to handle to workaround the horizontal offset.
        The horizontal offset was needed to display the spinner list at the same place.
        Sadly it is broken since Android Jelly Bean and never scheduled to be fixed
    -->
~~~~~~

Line 164

~~~~~~text
<!-- Clickable textview linked to the spinners
        Spinners are hidden at the same place because the dropdown offset doesn't work
        Do those textview acts as the spinner idle state
    -->
~~~~~~

Line 259

~~~~~~text
<!-- ORIENTATION SECTION -->
~~~~~~

Line 283

~~~~~~text
<!-- TOGGLE SECTION -->
~~~~~~

Line 294

~~~~~~text
<!-- MOUSE PASS THROUGH SECTION -->
~~~~~~

Line 305

~~~~~~text
<!-- SWIPEABLE BUTTON SECTION -->
~~~~~~

Line 316

~~~~~~text
<!-- FORWARD LOCK SECTION -->
~~~~~~

Line 336

~~~~~~text
<!-- BACKGROUND IMAGE SECTION -->
~~~~~~

Line 354

~~~~~~text
<!-- BACKGROUND COLOR SECTION -->
~~~~~~

Line 389

~~~~~~text
<!-- STROKE WIDTH -->
~~~~~~

Line 424

~~~~~~text
<!-- STROKE COLOR VERSION -->
~~~~~~

Line 442

~~~~~~text
<!-- CORNER RADIUS SECTION -->
~~~~~~

Line 476

~~~~~~text
<!-- BUTTON OPACITY SECTION -->
~~~~~~

Line 509

~~~~~~text
<!-- Button visibility -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/dialog_mod_filters.xml

Line 12

~~~~~~text
<!-- Version filter -->
~~~~~~

Line 50

~~~~~~text
<!-- Apply -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/dialog_quick_setting.xml

Line 12

~~~~~~text
<!-- Resolution settings -->
~~~~~~

Line 48

~~~~~~text
<!-- Gyroscope settings -->
~~~~~~

Line 79

~~~~~~text
<!-- Gyroscope sensitivity -->
~~~~~~

Line 118

~~~~~~text
<!-- Mouse settings -->
~~~~~~

Line 156

~~~~~~text
<!-- Gesture toggle -->
~~~~~~

Line 167

~~~~~~text
<!-- gesture settings -->
~~~~~~

Line 205

~~~~~~text
<!-- button transparency seekbar -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/dialog_side_dialog.xml

Line 40

~~~~~~text
<!-- The content is inflated here -->
~~~~~~

Line 70

~~~~~~text
<!-- Appears to be no way to properly fix this, and I'm not super fond of child ConstraintLayouts -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/fragment_launcher.xml

Line 121

~~~~~~text
<!-- This view is for cosmetic purpose only -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/fragment_mod_search.xml

Line 13

~~~~~~text
<!--
        Cosmetic layout to have a better scrolling separation
     -->
~~~~~~

Line 31

~~~~~~text
<!-- Search text -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/fragment_profile_type.xml

Line 17

~~~~~~text
<!-- Vanilla like version -->
~~~~~~

Line 60

~~~~~~text
<!-- Modded versions -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/item_account.xml

Line 28

~~~~~~text
<!-- Fun fact, if I put an Image button, the spinner fails to put an onclick listener on the extended view -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/item_controller_mapping.xml

Line 14

~~~~~~text
<!-- Content description is set in ViewHolder -->
~~~~~~

Line 41

~~~~~~text
<!-- Set in code -->
~~~~~~

Line 108

~~~~~~text
<!-- A single "plus" sign does not need translation -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/item_simple_list_1.xml

Line 2

~~~~~~text
<!--
    A modified version of the simple_list_item_1 android offers
    So I could modify it to suit the standard look and feel of the app
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout/view_mod.xml

Line 71

~~~~~~text
<!--
        When clicked for the first time, the view is extended with more information.
        Inflating later is cheaper, hence the stub
     -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout-land/activity_pojav_launcher.xml

Line 33

~~~~~~text
<!-- Holding most of the dynamic content -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/layout-land/fragment_launcher.xml

Line 128

~~~~~~text
<!-- This view is for cosmetic purpose only -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values/attributes.xml

Line 6

~~~~~~text
<!-- Redefine to be able to fetch the value -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values/dimens.xml

Line 5

~~~~~~text
<!-- Default screen margins, per the Android Design guidelines. -->
~~~~~~

Line 9

~~~~~~text
<!-- Padding -->
~~~~~~

Line 19

~~~~~~text
<!-- Input text padding -->
~~~~~~

Line 23

~~~~~~text
<!-- Main Activity components -->
~~~~~~

Line 30

~~~~~~text
<!-- Fragment padding -->
~~~~~~

Line 32

~~~~~~text
<!-- Misc paddings -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 7

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 9

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 11

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 15

~~~~~~text
<!-- Hint -->
~~~~~~

Line 18

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 21

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 24

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 30

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 33

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 37

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 40

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 42

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 82

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 104

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 122

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 128

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 135

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values/styles.xml

Line 3

~~~~~~text
<!-- Light or not? -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-af/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 66

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 67

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 68

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 69

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 70

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ar/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 12

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 62

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 103

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 110

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-az-rAZ/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 4

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 5

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 6

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ba/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 58

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 66

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 67

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 82

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 84

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 85

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-bn-rBD/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 6

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 8

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 10

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 14

~~~~~~text
<!-- Hint -->
~~~~~~

Line 17

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 20

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 23

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 29

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 32

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 36

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 39

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 41

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 76

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 92

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 115

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 121

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 385

~~~~~~text
<!-- Controller buttons -->
~~~~~~

Line 410

~~~~~~text
<!-- Misc -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-bn-rIN/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 4

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 5

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 6

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 7

~~~~~~text
<!-- Hint -->
~~~~~~

Line 8

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 9

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 10

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 11

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 12

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 15

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 16

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 17

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 18

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 19

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 20

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 21

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 22

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ca/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 53

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 67

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 71

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 88

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 93

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 100

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-cs/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 12

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 62

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 103

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 110

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-da/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 8

~~~~~~text
<!-- Hint -->
~~~~~~

Line 9

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 10

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 12

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 13

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 14

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 17

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 18

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 19

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 23

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 24

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 25

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 26

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 27

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 29

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-de/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 12

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 62

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 103

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 110

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-el/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 60

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 75

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 96

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 101

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 108

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-en-rGB/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-es/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-et-rEE/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 11

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 12

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 16

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 17

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 20

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 22

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 23

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 40

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 55

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 56

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 73

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 78

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 79

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-fa-rIR/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 91

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 96

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 103

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-fi/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 11

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 12

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 15

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 16

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 19

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 20

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 21

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 23

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 25

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 26

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 28

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 30

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 31

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-fil/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 51

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 65

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 68

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 84

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 91

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-fr/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 12

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 62

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 103

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 110

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-hi/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 6

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 8

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 10

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 14

~~~~~~text
<!-- Hint -->
~~~~~~

Line 17

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 20

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 23

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 29

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 32

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 36

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 39

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 41

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 76

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 92

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 115

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 121

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 128

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-hu/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 60

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 73

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 94

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 99

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 106

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-in/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-it/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-iw/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 89

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 94

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 101

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ja/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 50

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 65

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 69

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 86

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 91

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 98

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-kk/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 46

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 58

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 60

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 82

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 83

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ko/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 60

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 75

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 96

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 101

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 108

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-la/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 13

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 15

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 16

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 19

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 20

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 21

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 22

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 23

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 24

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 25

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 27

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 28

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-land/styles.xml

Line 3

~~~~~~text
<!-- Light or not? -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-land-v30/styles.xml

Line 2

~~~~~~text
<!-- This API level enables the edge-to-edge functionality of the launcher, and requires these to be set for the launcher to look good -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-lol-rAA/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-lt/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 55

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 70

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 73

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 90

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 95

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 102

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-mn-rMN/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 38

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 39

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 40

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 57

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 62

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 69

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ms/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 49

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 62

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 65

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 86

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 93

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-nl/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-no/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 46

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 59

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 61

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 72

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 77

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 78

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-pl/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 12

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 62

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 77

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 81

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 98

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 103

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 110

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-pt/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-pt-rBR/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ro/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 49

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 63

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 66

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 83

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 88

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 95

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-rpr/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 48

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 63

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 66

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 83

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 88

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 89

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-ru/strings.xml

Line 3

~~~~~~text
<!-- <string name="control_more3"></string>
      <string name="control_more4"></string> -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-sk-rSK/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 59

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 78

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 100

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 107

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-sr/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 48

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 60

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 63

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 74

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 79

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 86

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-sr-rCS/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 4

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 5

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 6

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 7

~~~~~~text
<!-- Hint -->
~~~~~~

Line 8

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 9

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 10

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 11

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 12

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 15

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 16

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 17

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 18

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 19

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 20

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 21

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 22

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-sv/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 9

~~~~~~text
<!-- Hint -->
~~~~~~

Line 10

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 12

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 14

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 19

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 22

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 25

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 37

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 39

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 40

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 49

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 53

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 54

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-th/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 60

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 75

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 96

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 101

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 108

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-tr/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 60

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 75

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 96

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 101

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 108

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-tt/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 46

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 60

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 62

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 79

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 83

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 86

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-uk/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 14

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 16

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 21

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 24

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 27

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 30

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-v30/styles.xml

Line 2

~~~~~~text
<!-- This API level enables the edge-to-edge functionality of the launcher, and requires these to be set for the launcher to look good -->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-vi/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 6

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 8

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 10

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 14

~~~~~~text
<!-- Hint -->
~~~~~~

Line 16

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 19

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 22

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 28

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 31

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 35

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 38

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 40

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 74

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 90

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 95

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 113

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 119

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 126

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-zh-rCN/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/app_pojavlauncher/src/main/res/values-zh-rTW/strings.xml

Line 3

~~~~~~text
<!-- App name part -->
~~~~~~

Line 5

~~~~~~text
<!-- Action bar part -->
~~~~~~

Line 6

~~~~~~text
<!-- Languages list part -->
~~~~~~

Line 7

~~~~~~text
<!-- Login strings -->
~~~~~~

Line 10

~~~~~~text
<!-- Hint -->
~~~~~~

Line 11

~~~~~~text
<!-- Warnings -->
~~~~~~

Line 13

~~~~~~text
<!-- AlertDialog title -->
~~~~~~

Line 15

~~~~~~text
<!-- Error messages -->
~~~~~~

Line 20

~~~~~~text
<!-- Toast messages -->
~~~~~~

Line 23

~~~~~~text
<!--
    <string name="toast_3">Exit</string>
    -->
~~~~~~

Line 26

~~~~~~text
<!-- MCLauncherActivity: Tabs -->
~~~~~~

Line 28

~~~~~~text
<!-- MCLauncherActivity: Account status -->
~~~~~~

Line 29

~~~~~~text
<!-- MCLauncherActivity: Strings -->
~~~~~~

Line 61

~~~~~~text
<!-- Global strings -->
~~~~~~

Line 76

~~~~~~text
<!-- MainActivity: strings -->
~~~~~~

Line 80

~~~~~~text
<!-- MainActivity: Control buttons -->
~~~~~~

Line 97

~~~~~~text
<!-- MainActivity: Menu advanced controls -->
~~~~~~

Line 102

~~~~~~text
<!-- ImportControlActivity Strings -->
~~~~~~

Line 109

~~~~~~text
<!--
    <string name="control_more3"></string>
    <string name="control_more4"></string>
-->
~~~~~~

## daylight-android/forge_installer/src/main/java/git/artdeell/installer_agent/Agent.java

Line 34

~~~~~~text
// expecting a new dialog
~~~~~~

Line 38

~~~~~~text
// false at startup, so we will handle the first window as the Forge one
~~~~~~

Line 71

~~~~~~text
// do that after forge actually builds its window, otherwise we set the path too fast
~~~~~~

Line 81

~~~~~~text
// return the button, so we can press it after processing other stuff
~~~~~~

Line 83

~~~~~~text
// It should be the default, but let's make sure
~~~~~~

Line 97

~~~~~~text
// ensure that it's a JOptionPane dialog
~~~~~~

Line 99

~~~~~~text
// another common trait of them - they only have one option pane in them,
~~~~~~

Line 100

~~~~~~text
// so we can discard the rest of the dialog structure
~~~~~~

Line 101

~~~~~~text
// also allows us to discard dialogs with progress bars which older installers use
~~~~~~

Line 103

~~~~~~text
// forge doesn't emit information messages for other reasons yet
~~~~~~

Line 105

~~~~~~text
// again, forge doesn't call exit for some reason, so we do that ourselves here
~~~~~~

## daylight-android/gradle/prefab_bypass.gradle

Line 2

~~~~~~text
//
~~~~~~

Line 4

~~~~~~text
// of this software and associated documentation files (the "Software"), to deal
~~~~~~

Line 5

~~~~~~text
// in the Software without restriction, including without limitation the rights
~~~~~~

Line 6

~~~~~~text
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
~~~~~~

Line 7

~~~~~~text
// copies of the Software, and to permit persons to whom the Software is
~~~~~~

Line 8

~~~~~~text
// furnished to do so, subject to the following conditions:
~~~~~~

Line 9

~~~~~~text
//
~~~~~~

Line 11

~~~~~~text
// copies or substantial portions of the Software.
~~~~~~

Line 12

~~~~~~text
//
~~~~~~

Line 13

~~~~~~text
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
~~~~~~

Line 14

~~~~~~text
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
~~~~~~

Line 15

~~~~~~text
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
~~~~~~

Line 17

~~~~~~text
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
~~~~~~

Line 18

~~~~~~text
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
~~~~~~

Line 19

~~~~~~text
// SOFTWARE.
~~~~~~

Line 20

~~~~~~text
//
~~~~~~

Line 22

~~~~~~text
// Created by Da Xi (xida@bytedance.com) on 2024-11-4.
~~~~~~

Line 27

~~~~~~text
// Helper function to configure prefab for a specific task
~~~~~~

Line 56

~~~~~~text
// Configure tasks for each architecture
~~~~~~

Line 66

~~~~~~text
// make sure the baseDir exists
~~~~~~

## daylight-android/gradle/wrapper/gradle-wrapper.properties

Line 1

~~~~~~text
#Wed Aug 20 09:17:10 MSK 2025
~~~~~~

## daylight-android/gradle.properties

Line 1

~~~~~~text
# required for building jre_lwjgl3glfw with Java 8 while using plugins in app_pojavlauncher that require Java 11
~~~~~~

Line 6

~~~~~~text
# Increase Gradle daemon RAM allocation
~~~~~~

## daylight-android/scripts/patch_vulkanmod.sh

Line 7

~~~~~~text
# Extract natives
~~~~~~

Line 14

~~~~~~text
# Overwrite natives
~~~~~~

Line 18

~~~~~~text
# Cleanup
~~~~~~

Line 32

~~~~~~text
# Overwrite lwjgl-vulkan.jar
~~~~~~

Line 40

~~~~~~text
# Process every arch
~~~~~~

Line 47

~~~~~~text
# Package everything back
~~~~~~

Line 50

~~~~~~text
# Cleanup
~~~~~~

## daylight-android/tools/build-preview.ps1

Line 18

~~~~~~text
# PowerShell 5 turns native stderr warnings into terminating errors under
~~~~~~

Line 19

~~~~~~text
# Stop. Gradle's exit code, not warnings about SDK metadata, owns success.
~~~~~~

## daylight-android/tools/build-release.ps1

Line 14

~~~~~~text
# This persistent key is outside the repository and the public share folder.
~~~~~~

Line 15

~~~~~~text
# DPAPI protects the password for this Windows user. Never regenerate the key
~~~~~~

Line 16

~~~~~~text
# for an app that has already shipped: updates require the original signer.
~~~~~~

## daylight-android/tools/setup-android.ps1

Line 36

~~~~~~text
# The user accepted Google's SDK terms. Only install the requested packages;
~~~~~~

Line 37

~~~~~~text
# do not accept licenses for unrelated SDK packages via a blanket --licenses.
~~~~~~

## daylight-api/src/index.js

Line 1

~~~~~~text
/**
 * Daylight cosmetics API.
 *
 * Runs on Cloudflare's edge -- once deployed it serves whether your PC is on or
 * not.
 *
 * Model: cosmetics are created by the owner and published to a catalog. Any
 * player can wear anything in the catalog. Players never upload images, which
 * is why there is no upload route and no moderation queue.
 *
 * Identity: a player proves who they are by signing a one-time challenge with
 * the Mojang-signed keypair every account has held since 1.19. Verified
 * offline against a baked-in key set, because Mojang blocks Cloudflare egress.
 * Without this anyone could equip cosmetics onto someone else's account.
 *
 * Public
 *   GET  /v1/catalog                       everything available to wear
 *   GET  /v1/players?ids=<uuid>,<uuid>...  what those players are wearing
 *   GET  /v1/texture/<id>                  a cosmetic image
 * Player (session token)
 *   GET  /v1/auth/challenge                one-time challenge to sign
 *   POST /v1/auth        {signed proof}     exchange it for a session token
 *   PUT  /v1/me          {cape, aura}      set your own cosmetics
 * Owner (admin token)
 *   PUT    /v1/admin/texture/<id>   <png bytes>    upload the image
 *   DELETE /v1/admin/texture/<id>                  remove the image
 *   PUT    /v1/admin/cosmetic/<id>  {type, name}   publish to the catalog
 *   DELETE /v1/admin/cosmetic/<id>                 unpublish
 *   PUT    /v1/admin/player/<uuid>  {cape, aura}   force-set someone
 */
~~~~~~

Line 50

~~~~~~text
/** Mojang wants the dashed form when we ask about a profile. */
~~~~~~

Line 69

~~~~~~text
/** Resolves a player session token to a uuid, or null. Expired rows are dropped. */
~~~~~~

Line 83

~~~~~~text
// ---------------------------------------------------------------- public
~~~~~~

Line 107

~~~~~~text
// A row exists only for accounts that have signed in through Daylight, so
~~~~~~

Line 108

~~~~~~text
// its mere presence is what the badge is asserting. Stated outright rather
~~~~~~

Line 109

~~~~~~text
// than left for the client to infer from an empty object.
~~~~~~

Line 114

~~~~~~text
// Cosmetics change rarely, so cache hard at the edge and in the client. This
~~~~~~

Line 115

~~~~~~text
// is what keeps a few hundred players well inside the free tier.
~~~~~~

Line 132

~~~~~~text
// ---------------------------------------------------------------- player auth
~~~~~~

Line 134

~~~~~~text
/**
 * Exchanges a signed challenge for a session token that lets the caller change
 * only their own cosmetics.
 */
~~~~~~

Line 171

~~~~~~text
// Put the account on record so other players' clients can show the Daylight
~~~~~~

Line 172

~~~~~~text
// badge beside their name. DO NOTHING rather than REPLACE: this must never
~~~~~~

Line 173

~~~~~~text
// wipe cosmetics someone is already wearing.
~~~~~~

Line 181

~~~~~~text
// ------------------------------------------------------- identity (offline)
~~~~~~

Line 182

~~~~~~text
//
~~~~~~

Line 183

~~~~~~text
// Mojang blocks Cloudflare, so hasJoined is not an option. Instead we use the
~~~~~~

Line 184

~~~~~~text
// signed keypair every player has held since 1.19:
~~~~~~

Line 185

~~~~~~text
//
~~~~~~

Line 186

~~~~~~text
//   1. Mojang signs (uuid || expiresAt || publicKey) with its certificate key.
~~~~~~

Line 187

~~~~~~text
//      Verifying that with Mojang's published key proves the public key really
~~~~~~

Line 188

~~~~~~text
//      belongs to that account.
~~~~~~

Line 189

~~~~~~text
//   2. The client signs our one-time challenge with the matching private key,
~~~~~~

Line 190

~~~~~~text
//      proving it actually holds the account's key rather than replaying
~~~~~~

Line 191

~~~~~~text
//      someone else's certificate.
~~~~~~

Line 192

~~~~~~text
//
~~~~~~

Line 193

~~~~~~text
// Both checks are pure crypto against a baked-in key set, so the Worker never
~~~~~~

Line 194

~~~~~~text
// needs to reach Mojang at all.
~~~~~~

Line 203

~~~~~~text
/** The exact bytes Mojang signs: uuidHi || uuidLo || expiresAt || keyDER. */
~~~~~~

Line 208

~~~~~~text
// big endian
~~~~~~

Line 213

~~~~~~text
/** True when Mojang vouches that this public key belongs to this account. */
~~~~~~

Line 219

~~~~~~text
// Mojang signs these with SHA1withRSA
~~~~~~

Line 222

~~~~~~text
/* try the next key in the set */
~~~~~~

Line 227

~~~~~~text
/** True when the caller holds the private key for that public key. */
~~~~~~

Line 238

~~~~~~text
/** Hands out a one-time challenge for the client to sign. */
~~~~~~

Line 247

~~~~~~text
/** Consumes a challenge, returning whether it was valid and unused. */
~~~~~~

Line 253

~~~~~~text
// one use only, so a captured signature cannot be replayed
~~~~~~

Line 258

~~~~~~text
/** A cosmetic id is only accepted if it is actually in the catalog. */
~~~~~~

Line 290

~~~~~~text
// ---------------------------------------------------------------- owner
~~~~~~

Line 310

~~~~~~text
/**
 * Stores a cosmetic's image.
 *
 * <p>Uploading used to mean reaching for wrangler and a Cloudflare API token
 * on top of the admin token this service already has. Publishing a cape is now
 * two calls to one place with one credential, and nothing needs installing.
 */
~~~~~~

Line 325

~~~~~~text
// Check the magic rather than trusting the content-type header: a cape that
~~~~~~

Line 326

~~~~~~text
// is not actually a png renders as garbage in game rather than failing, and
~~~~~~

Line 327

~~~~~~text
// that is a miserable thing to debug from the other end.
~~~~~~

Line 365

~~~~~~text
// kept so older clients keep working
~~~~~~

## daylight-api/src/mojang-keys.js

Line 1

~~~~~~text
/**
 * Mojang's player-certificate verification keys.
 *
 * Baked in deliberately: Mojang blocks Cloudflare egress -- every one of their
 * endpoints answers 403 from a Worker -- so this key set cannot be fetched at
 * runtime. These are public verification keys, they rotate very rarely, and
 * they were captured from https://api.minecraftservices.com/publickeys.
 *
 * If player verification starts failing for everyone at once, re-fetch that URL
 * from an unblocked machine and replace these.
 */
~~~~~~

## daylight-mod/.github/workflows/build.yml

Line 1

~~~~~~text
# Automatically build the project and run any configured tests for every push
~~~~~~

Line 2

~~~~~~text
# and submitted pull request. This can help catch issues that only occur on
~~~~~~

Line 3

~~~~~~text
# certain platforms or Java versions, and provides a first line of defence
~~~~~~

Line 4

~~~~~~text
# against bad commits.
~~~~~~

## daylight-mod/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 33

~~~~~~text
// Fabric API. This is technically optional, but you probably want it anyway.
~~~~~~

Line 56

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 57

~~~~~~text
// if it is present.
~~~~~~

Line 58

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 74

~~~~~~text
// configure the maven publication
~~~~~~

Line 82

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 84

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 85

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 86

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 87

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod/gradle.properties

Line 1

~~~~~~text
# Done to increase the memory available to gradle.
~~~~~~

Line 5

~~~~~~text
# IntelliJ IDEA is not yet fully compatible with configuration cache, see: https://github.com/FabricMC/fabric-loom/issues/1349
~~~~~~

Line 8

~~~~~~text
# Fabric Properties
~~~~~~

Line 9

~~~~~~text
# check these on https://fabricmc.net/develop
~~~~~~

Line 14

~~~~~~text
# Mod Properties
~~~~~~

Line 18

~~~~~~text
# Dependencies
~~~~~~

## daylight-mod/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/auth/SessionFixer.java

Line 17

~~~~~~text
/**
 * Cures Minecraft's "Invalid session" without a restart. The running client
 * can't refresh its own Microsoft token, so it asks the Daylight launcher —
 * still alive in the tray — over a loopback bridge (coordinates handed in as
 * -Ddaylight.session.* at launch), then swaps the fresh access token into the
 * live {@link User}. Rejoining the server then succeeds.
 */
~~~~~~

Line 30

~~~~~~text
/** True when the game was launched by Daylight (bridge coordinates present). */
~~~~~~

Line 36

~~~~~~text
// The title-screen button passes itself so we can report status on it — the
~~~~~~

Line 37

~~~~~~text
// title screen has no player/chat, and 26.x has no simple toast getter.
~~~~~~

Line 77

~~~~~~text
// Replace the token but keep name/uuid/xuid/clientId — same account, only
~~~~~~

Line 78

~~~~~~text
// the access token went stale.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/DaylightClient.java

Line 30

~~~~~~text
// Persist module state + settings on quit, so toggles survive a relaunch
~~~~~~

Line 31

~~~~~~text
// even when changed by keybind (which never opens the GUI).
~~~~~~

Line 46

~~~~~~text
// (The title-screen "Fix Session" button is added by TitleScreenMixin.)
~~~~~~

Line 48

~~~~~~text
// One HUD element draws every enabled Daylight HUD module and runs
~~~~~~

Line 49

~~~~~~text
// per-frame logic (CPS sampling, zoom) at frame resolution.
~~~~~~

Line 53

~~~~~~text
// Hide the vanilla crosshair while the custom Crosshair module draws its own.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 23

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 30

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 49

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 61

~~~~~~text
// palette
~~~~~~

Line 74

~~~~~~text
// null = ALL
~~~~~~

Line 76

~~~~~~text
// module whose options panel is open
~~~~~~

Line 83

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 90

~~~~~~text
// options-panel editing state
~~~~~~

Line 100

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 104

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 105

~~~~~~text
// [Rect, Module]
~~~~~~

Line 106

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 107

~~~~~~text
// [Rect, channel]
~~~~~~

Line 237

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 267

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 316

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 410

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 456

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 511

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 530

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 541

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 572

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 586

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 649

~~~~~~text
// swallow panel clicks
~~~~~~

Line 651

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 666

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 677

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 755

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 765

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 788

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 13

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 47

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 77

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 129

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 135

~~~~~~text
// ---- side column ----
~~~~~~

Line 148

~~~~~~text
// pixel-size stepper
~~~~~~

Line 200

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/ChatComponentMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. The public
 * system/player message entry points all funnel through this one, and it only
 * touches the text on its way to the screen.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/ClientLevelTimeMixin.java

Line 13

~~~~~~text
// ClientLevel-only clock accessors — the (integrated) server keeps its own
~~~~~~

Line 14

~~~~~~text
// clock, so this is a visual override only.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 14

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This is
 * the value that feeds the render state's name label, so it covers every player
 * renderer without touching non-player entities.
 */
~~~~~~

Line 28

~~~~~~text
// this player stays visible
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/ItemInHandRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyItemArmTransform running
 * so the item's base position stays correct — cancelling it entirely drops the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/LevelWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client level instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/MinecraftUserAccessor.java

Line 9

~~~~~~text
/**
 * Lets Daylight swap the live login session so its "Fix session" button can
 * replace a stale access token in place — {@code user} is private final.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/MultiPlayerGameModeMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/PlayerTabOverlayMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/mixin/TitleScreenMixin.java

Line 14

~~~~~~text
/**
 * Adds Daylight's "Fix Session" button to the title-screen top-left. Extending
 * Screen lets the injected code call the inherited protected addRenderableWidget.
 * The button cures an expired login ("Invalid session") in place via the
 * launcher bridge (see {@link SessionFixer}).
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 51

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 124

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 125

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 138

~~~~~~text
// ---------- config ----------
~~~~~~

Line 143

~~~~~~text
// first run defaults
~~~~~~

Line 172

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 188

~~~~~~text
/* keep default */
~~~~~~

Line 193

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/BlurModule.java

Line 8

~~~~~~text
/**
 * Blurs the world behind menus.
 *
 * <p>This drives Minecraft's own background-blur pass rather than adding a
 * shader of its own, so it behaves identically on every driver and cannot
 * break the render pipeline. The range matches vanilla's own slider (0-10,
 * default 5) and your value is put back when the module is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own blurriness, captured the first time we take over. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 45

~~~~~~text
/**
	 * Paints the user-drawn canvas centred on {@code (cx, cy)}. Shared with the
	 * editor so its preview is pixel-identical to what the HUD draws.
	 */
~~~~~~

Line 67

~~~~~~text
// Custom: user-painted canvas
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 8

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 *
 * <p>26.2 has no {@code GameRenderer.getFov} to intercept, so — like this
 * tree's Zoom module — this drives the vanilla FOV option directly and puts
 * the player's own value back when it is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own FOV, captured the first frame we take over. */
~~~~~~

Line 30

~~~~~~text
// Zoom writes the same option; let it win while the key is held.
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in OptionInstance.set
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 18

~~~~~~text
// WASD + space bar
~~~~~~

Line 25

~~~~~~text
// W
~~~~~~

Line 27

~~~~~~text
// A S D
~~~~~~

Line 31

~~~~~~text
// space
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}.
 */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 38

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to it. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/**
	 * Rewrites every known player name inside a chat message, keeping the
	 * original colours and formatting of each run of text.
	 */
~~~~~~

Line 101

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 124

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~

## daylight-mod-1.18/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 53

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 54

~~~~~~text
// if it is present.
~~~~~~

Line 55

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 71

~~~~~~text
// configure the maven publication
~~~~~~

Line 79

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 81

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 82

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 83

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 84

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.18/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.18/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/compat/Gfx.java

Line 9

~~~~~~text
/**
 * Drawing shim for the pre-1.20 API generation, which has no {@code DrawContext}.
 * It exposes the same method names the modules and GUI already call, so the
 * shared Daylight code compiles unchanged against {@link MatrixStack}.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/DaylightClient.java

Line 31

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 32

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 48

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 49

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 50

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 51

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 19

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 26

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 45

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 57

~~~~~~text
// palette
~~~~~~

Line 70

~~~~~~text
// null = ALL
~~~~~~

Line 72

~~~~~~text
// module whose options panel is open
~~~~~~

Line 73

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 80

~~~~~~text
// options-panel editing state
~~~~~~

Line 90

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 94

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 95

~~~~~~text
// [Rect, Module]
~~~~~~

Line 96

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 97

~~~~~~text
// [Rect, channel]
~~~~~~

Line 137

~~~~~~text
// HUD previews stay draggable behind the panel
~~~~~~

Line 147

~~~~~~text
// HUD-edit mode: hide the whole panel so elements can be dragged freely
~~~~~~

Line 164

~~~~~~text
// panel + header
~~~~~~

Line 170

~~~~~~text
// close button
~~~~~~

Line 177

~~~~~~text
// edit-HUD button
~~~~~~

Line 185

~~~~~~text
// search box
~~~~~~

Line 194

~~~~~~text
// GUI scale controls
~~~~~~

Line 206

~~~~~~text
// category chips
~~~~~~

Line 214

~~~~~~text
// card grid
~~~~~~

Line 239

~~~~~~text
// state bar
~~~~~~

Line 258

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 307

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 401

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 447

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 502

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 519

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 530

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 561

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 575

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 635

~~~~~~text
// swallow panel clicks
~~~~~~

Line 637

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 652

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 663

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 733

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 743

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 766

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 76

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 128

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 134

~~~~~~text
// ---- side column ----
~~~~~~

Line 147

~~~~~~text
// pixel-size stepper
~~~~~~

Line 199

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 50

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 122

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 123

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 136

~~~~~~text
// ---------- config ----------
~~~~~~

Line 141

~~~~~~text
// first run defaults
~~~~~~

Line 170

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 186

~~~~~~text
/* keep default */
~~~~~~

Line 191

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/FpsModule.java

Line 18

~~~~~~text
// This generation has no getCurrentFps(); the debug string starts with it.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 7

~~~~~~text
/**
 * Maxes out gamma well past the vanilla slider cap. This API generation stores
 * gamma as a plain field, so no accessor mixin is needed to bypass the clamp.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.18/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 87

~~~~~~text
/** This era's shim has no gradient fill, so it degrades to a flat top colour. */
~~~~~~

Line 102

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 114

~~~~~~text
// straight middle section
~~~~~~

Line 117

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 128

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 129

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 134

~~~~~~text
// ---------- text ----------
~~~~~~

Line 159

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 166

~~~~~~text
// ---------- clipping ----------
~~~~~~

Line 168

~~~~~~text
/**
	 * No scissor on this era's shim. Callers already skip rows outside the
	 * visible band, so clipping is a refinement rather than a requirement and
	 * these are deliberately no-ops.
	 */
~~~~~~

## daylight-mod-1.18.1/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 53

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 54

~~~~~~text
// if it is present.
~~~~~~

Line 55

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 71

~~~~~~text
// configure the maven publication
~~~~~~

Line 79

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 81

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 82

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 83

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 84

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.18.1/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.18.1/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/compat/Gfx.java

Line 9

~~~~~~text
/**
 * Drawing shim for the pre-1.20 API generation, which has no {@code DrawContext}.
 * It exposes the same method names the modules and GUI already call, so the
 * shared Daylight code compiles unchanged against {@link MatrixStack}.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/DaylightClient.java

Line 31

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 32

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 48

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 49

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 50

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 51

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 19

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 26

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 45

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 57

~~~~~~text
// palette
~~~~~~

Line 70

~~~~~~text
// null = ALL
~~~~~~

Line 72

~~~~~~text
// module whose options panel is open
~~~~~~

Line 73

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 80

~~~~~~text
// options-panel editing state
~~~~~~

Line 90

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 94

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 95

~~~~~~text
// [Rect, Module]
~~~~~~

Line 96

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 97

~~~~~~text
// [Rect, channel]
~~~~~~

Line 137

~~~~~~text
// HUD previews stay draggable behind the panel
~~~~~~

Line 147

~~~~~~text
// HUD-edit mode: hide the whole panel so elements can be dragged freely
~~~~~~

Line 164

~~~~~~text
// panel + header
~~~~~~

Line 170

~~~~~~text
// close button
~~~~~~

Line 177

~~~~~~text
// edit-HUD button
~~~~~~

Line 185

~~~~~~text
// search box
~~~~~~

Line 194

~~~~~~text
// GUI scale controls
~~~~~~

Line 206

~~~~~~text
// category chips
~~~~~~

Line 214

~~~~~~text
// card grid
~~~~~~

Line 239

~~~~~~text
// state bar
~~~~~~

Line 258

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 307

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 401

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 447

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 502

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 519

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 530

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 561

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 575

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 635

~~~~~~text
// swallow panel clicks
~~~~~~

Line 637

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 652

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 663

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 733

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 743

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 766

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 76

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 128

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 134

~~~~~~text
// ---- side column ----
~~~~~~

Line 147

~~~~~~text
// pixel-size stepper
~~~~~~

Line 199

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 50

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 122

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 123

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 136

~~~~~~text
// ---------- config ----------
~~~~~~

Line 141

~~~~~~text
// first run defaults
~~~~~~

Line 170

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 186

~~~~~~text
/* keep default */
~~~~~~

Line 191

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/FpsModule.java

Line 18

~~~~~~text
// This generation has no getCurrentFps(); the debug string starts with it.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 7

~~~~~~text
/**
 * Maxes out gamma well past the vanilla slider cap. This API generation stores
 * gamma as a plain field, so no accessor mixin is needed to bypass the clamp.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.18.1/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 87

~~~~~~text
/** This era's shim has no gradient fill, so it degrades to a flat top colour. */
~~~~~~

Line 102

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 114

~~~~~~text
// straight middle section
~~~~~~

Line 117

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 128

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 129

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 134

~~~~~~text
// ---------- text ----------
~~~~~~

Line 159

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 166

~~~~~~text
// ---------- clipping ----------
~~~~~~

Line 168

~~~~~~text
/**
	 * No scissor on this era's shim. Callers already skip rows outside the
	 * visible band, so clipping is a refinement rather than a requirement and
	 * these are deliberately no-ops.
	 */
~~~~~~

## daylight-mod-1.19/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.19/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.19/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/compat/Gfx.java

Line 9

~~~~~~text
/**
 * Drawing shim for the pre-1.20 API generation, which has no {@code DrawContext}.
 * It exposes the same method names the modules and GUI already call, so the
 * shared Daylight code compiles unchanged against {@link MatrixStack}.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/DaylightClient.java

Line 31

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 32

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 48

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 49

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 50

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 51

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 235

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 265

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 314

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 408

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 454

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 509

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 528

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 539

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 570

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 584

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 647

~~~~~~text
// swallow panel clicks
~~~~~~

Line 649

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 664

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 675

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 760

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 770

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 793

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 12

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 46

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 77

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 129

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 135

~~~~~~text
// ---- side column ----
~~~~~~

Line 148

~~~~~~text
// pixel-size stepper
~~~~~~

Line 200

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 50

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 122

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 123

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 136

~~~~~~text
// ---------- config ----------
~~~~~~

Line 141

~~~~~~text
// first run defaults
~~~~~~

Line 170

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 186

~~~~~~text
/* keep default */
~~~~~~

Line 191

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.19/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 87

~~~~~~text
/** This era's shim has no gradient fill, so it degrades to a flat top colour. */
~~~~~~

Line 102

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 114

~~~~~~text
// straight middle section
~~~~~~

Line 117

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 128

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 129

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 134

~~~~~~text
// ---------- text ----------
~~~~~~

Line 159

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 166

~~~~~~text
// ---------- clipping ----------
~~~~~~

Line 168

~~~~~~text
/**
	 * No scissor on this era's shim. Callers already skip rows outside the
	 * visible band, so clipping is a refinement rather than a requirement and
	 * these are deliberately no-ops.
	 */
~~~~~~

## daylight-mod-1.19.3/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.19.3/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.19.3/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/compat/Gfx.java

Line 9

~~~~~~text
/**
 * Drawing shim for the pre-1.20 API generation, which has no {@code DrawContext}.
 * It exposes the same method names the modules and GUI already call, so the
 * shared Daylight code compiles unchanged against {@link MatrixStack}.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/DaylightClient.java

Line 31

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 32

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 48

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 49

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 50

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 51

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 235

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 265

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 314

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 408

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 454

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 509

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 528

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 539

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 570

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 584

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 647

~~~~~~text
// swallow panel clicks
~~~~~~

Line 649

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 664

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 675

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 760

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 770

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 793

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 12

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 46

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 77

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 129

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 135

~~~~~~text
// ---- side column ----
~~~~~~

Line 148

~~~~~~text
// pixel-size stepper
~~~~~~

Line 200

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 50

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 122

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 123

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 136

~~~~~~text
// ---------- config ----------
~~~~~~

Line 141

~~~~~~text
// first run defaults
~~~~~~

Line 170

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 186

~~~~~~text
/* keep default */
~~~~~~

Line 191

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/FpsModule.java

Line 18

~~~~~~text
// This generation has no getCurrentFps(); the debug string starts with it.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.19.3/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 87

~~~~~~text
/** This era's shim has no gradient fill, so it degrades to a flat top colour. */
~~~~~~

Line 102

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 114

~~~~~~text
// straight middle section
~~~~~~

Line 117

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 128

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 129

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 134

~~~~~~text
// ---------- text ----------
~~~~~~

Line 159

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 166

~~~~~~text
// ---------- clipping ----------
~~~~~~

Line 168

~~~~~~text
/**
	 * No scissor on this era's shim. Callers already skip rows outside the
	 * visible band, so clipping is a refinement rather than a requirement and
	 * these are deliberately no-ops.
	 */
~~~~~~

## daylight-mod-1.20/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.20/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.20/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/auth/SessionFixer.java

Line 17

~~~~~~text
/**
 * Cures Minecraft's "Invalid session" without a restart. The running client
 * can't refresh its own Microsoft token, so it asks the Daylight launcher —
 * still alive in the tray — over a loopback bridge (coordinates handed in as
 * -Ddaylight.session.* at launch), then swaps the fresh access token into the
 * live {@link Session}. Rejoining the server then succeeds.
 */
~~~~~~

Line 30

~~~~~~text
/** True when the game was launched by Daylight (bridge coordinates present). */
~~~~~~

Line 74

~~~~~~text
// Replace the token but keep username/uuid/xuid/clientId — same account,
~~~~~~

Line 75

~~~~~~text
// only the access token went stale.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/DaylightClient.java

Line 36

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 37

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 52

~~~~~~text
// A "Fix Session" button in the title-screen top-left — cures an
~~~~~~

Line 53

~~~~~~text
// expired login ("Invalid session") in place via the launcher bridge.
~~~~~~

Line 54

~~~~~~text
// Added through Fabric's screen API so it coexists with other mods that
~~~~~~

Line 55

~~~~~~text
// touch the title screen (e.g. Essential).
~~~~~~

Line 68

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 69

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 70

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 71

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 234

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 264

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 313

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 407

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 453

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 508

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 527

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 538

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 569

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 583

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 646

~~~~~~text
// swallow panel clicks
~~~~~~

Line 648

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 663

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 674

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 759

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 769

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 792

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 75

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 127

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 133

~~~~~~text
// ---- side column ----
~~~~~~

Line 146

~~~~~~text
// pixel-size stepper
~~~~~~

Line 198

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/MinecraftClientAccessor.java

Line 9

~~~~~~text
/**
 * Lets Daylight swap the live login session so its "Fix session" button can
 * replace a stale access token in place — {@code session} is private final.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 51

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 124

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 125

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 138

~~~~~~text
// ---------- config ----------
~~~~~~

Line 143

~~~~~~text
// first run defaults
~~~~~~

Line 172

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 188

~~~~~~text
/* keep default */
~~~~~~

Line 193

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/BlurModule.java

Line 8

~~~~~~text
/**
 * Blurs the world behind menus.
 *
 * <p>This drives Minecraft's own background-blur pass rather than adding a
 * shader of its own, so it behaves identically on every driver and cannot
 * break the render pipeline. The range matches vanilla's own slider (0-10,
 * default 5) and your value is put back when the module is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own blurriness, captured the first time we take over. */
~~~~~~

Line 32

~~~~~~text
// this era stores the option as a 0..1 double rather than a 0..10 int
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.20/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~

## daylight-mod-1.20.4/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.20.4/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.20.4/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/DaylightClient.java

Line 31

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 32

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 48

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 49

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 50

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 51

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 234

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 264

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 313

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 407

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 453

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 508

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 527

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 538

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 569

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 583

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 646

~~~~~~text
// swallow panel clicks
~~~~~~

Line 648

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 663

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 674

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 759

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 769

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 792

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 75

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 127

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 133

~~~~~~text
// ---- side column ----
~~~~~~

Line 146

~~~~~~text
// pixel-size stepper
~~~~~~

Line 198

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 50

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 122

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 123

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 136

~~~~~~text
// ---------- config ----------
~~~~~~

Line 141

~~~~~~text
// first run defaults
~~~~~~

Line 170

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 186

~~~~~~text
/* keep default */
~~~~~~

Line 191

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.20.4/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~

## daylight-mod-1.21.5/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 42

~~~~~~text
// 1.21 / 1.21.1 query cooldown by Item; 1.21.2+ query by ItemStack.
~~~~~~

Line 43

~~~~~~text
// Generate build-only compatible sources; never rewrite the working source tree.
~~~~~~

Line 70

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 71

~~~~~~text
// if it is present.
~~~~~~

Line 72

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 88

~~~~~~text
// configure the maven publication
~~~~~~

Line 96

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 98

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 99

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 100

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 101

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.21.5/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.21.5/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/auth/SessionFixer.java

Line 17

~~~~~~text
/**
 * Cures Minecraft's "Invalid session" without a restart. The running client
 * can't refresh its own Microsoft token, so it asks the Daylight launcher —
 * still alive in the tray — over a loopback bridge (coordinates handed in as
 * -Ddaylight.session.* at launch), then swaps the fresh access token into the
 * live {@link Session}. Rejoining the server then succeeds.
 */
~~~~~~

Line 30

~~~~~~text
/** True when the game was launched by Daylight (bridge coordinates present). */
~~~~~~

Line 74

~~~~~~text
// Replace the token but keep username/uuid/xuid/clientId — same account,
~~~~~~

Line 75

~~~~~~text
// only the access token went stale.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/DaylightClient.java

Line 36

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 37

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 52

~~~~~~text
// A "Fix Session" button in the title-screen top-left — cures an
~~~~~~

Line 53

~~~~~~text
// expired login ("Invalid session") in place via the launcher bridge.
~~~~~~

Line 54

~~~~~~text
// Added through Fabric's screen API so it coexists with other mods that
~~~~~~

Line 55

~~~~~~text
// touch the title screen (e.g. Essential).
~~~~~~

Line 68

~~~~~~text
// Draws every enabled Daylight HUD module and runs per-frame logic (CPS
~~~~~~

Line 69

~~~~~~text
// sampling, zoom) at frame resolution. This API generation predates
~~~~~~

Line 70

~~~~~~text
// HudElementRegistry, so the vanilla crosshair is hidden by
~~~~~~

Line 71

~~~~~~text
// InGameHudCrosshairMixin instead of by replacing a HUD element.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 234

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 264

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 313

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 407

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 453

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 508

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 527

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 538

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 569

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 583

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 646

~~~~~~text
// swallow panel clicks
~~~~~~

Line 648

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 663

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 674

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 759

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 769

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 792

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 75

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 127

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 133

~~~~~~text
// ---- side column ----
~~~~~~

Line 146

~~~~~~text
// pixel-size stepper
~~~~~~

Line 198

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/InGameHudCrosshairMixin.java

Line 11

~~~~~~text
/**
 * Hides the vanilla crosshair while Daylight's Crosshair module draws its own.
 * This API generation has no HudElementRegistry to replace the element with, so
 * the vanilla draw is cancelled here instead.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/MinecraftClientAccessor.java

Line 9

~~~~~~text
/**
 * Lets Daylight swap the live login session so its "Fix session" button can
 * replace a stale access token in place — {@code session} is private final.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 51

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 124

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 125

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 138

~~~~~~text
// ---------- config ----------
~~~~~~

Line 143

~~~~~~text
// first run defaults
~~~~~~

Line 172

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 188

~~~~~~text
/* keep default */
~~~~~~

Line 193

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/BlurModule.java

Line 8

~~~~~~text
/**
 * Blurs the world behind menus.
 *
 * <p>This drives Minecraft's own background-blur pass rather than adding a
 * shader of its own, so it behaves identically on every driver and cannot
 * break the render pipeline. The range matches vanilla's own slider (0-10,
 * default 5) and your value is put back when the module is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own blurriness, captured the first time we take over. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.21.5/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~

## daylight-mod-1.21.8/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.21.8/matrix-build.sh

Line 2

~~~~~~text
# Builds this (pre-1.21.9 API era) source tree for every listed MC version and
~~~~~~

Line 3

~~~~~~text
# copies each jar into the launcher's bundled/ folder. Yarn mappings and the
~~~~~~

Line 4

~~~~~~text
# matching Fabric API build are resolved automatically per version.
~~~~~~

## daylight-mod-1.21.8/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/auth/SessionFixer.java

Line 17

~~~~~~text
/**
 * Cures Minecraft's "Invalid session" without a restart. The running client
 * can't refresh its own Microsoft token, so it asks the Daylight launcher —
 * still alive in the tray — over a loopback bridge (coordinates handed in as
 * -Ddaylight.session.* at launch), then swaps the fresh access token into the
 * live {@link Session}. Rejoining the server then succeeds.
 */
~~~~~~

Line 30

~~~~~~text
/** True when the game was launched by Daylight (bridge coordinates present). */
~~~~~~

Line 74

~~~~~~text
// Replace the token but keep username/uuid/xuid/clientId — same account,
~~~~~~

Line 75

~~~~~~text
// only the access token went stale.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/DaylightClient.java

Line 36

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 37

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 52

~~~~~~text
// A "Fix Session" button in the title-screen top-left — cures an
~~~~~~

Line 53

~~~~~~text
// expired login ("Invalid session") in place via the launcher bridge.
~~~~~~

Line 54

~~~~~~text
// Added through Fabric's screen API so it coexists with other mods that
~~~~~~

Line 55

~~~~~~text
// touch the title screen (e.g. Essential).
~~~~~~

Line 68

~~~~~~text
// One HUD element draws every enabled Daylight HUD module and runs
~~~~~~

Line 69

~~~~~~text
// per-frame logic (CPS sampling, zoom) at frame resolution.
~~~~~~

Line 73

~~~~~~text
// Hide the vanilla crosshair while the custom Crosshair module draws its own.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 20

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 27

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 46

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 58

~~~~~~text
// palette
~~~~~~

Line 71

~~~~~~text
// null = ALL
~~~~~~

Line 73

~~~~~~text
// module whose options panel is open
~~~~~~

Line 80

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 87

~~~~~~text
// options-panel editing state
~~~~~~

Line 97

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 101

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 102

~~~~~~text
// [Rect, Module]
~~~~~~

Line 103

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 104

~~~~~~text
// [Rect, channel]
~~~~~~

Line 234

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 264

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 313

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 407

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 453

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 508

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 527

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 538

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 569

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 583

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 646

~~~~~~text
// swallow panel clicks
~~~~~~

Line 648

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 663

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 674

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 759

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 769

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 792

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 11

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 45

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 75

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 127

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 133

~~~~~~text
// ---- side column ----
~~~~~~

Line 146

~~~~~~text
// pixel-size stepper
~~~~~~

Line 198

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 10

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Only the
 * text on its way to the screen is touched.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 10

~~~~~~text
/**
 * Masks the floating nametag above players while Stream/Privacy is on. This
 * era has no EntityRenderer.getDisplayName to intercept, so the label is
 * rewritten where the renderer receives it.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/MinecraftClientAccessor.java

Line 9

~~~~~~text
/**
 * Lets Daylight swap the live login session so its "Fix session" button can
 * replace a stale access token in place — {@code session} is private final.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/** Masks player names in the tab list while Stream/Privacy is on. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 51

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 124

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 125

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 138

~~~~~~text
// ---------- config ----------
~~~~~~

Line 143

~~~~~~text
// first run defaults
~~~~~~

Line 172

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 188

~~~~~~text
/* keep default */
~~~~~~

Line 193

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/BlurModule.java

Line 8

~~~~~~text
/**
 * Blurs the world behind menus.
 *
 * <p>This drives Minecraft's own background-blur pass rather than adding a
 * shader of its own, so it behaves identically on every driver and cannot
 * break the render pipeline. The range matches vanilla's own slider (0-10,
 * default 5) and your value is put back when the module is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own blurriness, captured the first time we take over. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 63

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 72

~~~~~~text
// half thickness offset
~~~~~~

Line 78

~~~~~~text
// left
~~~~~~

Line 79

~~~~~~text
// right
~~~~~~

Line 80

~~~~~~text
// up
~~~~~~

Line 81

~~~~~~text
// down
~~~~~~

Line 86

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.21.8/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~

## daylight-mod-1.21.11/build.gradle

Line 10

~~~~~~text
// Add repositories to retrieve artifacts from in here.
~~~~~~

Line 11

~~~~~~text
// You should only use this when depending on other mods because
~~~~~~

Line 12

~~~~~~text
// Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
~~~~~~

Line 13

~~~~~~text
// See https://docs.gradle.org/current/userguide/declaring_repositories.html
~~~~~~

Line 14

~~~~~~text
// for more information about repositories.
~~~~~~

Line 29

~~~~~~text
// To change the versions see the gradle.properties file
~~~~~~

Line 34

~~~~~~text
// Fabric API. 1.21.11-era builds are distributed in the intermediary
~~~~~~

Line 35

~~~~~~text
// namespace, so they must go through loom's mod remapping.
~~~~~~

Line 58

~~~~~~text
// Loom will automatically attach sourcesJar to a RemapSourcesJar task and to the "build" task
~~~~~~

Line 59

~~~~~~text
// if it is present.
~~~~~~

Line 60

~~~~~~text
// If you remove this line, sources will not be generated.
~~~~~~

Line 76

~~~~~~text
// configure the maven publication
~~~~~~

Line 84

~~~~~~text
// See https://docs.gradle.org/current/userguide/publishing_maven.html for information on how to set up publishing.
~~~~~~

Line 86

~~~~~~text
// Add repositories to publish to here.
~~~~~~

Line 87

~~~~~~text
// Notice: This block does NOT have the same function as the block in the top level.
~~~~~~

Line 88

~~~~~~text
// The repositories here will be used for publishing your artifact, not for
~~~~~~

Line 89

~~~~~~text
// retrieving dependencies.
~~~~~~

## daylight-mod-1.21.11/matrix-build.sh

Line 2

~~~~~~text
# Rebuild the yarn source tree for 1.21.9 and 1.21.10 and copy each jar into the
~~~~~~

Line 3

~~~~~~text
# launcher's bundled/ folder, so those versions get the same modules + Fix
~~~~~~

Line 4

~~~~~~text
# Session + emote removal as 1.21.11. Restores gradle.properties afterward.
~~~~~~

## daylight-mod-1.21.11/settings.gradle

Line 12

~~~~~~text
// Should match your modid
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/auth/SessionFixer.java

Line 17

~~~~~~text
/**
 * Cures Minecraft's "Invalid session" without a restart. The running client
 * can't refresh its own Microsoft token, so it asks the Daylight launcher —
 * still alive in the tray — over a loopback bridge (coordinates handed in as
 * -Ddaylight.session.* at launch), then swaps the fresh access token into the
 * live {@link Session}. Rejoining the server then succeeds.
 */
~~~~~~

Line 30

~~~~~~text
/** True when the game was launched by Daylight (bridge coordinates present). */
~~~~~~

Line 74

~~~~~~text
// Replace the token but keep username/uuid/xuid/clientId — same account,
~~~~~~

Line 75

~~~~~~text
// only the access token went stale.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/combat/CombatTracker.java

Line 3

~~~~~~text
/**
 * Shared combat state fed by the attack mixin and read by the Reach Display and
 * Combo Counter HUD modules. Purely client-observational — server-safe.
 */
~~~~~~

Line 12

~~~~~~text
/**
	 * Vanilla survival attack reach. The measurement can land slightly past
	 * it (the hitbox is interpolated between ticks), and the centre fallback
	 * below overshoots by more, so the readout is clamped: a legit HUD must
	 * never print a reach-hack number.
	 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/AuraRenderer.java

Line 8

~~~~~~text
/**
 * Draws everyone's aura, once per tick.
 *
 * <p>Driven off the client tick rather than the render pass on purpose:
 * particles are spawned, not drawn, so emitting them per frame would make an
 * aura thicker on a faster machine. A tick is the same everywhere.
 */
~~~~~~

Line 17

~~~~~~text
/** How far away we still bother drawing someone's aura, in blocks. */
~~~~~~

Line 32

~~~~~~text
// Your own aura draws in first person too. Most of them sit at your
~~~~~~

Line 33

~~~~~~text
// feet where the camera never is, and an aura you cannot see unless
~~~~~~

Line 34

~~~~~~text
// you switch to third person is not really on.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/Auras.java

Line 14

~~~~~~text
/**
 * The built-in auras: the effect that follows a player around.
 *
 * <p>These are drawn out of particles rather than a custom model. It costs
 * nothing to run, it reads clearly at a distance, and every version back to
 * 1.18 has the same handful of particle types -- so an aura written once looks
 * the same on every version we ship, which a bespoke renderer would not.
 *
 * <p>An aura is a shape plus a particle. The shapes are the interesting part:
 * a ring circling the feet, a helix climbing the body, points orbiting at the
 * waist. Adding one is a single entry here plus a catalog row on the service.
 */
~~~~~~

Line 28

~~~~~~text
/** Emits one frame of an aura around a player. */
~~~~~~

Line 30

~~~~~~text
/**
		 * @param seconds a steadily climbing clock, so motion runs at a fixed
		 *                rate rather than tracking anyone's frame rate
		 */
~~~~~~

Line 37

~~~~~~text
/** One aura: what it is called and how it draws itself. */
~~~~~~

Line 49

~~~~~~text
/** Runs on the client thread and redirects emission to the isolated viewport. */
~~~~~~

Line 58

~~~~~~text
// --- rings at the feet ---
~~~~~~

Line 65

~~~~~~text
// --- helices climbing the body ---
~~~~~~

Line 70

~~~~~~text
// --- points orbiting at the waist ---
~~~~~~

Line 75

~~~~~~text
// --- rising and falling ---
~~~~~~

Line 82

~~~~~~text
// --- worn above the head ---
~~~~~~

Line 87

~~~~~~text
/**
	 * A ring of particles circling the feet.
	 *
	 * @param turns how many turns per second, negative to spin the other way
	 */
~~~~~~

Line 107

~~~~~~text
/** A ring worn just above the head, bobbing gently. */
~~~~~~

Line 123

~~~~~~text
/**
	 * A helix climbing the player.
	 *
	 * <p>Rather than drawing the whole spiral every frame, each frame lays down
	 * the next few points of it and the particles' own lifetime keeps the rest
	 * on screen. That is what makes it look like one continuous ribbon.
	 */
~~~~~~

Line 146

~~~~~~text
/** Points orbiting at waist height, tilted so they pass in front and behind. */
~~~~~~

Line 162

~~~~~~text
/** Particles drifting up out of the ground around the player. */
~~~~~~

Line 175

~~~~~~text
/** Particles falling from above the player's head. */
~~~~~~

Line 188

~~~~~~text
/**
	 * Puts one particle in the world.
	 *
	 * <p>Spawned as important so it survives a low particle setting: an aura
	 * that quietly disappears on someone else's settings is worse than one that
	 * costs a few more particles.
	 */
~~~~~~

Line 205

~~~~~~text
/** The aura for an id, or null when we do not know it. */
~~~~~~

Line 219

~~~~~~text
/** Every built-in aura id, in the order they should be listed. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/Badge.java

Line 12

~~~~~~text
/**
 * The little Daylight mark shown beside the name of anyone running Daylight.
 *
 * <p>Drawn as a font glyph rather than as a quad. A glyph rides along inside
 * an ordinary {@link Text}, so the same badge works in the tab list, on a
 * nametag and anywhere else a name is drawn, with no rendering code of its own
 * and nothing that can break when the render pipeline changes underneath us.
 * Everything vanilla does to a name -- centring, scaling, fading with distance,
 * the shadow -- happens to the badge for free.
 */
~~~~~~

Line 24

~~~~~~text
/** The font holding the one glyph, from assets/daylight/font/badge.json. */
~~~~~~

Line 27

~~~~~~text
/** A private-use codepoint, so it can never collide with real text. */
~~~~~~

Line 35

~~~~~~text
/**
	 * The badge, followed by a space.
	 *
	 * <p>Both parts hang off a neutral root rather than the badge carrying the
	 * name as a child. A child text inherits its parent's style, font included,
	 * so a name hung off a badge-styled parent gets drawn in a font holding one
	 * glyph -- every letter of it comes out as a missing-glyph box.
	 */
~~~~~~

Line 49

~~~~~~text
/** The badge in front of {@code name}, or {@code name} unchanged. */
~~~~~~

Line 55

~~~~~~text
/**
	 * Whether this player is running Daylight.
	 *
	 * <p>The service knows: signing in registers the account, so anyone who has
	 * ever launched Daylight is on record. You always count as one yourself --
	 * you are running it right now -- which also means the badge shows on your
	 * own name straight away rather than after the first lookup comes back.
	 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/CapeManager.java

Line 24

~~~~~~text
/**
 * Loads cape images off disk and hands out the texture to draw for a player.
 *
 * <p>{@link #capeFor(UUID)} is the seam the cosmetics backend will plug into.
 * Today it only answers for the local player, from a file the user dropped in
 * their capes folder; once the API exists it will answer for any player by
 * looking up what they have equipped, and nothing else here has to change.
 */
~~~~~~

Line 34

~~~~~~text
/** Vanilla cape sheets are 64x32; the taller 64x64 sheet is fine too. */
~~~~~~

Line 41

~~~~~~text
/** How many times the skin hook has asked us for a cape. If this stays at
	 *  zero the mixin is not applying at all, which is a different problem
	 *  entirely from the cape failing to load. */
~~~~~~

Line 48

~~~~~~text
/** Where users drop cape PNGs. Shared by every pack in this game folder. */
~~~~~~

Line 53

~~~~~~text
/** PNG file names in the capes folder, sorted. */
~~~~~~

Line 65

~~~~~~text
// unreadable folder: behave as if there are no capes
~~~~~~

Line 70

~~~~~~text
/**
	 * The registered texture for a cape file, loading it on first use. Returns
	 * null when the file is missing or is not a usable cape image; that failure
	 * is remembered so a bad file is not re-read every frame.
	 */
~~~~~~

Line 105

~~~~~~text
/** Forgets every loaded cape, so an edited file is picked up again. */
~~~~~~

Line 111

~~~~~~text
/**
	 * The cape a given player should be wearing, or null to leave their vanilla
	 * cape alone.
	 *
	 * <p>Your own cape can also come from a local file, which is how you preview
	 * one before publishing it. Everyone else's comes from the service, so any
	 * Daylight user is visible on any server.
	 */
~~~~~~

Line 126

~~~~~~text
// A local file is a preview aid, so it stays behind the module toggle.
~~~~~~

Line 133

~~~~~~text
// Anything equipped in the wardrobe applies on its own: choosing a cape
~~~~~~

Line 134

~~~~~~text
// there is the act of switching it on, so it must not also depend on a
~~~~~~

Line 135

~~~~~~text
// separate module being enabled.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/CosmeticsApi.java

Line 32

~~~~~~text
/**
 * Talks to the Daylight cosmetics service.
 *
 * <p>Everything here is off the render thread. Lookups for players we have not
 * seen before are batched once a second rather than fired per player, results
 * are cached, and failures back off instead of retrying every frame -- a busy
 * server can have a hundred players in view and none of that may cost frames.
 *
 * <p>Textures are decoded off-thread but registered back on the render thread,
 * because registering one anywhere else crashes the game.
 */
~~~~~~

Line 56

~~~~~~text
// More than one thread on purpose: a slow request must never starve the
~~~~~~

Line 57

~~~~~~text
// batch flusher, and work submitted from a pool thread must be able to run.
~~~~~~

Line 64

~~~~~~text
/** One wearable item in the catalog. */
~~~~~~

Line 67

~~~~~~text
/** What a player currently has on. */
~~~~~~

Line 74

~~~~~~text
/** Why the last handshake failed, for on-screen diagnosis. */
~~~~~~

Line 81

~~~~~~text
/** Accounts the service knows, which is to say Daylight users. */
~~~~~~

Line 87

~~~~~~text
/**
	 * Every frame of each cosmetic, in order. A still image is simply a
	 * one-frame animation, so nothing downstream has to know the difference.
	 */
~~~~~~

Line 93

~~~~~~text
/** How long one frame of an animated cosmetic is shown, in milliseconds. */
~~~~~~

Line 102

~~~~~~text
/** Starts the batch flusher and pulls the catalog once. */
~~~~~~

Line 110

~~~~~~text
// ---------------------------------------------------------------- catalog
~~~~~~

Line 116

~~~~~~text
/** Everything of one type, e.g. all capes. */
~~~~~~

Line 141

~~~~~~text
// offline or malformed: keep whatever we had
~~~~~~

Line 146

~~~~~~text
// ---------------------------------------------------------------- worn
~~~~~~

Line 148

~~~~~~text
/**
	 * What this player is wearing, or null if we do not know yet. Asking for an
	 * unknown player queues a lookup and returns null; call it again next frame.
	 */
~~~~~~

Line 188

~~~~~~text
// Having a record at all means the account has signed in
~~~~~~

Line 189

~~~~~~text
// through Daylight, which is what the badge is claiming.
~~~~~~

Line 192

~~~~~~text
// known-nothing is still an answer worth caching
~~~~~~

Line 203

~~~~~~text
/** Drops every cached answer, so the next frame re-asks. */
~~~~~~

Line 210

~~~~~~text
/**
	 * Whether this account is known to the service, which is to say whether it
	 * has ever signed in through Daylight.
	 *
	 * <p>Asking goes through the same batched lookup the cosmetics use, so the
	 * badge costs no extra requests -- the answer is already on its way.
	 */
~~~~~~

Line 223

~~~~~~text
/** Replaces what we believe about one player, used right after equipping. */
~~~~~~

Line 228

~~~~~~text
// ---------------------------------------------------------------- textures
~~~~~~

Line 230

~~~~~~text
/**
	 * The registered texture for a cosmetic, downloading it on first use.
	 * Returns null until it is ready.
	 */
~~~~~~

Line 239

~~~~~~text
// Off the wall clock rather than a frame counter, so an animation
~~~~~~

Line 240

~~~~~~text
// runs at the same speed on a 30fps machine and a 300fps one.
~~~~~~

Line 262

~~~~~~text
// registering a texture off the render thread crashes the game
~~~~~~

Line 263

~~~~~~text
// A cape sheet is twice as wide as it is tall. An image that is a
~~~~~~

Line 264

~~~~~~text
// whole number of those stacked up is an animation, and the
~~~~~~

Line 265

~~~~~~text
// image's own shape is what says so -- no flag, no metadata, and
~~~~~~

Line 266

~~~~~~text
// a still cape stays a plain upload.
~~~~~~

Line 271

~~~~~~text
// Cut the frames apart here, on the worker. It is pure memory
~~~~~~

Line 272

~~~~~~text
// work with no GL in it, and an HD sheet is millions of pixels
~~~~~~

Line 273

~~~~~~text
// -- doing it on the render thread would stutter the game.
~~~~~~

Line 313

~~~~~~text
/** Copies one frame out of a stacked animation sheet. */
~~~~~~

Line 325

~~~~~~text
// ---------------------------------------------------------------- identity
~~~~~~

Line 331

~~~~~~text
/**
	 * Proves who we are to the service using Mojang's own join/hasJoined
	 * handshake -- the same mechanism auth plugins use. Without this anyone
	 * could equip cosmetics onto someone else's account.
	 */
~~~~~~

Line 346

~~~~~~text
/**
	 * Performs the handshake on the calling thread and returns whether we ended
	 * up with a session. Kept separate from {@link #authenticate} so callers
	 * already running on the pool can use it directly -- submitting it back to
	 * the pool and waiting would deadlock.
	 */
~~~~~~

Line 354

~~~~~~text
// 1. ask the service for a single-use challenge
~~~~~~

Line 361

~~~~~~text
// 2. sign it with the Mojang-issued key this account holds
~~~~~~

Line 365

~~~~~~text
// 3. hand the proof over for a session token
~~~~~~

Line 381

~~~~~~text
// non-JSON body: the status alone will have to do
~~~~~~

Line 396

~~~~~~text
/**
	 * Sets our own cosmetics, authenticating first if needed. The callback is
	 * told whether it actually saved, so the UI can say so rather than just
	 * going quiet.
	 */
~~~~~~

Line 401

~~~~~~text
/**
	 * Why the last equip failed, or null if it did not.
	 *
	 * <p>Worth separating from a plain false: "check your connection" is the
	 * wrong thing to tell someone whose connection is fine and whose Minecraft
	 * session simply has no signing key.
	 */
~~~~~~

Line 415

~~~~~~text
// Apply locally first so the change is instant on screen; the network
~~~~~~

Line 416

~~~~~~text
// round-trip then confirms it, and puts it back if it failed.
~~~~~~

Line 428

~~~~~~text
// Minecraft hands out no signing key on a session that is not
~~~~~~

Line 429

~~~~~~text
// a live online one, which is what a stale launcher token
~~~~~~

Line 430

~~~~~~text
// looks like from in here.
~~~~~~

Line 442

~~~~~~text
// the session may simply have aged out; one retry with a fresh one
~~~~~~

Line 453

~~~~~~text
// it did not stick: show the truth again rather than a lie
~~~~~~

Line 461

~~~~~~text
/** True when something in the pipeline has actually gone wrong. */
~~~~~~

Line 466

~~~~~~text
/**
	 * A compact status line for on-screen diagnosis. Reading logs off this
	 * machine has proven unreliable, so the state is shown in the UI instead.
	 */
~~~~~~

Line 484

~~~~~~text
// The feature renderer refuses to draw a cape before it ever looks at
~~~~~~

Line 485

~~~~~~text
// the texture: the skin's cape part must be on, you must not be
~~~~~~

Line 486

~~~~~~text
// invisible, and an elytra takes the slot. Worth showing, because all
~~~~~~

Line 487

~~~~~~text
// three look identical from the outside -- nothing renders, and every
~~~~~~

Line 488

~~~~~~text
// other line here says everything is fine.
~~~~~~

Line 503

~~~~~~text
// ---------------------------------------------------------------- plumbing
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/EmoteFavourites.java

Line 14

~~~~~~text
/**
 * The emotes chosen for the wheel.
 *
 * <p>Thirty emotes will not fit on a radial menu and would be unusable if they
 * did, so the wheel carries only what you pick: right-click an emote in the
 * cosmetics menu to add or remove it. Kept in its own small file rather than
 * the module config so it stays readable and hand-editable.
 */
~~~~~~

Line 39

~~~~~~text
// A sensible starter set, so the wheel is never empty on first use.
~~~~~~

Line 51

~~~~~~text
// unreadable: carry on with whatever is in memory
~~~~~~

Line 65

~~~~~~text
/** Adds or removes an emote from the wheel. Returns its new state. */
~~~~~~

Line 81

~~~~~~text
/** Chosen emotes in registry order, so the wheel keeps a stable layout. */
~~~~~~

Line 98

~~~~~~text
// best effort; the in-memory set still works this session
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/EmotePlayer.java

Line 10

~~~~~~text
/**
 * Tracks which emote each player is currently performing.
 *
 * <p>This is the state the model animation reads every frame. It is kept
 * separate from the animation itself so that the same store works whether the
 * emote was started locally or arrived from another player over the network.
 */
~~~~~~

Line 19

~~~~~~text
/** Fallback length for an emote with no declared duration. */
~~~~~~

Line 22

~~~~~~text
/** One in-flight emote. */
~~~~~~

Line 28

~~~~~~text
/** Elapsed seconds, so repeating motion runs at a constant rate. */
~~~~~~

Line 33

~~~~~~text
/** 0..1 through the emote, for the animation to interpolate against. */
~~~~~~

Line 42

~~~~~~text
/** Where each emoting player stood when they started, as {x, y, z}. */
~~~~~~

Line 45

~~~~~~text
/**
	 * How far a player may drift from where they started before the emote is
	 * cancelled, in blocks.
	 *
	 * <p>Comfortably above the jitter a standing player picks up from server
	 * corrections, and comfortably below the 0.2 blocks a single walking tick
	 * covers -- so it never trips on its own but stops the moment you step.
	 */
~~~~~~

Line 57

~~~~~~text
/** Starts an emote on the local player. */
~~~~~~

Line 62

~~~~~~text
// TODO: announce to the service so other Daylight players see it
~~~~~~

Line 65

~~~~~~text
/** Starts an emote on any player, local or remote. */
~~~~~~

Line 73

~~~~~~text
/**
	 * Cancels the emote of anyone who has moved.
	 *
	 * <p>Checked from their position rather than from key presses so it works
	 * the same for every player, not just the one at this keyboard, and so
	 * being knocked back or falling counts as moving too. A player in a boat or
	 * on a horse is left alone: they are being carried, not walking.
	 */
~~~~~~

Line 111

~~~~~~text
/** The emote this player is performing, or null. Expired ones are cleared. */
~~~~~~

Line 128

~~~~~~text
/** Cancels every running emote, e.g. on disconnect. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/Emotes.java

Line 12

~~~~~~text
/**
 * The built-in emote animations.
 *
 * <p>Each one is a function of progress (0..1 through the emote) that poses the
 * player model directly. Writing them as maths rather than keyframe tables
 * keeps them short and makes looping motion -- waving, clapping, dancing --
 * naturally smooth without interpolation machinery.
 *
 * <p>These are ordinary gestures written from scratch. Adding a new one is a
 * single entry here plus a catalog row on the service.
 */
~~~~~~

Line 25

~~~~~~text
/**
	 * Poses the model for one frame.
	 *
	 * @param progress 0..1 through the emote, for easing in and out
	 * @param seconds  elapsed seconds, so repeating motion runs at a fixed
	 *                 speed instead of stretching to fit the emote's length
	 */
~~~~~~

Line 36

~~~~~~text
/**
	 * Moves the whole player, rather than a limb.
	 *
	 * <p>Some emotes cannot be expressed by rotating parts: turning the body
	 * part yaws the torso away from the legs and head instead of turning the
	 * player, and sitting needs the model lowered, not just the legs bent.
	 * Those get a root transform applied before the model draws. It may leave
	 * the hitbox -- this is appearance only and affects nothing else.
	 */
~~~~~~

Line 49

~~~~~~text
/** One emote: how it moves, how long it runs, and any whole-body motion. */
~~~~~~

Line 57

~~~~~~text
/**
	 * Eases in at the start and out at the end, holding full strength between.
	 * A sine over the whole emote would make a long one spend all its time
	 * ramping, which reads as sluggish rather than deliberate.
	 */
~~~~~~

Line 70

~~~~~~text
/** A sine at a fixed rate in cycles per second, independent of length. */
~~~~~~

Line 76

~~~~~~text
// --- greetings ---
~~~~~~

Line 99

~~~~~~text
// --- reactions ---
~~~~~~

Line 127

~~~~~~text
// There is no elbow to fold, and rolling the arm far enough to fake
~~~~~~

Line 128

~~~~~~text
// one swings its top corner clean out of the shoulder. So the shrug
~~~~~~

Line 129

~~~~~~text
// reads the way a real one does: shoulders up, hands turned out.
~~~~~~

Line 147

~~~~~~text
// --- gestures ---
~~~~~~

Line 157

~~~~~~text
// arms up and out, hands drawn back in -- as close to a double
~~~~~~

Line 158

~~~~~~text
// biceps as a model with no elbows gets
~~~~~~

Line 169

~~~~~~text
// --- longer performances ---
~~~~~~

Line 194

~~~~~~text
// --- yes / no ---
~~~~~~

Line 219

~~~~~~text
// --- moods ---
~~~~~~

Line 252

~~~~~~text
// lying on the back: the head lolls to one side and the chest rises
~~~~~~

Line 266

~~~~~~text
// --- workout ---
~~~~~~

Line 278

~~~~~~text
// face down with the arms planted: they point at the floor, which is
~~~~~~

Line 279

~~~~~~text
// straight out of the chest once the whole body is tipped over.
~~~~~~

Line 290

~~~~~~text
// the dip rides on the root, so the body stays straight and pivots
~~~~~~

Line 291

~~~~~~text
// at the feet the way it actually would
~~~~~~

Line 319

~~~~~~text
// --- performances ---
~~~~~~

Line 341

~~~~~~text
// stepped rather than smooth, which is what sells it as mechanical
~~~~~~

Line 359

~~~~~~text
// tucked at the apex, extended at take-off and landing
~~~~~~

Line 367

~~~~~~text
// rise, turn a full somersault about the waist, come back down.
~~~~~~

Line 368

~~~~~~text
// Up is positive here: the renderer's flip happens after this.
~~~~~~

Line 404

~~~~~~text
/** An emote performed sitting: the model drops by {@code drop} blocks. */
~~~~~~

Line 407

~~~~~~text
// Down is negative: at this point in the render the model has not been
~~~~~~

Line 408

~~~~~~text
// flipped yet, so the stack still has Y pointing up.
~~~~~~

Line 413

~~~~~~text
/**
	 * An emote performed on the floor: the model tips over about its own feet.
	 *
	 * <p>The small lift is applied outside the rotation so it raises the body
	 * clear of the ground instead of skewing it, and {@code faceDown} decides
	 * which way it falls -- forwards onto the chest, or backwards onto the back.
	 */
~~~~~~

Line 430

~~~~~~text
// The bend an animation asked for, applied once the whole pose is set. Held
~~~~~~

Line 431

~~~~~~text
// aside rather than applied immediately so an animation can call bend() in
~~~~~~

Line 432

~~~~~~text
// any order without a later limb assignment wiping it out. Rendering is
~~~~~~

Line 433

~~~~~~text
// single threaded, so one slot is enough.
~~~~~~

Line 436

~~~~~~text
/**
	 * Bends the upper body at the waist.
	 *
	 * <p>Rotating the torso part alone does not do this: the model's parts are
	 * siblings rather than a chain, so the head stays hanging in the air and the
	 * arms stay back at the old shoulder line, and the player comes apart at the
	 * waist. Use this instead of touching {@code body} directly.
	 */
~~~~~~

Line 450

~~~~~~text
/**
	 * Raises the shoulders by {@code lift} model units.
	 *
	 * <p>Shrugging and flexing are shoulder movements, and without this the only
	 * way to suggest one is to rotate the arm so far that it leaves the body.
	 */
~~~~~~

Line 460

~~~~~~text
/**
	 * Applies whatever bend the pose asked for, keeping the player in one piece.
	 *
	 * <p>Everything above the waist turns together, and each part's origin is
	 * moved to wherever the bend carries it, so the neck stays on the shoulders
	 * and the shoulders stay on the torso.
	 */
~~~~~~

Line 473

~~~~~~text
// The waist is the top of the legs. Read it from the model rather
~~~~~~

Line 474

~~~~~~text
// than hard-coding it, so this survives the numbers ever moving.
~~~~~~

Line 482

~~~~~~text
// Up is negative: the model's own space has Y running downwards.
~~~~~~

Line 489

~~~~~~text
/** Turns one part about the waist rather than about its own origin. */
~~~~~~

Line 496

~~~~~~text
// A part composes its rotation as roll, then yaw, then pitch, so a point
~~~~~~

Line 497

~~~~~~text
// riding on it moves the other way round: pitch first.
~~~~~~

Line 520

~~~~~~text
/** The emote for an id, or null when we do not know it. */
~~~~~~

Line 525

~~~~~~text
/** How long this emote should run, or a sensible default. */
~~~~~~

Line 531

~~~~~~text
/** Display name for an id. */
~~~~~~

Line 537

~~~~~~text
/** Every built-in emote id, in a sensible display order. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/Identity.java

Line 24

~~~~~~text
/**
 * Proves to the cosmetics service which account this client is.
 *
 * <p>Mojang blocks Cloudflare, so the service cannot ask them whether we really
 * are who we claim. Instead we use the keypair Mojang issues every account:
 * Mojang has already signed our public key, and only we hold the matching
 * private key. Signing the service's one-time challenge with it proves both
 * things at once, and the service can check it without contacting anyone.
 */
~~~~~~

Line 35

~~~~~~text
/** Everything the service needs to check us. */
~~~~~~

Line 41

~~~~~~text
/**
	 * Builds a proof for the given challenge, or null when this client has no
	 * usable certificate -- offline accounts and expired keys included.
	 * Blocking: only call this off the render thread.
	 */
~~~~~~

Line 51

~~~~~~text
// offline account: nothing to prove with
~~~~~~

Line 56

~~~~~~text
// The game only gets a keypair when its own user API service came
~~~~~~

Line 57

~~~~~~text
// up online, and it falls back to offline silently. The launcher
~~~~~~

Line 58

~~~~~~text
// has a freshly refreshed token and no such fallback, so ask it.
~~~~~~

Line 76

~~~~~~text
// X.509 DER
~~~~~~

Line 77

~~~~~~text
// Mojang's signature
~~~~~~

Line 85

~~~~~~text
/**
	 * Builds the proof from a certificate the launcher fetched for us.
	 *
	 * <p>Same certificate, same signature, same check at the far end -- the only
	 * difference is who asked Mojang for it. Nothing leaves this machine: the
	 * bridge is loopback-only and gated on a per-launch secret.
	 */
~~~~~~

Line 95

~~~~~~text
// not launched by us
~~~~~~

Line 134

~~~~~~text
/** Why the launcher could not supply a certificate, for diagnosis. */
~~~~~~

Line 137

~~~~~~text
/** Short reason the last attempt produced nothing, for on-screen diagnosis. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/cosmetic/WardrobePreview.java

Line 13

~~~~~~text
/** A wardrobe-only entity. Never added to the world, never sends equipment or emote changes. */
~~~~~~

Line 64

~~~~~~text
// Same aura emitter positions, projected into the viewport; bounded history, no world particles.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/DaylightClient.java

Line 38

~~~~~~text
// Start the cosmetics client: catalog pull plus the batched lookup loop.
~~~~~~

Line 41

~~~~~~text
// Persist module state + settings on quit, so toggles survive a
~~~~~~

Line 42

~~~~~~text
// relaunch even when changed by keybind (which never opens the GUI).
~~~~~~

Line 61

~~~~~~text
// A "Fix Session" button in the title-screen top-left — cures an
~~~~~~

Line 62

~~~~~~text
// expired login ("Invalid session") in place via the launcher bridge.
~~~~~~

Line 63

~~~~~~text
// Added through Fabric's screen API so it coexists with other mods that
~~~~~~

Line 64

~~~~~~text
// touch the title screen (e.g. Essential).
~~~~~~

Line 77

~~~~~~text
// One HUD element draws every enabled Daylight HUD module and runs
~~~~~~

Line 78

~~~~~~text
// per-frame logic (CPS sampling, zoom) at frame resolution.
~~~~~~

Line 82

~~~~~~text
// Wrap Minecraft's own HUD pieces so the Vanilla HUD module can move or
~~~~~~

Line 83

~~~~~~text
// hide them. Registered once here; the wrappers pass through while the
~~~~~~

Line 84

~~~~~~text
// module is off.
~~~~~~

Line 87

~~~~~~text
// Hide the vanilla crosshair while the custom Crosshair module draws its own.
~~~~~~

Line 105

~~~~~~text
// The wheel is a toggle: it stays open so you can look before
~~~~~~

Line 106

~~~~~~text
// choosing, and closes when you pick one or press the key again.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/gui/ClickGuiScreen.java

Line 23

~~~~~~text
/**
 * The Daylight module GUI (Right Shift), Lunar-style: category chips, search,
 * and a card grid with big ENABLED/DISABLED state bars. HUD elements stay
 * drag-and-drop anywhere outside the panel.
 */
~~~~~~

Line 30

~~~~~~text
// layout: base sizes, multiplied by the user's GUI scale each frame
~~~~~~

Line 49

~~~~~~text
/** Recomputes the layout from the persisted GUI scale. */
~~~~~~

Line 61

~~~~~~text
// palette
~~~~~~

Line 74

~~~~~~text
// null = ALL
~~~~~~

Line 76

~~~~~~text
// module whose options panel is open
~~~~~~

Line 83

~~~~~~text
// panel hidden so HUD can be dragged freely
~~~~~~

Line 90

~~~~~~text
// options-panel editing state
~~~~~~

Line 100

~~~~~~text
// hit regions rebuilt every frame
~~~~~~

Line 104

~~~~~~text
// [Rect, Category|null]
~~~~~~

Line 105

~~~~~~text
// [Rect, Module]
~~~~~~

Line 106

~~~~~~text
// [Rect, Setting]
~~~~~~

Line 107

~~~~~~text
// [Rect, channel]
~~~~~~

Line 237

~~~~~~text
/** Only the visible FPS/keys/crosshair cards render live previews. No textures or tasks are created here. */
~~~~~~

Line 267

~~~~~~text
/** Settings in display order: ungrouped first, then each subcategory. */
~~~~~~

Line 316

~~~~~~text
// A colour takes over the panel body while it is being edited.
~~~~~~

Line 410

~~~~~~text
/** R/G/B/A sliders plus a chroma toggle. No shaders, so it works everywhere. */
~~~~~~

Line 456

~~~~~~text
/** Sets a slider from an x position on its track. */
~~~~~~

Line 511

~~~~~~text
// HUD-edit mode: the whole screen is a drag surface
~~~~~~

Line 530

~~~~~~text
// options panel captures all clicks while open
~~~~~~

Line 541

~~~~~~text
// the colour editor owns the body while it is open
~~~~~~

Line 572

~~~~~~text
// right-click is the "undo" gesture: unbind a key, step a mode back
~~~~~~

Line 586

~~~~~~text
// A pixel canvas is edited in its own screen, not cycled in place.
~~~~~~

Line 649

~~~~~~text
// swallow panel clicks
~~~~~~

Line 651

~~~~~~text
// outside the panel: grab a HUD element
~~~~~~

Line 666

~~~~~~text
/** Closes the options panel and drops any half-finished edit with it. */
~~~~~~

Line 677

~~~~~~text
/** The live row rectangle for a setting, or null when it scrolled away. */
~~~~~~

Line 755

~~~~~~text
// do not type into search behind the panel
~~~~~~

Line 765

~~~~~~text
// capturing a keybind swallows everything except escape, which clears it
~~~~~~

Line 788

~~~~~~text
// return to the menu instead of closing
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/gui/CosmeticsScreen.java

Line 17

~~~~~~text
/**
 * The cosmetics wardrobe: browse everything published to the catalog and wear
 * any of it. Equipping goes through the service, so other Daylight players see
 * the change wherever they are.
 */
~~~~~~

Line 49

~~~~~~text
// [Rect, index]
~~~~~~

Line 50

~~~~~~text
// [Rect, id|null]
~~~~~~

Line 55

~~~~~~text
/** Emote currently being shown in the preview, so hover does not restart it. */
~~~~~~

Line 74

~~~~~~text
/** What we currently believe we are wearing. */
~~~~~~

Line 81

~~~~~~text
/** Built-in emotes, named by the catalog where it has an entry. */
~~~~~~

Line 97

~~~~~~text
/**
	 * Built-in auras, named by the catalog where it has an entry.
	 *
	 * <p>Auras are drawn by the client rather than downloaded, so the list is
	 * whatever this build can draw -- but a catalog row still wins on the name,
	 * so one can be renamed without shipping a new jar.
	 */
~~~~~~

Line 152

~~~~~~text
// tabs
~~~~~~

Line 168

~~~~~~text
// grid
~~~~~~

Line 188

~~~~~~text
// +1 for the None card
~~~~~~

Line 194

~~~~~~text
// "None" always comes first, so unequipping is never hidden behind scroll
~~~~~~

Line 201

~~~~~~text
// Emotes are not worn, so what lights one up is whether it is on the
~~~~~~

Line 202

~~~~~~text
// wheel -- otherwise right-clicking one looks like it did nothing.
~~~~~~

Line 220

~~~~~~text
// Only surfaced when something is actually wrong: when it all works this
~~~~~~

Line 221

~~~~~~text
// is noise, but when it does not it is the difference between a useful
~~~~~~

Line 222

~~~~~~text
// report and "it doesn't work".
~~~~~~

Line 229

~~~~~~text
/** Hover previews are local only; click is the explicit equip/perform action. */
~~~~~~

Line 293

~~~~~~text
// Right-click on an emote adds or removes it from the wheel.
~~~~~~

Line 324

~~~~~~text
// An emote is performed, not worn: clicking one plays it and closes,
~~~~~~

Line 325

~~~~~~text
// which is what people expect from a list of emotes.
~~~~~~

Line 328

~~~~~~text
// clear the preview first: this one was asked for, so close()
~~~~~~

Line 329

~~~~~~text
// must not cancel it on the way out
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/gui/CrosshairEditorScreen.java

Line 13

~~~~~~text
/**
 * Lunar-style crosshair painter: a grid of clickable boxes, one per crosshair
 * pixel. Left-click toggles a box, right-click erases, and holding either
 * button paints across the grid. The side column previews the result at the
 * exact size the HUD will draw it.
 */
~~~~~~

Line 47

~~~~~~text
/** While a mouse button is held, every cell dragged over takes this value. */
~~~~~~

Line 77

~~~~~~text
// Cell size follows the GUI scale, then shrinks if the grid would not fit.
~~~~~~

Line 129

~~~~~~text
// grid lines, so every cell reads as its own clickable box
~~~~~~

Line 135

~~~~~~text
// ---- side column ----
~~~~~~

Line 148

~~~~~~text
// pixel-size stepper
~~~~~~

Line 200

~~~~~~text
/** Paints the cell under the cursor, if any. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/gui/EmoteWheelScreen.java

Line 15

~~~~~~text
/**
 * Radial emote picker. Press the keybind to open, point at a slice and click
 * to play it. Pressing the key again or Escape closes without playing.
 *
 * <p>Selection is by angle rather than by hit-testing a shape, so the whole
 * screen is live -- you never have to land the cursor precisely on a wedge,
 * which is what makes a wheel feel quick.
 */
~~~~~~

Line 45

~~~~~~text
// Only what the player chose in the cosmetics menu: a wheel of thirty
~~~~~~

Line 46

~~~~~~text
// would be unusable, and picking is what makes it personal.
~~~~~~

Line 55

~~~~~~text
/** Fires whatever is under the cursor, then closes. */
~~~~~~

Line 78

~~~~~~text
// which slice the cursor points at, by angle from centre
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/CameraMixin.java

Line 12

~~~~~~text
// While freelook is active the camera uses the freelook orbit angles
~~~~~~

Line 13

~~~~~~text
// instead of the player's look direction.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/CapeVisibleMixin.java

Line 12

~~~~~~text
/**
 * Shows a Daylight cape even when the vanilla cape part is switched off.
 *
 * <p>The cape feature renderer checks {@code capeVisible} before it looks at
 * the texture at all, and that flag is the Skin Customization &gt; Cape toggle.
 * A player who has never owned a Mojang cape often has it off and no reason to
 * suspect it, so a Daylight cape silently never draws however correct
 * everything else is.
 *
 * <p>Equipping a cape in the wardrobe is the opt-in, so it wins here. A player
 * with no Daylight cape is left entirely alone -- their setting still governs
 * their Mojang cape, which is what it was for.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/ChatHudMixin.java

Line 12

~~~~~~text
/**
 * Masks player names in incoming chat while Stream/Privacy is on. Every public
 * {@code addMessage} overload funnels through this one, and it only touches the
 * text on its way to the screen.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/ClientWorldPropertiesMixin.java

Line 13

~~~~~~text
// Client-side world properties only — the (integrated) server clock is
~~~~~~

Line 14

~~~~~~text
// a different object and keeps running normally.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/EntityLookMixin.java

Line 14

~~~~~~text
// While freelook is active, mouse deltas steer the freelook camera and
~~~~~~

Line 15

~~~~~~text
// never reach the player entity (same 0.15 factor vanilla uses).
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/EntityRendererNameMixin.java

Line 18

~~~~~~text
/**
 * The one place Daylight touches player nametags. Both the Nametag module and
 * Stream/Privacy's name masking run through here, so they cannot fight over
 * the same render path.
 *
 * <p>Hiding is done by refusing the label rather than returning a null name,
 * which keeps the caller's own null handling untouched.
 */
~~~~~~

Line 31

~~~~~~text
// already hidden, nothing to do
~~~~~~

Line 56

~~~~~~text
// privacy masking first, so anything appended below is never a real name
~~~~~~

Line 77

~~~~~~text
// The badge goes on last and outside the name's own style, so a tinted
~~~~~~

Line 78

~~~~~~text
// or masked name cannot recolour the mark or shift its font.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/GameRendererFovMixin.java

Line 12

~~~~~~text
/** Overrides the render FOV with the FOV Changer module's value when enabled. */
~~~~~~

Line 18

~~~~~~text
// Let Zoom win while it's active, otherwise it can't override our FOV.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/HeldItemRendererMixin.java

Line 9

~~~~~~text
/**
 * Old Animations: force the equip progress to 0 so the raise/lower bob is gone
 * and items switch instantly (1.7-style). We keep applyEquipOffset running so
 * the item's base position stays correct — cancelling it entirely dropped the
 * item to the camera origin.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/InteractionManagerMixin.java

Line 14

~~~~~~text
/**
 * Feeds Reach Display + Combo Counter from the local player's own attacks.
 * Purely client-side: measures the true reach (eye to where the look ray meets
 * the target's hitbox), not the inflated center-to-center distance, so the
 * readout reflects a legit ~3-block reach and nothing is sent to the server.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/MinecraftClientAccessor.java

Line 9

~~~~~~text
/**
 * Lets Daylight swap the live login session so its "Fix session" button can
 * replace a stale access token in place — {@code session} is private final.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/PlayerListHudMixin.java

Line 12

~~~~~~text
/**
 * Masks player names in the tab list while Stream/Privacy is on, and marks
 * everyone running Daylight with the badge.
 */
~~~~~~

Line 22

~~~~~~text
// Masking first: the badge must never end up in front of a real name
~~~~~~

Line 23

~~~~~~text
// that privacy was supposed to have hidden.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/PlayerModelEmoteMixin.java

Line 15

~~~~~~text
/**
 * Poses the player model while an emote is playing.
 *
 * <p>Runs after vanilla has set its own angles, so the emote simply overwrites
 * the limbs it cares about and leaves everything else — held items, head
 * tracking on parts it does not touch — behaving normally.
 *
 * <p>The outer layers (sleeves, trousers, jacket) are copied again afterwards:
 * vanilla copies them from the arms during its own pass, so without this they
 * would keep the pre-emote pose and visibly detach from the limbs.
 */
~~~~~~

Line 46

~~~~~~text
// Any waist bend the pose asked for, applied now that the pose is whole:
~~~~~~

Line 47

~~~~~~text
// it moves the head and arms with the torso so the player does not come
~~~~~~

Line 48

~~~~~~text
// apart at the waist.
~~~~~~

Line 51

~~~~~~text
// The outer skin layers need nothing here: the jacket is a child of the
~~~~~~

Line 52

~~~~~~text
// body, each sleeve a child of its arm, and so on, so they already ride
~~~~~~

Line 53

~~~~~~text
// along with whatever we just did. Copying the parent's transform onto
~~~~~~

Line 54

~~~~~~text
// them applies it a second time and tears the layer off the limb.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/PlayerSkinMixin.java

Line 13

~~~~~~text
/**
 * Swaps in a Daylight cape by rewriting the skin record the renderer reads.
 *
 * <p>Vanilla still does the drawing, so the cape behaves exactly as it always
 * has and keeps working with elytra, armour and every other feature that
 * inspects the skin -- this only changes which image it uses.
 *
 * <p>The replacement uses Minecraft's own {@code TextureAssetInfo} rather than
 * a hand-rolled implementation of the interface: anything downstream that casts
 * to the concrete record would fail on a foreign class.
 */
~~~~~~

Line 34

~~~~~~text
// Both ids, deliberately. The renderer binds texturePath(), and the
~~~~~~

Line 35

~~~~~~text
// one-argument constructor derives that as "textures/<path>.png" -- a
~~~~~~

Line 36

~~~~~~text
// resource-pack lookup, which a texture registered at runtime will
~~~~~~

Line 37

~~~~~~text
// never satisfy. Passing the id twice points it at what we registered.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/PlayerTransformEmoteMixin.java

Line 16

~~~~~~text
/**
 * Applies an emote's whole-body motion, for the ones that cannot be expressed
 * by rotating limbs alone.
 *
 * <p>Turning the body model part yaws the torso away from the legs and head
 * rather than turning the player, and sitting needs the model lowered rather
 * than only the legs bent — so spins, flips and floor poses move the root here
 * instead. Runs after vanilla's own transforms, so it stacks on top of them.
 *
 * <p>These transforms can carry the model outside its hitbox. That is
 * deliberate: it is appearance only and changes nothing about collision,
 * hit detection or what the server sees.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/mixin/WorldWeatherMixin.java

Line 14

~~~~~~text
// Guarded to the client world instance so the integrated server's weather
~~~~~~

Line 15

~~~~~~text
// logic is never affected — this is a visual override only.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/HudModule.java

Line 8

~~~~~~text
/**
 * A module that draws something on the in-game HUD at a draggable position.
 *
 * <p>Every HUD module inherits a full set of styling options -- scale,
 * background, colours, padding, corner radius, border -- so anything that
 * appears on screen can be customised in the same place and in the same way,
 * without each module reimplementing it.
 */
~~~~~~

Line 27

~~~~~~text
// ---- shared styling, filed under one subcategory in the options panel ----
~~~~~~

Line 65

~~~~~~text
/** The user's scale as a multiplier. */
~~~~~~

Line 70

~~~~~~text
/** On-screen size once scaled -- what dragging and outlines must hit-test against. */
~~~~~~

Line 79

~~~~~~text
/** Background colour, transparent when switched off or while Glass HUD is on. */
~~~~~~

Line 97

~~~~~~text
/** Draws the styled backdrop for an element of the given size. */
~~~~~~

Line 110

~~~~~~text
/** Draws a single-line text pill, the common HUD module shape. */
~~~~~~

Line 127

~~~~~~text
/**
	 * Keeps the element on screen. Uses the scaled size, so a large element
	 * cannot be dragged half off the edge.
	 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/Module.java

Line 56

~~~~~~text
/** Per-frame update, only runs while in a world. */
~~~~~~

Line 59

~~~~~~text
/** Screen-space overlay drawn for enabled modules (e.g. custom crosshair). */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/ModuleManager.java

Line 53

~~~~~~text
/** Module-GUI zoom, persisted alongside the modules. */
~~~~~~

Line 128

~~~~~~text
// Scale around the element's own corner so it grows in place
~~~~~~

Line 129

~~~~~~text
// rather than drifting toward the screen origin.
~~~~~~

Line 142

~~~~~~text
// ---------- config ----------
~~~~~~

Line 147

~~~~~~text
// first run defaults
~~~~~~

Line 182

~~~~~~text
// "AARRGGBB:chroma", so one key still holds the whole option
~~~~~~

Line 192

~~~~~~text
/* keep default */
~~~~~~

Line 197

~~~~~~text
// corrupt config: keep defaults
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/ArmorModule.java

Line 9

~~~~~~text
/** Armor + held item with durability remaining under each icon. */
~~~~~~

Line 41

~~~~~~text
// green -> gold -> red as it wears
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/BlurModule.java

Line 8

~~~~~~text
/**
 * Blurs the world behind menus.
 *
 * <p>This drives Minecraft's own background-blur pass rather than adding a
 * shader of its own, so it behaves identically on every driver and cannot
 * break the render pipeline. The range matches vanilla's own slider (0-10,
 * default 5) and your value is put back when the module is switched off.
 */
~~~~~~

Line 21

~~~~~~text
/** The player's own blurriness, captured the first time we take over. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/CapeModule.java

Line 8

~~~~~~text
/**
 * Wears a custom cape from a PNG in the game folder's {@code daylight/capes}
 * directory.
 *
 * <p>Client-side for now: you see your own cape. Once the cosmetics backend is
 * running, {@link CapeManager#capeFor} answers for other players too and
 * everyone on Daylight sees each other, whatever server they are on. Capes are
 * curated -- they are assigned to accounts, not uploaded by players.
 */
~~~~~~

Line 21

~~~~~~text
/** File name inside daylight/capes, e.g. "mycape.png". */
~~~~~~

Line 24

~~~~~~text
/** Normal follows vanilla physics, Wavy adds a drift, Static pins it flat. */
~~~~~~

Line 41

~~~~~~text
// pick up a file the user just dropped in, without needing a restart
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/ComboModule.java

Line 8

~~~~~~text
/** Counts consecutive hits you land before the combo window lapses. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/CooldownModule.java

Line 8

~~~~~~text
/** Shows the held item's cooldown (ender pearls, chorus fruit, etc.). */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/CrosshairModule.java

Line 9

~~~~~~text
/** Custom crosshair: shape, size, gap, thickness and color presets. */
~~~~~~

Line 12

~~~~~~text
/** Odd, so the canvas has a true centre cell. */
~~~~~~

Line 29

~~~~~~text
/** Current colour, shared with the editor's live preview. */
~~~~~~

Line 45

~~~~~~text
/**
	 * Paints the user-drawn canvas centred on {@code (cx, cy)}. Shared with the
	 * editor so its preview is pixel-identical to what the HUD draws.
	 */
~~~~~~

Line 67

~~~~~~text
// Custom: user-painted canvas
~~~~~~

Line 76

~~~~~~text
// half thickness offset
~~~~~~

Line 82

~~~~~~text
// left
~~~~~~

Line 83

~~~~~~text
// right
~~~~~~

Line 84

~~~~~~text
// up
~~~~~~

Line 85

~~~~~~text
// down
~~~~~~

Line 90

~~~~~~text
// square outline
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/DirectionHudModule.java

Line 9

~~~~~~text
/** Compass strip showing heading, Lunar DirectionHUD style. */
~~~~~~

Line 14

~~~~~~text
// MC yaw: 0 = South, 90 = West, 180/-180 = North, -90 = East
~~~~~~

Line 32

~~~~~~text
// center marker
~~~~~~

Line 35

~~~~~~text
// degrees visible on each side
~~~~~~

Line 45

~~~~~~text
// minor ticks every 15 degrees
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/DynamicFpsModule.java

Line 7

~~~~~~text
/**
 * Caps the framerate while the game window is unfocused, restoring the
 * player's own limit the moment focus returns. Frees the GPU/CPU when
 * tabbed out with zero change to how the game looks while playing.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/FovModule.java

Line 7

~~~~~~text
/**
 * Locks the field of view to a chosen value (stops sprint/speed FOV shift).
 * Kept inside vanilla's own 30-110 slider range — anything wider reads as a
 * hacked client to other players and to server staff.
 */
~~~~~~

Line 23

~~~~~~text
/** The FOV to force, or null when the module is off (mixin reads this). */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/FreelookModule.java

Line 9

~~~~~~text
/**
 * Hold the freelook key (default V) to orbit a third-person camera with the
 * mouse while your player keeps looking (and walking) the way it was facing.
 * Camera-only — the server never sees a rotation change.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/FullbrightModule.java

Line 8

~~~~~~text
/** Maxes out gamma well past the vanilla slider cap. */
~~~~~~

Line 21

~~~~~~text
// direct field write skips the 0..1 clamp in SimpleOption.setValue
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/GlassModule.java

Line 6

~~~~~~text
/** Glass HUD: makes Daylight HUD module backgrounds transparent. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/HungerModule.java

Line 7

~~~~~~text
/** Numeric food + saturation readout so you know exactly when to eat. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/KeystrokesModule.java

Line 57

~~~~~~text
// W / ASD / space
~~~~~~

Line 70

~~~~~~text
// WASD block plus the two mouse buttons, optionally showing live CPS.
~~~~~~

Line 80

~~~~~~text
// Movement, mouse, and the modifier keys — the "full keyboard" view.
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/NametagModule.java

Line 7

~~~~~~text
/**
 * Nametag customisation. The renderer mixin that already masks names for
 * Stream/Privacy also consults this, so both features share one hook instead
 * of fighting over the same render path.
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/OldAnimationsModule.java

Line 6

~~~~~~text
/**
 * Old 1.7-style item animations: skips the modern equip raise/lower bob so held
 * items switch instantly. The mixin reads {@link #on()}. (1.21.x only.)
 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/PotionHudModule.java

Line 8

~~~~~~text
/** Active potion effects with amplifier and remaining time. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/ReachModule.java

Line 8

~~~~~~text
/** Shows the distance of your most recent hit. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/StreamPrivacyModule.java

Line 7

~~~~~~text
/**
 * Stream / privacy mode: while enabled, Daylight masks sensitive on-screen info
 * so it's safe to record or stream — your coordinates, and every player name in
 * chat, the tab list and nametags.
 *
 * <p>Masking is display-only. Nothing here changes what is sent to the server,
 * so other players still see your real name and chat still reaches them intact.
 */
~~~~~~

Line 19

~~~~~~text
/** Off / one fixed word for everyone / numbered per player. */
~~~~~~

Line 22

~~~~~~text
/** The word masked names are built from. */
~~~~~~

Line 36

~~~~~~text
/** The live instance, or null before {@code ModuleManager.init()} has run. */
~~~~~~

Line 41

~~~~~~text
/** True while coordinates should be hidden. */
~~~~~~

Line 46

~~~~~~text
/** True while player names should be replaced anywhere. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/TimeChangerModule.java

Line 8

~~~~~~text
/** Client-side world time override — the server clock is untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off; otherwise a fixed time of day in ticks, read by the mixin. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/VanillaHudModule.java

Line 14

~~~~~~text
/**
 * Moves and hides Minecraft's own HUD pieces.
 *
 * <p>Each vanilla element is wrapped rather than reimplemented: the original
 * draw call still runs, just skipped when hidden or wrapped in a translation
 * when offset. That means the elements keep looking exactly like vanilla and
 * keep working with resource packs and other mods that also touch them.
 */
~~~~~~

Line 26

~~~~~~text
/** One vanilla element and the three options that control it. */
~~~~~~

Line 65

~~~~~~text
/**
	 * Wraps every vanilla element once, at client init. The wrappers stay in
	 * place for the whole session and simply pass through while the module is
	 * off, so toggling it never has to re-register anything.
	 */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/WeatherChangerModule.java

Line 8

~~~~~~text
/** Client-side weather override — visuals only, gameplay untouched. */
~~~~~~

Line 11

~~~~~~text
/** -1 = off, 0 = clear, 1 = rain, 2 = thunder; read by the mixin. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/modules/ZoomModule.java

Line 8

~~~~~~text
/** Hold the zoom key (default C) to zoom in, Lunar/OptiFine style. */
~~~~~~

Line 22

~~~~~~text
/** True while the zoom key is held — the FOV Changer defers to this. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/module/Setting.java

Line 3

~~~~~~text
/** A configurable module option, shown in the GUI options panel. */
~~~~~~

Line 9

~~~~~~text
/** Optional subcategory header this option is filed under in the GUI. */
~~~~~~

Line 17

~~~~~~text
/** Files this option under a subcategory heading. Returns itself, so it chains. */
~~~~~~

Line 28

~~~~~~text
/** True when the option needs its own editor rather than a click to cycle. */
~~~~~~

Line 33

~~~~~~text
/** Advance to the next value (left-click in the options panel). */
~~~~~~

Line 36

~~~~~~text
/** Display string for the current value. */
~~~~~~

Line 86

~~~~~~text
/**
	 * A square pixel canvas the user paints in a dedicated editor screen
	 * (see {@code PixelGridScreen}). Row-major, {@code size * size} cells.
	 */
~~~~~~

Line 121

~~~~~~text
/** A plain four-arm cross, so "Custom" is never blank on first use. */
~~~~~~

Line 135

~~~~~~text
/** Compact form: {@code "<size>:<0/1 per cell>"}. */
~~~~~~

Line 143

~~~~~~text
/** Restores {@link #encode()} output; ignores data saved at a different size. */
~~~~~~

Line 158

~~~~~~text
/** Editing happens in its own screen, so a row click is not a value cycle. */
~~~~~~

Line 163

~~~~~~text
/** An ARGB colour with an optional cycling-rainbow mode. */
~~~~~~

Line 174

~~~~~~text
/** The colour to actually draw with, resolving chroma at the current time. */
~~~~~~

Line 200

~~~~~~text
/** A rebindable key, stored as a raw GLFW key code. */
~~~~~~

Line 219

~~~~~~text
/**
		 * A readable name for a GLFW key. Uses GLFW's own name for printable
		 * keys and a table for the rest, which keeps this identical on every
		 * Minecraft version instead of depending on their key mappings.
		 */
~~~~~~

Line 257

~~~~~~text
// no GLFW context yet - fall through to the numeric form
~~~~~~

Line 263

~~~~~~text
/** A short free-text value, typed in the options panel. */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/privacy/NameMasker.java

Line 19

~~~~~~text
/**
 * Replaces player names for display while Stream/Privacy is masking names.
 *
 * <p>Numbers are handed out in the order players are first seen and kept for
 * the rest of the session, so "Player 3" stays "Player 3". Everything here is
 * display-side only — no masked string ever reaches the server.
 */
~~~~~~

Line 47

~~~~~~text
/** The masked form of one player, or {@code original} when it stays visible. */
~~~~~~

Line 72

~~~~~~text
/** Masked name for a tab-list entry, styled like the original. */
~~~~~~

Line 81

~~~~~~text
/** Chat text with names masked, or unchanged when chat masking is off. */
~~~~~~

Line 86

~~~~~~text
/**
	 * Nametag text with names masked. Used on the versions whose renderer takes
	 * the label as an argument rather than exposing a display-name method; going
	 * through the name table means only real player names are touched.
	 */
~~~~~~

Line 95

~~~~~~text
/**
	 * Rewrites every known player name inside a piece of text, keeping the
	 * original colours and formatting of each run.
	 */
~~~~~~

Line 115

~~~~~~text
/** Real name (and server-set display name) to masked name, for everyone online. */
~~~~~~

Line 138

~~~~~~text
/** Longest names first, so "Bob" never chews a hole in "Bobby". */
~~~~~~

## daylight-mod-1.21.11/src/client/java/gg/daylight/client/render/Render.java

Line 5

~~~~~~text
/**
 * Daylight's drawing helper: every shape, colour and transform the HUD and the
 * menus use goes through here.
 *
 * <p>It exists so the per-version differences in Minecraft's draw layer live in
 * exactly one file. Only the four transform methods below actually change
 * between eras -- 1.21.9+ hands out a JOML matrix stack, older versions a
 * MatrixStack, and the pre-1.20 trees reach it through the Gfx shim -- so
 * porting the whole render surface to a new version is a four-method job.
 */
~~~~~~

Line 19

~~~~~~text
// ---------- transforms ----------
~~~~~~

Line 37

~~~~~~text
/**
	 * Scales around a pivot, so a HUD element grows from its own corner instead
	 * of sliding toward the screen origin.
	 */
~~~~~~

Line 47

~~~~~~text
// ---------- colour ----------
~~~~~~

Line 53

~~~~~~text
/** Same colour at a different opacity, 0..1. */
~~~~~~

Line 63

~~~~~~text
/** A cycling rainbow, one full turn every {@code periodMs}. */
~~~~~~

Line 70

~~~~~~text
/** Blends {@code from} toward {@code to}; t is 0..1. Alpha blends too. */
~~~~~~

Line 80

~~~~~~text
// ---------- shapes ----------
~~~~~~

Line 101

~~~~~~text
/**
	 * A rounded rectangle built from horizontal spans -- one per row of the
	 * corner arcs, a single fill for the middle. No shader and no texture, so it
	 * behaves the same on every version and every driver.
	 */
~~~~~~

Line 113

~~~~~~text
// straight middle section
~~~~~~

Line 116

~~~~~~text
// how far this row is inset from the edge, from the circle equation
~~~~~~

Line 127

~~~~~~text
// punch the middle back out with full transparency by redrawing nothing:
~~~~~~

Line 128

~~~~~~text
// callers draw the fill first, so an outline is the ring only.
~~~~~~

Line 133

~~~~~~text
// ---------- text ----------
~~~~~~

Line 158

~~~~~~text
/** Trims to fit a pixel width, adding an ellipsis when it had to cut. */
~~~~~~

Line 165

~~~~~~text
// ---------- clipping ----------
~~~~~~
