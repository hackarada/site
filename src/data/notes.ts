export type Note = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  body: string;
};

const files = import.meta.glob("../content/notes/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(block: string): Record<string, string> {
  const meta: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return meta;
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function parseNote(path: string, raw: string): Note {
  const slug = slugFromPath(path);
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${slug}`);
  }
  const meta = parseFrontmatter(match[1] ?? "");
  const title = meta.title;
  const date = meta.date;
  const dek = meta.dek;
  if (!title || !date || !dek) {
    throw new Error(`Note ${slug} needs title, date, and dek`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Note ${slug} date must be YYYY-MM-DD`);
  }
  return {
    slug,
    title,
    date,
    dek,
    body: (match[2] ?? "").trim(),
  };
}

export const notes: Note[] = Object.entries(files)
  .map(([path, raw]) => parseNote(path, raw))
  .sort((left, right) => {
    if (left.date === right.date) {
      return left.title.localeCompare(right.title);
    }
    return left.date < right.date ? 1 : -1;
  });

export function findNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

export function formatNoteDate(iso: string): string {
  const [year, month, day] = iso.split("-").map((part) => Number(part));
  if (!year || !month || !day) {
    return iso;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
