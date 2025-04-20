import styles from './calculator-buttons.module.css';

export const CalculatorButton = (props) => {
    const buttonColor = () => {
        let result = '';
        switch (props.titleButton) {
            case 'C':
                result = 'cancell';
                break;
            case '=':
                result = 'result';
                break;
            case '+':
                result = 'plus';
                break;
            case '-':
                result = 'minus';
                break;
            default:
                break;
        }
        return result;
    };
    return (
        <button className={styles.calcButton + ' ' + styles[buttonColor()]} id={props.titleButton} onClick={props.onClick}>
            {props.titleButton}
        </button>
    );
};
