import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  // تحديث التحقق من صحة الهاتف ليقبل تنسيقات متعددة إذا لزم الأمر
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number must be a valid format")
    .required("Phone Number is required")
    .test(
      "len",
      "Phone number must be 10-15 digits",
      (val) => val && val.length >= 8 && val.length <= 15
    ),

  // تحديث التحقق من صحة التاريخ
  birthday: yup
    .date()
    .transform((value, originalValue) => {
      // تحويل الإدخال إلى تنسيق Date صالح إذا لزم الأمر
      const formattedDate = new Date(originalValue);
      return isNaN(formattedDate.getTime()) ? new Date() : formattedDate;
    })
    .required("Birthday is required")
    .max(new Date(), "Birthday cannot be in the future"),

  password: yup.string().min(4).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required(),
});
