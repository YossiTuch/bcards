import { Button, Card } from "flowbite-react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-red-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <Card className="mx-auto max-w-4xl">
        <div className="relative -mx-6 -mt-6 mb-6 bg-green-200 py-5 dark:bg-slate-700">
          <div className="flex flex-col items-center text-gray-800 dark:text-white">
            <img
              src={user.image?.url || "/profile-image-nav.png"}
              alt={user.image?.alt || "Profile"}
              className="mb-4 size-48 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <h1 className="text-4xl font-bold">
              {user.name.first} {user.name.middle} {user.name.last}
            </h1>
            {user.isAdmin && (
              <span className="mt-2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-gray-800">
                Admin
              </span>
            )}
            {/* Edit Profile Button */}
            <Link to="/edit-profile" className="mt-4">
              <Button
                size="sm"
                color="alternative"
                className="flex items-center gap-2"
              >
                <FaEdit />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* User Information */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <Card>
            <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:text-blue-500"
                  >
                    {user.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={`tel:${user.phone}`} className="hover:text-blue-500">
                    {user.phone}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card>
            <h2 className="mb-4 text-xl font-semibold">Location</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-xl text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>
                    {user.address.street} {user.address.houseNumber}
                  </p>
                  <p>
                    {user.address.city}, {user.address.state} {user.address.zip}
                  </p>
                  <p>{user.address.country}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <FaUserTag className="text-xl text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p>{user.isAdmin ? "Administrator" : "Regular User"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-xl text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Business Status</p>
                  <p>
                    {user.isBusiness ? "Business Account" : "Personal Account"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
