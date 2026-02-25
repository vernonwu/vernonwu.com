import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
import { a as $$Layout, b as $$Header, $ as $$LinkButton, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `404 Not Found | ${SITE.title}`, "class": "astro-zetdm5md" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "class": "astro-zetdm5md" })} ${maybeRenderHead()}<main id="main-content" class="astro-zetdm5md"> <div class="not-found-wrapper astro-zetdm5md"> <h1 class="astro-zetdm5md">404</h1> <span aria-hidden="true" class="astro-zetdm5md">¯\\_(ツ)_/¯</span> <p class="astro-zetdm5md">Page Not Found</p> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": "/", "className": "my-6 text-lg underline decoration-dashed underline-offset-8 astro-zetdm5md" }, { "default": ($$result3) => renderTemplate`
Go back home
` })} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-zetdm5md" })} ` })} `;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/404.astro", void 0);

const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
