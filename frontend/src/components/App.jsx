import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth.jsx';
import AuthProvider from '../contexts/AuthProvider';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import NavBar from './NavBar';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <div className="App d-flex flex-column h-100">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  </AuthProvider>
);

export default App;
