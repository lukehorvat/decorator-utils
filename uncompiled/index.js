export class DecoratorUtils {
  static declarationTypes = [
    "CLASS",
    "CLASS_METHOD",
    "CLASS_ACCESSOR",
    "OBJECT_LITERAL_METHOD",
    "OBJECT_LITERAL_ACCESSOR"
  ].reduce((obj, name) => {
    return Object.defineProperty(obj, name, { value: Symbol(name) });
  }, {})

  static getDeclarationType(args) {
    let [target, name, descriptor] = Array.prototype.slice.call(args);

    if (args.length === 1 && typeof target === "function") {
      return DecoratorUtils.declarationTypes.CLASS;
    } else if (args.length === 3 && typeof target === "object" && typeof target.constructor === "function") {
      let isObjectLiteral = target.constructor.name === "Object";
      let isAccessor = descriptor.get || descriptor.set;
      return DecoratorUtils.declarationTypes[`${isObjectLiteral ? "OBJECT_LITERAL" : "CLASS"}_${isAccessor ? "ACCESSOR" : "METHOD"}`];
    }

    throw new Error("Invalid declaration type.");
  }

  static createDecorator(supportedDeclarationTypes, fn) {
    supportedDeclarationTypes = [].concat(supportedDeclarationTypes);

    return function() {
      if (supportedDeclarationTypes.indexOf(DecoratorUtils.getDeclarationType(arguments)) < 0) {
        throw new Error("Decorator must be applied to a supported declaration type.");
      }

      return fn.apply(this, arguments);
    };
  }

  constructor() {
    throw new Error("Static class cannot be instantiated.");
  }
};
