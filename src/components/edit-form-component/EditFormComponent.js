import React from 'react';
import { Form, Col, Row, Container, Modal } from 'react-bootstrap';
import './EditFormComponent.css';

const EditForm = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="shadow margin-rl" md={3} style={{ padding: '20px', textAlign: 'center'}}>
            <img
              onClick={() => props.setLgShow(true)}
              src={props.user.imagePath}
              alt="profile pic"
              className="full-width"
            />
          </Col>
          <Col className="edit-form" md={7}>
            <Form>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={props.user.email} onChange={($event) => props.changeInput('email', $event)} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control value={props.user.name} onChange={($event) => props.changeInput('name', $event)} type="text" placeholder="Name" />
              </Form.Group>


              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control value={props.user.address} onChange={($event) => props.changeInput('address', $event)} placeholder="1234 Main St" />
              </Form.Group>


              <Form.Group controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={props.user.phone} onChange={($event) => props.changeInput('phone', $event)} placeholder="999888.." />
              </Form.Group>

              <Form.Group controlId="formGridZip">
                <Form.Label value={props.user.zip} onChange={($event) => props.changeInput('zip', $event)}>Zip</Form.Label>
                <Form.Control placeholder="zip code"/>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      
      <Modal
        size="lg"
        show={props.lgShow}
        onHide={() => props.setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            onClick={() => props.setLgShow(true)}
            src={props.user.imagePath}
            alt="profile pic"
            className="full-width"
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditForm;