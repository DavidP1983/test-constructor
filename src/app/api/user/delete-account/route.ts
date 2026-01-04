import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    // !!! На будущее необходимо брать email /id из auth_token, клиент ничего не знает
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const users = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users?&email=${email}`);
    const res = await users.json();

    if (!users.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    if (!res.length) {
        return NextResponse.json(
            { message: 'Invalid Email, try again' },
            { status: 404 }
        )
    }

    const responseDelete = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${res[0].id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
    );

    if (!responseDelete.ok) {
        return NextResponse.json(
            { message: 'Request failed 404, try again' },
            { status: 404 }
        )
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.delete('auth_token');
    return response;
}

