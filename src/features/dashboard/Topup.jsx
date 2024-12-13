import AccountBalance from "@/components/AccountBalance";
import StatusModal from "@/components/StatusModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/Title";
import { RectangleEllipsisIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useTopUpBalanceMutation } from "../auth/authApiSlice";
import { useState } from "react";

function Topup() {
  const [amount, setAmount] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [status, setStatus] = useState("success");
  const [statusMessage, setStatusMessage] = useState("");
  const [topUpBalance, { isLoading }] = useTopUpBalanceMutation();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSelectAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Masukkan nominal yang valid (lebih besar dari 0).");
      return;
    }

    try {
      const response = await topUpBalance({
        top_up_amount: Number(amount),
      }).unwrap();

      const balance = response?.data?.balance;

      if (balance) {
        setStatus("success");
        setStatusMessage(` berhasil!`);
      } else {
        setStatus("error");
        setStatusMessage("Saldo tidak ditemukan.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(error?.data?.message || "gagal");
    }

    setIsConfirmModalOpen(false);
    setIsStatusModalOpen(true);
  };

  const topUpOptions = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <section className="space-y-8">
      <AccountBalance />

      <div>
        <Title title={"Silahkan masukkan"} subtitle={"Nominal Top Up"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[50%_50%] xl:grid-cols-[65%_35%] gap-6 items-start">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!amount || isLoading) return;
            setIsConfirmModalOpen(true);
          }}
        >
          <div className="relative">
            <Input
              id="top-up-input"
              name="topUpAmount"
              leftIcon={RectangleEllipsisIcon}
              placeholder="Masukkan Nominal Top Up"
              value={amount}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <Button
            variant={amount ? "default" : "secondary"}
            isDisabled={!amount || isLoading}
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Top Up
          </Button>
        </form>

        <div className="grid grid-cols-3 gap-4">
          {topUpOptions.map((option) => (
            <Button
              variant="ghost"
              key={option}
              type="button"
              onClick={() => handleSelectAmount(option)}
              className="border text-gray-600 rounded-lg text-center text-sm lg:text-base font-medium cursor-pointer hover:bg-gray-200"
            >
              Rp{option.toLocaleString("id-ID")}
            </Button>
          ))}
        </div>
      </div>

      <StatusModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        status={"confirm"}
        title={"Anda yakin ingin top up sebesar"}
        message={` ${Number(amount).toLocaleString("id-ID")} ?`}
        amount={amount}
        onConfirm={handleSubmit}
        onRetry={handleSubmit}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={status}
        message={statusMessage}
        amount={amount}
        onConfirm={() => setIsStatusModalOpen(false)}
      />
    </section>
  );
}

export default Topup;
