import React, { ReactElement, useMemo } from 'react';
import Header from './Header';

interface HeaderProps {
  columns: [];
  showHeader: boolean;
}

const StickyScroll: React.FC<HeaderProps> = ({ columns, showHeader }: HeaderProps) => {
  const element: ReactElement = useMemo(() => {
    if (showHeader) {
      return <Header columns={columns} />;
    }
    return (
      <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {columns.map((column) => {
            return <col key={column.dataIndex} style={{ width: column.width || 100 }} />;
          })}
        </colgroup>
        <thead className="survey-table-thead">
          <tr aria-hidden="true" style={{ fontSize: 0 }}>
            <th colSpan={columns.length} style={{ padding: 0, border: 0, height: 1 }}></th>
          </tr>
        </thead>
      </table>
    );
  }, [columns]);

  return element;
};

export default StickyScroll;
