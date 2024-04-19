import { Tab, styled } from "@mui/material";

export const StyledTab = styled((props: { label: string }) => (
  <Tab disableRipple {...props} />
))(() => ({
  padding: 0,
  fontFamily: "Source Code Pro",
  fontSize: 24,
  fontWeight: "bold",
  color: "#282c34",
  textTransform: "none",
  "&.Mui-selected": {
    color: "rgba(0, 0, 0, 0.5)",
  },
}));
