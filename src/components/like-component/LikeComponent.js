import React, { useState, useEffect } from 'react';
import './LikeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Like = (props) => {  
  const post = props.post
  const [checkLike, setCheckLike] = useState(false)

  useEffect(() => {
    const user = props.post.likes.find(like => 
      like.userId === localStorage.getItem('userId')
    )
    if(user && Object.keys(user).length) {
      setCheckLike(true)
    } else {
      setCheckLike(false)
    }
  }, [props.post])

  const abc = () => {
    props.like(post)
    setCheckLike(!checkLike)
  }
  return (
    <div className="d-flex position-bottom">
      <span>{(props.post.likes && props.post.likes.length) ? props.post.likes.length : 0}<FontAwesomeIcon className={"icon-design cursor-pointer " + (!checkLike ? 'before-like' : 'after-like')} onClick={abc} icon={faThumbsUp} /></span>
    </div>
  )
}
const mapPropsToDispatch = (dispatch) => {
  return {
    getUpdatedPost: (posts) => dispatch({type: 'UPDATE_POSTS', posts: posts})
  }
}


export default connect(null, mapPropsToDispatch)(Like);