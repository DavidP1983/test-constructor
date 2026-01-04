import { format } from "date-fns";
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    const date = format(new Date(new Date()), "yyyy-MM-dd");
    const data = {
        id: uuidv4(),
        name,
        email,
        password,
        role: 'User',
        joined: date,
        notifications: false,
        lastActivity: date
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    );

    if (!res.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    const users = await res.json();
    const token = uuidv4();
    const response = NextResponse.json(users);
    response.cookies.set('auth_token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return response
}