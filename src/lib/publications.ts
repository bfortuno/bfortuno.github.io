import { parse } from '@retorquere/bibtex-parser';
import bibSource from '../data/publications.bib?raw';

export interface PublicationEntry {
  key: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  tags: string[];
  pdf?: string;
  doi?: string;
  code?: string;
  thumbnail?: string;
  featured: boolean;
  projectPage?: string;
}

function formatAuthors(author: unknown): string {
  if (!Array.isArray(author)) return '';
  return author
    .map((a) => {
      if (a && typeof a === 'object' && ('firstName' in a || 'lastName' in a)) {
        const { firstName, lastName } = a as { firstName?: string; lastName?: string };
        return [firstName, lastName].filter(Boolean).join(' ');
      }
      return String(a);
    })
    .join(', ');
}

function parseTags(tags: unknown): string[] {
  if (typeof tags !== 'string') return [];
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

// sentenceCase: false preserves each title's original casing (author-supplied),
// rather than the parser's default of converting to sentence case.
const { entries, errors } = parse(bibSource, { sentenceCase: false });

if (errors.length > 0) {
  throw new Error(`Failed to parse src/data/publications.bib: ${JSON.stringify(errors)}`);
}

export const publications: PublicationEntry[] = entries.map((entry) => {
  const fields = entry.fields;
  return {
    key: entry.key,
    title: asString(fields.title) ?? '',
    authors: formatAuthors(fields.author),
    venue: asString(fields.journal) ?? asString(fields.booktitle) ?? asString(fields.publisher) ?? '',
    year: asString(fields.year) ?? '',
    tags: parseTags(fields.tags),
    pdf: asString(fields.pdf),
    doi: asString(fields.doi),
    code: asString(fields.code),
    thumbnail: asString(fields.thumbnail),
    featured: fields.featured === 'true' || fields.featured === true,
    // Only set this in the data file once the referenced /projects/<slug>
    // route actually exists (built in change 4) - PublicationCard renders a
    // link whenever this is present, with no existence check of its own.
    projectPage: asString(fields.projectpage),
  };
});

export const allTags: string[] = [...new Set(publications.flatMap((pub) => pub.tags))].sort();
