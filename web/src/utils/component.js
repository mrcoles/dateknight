import { Component } from 'react';

// ### BaseComponent
//
// Auto-binds any methods starting with "handle" to `this`.
// Makes event handlers easier!
//
export class BaseComponent extends Component {
  constructor(props) {
    super(props);

    const auto_bind_prefix = 'handle';

    getAllMethods(this, BaseComponent).forEach(x => {
      if (x.startsWith(auto_bind_prefix)) {
        this[x] = this[x].bind(this);
      }
    });
  }

  _bind(...methods) {
    methods.forEach(method => (this[method] = this[method].bind(this)));
  }
}

// ### Get All Methods
//
// Returns all the methods for an instance of a class,
// via https://stackoverflow.com/a/35033472/376489
//
// Note: additional `limitToClass` can be used to prevent
// looking at parent classes, especially for React, which
// complains about access to isMounted(...)
//
const getAllMethods = (obj, limitToClass) => {
  let props = [];

  const _filter = (p, i, arr) =>
    typeof obj[p] === 'function' && // only the methods
    p !== 'constructor' && // not the constructor
    (i === 0 || p !== arr[i - 1]) && // not overriding in this prototype
    props.indexOf(p) === -1; // not overridden in a child

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter(_filter);
    props = props.concat(l);

    obj = Object.getPrototypeOf(obj);
    // walk-up the prototype chain, but not Object.prototype
    // also limit to class if available
  } while (
    obj &&
    Object.getPrototypeOf(obj) &&
    (!limitToClass || limitToClass.prototype.isPrototypeOf(obj))
  );

  return props;
};
