export const getCardFields = (errors: any) => ({
  cardDetails: [
    { id: "title", label: "Title", path: "title", error: errors.title },
    {
      id: "subtitle",
      label: "Subtitle",
      path: "subtitle",
      error: errors.subtitle,
    },
  ],
  contact: [
    {
      id: "phone",
      label: "Phone",
      path: "phone",
      type: "tel",
      error: errors.phone,
    },
    {
      id: "email",
      label: "Email",
      path: "email",
      type: "email",
      error: errors.email,
    },
    {
      id: "web",
      label: "Website (Optional)",
      path: "web",
      type: "url",
      error: errors.web,
    },
  ],
  image: [
    {
      id: "imageUrl",
      label: "Image URL",
      path: "imageUrl",
      type: "url",
      error: errors.imageUrl,
    },
    {
      id: "imageAlt",
      label: "Image Alt Text",
      path: "imageAlt",
      error: errors.imageAlt,
    },
  ],
  address: [
    { id: "country", label: "Country", path: "country", error: errors.country },
    { id: "state", label: "State", path: "state", error: errors.state },
    { id: "city", label: "City", path: "city", error: errors.city },
    { id: "street", label: "Street", path: "street", error: errors.street },
    {
      id: "houseNumber",
      label: "House Number",
      path: "houseNumber",
      type: "number",
      error: errors.houseNumber,
    },
    {
      id: "zip",
      label: "ZIP Code",
      path: "zip",
      type: "number",
      error: errors.zip,
    },
  ],
});
