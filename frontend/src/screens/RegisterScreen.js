import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, password);
  };

  return (
    <>
      <FormContainer>
        <hr className="hr-line-right"></hr>
        <h1>הרשמה</h1>
        <hr className="hr-line-left"></hr>
        <div>
          <h1> </h1>
        </div>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="pname">
            <FormLabel style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <strong>:שם פרטי</strong>
            </FormLabel>
            <FormControl
              style={{ direction: 'rtl' }}
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>

          <h5> </h5>
          <FormGroup controlId="email">
            <FormLabel style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <strong>:אימייל מכללה</strong>
            </FormLabel>
            <FormControl
              style={{ direction: 'rtl' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>

          <h5> </h5>
          <FormGroup controlId="password">
            <FormLabel style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <strong>:סיסמא</strong>
            </FormLabel>
            <FormControl
              style={{ direction: 'rtl' }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button type="submit" variant="primary">
              הירשם
            </Button>
          </div>
        </Form>

        <h2> </h2>
        <Row className="py-3">
          <Col className="text-center">
            <strong>רשום למערכת?</strong>{' '}
            <Link to={'/login'}>
              <strong>התחבר </strong>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
