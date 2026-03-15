import { useState, useEffect } from 'react';
import storage from '../utils/storage';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(storage.getHistory().reverse());
  }, []);

  return (
    <div className="history-page animate-fade-in container">
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Test History</h2>
      
      {history.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: 'var(--spacing-xl)' }}>
          <p className="text-muted">No tests taken yet. Start practicing!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {history.map((record) => (
            <div key={record.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {record.subject} Test
                </div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  {new Date(record.date).toLocaleDateString()} at {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontWeight: '800', 
                  fontSize: '1.2rem',
                  color: record.passed ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                  {Math.round(record.percentage)}%
                </div>
                <div style={{ fontSize: '0.7rem', color: record.passed ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 'bold' }}>
                  {record.passed ? 'PASSED' : 'FAILED'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
