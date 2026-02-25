import { a as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_Bk0Qe8ay.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_DWtfKiCL.mjs';
import { S as SITE } from '../chunks/config_BR15hYS5.mjs';
import { a as $$Layout, b as $$Header, c as $$Footer } from '../chunks/Footer_BKvCJzbM.mjs';
import { $ as $$Main } from '../chunks/Main_BPWwIqUn.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import Fuse from 'fuse.js';
import { useRef, useState, useMemo, useEffect } from 'react';
import { C as Card } from '../chunks/Card_Cn6nXclz.mjs';
import { g as getSortedPosts } from '../chunks/getSortedPosts_DkJw1amD.mjs';
export { renderers } from '../renderers.mjs';

function SearchBar({ searchList }) {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState(
    null
  );
  const handleChange = (e) => {
    setInputVal(e.currentTarget.value);
  };
  const fuse = useMemo(
    () => new Fuse(searchList, {
      keys: ["title", "description"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.5
    }),
    [searchList]
  );
  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);
    setTimeout(function() {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = searchStr?.length || 0;
    }, 50);
  }, []);
  useEffect(() => {
    const inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("label", { className: "relative block", children: [
      /* @__PURE__ */ jsxs("span", { className: "absolute inset-y-0 left-0 flex items-center pl-2 opacity-75", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" }) }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "block w-full rounded border border-skin-fill/40 bg-skin-fill py-3 pl-10 pr-3 placeholder:italic focus:border-skin-accent focus:outline-none",
          placeholder: "Search for anything...",
          type: "text",
          name: "search",
          value: inputVal,
          onChange: handleChange,
          autoComplete: "off",
          ref: inputRef
        }
      )
    ] }),
    inputVal.length > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      "Found ",
      searchResults?.length,
      searchResults?.length && searchResults?.length === 1 ? " result" : " results",
      " ",
      "for '",
      inputVal,
      "'"
    ] }),
    /* @__PURE__ */ jsx("ul", { children: searchResults && searchResults.map(({ item, refIndex }) => /* @__PURE__ */ jsx(
      Card,
      {
        href: `/posts/${item.slug}/`,
        frontmatter: item.data
      },
      `${refIndex}-${item.slug}`
    )) })
  ] });
}

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(posts);
  const searchList = sortedPosts.map(({ data, slug }) => ({
    title: data.title,
    description: data.description,
    data,
    slug
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Search | ${SITE.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "search" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Search", "pageDesc": "Search any article ..." }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "SearchBar", SearchBar, { "client:load": true, "searchList": searchList, "client:component-hydration": "load", "client:component-path": "@components/Search", "client:component-export": "default" })} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/stevejobs/study/projects/vernonwu.com/src/pages/search.astro", void 0);

const $$file = "/Users/stevejobs/study/projects/vernonwu.com/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
