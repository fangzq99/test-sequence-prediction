function myFunction() {
  let firstButton = document.querySelector('.test1');

  if (firstButton.innerHTML === 'Hello') {
    firstButton.innerHTML = 'Try it';
  } else {
    firstButton.innerHTML = 'Hello';
  }
}

function myFunction2() {
  document.querySelector('.test2').innerHTML = 'this is cool';

  window.alert(' i am slow ');
}

const myFunction3 = () => {
  var temp2 = 'ohhh';
  var temp3 = new Array(2);

  temp3.push(['a']);
  temp3.splice();
  window.alert(typeof temp2 + temp3);
};

const displayText = () => {
  let testDisplayContainer = document.querySelector('.text-display-container');
  if (testDisplayContainer.innerHTML === 'hello world') {
    testDisplayContainer.innerHTML = '';
  } else if (testDisplayContainer.innerHTML === '') {
    testDisplayContainer.innerHTML = 'hello world';
  } else {
    window.alert('ERROR');
  }
};
