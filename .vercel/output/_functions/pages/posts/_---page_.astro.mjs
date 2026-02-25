import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { S as SITE } from '../../chunks/config_BR15hYS5.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../../chunks/Footer_BKvCJzbM.mjs';
import { $ as $$Main } from '../../chunks/Main_BPWwIqUn.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_Cl5KbDkD.mjs';
import { C as Card } from '../../chunks/Card_Cn6nXclz.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DWtfKiCL.mjs';
import { g as getSortedPosts } from '../../chunks/getSortedPosts_DkJw1amD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://vernonwu.com/");
const $$Posts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Posts;
  const { page } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Posts | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "posts" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Posts", "pageDesc": "All the articles I've posted." }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<ul> ${page.data.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "frontmatter": data })}`)} </ul> ` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": page.lastPage > 1 })} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/layouts/Posts.astro", void 0);

const $$Astro = createAstro("https://vernonwu.com/");
const prerender = true;
const getStaticPaths = async ({ paginate }) => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return paginate(getSortedPosts(posts), { pageSize: SITE.postPerPage });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Posts", $$Posts, { "page": page })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/posts/[...page].astro", void 0);

const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/posts/[...page].astro";
const $$url = "/posts/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
