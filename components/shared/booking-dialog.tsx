"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BookingPackage,
  getPackageById,
} from "@/components/shared/booking-helpers";
import { BookingSummary } from "@/components/shared/booking-summary";

type BookingDialogContextValue = {
  openForPackage: (packageId?: string) => void;
};

const BookingDialogContext = React.createContext<BookingDialogContextValue | null>(
  null,
);

const TIME_ZONE = "America/Vancouver";

const FIXED_TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

export function BookingDialogProvider({
  packages,
  children,
}: {
  packages: BookingPackage[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedPackageId, setSelectedPackageId] = React.useState<
    string | null
  >(packages[0]?.id ?? null);
  const [packageOpen, setPackageOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [datePopoverOpen, setDatePopoverOpen] = React.useState(false);
  const [timeSlot, setTimeSlot] = React.useState<string | null>(null);
  const [attemptedNext, setAttemptedNext] = React.useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false);
  const [requestSent, setRequestSent] = React.useState(false);

  const resetForm = React.useCallback(() => {
    setName("");
    setPhone("");
    setDate(undefined);
    setDatePopoverOpen(false);
    setTimeSlot(null);
    setPackageOpen(false);
    setStep(1);
    setAttemptedNext(false);
    setAttemptedSubmit(false);
    setRequestSent(false);
  }, []);

  const openForPackage = React.useCallback(
    (packageId?: string) => {
      setSelectedPackageId(packageId ?? packages[0]?.id ?? null);
      resetForm();
      setOpen(true);
    },
    [packages, resetForm],
  );

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        resetForm();
      }
    },
    [resetForm],
  );

  React.useEffect(() => {
    setTimeSlot(null);
    setRequestSent(false);
  }, [selectedPackageId]);

  const selectedPackage = getPackageById(packages, selectedPackageId);

  const isDetailsReady = name.trim().length > 0 && phone.trim().length > 0;
  const stepValue = step === 1 ? "details" : "schedule";
  const selectedTimeLabel =
    FIXED_TIME_SLOTS.find((slot) => slot.value === timeSlot)?.label ?? null;
  const dateLabel = date
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: TIME_ZONE,
      }).format(date)
    : "Select appointment date";

  const handleNext = () => {
    setAttemptedNext(true);
    if (!isDetailsReady) {
      return;
    }
    setStep(2);
  };

  const handleStepChange = (nextStep: string) => {
    setStep(nextStep === "details" ? 1 : 2);
  };

  const handleSubmit = () => {
    setAttemptedNext(true);
    setAttemptedSubmit(true);

    if (!isDetailsReady) {
      setStep(1);
      return;
    }

    if (!date || !timeSlot || !selectedPackage) {
      setStep(2);
      return;
    }

    setRequestSent(true);
  };

  const PackageCombobox = (
    <Field>
      <FieldLabel className="text-white">Package</FieldLabel>
      <FieldContent>
        <Popover open={packageOpen} onOpenChange={setPackageOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={packageOpen}
              className="h-12 w-full justify-between rounded-xl border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100"
            >
              <span className="truncate">
                {selectedPackage
                  ? `${selectedPackage.name} • ${selectedPackage.price}`
                  : "Select package"}
              </span>
              <ChevronDownIcon className="size-4 text-white/70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[var(--radix-popover-trigger-width)] border-zinc-800 bg-zinc-950 p-0 text-zinc-100"
          >
              <Command className="bg-transparent text-zinc-100">
              <CommandInput
                placeholder="Search package..."
                className="text-zinc-100 placeholder:text-zinc-500"
              />
              <CommandList className="p-1">
                <CommandEmpty className="text-zinc-500">
                  No packages found.
                </CommandEmpty>
                <CommandGroup className="p-0">
                  {packages.map((pkg) => (
                    <CommandItem
                      key={pkg.id}
                      value={`${pkg.name} ${pkg.price}`}
                      onSelect={() => {
                        setSelectedPackageId(pkg.id);
                        setPackageOpen(false);
                      }}
                      className="rounded-md px-3 py-2 text-zinc-300 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100"
                    >
                      {pkg.name} • {pkg.price}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FieldContent>
    </Field>
  );

  return (
    <BookingDialogContext.Provider value={{ openForPackage }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-h-[92vh] max-w-[min(560px,calc(100%-2rem))] gap-4 overflow-hidden border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-[min(560px,calc(100%-2rem))]"
          showCloseButton
        >
          <DialogHeader className="shrink-0">
            <DialogTitle className="text-[1.75rem] leading-tight">
              Book your detail
            </DialogTitle>
            <DialogDescription className="max-w-md text-zinc-400">
              Add your details, then reserve a time in British Columbia
              (Pacific Time).
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 overflow-y-auto pr-1">
            {requestSent ? (
              <div className="mb-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                Request received. We’ll confirm your exact start time shortly.
              </div>
            ) : null}

            <Tabs
              value={stepValue}
              onValueChange={handleStepChange}
              className="w-full gap-3"
            >
              <TabsList className="w-fit bg-zinc-900 text-zinc-400">
                <TabsTrigger
                  value="details"
                  className="text-zinc-400 hover:text-zinc-100 data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-100"
                >
                  <UserIcon />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="text-zinc-400 hover:text-zinc-100 data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-100"
                >
                  <CalendarIcon />
                  Schedule
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <section className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                  {PackageCombobox}
                  <FieldGroup>
                    <Field>
                      <FieldLabel className="text-zinc-100">Full name</FieldLabel>
                      <FieldContent>
                        <Input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Enter your name"
                          className="border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                          aria-invalid={attemptedNext && name.trim().length === 0}
                        />
                        {attemptedNext && name.trim().length === 0 ? (
                          <FieldError>Please enter your name.</FieldError>
                        ) : null}
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel className="text-zinc-100">Phone number</FieldLabel>
                      <FieldContent>
                        <Input
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="(604) 555-0198"
                          type="tel"
                          className="border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                          aria-invalid={attemptedNext && phone.trim().length === 0}
                        />
                        {attemptedNext && phone.trim().length === 0 ? (
                          <FieldError>Please enter your phone number.</FieldError>
                        ) : null}
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                  <Button type="button" className="w-full" onClick={handleNext}>
                    Next
                  </Button>
                </section>
              </TabsContent>

              <TabsContent value="schedule">
                <section className="grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                  {PackageCombobox}

                  <div className="grid gap-2">
                    <FieldLabel className="text-zinc-100">Date</FieldLabel>
                    <Popover
                      open={datePopoverOpen}
                      onOpenChange={setDatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 justify-between rounded-xl border-zinc-800 bg-zinc-950 px-4 text-left text-sm text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100"
                        >
                          <span className="flex items-center gap-3">
                            <CalendarIcon className="size-4 text-zinc-300" />
                            <span className={date ? "text-zinc-100" : "text-zinc-500"}>
                              {dateLabel}
                            </span>
                          </span>
                          <ChevronDownIcon className="size-4 text-zinc-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-[min(370px,calc(100vw-3rem))] rounded-2xl border-zinc-800 bg-zinc-950 p-3 text-zinc-100 shadow-2xl"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(nextDate) => {
                            setDate(nextDate);
                            setTimeSlot(null);
                            setDatePopoverOpen(false);
                          }}
                          className="w-full rounded-xl bg-transparent p-1"
                          classNames={{
                            root: "w-full",
                            month: "w-full gap-3",
                            month_caption: "text-zinc-100",
                            weekdays: "mt-2 flex",
                            weekday:
                              "flex-1 text-center text-sm font-normal text-zinc-500",
                            week: "mt-1 flex w-full",
                            day: "w-full text-center",
                            table: "w-full border-collapse",
                          }}
                          timeZone={TIME_ZONE}
                          disabled={{ before: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                      Time (PT)
                    </p>
                    {!date ? (
                      <p className="text-sm text-zinc-400">
                        Select a date to choose a time.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {FIXED_TIME_SLOTS.map((slot) => (
                          <Button
                            key={slot.value}
                            type="button"
                            variant="outline"
                            className={
                              timeSlot === slot.value
                                ? "h-10 justify-center border-zinc-100 bg-zinc-100 text-zinc-950 shadow-none hover:bg-zinc-200 hover:text-zinc-950"
                                : "h-10 justify-center border-zinc-700 bg-zinc-900 text-zinc-100 shadow-none hover:bg-zinc-800 hover:text-zinc-100"
                            }
                            onClick={() => setTimeSlot(slot.value)}
                          >
                            {slot.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {attemptedSubmit && (!date || !timeSlot) ? (
                    <FieldError>Please select a date and time.</FieldError>
                  ) : null}

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                    <BookingSummary
                      date={date}
                      timeLabel={selectedTimeLabel}
                      timeZone={TIME_ZONE}
                      packageName={selectedPackage?.name}
                      durationLabel={selectedPackage?.durationLabel}
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="!bg-zinc-950 !text-zinc-100 border-zinc-800 hover:!bg-zinc-900 hover:!text-zinc-100 active:!bg-zinc-900"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={requestSent}
                    >
                      {requestSent ? "Request Sent" : "Request Booking"}
                    </Button>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </BookingDialogContext.Provider>
  );
}

export function BookingDialogTrigger({
  packageId,
  className,
  variant = "default",
  children,
}: {
  packageId?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  children: React.ReactNode;
}) {
  const context = React.useContext(BookingDialogContext);

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => context?.openForPackage(packageId)}
      disabled={!context}
    >
      {children}
    </Button>
  );
}
