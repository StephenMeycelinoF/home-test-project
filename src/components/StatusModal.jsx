import { CheckCircleIcon, Wallet, XCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function StatusModal({
  isOpen,
  onClose,
  status,
  message,
  amount,
  onConfirm,
  title,
  onContinue,
  onCancel,
}) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (status === "success" || status === "error") {
      navigate("/welcome"); // navigate to welcome page when top-up is successful or failed
    } else {
      onContinue(); // continue with the top-up if status is confirm
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[300px]">
        <DialogHeader>
          <div
            className={`${
              status === "success"
                ? "bg-green-500"
                : status === "error"
                ? "bg-red-500"
                : "bg-yellow-500"
            } rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
          >
            {status === "success" ? (
              <CheckCircleIcon size={32} className="text-white" />
            ) : status === "error" ? (
              <XCircleIcon size={32} className="text-white" />
            ) : (
              <Wallet size={32} className="text-white" />
            )}
          </div>
          <DialogTitle>
            {title ||
              (status === "success" ? "Top Up Berhasil" : "Top Up Gagal")}
          </DialogTitle>
          <DialogDescription>
            {message ||
              (status &&
                `Top up sebesar Rp ${Number(amount).toLocaleString("id-ID")} ${
                  status === "success" ? "berhasil" : "gagal"
                }.`)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Tombol dinamis berdasarkan status */}
          <Button variant="default" onClick={handleButtonClick}>
            {status === "success" || status === "error"
              ? "Kembali ke Beranda"
              : "Ya, Lanjutkan Top Up"}
          </Button>

          {status === null && (
            <Button variant="outline" onClick={onCancel}>
              Batalkan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StatusModal;
