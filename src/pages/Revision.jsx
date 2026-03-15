import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';

const Revision = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setQuestions(storage.getRevision());
  }, []);

  if (questions.length === 0) {
    return (
      <div className="glass-card text-center animate-fade-in" style={{ marginTop: '20vh' }}>
        <h2>Revision Queue Empty</h2>
        <p className="text-muted">Questions you get wrong or mark will appear here.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: 'var(--spacing-md)' }}>Go Home</button>
      </div>
    );
  }

  const q = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="revision-page animate-fade-in container">
      <header className="glass-card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Revision Mode</h2>
        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{currentIndex + 1} / {questions.length}</div>
      </header>

      <div className="glass-card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ fontWeight: '600', fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>
          {q.stem}
        </div>

        {!showAnswer ? (
          <button className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={() => setShowAnswer(true)}>
            Show Answer 👁️
          </button>
        ) : (
          <div className="animate-fade-in">
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)', marginBottom: 'var(--spacing-md)' }}>
              {q.options[q.correctIndex]}
            </div>
            <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: '4px' }}>Explanation:</div>
              <p className="text-muted">{q.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/')}>Exit</button>
        <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleNext} disabled={!showAnswer}>
          {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Revision'}
        </button>
      </div>
    </div>
  );
};

export default Revision;
