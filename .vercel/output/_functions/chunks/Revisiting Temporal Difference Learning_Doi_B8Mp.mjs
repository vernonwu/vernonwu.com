const id = "Revisiting Temporal Difference Learning.mdx";
						const collection = "blog";
						const slug = "revisiting-td-learning";
						const body = "\nimport PdfEmbed from \"../../components/PdfEmbed.astro\";\n\n## Abstract\n\nThis report revisits Richard S. Sutton's seminal $\\mathrm{TD}(\\lambda)$ methods by replicating the experiments from his 1988 paper on the random walk prediction problem. We evaluate the robustness and applicability of TD learning through a comparative analysis of supervised learning and $\\operatorname{TD}(\\lambda)$ strategies. Our findings confirm the efficacy of $\\operatorname{TD}(\\lambda)$ in learning from temporal differences and adapting to partial information. Adjustments in learning parameters like rate and convergence thresholds highlight their impact on learning outcomes, especially the influence of $\\lambda$ values on prediction accuracy and efficiency. This study supports the foundational principles of TD learning and corroborates its relevance through rigorous empirical validation.\n\n## Full Paper\n\n<PdfEmbed\n  src=\"https://cdn.laplacian.net/gh/vernonwu/picx-images-hosting@master/20260101/sutton1988_report.pdf\"\n  title=\"Revisiting Temporal Difference Learning\"\n/>\n";
						const data = {author:"Vernon Wu",pubDatetime:new Date(1713309000000),title:"Revisiting Temporal Difference Learning",draft:false,tags:["Reinforcement Learning","Temporal Difference","Coursework","Maths"],description:"Replicating and extending experiments from Sutton's original TD learning paper on the random walk prediction problem."};
						const _internal = {
							type: 'content',
							filePath: "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Revisiting Temporal Difference Learning.mdx",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
