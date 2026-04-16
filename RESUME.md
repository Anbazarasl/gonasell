# Resume — Gonasell Website

## Status: LIVE on Netlify (preview workflow established)
- Production: https://glowing-fenglisu-4f7592.netlify.app
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
Read CLAUDE.md and RESUME.md first. Production: https://glowing-fenglisu-4f7592.netlify.app
GitHub: https://github.com/Anbazarasl/gonasell  Cloudinary cloud: dkvyimpd6
Figma source: https://www.figma.com/design/VWksrX92jjo5Ubtr6PXumI/Gonasell?node-id=1-224
```

## Open items / next steps
- **CMS**: Decap (Git-based, free) or Sanity (hosted) — needs Eleventy or similar SSG layer added so HTML becomes data-driven
- **Custom domain**: pending domain registrar access from team (currently Netlify subdomain only)
- Consider removing root-level `Brite.mp4` / `WellDone.mp4` masters once team confirms Cloudinary 1080p versions are good
