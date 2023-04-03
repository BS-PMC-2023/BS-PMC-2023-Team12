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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    console.log('ok');
  };

  return (
    <>
      <FormContainer>
        <hr></hr>
        <hr className="hr-line-right"></hr>
        <h1>התחברות</h1>
        <hr></hr>
        <hr className="hr-line-left"></hr>
        <div>
          <h1> </h1>
          <h1> </h1>
        </div>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="email">
            <FormLabel style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <strong>:אימייל</strong>
            </FormLabel>
            <FormControl
              style={{ direction: 'rtl' }}
              type="email"
              placeholder=""
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
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button type="submit" variant="primary">
              התחבר
            </Button>
          </div>
        </Form>
        <h2> </h2>
        <Row className="py-3">
          <Col className="text-center">
            <strong>עדיין לא רשום למערכת?</strong>{' '}
            <Link to={'/register'}>
              {' '}
              <strong>הירשם </strong>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
