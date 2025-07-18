import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGlobalContext } from "@/store/global-state";
import { insertUrl } from "@/lib/supabase/url-utils";
import { toast } from "sonner";
import { useDashboardContext } from "@/store/dashboard-state";

// ✅ Schema
const formSchema = z.object({
  longUrl: z.string().url({ message: "Enter a valid URL" }),
  customUrl: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  qrFile: z.instanceof(File).refine((f) => f.size > 0, "QR file is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateLinkForm() {
  const [open, setOpen] = useState(false);
  const { user } = useGlobalContext();
    const { fetchAllUrls } = useDashboardContext();
  

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: "",
      customUrl: "",
      title: "",
      qrFile: undefined as any,
    },
  });

  async function handleFormSubmit(data: FormSchema) {
    try {
      await insertUrl(
        {
          longUrl: data.longUrl,
          title: data.title,
          userId: user!.id,
          customUrl: data.customUrl,
        },
        data.qrFile
      );
    } catch (error) {
      console.log((error as Error).message);
      toast((error as Error).message);
    }
    fetchAllUrls()
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New URL</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new URL</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom URL (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="custom-link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My link title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qrFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QR Code File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
