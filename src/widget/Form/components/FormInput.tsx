import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { RequiredSymbol } from './RequiredSymbol';
import { Input } from '@/shared/components/ui';
import { ErrorMessage } from './ErrorMessage';
import { ClearButton } from './ClearButton';
import { cn } from '@/shared/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
}

export const FormInput: FC<Props> = ({ className, name, label, required, type, ...props }) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const clearInput = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <label htmlFor={name} className={cn('', className)}>
      {label}
      {required && <RequiredSymbol />}

      <div className="relative">
        <Input {...register(name)} id={name} type={type} {...props} />
        {value && <ClearButton onClick={clearInput} />}
      </div>

      {errorText && <ErrorMessage message={errorText} />}
    </label>
  );
};
