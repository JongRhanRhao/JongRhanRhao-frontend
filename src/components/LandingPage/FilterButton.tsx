import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type FilterButtonProps = {
  type: string;
  selectedType: string;
  onClick: (type: string) => void;
  icon?: IconDefinition;
};

export const FilterButton = React.memo(
  ({ type, selectedType, onClick, icon }: FilterButtonProps) => (
    <button
      className={`btn btn-sm ${
        selectedType === type ? "btn-primary" : "btn-outline"
      }`}
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
