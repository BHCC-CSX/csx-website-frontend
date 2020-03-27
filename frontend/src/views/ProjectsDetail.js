import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "./WrappedLayout";
import DetailContainer from "../components/DetailContainer";

export default class ProjectsDetail extends Component {
  state = {
    project: false,
    status_code: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id != null) {
      fetch(process.env.REACT_APP_API_BASE_URL + `/projects/${id}`)
        .then(response => {
          this.setState({status_code: response.status});
          return response.json();
        })
        .then(result => {
          this.setState({
            project: result
          });
        })
    }
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
