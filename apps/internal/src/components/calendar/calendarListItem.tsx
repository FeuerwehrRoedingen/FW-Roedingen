"use client"
import React from "react"
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spacer, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react"
import { HiOutlineDotsCircleHorizontal, HiOutlineUserCircle } from "react-icons/hi"

type IProps = {
  isChecked: boolean;
  isActive: boolean;
  label: string;
  onValueChange: () => void;
  onClick: () => void;
}

export default function (props: IProps) {

  const [showButtons, setShowButtons] = React.useState(false);
  const bg = props.isActive ? "bg-gray-800 hover:bg-gray-700" : "hover:bg-gray-800 bg-gray-900";

  return (
    <li
      className={`w-full h-10 flex flex-row p-2 items-center rounded-lg cursor-pointer ${bg}`}
      key={`${props.label}-li`}
      onClick={props.onClick}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <Checkbox
        isSelected={props.isChecked}
        onValueChange={props.onValueChange}
        color="danger"
        radius="sm"
      />
      <p className="ml-0 mr-auto">
        {props.label}
      </p>
      {showButtons && <div className="flex flex-row self-end">
        <EditButton light={props.isActive} />
        <Spacer x={0.5} />
        <UserButton light={props.isActive} />
      </div>}
    </li>
  )
}

type IButonProps = {
  light?: boolean;
}
function EditButton(props: IButonProps) {

  const [hover, setHover] = React.useState(false);

  const darkerGray = props.light ? "gray-700" : "gray-800"
  const className = !hover ? `bg-${darkerGray} text-gray-400 rounded-full` : `bg-gray-400 text-${darkerGray} rounded-full`;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="bg-transparent w-[25] h-[25] p-0 m-0 min-w-0"
        >
          <HiOutlineDotsCircleHorizontal
            size={25}
            className={className}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider>
          <DropdownItem>
            Kalendar bearbeiten
          </DropdownItem>
        </DropdownSection>
        <DropdownItem>
          Kalendar löschen
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

function UserButton(props: IButonProps) {

  const [hover, setHover] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const darkerGray = props.light ? "gray-700" : "gray-800"
  const className = !hover ? `bg-${darkerGray} text-gray-400 rounded-full` : `bg-gray-400 text-${darkerGray} rounded-full`;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        isIconOnly
        className="bg-transparent w-[25] h-[25] p-0 m-0 min-w-0"
      >
        <HiOutlineUserCircle
          size={25}
          className={className}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
        <ModalContent>
          <ModalBody>
            <h1 className="text-2xl">Mitglieder</h1>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)} color="danger" variant="ghost">
              Schließen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}