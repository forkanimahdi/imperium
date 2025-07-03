"use client"

import * as React from "react"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "@inertiajs/react"



export function CreateWorkspaceForm({ onSuccess }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { data, setData, post, processing, errors } = useForm({
    "name": "",
    "description": "",
    "members": [],
  })

  const handleInputChnages = (type, e) => {
    setData(type, e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    post(route("workspaces.store"), data)

    setIsLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Workspace Name</Label>
          <Input
            onChange={(e) => handleInputChnages("name", e)} maxLength={20} name="title" placeholder="Insert a valid workspace name" id="title" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
          className="pb-6"
            onChange={(e) => handleInputChnages("description", e)} placeholder="Describe your workspace to people" id="description" />
        </div>

        <div className="grid gap-2">
          <Label>Invite Team Members</Label>
          <Textarea
            onChange={(e) => handleInputChnages("members", e)}
            id="members"
           
            placeholder="Enter email addresses separated by commas"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Workspace"}
        </Button>
      </DialogFooter>
    </form>
  )
}

