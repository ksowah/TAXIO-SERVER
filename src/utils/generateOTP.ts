
export function generateOTP(quantity: number) {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < quantity; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}