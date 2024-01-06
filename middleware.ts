import { withAuth } from 'next-auth/middleware';

export const publicPaths = new Set(['/', '/login', '/register']);

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
