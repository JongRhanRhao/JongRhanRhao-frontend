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
          ? "bg-primary text-secondary"
          : "bg-transparent text-text hover:bg-secondary hover:text-primary"
      } ${className}`}
      onClick={() => onClick(title)}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`${icon === faFire ? "text-error" : "text-yellow-400"}`}
        />
      )}
      {title}
    </button>
  )
);
