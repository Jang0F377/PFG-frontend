export const convertMilitaryToStandard = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const standardHour = hour % 12 || 12;
  return `${standardHour}:${minutes} ${period}`;
};
