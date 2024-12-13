import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "./authApiSlice";
import InputWithIcons from "@/components/ui/inputWithIcons";
import { AtSign, Eye, EyeClosed, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { illustrasi_login, logo } from "@/assets";
import { toast } from "react-toastify";

const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, firstName, lastName, password]);

  const tooglePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const toogleConfirmPassword = () => {
    setIsShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Email tidak valid");
      if (errRef.current) errRef.current.focus();
      return;
    }

    if (password.length < 8) {
      toast.error("Password harus minimal 8 karakter");
      if (errRef.current) errRef.current.focus();
      return;
    }

    try {
      await register({
        email,
        firstName,
        lastName,
        password,
      }).unwrap();

      toast.success("Registrasi berhasil! Redirecting...");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log("Error Response:", err);

      if (!err?.originalStatus) {
        toast.error("Server tidak merespon");
      } else if (err.originalStatus === 400) {
        toast.error("Terjadi kesalahan pada inputan");
      } else if (err.originalStatus === 401) {
        toast.error("Akun tidak ditemukan");
      } else {
        toast.error("Registrasi Gagal");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

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
              id="email"
              innerRef={userRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required
              leftIcon={AtSign}
              placeholder="masukkan email anda"
            />

            <InputWithIcons
              type="text"
              id="firstName"
              innerRef={userRef}
              value={firstName}
              onChange={handleFirstNameInput}
              autoComplete="off"
              required
              leftIcon={User}
              placeholder="nama depan"
            />

            <InputWithIcons
              type="text"
              id="lastName"
              innerRef={userRef}
              value={lastName}
              onChange={handleLastNameInput}
              autoComplete="off"
              required
              leftIcon={User}
              placeholder="nama belakang"
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
              placeholder="buat password"
            />

            <InputWithIcons
              id="confirmPassword"
              onChange={handleConfirmPasswordInput}
              onClickRightIcon={toogleConfirmPassword}
              value={confirmPassword}
              required
              leftIcon={Lock}
              rightIcon={isShowConfirmPassword ? EyeClosed : Eye}
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="konfirmasi password"
            />
          </div>
          <div className="space-y-4 md:space-y-8">
            <Button
              type="submit"
              className="w-full p-5"
              isLoading={isLoading ? true : false}
            >
              Registrasi
            </Button>

            <div className="flex items-center">
              <p className="mr-1">Sudah punya akun? login</p>
              <Link
                to="/login"
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

export default Registration;
