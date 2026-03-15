import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '📐', color: '#6366f1' },
  { id: 'english', name: 'English', icon: '📖', color: '#ec4899' },
  { id: 'science', name: 'General Science', icon: '🔬', color: '#10b981' },
  { id: 'intel-v', name: 'Intelligence (V)', icon: '🧠', color: '#f59e0b' },
  { id: 'intel-nv', name: 'Intelligence (NV)', icon: '🧩', color: '#8b5cf6' },
  { id: 'urdu', name: 'Urdu', icon: '🖋️', color: '#ef4444' },
  { id: 'islamiat', name: 'Islamiat', icon: '🕌', color: '#059669' },
  { id: 'pak-studies', name: 'Pak Studies', icon: '🌙', color: '#14b8a6' }
];

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(storage.getProfile());
  }, []);

  if (!profile) return null;

  return (
    <div className="home-page animate-fade-in">
      <section className="stats-hero glass-card" style={{ marginBottom: 'var(--spacing-lg)', background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Hi, Cadet!</h2>
            <p className="text-muted">You've completed {profile.testsTaken} tests.</p>
          </div>
          <div className="streak-badge" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block' }}>🔥</span>
            <span style={{ fontWeight: 'bold' }}>{profile.streak} Days</span>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/practice')} style={{ padding: '20px' }}>
          Mixed Test ⚡
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/practice')} style={{ padding: '20px' }}>
          Past Papers 📜
        </button>
      </div>

      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Subject Practice</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
        {SUBJECTS.map((sub) => {
          const stats = profile.subjectStats[sub.id];
          return (
            <div 
              key={sub.id} 
              className="glass-card" 
              onClick={() => navigate(`/test-setup?subject=${sub.id}`)}
              style={{ padding: 'var(--spacing-md)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{sub.icon}</div>
              <div style={{ fontWeight: '600' }}>{sub.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {stats ? `Avg: ${Math.round(stats.avg)}%` : 'Not started'}
              </div>
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                height: '3px', 
                width: stats ? `${stats.avg}%` : '0%', 
                background: sub.color 
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
