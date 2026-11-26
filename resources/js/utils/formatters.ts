// Utility fungsi pembantu untuk pemformatan data

export function formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    } catch {
        return dateStr;
    }
}

export function formatPercentage(value: number, total: number): string {
    if (total === 0) return '0%';
    const pct = Math.round((value / total) * 100);
    return `${pct}%`;
}

export function truncateText(text: string, maxLength: number = 60): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}
