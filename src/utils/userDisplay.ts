import { User } from "@/services/authService";

/**
 * Get the display name for the navigation button
 * Priority: first_name + last_name > first_name > username
 */
export const getNavigationDisplayName = (user: User | null): string => {
  if (!user) return "";
  
  const firstName = user.first_name?.trim();
  const lastName = user.last_name?.trim();
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else {
    return user.username;
  }
};

/**
 * Get the display name for the dropdown menu
 * Shows "Anonymous Hamster" if no first/last name, otherwise shows first + last name or just first name
 */
export const getDropdownDisplayName = (user: User | null): string => {
  if (!user) return "Anonymous Hamster";
  
  const firstName = user.first_name?.trim();
  const lastName = user.last_name?.trim();
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else {
    return "Anonymous Hamster";
  }
};

/**
 * Get the subtitle for the dropdown menu (always shows username)
 */
export const getDropdownSubtitle = (user: User | null): string => {
  if (!user) return "";
  return user.username;
};
