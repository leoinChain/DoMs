import { cn } from "@/lib/utils";

interface SegmentedProgressProps {
  value: number; // 0-100
  segments?: number;
  className?: string;
}

const SegmentedProgress = ({ value, segments = 12, className }: SegmentedProgressProps) => {
  const filledSegments = Math.round((value / 100) * segments);

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: segments }).map((_, index) => {
        const isFilled = index < filledSegments;
        return (
          <div
            key={index}
            className={cn(
              "h-4 flex-1 rounded-sm transition-colors",
              isFilled
                ? "bg-primary"
                : "bg-gray-200"
            )}
          />
        );
      })}
    </div>
  );
};

export default SegmentedProgress;
