import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type FilterButtonProps = {
  type: string;
  selectedType?: string;
  onClick: (type: string) => void;
  icon?: IconDefinition;
  className?: string;
};

export const FilterButton = React.memo(
  ({ type, selectedType, onClick, icon, className }: FilterButtonProps) => (
    <button
      className={`btn text-text btn-sm ${
        selectedType === type ? "btn bg-primary text-text" : "btn-outline"
      } ${className}`}
      onClick={() => onClick(type)}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className={icon === faFire ? "text-error" : "text-yellow-400"}
        />
      ) : (
        type
      )}
    </button>
  )
);
