import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TestSetup from './pages/TestSetup';
import TestRunner from './pages/TestRunner';
import Results from './pages/Results';
import Review from './pages/Review';
import DescriptivePractice from './pages/DescriptivePractice';
import Practice from './pages/Practice';
import History from './pages/History';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import Revision from './pages/Revision';

// Simple guard for onboarding
const OnboardingGuard = ({ children }) => {
  const onboarded = localStorage.getItem('cadetprep_onboarded');
  if (!onboarded) return <Navigate to="/welcome" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        
        <Route path="/" element={
          <OnboardingGuard>
            <Layout />
          </OnboardingGuard>
        }>
          <Route index element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test-setup" element={<TestSetup />} />
          <Route path="test" element={<TestRunner />} />
          <Route path="results" element={<Results />} />
          <Route path="review" element={<Review />} />
          <Route path="descriptive" element={<DescriptivePractice />} />
          <Route path="revision" element={<Revision />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
