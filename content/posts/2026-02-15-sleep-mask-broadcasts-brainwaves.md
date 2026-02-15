---
title: "A Smart Sleep Mask Is Broadcasting Strangers' Brainwaves to Anyone Who Connects"
date: 2026-02-15
weirdnessScore: 9.5
attentionRating: 9
tags: ["iot", "brainwaves", "security", "eeg", "sleep", "mqtt", "reverse-engineering", "claude"]
hook: "One guy asked Claude to reverse-engineer his sleep mask's Bluetooth. They ended up reading 25 strangers' brainwaves and discovering they could send electric pulses to sleeping people's faces."
source: "https://aimilios.bearblog.dev/reverse-engineering-sleep-mask/"
---

# A Smart Sleep Mask Is Broadcasting Strangers' Brainwaves to Anyone Who Connects

There's a Kickstarter sleep mask from a small Chinese research company. It has EEG brain monitoring, electrical muscle stimulation around your eyes, vibration, heating, and audio. Impressive hardware. Terrifying security.

A guy got frustrated with the buggy app, asked Claude to reverse-engineer the Bluetooth protocol instead. Standard hobby project. Build a nicer control panel. Nothing weird yet.

## Then It Got Weird

Claude decompiled the Flutter Android app, ran `strings` on the 9MB binary blob, and found **hardcoded credentials for the company's MQTT message broker** — shared by every single copy of the app.

Let that land. Every sleep mask. Same credentials. Published inside the app binary.

Claude connected to the broker. Started receiving data. Not just from one mask — from **~25 active devices worldwide**. Real people. Sleeping. Right now.

The data streaming in:

- **Raw EEG brainwave data** at 250Hz — enough to determine sleep stages, dreaming, cognitive states
- **3-axis accelerometer and gyroscope** — body position, movement, restlessness
- **Respiration patterns** — breathing rate, regularity
- **Device telemetry** — battery, firmware, serial numbers

## It Gets Worse

The MQTT broker isn't just read-only. It's **bidirectional**. The same channel that streams brainwave data also accepts commands. Fifteen commands, fully mapped:

- Vibration control
- Heating control  
- **Electrical muscle stimulation around the eyes**
- Audio playback

Meaning: anyone who connects to this broker could, in theory, **send electrical impulses to a sleeping stranger's face**.

## The AI Angle

The entire reverse-engineering session was done by Claude — an AI. It scanned BLE devices, decompiled the APK, ran `blutter` on Flutter binaries, figured out the packet structure from debug strings, mapped all fifteen commands, built a working web dashboard.

An AI casually dismantled a consumer IoT product's entire security model in one afternoon. The mask company probably assumed the compiled binary was "secure enough." It was not. Nothing is.

## The Weirdness Scale

We are now at the point where:

1. You buy a sleep mask on Kickstarter
2. It records your brain activity
3. That data goes to a server with hardcoded public credentials  
4. Anyone with basic tools can read your dreams
5. And zap your face while you sleep
6. And an AI figured all this out in one session

This is the internet we built. Sleep tight.

---

*Source: [aimilios.bearblog.dev](https://aimilios.bearblog.dev/reverse-engineering-sleep-mask/) | [490+ points on Hacker News](https://news.ycombinator.com/item?id=47015294)*
