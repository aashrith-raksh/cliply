import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeader from "./AuthHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";

import { z } from "zod";
import { signInWithEmail } from "@/lib/supabase/auth-utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { AuthError } from "@supabase/supabase-js";
import { useGlobalContext } from "@/store/global-state";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {setUser} = useGlobalContext();

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const data = await signInWithEmail(formData.email, formData.password);

      // SAVE THE SESSION TO GLOBAL STATE
      setUser(data.user)

      const longLink = searchParams.get("createNew") ?? "";

      navigate(`/dashboard?createNew=${longLink}`);
    } catch (error) {
      console.log((error as AuthError).message);
      toast((error as AuthError).message)
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <AuthHeader />
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              {formState.isSubmitting ? <LoaderCircle /> : "Submit"}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
