import React from 'react';
import { BaseComponent } from './utils/component.js';

import './compiled/AutoCompleter.css';

const constrain = (val, min, max) => Math.min(max, Math.max(min, val));

class AutoCompleter extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = this._emptyState();
  }

  _emptyState() {
    return { ac_text: '', matches: [], active_pos: -1 };
  }

  // Life-cycle
  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  // Handlers

  handleWindowClick(evt) {
    // HACK - if clicked outside of our elt, then reset the state
    if (!this._isChildOfClass(evt.target, 'AutoCompleter')) {
      this.setState(this._emptyState());
    }
  }

  handleInputKeyDown(evt) {
    this._getKeys(evt);
  }

  handleInputKeyUp(evt) {
    console.log(`[KEYUP?] ${evt}`); //REM
    let keys = this._getKeys(evt);

    if (keys.esc || (keys.enter && this.state.active_pos === -1)) {
      console.log(`  ESCAPE`); //REM
      this.setState(this._emptyState());
      return;
    }

    let { subtext, start, end } = this._getCurrentText(evt.target, ' ,|/\\_:');
    console.log(`   ${subtext} - ${start} - ${end}`); //REM

    let matches = this._findMatches(
      subtext,
      start,
      end,
      this.props.ac_fieldnames,
      this.props.ac_rows
    );

    let old_pos = this.state.active_pos;
    let new_pos = constrain(old_pos + keys.dir, -1, matches.length - 1);

    console.log(`  NUM MATCHES? ${matches.length} text: ${subtext}`); //REM

    this.setState({ matches, ac_text: subtext, active_pos: new_pos });

    // handle applying of a match
    if (keys.enter) {
      this._applyMatch(matches[new_pos]);
    }
  }

  handleInputChange(evt) {
    let onChange = this.props.onChange;
    if (onChange) {
      onChange(evt);
    }
  }

  handleMatchMouseOver(evt, i) {
    this.setState({ active_pos: i });
  }

  handleMatchClick(evt, match, i) {
    this._applyMatch(match);
  }

  // Helpers

  _getKeys(evt) {
    let keys = {
      dir: evt.keyCode === 38 ? -1 : evt.keyCode === 40 ? 1 : 0,
      enter: evt.keyCode === 13,
      esc: evt.keyCode === 27
    };
    if (keys.dir !== 0 || keys.enter) {
      evt.preventDefault();
    }
    return keys;
  }

  _findMatches(text, start, end, fieldnames, rows) {
    if (!text) {
      return [];
    }

    let lower_text = text.toLowerCase();
    let matches = rows.map(row => {
      let score = fieldnames.reduce((acc, fieldname, i) => {
        let field = row[fieldname] || '';
        if (field.indexOf(text) > -1) {
          acc += 10;
        } else if (field.toLowerCase().indexOf(lower_text) > -1) {
          acc += 1;
        }
        return acc;
      }, 0);

      return { score: score, row: row, start, end };
    });

    matches = matches.filter(x => x.score > 0);

    matches.sort((a, b) => b.score - a.score); // sort by descending score

    return matches;
  }

  _applyMatch(match) {
    let value = this.props.value;
    let start = match.start;
    let end = match.end;
    let new_value =
      value.substring(0, start) + match.row.code + value.substring(end);
    this.props.onUpdateValue(new_value);
    this.setState(this._emptyState());
    return true;
  }

  _getCurrentText(input, dividers) {
    console.log(`   input ${input}`); //REM
    window._input = input; //REM
    dividers = dividers || '';
    let text = input.value;
    let start = input.selectionStart || 0;
    let end = input.selectionEnd || 0;
    if (start === end) {
      while (start > 0) {
        let c = text.charAt(start - 1);
        if (dividers.indexOf(c) > -1) {
          break;
        }
        start--;
      }
    }

    let subtext = text.substring(start, end).trim();

    return { subtext, start, end };
  }

  _isChildOfClass(elt, className) {
    while (elt) {
      if (elt.classList.contains(className)) {
        return true;
      }
      elt = elt.parentElement;
    }
    return false;
  }

  _scrollToActive() {
    // HACK - how do I do this more React-like?
    window.setTimeout(() => {
      let parent = document.getElementsByClassName('AutoCompleter')[0];
      let elts = parent.getElementsByClassName('matches')[0];
      if (elts) {
        let elt = elts.getElementsByClassName('active')[0];
        if (elt) {
          let par_height = elts.offsetHeight;
          let scroll_top = elts.scrollTop;
          let top = elt.offsetTop;
          let height = elt.offsetHeight;
          let contained_in =
            top >= scroll_top && top + height <= scroll_top + par_height;
          if (!contained_in) {
            elts.scrollTo(0, top - 10);
          }
        }
      }
    }, 200);
  }

  // Render
  render() {
    let fieldnames = this.props.ac_fieldnames;
    let matches = this.state.matches;

    // generate the auto-complete rows
    let ac_rows = null;
    if (matches.length) {
      let matches_rows = matches.map((m, i) => {
        let dl_content = [];
        fieldnames.forEach(f => {
          if ((m.row[f] || '').trim()) {
            // HACK - override for 'example' to not repeat when it's same as code (i.e., Go)
            if (f === 'example' && m.row[f] === m.row.code) {
              return;
            }

            dl_content.push(
              <dt key={`dt-${f}`}>{f === 'example' ? 'ex' : f}:</dt>,
              <dd key={`dd-${f}`}>{m.row[f]}</dd>
            );
          }
        });

        let active_class = this.state.active_pos === i ? 'active' : '';

        return (
          <dl
            className={`row ${active_class}`}
            key={m.row.id}
            onMouseOver={e => this.handleMatchMouseOver(e, i)}
            onClick={e => this.handleMatchClick(e, m)}
          >
            {dl_content}
          </dl>
        );
      });

      ac_rows = <div className="matches">{matches_rows}</div>;
    }

    // HACK - scroll
    this._scrollToActive();

    return (
      <div className={`AutoCompleter ${this.props.className || ''}`}>
        <input
          className="inputlike"
          type="text"
          name="code"
          value={this.props.value}
          onChange={this.handleInputChange}
          onFocus={this.handleInputKeyUp}
          onKeyUp={this.handleInputKeyUp}
          onKeyDown={this.handleInputKeyDown}
        />
        {ac_rows}
      </div>
    );
  }
}

export default AutoCompleter;
