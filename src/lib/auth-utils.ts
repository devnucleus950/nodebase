import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation"



export const requireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) {
        redirect("/login");
    }

    return session;
};  

export const requireUnauth = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(session) {
        redirect("/") //redirect to dashboard/workflows if   already logged in 
    }
}