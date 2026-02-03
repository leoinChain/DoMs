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
  unblurSelector?: string; // Selector for element to unblur
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
  unblurSelector,
}: OnboardingTooltipProps) => {
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle unblur effect
  useEffect(() => {
    if (!isOpen || !unblurSelector) return;

    const unblurElement = document.querySelector(unblurSelector);
    if (unblurElement) {
      unblurElement.classList.add("onboarding-unblur");
    }

    return () => {
      if (unblurElement) {
        unblurElement.classList.remove("onboarding-unblur");
      }
    };
  }, [isOpen, unblurSelector]);

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
        {/* Pointer indicator - pointing to target */}
        {position === "top" && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-background"></div>
            <div className="absolute top-[-1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-border"></div>
          </div>
        )}
        {position === "bottom" && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-background"></div>
            <div className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-border"></div>
          </div>
        )}
        {position === "left" && (
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-background"></div>
            <div className="absolute left-[-1px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-border"></div>
          </div>
        )}
        {position === "right" && (
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-background"></div>
            <div className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-border"></div>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-light text-[18px] mb-1">{title}</h3>
            <p className="text-[14px] text-muted-foreground">{description}</p>
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
