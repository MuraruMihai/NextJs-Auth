"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


export default function TopNav(){
    const { data, status } = useSession();
    console.table({data, status}) ;

    return (
        <nav className="nav shadow p-2 justify-content-between mb-3 fixed-top">
            <Link href="/" className="nav-link">NextAuth</Link>

            { status === "authenticated" ? (
                <div className="d-flex">
                    <Link className="nav-link" href="/dashboard/user">
                        { data?.user?.name }
                    </Link>
                    <a className="nav-link pointer" onClick={() => signOut({callbackUrl: '/login'})}>Log Out</a>
                </div>
            ) : (
                <div className="d-flex">
                    <Link className="nav-link" href="/login">Login</Link>
                    <Link className="nav-link" href="/register">Register</Link>
                </div>
            ) } 

        </nav>
    )
}