import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({time: new Date().toLocaleString()})
}
// 3mrw4fzpFHZmF1DS
// mongodb+srv://mihaimtz007:3mrw4fzpFHZmF1DS@cluster0.aadow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0