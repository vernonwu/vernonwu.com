const BASE_URL = "https://api.myanimelist.net/v2";

type MALItem = {
  node: {
    id: number;
    title: string;
    main_picture?: { medium?: string; large?: string };
    alternative_titles?: { ja?: string };
    media_type?: string;
  };
  list_status?: {
    status?: string;
    score?: number;
    num_episodes_watched?: number;
    num_chapters_read?: number;
    tags?: string[];
    start_date?: string;
    finish_date?: string;
  };
};

type MALResponse = {
  data?: MALItem[];
  paging?: {
    next?: string;
  };
};

export type CollectionItem = {
  id: number;
  title: string;
  japaneseTitle?: string;
  image?: string;
  status?: string;
  statusCategory: "consuming" | "completed" | "plan" | "other";
  score?: number;
  progress?: string;
  url: string;
  kind: "anime" | "manga";
  mediaType?: string;
  typeCategory: "TV" | "Movie" | "Manga" | "Other";
  tags?: string[];
  startDate?: string;
  finishDate?: string;
};

export type CollectionFetchResult = {
  items: CollectionItem[];
  error?: string;
  next?: string;
};

type FetchListOptions = {
  clientId?: string;
  username?: string;
  limit?: number;
};

function mapItems(kind: "anime" | "manga", data?: MALItem[]): CollectionItem[] {
  return (
    data?.map(({ node, list_status }) => {
      const image = node.main_picture?.large ?? node.main_picture?.medium;
      const mediaType = node.media_type?.toLowerCase();
      const japaneseTitle = node.alternative_titles?.ja;
      const title = (japaneseTitle && japaneseTitle.trim()) || node.title;
      const typeCategory =
        kind === "manga"
          ? "Manga"
          : mediaType === "tv"
            ? "TV"
            : mediaType === "movie"
              ? "Movie"
              : "Other";
      const statusCategory =
        kind === "anime"
          ? list_status?.status === "watching"
            ? "consuming"
            : list_status?.status === "completed"
              ? "completed"
              : list_status?.status === "plan_to_watch"
                ? "plan"
                : "other"
          : list_status?.status === "reading"
            ? "consuming"
            : list_status?.status === "completed"
              ? "completed"
              : list_status?.status === "plan_to_read"
                ? "plan"
                : "other";
      const progress =
        kind === "anime"
          ? `${list_status?.num_episodes_watched ?? 0} eps`
          : `${list_status?.num_chapters_read ?? 0} ch`;
      const startDate = list_status?.start_date
        ? new Date(list_status.start_date).toISOString()
        : undefined;
      const finishDate = list_status?.finish_date
        ? new Date(list_status.finish_date).toISOString()
        : undefined;

      return {
        id: node.id,
        title,
        image,
        japaneseTitle,
        status: list_status?.status,
        statusCategory,
        score: list_status?.score,
        progress,
        url: `https://myanimelist.net/${kind}/${node.id}`,
        kind,
        mediaType: node.media_type,
        typeCategory,
        tags: list_status?.tags?.filter(Boolean),
        startDate,
        finishDate,
      } satisfies CollectionItem;
    }) ?? []
  );
}

export async function fetchMalList(
  kind: "anime" | "manga",
  { clientId, username, limit = 6 }: FetchListOptions
): Promise<CollectionFetchResult> {
  if (!clientId) {
    return { items: [], error: "MAL_CLIENT_ID is missing." };
  }
  if (!username) {
    return { items: [], error: "MAL_USERNAME is missing." };
  }

  const fields =
    kind === "anime"
      ? "list_status{status,score,num_episodes_watched,tags,start_date,finish_date},media_type,alternative_titles{ja}"
      : "list_status{status,score,num_chapters_read,tags,start_date,finish_date},media_type,alternative_titles{ja}";

  const params = new URLSearchParams({
    limit: limit.toString(),
    fields,
    nsfw: "true",
  });

  const url = `${BASE_URL}/users/${encodeURIComponent(username)}/${kind}list?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: { "X-MAL-CLIENT-ID": clientId },
    });

    if (!response.ok) {
      return {
        items: [],
        error: `MyAnimeList ${kind}list responded with ${response.status}.`,
      };
    }

    const data = (await response.json()) as MALResponse;
    const items = mapItems(kind, data.data);

    return { items, next: data.paging?.next };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reach MyAnimeList.";
    return { items: [], error: message };
  }
}

export async function fetchMalListAll(
  kind: "anime" | "manga",
  options: FetchListOptions
): Promise<CollectionFetchResult> {
  const initial = await fetchMalList(kind, {
    ...options,
    limit: options.limit ?? 100,
  });

  if (initial.error || !options.clientId || !options.username) {
    return initial;
  }

  const items = [...initial.items];
  let nextUrl = initial.next;
  let guard = 0;

  while (nextUrl && guard < 20) {
    try {
      const response = await fetch(nextUrl, {
        headers: { "X-MAL-CLIENT-ID": options.clientId as string },
      });
      if (!response.ok) break;

      const data = (await response.json()) as MALResponse;
      if (data.data?.length) {
        items.push(...mapItems(kind, data.data));
      }
      nextUrl = data.paging?.next;
    } catch {
      break;
    }

    guard += 1;
  }

  return { items };
}
