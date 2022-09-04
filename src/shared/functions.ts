export const lowerCaseDashed = (title: string) => {
    return title.toLowerCase().replaceAll(' ', '-')
}

export const getEncodedTitle = (title: string): string => {
    return encodeURIComponent(lowerCaseDashed(title))
}