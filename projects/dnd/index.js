/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

// const div = document.querySelector('.draggable-div');

document.addEventListener('mousemove', (e) => {});

function addListeners(target) {
  let shiftX, shiftY;

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  function handleDragStart(e) {
    shiftX = e.pageX - getCoords(target).left;
    shiftY = e.pageY - getCoords(target).top;
  }

  function handleDragEnd(e) {
    target.style.left = e.pageX - shiftX + 'px';
    target.style.top = e.pageY - shiftY + 'px';
  }

  target.addEventListener('dragend', handleDragEnd);
  target.addEventListener('dragstart', handleDragStart);
}

export function createDiv() {
  const div = document.createElement('div');
  div.className = 'draggable-div';
  div.draggable = true;
  div.style.height = getRandomSize();
  div.style.width = getRandomSize();
  div.style.top = getRandomSize();
  div.style.left = getRandomSize();
  div.style.backgroundColor = `rgb(${getRandomColor(0, 255)}, ${getRandomColor(
    0,
    255
  )}, ${getRandomColor(0, 255)})`;
  div.style.position = 'absolute';
  div.style.cursor = 'pointer';
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

const getRandomSize = () => Math.floor(Math.random() * 500) + 'px';
function getRandomColor(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
  addListeners(div);
});
