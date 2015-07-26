# decorator-utils [![NPM version](http://img.shields.io/npm/v/decorator-utils.svg?style=flat-square)](https://www.npmjs.org/package/decorator-utils) [![Build status](http://img.shields.io/travis/lukehorvat/decorator-utils.svg?style=flat-square)](https://travis-ci.org/lukehorvat/decorator-utils)

Helpful utility functions to use when writing your own ES7 decorators.

## Installation

Install the package with NPM:

```bash
$ npm install decorator-utils
```

## Usage

A simple example:

```javascript
import {DecoratorUtils} from "decorator-utils";

function decorator(target, name, descriptor) {
  let declarationType = DecoratorUtils.getDeclarationType(arguments);

  if (declarationType !== DecoratorUtils.declarationTypes.CLASS_METHOD) {
    throw new Error("Decorator must be applied to a class method declaration.");
  }

  // The rest of the decorator's logic...
}

@decorator // Error will be thrown.
class Dog {
  @decorator // Error will NOT be thrown.
  woof() {}
}
```

## API

The package exposes a static class, `DecoratorUtils`, which has the following functions and properties:

### getDeclarationType()

- A function that can be called from within a decorator to determine the type of declaration that is being targeted. Useful for guarding a decorator against certain declaration types.
- Parameters:
  - **arguments** - The [`arguments`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments) object of the decorator function. Just pass it through!
- Returns a value from `DecoratorUtils.declarationTypes`.

### createDecorator()

- A function that produces a decorator that can only be applied to a subset of "supported" declaration types; all "unsupported" ones will throw an error. Handy if you want to create decorators in a factory-like manner.
- Parameters:
  - **supportedDeclarationTypes** - An array of values from `DecoratorUtils.declarationTypes`.
  - **fn** - A function that contains the rest of the decorator's logic.
- Returns a decorator (function).

### declarationTypes

- A property describing the set of possible declaration types that a decorator can target, as key-value pairs of an object (`String` -> [`Symbol`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)). To be used in conjunction with `DecoratorUtils.getDeclarationType()`.
- Keys:
  - `CLASS`
  - `CLASS_METHOD`
  - `CLASS_ACCESSOR`
  - `OBJECT_LITERAL_METHOD`
  - `OBJECT_LITERAL_ACCESSOR`
