"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { registerSchema } from "../../../../../types";
type RegisterFormValues = z.infer<typeof registerSchema>

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

import Link from "next/link";
import { authClient } from "@/lib/auth-client";



export const RegisterForm = () => {

    const router = useRouter();
    
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword:""
        }
    })

    const onSubmit = async (values: RegisterFormValues) => {
        
        await authClient.signUp.email({
            name: values.email,
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
                        Get Started 
                    </CardTitle>
                    <CardDescription>
                        Create an account to get started
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
                                        <Image alt="GitHub" src="/logos/github.svg" width={20} height={20}/>
                                        Continue with GitHub
                                    </Button>
                                    <Button 
                                    variant="outline"
                                    type="button"
                                    disabled={isPending}
                                    className="w-full"
                                    >
                                        <Image alt="GitHub" src="/logos/google.svg" width={20} height={20}/>
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

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
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
                                        Sign Up
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Already have an account? {" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Sign in
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