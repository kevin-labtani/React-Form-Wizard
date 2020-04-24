import React from "react";
import { Route } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Result from "./Result";
import Navbar from "./layout/Navbar";

const Pages = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Step1} />
      <Route path="/step2" component={Step2} />
      <Route path="/result" component={Result} />
    </>
  );
};

export default Pages;
