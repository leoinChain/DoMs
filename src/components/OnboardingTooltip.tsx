import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingTooltipProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  targetSelector?: string;
  title: string;
  description: string;
  showSkip?: boolean;
  showNext?: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

const OnboardingTooltip = ({
  isOpen,
  onClose,
  onNext,
  targetSelector,
  title,
  description,
  showSkip = true,
  showNext = true,
  position = "bottom",
}: OnboardingTooltipProps) => {
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !targetSelector) return;

    const updatePosition = () => {
      const targetElement = document.querySelector(targetSelector);
      if (!targetElement || !tooltipRef.current) return;

      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (position) {
        case "bottom":
          top = targetRect.bottom + scrollY + 12;
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "top":
          top = targetRect.top + scrollY - tooltipRect.height - 12;
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case "right":
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.right + scrollX + 12;
          break;
        case "left":
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.left + scrollX - tooltipRect.width - 12;
          break;
      }

      // Keep tooltip within viewport
      const padding = 16;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      if (top < padding) top = padding;
      if (top + tooltipRect.height > window.innerHeight + scrollY - padding) {
        top = window.innerHeight + scrollY - tooltipRect.height - padding;
      }

      setPositionStyle({ top: `${top}px`, left: `${left}px` });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, targetSelector, position]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Blurred overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
        onClick={onClose}
      />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 w-80 bg-background border rounded-lg shadow-lg p-4"
        style={positionStyle}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-light text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          {showSkip && (
            <Button variant="outline" size="sm" onClick={onClose} className="font-regular">
              Skip
            </Button>
          )}
          {showNext && onNext && (
            <Button size="sm" onClick={onNext} className="font-regular">
              Next
            </Button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default OnboardingTooltip;
