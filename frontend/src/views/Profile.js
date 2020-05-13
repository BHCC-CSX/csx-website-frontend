import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { withContext } from "../AppContext";
import { Layout } from "./WrappedLayout";
import axios from "axios";

const renderProfile = (props) => {
    return (
        <div>
            <h1>{props.user.username}</h1>
        </div>
    )
}

const renderPosts = (blogs, user, categories) => {
        return blogs.map((blog, index) => {
            const cat = categories.find(cat => cat.id === blog.category).name
            return (
                <Col md={10} className="ml-auto mr-auto" key={blog.id}>
                    <BlogCard editable={true} blog={blog} user={user} category={cat}/>
                </Col>
            );
        });
};

const renderPlaceHolders = () => {
    return (
        <React.Fragment>
            {Array(2)
                .fill()
                .map((item, index) => (
                    <Col md={10} className="ml-auto mr-auto" key={index}>
                        <BlogCard />
                    </Col>
                ))}
        </React.Fragment>
    );
};


const Profile = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE_URL + "/blog/categories/")
            .then(response => {
                setCategories(response.data)
                return response
            })
    }, []);

    return (
      <>
        <Layout transparent={false}>
            <Container style={{ paddingTop: "75px" }}>
                    {renderProfile(props)}
                    <Row>
                        <Container>
                            <Col md={10} className="ml-auto mr-auto">
                                <h3>{props.posts.length} Posts</h3>
                                <Button
                                    className="btn-round pull-right"
                                    color="primary"
                                    tag={Link}
                                    to="/blog/create/"
                                    size="lg"
                                >
                                    Create New Post
                                </Button>
                            </Col>
                        </Container>
                    </Row>
                    <Row>

                        {
                        props.posts.length === 0 || categories.length === 0 ?
                        renderPlaceHolders() :
                        renderPosts(props.posts, props.user, categories)
                    }
                </Row> 
            </Container>
        </Layout>
      </>
    );
}

export default withContext(Profile);