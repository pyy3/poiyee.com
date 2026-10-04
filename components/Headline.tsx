import { PortableText, type PortableTextBlock } from '@portabletext/react';

/* Renders a Sanity "headline": one or more lines where bold words get the
   given emphasis class. Line breaks typed with Shift+Enter are kept. */
export function Headline({
  value,
  emphasis,
}: {
  value?: PortableTextBlock[];
  emphasis: string;
}) {
  if (!value) return null;
  return (
    <PortableText
      value={value}
      components={{
        block: { normal: ({ children }) => <span className="block whitespace-pre-line">{children}</span> },
        marks: { strong: ({ children }) => <span className={emphasis}>{children}</span> },
      }}
    />
  );
}

/* Long-form text (bio, painting statement) as plain paragraphs. */
export function Prose({ value, className }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value) return null;
  return (
    <PortableText
      value={value}
      components={{ block: { normal: ({ children }) => <p className={className}>{children}</p> } }}
    />
  );
}
