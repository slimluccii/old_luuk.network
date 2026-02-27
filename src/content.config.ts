import type {
  FooterRecord,
  PageFragment,
  PagesQuery,
  PagesQueryVariables
} from "@generated/datocms";
import { defineCollection, z } from "astro:content";
import { executeQuery } from "@datocms/execute-query";
import query from "@datocms/pages.query.graphql";

const pages = defineCollection({
  loader: async () => {
    const { _site, allPages, footer } = await executeQuery<
      PagesQuery,
      PagesQueryVariables
      >(query);
    return allPages.map((page) => ({
      ...page,
      seo: [..._site.faviconMetaTags, ...page.seo],
      footer
    }));
  },
  schema: z.custom<PageFragment & { footer: FooterRecord }>()
});

export const collections = { pages };
