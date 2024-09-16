import * as React from "react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface ColorModeSwitcherProps {
  toggleTheme: () => void;
  theme: string;
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = ({
  toggleTheme,
  theme,
}) => {
  const buttonProps = {
    size: "lg",
    isRound: true,
    alignSelf: "flex-end",
    icon: theme === "light" ? <MoonIcon /> : <SunIcon />,
    "aria-label": "Switch DarkMode",
  };

  return <IconButton onClick={toggleTheme} {...buttonProps} />;
};

export default ColorModeSwitcher;
