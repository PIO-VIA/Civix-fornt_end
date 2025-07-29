"use client";

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  showCharCount = false,
  maxLength,
  className = '',
  value = '',
  ...props
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    resize-vertical min-h-[100px]
  `;

  const stateClasses = error
    ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20'
    : 'border-gray-300 bg-white hover:border-gray-400';

  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          className={`${baseClasses} ${stateClasses} ${className}`}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        
        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-1">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;