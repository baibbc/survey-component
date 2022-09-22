function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import classnames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function cellStyle(column, index, len) {
  var style = {};

  if (column.fixed === 'left') {
    style = {
      position: 'sticky',
      left: column.width * index
    };
  }

  if (column.fixed === 'right') {
    style = {
      position: 'sticky',
      right: column.width * (len - 1 - index)
    };
  }

  if (column !== null && column !== void 0 && column.align) {
    style = _objectSpread(_objectSpread({}, style), {}, {
      textAlign: column.align
    });
  }

  return style;
}

function isSticky(column, fixed) {
  return column.fixed === fixed;
}

var TableHeader = function TableHeader(_ref) {
  var columns = _ref.columns;
  var element = useMemo(function () {
    var leftLast = columns.findLast(function (n) {
      return n.fixed === 'left';
    });
    var rightFirst = columns.find(function (n) {
      return n.fixed === 'right';
    });
    return /*#__PURE__*/_jsxs("table", {
      style: {
        tableLayout: 'fixed'
      },
      children: [/*#__PURE__*/_jsx("colgroup", {
        children: columns.map(function (column) {
          return /*#__PURE__*/_jsx("col", {
            style: {
              width: column.width || 100
            }
          }, column.dataIndex);
        })
      }), /*#__PURE__*/_jsx("thead", {
        className: "survey-table-thead",
        children: /*#__PURE__*/_jsx("tr", {
          children: columns.map(function (column, index) {
            if ((column === null || column === void 0 ? void 0 : column.colSpan) !== 0) {
              var props = {};

              if (column !== null && column !== void 0 && column.colSpan && column.colSpan > 0) {
                props = {
                  colSpan: column.colSpan
                };
              }

              return /*#__PURE__*/_jsx("th", _objectSpread(_objectSpread({
                className: classnames('survey-table-cell', {
                  'survey-table-cell-fix-left': isSticky(column, 'left'),
                  'survey-table-cell-fix-left-last': isSticky(column, 'left') && leftLast.dataIndex === column.dataIndex,
                  'survey-table-cell-fix-right': isSticky(column, 'right'),
                  'survey-table-cell-fix-right-first': isSticky(column, 'right') && rightFirst.dataIndex === column.dataIndex,
                  'survey-table-cell-fix-sticky': !!column.fixed
                }),
                style: cellStyle(column, index, columns.length) // style={fixedStyle()}

              }, props), {}, {
                children: column.title
              }), column.dataIndex);
            }
          })
        })
      })]
    });
  }, [columns]);
  return element;
};

export default TableHeader;