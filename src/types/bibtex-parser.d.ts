// @retorquere/bibtex-parser ships no type declarations despite package.json
// claiming an export map entry for them (dist/types is absent from the
// published package as of 10.0.0) - declaring the narrow shape we use.
declare module '@retorquere/bibtex-parser' {
  export interface BibTeXEntry {
    type: string;
    key: string;
    fields: Record<string, unknown>;
  }

  export interface BibTeXParseResult {
    errors: unknown[];
    entries: BibTeXEntry[];
  }

  export function parse(
    input: string,
    options?: { sentenceCase?: boolean }
  ): BibTeXParseResult;
}
