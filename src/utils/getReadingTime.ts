const WORDS_PER_MINUTE = 220;

/** Estimated minutes to read a post's Markdown/MDX body (at least 1) */
const getReadingTime = (body: string) => {
  const words =
    body
      .replace(/^import .*$/gm, "") // MDX imports
      .replace(/<[^>]+>/g, " ") // HTML tags and components
      .match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export default getReadingTime;
