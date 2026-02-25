const id = "Infrared-Based Orientation Estimation on Pololu.mdx";
						const collection = "blog";
						const slug = "pololu";
						const body = "\nimport PdfEmbed from \"../../components/PdfEmbed.astro\";\n\n## Abstract\n\nAccurate orientation estimation is essential for mobile robots, yet common sensing methods such as\nencoders and IMUs accumulate drift over time. As a low-cost alternative that emulates the behaviour\nof an `optical rotary encoder`, this work employs the robot’s built-in `infrared (IR) reflectance sensors`\ntogether with a custom circular greyscale gradient to infer orientation directly from reflectance\npatterns. Two approaches are evaluated: a mathematical curve-fitting method and a neural network-\nbased model. The curve-fitting approach filters IR data using cascaded `Chebyshev Type II` IIR biquads\nand fits a sinusoidal model via the `Levenberg-Marquardt` algorithm, while the `neural network` uses a\ncompact multilayer perceptron to perform end-to-end angle prediction. Experimental results show\nthat both methods achieve comparable average accuracy, with the neural network offering improved\nperformance under darker conditions, whereas the curve-fitting method remains more efficient in\nmemory and computation.\n\n## Full Paper\n\n<PdfEmbed\n  src=\"https://cdn.laplacian.net/gh/vernonwu/picx-images-hosting@master/20260101/RSS-Paper.pdf\"\n  title=\"Infrared-Based Orientation Estimation on Pololu\"\n/>\n";
						const data = {author:"Vernon Wu",pubDatetime:new Date(1764713880000),title:"Infrared-Based Orientation Estimation on Pololu",draft:false,tags:["Robotics","Infrared","Estimation","Coursework"],description:"Coursework paper for an infrared-based orientation estimation approach on Pololu."};
						const _internal = {
							type: 'content',
							filePath: "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Infrared-Based Orientation Estimation on Pololu.mdx",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
