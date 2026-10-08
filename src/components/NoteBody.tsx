import { isValidElement, type ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { headingId, type NoteHeading } from "@/lib/noteHeadings";

function isExternal(href: string | undefined): boolean {
  return href !== undefined && /^https?:\/\//.test(href);
}

function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => headingText(child as ReactNode)).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return headingText(children.props.children);
  }
  return "";
}

function headingComponents(headings: NoteHeading[]): Components {
  return {
    h2: ({ children }) => (
      <h2
        id={headingId(headings, headingText(children))}
        className="mt-14 scroll-mt-20 font-display text-3xl font-bold tracking-tight text-silver"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={headingId(headings, headingText(children))}
        className="mt-10 scroll-mt-20 font-display text-xl font-bold text-silver"
      >
        {children}
      </h3>
    ),
  p: ({ children }) => (
    <p className="mt-4 text-[1.05rem] leading-relaxed text-mist">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-mist marker:text-phosphor">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-mist marker:text-tungsten">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed [&>p]:mt-2">{children}</li>,
  strong: ({ children }) => <strong className="font-medium text-silver">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}
      className="break-words text-phosphor underline decoration-phosphor/35 underline-offset-[3px] transition hover:decoration-phosphor"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l border-phosphor/40 pl-4 text-mist">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mt-4 overflow-x-auto border border-line bg-panel p-4 font-mono text-sm text-silver">
      {children}
    </pre>
  ),
    code: ({ children, className }) => {
      if (className) {
        return <code className={className}>{children}</code>;
      }
      return <code className="font-mono text-[0.92em] text-silver">{children}</code>;
    },
  };
}

type NoteBodyProps = {
  body: string;
  headings: NoteHeading[];
};

export function NoteBody({ body, headings }: NoteBodyProps) {
  return (
    <div className="[&>p:first-child]:mt-0 [&>h2:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents(headings)}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
