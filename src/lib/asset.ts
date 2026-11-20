/** Prefix a path to a file in public/ with the deploy base path (GitHub Pages serves under /Portfolio). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
