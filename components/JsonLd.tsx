import type { JsonLdObject } from "@/lib/seo";

/**
 * Renders one or more schema.org objects as <script type="application/ld+json">.
 * Pass an array to emit several blocks (e.g. an article plus its breadcrumbs).
 * "<" is escaped so text inside the data can never close the script tag.
 */
export default function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
