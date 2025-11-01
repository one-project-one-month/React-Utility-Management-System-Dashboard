export function formatContractDuration(created: string, expiry: string) {
    const start = new Date(created);
    const end = new Date(expiry);

    const totalMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

    if (totalMonths <= 0) return "Invalid period";

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return `${months} Month${months > 1 ? "s" : ""}`;
    if (months === 0) return `${years} Year${years > 1 ? "s" : ""}`;

    return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""}`;
}

export function formatCurrency(value: number | null | string): string {
    const num = typeof value === "number" ? value : Number(value);

    if (!num || isNaN(num)) return "0.00";

    return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}