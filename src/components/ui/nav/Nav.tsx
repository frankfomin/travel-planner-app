import { ModeToggle } from "@/components/ui/theme-toggle";
import NavDropDown from "./NavDropDown";
import Link from "next/link";
import { Icons } from "../icons";

export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between px-5 py-3 border-b-2 ">
      <div className="flex items-center gap-px">
        <Link className="font-bold" href="/">
          Venturevista
        </Link>
        <Icons.compass className="w-5 h-5" />
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
{/*         <NavDropDown />
 */}      </div>
    </nav>
  );
}
