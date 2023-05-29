import React, { useState, useEffect, useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import FormContainer from '../FormContainer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Message from '../Message';
import { useHttpClient } from '../../hooks/httpHook';
import { AuthContext } from '../../context/AuthContext';

const ProductsLst = (props) => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();

  const [data, setData] = useState([]);
  const [borrowingItemId, setBorrowingItemId] = useState(null);

  let [borrowDate, setBorrowDate] = useState(new Date());
  let [returnDate, setRetunrDate] = useState(null);

  // eslint-disable-next-line
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/${props.myProp}`);
      setData(result.data);
    };
    fetchData();
  }, [props.myProp]);

  const handleBorrowButtonClick = (id) => {
    if (id === borrowingItemId) {
      setBorrowingItemId(null);
    } else {
      setBorrowingItemId(id);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const borrow = borrowDate;
    const fyyyy = borrow.getFullYear();
    let fmm = borrow.getMonth() + 1;
    let fdd = borrow.getDate();

    if (fdd < 10) fdd = '0' + fdd;
    if (fmm < 10) fmm = '0' + fmm;

    const formattedBorrow = fdd + '/' + fmm + '/' + fyyyy;
    borrowDate = formattedBorrow;

    const returndate = returnDate;
    const ryyyy = returndate.getFullYear();
    let rmm = returndate.getMonth() + 1;
    let rdd = returndate.getDate();

    if (rdd < 10) rdd = '0' + rdd;
    if (rmm < 10) rmm = '0' + rmm;

    const formattedReturnDate = rdd + '/' + rmm + '/' + ryyyy;
    returnDate = formattedReturnDate;
    try {
      await sendRequest(
        'http://localhost:5000/borrow/addborrow',
        'POST',
        JSON.stringify({
          userID: auth.userId,
          equipmentID: borrowingItemId,
          name: auth.userName,
          email: auth.email,
          borrowDate: formattedBorrow,
          returnDate: formattedReturnDate,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (err) {
      console.log(err);
    }
    alert('השאלת הציוד בוצע בהצלחה');
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (auth.userId != null) {
    return (
      <div>
        <h1>{props.name} List</h1>
        {error && <Message variant="danger">{error}</Message>}

        <Form>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>
        </Form>

        {filteredData.map((item) => (
          <ListGroup as="ol" key={item._id}>
            <ListGroup.Item as="li">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.name}</div>
                {item.id}
                <br />
                {item.available ? (
                  <div className="d-flex justify-content-between align-items-start">
                    <Badge bg="primary" pill style={{ fontSize: 15 }}>
                      פנוי
                    </Badge>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleBorrowButtonClick(item.id)}
                    >
                      השאל
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-start">
                    <Badge bg="danger" pill style={{ fontSize: 15 }}>
                      תפוס
                    </Badge>
                    <div>Student Id: {item.studentID}</div>
                  </div>
                )}
              </div>

              {borrowingItemId === item.id && (
                <React.Fragment>
                  <FormContainer>
                    <Form onSubmit={submitHandler}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="d-grid gap-3">
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={!returnDate || !borrowDate}
                          >
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
                            selected={borrowDate}
                            onChange={(date) => setBorrowDate(date)}
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
  }
};

export default ProductsLst;
