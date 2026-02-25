import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderSlot, u as unescapeHTML } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_C6osFKrE.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://vernonwu.com/");
const $$NotesLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NotesLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${frontmatter.title} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "notes" })} ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, {})} ${maybeRenderHead()}<main id="main-content"> <section id="notes" class="prose mb-28 max-w-3xl"> <h1 class="text-2xl tracking-wider sm:text-3xl">${frontmatter.title}</h1> ${frontmatter.description && renderTemplate`<p class="mt-2 italic">${frontmatter.description}</p>`} ${renderSlot($$result2, $$slots["default"])} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/layouts/NotesLayout.astro", void 0);

const html = "<ul>\n<li>\n<p><a href=\"https://laplacian.net/tsr4l81s#BpbPPfvTXRmUhyK46hpt38HizjDI+BS1AChZhzCHb6I\">Machine Learning Basics</a></p>\n</li>\n<li>\n<p><a href=\"https://laplacian.net/9hxpeh1v#7ucyZ1R/HA9iP28JUx2ULCm9V+cLpq2nOJpWjt7iAW8\">Stanford CS231n: Deep Learning for Computer Vision</a></p>\n</li>\n<li>\n<p><a href=\"https://laplacian.net/rp02782m#kggEv9bfn/B1pd78O6lAAdy5yezzf4LVuEbcwZahOMs\">Berkeley CS285: Deep Reinforcement Learning</a></p>\n</li>\n<li>\n<p><a href=\"https://laplacian.net/eaaek84w#OSvwVdlKv2l82MvghJWYPrgD1FrTX30vo02ccHi+U8Q\">Japanese Grammar</a></p>\n</li>\n</ul>";

				const frontmatter = {"layout":"../layouts/NotesLayout.astro","title":"Notes","description":"A list of my public obsidian notes."};
				const file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/notes.md";
				const url = "/notes";
				function rawContent() {
					return "\n- [Machine Learning Basics](https://laplacian.net/tsr4l81s#BpbPPfvTXRmUhyK46hpt38HizjDI+BS1AChZhzCHb6I)\n\n- [Stanford CS231n: Deep Learning for Computer Vision](https://laplacian.net/9hxpeh1v#7ucyZ1R/HA9iP28JUx2ULCm9V+cLpq2nOJpWjt7iAW8)\n\n- [Berkeley CS285: Deep Reinforcement Learning](https://laplacian.net/rp02782m#kggEv9bfn/B1pd78O6lAAdy5yezzf4LVuEbcwZahOMs)\n\n- [Japanese Grammar](https://laplacian.net/eaaek84w#OSvwVdlKv2l82MvghJWYPrgD1FrTX30vo02ccHi+U8Q)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$NotesLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
