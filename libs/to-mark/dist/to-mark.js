/*!
 * to-mark
 * @version 1.0.1 | Mon Jan 18 2021
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["toMark"] = factory();
	else
		root["toMark"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/domRunner.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @fileoverview Implements DomRunner
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
var NODE = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3
};
/**
 * DomRunner
 * @param {HTMLElement} node A root node that it has nodes to iterate(not iterate itself and its any siblings)
 * @class
 */

var DomRunner = /*#__PURE__*/function () {
  function DomRunner(node) {
    this._normalizeTextChildren(node);

    this._root = node;
    this._current = node;
  }
  /**
   * Iterate next node
   * @returns {HTMLElement} next node
   */


  var _proto = DomRunner.prototype;

  _proto.next = function next() {
    var current = this._current;
    var node;

    if (this._current) {
      node = this._getNextNode(current);

      while (this._isNeedNextSearch(node, current)) {
        current = current.parentNode;
        node = current.nextSibling;
      }

      this._current = node;
    }

    return this._current;
  }
  /**
   * Return current node
   * @returns {HTMLElement} current node
   */
  ;

  _proto.getNode = function getNode() {
    this._normalizeTextChildren(this._current);

    return this._current;
  };

  _proto._normalizeTextChildren = function _normalizeTextChildren(node) {
    if (!node || node.childNodes.length < 2) {
      return;
    }

    var childNode = node.firstChild;
    var nextNode;

    while (childNode.nextSibling) {
      nextNode = childNode.nextSibling;

      if (childNode.nodeType === NODE.TEXT_NODE && nextNode.nodeType === NODE.TEXT_NODE) {
        childNode.nodeValue += nextNode.nodeValue;
        node.removeChild(nextNode);
      } else {
        childNode = nextNode;
      }
    }
  }
  /**
   * Get current node's text content
   * @returns {string} text
   */
  ;

  _proto.getNodeText = function getNodeText() {
    var node = this.getNode();
    var text;

    if (node.nodeType === NODE.TEXT_NODE) {
      text = node.nodeValue;
    } else {
      text = node.textContent || node.innerText;
    }

    return text;
  }
  /**
   * Check if there is next node to iterate
   * @private
   * @param {HTMLElement} node next node
   * @param {HTMLElement} current next node
   * @returns {boolean} result
   */
  ;

  _proto._isNeedNextSearch = function _isNeedNextSearch(node, current) {
    return !node && current !== this._root && current.parentNode !== this._root;
  }
  /**
   * Return available next node
   * @private
   * @param {HTMLElement} current current node
   * @returns {node} next node
   */
  ;

  _proto._getNextNode = function _getNextNode(current) {
    return current.firstChild || current.nextSibling;
  };

  return DomRunner;
}();

_defineProperty(DomRunner, "NODE_TYPE", NODE);


// CONCATENATED MODULE: ./src/toDom.js
/**
 * @fileoverview Implements toDom
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
var FIND_FIRST_LAST_SPACE_OR_RETURN_OR_TAB_RX = /^[\s\r\n\t]+|[\s\r\n\t]+$/g;
var FIND_RETURN_OR_TAB_BETWEEN_TAGS_RX = />[\r\n\t]+</g;
var FIND_WHOLE_SPACE_MORE_THAN_ONE_BETWEEN_TAGS_RX = />[ ]+</g;
/**
 * toDom
 * @exports toDom
 * @param {HTMLElement|string} html DOM Node root or HTML string
 * @returns {HTMLElement[]} dom element
 */

function toDom(html) {
  var wrapper;

  if (Object.prototype.toString.call(html) === '[object String]') {
    wrapper = document.createElement('div');
    wrapper.innerHTML = preProcess(html);
  } else {
    wrapper = html;
  }

  wrapper.__htmlRootByToMark = true;
  return wrapper;
}
/**
 * Pre process for html string
 * @param {string} html Source HTML string
 * @returns {string}
 */

function preProcess(html) {
  // trim text
  html = html.replace(FIND_FIRST_LAST_SPACE_OR_RETURN_OR_TAB_RX, ''); // trim between tags

  html = html.replace(FIND_RETURN_OR_TAB_BETWEEN_TAGS_RX, '><'); // remove spaces more than 1(if need more space, must use &nbsp)

  html = html.replace(FIND_WHOLE_SPACE_MORE_THAN_ONE_BETWEEN_TAGS_RX, '> <');
  return html;
}

toDom.preProcess = preProcess;
// CONCATENATED MODULE: ./src/renderer.js
function renderer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @fileoverview Implements Renderer
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
var FIND_LEAD_SPACE_RX = /^\u0020/;
var FIND_TRAIL_SPACE_RX = /.+\u0020$/;
var FIND_SPACE_RETURN_TAB_RX = /[\n\s\t]+/g;
var FIND_CHAR_TO_TRIM_RX = /^[\u0020\r\n\t]+|[\u0020\r\n\t]+$/g; // find first and last characters for trim

var FIND_SPACE_MORE_THAN_ONE_RX = /[\u0020]+/g; // find space more than one

var FIND_CHAR_TO_ESCAPE_RX = /[>(){}[\]+-.!#|]/g; // find characters that need escape

var FIND_CHAR_TO_ESCAPE_IN_LINK_RX = /[[\]]/g; // find characters to be escaped in links or images

var FIND_MARKDOWN_IMAGE_SYNTAX_RX = /!\[.*\]\(.*\)/g; // find markdown image syntax

var TEXT_NODE = 3;
/**
 * Iterate properties of object
 * from https://github.com/nhnent/fe.code-snippet/blob/master/src/collection.js
 * @param {object} obj object to iterate
 * @param {function} iteratee callback function
 * @param {*} [context] context of callback
 */

function forEachOwnProperties(obj, iteratee, context) {
  var key;
  context = context || null;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (iteratee.call(context, obj[key], key, obj) === false) {
        break;
      }
    }
  }
}
/**
 * Whether if inline node or not
 * @param {Node} node Element
 * @returns {boolean}
 */
// eslint-disable-next-line complexity


function isInlineNode(node) {
  var tag = node.tagName;
  return tag === 'S' || tag === 'B' || tag === 'I' || tag === 'EM' || tag === 'STRONG' || tag === 'A' || tag === 'IMG' || tag === 'CODE';
}
/**
 * Returns HTML string of an element using given subContent
 * @param {Node} node Element
 * @param {string} subContent string content of node
 * @returns {string}
 */


function getRawHtmlString(node, subContent) {
  var tempNode = node.cloneNode(false);
  tempNode.innerHTML = subContent;
  return tempNode.outerHTML;
}
/**
 * Clone rules
 * @param {object} destination object for apply rules
 * @param {object} source source object for clone rules
 */


function cloneRules(destination, source) {
  forEachOwnProperties(source, function (value, key) {
    if (key !== 'converter') {
      if (!destination[key]) {
        destination[key] = {};
      }

      cloneRules(destination[key], value);
    } else {
      destination[key] = value;
    }
  });
}
/**
 * Renderer
 * @param {object} [rules] rules to add
 * @class
 */


var Renderer = /*#__PURE__*/function () {
  function Renderer(rules) {
    this.rules = {};
    /**
     * Line feed replacement text
     * @type string
     */

    this.lineFeedReplacement = "\u200B\u200B";

    if (rules) {
      this.addRules(rules);
    }
  }
  /**
   * Add rule
   * @param {string} selectorString rule selector
   * @param {function} converter converter function
   */


  var _proto = Renderer.prototype;

  _proto.addRule = function addRule(selectorString, converter) {
    var selectors = selectorString.split(', ');
    var selector = selectors.pop();
    converter.fname = selectorString;

    while (selector) {
      this._setConverterWithSelector(selector, converter);

      selector = selectors.pop();
    }
  }
  /**
   * Add rules using object
   * @param {object} rules key(rule selector), value(converter function)
   */
  ;

  _proto.addRules = function addRules(rules) {
    forEachOwnProperties(rules, function (converter, selectorString) {
      this.addRule(selectorString, converter);
    }, this);
  }
  /**
   * Remove flanked space of dom node
   * @param {string} content text content
   * @param {HTMLElement} node current node
   * @returns {string} result
   */
  // eslint-disable-next-line complexity
  ;

  _proto.getSpaceControlled = function getSpaceControlled(content, node) {
    var lead = '';
    var trail = '';
    var text;

    if (node.previousSibling && (node.previousSibling.nodeType === TEXT_NODE || isInlineNode(node.previousSibling))) {
      text = node.previousSibling.innerHTML || node.previousSibling.nodeValue;

      if (FIND_TRAIL_SPACE_RX.test(text) || FIND_LEAD_SPACE_RX.test(node.innerHTML || node.nodeValue)) {
        lead = ' ';
      }
    }

    if (node.nextSibling && (node.nextSibling.nodeType === TEXT_NODE || isInlineNode(node.nextSibling))) {
      text = node.nextSibling.innerHTML || node.nextSibling.nodeValue;

      if (FIND_LEAD_SPACE_RX.test(text) || FIND_TRAIL_SPACE_RX.test(node.innerHTML || node.nodeValue)) {
        trail = ' ';
      }
    }

    return lead + content + trail;
  }
  /**
   * Convert dom node to markdown using dom node and subContent
   * @param {HTMLElement} node node to convert
   * @param {string} subContent child nodes converted text
   * @returns {string} converted text
   */
  // eslint-disable-next-line complexity
  ;

  _proto.convert = function convert(node, subContent) {
    var result;

    var converter = this._getConverter(node);

    if (node && node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('data-tomark-pass')) {
      node.removeAttribute('data-tomark-pass');
      result = getRawHtmlString(node, subContent);
    } else if (converter) {
      result = converter.call(this, node, subContent);
    } else if (node) {
      result = this.getSpaceControlled(this._getInlineHtml(node, subContent), node);
    }

    return result || '';
  };

  _proto._getInlineHtml = function _getInlineHtml(node, subContent) {
    var html = node.outerHTML;
    var tagName = node.tagName;
    var escapedSubContent = subContent.replace(/\$/g, '$$$$'); // escape $: replace all $ char to $$ before we throw this string to replace

    return html.replace(new RegExp("(<" + tagName + " ?.*?>).*(</" + tagName + ">)", 'i'), "$1" + escapedSubContent + "$2");
  }
  /**
   * Get converter function for node
   * @private
   * @param {HTMLElement} node node
   * @returns {function} converter function
   */
  ;

  _proto._getConverter = function _getConverter(node) {
    var rulePointer = this.rules;
    var converter;

    while (node && rulePointer) {
      rulePointer = this._getNextRule(rulePointer, this._getRuleNameFromNode(node));
      node = this._getPrevNode(node);

      if (rulePointer && rulePointer.converter) {
        converter = rulePointer.converter;
      }
    }

    return converter;
  }
  /**
   * Get next rule object
   * @private
   * @param {object} ruleObj rule object
   * @param {string} ruleName rule tag name to find
   * @returns {object} rule Object
   */
  ;

  _proto._getNextRule = function _getNextRule(ruleObj, ruleName) {
    return ruleObj[ruleName];
  }
  /**
   * Get proper rule tag name from node
   * @private
   * @param {HTMLElement} node node
   * @returns {string} rule tag name
   */
  ;

  _proto._getRuleNameFromNode = function _getRuleNameFromNode(node) {
    return node.tagName || 'TEXT_NODE';
  }
  /**
   * Get node's available parent node
   * @private
   * @param {HTMLElement} node node
   * @returns {HTMLElement | undefined} result
   */
  ;

  _proto._getPrevNode = function _getPrevNode(node) {
    var parentNode = node.parentNode;
    var previousNode;

    if (parentNode && !parentNode.__htmlRootByToMark) {
      previousNode = parentNode;
    }

    return previousNode;
  }
  /**
   * Set converter for selector
   * @private
   * @param {string} selectors rule selector
   * @param {function} converter converter function
   */
  ;

  _proto._setConverterWithSelector = function _setConverterWithSelector(selectors, converter) {
    var rulePointer = this.rules;

    this._eachSelector(selectors, function (ruleElem) {
      if (!rulePointer[ruleElem]) {
        rulePointer[ruleElem] = {};
      }

      rulePointer = rulePointer[ruleElem];
    });

    rulePointer.converter = converter;
  }
  /**
   * Iterate each selectors
   * @private
   * @param {string} selectors rule selectors
   * @param {function} iteratee callback
   */
  ;

  _proto._eachSelector = function _eachSelector(selectors, iteratee) {
    var selectorArray = selectors.split(' ');
    var selectorIndex = selectorArray.length - 1;

    while (selectorIndex >= 0) {
      iteratee(selectorArray[selectorIndex]);
      selectorIndex -= 1;
    }
  }
  /**
   * Trim text
   * @param {string} text text be trimed
   * @returns {string} trimed text
   */
  ;

  _proto.trim = function trim(text) {
    return text.replace(FIND_CHAR_TO_TRIM_RX, '');
  }
  /**
   * Returns whether text empty or not
   * @param {string} text text be checked
   * @returns {boolean} result
   */
  ;

  _proto.isEmptyText = function isEmptyText(text) {
    return text.replace(FIND_SPACE_RETURN_TAB_RX, '') === '';
  }
  /**
   * Collape space more than 2
   * @param {string} text text be collapsed
   * @returns {string} result
   */
  ;

  _proto.getSpaceCollapsedText = function getSpaceCollapsedText(text) {
    return text.replace(FIND_SPACE_MORE_THAN_ONE_RX, ' ');
  }
  /**
   * Apply backslash escape to text
   * @param {string} text text be processed
   * @returns {string} processed text
   */
  ;

  _proto.escapeText = function escapeText(text) {
    return text.replace(FIND_CHAR_TO_ESCAPE_RX, function (matched) {
      return "\\" + matched;
    });
  }
  /**
   * Escape given text for link
   * @param {string} text - text be processed
   * @returns {string} - processed text
   */
  ;

  _proto.escapeTextForLink = function escapeTextForLink(text) {
    var imageSyntaxRanges = [];
    var result = FIND_MARKDOWN_IMAGE_SYNTAX_RX.exec(text);

    while (result) {
      imageSyntaxRanges.push([result.index, result.index + result[0].length]);
      result = FIND_MARKDOWN_IMAGE_SYNTAX_RX.exec(text);
    }

    return text.replace(FIND_CHAR_TO_ESCAPE_IN_LINK_RX, function (matched, offset) {
      var isDelimiter = imageSyntaxRanges.some(function (range) {
        return offset > range[0] && offset < range[1];
      });
      return isDelimiter ? matched : "\\" + matched;
    });
  }
  /**
   * Backslash escape to text for html
   * Apply backslash escape to text
   * @param {string} text text be processed
   * @returns {string} processed text
   */
  ;

  _proto.escapeTextHtml = function escapeTextHtml(text) {
    return text.replace(new RegExp(Renderer.markdownTextToEscapeHtmlRx.source, 'g'), function (matched) {
      return "\\" + matched;
    });
  }
  /**
   * Backslash is using for escape ASCII punctuation character.
   * https://spec.commonmark.org/0.29/#backslash-escapes
   * If user input backslash as text, backslash is kept by inserting backslash.
   * For example, if input text is "\$", this text is changed "\\$"
   * @param {string} text text be processed
   * @returns {string} processed text
   */
  ;

  _proto.escapeTextBackSlash = function escapeTextBackSlash(text) {
    return text.replace(new RegExp(Renderer.markdownTextToEscapeBackSlashRx.source, 'g'), function (matched) {
      return "\\" + matched;
    });
  }
  /**
   * Escapes in markdown paired characters
   * @param {string} text Text to escape
   * @returns {string} escaped text
   */
  ;

  _proto.escapePairedCharacters = function escapePairedCharacters(text) {
    return text.replace(new RegExp(Renderer.markdownTextToEscapePairedCharsRx.source, 'g'), function (matched) {
      return "\\" + matched;
    });
  };

  _proto._isNeedEscape = function _isNeedEscape(text) {
    var res = false;
    var markdownTextToEscapeRx = Renderer.markdownTextToEscapeRx;
    var type;

    for (type in markdownTextToEscapeRx) {
      if (markdownTextToEscapeRx.hasOwnProperty(type) && markdownTextToEscapeRx[type].test(text)) {
        res = true;
        break;
      }
    }

    return res;
  };

  _proto._isNeedEscapeHtml = function _isNeedEscapeHtml(text) {
    return Renderer.markdownTextToEscapeHtmlRx.test(text);
  };

  _proto._isNeedEscapeBackSlash = function _isNeedEscapeBackSlash(text) {
    return Renderer.markdownTextToEscapeBackSlashRx.test(text);
  };

  _proto.mix = function mix(renderer) {
    cloneRules(this.rules, renderer.rules);
  }
  /**
   * Renderer factory
   * Return new renderer
   * @param {Renderer} srcRenderer renderer to extend
   * @param {object} rules rule object, key(rule selector), value(converter function)
   * @returns {Renderer} renderer
   */
  ;

  Renderer.factory = function factory(srcRenderer, rules) {
    var renderer = new Renderer();

    if (!rules) {
      rules = srcRenderer;
    } else {
      renderer.mix(srcRenderer);
    }

    renderer.addRules(rules);
    return renderer;
  };

  return Renderer;
}();

renderer_defineProperty(Renderer, "markdownTextToEscapeRx", {
  codeblock: /(^ {4}[^\n]+\n*)+/,
  hr: /^ *((\* *){3,}|(- *){3,} *|(_ *){3,}) */,
  heading: /^(#{1,6}) +[\s\S]+/,
  lheading: /^([^\n]+)\n *(=|-){2,} */,
  blockquote: /^( *>[^\n]+.*)+/,
  list: /^ *(\*+|-+|\d+\.) [\s\S]+/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? */,
  link: /!?\[.*\]\(.*\)/,
  reflink: /!?\[.*\]\s*\[([^\]]*)\]/,
  verticalBar: /\u007C/,
  codeblockGfm: /^(`{3,})/,
  codeblockTildes: /^(~{3,})/
});

renderer_defineProperty(Renderer, "markdownTextToEscapeHtmlRx", /<([a-zA-Z_][a-zA-Z0-9\-._]*)(\s|[^\\/>])*\/?>|<(\/)([a-zA-Z_][a-zA-Z0-9\-._]*)\s*\/?>|<!--[^-]+-->|<([a-zA-Z_][a-zA-Z0-9\-.:/]*)>/);

renderer_defineProperty(Renderer, "markdownTextToEscapeBackSlashRx", /\\[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]/);

renderer_defineProperty(Renderer, "markdownTextToEscapePairedCharsRx", /[*_~`]/);


// CONCATENATED MODULE: ./src/renderer.basic.js
/**
 * @fileoverview Implements basicRenderer
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

var FIND_LAST_RETURN_RX = /\n$/g;
var FIND_BR_AND_RETURN_RX = /[ \xA0]+\n\n/g;
var FIND_MULTIPLE_EMPTYLINE_BETWEEN_TEXT_RX = /([ \xA0]+\n){2,}/g;
var FIND_LINK_HREF = /href="(.*?)"/;
var START_OF_LINES_RX = /^/gm;
/**
 * Basic Markdown Renderer
 * @exports basicRenderer
 * @augments Renderer
 */

/* harmony default export */ var renderer_basic = (Renderer.factory({
  // inlines
  TEXT_NODE: function TEXT_NODE(node) {
    var managedText = this.trim(this.getSpaceCollapsedText(node.nodeValue));

    if (this._isNeedEscapeBackSlash(managedText)) {
      managedText = this.escapeTextBackSlash(managedText);
    }

    managedText = this.escapePairedCharacters(managedText);

    if (this._isNeedEscapeHtml(managedText)) {
      managedText = this.escapeTextHtml(managedText);
    }

    if (this._isNeedEscape(managedText)) {
      managedText = this.escapeText(managedText);
    }

    return this.getSpaceControlled(managedText, node);
  },
  'CODE TEXT_NODE': function CODETEXT_NODE(node) {
    return node.nodeValue;
  },
  'EM, I': function EMI(node, subContent) {
    var res = '';

    if (!this.isEmptyText(subContent)) {
      res = "*" + subContent + "*";
    }

    return res;
  },
  'STRONG, B': function STRONGB(node, subContent) {
    var res = '';

    if (!this.isEmptyText(subContent)) {
      res = "**" + subContent + "**";
    }

    return res;
  },
  A: function A(node, subContent) {
    var res = subContent;
    var title = '';
    var url; // "href" attribute is difficult to predict depending on the situation
    // so use as it is applied to html

    var foundedHref = FIND_LINK_HREF.exec(node.outerHTML);

    if (foundedHref) {
      url = foundedHref[1].replace(/&amp;/g, '&');
    }

    if (node.title) {
      title = " \"" + node.title + "\"";
    }

    if (!this.isEmptyText(subContent) && url) {
      res = "[" + this.escapeTextForLink(subContent) + "](" + url + title + ")";
    }

    return res;
  },
  IMG: function IMG(node) {
    var src = node.getAttribute('src');
    var alt = node.alt;

    if (src) {
      return "![" + this.escapeTextForLink(alt) + "](" + src + ")";
    }

    return '';
  },
  BR: function BR() {
    return '  \n';
  },
  CODE: function CODE(node, subContent) {
    var backticks, numBackticks;
    var res = '';

    if (!this.isEmptyText(subContent)) {
      numBackticks = parseInt(node.getAttribute('data-backticks'), 10);
      backticks = isNaN(numBackticks) ? '`' : Array(numBackticks + 1).join('`');
      res = backticks + subContent + backticks;
    }

    return res;
  },
  // Paragraphs
  P: function P(node, subContent) {
    var res = ''; // convert multiple brs to one br

    subContent = subContent.replace(FIND_MULTIPLE_EMPTYLINE_BETWEEN_TEXT_RX, '  \n');

    if (!this.isEmptyText(subContent)) {
      res = "\n\n" + subContent + "\n\n";
    }

    return res;
  },
  'BLOCKQUOTE P': function BLOCKQUOTEP(node, subContent) {
    return subContent;
  },
  'LI P': function LIP(node, subContent) {
    var res = '';

    if (!this.isEmptyText(subContent)) {
      res = subContent;
    }

    return res;
  },
  // Headings
  'H1, H2, H3, H4, H5, H6': function H1H2H3H4H5H6(node, subContent) {
    var res = '';
    var headingNumber = parseInt(node.tagName.charAt(1), 10);

    while (headingNumber) {
      res += '#';
      headingNumber -= 1;
    }

    res += ' ';
    res += subContent;
    return "\n\n" + res + "\n\n";
  },
  'LI H1, LI H2, LI H3, LI H4, LI H5, LI H6': function LIH1LIH2LIH3LIH4LIH5LIH6(node, subContent) {
    var headingNumber = parseInt(node.tagName.charAt(1), 10);
    return Array(headingNumber + 1).join('#') + " " + subContent;
  },
  // List
  'UL, OL': function ULOL(node, subContent) {
    return "\n\n" + subContent + "\n\n";
  },
  'LI OL, LI UL': function LIOLLIUL(node, subContent) {
    var processedSubContent; // remove last br of li

    processedSubContent = subContent.replace(FIND_BR_AND_RETURN_RX, '\n'); // parent LI converter add \n too, so we remove last return

    processedSubContent = processedSubContent.replace(FIND_LAST_RETURN_RX, '');
    var res = processedSubContent.replace(START_OF_LINES_RX, '    ');
    return "\n" + res;
  },
  'UL LI': function ULLI(node, subContent) {
    var res = ''; // convert multiple brs to one br

    subContent = subContent.replace(FIND_MULTIPLE_EMPTYLINE_BETWEEN_TEXT_RX, '  \n');

    if (node.firstChild && node.firstChild.tagName === 'P') {
      res += '\n';
    }

    res += "* " + subContent + "\n";
    return res;
  },
  // eslint-disable-next-line complexity
  'OL LI': function OLLI(node, subContent) {
    var res = '';
    var liCounter = parseInt(node.parentNode.getAttribute('start') || 1, 10);

    while (node.previousSibling) {
      node = node.previousSibling;

      if (node.nodeType === 1 && node.tagName === 'LI') {
        liCounter += 1;
      }
    } // convert multiple brs to one br


    subContent = subContent.replace(FIND_MULTIPLE_EMPTYLINE_BETWEEN_TEXT_RX, '  \n');

    if (node.firstChild && node.firstChild.tagName === 'P') {
      res += '\n';
    }

    res += liCounter + ". " + subContent + "\n";
    return res;
  },
  // HR
  HR: function HR() {
    return '\n\n- - -\n\n';
  },
  // Blockquote
  BLOCKQUOTE: function BLOCKQUOTE(node, subContent) {
    // convert multiple brs to one emptyline
    subContent = subContent.replace(FIND_MULTIPLE_EMPTYLINE_BETWEEN_TEXT_RX, '\n\n');
    var trimmedText = this.trim(subContent);
    var res = trimmedText.replace(START_OF_LINES_RX, '> ');
    return "\n\n" + res + "\n\n";
  },
  // Code Block
  'PRE CODE': function PRECODE(node, subContent) {
    var lastNremoved = subContent.replace(FIND_LAST_RETURN_RX, '');
    var res = lastNremoved.replace(START_OF_LINES_RX, '    ');
    return "\n\n" + res + "\n\n";
  }
}));
// CONCATENATED MODULE: ./src/renderer.gfm.js
/**
 * @fileoverview Implements Github flavored markdown renderer
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */


/**
 * gfmRenderer
 * github flavored Markdown Renderer
 *
 * we didnt render gfm br here because we need distingush returns that made by block with br
 * so we render gfm br later in toMark.js finalize function
 * @exports gfmRenderer
 * @augments Renderer
 */

/* harmony default export */ var renderer_gfm = (Renderer.factory(renderer_basic, {
  'DEL, S': function DELS(node, subContent) {
    return "~~" + subContent + "~~";
  },
  'PRE CODE': function PRECODE(node, subContent) {
    var language = '';
    var numberOfBackticks = node.getAttribute('data-backticks');

    if (node.getAttribute('data-language')) {
      language = " " + node.getAttribute('data-language');
    }

    numberOfBackticks = parseInt(numberOfBackticks, 10);
    var backticks = isNaN(numberOfBackticks) ? '```' : Array(numberOfBackticks + 1).join('`');
    subContent = subContent.replace(/(\r\n)|(\r)|(\n)/g, this.lineFeedReplacement);
    return "\n\n" + backticks + language + "\n" + subContent + "\n" + backticks + "\n\n";
  },
  PRE: function PRE(node, subContent) {
    return subContent;
  },
  'UL LI': function ULLI(node, subContent) {
    return renderer_basic.convert(node, makeTaskIfNeed(node, subContent));
  },
  'OL LI': function OLLI(node, subContent) {
    return renderer_basic.convert(node, makeTaskIfNeed(node, subContent));
  },
  // Table
  TABLE: function TABLE(node, subContent) {
    return "\n\n" + subContent + "\n\n";
  },
  'TBODY, TFOOT': function TBODYTFOOT(node, subContent) {
    return subContent;
  },
  'TR TD, TR TH': function TRTDTRTH(node, subContent) {
    subContent = subContent.replace(/(\r\n)|(\r)|(\n)/g, '');
    return " " + subContent + " |";
  },
  'TD BR, TH BR': function TDBRTHBR() {
    return '<br>';
  },
  TR: function TR(node, subContent) {
    return "|" + subContent + "\n";
  },
  THEAD: function THEAD(node, subContent) {
    var result = '';
    var ths = findChildTag(findChildTag(node, 'TR')[0], 'TH');

    for (var i = 0, thsLength = ths.length; i < thsLength; i += 1) {
      result += " " + makeTableHeadAlignText(ths[i]) + " |";
    }

    return subContent ? subContent + "|" + result + "\n" : '';
  }
}));
/**
 * Make task Markdown string if need
 * @param {HTMLElement} node Passed HTML Element
 * @param {string} subContent node's content
 * @returns {string}
 */

function makeTaskIfNeed(node, subContent) {
  var condition;

  if (node.className.indexOf('task-list-item') !== -1) {
    condition = node.className.indexOf('checked') !== -1 ? 'x' : ' ';
    subContent = "[" + condition + "] " + subContent;
  }

  return subContent;
}
/**
 * Make table head align text
 * @param {HTMLElement} th Table head cell element
 * @returns {string}
 */


function makeTableHeadAlignText(th) {
  var leftAlignValue, rightAlignValue, textLength;
  var align = th.align;
  textLength = th.textContent ? th.textContent.length : th.innerText.length;
  leftAlignValue = '';
  rightAlignValue = '';

  if (align) {
    if (align === 'left') {
      leftAlignValue = ':';
      textLength -= 1;
    } else if (align === 'right') {
      rightAlignValue = ':';
      textLength -= 1;
    } else if (align === 'center') {
      rightAlignValue = ':';
      leftAlignValue = ':';
      textLength -= 2;
    }
  }

  return leftAlignValue + repeatString('-', textLength) + rightAlignValue;
}
/**
 * Find child element of given tag name
 * @param {HTMLElement} node starting element
 * @param {string} tagName Tag name for search
 * @returns {Array.<HTMLElement>}
 */


function findChildTag(node, tagName) {
  var childNodes = node.childNodes;
  var result = [];

  for (var i = 0, childLength = childNodes.length; i < childLength; i += 1) {
    if (childNodes[i].tagName && childNodes[i].tagName === tagName) {
      result.push(childNodes[i]);
    }
  }

  return result;
}
/**
 * Repeat given string
 * @param {string} pattern String for repeat
 * @param {number} count Amount of repeat
 * @returns {string}
 */


function repeatString(pattern, count) {
  var result = pattern;
  count = Math.max(count, 3);

  while (count > 1) {
    result += pattern;
    count -= 1;
  }

  return result;
}
// CONCATENATED MODULE: ./src/toMark.js
/**
 * @fileoverview Implements toMark
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */




var FIND_UNUSED_BRS_RX = /[ \xA0]+(\n\n)/g;
var FIND_FIRST_LAST_WITH_SPACE_RETURNS_RX = /^[\n]+|[\s\n]+$/g;
var FIND_MULTIPLE_BRS_RX = /([ \xA0]+\n){2,}/g;
var FIND_RETURNS_RX = /([ \xA0]){2,}\n/g;
var FIND_RETURNS_AND_SPACE_RX = /[ \xA0\n]+/g;
/**
 * @exports toMark
 * @param {string} htmlStr html string to convert
 * @param {object} options option
 * @param {boolean} options.gfm if this property is false turn off it cant parse gfm
 * @param {Renderer} options.renderer pass renderer to use
 * @returns {string} converted markdown text
 * @example
 * toMark('<h1>hello world</h1>'); // "# hello world"
 * toMark('<del>strike</del>'); // "~~strike~~"
 * toMark('<del>strike</del>', {gfm: false}); // "strike"
 */

function toMark(htmlStr, options) {
  var isGfm = true;
  var renderer;

  if (!htmlStr) {
    return '';
  }

  renderer = renderer_gfm;

  if (options) {
    isGfm = options.gfm;

    if (isGfm === false) {
      renderer = renderer_basic;
    }

    renderer = options.renderer || renderer;
  }

  var runner = new DomRunner(toDom(htmlStr));
  return finalize(parse(runner, renderer), isGfm, renderer.lineFeedReplacement);
}
/**
 * Parse dom to markdown
 * @param {DomRunner} runner runner
 * @param {Renderer} renderer renderer
 * @returns {string} markdown text
 */

function parse(runner, renderer) {
  var markdownContent = '';

  while (runner.next()) {
    markdownContent += tracker(runner, renderer);
  }

  return markdownContent;
}
/**
 * Remove first and last return character
 * @param {string} text text to finalize
 * @param {boolean} isGfm isGfm flag
 * @param {string} lineFeedReplacement Line feed replacement text
 * @returns {string} result
 */


function finalize(text, isGfm, lineFeedReplacement) {
  // collapse return and <br>
  text = text.replace(FIND_UNUSED_BRS_RX, '\n'); // collapse multiple br

  text = text.replace(FIND_MULTIPLE_BRS_RX, '\n\n');
  text = text.replace(FIND_RETURNS_AND_SPACE_RX, function (matched) {
    var returnCount = (matched.match(/\n/g) || []).length;

    if (returnCount >= 3) {
      return '\n\n';
    }

    if (matched >= 1) {
      return '\n';
    }

    return matched;
  }); // remove first and last \n

  text = text.replace(FIND_FIRST_LAST_WITH_SPACE_RETURNS_RX, '');
  text = text.replace(new RegExp(lineFeedReplacement, 'g'), '\n'); // in gfm replace '  \n' make by <br> to '\n'

  if (isGfm) {
    text = text.replace(FIND_RETURNS_RX, '\n');
  }

  return text;
}
/**
 * Iterate childNodes and process conversion using recursive call
 * @param {DomRunner} runner dom runner
 * @param {Renderer} renderer renderer to use
 * @returns {string} processed text
 */


function tracker(runner, renderer) {
  var subContent = '';
  var node = runner.getNode();

  for (var i = 0, t = node.childNodes.length; i < t; i += 1) {
    runner.next();
    subContent += tracker(runner, renderer);
  }

  return renderer.convert(node, subContent);
}
// CONCATENATED MODULE: ./src/index.js
/**
 * @fileoverview Implements entry point
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */




toMark.Renderer = Renderer;
toMark.basicRenderer = renderer_basic;
toMark.gfmRenderer = renderer_gfm;
/* harmony default export */ var src = __webpack_exports__["default"] = (toMark);

/***/ })
/******/ ])["default"];
});