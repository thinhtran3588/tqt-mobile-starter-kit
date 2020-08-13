import {useFormik, FormikConfig, FormikContextType} from 'formik';
import {useLoading} from '../contexts';

export const useForm = <Values>(config: FormikConfig<Values>): FormikContextType<Values> => {
  const form = useFormik<Values>(config);
  const {setLoading} = useLoading();

  const submitForm = async (): Promise<void> => {
    const validation = await form.validateForm();
    if (Object.keys(validation).length > 0) {
      return;
    }

    setLoading(true);
    await config.onSubmit(form.values, form);
    setLoading(false);
  };

  return {...form, submitForm};
};
