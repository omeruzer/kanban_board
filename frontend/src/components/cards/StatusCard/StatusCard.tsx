import React, { useContext, useEffect, useState } from "react";
import { StatusCardProps } from "./StatusCard.type";
import ItemCard from "../ItemCard/ItemCard";
import { taskApi } from "../../../services/service";
import { Task } from "../../../types/Task/task.type";
import CreateCard from "../CreateCard/CreateCard";
import Loading from "../../loading/Loading";
import { TaskContext } from "../../../context/TaskContext";
import { useDrop } from "react-dnd";

export default function StatusCard({ title, status }: StatusCardProps) {
  const { isRefresh, setIsRefresh } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: async (item: {
      id: string;
      status: string;
      title: string;
      description: string;
    }) => {
      if (item.status !== title) {
        await taskApi.edit(item.id, {
          title: item.title,
          description: item.description,
          status: title,
        });
        setIsRefresh(!isRefresh);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getData = async () => {
    const { data } = await taskApi.statusList(status);
    setData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, [isRefresh]);

  return (
    <div
      ref={drop}
      className={`bg-white shadow-md cursor-pointer px-3 w-72 rounded-md ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <div className="pt-4 pb-2 border-b border-gray-300 mb-2">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="">
        <div className="">
          {loading ? (
            <Loading />
          ) : (
            <div className="statusCardScroll overflow-y-auto  mb-3">
              {status === "todo" ? <CreateCard /> : <></>}
              <div className="">
                {data.map((e: Task, index) => (
                  <ItemCard
                    key={e.id}
                    id={e.id}
                    title={e.title}
                    description={e.description}
                    status={e.status}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
