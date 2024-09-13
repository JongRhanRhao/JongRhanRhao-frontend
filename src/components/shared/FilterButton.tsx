import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

type FilterButtonProps = {
  title: string;
  selectedTitle?: string;
  onClick: (type: string) => void;
  icon?: IconDefinition;
  className?: string;
  selectedClassName?: string;
};

export const FilterButton = React.memo(
  ({
    title,
    selectedTitle,
    onClick,
    icon,
    className,
    selectedClassName,
  }: FilterButtonProps) => {
    const { t } = useTranslation();
    return (
      <button
        className={`btn btn-sm ${
          selectedTitle === title
            ? `bg-primary text-secondary border-none ${selectedClassName}`
            : "bg-transparent text-text hover:bg-secondary"
        } ${className}`}
        onClick={() => onClick(title)}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`${icon === faFire ? "text-error" : "text-yellow-400"}`}
          />
        )}
        {t(title)}
      </button>
    );
  }
);
