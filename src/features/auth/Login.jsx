import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import InputWithIcons from "@/components/ui/inputWithIcons";
import { Eye, EyeClosed, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { illustrasi_login, logo } from "@/assets";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const tooglePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          email,
          accessToken: userData.data.token,
        })
      );

      localStorage.setItem("accessToken", userData.data.token);

      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
      <div className="space-y-8 md:space-y-12 md:max-w-lg mx-4 sm:mx-auto ">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="LOGO" className="h-8 w-auto" />
          <h3 className="text-2xl font-semibold">SIMS PPOB</h3>
        </div>
        <h1 className="font-bold text-3xl text-center">
          Masuk atau buat akun untuk memulai
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4 md:space-y-8">
            <InputWithIcons
              type="text"
              id="username"
              innerRef={userRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required
              leftIcon={User}
              placeholder="masukkan email anda"
            />

            <InputWithIcons
              id="password"
              onChange={handlePasswordInput}
              onClickRightIcon={tooglePassword}
              value={password}
              required
              leftIcon={Lock}
              rightIcon={isShowPassword ? EyeClosed : Eye}
              type={isShowPassword ? "text" : "password"}
              placeholder="masukkan password anda"
            />
          </div>
          <div className="space-y-4 md:space-y-8">
            <Button
              type="submit"
              className="w-full p-5"
              isLoading={isLoading ? true : false}
            >
              Masuk
            </Button>

            <div className="flex items-center">
              <p className="mr-1">Belum punya akun? register</p>
              <Link
                to="/register"
                className="text-red-500 font-semibold hover:text-red-700"
              >
                disini
              </Link>
            </div>
          </div>
        </form>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
      <img
        src={illustrasi_login}
        alt="illustrasi_login"
        className="w-full h-screen object-center object-cover hidden lg:block"
      />
    </section>
  );

  return content;
};

export default Login;
