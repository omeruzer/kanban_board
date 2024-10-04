import React, { useContext, useState } from "react";
import { ItemCardProps } from "./ItemCard.type";
import * as Dialog from "@radix-ui/react-dialog";
import AlertModal from "../../modal/AlertModal";
import { taskApi } from "../../../services/service";
import { TaskContext } from "../../../context/TaskContext";
import { toast } from "react-toastify";
import EditCard from "../EditCard/EditCard";
import { useDrag } from "react-dnd";

export default function ItemCard({
  id,
  title,
  description,
  status,
}: ItemCardProps) {
  const { isRefresh, setIsRefresh } = useContext(TaskContext);
  const [isEdit, setIsEdit] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id, status, title, description },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const remove = async (id: string) => {
    const data = await taskApi.remove(id);
    if (data.data.status === 200) {
      setIsRefresh(!isRefresh);
      toast.success("Deleted!");
    }
  };

  return (
    <div className="">
      <Dialog.Root>
        <Dialog.Trigger className="w-full h-full">
          <div
            ref={drag}
            className={`border border-gray-300 rounded-md px-3 py-3 bg-gray-50 my-1 shadow-sm ${
              isDragging ? "opacity-50" : ""
            }`}
          >
            <h3 className="font-semibold">
              {title.length > 50 ? title.substr(0, 50) + "..." : title}
            </h3>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <div className="border-b border-gray-300 py-4">
              <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
            </div>
            <div className=" border-b border-gray-300 py-4 flex justify-between items-center">
              <span className="">
                Status: <span className="font-semibold">{status}</span>
              </span>

              <div className="flex justify-center items-center gap-x-2">
                <EditCard
                  id={id}
                  title={title}
                  description={description}
                  status={status}
                />
                <AlertModal remove={() => remove(id)} id={id} />
              </div>
            </div>
            <Dialog.Description className="DialogDescription">
              {description}
            </Dialog.Description>

            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
