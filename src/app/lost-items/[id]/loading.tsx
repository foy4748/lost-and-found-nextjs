import Col from "@/components/customUI/GridSystem/Col";
import GridSystem from "@/components/customUI/GridSystem/GridSystem";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
const LoadingDetailsPage = ({
  className,
}: {
  cardsNumber?: number;
  className?: string;
}) => {
  return (
    <>
      <GridSystem className={cn("gap-y-8", className)}>
        <Col className="flex justify-center col-span-12 md:col-span-6 lg:col-span-6">
          <Skeleton className="h-[150px] md:h-[300px] w-full rounded-xl" />
        </Col>
        <Col className="col-span-12 md:col-span-6 lg:col-span-6 space-y-2">
          <Skeleton className="h-[30px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-11/12 rounded-xl" />
          <Skeleton className="h-[30px] w-10/12 rounded-xl" />
          <Skeleton className="h-[30px] w-4/6 rounded-xl" />
          <Skeleton className="h-[30px] w-1/2 rounded-xl" />
        </Col>
      </GridSystem>
    </>
  );
};

export default LoadingDetailsPage;
