"use strict";

window.onload = () => {
  welcome();
};

class UsersATM {
  constructor(_name, _movements, _pin, _currUser) {
    this.name = _name;
    this.movements = _movements;
    this.pin = _pin;
    this.currentUser = _currUser;
  }
}
const user1 = new UsersATM("Einat Ben Aharon", [100, -50, 500, 1000], 1111);
const user2 = new UsersATM("Avi Cohen", [50, 100, -100, 300], 2222);
const user3 = new UsersATM(
  "Elon Musk",
  [5000, 1000000, 89502030, -1000, 60000000],
  3333
);

let currentUser;

const users = localStorage["users"]
  ? JSON.parse(localStorage["users"])
  : [user1, user2, user3];
const screen = document.querySelector("#content");
const inputLoginPin = document.querySelector("#userPin");
const imgCard = document.querySelector("#card");
const imgCash = document.querySelector("#cash");
const imgPaper = document.querySelector(".receiptpaper");
const btnDeposite = document.querySelector("#opbut1");
const btnWithdraw = document.querySelector("#opbut2");
const btnCheckBalance = document.querySelector("#opbut3");
const btnPinChange = document.querySelector("#opbut4");
const btnReceipt = document.querySelector("#opbut5");
const btnQuit = document.querySelector("#opbut6");
const btnDelete = document.querySelector("#delete");
const enterBtn = document.querySelector("#enter");
const clearBtn = document.querySelector("#clear");
const cancelBtn = document.querySelector("#cancel");
const opDscreen = document.querySelector("#option1");
const opWscreen = document.querySelector("#option2");
const opCscreen = document.querySelector("#option3");
const opPscreen = document.querySelector("#option4");
const opRscreen = document.querySelector("#option5");
const opQscreen = document.querySelector("#option6");
const balance = document.querySelector(".balance");
const btnNumbers = document.querySelectorAll(".btnNum");

// Console Random user //
currentUser = users[Math.floor(Math.random() * users.length)];
console.log(`User: ${currentUser.name},
Users PIN: ${currentUser.pin}`);

const numberToInput = (input) => {
  btnNumbers.forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value += btn.value;
    });
  });
  btnDelete.addEventListener("click", (value) => {
    input.value = input.value.substring(0, input.value.length - 1);
  });
  clearBtn.addEventListener("click", (value) => {
    input.value = "";
  });
  cancelBtn.addEventListener("click", reloadPage);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
};
const updateUI = (usr) => {
  calcDisplayBalance(currentUser);
  localStorage.setItem("users", JSON.stringify(users));
};
const welcome = () => {
  numberToInput(inputLoginPin);
  imgCard.addEventListener("click", () => {
    if (inputLoginPin.value.length > 4 && inputLoginPin.value.length < 4) {
      return alert("I will eat your card");
    } else if (Number(inputLoginPin.value) !== currentUser.pin) {
      return alert("PIN is not correct! I will eat your card");
    } else {
      card.style.animationName = "example";
      declareEvents();
      mainScreen();
      updateUI(currentUser);
    }
  });
};
const declareEvents = () => {
  // imgCard.addEventListener("click", welcome);
  btnDeposite.addEventListener("click", desposite);
  btnWithdraw.addEventListener("click", withdraw);
  btnCheckBalance.addEventListener("click", checkBalance);
  btnPinChange.addEventListener("click", changePinCode);
  btnReceipt.addEventListener("click", receipt);
  btnQuit.addEventListener("click", quit);
};
const mainScreen = function () {
  screen.innerHTML = `<h2>Hello ${currentUser.name}, Welcome back.
  What you want to do next?</h2>`;
  opDscreen.innerHTML = `Press button D to Deposite Money`;
  opWscreen.innerHTML = `Press button W to Withdraw Money`;
  opCscreen.innerHTML = `Press button C to Check your Balance`;
  opPscreen.innerHTML = `Press button P to Change your PIN code`;
  opRscreen.innerHTML = `Press button R to create Receipt`;
  opQscreen.innerHTML = `Press button Q to Quit`;
};
const mainScreenCleare = () => {
  opDscreen.innerHTML = "";
  opWscreen.innerHTML = "";
  opCscreen.innerHTML = "";
  opPscreen.innerHTML = "";
  opRscreen.innerHTML = "";
  opQscreen.innerHTML = "";
};
const desposite = () => {
  mainScreenCleare();
  screen.innerHTML = `<div><h2> ${currentUser.name} , How much would you like to Deposite?</h2>
     <input class="input-D" type="number"></div>`;
  let inputD = screen.querySelector(".input-D");
  numberToInput(inputD);
  enterBtn.addEventListener("click", () => {
    if (
      Number(inputD.value) % 20 == 0 ||
      Number(inputD.value) % 50 == 0 ||
      Number(inputD.value) % 100 == 0
    ) {
      currentUser.movements.push(Number(inputD.value));
      inputD.value = "";
      updateUI(currentUser);
      imgCash.style.zIndex = "2";
      imgCash.style.animationName = "example";
      screen.innerHTML = `<h2>Thank you ${
        currentUser.name.split(" ")[0]
      },  Your current balance is <br> ${currentUser.balance} NIS<br>
        </h2>`;
      console.log(currentUser.balance);
      setTimeout(mainScreen, 3000);
      return;
    } else {
      alert("You can deposite only 20/50/100 banknotes");
    }
  });
};
const withdraw = () => {
  mainScreenCleare();
  screen.innerHTML = `<div><h2> ${
    currentUser.name.split(" ")[0]
  } , How much would you like to withdraw?</h2>
      <button class="btnWithdraw btn50" value="50">50</button>
      <button class="btnWithdraw btn100" value="100">100</button>
      <button class="btnWithdraw btn150" value="150">150</button>
      <button class="btnWithdraw btn300" value="300">300</button>
      <button class="btnOther">Other</button>
      </div>`;
  let withdrawBtns = screen.querySelectorAll(".btnWithdraw");
  let withdrawBtnOther = screen.querySelector(".btnOther");
  withdrawBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let userWithdraw = Number(btn.value);
      if (currentUser.balance <= userWithdraw) {
        return alert("You dont have enough balance for this operation");
      }
      if (currentUser.balance >= userWithdraw) {
        currentUser.movements.push(-userWithdraw);
        updateUI(currentUser);
        imgCash.style.zIndex = "1";
        imgCash.style.animationName = "example2";
        imgCash.addEventListener("click", () => {
          imgCash.style.zIndex = "-999";
        });
        screen.innerHTML = `<h2>Wait for the money came out.
       You withdrawed ${userWithdraw} NIS`;
      }
      setTimeout(mainScreen, 3000);
    });
  });
  withdrawBtnOther.addEventListener("click", () => {
    let otherWithdraw = Number(prompt("How much?"));
    //  Number(otherWithdraw);
    if (currentUser.balance <= otherWithdraw) {
      return alert("You dont have enough balance for this operation");
    }
    if (otherWithdraw % 50 == 0 && currentUser.balance >= otherWithdraw) {
      currentUser.movements.push(-otherWithdraw);
      updateUI(currentUser);
      imgCash.style.zIndex = "2";
      imgCash.style.animationName = "example2";
      imgCash.addEventListener("click", () => {
        imgCash.style.zIndex = "-999";
      });
      screen.innerHTML = `<h2>Wait for the money came out.
      You withdrawed ${otherWithdraw} NIS`;
    } else {
      alert("Only in steps of 50");
    }
    setTimeout(mainScreen, 3000);
  });
};
const checkBalance = () => {
  mainScreenCleare();
  updateUI(currentUser);
  screen.innerHTML = `<h2>${currentUser.name.split(" ")[0]}, 
  your current balance is : <br>
   ${currentUser.balance} NIS.</h2>`;
  setTimeout(mainScreen, 3000);
};
const changePinCode = () => {
  mainScreenCleare();
  screen.innerHTML = `<div><h2>${
    currentUser.name.split(" ")[0]
  }, for change your PIN code,
  fill in the current PIN and press OK- </h2>
  <input id="currentPin" placeholder="4 digits" pattern="[0-9]{4,4}" required>
  <button class="btnCurPin">OK</button></div>`;
  let btnCheckPin = screen.querySelector(".btnCurPin");
  let curPinInput = screen.querySelector("#currentPin");
  numberToInput(curPinInput);
  btnCheckPin.addEventListener("click", () => {
    if (Number(curPinInput.value) === currentUser.pin) {
      mainScreenCleare();
      screen.innerHTML = `<h2>Enter your new PIN code</h2>
      <input id="newPinInput" placeholder="4 digits" pattern="[0-9]{4,4}" required>
      <button class="btnNewPin">Change Pin</button>`;
      let newPinInput = screen.querySelector("#newPinInput");
      let btnNewPin = screen.querySelector(".btnNewPin");
      numberToInput(newPinInput);
      btnNewPin.addEventListener("click", () => {
        if (Number(newPinInput.value.length) === 4) {
          let newPin = Number(newPinInput.value);
          currentUser.pin = newPin;
          updateUI(currentUser);
          console.log(currentUser.pin);
          screen.innerHTML = `<h2>Your PIN code has changed successfully. <br> please remember it.</h2>`;
          setTimeout(mainScreen, 3000);
        } else {
          return alert("PIN must be 4 digits");
        }
      });
    } else {
      return alert("PIN is not correct.");
    }
  });
};
const receipt = () => {
  updateUI();
  imgPaper.style.animationName = "example1";
  imgPaper.innerHTML = `<p class="rcph">Receipt</p>
  <br> <p class="rcp">${currentUser.name},<br>
  you have ${currentUser.balance} NIS<br>
  in your bank account.<br>
  Have a nice day.<br>
  ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}</p>`;
};
const quit = () => {
  mainScreenCleare();
  screen.innerHTML = `<h2>Goodbye ${currentUser.name.split(" ")[0]}. <br>
  Dont forget the card</h2>`;
  card.style.zIndex = "9";
  card.style.animationName = "example2";
  setTimeout(reloadPage, 6000);
};
const reloadPage = () => {
  window.location.reload();
};
