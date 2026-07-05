
export const validateUUID = (uuid: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
export const validatePhone = (phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone);
export const validateURL = (url: string) => {
  try { new URL(url); return true; } catch { return false; }
};
export const validateJSON = (str: string) => {
  try { JSON.parse(str); return true; } catch { return false; }
};
export const validateLength = (str: string, min: number, max: number) => str.length >= min && str.length <= max;
export const validatePasswordStrength = (pass: string) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
};
export const isRequired = (val: any) => val !== null && val !== undefined && val !== '';
