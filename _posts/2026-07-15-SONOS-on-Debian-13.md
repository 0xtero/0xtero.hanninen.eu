---
layout: post
title: "HOWTO: Use Sonos Speakers as Audio Outputs on Debian 13"
date: 2026-07-15
---

So I have bunch of SONOS speakers around the house and I wanted to use these from my Linux desktop machine, essentially just like I'd use them from Spotify Connect (selecting one of the SONOS speakers as output and that's it).

Sonos speakers support AirPlay 2, and PipeWire — the default sound server on Debian 13 "Trixie" — has native AirPlay (RAOP) support.

That means you can make your Sonos speakers show up right in the system audio menu and route any application's sound to them, no third-party software required.

## Prerequisites

Everything needed ships with a standard Debian 13 desktop install:

- PipeWire with `pipewire-pulse` and WirePlumber (the default audio stack)
- `libspa-0.2-modules` (contains the RAOP modules; installed with PipeWire)
- `avahi-daemon` running, for mDNS discovery — check with:

```bash
systemctl is-active avahi-daemon
```

- Your PC and the SONOS speakers on the same network
- If you run a firewall, allow incoming UDP on ports 6001 and 6002 (AirPlay timing/control traffic), e.g. `sudo ufw allow 6001:6002/udp`

Only Sonos models with AirPlay 2 work (roughly everything from the Sonos One and Beam onward). Older models would need a DLNA-based tool like `pa-dlna` instead.

## Step 1: Enable AirPlay discovery in PipeWire

Create `~/.config/pipewire/pipewire.conf.d/raop-discover.conf`:

```
context.modules = [
    { name = libpipewire-module-raop-discover }
]
```

## Step 2: Restart PipeWire

```bash
systemctl --user restart pipewire pipewire-pulse
```

## Step 3: Verify

List your audio sinks:

```bash
wpctl status
```

Each discovered speaker appears as a sink named after its Sonos room, e.g.:

```
├─ Sinks:
│      62. Office                              [vol: 1.00]
│      80. Built-in Audio Analog Stereo        [vol: 0.40]
```

They also show up in your desktop's sound settings and audio menu. Select one and play something — expect a 1–2 second delay when the stream starts (AirPlay buffering), after which audio stays in sync.

To test from the terminal:

```bash
pw-play --target <sink-id> /usr/share/sounds/alsa/Front_Center.wav
```

## Troubleshooting

### Which speakers are on my network?

Sonos devices answer SSDP queries and expose a description XML on port 1400. Quick inventory with avahi (`apt install avahi-utils`):

```bash
avahi-browse -rt _raop._tcp     # AirPlay devices visible via mDNS
```

Or query a speaker directly if you know its IP:

```bash
curl -s http://<speaker-ip>:1400/xml/device_description.xml | grep -E 'roomName|modelName'
```

### A speaker doesn't appear in the sink list

PipeWire only creates sinks for speakers that Avahi discovers via multicast mDNS. On some networks (Wi-Fi access points with IGMP snooping, or speakers meshed over SonosNet) the multicast responses never reach your machine, even though the speaker is reachable directly.

The fix is to define the sink statically by IP. Create
`~/.config/pipewire/pipewire.conf.d/raop-static-sonos.conf`:

```
context.modules = [
    {   name = libpipewire-module-raop-sink
        args = {
            raop.ip = "192.168.1.50"          # the speaker's IP
            raop.port = 7000
            raop.name = "Kitchen"
            raop.transport = "udp"
            raop.encryption.type = "auth_setup"   # required for AirPlay 2
            raop.audio.codec = "PCM"
            stream.props = {
                node.name = "raop_sink.sonos_kitchen"
                node.description = "Kitchen (Sonos)"
            }
        }
    }
]
```

Two notes:

- `raop.encryption.type = "auth_setup"` is essential. Discovered sinks pick this up automatically from mDNS, but static sinks default to `none`, and  Sonos speakers reject unauthenticated streams.
- Give the speaker a DHCP reservation on your router, since the config pins its IP.

Restart PipeWire again after editing.

### A speaker appears but playback fails with "403 Forbidden"

If a sink exists but vanishes the moment you try to play to it, check the PipeWire log:

```bash
journalctl --user -u pipewire | grep -i raop
```

A `403 Forbidden` reply to the RTSP handshake means the speaker has AirPlay access control enabled (`acl=1` in its mDNS records). This happens when the speaker has been added to Apple Home with restricted access. Fix it on the Apple side: in the Home app, go to Home Settings, then Speakers & TV Access, and choose "Anyone On the Same Network" — or remove the speaker from HomeKit.
Nothing on the Linux side can work around this.

### Two sinks appear for the same speaker

Avahi sometimes reports a device twice (IPv4 and IPv6 cache entries), and PipeWire versions around 1.4 can race on this and create duplicate sinks. If it bothers you, pin discovery to specific devices with `stream.rules` in `raop-discover.conf` — match on `raop.name` (the MAC-prefixed mDNS service name) and use the rules to exclude duplicates or rename sinks:

```
context.modules = [
    {   name = libpipewire-module-raop-discover
        args = {
            stream.rules = [
                {   matches = [ { raop.name = "~804AF297F666@.*" } ]
                    actions = { create-stream = {
                        stream.props = { node.description = "Office (Sonos Era 100)" }
                    } }
                }
                {   matches = [ { raop.name = "!~804AF297F666@.*" } ]
                    actions = { create-stream = { } }
                }
            ]
        }
    }
]
```

## Wrap-up

With one small config file you get Sonos speakers as first-class audio outputs on Debian 13: visible in the audio menu, selectable per-application or system-wide, and persistent across reboots. The static-sink and access-control fixes cover the two gotchas most likely to trip you up on a real home network.
