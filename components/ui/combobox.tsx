"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const Combobox = PopoverPrimitive.Root;

function ComboboxValue({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="combobox-value" className={cn(className)} {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "inline-flex items-center gap-2 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="text-muted-foreground pointer-events-none size-4"
      />
    </PopoverPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="combobox-clear"
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </Button>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: React.ComponentProps<typeof InputGroupInput> & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <InputGroupInput disabled={disabled} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear ? <ComboboxClear disabled={disabled} /> : null}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="combobox-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: React.ComponentProps<typeof CommandList>) {
  return (
    <CommandList
      data-slot="combobox-list"
      className={cn("max-h-60 overflow-y-auto", className)}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: React.ComponentProps<typeof CommandItem>) {
  return (
    <CommandItem
      data-slot="combobox-item"
      className={cn("relative pr-8", className)}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute right-2 inline-flex size-4 items-center justify-center">
        <CheckIcon className="size-4 opacity-0 data-[selected=true]:opacity-100" />
      </span>
    </CommandItem>
  );
}

function ComboboxGroup({ className, ...props }: React.ComponentProps<typeof CommandGroup>) {
  return <CommandGroup data-slot="combobox-group" className={cn(className)} {...props} />;
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ComboboxEmpty({ className, ...props }: React.ComponentProps<typeof CommandEmpty>) {
  return <CommandEmpty data-slot="combobox-empty" className={cn(className)} {...props} />;
}

function ComboboxSeparator({ className, ...props }: React.ComponentProps<typeof CommandSeparator>) {
  return <CommandSeparator data-slot="combobox-separator" className={cn(className)} {...props} />;
}

function ComboboxChips({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-chips"
      className={cn(
        "border-input focus-within:border-ring flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-2.5 py-1.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: React.ComponentProps<"div"> & {
  showRemove?: boolean;
}) {
  return (
    <div
      data-slot="combobox-chip"
      className={cn(
        "bg-muted text-foreground inline-flex h-7 items-center gap-1 rounded-sm px-1.5 text-xs font-medium",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </Button>
      ) : null}
    </div>
  );
}

function ComboboxChipsInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 bg-transparent text-sm outline-none", className)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
  Command,
};
