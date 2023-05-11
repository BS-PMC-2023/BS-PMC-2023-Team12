import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import FormContainer from '../FormContainer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductsLst = (props) => {
  const [data, setData] = useState([]);
  const [borrowingItemId, setBorrowingItemId] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setRetunrDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/${props.myProp}`);
      setData(result.data);
    };
    fetchData();
  }, [props.myProp]);

  const handleBorrowButtonClick = (id) => {
    setBorrowingItemId(id);
  };

  return (
    <div>
      <h1>{props.name} List</h1>
      {data.map((item) => (
        <ListGroup as="ol" key={item._id}>
          <ListGroup.Item as="li">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.id}
              <br />
              {item.available ? (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    פנוי
                  </Badge>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleBorrowButtonClick(item._id)}
                  >
                    השאל
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <Badge bg="primary" pill>
                    תפוס
                  </Badge>
                  <div>student id: {item.studentID}</div>
                </div>
              )}
            </div>
            {borrowingItemId === item._id && (
              <React.Fragment>
                <FormContainer>
                  <Form>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="d-grid gap-3">
                        <Button type="submit" variant="primary">
                          שריין
                        </Button>
                      </div>
                      <FormGroup
                        controlId="returnDate"
                        style={{ marginLeft: '30px' }}
                      >
                        <FormLabel className="d-flex justify-content-center">
                          <strong>:תאריך החזרה</strong>
                        </FormLabel>
                        <DatePicker
                          selected={returnDate}
                          onChange={(date) => setRetunrDate(date)}
                          dateFormat="dd/MM/yyyy"
                          minDate={new Date()}
                        />
                      </FormGroup>
                      <FormGroup
                        controlId="startDate"
                        style={{ marginLeft: '30px' }}
                      >
                        <FormLabel className="d-flex justify-content-center">
                          <strong>:תאריך השאלה</strong>
                        </FormLabel>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                          minDate={new Date()}
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </FormContainer>
              </React.Fragment>
            )}
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
};

export default ProductsLst;
