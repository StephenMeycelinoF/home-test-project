import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Loader } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../auth/authApiSlice";
import { profile_photo } from "@/assets";

function Profile() {
  const { data, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updateProfileImage, { isLoading: isUpdatingImage, isSuccess }] =
    useUpdateProfileImageMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setProfileImage(data.profile_image);
    }
  }, [data]);

  const handleUpdateProfile = () => {
    updateProfile({ first_name: firstName, last_name: lastName });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file);

      updateProfileImage(formData)
        .then((response) => {
          if (response?.data?.status === 0) {
            setProfileImage(response.data.profile_image);
          } else {
            console.error(
              "Failed to update profile image:",
              response?.data?.message || "No message"
            );
          }
        })
        .catch((error) => {
          console.error("Upload failed:", error);

          if (error?.response?.data?.message) {
            console.error("Server error:", error.response.data.message);
          } else {
            console.error("Unknown error:", error);
          }
        });
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex justify-center items-center space-x-4">
        <div className="relative">
          <img
            src={profileImage || profile_photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer"
          >
            <Pencil className="text-gray-800" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Nama Depan</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Nama Belakang</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <Loader className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>

      {/* Tampilkan loading spinner saat gambar sedang diupload */}
      {isUpdatingImage && <Loader className="animate-spin text-center mt-4" />}
      {isSuccess && (
        <p className="text-green-500 mt-4">Image updated successfully!</p>
      )}
    </section>
  );
}

export default Profile;
