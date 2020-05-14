import React, { useState, useEffect, useRef, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import { Form, FormGroup, Input, Button, Container, FormText } from "reactstrap";
import { withContext } from "../AppContext";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from "browser-image-compression";
import { axiosUnauth } from "../axios";

const BlogForm = (props) => {
    // look for blog in posts prop
    const blog = props.posts.find(post => {
        return post.id.toString() === props.match.params.id
    })

    // State Hooks
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [category, setCategory] = React.useState("1");
    const [image, setImage] = React.useState(null);
    const [imageName, setImageName] = React.useState("");
    const [categories, setCategories] = useState([]);

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 3 / 2 });

    // Effect Hooks

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setContent(blog.content)
            setCategory(blog.category)
        }
    }, [blog])

    useEffect(() => {
        axiosUnauth.get("/blog/categories/")
            .then(response => {
                setCategories(response.data)
                return response
            })
    }, []);

    // Event Handlers

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);
    const handleCategoryChange = (event) => setCategory(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const compressedImage = await compressImage()

        const post = await {
            title: title,
            content: content,
            category: category,
            author: props.user_id,
            image: compressedImage
        }

        if (props.match.params.id) {
            await props.editPost(props.match.params.id, post)
            setTimeout(() => props.history.push(`/blog/posts/${props.match.params.id}`), 700)
        } else {
            const response = await props.addPost(post)
            setTimeout(() => props.history.push(`/blog/posts/${response.data.id}`), 700)
        }                   

    }

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            setImageName(e.target.files[0].name)
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const onLoad = useCallback(img => {
      imgRef.current = img;
    }, []);
  
    const makeClientCrop = async crop => {
        if (imgRef.current && crop.width && crop.height) {
          createCropPreview(imgRef.current, crop);
      }
    };
  
    const createCropPreview = async (imageFile, crop) => {
      const canvas = document.createElement('canvas');
      const scaleX = imageFile.naturalWidth / imageFile.width;
      const scaleY = imageFile.naturalHeight / imageFile.height;
      canvas.width = Math.ceil(crop.width*scaleX);
      canvas.height = Math.ceil(crop.height*scaleY);
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        imageFile,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width*scaleX,
        crop.height*scaleY
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = "cropped_" + imageName;
          setImage(blob);
        }, 'image/jpeg', 1);

      });
    };   

    const compressImage = async () => {  
        var options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }

        const compressedFile = await imageCompression(image, options)
        return compressedFile
    }

    // if the blog is not in our blog list, either because it belongs to someone else or
    // it doesn't exist, redirect to 404 page
    if (!blog && props.match.params.id) {
        return <Redirect push to="/404" />;
    } else {
        return (
            <Layout>
                <Container style={{ paddingTop: "75px" }}>
                    <Form action="" className="form" method="">
                        <FormGroup className="col-md">
                            <label htmlFor="inputTitle">Title</label>
                            <Input id="inputTitle" placeholder="Title" type="text" value={title} onChange={handleTitleChange}></Input>
                        </FormGroup>
                        <FormGroup className="col-md">
                            <label htmlFor="inputContent">Content</label>
                            <Input id="inputContent" placeholder="Content" rows="10" type="textarea" style={{ maxHeight: "500px" }} value={content} onChange={handleContentChange}></Input>
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <label htmlFor="inputCategory">Category</label>
                            <Input id="inputCategory" type="select" value={category} onChange={handleCategoryChange}>
                                {categories.map((cat, key) => {
                                    const selectedTag = props.blog && cat.id === category ? "selected=\"\"" : ""
                                    return (
                                        <option key={key} {...selectedTag} value={cat.id}>{cat.name}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <div className="col-md">
                            <label htmlFor="inputImage">Image</label>
                            <Input id="inputImage" type="file" accept="image/png, image/jpeg" onChange={onSelectFile}>
                            </Input>
                            <FormText color="muted">Please upload an image in png or jpeg format.</FormText>
                        </div>
                    
                        <ReactCrop
                            imageStyle={{ maxHeight: "500px", maxWidth: "500px"}}
                            src={upImg}
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={c => setCrop(c)}
                            onComplete={makeClientCrop} />

                        <div className="col-md">
                            <Button color="primary" type="submit" onClick={handleSubmit}>
                                Submit
                        </Button>
                        </div>
                    </Form>
                </Container>
            </Layout>
        )
    }
}
  
export default withContext(BlogForm);