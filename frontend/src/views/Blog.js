import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../components/BlogCard";
import { Layout } from "./WrappedLayout";

const renderCards = (blogs, users, categories) => {
    if (blogs != null) {
        return blogs.map((blog, index) => {
            return (
                <BlogCard blog={blog} user={users[blog.author]} category={categories[blog.category]}/>
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
                        <BlogCard />
                ))}
        </React.Fragment>
    );
};


const Blog = (props) => {

    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const { id } = props.match.params;

    useEffect(() => {
        
        fetch(process.env.REACT_APP_API_BASE_URL + "/blog/" + (id ? `categories/${id}/posts/` : ''))
            .then(res => {
                return res.json();
            })
            .then(response => {
                setBlogs(response);
            });
    }, [id]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/auth/users/", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogs.map((blog) => blog.author)),
        })
        .then(res => {
            return res.json();
        })
        .then(response => {
            setUsers(response);
        });
    }, [blogs]);



    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/blog/categories/names/", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogs.map((blog) => blog.category)),
        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                setCategories(response);
            });
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