import { EyeIcon, EyeOffIcon } from "lucide-react";
import { profile_photo } from "../assets";
import Title from "./ui/Title";
import {
  useGetBalanceQuery,
  useGetProfileQuery,
} from "@/features/auth/authApiSlice";
import { useState } from "react";

function AccountBalance() {
  const [showSaldo, setShowSaldo] = useState(false);

  const toogleSaldo = () => {
    setShowSaldo((prev) => !prev);
  };

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile,
  } = useGetProfileQuery();

  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
    error: errorBalance,
  } = useGetBalanceQuery();

  if (isLoadingProfile || isLoadingBalance) return <p>Loading...</p>;
  if (isErrorProfile) return <p>Error Profile: {errorProfile.message}</p>;
  if (isErrorBalance) return <p>Error Balance: {errorBalance.message}</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="flex flex-col w-full">
          <img
            src={profile_photo}
            alt="USER PROFILE"
            className="w-16 h-16 rounded-full"
          />
          <div className="mt-4">
            <Title
              title={"Selamat Datang,"}
              subtitle={`${profile?.first_name} ${profile?.last_name}`}
            />
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-saldo bg-cover bg-right w-full h-fit flex items-center rounded-xl ">
          <div className="p-6 text-white space-y-2">
            <span>Saldo Anda</span>
            <div className="flex items-center w-full font-bold text-3xl">
              <span className="mr-1">Rp</span>
              <input
                type={showSaldo ? "text" : "password"}
                value={balanceData?.balance.toLocaleString("id-ID")}
                readOnly
                className="bg-transparent border-none font-bold text-3xl max-w-[9.375rem]  text-white w-auto outline-none"
              />
            </div>
            <div className="flex items-center gap-1" onClick={toogleSaldo}>
              <p>{showSaldo ? "Tutup Saldo" : "Lihat Saldo"}</p>
              {showSaldo ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountBalance;
