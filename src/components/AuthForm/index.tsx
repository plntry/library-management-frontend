import React from "react";
import { Link } from "react-router";
// import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Typography,
  Flex,
  Form,
  FormProps,
  theme,
  // notification as antdNotification,
} from "antd";
// import { ArgsProps } from "antd/es/notification";
// import { handleAxiosError } from "../../utils/apiErrorHandler";
// import { setTokenData } from "../../utils/authUtils";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import {
  // LoginFormData,
  // RegisterFormData,
  AuthRequestType,
  // AuthError,
} from "../../models/Auth";
// import { PATHS } from "../../routes/paths";
// import { auth } from "../../api/auth";
import logo from "../../assets/library-logo.png";
import classes from "./AuthForm.module.css";
import { useTranslation } from "react-i18next";

interface AuthFormProps extends FormProps {
  mode: AuthRequestType;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, children, ...props }) => {
  // const [notification, contextHolder] = antdNotification.useNotification();
  const { token: themeToken } = theme.useToken();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { Title, Paragraph } = Typography;

  const modeToNavigate: "login" | "register" =
    mode === "login" ? "register" : "login";
  const navigateMessage: string = t(
    `auth.messages.${
      modeToNavigate === "login" ? "navigateToRegister" : "navigateToLogin"
    }`
  );

  // const notificationConfig: ArgsProps = {
  //   message: `${capitalizeFirstLetter(mode)} Attempt Unsuccessful`,
  //   description: `Unable to ${mode}`,
  //   placement: "topRight",
  //   duration: 10,
  // };

  // const onFinish = async (formData: RegisterFormData | LoginFormData) => {
  //   const response: AxiosResponse | AxiosError<AuthError> =
  //     mode === "register"
  //       ? await auth.register(formData as RegisterFormData)
  //       : await auth.login(formData as LoginFormData);
  //   console.log({ response });

  //   if (!axios.isAxiosError(response)) {
  //     if (mode === "login") {
  //       setTokenData(response);
  //     }

  //     navigate(PATHS.HOME);
  //   } else {
  //     handleAxiosError(response, notification, notificationConfig);
  //   }
  // };

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className={classes.authContainer}
    >
      <Flex justify="center" align="center">
        <img className={classes.logo} src={logo} alt="Logo" />
        <Title style={{ color: themeToken.colorPrimary }}>{t("appName")}</Title>
      </Flex>
      <Flex vertical align="center" className={classes.formWrapper}>
        <Form
          // onFinish={onFinish}
          {...props}
        >
          {children}
          {/* {contextHolder} */}
        </Form>
        <Paragraph>
          {navigateMessage}{" "}
          <Link to={`?mode=${modeToNavigate}`}>
            {capitalizeFirstLetter(t(`auth.${modeToNavigate}`))}
          </Link>
        </Paragraph>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
