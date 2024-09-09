import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FilterButtonProps = {
  title: string;
  selectedTitle?: string;
  onClick: (type: string) => void;
  icon?: IconDefinition;
  className?: string;
};

export const FilterButton = React.memo(
  ({ title, selectedTitle, onClick, icon, className }: FilterButtonProps) => (
    <button
      className={`btn btn-sm ${
        selectedTitle === title
          ? "bg-primary text-text"
          : "bg-transparent text-text hover:bg-primary/10"
      } ${className}`}
      onClick={() => onClick(title)}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`${
            icon === faFire ? "text-error" : "text-yellow-400"
          } mr-2`}
        />
      )}
      {title}
    </button>
  )
);