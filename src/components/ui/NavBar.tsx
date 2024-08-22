"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { DashboardDrawer } from "./DashboardDrawer";
import { useState } from "react";
import { useLogoutUserMutation } from "@/redux/apiSlices/authApiSlice";
import LoadingToast from "./LoadingToast";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { logoutUser } from "@/redux/slices/authSlice";
import useTokenExpireCheck from "@/hooks/useTokenExpireCheck";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { token, name, email, photoUrl } = useAppSelector(
    (state) => state.auth
  );
  const [validity] = useTokenExpireCheck(String(token));
  console.log("validity", validity);
  const router = useRouter();
  const [logoutUserFunc, { isLoading }] = useLogoutUserMutation();
  const logOutUser = async () => {
    await logoutUserFunc(null);
    dispatch(logoutUser());
    window.localStorage.removeItem("token");
    router.push("/");
    router.refresh();
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
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={validity && photoUrl ? photoUrl : "/user-placeholder.png"}
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
                <Dropdown.Item onClick={() => setIsOpen(true)}>
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
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} href="/lost-items">
            Lost Items
          </Navbar.Link>
          <Navbar.Link as={Link} href="/report-lost-item">
            Report Lost
          </Navbar.Link>
          <Navbar.Link as={Link} href="/report-found-item">
            Report Found
          </Navbar.Link>
          {validity ? (
            <>
              <Navbar.Link onClick={() => setIsOpen(true)}>
                Dashboard
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link as={Link} href="/auth/login">
                Login
              </Navbar.Link>
              <Navbar.Link as={Link} href="/auth/register">
                Register
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <DashboardDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <LoadingToast isLoading={isLoading} />
    </>
  );
}
