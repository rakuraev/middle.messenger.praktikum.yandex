interface UpdateProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

interface UpdateProfileAvatar extends FormData {
  avatar: File;
}

interface UpdateProfilePassword {
  oldPassword: string;
  newPassword: string;
}
