import { useState } from 'react';
import { CalculatorButton } from './calculator-buttons';
import calcControls from './calculator-controls.json';
import styles from './calculator-lite.module.css';

export const CalculatorLite = () => {
    //const [currentDigit, setCurrentDigit] = useState(0);
    const [currentInput, setCurrentInput] = useState('0');
    const [currentOperator, setCurrentOperator] = useState('C');
    const [currentResult, setCurrentResult] = useState('0');
    const [isResult, setIsResult] = useState(true);
    const [resultColor, setResultColor] = useState('');

    const calculation = (arg1, arg2, oldOperator, newOperator) => {
        const result = { result: arg1, input: arg2 };
        newOperator === '=' ? setResultColor('resultColor') : setResultColor('');
        if (newOperator === 'C') {
            result.result = '0';
            result.input = '0';
        } else if (!isResult) {
            switch (oldOperator) {
                case 'C':
                    result.result = arg2;
                    result.input = arg2;
                    break;
                case '=':
                    result.result = arg2;
                    result.input = arg2;
                    break;
                case '+':
                    result.result = (Number(arg1) + Number(arg2)).toString();
                    result.input = (Number(arg1) + Number(arg2)).toString();
                    break;
                case '-':
                    result.result = (Number(arg1) - Number(arg2)).toString();
                    result.input = (Number(arg1) - Number(arg2)).toString();
                    break;
                default:
                    break;
            }
        } else {
            result.result = arg1;
            result.input = arg2;
        }
        console.log(result, 'currentResult =', currentResult, 'currentInput=', currentInput, 'isResult=', isResult);
        return result;
    };

    return (
        <div className={styles.calc}>
            <input
                className={styles.screen + ' ' + styles[resultColor]}
                type="text"
                value={currentInput}
                onChange={(e) => {
                    e.target.value = currentInput;
                }}
            />
            <div className={styles.buttons}>
                <div className={styles.digits}>
                    {calcControls.digits.map((dig) => {
                        return (
                            <CalculatorButton
                                key={dig}
                                titleButton={dig}
                                onClick={() => {
                                    //setCurrentDigit(dig);
                                    isResult ? setCurrentInput(dig.toString()) : setCurrentInput(currentInput + dig.toString());
                                    setIsResult(false);
                                    setResultColor('');
                                }}
                            />
                        );
                    })}
                </div>
                <div className={styles.operators}>
                    {calcControls.operators.map((operator) => {
                        return (
                            <CalculatorButton
                                key={operator}
                                titleButton={operator}
                                onClick={() => {
                                    setIsResult(true);
                                    setCurrentResult(calculation(currentResult, currentInput, currentOperator, operator).result);
                                    setCurrentInput(calculation(currentResult, currentInput, currentOperator, operator).input);
                                    setCurrentOperator(operator);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
