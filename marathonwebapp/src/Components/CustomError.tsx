import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { memo } from "react";

type CustomErrorType = {
  error: null | AxiosError;
};

type CustomErrorDataType = {
  error: string;
};

const CustomError = (props: CustomErrorType) => {
  const { error } = props;
  const { logout } = useAuth0();
  const errorText = error?.response?.data as CustomErrorDataType;
  const errorStatus = error?.response?.status;
  return (
    <div className="loadingContainer errorText">
      <div>
        ERROR
        {errorStatus === 401 &&
          errorText?.error &&
          ` - ${errorText.error?.toUpperCase()}`}
      </div>
      <br />
      <div>
        <Button
          style={{
            fontSize: 40,
            fontFamily: "Source Code Pro",
            fontWeight: "bold",
            color: 'red'
          }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default memo(CustomError);
