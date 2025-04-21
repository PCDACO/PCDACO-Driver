export const generateGuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const random = (Math.random() * 16) | 0;
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};

export const formatNumber = (value: string | number): string => {
  const numericValue = value.toString().replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatAccountNumber = (value: string | number): string => {
  const numericValue = value.toString().replace(/\D/g, '');

  if (numericValue.length % 2 === 0) {
    // Even length: format with 4 digits after each dot
    return numericValue.replace(/(\d{4})(?=\d)/g, '$1.');
  } else {
    // Odd length: first 4 digits, then 3 digits after each dot
    const firstPart = numericValue.slice(0, 4);
    const remaining = numericValue.slice(4);
    const formattedRemaining = remaining.replace(/(\d{3})(?=\d)/g, '$1.');
    return firstPart + (formattedRemaining ? '.' + formattedRemaining : '');
  }
};

export const createFormData = (payload: Record<string, File[]>) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, files]) => {
    files.forEach((file) => formData.append(key, file));
  });
  return formData;
};

export const getImageUrl = (url: string) => {
  if (!url) return '';
  const timestamp = new Date().getTime();
  return `${url}${url.includes('?') ? '&' : '?'}_=${timestamp}`;
};

export const withNoCache = (url: string) => `${url}?ts=${Date.now()}`;
