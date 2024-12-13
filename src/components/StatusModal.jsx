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

function StatusModal({
  isOpen,
  onClose,
  status,
  message,
  amount,
  onConfirm,
  title,
  onRetry,
}) {
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
                : "bg-red-500"
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
          <DialogTitle className="text-center">
            {title ||
              (status === "success" ? "Berhasil!" : "gagal")}
          </DialogTitle>
          <DialogDescription className="text-center text-3xl font-bold text-gray-800">
            {message ||
              (status &&
                `Top up sebesar Rp ${Number(amount).toLocaleString("id-ID")} ${
                  status === "success" ? "berhasil" : "gagal"
                }.`)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex flex-col items-center gap-2">
            {status !== "success" && (
              <Button
                variant="ghost"
                className="w-full text-red-500"
                onClick={onRetry}
              >
                Ya, Lanjutkan Top Up
              </Button>
            )}

            {status && (
              <Button
                variant="ghost"
                className="w-full text-gray-500"
                onClick={onConfirm}
              >
                {status === "success" ? "Kembali ke Beranda" : "Batalkan"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StatusModal;
