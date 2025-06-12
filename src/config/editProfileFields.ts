export const getEditProfileFields = (errors: any) => ({
  name: [
    {
      id: "first-name",
      label: "First Name",
      path: "name.first",
      error: errors.name?.first,
    },
    {
      id: "middle-name",
      label: "Middle Name",
      path: "name.middle",
      error: errors.name?.middle,
    },
    {
      id: "last-name",
      label: "Last Name",
      path: "name.last",
      error: errors.name?.last,
    },
  ],  contact: [
    {
      id: "phone",
      label: "Phone",
      path: "phone",
      type: "tel",
      error: errors.phone,
    },
  ],
  image: [
    {
      id: "image-url",
      label: "Image URL",
      path: "image.url",
      type: "url",
      error: errors.image?.url,
    },
    {
      id: "image-alt",
      label: "Image Alt Text",
      path: "image.alt",
      error: errors.image?.alt,
    },
  ],
  address: [
    {
      id: "country",
      label: "Country",
      path: "address.country",
      error: errors.address?.country,
    },
    {
      id: "state",
      label: "State",
      path: "address.state",
      error: errors.address?.state,
    },
    {
      id: "city",
      label: "City",
      path: "address.city",
      error: errors.address?.city,
    },
    {
      id: "street",
      label: "Street",
      path: "address.street",
      error: errors.address?.street,
    },
    {
      id: "house-number",
      label: "House Number",
      path: "address.houseNumber",
      type: "text",
      error: errors.address?.houseNumber,
    },
    {
      id: "zip",
      label: "ZIP Code",
      path: "address.zip",
      type: "text",
      error: errors.address?.zip,
    },
  ],
});
