import React, { Component } from "react";
import NavBar from "./NavBar";
import Shoppingcart from "./Shoppingcart";
import Login from "./Login";
import Services from "./Api/Services";


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Services/>
        {/* <NavBar />
        <Login /> */}
      </React.Fragment>
    );
  }
}
