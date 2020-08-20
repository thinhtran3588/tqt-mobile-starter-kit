import {useFormik, FormikConfig, FormikContextType} from 'formik';
import {useDispatch} from 'react-redux';
import {Dispatch} from '@app/stores';

export const useForm = <Values>(params: FormikConfig<Values> & {showLoading?: boolean}): FormikContextType<Values> => {
  const {showLoading = true, ...config} = params;
  const form = useFormik<Values>(config);
  const {
    loading: {setLoading},
  } = useDispatch<Dispatch>();

  const submitForm = async (): Promise<void> => {
    const validation = await form.validateForm();
    if (Object.keys(validation).length > 0) {
      return;
    }

    showLoading && setLoading(true);
    await config.onSubmit(form.values, form);
    showLoading && setLoading(false);
  };

  return {...form, submitForm};
};
