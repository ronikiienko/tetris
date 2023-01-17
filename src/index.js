import {Field} from './Field';
import {LimitedCounter} from './utils';


console.log('hello');
const field = new Field();
field.init();
const counter = new LimitedCounter(-1, 2);
const counterNode = document.body.appendChild(document.createElement('p'));
counterNode.textContent = counter.count.toString();
const decrementButton = document.body.appendChild(document.createElement('button'));
decrementButton.textContent = 'decrement';
const incrementButton = document.body.appendChild(document.createElement('button'));
incrementButton.textContent = 'increment';
decrementButton.addEventListener('click', () => {
    counter.decrement();
    counterNode.textContent = counter.count.toString();
});
incrementButton.addEventListener('click', () => {
    counter.increment();
    counterNode.textContent = counter.count.toString();
});