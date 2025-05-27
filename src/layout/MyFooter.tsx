import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

const MyFooter = () => {
  return (
    <Footer container className="bg-green-200 font-semibold dark:bg-slate-800">
      <FooterCopyright by="Yossi Tuchband" />
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
};
export default MyFooter;
