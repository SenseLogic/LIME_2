// -- IMPORTS

import { contactService } from "../../services/contact_service.ts";
import { resendService } from "../../services/resend_service.ts";
import { define } from "../../utils.ts";

// -- VARIABLES

export const handler = define.handlers(
    {
        async POST(
            ctx
            )
        {
            let contactRequest = ctx.req;

            try
            {
                let contactFormData = await contactRequest.formData();

            let contactName = contactFormData.get( "name" )?.toString() || "";
            let contactEmail = contactFormData.get( "email" )?.toString() || "";
            let contactMessage = contactFormData.get( "message" )?.toString() || "";

            if ( contactName
                 && contactEmail
                 && contactMessage
                 && contactName.length > 0
                 && contactEmail.length > 0
                 && contactMessage.length > 0 )
            {
                let contactData =
                {
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage
                };

                let contactServiceResult = await contactService.addContact( contactData );

                if ( contactServiceResult !== null )
                {
                    let senderEmail = Deno.env.get( "LIME_PROJECT_RESEND_EMAIL" );
                    let emailSubject = "Thank you for contacting us";

                    let escapedName
                        = contactName
                            .replace( /&/g, "&amp;" )
                            .replace( /</g, "&lt;" )
                            .replace( />/g, "&gt;" )
                            .replace( /"/g, "&quot;" )
                            .replace( /'/g, "&#39;" );

                    let escapedMessage
                        = contactMessage
                            .replace( /&/g, "&amp;" )
                            .replace( /</g, "&lt;" )
                            .replace( />/g, "&gt;" )
                            .replace( /"/g, "&quot;" )
                            .replace( /'/g, "&#39;" )
                            .replace( /\n/g, "<br>" );

                    let emailBody = `
                <html>
                    <body>
                        <p>Hi ${ escapedName },</p>
                        <p>Thank you for contacting us.</p>
                        <p>We have received your message and will get back to you as soon as possible.</p>
                        <p>Your message:</p>
                        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                            ${ escapedMessage }
                        </p>
                        <p>Best regards,</p>
                        <p>The Lime Project Team</p>
                    </body>
                </html>
            `;

                    await resendService.sendMail(
                        senderEmail,
                        [ contactEmail ],
                        emailSubject,
                        emailBody
                        );

                    return new Response(
                        JSON.stringify(
                            {
                                success: true,
                                message: "Contact form submitted successfully"
                            }
                            ),
                        {
                            status: 200,
                            headers: { "Content-Type": "application/json" }
                        }
                        );
                }
                else
                {
                    return new Response(
                        JSON.stringify(
                            {
                                success: false,
                                error: "Failed to save contact information"
                            }
                            ),
                        {
                            status: 500,
                            headers: { "Content-Type": "application/json" }
                        }
                        );
                }
            }
            else
            {
                return new Response(
                    JSON.stringify(
                        {
                            success: false,
                            error: "All fields are required"
                        }
                        ),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" }
                    }
                    );
            }
        }
        catch ( contactError )
        {
            console.error( "Error processing contact form:", contactError );

            return new Response(
                JSON.stringify(
                    {
                        success: false,
                        error: "Internal server error"
                    }
                    ),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
                );
            }
        }
    }
    );
