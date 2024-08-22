import {
  Footer as Foooter,
  FooterCopyright,
  //FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import Link from "next/link";
// import {
//   BsDribbble,
//   BsFacebook,
//   BsGithub,
//   BsInstagram,
//   BsTwitter,
// } from "react-icons/bs";

export default function Footer() {
  return (
    <Foooter bgDark className="rounded-none mt-16">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterTitle title="Contact Info" />
            <FooterLinkGroup col>
              <FooterLink href="mailto:test@test.com">
                Email: test@test.com
              </FooterLink>
              <FooterLink
                target="_blank"
                href="https://fb.com/faisal.rahman.4748"
              >
                Facebook
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/in/foy4748/">
                LinkedIn
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Pages" />
            <FooterLinkGroup col>
              <FooterLink as={Link} href="/auth/login">
                Login
              </FooterLink>
              <FooterLink as={Link} href="/auth/register">
                Register
              </FooterLink>
              <FooterLink as={Link} href="/lost-items">
                Lost Items
              </FooterLink>
              <FooterLink as={Link} href="/report-lost-item">
                Report Lost
              </FooterLink>
              <FooterLink as={Link} href="/report-found-item">
                Report Found
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="legal" />
            <FooterLinkGroup col>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Licensing</FooterLink>
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="download" />
            <FooterLinkGroup col>
              <FooterLink href="#">iOS</FooterLink>
              <FooterLink href="#">Android</FooterLink>
              <FooterLink href="#">Windows</FooterLink>
              <FooterLink href="#">MacOS</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="foy4748™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center"></div>
        </div>
      </div>
    </Foooter>
  );
}

// <FooterIcon href="#" icon={BsFacebook} />
// <FooterIcon href="#" icon={BsInstagram} />
// <FooterIcon href="#" icon={BsTwitter} />
// <FooterIcon href="#" icon={BsGithub} />
// <FooterIcon href="#" icon={BsDribbble} />
