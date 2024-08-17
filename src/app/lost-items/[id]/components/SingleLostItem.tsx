import Image from "next/image";
import moment from "moment";
import ReportFoundButton from "./ReportFoundButton";
import CreateClaim from "./CreateClaim";
import {
  TFoundBy,
  TFoundItemType,
} from "@/app/my-items/components/MyItemsPage";

type TSingleLostItem = {
  payload: TFoundItemType;
  foundBy?: TFoundBy;
};

function SingleLostItem({ payload, foundBy }: TSingleLostItem) {
  return (
    <>
      <section className="flex">
        <figure className="lg:w-1/2">
          {payload?.photoUrl ? (
            <Image
              src={payload?.photoUrl}
              width={500}
              height={500}
              alt={payload.foundItemName}
            />
          ) : (
            <div className="flex justify-center items-center border border-red-200 h-full min-h-[300px]">
              <p>No Image</p>
            </div>
          )}
        </figure>
        <aside className="p-4 lg:w-1/2 flex items-center justify-center">
          <article>
            <h1 className="form-title mb-4">{payload.foundItemName}</h1>
            {payload.isItemFound ? (
              <p className="text-center my-4">
                <strong>Found By </strong>: {foundBy?.user?.name} ||{" "}
                {foundBy?.user?.email}
              </p>
            ) : (
              <></>
            )}

            <div className="grid lg:grid-cols-2 gap-x-4 lg:text-center">
              <p>Category : {payload.category.name}</p>
              <p>Found Status : {payload.isItemFound ? "🟢" : "🔴"}</p>
              <p>Location : {payload.location}</p>
              <p>Reported : {moment(payload.createdAt).fromNow()}</p>
            </div>
            <p className="p-0 m-0 mt-2">
              <strong>Description:</strong>
            </p>
            <p className="my-2">{payload.description}</p>
            <div className="flex justify-center">
              {foundBy ? (
                <CreateClaim foundById={foundBy?.id} foundItemId={payload.id} />
              ) : (
                <ReportFoundButton foundItemId={payload.id} />
              )}
            </div>
          </article>
        </aside>
      </section>
    </>
  );
}

export default SingleLostItem;
