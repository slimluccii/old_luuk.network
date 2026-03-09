import { pagesLoader } from "@datocms/pages-loader";
import type { PageFragment, PagesQuery, SiteLocale } from "@generated/datocms";
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  loader: pagesLoader(),
  schema: z.object({
    _locale: z.custom<SiteLocale>(),
    _site: z.custom<PagesQuery['_site']>(),
    page: z.custom<PageFragment>(),
    footer: z.custom<PagesQuery['footer']>(),
    menu: z.custom<PagesQuery['menu']>(),
  })
});

export const collections = { pages };
