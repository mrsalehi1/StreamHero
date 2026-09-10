# StreamHero Roadmap

Where StreamHero is today, and the work planned from here. Phase 1 is what
ships now. Everything after it is still to build.

## Phase 1 — Ingest and monitor (done)

- [x] RTMP ingest endpoint (`rtmp://<host>:1935/live/<stream-key>`)
- [x] Several publishers at once, kept apart by stream key
- [x] Dashboard that shows every input live (HTTP-FLV + flv.js)
- [x] Stream registry API (`/api/streams`, `/api/config`)

## Phase 2 — Live switch between inputs

One program output, made from the inputs that are connected.

- [ ] A program bus: the single feed that recording and restream follow
- [ ] Switch which input is on program, live, without dropping the output
- [ ] Preview the next input before taking it
- [ ] Transitions on the switch: cut, dissolve, and a short fade, so the change is not a hard jump
- [ ] Transition duration and type chosen in the dashboard, applied at the moment of the switch

## Phase 3 — Images and subtitles on the live video

Graphics are composited onto the program, not onto each raw input.

- [ ] Image overlays: logo, bug, and a full-frame image, with show and hide
- [ ] Position and size for each image
- [ ] Live subtitles and lower thirds burned into the program
- [ ] Add, edit, and remove a graphic while the output stays up

## Phase 4 — Record

- [ ] Record the program output to disk while it is live
- [ ] Record an individual input on its own
- [ ] Start and stop a recording from the dashboard without stopping the stream
- [ ] Keep recordings out of git (`media/` is already ignored)

## Phase 5 — More than one restream endpoint

The program can go out to several platforms at the same time. Each destination
is the same kind of target: a name plus an RTMP URL and stream key.

- [ ] YouTube Live (`rtmp://a.rtmp.youtube.com/live2/<key>`)
- [ ] Instagram Live
- [ ] Further endpoints added the same way: Twitch, Facebook, and a custom RTMP URL
- [ ] Go live to one destination or to several at once
- [ ] Stream keys stored locally and never committed
- [ ] Relay health in the UI: bitrate, uptime, dropped frames, and a restart when ffmpeg dies

## Phase 6 — Director mode

A session has people with different jobs. Only the director drives the show.

- [ ] Director seat: the person who switches inputs, fires transitions, and controls graphics
- [ ] Roles: who may publish (a camera), who may only watch (a viewer), who may direct
- [ ] Viewers see the program output. Raw inputs stay with the director and the publishers
- [ ] Take over director: another allowed user takes the seat, and the previous director is told
- [ ] The take-over is explicit, so two people cannot switch the show at once

## Phase 7 — Multi-tenant and admin panel

- [ ] Tenants: separate studios, each with its own users, stream keys, sessions, and destinations
- [ ] A user in one tenant cannot see or publish into another
- [ ] Admin panel: users, tenants, roles, stream keys, destinations, and live sessions
- [ ] Admin can see who holds the director seat and who is publishing
- [ ] A short audit of switches, take-overs, recordings, and go-lives

## Phase 8 — Hardening

- [ ] Login for the dashboard, with a stream key per publisher
- [ ] HLS next to FLV, so Safari and iOS can play
- [ ] WebRTC preview for a shorter delay on the switcher
- [ ] Per-stream stats: viewers and bitrate over time
- [ ] SRT ingest next to RTMP
- [ ] Docker image and a compose file so it starts with one command
