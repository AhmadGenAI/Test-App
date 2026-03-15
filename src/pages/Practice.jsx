import { useNavigate } from 'react-router-dom';

const Practice = () => {
  const navigate = useNavigate();

  return (
    <div className="practice-page animate-fade-in container">
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Practice Modes</h2>
      
      <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
        <section>
          <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1rem', color: 'var(--color-text-muted)' }}>MCQ SIMULATIONS</h3>
          <div className="glass-card" style={{ marginBottom: 'var(--spacing-md)' }}>
            <h3>Mixed Full Test ⚡</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', margin: '8px 0' }}>
              Standard 25-MCQ mix of all subjects: Math, English, Science, Intelligence, Urdu, Islamiat.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/test-setup?subject=mixed')}>
              Generate Mixed Test
            </button>
          </div>

          <div className="glass-card">
            <h3>Past Paper Style 📜</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', margin: '8px 0' }}>
              Modeled after entry tests: 1 hour duration, English + Intelligence mix.
            </p>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/test-setup?subject=mixed&mode=exam')}>
              Start Mock Exam
            </button>
          </div>
        </section>

        <section style={{ marginTop: 'var(--spacing-md)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1rem', color: 'var(--color-text-muted)' }}>DESCRIPTIVE PRACTICE</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇬🇧</div>
              <div style={{ fontWeight: '600' }}>English</div>
              <button className="btn btn-outline" style={{ width: '100%', marginTop: '12px', fontSize: '0.8rem', padding: '8px' }} 
                onClick={() => navigate('/descriptive?lang=english')}>
                Practice
              </button>
            </div>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🇵🇰</div>
              <div style={{ fontWeight: '600' }}>Urdu</div>
              <button className="btn btn-outline" style={{ width: '100%', marginTop: '12px', fontSize: '0.8rem', padding: '8px' }}
                onClick={() => navigate('/descriptive?lang=urdu')}>
                Practice
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Practice;
