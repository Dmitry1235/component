import React from 'react';
import cn from 'classnames/bind';

// Styles
import styles from './styles.styl';
const cx = cn.bind(styles);

export interface ProgressBarProps {
  className?: string;
  theme?: 'file';
  isEndAnimation?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ className, theme, isEndAnimation }) => {
  return (
    <div
      className={cx(
        'ProgressBar',
        { [`ProgressBar__theme_${theme}`]: theme, ProgressBar__endAnimation: isEndAnimation },
        className,
      )}
    >
      <div className={cx('ProgressBar__line')} />
    </div>
  );
};
