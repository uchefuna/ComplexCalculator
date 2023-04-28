

const calculatorWrapper = document.querySelector('.container-wrapper');
const tb = document.querySelector('.body-text');
const textBoardButtons = document.querySelectorAll('.body-text strong');
const eachCalculator = document.querySelectorAll('.calculator-container');
const calculatorDisplay = document.querySelectorAll('.calculator-display p');
const sideMenuBody = document.querySelector('.sidenav');
const calculatorSelector = document.querySelectorAll('.sidenav>a');
const openSideMenu = document.querySelector('.open-sidemenu');
const calculatorFootDisplay = document.querySelectorAll('.footer-disp');
const keyValues = document.querySelectorAll('.calculator-body input');
const qml = window.matchMedia("(max-width:1100px)")

let equalKey;
let onOffKeys;
let putCalculatorOff = 0, onKeyInterval;
let getindex1 = 0, getindex2 = 0;

var createTagArr = [];

function createHTMLElement(i, parentElement, tag, tagName, idClassName, cssStyles) {
  createTagArr[i] = parentElement.appendChild(document.createElement(tag));//craete span element

  createTagArr[i].innerHTML = tagName;// write a text
  createTagArr[i].className = idClassName;// give it a class name
  createTagArr[i].style.cssText = cssStyles;// and style it
}

function createChildElements() {
  let textScreen = document.querySelector('.text-screen div'),
    pStyles = 'text-align: left; margin: 30% 0 5%; color: #ee8610;',
    spanStyles = 'color: #fdfdfdfb; margin: 0 0 0 4px; letter-spacing: 1px;',
    divStyles = 'text-align: center; margin: 0 0 10% 0;';

  createHTMLElement(0, textScreen, 'p', '> ', 'dispP', pStyles);
  createHTMLElement(1, document.querySelector('.dispP'), 'span', 'Select calculator of your choice', 'dispSpan', spanStyles);
  createHTMLElement(2, textScreen, 'div', '* Standard Calculator', 'dispDiv', divStyles);
  createHTMLElement(3, textScreen, 'div', '* Developer Calculator', 'dispDiv', divStyles);
  createHTMLElement(4, textScreen, 'div', '* Scientific Calculator', 'dispDiv', divStyles);
  createHTMLElement(5, textScreen, 'div', '* Converter Calculator', 'dispDiv', divStyles);
  createHTMLElement(6, textScreen, 'div', '* Time Calculator', 'dispDiv', divStyles);
  createTagArr = [];
}

window.onload = evt => {
  createChildElements();
  openSideMenu.innerHTML = '&#9776;';
  openSideMenu.style.cssText = // and style it
    "position: absolute; right: 10px;top: 10px;font-size: 30px; cursor: pointer;color: #fcfcfc; ";
};

//click functionality of the HTML
window.onclick = event => {
  if (putCalculatorOff != 0)
    calculatorLogic(event);

  if ((sideMenuBody.style.width == "20%" || sideMenuBody.style.width == "40%") && (event.target == calculatorSelector[1] || event.target == calculatorSelector[2] || event.target == calculatorSelector[3] || event.target == calculatorSelector[4] || event.target == calculatorSelector[5]) && (event.target != calculatorSelector[0]) && (event.target != textBoardButtons[1])) {
    callDifferentCalculator(event);
  }

  if (event.target == openSideMenu) {//open side menu bar
    openMenuBar();
  } else if (event.target == calculatorSelector[0]) {//close side menu bar
    closeMenuBar();
  } else if (event.target == textBoardButtons[0]) {
    if (eachCalculator[getindex2].style.display === 'flex') {
      eachCalculator[getindex2].style.display = 'none';
      setTimeout(e => {
        calculatorWrapper.style.cssText = // and style it
          "justify-content: center; ";
        document.querySelector('.text-screen div').style.display = 'block';
      }, 200);
    }
  } else if (event.target == textBoardButtons[1]) {
    if (eachCalculator[getindex2].style.display === 'flex') {
      tb.style.display = 'none';
      calculatorWrapper.style.cssText = // and style it
        "height:760px ";
    }
  }
};

function openMenuBar() {
  sideMenuBody.style.width = "20%";
  openSideMenu.style.display = 'none';
  putCalculatorOff = 0;

  if (qml.matches) {
    sideMenuBody.style.width = "40%";
    if (tb.style.display === 'none') {
      tb.style.display = 'block';
      calculatorWrapper.style.cssText = // and style it
        "height: auto; ";
    }
  } else {
    if (tb.style.display === 'none') {
      tb.style.display = 'block';
      calculatorWrapper.style.cssText = // and style it
        "justify-content: left; ";
    }
  }
}

function closeMenuBar() {
  sideMenuBody.style.width = "0";
  setTimeout(e => {
    openSideMenu.style.display = 'block';
  }, 200);
}

// function to call individual calculator
function callDifferentCalculator(event) {
  calculatorSelector.forEach((e, i) => {
    if (event.target === e) {
      calculatorSelector[getindex2 + 1].style.cssText = // and style it
        "color: #818181; ";
      calculatorSelector[i].style.cssText = // and style it
        "color: #e2d518f3; ";//yellow

      if (qml.matches) {
        clearTimeout(onKeyInterval);
        eachCalculator[i - 1].style.display = 'flex';
      } else {
        calculatorWrapper.style.cssText = // and style it
          "justify-content: left; ";
      }

      document.querySelector('.text-screen div').style.display = 'none';
      eachCalculator[getindex2].style.display = 'none';
      onKeyInterval = setTimeout(e => {
        eachCalculator[i - 1].style.display = 'flex';
        putCalculatorOff = 1;

        if (i > 4)
          getindex1 = 5, getindex2 = 4;
        else
          getindex1 = getindex2 = i - 1;
        calculatorDisplay[getindex1].innerHTML =
          "<span style='color:red;'>" + 'OFF' + "</span>";
        calculatorFootDisplay[getindex2].innerHTML =
          "The Calculator is <strong>OFF</strong>. Turn it ON to use it.";

        closeMenuBar();
        onKeyAnimation(getindex2);
      }, 320);
    }
  });
}

function onKeyAnimation(getindex2) {

  clearTimeout(onKeyInterval);
  let g = 0;
  if ((getindex2 === 2) || (getindex2 === 4))
    g = 5;
  else if (getindex2 === 3)
    g = 10;
  g = (getindex2 * (5 * 7)) + g;

  onKeyAnimationRepeat(g);

  function onKeyAnimationRepeat(g) {
    keyValues[g].animate({
      opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
    }, 2000);
    putCalculatorOff = 1;
    onKeyInterval = setTimeout(e => { onKeyAnimationRepeat(g); }, 1900);
  }
}

function getSelectedOption(sel) {
  for (var i = 0, len = sel.options.length; i < len; i++) {
    if (sel.options[i].selected === true) {
      return sel.options[sel.selectedIndex];
    }
  }
}

document.querySelector('.selector1').addEventListener('click', e => {
  if (putCalculatorOff == 2) {
    e.preventDefault();
    var opt = getSelectedOption(document.querySelector('.selector1'));
    console.log(opt.text);
  } else {
    document.querySelector('.selector1').value = '';
  }
});
document.querySelector('.selector2').addEventListener('click', e => {
  if (putCalculatorOff == 2) {
    e.preventDefault();
    var opt = getSelectedOption(document.querySelector('.selector2'));
    console.log(opt.value);
  } else {
    document.querySelector('.selector2').value = '';
  }
});
document.querySelector('.selector3').addEventListener('click', e => {
  if (putCalculatorOff == 2) {
    e.preventDefault();
    var opt = getSelectedOption(document.querySelector('.selector3'));
    console.log(opt.value);
  } else {
    document.querySelector('.selector3').value = '';
  }
});
document.querySelector('.selector4').addEventListener('click', e => {
  if (putCalculatorOff == 2) {
    e.preventDefault();
    var opt = getSelectedOption(document.querySelector('.selector4'));
    console.log(opt.value);
  } else {
    document.querySelector('.selector4').value = '';
  }
});


//------------------- STANDARD CALCULATOR -----------------------------

let keyValues2 = 0;
let b = '';
function calculatorLogic(event) {

  // listen for a key press and perform the required task
  for (let i = 0; i < keyValues.length; i++) {
    if (event.target == keyValues[i]) {

      let printKeys;
      printKeys =
        "i: " + i +
        ' key-len: ' + keyValues.length +
        ' key-val: ' + keyValues[i].value +
        ' putCalculatorOff: ' + putCalculatorOff;
      console.log(printKeys);

      if ((sideMenuBody.style.width == "20%" || sideMenuBody.style.width == "40%")) {
        closeMenuBar();
        return;
      }

      // toggle the calculator on/off
      if (putCalculatorOff != 2) {
        if (keyValues[i].value == 'on') {
          putCalculatorOff = 2;
          onOffKeys = keyValues[i].value.toUpperCase();
          calculatorDisplay[getindex1].innerHTML = "<span style='color:gold;'>" + onOffKeys + "</span>";
          calculatorFootDisplay[getindex2].innerHTML =
            'The Calculator is ' + '<strong>' + onOffKeys + '</strong>';
          onOffKeys = true;
          clearTimeout(onKeyInterval);
          return;
        }
      }
      else if (putCalculatorOff == 2) {
        if (keyValues[i].value == 'off') {
          onKeyAnimation(getindex2);
          onOffKeys = keyValues[i].value.toUpperCase();
          calculatorDisplay[getindex1].innerHTML = "<span style='color:red;'>" + onOffKeys + "</span>";
          calculatorFootDisplay[getindex2].innerHTML =
            'The Calculator is ' + '<strong>' + onOffKeys + '</strong>' + ". Turn it ON to use it.";
          onOffKeys = true;
          return;
        }
      }

      if (putCalculatorOff == 2 && keyValues[i].value != 'on' && keyValues[i].value != 'off') {

        //clear calculator display after pressing the on/off keys
        if (onOffKeys) {
          calculatorFootDisplay[getindex2].innerHTML = '';
          calculatorDisplay[getindex1].innerHTML = '';
          onOffKeys = false;
        }

        if (keyValues[i].value === 'AC') { //if key AC is pressed, display value
          calculatorFootDisplay[getindex2].innerHTML = '';
          calculatorDisplay[getindex1].innerHTML = '';
          b = '';
        } else if (keyValues[i].value === 'DC') {//if key DC is pressed, display value
          calculatorFootDisplay[getindex2].innerHTML = calculatorFootDisplay[getindex2].innerHTML.toString().slice(0, -1);
          calculatorDisplay[getindex1].innerHTML = calculatorDisplay[getindex1].innerHTML.toString().slice(0, -1);
        } else if (keyValues[i].value === 'Pi') {
          keyValues2 = keyValues[i].value.slice(0, 2).toLowerCase();
          console.log('keyValues2: ', keyValues2)
          keyValues2 = scientificLogic(keyValues2);
          calculatorDisplay[getindex1].innerHTML = keyValues2;
          calculatorFootDisplay[getindex2].innerHTML = keyValues2;
          return;
        } else if ((keyValues[i].value === '=')) {//if key = is pressed, display value
          equalKey = '=';

          calculatorDisplay[getindex1].innerHTML += '';
          calculatorFootDisplay[getindex2].innerHTML += '';

          if (['bin', 'oct', 'dec', 'b12', 'hex'].some(e => (e === calculatorDisplay[getindex1].innerHTML.slice(-3).toLowerCase()))) {
            keyValues2 = calculatorDisplay[getindex1].innerHTML.slice(-3).toLowerCase();

            console.log('keyValues2: ', keyValues2)
            // return;

            if (`ABCDEF`.split('').some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)))) {
              calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
              calculatorDisplay[getindex1].innerHTML = 'FAULT';
              b = '';
              return;
            }
            keyValues2 = scientificLogic(keyValues2);
            calculatorDisplay[getindex1].innerHTML = keyValues2;
            calculatorFootDisplay[getindex2].innerHTML = keyValues2;
            return;
          } else if (['sin', 'cos', 'tan', 'log', 'ln2', 'exp', 'sqr'].some(e => (e === calculatorDisplay[getindex1].innerHTML.slice(0, 3).toLowerCase()))) {
            keyValues2 = calculatorDisplay[getindex1].innerHTML.slice(0, 3).toLowerCase();

            if (`ABCDEF`.split('').some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)))) {
              calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
              calculatorDisplay[getindex1].innerHTML = 'FAULT';
              return;
            }
            console.log('keyValues2: ', keyValues2)
            // return;
            keyValues2 = scientificLogic(keyValues2);
            calculatorDisplay[getindex1].innerHTML = keyValues2;
            calculatorFootDisplay[getindex2].innerHTML = keyValues2;
            return;
          } else if (['and', 'xor', 'nan', 'nor', 'or', 'ls', 'rs', 'not'].some(e => (calculatorDisplay[getindex1].innerHTML.includes(e)))) {
            // keyValues2 = calculatorDisplay[getindex1].innerHTML.slice(0, 3).toLowerCase();

            if (`ABCDEF`.split('').some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)))) {
              calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
              calculatorDisplay[getindex1].innerHTML = 'FAULT';
              return;
            }
            console.log('keyValues2: ', keyValues2)
            // return;
            keyValues2 = developerLogic(keyValues2);
            calculatorDisplay[getindex1].innerHTML = keyValues2;
            calculatorFootDisplay[getindex2].innerHTML = keyValues2;
            return;
          } else if (['nan', 'nor', 'xor', 'and', 'not'].some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)))) {
            calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
            calculatorDisplay[getindex1].innerHTML = 'FAULT';
            return;
          } else {

            var strongChars1 = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`.split('').some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)));
            var strongChars2 = `abcdefABCDEF`.split('').some(c => (calculatorDisplay[getindex1].innerHTML.includes(c)));
            var strongChars3 = /^[!@#$%^&*()_\=\[\]{};':"\\|,.<>\/?]/.test(calculatorDisplay[getindex1].innerHTML);
            var strongChars4 = /[!@#$%^&*(_+\-=\[\]{};':"\\|,.<>\/?]$/.test(calculatorDisplay[getindex1].innerHTML);

            if (strongChars2 || strongChars3 || strongChars4) {
              calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
              calculatorDisplay[getindex1].innerHTML = 'FAULT';
              return;
            }

            if (strongChars1 && !strongChars2 && !strongChars4) {
              calculatorFootDisplay[getindex2].innerHTML = (new Function('return ' + calculatorFootDisplay[getindex2].innerHTML))();
              calculatorDisplay[getindex1].innerHTML = (new Function('return ' + calculatorDisplay[getindex1].innerHTML))();
            }
          }
        } else {//if other remianing keys is pressed, display value
          if ((equalKey === '=' || calculatorDisplay[getindex1].innerHTML === 'FAULT') && (b === '') && (!['/', '*', '+', '-', '%', 'bin', 'oct', 'dec', 'b12', 'hex'].some(e => (e === keyValues[i].value)))) {
            // console.log('here 1');
            calculatorFootDisplay[getindex2].innerHTML = '';
            calculatorDisplay[getindex1].innerHTML = '';
          }

          if (['M+', 'M-', 'MR', 'MC', 'MS', 'MU', 'bin', 'oct', 'dec', 'b12', 'hex'].some(e => (e === keyValues[i].value))) {

            calculatorFootDisplay[getindex2].innerHTML += '';
            calculatorDisplay[getindex1].innerHTML += '';

            // if (['or', 'ls', 'rs'].some(e => (e === keyValues[i].value))) {
            //   // let o = ' ' + keyValues[i].value + ' ';
            //   calculatorFootDisplay[getindex2].innerHTML += ' ' + keyValues[i].value + ' ';
            //   calculatorDisplay[getindex1].innerHTML += ' ' + keyValues[i].value + ' ';
            // }

            if ((calculatorDisplay[getindex1].innerHTML !== '') && (['bin', 'oct', 'dec', 'b12', 'hex'].some(e => (e === keyValues[i].value)))) {

              if (b != '') {
                calculatorFootDisplay[getindex2].innerHTML = calculatorFootDisplay[getindex2].innerHTML.toString().slice(0, -5);
                calculatorDisplay[getindex1].innerHTML = calculatorDisplay[getindex1].innerHTML.toString().slice(0, -5);
              }

              if (keyValues[i].value === 'bin')
                b = (' -bin');
              else if (keyValues[i].value === 'oct')
                b = (' -oct');
              else if (keyValues[i].value === 'dec')
                b = (' -dec');
              else if (keyValues[i].value === 'b12')
                b = (' -b12');
              else if (keyValues[i].value === 'hex')
                b = (' -hex');
              calculatorFootDisplay[getindex2].innerHTML += b;
              calculatorDisplay[getindex1].innerHTML += b;
              return;
            }
          } else if (['sin', 'cos', 'tan', 'log', 'ln2', 'exp', 'sqr'].some(e => (e === keyValues[i].value))) {
            calculatorFootDisplay[getindex2].innerHTML = keyValues[i].value + ' ';
            calculatorDisplay[getindex1].innerHTML = keyValues[i].value + ' ';
            equalKey = '';
            return;
          } /* else if (['not'].some(e => (e === keyValues[i].value))) {
            calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
            calculatorDisplay[getindex1].innerHTML = 'FAULT';
            return;
          } */ else if (['x/y', 'mod', '|x|', '1/x', 'x2', '--'].some(e => (e === keyValues[i].value))) {
            calculatorFootDisplay[getindex2].innerHTML = 'FAULT';
            calculatorDisplay[getindex1].innerHTML = 'FAULT';
            return;
          } else {
            calculatorDisplay[getindex1].innerHTML += keyValues[i].value;
            calculatorFootDisplay[getindex2].innerHTML += keyValues[i].value;
            equalKey = '';
          }
        }
      }
    }
  }
}

//----------------------------------------------------------------------

function scientificLogic(keyValues2) {
  b = '';
  console.log('keyValues2: ', keyValues2)
  let integerOnly = parseInt(calculatorDisplay[getindex1].innerHTML.match(/\d+/g));
  console.log('integerOnly: ', integerOnly)

  switch (keyValues2) {
    case 'pi':
      return (Math.PI).toFixed(2);
    case 'sin':
      // console.log('sin: ', Math.sin(integerOnly * (Math.PI / 180)).toFixed(2))
      return Math.sin(integerOnly * (Math.PI / 180)).toFixed(2);
    case 'cos':
      return Math.cos(integerOnly * (Math.PI / 180)).toFixed(2);
    case 'tan':
      return Math.tan(integerOnly).toFixed(2);
    case 'log':
      return Math.log(integerOnly).toFixed(2);
    case 'ln2':
      return Math.log2(integerOnly).toFixed(2);
    case 'exp':
      return Math.exp(integerOnly).toFixed(2);
    case 'sqr':
      return Math.sqrt(integerOnly).toFixed(2);
    case 'hex':
      return integerOnly.toString(16);
    case 'b12':
      return integerOnly.toString(12);
    case 'dec':
      return integerOnly.toString(10);
    case 'oct':
      return integerOnly.toString(8);
    case 'bin':
      return integerOnly.toString(2);
  }
}

function developerLogic(keyValues2) {
  b = '';
  console.log('keyValues2: ', keyValues2)
  let baseNum0 = calculatorDisplay[getindex1].innerHTML.trim().split(/(\d+)/g).filter(n => n);
  let baseNum1 = baseNum0[0];
  keyValues2 = baseNum0[1];
  let baseNum2 = baseNum0[2];
  console.log('baseNum0: ', baseNum0)
  console.log('baseNum1: ', baseNum1)
  console.log('baseNum1: ', baseNum2)
  console.log('keyValues2: ', keyValues2)
  // return;

  switch (keyValues2) {
    case 'ls':
      return baseNum1 <<= baseNum2; //Left Shift Assignment Operator
    case 'rs':
      return baseNum1 >>= baseNum2; //Right Shift Assignment Operator
    // case sqrR:
    //   return baseNum1 >>>= baseNum2; //Unsigned Right Shift Assignment Operator
    case 'nan':
      return baseNum1 &= baseNum2; //Bitwise AND Assignment Operator
    case 'nor':
      return baseNum1 |= baseNum2; //Bitwise OR Assignment Operator
    case 'xor':
      return baseNum1 ^= baseNum2; //Bitwise XOR Assignment Operator
    case 'and':
      return baseNum1 &&= baseNum2; //Logical AND assignment operator
    case 'or':
      return baseNum1 ||= baseNum2; //Logical OR assignment operator
    case 'not':
      return baseNum1 ??= baseNum2; //Nullish coalescing assignment operator
  }
}