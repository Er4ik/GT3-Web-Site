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
      this.colorInput = {
        error: '1px solid red',
        ok: '1px solid green',
      }
    }

    checkForm() {
      const data = document.querySelectorAll('.form-Up input');
      const body = {};

      for(let elem = 0; elem < data.length; elem++) {
        body[data[elem].placeholder] = data[elem].value;
      }

      return {body: body};
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

      const resData = await res.json().catch(error => {
        throw new Error(`Server response Error - ${error}`);
      });

      return resData;
  }

  submitUpForm.addEventListener('submit', (event) => {
    event.preventDefault;

    const check = signUp.checkForm();
    
    const res = async () => {
      await subData(url, HttpMethods.post, check.body);
    }

    res();
  })
});
