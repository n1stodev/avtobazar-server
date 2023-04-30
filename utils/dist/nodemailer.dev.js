"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendConfirmationEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: 'nodirbekqobilov332@gmail.com',
    pass: 'copzymkjwxzpabah'
  }
});

var sendConfirmationEmail = function sendConfirmationEmail(userEmail, confirmationCode) {
  var mailOptions, result;
  return regeneratorRuntime.async(function sendConfirmationEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mailOptions = {
            from: 'nodirbekqobilov332@gmail.com',
            to: userEmail,
            subject: 'Please confirm your account',
            html: "<p>http://localhost:5000/pass/code/".concat(confirmationCode, "</p>")
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
          result = _context.sent;
          console.log('Email sent: ' + result.response);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [
    [1, 8]
  ]);
};

exports.sendConfirmationEmail = sendConfirmationEmail;