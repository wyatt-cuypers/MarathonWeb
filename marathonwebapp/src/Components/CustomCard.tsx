import { Card, CardContent, CardHeader } from "@mui/material";
import { ReactNode, memo } from 'react';

interface CustomCardProps {
  title?: string;
  children: ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, title }) => {
  return (
    <div className="cardStyle">
      <Card className="outerCard">
        <CardHeader
          titleTypographyProps={{
            fontFamily: "Source Code Pro",
            fontSize: 24,
            fontWeight: "bold",
            color: "#282c34",
          }}
          className="cardHead"
          title={title ?? ""}
        />
        <CardContent className="cardBody">{children}</CardContent>
      </Card>
    </div>
  );
};

export default memo(CustomCard);
