/**
 * base64
 */

function b64_423(str) {
    b64table = new Array(
            'A','B','C','D','E','F','G','H',
            'I','J','K','L','M','N','O','P',
            'Q','R','S','T','U','V','W','X',
            'Y','Z','a','b','c','d','e','f',
            'g','h','i','j','k','l','m','n',
            'o','p','q','r','s','t','u','v',
            'w','x','y','z','0','1','2','3',
            '4','5','6','7','8','9','-','_');
    var binary = new String();
    for (var i = 0; i < str.length; i ++) {
        for (var j = 0; j < 64; j++) {
            if (str.charAt(i) == b64table[j]) {
                var bin = j.toString(2);
                binary += ("000000" + bin).substr(bin.length);
                break;
            }
        }
        if (j == 64) {
            if (i == 2) {
                /* 去掉 4 个 0 */
                return binary.substr(0, 8);
            } else {
                /* 去掉 2 个 0 */
                return binary.substr(0, 16);
            }
        }
    }
    return binary;
}
function b2i(str) {
    var x = 0;
    var k = 128;
    for (var i = 0; i < 8; i++, k=k/2) {
        if (str.charAt(i) == "1") {
            x += k;
        }
    }
    return String.fromCharCode(x)
}
function b64_decodex(str) {
    var ret = new Array();
    var i;
    var x = "";
    for (var i = 0; i < str.length; i += 4) {
        x += b64_423(str.substr(i, 4));
    }
    for (var i = 0; i < x.length; i += 8) {
        ret += b2i(x.substr(i, 8));
    }
    return ret;
}