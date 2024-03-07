import * as React from 'react';
import { Slider as BaseSlider, SliderProps } from '@mui/base/Slider';
import clsx from 'clsx';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return (
    <BaseSlider
      ref={ref}
      {...props}
      slots={{ valueLabel: 'span' }}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative inline-flex h-2 w-full touch-none items-center py-4 ${
                ownerState.disabled
                  ? 'pointer-events-none cursor-default text-slate-300 opacity-50 dark:text-slate-600'
                  : 'cursor-pointer text-purple-600 hover:opacity-100 dark:text-purple-400'
              }`,
              resolvedSlotProps?.className
            ),
          };
        },
        rail: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.rail,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'absolute block h-[4px] w-full rounded-full bg-current opacity-40',
              resolvedSlotProps?.className
            ),
          };
        },
        track: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.track,
            ownerState
          );

          return {
            ...resolvedSlotProps,
            className: clsx(
              'absolute block h-[4px] rounded-full bg-current',
              resolvedSlotProps?.className
            ),
          };
        },
        thumb: (ownerState, { active, focused }) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `hover:shadow-outline-purple absolute -ml-1.5 box-border h-[20px] w-[20px] rounded-full bg-current outline-0 transition ${
                focused || active
                  ? 'scale-[1.2] shadow-[0_0_0_8px_rgba(192,132,252,0.5)] outline-none active:shadow-[0_0_0_4px_rgba(192,132,252,0.5)] dark:shadow-[0_0_0_4px_rgba(192,132,252,0.5)] dark:active:shadow-[0_0_0_4px_rgba(192,132,252,0.5)]'
                  : ''
              }`,
              resolvedSlotProps?.className
            ),
          };
        },
        valueLabel: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.valueLabel,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'absolute top-0 -mt-8 rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white shadow-lg',
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});

export default Slider;
