"use strict";

// burger-menu

document.addEventListener("DOMContentLoaded", () => {
  class BurgerMenu {
    constructor() {
      this.classNames = {
        contactBut: '.burger__links_con',
        menu: '.burger__links',
        contatInfo: '.year',
        showNavigation: 'showNav',
        showMenu: 'showMenu',
        burgBut: '.pt-5',
        nav: '.nav',
        li: 'li',
      }
      
      this.openBurgerValues = {
        top: '9%', 
        position: 'absolute', 
        transform1: 'rotate(45deg)', 
        transform2: 'rotate(-45deg)', 
        display: 'none',
      }

      this.closeBurgerValues = {
        top: '', 
        position: 'static', 
        transform1: '', 
        transform2: '', 
        display: '',
      }

      this.topWindow = {
        x: 0,
        y: 0,
      }

      this.burgerBtn = document.querySelector(this.classNames.burgBut);
      this.burgerMenu = document.querySelector(this.classNames.menu);
      this.contactButton = document.querySelector(this.classNames.contactBut);
      this.contactTextP = document.querySelector(this.classNames.contatInfo);
    }

    // открытие и закрытие бургер-меню

    valBurgBut(btn, values) {
      btn.style.top = values.top;
      btn.querySelector(this.classNames.li).style.position = values.position;
      btn.querySelector(`.${this.classNames.li}-1`).style.transform = values.transform1;
      btn.querySelector(`.${this.classNames.li}-2`).style.display = values.display;
      btn.querySelector(`.${this.classNames.li}-3`).style.transform = values.transform2;
    }

    changeBurgerBtn(btnBurg, flagBtn) {
      if (flagBtn) {
        this.valBurgBut(btnBurg, this.openBurgerValues);
      } else {
        this.valBurgBut(btnBurg, this.closeBurgerValues);
        window.scrollTo(this.topWindow.x, this.topWindow.y);
      }
    }

    showBurgerMenu(btn, flag) {
      btn.classList.toggle(this.classNames.showMenu);
      btn.closest(this.classNames.nav).classList.toggle(this.classNames.showNavigation);
      this.changeBurgerBtn(burger.burgerBtn, flag);
    }
  }

  const burger = new BurgerMenu();

  let flag = true;

  burger.burgerBtn.addEventListener("click", () => {
    burger.showBurgerMenu(burger.burgerMenu, flag);
    flag = !flag;
  });

  // отображение контактов по клику на кнопку contact в бургер меню

  burger.contactButton.addEventListener("click", () => {
    burger.showBurgerMenu(burger.burgerMenu);
    burger.contactTextP.scrollIntoView({ block: "center", behavior: "smooth" });
    flag = !flag;
  });

  // video-head

  class PlayVideo {
    constructor() {
      this.playBut = document.querySelector(".play-button_head");
      this.movie = document.querySelector(".video_main__movie");

      this.display = {
        block: 'dispBlock',
        none: 'dispNone',
      }
    }

    butActive() {
      this.movie.classList.toggle(this.display.block);
      this.playBut.classList.toggle(this.display.none);
    }
  }

  const play = new PlayVideo();

  play.playBut.addEventListener("click", () => {
    play.butActive();
  });

  // slider-post
  class ScrollPost {
    constructor(but) {
      this.but = but;

      this.valuesPictures = {
        colorRed: '#BB0000',
        colorWhite: '#FFF',
        displayYes: 'block',
        displayNo: 'none',
      }
      this.pictHeight = document.querySelectorAll(
        ".slider-picture_section>img"
      );
      this.pictPostHeight = document.querySelectorAll(".posters-line_post img");
      this.windowOuterHeight = window.outerHeight;
    }

    valButPict(elem, color, disp) {
      document.querySelector(elem).style.backgroundColor = color;
      document.querySelector(`.sps-${elem.split(".")[1]}`).style.display = disp;
    }

    showAutoPost(button, val) {
      this.but.forEach((elem) => {
        if (elem === button) {
          this.valButPict(elem, val.colorRed, val.displayYes);
        } else {
          this.valButPict(elem, val.colorWhite, val.displayNo);
        }
      });
    }

    changePict(pict, elem, disp, color) {
      pict.style.display = disp;
      document.querySelector(elem).style.backgroundColor = color;
    }

    showPost(but, val) {
      const pict = document.querySelector(
        `.sps-${but.className.split(" ")[1]}`
      );
      this.but.forEach((elem) => {
        if (pict.className !== `sps-${elem.split(".")[1]}`) {
          const pictNone = document.querySelector(`.sps-${elem.split(".")[1]}`);
          this.changePict(pictNone, elem, val.displayNo, val.colorWhite);
        } else {
          this.changePict(pict, elem, val.displayYes, val.colorRed);
        }
      });
      return true;
    }

    // дял каждой картинки задаем высоту, равную высоте экрана браузера

    changeHeight(pict) {
      pict.forEach((elem) => {
        elem.style.height = this.windowOuterHeight + "px";
      });
    }

    widthHeightPict(postHeight, height, val) {
      this.changeHeight(postHeight);
      this.changeHeight(height);
      document.querySelector(".sps-nx1").style.display = val.displayYes;
      document.querySelector(".nx1").style.backgroundColor = val.colorRed;
    }

    scrollPict(value) {
      const but = document.querySelector(value);
      if (but !== null) {
        but.addEventListener("click", () => {
          this.showPost(but, this.valuesPictures);
          indexPict = parseInt(value.split("")[value.length - 1]);
        });
      }
    }
  }

  const buttons = [".nx1", ".nx2", ".nx3", ".nx4", ".nx5"]; // массив кнопок переключения картинок

  const scroll = new ScrollPost(buttons);

  scroll.widthHeightPict(scroll.pictPostHeight, scroll.pictHeight, scroll.valuesPictures);

  // показ картинки по клику на кнопку
  buttons.forEach(function (elem) {
    scroll.scrollPict(elem);
  });

  // автоматический скролл картинок
  let indexPict = 0; // номер начальной картинки
  const interval = 5000; // время переключения картинок

  setInterval(() => {
    if (indexPict === 5) indexPict = 0;
    scroll.showAutoPost(buttons[indexPict], scroll.valuesPictures);
    indexPict++;
  }, interval);

  const scrollBut = document.querySelector(".fcns-img_go");
  const scrollToPost = document.querySelector(".burger");

  scrollBut.addEventListener("click", () => {
    scrollToPost.scrollIntoView({ block: "center", behavior: "smooth" });
  });

  /*----------------------------------------------*/
});
