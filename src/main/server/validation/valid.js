class checkForm {
    constructor(rx, data) {
        this.rx = rx;
        this.data = data;
    }

    testValid(rx, val) {
      return rx.test(val);
    }
}

class signUpForm extends checkForm {
    constructor(rx, data) {
        super(rx, data);
    }

    validation() {
        let res = true;
        let valKey;

        for(const key in this.data) {
            res = this.testValid(this.rx[`${key}rx`], this.data[key]);
            valKey = key;
            if(!res) break;
        }

        return {result: res, key: valKey};
    }
}

export const check = (rx, req) => {
    const validate = new signUpForm(rx, req);
    return validate.validation()
}

