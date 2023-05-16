import React, { useContext, useState } from 'react';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import { useHttpClient } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const PersonalZone = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  const [name, setName] = useState(auth.userName);
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name,auth.userId,password);
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

  return (
    <>
      <FormContainer>
        <hr></hr>
        <h1>אזור אישי</h1>
        <hr></hr>
        {error && <Message variant="danger">{error}</Message>}

          <Form onSubmit={submitHandler} style = {{direction:"rtl"}}>
            <FormGroup controlId="name">
              <FormLabel >
                <strong>שם מלא:</strong>
              </FormLabel>
              <FormControl
               style = {{direction:"rtl"}}
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
              style = {{direction:"rtl"}}
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

      </FormContainer>
    </>
  );
};

export default PersonalZone;