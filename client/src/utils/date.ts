//approximately
export function calculateAge(b_Date: Date): number {
    const date = new Date();
    return date.getFullYear() - b_Date.getFullYear();
}

export function maxDateForAge(age: number): Date {
    const today = new Date();
    today.setFullYear(today.getFullYear() - age);
    return today;
}

export function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
}

export const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getWeekdayName(dayNumber: number) {
    return weekdays[dayNumber];
  }