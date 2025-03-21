function genpas(pl, ilc, iuc, num, sym) {
    const lc = "abcdefghijklmnopqrstuvwxyz";
    const uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nc = "0123456789";
    const sc = "!@#$%^&*()_+/.,;'[]\\|"; // Escaping the backslash
    let ac = "";
    let pas = "";
    ac += ilc ? lc : "";
    ac += iuc ? uc : "";
    ac += num ? nc : "";
    ac += sym ? sc : "";
    if (pl <= 0) {
        return "Password length must be at least 1";
    }
    if (ac.length == 0) {
        return "At least 1 set of characters needs to be selected";
    }
    for (let i = 0; i < pl; i++) {
        const ri = Math.floor(Math.random() * ac.length);
        pas += ac[ri];
    }
    return pas;
}

// Renaming the constants to avoid redeclaration
const passwordLength = 12;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

const generatedPassword = genpas(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
console.log(`Generated password: ${generatedPassword}`);
