import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';


const CamerasScreen = (props) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/'+props.myProp);
      setData(result.data);
    };
    fetchData();
  }, [props.myProp]);


  return (
    <div>
      <h1>{props.name} List</h1>
        {data.map((item) => (
          //<li key={item.id}>{item.name}</li>
          <ListGroup as="ol"  key={item._id}>
            <ListGroup.Item
              as="li"
              //className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.name}</div>
                {item.id}<br/>
                {item.available == true ? (
                  <div
                  className="d-flex justify-content-between align-items-start"
                  >
                    <Badge bg="primary" pill>
                      פנוי
                    </Badge> 
                    <button type="button" class="btn btn-primary">השאל</button>
                  </div>
              ) : (
                  <div 
                  className="d-flex justify-content-between align-items-start"
                  >
                    <Badge bg="primary" pill>
                      תפוס
                    </Badge>
                    <div>
                      student id: {item.studentID}
                    </div>
                  </div>
                )}
              </div>
              
              {/* {item.available == true ? (
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
                )} */}
            </ListGroup.Item>
          </ListGroup>
        ))}
    </div>
  );
};

export default CamerasScreen;
