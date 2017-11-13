import { Component } from 'react';


export class BaseComponent extends Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}
