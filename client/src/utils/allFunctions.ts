export function convertTime(timeInput: string | number): string {
  let totalMinutes: number;

  if (typeof timeInput === 'string' && timeInput.includes(':')) {
    // Si le temps est donné sous forme de chaîne de caractères avec un format "HH:mm"
    const [hours, minutes] = timeInput.split(':').map(Number);
    totalMinutes = hours * 60 + minutes;
  } else {
    // Si le temps est donné sous forme de nombre
    if (typeof timeInput === 'number') {
      totalMinutes =
        timeInput < 1 ? Math.round(timeInput * 60) : timeInput * 60;
    } else {
      // Si le temps est donné sous forme de chaîne de caractères représentant un nombre
      const value = parseFloat(timeInput);
      totalMinutes = value < 1 ? Math.round(value * 60) : value * 60;
    }
  }

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }

  // Calculer les heures et les minutes restantes
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
  }
}
