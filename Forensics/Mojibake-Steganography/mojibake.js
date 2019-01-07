var mincp = {
    "mojibake": 0x100,
    "cjk": 0x4e00,
    "braille": 0x2800,
    "pipes": 0x2500,
    "symbols": 0x2600,
    "utf8": 0x00,
};
var maxcp = {
    "mojibake": 0x30ff,
    "cjk": 0x9fff,
    "braille": 0x28ff,
    "pipes": 0x25ff,
    "symbols": 0x27ff,
    "utf8": 0xff,
};
$('#encode').click(function(e) {
    e.preventDefault();
    var mincp = parseInt($('#mincp').val(),16);
    var maxcp = parseInt($('#maxcp').val(),16);
    if (maxcp < mincp) {
        maxcp = mincp + 255;
        $('#maxcp').val(maxcp.toString(16));
    }
    mincp = Math.floor(mincp / 256);
    maxcp = Math.floor(maxcp / 256);
    var plain = encode_utf8($('#plain').val());
    var encoded = '';
    for (var i = 0; i < plain.length; i++) {
        encoded += String.fromCharCode(plain.charCodeAt(i) + 256 * (Math.floor(Math.random() * (maxcp - mincp + 1)) + mincp));
    }
    $('#encoded').val(encoded);
});
$('#decode').click(function(e) {
    e.preventDefault();
    var data = $('#encoded').val();
    var plain = '';
    for (var i = 0; i < data.length; i++) {
        plain += String.fromCharCode(data.charCodeAt(i) % 256);
    }
    $('#plain').val(decode_utf8(plain));
});
$('#example').click(function(e) {
    e.preventDefault();
    $('#plain').val("Governments of the Industrial World, you weary giants of flesh and steel, I come from Cyberspace, the new home of Mind. On behalf of the future, I ask you of the past to leave us alone. You are not welcome among us. You have no sovereignty where we gather.\n\nWe have no elected government, nor are we likely to have one, so I address you with no greater authority than that with which liberty itself always speaks. I declare the global social space we are building to be naturally independent of the tyrannies you seek to impose on us. You have no moral right to rule us nor do you possess any methods of enforcement we have true reason to fear.\n\n...");
    $('#encode').click();
});
$('#preset').change(function() {
    $('#mincp').val(mincp[$('#preset').val()].toString(16));
    $('#maxcp').val(maxcp[$('#preset').val()].toString(16));
});
$('#preset').change();
// https://ecmanaut.blogspot.co.uk/2006/07/encoding-decoding-utf8-in-javascript.html
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}
function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}
