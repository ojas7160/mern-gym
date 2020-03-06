import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './PostsComponent.css';
import { Grid, Container, TextField, Button } from '@material-ui/core';
import * as postService from '../../services/posts-service/postService';
import PostComponent from '../../components/post-component/PostComponent';

const Posts  = (props) => {
  
  let form = new FormData();
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const getAllPosts = () => {
    postService.default.getAllPosts()
    .then(res => {
      console.log(res.data.posts)
      setPosts(res.data.posts)
    })
  }

  useEffect(() => {
    getAllPosts();
  }, [])
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [img, changeImage] = useState('');

  const onSubmit = () => {    
    console.log(img)
    let postData = {
      title: title,
      description: description,
      userId: localStorage.getItem('userId'),
      imagePath: img
    }
    for(var i in postData) {
      form.append(i, postData[i]);
    }
    if(postData.title && postData.title.length) {
      postService.default.createPost(form).then(res => {
        console.log(res);
      })
    }
  }

  const onChangeImages = (e) => {
    console.log(e)
    let images = e.target.files ? Array.from(e.target.files) : []
    console.log(e.target.files[0].name)
    // changeImage(e.target.files[0].name)
    console.log(img)
    images.forEach((file, i) => {
      console.log(file, i)
      form.append('file', file);
    })
    console.log(form)
  }

  return (
    <div className={'bg-img ' + classes.root}>
      <div className="text-center">
        <h1 className="post-heading">
          Posts
        </h1>
      </div>
      <div className="container" style={{ height: '82vh', overflowY: 'scroll'}}> 
        {posts.map(post => {
          return (
            <div key={post._id}>
              <PostComponent>{post}</PostComponent>
            </div>  
          )
        })}
      </div>
      {/* <Container>
        <Grid className="form-div" container spacing={3}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" onChange={(e) => setTitle(e.target.value)} value={title} className="full-width" label="Title" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" onChange={(e) => setDescription(e.target.value)} value={description} className="full-width" label="Description" rows="4" multiline variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <input name="image" onChange={e => onChangeImages(e)} type="file" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container> */}
    </div>
  )

  }

export default Posts;