import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import BlogPostContainer from "../components/BlogPostContainer";
import { axiosUnauth } from "../axios";

export default class BlogDetail extends Component {
  state = {
    blog: false,
    user: null,
    category: null,
    status_code: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id != null) {
      try {
        const blogResponse = await axiosUnauth.get(`/blog/posts/${id}/`);
        const blogData = blogResponse.data;

        const userResponse = await axiosUnauth.get(`/auth/user/${blogData.author}`);
        const userData = userResponse.data;

        const catResponse = await axiosUnauth.get(
          `/blog/categories/${blogData.category}`
        );
        const catData = catResponse.data;

        this.setState({
          status_code: blogResponse.status,
          blog: blogData,
          user: userData,
          category: catData,
        });
      } catch (error) {
        if (error.response) {
          this.setState({
            status_code: error.response.status,
          });
          if (error.response.status_code !== "404") {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }
  }

  renderPost() {
    return (
      <BlogPostContainer
        blog={this.state.blog}
        user={this.state.user}
        category={this.state.category}
      />
    );
  }

  renderPlaceholder() {
    return <BlogPostContainer />;
  }

  render() {
    if ((this.state.status_code != null && this.state.status_code !== 200) || (this.state.status_code != null && !this.state.blog.approved)) {
      return <Redirect push to="/404" />;
    } else {
      return (
        <Layout transparent={true} scroll={400}>
          {this.state.blog && this.state.user && this.state.category ? this.renderPost() : this.renderPlaceholder()}
        </Layout>
      );
    }
  }
}
