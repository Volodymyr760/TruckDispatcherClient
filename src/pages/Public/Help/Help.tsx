import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import AccordionWrapper from "./AccordionWrapper"

export default function HelpPage() {

    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 320px)' }}>
            <Helmet>
                <title>TruckDispatcher.com - Help</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader title="How to use" />
            <AccordionWrapper title="Let's get started" contentId="content10" panelId="panel10" >
                <span className="text-16">
                    We hope you have successfully registered, confirmed your email,
                    signed in the site and gained access to the Dashboard (top right).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/dashboard-access.jpg"} alt="" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Creating a new form" contentId="content20" panelId="panel20" >
                <span className="text-16">
                    On Dashboard page select option Drafts (1) from the left menu and click the button "+ New Form" (2).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-form-1.jpg"} alt="creating form" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    The form has been created, the editing window will open:
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-form-2.jpg"} alt="creating form" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Change the title, description, add an illustration of the form and a multiple choice question. At the end of the work,
                    click "Save".
                </span>
            </AccordionWrapper>
            <AccordionWrapper title="Creating a form using template" contentId="content30" panelId="panel30" >
                <span className="text-16">
                    On Dashboard page, choose the desired template and click Use as draft.
                    A copy of the template will be created on the Drafts page.
                    Edit the form according to your needs and click "Save":
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-form-3.jpg"} alt="creating form" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Share a form using link" contentId="content40" panelId="panel40" >
                <span className="text-16">
                    On Drafts page click Link option for choosed form.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-form-4.jpg"} alt="creating form" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Then copy the appeared link.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-form-5.jpg"} alt="creating form" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Paste it in emails, messangers or sms to your recipients.
                    Each time link will be opened by recipient - new copy of this draft will be pushed to Completed page.
                </span>
            </AccordionWrapper>
            <AccordionWrapper title="Contacts" contentId="content50" panelId="panel50" >
                <span className="text-16">
                    Contacts are required to be able to send the form by email and using reminders.
                    Create a list of your contacts to which you are going to send forms.
                    Select the "Contacts" item (1) in the menu on the left and click the "+ New contact" button (2).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-contact-1.jpg"} alt="creating contact" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Sending a form" contentId="content50" panelId="panel50" >
                <span className="text-16">
                    "Send" form option is available on Drafts page when "Send by" option is turned to "Email"
                    (change it using Edit option, in the chapter "Form sharing options" select Email).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/send-form-1.jpg"} alt="sending form" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    If you have filled Contacts list - click "Send" for choosed form: in appeared window you check needed contacts -
                    each of them will recieve email with link to copy of your draft form to fill out.
                    All the sent forms will be visible on Sent page.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/send-form-2.jpg"} alt="sending form" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Commenting results" contentId="content60" panelId="panel60" >
                <span className="text-16">
                    Commenting on results is only available for forms submitted by email.
                </span>
                <span className="text-16">
                    After the recipient fills out the form, the form is on Completed page.
                    Click the "View & comment" button and add your comments to the answers to the question of the form and to the result of filling in as a whole.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/add-comment-2.jpg"} alt="adding comments" width='50%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Recipient will see the updates if you want to send an email notification.
                </span>
            </AccordionWrapper>
            <AccordionWrapper title="Images location" contentId="content70" panelId="panel70" >
                <span className="text-16">
                    If the recipient of the form allowed the location of the device to be determined while uploading the photo,
                    you will see the "Location" option in the completed form: click to show it on a Google map.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/image-location-1.jpg"} alt="location" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Reminders" contentId="content80" panelId="panel80" >
                <span className="text-16">
                    It's possible to configure the form to be automatically sent to a contact's email.
                </span>
                <span className="text-16">
                    Click 'Edit' one of your forms on the Drafts page and make sure "Send by Email" option is enabled
                    and one of your contacts is selected:
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/set-reminder-1.jpg"} alt="set reminder" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Go back to this form on the Drafts page - the "Set reminder" option will be available:
                    click to set the start and end time and frequency of submission.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/set-reminder-2.jpg"} alt="set reminder" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Click "Save": the specified contact will receive emails according to the configured schedule
                    with a link to the form to fill out.
                </span>
            </AccordionWrapper>
            <AccordionWrapper title="Billing" contentId="content90" panelId="panel90" >
                <span className="text-16">
                    To receive an invoice for payment of Optimal or Premium price package - on the Billing page (1),
                    use the "+ Order" button (2) and specify the desired options in the invoice settings window.
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/billing-1.jpg"} alt="set reminder" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <br />
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/billing-2.jpg"} alt="set reminder" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Receipt of account payment is checked 2 times a day
                    and the administrator changes the limits of the user's price package.
                </span>
                <span className="text-16">
                    When the paid package expires, the administrator returns the Free price package to the user;
                    contacts, images and reminders exceeding the limits are automatically deleted.
                </span>
            </AccordionWrapper>
        </Container>
    )
}
