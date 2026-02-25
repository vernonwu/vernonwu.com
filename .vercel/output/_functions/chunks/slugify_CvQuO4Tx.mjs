import kebabcase from 'lodash.kebabcase';

const slugifyStr = (str) => kebabcase(str);
const slugifyAll = (arr) => arr.map((str) => slugifyStr(str));

export { slugifyAll as a, slugifyStr as s };
