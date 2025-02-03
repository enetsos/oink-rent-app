"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuth } from "@/contexts/AuthContext"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertDestructive } from "@/components/alert-error"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).optional(),
})

export function ProfileForm({ type }: { type: 'login' | 'signup' }) {
  const { login, signup, loading, error } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  // Reset form values when type changes (login/signup)
  useEffect(() => {
    form.reset({
      email: "",
      password: "",
      username: type === "signup" ? "" : undefined, // Remove username from login form
    });
  }, [type, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === 'login') {
        await login(values.email, values.password);
        console.log('Login successful');
      } else {
        await signup(values.username ?? '', values.email, values.password);
        console.log('Signup successful');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type === 'signup' && (
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Signup'}
        </Button>
          {error && <AlertDestructive message={error} />}
      </form>
    </Form>
  );
}
