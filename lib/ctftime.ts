import "server-only";

const PROFILE_URL = "https://ctftime.org/user/221722";

export type CtftimeStats = {
  profileUrl: string;
  globalRank?: string;
  countryRank?: string;
  rating?: string;
  events?: string;
  status: "live" | "fallback";
};

function cleanText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function pickStat(text: string, labels: string[]) {
  for (const label of labels) {
    const expression = new RegExp(`${label}\\s*:?\\s*(#?\\d[\\d,.]*)`, "i");
    const value = text.match(expression)?.[1];

    if (value) {
      return value.startsWith("#") ? value : `#${value}`;
    }
  }

  return undefined;
}

function pickRating(text: string) {
  const rating = text.match(/rating\s*:?\s*(\d[\d,.]*)/i)?.[1];
  return rating;
}

function pickEvents(text: string) {
  const events = text.match(/events?\s*:?\s*(\d[\d,.]*)/i)?.[1];
  return events ? `${events} events` : undefined;
}

export async function getCtftimeStats(): Promise<CtftimeStats> {
  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        "User-Agent": "martin-rozariyo-portfolio"
      },
      cache: "force-cache"
    });

    if (!response.ok) {
      throw new Error("CTFtime profile unavailable");
    }

    const text = cleanText(await response.text());

    return {
      profileUrl: PROFILE_URL,
      globalRank: pickStat(text, ["global rating place", "rating place", "place"]),
      countryRank: pickStat(text, ["country place", "country rating place"]),
      rating: pickRating(text),
      events: pickEvents(text),
      status: "live"
    };
  } catch {
    return {
      profileUrl: PROFILE_URL,
      status: "fallback"
    };
  }
}
