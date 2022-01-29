import { useParams , Link } from "react-router-dom";

const PostPage = ({posts , handleDelete}) => {

    const {id} = useParams();

     const data = posts.find(post => post.id.toString() === id);

    return (
            <main className="PostPage">
                <article className="post">
                  {data && 
                  <>
                  <h2>{data.title}</h2>
                  <p className="postDate">{data.datetime}</p>
                  <p className="postBody">{data.body}</p>
                  <button style={{"color":"#fff" , "backgroundColor":"gray"}}> 
                    <Link to={`/edit/${data.id}`}>
                           Edit Post
                    </Link>
                 </button>
                  <button onClick={() => handleDelete(data.id)}>Delete Post</button>
                  </>
                  }
                  {
                    (!data) && 
                     <>
                        <h2>Post Not Found</h2>
                        <p className="postDate">Well , that is disappointing</p>
                        <p>
                          <Link to="/">
                            Visit Our Homepage
                          </Link>
                        </p>
                     </>

                  }
                </article>
             </main>
           )
}
export default PostPage