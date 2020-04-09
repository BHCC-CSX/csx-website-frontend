import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../components/BlogCard";
import { Layout } from "./WrappedLayout";

const renderCards = (blogs, users, categories) => {
    if (blogs != null) {
        return blogs.map((blog, index) => {
            const user = users.find(usr => usr.id = blog.author);
            const category = categories.find(cat => cat.id = blog.category);
        return (
          <Col md={10} className="ml-auto mr-auto" key={blog.id}>
                <BlogCard blog={blog} user={user} category={category}/>
          </Col>
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
                    <Col md={10} className="ml-auto mr-auto" key={index}>
                        <BlogCard />
                    </Col>
                ))}
        </React.Fragment>
    );
};


const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/blog/")
            .then(res => {
                return res.json();
            })
            .then(response => {
                setBlogs(response);
            });
    }, []);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/auth/users/")
            .then(res => {
                return res.json();
            })
            .then(response => {
                setUsers(response);
            });
    }, []);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/blog/categories/")
            .then(res => {
                return res.json();
            })
            .then(response => {
                setCategories(response);
            });
    }, []);

    return (
      <>
        <Layout transparent={false}>
          <Container style={{ paddingTop: "75px" }}>
            <h2 className="title">Blog</h2>
                    <Row>
              {blogs.length === 0
                ? renderPlaceHolders()
                : renderCards(blogs, users, categories)}
            </Row>
          </Container>
        </Layout>
      </>
    );
}

export default Blog;

// const [data, setData] = useState({ blogs: null, users: null });

// useEffect(() => {
//     const fetchData = async () => {
//         const respBlogs = await fetch(process.env.REACT_APP_API_BASE_URL + "/blog/")
//             .then(res => {
//                 return res.json();
//             });
    
//         const respUsers = await fetch(process.env.REACT_APP_API_BASE_URL + "/users/")
//             .then(res => {
//                 return res.json();
//             });

//         setData({ blogs: respBlogs, users: respUsers });
//     };

//     fetchData();
// }, []);