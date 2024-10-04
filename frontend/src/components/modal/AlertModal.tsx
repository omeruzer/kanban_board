import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { DeleteModalProps } from "../../types/Task/modal.type";

export default function AlertModal({ remove,id }: DeleteModalProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <span className="text-red-500 cursor-pointer">Delete</span>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone.
          </AlertDialog.Description>
          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "flex-end",
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={() => remove(id)} className="Button red">
                Yes, delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
