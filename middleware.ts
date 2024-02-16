import { withAuth } from 'next-auth/middleware';

export const publicPaths = new Set([
    '/',
    '/login',
    '/register',
    '/logo.png',
    '/api/external/get-flag',
]);

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default withAuth(function middleware(req) {}, {
    callbacks: {
        authorized: ({ req, token }) => {
            if (!publicPaths.has(req.nextUrl.pathname) && token === null) {
                return false;
            }
            return true;
        },
    },
});
