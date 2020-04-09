import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import BlogPostContainer from "../components/BlogPostContainer";

export default class BlogDetail extends Component {
  state = {
    blog: false,
    status_code: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id != null) {
      fetch(process.env.REACT_APP_API_BASE_URL + `/blog/posts/${id}`)
        .then(response => {
          this.setState({status_code: response.status});
          return response.json();
        })
        .then(result => {
          this.setState({
            blog: result
          });
        })
    }
  }

  renderPost(){
    if (this.state.status_code != null && this.state.status_code !== 200){
      return(<Redirect push to="/404" />);
    }
    return(<BlogPostContainer blog={this.state.blog}/>);

  };

  renderPlaceholder(){
    return(<BlogPostContainer />);
  }

  render() {
      return(
        <Layout transparent={true} scroll={400}>
          {this.state.blog ? this.renderPost() : this.renderPlaceholder()}
        </Layout>
      );
  }
}
