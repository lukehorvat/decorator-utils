export let declarationTypes = {
  CLASS: Symbol("CLASS"),
  CLASS_METHOD: Symbol("CLASS_METHOD"),
  CLASS_ACCESSOR: Symbol("CLASS_ACCESSOR"),
  OBJECT_LITERAL_METHOD: Symbol("OBJECT_LITERAL_METHOD"),
  OBJECT_LITERAL_ACCESSOR: Symbol("OBJECT_LITERAL_ACCESSOR")
};

export function getDeclarationType(args) {
  let [target, name, descriptor] = Array.slice(args);

  if (args.length === 1 && typeof target === "function") {
    return declarationTypes.CLASS;
  } else if (args.length === 3 && typeof target === "object" && typeof target.constructor === "function") {
    let isObjectLiteral = target.constructor.name === "Object";
    let isAccessor = descriptor.get || descriptor.set;
    return declarationTypes[`${isObjectLiteral ? "OBJECT_LITERAL" : "CLASS"}_${isAccessor ? "ACCESSOR" : "METHOD"}`];
  }

  return null;
};
