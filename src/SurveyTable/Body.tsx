import React, { useMemo } from 'react';
import classnames from 'classnames';

interface BodyProps {
  dataSource: [];
}

function isSticky(column, fixed) {
  return column.fixed === fixed;
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

const TableBody: React.FC<BodyProps> = ({ columns, dataSource }: BodyProps) => {
  const element = useMemo(() => {
    if (dataSource.length <= 0) {
      return <div style={{ textAlign: 'center', padding: 15 }}>No Data</div>;
    }

    const leftLast = columns.findLast((n) => n.fixed === 'left');
    const rightFirst = columns.find((n) => n.fixed === 'right');
    return (
      <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {columns.map((column) => {
            return <col key={column.dataIndex} style={{ width: column.width || 100 }} />;
          })}
        </colgroup>
        <tbody className="survey-table-tbody">
          {dataSource.map((data) => {
            return (
              <tr key={data.key} data-row-key={data.key} className="survey-table-row">
                {columns.map((column, index) => {
                  return (
                    <td
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
                    >
                      {data[column.dataIndex]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }, [columns, dataSource]);
  return element;
};

export default TableBody;
