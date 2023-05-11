import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Card } from 'react-bootstrap';


const PersonalZoneScreen = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const word = ['חלש', 'חלש', 'בסדר', 'טוב', 'חזק'];

  const [formState, inputHandler] = useForm(
    {
      name: {
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

  const submitHandler = async (user) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/users/personalZone/${user._id}`,
        'PUT',
        JSON.stringify({
          name: formState.inputs.name.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1> </h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>פרטים אישיים</h1>
        <hr className="hr-line-left"></hr>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Input
            element="textarea"
            id="name"
            type="name"
            label="שם מלא:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="נא להזין שם."
            onInput={inputHandler}
          />
          
          <Input
            element="input"
            id="password"
            type="password"
            label="סיסמה:"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="נא להזין סיסמה חוקית, לפחות 6 תווים."
            onInput={inputHandler}
          />
          {formState.inputs.password.value.length >= 1 && (
            <PasswordStrengthBar
              shortScoreWord="קצר מדי"
              scoreWords={word}
              password={formState.inputs.password.value}
            />
          )}
          <h2> </h2>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              {isLoading ? <Loader variant="light" /> : <string>עדכן פרטים</string>}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default PersonalZoneScreen;