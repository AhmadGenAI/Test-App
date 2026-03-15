import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { generateTest } from '../utils/testGenerator';
import storage from '../utils/storage';

// Import questions (in a real app, these would be fetched or dynamically imported)
import mathQuestions from '../data/questions/mathematics.json';

const TestRunner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const subjectId = searchParams.get('subject');
  const count = parseInt(searchParams.get('count') || '25');
  const timerMins = parseInt(searchParams.get('timer') || '30');
  const mode = searchParams.get('mode') || 'practice';

  const [test, setTest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timerMins * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Test
    const allQuestions = {
      math: mathQuestions,
      english: [], // placeholders
      science: [],
      'intel-v': [],
      'intel-nv': [],
      urdu: [],
      islamiat: [],
      'pak-studies': []
    };

    const blueprint = {
      subjects: subjectId === 'mixed' 
        ? { math: Math.floor(count/5), english: Math.floor(count/5) } // simplified mixed
        : { [subjectId]: count },
      total: count
    };

    const generated = generateTest(blueprint, allQuestions);
    setTest(generated);

    // 2. Start Timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [subjectId, count, mode]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const toggleMarked = () => {
    if (marked.includes(currentIndex)) {
      setMarked(marked.filter(i => i !== currentIndex));
    } else {
      setMarked([...marked, currentIndex]);
    }
  };

  const handleSubmit = (isAuto = false) => {
    if (!isAuto && !window.confirm('Submit test now?')) return;
    
    clearInterval(timerRef.current);
    
    // Calculate Score
    const questions = test.questions;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correct++;
    });

    const percentage = (correct / questions.length) * 100;
    const result = {
      subject: subjectId,
      correct,
      total: questions.length,
      percentage,
      passed: percentage >= 50,
      timeUsed: (timerMins * 60) - timeLeft,
      answers,
      questions // Store for review
    };

    storage.saveResult(result);
    storage.markSeen(subjectId, questions.map(q => q.id));
    
    navigate('/results', { state: { result } });
  };

  if (!test) return <div className="animate-fade-in">Generating your unique test...</div>;
  if (isTimeUp) return (
    <div className="glass-card text-center animate-fade-in" style={{ marginTop: '20vh' }}>
      <h2>⏰ Time's Up!</h2>
      <p className="text-muted">Your test is being submitted...</p>
      <button className="btn btn-primary" onClick={() => handleSubmit(true)} style={{ marginTop: 'var(--spacing-md)' }}>
        View Results
      </button>
    </div>
  );

  const q = test.questions[currentIndex];
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="test-runner animate-fade-in">
      <header className="test-header glass-card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>Q{currentIndex + 1} / {test.questions.length}</div>
        <div style={{ color: timeLeft < 60 ? 'var(--color-danger)' : 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {formatTime(timeLeft)}
        </div>
        <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => handleSubmit()}>
          Finish
        </button>
      </header>

      <div className="question-area">
        <div className="glass-card stem" style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.1rem', fontWeight: '500' }}>
          {q.stem}
        </div>

        <div className="options-grid" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`btn glass-card ${answers[currentIndex] === idx ? 'btn-primary' : ''}`}
              onClick={() => handleAnswer(idx)}
              style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '16px' }}
            >
              <span style={{ opacity: 0.6, marginRight: '12px' }}>{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <footer className="test-footer" style={{ marginTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between' }}>
        <button 
          className="btn btn-outline" 
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          ← Back
        </button>
        
        <button 
          className={`btn ${marked.includes(currentIndex) ? 'btn-warning' : 'btn-outline'}`}
          onClick={toggleMarked}
          style={{ background: marked.includes(currentIndex) ? 'var(--color-warning)' : '' }}
        >
          {marked.includes(currentIndex) ? '★ Marked' : '☆ Mark'}
        </button>

        {currentIndex === test.questions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            Submit
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setCurrentIndex(currentIndex + 1)}>
            Next →
          </button>
        )}
      </footer>
    </div>
  );
};

export default TestRunner;
