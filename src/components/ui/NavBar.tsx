"use client";

import { Avatar, Dropdown, Navbar, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { DashboardDrawer } from "./DashboardDrawer";
import { logoutUser as SliceLogoutUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import {
  useLogoutUserMutation,
  useRegisterUserMutation,
} from "@/redux/apiSlices/authApiSlice";
import LoadingToast from "./LoadingToast";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/useRedux";
import useTokenExpireCheck from "@/hooks/useTokenExpireCheck";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const { name, email, photoUrl } = useAppSelector((state) => state.auth);
  const { data: session } = useSession();
  const { name, email, photoUrl } = session?.user || ({} as User);
  const dispatch = useAppDispatch();
  const [, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [, { isLoading: isLogingIn }] = useLogoutUserMutation();
  const [validity] = useTokenExpireCheck();
  const router = useRouter();
  const [logoutUserFunc, { isLoading }] = useLogoutUserMutation();
  const pathname = usePathname();
  const logOutUser = async () => {
    dispatch(SliceLogoutUser());
    await logoutUserFunc(null);
    await signOut();
    window.localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand as={Link} href="/">
          <Image
            src="/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
            width={50}
            height={50}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Lost &amp; Found
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {isRegistering || isLogingIn ? (
            <Spinner></Spinner>
          ) : validity ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    validity && photoUrl ? photoUrl : "/user-placeholder.png"
                  }
                  rounded
                />
              }
            >
              {validity ? (
                <>
                  <Dropdown.Header>
                    <span className="block text-sm">{name}</span>
                    <span className="block truncate text-sm font-medium">
                      {email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    className={cn({
                      "text-cyan-700": pathname.includes("/dashboard"),
                    })}
                    onClick={() => setIsOpen(true)}
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={async () => await logOutUser()}>
                    Sign out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} href="/auth/login">
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} href="/auth/register">
                    Register
                  </Dropdown.Item>
                </>
              )}
            </Dropdown>
          ) : (
            <></>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={pathname == "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/lost-items"
            active={pathname == "/lost-items"}
          >
            Lost Items
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/report-lost-item"
            active={pathname == "/report-lost-item"}
          >
            Report Lost
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href="/report-found-item"
            active={pathname == "/report-found-item"}
          >
            Report Found
          </Navbar.Link>
          {validity ? (
            <>
              <Navbar.Link
                active={pathname.includes("/dashboard")}
                onClick={() => setIsOpen(true)}
              >
                Dashboard
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link
                as={Link}
                href="/auth/login"
                active={pathname == "/auth/login"}
              >
                Login
              </Navbar.Link>
              <Navbar.Link
                as={Link}
                href="/auth/register"
                active={pathname == "/auth/register"}
              >
                Register
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <DashboardDrawer
        isOpen={Boolean(isOpen && validity)}
        setIsOpen={setIsOpen}
      />
      <LoadingToast isLoading={isLoading || isRegistering || isLogingIn} />
    </>
  );
}
