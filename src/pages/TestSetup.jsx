import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TestSetup = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject') || 'mixed';
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    count: 25,
    timer: 30, // minutes
    mode: 'practice' // 'practice' or 'exam'
  });

  const subjects = {
    math: 'Mathematics',
    english: 'English',
    science: 'General Science',
    'intel-v': 'Intelligence (V)',
    'intel-nv': 'Intelligence (NV)',
    urdu: 'Urdu',
    islamiat: 'Islamiat',
    'pak-studies': 'Pak Studies',
    mixed: 'Mixed Test'
  };

  const handleStart = () => {
    navigate(`/test?subject=${subjectId}&count=${config.count}&timer=${config.timer}&mode=${config.mode}`);
  };

  return (
    <div className="test-setup animate-fade-in">
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Configure {subjects[subjectId]}</h2>
      
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>Question Count</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-sm)' }}>
            {[10, 15, 20, 25].map(n => (
              <button 
                key={n}
                onClick={() => setConfig({...config, count: n})}
                className={`btn ${config.count === n ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '10px' }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>Timer (Minutes)</label>
          <input 
            type="range" 
            min="5" max="60" step="5" 
            value={config.timer} 
            onChange={(e) => setConfig({...config, timer: parseInt(e.target.value)})}
            style={{ width: '100%', accentColor: 'var(--color-accent)' }}
          />
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-sm)', color: 'var(--color-accent)', fontWeight: 'bold' }}>
            {config.timer} Minutes
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>Mode</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <button 
              onClick={() => setConfig({...config, mode: 'practice'})}
              className={`btn ${config.mode === 'practice' ? 'btn-primary' : 'btn-outline'}`}
            >
              Practice
            </button>
            <button 
              onClick={() => setConfig({...config, mode: 'exam'})}
              className={`btn ${config.mode === 'exam' ? 'btn-primary' : 'btn-outline'}`}
            >
              Exam
            </button>
          </div>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '8px' }}>
            {config.mode === 'practice' ? 'Explanations shown after submission.' : 'Strict mode. No pauses allowed.'}
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '16px', marginTop: 'var(--spacing-md)' }}>
          Start Practice Loop 🚀
        </button>
      </div>

      <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          🛡️ <strong>"Never the same test"</strong> is active. We sample from your unseen pool first.
        </p>
      </div>
    </div>
  );
};

export default TestSetup;
