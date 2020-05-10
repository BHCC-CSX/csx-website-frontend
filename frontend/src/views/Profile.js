import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
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