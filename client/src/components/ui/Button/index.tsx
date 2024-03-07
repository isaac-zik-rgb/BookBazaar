import * as React from 'react';
import {
  Button as BaseButton,
  ButtonOwnerState,
  ButtonProps,
} from '@mui/base/Button';
import clsx from 'clsx';
import { tw } from 'utils/tw';

type customButtonProps = {
  variant?: 'text' | 'outlined' | 'solid';
  color?: string;
} & ButtonProps;

const Button = React.forwardRef(function Button(
  props: customButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { variant = 'none', ...rest } = props;
  const btnClasses = clsx(
    'rounded-md px-4 py-2 transition-colors',
    variant === 'none' && '',
    variant === 'solid' && tw`bg-primary py-2.5 text-white`,
    variant === 'outlined' &&
      `border-2 border-primary bg-primary/5 text-primary`,
    variant === 'text' && 'text-primary'
  );
  return (
    <BaseButton
      {...rest}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `${btnClasses} ${
            state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : ''
          }`,
        }),
      }}
      ref={ref}
    />
  );
});

export default Button;
