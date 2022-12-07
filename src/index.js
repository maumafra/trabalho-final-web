import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Background from "./components/Background";

class Page extends React.Component{

  state = {pageLoaded: 0,}

  constructor(props){
    super(props);
    this.state = {
      pageLoaded: 1,
    }
  }

  handleClickHeaderButtons(idx){
    this.setState({pageLoaded: idx});
  }

  /*render(){
    return (
      <div>
        <Header value={this.handleClickHeaderButtons}/>
        <Content />
        <Footer />
      </div>
    );
  }*/

  render(){
    return (
      <div>
        <Header onClick={idx => this.handleClickHeaderButtons(idx)}/>
        {this.loadPage()}
        <Footer />
      </div>
    );
  }

  loadPage(){
    if(this.state.pageLoaded === 0){
      return(
        <div>
          <Background />
        </div>
      );
    } else {
      return(
        <div>
          <Background />
          <Content />
        </div>
      );
    }
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));