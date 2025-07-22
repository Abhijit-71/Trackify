
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup , FooterTitle } from "flowbite-react";

export function Component() {
  return (
     <Footer container className="rounded-none bg-transparent mt-10">
      <div className="w-full text-center rounded-none">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="text-white mb-3 mt-2 flex flex-row gap-2 text-3xl font-degular">
            <img src="https://flowbite.com/docs/images/logo.svg"></img>Pomo
          </div>
          <FooterLinkGroup className="gap-5">
            <FooterLink href="#" className="hover:underline">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Flowbite™" year={2022} className="mt-4" />
      </div>
    </Footer>
  );
}
