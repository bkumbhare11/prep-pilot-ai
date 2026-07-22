import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { useState } from "react";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button className="m-2" size="lg">
              <GiHamburgerMenu />
            </Button>
          }
        />
        <SheetContent
          side="left"
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] bg-slate-950"
        >
          <Sidebar closeSheet={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HamburgerMenu;
