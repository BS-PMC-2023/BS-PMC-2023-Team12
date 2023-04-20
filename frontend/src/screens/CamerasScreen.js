import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';


const CamerasScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/camera');
      setData(result.data);
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Camera List</h1>
        {data.map((item) => (
          //<li key={item.id}>{item.name}</li>
          <ListGroup as="ol"  key={item._id}>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.name}</div>
                {item.id}
              </div>
              {item.available == true ? (
                <Badge bg="primary" pill>
                  available
                </Badge>
              ) : (
                  <div>
                    student id: {item.studentID}
                    <Badge bg="primary" pill>
                    unavailable
                    </Badge>
                  </div>
                )}
            </ListGroup.Item>
          </ListGroup>
        ))}
    </div>
  );
};

export default CamerasScreen;
