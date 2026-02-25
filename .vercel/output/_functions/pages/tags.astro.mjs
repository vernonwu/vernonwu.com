import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_DWtfKiCL.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
import { $ as $$Main } from '../chunks/Main_BPWwIqUn.mjs';
import { $ as $$Tag } from '../chunks/Tag_BJdRuph6.mjs';
import { g as getUniqueTags } from '../chunks/getUniqueTags_C5alyB0j.mjs';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  let tags = getUniqueTags(posts);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tags | ${SITE.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tags" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Tags", "pageDesc": "All the tags used in posts." }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<ul> ${tags.map(({ tag }) => renderTemplate`${renderComponent($$result3, "Tag", $$Tag, { "tag": tag, "size": "lg" })}`)} </ul> ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/tags/index.astro", void 0);

const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
