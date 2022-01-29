import { useParams , Link } from "react-router-dom";
import { useState , useEffect} from "react";

const EditPost = ({handleEdit , posts , Editpost , setEditpost , Editbody ,setEditbody}) => {

    const { id } = useParams();

    const [sLoad , setsLoads] = useState(false);

    const ldata = posts.find((item) => {

       return item.id.toString() === id
   
    });

    useEffect(()=> {

        if(ldata){

            console.log(ldata.id)
            setEditpost(ldata.title)
            setEditbody(ldata.body)
            setsLoads(true);

        }else{
            setsLoads(false);
        }


    } ,[ldata , setEditpost , setEditbody ,setsLoads])

    
    //console.log(sLoad)

     return (
                <main className='NewPost'>
                     
                {
                      sLoad !== false ?  
                      <>
                      <h1>EditPost </h1>
                        <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
                            <label htmlFor='postTitle'>Title:</label>
                            <input 
                            id='postTitle'
                            type='text'
                            required
                            value={Editpost}
                            onChange={(e) => setEditpost(e.target.value)}
                            />
                        <label htmlFor='postBody'>Post:</label>
                        <input 
                            id='postBody'
                            type='text'
                            required
                            value={Editbody}
                            onChange={(e) => setEditbody(e.target.value)}
                            />
                        <button 
                        type="submit"
                            aria-label='Edit Post'
                            onClick={()=> handleEdit(ldata.id)}
                            > Submit</button>
                            </form>
                         </>
                         : null
                      
                }

{
                    (!ldata) && 
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
                </main>
               )
    


}
export default EditPost;