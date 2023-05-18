import React, { useContext, useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useHttpClient } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Table, Row, Col } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const PersonalZone = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  const [name, setName] = useState(auth.userName);
  const [password, setPassword] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState('home'); // define selectedNavItem state and set its initial value to 'home'

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, auth.userId, password);
    try {
      await sendRequest(
        'http://localhost:5000/api/users/personalZone/',
        'PUT',
        JSON.stringify({
          name: name,
          _id: auth.userId,
          password: password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const renderSelectedNavItemContent = () => {
    switch (selectedNavItem) {
      case 'home':
        return (
          <div>
            <h1>תוכן 1</h1>
          </div>
        );
      case 'features':
        return (
          <div>
            <h1>תוכן 2</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <hr></hr>
      <h1>אזור אישי</h1>
      <hr></hr>
      {error && <Message variant="danger">{error}</Message>}

      <Table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top', width: '20%' }}>
              <Form
                onSubmit={submitHandler}
                className="text-end"
                style={{ direction: 'rtl' }}
              >
                <FormGroup controlId="name">
                  <FormLabel>
                    <strong>שם מלא:</strong>
                  </FormLabel>
                  <FormControl
                    style={{ direction: 'rtl' }}
                    type="name"
                    placeholder={name}
                    value={name}
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  ></FormControl>
                </FormGroup>
                <h5> </h5>
                <FormGroup>
                  <FormLabel>
                    <strong>סיסמה:</strong>
                  </FormLabel>
                  <FormControl
                    style={{ direction: 'rtl' }}
                    type="password"
                    placeholder="הזן סיסמה"
                    value={password}
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></FormControl>
                </FormGroup>
                <h5> </h5>
                <div className="d-grid gap-3">
                  <Button type="submit" variant="primary">
                    {isLoading ? (
                      <Loader variant="light" />
                    ) : (
                      <string>עדכן</string>
                    )}
                  </Button>
                </div>
              </Form>
            </td>
            <td style={{ width: '80%' }}>
              <div style={{ paddingLeft: '50px' }}>
                <Row>
                  <Navbar bg="primary" variant="dark">
                    <Container>
                      <Nav className="me-auto">
                        <Nav.Link onClick={() => setSelectedNavItem('home')}>
                          השאלות פעילות
                        </Nav.Link>
                        <Nav.Link
                          onClick={() => setSelectedNavItem('features')}
                        >
                          היסטוריית השאלות
                        </Nav.Link>
                      </Nav>
                    </Container>
                  </Navbar>
                </Row>
                <Row>
                  <Col>{renderSelectedNavItemContent()}</Col>
                </Row>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalZone;
