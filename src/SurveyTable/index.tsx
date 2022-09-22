import React, { useRef, useLayoutEffect, useState } from 'react';
import classnames from 'classnames';
import Body from './Body';
import Header from './Header';
import StickyScroll from './StickyScroll';
import './index.css';

interface Props {
  title: string;
  columns: [];
  dataSource: [];
}

const SurveyTable: React.FC<Props> = ({ title, columns, dataSource }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [pingLeft, setPingLeft] = useState<boolean>(false);
  const [pingRight, setPingRight] = useState<boolean>(false);

  const setPing = (ele: HTMLElement) => {
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

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const $target = event.target as HTMLElement;
    const $header = headerRef.current as HTMLElement;
    $header.scrollLeft = $target.scrollLeft;
    const $body = bodyRef.current as HTMLElement;
    $body.scrollLeft = $target.scrollLeft;
    setPing($header);
  };

  useLayoutEffect(() => {
    const $header = headerRef.current as HTMLElement;
    setPing($header);
  }, []);

  return (
    <div
      // className="survey-table survey-table-ping-left survey-table-ping-right survey-table-fixed-column survey-table-scroll-horizontal survey-table-has-fix-left survey-table-has-fix-right"
      className={classnames(
        'survey-table',
        'survey-table-fixed-column',
        'survey-table-scroll-horizontal',
        {
          'survey-table-ping-left': pingLeft,
          'survey-table-ping-right': pingRight,
        },
      )}
    >
      <div className="survey-table-container">
        <div
          ref={headerRef}
          className="survey-table-header survey-table-sticky-holder"
          style={{ overflow: 'hidden', top: 0 }}
        >
          <Header columns={columns} />
        </div>
        <div ref={bodyRef} className="survey-table-body" style={{ overflow: 'hidden' }}>
          <Body columns={columns} dataSource={dataSource} />
        </div>
        <div
          className="survey-table-sticky-scroll survey-table-sticky-holder"
          style={{ overflow: 'auto hidden', bottom: 0 }}
          onScroll={onScroll}
        >
          <StickyScroll columns={columns} showHeader={true} />
        </div>
      </div>
    </div>
  );
};
export default SurveyTable;
