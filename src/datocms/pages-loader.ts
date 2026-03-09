import type {
  FooterRecord,
  PageFragment,
  PagesQuery,
  PagesQueryVariables,
  Site,
  SiteLocale
} from "@generated/datocms";
import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";
import { executeQuery } from "@datocms/execute-query";
import query from "@datocms/pages.query.graphql";
import { locales } from "@generated/datocms.json";

export function pagesLoader(): Loader {
  return {
    name: "pages",
    load: async ({ store, parseData }: LoaderContext): Promise<void> => {
      store.clear();

      const results = await Promise.all(
        (locales as SiteLocale[]).map((locale) =>
          executeQuery<PagesQuery, PagesQueryVariables>(query, { locale })
        )
      );

      const allPages = results.flatMap(({ allPages, ...rest }, index) => {
        const locale = locales[index];
        return allPages.map((page) => ({
          _locale: locale,
          page,
          ...rest
        }));
      });

      allPages.forEach(async ({ _locale, page, ...rest }) => {
        const id = `${_locale}/${page.slug}`;
        const parsedPage = await parseData({
          id,
          data: {
            _locale,
            page,
            ...rest
          }
        });
        store.set({ id, data: parsedPage });
      });
    },
    schema: z.object({
      _locale: z.custom<SiteLocale>(),
      _site: z.custom<PagesQuery['_site']>(),
      page: z.custom<PageFragment>(),
      footer: z.custom<PagesQuery['footer']>(),
      menu: z.custom<PagesQuery['menu']>(),
    })
  };
}
