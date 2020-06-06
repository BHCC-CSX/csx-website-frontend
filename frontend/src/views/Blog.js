import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../components/BlogCard";
import { Layout } from "./WrappedLayout";
import { axiosUnauth } from "../axios";

const renderCards = (blogs, users, categories) => {
    if (blogs != null) {
        return blogs.map((blog, index) => {
            return (
                <BlogCard key={index} blog={blog} user={users[blog.author]} category={categories[blog.category]}/>
            );
        });
    } else {
        return null;
    }
};

const renderPlaceHolders = () => {
    return (
        <React.Fragment>
            {Array(2)
                .fill()
                .map((item, index) => (
                    <BlogCard key={index} />
                ))}
        </React.Fragment>
    );
};


const Blog = (props) => {
    const { id } = props.match.params;

    // State Hooks
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    // Effect Hooks
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axiosUnauth.get("/blog/" + (id ? `categories/${id}/posts/` : ''))
            const approvedBlogs = await response.data.filter(blog => blog.approved)
            setBlogs(approvedBlogs);
        }
        fetchBlogs()
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            const idList = JSON.stringify(blogs.map((blog) => blog.author))
            const response = await axiosUnauth.post("/auth/users/", idList)
            setUsers(response.data);
        }
        if (blogs.length > 0) {
            fetchUsers()
        }
    }, [blogs]);

    useEffect(() => {
        const fetchCategories = async () => {
            const catList = JSON.stringify(blogs.map((blog) => blog.category))
            const response = await axiosUnauth.post("/blog/categories/names/", catList)
            setCategories(response.data);
        }
        if (blogs.length > 0) {
            fetchCategories()
        }
    }, [blogs]);

    return (
      <>
        <Layout transparent={false}>
          <Container style={{ paddingTop: "75px" }}>
                <h2 className="title">{categories && (id ? "Category: " + categories[id] : "Blog")}</h2>
                <Row>
                    <Col md={10} className="ml-auto mr-auto">
                        {blogs.length === 0
                        ? renderPlaceHolders()
                        : renderCards(blogs, users, categories)}
                    </Col>
                </Row>
            </Container>
        </Layout>
      </>
    );
}

export default Blog;