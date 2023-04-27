import { FC, useCallback, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

import { useAuth } from "hooks/auth";
import { Wrapper, StyledContainer, ImageContainer } from "./styles";
import Logo from "assets/libra-logo-220.png";

interface SignInFormData {
  email_usuario: string;
  des_senha: string;
}

const Login: FC = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);

        // formRef.current?.setErrors({});

        // const schema = Yup.object().shape({
        //   cpf: Yup.string().required('CPF obrigatório'),
        //   senha: Yup.string().required('Senha obrigatória'),
        // });

        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        await signIn({
          email_usuario: data.email_usuario,
          des_senha: data.des_senha,
        });
      } catch (err) {
        // if (err instanceof Yup.ValidationError) {
        //   const errors = getValidationErrors(err);
        //   formRef.current?.setErrors(errors);
        // }
        // console.error(err.message);
        // addToast({
        //   type: 'error',
        //   title:
        //     typeof err.response?.data.message === 'string'
        //       ? err.response?.data.message
        //       : 'Erro na autênticação',
        //   description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        // });
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

  return (
    <Wrapper component="main">
      <StyledContainer maxWidth="sm">
        <ImageContainer fixed>
          <img src={Logo} alt="log" />
        </ImageContainer>
        <Typography sx={{ width: "100%" }} component="h1" variant="h5">
          Seja bem-vindo
        </Typography>
        <FormContainer onSuccess={handleSubmit}>
          <Stack justifyContent="flex-start" alignItems="center">
            <TextFieldElement
              margin="normal"
              fullWidth
              label="E-mail"
              name="email_usuario"
              autoComplete="email"
              variant="filled"
            />
            <TextFieldElement
              margin="normal"
              fullWidth
              name="des_senha"
              label="Senha"
              type="password"
              id="des_senha"
              autoComplete="current-password"
              variant="filled"
            />
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "50%" }}
          >
            Entrar
          </Button>
        </FormContainer>
      </StyledContainer>
    </Wrapper>
  );
};

export default Login;
