import { LoginFormInputs } from 'models';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ButtonSignIn,
  ButtonSignUp,
  Container,
  ForgotPassword,
  FormContainer,
  FormWrapper,
  ImageContainer,
  InputField,
  LoginForm,
  Title,
} from 'styleComponents/page';
import { authActions } from '../authSlice';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, setError, getValues, clearErrors, formState } = useForm<LoginFormInputs>();
  const handleLoginClick = () => {
    const { username, password } = getValues();
    if (!username) {
      setError(
        'username',
        {
          type: 'manual',
          message: '* Không được để trống *',
        },
        { shouldFocus: true },
      );
      return
    } else {
      clearErrors('username');
    }
    if (!password) {
      setError(
        'password',
        {
          type: 'manual',
          message: '* Không được để trống *',
        },
        { shouldFocus: true },
      );
      return
    } else {
      clearErrors('password');
    }
    dispatch(authActions.signIn({
      username,
      password
    }));
  };

  return (
    <div>
      <Container>
        {/* Left Side */}
        <ImageContainer />
        {/* Right Side */}
        <FormContainer>
          <FormWrapper elevation={3}>
            <LoginForm>
              <Title>Quản lý sản phẩm</Title>
              <small style={{ color: 'red' }} className="text-danger">
                {formState.errors.username?.message}
              </small>
              <InputField
                {...register('username', { required: true, maxLength:18, min: 8 })}
                label="Tên đăng nhập hoặc Email"
                variant="outlined"
                fullWidth
              />

              <small style={{ color: 'red' }}>{formState.errors.password?.message}</small>
              <InputField
                {...register('password', { required: true, maxLength:18, min: 8 })}
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ForgotPassword onClick={() => navigate('/forgot-password')}>
                Quên mật khẩu
              </ForgotPassword>
              <ButtonSignIn onClick={() => handleLoginClick()}>Đăng nhập</ButtonSignIn>
              <ButtonSignUp>Đăng ký</ButtonSignUp>
            </LoginForm>
          </FormWrapper>
        </FormContainer>
      </Container>
    </div>
  );
}
