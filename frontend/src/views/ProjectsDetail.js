import React, { Component } from "react";
import { Layout } from "./WrappedLayout";
import DetailContainer from "../components/DetailContainer";

export default class ProjectsDetail extends Component {
  state = {
    project: []
    project: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id != null) {
      fetch(process.env.REACT_APP_API_BASE_URL + `/projects/${id}`)
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          this.setState({
            project: result
          });
        });
    }
  }

  renderProject(){
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
