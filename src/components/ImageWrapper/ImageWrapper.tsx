import { ImageWrapperProps } from './ImageWrapperProps'

export default function ImageWrapper({ source }: ImageWrapperProps): JSX.Element {
    return (
        <div style={{ textAlign: "center", width: "100%" }}>
            <img src={source} alt="" width="100%" />
        </div>
    )
}
