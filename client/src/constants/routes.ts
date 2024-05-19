export const HOME = '/';
export const RECIPE = '/recipe/:id';
export const RECIPES = '/recipes';
export const EDIT_RECIPE = '/recipe/:recipe/edit';
export const CATEGORY = '/category/:category';
export const EDIT_CATEGORY = '/category/:category/edit';
export const CREATE_CATEGORY = '/category/new';
export const CATEGORIES = '/categories';
export const ABOUT = '/about';
export const ADMIN = '/admin';
export const CREATE_RECIPE = '/create-recipe';
export const LOGIN = '/login';
export const NOT_FOUND = '/not-found';

export function replaceRouteParams(
    route: string,
    keys: Record<string, string | number> = {},
    queryString: Record<string, string> = {}
): string {
    let newRoute = route;

    Object.entries(keys).forEach(([key, value]) => {
        newRoute = newRoute.replaceAll(`:${key}`, value.toString());
    });

    const params = new URLSearchParams(queryString).toString();
    if (params) {
        newRoute += '?' + params;
    }

    return newRoute;
}
