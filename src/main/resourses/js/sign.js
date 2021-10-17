'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const buttonSignIn = document.querySelector(".btn__sign-in");
  const buttonSignUp = document.querySelector(".btn__sign-up");
  const formSignIn = document.querySelector(".form-In");
  const formSignUp = document.querySelector(".form-Up");

  // скролл между авторизацией и регистрацией
  formSignIn.style.display = "flex";

  const showForm = (formNow, formNew) => {
    formNow.style.display = "flex";
    formNew.style.display = "none";
  };

  buttonSignIn.addEventListener("click", () => {
    showForm(formSignUp, formSignIn);
  });
  buttonSignUp.addEventListener("click", () => {
    showForm(formSignIn, formSignUp);
  });

  // фон

  const winHeight = window.innerHeight;

  document.querySelector(".main-page").style.height = winHeight + "px";

  // работа с формой регистрации

  class SignUpForm {
    constructor() {
      this.dataRx = {
        namerx: /\w \w/,
        emailrx: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/,
        passrx: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g,
      }

      this.colorInput = {
        error: '1px solid red',
        ok: '1px solid green',
      }

      this.inButPlaceholders = {
        name: 'Name',
        email: 'Email',
        pass: 'Password',
      }
    }

    changeColBut(but) {
      console.log(but);
      document.querySelector(`.form-Up ${but}`).style.border = this.colorInput.error;
    }
 
    testValid(btn, rx) {
      return rx.test(btn.value);
    }

    validation(but, rx) {
      let res = true;

      if(but.placeholder === this.inButPlaceholders.name) {
        res = this.testValid(but, rx.namerx);
      }
      else if(but.placeholder === this.inButPlaceholders.email) {
        res = this.testValid(but, rx.emailrx);
      }
      else {
        res = this.testValid(but, rx.passrx);
      }

      return res;
    }

    checkForm() {
      const data = document.querySelectorAll('.form-Up input');
      const body = {};
      let res = true;

      for(let elem = 0; elem < data.length; elem++) {
        res = this.validation(data[elem], this.dataRx);

        body[data[elem].placeholder] = data[elem].value;

        if(!res) {
          data[elem].style.border = this.colorInput.error;
          break;
        } else data[elem].style.border = this.colorInput.ok; 
      }

      return {result: res, body: body};
    }
  }

  const signUp = new SignUpForm();

  const submitUpForm = document.getElementById('sign-up-form');
  const url = "http://localhost:3000";

  const HttpMethods = {
    get: 'GET',
    post: 'POST',
  }

  const apiRoutes = {
    user: '/authorization',
  }

  async function subData(url, method = HttpMethods.get, data) {
    const res = await fetch(`${url}${apiRoutes.user}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: method,
        body: JSON.stringify(data)
      });

      const resData = await res.json().catch(warn => {
        throw new Error(`Server response Error - ${warn}`);
      });

      return resData;
  }

  submitUpForm.addEventListener('submit', (event) => {
    event.preventDefault;

    const valid = signUp.checkForm();

    if(valid.result) {
      const res = async () => {
        await subData(url, HttpMethods.post, valid.body);
      }

      res();
    }
  })
});
