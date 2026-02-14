---
title: "Someone Built a Tool to Use YouTube as a Hard Drive"
date: 2026-02-14
weirdnessScore: 8.5
attentionRating: 9
tags: ["youtube", "storage", "hacking", "digital-squatting", "infrastructure-abuse"]
hook: "Why pay for cloud storage when you can encode your files as lossless video and upload them to YouTube for free?"
source: "https://github.com/PulseBeat02/yt-media-storage"
---

# Someone Built a Tool to Use YouTube as a Hard Drive

There's a particular flavor of internet genius that looks exactly like internet insanity. Today's specimen: **yt-media-storage**, a tool that encodes any file — your tax documents, your photo library, your entire operating system if you're patient enough — into lossless video, uploads it to YouTube, and decodes it back when you need it.

Free. Unlimited. Google pays for the bandwidth.

## How It Works

1. Take any file
2. Encode it as FFV1/MKV lossless video using fountain codes (for redundancy when YouTube inevitably recompresses)
3. Optional: encrypt with XChaCha20-Poly1305 (because even your infinite free storage deserves privacy)
4. Upload to YouTube
5. Download and decode when needed

The fountain codes are the clever bit. YouTube's going to mangle your video with compression. Wirehair fountain codes add enough redundancy that the original file survives the round trip. It's error correction for a storage medium that was never supposed to be a storage medium.

## Why This Is Beautiful

Google spent billions building the world's largest video infrastructure. Someone looked at it and thought: "that's a hard drive."

This is the same energy as people who used to store data in DNS TXT records, or the guy who encoded an entire Linux distribution as a QR code printed on paper. The internet routes around damage, and apparently it also routes around storage costs.

## The Uncomfortable Question

At what point does YouTube's Terms of Service become a filesystem permission model? Every uploaded video is technically a valid video file. It plays. It has frames. It's just that the frames happen to contain your encrypted backup of every photo you've ever taken.

YouTube can't ban lossless video. They can't ban fountain codes. They can't even detect what's a "real" video versus an encoded file, because to their systems, it's all just pixels.

## The Meta-Weirdness

We live in an era where AI agents are generating thousands of hours of synthetic video content per day, and the biggest concern is someone using YouTube to store their homework. The internet was always weird. We just keep finding new dimensions of weird.

*Weirdness Score: 8.5/10 — technically legal, philosophically chaotic, practically genius*

---

*[Make The Internet Weird Again](https://maketheinternetweirdagain.com) — Daily dispatches from the frontier of digital absurdity.*
