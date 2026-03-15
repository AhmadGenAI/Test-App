import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="glass-card text-center animate-fade-in" style={{ marginTop: '20vh' }}>
        <h2>No Result Found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: 'md' }}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="results-page animate-fade-in">
      <div className="glass-card text-center" style={{ 
        padding: 'var(--spacing-xl)', 
        marginBottom: 'var(--spacing-lg)',
        border: `2px solid ${result.passed ? 'var(--color-success)' : 'var(--color-danger)'}`,
        boxShadow: result.passed ? '0 0 20px rgba(0, 210, 106, 0.2)' : '0 0 20px rgba(255, 77, 77, 0.2)'
      }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: result.passed ? 'var(--color-success)' : 'var(--color-danger)', marginBottom: 'var(--spacing-sm)' }}>
          {result.passed ? '🎉 PASSED' : '❌ TRY AGAIN'}
        </div>
        
        <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: 'var(--spacing-md) 0' }}>
          {Math.round(result.percentage)}%
        </div>

        <div className="text-muted">
          You got {result.correct} out of {result.total} correct.
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Test Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
          <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Time Taken</div>
            <div style={{ fontWeight: 'bold' }}>{Math.floor(result.timeUsed / 60)}m {result.timeUsed % 60}s</div>
          </div>
          <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Subject</div>
            <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{result.subject}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/review', { state: { result } })}>
          Review Answers 🔍
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Back to Home 🏠
        </button>
      </div>
    </div>
  );
};

export default Results;
