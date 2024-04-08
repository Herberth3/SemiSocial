import AWS from 'aws-sdk';
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";
const Swal = require('sweetalert2');


export const setChatBot = async (form, setChatText, chatText) => {

    const lexRuntimeClient = new LexRuntimeV2Client({
        credentials: new AWS.Credentials(
            'AKIAVFLXDNS5BGWZJPWJ',
            'tqcmUcb1SawqrnGvpJXJ8Bre7CoJNO+6xBGa9JFk'
        ),
        region: 'us-east-1'
    });


    const params = {
        botAliasId: 'TSTALIASID',
        botId: 'QFSYMCMXPL',
        localeId: 'es_419',
        text: form.message,
        sessionId: 'admin_semi1',
    };


    try {

        const command = new RecognizeTextCommand(params);
        const data = await lexRuntimeClient.send(command);
        const response = data.messages[0].content;

        setChatText([...chatText,
        { position: "right", type: "text", title: "Fernando Serrano", text: form.message },
        { position: "left", type: "text", title: "Ingenieria Bot", text: response }
        ]);


    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: `${error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
