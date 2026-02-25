import { a as createComponent, c as createAstro, m as maybeRenderHead, d as addAttribute, b as renderTemplate } from './astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                                                */

const $$Astro = createAstro("https://vernonwu.com/");
const $$PdfEmbed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PdfEmbed;
  const {
    src,
    title,
    description = "Expand to read the PDF.",
    open = false,
    height
  } = Astro2.props;
  const CDN_BASE = "https://cdn.laplacian.net/gh/vernonwu/picx-images-hosting@master";
  const cdnSrc = (() => {
    if (!src) return src;
    const trimmed = String(src).trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return `${CDN_BASE}${trimmed}`;
    return `${CDN_BASE}/${trimmed}`;
  })();
  const openAttr = open ? true : void 0;
  const derivedName = src.split("/").filter(Boolean).pop();
  const displayTitle = title ?? derivedName ?? "Document";
  const frameHeight = height ?? 0;
  return renderTemplate`${maybeRenderHead()}<details class="pdf-embed astro-e3rxcr77"${addAttribute(openAttr, "open")}${addAttribute(cdnSrc, "data-pdf-src")}> <summary class="pdf-embed__summary astro-e3rxcr77"> <div class="pdf-embed__summary__body astro-e3rxcr77"> <div class="pdf-embed__badge astro-e3rxcr77" aria-hidden="true">PDF</div> <div class="pdf-embed__summary__text astro-e3rxcr77"> <p class="pdf-embed__title astro-e3rxcr77">${displayTitle}</p> <p class="pdf-embed__description astro-e3rxcr77">${description}</p> </div> </div> <div class="pdf-embed__summary__cta astro-e3rxcr77" aria-hidden="true"> <span class="pdf-embed__cta--open astro-e3rxcr77">Open reader</span> <span class="pdf-embed__cta--close astro-e3rxcr77">Close reader</span> <svg viewBox="0 0 24 24" aria-hidden="true" class="astro-e3rxcr77"> <path d="M6 9l6 6 6-6" class="astro-e3rxcr77"></path> </svg> </div> </summary> <div class="pdf-embed__frame astro-e3rxcr77"> <object${addAttribute(cdnSrc, "data")} type="application/pdf" role="document" class="pdf-embed__document astro-e3rxcr77"${addAttribute(`${displayTitle} (PDF)`, "title")}${addAttribute(frameHeight ? `--frame-height: ${frameHeight}px;` : void 0, "style")}> <p class="pdf-embed__fallback astro-e3rxcr77" aria-live="polite">
Unable to load the inline viewer?
<a${addAttribute(cdnSrc, "href")} target="_blank" rel="noreferrer" class="astro-e3rxcr77">Open in a new tab</a>
instead.
</p> </object> </div> </details>  `;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/components/PdfEmbed.astro", void 0);

export { $$PdfEmbed as $ };
