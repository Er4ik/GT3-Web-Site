'use strict';

document.addEventListener("DOMContentLoaded", () => {
  class TicketsPlaces {
    constructor(formTicket) {
      this.formTicket = formTicket;
    }

    addPlace(but) {
      const place = but.getAttribute("data-place");
      const price = but.getAttribute("data-price");
      const sector = 1;
      const content = 
      `
        <div class="tick__bask">
          <div class="tick__bask_info">
            <h3>Sector ${sector}</h3>
            <p>place: ${place}</p>
          </div>
          <div class="tick__bask_price">
            <div class="exit">
              <p>x</p>
            </div>
            <p>${price}</p>
          </div>
        </div>
      `;
    this.formTicket.innerHTML += content;
    }

    changeBtn(btn) {
      btn.style.backgroundColor = "#BB0000";
      this.addPlace(btn)
    }
  }
})