import React, { ReactElement, useMemo } from 'react';
import classnames from 'classnames';

interface HeaderProps {
  columns: [];
}

function cellStyle(column, index, len) {
  let style = {};
  if (column.fixed === 'left') {
    style = {
      position: 'sticky',
      left: column.width * index,
    };
  }
  if (column.fixed === 'right') {
    style = {
      position: 'sticky',
      right: column.width * (len - 1 - index),
    };
  }
  if (column?.align) {
    style = {
      ...style,
      textAlign: column.align,
    };
  }
  return style;
}

function isSticky(column, fixed) {
  return column.fixed === fixed;
}

const TableHeader: React.FC<HeaderProps> = ({ columns }: HeaderProps) => {
  const element: ReactElement = useMemo(() => {
    const leftLast = columns.findLast((n) => n.fixed === 'left');
    const rightFirst = columns.find((n) => n.fixed === 'right');

    return (
      <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {columns.map((column) => {
            return <col key={column.dataIndex} style={{ width: column.width || 100 }} />;
          })}
        </colgroup>
        <thead className="survey-table-thead">
          <tr>
            {columns.map((column, index) => {
              if (column?.colSpan !== 0) {
                let props = {};
                if (column?.colSpan && column.colSpan > 0) {
                  props = {
                    colSpan: column.colSpan,
                  };
                }
                return (
                  <th
                    key={column.dataIndex}
                    className={classnames('survey-table-cell', {
                      'survey-table-cell-fix-left': isSticky(column, 'left'),
                      'survey-table-cell-fix-left-last':
                        isSticky(column, 'left') && leftLast.dataIndex === column.dataIndex,
                      'survey-table-cell-fix-right': isSticky(column, 'right'),
                      'survey-table-cell-fix-right-first':
                        isSticky(column, 'right') && rightFirst.dataIndex === column.dataIndex,
                      'survey-table-cell-fix-sticky': !!column.fixed,
                    })}
                    style={cellStyle(column, index, columns.length)}
                    // style={fixedStyle()}
                    {...props}
                  >
                    {column.title}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
      </table>
    );
  }, [columns]);

  return element;
};

export default TableHeader;
