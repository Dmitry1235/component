import React, { Fragment, useState, useMemo } from 'react';
import cn from 'classnames/bind';

// UIKit
import { Paragraph, Button } from '@product/sberlegal-uikit';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

type ListType = {
  title: string;
  date: string;
  address: string;
};

export interface HideListProps {
  className?: string;
  list: ListType[];
}

export const HideList: React.FC<HideListProps> = ({ className = '', list }) => {
  const [isOpen, setOpen] = useState(false);

  const hideList = useMemo(() => {
    if (list.length <= 4 || isOpen) {
      return list;
    }
    return [...list.slice(0, 2), ...list.slice(-2)];
  }, [list, isOpen]);

  return (
    <ul className={cx('HideList', className)}>
      {hideList.map((item, index) => (
        <Fragment key={index}>
          <li
            className={cx('HideList__item', {
              'HideList__item_prev-btn': list.length > 4 && index === 1 && !isOpen,
            })}
          >
            <Paragraph className={cx('HideList__label')}>{item.title}</Paragraph>
            <div className={cx('HideList__title')}>
              <Paragraph className={cx('HideList__date')} size={'medium'}>
                {item.date}
              </Paragraph>
              <Paragraph className={cx('HideList__address')} size={'medium'}>
                {item.address}
              </Paragraph>
            </div>
          </li>
          {list.length > 4 && index === 1 && !isOpen && (
            <Button className={cx('HideList__more')} mod={'custom'} onClick={() => setOpen(true)}>
              <div className={cx('HideList__points')} />
            </Button>
          )}
        </Fragment>
      ))}
    </ul>
  );
};
