import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

function ExitSession() {
  const navigate = useNavigate();
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className="text-red-500 font-semibold px-4 rounded-md bg-red-500/30 transition-all cursor-pointer hover:bg-red-600 hover:text-white">
            Exit
          </Button>
        }
      />
      <AlertDialogContent size="sm" className="bg-slate-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you sure you want to exit?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Any unsaved progress will be lost. You will be redirected back to
            your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-slate-900 border-t border-slate-800/80">
          <AlertDialogCancel className="bg-slate-800/80 hover:bg-slate-700 border-none hover:text-white text-white py-3 px-4 text-sm rounded-sm active:scale-95  cursor-pointer transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => navigate("/dashboard")}
            className="bg-red-500 border-none hover:bg-red-600 text-white py-3 px-4 text-sm rounded-sm active:scale-95  cursor-pointer transition-all"
          >
            Yes, Exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ExitSession;
