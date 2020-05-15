import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import DetailContainer from "../components/DetailContainer";
import { axiosUnauth } from "../axios";

export default class ProjectsDetail extends Component {
  state = {
    project: false,
    status_code: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await axiosUnauth.get(`/projects/${id}`)
    this.setState({ project: response.data })
  }

  renderProject(){
    if (this.state.status_code != null && this.state.status_code !== 200){
      return(<Redirect push to="/404" />);
    }
    return(<DetailContainer project={this.state.project}/>);

  };

  renderPlaceholder(){
    return(<DetailContainer />);
  }

  render() {
      return(
        <Layout>
          {this.state.project ? this.renderProject() : this.renderPlaceholder()}
        </Layout>
      );
  }
}
