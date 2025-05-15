export enum MailTemplateKey {
    ConfirmEmail,
    ChangePassword,
    ChangeEmail,
    ForgotPassword,
    SendFormByEmail,
    NewNotification,
    UserAccountDeleted,
    NewFormCommentAdded
}

export interface IEmail {
    to: string,
    from: string,
    mailTemplateKey: MailTemplateKey,
    transformWith: string[]
}