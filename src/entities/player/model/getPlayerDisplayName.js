export const getPlayerDisplayName = (player = {}) => {
  const fullName = player.fullName?.trim();
  if (fullName) return fullName;

  return [
    player.firstName ?? player.first_name,
    player.lastName ?? player.last_name,
  ]
    .filter(Boolean)
    .join(' ');
};
