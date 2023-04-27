"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _postsSchema = _interopRequireDefault(require("../schemas/posts.schema.js"));

var _usersSchema = _interopRequireDefault(require("../schemas/users.schema.js"));

var _path = _interopRequireDefault(require("path"));

var _jwt = require("../utils/jwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostController =
/*#__PURE__*/
function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }

  _createClass(PostController, null, [{
    key: "create",
    value: function create(req, res) {
      var token, _ref, _id, file, _req$body, title, distance, color, variant, wheel, price, description, phoneNumber, email, year, types, type, random, userUploadTitle, post;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = req.headers.token;
              _context.next = 4;
              return regeneratorRuntime.awrap(_usersSchema["default"].findById(_jwt.JWT.VERIFY(token).id));

            case 4:
              _ref = _context.sent;
              _id = _ref._id;
              file = req.files.file;
              _req$body = req.body, title = _req$body.title, distance = _req$body.distance, color = _req$body.color, variant = _req$body.variant, wheel = _req$body.wheel, price = _req$body.price, description = _req$body.description, phoneNumber = _req$body.phoneNumber, email = _req$body.email, year = _req$body.year;

              if (!file.truncated) {
                _context.next = 10;
                break;
              }

              throw new Error('you must send max 50 mb file');

            case 10:
              types = file.name.split('.');
              type = types[types.length - 1];

              if (!(type != 'jpg')) {
                _context.next = 14;
                break;
              }

              throw new Error("Image's type invalid!");

            case 14:
              random = Math.floor(Math.random() * 9000 + 1000);
              userUploadTitle = title + random + '.' + type;
              _context.next = 18;
              return regeneratorRuntime.awrap(file.mv(_path["default"].join(process.cwd(), 'public', 'imgs', userUploadTitle)));

            case 18:
              if (_id) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.send({
                message: "Invalid token Please try again later",
                status: 404
              }));

            case 22:
              post = new _postsSchema["default"]({
                title: title,
                distance: distance,
                author: _id,
                color: color,
                variant: variant,
                wheel: wheel,
                price: price,
                year: year,
                description: description,
                phoneNumber: phoneNumber,
                email: email,
                image: userUploadTitle
              });
              _context.next = 25;
              return regeneratorRuntime.awrap(post.save());

            case 25:
              res.status(201).send({
                data: post,
                status: 200
              });

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](0);
              console.log('err.message :', _context.t0.message);
              res.status(500).send({
                message: _context.t0.message
              });

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 28]]);
    }
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      var posts;
      return regeneratorRuntime.async(function getAll$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_postsSchema["default"].find().populate('author', 'username'));

            case 3:
              posts = _context2.sent;
              res.json(posts);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              res.status(500).send({
                message: _context2.t0.message
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "getById",
    value: function getById(req, res) {
      var post;
      return regeneratorRuntime.async(function getById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_postsSchema["default"].findById(req.params.id).populate('author', 'username'));

            case 3:
              post = _context3.sent;

              if (post) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('Post not found'));

            case 6:
              res.json(post);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send({
                message: _context3.t0.message
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "update",
    value: function update(req, res) {
      var post, _req$body2, title, distance, color, variant, wheel, price, year, description, comments;

      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(_postsSchema["default"].findById(req.params.id));

            case 3:
              post = _context4.sent;

              if (post) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('Post not found'));

            case 6:
              _req$body2 = req.body, title = _req$body2.title, distance = _req$body2.distance, color = _req$body2.color, variant = _req$body2.variant, wheel = _req$body2.wheel, price = _req$body2.price, year = _req$body2.year, description = _req$body2.description, comments = _req$body2.comments;
              post.title = title ? title : post.title, post.distance = distance ? distance : post.distance, post.color = color ? color : post.color, post.variant = variant ? variant : post.variant, post.wheel = wheel ? wheel : post.wheel, post.price = price ? price : post.price, post.year = year ? year : post.year, post.description = description ? description : post.description, post.comments = comments ? comments : post.comments;
              _context4.next = 10;
              return regeneratorRuntime.awrap(post.save());

            case 10:
              res.json(post);
              _context4.next = 16;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              res.status(500).send({
                message: _context4.t0.message
              });

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 13]]);
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var post;
      return regeneratorRuntime.async(function _delete$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return regeneratorRuntime.awrap(_postsSchema["default"].findByIdAndDelete(req.params.id));

            case 3:
              post = _context5.sent;

              if (post) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(404).send('Post not found'));

            case 6:
              if (!(req.user._id.toString() !== post.author.toString())) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(403).send('Forbidden'));

            case 8:
              _context5.next = 10;
              return regeneratorRuntime.awrap(post.save());

            case 10:
              res.send('Post deleted');
              _context5.next = 16;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              res.status(500).send({
                message: _context5.t0.message
              });

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 13]]);
    }
  }]);

  return PostController;
}();

var _default = PostController;
exports["default"] = _default;