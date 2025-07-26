import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
//import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";

const Logo = () => {
  return (
    <div className="flex gap-[5px]">
      <img src="/favicon.svg" alt="Logo" width="30" height="30"></img>
      <h1 className="text-white font-degular text-[20px]">Trackify</h1>
    </div>
  );
};

const NavigationSheet = () => {
  return (
    <Sheet className="text-white">
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-8 bg-[#535353]">
        <Logo />{" "}
        <NavMenu orientation="vertical" className="mt-10 flex items-start" />
      </SheetContent>
    </Sheet>
  );
};

const NavMenu = (NavigationMenuProps) => (
  <NavigationMenu {...NavigationMenuProps}>
    <NavigationMenuList className="text-white gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a href="#">Home</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a href="#">Blog</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a href="#">About</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a href="#">Contact Us</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const Navbar = () => {
  return (
    <div className="bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 backdrop-blur-xl backdrop-saturate-100 bg-white/10 border border-white/70 border-opacity-40 dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex rounded-full">
              <a href="/login">Sign In</a>
            </Button>
            <Button className="rounded-full">
              <a href="/register">Get Started</a>
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
