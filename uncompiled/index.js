export class DecoratorUtils {
  static type = [
    "CLASS",
    "CLASS_METHOD",
    "CLASS_ACCESSOR",
    "OBJECT_LITERAL_METHOD",
    "OBJECT_LITERAL_ACCESSOR"
  ].reduce((obj, name) => {
    return Object.defineProperty(obj, name, { value: Symbol(name) });
  }, {})

  static getType(args) {
    let [target, name, descriptor] = Array.prototype.slice.call(args);

    if (args.length === 1 && typeof target === "function") {
      return DecoratorUtils.type.CLASS;
    } else if (args.length === 3 && typeof target === "object" && typeof target.constructor === "function") {
      let isObjectLiteral = target.constructor.name === "Object";
      let isAccessor = descriptor.get || descriptor.set;
      return DecoratorUtils.type[`${isObjectLiteral ? "OBJECT_LITERAL" : "CLASS"}_${isAccessor ? "ACCESSOR" : "METHOD"}`];
    }

    throw new Error("Invalid declaration type.");
  }
};
