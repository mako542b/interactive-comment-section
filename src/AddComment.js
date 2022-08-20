import { useState } from 'react'
import newComment from './newComment'

const AddComment = ({
        setComments, 
        comments,
        actionType,
        parentId,
        commentId,
        setActiveComment,
        replyingTo,
        textBody='',
        editingComment,
        setEditingComment,
        comment,
        updateComment,
        setIsUpdated
    }) => {

const[text, setText] = useState(textBody)

let editOn = actionType === 'edit'

const add = (e) => {
    e.preventDefault()
    let id = parentId ? parentId : commentId
    let comm = newComment(text,id,replyingTo)
    if(actionType === 'newComment'){
    let updatedComments = [...comments,comm];
    setComments(updatedComments)
    }   else if(actionType === 'reply'){
    let updatedComments = comments.map(comment => {
        if(comment.id === id){
            comment.replies = [...comment.replies,comm]
            return comment
        }   else  {
            return comment
        }
    })
    setComments(updatedComments)
    }
    setText('')
    setActiveComment(null)
}

const minEdit = (e) => {
    setEditingComment(null)
}

const updateClick = () => {
    setIsUpdated(true)
    updateComment(comment,text)
}

    return (
    <form onSubmit={add} className="add-comment white-bkg">
             <img className="img avatar comment-av" src="./images/avatars/image-amyrobson.png" alt=""/>
             <textarea className="textarea" name="comment" id="cmt" placeholder="Add a comment..." value={text} onChange={(e)=>setText(e.target.value)}></textarea>
            {!editOn && <button className="btn-reset blue-bkg clr-white send-btn">send</button>}
            {editOn && <button className="btn-reset blue-bkg clr-white send-btn" onClick={updateClick}>update</button>}
         {editOn && <button className="btn-reset send-btn" onClick={minEdit}>cancel</button>}
    </form>
    )
}

export default AddComment;