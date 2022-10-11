// @ts-nocheck
import styled from "@emotion/styled";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "outlined" | "contained";
  color: "primary" | "secondary" | "normal";
}

const StyledButton = styled.button`
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
    border: ${(props) => `1px solid ${props.theme.background}`};
  }
`;

export const Button = (props: ButtonProps) => {
  const passedProps = { ...props };

  delete passedProps.children;

  return <StyledButton {...passedProps}>{props.children}</StyledButton>;
};

Button.defaultProps = {
  variant: "outlined",
  color: "normal",
};
