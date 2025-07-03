"use client"
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import * as React from "react"
import { CalendarIcon, FileText, ImageIcon, MoreHorizontal, Plus, Settings, UserPlus, Paperclip, Smile, ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle, GitBranch, GitCommit, GitPullRequest, MessageSquare, ArrowRight, Search, Trash, Edit, Mail, FileUp, StickyNote, ListTodo, Users, Github, Slack, Figma, PlusCircle, MinusCircle, ExternalLink, Send, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, addDays, startOfWeek, addMonths, subMonths } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, } from "@/components/ui/sheet"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateWorkspaceDetailsModal from '../../components/workspaces/create-workspace-details-modal';
import InviteWorkspaceMember from '../../components/workspaces/invite-member-modal';
import WorkspaceSetting from '../../components/workspaces/workspace-setting-modal';

const events = [
    {
        title: "Dribbble Shot",
        start: "2025-03-31T10:00:00",
        end: "2025-03-31T14:00:00",
        progress: 68,
        backgroundColor: "#e91e63",
        extendedProps: { assignees: ["https://randomuser.me/api/portraits/women/1.jpg"] },
    },
    {
        title: "Personal Website",
        start: "2024-04-02T12:00:00",
        end: "2024-04-02T16:00:00",
        backgroundColor: "#2196F3",
        progress: 28,
    },
    {
        title: "MC Redesign",
        start: "2024-04-04T09:00:00",
        end: "2024-04-04T15:00:00",
        backgroundColor: "#4CAF50",
    },
];


const workspaces = [
    {
        id: "1",
        name: "Marketing Campaign",
        description: "Manage all marketing activities and content",
        owner: "Jane Smith",
        members: [
            { id: "1", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "2", name: "Mike Johnson", email: "mike@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "3", name: "Sarah Williams", email: "sarah@example.com", avatar: "/placeholder.svg?height=40&width=40" },
        ],
        tasks: { total: 24, completed: 18 },
        lastUpdated: "2 hours ago",
        color: "bg-rose-500",
        files: [
            { id: "1", name: "MC Redesign Sprint 6.fig", type: "fig", size: "3.8 MB", date: "5 MAY 2023" },
            { id: "2", name: "MC UserStory.pdf", type: "pdf", size: "1.9 KB", date: "15 JUN 2023" },
            { id: "3", name: "Dashboard UI kit 2023.sketch", type: "sketch", size: "2.8 MB", date: "8 MAY 2023" },
        ],
    },
    {
        id: "2",
        name: "Website Redesign",
        description: "Redesign and development of the company website",
        owner: "Mike Johnson",
        members: [
            { id: "2", name: "Mike Johnson", email: "mike@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "1", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "4", name: "Alex Thompson", email: "alex@example.com", avatar: "/placeholder.svg?height=40&width=40" },
        ],
        tasks: { total: 32, completed: 15 },
        lastUpdated: "Yesterday",
        color: "bg-emerald-500",
        files: [
            { id: "1", name: "Website Redesign Sprint 6.fig", type: "fig", size: "4.2 MB", date: "12 MAY 2023" },
            { id: "2", name: "Website UserStory.pdf", type: "pdf", size: "2.1 KB", date: "18 JUN 2023" },
        ],
    },
    {
        id: "3",
        name: "Product Launch",
        description: "Coordinate the launch of our new product line",
        owner: "John Doe",
        members: [
            { id: "5", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "2", name: "Mike Johnson", email: "mike@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "3", name: "Sarah Williams", email: "sarah@example.com", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "4", name: "Alex Thompson", email: "alex@example.com", avatar: "/placeholder.svg?height=40&width=40" },
        ],
        tasks: { total: 48, completed: 20 },
        lastUpdated: "3 days ago",
        color: "bg-sky-500",
        files: [
            { id: "1", name: "Product Launch Sprint 6.fig", type: "fig", size: "3.5 MB", date: "8 MAY 2023" },
            { id: "2", name: "Product UserStory.pdf", type: "pdf", size: "1.8 KB", date: "20 JUN 2023" },
        ],
    },
]

const tasks = [
    {
        id: "1",
        title: "Create wireframe for homepage",
        description: "Design a wireframe mockup for the new homepage layout",
        status: "completed",
        priority: "high",
        assignee: {
            id: "1",
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "2023-06-15",
        completedDate: "2023-06-14",
        project: "Website Redesign",
        tags: ["design", "homepage"],
        progress: 100,
    },
    {
        id: "2",
        title: "Write product descriptions",
        description: "Create compelling product descriptions for new product line",
        status: "in-progress",
        priority: "medium",
        assignee: {
            id: "2",
            name: "Mike Johnson",
            email: "mike@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "2023-06-18",
        project: "Product Launch",
        tags: ["content", "marketing"],
        progress: 65,
    },
    {
        id: "3",
        title: "Competitor analysis research",
        description: "Research and analyze top 5 competitors in the market",
        status: "in-progress",
        priority: "high",
        assignee: {
            id: "3",
            name: "Sarah Williams",
            email: "sarah@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "2023-06-20",
        project: "Marketing Campaign",
        tags: ["research", "marketing"],
        progress: 45,
    },
    {
        id: "4",
        title: "Update social media strategy",
        description: "Revise and update our social media content strategy",
        status: "todo",
        priority: "medium",
        assignee: {
            id: "1",
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "2023-06-25",
        project: "Marketing Campaign",
        tags: ["social", "marketing"],
        progress: 0,
    },
    {
        id: "5",
        title: "Finalize budget proposal",
        description: "Review and finalize the Q3 marketing budget proposal",
        status: "todo",
        priority: "high",
        assignee: {
            id: "4",
            name: "Alex Thompson",
            email: "alex@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "2023-06-30",
        project: "Marketing Campaign",
        tags: ["finance", "planning"],
        progress: 0,
    },
]

const notes = [
    {
        id: "1",
        title: "Campaign Ideas",
        content:
            "- Focus on sustainability features\n- Target Gen Z demographic\n- Use micro-influencers for authentic reach\n- Develop interactive social media content",
        color: "bg-amber-50 dark:bg-amber-950/50",
        createdAt: "2023-06-15T12:00:00",
        updatedAt: "2023-06-15T14:30:00",
    },
    {
        id: "2",
        title: "Meeting Notes: Client Call",
        content:
            "- Client wants to emphasize product sustainability\n- Budget concerns for Q3 campaign\n- Need to prepare revised timeline by Friday\n- Follow up with design team on new mockups",
        color: "bg-emerald-50 dark:bg-emerald-950/50",
        createdAt: "2023-06-12T09:00:00",
        updatedAt: "2023-06-12T10:15:00",
    },
    {
        id: "3",
        title: "Website Redesign Feedback",
        content:
            "- Homepage needs more visual hierarchy\n- Add customer testimonials section\n- Improve mobile navigation\n- Consider A/B testing for call-to-action buttons",
        color: "bg-sky-50 dark:bg-sky-950/50",
        createdAt: "2023-06-10T15:00:00",
        updatedAt: "2023-06-10T16:45:00",
    },
]

const messages = [
    {
        id: "1",
        user: {
            id: "1",
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Hey guys, I created a new task",
        timestamp: "2023-06-15T09:32:00",
    },
    {
        id: "2",
        user: {
            id: "2",
            name: "Mike Johnson",
            email: "mike@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Hello, I have already started working on this",
        timestamp: "2023-06-15T10:15:00",
    },
    {
        id: "3",
        user: {
            id: "3",
            name: "Sarah Williams",
            email: "sarah@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Great! Let me know if you need any help with the design assets.",
        timestamp: "2023-06-15T10:45:00",
    },
    {
        id: "4",
        user: {
            id: "1",
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'll send over the brand guidelines later today.",
        timestamp: "2023-06-15T11:20:00",
    },
    {
        id: "5",
        user: {
            id: "2",
            name: "Mike Johnson",
            email: "mike@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Has anyone seen the latest analytics report? We need to discuss the conversion rates.",
        timestamp: "2023-06-15T13:05:00",
    },
    {
        id: "6",
        user: {
            id: "4",
            name: "Alex Thompson",
            email: "alex@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'll share it in our meeting tomorrow. There are some interesting trends we should discuss.",
        timestamp: "2023-06-15T13:15:00",
    },
    {
        id: "7",
        user: {
            id: "3",
            name: "Sarah Williams",
            email: "sarah@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Looking forward to it. I've also prepared some ideas for the next campaign.",
        timestamp: "2023-06-15T13:30:00",
    },
]

const todaysTasks = [
    {
        id: "1",
        title: "Start Sprint 7 at the end of the week",
        priority: "high",
        status: "todo",
        dueTime: "5:00 PM",
    },
    {
        id: "2",
        title: "Make sure all icons are from the same family",
        priority: "medium",
        status: "in-progress",
        dueTime: "3:00 PM",
    },
    {
        id: "3",
        title: "Review client feedback on homepage design",
        priority: "high",
        status: "todo",
        dueTime: "4:30 PM",
    },
]

// New recent activity data
const recentActivities = [
    {
        id: "1",
        type: "task_update",
        user: {
            id: "1",
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "marked task as completed",
        target: "Create wireframe for homepage",
        timestamp: "2023-06-15T14:30:00",
        read: false,
    },
    {
        id: "2",
        type: "github_commit",
        user: {
            id: "2",
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "pushed 3 commits to",
        target: "feature/homepage-redesign",
        details: {
            repo: "website-redesign",
            commitHash: "a1b2c3d",
            message: "Update homepage layout and add responsive styles",
        },
        timestamp: "2023-06-15T13:45:00",
        read: true,
    },
    {
        id: "3",
        type: "task_update",
        user: {
            id: "3",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "started working on",
        target: "Competitor analysis research",
        timestamp: "2023-06-15T11:20:00",
        read: false,
    },
    {
        id: "4",
        type: "github_pr",
        user: {
            id: "4",
            name: "Alex Thompson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "opened pull request",
        target: "Add product catalog section",
        details: {
            repo: "website-redesign",
            prNumber: "#42",
            status: "Open",
        },
        timestamp: "2023-06-15T10:15:00",
        read: true,
    },
    {
        id: "5",
        type: "comment",
        user: {
            id: "1",
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "commented on task",
        target: "Update social media strategy",
        details: {
            comment: "Let's focus on Instagram and TikTok for this campaign.",
        },
        timestamp: "2023-06-15T09:30:00",
        read: false,
    },
    {
        id: "6",
        type: "file_upload",
        user: {
            id: "2",
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        action: "uploaded file",
        target: "MC Redesign Sprint 6.fig",
        timestamp: "2023-06-14T16:45:00",
        read: true,
    },
]

const files = [
    {
        id: "1",
        name: "MC Redesign Sprint 6.fig",
        type: "fig",
        size: "3.8 MB",
        date: "5 MAY 2023",
        uploadedBy: {
            id: "2",
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        modified: "2023-05-05",
    },
    {
        id: "2",
        name: "MC UserStory.pdf",
        type: "pdf",
        size: "1.9 KB",
        date: "15 JUN 2023",
        uploadedBy: {
            id: "1",
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        modified: "2023-06-15",
    },
    {
        id: "3",
        name: "Dashboard UI kit 2023.sketch",
        type: "sketch",
        size: "2.8 MB",
        date: "8 MAY 2023",
        uploadedBy: {
            id: "3",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        modified: "2023-05-08",
    },
]

// Available integrations
const integrations = [
    {
        id: "github",
        name: "GitHub",
        icon: Github,
        color: "bg-black",
        connected: true,
        details: "Connected to website-redesign",
    },
    {
        id: "slack",
        name: "Slack",
        icon: Slack,
        color: "bg-[#4A154B]",
        connected: true,
        details: "Connected to #marketing-team",
    },
    {
        id: "figma",
        name: "Figma",
        icon: Figma,
        color: "bg-[#F24E1E]",
        connected: true,
        details: "Connected to Marketing Campaign",
    },
]






const WorkspaceShow = () => {







    const { workpace } = usePage().props;

    const workspaceId = workpace.id
    const [newMessage, setNewMessage] = React.useState("")
    const [date, setDate] = React.useState(new Date())
    const [activeTab, setActiveTab] = React.useState("tasks")
    const [chatOpen, setChatOpen] = React.useState(false)
    const [chatMinimized, setChatMinimized] = React.useState(false)
    const [taskFilter, setTaskFilter] = React.useState({
        status: "all",
        priority: "all",
        assignee: "all",
        dueDate: "all",
    })
    const [notificationTab, setNotificationTab] = React.useState("all")
    const [unreadCount, setUnreadCount] = React.useState(recentActivities.filter((activity) => !activity.read).length)

    const workspace = React.useMemo(() => {
        return workspaces.find((w) => w.id === workspaceId) || workspaces[0]
    }, [workspaceId])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle message submission
        setNewMessage("")
    }

    const filteredTasks = React.useMemo(() => {
        return tasks.filter((task) => {
            if (taskFilter.status !== "all" && task.status !== taskFilter.status) return false
            if (taskFilter.priority !== "all" && task.priority !== taskFilter.priority) return false
            if (taskFilter.assignee !== "all" && task.assignee.id !== taskFilter.assignee) return false
            return true
        })
    }, [tasks, taskFilter])

    const filteredActivities = React.useMemo(() => {
        if (notificationTab === "all") return recentActivities
        if (notificationTab === "unread") return recentActivities.filter((activity) => !activity.read)
        return recentActivities.filter((activity) => activity.type.includes(notificationTab))
    }, [recentActivities, notificationTab])

    // Generate days for the week view
    const weekStart = startOfWeek(date)
    const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i))



    const markAllAsRead = () => {
        setUnreadCount(0)
    }

    const sendTaskNotification = (taskId) => {
        // This would send an email notification in a real app
        console.log(`Sending notification for task ${taskId}`)
    }


    function Actions() {
        return (

            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                    {workspace.members.slice(0, 4).map((member, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ))}
                    {workspace.members.length > 4 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +{workspace.members.length - 4}
                        </div>
                    )}
                </div>

                {/* Invite Members Dialog */}
                <InviteWorkspaceMember />


                {/* Settings Dialog */}
                <WorkspaceSetting workspace={workspace} integrations={integrations} />


            </div>
        )
    }





    const breadcrumbs = [{ title: workspace.name, href: '/workspace', }];
    return (
        <AppLayout actions={<Actions />} breadcrumbs={breadcrumbs}>
            <Head title={workspace.name} />
            <div className="flex p-6   flex-col">



                {/* Main Content with Sidebar */}
                <div className="flex flex-col lg:flex-row flex-1">
                    {/* Main Content */}
                    <div className="flex-1  max-w-[1200px] mx-auto w-full">
                        {/* create actions */}
                        <div className="py-3">
                            <div className="flex items-center justify-between gap-3">

                                {/* Integration Icons */}
                                <div className="hidden md:flex items-center gap-2">
                                    {integrations
                                        .filter((i) => i.connected)
                                        .map((integration) => (
                                            <TooltipProvider key={integration.id}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                                            <integration.icon className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{integration.details}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                </div>

                                {/* Create New Dialog with Multi-step */}
                                <CreateWorkspaceDetailsModal />

                            </div>
                        </div>



                        <div className=" h-[50vh]">
                            <FullCalendar
                                plugins={[timeGridPlugin, interactionPlugin]}
                                initialView="timeGridDay"
                                slotDuration="0:30:00" // 1-hour slots
                                allDaySlot={false} // Remove "All Day" row
                                headerToolbar={false}
                                height="100%"

                                events={events}

                            />
                        </div>



                        {/* Navigation Tabs */}
                        <div className="mb-6 py-3">
                            <Tabs defaultValue="tasks" onValueChange={setActiveTab} value={activeTab}>
                                <TabsList className="grid grid-cols-6 w-full">
                                    <TabsTrigger value="projects">Projects</TabsTrigger>
                                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                                    <TabsTrigger value="files">Files</TabsTrigger>
                                    <TabsTrigger value="notes">Notes</TabsTrigger>
                                    <TabsTrigger value="activity" className="relative">
                                        Activity
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger value="team">Team</TabsTrigger>
                                </TabsList>

                                <TabsContent value="projects" className="mt-6">


                                </TabsContent>

                                <TabsContent value="tasks" className="mt-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input type="search" placeholder="Search tasks..." className="pl-8 w-[200px] md:w-[300px]" />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <Select
                                                value={taskFilter.status}
                                                onValueChange={(value) => setTaskFilter({ ...taskFilter, status: value })}
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="todo">To Do</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={taskFilter.priority}
                                                onValueChange={(value) => setTaskFilter({ ...taskFilter, priority: value })}
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Priorities</SelectItem>
                                                    <SelectItem value="low">Low</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="high">High</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={taskFilter.assignee}
                                                onValueChange={(value) => setTaskFilter({ ...taskFilter, assignee: value })}
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Assignee" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Assignees</SelectItem>
                                                    {workspace.members.map((member) => (
                                                        <SelectItem key={member.id} value={member.id}>
                                                            {member.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="rounded-md border ">
                                        <Table >
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[300px]">Task</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Priority</TableHead>
                                                    <TableHead>Assignee</TableHead>
                                                    <TableHead>Due Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredTasks.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                            No tasks match your filters
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredTasks.map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell>
                                                                <div className='py-2'>
                                                                    <div className="font-medium">{task.title}</div>
                                                                    <div className="text-sm text-muted-foreground">{task.description}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        task.status === "completed"
                                                                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-none"
                                                                            : task.status === "in-progress"
                                                                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-none"
                                                                                : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-none"
                                                                    }
                                                                >
                                                                    {task.status === "completed"
                                                                        ? "Completed"
                                                                        : task.status === "in-progress"
                                                                            ? "In Progress"
                                                                            : "To Do"}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        task.priority === "high"
                                                                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-none"
                                                                            : task.priority === "medium"
                                                                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-none"
                                                                                : "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-none"
                                                                    }
                                                                >
                                                                    {task.priority}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-6 w-6">
                                                                        <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                                                                        <AvatarFallback>{task.assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span>{task.assignee.name}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">

                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                                <MoreHorizontal className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                            <DropdownMenuItem>
                                                                                <Edit className="mr-2 h-4 w-4" />
                                                                                <span>Edit</span>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                                <span>Mark as Completed</span>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <Mail className="h-3.5 w-3.5 mr-1" />
                                                                                Notify
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem className="text-destructive">
                                                                                <Trash className="mr-2 h-4 w-4" />
                                                                                <span>Delete</span>
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>

                                <TabsContent value="files" className="mt-6">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {files.map((file) => (
                                            <Card
                                                key={file.id}
                                                className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200"
                                            >
                                                <CardContent className="p-0">
                                                    <div className="bg-muted/30 p-6 flex items-center justify-center">
                                                        {file.type === "pdf" && <FileText className="h-12 w-12 text-rose-500" />}
                                                        {file.type === "fig" && <ImageIcon className="h-12 w-12 text-purple-500" />}
                                                        {file.type === "sketch" && <ImageIcon className="h-12 w-12 text-amber-500" />}
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="font-medium truncate">{file.name}</h3>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>
                                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                                        <span>Open</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <ArrowRight className="mr-2 h-4 w-4" />
                                                                        <span>Share</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-destructive">
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        <span>Delete</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={file.uploadedBy.avatar} alt={file.uploadedBy.name} />
                                                                    <AvatarFallback>{file.uploadedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">
                                                                {new Date(file.modified).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="notes" className="mt-6">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {notes.map((note) => (
                                            <Card
                                                key={note.id}
                                                className={`${note.color} border shadow-sm hover:shadow-md transition-shadow duration-200`}
                                            >
                                                <CardHeader className="p-4 pb-2">
                                                    <div className="flex items-start justify-between">
                                                        <CardTitle className="text-lg">{note.title}</CardTitle>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    <span>Edit</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <ArrowRight className="mr-2 h-4 w-4" />
                                                                    <span>Share</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-destructive">
                                                                    <Trash className="mr-2 h-4 w-4" />
                                                                    <span>Delete</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0">
                                                    <div className="whitespace-pre-line text-sm">{note.content}</div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="activity" className="mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Tabs
                                            defaultValue="all"
                                            onValueChange={setNotificationTab}
                                            value={notificationTab}
                                            className="w-full"
                                        >
                                            <TabsList className="grid w-full grid-cols-4">
                                                <TabsTrigger value="all">All</TabsTrigger>
                                                <TabsTrigger value="unread">Unread</TabsTrigger>
                                                <TabsTrigger value="task">Tasks</TabsTrigger>
                                                <TabsTrigger value="github">GitHub</TabsTrigger>
                                            </TabsList>
                                        </Tabs>

                                        <Button variant="outline" size="sm" className="ml-4 whitespace-nowrap" onClick={markAllAsRead}>
                                            Mark All Read
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {filteredActivities.length === 0 ? (
                                            <div className="text-center py-8 text-muted-foreground">No activities to display</div>
                                        ) : (
                                            filteredActivities.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className={`flex gap-3 p-4 rounded-lg border ${!activity.read ? "bg-primary/5 border-primary/20" : "bg-card"}`}
                                                >
                                                    <Avatar className="h-10 w-10 flex-shrink-0">
                                                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                                        <AvatarFallback>{activity.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-baseline gap-1 flex-wrap">
                                                            <span className="font-medium">{activity.user.name}</span>
                                                            <span className="text-muted-foreground">{activity.action}</span>
                                                            <span className="font-medium">
                                                                {activity.type === "github_commit" || activity.type === "github_pr" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        {activity.target}
                                                                        {activity.type === "github_commit" && (
                                                                            <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />
                                                                        )}
                                                                        {activity.type === "github_pr" && (
                                                                            <GitPullRequest className="h-3.5 w-3.5 text-muted-foreground" />
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    activity.target
                                                                )}
                                                            </span>
                                                        </div>

                                                        {activity.type === "github_commit" && (
                                                            <div className="mt-2 text-sm bg-muted/50 p-3 rounded-md">
                                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                                    <GitBranch className="h-3.5 w-3.5" />
                                                                    <span>{activity.details.repo}</span>
                                                                    <span>•</span>
                                                                    <span>{activity.details.commitHash}</span>
                                                                </div>
                                                                <div className="mt-1 font-medium">{activity.details.message}</div>
                                                            </div>
                                                        )}

                                                        {activity.type === "github_pr" && (
                                                            <div className="mt-2 text-sm bg-muted/50 p-3 rounded-md">
                                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                                    <span>{activity.details.repo}</span>
                                                                    <span>•</span>
                                                                    <span>{activity.details.prNumber}</span>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-[10px] h-4 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-none"
                                                                    >
                                                                        {activity.details.status}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {activity.type === "comment" && (
                                                            <div className="mt-2 text-sm bg-muted/50 p-3 rounded-md">
                                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                                    <span>Comment</span>
                                                                </div>
                                                                <div className="mt-1">{activity.details.comment}</div>
                                                            </div>
                                                        )}

                                                        <div className="text-xs text-muted-foreground mt-2">
                                                            {new Date(activity.timestamp).toLocaleString(undefined, {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                day: "numeric",
                                                                month: "short",
                                                            })}
                                                        </div>
                                                    </div>

                                                    {!activity.read && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 self-start"
                                                            onClick={() => {
                                                                // Mark as read logic would go here
                                                                setUnreadCount((prev) => Math.max(0, prev - 1))
                                                            }}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span className="sr-only">Mark as read</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="team" className="mt-6">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Member</TableHead>
                                                    <TableHead>Role</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Last Active</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {workspace.members.map((member) => (
                                                    <TableRow key={member.id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium">{member.name}</div>
                                                                    <div className="text-sm text-muted-foreground">{member.email}</div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">{member.id === workspace.owner ? "Owner" : "Member"}</Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                                <span>Active</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>Just now</TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>
                                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                                        <span>Message</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Users className="mr-2 h-4 w-4" />
                                                                        <span>Change Role</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-destructive">
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        <span>Remove</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-muted/10">
                        <div className="py-4 pl-4 space-y-6 ">
                            {/* Today's Tasks Card */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Today's Tasks</h3>
                                </div>
                                <div className="space-y-1">
                                    {todaysTasks.map((task) => (
                                        <Card key={task.id} className="overflow-hidden py-2">
                                            <CardContent className="p-3">
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full 
                                                                ${task.status === "completed" ? "bg-green-100 text-green-600"
                                                                : task.status === "in-progress"
                                                                    ? "bg-amber-100 text-amber-600"
                                                                    : "bg-rose-100 text-rose-600"
                                                            }`}
                                                    >
                                                        {task.status === "completed" && <CheckCircle className="h-3 w-3" />}
                                                        {task.status === "in-progress" && <Clock className="h-3 w-3" />}
                                                        {task.status === "todo" && <AlertCircle className="h-3 w-3" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{task.title}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <Badge
                                                                variant="outline"
                                                                className={
                                                                    task.priority === "high"
                                                                        ? "text-xs bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-none"
                                                                        : "text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-none"
                                                                }
                                                            >
                                                                {task.priority}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">Due {task.dueTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Separator />


                        </div>
                    </div>
                </div>

                {/* Floating Chat Button  */}
                <div className="fixed bottom-4 right-4 ">
                    <Sheet open={chatOpen} onOpenChange={setChatOpen}>
                        <SheetTrigger asChild>
                            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
                                <MessageSquare className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="lg:h-screen lg:w-1/4 p-4 ovh">
                            <SheetHeader>
                                <SheetTitle>Team Chat</SheetTitle>
                                <SheetDescription>Chat with your team members</SheetDescription>
                            </SheetHeader>
                            <ScrollArea className="flex-1 mt-4 mb-4 lg:h-[calc(60vh-180px)]">
                                <div className="space-y-9">
                                    {messages.map((message) => (
                                        <div key={message.id} className="flex gap-3">
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                <AvatarImage src={message.user.avatar} alt={message.user.name} />
                                                <AvatarFallback>{message.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-medium text-sm">{message.user.name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(message.timestamp).toLocaleTimeString(undefined, {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="rounded-md bg-muted p-2 text-sm">{message.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <SheetFooter className="flex-row gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Type something..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" size="icon" className="h-9 w-9">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </AppLayout>
    );
};

export default WorkspaceShow;