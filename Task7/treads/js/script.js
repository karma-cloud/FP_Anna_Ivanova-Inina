// 1. Создаем Observable для генерации простых чисел
const primeNumbersObservable = new rxjs.Observable(observer => {
    const isPrime = num => {
        for (let i = 2; i < num; i++)
            if (num % i === 0) return false;
        return num !== 1;
    };

    for (let i = 1; i <= 100; i++) {
        if (isPrime(i)) {
            observer.next(i);
        }
    }

    observer.complete();
});

// Подписываемся на Observable для вывода результатов
primeNumbersObservable.subscribe(primeNumber => {
    const outputElement = document.getElementById("primeNumbersOutput");
    outputElement.innerText += "  " + primeNumber + "  ";
});

// 2
const outputElement = document.getElementById("countdownOutput");
const countdownValues = [5, 4, 3, 2, 1];
const source2 = rxjs.from(countdownValues);
const countdown = source2.pipe(
    rxjs.operators.concatMap((value, index) => {
        if (index === countdownValues.length - 1) {
            return rxjs.throwError(' Обратный отсчет завершен');
        }
        return rxjs.of(value);
    }),
);
countdown.subscribe({
    next(value) { outputElement.innerHTML += `Обратный отсчет: ${value}<br/>`; },
    error(err) { outputElement.innerHTML += `${err}<br/>`; },
});

// 3. Создаем Observable из событий click для каждой кнопки
const btn1$ = rxjs.fromEvent(document.getElementById("btn1"), "click");
const btn2$ = rxjs.fromEvent(document.getElementById("btn2"), "click");
const btn3$ = rxjs.fromEvent(document.getElementById("btn3"), "click");

// 4. Объединяем потоки в один
const combined$ = rxjs.merge(btn1$, btn2$, btn3$);

// 5. Подписываемся на события и рандомно меняем фон страницы
combined$.subscribe(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
});