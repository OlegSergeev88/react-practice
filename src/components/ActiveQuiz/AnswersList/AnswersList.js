import React, { Component } from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
  <ul className={classes.AnswerList}>
    {props.answers.map((answer, index) => {
      return <AnswerItem answer={answer} key={index} />;
    })}
  </ul>
);

export default AnswersList;
