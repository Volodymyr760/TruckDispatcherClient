import { LayoutProps } from './types'
import Footer from '../Footer/Footer'
import MainAppBar from '../AppBars/MainAppBar/MainAppBar'
import '../../index.css'

export default function PublicLayout({ children }: LayoutProps): JSX.Element {

    return (
        <>
            <MainAppBar />
                {children}
            <Footer />
        </>
    );
};
