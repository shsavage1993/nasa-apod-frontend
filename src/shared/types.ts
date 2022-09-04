export type apodDataType = { [key: string]: string; }; // can be made more specific

export interface ApodImageData {
    url: string;
    title: string;
    explanation: string;
}