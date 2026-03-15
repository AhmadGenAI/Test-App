import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="app-shell">
      <header className="main-header glass-card" style={{ margin: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>CadetPrep Class 8</h1>
      </header>
      
      <main className="container">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
