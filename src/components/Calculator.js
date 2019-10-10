import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import * as math from 'mathjs';
import '../App.scss';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    }
  }

  calculate = () => {
    let checkResult = '';
    let { result } = this.state;

    if (result.toString().includes('--')) {
      checkResult = result.toString().replace(/--/g, '+');
    } else if (result.toString().includes('÷')) {
        checkResult = result.toString().replace(/÷/g, '/');
    } else {
      checkResult = result;
    }

    try {
      let showResult = math.evaluate((checkResult || 0));
      
      if (Number.isNaN(showResult)) {
        showResult = 'error';
      }

      this.setState({ result: showResult });
      
    } catch (e) {
      this.setState({ result: 'error' })
    }
  }

  handleTrigger = key => {
    let replaceKey = '';

    switch(key) {
        case 'enter':
            replaceKey = '=';
            break;
        case 'shift+=':
            replaceKey = '+';
            break;
        case 'shift+8':
            replaceKey = '*';
            break;
        case 'shift+;':
            replaceKey = '÷';
            break;
        default:
        replaceKey = key;
    }

    this.onClickButton(replaceKey);
  }

  onClickButton = value => {
    let { result } = this.state;

    if (value === "=") {
      this.calculate();
    } else if (value === "Clear") {
      this.reset();
    } else {
      if(result === 'error' || ((result.toString() === 'Infinity' || result.toString() === '-Infinity') && Number.isInteger(parseInt(value)))) {
        this.setState({ result: '' + value });
      } else {
        this.setState({ result: result + value });
      }
    }
  }

  reset = () => {
    this.setState({ result: '' });
  }

  render() {
    const { result } = this.state;

    return (
        <div className="calculator-wrapper">
            <div className="result">{result || 0}</div>
            <div className="calculator-group-button">
                {
                    ['Clear', '÷', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '='].map((item, key) => {
                        return <span name={item} key={key} onClick={() => this.onClickButton(item)} className={key === 0 ? 'more-space' : ''}>{item}</span>
                    })
                }
            </div>
            <KeyboardEventHandler
                handleKeys={['numeric', 'enter', 'shift+=', '-', 'shift+8', '/', 'shift+;', '.']}
                onKeyEvent={(key) => this.handleTrigger(key)}
            />
        </div>
    );
  }
}
