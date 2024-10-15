---
title: Overview of Efficient Transformers
author: Vernon Wu
pubDatetime: 2024-04-14T13:32:00Z
slug: efficient-transformers
featured: false
draft: false
ogImage: /assets/nozomi.jpg
tags:
  - Computer Vision
  - Notes
description: notes on "Efficient transformers - A survey"
---

> Please note that the following content is intended for personal note-taking, and therefore is rather unorganized. On the occasion of any issues, please email me or make a thread in the comment section below.
## Base:
![image.png](https://s2.loli.net/2024/04/13/p5GoCQLiKkDOsYl.png)

1. embed
$$\mathbb{R}^B \times \mathbb{R}^N\rightarrow \mathbb{R}^B \times \mathbb{R}^N \times \mathbb{R}^{d_{\text {model }}}$$
2. +positional encoding
3. Multi-Head Self-Attention
$$A_h=\operatorname{Softmax}\left(\alpha Q_h K_h^{\top}\right) V_h,$$
	$H$ heads, $W_q, W_k, W_v \in \mathbb{R}^{d \times \frac{d}{H}}$ , concatenate, dense.
	parallel: $\mathbb{R}^B \times \mathbb{R}^N \times \mathbb{R}^H \times \mathbb{R}^{\frac{d}{H}}$
4. *Position-Wise* FFN
$$F_2\left(\operatorname{ReLU}\left(F_1\left(X_A\right)\right)\right),$$
	for every time step, apply the same MLP to improve network expression ability (promote then reduce dimensionality). It's a trick to control the scale issue.
### Computation Cost
memory & cc: quadratic. $N\times N$
### Mode
- (1) encoder-only (e.g. for classification),
- (2) decoder-only(e.g. for language modeling), causal, upper triangular mask
- (3) encoder-decoder (e.g. for machine translation), decoder part **causal** due to auto-regressive.
## Modifications
![image.png](https://s2.loli.net/2024/04/13/Bk6MpWXEeOfg3bH.png)
### Methodology
- **FP** (fixed patterns): local windows etc.
	- Block-wise Patterns: $N^2\rightarrow B^2$
	- Strided Patterns: tending by intervals. Strided or dilated windows.
	- Compressed Patterns: pooling, downsample sequence length.
- **CP** (Combinations of Patterns): aggregation / combination / axial of FP
- **LP** (Learnable Patterns): data-driven, establish token **relevance** -> assign to buckets/clusters
	- relevance: hash, k-means, sort blocks
	- enables global view on top of FP's efficiency
- **M** (neural memory): learnable side memory module
	- Set Transformers: pooling-like compress $\rightarrow$ restore information via cross attention with $m$ temporary vectors(learned)
	- problem: information loss $\rightarrow$ global token (*e.g* Bert [CLS])
- **LR** (Low rank methods): leverage low-rank approximations of the self-attention matrix
	- post softmax, the attention matrix is not full-rank
	- linformer: $$\begin{aligned}
\overline{\text { head }_i} & =\operatorname{Attention}\left(Q W_i^Q, E_i K W_i^K, F_i V W_i^V\right) \\
& =\underbrace{\operatorname{softmax}\left(\frac{Q W_i^Q\left(E_i K W_i^K\right)^T}{\sqrt{d_k}}\right)}_{\bar{P}: n \times k} \cdot \underbrace{F_i V W_i^V}_{k \times d},
\end{aligned}$$
	where $E,F$ are projecton layers.
- **KR** (Kernels): re-writing of the self-attention mechanism to avoid explicitly computing the $N ×N$ matrix
	- can be viewed as a form of LR
- **RC** (recurrence): connect blocks via recurrence
- **DS** (downsampling): e.g. patch merging in Swin-Transformer
- Sparse Models and Conditional Computation: sparsely activate a subset of the parameters to improve FLOPS
$$
\begin{array}{|c|c|c|c|}
\hline \text { Model/Article } & \text { Complexity } & \text { Decode } & \text { Class } \\
\hline \text { Memory Compressed }^{\dagger}[48] & O\left(N_c^2\right) & \checkmark & \mathrm{FP}+\mathrm{M} \\
\hline \text { Image Transformer }{ }^{\dagger}[55] & O(N . m) & \checkmark & \text { FP } \\
\hline \text { Set Transformer }{ }^{\dagger}[43] & \mathcal{O}(k N) & \times & \text { M } \\
\hline \text { Transformer-XL }{ }^{\dagger}[16] & O\left(N^2\right) & \checkmark & \mathrm{RC} \\
\hline \text { Sparse Transformer [9] } & O(N \sqrt{N}) & \checkmark & \text { FP } \\
\hline \text { Reformer }^{\dagger}[37] & O(N \log N) & \checkmark & \text { LP } \\
\hline \text { Routing Transformer [62] } & O(N \sqrt{N)} & \checkmark & \text { LP } \\
\hline \text { Axial Transformer [28] } & O(N \sqrt{N}) & \checkmark & \text { FP } \\
\hline \text { Compressive Transformer }^{\dagger} \text { [59] } & O\left(N^2\right) & \checkmark & \mathrm{RC} \\
\hline \text { Sinkhorn Transformer }{ }^{\dagger}[74] & O\left(B^2\right) & \checkmark & \text { LP } \\
\hline \text { Longformer [5] } & \boldsymbol{O}(n(k+m)) & \checkmark & \mathrm{FP}+\mathrm{M} \\
\hline \text { ETC }[3] & O\left(N_g^2+N N_g\right) & \times & \mathrm{FP}+\mathrm{M} \\
\hline \text { Synthesizer [73] } & O\left(N^2\right) & \checkmark & \mathrm{LR}+\mathrm{LP} \\
\hline \text { Performer [10] } & O(N) & \checkmark & \mathrm{KR} \\
\hline \text { Funnel Transformer [15] } & O\left(N^2\right) & \checkmark & \mathrm{FP}+\mathrm{DS} \\
\hline \text { Linformer [87] } & O(N) & \times & \text { LR } \\
\hline \text { Linear Transformers }{ }^{\dagger}[36] & O(N) & \checkmark & \mathrm{KR} \\
\hline \text { Big Bird [93] } & O(N) & \times & \mathrm{FP}+\mathrm{M} \\
\hline \text { Random Feature Attention }{ }^{\dagger}[56] & O(N) & \checkmark & \mathrm{KR} \\
\hline \text { Long Short Transformers }{ }^{\dagger}[96] & O(k N) & \checkmark & \mathrm{FP}+\mathrm{LR} \\
\hline \text { Poolingformer }^{\dagger}[95] & O(N) & \times & \mathrm{FP}+\mathrm{M} \\
\hline \text { Nyströmformer }{ }^{\dagger}[91] & O(k N) & \times & M+D S \\
\hline \text { Perceiver [31] } & O(k N) & \checkmark & M+D S \\
\hline \text { Clusterformer }^{\dagger}[88] & O(N \log N) & \times & \text { LP } \\
\hline \text { Luna }[50] & O(k N) & \checkmark & \text { M } \\
\hline \text { TokenLearner }^{\dagger}[63] & O\left(k^2\right) & \times & \text { DS } \\
\hline \text { Adaptive Sparse Transformer }^{\dagger}[14] & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline \text { Product Key Memory [41] } & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline \text { Switch Transformer [23] } & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline \text { GShard [45] } & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline \text { Scaling Transformers [32] } & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline \text { GLaM [21] } & O\left(N^2\right) & \checkmark & \text { Sparse } \\
\hline
\end{array}
$$
## Detailed Walk-Through
### Image Transformer
#### local attention
Self-attention computed within blocks independently.
for block of length $b$, $cc=O(b^2*(n/b))=O(n)$
#### Memory-Compressed Attention
For $K^{d\times N}$, apply convolution along axis 0 with kernel size and stride $k$ to reduce dimension to $d\times \frac{N}{k}$. CC of attention then becomes $O(n \cdot n / k)$.
However, it often either
1) does not result in significant improvement in cc due to $N$ and $N/k$ being similar in orders of magnitude; or
2) lose information during compression.

#### Two Attention Schemes
![image.png](https://s2.loli.net/2024/04/14/LUCPXkitdNAvM8l.png)

flattened in raster order, partition into non-overlapping query blocks of length $l_q$, extends $l_m$to memory blocks. $m=l_q+l_m, \quad cc=O(n \cdot m).$
Loses global receptive field.
### Sparse Transformer
Assumption: In softmax Attention, effective weights are sparsely distributed.
#### heads
$1/2$ fixed:
$\hat{FA}_{i j}^{(1)}= \begin{cases}Q_iK_j^{\top}, & \text { if }\lfloor j / L\rfloor=\lfloor i / L\rfloor \\ 0 & \text { otherwise }\end{cases} \\ \hat{FA}_{i j}^{(2)}= \begin{cases}Q_iK_j^{\top}, & \text { if }j\bmod L \geq L-c \\ 0 & \text { otherwise }\end{cases}$
$+ 1/2$ strided:
$\hat{SA}_{i j}^{(1)}= \begin{cases}Q_iK_j^{\top}, & \text { if }\max{(0,i-L)} \leq j \leq i\\ 0 & \text { otherwise }\end{cases} \\ \hat{SA}_{i j}^{(2)}=\begin{cases}Q_iK_j^{\top}, & \text { if }(i-j)\bmod L=0 \\ 0 & \text { otherwise }\end{cases}$
which can be visualized below:
![image.png](https://s2.loli.net/2024/04/14/OQq3wHkLJ4EMV8x.png)
#### usage
1) alternate $1$ and $2$: $\operatorname{attention}(X)=W_p \cdot \operatorname{attend}\left(X, A^{(r \bmod p)}\right)$
	Justification: $1$ synthesizes block information, so striding in $2$ does not affect the receptive field.
2) merge: $\operatorname{attention}(X)=W_p \cdot \operatorname{attend}\left(X, \bigcup_{m=1}^p A^{(m)}\right)$
3) multihead, then concatenate: $\operatorname{attention}(X)=W_p\left(\operatorname{attend}(X, A)^{(i)}\right)_{i \in\left\{1, \ldots, n_h\right\}}$
#### cc
set $L=\sqrt{N}$, then $O(N \sqrt{N}).$
Strided attention is more suited for images and audio; (more local)
fixed attention is more suited for texts. (more global)

### Blockwise Self-Attention
Memory: for BERT, model $2.1\%$, optimizer(adam)$10.3\%$, activation $87.6\%$ $O(N^2).$
BlockBERT: split $N\rightarrow n\times \frac{N}{n}$, then $Q\rightarrow Q_{1},Q_{2},...Q_{n},$ same for $K,V.$
$O\left(\frac{N^2}{n^2} \times n\right)=O\left(\frac{N^2}{n}\right)$
### Axial Transformer
Compute attention along axis. For image data, $B\times N\times hw\rightarrow Bw\times N\times h+Bh\times N\times w$
saves $O(N^2)/O(N\sqrt{N})=O(\sqrt{N})$
Generally, for $N=N^{1 / d} \times \cdots \times N^{1 / d}$, Axial transformer saves $O(N^2)/O(d\times\left(N^{1/d}\right)^{(d-1)}\times \left(N^{1/d}\right)^{2})=O\left(N^{(d-1) / d}\right)$
![image.png](https://s2.loli.net/2024/04/14/z7ulsBW25fyPrhg.png)
#### models
auto-regressive: $p_\theta(x)=\prod_{i=1}^N p_\theta\left(x_i \mid x_{<i}\right)$
**Inner decode: row-wise model**
$$\begin{aligned} & h \leftarrow \operatorname{Embed}(x) \\ & h \leftarrow \text { ShiftRight }(h)+\text { PositionEmbeddings } \\ & h \leftarrow \text { MaskedTransformerBlock }_2(h) \qquad \qquad \times L_{\text {row }}\end{aligned}$$
where $h$ is the initial $D$ dimensional embedding of size $H\times W\times D.$
shiftright ensures the current pixel is out of receptive field.
**Outer Decoder: capturing the rows above**
$$\begin{aligned} & h \leftarrow \operatorname{Embed}(x) \\ & u \leftarrow h+\text { PositionEmbeddings } \\ & u \leftarrow \text { MaskedTransformerBlock }_1\left(\operatorname{TransformerBlock}_2(u)\right) \quad \times L_{\text {upper }} / 2 \\ & h \leftarrow \underline{\operatorname{ShiftDown}(u)}+\operatorname{ShiftRight}(h)+\text { PositionEmbeddings } \\ & h \leftarrow \text { MaskedTransformerBlock }_2(h) \quad \times L_{\text {row }}\end{aligned}$$
The tensor $u$ represents context captured above the current pixel.
Finally, pass through LayerNorm and dense layer to produce logits $H \times W \times 256.$
Effective for point clouds, etc.
### Longformer
dilated CNNs $\rightarrow$ dilated sliding windows $Q_s, K_s, V_s$
Increases the receptive field by layer like CNN, and therefore this indirect approach performs similarly bad at long distance modeling.
special tokens for global attention (BERT [CLS]) $Q_g, K_g, V_g$ , which needs to attend to and be attended by all tokens. **Crucial**.
![image.png](https://s2.loli.net/2024/04/15/gAmn8qQSbC7kdPy.png)
### Big Bird
global tokens + fixed patterns (local sliding windows)+ **random attention** (queries attend to random keys).
Justification for randomness:
The standard Transformer is a *complete digraph,* which can be approximated with random graphs.
The model is Turing-complete.
![image.png](https://s2.loli.net/2024/04/15/yFbj6w9dcHQ5TEi.png)
### Routing Transformer
learns attention sparsity with *k-means* clustering where $k=\sqrt{n}.$
Cluster centroid vectors $\boldsymbol{\mu}=\left(\mu_1, \cdots, \mu_k\right) \in \mathbb{R}^{k \times d}$ are shared for $Q$ and $K.$
$$X_i^{\prime}=\sum_{\substack{j: K_j \in \mu\left(Q_i\right), j<i}} A_{i j} V_j$$
![image.png](https://s2.loli.net/2024/04/15/BpbRFYGykdhv7cU.png)
For decoder (causal attention), solutions include:
1) additional lower-triangular masking;
2) share queries and keys. Namely, $k\leftarrow Q.$ Works better.
### Reformer
Locality Sensitive Hashing (**LSH**).
For $b$ hashes, define random matrix $R^{d_k\times \frac{b}{2}}.$
$$h(x)=\arg \max ([x R ;-x R])$$
similarity with $b$ random vectors.
```python
random_rotations = np.random.randn(hidden_dim, n_buckets // 2)
rotated_vectors = np.dot(x, random_rotations)
rotated_vectors = np.hstack([rotated_vectors, -rotated_vectors])
buckets = np.argmax(rotated_vectors, axis=-1)
```
attention: $$o_i=\sum_{j \in \mathcal{P}_i} \exp \left(q_i \cdot k_j-z\left(i, \mathcal{P}_i\right)\right) v_j \quad \text { where } \mathcal{P}_i=\left\{j:h\left(q_i\right)=h\left(k_j\right)\right\}$$where $z$ is the normalizing term in softmax.
![image.png](https://s2.loli.net/2024/04/16/GK1lnL8RZTFIv2p.png)
To avoid queries with no keys, set $k_j=\frac{q_j}{\left\|q_j\right\|}$ s.t. $h\left(k_j\right) =h\left(q_j\right).$
Multi-round: $\mathcal{P}_i=\bigcup_{r=1}^{n_{\text {round }}} \mathcal{P}_i^{(r)}.$
### Revnet:
Reduce memory (activation) cost with extra computation.
![](https://s2.loli.net/2024/04/16/d5uOYN9K2a8qphW.png)

In reformer, set $F$ to LSH attention blocks, and $g$ to FFN.
### Linformer
$N\times d\rightarrow k\times d$, reduction on $N$ dimension instead of $k.$ Needs to maintain causal masking.
$$\operatorname{Softmax}\left(\frac{1}{\sqrt{d_k}} X W_i^Q\left(E_i X W_i^K\right)\right) \cdot F_i X W_i^V$$
where $E_i, F_i$ are $k \times N$ projections.
Reminiscent of depth-wise convolutions/ pooling.
### Performer
Fast Attention via Orthogonal Random Features (**FAVOR**):
With Kernel $\mathrm{K}(\mathbf{x}, \mathbf{y})=\mathbb{E}\left[\phi(\mathbf{x})^{\top} \phi(\mathbf{y})\right]$, where $\phi$ is a random feature map, we can write attention as $\mathbf{A}(i, j)=\mathrm{K}\left(\mathbf{q}_i^{\top}, \mathbf{k}_j^{\top}\right)$, then
$$\widehat{\operatorname{Att}_{\leftrightarrow}}(\mathbf{Q}, \mathbf{K}, \mathbf{V})=\widehat{\mathbf{D}}^{-1}\left(\mathbf{Q}^{\prime}\left(\left(\mathbf{K}^{\prime}\right)^{\top} \mathbf{V}\right)\right), \quad \widehat{\mathbf{D}}=\operatorname{diag}\left(\mathbf{Q}^{\prime}\left(\left(\mathbf{K}^{\prime}\right)^{\top} \mathbf{1}_L\right)\right)$$
![image.png](https://s2.loli.net/2024/04/16/fyOIRb4W2Bv1Gtw.png)

slower on causal(autoregressive) due to additional steps for masking, therefore unable to be parallelized.
### Linear Transformer
kernel method, linear-time, constant memory RNN.
$\operatorname{sim}(q, k)=\exp \left(\frac{q^T k}{\sqrt{d}}\right)$, observe:
$$V_i^{\prime}=\frac{\sum_{j=1}^p \operatorname{sim}\left(Q_i, K_j\right) V_j}{\sum_{j=1}^p \operatorname{sim}\left(Q_i, K_j\right)}.$$
with kernel method: $\operatorname{sim}(q, k):=\phi(q)^T \phi(k),$ then
$$\begin{aligned} V_i^{\prime} & =\frac{\phi\left(Q_i\right)^T S_p}{\phi\left(Q_i\right)^T Z_p}, \\ S_p & :=\sum_{j=1}^p \phi\left(K_j\right) V_j^T, \\ Z_p & :=\sum_{j=1}^p \phi\left(K_j\right) .\end{aligned}$$
for unmasked, $Q_i$ attends to the same $N$ keys, therefore we simply reuse $S_p,Z_p.$
for masked, incremental:
$$\begin{aligned} & S_i=S_{i-1}+\phi\left(K_i\right) V_i^T, \\ & Z_i=Z_{i-1}+\phi\left(K_i\right)\end{aligned}$$
if $O(c)$ to compute $\phi,$ then cc is $O(Ncd).$
choose: $\phi(x)=\operatorname{elu}(x)+1$, then $c=d.$
## References

[1] Yi Tay, Mostafa Dehghani, Dara Bahri, and Donald Metzler. 2022. Efficient Transformers: A Survey. ACM Comput. Surv. 55, 6, Article 109 (December 2022), 28 pages. [https://doi.org/10.1145/3530811](https://doi.org/10.1145/3530811)
