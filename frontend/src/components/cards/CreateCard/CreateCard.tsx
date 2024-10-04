import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { taskApi } from "../../../services/service";
import { TaskContext } from "../../../context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCard() {
  const { isRefresh, setIsRefresh } = useContext(TaskContext);

  const [form, setForm] = useState({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title == "" || form.description == "") {
      toast.error("Fill in all fields!");
      return;
    }

    const data = await taskApi.create({
      title: form.title,
      description: form.description,
    });

    if (data.data.status == 200) {
      setIsOpen(false);
      setForm({ title: "", description: "" });
      setIsRefresh(!isRefresh);
      toast.success("Created!");
    }
  };

  const handleForm = (name: string, value: string) => {
    setForm((form) => ({ ...form, [name]: value }));
  };
  const resetForm = () => {
    setForm({ title: "", description: "" });
  };
  return (
    <div className="">
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && resetForm()}>
        <Dialog.Trigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className="border-dashed border-2 border-indigo-600 rounded-md px-3 py-3 bg-gray-50 my-1 shadow-sm"
          >
            <h3 className="font-semibold ">Add Task</h3>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">New Task</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Create a new task.
            </Dialog.Description>

            <div className="">
              <Form.Root onSubmit={create} className="">
                <Form.Field className="mb-2.5 grid" name="email">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                      Title
                    </Form.Label>
                  </div>
                  <Form.Control asChild>
                    <input
                      value={form.title}
                      onChange={(e: any) => handleForm("title", e.target.value)}
                      className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                      placeholder="Title"
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field className="mb-2.5 grid" name="question">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                      Description
                    </Form.Label>
                  </div>
                  <Form.Control asChild>
                    <textarea
                      value={form.description}
                      onChange={(e: any) =>
                        handleForm("description", e.target.value)
                      }
                      rows={15}
                      className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                      placeholder="Description"
                    />
                  </Form.Control>
                </Form.Field>
                <div className="flex justify-center">
                  <Form.Submit asChild className="">
                    <button className="Button green cursor-pointer mx-auto">
                      Add Task
                    </button>
                  </Form.Submit>
                </div>
              </Form.Root>
            </div>
            <Dialog.Close asChild>
              <button
                onClick={() => setIsOpen(false)}
                className="IconButton"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
