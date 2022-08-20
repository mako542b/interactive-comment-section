import {useState, useEffect} from 'react' 
import data from './data.json'
import Comment from './Comment'
import AddComment from './AddComment'



const Comments = ({userName}) => {

    const[comments, setComments] = useState([])
    const[activeComment, setActiveComment] = useState([])
    const[editingComment, setEditingComment] = useState(null)


    const toggleCommentForm = (id) => {
        setActiveComment(id)
    }

    useEffect(()=> {
        let defaultComments = [...data.comments]
        setComments(defaultComments)
    },[])

    const updateScore = (val,id,parentId) => {
        let updatedComments = [...comments];
        let score = updatedComments.find(comment => comment.id === id)
        if(!score) {
            score = updatedComments.find(parentComment => parentComment.id === parentId)
                .replies.find(comment => comment.id === id)
        }
        score.score = val === 'plus'? score.score += 1 : score.score -+ 1;
        setComments(updatedComments)
    }

    const deleteComment = (comment) => {
        let id = comment.id
        let parentId = comment.parentId
        let updatedComments = [...comments];
        if(!parentId) {
        updatedComments = updatedComments.filter(comment => comment.id !== id)
        }   else    {
           updatedComments.map(parentComment => {
                if(parentComment.id === parentId){
                    parentComment.replies = parentComment.replies.filter(comment => comment.id !== id)
                    return parentComment
            }   else   {
                    return parentComment
            }
                    })    
        }
        setComments(updatedComments) 
        }

    const updateComment = (comment, edText) => {
        let id = comment.id
        let parentId = comment.parentId
        let updatedComments = [...comments];
        if(!parentId) {
        updatedComments = updatedComments.map(comment => {
           if(comment.id === id){
            let edComment = { ...comment }
            edComment.content = edText
            return edComment
           }    else    {
            return comment
           }
            })
        }   else    {
            updatedComments.map(parentComment => {
                 if(parentComment.id === parentId){
                     let updatedReplies = [...parentComment.replies]
                     updatedReplies.map(comment => {
                        if(comment.id === id){
                            comment.content = edText
                            return comment
                        }   else  {
                            return comment
                        }
                     })
                     return parentComment
             }   else   {
                     return parentComment
             }
                     })    
         }
        setComments(updatedComments) 
        setEditingComment(null)
    }
        
       
    

    return (
        <main className="main main-bkg">
      <div className="sec-main">


    <div className='comments-container'>
        {comments.map(comment => 
        <Comment key={comment.id} 
        comment={comment} 
        toggleCommentForm={toggleCommentForm} 
        activeComment={activeComment} 
        setComments={setComments} 
        comments={comments}
        updateScore={updateScore}
        setActiveComment={setActiveComment}
        userName={userName}
        deleteComment={deleteComment}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
        updateComment={updateComment}
        />)}
    </div>
        <AddComment 
        setComments={setComments} 
        comments={comments} 
        actionType="newComment"
        parentId={null}
        setActiveComment={setActiveComment}
        />
    </div>
    </main>
    )
}


export default Comments;
