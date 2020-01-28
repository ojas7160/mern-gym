import React from 'react';
import './AppBodyComponent.css';
import { Alert } from 'react-bootstrap';
const appBody = (props) => (
  <div>
    <div className="div-style">
      <h3>first</h3>
    </div>

    <div className="div-style">
      <h3>second</h3>
    </div>

    <div className="div-style">
    <h3>third</h3>
    </div>

    <div className="div-style">
      <Alert variant="warning">
        Hello Alert!
      </Alert>
    </div>
  </div>
)

export default appBody;