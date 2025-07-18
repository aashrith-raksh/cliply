import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { deleteUrl } from "@/lib/supabase/url-utils";
import { useDashboardContext } from "@/store/dashboard-state";
import { Button } from "../ui/button";

const DeleteLink = ({urlId}:{urlId:number}) => {
  const { fetchAllUrls } = useDashboardContext();

  async function handleDeleteLink(id: number) {
    try {
      await deleteUrl(id);
      fetchAllUrls();
    } catch (error) {
      console.log((error as Error).message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"ghost"}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteLink(urlId)}
            className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLink;
