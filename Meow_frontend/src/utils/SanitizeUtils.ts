import DOMPurify from 'dompurify';

const sanitizeHtml = (htmlString: string, allowAttr: string[] = []) => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(htmlString, { ALLOWED_ATTR: allowAttr });
  }
  return htmlString;
};

const SanitizeUtils = {
  sanitizeHtml: sanitizeHtml,
};

export default SanitizeUtils;
