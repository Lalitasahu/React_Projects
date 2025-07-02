export const websiteSchema = {
  websiteUrl: {
    required: "Website URL is required",
    pattern: {
      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      message: "Invalid URL format"
    }
  },
  primaryLanguage: {
    required: "Primary language is required"
  },
  country: {
    required: "Country is required"
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 20,
      message: "Description must be at least 20 characters"
    }
  },
  guestPostPrice: {
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid price format"
    }
  },
  linkInsertionPrice: {
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid price format"
    }
  },
  homePagePrice: {
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid price format"
    }
  },
  homePageDescription: {
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters"
    }
  }
};