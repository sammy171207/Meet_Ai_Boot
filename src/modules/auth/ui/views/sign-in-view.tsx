'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { set } from "date-fns"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const SignInView = () => {
    
    const router=useRouter ();
    const [error,setError]=useState<string | null>(null);
    const [pending,setPending]=useState<boolean>(false);
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
            
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        const {error}=await authClient.signIn.email({
            email:data.email,
            password:data.password
        },{
            onSuccess: (data) => {
                console.log(data)
                router.push("/")
            }
            ,
            onError: ({error}) => {
                console.log(error)
                setPending(false);
                setError(error.message)
            }
        },
    );
       

    }

    return (
        <div className="flex flex-col gap-6">
            <Card className=" p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="flex-2xl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Email"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                    <FormField control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Password"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>
                                {error&&(<Alert
                                className="bg-destructive/10 border-none ">
                                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>)}
                                <Button
                                disabled={pending}
                                  type="submit"
                                  className="w-full">
                                    Sign In
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0  after:top-1/2 
                                after:z-0 after:flex after:items-center after:border-t">
                                    <span>
                                        Or continue with 
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 ">
                                    <Button
                                      className="w-full"
                                      variant="outline"
                                      type="button"
                                      >
                                        Google
                                    </Button>
                                      <Button
                                      className="w-full"
                                      variant="outline"
                                      type="button"
                                      >
                                        Github
                                    </Button>
                
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account? <Link href="/sign-up" className="font-semibold text-primary hover:underline">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white">Meet Ai</p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By Clicking continue you agree to our <Link href="/terms" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>
            </div>
        </div>

    )
}
