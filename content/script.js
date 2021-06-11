// all the important Keys and numbers-----------------------------------
// Please Donot Give this data to any one this may cause you a problem
const API_KEY = "5e3749d7-73f0-4c2a-bb6c-dda24d7c6a07";
const DEVICE_ID = "BOLT5780232";
const USERNAME = "1";
const PASSWORD = "1";
// =====================================================================
// const API_KEY = 'Api Key '
// const DEVICE_ID = 'Your Bolt device ID'
// const USERNAME = "Username to your login system"
// const PASSWORD = "Password of Your Login System"
// ---------------------------------------------------------------------
// some important tags to be featched from the DOM
let security = document.getElementById("security");
let open_close = document.getElementById("open_close");
let success = document.getElementById("success");
let error = document.getElementById("error");
let cross_success = document.querySelector("#success span");
let cross_error = document.querySelector("#error span");
// =====================================================================
// To generate the page using the basic structure
// this method is usualy used when the we are having only
// one page and donot want to reload
const security_add = `<div class="box" id="box">
    <h2>Door security</h2>
    <form action="" id="form">
      <div class="inputbox">
        <input type="username" name="username" id="username" required="" />
        <label for="username" id="username">Username</label>
      </div>
      <div class="inputbox">
        <input type="password" name="password" id="password" required="" />
        <label for="password">Password</label>
      </div>
      <input type="button" value="submit" id="submit">
    </form>
  </div>`;
const open_close_add = `<div class="container" id="container">
            <button id="open_modal">Open</button>
            <button id="close_modal">Close</button>
            <button id="help_modal">Help</button>
            <button id="exit_modal">Exit</button>
        </div>`;
security.innerHTML = security_add;
// Turning On the red LED***********************************************
digitalWrite("0", "HIGH"); //|
// *********************************************************************
let submit = document.getElementById("submit");
let username = document.getElementById("username");
let password = document.getElementById("password");
let box = document.getElementById("box");

// Here the Change of colour of the login block
if (username.style.color == "#03a9f4") {
  username.ariaPlaceholder = "example@123";
}
let count = 0;
// When the submit Button is Clicked
// as per the flow chart we will check wether the password
// is correct or not
submit.addEventListener("click", () => {
  usernamecheck = username.value;
  passwordcheck = password.value;
  // 1. if the password is correct --- if yes
  // 2. if the password is correct --- if no
  if (usernamecheck == USERNAME && passwordcheck == PASSWORD) {
    // the  1 condition is started We have to change the interface
    // the other block which contain the open ,close ,help, exit tag

    // Turning Off the red LED, And Turning On the green LED********
    digitalWrite("0", "LOW"); //|
    digitalWrite("1", "HIGH"); //|
    // *************************************************************
    // empty the value in input for security purpuse
    username.value = "";
    password.value = "";
    security.removeChild(box);
    security.style.display = "none";
    open_close.innerHTML = open_close_add;
    success.style.display = "flex";

    // modal script-------------------------------------------------
    let body = document.getElementById("body");
    let open_modal = document.getElementById("open_modal");
    let close_modal = document.getElementById("close_modal");
    let help_modal = document.getElementById("help_modal");
    let exit_modal = document.getElementById("exit_modal");
    let parent = document.querySelector(".modal_parant");
    let text = document.getElementById("text");
    let para = document.getElementById("para");
    let close = document.getElementById("close");
    close.addEventListener("click", (e) => {
      if (e.target.className == "modal_parant") {
        parent.style.display = "none";
        body.style.filter = "none";
        body.style.display = "none";
        para.style.display = "none";
        text.style.display = "block";
      }
    });
    parent.addEventListener("click", () => {
      parent.style.display = "none";
      body.style.filter = "none";
      body.style.display = "none";
      para.style.display = "none";
      text.style.display = "block";
    });

    // On clicking the Close Button
    close_modal.addEventListener("click", () => {
      // Turning On the open moter, And Turning Off after 5 second
      digitalWrite("3", "HIGH"); //|
      function low() {
        //|
        digitalWrite("3", "LOW"); //|
      } //|
      setTimeout(low, 5000); //|
      // *********************************************************
      body.style.display = "block";
      parent.style.display = "block";
      body.style.background =
        "linear-gradient(45deg, rgb(247 15 17), transparent, rgb(247 15 17))";
      body.style.filter = "blur(10px)";
      text.innerText = "Clossing the Door ...";
      para.style.display = "block";
      para.innerText = `Our Systum is send Request to your Home Iot Module It will Be closed`;
    });

    // On clicking the Open Button
    open_modal.addEventListener("click", () => {
      // Turning On the open moter, And Turning Off after 5 second
      digitalWrite("2", "HIGH"); //|
      function low() {
        //|
        digitalWrite("2", "LOW"); //|
      } //|
      setTimeout(low, 5000); //|
      // *********************************************************
      body.style.display = "block";
      parent.style.display = "block";
      body.style.background =
        "linear-gradient(45deg, rgb(126 255 23), transparent, rgb(126 255 23))";
      text.innerText = "Oppening the Door ...";
      body.style.filter = "blur(10px)";
      para.style.display = "block";
      para.innerText = `Our Systum is send Request to your Home Iot Module It will Be Open`;
    });

    // On clicking the Help Button
    help_modal.addEventListener("click", () => {
      body.style.display = "block";
      parent.style.display = "block";
      body.style.background =
        "linear-gradient(45deg, #17d7ff,transparent,#17d7ff)";
      body.style.filter = "blur(10px)";
      para.style.display = "block";
      text.innerText = "HELP";
      para.innerText = `This is a Web based Application Which Can easily Operate \nyour Main door with all security. It is                        made by Aman Kanojiya .He is a student of Boltiot Training                      And this is His\n Project for hist over all learning`;
    });

    // On clicking the exit Button
    exit_modal.addEventListener("click", () => {
      // Turning Off the red LED, And Turning OFF the green LED*
      digitalWrite("0", "LOW"); //|
      digitalWrite("1", "LOW"); //|
      // *********************************************************
      // closing Window after 3 second
      setTimeout(() => {
        window.close();
      }, 3000);
    });
  }

  // the  2 condition is executed as the password is wrong
  else {
    // We are checking How many times it login to the door login system incorrect
    // if it is greater the 3 then this may be the case of theaf
    // so, we can turn onn the buzzer of the door security
    // we can also send message to the owner about this
    //  I am realy very sorry i dont Know how to send message on javascript
    // in my python code it is done well
    count = count + 1;
    console.log(count);
    if (count >= 4) {
      username.disabled = true;
      password.disabled = true;
      submit.disabled = true;
      digitalWrite("4", "HIGH");
      function low() {
        digitalWrite("4", "LOW");
      }
      setTimeout(low, 10000);
      setTimeout(() => {
        window.close();
      }, 12000);
      console.log(
        "ErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorError"
      );
    }
    console.log("not success");
    username.value = "";
    password.value = "";
    error.style.display = "flex";
  }
});
// the success modal pops when it is success fully login
cross_success.addEventListener("click", () => {
  success.style.display = "none";
});
// the error modal pops when it is not success fully login
cross_error.addEventListener("click", () => {
  error.style.display = "none";
});
