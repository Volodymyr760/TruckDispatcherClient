import { HeatmapCardTitleProps } from '../types'

export default function HeatmapCardTitle({ title }: HeatmapCardTitleProps): JSX.Element {
    return (
        <div className='heatmap-title'>
            <span className='heatmap-small' >{title}</span>
        </div>
    )
}
