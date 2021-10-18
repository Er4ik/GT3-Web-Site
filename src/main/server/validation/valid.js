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
        let flag = true;
        const body = [];

        for(const key in this.data) {
            const res = this.testValid(this.rx[`${key}rx`], this.data[key]);
            
            if(!res) {
                flag = false;
                body.push(key);
            }
        }
        return {result: flag, key: body};
    }
}

export const check = (rx, req) => {
    const validate = new signUpForm(rx, req);
    return validate.validation()
}

