import AddComment from './AddComment'
import {useState, useEffect} from 'react'


const Comment = ({
    comment, 
    activeComment, 
    toggleCommentForm, 
    setComments, 
    comments, 
    updateScore,
    setActiveComment,
    userName,
    deleteComment,
    editingComment,
    setEditingComment,
    updateComment
}) => {

    const isPrimary = !comment.parentId
    const [hidden, setHidden] = useState(false)
    const [showHide, setShowHide] = useState('hide replies')
    const [isUpdated, setIsUpdated] = useState(false)


    const isActive = comment.id === activeComment
    const activate = () => {
       if(activeComment !== comment.id) toggleCommentForm(comment.id)
       else toggleCommentForm(null)
    }

    const setHiddenClick = () => {
      setHidden(!hidden)
    }
    const setShowHideCall = (hidden) => {
      let label = hidden? 'show replies': 'hide replies' 
      setShowHide(label)
    }

    // useEffect(()=> {setShowHideCall()},[hidden])
    useEffect(()=>{setShowHideCall(hidden)},[hidden])

    const updateScoreClick = (e) => {
        let val = e.currentTarget.value
        updateScore(val,comment.id,comment.parentId)
    }

    const deleteCommentClick = () => {
      deleteComment(comment)
    }

    const startEdit = () => {
      setEditingComment(comment.id)
    }

    const canDelete = userName === comment.user.username
    const canEdit = userName === comment.user.username
    const isEditing = userName === comment.user.username && comment.id === editingComment

    return (
    <div className="root-comment-master">

      {!isEditing &&(
        <div className="root-comment white-bkg">
        <div className="score main-bkg">
          <button className="btn-reset btn no-bkg" value='plus' onClick={updateScoreClick}><img className="img" src={'./images/icon-plus.svg'} alt=""/></button>
          <span className="point clr-reply f-w-700">{comment.score}</span>
          <button className="btn-reset btn no-bkg" value='minus' onClick={updateScoreClick}><img className="img" src={'./images/icon-minus.svg'} alt=""/></button>
        </div>
        <div className="comm-meta-data">
          <img src={comment.user.image.png} alt="" className="avatar"/>
          <span className="nick nick-clr f-w-700">{comment.user.username}</span>
          <span className="uploaded-on clr-uploaded-on f-w-500">{comment.createdAt}</span>
          {isUpdated && <span className='updated'>updated</span>}
        </div>
        <div className="action-row">
          
          <button className="clr-reply f-w-700 btn-reset no-bkg-gap" onClick={activate}><img src={'./images/icon-reply.svg'} alt=""/> Reply</button>
        {canDelete && <button className="clr-delete f-w-700 btn-reset no-bkg-gap" onClick={deleteCommentClick}><img src={'./images/icon-delete.svg'} alt=""/> delete</button>}
        {canEdit && <button className="clr-reply f-w-700 btn-reset no-bkg-gap" onClick={startEdit}><img src={'./images/icon-edit.svg'} alt=""/> Edit</button>}

        </div>
        <div className="comment-body">
          <p className="actual-comment clr-uploaded-on f-w-500">
            {comment.replyingTo && <span className="replying-to">@{comment.replyingTo} </span>}
            {comment.content}</p>

        </div>
      </div>
    )}
    {isEditing && (
      <AddComment 
      textBody={comment.content}
      setComments={setComments} 
      comments={comments}
      actionType="edit"
      parentId={comment.parentId}
      commentId={comment.id}
      setActiveComment={setActiveComment}
      replyingTo={comment.user.username}
      editingComment={editingComment}
      setEditingComment={setEditingComment}
      comment={comment}
      updateComment={updateComment}
      // isUpdated={isUpdated}
      setIsUpdated={setIsUpdated}

      />
    )}

      {isActive && (
        <AddComment 
        setComments={setComments} 
        comments={comments}
        actionType="reply"
        parentId={comment.parentId}
        commentId={comment.id}
        setActiveComment={setActiveComment}
        replyingTo={comment.user.username}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
        comment={comment}

        />)}

      
    {comment.replies && comment.replies.length > 0 && (
        <div className="reply-comments">
        {isPrimary && <button className="hideShow clr-reply f-w-700 btn-reset no-bkg-gap" onClick={setHiddenClick}>{showHide}</button>}
      {!hidden &&(
        <>
      {comment.replies.map(comment => 
            <Comment key={comment.id} 
            comment={comment} 
            toggleCommentForm={toggleCommentForm} 
            activeComment={activeComment} 
            setComments={setComments} 
            comments={comments}
            setActiveComment={setActiveComment}
            updateScore={updateScore}
            userName={userName}
            deleteComment={deleteComment}
            editingComment={editingComment}
            setEditingComment={setEditingComment}
            updateComment={updateComment}
        />)} 
        </>
      )}
      </div> 
    )}
      
    </div>
    )
}

export default Comment;