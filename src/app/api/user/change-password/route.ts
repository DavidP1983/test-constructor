import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const { email, password } = await req.json();

    const users = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users?&email=${email}`);
    const res = await users.json();

    if (!res.length) {
        return NextResponse.json(
            { message: 'Invalid Email, try again' },
            { status: 404 }
        )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${res[0].id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    if (!response.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    return NextResponse.json({ ok: true })
}