"use strict";

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === "function") { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ("value" in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === "function") { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require("./");

describe("DecoratorUtils", function () {
  describe("constructor()", function () {
    it("should not be callable", function () {
      (function () {
        return new _.DecoratorUtils();
      }).should["throw"]("Static class cannot be instantiated.");
    });
  });

  describe("getDeclarationType()", function () {
    it("should correctly detect class declarations", function () {
      function decorator() {
        (_.DecoratorUtils.getDeclarationType(arguments) === _.DecoratorUtils.declarationTypes.CLASS).should.be["true"]();
      }

      var Thing = (function () {
        function Thing() {
          _classCallCheck(this, _Thing);
        }

        var _Thing = Thing;
        Thing = decorator(Thing) || Thing;
        return Thing;
      })();
    });

    it("should correctly detect class methods", function () {
      function decorator() {
        (_.DecoratorUtils.getDeclarationType(arguments) === _.DecoratorUtils.declarationTypes.CLASS_METHOD).should.be["true"]();
      }

      var Thing = (function () {
        function Thing() {
          _classCallCheck(this, Thing);
        }

        _createDecoratedClass(Thing, [{
          key: "hello",
          decorators: [decorator],
          value: function hello() {}
        }]);

        return Thing;
      })();
    });

    it("should correctly detect class accessors", function () {
      function decorator() {
        (_.DecoratorUtils.getDeclarationType(arguments) === _.DecoratorUtils.declarationTypes.CLASS_ACCESSOR).should.be["true"]();
      }

      var Thing = (function () {
        function Thing() {
          _classCallCheck(this, Thing);
        }

        _createDecoratedClass(Thing, [{
          key: "hello",
          decorators: [decorator, decorator],
          get: function get() {},
          set: function set(value) {}
        }]);

        return Thing;
      })();
    });

    it("should correctly detect object literal methods", function () {
      function decorator() {
        (_.DecoratorUtils.getDeclarationType(arguments) === _.DecoratorUtils.declarationTypes.OBJECT_LITERAL_METHOD).should.be["true"]();
      }

      var thing = _createDecoratedObject([{
        key: "hello",
        decorators: [decorator],
        value: function hello() {}
      }]);
    });

    it("should correctly detect object literal accessors", function () {
      function decorator() {
        (_.DecoratorUtils.getDeclarationType(arguments) === _.DecoratorUtils.declarationTypes.OBJECT_LITERAL_ACCESSOR).should.be["true"]();
      }

      var thing = _createDecoratedObject([{
        key: "hello",
        decorators: [decorator, decorator],
        get: function get() {},
        set: function set(value) {}
      }]);
    });
  });
});