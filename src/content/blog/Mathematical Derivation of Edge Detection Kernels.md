---
title: Where Edge-Detection Kernels Came From
author: Vernon Wu
pubDatetime: 2025-12-25T22:22:00Z
slug: edge-detection-kernels
featured: false
draft: false
ogImage: /assets/nozomi.jpg
tags:
  - Computer Vision
  - Machine Learning
  - Maths
description: Derivation of classic edge-detection kernels including Sobel, Scharr, and Laplacian of Gaussian.
---

## Edges are derivatives, and derivatives need smoothing

Every classic edge kernel in this post is built from the same two parts: a finite-difference derivative and a binomial (discrete Gaussian) smoother. Once you see that, every integer in the familiar kernels can be derived rather than memorized.

An edge is where image intensity changes quickly. First-derivative detectors look for peaks in the gradient magnitude. Second-derivative detectors look for the zero-crossings between a positive and a negative response.

The difficulty is noise. In the frequency domain, differentiation multiplies each component of the signal by its frequency:

$$
\mathcal{F}\left[\frac{df}{dx}\right](\omega) = j\omega\,F(\omega), \qquad \mathcal{F}\left[\frac{d^2 f}{dx^2}\right](\omega) = -\omega^2\,F(\omega)
$$

Natural images concentrate their energy at low frequencies, while sensor noise is roughly white, with equal power at every frequency. A first derivative therefore amplifies noise far more than image content, and a second derivative does so quadratically.

The same problem shows up in the spatial domain. Adding a tiny ripple $\varepsilon \sin(\omega x)$ changes a signal by at most $\varepsilon$, but changes its derivative by up to $\varepsilon\,\omega$, which grows without bound as $\omega$ increases. Differentiation is ill-posed in Hadamard's sense: small input errors do not guarantee small output errors [2].

The standard fix is to smooth before differentiating. Smoothing restores stability but blurs, and can displace, the edges. Every kernel below is a particular compromise between noise suppression and localization, the trade-off Canny later formalized [3].

### Conventions used throughout

- **Correlation, not convolution.** Kernels are written as most image libraries and CNNs apply them: slide, multiply, sum, with no flip. Under true convolution, antisymmetric kernels such as $[-1, 0, 1]$ change sign.
- **Axes.** $x$ increases to the right and $y$ increases downward, following an image's row index.
- **Operators.** $\ast$ is convolution and $\otimes$ is the outer product. Convolving a column vector with a row vector gives exactly their outer product, which is how every 2D kernel here is built from 1D pieces.
- **Scaling.** Integer kernels are shown unnormalized, with the normalizing factor stated alongside.
- **Noise gain.** If the input carries white noise of variance $\sigma_n^2$, a kernel with coefficients $h_k$ outputs noise of variance $\sigma_n^2 \sum_k h_k^2$. This one number is used to compare kernels fairly.

## Binomial kernels: smoothing by repeated averaging

Averaging neighbouring pixels over and over produces the rows of Pascal's triangle, and those rows converge to a Gaussian whose variance is $n/4$.

The simplest smoother is the two-tap average $[1, 1]/2$. On its own it is a weak filter: it is not centred (it shifts the signal by half a pixel) and it rolls off high frequencies only gently. Convolving it with itself fixes both problems. With $n$ copies of the two-tap kernel (that is, $n - 1$ convolutions):

$$
B_n = \underbrace{[1,\,1] \ast [1,\,1] \ast \cdots \ast [1,\,1]}_{n\ \text{factors}} = \left[\binom{n}{0},\ \binom{n}{1},\ \ldots,\ \binom{n}{n}\right], \qquad \sum_k \binom{n}{k} = 2^n
$$

So $B_1 = [1, 1]$, $B_2 = [1, 2, 1]$, $B_3 = [1, 3, 3, 1]$ and $B_4 = [1, 4, 6, 4, 1]$, each normalized by $2^n$. Even $n$ gives an odd-length kernel with a well-defined centre pixel, which is why $B_2$ and $B_4$ are the ones used in practice.

### Why the limit is a Gaussian

The normalized kernel $B_n / 2^n$ is exactly the probability mass function of a $\mathrm{Binomial}(n, \tfrac{1}{2})$ variable: the number of heads in $n$ fair coin flips. That distribution has mean $n/2$ and variance $n/4$. By the de Moivre–Laplace theorem (the special case of the central limit theorem for coin flips), it approaches a normal distribution as $n$ grows.

Centred on its middle tap, $B_n$ therefore approximates a sampled Gaussian with $\sigma^2 = n/4$. Two useful anchors: $[1, 2, 1]/4$ behaves like $\sigma \approx 0.71$ px, and $[1, 4, 6, 4, 1]/16$ like $\sigma = 1$ px.

The frequency domain shows the same result more directly. The magnitude response of the centred, normalized kernel is

$$
\left|\hat{B}_n(\omega)\right| = \cos^n\!\left(\frac{\omega}{2}\right) \approx \exp\!\left(-\frac{n\,\omega^2}{8}\right) = \exp\!\left(-\frac{\sigma^2\omega^2}{2}\right), \qquad \sigma^2 = \frac{n}{4}
$$

where the approximation uses $\ln\cos(\omega/2) \approx -\omega^2/8$. The right-hand side is exactly the Fourier transform of a Gaussian. Note also that $\cos^n(\omega/2)$ is exactly zero at the Nyquist frequency $\omega = \pi$: every binomial kernel completely removes the one-pixel checkerboard pattern, which is the most noise-like signal an image can contain.

### Useful properties

- **Scales add like Gaussians.** $B_m \ast B_n = B_{m+n}$, so variances add, just as blurring with Gaussians of $\sigma_1$ and $\sigma_2$ equals one blur with $\sigma = \sqrt{\sigma_1^2 + \sigma_2^2}$. Blurring twice with $[1, 2, 1]$ is the same as blurring once with $[1, 4, 6, 4, 1]$.
- **Integer arithmetic.** All weights are integers and the normalizer is a power of two, so the whole filter reduces to adds and a bit shift.
- **An approximation, not the exact discrete Gaussian.** Lindeberg showed that the discrete kernel with a true scale-space structure is $T(k; t) = e^{-t} I_k(t)$, where $I_k$ is the modified Bessel function and $t = \sigma^2$ [4]. Binomial kernels track it closely for all but the smallest scales, which is why they remain the practical choice.

## The Gaussian kernel: separable, isotropic, and usually truncated

The familiar $3 \times 3$ "Gaussian" kernel is the outer product of $[1, 2, 1]$ with itself, and it corresponds to $\sigma \approx 0.71$ px, not $\sigma = 1$.

### Separability

The 2D Gaussian factors into a product of 1D Gaussians:

$$
G_\sigma(x, y) = \frac{1}{2\pi\sigma^2}\, e^{-\frac{x^2 + y^2}{2\sigma^2}} = g_\sigma(x)\, g_\sigma(y), \qquad g_\sigma(t) = \frac{1}{\sqrt{2\pi}\,\sigma}\, e^{-\frac{t^2}{2\sigma^2}}
$$

As a matrix, a separable kernel has rank $1$. A $K \times K$ blur can therefore run as a vertical $K \times 1$ pass followed by a horizontal $1 \times K$ pass, cutting the per-pixel cost from $K^2$ to $2K$ multiply-adds ($49 \to 14$ for a $7 \times 7$ kernel).

The Gaussian is also the only rotationally symmetric kernel that is separable, a result that goes back to Maxwell's derivation of molecular velocities. That combination, the same response in every direction and a cheap implementation, is a large part of why the Gaussian is the default smoother.

In deep learning, the analogue of this trick is the _spatially_ separable convolution, such as Inception-v3's replacement of an $n \times n$ layer by a $1 \times n$ layer followed by an $n \times 1$ layer [5]. It is not the _depthwise_ separable convolution of Xception and MobileNet [6, 7], which factors a layer differently: a per-channel spatial filter followed by a $1 \times 1$ convolution that mixes channels. Learned kernels are rarely rank $1$, so either factorization is a modelling choice rather than an exact identity.

### The $3 \times 3$ kernel from binomials

The outer product of $B_2$ with itself gives the standard integer kernel:

$$
\frac{1}{16}\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \begin{bmatrix} 1 & 2 & 1 \end{bmatrix} = \frac{1}{16}\begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{bmatrix}
$$

From the previous section, each axis has variance $1/2$, so this kernel approximates a Gaussian with $\sigma \approx 0.71$ px.

### The $3 \times 3$ kernel from sampling

The alternative is to evaluate the continuous Gaussian at integer offsets and renormalize. The $1/(2\pi\sigma^2)$ prefactor cancels in the normalization, so only the exponential matters. For $\sigma = 1$ on a $3 \times 3$ grid:

$$
G = \frac{1}{Z}\begin{bmatrix} e^{-1} & e^{-1/2} & e^{-1} \\ e^{-1/2} & 1 & e^{-1/2} \\ e^{-1} & e^{-1/2} & e^{-1} \end{bmatrix} = \begin{bmatrix} 0.075 & 0.124 & 0.075 \\ 0.124 & 0.204 & 0.124 \\ 0.075 & 0.124 & 0.075 \end{bmatrix}, \qquad Z = 1 + 4e^{-1/2} + 4e^{-1} \approx 4.898
$$

Rounded to two decimals, the corners are $0.08$, not $0.07$. The $0.07$ version sums to $0.96$ rather than $1$ and darkens the image by $4\%$.

### Truncation changes $\sigma$

A $3 \times 3$ window cuts a $\sigma = 1$ Gaussian off at $\pm 1\sigma$, which discards more than half of its 2D mass (only $0.683^2 \approx 47\%$ lies inside the square). After renormalization, the 1D profile is $[0.274, 0.452, 0.274]$, whose variance is $0.548$, so the effective $\sigma$ is about $0.74$ px rather than $1$.

That is almost exactly the binomial $[0.25, 0.5, 0.25]$ with $\sigma \approx 0.71$. The two constructions converge on essentially the same $3 \times 3$ kernel, and neither is really $\sigma = 1$. The binomial version has one advantage: its response at the Nyquist frequency is exactly $0$, while the truncated sample leaks a small, sign-flipped $-0.10$.

The practical rule is to choose the support from $\sigma$, not the other way round. A radius of $\lceil 3\sigma \rceil$ pixels keeps over $99\%$ of the 1D mass, so $\sigma = 1$ calls for a $7 \times 7$ kernel.

## First derivatives: Sobel is a tiny derivative of a Gaussian

Sobel's horizontal kernel is a central difference along $x$ times $[1, 2, 1]$ smoothing along $y$. Because the central difference itself hides a $[1, 1]$ average, the whole operator is a discrete derivative of a binomial-smoothed image.

### The central difference

Expand $f$ around $x$ with pixel spacing $h$, keeping one more term than is usually shown:

$$
\begin{aligned}
f(x+h) &= f(x) + h\,f'(x) + \tfrac{h^2}{2}\,f''(x) + \tfrac{h^3}{6}\,f'''(x) + O(h^4) \\
f(x-h) &= f(x) - h\,f'(x) + \tfrac{h^2}{2}\,f''(x) - \tfrac{h^3}{6}\,f'''(x) + O(h^4)
\end{aligned}
$$

Subtracting cancels every even-order term. Dividing by $2h$ then gives

$$
\frac{f(x+h) - f(x-h)}{2h} = f'(x) + \frac{h^2}{6}\,f'''(x) + O(h^4)
$$

The estimate is second-order accurate: its error shrinks as $h^2$. With $h = 1$ this is the kernel $[-1, 0, 1]/2$. The forward difference $[-1, 1]$, by contrast, is only first-order accurate and estimates the derivative half a pixel away from where it is stored.

### The hidden smoothing

The central difference factors into a forward difference and a two-tap average:

$$
[-1,\ 0,\ 1] = [-1,\ 1] \ast [1,\ 1]
$$

So "central difference" already means "average, then differentiate." Its frequency response shows the consequence. The ideal derivative has magnitude $\omega$, which keeps growing, but the central difference has magnitude $\sin\omega$. It matches $\omega$ at low frequencies and falls back to zero at Nyquist, so it is a band-pass filter, not an unbounded high-pass. Its noise gain is $0.5$, versus $2$ for the forward difference.

### Building Sobel

Sobel and Feldman add $[1, 2, 1]$ smoothing across the derivative direction [8]:

$$
S_x = \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \otimes \begin{bmatrix} -1 & 0 & 1 \end{bmatrix} = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \qquad S_y = S_x^{\top} = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}
$$

The correct normalizer is $1/8$: a factor $1/4$ for $[1, 2, 1]$ and $1/2$ for the central difference. With it, $S_x/8$ applied to a ramp $f = ax + by$ returns exactly $a$. Libraries often skip this factor, which only matters when gradient values are compared across operators or thresholds are fixed in physical units.

Using the factorization above, $S_x$ can be rewritten as a smoothing followed by a plain forward difference:

$$
S_x = \left( \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \otimes [1,\ 1] \right) \ast [-1,\ 1]
$$

That is the discrete counterpart of the identity $\partial (G \ast f)/\partial x = (\partial G/\partial x) \ast f$: Sobel is a derivative-of-Gaussian filter with $\sigma \approx 0.71$ px across the edge. The smoothing pays for itself. The normalized Sobel kernel has a noise gain of $12/64 \approx 0.19$, compared with $0.5$ for the bare central difference, while returning the same value on any ramp.

### Magnitude and orientation

With $G_x$ and $G_y$ the normalized Sobel responses:

$$
\|\nabla f\| \approx \sqrt{G_x^2 + G_y^2}, \qquad \theta = \operatorname{atan2}(G_y,\ G_x)
$$

Use $\operatorname{atan2}$ rather than $\arctan(G_y/G_x)$. Plain $\arctan$ folds the angle into $(-90^\circ, 90^\circ)$ and cannot tell a dark-to-light transition from a light-to-dark one. The edge itself runs perpendicular to $\theta$. The cheap approximation $\lvert G_x \rvert + \lvert G_y \rvert$ overestimates the magnitude by up to $\sqrt{2} \approx 1.41$ at $45^\circ$.

### Isotropy, and the Scharr fix

Sobel's orientation estimate is biased for fine structure, because the product of $[1, 2, 1]$ and $\sin\omega$ is not rotationally symmetric at high frequencies. Scharr optimized the smoothing weights for isotropy and obtained $[3, 10, 3]$ (overall normalizer $1/32$) [9].

The difference is measurable. For a sinusoidal pattern with a $4$-pixel wavelength, the worst-case angle error is $7.2^\circ$ for the bare central difference, $3.2^\circ$ for Sobel and $0.3^\circ$ for Scharr. At an $8$-pixel wavelength the errors are $1.5^\circ$, $0.75^\circ$ and $0.16^\circ$. The price is slightly less smoothing: Scharr's noise gain is $0.23$ against Sobel's $0.19$.

### Real limitations

- **One small, fixed scale.** At $\sigma \approx 0.7$ px, Sobel responds to fine texture and noise as strongly as to object boundaries. Larger structures need larger derivative-of-Gaussian kernels.
- **Thick, unthresholded output.** Gradient magnitude forms a ridge several pixels wide. Canny's pipeline adds non-maximum suppression along $\theta$ and hysteresis thresholding to turn it into thin, connected edges [3].
- **Residual anisotropy.** As above, fixable with Scharr-type weights.

## Second derivatives: the Laplacian

The $5$-point Laplacian is the sum of two 1D second differences. Unlike the central difference, it contains no hidden smoothing, and its noise gain is $20$.

### The stencil

Adding the two Taylor expansions from the previous section, instead of subtracting them, cancels the odd-order terms:

$$
f(x+h) - 2f(x) + f(x-h) = h^2 f''(x) + \frac{h^4}{12}\, f^{(4)}(x) + O(h^6)
$$

So $[1, -2, 1]/h^2$ estimates $f''$ with an $O(h^2)$ error. Applying it along $x$ and along $y$ and summing gives the Laplacian:

$$
\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} \approx f(x{+}1, y) + f(x{-}1, y) + f(x, y{+}1) + f(x, y{-}1) - 4 f(x, y)
$$

$$
L = \underbrace{\begin{bmatrix} 0 & 0 & 0 \\ 1 & -2 & 1 \\ 0 & 0 & 0 \end{bmatrix}}_{x\text{-direction}} + \underbrace{\begin{bmatrix} 0 & 1 & 0 \\ 0 & -2 & 0 \\ 0 & 1 & 0 \end{bmatrix}}_{y\text{-direction}} = \begin{bmatrix} 0 & 1 & 0 \\ 1 & -4 & 1 \\ 0 & 1 & 0 \end{bmatrix}
$$

The $5$-point stencil is rotation-invariant only to leading order. Two common alternatives mix in the diagonals, the $8$-neighbour kernel and the $9$-point kernel:

$$
L_8 = \frac{1}{3}\begin{bmatrix} 1 & 1 & 1 \\ 1 & -8 & 1 \\ 1 & 1 & 1 \end{bmatrix}, \qquad L_9 = \frac{1}{6}\begin{bmatrix} 1 & 4 & 1 \\ 4 & -20 & 4 \\ 1 & 4 & 1 \end{bmatrix}
$$

The leading error term of $L_9$, $(h^2/12)\,\nabla^4 f$, is itself isotropic.

### Why it is so noisy

The second difference factors as $[1, -2, 1] = [1, -1] \ast [1, -1]$: two forward differences and no average. Its response $4\sin^2(\omega/2)$ keeps rising all the way to the Nyquist frequency, where it reaches $4$. In 2D, the kernel's largest gain, $8$, is for the one-pixel checkerboard, which is exactly what pixel noise looks like.

![Gain of 1D second-derivative kernels versus frequency](https://files.seeusercontent.com/2026/10/01/o1Bt/second_derivative_response.png)

_Figure: Smoothing turns the Laplacian from a high-pass into a band-pass filter. Gain versus frequency $\omega \in [0, \pi]$ for the ideal operator $\omega^2$, the raw second difference $[1, -2, 1]$, and the binomial-smoothed $[1, 0, -2, 0, 1]/4$._

The ideal second derivative grows without bound, and $[1, -2, 1]$ follows it right up to Nyquist. Smoothing with $[1, 2, 1]$ first gives $[1, 0, -2, 0, 1]/4$, whose response $\sin^2\omega$ matches the ideal at low frequencies and returns to zero at Nyquist. That curve is the entire idea behind the Laplacian of Gaussian, shown here in 1D.

In numbers, the $5$-point kernel's noise gain is $1 + 1 + 1 + 1 + 16 = 20$, so output noise has about $4.5$ times the standard deviation of the input noise. Normalized Sobel, at $0.19$, reduces it to $0.43$ times. Both kernels are scaled to return exact derivatives on low-order polynomials, so the gap is not an artefact of scaling.

### What zero-crossings do and do not mean

In 1D, $f''$ crosses zero wherever $\lvert f' \rvert$ has an extremum. That includes the maxima (true edges) but also the minima between two edges, which produce phantom edges. Practical detectors keep only zero-crossings where the gradient, or the slope across the crossing, is large enough.

In 2D, the Laplacian mixes two directions. Writing $n$ for the gradient direction:

$$
\nabla^2 f = f_{nn} + \kappa\,\|\nabla f\|, \qquad \kappa = \nabla \cdot \frac{\nabla f}{\|\nabla f\|}
$$

Here $f_{nn}$ is the second derivative across the edge and $\kappa$ is the curvature of the iso-intensity contour. On a straight edge $\kappa = 0$, and the Laplacian's zero-crossing sits exactly at the edge centre. On curved edges and at corners, the second term shifts it, which is why LoG edges round off corners. Haralick and Canny used the directional derivative $f_{nn}$ instead [10, 3], and Torre and Poggio analysed the resulting localization differences [2].

## The Laplacian of Gaussian

LoG smooths with a Gaussian and takes the Laplacian in a single kernel. The widely copied $5 \times 5$ kernel with $16$ at its centre is not a sample of the LoG formula; the kernel obtained by combining $[1, 2, 1]$ with the $5$-point Laplacian is the better-founded choice.

### Why a Gaussian

Marr and Hildreth proposed zero-crossings of the LoG-filtered image as a model of early edge detection [1]. They chose the Gaussian because it is jointly localized in space and frequency: it minimizes the product of spatial and spectral spread, so it removes high frequencies without smearing the image more than necessary.

Two later results made the choice rigorous. Torre and Poggio framed numerical differentiation as an ill-posed problem and showed that filtering before differentiating is a regularization that makes it well-posed [2]. Separately, Yuille and Poggio [11] and, for 1D signals, Babaud et al. [12] proved that the Gaussian is the only filter that never creates new zero-crossings as its scale increases. That property is what makes it safe to follow edges from coarse to fine scales, the core idea of Witkin's scale space [13].

### Continuous derivation

Differentiation and convolution are both linear and shift-invariant, so they commute:

$$
\nabla^2 \left( G_\sigma \ast f \right) = \left( \nabla^2 G_\sigma \right) \ast f
$$

The Laplacian can therefore be applied to the Gaussian once, analytically, and the result used as a single precomputed kernel. Differentiating twice in $x$:

$$
\frac{\partial G_\sigma}{\partial x} = -\frac{x}{\sigma^2}\, G_\sigma, \qquad \frac{\partial^2 G_\sigma}{\partial x^2} = \left( \frac{x^2}{\sigma^4} - \frac{1}{\sigma^2} \right) G_\sigma
$$

The $y$ derivative has the same form. Summing the two:

$$
\nabla^2 G_\sigma(x, y) = \frac{1}{\pi \sigma^4} \left( \frac{x^2 + y^2}{2\sigma^2} - 1 \right) e^{-\frac{x^2 + y^2}{2\sigma^2}}
$$

Four properties matter in practice:

- **Sign.** The formula is negative at the centre. The "Mexican hat" is its negative, $-\nabla^2 G$, with a positive centre, and most published kernels (including both $5 \times 5$ kernels below) use that sign. Either sign finds the same zero-crossings, as long as it is used consistently.
- **Width.** The kernel crosses zero at radius $r = \sqrt{2}\,\sigma$. That is the size of the positive lobe of the hat.
- **Zero integral.** $\nabla^2 G$ integrates to zero, so a correct kernel ignores constant brightness. Truncated samples lose this property.
- **Two separable terms.** $\nabla^2 G = g''(x)\,g(y) + g(x)\,g''(y)$. A $K \times K$ LoG can therefore run as two separable filters, about $4K$ multiply-adds per pixel instead of $K^2$.

### What sampling actually gives

Sampling $-\nabla^2 G$ at $\sigma = 1$ on a $5 \times 5$ grid and scaling the centre to $8$ gives:

$$
\begin{bmatrix} -0.44 & -0.99 & -1.08 & -0.99 & -0.44 \\ -0.99 & 0 & 2.43 & 0 & -0.99 \\ -1.08 & 2.43 & 8 & 2.43 & -1.08 \\ -0.99 & 0 & 2.43 & 0 & -0.99 \\ -0.44 & -0.99 & -1.08 & -0.99 & -0.44 \end{bmatrix}
$$

The diagonal neighbours are exactly $0$ because they sit at $r = \sqrt{2}$, the zero crossing. The entries sum to $+3.7$ rather than $0$, because the window cuts off the negative tail. On a flat grey region this kernel would still respond.

The residual is $21\%$ of the kernel's positive weight at $5 \times 5$, $1.2\%$ at $7 \times 7$ and under $0.1\%$ at $9 \times 9$. So either use a window of at least $7 \times 7$ for $\sigma = 1$, or subtract the kernel's mean from every entry to force a zero sum.

### The popular $16$-centre kernel

Many tutorials present this integer kernel as a sampled LoG:

$$
\begin{bmatrix} 0 & 0 & -1 & 0 & 0 \\ 0 & -1 & -2 & -1 & 0 \\ -1 & -2 & 16 & -2 & -1 \\ 0 & -1 & -2 & -1 & 0 \\ 0 & 0 & -1 & 0 & 0 \end{bmatrix}
$$

No value of $\sigma$ reproduces it by sampling. Its inner $3 \times 3$ block matches a sampled $-\nabla^2 G$ at $\sigma \approx 0.5$, which, scaled to a centre of $16$, gives $-2.2$ at the $4$-neighbours and $-0.9$ at the diagonals. At that $\sigma$, though, the taps two pixels out should be about $-0.04$. The kernel's $-1$ values there are what make it sum to zero.

It is best read as a hand-tuned integer approximation at a very small scale. Its positive lobe is a single pixel (zero crossing at $r \approx 0.7$ px), so it smooths only a little more than the plain Laplacian.

![log_kernel.png](https://s2.loli.net/2025/12/28/xCTw3ot4IJeRvAY.png)

### The discrete derivation

Building the kernel from discrete parts avoids both problems. With $D^2 = [1, -2, 1]$ and $B = [1, 2, 1]$:

$$
\begin{aligned}
\text{LoG}_{2\text{D}} &= \left( D_x^2 + D_y^2 \right) \ast \left( B_x \ast B_y \right) \\
&= \underbrace{\left( D_x^2 \ast B_x \right) \ast B_y}_{\text{Term A}} + \underbrace{\left( D_y^2 \ast B_y \right) \ast B_x}_{\text{Term B}}
\end{aligned}
$$

In words: this is the $5$-point Laplacian applied to the $3 \times 3$ binomial blur. The 1D factor is:

$$
H = D^2 \ast B = [1,\ -2,\ 1] \ast [1,\ 2,\ 1] = [1,\ 0,\ -2,\ 0,\ 1] = [-1,\ 0,\ 1] \ast [-1,\ 0,\ 1]
$$

The last equality is a neat check on the whole framework: a binomial-smoothed second difference is exactly the central difference applied twice. That is why its response in the figure above is $\sin^2\omega$, the square of the central difference's $\sin\omega$.

Taking the outer products:

$$
\text{Term A} = \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \otimes \begin{bmatrix} 1 & 0 & -2 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & -2 & 0 & 1 \\ 2 & 0 & -4 & 0 & 2 \\ 1 & 0 & -2 & 0 & 1 \end{bmatrix}, \qquad \text{Term B} = \text{Term A}^{\top}
$$

Centre both on a $5 \times 5$ grid (Term A gets a zero row above and below, Term B a zero column left and right) and add:

$$
\text{Term A} + \text{Term B} = \begin{bmatrix} 0 & 1 & 2 & 1 & 0 \\ 1 & 0 & -2 & 0 & 1 \\ 2 & -2 & -8 & -2 & 2 \\ 1 & 0 & -2 & 0 & 1 \\ 0 & 1 & 2 & 1 & 0 \end{bmatrix}
$$

This estimates $\nabla^2 (G \ast f)$ and, like the continuous formula, is negative at the centre. Negating it gives the Mexican-hat form. The operation is a sign flip, not an absolute value; taking absolute values would make every entry non-negative and destroy the zero sum.

$$
\text{LoG}_{\text{binomial}} = -\left( \text{Term A} + \text{Term B} \right) = \begin{bmatrix} 0 & -1 & -2 & -1 & 0 \\ -1 & 0 & 2 & 0 & -1 \\ -2 & 2 & 8 & 2 & -2 \\ -1 & 0 & 2 & 0 & -1 \\ 0 & -1 & -2 & -1 & 0 \end{bmatrix}, \qquad \text{normalizer } \tfrac{1}{16}
$$

### Comparing the two $5 \times 5$ kernels

The binomial kernel is close to the $\sigma = 1$ sample above: the same zero diagonals, $+2$ against $+2.43$ at the $4$-neighbours, and $-1$ against $-0.99$ at the knight's-move positions. It moves the truncated corner weight onto the axis taps ($-2$ against $-1.08$), and as a result sums to exactly zero.

Its low-frequency behaviour matches a LoG with $\sigma \approx 0.8$, while a least-squares fit to sampled shapes lands near $\sigma \approx 1$; at scales this small, the $\sigma$ of a kernel is only approximate. The $16$-centre kernel, by the same measures, sits at $\sigma \approx 0.55$–$0.6$.

The gap between them is therefore not a minor quantization effect. The kernels represent different scales, and only one follows from a derivation. Scaled so that each returns $-\nabla^2 f$ exactly on quadratic images ($1/16$ for the binomial kernel, $1/8$ for the $16$-centre one), their noise gains are $0.41$ and $4.4$. The plain $5$-point Laplacian is at $20$.

## Difference of Gaussians: LoG for the price of two blurs

Because the Gaussian solves the heat equation, subtracting two slightly different blurs approximates a scaled LoG.

Differentiating the Gaussian with respect to its own scale gives the diffusion identity:

$$
\frac{\partial G_\sigma}{\partial \sigma} = \sigma\, \nabla^2 G_\sigma \quad\Longrightarrow\quad G_{k\sigma} - G_\sigma \approx (k - 1)\, \sigma^2\, \nabla^2 G_\sigma
$$

The right-hand side is a finite difference in $\sigma$. Three consequences follow:

- **Cheap LoG.** A pyramid of Gaussian blurs is often computed anyway, and subtracting neighbouring levels yields LoG responses almost for free. Marr and Hildreth found a width ratio of about $k = 1.6$ to be a good balance between approximation quality and sensitivity [1].
- **Built-in scale normalization.** The DoG approximates $\sigma^2 \nabla^2 G$, not $\nabla^2 G$. Lindeberg showed that this $\sigma^2$ factor is exactly what makes responses comparable across scales, so the strongest response picks out a structure's characteristic size [14].
- **Blob detection.** Lowe's SIFT detector locates keypoints as extrema of the DoG over both space and scale, using $k = 2^{1/s}$ with $s$ levels per octave [15].

## The whole family at a glance

Nearly every kernel in this post is a difference operator convolved with a binomial smoother; the kernels differ only in how much smoothing they carry and in which direction.

| Kernel                          | Built from                      | Normalizer | Implied $\sigma$ (px)       | Noise gain $\sum h^2$ |
| ------------------------------- | ------------------------------- | ---------- | --------------------------- | --------------------- |
| $[1, 2, 1]$                     | $[1, 1] \ast [1, 1]$            | $1/4$      | $0.71$                      | $0.375$               |
| $3 \times 3$ Gaussian           | $B \otimes B$                   | $1/16$     | $0.71$                      | $0.14$                |
| Central difference $[-1, 0, 1]$ | $[-1, 1] \ast [1, 1]$           | $1/2$      | $0.58$ along                | $0.5$                 |
| Sobel $S_x$                     | $B \otimes [-1, 0, 1]$          | $1/8$      | $0.71$ across, $0.58$ along | $0.19$                |
| Scharr                          | $[3, 10, 3] \otimes [-1, 0, 1]$ | $1/32$     | $0.61$ across, $0.58$ along | $0.23$                |
| $5$-point Laplacian             | $D_x^2 + D_y^2$                 | $1$        | $0.41$ per axis             | $20$                  |
| $16$-centre $5 \times 5$ LoG    | hand-tuned integers             | $1/8$      | $\approx 0.55$–$0.6$        | $4.4$                 |
| Binomial $5 \times 5$ LoG       | $-L \ast (B \otimes B)$         | $1/16$     | $\approx 0.8$               | $0.41$                |

$B = [1, 2, 1]$ and $D^2 = [1, -2, 1]$. "Implied $\sigma$" matches each kernel's low-frequency response to that of a Gaussian or Gaussian derivative, which shows that even the "unsmoothed" differences carry a small implicit scale. Noise gains are for the normalized kernels: smoothers sum to $1$, and derivative kernels return exact derivatives on low-order polynomials.

The same recipe resurfaces in learned models: the first-layer filters of trained CNNs tend to look like oriented derivative-of-Gaussian and Gabor filters [16], which is these kernels rediscovered from data.

## References

1. Marr, D., & Hildreth, E. (1980). Theory of edge detection. _Proceedings of the Royal Society of London, Series B_, 207(1167), 187–217.
2. Torre, V., & Poggio, T. A. (1986). On edge detection. _IEEE Transactions on Pattern Analysis and Machine Intelligence_, 8(2), 147–163.
3. Canny, J. (1986). A computational approach to edge detection. _IEEE TPAMI_, 8(6), 679–698.
4. Lindeberg, T. (1990). Scale-space for discrete signals. _IEEE TPAMI_, 12(3), 234–254.
5. Szegedy, C., Vanhoucke, V., Ioffe, S., Shlens, J., & Wojna, Z. (2016). Rethinking the Inception architecture for computer vision. _CVPR_, 2818–2826.
6. Chollet, F. (2017). Xception: Deep learning with depthwise separable convolutions. _CVPR_, 1251–1258.
7. Howard, A. G., et al. (2017). MobileNets: Efficient convolutional neural networks for mobile vision applications. arXiv:1704.04861.
8. Sobel, I., & Feldman, G. (1968). A 3×3 isotropic gradient operator for image processing. Talk presented at the Stanford Artificial Intelligence Project.
9. Scharr, H. (2000). _Optimale Operatoren in der digitalen Bildverarbeitung_. PhD thesis, University of Heidelberg.
10. Haralick, R. M. (1984). Digital step edges from zero crossing of second directional derivatives. _IEEE TPAMI_, 6(1), 58–68.
11. Yuille, A. L., & Poggio, T. A. (1986). Scaling theorems for zero crossings. _IEEE TPAMI_, 8(1), 15–25.
12. Babaud, J., Witkin, A. P., Baudin, M., & Duda, R. O. (1986). Uniqueness of the Gaussian kernel for scale-space filtering. _IEEE TPAMI_, 8(1), 26–33.
13. Witkin, A. P. (1983). Scale-space filtering. _Proceedings of IJCAI_, 1019–1022.
14. Lindeberg, T. (1998). Feature detection with automatic scale selection. _International Journal of Computer Vision_, 30(2), 79–116.
15. Lowe, D. G. (2004). Distinctive image features from scale-invariant keypoints. _International Journal of Computer Vision_, 60(2), 91–110.
16. Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. _NeurIPS 25_, 1097–1105.
