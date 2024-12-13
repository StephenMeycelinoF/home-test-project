import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateTransactionMutation } from "../auth/transactionApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AccountBalance from "@/components/AccountBalance";
import { useDispatch } from "react-redux";
import {
  setInvoiceNumber,
  setError,
  resetTransaction,
} from "../auth/transactionSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceCode, serviceTariff } = location.state || {};

  const [serviceCodeInput, setServiceCodeInput] = useState(serviceCode || "");
  const [serviceTariffInput, setServiceTariffInput] = useState(
    serviceTariff || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const [createTransaction, { isLoading: isTransactionLoading, error }] =
    useCreateTransactionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(resetTransaction());

    try {
      const result = await createTransaction(serviceCodeInput).unwrap();
      dispatch(setInvoiceNumber(result.invoice_number));
    } catch (err) {
      dispatch(setError(err.message || "Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <AccountBalance />
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="hidden"
            placeholder="Masukkan Service Code"
            value={serviceCodeInput}
            onChange={(e) => setServiceCodeInput(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Service Tariff"
            value={serviceTariffInput}
            readOnly
          />
          <Button
            type="submit"
            isLoading={isLoading || isTransactionLoading}
            disabled={isLoading || isTransactionLoading}
          >
            Kirim
          </Button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default Payment;
