# JANA.EXE
Personal portfolio built with the existing React, TypeScript, Vite, and CSS architecture.

## Development
- npm install
- npm run dev
- npm run build — TypeScript and production build
- npm run lint — Oxlint
- npm run preview — preview the production build

## Content configuration
Edit src/data/portfolio.ts to add confirmed contact href values, project GitHub/demo URLs, and real screenshots. Screenshot entries require src and meaningful alt text; caption is optional. Place local imagery in public/projects/ and use /projects/filename paths.

Skills are limited to technologies supported by the supplied projects and this codebase. Add further skills only after confirming them.

## Project routes
The dependency-free hash routes are #/projects/gravebloom, #/projects/chloromnesis, and #/projects/candidate-selection. Hash routing supports direct links and browser back/forward on static hosting without rewrite configuration. Home anchors remain #home, #projects, #about, #skills, and #contact.

## Unity WebGL
Gravebloom uses GraveBloomReleaseBuild.zip at #/projects/gravebloom. Deployable files are in public/games/gravebloom/, served at /games/gravebloom/index.html. The cover is public/projects/gravebloom-cover.png. Both original ZIPs and the original cover remain on disk and are ignored by Git.

The release export replaces the development runtime. Its original .data.br, .framework.js.br, and .wasm.br were Brotli-decompressed without changing their contents and deployed under the corresponding uncompressed names. The loader and TemplateData files remain unchanged. The full compressed export, including GraveBloom_BurstDebugInformation_DoNotShip, is preserved in the original release ZIP; debug symbols are not deployed. The previous deployed development build was backed up outside the repository in the system temporary directory.

The exported index.html has integration hooks for progress, readiness after createUnityInstance resolves, runtime error reporting, and inline error guidance instead of blocking alerts. The parent validates message origin and source. Document load alone does not establish readiness.

The original release HTML still specified 960x600. Its canvas defaults and desktop style are now 1920x1080, with portfolio-player.css fitting the actual Unity canvas at 16:9 inside the responsive 16:9 player. Unity matches the rendering resolution to the displayed canvas; the game does not force a 1920-pixel-wide mobile viewport. Fullscreen preserves 16:9 with letterboxing when necessary.

No game document or runtime assets load before Play. Close and navigation away remove the iframe. First launch downloads about 98 MB of uncompressed runtime assets (71,234,781-byte data, 26,317,562-byte wasm, 346,044-byte framework plus loader/template assets); network compression and browser caching can reduce transferred bytes.

Run npm run dev and open http://localhost:5173/#/projects/gravebloom in desktop Chrome or Edge. Wait for Unity initialization, then click the canvas. Exact movement/combat bindings and complete gameplay still require manual verification.

### Hosting requirements
Deploy all of dist after npm run build, including games/gravebloom/Build and TemplateData. Hosting at the domain root is assumed. Preserve the game index's relative paths and serve missing files as 404 instead of rewriting them to portfolio HTML.

The deployed release assets are uncompressed: serve .wasm as application/wasm, .data as application/octet-stream, and .js as text/javascript or application/javascript. No Brotli Content-Encoding is required for these decompressed files. Never label raw bytes br or gzip. If the host compresses dynamically, its Content-Encoding must match the bytes it sends.

To deploy the original .br files instead, restore all three compressed asset URLs and configure Content-Encoding: br along with the underlying MIME types above. Do not mix compressed and uncompressed files under mismatched URLs/headers.

No worker file or shared-memory requirement is identified for this export. Recheck COOP/COEP if replacing it with a threaded export. Verify provider per-file limits, total artifact limits, bandwidth, MIME types, and initialization on the production host before publishing.

## Intro and accessibility
The first visit in each session shows BootSequence → WelcomeScreen → portfolio. Skip or Escape advances the intro. Session storage failures do not block access. There is no replay control. Reduced motion disables visual motion and welcome typing; keyboard focus, a skip link, semantic sections, and responsive text artwork are included.

The original src/assets/ascii/portrait.txt remains unchanged. The rendering helper removes only shared blank margins, preserving every visible character and relative alignment. Container-relative font sizing fits both the available width and height with the original character proportions.

## Assets still needed
Real project screenshots, confirmed repository/demo and contact URLs, and confirmed game controls.
## Courses & certifications
Edit src/data/certifications.ts to maintain the learning records. Each record has a stable id, title, optional issuer, category, completionStatus, optional details, and optional credentialUrl. Completion status is independent of a credential URL; adding a URL does not mark a record verified. Use only real credential URLs.

The six initial entries were supplied without confirmed completion status. Python Essentials still needs its exact level/title and issuer confirmed; Linux Essentials needs its issuer confirmed. No completion dates, credential IDs, or verification claims are inferred. Native details/summary elements provide keyboard-accessible expansion without JavaScript state or dependencies.
## Visual refinements
The Hero retains its two-column composition, with responsive monospace type, a height-and-width-fitted text portrait, a small corner mark, and static scanlines confined to the artwork. Button hover effects apply only to hover-capable fine pointers, and keyboard focus remains visible.

Lower home sections use a single Intersection Observer and native 400ms animations. Content starts visible and stays readable if observation or animation APIs fail. Reduced-motion preference disables reveals; changing that preference cancels active animations. Observers and animations are cleaned up on navigation/unmount. No portrait distortion or animation dependency is added.
### Audio decoding and release exports
The original export was a Development Build; it has now been replaced with the supplied release export. EncodingError / Unable to decode audio data and Loading FSB failed indicate audio decoding failed; they do not establish that the development-build setting caused it. Unity Web audio is AAC. Editor previews may lack the necessary codec: first reproduce in a current desktop Chrome or Edge using http://localhost:5173/#/projects/gravebloom. The integration shows the runtime error inline, reports it to the parent, and provides an external-game link rather than displaying Unity's blocking alert. This does not repair or silence failed audio clips.

For publication, export WebGL with Development Build and Script Debugging disabled. Use a fresh output folder and supply the entire export (index.html, Build, TemplateData and any StreamingAssets), not selected files mixed with the old build. Uncompressed output keeps the current hosting setup simple; compressed exports need matching server headers. A release build removes development diagnostics and is the right publication artifact, but is not a guaranteed audio fix.

If decoding still fails in a desktop browser, investigate bg_MenuMusic and buttonHover in the Unity source project: preview their source files, inspect Web platform import overrides and the exact Editor version, then reimport/rebuild and retest. The portfolio repository contains the exported build, not the Unity audio source/import settings, so those cannot be repaired here without a corrected export or Unity project.

References:
- https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-audio.html
- https://github.com/microsoft/vscode/issues/329811