import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ProductsLst = (props) => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/${props.myProp}`);
      setData(result.data);
    };
    fetchData();
  }, [props.myProp]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
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

      <h1>{props.name} List</h1>

      <div className="row row-cols-3 g-4">
        {filteredData.map((item) => (
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
                    <button type="button" className="btn btn-primary">
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
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    </div>
  );
};

export default ProductsLst;
