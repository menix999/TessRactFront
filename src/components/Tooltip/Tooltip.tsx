import { ReactNode } from 'react';

interface ITooltipProps {
  children: ReactNode;
  tooltipRef: React.RefObject<HTMLDivElement>;
}

const Tooltip = ({ children, tooltipRef }: ITooltipProps) => {
  return (
    <div ref={tooltipRef}>
      <div className='flex w-14 h-20 bg-white absolute shadow-xl border rounded-xl left-0 sm:-left-3 -top-3 z-0' />
      <div className='flex w-60 h-10 absolute bg-white left-0 sm:-left-3 top-4 opacity-0' />
      <div className='absolute top-12 overflow-auto z-50 shadow-xl rounded-xl sm:-left-3 -left-[184px]'>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
