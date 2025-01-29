import {Client } from '@/models/customer';
import { dbConection } from '@/lib/db'; // Adjust the path based on your file structure
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConection();
    try {
        const clients = await Client.find();
        return NextResponse.json(clients);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching clients' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConection();
    try {
        const { status, name, lences, frame, code, price, phone,totalPrice,remainPrice } = await req.json();
        
        const newClient = await Client.create({
            name,
            lences,
            frame,
            code,
            price,
            phone,
            status,
            totalPrice,
            remainPrice,
        });
        
        return new NextResponse(JSON.stringify(newClient), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Error creating client' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
