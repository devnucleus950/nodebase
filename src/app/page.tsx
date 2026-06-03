"use client"


import { authClient } from "@/lib/auth-client"
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server";
import { LogoutBtn } from "./logout";
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

export default  function Home  () {

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    // onSuccess: () => {
    //   queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
    // }
    onSuccess: () => {
      toast.success("Job queued")
    }
  }));
  
  
  return (
    <div className="flex flex-col gap-6 items-center p-5">
      <p>Protected server component</p>
      <div>{JSON.stringify(data)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow 
      </Button>
      <LogoutBtn/>
    </div>
  )
}  


