/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useFormik,
  FormikConfig,
  FormikErrors,
  FormikTouched,
  FormikState,
  FieldMetaProps,
  FieldHelperProps,
  FieldInputProps,
} from 'formik';
import {useLoading} from '../contexts';

export const useForm = <Values>(
  config: FormikConfig<Values>,
): {
  initialValues: Values;
  initialErrors: FormikErrors<Values>;
  initialTouched: FormikTouched<Values>;
  initialStatus: any;
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleReset: (e: any) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  resetForm: (nextState?: Partial<FormikState<Values>> | undefined) => void;
  setErrors: (errors: FormikErrors<Values>) => void;
  setFormikState: (stateOrCb: FormikState<Values> | ((state: FormikState<Values>) => FormikState<Values>)) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any;
  setFieldError: (field: string, value: string | undefined) => void;
  setStatus: (status: any) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setTouched: (touched: FormikTouched<Values>, shouldValidate?: boolean | undefined) => any;
  setValues: (values: Values, shouldValidate?: boolean | undefined) => any;
  submitForm: () => Promise<any>;
  validateForm: (values?: Values) => Promise<FormikErrors<Values>>;
  validateField: (name: string) => Promise<void> | Promise<string | undefined>;
  isValid: boolean;
  dirty: boolean;
  unregisterField: (name: string) => void;
  registerField: (name: string, {validate}: any) => void;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  getFieldMeta: (name: string) => FieldMetaProps<any>;
  getFieldHelpers: (name: string) => FieldHelperProps<any>;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnMount: boolean;
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isSubmitting: boolean;
  isValidating: boolean;
  status?: any;
  submitCount: number;
} => {
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
