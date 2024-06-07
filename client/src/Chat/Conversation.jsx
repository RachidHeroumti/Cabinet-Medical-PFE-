import React from 'react'
import ConversationItem from './ConversationItem';
const Conversation = () => {

    const data = [
        {name:'Ahmed Jamal',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'kamal Razzi',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Ahmed Hassan',time:'yesterday', message: 'I\'m thingking of resigning'},

    ]

    return (
        <div className="p-1">
            {
                data.map((item, index) => (
                    <ConversationItem 
                        message={item.message}
                        time={item.time} 
                        name={item.name} 
                        active={item.active}
                    />
                ))
            }
        </div>
    )
}

export default Conversation
