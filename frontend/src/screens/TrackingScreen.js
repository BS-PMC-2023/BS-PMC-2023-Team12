import React, { useEffect, useState } from 'react';
import { Table, Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHttpClient } from '../hooks/httpHook';
import Loader from '../components/Loader';

const TrackingScreen = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedBorrows, setLoadedBorrows] = useState();

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/borrow');
        setLoadedBorrows(responseData.borrows);
      } catch (err) {}
    };
    fetchBorrows();
  }, [sendRequest]);

  const [sortState, setSortState] = useState('none');
  const sortMethods = {
    none: { method: (a, b) => null },
    BorrowDate: { method: (a, b) => (a.borrowDate < b.borrowDate ? -1 : 1) },
    ReturnDate: { method: (a, b) => (a.returnDate < b.returnDate ? -1 : 1) },
    EquipmentID: { method: (a, b) => (a.equipmentID < b.equipmentID ? -1 : 1) },
  };

  const updateAvalibale = async (borrow) => {
    try {
      var answer = window.confirm(' מאשר את החזרת הציוד? ');
      if (answer) {
        borrow.isAvailable = !borrow.isAvailable;
        await sendRequest(
          `http://localhost:5000/borrow/updateAvalibale/${borrow._id}`,
          'PUT',
          JSON.stringify({
            isAvailable: !borrow.isAvailable,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <hr className="hr-line-right"></hr>
      <h1>רשימת השאלות</h1>
      <hr className="hr-line-left"></hr>
      <Col>
        <ListGroup variant="flush">
          <ListGroupItem
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <select
              style={{
                direction: 'rtl',
                padding: '0.5rem',
                border: '1px solid #678773',
                borderRadius: '4px',
                backgroundColor: '#fff',
                color: '#333',
                fontSize: '1rem',
                minwidth: '100px',
              }}
              onChange={(e) => setSortState(e.target.value)}
            >
              <option value="" disabled selected>
                מיין לפי
              </option>
              <option value="BorrowDate">תאריך השאלה</option>
              <option value="ReturnDate">תאריך החזרה</option>
              <option value="EquipmentID">מספר מק"ט</option>
            </select>
          </ListGroupItem>
        </ListGroup>
      </Col>

      {isLoading ? (
        <Loader />
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm table-custom"
        >
          <thead>
            <tr>
              <th>ת"ז סטודנט</th>
              <th>מייל</th>
              <th>מק"ט</th>
              <th>תאריך השאלה</th>
              <th>תאריך להחזרה</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {loadedBorrows
              ?.sort(sortMethods[sortState].method)
              ?.filter((borrow) => !borrow.isAvailable)
              ?.map((borrow) => (
                <tr key={borrow._id}>
                  <td>{borrow.userID}</td>
                  <td>
                    <a href={`mailto:${borrow.email}`}>{borrow.email}</a>
                  </td>
                  <td>{borrow.equipmentID}</td>
                  <td>{borrow.borrowDate}</td>
                  <td>{borrow.returnDate}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn-sm confirm-return-button"
                      onClick={() => updateAvalibale(borrow)}
                    >
                      אשר החזרה
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TrackingScreen;
