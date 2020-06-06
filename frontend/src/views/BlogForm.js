import React, { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "./WrappedLayout";
import { Form, FormGroup, Input, Button, Container, FormText, Spinner } from "reactstrap";
import { withContext } from "../AppContext";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from "browser-image-compression";
import { axiosUnauth } from "../axios";
import { useFormik } from "formik";



const BlogForm = (props) => {
    // State Hooks
    const [blog, setBlog] = useState(null)
    const [image, setImage] = React.useState(null);
    const [imageName, setImageName] = React.useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 3 / 2 });

    useEffect(() => {
        if (props.edit && props.posts.length > 0) {
            const foundBlog = props.posts.find(post => {
                return post.id.toString() === props.match.params.id
            })
            if (foundBlog) {
                setBlog(foundBlog)
            } else {
                props.history.push('/404')
            }
        }
    }, [props.posts, props.match.params.id, props.edit, props.history])

    useEffect(() => {
        let mounted = true;
        axiosUnauth.get("/blog/categories/")
            .then(response => {
                mounted && setCategories(response.data)
            })
        return () => mounted = false
    }, []);

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

    const formik = useFormik({
        initialValues: {
            title: blog ? blog.title : "",
            content: blog ? blog.content : "",
            category: blog ? blog.category : "1",
            image: blog ? blog.image : null
        }, 
        onSubmit: async (values) => {
            setIsLoading(true)

            // in edit mode, all fields will be prepopulated except image. All fields are required except for image.
            // in create mode, all fields will be blank and required.

            const post = await {
                title: values.title,
                content: values.content,
                category: values.category,
                author: props.user_id,
            }

            if (image) {
                post.image = await compressImage()
            }

            if (props.match.params.id) {
                await props.editPost(props.match.params.id, post)
            } else {
                await props.addPost(post)
            }                   
            setTimeout(() => props.history.push('/account'), 700)
        },
        validate: (values) => {
            const errors = {};

            if (!values.title)
                errors.title = 'Required';
        
            if (!values.content)
                errors.content = 'Required';

            if (!image && !values.image)
                errors.image = 'Required';

            return errors;
        },
        enableReinitialize: true
    })

    if (isLoading) {
        return (
            <Layout>
                <Container style={{ paddingTop: "75px" }}>
                    <div className="section">
                        <div className="container">
                            <div className="row progress-container">
                                <div className="col-md-8 ml-auto mr-auto spinner">
                                    <Spinner color="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <Container style={{ paddingTop: "75px" }}>
                    <div className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-sm-10 col-lg-8 ml-auto mr-auto">
                                    <h1>{blog ? "Edit " : "Create "} Post</h1>
                                    <Form className="form" onSubmit={formik.handleSubmit}>
                                        <FormGroup className="col-md">
                                            <label htmlFor="inputTitle">Title</label>
                                            <Input
                                                id="inputTitle"
                                                placeholder="Title"
                                                name="title"
                                                type="text"
                                                value={formik.values.title}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.title && formik.errors.title}
                                            />
                                            {formik.touched.title && formik.errors.title ? <Container className="text-danger">{formik.errors.title}</Container> : null}
                                        </FormGroup>
                                        <FormGroup className="col-md">
                                            <label htmlFor="inputContent">Content</label>
                                            <Input
                                                id="inputContent"
                                                placeholder="Content"
                                                name="content"
                                                type="textarea"
                                                rows="10"
                                                value={formik.values.content}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                invalid={formik.touched.content && formik.errors.content}
                                            />
                                            { formik.touched.content && formik.errors.content ? <Container className="text-danger">{formik.errors.content}</Container> : null }
                                        </FormGroup>
                                        <FormGroup className="col-md-4">
                                            <label htmlFor="inputCategory">Category</label>
                                            <Input
                                                id="inputCategory"
                                                name="category"
                                                type="select"
                                                value={formik.values.category}
                                                onChange={formik.handleChange}>
                                                {categories.map((cat, key) => {
                                                    return (
                                                        <option key={key} value={cat.id}>{cat.name}</option>
                                                    )
                                                })}
                                            </Input>
                                        </FormGroup>
                                        <div className="col-md">
                                            <label htmlFor="inputImage">Image</label>
                                            <Input
                                                id="inputImage"
                                                name="image"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onBlur={formik.handleBlur}
                                                onChange={onSelectFile} 
                                            />
                                            <FormText color="muted">Please upload an image in png or jpeg format.</FormText>
                                            { formik.touched.image && formik.errors.image ? <Container className="text-danger">{formik.errors.image}</Container> : null }
                                        </div>
                                    
                                        <ReactCrop
                                            imageStyle={{ maxHeight: "500px", maxWidth: "100%", height: "auto"}}
                                            src={upImg}
                                            onImageLoaded={onLoad}
                                            crop={crop}
                                            ruleOfThirds
                                            onChange={c => setCrop(c)}
                                            onComplete={makeClientCrop} />

                                        <div className="col-md">
                                            <Button color="primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        )
    }
}
  
export default withContext(BlogForm);