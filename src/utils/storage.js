const STORAGE_KEYS = {
  SEEN_QUESTIONS: 'cadetprep_seen_questions',
  HISTORY: 'cadetprep_history',
  PROFILE: 'cadetprep_profile',
  REVISION: 'cadetprep_revision'
};

const storage = {
  // Seen Questions
  getSeenIds: (subject) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEEN_QUESTIONS) || '{}');
    return data[subject] || [];
  },
  
  markSeen: (subject, ids) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEEN_QUESTIONS) || '{}');
    data[subject] = [...new Set([...(data[subject] || []), ...ids])];
    localStorage.setItem(STORAGE_KEYS.SEEN_QUESTIONS, JSON.stringify(data));
  },

  // Test History
  saveResult: (result) => {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    history.push({
      ...result,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    
    // Update profile stats
    storage.updateProfile(result);
  },

  getHistory: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]'),

  // Profile Stats
  getProfile: () => {
    const defaultProfile = {
      testsTaken: 0,
      passCount: 0,
      totalScore: 0,
      streak: 0,
      lastTestDate: null,
      subjectStats: {}
    };
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || JSON.stringify(defaultProfile));
  },

  updateProfile: (result) => {
    const profile = storage.getProfile();
    profile.testsTaken += 1;
    if (result.passed) profile.passCount += 1;
    profile.totalScore += result.percentage;
    
    // Simple streak logic
    const today = new Date().toDateString();
    if (profile.lastTestDate === today) {
      // same day, no streak change
    } else {
      profile.streak += 1;
    }
    profile.lastTestDate = today;

    // Subject stats
    const sub = result.subject || 'mixed';
    if (!profile.subjectStats[sub]) profile.subjectStats[sub] = { count: 0, avg: 0 };
    const s = profile.subjectStats[sub];
    s.avg = (s.avg * s.count + result.percentage) / (s.count + 1);
    s.count += 1;

    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  // Revision List
  getRevision: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.REVISION) || '[]'),
  
  addToRevision: (question) => {
    const list = storage.getRevision();
    if (!list.find(q => q.id === question.id)) {
      list.push(question);
      localStorage.setItem(STORAGE_KEYS.REVISION, JSON.stringify(list));
    }
  }
};

export default storage;
