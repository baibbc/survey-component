function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useRef, useLayoutEffect, useState } from 'react';
import classnames from 'classnames';
import Body from "./Body";
import Header from "./Header";
import StickyScroll from "./StickyScroll";
import "./index.css";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var SurveyTable = function SurveyTable(_ref) {
  var title = _ref.title,
      columns = _ref.columns,
      dataSource = _ref.dataSource;
  var headerRef = useRef(null);
  var bodyRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      pingLeft = _useState2[0],
      setPingLeft = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      pingRight = _useState4[0],
      setPingRight = _useState4[1];

  var setPing = function setPing(ele) {
    if (ele.scrollLeft > 0) {
      setPingLeft(true);
    } else {
      setPingLeft(false);
    }

    if (ele.scrollWidth - ele.clientWidth - ele.scrollLeft === 0) {
      setPingRight(false);
    } else {
      setPingRight(true);
    }
  };

  var onScroll = function onScroll(event) {
    var $target = event.target;
    var $header = headerRef.current;
    $header.scrollLeft = $target.scrollLeft;
    var $body = bodyRef.current;
    $body.scrollLeft = $target.scrollLeft;
    setPing($header);
  };

  useLayoutEffect(function () {
    var $header = headerRef.current;
    setPing($header);
  }, []);
  return /*#__PURE__*/_jsx("div", {
    // className="survey-table survey-table-ping-left survey-table-ping-right survey-table-fixed-column survey-table-scroll-horizontal survey-table-has-fix-left survey-table-has-fix-right"
    className: classnames('survey-table', 'survey-table-fixed-column', 'survey-table-scroll-horizontal', {
      'survey-table-ping-left': pingLeft,
      'survey-table-ping-right': pingRight
    }),
    children: /*#__PURE__*/_jsxs("div", {
      className: "survey-table-container",
      children: [/*#__PURE__*/_jsx("div", {
        ref: headerRef,
        className: "survey-table-header survey-table-sticky-holder",
        style: {
          overflow: 'hidden',
          top: 0
        },
        children: /*#__PURE__*/_jsx(Header, {
          columns: columns
        })
      }), /*#__PURE__*/_jsx("div", {
        ref: bodyRef,
        className: "survey-table-body",
        style: {
          overflow: 'hidden'
        },
        children: /*#__PURE__*/_jsx(Body, {
          columns: columns,
          dataSource: dataSource
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "survey-table-sticky-scroll survey-table-sticky-holder",
        style: {
          overflow: 'auto hidden',
          bottom: 0
        },
        onScroll: onScroll,
        children: /*#__PURE__*/_jsx(StickyScroll, {
          columns: columns,
          showHeader: true
        })
      })]
    })
  });
};

export default SurveyTable;