import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.setItem('cadetprep_onboarded', 'true');
    navigate('/');
  };

  return (
    <div className="welcome-screen animate-fade-in" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: 'var(--spacing-xl)',
      background: 'var(--gradient-main)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🎖️</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-accent)' }}>
        CadetPrep
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
        The ultimate Class VIII entry-test simulator for Cadet Colleges.
      </p>

      <div className="glass-card" style={{ textAlign: 'left', marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ marginBottom: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '1.5rem' }}>🔄</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>Never the Same Test</div>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Our engine ensures you never see the same paper twice.</p>
          </div>
        </div>
        <div style={{ marginBottom: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '1.5rem' }}>⏱️</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>Timed Simulations</div>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Practice under real exam pressure with subject-wise timers.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '1.5rem' }}>📈</span>
          <div>
            <div style={{ fontWeight: 'bold' }}>Pass/Fail Analytics</div>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Instant results and revision lists for weak topics.</p>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" style={{ padding: '18px', fontSize: '1.1rem' }} onClick={handleGetStarted}>
        Get Started →
      </button>

      <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: 'var(--spacing-xl)' }}>
        By continuing, you agree to store progress locally on this device.
      </p>
    </div>
  );
};

export default Welcome;
