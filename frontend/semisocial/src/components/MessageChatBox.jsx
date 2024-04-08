import React from 'react';
import { MessageList } from "react-chat-elements";

export const MessageChatBox = ({ chatText }) => {

    // console.log(chatText);

    return (
        <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={chatText}

        // dataSource={[
        //     {
        //         position: "left",
        //         type: "text",
        //         title: "Kursat",
        //         text: "Give me a message list example !",
        //     },
        //     {
        //         position: "right",
        //         type: "text",
        //         title: "Emre",
        //         text: "That's all.",
        //     }
        // ]}

        />

    )
}
