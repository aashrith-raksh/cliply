import { useRef, useState } from "react";
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
import { QRCodeCanvas } from "qrcode.react";
import VerticalLine from "../VerticalLine";
import { useSearchParams } from "react-router-dom";
// ✅ Schema
const formSchema = z.object({
  longUrl: z.string().url({ message: "Enter a valid URL" }),
  customUrl: z.string().optional(),
  title: z.string().min(1, "Title is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol == "http:" || u.protocol == "https:";
  } catch (error) {
    console.log((error as Error).message);
  }
};

async function generateFileFromCanvas(canvas:HTMLCanvasElement) {
  const blob = await new Promise<Blob>((resolve, reject) => {
      if (!canvas) return reject("Canvas not found");

      canvas.toBlob((blob) => {
        if (!blob) return reject("Failed to convert canvas to blob");
        resolve(blob);
      }, "image/png");
    });

    const imageFile = new File([blob], "qr.png", { type: "image/png" });

    return imageFile
}

export default function CreateLinkForm() {
  const [searchParams] = useSearchParams()
  const openForm = !!searchParams.has("createNew")
  const initialLongUrl = searchParams.get("createNew")
  const [open, setOpen] = useState(openForm);

  const { user } = useGlobalContext();
  const { fetchAllUrls } = useDashboardContext();
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: initialLongUrl ?? "",
      customUrl: "",
      title: "",
    },
  });

  const longUrl = form.watch("longUrl");

  async function handleFormSubmit(data: FormSchema) {
    const canvas = qrRef.current;

    const qrFile = await generateFileFromCanvas(canvas!)
    
    try {
      await insertUrl(
        {
          longUrl: data.longUrl,
          title: data.title,
          userId: user!.id,
          customUrl: data.customUrl,
        },
        qrFile
      );
    } catch (error) {
      console.log((error as Error).message);
      toast((error as Error).message);
    }
    fetchAllUrls();
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add New URL</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Add a new URL</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4 flex-1 max-w-7/12"
            >
              <FormField
                control={form.control}
                name="longUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                        className="text-sm select:bg-foreground/50"
                      />
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
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="cursor-pointer"
              >
                Submit
              </Button>
            </form>
          </Form>

          <VerticalLine />
          <DialogFooter className="flex items-center justify-center bg-muted/30 rounded-md max-w-4/12 p-4">
            {isValidUrl(longUrl) ? (
              <QRCodeCanvas
                value={longUrl}
                size={128}
                level="H"
                className="p-2 bg-white rounded-sm"
                ref={qrRef}
              />
            ) : (
              <p className="text-sm text-center text-foreground/70">
                Enter a valid URL to generate a QR code
              </p>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
