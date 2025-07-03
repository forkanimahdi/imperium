"use client"
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';

import * as React from "react"
import { Filter, Grid, List, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"


const WorkspaceOverview = () => {
    const breadcrumbs = [{ title: 'Workspaces', href: '/workspaces', }];
    const { workspaces } = usePage().props

    
    
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [view, setView] = React.useState("card")


    const filteredWorkspaces = React.useMemo(() => {
        if (!search) return workspaces

        return workspaces.filter(
            (workspace) =>
                workspace.name.toLowerCase().includes(search.toLowerCase()) ||
                workspace.description.toLowerCase().includes(search.toLowerCase()),
        )
    }, [search , workspaces])


    console.log(filteredWorkspaces);
    function ToggleCreateModal() {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Workspace
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Create New Workspace</DialogTitle>
                        <DialogDescription>Fill in the details to create a new workspace for your team.</DialogDescription>
                    </DialogHeader>
                    <CreateWorkspaceForm onSuccess={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        )
    }



    return (
        <AppLayout actions={<ToggleCreateModal />} breadcrumbs={breadcrumbs}>
            <Head title="Workspaces" />
            <div className="flex min-h-screen flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">


                    <div className="flex items-center  justify-between">
                        {/* Filter view */}
                        <div className="ml-auto flex items-center space-x-2">
                            {
                                ["card", "table"].map((e, i) =>
                                    <div key={i}>
                                    
                                        <Button
                                            variant={view === e ? "default" : "outline"}
                                            size="sm"
                                            className="h-9 gap-1"
                                            onClick={() => { setView(e) }}
                                        >
                                            {e == "card" ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap capitalize">{e} View</span>
                                        </Button>

                                    </div>
                                )
                            }
                        </div>
                        {/* Empty */}
                        <div className="flex flex-1 items-center space-x-2">

                            {/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9 gap-1">
                                        <Filter className="h-4 w-4" />
                                        <span>Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>My Workspaces</DropdownMenuItem>
                                    <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                                    <DropdownMenuItem>Most Tasks</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                        {/* Search  */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search workspaces..."
                                className="h-9 w-full pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                    </div>

                    {view === "card" ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredWorkspaces.map((workspace , index) => (
                                <Link ky={index} href={`/workspaces/${workspace.id}`} key={workspace.id} className="group transition-all">
                                    <Card className="overflow-hidden h-full border shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <CardContent className="p-5">
                                            <div className="flex flex-col h-full">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold mb-1">{workspace.name}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">{workspace.description}</p>
                                                </div>

                                                <div className="mt-auto">
                                                    <div className="flex justify-between items-center text-sm mb-2">
                                                        <span className="text-muted-foreground">Progress</span>
                                                        {/* <span>{Math.round((workspace.tasks.completed / workspace.tasks.total) * 100)}%</span> */}
                                                    </div>
                                                    <Progress value={1 * 100} className="h-1" />

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex -space-x-2">
                                                            {/* {workspace.members.slice(0, 3).map((member, i) => (
                                                                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                                </Avatar>
                                                            ))}
                                                            {workspace.members.length > 3 && (
                                                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                                                                    +{workspace.members.length - 3}
                                                                </div>
                                                            )} */}
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">{workspace.updated_at}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead className="hidden md:table-cell">Members</TableHead>
                                        <TableHead className="hidden md:table-cell">Progress</TableHead>
                                        <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredWorkspaces.map((workspace) => (
                                        <TableRow className="" key={workspace.id}>
                                            <TableCell>
                                                <div className="flex items-center py-3 gap-2">
                                                    <div className="h-10 w-1 rounded-full bg-muted" />
                                                    <div>
                                                        <div className="font-medium">{workspace.name}</div>
                                                        <div className="hidden text-sm text-muted-foreground sm:block">{workspace.description}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{workspace.owner}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex -space-x-2">
                                                    {/* {workspace.members.slice(0, 3).map((member, i) => (
                                                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                                            <AvatarImage src={member.avatar} alt={member.name} />
                                                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                    {workspace.members.length > 3 && (
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                                                            +{workspace.members.length - 3}
                                                        </div>
                                                    )} */}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center gap-2">
                                                    {/* <Progress
                                                        value={(workspace.tasks.completed / workspace.tasks.total) * 100}
                                                        className="h-2 w-24"
                                                    />
                                                    <span className="text-xs font-medium">
                                                        {workspace.tasks.completed}/{workspace.tasks.total}
                                                    </span> */}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                                                {workspace.lastUpdated}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/workspaces/${workspace.id}`}>View</Link>
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">More options</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>Edit Workspace</DropdownMenuItem>
                                                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">Delete Workspace</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default WorkspaceOverview;