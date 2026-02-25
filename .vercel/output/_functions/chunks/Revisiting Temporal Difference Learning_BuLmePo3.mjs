import { g as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_Bk0Qe8ay.mjs';
import { $ as $$Image } from './_astro_assets_B6MgDmiP.mjs';
import { $ as $$PdfEmbed } from './PdfEmbed_rNfJU4Y8.mjs';
import 'clsx';

const frontmatter = {
  "title": "Revisiting Temporal Difference Learning",
  "author": "Vernon Wu",
  "pubDatetime": "2024-04-16T23:10:00.000Z",
  "draft": false,
  "slug": "revisiting-td-learning",
  "tags": ["Reinforcement Learning", "Temporal Difference", "Coursework", "Maths"],
  "description": "Replicating and extending experiments from Sutton's original TD learning paper on the random walk prediction problem."
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
    annotation: "annotation",
    h2: "h2",
    math: "math",
    mi: "mi",
    mo: "mo",
    mrow: "mrow",
    p: "p",
    semantics: "semantics",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "abstract",
      children: "Abstract"
    }), "\n", createVNode(_components.p, {
      children: ["This report revisits Richard S. Sutton’s seminal ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "T"
                  }), createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "D"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "λ"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\mathrm{TD}(\\lambda)"
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathrm",
                children: "TD"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "λ"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })
        })]
      }), " methods by replicating the experiments from his 1988 paper on the random walk prediction problem. We evaluate the robustness and applicability of TD learning through a comparative analysis of supervised learning and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "TD"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "λ"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\operatorname{TD}(\\lambda)"
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: createVNode(_components.span, {
                class: "mord mathrm",
                children: "TD"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "λ"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })
        })]
      }), " strategies. Our findings confirm the efficacy of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "TD"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "λ"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\operatorname{TD}(\\lambda)"
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: createVNode(_components.span, {
                class: "mord mathrm",
                children: "TD"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "λ"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })
        })]
      }), " in learning from temporal differences and adapting to partial information. Adjustments in learning parameters like rate and convergence thresholds highlight their impact on learning outcomes, especially the influence of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "λ"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lambda"
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "λ"
            })]
          })
        })]
      }), " values on prediction accuracy and efficiency. This study supports the foundational principles of TD learning and corroborates its relevance through rigorous empirical validation."]
    }), "\n", createVNode(_components.h2, {
      id: "full-paper",
      children: "Full Paper"
    }), "\n", createVNode($$PdfEmbed, {
      src: "https://cdn.laplacian.net/gh/vernonwu/picx-images-hosting@master/20260101/sutton1988_report.pdf",
      title: "Revisiting Temporal Difference Learning"
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

const url = "src/content/blog/Revisiting%20Temporal%20Difference%20Learning.mdx";
const file = "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Revisiting Temporal Difference Learning.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Revisiting Temporal Difference Learning.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
