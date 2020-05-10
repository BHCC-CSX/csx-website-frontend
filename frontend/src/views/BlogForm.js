import React, { useState, useEffect } from "react";
import { Layout } from "./WrappedLayout";
import { Form, FormGroup, Input, Button, Container, FormText } from "reactstrap";
import { withContext } from "../AppContext";
import axios from "axios";

const BlogForm = (props) => {

    const blog = props.posts.find(post => {
        return post.id.toString() === props.match.params.id
    })

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [category, setCategory] = React.useState("1");
    const [image, setImage] = React.useState(null);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);
    const handleCategoryChange = (event) => setCategory(event.target.value);
    const handleImageChange = (event) => setImage(event.target.files[0])

    // we still need to get all categories so that we can choose one
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setContent(blog.content)
            setCategory(blog.category)
        }
    }, [blog])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE_URL + "/blog/categories/")
            .then(response => {
                setCategories(response.data)
                return response
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const post = {
            title: title,
            content: content,
            category: category,
            author: props.user_id,
            image: image
        }
                
        if (props.match.params.id) {
            props.editPost(props.match.params.id, post)
                .then(setTimeout(() => props.history.push(`/blog/posts/${props.match.params.id}`), 700))
        } else {
            props.addPost(post)
                .then(response => {
                    setTimeout(() => props.history.push(`/blog/posts/${response.data.id}`), 700)
                })
        }
    }

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
                        <Input id="inputImage" type="file" accept="image/png, image/jpeg" onChange={handleImageChange}>
                        </Input>
                        <FormText color="muted">Please upload an image in png or jpeg format.</FormText>
                    </div>
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
  
export default withContext(BlogForm);