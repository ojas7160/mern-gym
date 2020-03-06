import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './PostComponent.css';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import LikeComponent from '../like-component/LikeComponent';
import * as likeService from '../../services/likes-service/likeService';

const Post = (props) => {
  const likeClicked = (data) => {
    console.log(data)
    console.log(likeService)
    likeService.default.like({postId: data._id, userId: userId})
    .then(response => {
      console.log(response)
    })
  }

  const [userId, setUserId] = useState('');
  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])
  return (
    <div className="card-design">
      <Container style={{height: '100%', margin: '0px'}}>
        <Row>
          <Col md={2} className="img-wrap">
            <img src="http://localhost:8081/images/d2_1583399081359.jpg" alt="imgg" height="200" width='150' />
          </Col>

          <Col md={10}>
            <div className="title">{props.children.title || 'Missing title'}</div>
            <div><FontAwesomeIcon className='font-icon font-13' icon={faClock} /><i className="font-13">{moment(props.children.addedOn).format("ddd, DD-MMM-YY  hh:mm A")}</i></div>
            <div className="desc">{props.children.description || 'Missing description'}</div>
            <Row>
              <Col>
                <LikeComponent post={props.children} like={likeClicked}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* <Grid container spacing={3} style={{height: '100%', margin: '0px'}}>
        <Grid item xs={2} className="img-wrap">
        </Grid>
        <Grid item xs={10}>
          
        </Grid>
      </Grid> */}
    </div>
  )
}

export default Post;