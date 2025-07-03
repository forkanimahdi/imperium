import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const WorkspaceSetting = ({ workspace, integrations }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Workspace Settings</DialogTitle>
                    <DialogDescription>Manage your workspace settings and integrations</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="general" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="integrations">Integrations</TabsTrigger>
                        <TabsTrigger value="danger">Danger Zone</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4 mt-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="workspace-name">Workspace Name</Label>
                                <Input id="workspace-name" defaultValue={workspace.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="workspace-description">Description</Label>
                                <Textarea id="workspace-description" defaultValue={workspace.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Visibility</Label>
                                <RadioGroup defaultValue="private">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="private" id="private" />
                                        <Label htmlFor="private">Private - Only visible to invited members</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="public" id="public" />
                                        <Label htmlFor="public">Public - Visible to all team members</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </TabsContent>

                    <TabsContent value="integrations" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            {integrations.map((integration) => (
                                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-md ${integration.color} text-white`}
                                        >
                                            <integration.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{integration.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {integration.connected ? integration.details : "Not connected"}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant={integration.connected ? "outline" : "default"}>
                                        {integration.connected ? "Disconnect" : "Connect"}
                                    </Button>
                                </div>
                            ))}

                            <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Add New Integration</p>
                                        <p className="text-sm text-muted-foreground">Connect with other tools and services</p>
                                    </div>
                                </div>
                                <Button>Connect</Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="danger" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                <h3 className="font-medium text-destructive mb-2">Archive Workspace</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Archiving will hide this workspace from active views but preserve all data.
                                </p>
                                <Button variant="outline" className="border-destructive/50 text-destructive">
                                    Archive Workspace
                                </Button>
                            </div>

                            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                <h3 className="font-medium text-destructive mb-2">Delete Workspace</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This action cannot be undone. All data will be permanently deleted.
                                </p>
                                <Button variant="destructive">Delete Workspace</Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceSetting;