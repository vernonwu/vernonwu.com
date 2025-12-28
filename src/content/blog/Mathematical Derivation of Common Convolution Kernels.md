---
title: Mathematical Derivation of Common Convolution Kernels
author: Vernon Wu
pubDatetime: 2024-04-14T13:32:00Z
slug: convolution-kernels
featured: false
ogImage: /assets/nozomi.jpg
tags:
  - Computer Vision
  - Machine Learning
  - Maths
description: 常见卷积算子的数学推导。
---

在计算机视觉与图像处理中，边缘检测的核心在于寻找像素亮度的剧烈变化。从数学角度看，这等同于计算图像信号的**梯度**。然而，实际图像充满了高频噪声，直接求导会放大high frequency noise。因此，卷积算子的演进逻辑始终围绕着一对矛盾展开：精确捕获边缘（**微分**）与有效抑制噪声（**平滑**）。

---

## Binomial Smoothing Kernel

一切复杂的平滑算子都可以追溯到最简单的**矩形均值滤波（Box Filter）**。当我们对信号重复应用均值滤波时，就得到了binomial smoothing kernel。

设一维离散均值核为 $K_{box} = [1, 1]$。
对其进行n次自卷积运算, 有：

$$
\begin{aligned} K_{\text{tri}}^{n} &= \underbrace{K_{\text{box}}* K_{\text{box}} \cdots* K_{\text{box}}}_{n\text{ times}} \\ &= [C(n,0), C(n,1), C(n,2), \ldots, C(n,n)] \end{aligned}
$$

其中 $C(n,k)$ 为二项式系数。
根据**中心极限定理**，当 $n \to \infty$ 时，$K_{\text{tri}}^{n}$收敛于一维高斯分布, 因此可用其近似高斯平滑。

---

## Gaussian Kernel

高斯函数具有**可分离性（Separability）**，即 $G_{\sigma}(x,y) = G_{\sigma}(x) \cdot G_{\sigma}(y)$。这允许我们将两个一维核通过向量外积生成二维核。

以最常用的 $3 \times 3$ 高斯核为例，使用 $K_{\text{tri}}^{2} = [1, 2, 1]$ 作为基底：

$$
G_{\sigma} = \frac{1}{16} \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix} \times \begin{bmatrix} 1 & 2 & 1 \end{bmatrix} = \frac{1}{16} \begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{bmatrix}
$$

### 离散采样

此外，我们亦可从连续的二维高斯函数出发，进行离散采样得到相似的结果：

$$
G_{\sigma}(x,y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}
$$

取 $\sigma = 1$，在 $x,y \in \{-1,0,1\}$ 范围内采样并归一化，得到：

$$
G_{\sigma} = \begin{bmatrix} 0.07 & 0.12 & 0.07 \\ 0.12 & 0.2 & 0.12 \\ 0.07 & 0.12 & 0.07 \end{bmatrix}
$$

---

## Sobel Operator

Sobel 算子用于估计图像梯度，进而检测边缘。其核心思想是结合梯度方向的差分与垂直方向的平滑，提升抗噪能力。
首先，推导一维梯度的差分核:

对于一维函数 $f(x)$ ，在 $x$ 处的泰勒展开为：

$$
\begin{aligned}
& f(x+h)=f(x)+h f^{\prime}(x)+\frac{h^2}{2} f^{\prime \prime}(x)+O\left(h^3\right) \\
& f(x-h)=f(x)-h f^{\prime}(x)+\frac{h^2}{2} f^{\prime \prime}(x)-O\left(h^3\right)
\end{aligned}
$$

两式相减并取步长 $h=1$（像素单位距离）：

$$
\begin{aligned}
&f(x+1)-f(x-1)=2 f^{\prime}(x)+O\left(h^2\right) \\ &\Longrightarrow f^{\prime}(x) \approx \frac{f(x+1)-f(x-1)}{2}
\end{aligned}
$$

对应的 1D 差分核为：$[-1, 0, 1]$（忽略系数 $1 / 2$ ）。

结合上文的[平滑算子](#binomial-smoothing-kernel), 分别近似 $x$ 和 $y$ 方向的梯度：

$$
\begin{aligned}
& \nabla_x f = G_x = \underbrace{\left[\begin{array}{l} 1 \\ 2 \\ 1 \end{array}\right]}_{\text {垂直方向平滑}} * \underbrace{\left[\begin{array}{lll} -1 & 0 & 1 \end{array}\right]}_{\text {水平方向差分}} = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix} \\
& \nabla_y f = G_y = \underbrace{\begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}}_{\text{垂直方向差分}} \times \underbrace{\begin{bmatrix} 1 & 2 & 1 \end{bmatrix}}_{\text{水平方向平滑}} = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix} \\
\end{aligned}
$$

将两个分量结合为梯度：

$$
G = \sqrt{G_x^2 + G_y^2} \approx |G_x| + |G_y|
$$

方向可用 $\theta = \arctan\left(\frac{G_y}{G_x}\right)$ 计算。

> Sobel计算较快但方向单一，对复杂纹理的情况显得乏力。

---

## Laplacian Operator

一阶导数的极值对应边缘，而二阶导数的零交叉点(**Zero-crossing**)对应边缘的中心，因此同样可被用于边缘检测。

在图像中，拉普拉斯算子定义为 $\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2}$。

同样地，我们从一维二阶导数的[泰勒展开](#sobel-operator)出发：

$$
f^{\prime \prime}(x) = f(x+1) - 2f(x) + f(x-1) + O(h^3)
$$

对应的 1D 二阶差分核为：$[1, -2, 1]$.

我们将 $x$ 和 $y$ 方向的二阶差分叠加：

$$
\begin{aligned}
\nabla^2 f & \approx[f(x+1, y)+f(x-1, y)-2 f(x, y)] \\ & +[f(x, y+1)+f(x, y-1)-2 f(x, y)] \\
& = f(x+1, y)+f(x-1, y)+f(x, y+1)+f(x, y-1)-4 f(x, y),
\end{aligned}
$$

即:

$$
L = \underbrace{\begin{bmatrix} 0 & 0 & 0 \\ 1 & -2 & 1 \\ 0 & 0 & 0 \end{bmatrix}}_{x\text{-direction}} + \underbrace{\begin{bmatrix} 0 & 1 & 0 \\ 0 & -2 & 0 \\ 0 & 1 & 0 \end{bmatrix}}_{y\text{-direction}} = \begin{bmatrix} 0 & 1 & 0 \\ 1 & -4 & 1 \\ 0 & 1 & 0 \end{bmatrix}
$$

> **缺陷**：二阶导数对噪声极其敏感，直接对原图使用 Laplacian 往往无法获得可用的边缘图。

---

## Laplacian of Gaussian (LoG)

为了解决 Laplacian 的噪声敏感问题，Marr 和 Hildreth [[1]](#references) 提出了 **LoG 算子**。其核心思想是: 先利用[高斯函数](#gaussian-kernel)进行平滑，再进行[拉普拉斯求导](#laplacian-operator)。Torre [[2]](#references) 证明了 the Gaussian is optimal for reducing noise with minimum delocalisation.

### 连续域推导

设图像为 $f(x, y)$ ，高斯核为 $G_\sigma(x, y)$ 。我们想要计算的是：

$$
\nabla^2\left[G_\sigma(x, y) * f(x, y)\right]
$$

由于卷积与微分是线性算子，根据微分性质，上式等价于：

$$
\left[\nabla^2 G_\sigma(x, y)\right] * f(x, y)
$$

这说明：我们可以先对高斯函数求二阶偏导，得到一个算子（即 LoG），再用这个算子去卷积图像。

已知二维高斯函数：

$$
G_\sigma(x, y)=\frac{1}{2 \pi \sigma^2} e^{-\frac{x^2+y^2}{2 \sigma^2}}
$$

接着计算二阶偏导：

$$
\begin{aligned}
\frac{\partial^2 G}{\partial x^2}&=G_\sigma(x, y) \cdot\left(\frac{x^2}{\sigma^4}-\frac{1}{\sigma^2}\right) \\
\frac{\partial^2 G}{\partial y^2}&=G_\sigma(x, y) \cdot\left(\frac{y^2}{\sigma^4}-\frac{1}{\sigma^2}\right)
\end{aligned}
$$

将两者相加，得到**LoG**算子:

$$
\nabla^2 G_\sigma(x, y)=\frac{1}{\pi \sigma^4}\left(\frac{x^2+y^2}{2 \sigma^2}-1\right) e^{-\frac{x^2+y^2}{2 \sigma^2}}
$$

同样，通过采样可得到：

$$
\text { LoG }=\left[\begin{array}{ccccc}
0 & 0 & -1 & 0 & 0 \\
0 & -1 & -2 & -1 & 0 \\
-1 & -2 & 16 & -2 & -1 \\
0 & -1 & -2 & -1 & 0 \\
0 & 0 & -1 & 0 & 0
\end{array}\right]
$$

![log_kernel.png](https://s2.loli.net/2025/12/28/xCTw3ot4IJeRvAY.png)

### 离散域推导

根据二维高斯核的[可分离性](#gaussian-kernel)，

$$
\begin{aligned}
\operatorname{LoG}_{2 D}&=\left(D_x^2+D_y^2\right) *\left(G_x * G_y\right)\\ &=\underbrace{\left(D_x^2 * G_x\right) * G_y}_{\text {Term A }}+\underbrace{\left(D_y^2 * G_y\right) * G_x}_{\text {Term B }}
\end{aligned}
$$

其中每一项都包括一个1D LoG响应与垂直方向平滑核的卷积。我们取[上文](#laplacian-operator)得到的$D=[-1,0,1], G = [1,2,1]$，则有:

$$
H_{1 D}=D^2 * G=[1,-2,1] *[1,2,1]=[1,0,-2,0,1]
$$

因此：

$$
\begin{aligned}
\operatorname{Term} A &=\begin{bmatrix}1\\2\\1\end{bmatrix}_y * \begin{bmatrix}1 & 0 & -2 & 0 & 1\end{bmatrix}_x=\begin{bmatrix}1 & 0 & -2 & 0 & 1\\2 & 0 & -4 & 0 & 2\\1 & 0 & -2 & 0 & 1\end{bmatrix} \\
\operatorname{Term} B &=\begin{bmatrix}1 & 0 & -2 & 0 & 1\end{bmatrix}_y^T * \begin{bmatrix}1 & 2 & 1\end{bmatrix}_x=\begin{bmatrix}1 & 2 & 1\\0 & 0 & 0\\-2 & -4 & -2\\0 & 0 & 0\\1 & 2 & 1\end{bmatrix}
\end{aligned}
$$

中心对齐并取绝对值，得到:

$$
\text { LoG }=\left|\operatorname{Term} A+\operatorname{Term} B\right|=\begin{bmatrix}
0 & -1 & -2 & 1 & 0 \\
-1 & 0 & 2 & 0 & -1 \\
-2 & 2 & 8 & 2 & -2 \\
-1 & 0 & 2 & 0 & -1 \\
0 & -1 & -2 & -1 & 0
\end{bmatrix}
$$

> 注意到与[连续域](#连续域推导)的结果在数值上略有不同，这是不同$\sigma$值与quantization error导致的。

## References

>[1] Marr, David, and Ellen Hildreth. "Theory of edge detection." Proceedings of the Royal Society of London. Series B. Biological Sciences 207.1167 (1980): 187-217.

>[2] Torre, Vincent, and Tomaso A. Poggio. "On edge detection." IEEE Transactions on Pattern Analysis and Machine Intelligence 2 (1986): 147-163.
