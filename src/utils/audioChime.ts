// Native Web Audio API sound synthesizer for gentle prayer chime
// No external MP3 dependencies, works offline and instantaneously

class PrayerAudio {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playChime();
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playChime(frequency = 587.33) { // D5 warm church chime note
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm pure sine bell harmonic
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);

      // Soft attack and gentle harmonic decay like a small bronze chapel bell
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.85);

      // Add a soft subtle higher octave overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(frequency * 2, now);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 1.25);
    } catch {
      // AudioContext unavailable or restricted by browser
    }
  }

  public playRoseCelebration() {
    if (!this.soundEnabled) return;
    try {
      // Celestial 3-note chord: F#5, A5, D6
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq);
        }, idx * 180);
      });
    } catch {
      // ignore
    }
  }
}

export const prayerAudio = new PrayerAudio();
