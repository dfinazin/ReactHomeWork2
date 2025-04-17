import { useState } from 'react';
import styles from './list-maker.module.css';

export const ListMaker = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [isValueVaild, setIsValueVaild] = useState(false);

    const onInputButtonClick = () => {
        const promptValue = prompt('Укажите число');
        if (promptValue.length < 3) {
            setError('Введенное значение должно содержать минимум 3 символа');
            setIsValueVaild(false);
        } else if (promptValue.length > 2) {
            setValue(promptValue);
            setError('');
            setIsValueVaild(true);
        }
        return;
    };

    const onAddButtonClick = () => {
        if (isValueVaild) {
            const updatedList = [...list, { id: Date.now(), value: value, date: getCurrentDate() }];
            setList(updatedList);
            setValue('');
            setError('');
            setIsValueVaild(false);
        }
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toLocaleString('ru');
    };

    return (
        <>
            <div className={styles['app']}>
                <h1 className={styles['page-heading']}>Ввод значения</h1>
                <p className={styles['no-margin-text']}>
                    Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
                </p>
                {error !== '' ? <div className={styles['error']}>{error}</div> : false}
                <div className={styles['buttons-container']}>
                    <button className={styles['button']} onClick={onInputButtonClick}>
                        Ввести новое
                    </button>
                    <button className={styles['button']} disabled={!isValueVaild} onClick={onAddButtonClick}>
                        Добавить в список
                    </button>
                </div>
                <div className={styles['list-container']}>
                    <h2 className={styles['list-heading']}>Список:</h2>
                    {list.length === 0 ? <p className={styles['no-margin-text']}>Нет добавленных элементов</p> : false}
                    <ul className={styles['list']}>
                        {list.map(({ id, value, date }) => {
                            return (
                                <li key={id} className={styles['list-item']}>
                                    "{value}" {date}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};
