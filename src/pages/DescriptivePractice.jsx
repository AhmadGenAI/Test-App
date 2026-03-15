import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import engData from '../data/descriptive/english-descriptive.json';
import urduData from '../data/descriptive/urdu-descriptive.json';

const DescriptivePractice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'english';
  const isUrdu = lang === 'urdu';
  
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    setExercises(isUrdu ? urduData : engData);
  }, [isUrdu]);

  if (exercises.length === 0) return <div>Loading exercises...</div>;

  const current = exercises[currentIndex];

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowModel(false);
      setUserAnswer('');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`descriptive-practice animate-fade-in ${isUrdu ? 'rtl' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
      <header className="glass-card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem' }}>{isUrdu ? 'توصیفی مشق' : 'Descriptive Practice'} ({isUrdu ? 'اردو' : 'English'})</h2>
        <button className="btn btn-outline" style={{ padding: '4px 12px' }} onClick={() => navigate('/')}>
          {isUrdu ? 'بند کریں' : 'Exit'}
        </button>
      </header>

      <div className="glass-card" style={{ marginBottom: 'var(--spacing-md)' }}>
        <div style={{ fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: 'var(--spacing-sm)' }}>
          {current.type.toUpperCase()}
        </div>
        
        {current.type === 'comprehension' && (
          <div className="passage" style={{ background: 'rgba(255,255,255,0.03)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', lineHeight: '1.8' }}>
            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{current.title}</h3>
            <p>{current.passage}</p>
          </div>
        )}

        <div className="prompt" style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)' }}>
          {current.type === 'essay' ? current.prompt : (isUrdu ? 'مندرجہ بالا پیراگراف پڑھیں اور سوالات کے جواب دیں:' : 'Read the passage above and answer the questions:')}
        </div>

        {current.type === 'comprehension' && (
          <ul style={{ paddingLeft: isUrdu ? '0' : '20px', paddingRight: isUrdu ? '20px' : '0', marginBottom: 'var(--spacing-md)' }}>
            {current.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        )}

        <textarea 
          className="glass-card"
          placeholder={isUrdu ? 'یہاں جواب لکھیں...' : 'Type your answer here...'}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={{ width: '100%', minHeight: '150px', background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: 'var(--spacing-md)', fontSize: '1rem', resize: 'vertical' }}
        />
      </div>

      {!showModel ? (
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowModel(true)}>
          {isUrdu ? 'نمونہ جواب دکھائیں' : 'Show Model Answer'}
        </button>
      ) : (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ marginBottom: 'var(--spacing-md)', border: '1px solid var(--color-accent)' }}>
            <h3 style={{ color: 'var(--color-accent)', marginBottom: 'var(--spacing-sm)' }}>{isUrdu ? 'نمونہ جواب' : 'Model Answer'}</h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {current.type === 'essay' ? current.sample : current.modelAnswers.map((ans, i) => (
                <div key={i} style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <strong>Q{i+1}:</strong> {ans}
                </div>
              ))}
            </div>
            {current.tips && (
              <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-sm)', background: 'rgba(0, 210, 106, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                <strong>{isUrdu ? 'تجاویز:' : 'Tips:'}</strong>
                <ul style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                  {current.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
          </div>
          
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext}>
            {currentIndex < exercises.length - 1 ? (isUrdu ? 'اگلا سوال' : 'Next Exercise') : (isUrdu ? 'مکمل کریں' : 'Finish Practice')}
          </button>
        </div>
      )}
    </div>
  );
};

export default DescriptivePractice;
