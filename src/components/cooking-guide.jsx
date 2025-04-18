import { useState } from 'react';
import styles from './coocing-guide.module.css';
import data from './data.json';

export const CookingGuide = () => {
    // Можно задать 2 состояния — steps и activeIndex
    const [steps] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);

    // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
    const moveForward = () => {
        if (activeIndex === steps.length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    };

    const moveBack = () => {
        if (activeIndex !== 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
    const isFirstStep = () => {
        if (activeIndex === 0) {
            return true;
        } else {
            return false;
        }
    };

    const isLastStep = () => {
        if (activeIndex === steps.length - 1) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {/* Для получения активного контента использйте steps и activeIndex */ steps[activeIndex].content}
                        {/*Контент соответственный шагу. Сейчас активен шаг 3*/}
                    </div>
                    {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
                    <ul className={styles['steps-list']}>
                        {steps.map(({ id, title }) => {
                            return (
                                <li
                                    key={id}
                                    className={
                                        styles['steps-item'] +
                                        ' ' +
                                        (activeIndex >= Number(id) - 1 ? styles.done + ' ' : '') +
                                        (activeIndex == Number(id) - 1 ? styles.active : '')
                                    }
                                >
                                    {/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
                                    <button
                                        className={styles['steps-item-button']}
                                        onClick={() => {
                                            setActiveIndex(Number(id) - 1);
                                        }}
                                    >
                                        {Number(id)}
                                    </button>
                                    {/* При клике на кнопку установка выбранного шага в качестве активного */}
                                    {title}
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles['buttons-container']}>
                        <button className={styles.button} onClick={moveBack} disabled={isFirstStep()}>
                            Назад
                        </button>
                        <button className={styles.button} onClick={moveForward}>
                            {!isLastStep() ? 'Далее' : 'Начать сначала'}
                            {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
                            {/* Или заменять всю кнопку в зависимости от условия */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
