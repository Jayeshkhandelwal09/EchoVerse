export const isValidPassword = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber;
  };
  