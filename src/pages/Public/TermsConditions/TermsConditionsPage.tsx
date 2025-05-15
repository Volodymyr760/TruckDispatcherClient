import { Helmet } from "react-helmet";
import { Container } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader"

export default function TermsConditionsPage() {
    window.scroll(0, 0)

    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>TruckDispatcher.com - Terms and conditions</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader title="Terms and Conditions" />
            <p className="text-14">
                Last Updated: 12 January 2024
            </p>
            <p className="text-16">
                Welcome to TruckDispatcher.com (the "Service"). Please read these Terms and Conditions carefully before using the Service.
            </p>
            <p className="text-16">
                By accessing or using the Service, you agree to comply with and be bound by these Terms and Conditions.
                If you do not agree Terms and Conditions, please do not use the Service.
            </p>
            <p className="pt2">
                Intellectual Property
            </p>
            <p className="text-16">
                The Service and its original content, features, and functionality are owned by Service and are protected by international
                copyright, trademark, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="pt2">
                Use License
            </p>
            <p className="text-16">
                Permission is granted to temporarily usage one account on the Service. This is the grant of a license,
                not a transfer of title, and under this license, you may not:
            </p>
            <ul className="text-16">
                <li>
                    Modify or copy the materials;
                </li>
                <li>
                    Attempt to decompile or reverse engineer any software contained on the Service;
                </li>
                <li>
                    Remove any copyright or other proprietary notations from the materials; or
                </li>
                <li>
                    Transfer the materials to another person or "mirror" the materials on any other server.
                </li>
            </ul>
            <p className="text-16">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by
                Service at any time. Upon terminating your viewing of these materials or upon the termination of this license,
                you must destroy any downloaded materials in your possession, whether in electronic or printed format.
            </p>
            <p className="pt2">
                Disclaimer
            </p>
            <p className="text-16">
                The materials on the Service are provided "as is." Service makes no warranties, expressed or implied,
                and hereby disclaims and negates all other warranties, including without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or
                other violation of rights.
            </p>
            <p className="text-16">
                Further, Service does not warrant or make any representations concerning the accuracy, likely results,
                or reliability of the use of the materials on the Service or otherwise relating to such materials or on any sites
                linked to this site.
            </p>
            <p className="pt2">
                Limitations
            </p>
            <p className="text-16">
                In no event shall Service or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use
                the materials on the Service, even if Service or a Service authorized representative
                has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow
                limitations on implied warranties, or limitations of liability for consequential or incidental damages, these
                limitations may not apply to you.
            </p>
            <p className="pt2">
                Revisions and Errata
            </p>
            <p className="text-16">
                The materials appearing on the Service could include technical, typographical, or photographic errors.
                Service does not warrant that any of the materials on its website are accurate, complete, or current.
                Service may make changes to the materials contained on the Service at any time without notice.
                Service does not, however, make any commitment to updating the materials.
            </p>
            <p className="pt2">
                Links
            </p>
            <p className="text-16">
                Service has not reviewed all the sites linked to its Internet website and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by Service of the site.
                Use of any such linked Service is at the user's own risk.
            </p>
            <p className="pt2">
                Site Terms of Use Modifications
            </p>
            <p className="text-16">
                Service may revise these Terms and Conditions for the Service at any time without notice. By using this Service,
                you are agreeing to be bound by the then current version of these Terms and Conditions.
            </p>
            <p className="pt2">
                Governing Law
            </p>
            <p>
                Any claim relating to the Service shall be governed by the laws of your State/Country without regard to its conflict
                of law provisions.
            </p>
            <p className="pt2">
                Contact Information
            </p>
            <p className="text-16">
                If you have any questions about these Terms and Conditions, please contact us
                at <a href="mailto:support@truckdispatcher.com">support@truckdispatcher.com</a>.
            </p>
        </Container>
    )
}
