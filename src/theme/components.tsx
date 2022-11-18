import { LinkProps } from "@mui/material/Link";
import React, { forwardRef } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>(
  (props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  }
);

const components = {
  MuiLink: {
    styleOverrides: {
      root: {
        cursor: "pointer",
      },
    },
    defaultProps: {
      underline: "hover",
      component: LinkBehavior,
    } as LinkProps,
  },
  MuiButtonBase: {
    defaultProps: {
      underline: "hover",
      LinkComponent: LinkBehavior,
    },
  },
};

export default components;
