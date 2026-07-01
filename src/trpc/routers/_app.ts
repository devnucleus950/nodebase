import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({

  testAI : protectedProcedure.mutation( async () => {


    await inngest.send({
      name: "execute/ai"
    })

    return { succes: true, message: "Job queued"}
  }),


  getWorkflows: protectedProcedure.query(() => {

      return prisma.workflow.findMany() ;
    }),
  createWorkflow: protectedProcedure.mutation( async () => {

    await inngest.send({
      name : "test/hello.world",
      data: {
        email: "aditya@gmail.com"
      }
    })


    return prisma.workflow.create({
      data: {
        name: "test-workflow"
      }
    })
  })
});


// export type definition of API
export type AppRouter = typeof appRouter;