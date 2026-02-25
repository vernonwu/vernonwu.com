import { c as createAstro, a as createComponent, r as renderComponent, m as maybeRenderHead, f as renderSlot, d as addAttribute, e as renderTransition, b as renderTemplate } from './astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { $ as $$Breadcrumbs } from './Breadcrumbs_C6osFKrE.mjs';
/* empty css                          */
/* empty css                         */

const $$Astro = createAstro("https://vernonwu.com/");
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Main;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, { "class": "astro-hsp6otuf" })} ${maybeRenderHead()}<main id="main-content" class="astro-hsp6otuf"> ${"titleTransition" in props ? renderTemplate`<h1 class="astro-hsp6otuf"> ${props.pageTitle[0]} <span class="astro-hsp6otuf"${addAttribute(renderTransition($$result, "hn2qarie", "", props.titleTransition), "data-astro-transition-scope")}> ${props.pageTitle[1]} </span> </h1>` : renderTemplate`<h1 class="astro-hsp6otuf">${props.pageTitle}</h1>`} <div class="page-lede astro-hsp6otuf"> <p class="astro-hsp6otuf">${props.pageDesc}</p> ${renderSlot($$result, $$slots["header-right"])} </div> ${renderSlot($$result, $$slots["default"])} </main> `;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/layouts/Main.astro", "self");

export { $$Main as $ };
