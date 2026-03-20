import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { cookies, currentLocale, originPathname, redirect } = context;

  if (originPathname === "/") {
    const locale = cookies.get("locale")?.value;
    const target = locale ?? context.preferredLocale;
    if (target) {
      return redirect(`/${target}/`, 302);
    }
  } else if (currentLocale) {
    cookies.set("locale", currentLocale, { path: "/" });
  }

  return next();
});
