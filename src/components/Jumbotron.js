import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
  <div className="jumbotron jumbotron-fluid bg-dark">
    <div className="container">
      <img
        className="jumbotron-logo mx-auto d-block"
        src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
        alt="Northcoders logo"
      />
    </div>
  </div>
);

export default Jumbotron;
