import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {  UserPlus, } from "lucide-react"


const InviteWorkspaceMember = () => {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Invite</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Invite Team Members</DialogTitle>
                <DialogDescription>Invite new members to collaborate in this workspace.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="emails">Email Addresses</Label>
                    <Textarea
                        id="emails"
                        placeholder="Enter email addresses separated by commas"
                        className="min-h-[100px]"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="member">
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea id="message" placeholder="Add a personal message to the invitation" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Send Invitations</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
};

export default InviteWorkspaceMember;