export const cleanWhatsappNumber = phoneNumber => {
  return phoneNumber.toLowerCase().replace('whatsapp:', '');
}
