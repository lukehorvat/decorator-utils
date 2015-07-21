import {DecoratorUtils} from "./";

describe("DecoratorUtils", () => {
  describe("getType()", () => {
    it("should correctly detect class declarations", () => {
      function decorator() {
        (DecoratorUtils.getType(arguments) === DecoratorUtils.type.CLASS).should.be.true();
      }

      @decorator
      class Thing {}
    });

    it("should correctly detect class methods", () => {
      function decorator() {
        (DecoratorUtils.getType(arguments) === DecoratorUtils.type.CLASS_METHOD).should.be.true();
      }

      class Thing {
        @decorator
        hello() {}
      }
    });

    it("should correctly detect class accessors", () => {
      function decorator() {
        (DecoratorUtils.getType(arguments) === DecoratorUtils.type.CLASS_ACCESSOR).should.be.true();
      }

      class Thing {
        @decorator
        get hello() {}

        @decorator
        set hello(value) {}
      }
    });

    it("should correctly detect object literal methods", () => {
      function decorator() {
        (DecoratorUtils.getType(arguments) === DecoratorUtils.type.OBJECT_LITERAL_METHOD).should.be.true();
      }

      let thing = {
        @decorator
        hello() {}
      };
    });

    it("should correctly detect object literal accessors", () => {
      function decorator() {
        (DecoratorUtils.getType(arguments) === DecoratorUtils.type.OBJECT_LITERAL_ACCESSOR).should.be.true();
      }

      let thing = {
        @decorator
        get hello() {},

        @decorator
        set hello(value) {}
      };
    });
  });
});
