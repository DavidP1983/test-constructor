import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_PATHS = [
    '/builder',
    '/builder/completed',
    '/profile',
    '/create'
];

export function proxy(req: NextRequest) {
    const token = req.cookies.get('auth_token');
    const { pathname } = req.nextUrl;

    const isPrivate = PRIVATE_PATHS.some(
        path => pathname === path && pathname.startsWith(path)
    );


    if (isPrivate && !token) {
        const url = new URL('/', req.url);
        url.searchParams.set('auth', "required");
        return NextResponse.redirect(url);
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/builder/:path*',
        '/builder/completed',
        '/profile',
        '/create',
    ],
}