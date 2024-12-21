"use client";

import React from "react";
import { motion, PanInfo } from "framer-motion";
import { Edit, Trash } from "lucide-react";

interface SwipeableListItemProps {
  children: React.ReactNode;
  onDelete: () => void;
  onEdit: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SwipeableListItem = ({
  children,
  onDelete,
  onEdit,
  isOpen,
  setIsOpen,
}: SwipeableListItemProps) => {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: isOpen ? -150 : 0 }}
        className="bg-inherit z-10 relative rounded-lg"
      >
        {children}
      </motion.div>
      <div className="absolute right-0 top-0 bottom-0 w-[150px] flex ">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white w-1/2 flex items-center justify-center"
          aria-label="Edit item"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white w-1/2 flex items-center justify-center rounded-r-lg"
          aria-label="Delete item"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};
