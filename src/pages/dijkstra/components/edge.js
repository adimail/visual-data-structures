const Edge = ({ startNode, endNode, weight, selected, onSelect }) => {
    const x1 = startNode.x + 25
    const y1 = startNode.y + 25
    const x2 = endNode.x + 25
    const y2 = endNode.y + 25

    const cx = (x1 + x2) / 2
    const cy = (y1 + y2) / 2

    const angle = Math.atan2(y2 - y1, x2 - x1)

    return (
        <>
            <line
                onClick={onSelect}
                stroke={selected ? '#f71a1a' : '#ccc'}
                strokeWidth="3"
                x1={x1}
                x2={x2}
                y1={y1}
                y2={y2}
            />
            <g onClick={onSelect}>
                <rect
                    fill="white"
                    height="32"
                    rx="4"
                    ry="4"
                    stroke="black"
                    strokeWidth="1"
                    width="32"
                    x={cx - 16}
                    y={cy - 16}
                />
                <text
                    cursor="pointer"
                    dy=".3em"
                    fontSize={'1.2em'}
                    fontWeight={selected ? 'bold' : '600'}
                    textAnchor="middle"
                    x={cx}
                    y={cy}
                >
                    {weight}
                </text>
            </g>
            {selected && (
                <g transform={`translate(${cx}, ${cy}) rotate(${angle * (180 / Math.PI)})`}>
                    <rect fill="transparent" height="20" width="20" x="-10" y="-10" />
                </g>
            )}
        </>
    )
}

export default Edge
