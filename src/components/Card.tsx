import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  readingTime?: number;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  readingTime,
}: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-medium decoration-dashed underline-offset-4 group-hover:underline",
  };

  return (
    <li className="group relative -mx-3 my-2 rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-skin-card/50">
      {/* The ::after overlay stretches the link over the whole card */}
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div className="flex flex-wrap items-center gap-x-2">
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        {readingTime && (
          <span className="text-sm italic opacity-80">
            · {readingTime} min read
          </span>
        )}
      </div>
      <p>{description}</p>
      {tags.length > 0 && (
        // Sits above the card link; only the tags themselves take clicks
        <ul className="pointer-events-none relative z-10 mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {tags.map(tag => (
            <li key={tag} className="pointer-events-auto">
              <a
                href={`/tags/${slugifyStr(tag)}/`}
                className="opacity-70 transition-opacity hover:text-skin-accent hover:opacity-100"
              >
                #{tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
