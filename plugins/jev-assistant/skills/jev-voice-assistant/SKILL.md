---
name: jev-voice-assistant
description: Design and implement a voice-enabled conversational assistant that combines speech services, a dialogue model, Jev decisions and optional browser execution. Use for voice/chat architecture, interruptible sessions and tool handoffs; audio providers are separate integrations.
license: MIT
---

# Jev Voice Assistant

Use [the architecture and adapter contracts](references/architecture.md). Jev selects
bounded actions; a conversation model resolves dialogue and writes responses. Speech-to-text
and text-to-speech are separate adapters. Do not imply Jev directly understands raw audio
or supplies free-text chat responses.

Preserve the requested stack and providers. Determine whether the user needs only chat,
browser actions, or native desktop actions. Load the independent **jev-computer-use**
skill for supported browser tasks. Native desktop control requires a separate adapter;
the upstream macOS project is a possible future integration, not bundled functionality.

`scripts/session.mjs` exports `VoiceSession`, a provider-neutral turn state machine.
Use one turn ID and AbortSignal for every transcript, model call, execution and speech
response. After interruption, cancel pending speech/actions and discard late responses.
An AbortSignal requests cancellation; it does not roll back an already committed action.
Adapters must check cancellation before each step and inspect actual effects afterward.

Only final transcripts may propose actions. Confirm exact target/parameters for consequential
changes when the user's prior authorization does not cover them. The demo state machine
requires turn/action-specific confirmation for `external-write` proposals; a host with
matching prior authorization can explicitly supply that confirmation. Jev cannot grant it.
Live financial execution is unsupported and blocked by this state machine.

Keep microphone activation visible and user initiated. Show listening/thinking/confirming/
executing/speaking states and provide stop/mute controls in a UI implementation. If speech
is unavailable, preserve text chat. State which provider receives audio, transcripts and
page data; keep API keys in the backend. This release contains architecture and control
logic, not a connected voice UI or a working STT/LLM/TTS service.
