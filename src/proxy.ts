import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_PATHS = [
    '/builder',
    '/builder/completed',
    '/profile',
    '/create'
];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isPrivate = PRIVATE_PATHS.some(
        path => pathname.startsWith(path)
    );

    if (!isPrivate) return NextResponse.next();
    const refreshToken = req.cookies.get('refreshToken')?.value;
    console.log("PROXY", refreshToken);
    if (!refreshToken) {
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