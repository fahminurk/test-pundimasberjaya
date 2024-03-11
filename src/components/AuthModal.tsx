import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 6 characters" }),
});

const AuthModal = () => {
  const [type, setType] = useState<"Login" | "Register">("Login");
  const [show, setShow] = useState<boolean>(false);
  const { onAuthSuccess } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "Login") {
      const res = await api
        .get("/users", { params: { ...values } })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (res.length) {
        onAuthSuccess({ user: res[0] });
        return toast.success("Login success");
      } else {
        return toast.error("Invalid email or password");
      }
    } else if (type === "Register") {
      const checkEMail = await api
        .get("/users", {
          params: { email: values.email },
        })
        .then((res) => res.data.length ?? false)
        .catch((err) => console.log(err));
      console.log(checkEMail);

      if (checkEMail) {
        return toast.error("Email already exists");
      } else {
        await api.post("/users", values);
        toast.success("Register success");
        setType("Login");
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{type}</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
