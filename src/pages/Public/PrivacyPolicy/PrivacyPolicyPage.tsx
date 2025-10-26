import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"

export default function PrivacyPolicyPage() {
    window.scroll(0, 0)
    
    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>TruckDispatcher.top - Privacy Policy</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.top" />
            </Helmet>
            <PageHeader title="Privacy Policy" />
            <p className="text-14">
                Last Updated: 12 January 2024
            </p>
            <p className="text-16">
                This page informs you of TruckDispatcher.top (the "Service") policies regarding the collection, use, and disclosure of personal data
                when you use our Service and the choices you have associated with that data.
            </p>
            <p className="pt2">
                Information Collection and Use
            </p>
            <p className="text-16">
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or
                identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="text-16">
                <li>
                    Email address
                </li>
                <li>
                    First name and last name
                </li>
                <li>
                    Phone number
                </li>
                <li>
                    Cookies
                </li>
                <li>
                    Usage Data (login date)
                </li>
            </ul>
            <p className="pt2">
                Usage Data
            </p>
            <p className="text-16">
                We may also collect information that your browser sends whenever you visit our Service 
                or when you access the Service using a mobile device.
            </p>
            <p className="text-16">This usage data may only be used for:</p>
            <ul className="text-16">
                <li>
                    Sending critical messages to registered site users;
                </li>
                <li>
                    Non-personalized analytics of site usage by our internal management.
                </li>
            </ul>
            <p className="text-16">
                We do not use the data you provide for advertising purposes, we do not transfer it to third parties,
                except when required by a court decision.
            </p>
            <p className="pt2">
                Accuracy of Content
            </p>
            <p className="text-16">
                Service makes every effort to ensure the accuracy of the information provided on this website.
                However, we do not warrant or guarantee the accuracy, reliability, completeness, or suitability of the information
                and materials found or offered on this website. Users acknowledge that such information and materials
                may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors
                to the fullest extent permitted by law.
            </p>
            <p className="pt2">
                Inappropriate Content
            </p>
            <p className="text-16">
                Users are prohibited from uploading, posting, or transmitting any content that is inaccurate, misleading, offensive,
                illegal, or violates the rights of others. Service reserves the right to monitor and review user-generated
                content and remove any content that, in its sole discretion, violates these terms or is otherwise objectionable.
            </p>
            <p className="pt2">
                Consequences of Violation
            </p>
            <p className="text-16">
                Users who violate the accuracy and appropriateness standards outlined in these terms may face consequences,
                including but not limited to:
            </p>
            <ul className="text-16">
                <li>
                    Content Removal: Service reserves the right to remove, edit, or refuse to post any content
                    that violates these terms without prior notice.
                </li>
                <li>
                    Account Suspension or Termination: Repeated violations may result in the suspension or termination of a user's account.
                </li>
                <li>
                    Legal Action: Service may take legal action against users who engage in activities that violate applicable laws or regulations.
                </li>
            </ul>
            <p className="pt2">
                Reporting Inaccuracies or Inappropriate Content
            </p>
            <p className="text-16">
                Users are encouraged to report any inaccuracies or inappropriate content by contacting support@truckdispatcher.top.
            </p>
            <p className="pt2">
                Changes to this Warning
            </p>
            <p className="text-16">
                Service reserves the right to update or change this content accuracy and inappropriate content warning at any time
                without notice. Users are encouraged to review this warning periodically for any changes.
            </p>
            <p className="text-16">
                By using this website, you agree to comply with and be bound by the terms and conditions outlined in this warning.
            </p>
        </Container>
    )
}
