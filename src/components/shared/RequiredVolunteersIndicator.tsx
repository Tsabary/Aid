import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";

function RequiredVolunteersIndicator({
  requiredVoluneers,
}: {
  requiredVoluneers: number | null;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex gap-1 items-center text-xs text-gray-500">
            {requiredVoluneers === null
              ? "∞"
              : requiredVoluneers === 0
              ? "✓"
              : requiredVoluneers}
            <User className="size-3" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {requiredVoluneers === null
              ? "Unlimited amount of volunteers required"
              : requiredVoluneers === 0
              ? "No more volunteers required"
              : requiredVoluneers + " more volunteers required"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default RequiredVolunteersIndicator;
