import AccountBalance from "@/components/AccountBalance";
import { useNavigate } from "react-router-dom";
import { useGetBannersQuery, useGetServicesQuery } from "../auth/authApiSlice";

const Welcome = () => {
  const navigate = useNavigate();

  const {
    data: banners,
    isLoading: isLoadingBanner,
    isError: isErrorBanner,
    error: errorBanner,
  } = useGetBannersQuery();

  const {
    data: services,
    isLoading: isLoadingServices,
    isError: isErrorServices,
    error: errorServices,
  } = useGetServicesQuery();

  if (isLoadingBanner || isLoadingServices) return <p>Loading...</p>;
  if (isErrorBanner) return <p>Error Banner: {errorBanner.message}</p>;
  if (isErrorServices) return <p>Error Services: {errorServices.message}</p>;

  const handleServiceClick = (serviceCode, serviceTariff) => {
    navigate("/payment", { state: { serviceCode, serviceTariff } });
  };

  return (
    <section className="space-y-8">
      <AccountBalance />

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {services.map((service) => (
          <div 
            key={service.service_code}
            className="w-full h-fit flex flex-col items-center justify-start text-center text-sm cursor-pointer"
            onClick={() =>
              handleServiceClick(service.service_code, service.service_tariff)
            }
          >
            <img src={service.service_icon} alt={service.service_name} className="mb-2" />
            <p>{service.service_name}</p>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 w-max">
              {banners.map((banner, index) => (
                <div key={index} className="w-full">
                  <img src={banner.banner_image} alt={banner.banner_name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
