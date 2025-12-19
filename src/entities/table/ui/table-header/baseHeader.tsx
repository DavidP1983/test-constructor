

export const baseHeader = (data: string[]) => {
    return (
        <>
            {data?.map(elem => (
                <th key={elem}>
                    {elem}
                </th>
            ))}
        </>
    )
}