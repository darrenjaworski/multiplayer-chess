import styled from "@emotion/styled";
import { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary" | "normal";
  "data-testid"?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.75rem 1rem;
  border: ${(props) => `1px solid ${props.theme.colors.text}`};
  background: ${(props) => {
    return props.variant === "outlined"
      ? props.theme.background
      : props.theme.colors.text;
  }};
  color: ${(props) => {
    return props.variant === "outlined"
      ? props.theme.colors.text
      : props.theme.background;
  }};
  &:disabled {
    background: ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.text};
    &:hover {
      cursor: not-allowed;
    }
  }
  &:hover {
    background: ${(props) => {
      return props.variant === "outlined"
        ? props.theme.colors.text
        : props.theme.background;
    }};
    color: ${(props) => {
      return props.variant === "outlined"
        ? props.theme.background
        : props.theme.colors.text;
    }};
    border: ${(props) =>
      props.variant === "outlined"
        ? `1px solid ${props.theme.background}`
        : `1px solid ${props.theme.colors.text}`};
  }
`;

export const Button: FC<ButtonProps> = ({
  variant = "outlined",
  color = "normal",
  ...props
}) => {
  const passedProps = { ...props, variant, color };
  delete passedProps.children;
  return <StyledButton {...passedProps}>{props.children}</StyledButton>;
};
