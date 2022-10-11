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
  color: ${(props) => {
    // @ts-ignore
    return props.theme.colors.text;
  }};
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
