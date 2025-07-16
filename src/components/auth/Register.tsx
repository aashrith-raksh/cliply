import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signUpNewUser } from "@/lib/supabase/auth-utils";

// Zod schema
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  file: z
    .any()
    .refine((files) => {
      if (!files || files.length === 0) return true;

      // Must be FileList
      if (!(files instanceof FileList)) return false;

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
      ];

      return allowedTypes.includes(files[0].type);
    }, "Invalid file input")
    .transform((files) => files?.[0] ?? null),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate()

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signUpNewUser({ ...data });
      toast.success("Signed up successfully!");
      reset();
      navigate("/dashboard")
    } catch (error) {
      console.log("%cError", "style:color:red", (error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-card p-6 rounded-xl shadow-md"
    >
      <h1 className="text-xl font-bold text-center">Create an Account</h1>

      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="file">Profile Picture (optional)</Label>
        <Input id="file" type="file" accept="image/*" {...register("file")} />
        {errors.file && (
          <p className="text-sm text-red-500">
            {errors.file.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
