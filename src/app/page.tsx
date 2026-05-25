import { getQueryClient, trpc } from "@/trpc/server";

import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home () {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>laoding...</p>}>
       <Client/>
      </Suspense>
    </HydrationBoundary>
  </div>
}  


// for "use client" but this has a latency


// import { caller } from "@/trpc/server";
// import { useQuery } from "@tanstack/react-query";

// const Page =  () => {
//   const trpc = useTRPC();

//   const {data:users} = useQuery(trpc.getUsers.queryOptions());


//   return <div>
//     {JSON.stringify(users)}
//   </div>
// }

// export default Page;