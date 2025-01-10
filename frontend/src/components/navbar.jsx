'use client';

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AlignJustify, ChevronDown, LogOut } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useAuthContext } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NavbarComponent({ isAdmin = true }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, signInWithGoogle, signOutUser } = useAuthContext()

  const navItems = [
    { name: 'Events', href: '/events' },
  ]

  const adminRoutes = [
    { name: 'Event Management', href: '/admin/events' },
    { name: 'Member Management', href: '/admin/members' },
    { name: 'Content Management', href: '/admin/content' },
    { name: 'Recognition Program', href: '/admin/recognition' },
    { name: 'Settings', href: '/admin/settings' },
  ]

  const NavLinks = ({ items }) => (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-black hover:text-blue-600 transition-colors flex items-center h-16">
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    (<nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image width={32} height={32} src="/gdg-logo.png" alt="GDG Logo" />
              <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4">
              <NavLinks items={navItems} />
            </div>
          </div>

          {/* User Profile - Right */}
          <div className="hidden lg:flex items-center h-16">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-16 flex items-center">
                    <span className="text-black mr-2">{user.displayName}</span>
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                      <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOutUser}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={signInWithGoogle}
                variant="outline"
                className="flex items-center px-4 py-2 border rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-50">
                <GoogleIcon className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black">
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Open sidebar menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setIsSidebarOpen(false)}>
                      <Image width={32} height={32} src="/gdg-logo.png" alt="GDG Logo" />
                      <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4 p-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-black hover:text-blue-600 transition-colors"
                        onClick={() => setIsSidebarOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <Separator className="my-2" />
                        {adminRoutes.map((route) => (
                          <Link
                            key={route.name}
                            href={route.href}
                            className="text-black hover:text-blue-600 transition-colors"
                            onClick={() => setIsSidebarOpen(false)}>
                            {route.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-auto p-4 border-t border-gray-200">
                    {user ? (
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL} alt={user.displayName} />
                          <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-black">{user.displayName}</span>
                        <Button variant="ghost" size="sm" onClick={signOutUser}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={signInWithGoogle}
                        variant="outline"
                        className="w-full flex items-center justify-center px-4 py-2 border rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-50">
                        <GoogleIcon className="mr-2 h-5 w-5" />
                        Sign in with Google
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>)
  );
}