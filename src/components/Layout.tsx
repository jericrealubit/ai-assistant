"use client";

import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const StyledDiv = styled("div")`
  background-color: transparent;
`;

const Layout = ({ children, ...props }: Props) => {
  return (
    <div>
      <StyledDiv {...props}>{children}</StyledDiv>
    </div>
  );
};
export default Layout;
