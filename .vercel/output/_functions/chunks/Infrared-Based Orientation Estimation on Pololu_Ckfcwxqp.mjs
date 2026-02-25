import { g as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_Bk0Qe8ay.mjs';
import { $ as $$Image } from './_astro_assets_B6MgDmiP.mjs';
import { $ as $$PdfEmbed } from './PdfEmbed_rNfJU4Y8.mjs';
import 'clsx';

const frontmatter = {
  "title": "Infrared-Based Orientation Estimation on Pololu",
  "author": "Vernon Wu",
  "pubDatetime": "2025-12-02T22:18:00.000Z",
  "draft": false,
  "slug": "pololu",
  "tags": ["Robotics", "Infrared", "Estimation", "Coursework"],
  "description": "Coursework paper for an infrared-based orientation estimation approach on Pololu."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "abstract",
    "text": "Abstract"
  }, {
    "depth": 2,
    "slug": "full-paper",
    "text": "Full Paper"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "abstract",
      children: "Abstract"
    }), "\n", createVNode(_components.p, {
      children: ["Accurate orientation estimation is essential for mobile robots, yet common sensing methods such as\nencoders and IMUs accumulate drift over time. As a low-cost alternative that emulates the behaviour\nof an ", createVNode(_components.code, {
        children: "optical rotary encoder"
      }), ", this work employs the robot’s built-in ", createVNode(_components.code, {
        children: "infrared (IR) reflectance sensors"
      }), "\ntogether with a custom circular greyscale gradient to infer orientation directly from reflectance\npatterns. Two approaches are evaluated: a mathematical curve-fitting method and a neural network-\nbased model. The curve-fitting approach filters IR data using cascaded ", createVNode(_components.code, {
        children: "Chebyshev Type II"
      }), " IIR biquads\nand fits a sinusoidal model via the ", createVNode(_components.code, {
        children: "Levenberg-Marquardt"
      }), " algorithm, while the ", createVNode(_components.code, {
        children: "neural network"
      }), " uses a\ncompact multilayer perceptron to perform end-to-end angle prediction. Experimental results show\nthat both methods achieve comparable average accuracy, with the neural network offering improved\nperformance under darker conditions, whereas the curve-fitting method remains more efficient in\nmemory and computation."]
    }), "\n", createVNode(_components.h2, {
      id: "full-paper",
      children: "Full Paper"
    }), "\n", createVNode($$PdfEmbed, {
      src: "https://cdn.laplacian.net/gh/vernonwu/picx-images-hosting@master/20260101/RSS-Paper.pdf",
      title: "Infrared-Based Orientation Estimation on Pololu"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/Infrared-Based%20Orientation%20Estimation%20on%20Pololu.mdx";
const file = "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Infrared-Based Orientation Estimation on Pololu.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Infrared-Based Orientation Estimation on Pololu.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
