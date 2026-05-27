"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { loginSchema } from "../../../../../types";
type LoginFormValues = z.infer<typeof loginSchema>

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import  { cn } from "@/lib/utils"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";



export const LoginForm = () => {

    const router = useRouter();
    
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: LoginFormValues) => {

        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        })

    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Login to Continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">

                                {/* two buttons */}
                                <div className="flex flex-col gap-6">
                                    <Button 
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    className="w-full"
                                    >
                                        Continue with GitHub
                                    </Button>
                                    <Button 
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    className="w-full"
                                    >
                                        Continue with Google
                                    </Button>
                                </div>

                                {/* email and password field */}
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="jhon@gmail.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="*****"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" disabled={isPending} className="w-full" >
                                        Login
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Don't have an account? {" "}
                                    <Link href="/signup" className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}