---
title: Solution of Project Euler [484]
author: Vernon Wu
pubDatetime: 2024-04-16T15:62:37Z
slug: solve-euler-484
featured: false
draft: false
ogImage: /assets/nozomi.jpg
tags:
  - Algorithm
  - Maths
description: No.484 of my colllection of project Euler solutions.
---
> Problem Archives can be found [here](https://projecteuler.net/archives).

## Problem description

The arithmetic derivative is defined by

- $p^{\prime}=1$ for any prime $p$
- $(a b)^{\prime}=a^{\prime} b+a b^{\prime}$ for all integers $a, b$ (Leibniz rule)

For example, $20^{\prime}=24$. Find $\sum \operatorname{gcd}\left(k, k^{\prime}\right)$ for $1<k \leq 5 \times 10^{15}$.

Note: $\operatorname{gcd}(x, y)$ denotes the greatest common divisor of $x$ and $y$.

## Mathematical Derivation

Let $g(n):=\operatorname{gcd}\left(n^{\prime}, n\right)$ and $f\left(p^e\right):=g\left(p^e\right)-g\left(p^{e-1}\right)(f(n):$ multiplicative function). Then,

$$
\sum_{k=2}^N \operatorname{gcd}\left(k, k^{\prime}\right)=-1+\sum_{n: \text { powerful number }}\left\lfloor\frac{N}{n}\right\rfloor f(n) .
$$

## Algorithm

```python
import numba as nb
import numpy as np
from math import sqrt
from primesieve import primes

def euler484(L):
  pLst = primes(int(sqrt(L+0.5)))
  qLst = np.array(pLst)**2
  return L-1 + dfs(0,L,pLst,qLst)

@nb.njit
def dfs(i0,L0,pLst,qLst):
  res = 0
  for i in range(i0,len(pLst)):
    q = qLst[i]
    L = L0//q
    if L == 0:
      break
    p, e, g = pLst[i], 1, 1
    while L:
      gp = g
      e += 1
      if e != 1:
        if e == p:
          g *= q
          e = 0
        else:
          g *= p
        c = g - gp
        res += c*L
        if L > q:
          res += c*dfs(i+1,L,pLst,qLst)
      L //= p
  return res

N = 5 * 10 ** 15
print(euler484(N))
```