import confetti from "canvas-confetti";

export function triggerRosePetalsShower() {
  if (typeof window === "undefined") return;

  const count = 70;
  const defaults = {
    origin: { y: 0.1 },
    colors: ["#8e1c2e", "#c53347", "#f8c7ce", "#fde8eb", "#c89b27", "#f9f0d3"],
    shapes: ["circle" as const],
    scalar: 1.4,
    gravity: 0.65,
    drift: 0.1,
    ticks: 280,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 35,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.6,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.8,
  });

  fire(0.1, {
    spread: 140,
    startVelocity: 45,
  });
}
