import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './PostComponent.css';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import LikeComponent from '../like-component/LikeComponent';
import { connect } from 'react-redux';
import * as likeService from '../../services/likes-service/likeService';

const Post = (props) => {
  const likeClicked = (data) => {
    console.log(data)
    console.log(likeService)
    likeService.default.like({postId: data._id, userId: userId})
    .then(response => {
      console.log(response)
      if(response.data.added) {
        post.likes.push(response.data.like)
      } else {
        post.likes.splice(0, 1)
      }
      setPost(post)
      setPosts(props.posts.map(thisPost => {
        if(thisPost._id === post._id) {
          thisPost = post
        }
        return thisPost
      }))
      props.getUpdatedPost(props.posts);
    })
  }

  const [userId, setUserId] = useState('');
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
    setPost(props.children)
    setPosts(props.posts)
    // props.onInitPost(props.children);
  }, [])
  // const {posts} =props
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

const mapPropsToDispatch = (dispatch) => {
  return {
    getUpdatedPost: (posts) => dispatch({type: 'UPDATE_POSTS', posts: posts})
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post,
    posts: state.postReducer.posts
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Post);