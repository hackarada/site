export type NoteHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function noteHeadings(markdown: string): NoteHeading[] {
  const headings: NoteHeading[] = [];
  const seen = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      continue;
    }
    const depth = match[1] === "##" ? 2 : 3;
    const text = (match[2] ?? "").replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1");
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      depth,
    });
  }

  return headings;
}

export function headingId(headings: NoteHeading[], text: string): string | undefined {
  const normalized = text.replace(/\s+/g, " ").trim();
  return headings.find((heading) => heading.text === normalized)?.id;
}

export function headingOffsetClass(depth: 2 | 3): string {
  switch (depth) {
    case 2:
      return "";
    case 3:
      return "pl-4";
    default: {
      const _exhaustive: never = depth;
      return _exhaustive;
    }
  }
}
