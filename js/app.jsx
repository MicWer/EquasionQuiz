import React from 'react';
import ReactDOM from 'react-dom';

class MathQuestionGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operators: ['*', '/', '+', '-'],
            answers: [],
            correct: 0,
            firstNum: 0,
            lastNum: 0,
            operator: '',
            timeLeft: 10,
            score: 0,
            disabledButtons: false
        };
    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        this.clearData();
        this.getEquasion();
        this.shuffleAnswers(this.state.answers);
        this.setAnswers();
        this.clockTick();
    }

    clearData() {
        this.state.answers.length = 0;
        this.setState({
            answers: this.state.answers,
            correct: 0,
            firstNum: 0,
            lastNum: 0,
            operator: '',
            timeLeft: 10,
        });
    }

    getEquasion() {
        let operators = this.state.operators;
        let answers = this.state.answers;
        let firstNum = this.state.firstNum;
        let lastNum = this.state.lastNum;
        let operator = this.state.operator;
        let correct = this.state.correct;

        for (let i = 0; i < 3; i++) {
            answers.push(Math.floor(Math.random() * (1000 - 1) + 1));
        }

        firstNum = Math.floor(Math.random() * (1000 - 1) + 1);
        lastNum = Math.floor(Math.random() * (1000 - 1) + 1);
        operator = operators[Math.floor(Math.random() * operators.length)];

        this.setState({
            answers,
            firstNum,
            lastNum,
            operator,
            disabledButtons: false
        });

        switch (operator) {
            case '+':
                correct = Math.floor(firstNum + lastNum);
                break;
            case '-':
                correct = Math.floor(firstNum - lastNum);
                break;
            case '*':
                correct = Math.floor(firstNum * lastNum);
                break;
            case '/':
                correct = Math.floor(firstNum / lastNum);
                break;
        }

        answers.push(correct);
        this.setState({correct, answers});

    }

    clockTick() {
        this.timerId = setInterval(() => {
            this.setState({
                timeLeft: this.state.timeLeft - 1
            });
            if (this.state.timeLeft == 0) {
                this.setState({disabledButtons: true});
                clearInterval(this.timerId);
            }
        }, 1000);
    }

    shuffleAnswers(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    checkAnswer(e) {
        if (e.target.value == this.state.correct) {
            alert('Correctomundo!!!');

            this.state.score += 1;
            this.setState({
                score: this.state.score,
            });

        } else {
            alert('Sorry, you need to try harder');
        }

        clearInterval(this.timerId);
        setTimeout(this.startGame(), 2000);

    }

    setAnswers() {
        let buttons = document.querySelectorAll('.answer');
        let answers = this.state.answers;
        console.log(buttons, answers);

        for (let i = 0; i < buttons.length; i++) {
            for (let j = i; j < answers.length; j++) {
                buttons[i].value = answers[i];
                buttons[i].innerText = answers[i];
            }
        }

    }

    render() {

        return <div>
            <h1>{this.state.firstNum} {this.state.operator} {this.state.lastNum} = ?</h1>
            <div>
                <button className="answer" disabled={this.state.disabledButtons} onClick={this.checkAnswer.bind(this)}/>
                <button className="answer" disabled={this.state.disabledButtons} onClick={this.checkAnswer.bind(this)}/>
                <button className="answer" disabled={this.state.disabledButtons} onClick={this.checkAnswer.bind(this)}/>
                <button className="answer" disabled={this.state.disabledButtons} onClick={this.checkAnswer.bind(this)}/>
            </div>
            <h2>{this.state.score}</h2>
            <h2>{
                (this.state.timeLeft <= 0) ?
                    'Time\'s up' :
                    (this.state.timeLeft + (this.state.timeLeft <= 1 ? ' second left' : ' seconds left'))
            }</h2>
        </div>
    }

}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <MathQuestionGame/>,
        document.getElementById('app')
    );
});