export const dateFormat = (date:Date) => {
    
    const format = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return format
}
