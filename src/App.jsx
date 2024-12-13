import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/dashboard/Welcome";
import Registration from "./features/auth/Register";
import Topup from "./features/dashboard/Topup";
import Payment from "./features/dashboard/Payment";
import Transaction from "./features/dashboard/Transaction";
import Profile from "./features/dashboard/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="topup" element={<Topup />} />
          <Route path="payment" element={<Payment />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
