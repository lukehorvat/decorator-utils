import {DecoratorUtils} from "./";

describe("DecoratorUtils", () => {
  describe("getDeclarationType()", () => {
    it("should correctly detect class declarations", () => {
      function decorator() {
        (DecoratorUtils.getDeclarationType(arguments) === DecoratorUtils.declarationType.CLASS).should.be.true();
      };

      @decorator
      class Thing {}
    });

    it("should correctly detect class methods", () => {
      function decorator() {
        (DecoratorUtils.getDeclarationType(arguments) === DecoratorUtils.declarationType.CLASS_METHOD).should.be.true();
      };

      class Thing {
        @decorator
        hello() {}
      }
    });

    it("should correctly detect class accessors", () => {
      function decorator() {
        (DecoratorUtils.getDeclarationType(arguments) === DecoratorUtils.declarationType.CLASS_ACCESSOR).should.be.true();
      };

      class Thing {
        @decorator
        get hello() {}

        @decorator
        set hello(value) {}
      }
    });

    it("should correctly detect object literal methods", () => {
      function decorator() {
        (DecoratorUtils.getDeclarationType(arguments) === DecoratorUtils.declarationType.OBJECT_LITERAL_METHOD).should.be.true();
      };

      let thing = {
        @decorator
        hello() {}
      };
    });

    it("should correctly detect object literal accessors", () => {
      function decorator() {
        (DecoratorUtils.getDeclarationType(arguments) === DecoratorUtils.declarationType.OBJECT_LITERAL_ACCESSOR).should.be.true();
      };

      let thing = {
        @decorator
        get hello() {},

        @decorator
        set hello(value) {}
      };
    });
  });
});
