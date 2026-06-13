const P_L0 = 0.2;
const P_T = 0.1;
const P_G = 0.2;
const P_S = 0.1;

function clampProbability(value) {
  if (Number.isNaN(value)) return P_L0;
  return Math.min(0.99, Math.max(0.01, value));
}

export function updateMastery(currentMastery = P_L0, isCorrect) {
  const prior = clampProbability(currentMastery);
  const likelihoodKnown = isCorrect ? 1 - P_S : P_S;
  const likelihoodUnknown = isCorrect ? P_G : 1 - P_G;
  const evidence = prior * likelihoodKnown + (1 - prior) * likelihoodUnknown;
  const posterior = evidence === 0 ? prior : (prior * likelihoodKnown) / evidence;
  const learned = posterior + (1 - posterior) * P_T;

  return clampProbability(Number(learned.toFixed(4)));
}

export function getMasteryLevel(mastery = P_L0) {
  if (mastery < 0.4) return "struggling";
  if (mastery <= 0.75) return "learning";
  return "mastered";
}
