
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (dateString: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const date = new Date(dateString);
  
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const getRelativeDateLabel = (dateString: string): string => {
  if (isToday(dateString)) return 'Today';
  if (isTomorrow(dateString)) return 'Tomorrow';
  
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1 && diffDays <= 7) {
    return dayOfWeek;
  }
  
  return formatDate(dateString);
};
