import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderSlot, s as spreadAttributes, u as unescapeHTML } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_C6osFKrE.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
import { a as getImage } from '../chunks/_astro_assets_B6MgDmiP.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://vernonwu.com/");
const $$AboutLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AboutLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${frontmatter.title} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "about" })} ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, {})} ${maybeRenderHead()}<main id="main-content"> <section id="about" class="prose mb-28 max-w-3xl prose-img:border-0"> <h1 class="text-2xl tracking-wider sm:text-3xl">${frontmatter.title}</h1> ${frontmatter.description && renderTemplate`<p class="mt-2 italic">${frontmatter.description}</p>`} ${renderSlot($$result2, $$slots["default"])} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/layouts/AboutLayout.astro", void 0);

const Astro__G3xfm = new Proxy({"src":"/_astro/nozomi.BhzNWuI7.jpg","width":1200,"height":675,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/stevejobs/study/projects/vernonwu.com/public/nozomi.jpg";
							}
							
							return target[name];
						}
					});

const images = async function(html) {
					const imageSources = {};
					{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "\\.\\./\\.\\./public/nozomi\\.jpg" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "../../public/nozomi.jpg" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__G3xfm, ...props});
													occurrenceCounter++;
											}
									}
					return imageSources;
			};

			async function updateImageReferences(html) {
				return images(html).then((imageSources) => {
						return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) => {
								const decodedImagePath = JSON.parse(imagePath.replace(/&#x22;/g, '"'));
		
								// Use the 'index' property for each image occurrence
								const srcKey = decodedImagePath.src + '_' + decodedImagePath.index;
		
								if (imageSources[srcKey].srcSet && imageSources[srcKey].srcSet.values.length > 0) {
										imageSources[srcKey].attributes.srcset = imageSources[srcKey].srcSet.attribute;
								}
		
								const { index, ...attributesWithoutIndex } = imageSources[srcKey].attributes;
		
								return spreadAttributes({
										src: imageSources[srcKey].src,
										...attributesWithoutIndex,
								});
						});
				});
		}
		

		// NOTE: This causes a top-level await to appear in the user's code, which can break very easily due to a Rollup
	  // bug and certain adapters not supporting it correctly. See: https://github.com/rollup/rollup/issues/4708
	  // Tread carefully!
			const html = await updateImageReferences("<p>Fyi, <a href=\"https://myanimelist.net/animelist/WingsOFreedom\">my anime list</a>.</p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;../../public/nozomi.jpg&#x22;,&#x22;alt&#x22;:&#x22;nozomi&#x22;,&#x22;index&#x22;:0}\"></p>\n<blockquote>\n<p>Feeling like buying me a coffee?</p>\n</blockquote>\n<p>Click <a href=\"https://buymeacoffee.com/cub3yond\">here.</a></p>");
	

				const frontmatter = {"layout":"../layouts/AboutLayout.astro","title":"About","description":"Programmer, researcher, idealist, fiction & anime enjoyer, human."};
				const file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/about.md";
				const url = "/about";
				function rawContent() {
					return "Fyi, [my anime list](https://myanimelist.net/animelist/WingsOFreedom).\n\n![nozomi](../../public/nozomi.jpg)\n\n> Feeling like buying me a coffee?\n\nClick [here.](https://buymeacoffee.com/cub3yond)\n";
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

					return renderTemplate`${renderComponent(result, 'Layout', $$AboutLayout, {
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
