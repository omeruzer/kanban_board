import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StatusCard from "../components/cards/StatusCard/StatusCard";
import Title from "../components/title/Title";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-50 h-screen w-full">
        <Title />
        <div className="flex justify-center items-start gap-x-2 mt-6">
          <StatusCard cardTitle={"To do"} status="todo" title="To Do" />
          <StatusCard
            cardTitle={"In Progress"}
            status="inprogress"
            title="In Progress"
          />
          <StatusCard cardTitle={"Done"} status="done" title="Done" />
        </div>
      </div>
    </DndProvider>
  );
}
