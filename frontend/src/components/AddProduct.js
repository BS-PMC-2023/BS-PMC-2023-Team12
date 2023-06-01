import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = () => {

    const addCamera = async (kind, id) => {
        try {
          const res = await axios.delete(`/${kind}/${id}`);
          console.log(res.data);
        } catch (err) {
          console.error(err.message); // Error message from server.
        }
      };


  return (
    <div>
        <h2>הוספת פריט למערכת</h2>
        <Form>
            <Form.Group style={{textAlign: 'right'}} controlId="exampleForm.ControlInput1">
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="מספר קטלוגי" style={{textAlign: 'right'}} />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="שם המוצר" style={{textAlign: 'right'}} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="submit" class="btn btn-primary">הוסף</button>
                    </Col>
                    <Col>
                    {/* <Form.Label>Select Option</Form.Label> */}
                    <Form.Select aria-label="Select option" style={{textAlign: 'right'}} >
                        <option value="kind">סוג המוצר</option>
                        <option value="Camera">Camera</option>
                        <option value="Recording">Recording</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Tripod">Tripod</option>
                        <option value="Projectors">Projectors</option>
                        <option value="Cabels">Cabels</option>
                        <option value="Lights">Lights</option>
                        <option value="Convertors">Convertors</option>
                    </Form.Select>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    </div>
  );
};

export default AddProduct;
