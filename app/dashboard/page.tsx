'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Sidebar } from '../components/dashboard/Sidebar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Task {
  _id: string;
  title: string;
  description: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    role: string;
    name?: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task> | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
  });

  // Fetch user and tasks on page load
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (!userRes.ok) {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      const userData = await userRes.json();
      setUser(userData.user);

      const tasksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
      } else {
        toast.error("Failed to fetch tasks.");
      }

      setIsLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Open the dialog for creating or editing a task
  const openDialog = (task?: Task) => {
    setCurrentTask(task || null);
    setFormState({
      title: task?.title || '',
      description: task?.description || '',
    });
    setIsDialogOpen(true);
  };

  // Handle CRUD operations (Create/Update)
  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const method = currentTask?._id ? 'PUT' : 'POST';
    const url = currentTask?._id
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${currentTask._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formState),
    });

    if (res.ok) {
      const savedTask = await res.json();
      if (currentTask?._id) {
        setTasks(tasks.map((task) => (task._id === savedTask._id ? savedTask : task)));
        toast.success("Task updated successfully.");
      } else {
        setTasks([...tasks, savedTask]);
        toast.success("Task created successfully.");
      }
      setIsDialogOpen(false);
    } else {
      toast.error(`Failed to ${currentTask?._id ? 'update' : 'create'} task.`);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully.");
    } else {
      toast.error("Failed to delete task.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back{user?.name ? `, ${user.name}` : ''} 🫶
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" /> Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{currentTask?._id ? 'Edit Task' : 'Create Task'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveTask} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  {currentTask?._id ? 'Save Changes' : 'Create Task'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {tasks.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-8 pb-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Tasks yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your First Task
              </p>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" /> Create Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task._id}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground">{task.description}</p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="icon" onClick={() => openDialog(task)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteTask(task._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}