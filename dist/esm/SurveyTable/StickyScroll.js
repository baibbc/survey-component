import React, { useMemo } from 'react';
import Header from "./Header";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var StickyScroll = function StickyScroll(_ref) {
  var columns = _ref.columns,
      showHeader = _ref.showHeader;
  var element = useMemo(function () {
    if (showHeader) {
      return /*#__PURE__*/_jsx(Header, {
        columns: columns
      });
    }

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
          "aria-hidden": "true",
          style: {
            fontSize: 0
          },
          children: /*#__PURE__*/_jsx("th", {
            colSpan: columns.length,
            style: {
              padding: 0,
              border: 0,
              height: 1
            }
          })
        })
      })]
    });
  }, [columns]);
  return element;
};

export default StickyScroll;