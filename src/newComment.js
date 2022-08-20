import { v4 as uuidv4 } from 'uuid';

const newComment = (text, parentId, replyingTo) => {
    let comment = {
        id: uuidv4(),
        content: text,
        createdAt: new Date().toLocaleString(),
        score:0,
        user: {
            image: { 
                png: "./images/avatars/image-amyrobson.png",
                webp: "./images/avatars/image-amyrobson.webp"
              },
              username: "amyrobson"
        },
        parentId:parentId,
        replyingTo:replyingTo
    }
    if(!parentId) {
        comment.replies = []
    }
    return comment
}

export default newComment