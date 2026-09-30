# Little Moments

A personal photobooth: one camera together, or two devices connected directly. Plain HTML, CSS and JavaScript; no packages, backend or paid services. A tiny native Node.js build bundles three character images into the static page.

## Use

Open [Little Moments](https://little-moments-photobooth-chi944s-projects.vercel.app/) — no account or Vercel login is needed. Choose a frame, layout and timer, then open your camera. Capture a three- or four-photo strip or a 2x2 grid. Retake individual shots, apply a filter, add a caption/date, and save a PNG or print. Try sample photos to explore frames without opening a camera.

Photos exist only in the page's memory. Refreshing, resetting or closing loses them. Only clicking Save PNG or Print creates a copy. The app uses no localStorage, IndexedDB, service worker, image uploads, audio or tracking. Camera access requires HTTPS and browser permission. Browser/hosting authentication may maintain its own cookies and browser caches; this app does not control those.

## Two devices

1. Both people open the production app link, open their cameras, and choose the two-device mode.
2. The host creates an invite code and sends it privately to the partner.
3. The partner pastes the invite and selects Accept invite, then sends the generated reply back privately.
4. The host pastes that reply and selects Connect with reply. Wait for both previews before capturing.
5. Each shot combines the two videos side by side. Either person can capture and export their own strip. Disconnect closes the connection.

Codes contain temporary network/session information. Share only with your intended partner. No room server, database or polling is used. Cloudflare's free STUN endpoint helps browsers find a direct WebRTC route. No TURN relay is configured: some school, work, mobile or restrictive networks cannot connect. Try another network if connection fails. Remote video consumes the participants' internet bandwidth, not Vercel image/Blob storage. Switching apps temporarily pauses video; camera-off and closing the page end the connection.

The production app is public to anyone with its link. The GitHub repository stays private, and Vercel Standard Protection still protects preview and generated deployment URLs. Share the production app link above with your partner; neither person needs Vercel access. Photos remain in each browser tab and are never stored by the app on Vercel.

## Frames

Ten frame designs: classic, noir, ribbon, gingham, stars, Cinnamoroll, CRYBABY, HACIPUPU, cats and hearts. Colors, layout, caption and filters are configurable. Cinnamoroll, CRYBABY and HACIPUPU now use detailed transparent official character images instead of hand-drawn approximations. The remaining decorative motifs are drawn with Canvas. This is a personal project, unaffiliated with the character owners; no open redistribution license is claimed.

Artwork credits: [Cinnamoroll © SANRIO](https://corporate.sanrio.co.jp/en/business-info/brands/cinnamoroll/), [CRYBABY © POP MART](https://www.popmart.com/us/products/2233/crybaby-wild-but-cutie-series---vinyl-plush-pendant-blind-box), and [HACIPUPU © POP MART](https://www.popmart.com/us/products/2780/hacipupu-gummy-bear-series-vinyl-plush-pendant-blind-box). The three PNG originals total 26,493 bytes. Build-time embedding adds about 35 KB to the HTML; there are no runtime requests to these sites.

Design research: current [Photomatic frames](https://www.photomatic.co.kr/NOTICE/?page=1), [Photomatic seasonal archive](https://www.photomatic.jp/photobooth/frame/), [Life4Cuts](https://life4cuts.co.uk/), [Sanrio Cinnamoroll](https://corporate.sanrio.co.jp/en/business-info/brands/cinnamoroll/), [POP MART CRYBABY](https://www.popmart.com/us/collection/38/crybaby), and [POP MART HACIPUPU](https://www.popmart.com/us/collection/hacipupu). Current catalog inspiration is not a measured popularity ranking.

## Hosting and free-tier budget

Keep this repository private, the project on Vercel Hobby, and Vercel Authentication set to **Standard Protection**. Under Domains, keep `little-moments-photobooth-chi944s-projects.vercel.app` connected to **Production** so the shared app link opens without login. Standard Protection is [available on all plans](https://vercel.com/docs/deployment-protection) and keeps preview/generated deployment URLs protected. No paid plans, integrations or trials are needed. The app asks search engines not to index it, but this is not access control; anyone with the production link can use it.

| Resource | App usage |
| --- | --- |
| Functions / CPU / function storage | No app functions |
| Blob operations / Blob storage | None |
| Image optimization / image storage | None |
| Database / cron / analytics | None |
| CDN requests and transfer | Small static page loads; captures and exports stay in-browser |
| Deployment storage | Roughly 80 KB static HTML per deployment, plus platform overhead |

These choices minimize this project's usage; they cannot cap usage from other projects or promise zero CDN consumption. Keep deployments infrequent. Hobby pauses affected service when its included limits are exceeded instead of automatically buying paid usage. Account limits and other projects remain visible in Vercel's Usage dashboard.

## Files and verification

- index.html: complete app, Canvas decorations, source artwork metadata and regression checks.
- build.mjs: fetches the three allowlisted PNGs with timeout/type/size validation and embeds them into public/index.html. No packages or functions.
- vercel.json: runs node build.mjs, publishes only public, and sets privacy/security headers.
- README.md: this guide.

Open /?test=1 for the built-in regression checks. They exercise cropping, filter pixels, layout bounds, invite validation, sample artwork, decoded character images, all nine character/layout combinations, failed-artwork handling and PNG encoding without requesting a camera, writing a file or opening a peer connection. Add &peer=1 to the self-check URL to exercise two synthetic video peers, manual SDP exchange, the countdown UI, capture of both video feeds and final PNG encoding without camera permission or file downloads. Real camera permissions, physical devices, printing and two different networks require live-device checks. A same-browser test cannot prove connectivity across every network.

All project source was authored directly in GitHub's web editor; no local project checkout is required. To edit, use GitHub's web editor and commit to main. Vercel automatically builds and deploys the connected branch. The build requires the official source image URLs to remain available; if an artwork fetch fails, the build stops and the previous working production deployment remains live. Keep the project static: do not add server routes or image uploads unless you deliberately revisit the quota budget.
