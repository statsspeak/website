/**
 * Single source of truth for the site's pages.
 *
 * Anywhere we navigate or render a page label (navigation menu, footer
 * sitemap, App router) reads from here so the set stays in lockstep.
 */

export const PAGES = [
  { id: "home",         label: "Home" },
  { id: "services",     label: "Services" },
  { id: "case-studies", label: "Work" },
  { id: "about",        label: "About" },
  { id: "contact",      label: "Contact" },
] as const;

export type Page = (typeof PAGES)[number]["id"];

export type PageChangeHandler = (page: Page) => void;

/** Pages shown in the footer sitemap (everything except Home, which is the brand link). */
export const FOOTER_PAGES = PAGES.filter((p) => p.id !== "home");
