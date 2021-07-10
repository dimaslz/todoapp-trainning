export default function random(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
};