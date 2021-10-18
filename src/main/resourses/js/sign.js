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
      this.formTitle = document.querySelector('.form__title');
      
      this.correctlyInput = {
        error: "Incorrect values:",
        ok: "Accepted",
        classErr: "redIn",
        classOk: "greenIn"
      }
    }

    createHtml(text, className, ...data) {
      const html = `
        <h2 class=${className}>${text} ${data}<h2>
      `
      return html;
    }

    changeTitle(key, ...values) {
      let html;
      if(!key) html = this.createHtml(this.correctlyInput.error, this.correctlyInput.classErr, values);
      else html = this.createHtml(this.correctlyInput.ok, this.correctlyInput.classOk);
      this.formTitle.innerHTML = html;
    }

    okFields() {
      const html = this.createHtml(this.correctlyInput.ok, this.correctlyInput.classOk);
      this.formTitle.innerHTML = html;
    }

    createRequestData(form, elem, body) {
      return body[form[elem].placeholder] = form[elem].value;
    }

    iterOnForm(callback, val, ...data) {
      const form = document.querySelectorAll('.form-Up input');
      for(let elem = 0; elem < form.length; elem++) {
        callback(form, elem, val, data);
      }
    }

    prepareForm() {
      const body = {};
      this.iterOnForm(this.createRequestData, body);

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
      })

    const result = res.json()
      .then(respData => respData)
      .catch(error => {
        throw new Error(`Server response Error -> ${error}`);
      });

    return result;
  }

  submitUpForm.addEventListener('submit', (event) => {
    event.preventDefault;

    const check = signUp.prepareForm();
    
    const res = async () => {
      const data = await subData(url, HttpMethods.post, check.body);
      return data;
    }

    res()
      .then(res => {
        console.log(res.response);
        signUp.changeTitle(res.key, res.respBody);
      })
  })
});
