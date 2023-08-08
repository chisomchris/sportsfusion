import React, { useState, startTransition, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

export const CountUp = ({ start = 0, end, duration = 2, fromPrev }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    })
    const validate = () => fromPrev && typeof fromPrev === 'number' && end - fromPrev < end;
    const countDuration = duration * 1000;
    const interval = validate() ? end - fromPrev : end - start;
    const [count, setCount] = useState(validate() ? end - fromPrev : start)
    const countUp = React.useCallback((count) => {
        for (let index = start; index < count + 1; index++) {
            setTimeout(() => {
                startTransition(() => {
                    setCount(index)
                })
            }, (index * (countDuration / interval)))
        }
    }, [interval, countDuration, start])
    // trigger count only when the element is within the viewport
    useEffect(() => {
        countUp(end)
    }, [inView, countUp, end])

    return (
        <span ref={ref}>{count}</span>
    )
}