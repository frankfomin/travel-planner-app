import { ModeToggle } from "@/components/ui/theme-toggle";
import NavDropDown from "./NavDropDown";


export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between px-5 py-3 border-b-2 ">
      <div className="flex items-center gap-px">
        <span>Venturevista</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.24 7.75977L14.12 14.1198L7.76001 16.2398L9.88001 9.87977L16.24 7.75977Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <NavDropDown />
      </div>
    </nav>
  );
}
