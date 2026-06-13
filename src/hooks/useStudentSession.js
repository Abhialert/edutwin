import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import questions from "../data/questions.json";
import { getMasteryLevel, updateMastery } from "../utils/bkt";

const STORAGE_KEY = "edutwin_mastery_v1";
const DEFAULT_CONCEPT = "recursion";
const CONCEPT_IDS = ["recursion", "arrays", "functions", "loops", "conditionals"];

function readStoredMastery() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function difficultyForMastery(mastery) {
  if (mastery < 0.4) return "beginner";
  if (mastery <= 0.75) return "intermediate";
  return "advanced";
}

function pickQuestion(conceptId, mastery, previousQuestionId) {
  const difficulty = difficultyForMastery(mastery);
  const pool = questions.filter(
    (question) => question.concept_id === conceptId && question.difficulty === difficulty,
  );
  const fallbackPool = questions.filter((question) => question.concept_id === conceptId);
  const candidates = pool.length ? pool : fallbackPool;
  const withoutPrevious = candidates.filter((question) => question.id !== previousQuestionId);
  const finalPool = withoutPrevious.length ? withoutPrevious : candidates;

  if (!finalPool.length) return null;
  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

export function useStudentSession(initialConceptId = DEFAULT_CONCEPT) {
  const [currentConceptId, setCurrentConceptId] = useState(initialConceptId);
  const [mastery, setMastery] = useState(() => {
    const stored = readStoredMastery();
    return CONCEPT_IDS.reduce(
      (acc, conceptId) => ({
        ...acc,
        [conceptId]: typeof stored[conceptId] === "number" ? stored[conceptId] : 0.2,
      }),
      {},
    );
  });
  const [questionHistory, setQuestionHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(() => pickQuestion(initialConceptId, 0.2));
  const nextQuestionTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mastery));
  }, [mastery]);

  useEffect(
    () => () => {
      if (nextQuestionTimerRef.current) {
        clearTimeout(nextQuestionTimerRef.current);
      }
    },
    [],
  );

  const masteryForConcept = useCallback(
    (conceptId) => (typeof mastery[conceptId] === "number" ? mastery[conceptId] : 0.2),
    [mastery],
  );

  const loadQuestion = useCallback(
    (conceptId, masteryValue, previousQuestionId) => {
      setCurrentQuestion(pickQuestion(conceptId, masteryValue, previousQuestionId));
    },
    [],
  );

  const setActiveConcept = useCallback(
    (conceptId) => {
      if (nextQuestionTimerRef.current) {
        clearTimeout(nextQuestionTimerRef.current);
      }
      setCurrentConceptId(conceptId);
      loadQuestion(conceptId, masteryForConcept(conceptId), currentQuestion?.id);
    },
    [currentQuestion?.id, loadQuestion, masteryForConcept],
  );

  const answerQuestion = useCallback(
    (selectedOption) => {
      if (!currentQuestion) return null;

      const isCorrect = selectedOption === currentQuestion.correct;
      const previousMastery = masteryForConcept(currentQuestion.concept_id);
      const newMastery = updateMastery(previousMastery, isCorrect);
      const historyItem = {
        questionId: currentQuestion.id,
        concept_id: currentQuestion.concept_id,
        difficulty: currentQuestion.difficulty,
        selectedOption,
        correct: currentQuestion.correct,
        isCorrect,
        masteryBefore: previousMastery,
        masteryAfter: newMastery,
        answeredAt: new Date().toISOString(),
      };

      setQuestionHistory((history) => [...history, historyItem]);
      setMastery((current) => ({
        ...current,
        [currentQuestion.concept_id]: newMastery,
      }));
      if (nextQuestionTimerRef.current) {
        clearTimeout(nextQuestionTimerRef.current);
      }
      nextQuestionTimerRef.current = setTimeout(() => {
        loadQuestion(currentQuestion.concept_id, newMastery, currentQuestion.id);
      }, 2000);

      return {
        isCorrect,
        question: currentQuestion,
        explanation: currentQuestion.explanation,
        newMastery,
      };
    },
    [currentQuestion, loadQuestion, masteryForConcept],
  );

  const currentMastery = masteryForConcept(currentConceptId);
  const currentDifficulty = difficultyForMastery(currentMastery);

  return useMemo(
    () => ({
      currentConceptId,
      mastery,
      questionHistory,
      currentQuestion,
      answerQuestion,
      setActiveConcept,
      masteryForConcept,
      currentMastery,
      currentDifficulty,
      currentMasteryLevel: getMasteryLevel(currentMastery),
    }),
    [
      answerQuestion,
      currentConceptId,
      currentDifficulty,
      currentMastery,
      currentQuestion,
      mastery,
      masteryForConcept,
      questionHistory,
      setActiveConcept,
    ],
  );
}
