import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  //import methods from useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      //if login is successful, get the user information and token (auth token and refresh token) from the responce. and rediect to the home page.
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`Login time auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });

          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      //error hle react-hook-form ei error message set kori. r eta global error, ekhane form er jonno global; mane kono particular field er somossa na borong puro form er processing ei error hoyeche kono jaigai. sejinno root e random e message ta rakhlam with type "random" mentioned. 
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      // onSubmit e handleSubmit er vitor, form submit hle kon function ta execute korbe seta bole dite hobe. ei submitForm function ta parameter e formData k pabe (automatically). 
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
        // aladavabe state maintain korte hocche na. register korle e 'react-hook-form' nije e form field er state maintain korbe. shei register er first parameter e field id (id na thakle, name dite hobe), second parameter e validation rule (ekahne required rakha hoyeche mane ei field blank rakha jabe na. rakhle ei error message pathaba). 
          {...register("email", { required: "Email ID is Required" })}
          //error e jodi email thake tahole eo field er border red koro. eta sudhu color k red korche r message ta dekha jabe <Field /> component er vitor jekhane error pass kora hoyeche ebong error valu pele oi <Field /> e error ta dekhabe.
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
        //ekhane extra validation rules bola hoyeche jemon minimum 8 characters hote hobe. na hle ekta error dao.
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <Field>
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
