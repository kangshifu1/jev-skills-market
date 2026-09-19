// Provider-neutral control plane: audio and free-text generation belong to adapters.
export class VoiceSession {
  #turn = 0;
  #controller = new AbortController();
  #pending = null;
  #state = 'idle';
  get state() { return this.#state; }
  get turnId() { return this.#turn; }
  get signal() { return this.#controller.signal; }
  begin(transcript) {
    if (typeof transcript !== 'string' || !transcript.trim()) throw new Error('A final transcript is required');
    this.#controller.abort();
    this.#controller = new AbortController();
    this.#turn += 1;
    this.#pending = null;
    this.#state = 'thinking';
    return { turnId: this.#turn, transcript, signal: this.signal };
  }
  propose(turnId, action) {
    if (turnId !== this.#turn || this.#state !== 'thinking') return { accepted: false, reason: 'stale-or-invalid-turn' };
    if (!action || typeof action.id !== 'string' || !action.id || typeof action.summary !== 'string' || !action.summary || !['read', 'draft', 'external-write', 'financial-execute'].includes(action.effect)) throw new Error('Invalid action proposal');
    if (action.effect === 'financial-execute') { this.#state = 'blocked'; return { accepted: false, reason: 'live-trading-not-implemented' }; }
    this.#pending = structuredClone(action);
    this.#state = action.effect === 'external-write' ? 'awaiting-confirmation' : 'ready';
    return { accepted: true, state: this.#state, action: structuredClone(this.#pending) };
  }
  confirm(turnId, actionId) {
    if (turnId !== this.#turn || this.#state !== 'awaiting-confirmation' || actionId !== this.#pending?.id) return false;
    this.#state = 'ready'; return true;
  }
  takeAction(turnId) {
    if (turnId !== this.#turn || this.#state !== 'ready') return null;
    this.#state = 'executing';
    return { action: structuredClone(this.#pending), turnId, signal: this.signal };
  }
  complete(turnId, result) {
    if (turnId !== this.#turn || this.#state !== 'executing') return false;
    if (!result || typeof result.verified !== 'boolean') throw new Error('Execution result needs verified status');
    this.#pending = null;
    this.#state = result.verified ? 'speaking' : 'needs-review';
    return true;
  }
  reply(turnId) {
    if (turnId !== this.#turn || this.#state !== 'thinking') return false;
    this.#state = 'speaking'; return true;
  }
  finishSpeaking(turnId) {
    if (turnId !== this.#turn || this.#state !== 'speaking') return false;
    this.#state = 'idle'; return true;
  }
  interrupt() {
    this.#controller.abort();
    this.#turn += 1;
    this.#pending = null;
    this.#state = 'idle';
    return { turnId: this.#turn, cancelAudio: true, cancelPendingActions: true };
  }
}
