import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SendEmailScreen from './screens/SendEmailScreen';
import PersonalZone from './screens/PersonalZone';
import ProductsScreen from './screens/ProductsScreen';
import ProductsLst from './components/ProductScreen/ProductsLst';
import UserListScreen from './screens/UserListScreen';
import UpdatesProducts from './screens/UpdatesProducts';
import TrackingScreen from './screens/TrackingScreen';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';

const App = () => {
  const { token, login, logout, userId, userName, isAdmin, email } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        isAdmin: isAdmin,
        email: email,
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
              <Route path="/sendsmailscreen" element={<SendEmailScreen />} />
              <Route path="/personalZone" element={<PersonalZone />} />
              <Route path="/ProductsScreen" element={<ProductsScreen />} />
              <Route
                path="/CamerasScreen"
                element={<ProductsLst name="Camera" myProp="camera" />}
              />
              <Route
                path="/RecordingScreen"
                element={<ProductsLst name="Recording" myProp="recording" />}
              />
              <Route path="/admin/userslist" element={<UserListScreen />} />
              <Route path="/admin/tracking" element={<TrackingScreen />} />
              <Route
                path="/admin/UpdatesProducts"
                element={<UpdatesProducts />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
