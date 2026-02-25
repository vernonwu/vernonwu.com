const id = "Solution for Project Euler [484].md";
						const collection = "blog";
						const slug = "solve-euler-484";
						const body = "> Problem Archives can be found [here](https://projecteuler.net/archives).\n\n## Problem description\n\nThe arithmetic derivative is defined by\n\n- $p^{\\prime}=1$ for any prime $p$\n- $(a b)^{\\prime}=a^{\\prime} b+a b^{\\prime}$ for all integers $a, b$ (Leibniz rule)\n\nFor example, $20^{\\prime}=24$. Find $\\sum \\operatorname{gcd}\\left(k, k^{\\prime}\\right)$ for $1<k \\leq 5 \\times 10^{15}$.\n\nNote: $\\operatorname{gcd}(x, y)$ denotes the greatest common divisor of $x$ and $y$.\n\n## Mathematical Derivation\n\nLet $g(n):=\\operatorname{gcd}\\left(n^{\\prime}, n\\right)$ and $f\\left(p^e\\right):=g\\left(p^e\\right)-g\\left(p^{e-1}\\right)(f(n):$ multiplicative function). Then,\n\n$$\n\\sum_{k=2}^N \\operatorname{gcd}\\left(k, k^{\\prime}\\right)=-1+\\sum_{n: \\text { powerful number }}\\left\\lfloor\\frac{N}{n}\\right\\rfloor f(n) .\n$$\n\n## Algorithm\n\n```python\nimport numba as nb\nimport numpy as np\nfrom math import sqrt\nfrom primesieve import primes\n\ndef euler484(L):\n  pLst = primes(int(sqrt(L+0.5)))\n  qLst = np.array(pLst)**2\n  return L-1 + dfs(0,L,pLst,qLst)\n\n@nb.njit\ndef dfs(i0,L0,pLst,qLst):\n  res = 0\n  for i in range(i0,len(pLst)):\n    q = qLst[i]\n    L = L0//q\n    if L == 0:\n      break\n    p, e, g = pLst[i], 1, 1\n    while L:\n      gp = g\n      e += 1\n      if e != 1:\n        if e == p:\n          g *= q\n          e = 0\n        else:\n          g *= p\n        c = g - gp\n        res += c*L\n        if L > q:\n          res += c*dfs(i+1,L,pLst,qLst)\n      L //= p\n  return res\n\nN = 5 * 10 ** 15\nprint(euler484(N))\n```";
						const data = {author:"Vernon Wu",pubDatetime:new Date(1713282157000),title:"Solution of Project Euler [484]",featured:false,draft:false,tags:["Algorithm","Maths"],ogImage:"/assets/nozomi.jpg",description:"No.484 of my colllection of project Euler solutions."};
						const _internal = {
							type: 'content',
							filePath: "/Users/stevejobs/study/projects/vernonwu.com/src/content/blog/Solution for Project Euler [484].md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
