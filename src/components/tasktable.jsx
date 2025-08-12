"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { cn } from "@/lib/utils";

const columns = [
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
    size: 250,
  },
  {
    accessorKey: "level",
    header: "Priority",
    cell: ({ row }) => (
      <div className="capitalize text-muted-foreground">
        {row.getValue("level")}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const color =
        status === "completed"
          ? "text-green-400"
          : status === "in progress"
          ? "text-yellow-400"
          : "text-red-400";
      return (
        <div className={`capitalize font-semibold ${color}`}>{status}</div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "pomo",
    header: () => <div className="text-center">Pomodoros</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("pomo")}</div>
    ),
    size: 100,
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 80,
  },
];

const tasks = [
  {
    id: "T001",
    level: "high",
    title: "Finish React project",
    status: "in progress",
    pomo: 5,
  },
  {
    id: "T002",
    level: "medium",
    title: "Write blog post",
    status: "pending",
    pomo: 3,
  },
  {
    id: "T003",
    level: "low",
    title: "Organize workspace",
    status: "completed",
    pomo: 2,
  },
  {
    id: "T001",
    level: "high",
    title: "Finish React project",
    status: "in progress",
    pomo: 5,
  },
  {
    id: "T002",
    level: "medium",
    title: "Write blog post",
    status: "pending",
    pomo: 3,
  },
  {
    id: "T003",
    level: "low",
    title: "Organize workspace",
    status: "completed",
    pomo: 2,
  },
  {
    id: "T001",
    level: "high",
    title: "Finish React project",
    status: "in progress",
    pomo: 5,
  },
  {
    id: "T002",
    level: "medium",
    title: "Write blog post",
    status: "pending",
    pomo: 3,
  },
  {
    id: "T003",
    level: "low",
    title: "Organize workspace",
    status: "completed",
    pomo: 2,
  },
  {
    id: "T002",
    level: "medium",
    title: "Write blog post",
    status: "pending",
    pomo: 3,
  },
  {
    id: "T003",
    level: "low",
    title: "Organize workspace",
    status: "completed",
    pomo: 2,
  },
  {
    id: "T002",
    level: "medium",
    title: "Write blog post",
    status: "pending",
    pomo: 3,
  },
  {
    id: "T003",
    level: "low",
    title: "Organize workspace",
    status: "completed",
    pomo: 2,
  },
];

export function TaskTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-4">
        <Input
          placeholder="Filter Tasks..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-full sm:max-w-sm"
        />
        <div className="sm:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-full text-[12px] sm:text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 min-w-[50px] sm:min-w-[150px] text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 min-w-[50px] sm:min-w-[150px] align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-4">
        <div className="text-muted-foreground text-sm text-center sm:text-left w-full sm:w-1/3">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TaskManagerForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [pomodoroCount, setPomodoroCount] = useState(1);

  const levelOptions = ["Low", "Medium", "High"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !level || !description || pomodoroCount < 1) return;

    const newTask = {
      title,
      level,
      description,
      pomodoros: pomodoroCount,
    };

    onAdd(newTask);

    setTitle("");
    setLevel("");
    setDescription("");
    setPomodoroCount(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border flex justify-around flex-col gap-4 rounded-md mb-6"
    >
      <h2 className="text-3xl font-degular mt-4 mb-4 text-accent-foreground">
        Create New Task
      </h2>
      <div className="text-left">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-accent-foreground"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Title....."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 mb-2"
        />
      </div>

      {/* Level Input */}

      <div className="text-left">
        <label
          htmlFor="pomodoro"
          className="text-sm font-semibold text-accent-foreground"
        >
          Select Priority
        </label>
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Button
              id="level"
              variant="outline"
              className="w-full justify-between mt-2 mb-2 text-muted-foreground"
            >
              {level || "Priority"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {levelOptions.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setLevel(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-left">
        <label
          htmlFor="pomodoro"
          className="text-sm font-semibold text-accent-foreground"
        >
          Allot Pomodoro
        </label>
        <Input
          id="pomodoro"
          type="number"
          min={1}
          max={12}
          value={pomodoroCount}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 1 && value <= 12) {
              setPomodoroCount(value);
            }
          }}
          className="mt-2 mb-2"
          placeholder="1–12"
        />
      </div>

      {/* Description Textarea (custom styled) */}
      <div className="text-left">
        <label
          htmlFor="pomodoro"
          className="text-sm font-semibold text-accent-foreground"
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description..."
          rows={4}
          required
          className={cn(
            "w-full rounded-md border border-input  px-3 py-2 text-sm mt-2 mb-2",
            "placeholder:text-muted-foreground focus:outline-none"
          )}
        />
      </div>

      <Button type="submit" className="w-full mb-4">
        Add Task
      </Button>
    </form>
  );
}

export function TablePomo() {
  const columns = [
    {
      accessorKey: "check",
      header: "Select",
      cell: ({ row }) => (
        <input type="checkbox" className="data-[state=checked]:bg-blue-300"/>
      ),
      size: 100,
    },
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
      size: 250,
    },
    {
      accessorKey: "level",
      header: "Priority",
      cell: ({ row }) => (
        <div className="capitalize text-muted-foreground">
          {row.getValue("level")}
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "pomo",
      header: () => <div className="text-center">Pomodoros</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("pomo")}</div>
      ),
      size: 100,
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-4">
        <Input
          placeholder="Filter Tasks..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-full sm:max-w-sm"
        />
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-full text-[12px] sm:text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 min-w-[50px] sm:min-w-[150px] text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 min-w-[50px] sm:min-w-[150px] align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-4">
        <div className="text-muted-foreground text-sm text-center sm:text-left w-full sm:w-1/3">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
