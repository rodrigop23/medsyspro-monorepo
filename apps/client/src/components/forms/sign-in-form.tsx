"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "../icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, LoginUserType } from "@/lib/zod-schemas/user-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUserAction } from "@/actions/user.action";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

export default function SignInForm() {
  const [genericError, setGenericError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: LoginUserType) => {
    try {
      const result = await loginUserAction(data);

      if (result.email) {
        return form.setError("email", {
          type: "manual",
          message: result.message,
        });
      }

      if (result.password) {
        return form.setError("password", {
          type: "manual",
          message: result.message,
        });
      }

      if (!result.ok) {
        return setGenericError(result.message);
      }

      router.push("/citas");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setGenericError(error.message);
    }
  };

  return (
    <Card className="w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden shadow-xl dark:bg-gray-800">
      <div className="hidden sm:block lg:w-1/2 bg-teal-600 dark:bg-teal-800">
        {/* TODO: Add image */}
        <Image
          src=""
          alt="Clinic"
          width={256}
          height={256}
          className="w-full h-64 lg:h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col">
        <CardHeader className="space-y-1 px-0">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center dark:text-white">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            Ingrese sus credenciales para acceder al sistema de la clínica
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex flex-col"
            >
              <fieldset
                className="flex-1 flex flex-col gap-4"
                disabled={isSubmitting}
              >
                <div className="flex-1 flex flex-col gap-3">
                  <div className="grid gap-3 md:gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="off" type="email" />
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
                          <div className="flex items-center">
                            <FormLabel>Contraseña</FormLabel>
                            <Link
                              href="forgot-password"
                              className="ml-auto inline-block text-sm underline"
                            >
                              Olvidaste tu contraseña?
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="off"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Recordar mi cuenta
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {genericError && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {genericError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting && <Icons.spinner className="animate-spin" />}
                  Iniciar Sesión
                </Button>

                <div className="mt-2 text-center text-sm">
                  No tienes una cuenta?{" "}
                  <Link href="sign-up" className="underline">
                    Regístrate
                  </Link>
                </div>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </div>
    </Card>
    // <Card className="w-[400px] sm:w-[500px]">
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
    //     <CardDescription>
    //       Ingresa tus datos para acceder a tu cuenta
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)}>
    //         <fieldset className="grid gap-4" disabled={isSubmitting}>
    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Correo electrónico</FormLabel>
    //                 <FormControl>
    //                   <Input {...field} type="email" autoComplete="off" />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <FormItem>
    // <div className="flex items-center">
    //   <FormLabel>Contraseña</FormLabel>
    //   <Link
    //     href="forgot-password"
    //     className="ml-auto inline-block text-sm underline"
    //   >
    //     Olvidaste tu contraseña?
    //   </Link>
    // </div>
    //                 <FormControl>
    //                   <Input {...field} type="password" autoComplete="off" />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    // {genericError && (
    //   <p className="text-[0.8rem] font-medium text-destructive">
    //     {genericError}
    //   </p>
    // )}

    //           <Button type="submit" className="w-full">
    //             {isSubmitting && <Icons.spinner className="animate-spin" />}
    //             Iniciar Sesión
    //           </Button>
    //         </fieldset>
    // <div className="mt-4 text-center text-sm">
    //   No tienes una cuenta?{" "}
    //   <Link href="sign-up" className="underline">
    //     Regístrate
    //   </Link>
    // </div>
    //       </form>
    //     </Form>
    //   </CardContent>
    // </Card>
  );
}
