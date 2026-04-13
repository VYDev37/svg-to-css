export function getUniqueName(name: string, existingNames: string[]) {
    const lastDotIndex = name.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? name.slice(0, lastDotIndex) : name;
    const extension = lastDotIndex !== -1 ? name.slice(lastDotIndex).toLowerCase() : '';

    const cleaned = baseName.toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

    const final = `${cleaned}${extension}`;
    if (!existingNames.includes(final)) {
        return final;
    }

    let counter = 1;
    let newName = `${cleaned}-${counter}${extension}`;
    while (existingNames.includes(newName)) {
        counter++;
        newName = `${cleaned}-${counter}${extension}`;
    }

    return newName;
};