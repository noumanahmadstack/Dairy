export const loginValidation = (username, password) => {
    if (username === '') {
        return {
            valid: false,
            errors: username === '' ? "Please Enter UserName" : null
        }
    }
    else if (password === '' ) {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}

export const Signup_validation = (username, email, password, userConfirmPassword, age) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username === "") {
        return {
            valid: false,
            errors: username === "" ? "Please enter your name" : null
        }
    }
    else if (username.length < 3) {
        return {
            valid: false,
            errors: username.length < 3 ? "Name must should contain 3 letters" : null
        }
    }

    else if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password must should contain 6 digits" : null
        }
    }
    else if (userConfirmPassword === "") {
        return {
            valid: false,
            errors: userConfirmPassword === "" ? "Please enter your confirm password" : null
        }
    }
    else if (password !== userConfirmPassword) {
        return {
            valid: false,
            errors: password !== userConfirmPassword ? "Password doesn't match" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}


export const Recipt_validation = (username, amount, d_type, p_type) => {
    if (username === "") {
        return {
            valid: false,
            errors: username === "" ? "Please enter donor name" : null
        }
    }
    else if (username.length < 3) {
        return {
            valid: false,
            errors: username.length < 3 ? "Name must should contain 3 letters" : null
        }
    } else if (amount == '') {
        return {
            valid: false,
            errors: amount == '' ? "Please Enter amount" : null
        }

    } else if (isNaN(amount)) {
        return {
            valid: false,
            errors: isNaN(amount) ? "Your amount is not a number" : null
        }
    }
    else if (d_type === "") {
        return {
            valid: false,
            errors: d_type === "" ? "Please Select Donation type" : null
        }
    }
    else if (p_type === "") {
        return {
            valid: false,
            errors: p_type === "" ? "Please Select Payment type" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }





}

export const CustomerScreen_validation = (username, address, mobile,serialNo, data) => {
    if (username === "") {
        return {
            valid: false,
            errors: username === "" ? "Please Enter Your name" : null
        }
    }


    else if (address === '') {
        return {
            valid: false,
            errors: address === '' ? "Please Enter Your Address" : null
        }
    }

    else if (mobile === '') {
        return {
            valid: false,
            errors: mobile === '' ? "Please Enter Your Mobile" : null
        }
    }
    else if (mobile.length < 11) {
        return {
            valid: false,
            errors: mobile.length < 11 ? "Phone Number must should contain 11 digits" : null
        }
    }
    else if (serialNo ==='') {
        return {
            valid: false,
            errors: serialNo === '' ? "Please Enter Your Serial No" : null
        }
    }

    else if (data == 0) {
        return {
            valid: false,
            errors: data == 0 ? "Please Select Product" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}


