'use strict';

const generateAccessCode = () => {
    const b = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let res = '';

    for (var i = 0; i < 5; i++) {
        res += b.charAt(Math.floor(Math.random() * b.length));
    }
    return res;
};

exports.generateCode = () => {
    let exist = false;
    let code;
    do {
        code = generateAccessCode();
    } while (exist);
    return code;
}

