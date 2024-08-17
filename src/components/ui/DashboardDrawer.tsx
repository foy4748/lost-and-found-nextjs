"use client";

import useTokenExpireCheck from "@/hooks/useTokenExpireCheck";
import { useAppSelector } from "@/redux/useRedux";
import { Drawer, Sidebar, TextInput } from "flowbite-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type TDashboardDrawerProp = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardDrawer({ isOpen, setIsOpen }: TDashboardDrawerProp) {
  const handleClose = () => setIsOpen(false);
  const { isAdmin, token } = useAppSelector((state) => state.auth);
  const [validity] = useTokenExpireCheck(String(token));

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Drawer.Header title="Dashboard" titleIcon={() => <></>} />
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      onClick={handleClose}
                      as={Link}
                      href="/dashboard/user/my-claims"
                    >
                      My Claims
                    </Sidebar.Item>
                    <Sidebar.Item
                      onClick={handleClose}
                      as={Link}
                      href="/dashboard/user/my-items?isItemFound=0"
                    >
                      My Lost Items
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      onClick={handleClose}
                      href="/dashboard/user/my-items?isItemFound=1"
                    >
                      My Found Items
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Drawer.Header
                    title="Personal"
                    className="mt-8"
                    titleIcon={() => <></>}
                  />
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      as={Link}
                      onClick={handleClose}
                      href="/dashboard/user/profile"
                    >
                      Profile
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      onClick={handleClose}
                      href="/dashboard/user/change-password"
                    >
                      Change Password
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  {validity && isAdmin ? (
                    <>
                      <Drawer.Header
                        title="Admin"
                        className="mt-8"
                        titleIcon={() => <></>}
                      />
                      <Sidebar.ItemGroup>
                        <Sidebar.Item
                          as={Link}
                          onClick={handleClose}
                          href="/dashboard/admin/users"
                        >
                          Users
                        </Sidebar.Item>
                        <Sidebar.Item
                          as={Link}
                          onClick={handleClose}
                          href="/dashboard/admin/analytics"
                        >
                          Analytics
                        </Sidebar.Item>
                      </Sidebar.ItemGroup>
                    </>
                  ) : (
                    <></>
                  )}
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
