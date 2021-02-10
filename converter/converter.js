function getTemplate(data = [], selected = '1') {
  const item = data
    .map((i) => {
      let cls = '';
      if (i.id === selected) {
        cls = 'selected';
      }

      return `<div class="converter__choice__item ${cls}" data-choice="${i.id}">${i.from} 💱 ${i.to}</div>`;
    })
    .join('');

  const currency = data.find((currency) => currency.id === selected);

  return `
  <div class="converter__text">
    <div class="converter__text__current">
      <strong>1</strong> ${currency.from} to w przeliczeniu:
    </div>
    <div class="converter__text__result">${currency.rate} ${currency.to}</div>
  </div>
  <div class="converter__input">
    <div class="converter__input__from">
      <div class="input-from" contenteditable="" data-input="from">1</div>
      <div class="currency-from">${currency.from}</div>
    </div>
    <div class="converter__input__to">
      <div class="input-to" contenteditable="" data-input="to">${currency.rate}</div>
      <div class="currency-to">${currency.to}</div>
    </div>
    <div class="converter__choice">
       ${item}
    </div>
  </div>

`;
}

export class Converter {
  constructor(selector, currency) {
    this.$el = document.querySelector(selector);
    this.currency = currency;

    this.selected = currency.selectedId;

    this.rate = null;

    this.#render();
    this.#setup();
  }

  #render() {
    this.$el.innerHTML = getTemplate(this.currency.data, this.selected);
    this.rate = newRate(this.currency.data, this.selected);
  }

  #setup() {
    this.inputChange = this.inputChange.bind(this);
    this.$el.addEventListener('input', this.inputChange);

    this.clickChange = this.clickChange.bind(this);
    this.$el.addEventListener('click', this.clickChange);

    this.enterChange = this.enterChange.bind(this);
    this.$el.addEventListener('keypress', this.enterChange);
  }

  inputChange(event) {
    const { input } = event.target.dataset;
    if (input === 'from') {
      const countFrom = this.$inputFrom.textContent * this.rate;
      this.$inputTo.innerHTML = +countFrom.toFixed(2);
    } else {
      const countTo = this.$inputTo.textContent / this.rate;
      this.$inputFrom.innerHTML = +countTo.toFixed(2);
    }
  }

  clickChange(event) {
    const { choice } = event.target.dataset;

    this.$inputFrom = this.$el.querySelector('[data-input="from"]');
    this.$inputTo = this.$el.querySelector('[data-input="to"]');

    if (choice) {
      this.$el.innerHTML = getTemplate(this.currency.data, choice);
      this.selected = choice;
      this.rate = newRate(this.currency.data, this.selected);
    }
  }

  enterChange(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}

function newRate(data, selected) {
  return data.find((item) => item.id === selected).rate;
}
