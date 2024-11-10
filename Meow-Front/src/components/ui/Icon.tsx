import { IconPath } from '@/shared/enum/icon.enum';
import React from 'react';

interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'ref'> {
  className?: string;
  style?: React.CSSProperties;
  type: IconPath;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(({ className, style, type, ...rest }, ref) => {
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        backgroundColor: 'currentColor',
        maskImage: `url(${type})`,
        WebkitMaskImage: `url(${type})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        ...style,
      }}
      {...rest}
    />
  );
});

export default Icon;
