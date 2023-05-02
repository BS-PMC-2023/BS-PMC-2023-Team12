import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PersonalZone from './screens/PersonalZone';
import ProductsScreen from './screens/ProductsScreen';
import CamerasScreens from './screens/CamerasScreen';
import UserListScreen from './screens/UserListScreen';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';
import RecordingScreen from './screens/RecordingScreen';

const App = () => {
  const { token, login, logout, userId, userName, isAdmin } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/personalZone" element={<PersonalZone />} />
              <Route path="/ProductsScreen" element={<ProductsScreen />} />
              <Route path="/CamerasScreen" element={<CamerasScreens />} />
              <Route path="/RecordingScreen" element={<RecordingScreen />} />
              <Route path="/admin/userslist" element={<UserListScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
