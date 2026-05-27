
import { authClient } from "@/lib/auth-client"
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server";
import { LogoutBtn } from "./logout";

export default async function Home  () {

  await requireAuth();

  const data = await caller.getUsers()
  
  return (
    <div className=" p-5">
      Protected server component
      {JSON.stringify(data)}
      <LogoutBtn/>
    </div>
  )
}  


