import { jsxs, jsx } from 'react/jsx-runtime';
import { s as slugifyStr } from './slugify_CvQuO4Tx.mjs';
import { D as Datetime } from './Datetime_BA58FXGf.mjs';

function Card({ href, frontmatter, secHeading = true }) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;
  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline"
  };
  return /* @__PURE__ */ jsxs("li", { className: "my-6", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: "inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0",
        children: secHeading ? /* @__PURE__ */ jsx("h2", { ...headerProps, children: title }) : /* @__PURE__ */ jsx("h3", { ...headerProps, children: title })
      }
    ),
    /* @__PURE__ */ jsx(Datetime, { pubDatetime, modDatetime }),
    /* @__PURE__ */ jsx("p", { children: description })
  ] });
}

export { Card as C };
