/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export async function PATCH(req: Request) {
    const { email, password } = await req.json();

    const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users?email=${email}`)
    const users = await usersRes.json();
    if (!usersRes.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    const user = users.find((u: any) => u.email === email && u.password === password)
    if (!user) {
        return NextResponse.json(
            { message: 'Invalid email or password' },
            { status: 404 }
        )
    }

    // PATCH
    const date = format(new Date(new Date()), "yyyy-MM-dd");
    const data = {
        lastLogin: users[0].lastActivity ?? null,
        lastActivity: date,
    }
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${users[0].id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!result.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    const parseUser = await result.json();

    const token = uuidv4();
    const response = NextResponse.json(parseUser);
    response.cookies.set('auth_token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return response

}

