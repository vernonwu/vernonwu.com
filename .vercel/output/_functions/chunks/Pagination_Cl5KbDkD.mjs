import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute } from './astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { $ as $$LinkButton } from './Footer_BKvCJzbM.mjs';
/* empty css                          */

const $$Astro = createAstro("https://vernonwu.com/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page } = Astro2.props;
  return renderTemplate`${page.lastPage > 1 && renderTemplate`${maybeRenderHead()}<nav class="pagination-wrapper astro-d776pwuy" aria-label="Pagination">${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": !page.url.prev, "href": page.url.prev, "className": (`mr-4 select-none ${page.url.prev ? "" : "disabled"}` ?? "") + " astro-d776pwuy", "ariaLabel": "Previous" }, { "default": ($$result2) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg"${addAttribute([[{ "disabled-svg": !page.url.prev }], "astro-d776pwuy"], "class:list")}><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" class="astro-d776pwuy"></path></svg>
Prev
` })}${page.currentPage} / ${page.lastPage}${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": !page.url.next, "href": page.url.next, "className": (`mx-4 select-none ${page.url.next ? "" : "disabled"}` ?? "") + " astro-d776pwuy", "ariaLabel": "Next" }, { "default": ($$result2) => renderTemplate`
Next
<svg xmlns="http://www.w3.org/2000/svg"${addAttribute([[{ "disabled-svg": !page.url.next }], "astro-d776pwuy"], "class:list")}><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" class="astro-d776pwuy"></path></svg>` })}</nav>`}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
