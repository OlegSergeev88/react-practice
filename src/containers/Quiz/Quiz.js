import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export default class Quiz extends Component {
  state = {
    activeNumber: 0,
    answerState: null,
    isFinished: true,
    quiz: [
      {
        question: "What color is the sky?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Black", id: 1 },
          { text: "Blue", id: 2 },
          { text: "Red", id: 3 },
          { text: "Green", id: 4 }
        ]
      },
      {
        question: "When started the WW2?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: 1432, id: 1 },
          { text: 1995, id: 2 },
          { text: 1939, id: 3 },
          { text: 1945, id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      let key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    this.setState({
      answerState: { [answerId]: "success" }
    });

    const question = this.state.quiz[this.state.activeNumber];
    if (answerId === question.rightAnswerId) {
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeNumber: this.state.activeNumber + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" }
      });
    }
  };

  isQuizFinished() {
    return this.state.activeNumber + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeNumber].question}
              answers={this.state.quiz[this.state.activeNumber].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeNumber + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
