import SuccessIcon from '@/assets/SuccessIcon';
import { IToastifyTextProps } from './ToastifyText.types';
import ErrorIcon from '@/assets/ErrorIcon';

const ToastifyText = ({ title, description, type }: IToastifyTextProps) => {
  return (
    <div className='flex'>
      <div className='mr-3'>{type === 'success' ? <SuccessIcon /> : <ErrorIcon />}</div>
      <div className='flex flex-col'>
        <span className='text-base font-bold'>{title && title}</span>
        <span className='text-sm text-toastify-description'>{description && description}</span>
      </div>
    </div>
  );
};

export default ToastifyText;
