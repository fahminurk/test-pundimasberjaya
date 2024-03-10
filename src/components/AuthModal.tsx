import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 6 characters" }),
});

const AuthModal = () => {
  const [type, setType] = useState<"Login" | "Register">("Login");
  const [show, setShow] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "Login") {
      console.log("Login", values);
    } else {
      console.log("Register", values);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Login</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold">
            {type}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {type === "Register" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder=" " {...field} />
                        </FormControl>
                        <FormLabel>Name</FormLabel>
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
                      <FormControl>
                        <Input type="email" placeholder=" " {...field} />
                      </FormControl>
                      <FormLabel>Email</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={show ? "text" : "password"}
                          placeholder=" "
                          {...field}
                        />
                      </FormControl>
                      <Button
                        onClick={() => setShow(!show)}
                        type="button"
                        className={
                          (cn(""),
                          form.formState.errors.password
                            ? "top-2 absolute right-3"
                            : "absolute right-3 top-1/2 -translate-y-1/2")
                        }
                      >
                        {show ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Button>
                      <FormLabel>Password</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {type}
                </Button>
              </form>
            </Form>

            {type === "Login" ? (
              <p className="text-center mt-2">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => setType("Register")}
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-center mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => setType("Login")}
                >
                  Login
                </button>
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;
