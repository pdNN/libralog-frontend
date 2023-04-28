import { FC, useCallback, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

import { useAuth } from "hooks/auth";
import { Wrapper, StyledContainer, ImageContainer } from "./styles";
import Logo from "assets/libra-logo-220.png";
import { useHistory } from "react-router";

interface SignInFormData {
  email_usuario: string;
  des_senha: string;
}

const Login: FC = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const history = useHistory();

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

        toast.success(`Seja bem-vindo ao LibraLog!`);
        history.push("/");
      } catch (err: any) {
        // if (err instanceof Yup.ValidationError) {
        //   const errors = getValidationErrors(err);
        //   formRef.current?.setErrors(errors);
        // }
        toast.error(
          err.response?.data.message
            ? err.response?.data.message
            : "Ocorreu um erro ao fazer login, cheque as credenciais.",
        );
        console.error(`Erro: ${err.response?.data.message}`);
      } finally {
        setLoading(false);
      }
    },
    [signIn, history],
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
              required
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
              required
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
