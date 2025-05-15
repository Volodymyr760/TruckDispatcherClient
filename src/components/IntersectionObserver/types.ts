export interface IntersectionObserverProps {
    onIntersection: (entries: IntersectionObserverEntry[]) => void
    options?: IntersectionObserverInit
}