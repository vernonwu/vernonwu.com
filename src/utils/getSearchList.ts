import type { CollectionEntry } from "astro:content";
import type { SearchItem } from "@components/Search";
import getReadingTime from "./getReadingTime";

/** Posts in the shape the search box (page and ⌘K dialog) expects */
const getSearchList = (posts: CollectionEntry<"blog">[]): SearchItem[] =>
  posts.map(({ data, slug, body }) => ({
    title: data.title,
    description: data.description,
    data,
    slug,
    readingTime: getReadingTime(body),
  }));

export default getSearchList;
