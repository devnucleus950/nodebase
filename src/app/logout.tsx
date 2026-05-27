"use client";

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"


export const LogoutBtn = () => {
    return (
        <Button onClick={() => authClient.signOut()}>
            LogOut
        </Button>
    )
}