import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { withContext } from "../AppContext";
import { Layout } from "./WrappedLayout";
import { axiosUnauth } from "../axios";

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


const Account = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosUnauth.get("/blog/categories/")
            .then(response => {
                setCategories(response.data)
                return response
            })
    }, []);

    return (
      <>
        <Layout transparent={false}>
            <Container style={{ paddingTop: "75px" }}>
                <Row>
                    <Col md={10} className="ml-auto mr-auto">
                        <Row className="m-auto">
                            <h1>Your Posts</h1>
                            <div className="ml-auto">
                                <Button
                                    className="pull-right ml-auto"
                                    color="primary"
                                    outline
                                    tag={Link}
                                    to="/blog/create/"
                                    size="md">
                                        New Post
                                </Button>
                            </div>
                        </Row>
                    </Col>
                    {
                    categories.length === 0 ?
                    renderPlaceHolders() :
                    renderPosts(props.posts, props.user, categories)
                    }
                </Row> 
            </Container>
        </Layout>
      </>
    );
}

export default withContext(Account);