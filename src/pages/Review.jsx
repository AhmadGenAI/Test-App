import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../utils/storage';

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) return <div className="text-center" style={{ marginTop: '20vh' }}>No results to review.</div>;

  return (
    <div className="review-page animate-fade-in">
      <header className="glass-card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Review Answers</h2>
        <button className="btn btn-outline" style={{ padding: '4px 12px' }} onClick={() => navigate('/')}>Done</button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {result.questions.map((q, idx) => {
          const userAns = result.answers[idx];
          const isCorrect = userAns === q.correctIndex;
          
          return (
            <div key={idx} className="glass-card" style={{ 
              borderLeft: `4px solid ${userAns === undefined ? '#94a3b8' : isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`
            }}>
              <div style={{ fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                {idx + 1}. {q.stem}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: 'var(--spacing-md)' }}>
                {q.options.map((opt, oIdx) => {
                  let color = 'inherit';
                  let weight = 'normal';
                  if (oIdx === q.correctIndex) {
                    color = 'var(--color-success)';
                    weight = 'bold';
                  } else if (oIdx === userAns && !isCorrect) {
                    color = 'var(--color-danger)';
                  }

                  return (
                    <div key={oIdx} style={{ color, fontWeight: weight, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '20px', opacity: 0.6 }}>{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                      {oIdx === q.correctIndex && <span style={{ marginLeft: '8px' }}>✓</span>}
                      {oIdx === userAns && !isCorrect && <span style={{ marginLeft: '8px' }}>✗</span>}
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: 'var(--spacing-sm)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: '4px' }}>Explanation:</div>
                <p className="text-muted">{q.explanation}</p>
              </div>

              {!isCorrect && (
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', marginTop: 'var(--spacing-sm)', fontSize: '0.8rem', padding: '6px' }}
                  onClick={() => {
                    storage.addToRevision(q);
                    alert('Added to revision list!');
                  }}
                >
                  Add to Revision List ⭐
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/')}>
          Finish Review
        </button>
      </div>
    </div>
  );
};

export default Review;
