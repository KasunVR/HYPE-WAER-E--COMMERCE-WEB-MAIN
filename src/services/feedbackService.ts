export interface Feedback {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = 'hype_wear_feedback';

export const getAllFeedback = (): Feedback[] => {
  try {
    const feedback = localStorage.getItem(STORAGE_KEY);
    return feedback ? JSON.parse(feedback) : [];
  } catch (error) {
    console.error('Error loading feedback:', error);
    return [];
  }
};

export const addFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback => {
  const newFeedback: Feedback = {
    ...feedback,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const allFeedback = getAllFeedback();
  allFeedback.push(newFeedback);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFeedback));
  
  return newFeedback;
};

export const deleteFeedback = (id: string): void => {
  const allFeedback = getAllFeedback();
  const updatedFeedback = allFeedback.filter(fb => fb.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedback));
};
