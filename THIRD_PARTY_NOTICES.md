# Third-party notices

Altegio UI source code is distributed under the MIT license in LICENSE. Bundled fonts and npm dependencies retain their own licenses.

## Inter

The seven `dist/web/assets/fonts/inter/*.woff2` files are Inter font subsets. Inter is Copyright (c) 2016-2020 The Inter Project Authors and licensed under the SIL Open Font License 1.1. The complete copyright and license notice is included in `licenses/inter-OFL.txt` and applies to those font files, including redistribution inside this package.

Upstream: https://github.com/rsms/inter and https://github.com/rsms/inter/blob/v3.19/LICENSE.txt (verified 2026-11-03). All seven embedded name tables identify version 3.019 (git-0a5106e0b), copyright 2020 The Inter Project Authors, and the OFL URL. The included notice is from upstream v3.19 and also records the Inter trademark. No font files are modified by package assembly.

## Bundled npm code

The public assembly collects license and notice files from the exact installed versions referenced by the build's source maps, including the bundled component CLI dependencies. The resulting `licenses/BUNDLED-DEPENDENCIES.md` identifies each dependency and its accompanying notices. Dependencies installed separately by npm carry their own package notices.

Maskito 3.11.1 npm tarballs omit their license file. `licenses/maskito-LICENSE.txt` preserves the Apache-2.0 license and copyright notice from [the exact upstream v3.11.1 tag](https://github.com/taiga-family/maskito/blob/v3.11.1/LICENSE). The assembly permits this fallback only for the reviewed `@maskito/core` and `@maskito/kit` 3.11.1 versions and fails for an unreviewed missing notice.

Private builds also collect the generated notices under `dist/licenses/`; public tarballs include the top-level `licenses/` notices.

## Icons and other assets

The icon SVG files and generated modules in `dist/web/assets/icons` are part of Altegio UI and covered by LICENSE. Package assembly copies the repository's assets without changing their license. Brand names and marks do not grant permission to imply endorsement.
