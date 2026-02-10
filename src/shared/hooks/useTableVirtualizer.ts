import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useState } from "react";

export const useTableVirtualizer = (dataLength: number, mobileRowHeight: number, desktopRowHeight: number) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const isMobile = useMediaQuery(992);

    // Используем callBack ref чтобы сохранить элемент между mount/unmount
    const parentRef = useCallback((node: HTMLDivElement | null) => setElement(node), []);

    // eslint-disable-next-line react-hooks/incompatible-library
    const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
        count: dataLength,
        getScrollElement: () => element,
        estimateSize: () => (isMobile ? mobileRowHeight : desktopRowHeight),
        overscan: 2,
    });

    useEffect(() => {
        let throttle = false;
        const handleResize = () => {
            if (!throttle) {
                requestAnimationFrame(() => {
                    virtualizer.measure();
                    throttle = false;
                });
                throttle = true;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [virtualizer, dataLength]);

    return { parentRef, virtualizer, isMobile, element }
}