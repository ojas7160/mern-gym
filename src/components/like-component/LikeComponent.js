import React from 'react';
import './LikeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Like = (props) => {  
  console.log(props.post)
  const post = props.post
  return (
    <div className="d-flex position-bottom">
      <span>{(props.post.likes && props.post.likes.length) ? props.post.likes.length : 0}<FontAwesomeIcon className="icon-design cursor-pointer" onClick={() => props.like(post)} icon={faThumbsUp} /></span>
    </div>
  )
}

export default Like;