import React, { useEffect, useContext, useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
} from 'react-bootstrap';
import { useHttpClient } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Table, Row, Col } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const PersonalZone = () => {
  const auth = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttpClient();

  const [name, setName] = useState(auth.userName);
  const [password, setPassword] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState('home');

  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest('http://localhost:5000/borrow/getUserBorrows', 'GET', null, {
          'Content-Type': 'application/json',
        });
        const { user, name, email, isAvailable, userID } = response.data;
        setLoadedData({ user, name, email, isAvailable, userID });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [sendRequest]);

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
    try {
      const response = await sendRequest(
        'http://localhost:5000/borrow/getUserBorrows',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
        }
      );
      const { user, name, email, isAvailable, userID } = response.data;
      setLoadedData({ user, name, email, isAvailable, userID });
      console.log(email);
    } catch (err) {
      console.log(err);
    }
  };

  const renderSelectedNavItemContent = () => {
    switch (selectedNavItem) {
      case 'current':
        return (
          <div>
            <ListGroup as="ol">
              <ListGroup.Item as="li">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{loadedData.name}</div>
                  {loadedData.email}
                  <br />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        );
      case 'history':
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
      <hr className="hr-line-right"></hr>
      <h1>אזור אישי</h1>
      <hr className="hr-line-left"></hr>

      <Table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top', width: '20%' }}>
              <Form onSubmit={submitHandler} className="text-end" style={{ direction: 'rtl' }}>
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
                    {isLoading ? <Loader variant="light" /> : <string>עדכן</string>}
                  </Button>
                </div>
              </Form>
            </td>
            <td style={{ verticalAlign: 'top', width: '80%' }}>
              <div style={{ paddingLeft: '50px' }}>
                <Row>
                  <Navbar bg="primary" variant="dark">
                    <Container>
                      <Nav className="me-auto">
                        <Nav.Link onClick={() => setSelectedNavItem('current')}>
                          השאלות פעילות
                        </Nav.Link>
                        <Nav.Link onClick={() => setSelectedNavItem('history')}>
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
