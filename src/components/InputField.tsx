
'use client';

interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  warning?: string;
  type?: string;
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  warning,
  type = 'text',
}: InputFieldProps) {
  return (
    <div className="w-75">
      <label 
        htmlFor={name} 
        className="block text-label-sm text-slate-700 uppercase tracking-wide mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 text-body-md text-slate-900 bg-surface-low 
          border rounded-md focus:outline-none focus:ring-1 focus:ring-primaryy/50
          transition-colors placeholder:text-slate-300
          ${error ? 'border-error' : 'border-transparent'}
        `}
      />
      {error && (
        <p className="text-label-sm text-error mt-1">{error}</p>
      )}
      {warning && !error && (
        <p className="text-label-sm text-warning mt-1">{warning}</p>
      )}
    </div>
  );
}