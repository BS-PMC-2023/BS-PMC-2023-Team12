import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import Card from '../components/Card';

const RegisterScreen = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(
      formState.inputs.name.value,
      formState.inputs.email.value,
      formState.inputs.password.value
    );
  };

  return (
    <>
      <h1> </h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>הרשמה</h1>
        <hr className="hr-line-left"></hr>

        <Form onSubmit={submitHandler}>
          <Input
            id="name"
            type="name"
            label="שם מלא:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="נא להזין שם."
            onInput={inputHandler}
          />
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל מכללה:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא'ל מכללה תקנית."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="סיסמא:"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="נא להזין סיסמה חוקית, לפחות 6 תווים."
            onInput={inputHandler}
          />
          <h2> </h2>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              הירשם
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col className="text-center">
            <strong>רשום למערכת?</strong>{' '}
            <Link to={'/login'}>
              <strong>התחבר </strong>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default RegisterScreen;
