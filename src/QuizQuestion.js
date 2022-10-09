/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import React, { Component } from 'react'
import QuizQuestionButton from './QuizQuestionButton'

class QuizQuestion extends Component {

    constructor(props) {
        super(props)
        this.state = { incorrectAnswer: false }
    }


    handleClick(buttonText) {
        this.setState({ incorrectAnswer: buttonText !== this.props.quiz_question.answer })
        if (buttonText === this.props.quiz_question.answer) {
            this.props.onCorrectAnswer()
        } else {
            this.props.onIncorrectAnswer();
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({ incorrectAnswer: e.target.value !== this.props.quiz_question.answer })
            if (e.target.value === this.props.quiz_question.answer) {
                this.props.onCorrectAnswer();
                e.target.value = "";
            } else {
                this.props.onIncorrectAnswer();
            }
        }
    }

    handleSkipClick() {
        this.props.onSkipAnswer();
    }

    render() {
        return (
            <main>

                {this.state.incorrectAnswer && <p className='error'>Przykro mi ale to nie jest poprawna odpowiedź!</p>}

                <section>
                    <p>{this.props.quiz_question.instruction_text}</p>
                </section>

                {!!this.props.quiz_question.answer_options &&
                    <section className="buttons">
                        <ul>
                            {this.props.quiz_question.answer_options.map((answer_option, index) => <QuizQuestionButton clickHandler={this.handleClick.bind(this)} key={index} button_text={answer_option} />)}
                        </ul>
                    </section>
                }
                {!this.props.quiz_question.answer_options &&
                    <span>
                        <input type="text" onKeyDown={this.handleKeyDown.bind(this)} />
                        <button value="Opuść pytanie" onClick={this.handleSkipClick.bind(this)}>Opuść pytanie</button>
                    </span>
                }

            </main>
        )
    }
}

export default QuizQuestion
