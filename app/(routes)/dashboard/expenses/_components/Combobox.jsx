"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


function Combobox({
  items,
  value,
  onChange,
  placeholder = "Select option",
  width = "200px",
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={`w-[${width}] justify-between`}
        >
          {value ? value.label : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />

        </Button>
      </PopoverTrigger>

      <PopoverContent className={`w-[${width}] p-0`}>
        <Command>
          <CommandInput placeholder={`Search...`} />
          <CommandEmpty>No option found.</CommandEmpty>

          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={String(item.value)}
                onSelect={() => {
                  onChange(item)
                  setOpen(false)
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.value === item.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
