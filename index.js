export class DecoratorUtils {
  static declarationType = [
    "CLASS",
    "CLASS_METHOD",
    "CLASS_ACCESSOR",
    "OBJECT_LITERAL_METHOD",
    "OBJECT_LITERAL_ACCESSOR"
  ].reduce((obj, name) => {
    return Object.defineProperty(obj, name, { value: Symbol(name) });
  }, {})

  static getDeclarationType(args) {
    let [target, name, descriptor] = Array.slice(args);

    if (args.length === 1 && typeof target === "function") {
      return DecoratorUtils.declarationType.CLASS;
    } else if (args.length === 3 && typeof target === "object" && typeof target.constructor === "function") {
      let isObjectLiteral = target.constructor.name === "Object";
      let isAccessor = descriptor.get || descriptor.set;
      return DecoratorUtils.declarationType[`${isObjectLiteral ? "OBJECT_LITERAL" : "CLASS"}_${isAccessor ? "ACCESSOR" : "METHOD"}`];
    }

    return null;
  }
};
