import React, {FC} from 'react'
import {cardType} from "../../../../api/cards-api";

export const Card:FC<cardType> = ({user_id,_id,created,updated,grade,type,rating,cardsPack_id,question,shots,answer,...props}) => {

    return (
        <tr >
            <td>
                {question}
            </td>
            <td>{answer}</td>
            <td>{updated}</td>
            <td>{grade}</td>

        </tr>
    )
}
