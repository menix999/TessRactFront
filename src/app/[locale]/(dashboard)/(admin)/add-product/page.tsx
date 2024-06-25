import AddProductForm from '@/components/AddProductForm/AddProductForm';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import ToastifyAppearance from '@/components/ToastifyAppearance/ToastifyAppearance';

const AddProductPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)] px-8'>
      <div className='flex flex-col w-full md:w-1/2 gap-8 '>
        <h1 className='text-xl font-bold'>{translation.addProduct}</h1>
        <AddProductForm translation={translation} />
      </div>
    </div>
  );
};

export default AddProductPage;
