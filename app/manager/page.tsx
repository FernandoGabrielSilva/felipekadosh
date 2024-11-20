import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { table } from "console";
import { ChevronDown } from "lucide-react";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Manager",
  description: "Generated by create next app",
};

const Manager = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <main>
      <header>
        <div>
          <UserButton />
        </div>
      </header>
      <div className="flex flex-col items-center w-dvw h-dvh">
        <div className="flex items-center py-4 w-[90%]">
          <Input placeholder="Filter name..." />
          <DropdownMenu>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
};

export default Manager;