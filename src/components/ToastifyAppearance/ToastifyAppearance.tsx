import { ToastContainer } from 'react-toastify';
import '../../app/[locale]/globals.css';

const ToastifyAppearance = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      theme='colored'
      closeButton={false}
      limit={3}
      hideProgressBar
      icon={false}
    />
  );
};

export default ToastifyAppearance;
