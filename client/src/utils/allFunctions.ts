import { courseDescriptions } from './ajax';

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
  if (totalMinutes < 1) {
    return `< 1 minute`;
  } else if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }

  // Calculer les heures et les minutes restantes
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} h${hours > 1 ? 's' : ''}`;
  } else {
    return `${hours} h${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
  }
}

interface PaginationResult<T> {
  paginatedData: T[];
  totalPages: number;
  currentPage: number;
}

export function paginate<T>(
  data: T[],
  currentPage: number,
  itemsPerPage = 12
): PaginationResult<T> {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages) {
    currentPage = totalPages;
  } else if (currentPage < 1) {
    currentPage = 1;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    paginatedData,
    totalPages,
    currentPage
  };
}

// const { paginatedData, totalPages, currentPage: page } = paginate(data, currentPage);

export function convertTimestampToTime(timestamp: number) {
  // Convertir le timestamp en millisecondes
  const date = new Date(timestamp * 1000);
  // Obtenir les heures et les minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  // Formater les heures et les minutes pour toujours afficher deux chiffres
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  // Retourner le temps formaté
  if (parseInt(formattedHours) < 1) {
    if (parseInt(formattedMinutes) < 1) {
      return `> 1 minutes`;
    }
    return `${formattedMinutes} minutes`;
  } else if (parseInt(formattedHours) > 1) {
    if (parseInt(formattedMinutes) < 1) {
      return `${formattedHours}h `;
    }
    return `${formattedHours}h ${formattedMinutes} minutes`;
  }

  return `${formattedHours}h ${formattedMinutes} minutes`;
}

export function convertTimestampToHours(timestamp: number): number {
  // Convertir le timestamp en millisec
  const date = new Date(timestamp * 1000);
  // le temps que j'ai trouvé je le met en heure
  const hours = date.getUTCHours();
  return hours;
}

export function getCategoryDescription(title: string): string | undefined {
  const lowerCaseTitle = title.toLocaleLowerCase();

  if (lowerCaseTitle.includes('programmation')) {
    return courseDescriptions.Développement.description;
  } else if (lowerCaseTitle.includes('bureautique')) {
    return courseDescriptions.Bureautique.description;
  } else if (lowerCaseTitle.includes('artificielle')) {
    return courseDescriptions.artificielle.description;
  } else if (lowerCaseTitle.includes('amazon')) {
    return courseDescriptions.amazon.description;
  } else if (lowerCaseTitle.includes('marketing')) {
    return courseDescriptions.Marketing.description;
  }

  return '';
}

//fonction permettant d'ajouter les query string sur un url
export function AddFilterQueryString(key: string, value: string) {
  // Obtenir l'URL actuelle
  const currentUrl = window.location.href;

  // Créer un objet URL à partir de l'URL actuelle
  const url = new URL(currentUrl);

  // Récupérer les paramètres de la requête
  const params = new URLSearchParams(url.search);

  // Récupérer les valeurs existantes pour la clé donnée, s'il y en a
  const existingValues = params.get(key);

  // Convertir les valeurs existantes en tableau si elles existent, sinon tableau vide
  let valuesArray = existingValues ? existingValues.split(',') : [];

  // Vérifier si la valeur est déjà présente dans les valeurs existantes
  if (value === '') {
    // Si la valeur est vide, ne pas ajouter de clé avec une valeur vide
    if (valuesArray.length > 0) {
      // Si la clé a des valeurs existantes, supprimer la clé
      params.delete(key);
    }
  } else if (valuesArray.includes(value)) {
    // Si la valeur existe déjà, la retirer
    valuesArray = valuesArray.filter(v => v !== value);
    // Si aucune valeur ne reste pour cette clé, supprimer la clé
    if (valuesArray.length === 0) {
      params.delete(key);
    } else {
      // Sinon, mettre à jour les valeurs pour cette clé
      params.set(key, valuesArray.join(','));
    }
  } else {
    // Si la valeur n'existe pas, l'ajouter aux valeurs existantes
    valuesArray.push(value);
    params.set(key, valuesArray.join(','));
  }

  // Construire la nouvelle URL avec les paramètres mis à jour
  const newUrl = params.toString()
    ? `${url.pathname}?${params.toString()}`
    : url.pathname;

  // Mettre à jour l'URL dans le navigateur sans recharger la page
  window.history.replaceState(null, '', newUrl);
}

//fonction permettant de retourner le temps par minutes afin de permettre le filtre
export function convertTimeForFilter(timeInput: string | number): number {
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

  return totalMinutes;
}

//formatage des descriptions RAven

// export function formatDescription(description: string) {
//   let cleanedDescription = description
//     .replace(/\n+/g, ' ') // Remplace tous les retours à la ligne par un espace simple
//     .replace(/\s{2,}/g, ' ') // Réduit les espaces multiples à un seul espace
//     .replace(/ {6,}/g, match => ' '.repeat(match.length % 5)) // Remplace les espaces de plus de 5 caractères par un seul espace
//     .trim();

//   if (cleanedDescription.length > 120) {
//     cleanedDescription = cleanedDescription.substring(0, 120).trim() + '...';
//   }

//   return cleanedDescription;
// }

export function formatDescription(inputText: string) {
  const cleanedText = inputText.replace('<p>&nbsp;</p>', '');
  if (cleanedText.length > 130) {
    return cleanedText.slice(0, 130) + '...';
  }
  console.log(cleanedText);

  return cleanedText;
}
