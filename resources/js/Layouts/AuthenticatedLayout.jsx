import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-muted/40">
            <nav className="border-b border-border bg-card">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-foreground" />
                                </Link>
                            </div>

                            <div className="hidden gap-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button variant="ghost" size="sm" className="gap-1.5">
                                        {user.name}
                                        <ChevronDownIcon className="size-4" />
                                    </Button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Toggle navigation"
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                            >
                                {showingNavigationDropdown ? (
                                    <XIcon className="size-5" />
                                ) : (
                                    <MenuIcon className="size-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {showingNavigationDropdown && (
                    <div className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-border pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-foreground">
                                    {user.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-card shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
