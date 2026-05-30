/**
 * Converts a string to Title Case.
 * "full-stack web" → "Full-Stack Web"
 * "FRONTEND" → "Frontend"
 */
export const toTitleCase = (str) => {
    if (!str || typeof str !== "string") return str;
    return str
        .trim()
        .split(" ")
        .map(word =>
            word.length > 0
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : word
        )
        .join(" ");
};
