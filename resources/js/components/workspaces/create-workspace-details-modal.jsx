import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, FileUp, StickyNote, ListTodo, FolderOpen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"



const CreateWorkspaceDetailsModal = () => {
    const [createStep, setCreateStep] = useState(1)
    const [createType, setCreateType] = useState("")


    const resetCreateModal = () => {
        setCreateStep(1)
        setCreateType("")
    }



    const options = [
        { name: "task", icon: <ListTodo className="h-8 w-8 text-primary" /> },
        { name: "file", icon: <FileUp className="h-8 w-8 text-primary" /> },
        { name: "project", icon: <FolderOpen className="h-8 w-8 text-primary" /> },
        { name: "note", icon: <StickyNote className="h-8 w-8 text-primary" /> },
    ]


    return (
        <div>
            <Dialog onOpenChange={(open) => !open && resetCreateModal()}>
                <DialogTrigger asChild>
                    <Button className="gap-1">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Create New</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {createStep === 1
                                ? "Create New"
                                : createType === "task"
                                    ? "Create New Task"
                                    : createType === "file"
                                        ? "Upload New File"
                                        : createType === "note"
                                            ? "Create New Note"
                                            : "Create new  Project"
                                        }
                        </DialogTitle>
                        <DialogDescription>
                            {createStep === 1 ? "Choose what you want to create" : "Fill in the details"}
                        </DialogDescription>
                    </DialogHeader>

                    {createStep === 1 ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
                            {
                                options.map((item, index) =>

                                    <Button

                                        variant="outline"
                                        className="flex flex-col h-auto py-6 gap-2"
                                        onClick={() => {
                                            setCreateType(item.name)
                                            setCreateStep(2)
                                        }}
                                    >
                                        {item.icon}
                                        <span className='capitalize'>{item.name}</span>
                                    </Button>

                                )
                            }


                        </div>
                    ) : createType === "task" ? (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="task-title">Task Title</Label>
                                <Input id="task-title" placeholder="Enter task title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="task-description">Description</Label>
                                <Textarea id="task-description" placeholder="Enter task description" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="task-priority">Priority</Label>
                                    <Select defaultValue="medium">
                                        <SelectTrigger id="task-priority">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="task-assignee">Assignee</Label>
                                    <Select>
                                        <SelectTrigger id="task-assignee">
                                            <SelectValue placeholder="Select assignee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* {workspace.members.map((member) => (
                                                <SelectItem key={member.id} value={member.id}>
                                                    {member.name}
                                                </SelectItem>
                                            ))} */}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="task-due-date">Due Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            <span>Pick a date</span>
                                        </Button>
                                    </PopoverTrigger>

                                </Popover>
                            </div>
                        </div>
                    ) : createType === "file" ? (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="file-upload">Upload File</Label>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Drag and drop your file here or click to browse
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Browse Files
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="file-description">Description (Optional)</Label>
                                <Textarea id="file-description" placeholder="Add a description for this file" />
                            </div>
                        </div>
                    ) : createType === "note" ? (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="note-title">Note Title</Label>
                                <Input id="note-title" placeholder="Enter note title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="note-content">Content</Label>
                                <Textarea id="note-content" placeholder="Enter note content" className="min-h-[200px]" />
                            </div>
                        </div>
                    ):  (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="note-title">Project Title</Label>
                                <Input id="note-title" placeholder="Enter note title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="note-content">Prokect Description</Label>
                                <Textarea id="note-content" placeholder="Enter note content" className="min-h-[200px]" />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        {createStep === 2 && (
                            <Button variant="outline" onClick={() => setCreateStep(1)} className="mr-auto">
                                Back
                            </Button>
                        )}
                        <Button type="submit">
                            {createStep === 1
                                ? "Next"
                                : createType === "task"
                                    ? "Create Task"
                                    : createType === "file"
                                        ? "Upload File"
                                        : "Create Note"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default CreateWorkspaceDetailsModal;