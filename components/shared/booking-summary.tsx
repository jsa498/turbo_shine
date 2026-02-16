"use client";

import { formatSummaryDate } from "@/components/shared/booking-helpers";

type BookingSummaryProps = {
  date?: Date;
  timeLabel?: string | null;
  timeZone: string;
  packageName?: string;
  durationLabel?: string;
};

export function BookingSummary({
  date,
  timeLabel,
  timeZone,
  packageName,
  durationLabel,
}: BookingSummaryProps) {
  const hasSelection = Boolean(date && timeLabel);

  return (
    <div className="flex flex-col gap-2 text-sm text-white/80">
      <p>
        {hasSelection ? (
          <>
            Your appointment is set for{" "}
            <span className="font-semibold text-white">
              {formatSummaryDate(date as Date, timeZone)}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-white">{timeLabel}</span> (PT).
          </>
        ) : (
          "Select a date and time for your appointment."
        )}
      </p>
      {packageName && durationLabel ? (
        <p className="text-xs text-white/60">
          {packageName} • {durationLabel}
        </p>
      ) : null}
    </div>
  );
}
