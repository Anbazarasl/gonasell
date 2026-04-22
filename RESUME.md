# Resume — Gonasell Website

## Status: LIVE on custom domain (https://www.gonasell.com)
- Production: https://www.gonasell.com (apex `gonasell.com` 301s to www)
- Netlify fallback: https://glowing-fenglisu-4f7592.netlify.app
- GitHub: https://github.com/Anbazarasl/gonasell
- Local: /Users/rasulertugrul/Personal Project/gonasell/

## What was done
- Original one-page build from Figma (28 WebP assets, full sections)
- E-commerce video carousel with Cloudinary-hosted MP4 + lightbox modal
- Added galleries to Social Media, Weddings, Music Videos sections (9 new Cloudinary videos)
- Converted 4 wedding photos to WebP @ 80% / max 1600px (~150–220 KB each)
- Per-orientation video modal (16:9 for horizontal, 9:16 for vertical)
- Mobile-safe modal: separate `<video>` element with cache reuse + currentTime sync from inline; iOS unmute fallback
- Replaced 4K Brite/WellDone (83/72 MB) with 1080p versions (12/11 MB) — they wouldn't auto-play on mobile at 4K
- Added Biocell glampule to e-commerce gallery
- Per-gallery slider scope (was scoped to first gallery only)
- Custom domain `gonasell.com` live on Netlify with Let's Encrypt SSL (primary = www)
- Wedding gallery simplified to video-only (4 static images removed)

## Cloudinary
- Cloud: `dkvyimpd6` (account belongs to user)
- Credentials NOT stored in any file. User must paste API Key + Secret in chat to use upload script.
- Upload script: `_transcoded/upload.py` (reads `CLOUDINARY_KEY` + `CLOUDINARY_SECRET` from env)
- Pattern: transcode large files locally with ffmpeg + h264_videotoolbox to fit ~85 MB cap, then signed upload to `/v1_1/dkvyimpd6/video/upload`

## Asset masters
- `webui/` (gitignored) — original 7 GB of source videos and wedding photos
- `_transcoded/` (gitignored) — 1080p web-ready copies that were uploaded
- Root `Brite.mp4` + `WellDone.mp4` (gitignored) — original 4K versions, now superseded by Cloudinary 1080p uploads

## Deploy workflow
1. Edit on `staging` branch
2. Build dist:
   ```bash
   rsync -a --delete \
     --exclude='.git/' --exclude='.netlify/' --exclude='.DS_Store' \
     --exclude='_transcoded/' --exclude='_dist/' --exclude='webui/' --exclude='_uploadlog/' \
     --exclude='/Brite.mp4' --exclude='/WellDone.mp4' --exclude='*.md' \
     ./ _dist/
   ```
3. Preview: `netlify deploy --dir=_dist --message "..."`
4. Promote: `netlify deploy --prod --dir=_dist --message "..."`
5. Merge `staging` → `main`, push

## To continue
Use this exact prompt:
```
I'm working on the Gonasell production studio website at /Users/rasulertugrul/Personal Project/gonasell/.
Read CLAUDE.md and RESUME.md first. Production: https://www.gonasell.com
GitHub: https://github.com/Anbazarasl/gonasell  Cloudinary cloud: dkvyimpd6
Figma source: https://www.figma.com/design/VWksrX92jjo5Ubtr6PXumI/Gonasell?node-id=1-224
```

## Open items / next steps
- **CMS**: Decap (Git-based, free) or Sanity (hosted) — needs Eleventy or similar SSG layer added so HTML becomes data-driven
- **Apex HTTPS** (`https://gonasell.com`): Let's Encrypt cert propagating to apex load balancer IPs. Works via www; apex cert usually lands within ~1h of primary swap. Verify before reporting final status.
- **Hostinger email (MX)**: client uses `@gonasell.com` emails (bundled free with Hostinger hosting). During nameserver swap to Interneto Vizija the MX record got left pointing at `gonasell.com` itself, which now resolves to Netlify. Client opted to fix on his own — if he asks: pull correct MX + SPF records from Hostinger panel, add in Interneto Vizija replacing current `@ MX 10 gonasell.com.`. Do NOT suggest cancelling Hostinger (email dies with it).
- Consider removing root-level `Brite.mp4` / `WellDone.mp4` masters once team confirms Cloudinary 1080p versions are good
