type ValidationErrorShape = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};

export function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const validationError = error as ValidationErrorShape;
    const messages: string[] = [];

    if (Array.isArray(validationError.formErrors)) {
      messages.push(...validationError.formErrors.filter(Boolean));
    }

    if (validationError.fieldErrors && typeof validationError.fieldErrors === 'object') {
      for (const [field, fieldMessages] of Object.entries(validationError.fieldErrors)) {
        if (Array.isArray(fieldMessages) && fieldMessages.length > 0) {
          messages.push(`${field}: ${fieldMessages.filter(Boolean).join(', ')}`);
        }
      }
    }

    if (messages.length > 0) {
      return messages.join(' ');
    }

    if ('message' in validationError && typeof (validationError as { message?: unknown }).message === 'string') {
      return (validationError as { message: string }).message;
    }
  }

  return fallback;
}