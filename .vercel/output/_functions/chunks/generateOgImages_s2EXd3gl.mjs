import { Resvg } from '@resvg/resvg-js';
import './_astro_content_DWtfKiCL.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import satori from 'satori';
import { S as SITE } from './config_BR15hYS5.mjs';

async function loadGoogleFont(font, text) {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(API, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    }
  })).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );
  if (!resource) throw new Error("Failed to download dynamic font");
  const res = await fetch(resource[1]);
  if (!res.ok) {
    throw new Error("Failed to download dynamic font. Status: " + res.status);
  }
  const fonts = await res.arrayBuffer();
  return fonts;
}
async function loadGoogleFonts(text) {
  const fontsConfig = [
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 400,
      style: "normal"
    },
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono:wght@700",
      weight: 700,
      style: "bold"
    }
  ];
  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text);
      return { name, data, weight, style };
    })
  );
  return fonts;
}

const postOgImage = async (post) => {
  return satori(
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%"
              },
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          fontSize: 72,
                          fontWeight: "bold",
                          maxHeight: "84%",
                          overflow: "hidden"
                        },
                        children: post.data.title
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 28
                        },
                        children: [
                          /* @__PURE__ */ jsxs("span", { children: [
                            "by",
                            " ",
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  color: "transparent"
                                },
                                children: '"'
                              }
                            ),
                            /* @__PURE__ */ jsx("span", { style: { overflow: "hidden", fontWeight: "bold" }, children: post.data.author })
                          ] }),
                          /* @__PURE__ */ jsx("span", { style: { overflow: "hidden", fontWeight: "bold" }, children: SITE.title })
                        ]
                      }
                    )
                  ]
                }
              )
            }
          )
        ]
      }
    ),
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      )
    }
  );
};

const siteOgImage = async () => {
  return satori(
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%"
              },
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%"
                  },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90%",
                          maxHeight: "90%",
                          overflow: "hidden",
                          textAlign: "center"
                        },
                        children: [
                          /* @__PURE__ */ jsx("p", { style: { fontSize: 72, fontWeight: "bold" }, children: SITE.title }),
                          /* @__PURE__ */ jsx("p", { style: { fontSize: 28 }, children: SITE.desc })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 28
                        },
                        children: /* @__PURE__ */ jsx("span", { style: { overflow: "hidden", fontWeight: "bold" }, children: new URL(SITE.website).hostname })
                      }
                    )
                  ]
                }
              )
            }
          )
        ]
      }
    ),
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        SITE.title + SITE.desc + SITE.website
      )
    }
  );
};

function svgBufferToPngBuffer(svg) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}
async function generateOgImageForPost(post) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}
async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}

export { generateOgImageForPost as a, generateOgImageForSite as g };
