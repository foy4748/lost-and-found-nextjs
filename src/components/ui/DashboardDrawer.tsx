"use client";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type TDashboardDrawerProp = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardDrawer({ isOpen, setIsOpen }: TDashboardDrawerProp) {
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} href="/dashboard/user/my-claims">
                      My Claims
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      href="/dashboard/user/my-items?isItemFound=0"
                    >
                      My Lost Items
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      href="/dashboard/user/my-items?isItemFound=1"
                    >
                      My Found Items
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-in">
                      Sign in
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-up">
                      Sign up
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/">
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item href="https://flowbite-react.com/">
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues">
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
