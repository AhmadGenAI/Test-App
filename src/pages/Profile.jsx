import { useState, useEffect } from 'react';
import storage from '../utils/storage';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [revisionCount, setRevisionCount] = useState(0);

  useEffect(() => {
    setProfile(storage.getProfile());
    setRevisionCount(storage.getRevision().length);
  }, []);

  if (!profile) return null;

  return (
    <div className="profile-page animate-fade-in container">
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>My Performance</h2>
      
      <div className="glass-card" style={{ marginBottom: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', textAlign: 'center' }}>
        <div style={{ padding: 'var(--spacing-md)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-accent)' }}>{profile.testsTaken}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Tests Taken</div>
        </div>
        <div style={{ padding: 'var(--spacing-md)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-success)' }}>
            {profile.testsTaken > 0 ? Math.round((profile.passCount / profile.testsTaken) * 100) : 0}%
          </div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Pass Rate</div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Revision Queue 🎯</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{revisionCount} Questions</div>
            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Items flagged for review.</p>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ fontSize: '0.8rem' }} 
            disabled={revisionCount === 0}
            onClick={() => navigate('/revision')}
          >
            Start Revision
          </button>
        </div>
      </div>

      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Subject Mastery</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {Object.entries(profile.subjectStats).sort((a,b) => b[1].avg - a[1].avg).map(([id, stats]) => (
          <div key={id} className="glass-card" style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{id}</span>
              <span style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>{Math.round(stats.avg)}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--color-surface)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${stats.avg}%`, height: '100%', background: 'var(--color-accent)' }} />
            </div>
          </div>
        ))}
        {Object.keys(profile.subjectStats).length === 0 && (
          <p className="text-muted text-center">Take a test to see subject analytics.</p>
        )}
      </div>

      <button 
        className="btn btn-outline" 
        style={{ width: '100%', marginTop: 'var(--spacing-xl)', color: 'var(--color-danger)', border: '1px solid rgba(255, 77, 77, 0.2)' }}
        onClick={() => {
          if (window.confirm('Clear all progress history? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
          }
        }}
      >
        Reset Progress ⚠️
      </button>
    </div>
  );
};

export default Profile;
