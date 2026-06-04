export const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};
  
export const isPhoneValid = (phone) => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return regex.test(phone);
};

export const isPasswordStrong = (password) => {
    // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pattern.test(password);
};
  
export const doPasswordsMatch = (pass1, pass2) => {
    return pass1 === pass2;
};