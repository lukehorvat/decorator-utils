"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DecoratorUtils = (function () {
  _createClass(DecoratorUtils, null, [{
    key: "getDeclarationType",
    value: function getDeclarationType(args) {
      var _Array$prototype$slice$call = Array.prototype.slice.call(args);

      var _Array$prototype$slice$call2 = _slicedToArray(_Array$prototype$slice$call, 3);

      var target = _Array$prototype$slice$call2[0];
      var name = _Array$prototype$slice$call2[1];
      var descriptor = _Array$prototype$slice$call2[2];

      if (args.length === 1 && typeof target === "function") {
        return DecoratorUtils.declarationTypes.CLASS;
      } else if (args.length === 3 && typeof target === "object" && typeof target.constructor === "function") {
        var isObjectLiteral = target.constructor.name === "Object";
        var isAccessor = descriptor.get || descriptor.set;
        return DecoratorUtils.declarationTypes[(isObjectLiteral ? "OBJECT_LITERAL" : "CLASS") + "_" + (isAccessor ? "ACCESSOR" : "METHOD")];
      }

      throw new Error("Invalid declaration type.");
    }
  }, {
    key: "createDecorator",
    value: function createDecorator(validDeclarationTypes, fn) {
      validDeclarationTypes = [].concat(validDeclarationTypes);

      return function () {
        if (validDeclarationTypes.indexOf(DecoratorUtils.getDeclarationType(arguments)) < 0) {
          throw new Error("Decorator must be applied to a valid declaration type.");
        }

        return fn.apply(this, arguments);
      };
    }
  }, {
    key: "declarationTypes",
    value: ["CLASS", "CLASS_METHOD", "CLASS_ACCESSOR", "OBJECT_LITERAL_METHOD", "OBJECT_LITERAL_ACCESSOR"].reduce(function (obj, name) {
      return Object.defineProperty(obj, name, { value: Symbol(name) });
    }, {}),
    enumerable: true
  }]);

  function DecoratorUtils() {
    _classCallCheck(this, DecoratorUtils);

    throw new Error("Static class cannot be instantiated.");
  }

  return DecoratorUtils;
})();

exports.DecoratorUtils = DecoratorUtils;
;