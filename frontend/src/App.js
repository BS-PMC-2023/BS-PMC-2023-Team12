import React, { useCallback, useState } from 'react';
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
import { AuthContext } from './context/AuthContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
