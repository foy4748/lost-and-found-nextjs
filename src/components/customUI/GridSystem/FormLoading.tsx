import { Skeleton } from "@/components/ui/skeleton";

export default function FormLoading() {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[500px] max-w-[450px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px] max-w-[450px] " />
          <Skeleton className="h-4 w-[500px] max-w-[450px]" />
        </div>
      </div>
    </>
  );
}
