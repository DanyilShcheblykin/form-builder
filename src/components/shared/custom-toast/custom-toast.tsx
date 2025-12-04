import { toast, ToastContent, TypeOptions } from 'react-toastify';

export const customToast = (
  content: ToastContent<unknown>,
  type: TypeOptions = 'default'
) => {
  toast(content, {
    autoClose: 4000,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    type,
    style: { zIndex: 10000 },
  });
};
