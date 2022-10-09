/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'
import QuizEnd from "./QuizEnd";

let quizData = require('./quiz_data.json')

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = { quiz_position: 1, correct_answers: 0, incorrect_answers: 0, skipped_answers: 0 };
        this.quiz_questions = quizData.quiz_questions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    onCorrectAnswer() {
        this.setState({
            correct_answers: this.state.correct_answers + 1
        });
        this.showNextQuestion();
    }

    onIncorrectAnswer() {
        this.setState({
            incorrect_answers: this.state.incorrect_answers + 1
        });
    }

    onSkipAnswer() {
        this.setState({
            incorrect_answers: this.state.incorrect_answers + 1,
            skipped_answers: this.state.skipped_answers + 1,
        });
        this.showNextQuestion();
    }

    showNextQuestion() {
        this.setState({
            quiz_position: this.state.quiz_position + 1
        });
    }

    handleResetClick() {
        this.setState({ quiz_position: 1, correct_answers: 0, incorrect_answers: 0, skipped_answers: 0 })
    }

    render() {
        const isQuizEnd = (this.state.quiz_position - 1) === this.quiz_questions.length
        return (
            <div>
                <div>Poprawne odpowiedzi: {this.state.correct_answers}</div>
                <div>Niepoprawne odpowiedzi: {this.state.incorrect_answers}</div>
                <div>Opuszczone odpowiedzi: {this.state.skipped_answers}</div>
                {!isQuizEnd && <div>{this.state.quiz_position}/{this.quiz_questions.length}</div>}
                {!isQuizEnd && <QuizQuestion
                    onCorrectAnswer={this.onCorrectAnswer.bind(this)}
                    onIncorrectAnswer={this.onIncorrectAnswer.bind(this)}
                    onSkipAnswer={this.onSkipAnswer.bind(this)}
                    quiz_question={this.quiz_questions[this.state.quiz_position - 1]}
                />}
                {!!isQuizEnd && <QuizEnd resetClickHandler={this.handleResetClick.bind(this)} />}
            </div>
        )
    }
}

export default Quiz;
