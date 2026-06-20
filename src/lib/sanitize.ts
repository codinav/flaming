import sanitizeHtml from "sanitize-html";

/** Sanitize admin-authored rich text before storing (defense-in-depth). */
export function sanitizeRichText(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s",
      "h2", "h3", "ul", "ol", "li", "blockquote", "a", "code", "pre", "hr",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer nofollow" },
      }),
    },
  });
}
