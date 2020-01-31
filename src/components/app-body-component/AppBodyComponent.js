import React, { Component } from 'react';
import './AppBodyComponent.css';
import Carousel from 'react-bootstrap/Carousel'
import banner1 from '../../assets/images/banner-1.jpg'
import banner3 from '../../assets/images/banner-3.jpg'

class appBody extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="div-style">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner1}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner3}
                alt="Third slide"
              />
            </Carousel.Item>

          </Carousel>
        </div>

        <div className="div-style block-content">
          <h3>Train Insane </h3>
          <h4> or remain the same </h4>
          <p> Everyone needs a reset button so you can start your day without anxiety. For some people, it’s running; for some, it’s going to the gym. For me, it’s meditation. – Matt Bomer </p>

          <p>Being defeated is often a temporary condition. Giving up is what makes it permanent. </p>

          <p>All I do is work out. Oh my God! Half my life is spent in a gym somewhere, sweating. – Tom Brady </p>
        </div>

        <div className="div-style">
          <h3>third</h3>
        </div>
      </div>
    )
  }
}

export default appBody;