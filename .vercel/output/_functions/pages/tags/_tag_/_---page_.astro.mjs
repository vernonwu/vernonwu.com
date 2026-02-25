import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, d as addAttribute, e as renderTransition, m as maybeRenderHead } from '../../../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_DWtfKiCL.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../../../chunks/Footer_BKvCJzbM.mjs';
import { $ as $$Main } from '../../../chunks/Main_BPWwIqUn.mjs';
import { C as Card } from '../../../chunks/Card_Cn6nXclz.mjs';
import { $ as $$Pagination } from '../../../chunks/Pagination_Cl5KbDkD.mjs';
import { S as SITE } from '../../../chunks/config_BR15hYS5.mjs';
/* empty css                                       */
import { g as getUniqueTags } from '../../../chunks/getUniqueTags_C5alyB0j.mjs';
import { g as getSortedPosts } from '../../../chunks/getSortedPosts_DkJw1amD.mjs';
import { a as slugifyAll } from '../../../chunks/slugify_CvQuO4Tx.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://vernonwu.com/");
const $$TagPosts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TagPosts;
  const { page, tag, tagName } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tag: ${tagName} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tags" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": [`Tag:`, `${tagName}`], "titleTransition": tag, "pageDesc": `All the articles with the tag "${tagName}".` }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<ul> ${page.data.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "frontmatter": data })}`)} </ul> `, "title": ($$result3) => renderTemplate`<h1${addAttribute(renderTransition($$result3, "vfrq7tp3", "", tag), "data-astro-transition-scope")}>${`Tag:${tag}`}</h1>` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": page.lastPage > 1 })} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/layouts/TagPosts.astro", "self");

const getPostsByTag = (posts, tag) => getSortedPosts(
  posts.filter((post) => slugifyAll(post.data.tags).includes(tag))
);

const $$Astro = createAstro("https://vernonwu.com/");
const prerender = true;
async function getStaticPaths({ paginate }) {
  const posts = await getCollection("blog");
  const tags = getUniqueTags(posts);
  return tags.flatMap(({ tag, tagName }) => {
    const tagPosts = getPostsByTag(posts, tag);
    return paginate(tagPosts, {
      params: { tag },
      props: { tagName },
      pageSize: SITE.postPerPage
    });
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const params = Astro2.params;
  const { tag } = params;
  const { page, tagName } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "TagPosts", $$TagPosts, { "page": page, "tag": tag, "tagName": tagName })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/tags/[tag]/[...page].astro", void 0);

const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/tags/[tag]/[...page].astro";
const $$url = "/tags/[tag]/[...page]";

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
