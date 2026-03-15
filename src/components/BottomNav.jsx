import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const tabs = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Practice', path: '/practice', icon: '📝' },
    { name: 'History', path: '/history', icon: '📊' },
    { name: 'Profile', path: '/profile', icon: '👤' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
