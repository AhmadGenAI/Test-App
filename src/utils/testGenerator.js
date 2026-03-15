import storage from './storage';

/**
 * Generates a unique test based on a blueprint.
 * @param {Object} blueprint - { subjects: { math: 10, english: 5 }, total: 15 }
 * @param {Object} allQuestions - Full question bank { math: [...], english: [...] }
 */
export const generateTest = (blueprint, allQuestions) => {
  let testQuestions = [];

  Object.entries(blueprint.subjects).forEach(([subject, count]) => {
    const subjectPool = allQuestions[subject] || [];
    const seenIds = storage.getSeenIds(subject);
    
    // 1. Separate unseen and seen
    const unseen = subjectPool.filter(q => !seenIds.includes(q.id));
    const seen = subjectPool.filter(q => seenIds.includes(q.id));

    // 2. Sample from unseen first
    const sampled = [];
    let pool = [...unseen];
    
    // If unseen not enough, add seen (least recently used or just shuffled for now)
    if (pool.length < count) {
      pool = [...pool, ...shuffle(seen)];
    }

    const shuffledPool = shuffle(pool);
    sampled.push(...shuffledPool.slice(0, count));
    
    testQuestions.push(...sampled);
  });

  // Final shuffle and hash
  const shuffledTest = shuffle(testQuestions);
  const testHash = generateHash(shuffledTest.map(q => q.id).sort());

  return {
    questions: shuffledTest,
    hash: testHash,
    config: blueprint
  };
};

function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateHash(ids) {
  const str = ids.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}
