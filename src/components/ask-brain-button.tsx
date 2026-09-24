"use client";

import { ReactNode } from "react";

type AskBrainButtonProps = {
  children?: ReactNode;
  question?: string;
  autoSubmit?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function AskBrainButton({
  children,
  question,
  autoSubmit = false,
  className = "secondary-button",
  ariaLabel,
}: AskBrainButtonProps) {
  function openSecondBrain() {
    window.dispatchEvent(
      new CustomEvent(
        "gyandhara:open-second-brain",
        {
          detail: {
            question: question ?? "",
            autoSubmit,
          },
        }
      )
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={openSecondBrain}
    >
      {children ?? "Ask anything"}
    </button>
  );
}