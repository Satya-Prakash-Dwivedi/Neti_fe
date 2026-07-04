import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { initPostHog, captureEvent } from './utils/analytics';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CurrentAffairs from './pages/CurrentAffairs';
import StudyMaterials from './pages/StudyMaterials';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import CurrentAffairDetail from './pages/CurrentAffairDetail';
import BlogDetail from './pages/BlogDetail';
import PlanB from './pages/PlanB';
import Mind from './pages/Mind';
import MindDetail from './pages/MindDetail';
import SEODashboard from './pages/SEODashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import RevisionSeries from './pages/RevisionSeries';
import PolityCourseDetail from './pages/PolityCourseDetail';
import MonthlyMagazines from './pages/MonthlyMagazines';
import MonthlyMagazineDetail from './pages/MonthlyMagazineDetail';

// Auth and Quiz pages
import Login from './pages/Login';
import Register from './pages/Register';
import RecallSubjects from './pages/RecallSubjects';
import RecallSubjectPage from './pages/RecallSubjectPage';
import RecallClassPage from './pages/RecallClassPage';
import RecallBookDetail from './pages/RecallBookDetail';
import RecallSession from './pages/RecallSession';
import RecallHistory from './pages/RecallHistory';
import AdminQuizzes from './pages/AdminQuizzes';
import AdminBooks from './pages/AdminBooks';
import AdminQuizAttempts from './pages/AdminQuizAttempts';
import AdminCurrentAffairs from './pages/AdminCurrentAffairs';
import AdminOrders from './pages/AdminOrders';
import AdminRearrangeChapters from './pages/AdminRearrangeChapters';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsConditions from './pages/TermsConditions';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    captureEvent('$pageview', {
      $current_url: window.location.href,
    });
    
    // Capture referral code if present
    const params = new URLSearchParams(search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem('referralCode', refCode.toUpperCase());
    }
  }, [pathname, search]);

  return null;
}

// Protected Route for Students
const StudentRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// Protected Route for Admins
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

function App() {
  const location = useLocation();
  const isTestScreen = location.pathname.includes('/recall/session/');

  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-slate-50 font-inter">
        <ScrollToTop />
        {!isTestScreen && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/study-materials/:id" element={<ProductDetail />} />
            {/* DO NOT DELETE: Temporarily commented out user-facing Current Affairs routes for future release */}
            {/*
            <Route path="/current-affairs" element={<CurrentAffairs />} />
            <Route path="/current-affairs/:id" element={<CurrentAffairDetail />} />
            */}
            <Route path="/monthly-magazines" element={<MonthlyMagazines />} />
            <Route path="/monthly-magazines/:id" element={<MonthlyMagazineDetail />} />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/free-polity-classes" element={<PolityCourseDetail />} />
            <Route path="/revision-series" element={<RevisionSeries />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/mind/:id" element={<MindDetail />} />
            <Route path="/plan-b" element={<PlanB />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seo-dashboard" element={<SEODashboard />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />

            {/* Authentication and Quizzes Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Recall Hub Routes */}
            <Route 
              path="/recall" 
              element={<RecallSubjects />} 
            />
            <Route 
              path="/recall/history" 
              element={
                <StudentRoute>
                  <RecallHistory />
                </StudentRoute>
              } 
            />
            <Route 
              path="/recall/:subject" 
              element={<RecallSubjectPage />} 
            />
            <Route 
              path="/recall/:subject/:source" 
              element={<RecallClassPage />} 
            />
            <Route 
              path="/recall/book/:bookId" 
              element={<RecallBookDetail />} 
            />
            <Route 
              path="/recall/session/:id" 
              element={
                <StudentRoute>
                  <RecallSession />
                </StudentRoute>
              } 
            />
            <Route 
              path="/admin/practice-tests" 
              element={
                <AdminRoute>
                  <AdminQuizzes />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/books" 
              element={
                <AdminRoute>
                  <AdminBooks />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/books/:bookId/rearrange" 
              element={
                <AdminRoute>
                  <AdminRearrangeChapters />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/practice-tests/:quizId/attempts" 
              element={
                <AdminRoute>
                  <AdminQuizAttempts />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/current-affairs" 
              element={
                <AdminRoute>
                  <AdminCurrentAffairs />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>
        {!isTestScreen && <Footer />}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
